<template>
	<popup v-model="showPopup" :clickModalClose="true" @close="close">
		<view class="appoint-notice-wrapper">
			<view class="title title-decoration">预约须知</view>
			<view class="content">
				<view class="block">1、部分城市开通上门回收，未开通城市则无法上门，部分城市开通上门回收，未开通城市则无法上门。</view>
				<view class="block">2、部分城市开通上门回收，未开通城市则无法上门，部分城市开通上门回收，未开通城市则无法上门。</view>
				<view class="block">3、部分城市开通上门回收，未开通城市则无法上门，部分城市开通上门回收，未开通城市则无法上门。</view>
				<view class="block">4、部分城市开通上门回收，未开通城市则无法上门，部分城市开通上门回收，未开通城市则无法上门。</view>
			</view>
		</view>
	</popup>
</template>

<script setup>
import { ref, computed } from 'vue';
const emits = defineEmits(['close', 'update:modelValue']);
const props = defineProps({
	modelValue: Boolean
});

const showPopup = computed({
	get() {
		return props.modelValue;
	},
	set() {
		emits('update:modelValue', false);
	}
});

function closeCallBack() {
	emits('close');
	showPopup.value = false;
}

function close() {
	if (props.clickModalClose) {
		closeCallBack();
	}
}
</script>

<style lang="scss" scoped>
.appoint-notice-wrapper {
	width: 450rpx;
	height: auto;
	max-height: 75vh;
	overflow-y: auto;
	padding: 50rpx;
	border-radius: 15rpx;
	background: #fff;
	.title {
		margin-bottom: 40rpx;
		text-align: center;
		font-size: 34rpx;
	}
	.content{
		font-size: 28rpx;
		line-height: 1.5;
		color:#333;
		.block{
			margin-bottom: 20rpx;
		}
	}
}
</style>
