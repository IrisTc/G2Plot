---
title: 直方图
order: 11
---

### 图表容器

`markdown:docs/common/chart-options.zh.md`

### 数据映射

#### data

<description>**required** _array object_</description>

设置图表数据源。数据源为对象集合，例如：`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

#### binField 

<description>**required** _string_</description>

设置直方图绘制 (进行分箱) 的字段。

#### stackField

<description>**optional** _number_</description>

指定层叠字段，通过该字段的值，柱子将会被分割为多个部分，通过颜色进行区分。

#### meta

`markdown:docs/common/meta.zh.md`

直方图内含的数据字段有：

| 字段 | 字段描述 | 字段值类型 |
｜ --- ｜ --- ｜ --- ｜
｜`range`| 分箱之后，所处分箱的区间范围 |_number[]_ |
｜`count`| 分箱之后，所处分箱的计数数量 | _number_ |

示例：

<playground path="more-plots/histogram/demo/binWidth.ts" rid="histogram-meta"></playground>

### 图形样式

#### binWidth

<description>**optional** _string_</description>

设置直方图的分箱宽度，binWidth 影响直方图分成多少箱, 不能与 binNumber 一起使用。

#### binNumber

<description>**optional** _number_</description>

设置直方图的分箱数量，binNumber 影响直方图分箱后每个柱子的宽度。

#### columnStyle

<description>**optional** _StyleAttr | Function_</description>

柱子样式配置。

`markdown:docs/common/shape-style.zh.md`

`markdown:docs/common/color.zh.md`

#### state

<description>**可选** _object_</description>

`markdown:docs/common/state-style.zh.md`

### 图表组件

`markdown:docs/common/component.zh.md`

### 图表事件

`markdown:docs/common/events.zh.md`

### 图表方法

`markdown:docs/common/chart-methods.zh.md`

### 图表主题

`markdown:docs/common/theme.zh.md`
