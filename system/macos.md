# macos

## 允许任何来源

```shell
sudo spctl --master-disable
```

## nodejs 全局安装某包时提示无权限

抱错信息：`/usr/local/lib/node_modules`无权限访问

- **查看目录权限**

```shell
ls -la /usr/local/lib/mode_modules
```

- **root 用户的所有权**

解决方法，修改为当前用户的所有权

```shell
sudo chown -R $(whoami) /usr/local/lib/mode_modules
```

## webstrom vmoptions

- **所在目录**

```shell
/Users/longan/Library/Application Support/JetBrains/WebStorm2023.3/webstorm.vmoptions
```

- **内容**

```shell
# custom WebStorm VM options (expand/override 'bin/webstorm.vmoptions')


-javaagent:/Users/longan/jetbra/ja-netfilter.jar=jetbrains
--add-opens=java.base/jdk.internal.org.objectweb.asm=ALL-UNNAMED
--add-opens=java.base/jdk.internal.org.objectweb.asm.tree=ALL-UNNAMED

```
