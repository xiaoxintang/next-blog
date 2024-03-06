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

## defineReactive 方法

为每个被`defineReact`的`key`创建一个`Dep`.

将数据的`get`和`set`方法进行劫持。

`get`的时候调用`dep.depend()`内部会将`Dep.target`也就是当前活跃的`Watcher`实例的`addDep(depInstance)`方法进行调用。而`addDep()`方法又在内部将调用`dep.addSub(watcherInstance)`方法，将当前的`Watcher`实例传入。从而实现了 dep 与 watcher 的互相联系。

`set`的时候，调用`dep.notify()`,内部逻辑是调用订阅的`watcher`实例的`update`方法。而`update`方法一般是将`dirty`设为`true`
