🥝的博客源码，！！！暂定名为**hexo-theme-Fomalhaut**，原作者网站：www.fomal.cc 


# 在记事本中逐个记录，方便替换，以下为我的示例
[Blogroot]：D:\developer\ravanlaBlog\Ravanla.github.io

[SourceRepo]：Ravanla/RavanlaGithubio


[SiteBlogRepo]
  [GithubBlogRepo]: Ravanla.github.io
  [GiteeBlogRepo]: Ravanla.github.io
  [CodingBlogRepo]：akilar/akilar

[SiteUsername]
  [GithubUsername]：Ravanla
  [GiteeUsername]：Ravanla
  [CodingUsername]：wowCODING

[SiteToken]
  [GithubToken]：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
  [GiteeToken]：87a11d9d794ec28355fe1cf602c41d65
  [CodingToken]：5141a406bebd91ec62742cee9b75c932d89a38db

[GithubEmail]：1285644869@qq.com

[TokenUser]：Ravanla

![](./cover.jpg)

本源码是基于Hexo-Butterfly的二次开发，暂时没时间做完全的主题分离，因此安装就是整个博客的安装，建议另起一个文件夹进行安装，或者备份好原来的信息。当然你也可以不直接搬走，而是借鉴里面的部分代码写法。

**安装方法**🍡🍡🍡：

1. 安装 NodeJs、Hexo、Git、注册并连接Github，此部分可参考[Hexo博客搭建基础教程(一)](https://www.fomal.cc/posts/e593433d.html)。
  PS：相当于链接教程的第1-7步，第8步就不要做了，不然会清空源码的！！！（不是新手请跳过这条）

1. 把源码打包下载到自己的电脑，然后解压缩到一个你喜欢的文件夹中

2. 在git bash命令中切换到下载的博客根目录，使用以下命令进行模块安装。这里绝不能使用`hexo init`初始化，若不慎用了，则站点的配置文件`_config.yml`内容会被重置

  ```bash
  npm i
  ```

4. 执行以下命令清空并启动项目，启动成功后再浏览器地址栏输入`localhost:4000`进行验证

  ```bash
  hexo cl; hexo g; hexo s
  ```

5. 到这里一般是没啥问题的了，当本地能成功启动后，改一下站点配置文件的`_config.yml`的`deploy`配置项，然后用以下命令部署到Github（这一步出问题的，请删除站点配置文件的`deploy`配置项与`baidu_url_submitter`的信息）

  ```bash
  hexo d
  ```

简单说明🌈🌈🌈：

- js的主体在`source/js/fomal.js`里面，做了基本分块逻辑的标注，后期整合的，以... start和... end 包裹

- css主体在`themes\butterfly\source\css\_custom\custom.css`里，与Butterfly的自带样式联合编译为一个index.css，有基本的注释

- 因为兼顾了夜间模式特定壁纸和自定义壁纸，背景的切换做在了`fomal.js`的第3190行附近，美化模块代码逻辑在`fomal.js`的第2894-3596行，四个背景分别为PC端白天、PC端黑夜、手机端白天、手机端黑夜，美化模块DOM起点为第3356行

  ```js
  /* 美化模块 start */
  ...
  ...
  // 背景图(约3190行)
  document.getElementById("defineBg").innerText = `:root{
    --default-bg: url(https://lskypro.acozycotage.net/Fomalhaut/img/dm14.webp);
    --darkmode-bg:url(https://lskypro.acozycotage.net/Fomalhaut/img/yuanshen1.webp);
    --mobileday-bg: url(https://lskypro.acozycotage.net/Fomalhaut/img/snow.webp);
    --mobilenight-bg: url(https://lskypro.acozycotage.net/Fomalhaut/img/mb8.webp);
  }`;
  ...
  ...
  // 美化模块主体DOM(约3356行)
    winbox.body.innerHTML = `...`
  ...
  ...
  /* 美化模块 end */
  
  ```

- 页脚部分请见`themes\butterfly\layout\includes\footer.pug`，包括页脚计时器、徽标、文字、布局等

- 封面图在主题配置文件`_config.butterfly.yml`的`default_cover`配置项，建议配置多项后随机刷出封面图

  ```java
  cover:
    # display the cover or not (是否顯示文章封面)
    index_enable: true
    aside_enable: true
    archives_enable: true
    # the position of cover in home page (封面顯示的位置)
    # left/right/both
    position: both
    # When cover is not set, the default cover is displayed (當沒有設置cover時，默認的封面顯示)
    default_cover:
      - https://source.fomal.cc/img/default_cover_14.webp
      - https://source.fomal.cc/img/default_cover_15.webp
      # ......
  ```

  

- 网站图标为根目录的`favicon.ico`，替换为你自己的图标即可

- 欢迎信息地理位置显示，这个需要配置自己的KEY，类似的还有bibi的配置、朋友圈等配置均需要参考相关文档改成自己的API，望周知

- 其余配置项基本与Butterfly兼容，参考[Butterfly官方文档](https://butterfly.js.org/)即可

- 遇到问题请多看相关文档(Hexo主题文档、Butterfly主题文档、店长的教程)和本站教程，若有其他疑问请加Q群：691942826 验证：Github开源项目

