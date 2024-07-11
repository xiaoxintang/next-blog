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


