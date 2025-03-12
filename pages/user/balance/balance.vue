<template>
  <view class="balance-wrapper">
    <view class="balance-banner">
      <image class="image" src="../../../static/icon/balance-banner.jpg"></image>
    </view>
    <view class="top-box">
      <view class="balance flex-end-between">
        <view class="flex-center-center flex-column">
          <view class="unit flex-center">
            <text>余额(元)</text>
            <icon class="question-icon" @click="questionPop = true"></icon>
          </view>
          <text class="balance-num">0.01</text>
        </view>
        <text class="tx-btn flex-center-center" @click="withdrawCash">提现</text>
      </view>
      <view class="tab-tit flex-center">
        <text>余额明细</text>
        <icon class="details-icon"></icon>
      </view>
      <!-- 明细分类tab -->
      <view class="tab flex-center-between">
        <view
          class="tab-item flex-center-center flex-1"
          :class="{ active: tabActiveInd == index }"
          v-for="(item, index) in tabList"
          :key="index"
          @click="tabActiveInd = index"
        >
          {{ item }}
        </view>
      </view>
    </view>
    <!-- 余额明细 -->
    <view class="balance-detail-list">
      <view class="balance-detail-item flex-center-between" v-for="item in balanceDetailList" :key="item.id">
        <view class="flex flex-column">
          <text class="type">{{
            item.type == "withdraw-cash" ? "余额提现" : "回收" + switchRecycleTypeName(item.type)
          }}</text>
          <text class="time">{{ item.time }}</text>
        </view>
        <text class="money">{{ item.money }}元</text>
      </view>
      <empty v-if="!balanceDetailList.length"></empty>
    </view>
    <!-- 弹窗 -->
    <balance-question v-model="questionPop"></balance-question>
    <dui-toast ref="toast"></dui-toast>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { switchRecycleTypeName } from "@/utils/switch.js";

// 明细分类tab
const tabList = ref(["全部", "收入", "支出"]);
const tabActiveInd = ref(0);

// 余额明细
const balanceDetailList = ref([
  {
    id: 1,
    money: "+5.50",
    type: "clothes",
    time: "2024-12-30",
  },
  {
    id: 2,
    money: "+3.50",
    type: "books",
    time: "2024-12-30",
  },
  {
    id: 3,
    money: "-10.00",
    type: "withdraw-cash",
    time: "2024-12-31",
  },
  {
    id: 4,
    money: "-10.00",
    type: "withdraw-cash",
    time: "2024-12-31",
  },
  {
    id: 5,
    money: "+3.50",
    type: "books",
    time: "2024-12-30",
  },
]);

// 余额问题弹窗
const questionPop = ref(false);

// 提现
const toast = ref(null);
const withdrawCash = () => {
  //请求后端
  toast.value.showToast("提现成功，300万已到账！");
};
</script>

<style lang="scss" scoped>
.balance-banner {
  width: 100%;
  height: 280rpx;
  .image {
    width: 100%;
    height: 100%;
  }
}
.top-box {
  position: absolute;
  top: 30rpx;
  left: 50rpx;
  right: 50rpx;
  .balance {
    position: relative;
    margin-bottom: 50rpx;
    .unit {
      margin-bottom: 10rpx;
      font-size: 28rpx;
      .question-icon {
        width: 33rpx;
        height: 33rpx;
        margin-left: 6rpx;
        background: url("~@/static/icon/question1.png") no-repeat center/contain;
      }
    }
    .balance-num {
      font-size: 48rpx;
    }
    .tx-btn {
      width: 120rpx;
      height: 50rpx;
      font-size: 24rpx;
      border-radius: 45rpx;
      color: #674f00;
      background-color: #fff;
    }
  }
  .tab-tit {
    margin-bottom: 10rpx;
    font-size: 28rpx;
    .details-icon {
      width: 30rpx;
      height: 30rpx;
      margin-left: 6rpx;
      background: url("~@/static/icon/details.png") no-repeat center/contain;
    }
  }
  .tab {
    font-size: 30rpx;
    background-color: #fff;
    border-radius: 10rpx 40rpx 10rpx 40rpx;
    border-radius: 15rpx 15rpx 0 0;
    .tab-item {
      position: relative;
      padding: 30rpx 0;
      &.active {
        font-weight: bold;
        &::after {
          position: absolute;
          content: "";
          bottom: 20rpx;
          left: 50%;
          width: 50rpx;
          height: 4rpx;
          background-color: #ffc903;
          transform: translateX(-50%);
        }
      }
    }
  }
}
.balance-detail-list {
  padding: 35rpx 30rpx;
  margin: 64rpx 50rpx 30rpx;
  border-radius: 0 0 15rpx 15rpx;
  background-color: #fff;
  .balance-detail-item {
    margin-bottom: 32rpx;
    font-size: 28rpx;
    &:last-child {
      margin-bottom: 0;
    }
    .type {
      margin-bottom: 10rpx;
      color: #333;
    }
    .money {
      color: #ff9a03;
      font-size: 32rpx;
    }
    .time {
      color: #999;
      font-size: 24rpx;
    }
  }
}
</style>
