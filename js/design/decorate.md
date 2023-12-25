# 装饰者模式
- **使用场景**

`fetch`请求带上token
```js
function getToken(){
    /**自行实现*/
    return 'custom token'
}
function adaptToken(url,params){
    params.headers={...params.headers,token:getToken()}
}
/**AOP方式去修改params*/
Function.prototype.before = function (fn){
    return (...args)=>{
        fn(...args)
        this(...args)
    }
}
/**重写fetch*/
fetch = fetch.before(adaptToken)

```

表单校验

```js
Function.prototype.before = function (fn){
    return (...args)=>{
        if(fn(...args) === false){
            /**before fn执行如果返回false说明校验不过，直接return*/
            return
        }
        this(...args)
    }
}
const params = {
    username:"",
    password:""
}
function validate(){
    /**params是全局参数，此处为demo*/
    if(!params.username){
        console.log('用户名不能为空')
        return false
    }
    if(!params.password){
        console.log('密码不能为空')
        return false
    }
}
let submit = function (){
    console.log(params)
}
submit = submit.before(validate)
```