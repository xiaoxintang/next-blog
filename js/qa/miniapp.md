# 小程序
## 微信小程序
- **ios图片展示空白**

[curl](/system/linux.html#curl)查看图片链接。判断原始图片格式是否webp,webp格式图片的话，ios存在兼容性问题

- **倒计时卡顿**

使用`text`代替`view`

- **canvas**

1. `canvasId`与`id`不是同一个东西
2. canvas 模拟器上层级最高,真机上不会

## tarojs
- **页面组件引用其他页面组件会报错 export default was not found**

把页面组件拆为普通组件

- **弹窗阻止滚动穿透**

父级`view`添加`catchMove`,滚动内容用`Scroll-View`