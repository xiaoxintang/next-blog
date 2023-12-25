# 高阶函数
高阶函数是指，函数可以当作参数传递，也可以当作返回值返回
## curry
接受与原函数相同数量或更少数量的参数，并返回另一个 柯里化 后的函数或与原函数相同的值

实际上，当你调用原函数，如 sum(1,2,3) 时，它将调用 柯里化 函数的某个形式，如 csum(1)(2)(3)， csum(1)(2,3)， csum(1,2)(3)，或 csum(1,2,3) 。所有调用 柯里化 函数的方法都应该返回与原始函数相同的值

```js
function curry(fn){
    /**先将参数缓存起来*/
    let argArray = []
    return function _curry(...args){
        argArray.push(...args)
        if(argArray.length >= fn.length){
            /**参数个数达到就调用原函数*/
            fn(...argArray)
        }else{
            /**参数个数没达到，就递归调用自己*/
            return (...params)=>_curry(...params)
        }
    }
}
```

## 防抖
函数防抖 方法是一个函数，它的执行被延迟了 t 毫秒，如果在这个时间窗口内再次调用它，它的执行将被取消。

例如，假设 t = 50ms ，函数分别在 30ms 、 60ms 和 100ms 时调用。前两个函数调用将被取消，第三个函数调用将在 150ms 执行。如果改为 t = 35ms ，则第一个调用将被取消，第二个调用将在 95ms 执行，第三个调用将在 135ms 执行。

![防抖时序图](/debounce.png)
上图展示了了防抖函数是如何转换事件的。其中，每个矩形表示 100ms，反弹时间为 400ms。每种颜色代表一组不同的输入。

```js
function debounce(fn,t){
    let timer;
    return function (...args){
        clearTimeout(timer);
        timer = setTimeout(()=>{
            fn(args)
        },t)
    }
}
```
## 节流
现给定一个函数 `fn` 和一个以毫秒为单位的时间 `t`

节流函数首先立即被调用，然后在 `t` 毫秒的时间间隔内不能再次执行，但应该存储最新的函数参数，以便在延迟结束后使用这些参数调用 `fn`

例如，t = 50ms ，并且函数在 30ms 、 40ms 和 60ms 时被调用。第一次函数调用会在接下来的 t 毫秒内阻止调用函数。第二次函数调用会保存参数，而第三次调用的参数应该覆盖当前保存的第二次调用的参数，因为第二次和第三次调用发生在 80ms 之前。一旦延迟时间过去，节流函数应该使用延迟期间提供的最新参数进行调用，并且还应创建另一个延迟期间，时长为 80ms + t 。

![节流时序](/throttle.png)
上面的图示展示了节流如何转换事件。每个矩形代表100毫秒，节流时间为400毫秒。每种颜色代表不同的输入集合。

```js
function throttle(fn,t){
    let timer;
    let nextTimestamp = 0
    return function(...args) {
        /**第一次是setTimeout 0秒，下个浏览器事件循环执行
         * 第二次以后，nextTimestamp都是加时间t计算得出的，这里减去当前时间戳，算出还剩多少时间
         * */
        const delay = Math.max(0,nextTimestamp - Date.now())
        /*在时间t内再次执行的话，把上次未执行的延迟函数取消*/
        clearTimeout(timer)
        timer = setTimeout(()=>{
            /**如果函数执行了，说明是时间间隔到了，再次计算出下个可以执行的时间点*/
            nextTimestamp = Date.now() + t;
            fn.apply(this,args)
        },delay)
    }
}
```

## 惰性加载函数
在web开发过程中，因为浏览器差异的存在，一些嗅探工作总是不可避免的，例如微信支付，支付宝支付封装

可以通过变量覆盖的方法，将函数重写，所以代码运行只需要有一次判断

```js
let pay = function(params){
    const ua = navigator.userAgent.toLowerCase()
    if(new RegExp(/micromessenger/, 'i').test(ua)){
        /*微信
        * demo，实际代码有差异*/
        pay = function(params){
            wx.wxpay123({k1:'v1',k2:'v2',...params})
        }
    }else if(new RegExp(/alipay/, 'i').test(ua)){
        /*支付宝*/
        pay = async function(params){
            const resp = await fetch('https://demo.api').then(res=>res.json())
            ali.alipayment({k3:'v3',...params,...resp})
        }
    }
    /**第一次手动执行
     * 第二次以后都是直接执行if else里面的逻辑了*/
    pay(params)
}
```
