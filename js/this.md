# this call apply bind

## this

- **作为对象的方法调用，this指向该对象**
```js
const obj = {
    name:'xxt',
    getName(){
        console.log('this === obj',this === obj)
        console.log('this.name',this.name)
    }
}
obj.getName()
/**
 * this === obj true
 * this.name xxt
 * */
```


- **作为普通函数调用，指向全局对象（window）**
```html
<div id="div-id">click me</div>
<script>
    window.id='window-id'
    document.getElementById('div-id').onclick = function (){
        console.log(this.id)
        const callback = function (){
            console.log('callback',this.id)
        }
        callback()
    }
    /**
     * div-id
     * window-id
     * */
</script>
```
::: details 想让callback函数里面this指向div？

```js
document.getElementById('div-id').onclick = function (){
    console.log(this.id)
    const callback =  ()=>{
        /**箭头函数
         * 或者用变量把外面的this保存下来*/
        console.log('callback',this.id)
    }
    callback()
}
```
:::
- **构造器调用，指向实例**

```js
class Dog{
    constructor() {
        this.name='dog name'
    }
}
const dog = new Dog()
console.log(dog.name)/**dog name*/

```
:::tip
如果构造函数里面显式return一个对象，那构造函数的返回值就是这个对象
```js
class Dog{
    constructor() {
        this.name='dog name'
        /**不return，或者return一个非对象类型，this还是原来的
         * 这里return了，所以，结果是return name*/
        return {
            name:'return name'
        }
    }
}
const dog = new Dog()
console.log(dog.name)/**return name*/
```
:::
- **bind,call,apply调用**
这个属于“借用别人的方法”
```js
const obj1 = {
    name:'obj1 name',
    getName(){
        return this.name
    }
}
const obj2 = {
    name:'obj2 name'
}
obj1.getName.call(obj2)//obj2 name
```
## apply bind call
这三个方法都是改变this指向的方法，区别：
- **apply**
```js
apply(thisArg)
/*第二个参数是个数组，或者伪数组*/
apply(thisArg, argsArray)
```
- **call**
与apply不同的是，call参数不同，需要一个一个参数传进去
```js
call(thisArg)
call(thisArg, arg1)
call(thisArg, arg1, arg2)
call(thisArg, arg1, arg2, /* …, */ argN)
```
- **bind**
apply、call函数都是立即执行，而bind是返回一个函数，需要再次调用函数才能执行，与call传参一致，也是一个一个参数传递
```js
bind(thisArg)
bind(thisArg, arg1)
bind(thisArg, arg1, arg2)
bind(thisArg, arg1, arg2, /* …, */ argN)
```
