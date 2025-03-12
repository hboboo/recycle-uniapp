<template>
  <view class="order-detail-wrapper">
    <view class="steps-box">
      <uni-steps :options="stepsList" :active="stepsActive" active-color="#ffb103" />
    </view>
    <!-- 详情内容 -->
    <view class="detail-box">
      <view class="detail-item">
        <text class="name">预约时间</text>
        <text class="val">{{ orderDetail.appoint_time }}</text>
      </view>
      <view class="detail-item">
        <text class="name">联系方式</text>
        <text class="val">{{ orderDetail.contact_info }}</text>
      </view>
      <view class="detail-item">
        <text class="name">取件地址</text>
        <text class="val">{{ orderDetail.address }}</text>
      </view>
    </view>
    <view class="detail-box">
      <view class="detail-item">
        <text class="name">回收类型</text>
        <text class="val">{{ switchRecycleTypeName(orderDetail.recycle_type) }}</text>
      </view>
      <view class="detail-item">
        <text class="name">预估重量</text>
        <text class="val">{{ orderDetail.weight }}</text>
      </view>
      <view class="detail-item">
        <text class="name">实际重量</text>
        <text class="val">{{ orderDetail.real_weight }}</text>
      </view>
      <view class="detail-item reward-item">
        <text class="name">获得奖励</text>
        <view class="val flex-center-end">
          <text>{{ orderDetail.reward }}</text>
          <icon class="reward-icon" :class="[orderDetail.reward_type]"></icon>
        </view>
      </view>
      <view class="detail-item address-item">
        <text class="name">回收人员</text>
        <text class="val">{{ orderDetail.recycle_worker }}</text>
      </view>
    </view>
    <view class="detail-box">
      <view class="detail-item">
        <text class="name">订单号</text>
        <view class="val flex-center-end" @click="copy">
          <text>{{ orderDetail.order_id }}</text>
          <icon class="copy-icon"></icon>
        </view>
      </view>
      <view class="detail-item">
        <text class="name">下单时间</text>
        <text class="val">{{ orderDetail.order_time }}</text>
      </view>
    </view>
    <!-- 活动banner -->
    <view class="activity-banner" @click="linkActivity">
      <image class="image" src="../../static/icon/activity4.jpg" mode="aspectFit"></image>
    </view>
    <!-- 底部操作按钮 -->
    <view class="operate-box flex">
      <text class="btn reorder-btn flex-center-center flex-1" @click.stop="linkOrder">再下一单</text>
      <text
        v-if="orderDetail.order_status !== 4"
        class="btn evaluate-btn flex-center-center flex-1"
        @click.stop="evaluate"
        >去评价</text
      >
    </view>

    <dui-toast ref="toast"></dui-toast>
  </view>
</template>

<script setup>
import { ref, computed } from "vue";
import { switchRecycleTypeName } from "@/utils/switch.js";

const toast = ref(null);
let stepsList = [
  {
    title: "待取件",
  },
  {
    title: "进行中",
  },
  {
    title: "已完成",
  },
  {
    title: "待评价",
  },
];

const orderDetail = ref({
  order_status: 1,
  order_id: "y79998686cs7020392",
  order_time: "2024-12-25 12:00",
  appoint_time: "2024-12-25 15:00-17:00",
  recycle_type: "books",
  weight: "5-10本",
  real_weight: "5本",
  recycle_worker: "李师傅",
  contact_info: "李二三 13612345678",
  address: "广东省广州市天河区xxx路xxx215号",
  reward_type: "cash",
  reward: "5.5元",
});

const stepsActive = computed(() => {
  return orderDetail.value.order_status;
});

const copy = () => {
  uni.setClipboardData({
    data: orderDetail.order_id,
    showToast: false,
    success: function () {
      // #ifdef MP-WEIXIN
      wx.showToast({
        title: "复制成功！",
        icon: "none",
      });
      // #endif
      // #ifndef MP-WEIXIN
      toast.value.showToast("复制成功！");
      // #endif
    },
  });
};

const linkActivity = () => {
  toast.value.showToast("mock数据模拟活动广告");
};

const linkOrder = () => {
  uni.navigateTo({
    url: `/pages/order/index?type=${orderDetail.value.recycle_type}`,
  });
};

const evaluate = () => {
  uni.navigateTo({
    url: `/pages/order/evaluate?order_id=${orderDetail.value.order_id}`,
  });
};
</script>

<style lang="scss" scoped>
.order-detail-wrapper {
  padding: 20rpx;
  font-size: 28rpx;
  .steps-box {
    padding: 20rpx 0 30rpx;
    margin-bottom: 10rpx;
    background-color: #fff;
    border-radius: 15rpx;
  }
  .detail-box {
    padding: 30rpx;
    margin-bottom: 10rpx;
    border-radius: 15rpx;
    background-color: #fff;
    .detail-item {
      display: flex;
      align-items: center;
      margin-bottom: 20rpx;
      justify-content: space-between;
      &:last-child {
        margin-bottom: 0;
      }
      &.address-item {
        align-items: flex-start;
      }
      &.reward-item {
        .val {
          color: #ff9f03;
        }
      }
    }
    .name {
      width: 136rpx;
      color: #888;
    }
    .val {
      flex: 1;
      text-align: right;
      color: #333;
      .reward-icon {
        width: 35rpx;
        height: 35rpx;
        margin-left: 5rpx;
        &.cash {
          background: url("../../static/icon/red-package.png") no-repeat center/contain;
        }
        &.beans {
          background: url("../../static/icon/beans.png") no-repeat center/contain;
        }
      }
      .copy-icon {
        width: 24rpx;
        height: 24rpx;
        margin-left: 10rpx;
        background: url("~@/static/icon/copy.png") no-repeat center/contain;
      }
    }
  }
  .activity-banner {
    position: relative;
    width: 100%;
    height: 223rpx;
    margin-top: 20rpx;
    border-radius: 15rpx;
    &::before {
      position: absolute;
      content: "活动";
      width: 70rpx;
      text-align: center;
      line-height: 35rpx;
      font-size: 20rpx;
      color: #fff;
      border-radius: 15rpx 0 50rpx 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1;
    }
    .image {
      width: 100%;
      height: 100%;
      border-radius: inherit;
    }
  }
  .operate-box {
    position: fixed;
    bottom: 30rpx;
    left: 20rpx;
    right: 20rpx;
    .btn {
      color: #333;
      height: 70rpx;
      font-size: 24rpx;
      border-radius: 39rpx;
      background-color: #ffc903;
      &.reorder-btn {
        width: 140rpx;
        margin-left: 20rpx;
      }
      &.evaluate-btn {
        width: 120rpx;
        margin-left: 20rpx;
        font-weight: bold;
      }
    }
  }
}
</style>
