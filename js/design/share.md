# 享元模式
- **使用场景**
满足以下条件，可以考虑使用享元模式

1. 有大量相似对象，造成了大内存开销
2. 对象大多数内部状态都可以转变为外部状态
3. 剥离出外部状态后，可以用相对较少的共享对象取代大量对象

举个实际例子，多个文件上传，限制最大上传数。分析以下下面这段代码
```js
/**
 * @param {Function[]} functions 需要执行的函数列表
 * @param {number} n 限制同时执行的个数
 * @return {Promise<any>} 返回一个promise对象
 */
async function promisePool(functions, n) {
    async function evalNext(){
        if(functions.length === 0){
            return
        }
        /**从需要执行的数组中取出当前的第一个，执行*/
        const fn = functions.shift()
        await fn()
        /**递归，如果functions还有待执行的函数，当前这个 promise状态就还是pending*/
        await evalNext()
    }
    await Promise.all(Array(n).fill().map(async ()=>evalNext()))
};

```
