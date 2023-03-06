---
title: Hexo + Butterfly 一些常见问题
tags:
  - null
categories:
  - null
mathjax: true
abbrlink: 9c8ab03a
date: 2022-02-25 22:57:49
description:
---
> 这篇文章主要汇集了一些先驱者在搭建过程中遇到的各种问题，如果正在搭建博客的你正好遇到了文章中所提到的问题，可以先尝试着按对应策略去解决，如果无法解决，可在评论区留言。

## 前言

> 注意：我的博客根目录路径为 【G:/hexo-blog/blog-demo】，下文所说的根目录都是此路径，将用`[BlogRoot]`代替。如果不清楚根目录路径，请回到教程 [基于 Hexo 从零开始搭建个人博客（二）](https://tzy1997.com/articles/hexo1602/)，查看你执行`hexo init xxx`这条命令时所选择的路径，例如我选择的路径是【G:/hexo-blog】，我的博客根目录即为【G:/hexo-blog/xxx】。
>
> 修改站点配置文件`_config.yml`，路径为【BlogRoot/\_config.yml】。
>
> 修改主题配置文件`_config.butterfly.yml`，路径为【BlogRoot/\_config.butterfly.yml】。

如果改动了站点配置文件`_config.yml` 和主题配置文件`_config.butterfly.yml`，需要重新编译才能看到效果。

## 关于自定义的 js 和 css 文件

可以分别在 source/js、source/css 文件夹下创建自己的 js 和 css，只要在主题配置文件`_config.butterfly.yml`中的`inject`引入即可。

css文件在 head 引入，js文件 在 bottom 引入，这里表示加载的顺序而已，你也可以把 js 放到 head 部分，视情况而定。

大致的规则如下：

```yml
inject:  head:        - <link rel="stylesheet" href="/css/custom.css">  bottom:        - <script src="/js/custom.js"></script>
```

## 博客为什么是英文，如何换成中文？

修改站点配置文件`_config.yml`，将`language`设置成`zh-CN`。

## 本地预览样式正常，部署后样式错乱？

修改站点配置文件`_config.yml`，如果未购买域名，将`url`设置成`<用户名>.github.io`，如果已经购买域名，将`url`设置成你的域名，再重新部署即可看到效果。

## 顶部出现 Loading

生成前先执行命令行 hexo clean

## 首页打字机效果

在主题配置文件`_config.butterfly.yml`中搜索`subtitle`，按照提示去配置即可。

## 搜索栏为什么出现在底部？

如果执行`hexo deploy`后在站点进行搜索，搜索栏出现在页面底部或样式错乱，如下图：

![](https://s2.loli.net/2022/08/06/OebgK3k1xQqrw4F.png)

执行`hexo generate`前先执行`hexo clean`，在执行`hexo deploy`。

建议执行命令的顺序为：【hexo clean】->【hexo generate】->【hexo deploy】

## 出现 Example Domain

![](https://bu.dusays.com/2023/02/14/63eb9c38f024c.jpg)

修改项目配置文件【\_config.yml】中的`url`，由默认的`https://example.com` 换成你的目标域名(没有域名则填写 [https://xxxx.github.io](https://xxxx.github.io/))

## 鼠标在有序标签上会旋转是怎么实现的?

给 hover 加一个 旋转的属性就行了，把这段代码加到你自定义的 css 里就行了

```css
#article-container ol li:hover:before{-webkit-transform: rotate(360deg);-moz-transform: rotate(360deg);-o-transform: rotate(360deg);-ms-transform: rotate(360deg);transform: rotate(360deg)}
```

## Spawn failed

![](https://bu.dusays.com/2022/11/10/636d014d365bc.webp)

出现此情况，大多原因是网络问题，可多尝试几次，实在解决不了可点击此链接: [传送门](https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=Spawn%20failed&fenlei=256&rsv_pq=0xd9cd80aa000e1a81&rsv_t=e127EJA5B+AEec/pKMyxnNJO7qtgtToFXaT0oWzOFZDoWquYMaLZDn99rQC/&rqlang=en&rsv_enter=1&rsv_dl=tb&rsv_sug3=31&rsv_sug1=25&rsv_sug7=101&rsv_sug2=0&rsv_btype=i&inputT=13983&rsv_sug4=14793) 。

## Cannot read properrites of null（reading 0）

报这种类似的错误，多半是配置问题，复制箭头所指的关键字，到主题配置文件中全局查找，看看相关信息。

例如下面这个错误是，未配置评论功能，却开启了`newest_comments`。

![](https://bu.dusays.com/2022/11/12/636f2f438b55e.jpg)

## totalount is not a function

![](https://bu.dusays.com/2022/11/12/636f34fcdec95.jpg)

检查是否安装了`hexo-wordcount`插件。正确步骤请参考 [基于 Hexo 从零开始搭建个人博客（五）](https://tzy1997.com/articles/hexo1605/) 一文中关于 【字数统计】部分。

## YAMLException：duplicated mapping key

![](https://bu.dusays.com/2022/11/12/636f3aa03c6fd.png)

有重复的【key】，可能主题配置文件中有关键字【keyA】，你又添加了一个【keyA】，复制箭头所指的关键字，去主题配置文件中全局查找，是否有重复的【key】。

## 星光背景没效果？

星光背景只在黑夜模式下有明显效果，如果想让主题默认设置为黑夜模式，修改主题配置文件`_config.butterfly.yml`，将`display_mode`设置为`dark`即可。

## 首页博客卡片出场动画效果如何实现？

这个效果 用到了 wow.js，你可以参考另外一篇文章，选择标志着推荐的插件配置方案 [wow.js引入教程](https://tzy1997.com/articles/0xiipgum/#%E7%89%B9%E6%95%88%E6%A0%87%E7%AD%BE-wow)

## 豆瓣插件运行 hexo douban 没爬到东西

node 版本过高导致，可以下个 nvm 来控制 node 版本，建议安装较低的 node 版本(推荐v12.18.0)

## 部分页面顶部视频效果

效果请移步 [留言板](https://tzy1997.com/comments/)，[友链](https://tzy1997.com/comments/)，这个需要改动源码，具体操作请看第六篇中的提到的 [部分页面插入视频](https://tzy1997.com/articles/hexo1606/#%E9%83%A8%E5%88%86%E9%A1%B5%E9%9D%A2%E6%8F%92%E5%85%A5%E8%A7%86%E9%A2%91)

## 关于相册的一些问题

相册页面页只是普通的页面，你只需要`hexo new page xxxxx` 创建你的页面就行。

然后使用标签外挂 [galleryGroup](https://butterfly.js.org/posts/4aa8abbe/#Gallery%E7%9B%B8%E5%86%8A%E5%9C%96%E5%BA%AB)，具体用法请查看对应的内容。

```markdown
<div class="gallery-group-main">{% galleryGroup 'ACG' '那些二次元的故事' '/gallery/ACG' https://bu.dusays.com/2022/11/26/638228a86935a.webp %}{% galleryGroup '岳阳' '2017年5月岳阳' '/gallery/YY' https://bu.dusays.com/2022/11/27/63831b681e9f8.jpg %}{% galleryGroup 'OH MY GIRL' '关于OH MY GIRL的图片' '/Gallery/ohmygirl' https://i.loli.net/2019/12/25/hOqbQ3BIwa6KWpo.jpg %}</div>
```

效果如下：

![Group Image Gallery](https://bu.dusays.com/2022/11/26/638228a86935a.webp)

![Group Image Gallery](https://bu.dusays.com/2022/11/27/63831b681e9f8.jpg)


基本的格式为：

```markdown
{% galleryGroup '相册名' '相册描述' '盛放相册内容的页面路径' 相册封面 %}
```

关于【盛放相册内容的页面路径】，也就是子页面，这里再解释一下，例如：【/Gallery/wallpaper】，被编译过后其实它的目录结构变成了【/Gallery/wallpaper/index.html】。所以你只需要在【Gallery】文件夹下新建一个名为【wallpaper】的文件夹，【wallpaper】下的文件就是盛放【收藏的一些壁纸】的容器，让它去展示相册内容，你可以新建【index.md】，也可以新建【index.html】（这里如果是 html 文件，不需要被编译，可配置站点配置文件`_config.yml`，让它跳过编译），建议你用 `markdown`，所以在【wallpaper】的文件夹下新建一个【index.md】即可。

在子页面，也即是【/Gallery/wallpaper/index.md】中，你可以用【gallery】去展示相册，

```markdown
{% gallery %}![](https://i.loli.net/2019/12/25/Fze9jchtnyJXMHN.jpg)![](https://i.loli.net/2019/12/25/ryLVePaqkYm4TEK.jpg)![](https://i.loli.net/2019/12/25/gEy5Zc1Ai6VuO4N.jpg)![](https://i.loli.net/2019/12/25/d6QHbytlSYO4FBG.jpg)![](https://i.loli.net/2019/12/25/6nepIJ1xTgufatZ.jpg)![](https://i.loli.net/2019/12/25/E7Jvr4eIPwUNmzq.jpg)![](https://i.loli.net/2019/12/25/mh19anwBSWIkGlH.jpg)![](https://i.loli.net/2019/12/25/2tu9JC8ewpBFagv.jpg){% endgallery %}
```

效果如下：

你也可以正常的去写 markdown，我的相册以及子页面的效果如下：

![相册页效果](https://bu.dusays.com/2022/06/01/6296cfb61c089.jpg)

子页面效果-01

![子页面效果-02](https://bu.dusays.com/2022/06/01/6296cffa59837.jpg)

子页面效果-02

## 域名已经解析到github, 但是输入xxx.github.io却报404

这时候检查你的项目根目录有没有一个名为`CNAME`的文件。如果没有的话，打开博客`/source`目录，我的是`G:/hexo-blog/blog-demo/source`，新建`CNAME`文件，注意没有后缀。
然后在里面写上你的域名(例如：tzy1997.com)，保存。最后运行`hexo g`、`hexo d`上传到`github`。
这样到最后当你在地址栏输入`xxx.github.io`时，才会自动跳转到你的域名。

## ERROR TypeError: xxxx\\node\_modules\\hexo-theme-butterfly\\layout\\includes\\page\\flink.pug:13

```bash
ERROR TypeError: D:\008-Player\002-Todo_Web\005-Blog\node_modules\hexo-theme-butterfly\layout\includes\page\flink.pug:1311| .flink-desc!=i.class_desc12| .flink-list> 13| each item in i.link_list  Cannot read properties of undefined (reading ‘length’)
```

如果报这个错误，请检查`link.yml`的格式。正确的格式为：

```yml
- class_name: 友情链接  class_desc: 那些人，那些事  link_list:    - name: 唐志远の博客      link: https://tzy1997.com/      avatar: https://bu.dusays.com/2022/05/02/626f92e193879.jpg      descr: 古今之成大事者，不惟有超世之才，亦必有坚忍不拔之志。- class_name: 网站  class_desc: 值得推荐的网站  link_list:    - name: Twitter      link: https://twitter.com/      avatar: https://i.loli.net/2020/05/14/5VyHPQqR6LWF39a.png      descr: 社交分享平台    - name: Youtube      link: https://www.youtube.com/      avatar: https://i.loli.net/2020/05/14/9ZkGg8v3azHJfM1.png      descr: 视频网站    - name: Weibo      link: https://www.weibo.com/      avatar: https://i.loli.net/2020/05/14/TLJBum386vcnI1P.png      descr: 中国最大社交分享平台
```

## err: Error: ENOENT: no such file or directory

```bash
err: Error: ENOENT: no such file or directory, open ‘E:\blog\themes\butterfly\layout\includes\loading\load_style\gear.pug’
```

`Error: ENOENT: no such file or directory`，如果你遇到了这个错误，有可能是你的文件名、分类或者标签的名字混淆了大写和小写，你可以尝试检查每一个标签和分类的名称，是否大小写一致来修复这一问题。可以看下官方给出的问题解答 [https://hexo.io/zh-cn/docs/troubleshooting](https://hexo.io/zh-cn/docs/troubleshooting)

## Twikoo + Vercel 部署时出现 504 GATEWAY\_TIMEOUT

![](https://s2.loli.net/2022/08/06/VEdZv49A6a1qbUK.png)

检查 创建 MongoDB 数据库用户的时候，是否设置好允许所有 IP 地址（0.0.0.0/0）连接。

## Twikoo + Vercel 部署时出现 1000 bad auth : Authentication failed

如果报了如下错误：

```json
{  "code":1000,  "message":"bad auth : Authentication failed."}
```

请检查第 7 步：进入【Settings】->【Environment Variables】，添加环境变量【MONGODB\_URI】时，目标字符串中的`<password>`是否替换成了 第 3 步中的【数据库密码】。

## Twikoo + Vercel 部署 获取 评论失败

请移步该文章 [关于Vercel被墙导致获取Twikoo评论失败的解决方案](https://tzy1997.com/articles/hexo1614/)