# http版本
## HTTP/0.9 单行协议

请求只有唯一的`GET`方法，后面跟资源路径

```http request
GET /mypage.html
```

响应只有响应文档本身
```html
<html>
  这是一个非常简单的 HTML 页面
</html>
```

## HTTP/1.0 构建可扩展性

- 协议版本信息现在会随着每个请求发送（HTTP/1.0 被追加到了 GET 行）。添加了新的请求方式`POST`、`HEAD`
- **状态码**会在响应开始时发送，使浏览器能了解请求执行成功或失败，并相应调整行为（如更新或使用**本地缓存**）。
- 引入了 HTTP 标头的概念，无论是对于请求还是响应，允许传输元数据，使协议变得非常灵活，更具扩展性。如授权**Authorization**、内容编码**Content-Encoding**、字符集**Accept-Charset**、**Accept-Encoding**
- 在新 HTTP 标头的帮助下，具备了传输除纯文本 HTML 文件以外其他类型文档的能力（凭借 `Content-Type` 标头,`Content-Type`
还有[multipart/子类型](https://www.iana.org/assignments/media-types/media-types.xhtml#multipart)定义多部分发送）

简单的http请求看起来像这样
```http request
GET /mypage.html HTTP/1.0
User-Agent: NCSA_Mosaic/2.0 (Windows 3.1)

200 OK
Date: Tue, 15 Nov 1994 08:12:31 GMT
Server: CERN/3.0 libwww/2.17
Content-Type: text/html
<HTML>
一个包含图片的页面
  <IMG SRC="/myimage.gif">
</HTML>
```
接着发送获取图片的请求

```http request
GET /myimage.gif HTTP/1.0
User-Agent: NCSA_Mosaic/2.0 (Windows 3.1)

200 OK
Date: Tue, 15 Nov 1994 08:12:32 GMT
Server: CERN/3.0 libwww/2.17
Content-Type: text/gif
(这里是图片内容)
```

## HTTP/1.1 标准化的协议
默认http连接不关闭，标准的做法是，客户端在最后一个请求时，发送`Connection: close`主动关闭
消除了大量歧义内容并引入了多项改进：

- 连接可以复用，
- 增加管线化技术，允许在第一个应答被完全发送之前就发送第二个请求。但是服务器的响应还是按照顺序来的（**这就是为什么会造成队头阻塞**）
- 凭借 `Host` 标头，能够使不同域名配置在同一个 IP 地址的服务器上

以下是http请求看起来的样子
```http request
GET /zh-CN/docs/Glossary/Simple_header HTTP/1.1
Host: developer.mozilla.org
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:50.0) Gecko/20100101 Firefox/50.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
Referer: https://developer.mozilla.org/zh-CN/docs/Glossary/Simple_header

200 OK
Connection: Keep-Alive
Content-Encoding: gzip
Content-Type: text/html; charset=utf-8
Date: Wed, 20 Jul 2016 10:55:30 GMT
Etag: "547fa7e369ef56031dd3bff2ace9fc0832eb251a"
Keep-Alive: timeout=5, max=1000
Last-Modified: Tue, 19 Jul 2016 00:59:33 GMT
Server: Apache
Transfer-Encoding: chunked
Vary: Cookie, Accept-Encoding

(content)


GET /static/img/header-background.png HTTP/1.1
Host: developer.mozilla.org
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:50.0) Gecko/20100101 Firefox/50.0
Accept: */*
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
Referer: https://developer.mozilla.org/zh-CN/docs/Glossary/Simple_header

200 OK
Age: 9578461
Cache-Control: public, max-age=315360000
Connection: keep-alive
Content-Length: 3077
Content-Type: image/png
Date: Thu, 31 Mar 2016 13:34:46 GMT
Last-Modified: Wed, 21 Oct 2015 18:27:50 GMT
Server: Apache

(image content of 3077 bytes)

```

## HTTP/2 为了更优异的表现

- HTTP/2 是二进制协议而不是文本协议。不再可读，也不可无障碍的手动创建，改善的优化技术现在可被实施。
- 这是一个**多路复用**协议。并行的请求能在同一个链接中处理，移除了 HTTP/1.x 中顺序和阻塞的约束。
- **压缩**了标头。因为标头在一系列请求中常常是相似的，其**移除了重复和传输重复数据的成本**。
- 其允许服务器在客户端缓存中填充数据，通过一个叫**服务器推送**的机制来提前请求

![http1 vs http2](/http2.png)

## HTTP/3 基于QUIC的HTTP

下一代http标准

- TCP协议层还存在队头堵塞问题，http2只是解决了http层的堵塞问题。http/3从根本上解决队头堵塞问题

## 参考文档
[掘金](https://juejin.cn/post/6974673084095660062)

[mdn](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP#http3%E2%80%94%E2%80%94%E5%9F%BA%E4%BA%8E_quic_%E7%9A%84_http)