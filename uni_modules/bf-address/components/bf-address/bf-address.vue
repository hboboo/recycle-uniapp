<template>
	<picker mode="multiSelector" :value='valueArray' @columnchange="columnchange" :range="addressInfo.data"
		range-key="name" @change="confirm">
		<view>{{text}}</view>
	</picker>
</template>
<script>
	import area from "./area_format_object.json"

	export default {
		props: ["value"],
		data() {
			return {
				valueArray: Array.isArray(this.value) ? this.value : [0, 0, 1],
				addressInfo: {},
				text: ''
			}
		},
		watch:{
			value(val){
				this.valueArray = val
				this.uptDataAndText()
			}
		},
		methods: {
			codeToIndex(value){
				if(typeof value != "string"){
					uni.showToast({
						icon:"error",
						title:"传入的code必须是字符串,例如:11,1101,110101"
					})
					return
				}
				var arr = value.split(",")
				// return arr
				return arr.map((ele,index) =>{
					if(index == 0){
						return Object.keys(area).findIndex(el =>el == ele)
					}else if(index == 1){
						return Object.keys(area[arr[0]].c).findIndex(el =>el == ele)
					}else{
						return Object.keys(area[arr[0]].c[arr[1]].c).findIndex(el =>el == ele)
					}
				})
				
			},
			columnchange(e) {
				var params = JSON.parse(JSON.stringify(this.valueArray))
				this.valueArray = this.resetVal(e.detail.column, e.detail.value, params)
				this.addressInfo = this.cityData(this.valueArray);
			},
			resetVal(index, result, array) {
				for (var i = index; i < array.length; i++) {
					array[i] = i == index ? result : 0

				}
				return array
			},
			confirm(val) {
				this.valueArray = val.detail.value;
				this.uptDataAndText()
				this.$emit("confirm", {
					label: this.addressInfo.text,
					code: this.addressInfo.code
				})
			},
			cityData(valueArray) {
				// province 处理之后的picker组件能用到的数据
				const province = Object.keys(area).map(ele => {
					return {
						name: area[ele].n,
						code: ele,
						parent: null
					}
				})
				//  获取市的数据
				const cityData = area[province[valueArray[0]].code].c;
				// 返回需要的格式的市的数据

				const city = Object.keys(cityData).map(ele => {
					return {
						name: cityData[ele].n,
						code: ele,
						parent: valueArray[0]
					}
				})
				let regionData;
				Object.keys(cityData).forEach((ele, index) => {

					if (index == valueArray[1]) {
						regionData = cityData[ele].c
					}
				})
				// region 处理之后的picker组件能用到的数据
				const region = Object.keys(regionData).map(ele => {
					return {
						name: regionData[ele].n,
						code: ele,
						parent: valueArray[1]
					}
				})
				return {
					data: [province, city, region],
					text: `${province[valueArray[0]].name}-${city[valueArray[1]].name}-${region[valueArray[2]].name}`,
					code: `${[province[valueArray[0]].code,city[valueArray[1]].code,region[valueArray[2]].code]}`
				}
			},
			uptDataAndText() {
				const value = this.cityData(this.valueArray)
				this.addressInfo = value;
				this.text = value.text;
			}
		},
		created() {
			this.uptDataAndText()
		}
	}
</script>
<style>
</style>