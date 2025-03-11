# bf-address

基于 `uniapp`的`picker` 二次封装的地区选择组件，支持h5、小程序、App。地区数据截止2023-06-04。

### 功能

1. 支持省市区三级联动
2. 支持数据回显
3. 支持`easycom`

### 使用方式 

安装完毕之后直接使用即可

```vue
<bf-address  :value="[0,0,1]" ref="bfAddress"  @confirm="onConfirm"></bf-address>
```

```js
methods:{
	onConfirm(val) {		
		console.log(val)  // {label: '辽宁省-本溪市-平山区', code: '21,2105,210502'}
	}
}

```



### 属性及方法

| 参数     | 取值                                                         |
| -------- | ------------------------------------------------------------ |
| value    | 用于设置地址回显,接收的是每列的下标，默认为[0,0,1],也就是北京省,北京市,东城区 |
| @confirm | 用于获取选中的省市区数据 {label: '辽宁省-本溪市-平山区', code: '21,2105,210502'} |

### 内置方法`codeToIndex`

如需数据回显，可以传入省市区code码(必须是字符串),如：21,2105,210502，即可返回每列对应的下标

```html
<bf-address  :value="value" ref="bfAddress"  @confirm="onConfirm"></bf-address>
<button @click="getIndex">
	模拟ajax获取code并给组件设置默认选中
</button>
```

```js
data(){
    return {
        value:[0,0,1]
    }
}
methods:{
    getIndex(){
        setTimeout(()=>{
            var indexArr = this.$refs.bfAddress.codeToIndex("21,2105,210502")
            console.log(indexArr) // [5, 4, 0]
            this.value = indexArr  // 辽宁省-本溪市-平山区 自动选中
        },2000)
        
    }
}
```

