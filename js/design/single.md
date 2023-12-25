# 单例模式
- **使用场景**
  websocket只需要一个连接、全局缓存、浏览器的window对象
- **实现方式**
```js
function getSingle(fn){
    let instance;
    return function (...args){
        return instance || (instance=fn.apply(this,args))
    }
}
function createWebsocket(){
    const socket = new WebSocket("ws://localhost:8080");
    return socket
}
const createSingleWebsocket = getSingle(createWebsocket())
/*多次调用createSingleWebsocket也只会创建一次*/
```