# 微信jssdk
开发微信内嵌H5页面，实现某些依赖微信的功能时，需要使用jssdk

- **config如何配置**

```js
const url = window.location.href.split('#')[0] 
```
域名后面的`/`需要带上，例如`https://a.com/static/#/home` 需要填写`https://a.com/static/`

> 微信文档[常见问题汇总](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#66)