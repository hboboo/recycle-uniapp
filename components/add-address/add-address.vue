<template>
	<popup v-model="showPopup" :clickModalClose="true" @close="close">
		<view class="add-address-wrapper">
			<view class="title title-decoration">新增地址</view>
			<form>
				<label class="label flex-center-between">
					<text class="label-name">姓名</text>
					<input v-model="form.name" class="input flex-1" :placeholder-style="placeholderStyle"
						placeholder="请输入姓名" type="text" />
				</label>
				<label class="label flex-center-between">
					<text class="label-name">手机号</text>
					<input v-model="form.phone" class="input flex-1" :placeholder-style="placeholderStyle"
						placeholder="请输入手机号" type="number" />
				</label>
				<label class="label flex-center-between">
					<text class="label-name">地区</text>
					<view class="input flex-1 text-overflow">
						<bf-address @confirm="onConfirm"></bf-address>
					</view>
					<icon class="r-arrow-icon"></icon>
				</label>
				<label class="label flex-center-between">
					<text class="label-name">详细地址</text>
					<textarea v-model="form.address_detail" class="input flex-1" :placeholder-style="placeholderStyle"
						placeholder="请输入详细地址" :auto-height="true"></textarea>
				</label>
				<view class="submit1 flex-center-center" @click="submit">保存</view>
			</form>
			
			<dui-toast ref="toast"></dui-toast>
		</view>
	</popup>
</template>

<script setup>
	import {
		reactive,
		watch
	} from 'vue';
	import {
		ref,
		computed
	} from 'vue';

	const placeholderStyle = 'font-size:30rpx';
	const emits = defineEmits(['close', 'update:modelValue', 'confirm']);
	const props = defineProps({
		modelValue: Boolean,
		currentAddressData: String
	});
	const data = ref([]);
	let form = reactive({
		name: '',
		phone: null,
		area: '北京市-北京市-西城区',
		address_detail: ''
	});
	const toast = ref(null);

	watch(() => props.currentAddressData, () => {
		form = reactive(JSON.parse(props.currentAddressData));
	}, {
		deep: true,
		immediate: false
	})

	const showPopup = computed({
		get() {
			return props.modelValue;
		},
		set() {
			emits('update:modelValue', false);
		}
	});

	const submit = () => {
		const params = form;
		if (!valideParams(params)) {
			return;
		}
		//---
		//自行处理请求服务端保存地址
		//---
		//自行处理回填地址
		//...
		showPopup.value = false;
		emits('confirm', params);
	};

	const onConfirm = (e) => {
		form.area = e.label;
	}



	function valideParams(params) {
		if (!params.name) {
			toast.value.showToast({
				content: '请输入姓名！',
				top: '-120rpx'
			})
			return;
		}
		if (!/^1\d{10}$/.test(params.phone)) {
			toast.value.showToast({
				content: '请输入正确的手机号！',
				top: '-120rpx'
			})
			return;
		}
		if (!params.address_detail) {
			toast.value.showToast({
				content: '请输入详细地址！',
				top: '-120rpx'
			})
			return;
		}
		return true;
	}

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
	.add-address-wrapper {
		width: 530rpx;
		padding: 50rpx 42rpx;
		border-radius: 15rpx;
		background-color: #fff;

		.title {
			margin-bottom: 30rpx;
			text-align: center;
			font-size: 34rpx;
		}

		.label {
			padding: 30rpx 0;
			border-bottom: 1rpx solid #eee;

			.label-name {
				width: 130rpx;
				text-align-last: justify;
				font-size: 30rpx;
			}

			.input {
				margin-left: 30rpx;
				font-size: 30rpx;
				line-height: normal;
			}

			.r-arrow-icon {
				width: 35rpx;
				height: 35rpx;
				background: url('../../static/icon/r-arrow.png') no-repeat center/contain;
			}
		}

		.submit1 {
			height: 85rpx;
			margin-top: 50rpx;
			border-radius: 60rpx;
			background-color: #ffc903;
			font-size: 32rpx;
		}
	}
</style>