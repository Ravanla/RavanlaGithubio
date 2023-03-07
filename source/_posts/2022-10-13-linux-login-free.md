---
title: 获取Linux集群免登陆权限
tags:
  - Linux
categories: 操作系统
abbrlink: a5a8aab0
date: 2022-10-13 16:00:00
updated: 2022-11-22 22:00:00
# swiper_index:  #置顶轮播图顺序，非负整数，数字越大越靠前
---

假如有100台服务器，每次都用`ssh`输入用户名密码的方式登录，这样输入用户名密码就成为一件繁重的工作。

这时候，可以考虑利用主服务器的公钥在各个服务器间登录，避免输入密码。接下来是具体的操作步骤：

## 生成公私钥对

首先，需要在**主服务器**上用`ssh-keygen`生成一个公私钥对，然后把公钥写入需要管理的每一台机器的`authorized_keys`文件中。如下图所示：我们使用`ssh-keygen`在**主服务器**中生成公私钥对。

![](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202210131528519.png)

- 使用`mkdir -p`创建`~/.ssh`目录，`-p`的优势是当目录不存在时，才需要创建，且不会报错。
- 用`cd`切换到`.ssh`目录，然后执行`ssh-keygen`。这样会在`~/.ssh`目录中生成两个文件，`id_rsa.pub`公钥文件和`is_rsa`私钥文件。

![](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202210131531533.png)

可以看到`id_rsa.pub`文件中是加密的字符串，我们可以把这些字符串拷贝到其他机器对应用户的`~/.ssh/authorized_keys`文件中，当`ssh`登录其他机器的时候，就不用重新输入密码了。

## 分发公钥

我们已经在主服务器生成了公私钥，接下来就需要将公钥分发到其他服务器。这个传播公钥的能力，可以用一个`shell`脚本执行，这里我用`transfer_key.sh`实现。

首先我们先写一个`foreach.sh`脚本来批量执行，并写一个`transfer_key.sh`配合`foreach.sh`的工作。

*foreach.sh*

```bash
#!/usr/bin/bash

readarray -t ips < iplist

for ip in ${ips[@]}

do

    sh ./transfer_key.sh $ip

done
```

*tranfer_key.sh*

```bash
#注意：“=”左右两边不能有空格
ip=$1

pubkey=$(cat ~/.ssh/id_rsa.pub)

echo "login ... $ip"

ssh lagou@$ip " 

sudo mkdir -p ~/.ssh

sudo echo $pubkey  >> ~/.ssh/authorized_keys

sudo chmod 700 ~/.ssh

sudo chmod 600 ~/.ssh/authorized_keys

"
```

- 在`foreach.sh`中我们执行 transfer_key.sh，并且将 IP 地址通过参数传递过去。
- 在 transfer_key.sh 中，用`$1`读出 IP 地址参数， 再将公钥写入变量`pubkey`，然后登录到对应的服务器，执行多行指令。
- 用`mkdir`指令检查`.ssh`目录，如不存在就创建这个目录。最后我们将公钥追加写入目标机器的`~/.ssh/authorized_keys`中。

`chmod 700`和`chmod 600`是因为某些特定的`linux`版本需要`.ssh`的目录为可读写执行，`authorized_keys`文件的权限为只可读写。而为了保证安全性，组用户、所有用户都不可以访问这个文件。

给两个文件赋予可执行权限`chmod +x`，执行`foreach.sh`需要输入两次密码。

![](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202210131559405.png)

完成上述操作后，我们再登录这两台服务器就不需要输入密码了。我们来尝试一下：

![](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202210131600705.png)

大功告成 ^ - ^