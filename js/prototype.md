# 原型与原型链
![原型神图](/prototype.png)

- **原型对象与原型属性**
1. 每个对象都有`__proto__`属性
2. 实例的属性`__proto__`指向父类的原型对象`prototype`
3. 父类的原型对象`prototype`也有`__proto__`又指向了爷爷类的`prototype`,形成一个链式结构
4. 原型链的次顶层是`Object.prototype`,顶层是`null`
5. 原型对象(`Foo.prototype`)的`constructor`指向构造函数`function Foo()`本身

- **Object是一个Function**
  
`Object.__proto__ = Function.prototype`
- **Function的原型对象也是一个对象**

`Function.prototype.__proto__ = Object.prototype`
- **Function也是一个Function**

`Function.__proto__ = Function.prototype`