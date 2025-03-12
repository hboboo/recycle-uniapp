<template>
  <view class="order-list-wrapper">
    <view class="banner">
      <image class="image" src="../../static/icon/order-banner3.jpg" mode=""></image>
    </view>
    <view class="top-box">
      <!-- 用户基本信息 -->
      <view class="base-info flex-center">
        <view class="avatar">
          <image class="image" src="../../static/icon/avatar1.png" mode="aspectFit"></image>
        </view>
        <view class="flex flex-column">
          <text class="nickname">@huangbo</text>
          <text class="uid">ID:51587031313</text>
        </view>
      </view>
      <!-- 回收资产信息 -->
      <view class="recycle-box">
        <view class="recycle-info flex-center-between">
          <view class="flex-center flex-column">
            <text>回收次数</text>
            <text class="num">2</text>
          </view>
          <view class="flex-center flex-column">
            <text>回收豆</text>
            <text class="num">300</text>
          </view>
          <view class="flex-center flex-column">
            <text>现金(元)</text>
            <text class="num">5.5</text>
          </view>
        </view>
      </view>
      <!-- 我的订单 -->
      <view class="order-box">
        <view class="flex-center title" @click="linkOrder(0)">
          <text>我的订单</text>
          <text class="all">全部</text>
          <icon class="r-icon"></icon>
        </view>
        <view class="order-status-list flex-center-between">
          <view
            class="order-status-item flex-center flex-column"
            v-for="item in orderStatusList"
            :key="item.status"
            @click="linkOrder(item.status)"
          >
            <image class="icon" :src="item.icon" mode="aspectFit"></image>
            <text>{{ item.status_name }}</text>
          </view>
        </view>
      </view>
    </view>
    <!-- 其他服务 -->
    <view class="other-service-box">
      <view class="flex-center title">
        <text>其他服务</text>
      </view>
      <view class="other-service-list">
        <view
          class="other-service-item flex-center flex-column"
          v-for="(item, index) in otherServiceList"
          :key="index"
          @click="linkOther(item.type)"
        >
          <image class="icon" :src="item.icon" mode="aspectFit"></image>
          <text>{{ item.name }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { reactive } from "vue";

// 订单状态列表
const orderStatusList = reactive([
  {
    status: 1,
    count: 1,
    status_name: "待取件",
    icon: "../../static/icon/await-door.png",
  },
  {
    status: 2,
    count: 0,
    status_name: "进行中",
    icon: "../../static/icon/dooring.png",
  },
  {
    status: 3,
    count: 0,
    status_name: "已完成",
    icon: "../../static/icon/finish.png",
  },
  {
    status: 4,
    count: 0,
    status_name: "待评价",
    icon: "../../static/icon/await-comment.png",
  },
]);
// 其他服务列表
const otherServiceList = reactive([
  {
    type: "withdraw-cash",
    name: "现金提现",
    icon: "../../static/icon/withdraw-cash.png",
  },
  {
    type: "exchange",
    name: "回收豆兑换",
    icon: "../../static/icon/recharge.png",
  },
  {
    type: "address-manage",
    name: "地址管理",
    icon: "../../static/icon/address2.png",
  },
  {
    type: "common-question",
    name: "常见问题",
    icon: "../../static/icon/question.png",
  },
  {
    type: "online-service",
    name: "在线客服",
    icon: "../../static/icon/service.png",
  },
  {
    type: "suggestion-feedback",
    name: "建议反馈",
    icon: "../../static/icon/feedback.png",
  },
  {
    type: "setting",
    name: "设置",
    icon: "../../static/icon/setting.png",
  },
]);

const linkOrder = (status) => {
  uni.navigateTo({
    url: `/pages/order/list?order_status=${status}`,
  });
};

const linkOther = (type) => {
  let url = "";
  switch (type) {
    case "withdraw-cash":
      url = `/pages/user/balance/balance`;
      break;
    case "exchange":
      exchangePop.value = true;
      break;
    case "address-manage":
      url = "/pages/user/address/address";
      break;
    case "common-question":
      url = "/pages/user/common-question/common-question";
      break;
    case "online-service":
      url = "/pages/user/online-service/online-service";
      break;
    case "suggestion-feedback":
      url = "/pages/user/suggestion-feedback/suggestion-feedback";
      break;
    case "setting":
      url = "/pages/user/setting/setting";
      break;
    default:
      break;
  }
  if (url) {
    uni.navigateTo({
      url,
    });
  }
};
</script>

<style lang="scss" scoped>
.order-list-wrapper {
  .banner {
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
    left: 30rpx;
    right: 30rpx;
    .base-info {
      margin-bottom: 40rpx;
      .avatar {
        width: 110rpx;
        height: 110rpx;
        margin-right: 20rpx;
        .image {
          width: 100%;
          height: 100%;
        }
      }
      .nickname {
        margin-bottom: 6rpx;
        font-size: 30rpx;
      }
      .uid {
        font-size: 26rpx;
        color: #795c2e;
      }
    }
    .recycle-box {
      width: 100%;
      padding: 35rpx 43rpx;
      margin-bottom: 20rpx;
      box-sizing: border-box;
      border-radius: 60rpx 16rpx 60rpx 16rpx;
      background-color: #fff;
      box-shadow: 4rpx 4rpx 20rpx #fff0d2;
      .recycle-info {
        padding: 0 24rpx;
        font-size: 26rpx;
        .num {
          margin-top: 10rpx;
          font-size: 38rpx;
          color: #ffa10a;
        }
      }
    }
    .order-box {
      width: 100%;
      padding: 30rpx 43rpx;
      font-size: 30rpx;
      box-sizing: border-box;
      border-radius: 16rpx;
      background-color: #fff;
      .title {
        padding-bottom: 30rpx;
        border-bottom: 1rpx solid #eee;
      }
      .all {
        margin-left: auto;
        color: #999;
        font-size: 26rpx;
      }
      .r-icon {
        width: 30rpx;
        height: 30rpx;
        background: url("~@/static/icon/r-arrow.png") no-repeat center/contain;
      }
      .order-status-list {
        margin-top: 26rpx;
        .order-status-item {
          font-size: 24rpx;
          .icon {
            width: 45rpx;
            height: 45rpx;
            margin-bottom: 10rpx;
          }
        }
      }
    }
  }
  .other-service-box {
    padding: 30rpx 0;
    margin: 350rpx 30rpx 0;
    font-size: 30rpx;
    box-sizing: border-box;
    border-radius: 16rpx;
    background-color: #fff;
    .title {
      padding: 0 43rpx;
      margin-bottom: 8rpx;
    }
    .other-service-list {
      display: grid;
      width: 100%;
      row-gap: 36rpx;
      grid-template-columns: repeat(4, 1fr);
      margin-top: 26rpx;
      .other-service-item {
        font-size: 24rpx;
        .icon {
          width: 45rpx;
          height: 45rpx;
          margin-bottom: 10rpx;
        }
      }
    }
  }
}
</style>
