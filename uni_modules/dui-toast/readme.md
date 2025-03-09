

## dui-toast 消息提示、加载提示、消息提醒
> **组件名：dui-toast**

一个好用的，用于消息提示、加载提示、消息提醒的组件


### 基本用法

在 `template` 中直接使用组件，通过ref引用模版调用showToast开启、closeToast关闭消息提示。

```html
<template>
	<dui-toast ref="toast"></dui-toast>
</template>
```
vue3中：
```js
const toast = ref(null);
onMounted(() => {
	//自定义样式
	toast.value.showToast({
		content:'提交失败，已经超过最大期限！',
		color:'#ff3e3e',
		backgroundColor:'#ffeaed',
		border:'1px solid #f89',
	})
	
	toast.value.showToast({
		content:'提交成功!  注意，我们将在7天内将验证您的信息，请注意保持电话畅通，谢谢！',
	})
	
	//定义出现位置
	toast.value.showToast({
		content:'提交成功！',
		bottom:'30px',
	})
	
	//可直接设置提示文本
	toast.value.showToast('可直接设置提示文本！')
});
```
vue2中：
```js
mounted() {
	this.$refs.toast.showToast('我们已收到留言，感谢您的反馈！')
}
```


###  方法

|  方法名	|    参数	|  说明	|
| :-:		| :-:		| :-:	|
| showToast| 参数见下方 | 该方法需要在组件渲染完成生命周期中调用，如mounted(或onMounted) 或者 onReady |
|  closeToast	|    -	|  关闭消息提示	|

showToast参数为object, 其属性值如下：

|  属性名	|    类型	| 默认值		| 说明		|
| :-:		| :-:		| :-:			| :-:	|
| content| String、Number | - | 展示的文本内容 |
| duration| Number | `2500` | 展示时长，单位为ms |
| complete| Function | - | 展示完成关闭后的回调方法 |
除上述属性之外，其他css属性均可设置，如fontSize、background、padding、top、left等，样式高度自定义
