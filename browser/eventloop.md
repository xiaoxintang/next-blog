# 事件循环

- **微任务队列** 具有最高执行优先级

- **交互队列** 次优先级

- **延时队列** 最低优先级

下面直接看例子

```js
async function asFn() {
  console.log(1);
  await console.log(2);
  console.log(3);
}
setTimeout(() => {
  console.log(4);
}, 0);
console.log(5);
const p = new Promise((resolve) => {
  console.log(6);
  resolve();
  console.log(7);
});

p.then(() => {
  console.log(8);
});
asFn();
```

:::details 源码解析

```js
async function asFn() {
  // 相当于普通函数代码块内
  console.log(1);
  // 相当于Promise.resolve(console.log(2)),所以是立即输出
  await console.log(2);
  // await后面的代码块，相当于是放到一个`Promise`的`then`方法之后.所以这里是一个微任务的形式
  console.log(3);
}
setTimeout(() => {
  // 延时队列，最后输出
  console.log(4);
}, 0);
// 当前事件循环中，最先执行
console.log(5);
const p = new Promise((resolve) => {
  // 相当于普通函数代码块内
  console.log(6);
  resolve();
  // 相当于普通函数代码块内
  console.log(7);
});

p.then(() => {
  // 微任务
  console.log(8);
});
(() => await asFn())();
```

输出结果是：5、6，7，1，2，8，3，4
:::

## 参考文档

[juejin](https://juejin.cn/post/7309061655094362147?searchId=20240222122758C6C0C9C22C4E08095BA1)
