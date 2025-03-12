<template>
	<popup v-model="showPopup" :clickModalClose="true" @close="closeCallBack">
		<view class="beans-exchange-wrapper">
			<view class="title title-decoration">回收豆兑换</view>
			<view class="content">
				<view class="exchange-tit flex-center-between">
					<text>回收豆</text>
					<icon class="exchange-icon"></icon>
					<text>现金</text>
				</view>
				<view class="exchange-rate">
					1回收豆 = 0.06元
				</view>
				<view class="input-box">
					<input v-model="beansCount" class="input" type="number" placeholder="请输入需要兑换的回收豆数量"/>
				</view>
				<view class="exchange-btn flex-center-center" @click="exchange">
					兑换 {{exchangeAmount}}
				</view>
			</view>
		</view>
		
		<dui-toast ref="toast"></dui-toast>
	</popup>
</template>

<script setup>
import { ref, computed } from 'vue';

const toast = ref(null);
const emits = defineEmits(['close', 'update:modelValue']);
const props = defineProps({
	modelValue: Boolean
});
const beansCount = ref();
const exchangeAmount = computed(()=>{
	const amount = beansCount.value ? (beansCount.value * 0.06).toFixed(2) + '元':'';
	return amount;
})

const showPopup = computed({
	get() {
		return props.modelValue;
	},
	set() {
		emits('update:modelValue', false);
	}
});

const exchange = ()=>{
	if(!beansCount.value){
		return toast.value.showToast('请输入需要兑换的回收豆数量');
	}
	//
	toast.value.showToast('兑换成功！')
};

function closeCallBack() {
	emits('close');
	showPopup.value = false;
	beansCount.value = '';
}


</script>

<style lang="scss" scoped>
.beans-exchange-wrapper {
	width: 450rpx;
	height: auto;
	max-height: 75vh;
	overflow-y: auto;
	padding: 50rpx;
	border-radius: 15rpx;
	background-color: #fff;
	.title {
		margin-bottom: 40rpx;
		text-align: center;
		font-size: 34rpx;
	}
	.content {
		padding:42rpx 0 0;
		font-size: 28rpx;
		.exchange-icon{
			width:39rpx;
			height: 39rpx;
			background: url('../../static/icon/exchange.png') no-repeat center/contain;
		}
		.exchange-tit{
			margin-bottom: 16rpx;
		}
		.exchange-rate{
			font-size: 20rpx;
			color:#ccc;
		}
		.input-box{
			margin: 50rpx 0;
			.input{
				padding:16rpx 20rpx;
				font-size: 28rpx;
				border-radius: 8rpx;
				color:#222;
				background-color: #f2f2f2;
				&::placeholder{
					font-size: 28rpx;
					color:#ccc;
				}
			}
		}
		.exchange-btn{
			width:100%;
			height: 70rpx;
			border-radius: 80rpx;
			background-color: #ffc903;
		}
	}
}
</style>
