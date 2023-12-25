# 职责链模式
- **使用场景**
1. 订单支付中心有多种订单类型
2. 浏览器兼容：例如，利用flash上传，不支持flash的就用form表单
- **代码实现**
```js
const order500 = function (orderType,isPay,stock){
    if(orderType === 1 && isPay){
        console.log('order 500')
    }else{
        return 'nextChain'
    }
}
const order200 = function (orderType,isPay,stock){
    if(orderType === 1 && isPay){
        console.log('order 200')
    }else{
        return 'nextChain'
    }
}
const orderNormal = function (orderType,isPay,stock){
    if(stock>0){
        console.log('普通购买')
    }else{
        console.log('库存不足')
    }
}
/**使用AOP方式*/
Function.prototype.next = function (fn){
    return (...args)=>{
        const res = this(...args)
        if(res === 'nextChain' && fn){
            return fn(...args)
        }
    }
}
const order = order500.next(order200).next(orderNormal);
order(1,true,20)
order(2,true,20)
order(2,false,20)
order(3,true,20)
order(3,true,0)
```