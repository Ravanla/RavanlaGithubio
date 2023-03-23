---
title: chatgpt_academic安装指南
tags:
  - null
categories:
  - null
mathjax: true
abbrlink: d1570e2d
date: 2023-03-23 12:26:48
description:
---
![](https://github.com/Ravanla/drawing_bed/blob/main/230323/1.png)
```python
python --version
```



不是的话跟这个[教程](https://blog.csdn.net/hj960511/article/details/123770596)装，安装完一般要重启一下才能python --version看到自己安装的版本



然后[github](https://github.com/binary-husky/chatgpt_academic)这个，找个自己的文件夹，终端上直接输入命令就好了

```git
# 下载项目
git clone https://github.com/binary-husky/chatgpt_academic.git
cd chatgpt_academic
# 在config.py中，配置 海外Proxy 和 OpenAI API KEY
- 1.如果你在国内，需要设置海外代理才能够使用 OpenAI API，你可以通过 config.py 文件来进行设置。
- 2.配置 OpenAI API KEY。你需要在 OpenAI 官网上注册并获取 API KEY。一旦你拿到了 API KEY，在 config.py 文件里配置好即可。
# 安装依赖
python -m pip install -r requirements.txt
```

剩下的就是如何设置代理和api key

![](https://github.com/Ravanla/drawing_bed/blob/main/230323/3.png)

代理设置

![](https://github.com/Ravanla/drawing_bed/blob/main/230323/2.png)

[api-key](https://platform.openai.com/account/api-keys)

```git
# 运行
python main.py
```
<script async src="//tuchuang.voooe.cn/sdk/pup.js" data-url="https://tuchuang.voooe.cn/upload">
![a5976b23674144c730ab30c81144c02](D:\Typora\Insert Image\a5976b23674144c730ab30c81144c02.png)
</script>
