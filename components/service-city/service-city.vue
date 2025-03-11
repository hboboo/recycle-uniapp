<template>
	<popup v-model="showPopup" :clickModalClose="true" @close="close">
		<view class="service-city-wrapper">
			<view class="title title-decoration">
				上门城市
			</view>
			<view class="city-block">
				<view>
					<text class="pro">北京：</text>
					<text class="city">北京</text>
				</view>
				<view>
					<text class="pro">上海：</text>
					<text class="city">上海</text>
				</view>
				<view>
					<text class="pro">广东：</text>
					<text class="city">广州、深圳、佛山</text>
				</view>
				<view>
					<text class="pro">江西：</text>
					<text class="city">南昌、九江、吉安</text>
				</view>
				<view>
					<text class="pro">广西：</text>
					<text class="city">南宁、桂林</text>
				</view>
				<view>
					<text class="pro">湖南：</text>
					<text class="city">长沙、株洲</text>
				</view>
				<view>
					<text class="pro">福建：</text>
					<text class="city">福州、泉州、厦门</text>
				</view>
			</view>
		</view>
	</popup>
</template>

<script setup>
import { ref ,computed} from 'vue';
	const emits = defineEmits(['close','update:modelValue']);
	const props = defineProps({
		modelValue:Boolean
	})
	const showPopup = computed({
		get(){
			return props.modelValue; 
		},
		set(){
			emits('update:modelValue',false);
		}
	})
	function closeCallBack(){
		emits('close');
		showPopup.value = false;
	}
	
	function close(){
		if(props.clickModalClose){
			closeCallBack();
		}
	}
</script>

<style lang="scss" scoped>
	.service-city-wrapper{
		width:450rpx;
		height: auto;
		max-height: 75vh;
		overflow-y: auto;
		padding:50rpx;
		border-radius: 15rpx;
		background:#fff url('../../static/icon/city-bg.png?a=1') no-repeat bottom/contain;
		.title{
			margin-bottom: 40rpx;
			text-align: center;
			font-size: 34rpx;
		}
		.city-block{
			font-size: 28rpx;
			line-height: 2.5;
			.pro{
				font-weight: bold;
			}
			.city{
				color:#555;
			}
		}
	}
</style>