# java-netfilter
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
- **相关插件**[github](https://github.com/mqj0712/plugin-sg-valid)
- **插件配置文件**`/Users/longan/jetbra/config-smartgit/sgvalid.conf`
```shell
[Methods]
REGEXP,smartgit/.*|.*|\([^;]+;Ljava/security/MessageDigest;I\)V
EQUAL,smartgit/Xt|a|(Lsmartgit/TO;Ljava/security/MessageDigest;I)V
```