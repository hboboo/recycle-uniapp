

## dui-appoint-date 预约日期，预约时间，预约上门服务时间
> **组件名：dui-appoint-date**

一个好用的、兼容各端的，用于预约日期、预约时间、预约上门服务时间的组件


### 基本用法

在 `template` 中直接使用组件

```html
<template>
	<dui-appoint-date></dui-appoint-date>
</template>
```

###注意
主色调可以在css中修改$activeColor值


## API

###  Props

|  属性名	|    类型	| 默认值		| 说明		|
| :-:		| :-:		| :-:			| :-:	|
| dateRange| Number | `7` | 未来日期范围。默认是未来7天（包括当天） |
| timePeriodData| Array | `默认值看组件效果` | 时间段列表 |
| v-model | Boolean | `false` | 是否显示该组件 |

timePeriodData子项为object, 其属性如下：

|  属性名	|    类型	| 默认值		| 说明		|
| :-:		| :-:		| :-:			| :-:	|
| time_period| String | - | 时间段，如`'9:00-11:00'` |
| disabled_date| Array | - | 不可选的日期，如`['12-13']`|
| disabled_text| String | - | 不可选时显示的文本提示 |


###  Events

|  事件名	|    说明	|
| :-:		|  :-:		| 
| close| 点击取消按钮触发  	|
| confirm| 点击确定按钮触发  	|

