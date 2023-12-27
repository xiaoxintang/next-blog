# linux

## curl

**获图片取链接详情**

```shell
curl -I https://gw.alicdn.com/bao/uploaded/i1/2246953229/O1CN01dDujl11ZivdrouZEM_!!0-item_pic.jpg_300x300q90.jpg
```

## docker
```shell
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

[docker-install github链接](https://github.com/docker/docker-install)

## iptables
**清空iptable规则**
```shell
sudo iptables -P INPUT ACCEPT
sudo iptables -P FORWARD ACCEPT
sudo iptables -P OUTPUT ACCEPT
sudo iptables -F
```

## nodejs 安装
**ubuntu**


```shell
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```
[github参考连接](https://github.com/nodesource/distributions)