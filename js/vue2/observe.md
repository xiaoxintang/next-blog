# observer

## observe 方法

有条件的返回已经`observe`的对象，或者有条件的`new Observer`

1. 如果对象已经被 Observer 过，直接返回之前的结果
2. `shouldObserve`全局标志，辅助控制是否需要`Observer`
3. 对象或者是数组才会被`Observer`

## Observer 类

将`Observer`实例，挂载到原对象的`__ob__`,并且创建一个`Dep`实例。

如果被`Observe`的对象是一个数组。将`arrayMethods`挂载在`__proto__`，或者定义在数组对象上。之后遍历数组元素，调用`observe`方法传入每个数组元素。这里的逻辑是相当于深度递归，当数组元素是普通数据类型时，`observe`方法将不会进行处理，而是利用`Observe`方法刚才添加的数组方法去触发

如果被`Observe`的对象不是数组，遍历对象的`key`并且`defineReactive`这个`key`

## vue 对 arrayMethods 做了什么

1. 以`Array.prototype`为原型创建`arrayMethods`对象
2. 定义好需要打补丁的方法。

```js
const methodsToPatch = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse",
];
```

3. 对每个方法用`Object.defineProperty`拦截，这里是封装了`def`方法

```ts
export function def(obj: Object, key: string, val: any, enumerable?: boolean) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true,
  });
}
```

4. 调用原始方法。再手动调用通知方法`ob.dep.notify()`

```ts
methodsToPatch.forEach(function (method) {
  // cache original method
  const original = arrayProto[method];
  def(arrayMethods, method, function mutator(...args) {
    // 调用原始方法，获得结果
    const result = original.apply(this, args);
    // 获取之前的Observe实例
    const ob = this.__ob__;
    let inserted;
    switch (method) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        inserted = args.slice(2);
        break;
    }
    // 如果是插入，将插入的对象也转换为响应式对象
    if (inserted) ob.observeArray(inserted);
    // 省略dev逻辑
    // 手动触发通知
    ob.dep.notify();
    // 将计算结果返回
    return result;
  });
});
```

## defineReactive 方法

为每个被`defineReact`的`key`创建一个`Dep`.

将数据的`get`和`set`方法进行劫持。

`get`的时候调用`dep.depend()`内部会将`Dep.target`也就是当前活跃的`Watcher`实例的`addDep(depInstance)`方法进行调用。而`addDep()`方法又在内部将调用`dep.addSub(watcherInstance)`方法，将当前的`Watcher`实例传入。从而实现了 dep 与 watcher 的互相联系。

`set`的时候，调用`dep.notify()`,内部逻辑是调用订阅的`watcher`实例的`update`方法。而`update`方法一般是将`dirty`设为`true`
