# 代理模式
- **使用场景**
1. 图片懒加载
```js
const myImage = (function (){
    const imgNode = document.createElement('img')
    document.body.appendChild(imgNode);
    return{
        setSrc(src){
            imgNode.src = src
        }
    }
})()
const proxyImage =(function (){
    const img = new Image()
    img.onload = function (){
        myImage.setSrc(this.src)
    }
    return{
        setSrc(src){
            myImage.setSrc('base64图片或其他形式的占位图')
            img.src = src
        }
    }
})()

proxyImage.setSrc('图片真实需要展示的地址')
```
2. 合并http请求
   例如页面交互是点击后立即请求后端接口，没有二次确认弹窗的这种交互。如：checkbox勾选用户的权限之类的
```js
function fetchData(args){
    /**假设支持多个一起上传*/
    console.log('args',args)
}
const proxyFetchData=(function(){
    let params = [];
    let timer;
    return function(args){
        if(timer){
            params.push(args)
            return 
        }
        timer  = setTimeout(()=>{
            timer = null
            fetchData(params)
        },1000)
    }
})()
```
3. 缓存计算结果、缓存http请求响应
```js
function plus(...args){
    let sum=0;
    for(let i=0;i<args.length;i++){
        sum+=args[i]
    }
    return sum
}
function createProxyFactory(fn){
    const cache = {}
    return function(...args){
        const argKey = args.join(',')
        if(argKey in cache){
            return cache[argKey]
        }
        return cache[argKey] = fn.apply(this,args)
    }
}
const proxyPlus = createProxyFactory(plus)
console.log(proxyPlus(1,2,3))
console.log(proxyPlus(1,2,3))
```