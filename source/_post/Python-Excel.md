---
title: Python操作Excel表实例
date: 2022-09-18 13:22:00
tags: [Python, Excel]
categories: coding学习
cover: https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202209181323336.png
---
最近学校整理学籍信息，其中有个需求是将一个总表拆分成若干个表格，首先将总表的每个学生的姓名、学号、联系电话信息提取出来，再根据学生的班级信息进行归类，生成若干个班级表。

总表里有8000多条数据，每条数据有41个信息，分类的班级有接近200个，使用人工一段一段复制肯定是太麻烦的，使用Python操作Excel表可以大大提升我们的工作效率。

Python操作Execl表有许多模块，在多方查资料下，我选择使用Python的`openpyxl`模块。

这里贴上我学习的网站：https://geek-docs.com/python/python-tutorial/python-openpyxl.html

以及`openpyxl`的官方Api文档：https://openpyxl.readthedocs.io/en/stable/

## 基础学习

在openpyxl中，主要用到三个概念：Workbooks，Sheets，Cells。

- Workbook就是一个excel工作表；
- Sheet是工作表中的一张表页；
- Cell就是简单的一个格。

openpyxl就是围绕着这三个概念进行的，不管读写都是“三板斧”：打开Workbook，定位Sheet，操作Cell。

第一件事就是`import openpyxl`，这个就不用多说了吧

### Openpyxl 加载Excel表

使用`wb = openpyxl.load_workbook(file)`读取已有的Excel文件

{% note info no-icon %}
如果是新建表则使用`wb = Workbook()`
{% endnote %}

接着使用`sheetnames = wb.sheetnames`获取所有工作表的名字

```python
wb = openpyxl.load_workbook(file)  # 读取Excel文件
sheetnames = wb.sheetnames  # 获取工作表名字的列表 （return list[]）
sheet = wb[sheetnames[0]]  # 获取第一个表内容
```

### Openpyxl 读取单元格

**OpenPyXL**读取(定位)单元格有两种方法，我用以下表格演示：

![](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202209181250429.png)

```python
import openpyxl
/* 省略加载表格部分的代码 */

# 第一种方法：sheet['A1']
b2 = sheet['B2'].value
print(b2)  # hello

# 第二种方法：行列定位 sheet.cell(row=row, column=column)
c2 = sheet.cell(row=2, column=3).value
print(c2)  # world
```

{% note info no-icon %}

openpyxl还提供了许多方法，可以实现读取多个单元格、按行迭代、按列迭代等等，具体请参考Api文档

{% endnote %}

### Openpyxl 写入单元格

**OpenPyXL**写入单元格也有两种方法：

```python
import openpyxl
/* 省略加载表格部分的代码 */

# 第一种方法：sheet['A1']
sheet['B2'] = "hello"  # 注意这里没有value

# 第二种方法：行列定位
sheet.cell(row=2, column=3).value = "world"

wb.save('write2cell.xlsx')  # 保存文件，命名为 write2cell.xlsx
```

![](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202209181250429.png)

### Openpyxl 附加值

使用`append()`方法，我们可以在当前工作表的底部附加一组值。

```python
import openpyxl
/* 省略加载表格部分的代码 */

rows = ("hello", "world")
sheet.append(row)

wb.save('append2cell.xlsx')  # 保存文件
```

![](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202209181305333.png)

### Openpyxl 保存Excel表

当我们修改完文件后可以使用`save('filename')`来保存文件

```python
import openpyxl

wb = openpyxl.load_workbook(file)  # 读取Excel文件
sheetnames = wb.sheetnames  # 获取工作表名字的列表 （return list[]）
sheet = wb[sheetnames[0]]  # 获取第一个表内容

sheet.cell(row=1, column=1).value = "hello world"

wb.save('save2file.xlsx')  # 保存文件
```

## 项目文件结构

先来看一下项目的文件结构：

![文件结构](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202209181115834.png)

由于提取出来的数据需要再进行一些文本填充，这里把将要填充的文本另存为一个模板`template`，这样直接往模板里存数据就可以了。

## 项目代码

这里通过判断当前班级的名称与上一个班级的名称是否相同，来区分班级表。若相同则往当前表里写入数据，若不相同则保存当前表、创建新表。

```python
import openpyxl

name_column = 1  # 名字
stid_column = 13  # 学号
class_column = 27  # 班级
phone_column = 31  # 联系电话


def loadexcel(filePath):
    wb = openpyxl.load_workbook(filePath)  # 读取Excel文件
    sheetnames = wb.sheetnames  # 获取表单名字 return list
    sheet = wb[sheetnames[0]]  # 获取第一个表单内容
    return wb, sheet


# 加载总表
all_wb, all_sheet = loadexcel(u'all.xlsx')
# 执行一次初始化
new_wb, new_sheet = loadexcel(u'template.xlsx')
tempclass = ""
read_row = 3  # 读取的开始行
write_row = 3  # 写入的开始行

while True:
    # 获取总表里的数据
    name = all_sheet.cell(row=read_row, column=name_column).value
    stid = all_sheet.cell(row=read_row, column=stid_column).value
    classname = all_sheet.cell(row=read_row, column=class_column).value
    phone = all_sheet.cell(row=read_row, column=phone_column).value
    if read_row == 3:
        # 获取第一个班级名称
        tempclass = all_sheet.cell(row=read_row, column=class_column).value
    if tempclass == classname:
        # 写入表格
        new_sheet.cell(row=write_row, column=1).value = name
        new_sheet.cell(row=write_row, column=2).value = stid
        new_sheet.cell(row=write_row, column=3).value = phone
        # 读取、写入的行自增1
        read_row += 1
        write_row += 1
    else:
        print("=======存储中：" + tempclass + "=======")
        # 保存Excel文件到result文件夹下，命名为班级.xlsx
        new_wb.save('result/' + tempclass + '.xlsx')
        # 若read_row到末尾则跳出循环(停止读取)，结束程序
        if read_row == 8874:
            break
        # 获取下一个班级名称
        tempclass = all_sheet.cell(row=read_row, column=class_column).value
        # 创建一个新的模板文件准备写入、初始化写入行
        new_wb, new_sheet = loadexcel(u'template.xlsx')
        write_row = 3

```

![](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202209181316087.png)