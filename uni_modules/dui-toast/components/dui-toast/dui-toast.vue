<template>
	<view v-show="visible && options.content" class="dui-toast" :class="{center:toastStyle._center}" :style="toastStyle">
		{{options.content}}
	</view>
</template>

<script>
export default {
	name: 'duiToast',
	data() {
		return {
			visible:false,
			options:{},
		};
	},
	computed: {
		toastStyle(){
			const styles = this.options;
			if((styles.top || styles.bottom) && (!styles.left && !styles.right)){
				styles.left = '50%';
				styles.transform = `translate(-50%,0)`;
			}
			if((styles.left || styles.right) && (!styles.top && !styles.bottom)){
				styles.top = '50%';
				styles.transform = 'translate(0,-50%)';
			}
			return styles;
		}
	},
	methods: {
		showToast(options){
			this.clearAllTimeout();
			if(['string','number'].includes(typeof options)){
				this.$set(this.options,'content',options);
			}
			if(this.getTypeOf(options) == '[object Object]'){
				this.options = options;
			}
			this.options._center = !this.getPositionInfo();
			this.visible = true;
			this.timeout = setTimeout(()=>{
				const complete = this.options.complete;
				this.visible = false;
				if(this.getTypeOf(complete) == '[object Function]'){
					complete();
				}
			},this.options.duration || 2500);
		},
		
		getPositionInfo(){
			const {top,left,right,bottom} = this.options;
			return top || left || right || bottom;
		},
		
		getTypeOf(data){
			return Object.prototype.toString.call(data);
		},
		
		closeToast(){
			this.visible = false;
			this.clearAllTimeout();
		},
		
		clearAllTimeout(){
			clearTimeout(this.timeout);
		}
	},
	beforeDestroy() {
		this.clearAllTimeout();
	}
};
</script>

<style lang="scss" scoped>
$a:calc(50vw - 50%);
.dui-toast {
	position: fixed;
	padding:16rpx 23rpx;
	color:#fff;
	border-radius: 10rpx;
	word-break: break-all;
	font-size: 24rpx;
	box-sizing: border-box;
	background: rgba(0, 0, 0, 0.6);
	z-index: 9999;
	&.center{
		left:50%;
		top:50%;
		transform: translate(-50%,-50%);
	}
}
</style>
