---
title: Linux下修改用户名（同时修改用户组名和家目录）
tags:
  - Linux
categories: 操作系统
abbrlink: b7d1545b
date: 2022-10-11 21:25:00
swiper_index: 10 #置顶轮播图顺序，非负整数，数字越大越靠前
---

新装了一个Ubuntu，装好之后给了个默认的用户名，这时候需要重命名用户名，故出此教程。

## 修改用户名

我们使用 `usermod` 来修改用户名。其语法为： 

```shell
$ usermod -l new_username old_username
```

举个例子，假设我们有一个名叫 `admin` 的用户想要重命名为 `jume`，并且把家目录也重新命名为`jume`，那么在终端下执行下面命令：

```shell
$ sudo usermod -l jume -d /home/jume -m admin
```

{% note warning no-icon %}
这只会更改用户名和家目录，而其他的东西，比如用户组，UID 等都保持不变。
{% endnote %}

如果当前登录用户是将要修改用户名的用户，系统则会报错

![](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202210112108136.png)

原因是重命名的用户是**登录状态**，无法进行修改用户名。这时候就需要用**另外的用户登录**，所以我激活了root用户，切换为root用户之后就可以正常修改用户名。

- 使用`sudo passwd root`为root用户设置密码，然后再登录

{% note info no-icon %}
接下来的操作也需要该用户是未登录状态才可以修改
{% endnote %}

## 修改用户 UID

执行下面命令修改用户 UID：

```shell
$ sudo usermod -u 2000 jume
```

这里 `2000` 就是用户的新 UID。

## 修改用户组名

要把用户组名从 `admin` 修改为 `jume`，我们需要使用 `groupmod` 命令。使用下面命令来修改用户组名：

```shell
$ sudo groupmod -n jume admin
```

做完修改后，可以使用 `id` 命令来检查，

```shell
$ id jume
```