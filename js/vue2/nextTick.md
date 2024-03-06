# nextTick

[clone 源码地址](https://github.com/xiaoxintang/vue/blob/main/src/core/util/next-tick.ts)

- **callbacks** 队列

将所有的回调，放进全局队列里。等待下个事件循环

- **flushCallbacks** 函数

异步的通用处理函数。将所有`callbacks`队列里的函数取出来执行。并将`callbacks`队列清空

- **异步 timerFunc 逻辑的兼容与实现**

按照条件判断的优先级排列

1. Promise

```js
const p = Promise.resolve();
timerFunc = () => {
  p.then(flushCallbacks);
};
```

2. [MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver) 使用[observe](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/observe)监听指定节点的所有字符变化

```js
let counter = 1;
const observer = new MutationObserver(flushCallbacks);
const textNode = document.createTextNode(String(counter));
observer.observe(textNode, {
  characterData: true,
});
timerFunc = () => {
  counter = (counter + 1) % 2;
  textNode.data = String(counter);
};
```

3. setImmediate(非标准 api)

```js
timerFunc = () => {
  setImmediate(flushCallbacks);
};
```

4. setTimeout 兜底方案

```js
timerFunc = () => {
  setTimeout(flushCallbacks);
};
```

- **nextTick** 函数

将传递的 callback 函数 push 进全局`callbacks`数组。调用已实现的`timerFunc`

```js
export function nextTick(cb?: (...args: any[]) => any, ctx?: object) {
  let _resolve
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e: any) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
        // 为了await this.$nextTick()
      _resolve(ctx)
    }
  })
  if (!pending) {
    pending = true
    timerFunc()
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}

```
