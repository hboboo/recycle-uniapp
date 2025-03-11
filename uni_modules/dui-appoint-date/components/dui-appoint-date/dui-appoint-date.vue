<template>
	<view v-if="visible" class="dui-appoint-date">
		<view class="dui-mask" @click="close"></view>
		<view class="dui-content">
			<view class="dui-title">
				<text class="">选择预约日期</text>
				<text class="dui-cancel-btn" @click="close">取消</text>
			</view>
			<view class="dui-date">
				<view class="dui-date-item" :class="{ active: dateActiveIndex == index }" v-for="(date, index) in dateList" :key="index" @click="chooseDate(index)">
					<view class="dui-date-str">{{ date.date_str }}</view>
					<view>{{ date.week_str }}</view>
				</view>
			</view>
			<view class="dui-title">选择预约时间段</view>
			<view class="dui-time-period">
				<view
					class="dui-time-period-item"
					:class="{ active: timePeriodActiveIndex == index, disabled: item.disabled || item.disabled_appoint }"
					v-for="(item, index) in timePeriodList"
					:key="index"
					@click="chooseTimePeriod(item, index)"
				>
					{{ item.time_period }}
					<view class="dui-disabled-appoint-text" v-if="item.disabled_appoint">{{item.disabled_text}}</view>
				</view>
			</view>
			<view class="dui-btn" @click="confirm">确认</view>
		</view>
	</view>
</template>

<script>
export default {
	emits: ['close', 'update:modelValue','confirm','input'],
	data() {
		return {
			dateActiveIndex: 0,
			dateList: [],
			timePeriodActiveIndex: -1,
			timePeriodList:[
				{
					disabled: false,
					time_period: '9:00-11:00'
				},
				{
					disabled: false,
					time_period: '11:00-13:00'
				},
				{
					disabled: false,
					time_period: '13:00-15:00'
				},
				{
					disabled: false,
					time_period: '15:00-17:00'
				},
				{
					disabled: false,
					time_period: '17:00-19:00'
				},
				{
					disabled: false,
					time_period: '19:00-21:00'
				}
			]
		};
	},
	props: {
		dateRange: {
			type: Number,
			default: 7
		},
		timePeriodData:Array,
		clickModalClose: {
			type: Boolean,
			default: true
		},
		showClose: {
			type: Boolean,
			default: true
		},
		// #ifdef VUE2
		value: Boolean,
		// #endif
		// #ifdef VUE3
		modelValue: Boolean,
		// #endif
	},
	computed: {
		visible() {
			// #ifdef VUE2
			let value = this.value;
			// #endif
			// #ifdef VUE3
			let value = this.modelValue;
			// #endif
			return value;
		}
	},
	created() {
		this.init();
	},
	methods: {
		init() {
			const dateInstance = new Date();
			const dateList = [];
			for (var i = 0; i < this.dateRange; i++) {
				dateList.push(this.getDateObjec(this.getNextSomeDay(dateInstance, i)));
			}
			this.dateList = dateList;
			this.getTimePeriodList();
		},
		getNextSomeDay(date, num) {
			const nextDay = new Date(date);
			nextDay.setDate(nextDay.getDate() + num);
			return nextDay;
		},
		getDateObjec(_date) {
			const dateInstance = _date ? new Date(_date) : new Date();
			const year = dateInstance.getFullYear();
			const month = dateInstance.getMonth() + 1;
			const date = dateInstance.getDate();
			const day = dateInstance.getDay();
			const hour = dateInstance.getHours();
			const dateStr = `${this.fillZero(month)}-${this.fillZero(date)}`;
			const weekStr = this.getWeekStr(day);
			return {
				date_str: dateStr,
				date,
				hour,
				year,
				week_str: '周' + weekStr
			};
		},
		getTimePeriodList() {
			const timePeriodList = JSON.parse(JSON.stringify(this.isArray(this.timePeriodData) && this.timePeriodData.length  ? this.timePeriodData : this.timePeriodList));
			const chooseDate = this.dateList[this.dateActiveIndex];
			const currentDate = this.getDateObjec();
			if (chooseDate && (chooseDate.date == currentDate.date)) {
				timePeriodList.forEach((ele) => {
					const disabled_date = this.isArray(ele.disabled_date) ? ele.disabled_date:[];
					const time_period = ele.time_period;
					const hour = currentDate.hour;
					const time_period_start = time_period.split('-')[0];
					const time_period_end = parseFloat(time_period.split('-')[1]);
					if (time_period_end <= hour) {
						ele.disabled = true;
					}
					ele.disabled_appoint = !!(disabled_date.length && disabled_date.includes(chooseDate.date_str));
				});
			}else{
				timePeriodList.forEach(ele=>{
					const disabled_date = this.isArray(ele.disabled_date) ? ele.disabled_date:[];
					ele.disabled = false;
					ele.disabled_appoint = !!(disabled_date.length && disabled_date.includes(chooseDate.date_str));
				})
			}
			this.timePeriodList = timePeriodList;
		},
		fillZero(num) {
			if (num < 10) {
				return '0' + num;
			}
			return num;
		},
		getWeekStr(week) {
			let week_str = '';
			switch (week) {
				case 0:
					week_str = '日';
					break;
				case 1:
					week_str = '一';
					break;
				case 2:
					week_str = '二';
					break;
				case 3:
					week_str = '三';
					break;
				case 4:
					week_str = '四';
					break;
				case 5:
					week_str = '五';
					break;
				case 6:
					week_str = '六';
					break;
			}
			return week_str;
		},
		chooseDate(index) {
			this.dateActiveIndex = index;
			this.timePeriodActiveIndex = -1;
			this.getTimePeriodList();
		},
		chooseTimePeriod(item, index) {
			if (!item.disabled && !item.disabled_appoint) {
				this.timePeriodActiveIndex = index;
			}
		},
		modelCallBack() {
			// #ifdef VUE2
			this.$emit('input', false);
			// #endif
			// #ifdef VUE3
			this.$emit('update:modelValue', false);
			// #endif
		},
		close() {
			this.$emit('close');
			this.modelCallBack();
		},
		isArray(data){
			return Object.prototype.toString.call(data) === '[object Array]';
		},
		confirm(){
			const dateInfo = this.dateList[this.dateActiveIndex];
			const time_period = this.timePeriodList[this.timePeriodActiveIndex]?.time_period;
			this.$emit('confirm',{
				date:`${dateInfo.year}-${dateInfo.date_str}`,
				week_str:dateInfo.week_str,
				time_period
			})
			this.modelCallBack();
		}
	}
};
</script>

<style lang="scss" scoped>
$activeColor: #ff8e03;
.dui-appoint-date {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 999;
	.dui-mask {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.55);
	}
	.dui-content {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 50rpx 30rpx;
		box-sizing: border-box;
		animation: slide 0.35s ease;
		border-radius: 15rpx 15rpx 0 0;
		color: #222;
		background-color: #fff;
		.dui-title {
			position: relative;
			display: flex;
			align-items: center;
			width:100%;
			padding-left: 12rpx;
			font-size: 34rpx;
			margin-bottom: 50rpx;
			&::before {
				content: '';
				position: absolute;
				top: 50%;
				left: 0;
				width: 10rpx;
				height: 30rpx;
				background-color: $activeColor;
				background: linear-gradient($activeColor,#fff);
				border-radius: 5rpx;
				transform: translateY(-50%);
			}
			.dui-cancel-btn{
				margin-left: auto;
				font-size: 30rpx;
				color:$activeColor;
			}
		}
		.dui-date {
			width:100%;
			margin-bottom: 50rpx;
			white-space: nowrap;
			overflow-x: auto;
			&::-webkit-scrollbar {
				display: none;
			}
			.dui-date-item {
				display: inline-block;
				width: 169rpx;
				padding: 20rpx 0;
				margin-right: 20rpx;
				text-align: center;
				font-size: 26rpx;
				border-radius: 8rpx;
				border: 3rpx solid #f7f7f7;
				background-color: #f7f7f7;
				&.active {
					border-color: $activeColor;
					background-color: #fff;
				}
				.dui-date-str {
					font-size: 30rpx;
				}
			}
		}
		.dui-time-period {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			width:100%;
			margin-bottom: 38rpx;
			.dui-time-period-item {
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 48%;
				height: 100rpx;
				margin-bottom: 20rpx;
				border-radius: 8rpx;
				border: 3rpx solid #f7f7f7;
				background-color: #f7f7f7;
				&.active {
					border-color: $activeColor;
					background-color: #fff;
				}
				&.disabled {
					color:#aaa;
				}
				.dui-disabled-appoint-text{
					position: absolute;
					left:50%;
					bottom:6rpx;
					color:$activeColor;
					font-size: 18rpx;
					transform: translateX(-50%);
				}
			}
		}
		.dui-btn {
			display: flex;
			align-items: center;
			justify-content: center;
			width:100%;
			height: 85rpx;
			border-radius: 60rpx;
			color: #fff;
			background-color: $activeColor;
		}
	}
}

@keyframes slide {
	0% {
		transform: translateY(100%);
	}
}
</style>
