<template>
	<view v-if="visible" class="popup-wrapper">
		<view class="mask" @click="close"></view>
		<view class="content">
			<slot></slot>
			<image v-if="showClose" class="close-icon" src="../../static/icon/close.png" mode="aspectFit" @click="closeCallBack"></image>
		</view>
	</view>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
	const emits = defineEmits(['close','update:modelValue'])
	const props = defineProps({
		clickModalClose:{
			type:Boolean,
			default:true
		},
		showClose:{
			type:Boolean,
			default:true
		},
		modelValue:Boolean
	})
	const visible = computed(()=>{
		return props.modelValue;
	})
	
	function closeCallBack(){
		emits('close');
		emits('update:modelValue',false);
	}
	
	function close(){
		if(props.clickModalClose){
			closeCallBack();
		}
	}
	
	onMounted(()=>{
		console.log('mounted')
	})
</script>

<style lang="scss" scoped>
	.popup-wrapper{
		position: fixed;
		top:0;
		left:0;
		width:100%;
		height: 100%;
		z-index:999;
		.mask{
			position: absolute;
			top:0;
			left:0;
			right:0;
			bottom:0;
			background-color: rgba(0, 0, 0, 0.55);
		}
		.content{
			position: absolute;
			top:50%;
			left:50%;
			transform: translate(-50%,-50%);
			animation: slide 0.2s cubic-bezier(0.680, -0.550, 0.265, 1.550);
			.close-icon{
				position: absolute;
				top:calc(100% + 50rpx);
				left:50%;
				width:35rpx;
				height: 35rpx;
				transform: translateX(-50%);
			}
		}
	}
	
	@keyframes slide {
		0%{
			transform: translate(-50%,-50%) scale(0.9);
		}
	}
</style>