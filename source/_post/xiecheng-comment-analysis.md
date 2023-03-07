---
title: 基于朴素贝叶斯的用户情感分析
date: 2022-03-08 08:55:04
tags: [Python, 深度学习]
categories: coding学习
cover: https://img2.baidu.com/it/u=3103521620,1285631156&fm=253&fmt=auto&app=138&f=JPEG?w=740&h=405
---

### 项目简介

本项目通过爬虫爬取[携程网](https://www.ctrip.com/)上指定景区的评论数据，收集整理成一个数据集，再对这些评论进行分析，判断每条评论留言的情感倾向。

在这里我用最基础的朴素贝叶斯算法来对携程景区的评论进行情感分析与预测。

### 文件结构

- data
  - bayes.pkl ---  训练后得到的模型
  - data.csv ---  爬取的景区评论（训练语料）
  - sightId.csv  ---  景区对应的id（用于作爬虫参数）
  - stopwords.txt  ---  停用词
  - userdict.txt  ---  用户自定义词典
- tool
  - handleCsv.py  ---  用于处理csv文件
  - native_bayes_sentiment_analyzer  ---  封装影评情感预测处理逻辑
- crawl.py  ---  爬虫
- native_bayes_test  ---  使用语料训练完后直接测试
- native_bayes_train  ---  使用语料训练完后保存为模型
- run_test  ---  使用训练好的模型进行影评情感预测

### 数据集

#### 样本爬取

携程网数据爬取较为简单，查找API的方式具体参考https://blog.csdn.net/qq_42636010/article/details/98041481

#### 样本简介

由于情绪是非常难以精准描述的，因此在对于景区评论文本进行情感分类时，仅分为正面评论和负面评论，即为一个二分类问题。

样本主要数据为评论(comment)、评分(score)，根据评分将评论分为好评/差评，评分大于3的为好评(isGood=1)，反则为差评(isGood=0)

| Name       | Date             | Comment                          | Score | isGood |
| ---------- | ---------------- | -------------------------------- | ----- | ------ |
| 牌坊街     | 2021-12-21 18:56 | 牌坊街是潮州的旅游景点....       | 5     | 1      |
| 汕头小公园 | 2015-12-14 01:32 | 残破，衰败，没落，没啥看头。     | 1     | 0      |
| 潮州古城   | 2020-04-21 19:10 | 潮州美食，以小店为佳，品种繁多。 | 4     | 1      |

#### 样本预处理

利用replace去掉评论文本中的html标记、未识别符号。

```python
comment = comment.replace("&#x0A;", ' ')
comment = comment.replace("&#x2F", ' ')
comment = comment.replace("&amp", ' ')
comment = comment.replace("&#x20;", ' ')
comment = comment.replace("&#x5C;", '/')
comment = comment.replace("\n", "").replace("\r", "").replace("\t", "").replace(
"\r\n", "")
```

使用jieba分词使文本变成我们需要的无不相关字符的且仅有主干词汇的文本，便于之后的特征抽取。

```python
import jieba
jieba.load_userdict("./data/userdict.txt")

def load_stopwords(file_path):
    stop_words = []
    with open(file_path, encoding='UTF-8') as words:
       stop_words.extend([i.strip() for i in words.readlines()])
    return stop_words


# jieba分词
def review_to_text(review):
    stop_words = load_stopwords(stopword_path)
    # 去除英文
    review = re.sub("[^\u4e00-\u9fa5^a-z^A-Z]", '', review)
    review = jieba.cut(review)
    all_stop_words = set(stop_words)
    # 去掉停用词
    review_words = [w for w in review if w not in all_stop_words]

    return review_words
```

`jieba.load_userdict('./data/userdict.txt')`这里我自己做了一个词典，防止部分结巴分词的不准确，可以提高约1%左右的准确率。

比如**不是很喜欢**这句，jieba会分成’不是‘，’很喜欢‘两个词，这样导致这句话很大概率会被预测为好评。

所以这里我在自定义的词典中分好了很多类似这样的词，提高了一点点准确率。

#### 文本特征抽取

- TF-IDF 词频矩阵

  TF-IDF(term frequency–inverse document frequency)是一种用于信息检索与数据挖掘的常用加权技术，常用于挖掘文章中的关键词，而且算法简单高效。

  它的优点是能过滤掉一些常见的却无关紧要本的词语，同时保留影响整个文本的重要字词。

- Countvectorizer 词频向量化

  Countvectorizer旨在通过计数来将一个文档转换为向量，只考虑词汇在文本中出现的频率。

  ```python
  count_vec = CountVectorizer(max_df=0.8, min_df=5)
  ```

  `max_df` 这个参数的作用是作为一个阈值，当构造语料库的关键词集的时候，如果某个词的词频大于`max_df`，这个词不会被当作关键词。

  `min_df`类似于`max_df`，不同之处在于如果某个词的词频小于`min_df`，则这个词不会被当作关键词。

  具体可以参考https://blog.csdn.net/weixin_46265255/article/details/120250624

### 模型构建

#### 多项式朴素贝叶斯(Naïve Bayes, NB)

特征向量表示由多项式分布生成的特定事件的频率。这是用于文本分类的典型的事件模型。

```python
def MNB_tfidf_Classifier():              #采用管道将步骤进行封装
    return Pipeline([
        ('tfidf_vec', TfidfVectorizer()),  
        ('mnb', MultinomialNB())       #训练贝叶斯模型
    ])

mnbt_clf = MNB_tfidf_Classifier()
mnbt_clf.fit(X1_train, y1_train)
mnbt_clf.score(X1_test, y1_test)
0.8598
```

#### 保存训练好的模型

```
# 先转换成词频矩阵，再计算TFIDF值
tfidf = tfidftransformer.fit_transform(vectorizer.fit_transform(review_train))
# 朴素贝叶斯中的多项式分类器
clf = MultinomialNB().fit(tfidf, sentiment_train)

with open(model_export_path, 'wb') as file:
    d = {
        "clf": clf,
        "vectorizer": vectorizer,
        "tfidftransformer": tfidftransformer,
    }
    pickle.dump(d, file)
```

#### 使用训练好的模型进行影评情感预测

native_bayes_sentiment_analyzer.py  ——>  run_test.py

这里已经将整个处理逻辑封装为一个类，这样就非常方便使用了
