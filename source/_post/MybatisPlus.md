# MybatisPlus

官网：https://mybatis.plus

## 条件查询

- 格式一：常规格式

![image-20230226213220069](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302262132130.png)

- 格式二：链式编程格式

![image-20230226213313848](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302262133864.png)

- 格式三：lambda格式**（推荐）**

![image-20230226213616977](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302262136995.png)

- 格式四：lambda格式**（重点、推荐）**

![image-20230226213703187](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302262137206.png)

### 条件查询null判定

咱们假定筛选某一项的范围（不是筛选多项嗷），比如价格(price)：`price>10 && price<100`

在某些情况下，用户可能只输入单个上限或者下限，比如：`price>null && price<100`

此时null条件查询肯定是查不出数据，这时候我们就用到mp的**条件查询null判定**

- 以前正常写法：进行if判断，如果为空则不参与条件查询

![image-20230226222116076](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302262221100.png)

- mp的写法：lqw.lt(null != user.getAge(), User:getAge, user.getAge())

![image-20230226222240154](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302262222175.png)