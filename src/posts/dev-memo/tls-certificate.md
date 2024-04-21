# 配置证书

当从 Let’s Encrypt 获得证书时，Let’s Encrypt 会验证证书中域名的控制权。一般采用 HTTP-01 或 DNS-01 方式来验证，详情参考官方文档验证方式。本文使用 HTTP-01 方式验证，若需要使用 DNS-01 方式验证，参考 `acme.sh` 官方文档 [How to use DNS API](https://github.com/acmesh-official/acme.sh/wiki/dnsapi)

## 创建证书文件夹

第一条命令新建一个文件夹 `/etc/letsencrypt/live` 用于存放证书

```bash
sudo mkdir -p /etc/letsencrypt/live
```

## 创建 WebRoot

```bash
sudo mkdir -p  /var/www/acme-challenge
```

## 配置 Nginx

这个 `Server` 是为申请证书所准备的

```bash
server {
    listen 0.0.0.0:80;
    listen [::]:80;

    server_name _;

    location / {
        return 301 https://$host$request_uri;
    }

    location /.well-known/acme-challenge {
       root /var/www/acme-challenge;
    }
}
```

## 安装 acme.sh 自动管理 CA 证书脚本

```bash
curl https://get.acme.sh | sh
```

## 申请证书

执行如下命令将默认 `CA` 修改为 Let's Encrypt

```bash
acme.sh --set-default-ca  --server  letsencrypt
```

执行如下命令（注意域名 `<tdom.ml>` 改为你自己的域名），等待一会儿

```bash
acme.sh --issue -d <tdom.ml> -w /var/www/acme-challenge
```

看到下图的提示表示证书申请成功

![有问题上知乎 图标](/dev-memo/tls-certificate/success.jpg)

证书申请失败的可能性一般有：1. 文件夹权限问题，请仔细检查每一步是否都正确；2. 证书申请次数超限，此时切忌反复尝试。证书每一个周申请次数是有限制的（20次），如果超限了就需要等一个周或者更换域名了（这个限制是争对每一个子域单独做的限制，所以万一超限了还可以用子域名继续部署）。解决方案是：在上述命令后加 `--staging` 参数继续测试。测试通过之后，删除上图所示四个证书文件以及该域名对应文件夹并取消 `--staging` 参数再执行一次。`--staging` 参数申请的证书只作为测试用，客户端是无法认证通过的（提示 `SSL handshake failed: tlsv1 alert unknown ca` ），所以使用 `--staging` 参数申请到了证书之后要去掉 `--staging` 参数重新申请一次

## 安装证书

执行如下命令（注意域名 `<tdom.ml>` 改为你自己的域名），第一条命令使用 `acme.sh` 将证书安装到 `certfiles` 目录，这样 `acme.sh` 更新证书的时候会自动将新的证书安装到这里，第二条命令是配置 `acme.sh` 自动更新和自动更新证书

```bash
acme.sh --install-cert -d <tdom.ml> --key-file /etc/letsencrypt/live/private.key --fullchain-file /etc/letsencrypt/live/certificate.crt
acme.sh  --upgrade  --auto-upgrade
```
