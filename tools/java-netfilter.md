# java-netfilter
## 说明
- 配置文件可能找不到。因为还没有默认生成，想办法生成一下。或者自己创建一个
## 配置介绍
1. 找到对应app的`vmoptions`文件
2. 在文件末尾添加
```shell
-javaagent:/path/to/ja-netfilter.jar=appname
--add-opens=java.base/jdk.internal.org.objectweb.asm=ALL-UNNAMED
--add-opens=java.base/jdk.internal.org.objectweb.asm.tree=ALL-UNNAMED
```

其中`appname`对应相应的配置与插件目录`config-appname`、`plugins-appname`。例如`appname`这里可以是`jetbrains`，`smartgit`

## 配置示例
### webstrom

- **vmoptions 所在目录**

```shell
/Users/longan/Library/Application\ Support/JetBrains/WebStorm2023.3/webstorm.vmoptions
```

- **内容**

```shell
# custom WebStorm VM options (expand/override 'bin/webstorm.vmoptions')


-javaagent:/Users/longan/jetbra/ja-netfilter.jar=jetbrains
--add-opens=java.base/jdk.internal.org.objectweb.asm=ALL-UNNAMED
--add-opens=java.base/jdk.internal.org.objectweb.asm.tree=ALL-UNNAMED

```
- **新版有时区选择的问题**

新版无法激活。原因是如果选择中国区，域名是一个中国的新域名

解决方案：url插件配置里面添加一个url

```shell
[URL]
PREFIX,https://account.jetbrains.com/lservice/rpc/validateKey.action
PREFIX,https://account.jetbrains.com.cn/lservice/rpc/validateKey.action

```

> 原文[链接](https://zhile.io/2024/09/05/jetbrains-2024-2-region.html)


### smartgit
- **vmoptions 所在目录**
```shell
~/Library/Preferences/SmartGit/smartgit.vmoptions
```

- **内容**
```shell
-javaagent:/Users/longan/jetbra/ja-netfilter.jar=smartgit
--add-opens=java.base/jdk.internal.org.objectweb.asm=ALL-UNNAMED
--add-opens=java.base/jdk.internal.org.objectweb.asm.tree=ALL-UNNAMED
```
- **相关插件**[github](https://github.com/mqj0712/plugin-sg-valid/releases)
- **本地下载**[这里](./sgvalid.jar)
- **插件配置文件**`/Users/longan/jetbra/config-smartgit/sgvalid.conf`
```shell
[Methods]
REGEXP,smartgit/.*|.*|\([^;]+;Ljava/security/MessageDigest;I\)V
EQUAL,smartgit/Xt|a|(Lsmartgit/TO;Ljava/security/MessageDigest;I)V
```