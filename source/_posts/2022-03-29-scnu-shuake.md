---
title: 获取华师砺儒云cookie和sessKey
tags:
  - Pyhton
categories: 实用工具
abbrlink: 1130bd74
date: 2022-03-29 19:24:00
swiper_index: 90 #置顶轮播图顺序，非负整数，数字越大越靠前
---

# 四史自动刷课脚本说明

主要是要获取两个值：`cookie`和`sessKey`，下面讲获取方式：

1. 打开砺儒云网页，进入四史，随便选择一个视频页面进入

   ![](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202203291034984.png)

2. 按F12打开控制台，选择网络(network)栏

   ![](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202203291035892.png)

3. 点击播放视频，然后再点击暂停视频，这时找到左边请求网址为`\service.php`的信息

   ![](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202203291037475.png)

4. 在URL里找到`sesskey`，下拉在请求标头(request header)里找到`cookie`，解析出名为`MoodleSession`的值

   ![](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202203291040448.png)

   ![](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202203291041052.png)

5. 将找到的`cookie`和`sessKey`填入Python脚本，执行Python脚本，挂后台就可以了

```python
import requests
import time
import json
import random

# 将以下参数改为你自己的
cookie = 'ndda5fl590n488igujoldcfs6l'
sessKey = 'C9dtP3VzCc'

# 以下参数非必要勿改
video_start_time = 4  # 视频时长随机范围（分钟）建议4~7分钟
video_end_time = 7
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:56.0) Gecko/20100101 Firefox/56.0',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Cookie': 'MoodleSession=' + cookie
}
video_base_url = 'https://moodle.scnu.edu.cn/mod/h5pactivity/view.php?id='
video_service_url = 'https://moodle.scnu.edu.cn/lib/ajax/service.php?sesskey=' + sessKey
service_param = [{"index": 0, "methodname": "report_h5pstats_set_time",
                  "args": {"time": 59, "finish": 1, "cmid": "392050", "total": 59, "progress": "100"}}]


def req(cmid, total):
    service_param[0]['args']['total'] = total
    service_param[0]['args']['cmid'] = cmid
    # 浏览页面
    res = requests.get(video_base_url + cmid, headers=headers, allow_redirects=False)
    # 验证是否登录成功
    monitor = res.text.find('重定向')
    if monitor != -1:
        return False
    print('完成视频(' + cmid + ')页面访问，开始观看视频(预计耗费时长：' + '%.2f' % (total/60*50/60) + '分钟)')

    # 视频接口请求
    timeLoop = 0
    while timeLoop < total:
        requests.post(video_service_url, data=json.dumps(service_param), headers=headers)
        # print('完成视频(' + cmid + ')接口请求，timeLoop=' + '%d' % timeLoop)
        timeLoop += 59
        time.sleep(40)
    print('视频(' + cmid + ')已观看时长' + '%.2f' % (timeLoop / 60) + '分钟，' +
          '完成时间：' + time.strftime("%m-%d %H:%M:%S", time.localtime()))
    return True


if __name__ == '__main__':
    with open("test.txt", "r") as f:
        for line in f.readlines():
            cmid = line.strip('\n')  # 去掉列表中每一个元素的换行符
            total = random.randint(60 * video_start_time, 60 * video_end_time)
            hh = req(cmid, total)
            if not hh:
                print('cookie或sessKey出错！程序终止！')
                break

```



