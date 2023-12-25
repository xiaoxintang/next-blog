# 适配器模式
- **使用场景**

1. 后端接口数据格式不是前端想要的数据格式
2. 数据源改变，代码逻辑与数据结构耦合

- **demo**

思路：

1. 后端请求回来的详情数据，调用`adapt2local`转换为本地需要的数据结构
2. `submit`提交编辑后的数据到后端的时候，将本地数据结构通过`adapt2remote`转换为远程服务器需要的数据结构

```js
let localData = {}
function adapt2local(remoteData){
    return {
        ...remoteData,
        /**对其他key的数据处理*/
        otherKey:123
    }
}
function adapt2remote(){
    return {
        ...localData,
        /**对其他key的数据处理,跟adapt2local的逻辑是相反的，此处为demo*/
        otherKey:123
    }
}
function getDetail(){
    /**获取远程数据*/
    const data = fetch('demo').then(res=>res.json());
    localData = adapt2local()
}
function submit(){
    const remoteData = adapt2remote(localData)
    /**后面省略接口请求之类的逻辑*/
}
```