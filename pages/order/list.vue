<template>
  <view class="order-list-wrapper">
    <!-- 菜单 -->
    <view class="order-status-tab flex-center">
      <view
        class="order-status-tab-item flex-center-center flex-1"
        :class="{ active: orderStatusActiveInd == index }"
        v-for="(item, index) in orderStatusTab"
        :key="item.status"
        @click="switchTab(index)"
      >
        {{ item.status_name }}
      </view>
    </view>
    <!-- 订单列表 -->
    <view class="order-list">
      <view class="order-item" v-for="item in orderList" :key="item.id" @click="linkOrderDetail(item.id)">
        <view class="order-status flex-center" @click.stop="copy(item.order_id)">
          <text class="order">订单号：{{ item.order_id }}</text>
          <icon class="copy-icon"></icon>
          <text class="status" :style="[setStatusStyle(item.order_status)]">{{
            getOrderStatusName(item.order_status)
          }}</text>
        </view>
        <view class="recycle-type">
          <text class="tit">回收类型：</text><text>{{ switchRecycleTypeName(item.recycle_type) }}</text>
        </view>
        <view class="real-recycle-weight">
          <text class="tit">实际重量：</text><text>{{ item.real_weight }}</text>
        </view>
        <view class="recycle-worker flex-center">
          <text class="tit">回收人员：</text>
          <text>{{ item.recycle_worker }}</text>
        </view>
        <view class="operate-box flex-center-end">
          <text class="order-detail flex-center-center" @click="linkOrderDetail(item.order_id)">订单详情</text>
          <text class="reorder flex-center-center" @click.stop="linkOrder(item.recycle_type)">再下一单</text>
          <text v-if="item.order_status == 4" class="evaluate flex-center-center" @click.stop="evaluate(item.order_id)"
            >去评价</text
          >
        </view>
      </view>
    </view>
    <view class="empty-box">
      <empty v-if="!orderList.length"></empty>
    </view>
    <dui-toast ref="toast"></dui-toast>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { switchRecycleTypeName } from "@/utils/switch.js";

// 顶部订单状态列表
const orderStatusActiveInd = ref(0);
const orderStatusTab = [
  {
    status: 0,
    status_name: "全部",
  },
  {
    status: 1,
    status_name: "待取件",
  },
  {
    status: 2,
    status_name: "进行中",
  },
  {
    status: 3,
    status_name: "已完成",
  },
  {
    status: 4,
    status_name: "待评价",
  },
];

const toast = ref(null);
const switchTab = (index) => {
  orderStatusActiveInd.value = index;
  //
  toast.value.showToast("mock数据模拟渲染~~");
};

// 订单列表数据
const orderList = ref([
  {
    id: 1,
    order_status: 1,
    order_id: "y79758686cs2024391",
    order_time: "2024-12-25",
    recycle_type: "clothes",
    weight: "3-10kg",
    real_weight: "8kg",
    recycle_worker: "李师傅",
  },
  {
    id: 2,
    order_status: 2,
    order_id: "y79998686cs7020392",
    order_time: "2024-12-25",
    recycle_type: "books",
    weight: "5-10本",
    real_weight: "5本",
    recycle_worker: "李师傅",
  },
  {
    id: 3,
    order_status: 3,
    order_id: "y79568686cs2090393",
    order_time: "2024-12-25",
    recycle_type: "home-appliances",
    weight: "洗衣机",
    real_weight: "1台海尔洗衣机",
    recycle_worker: "李师傅",
  },
  {
    id: 4,
    order_status: 4,
    order_id: "y797765686cs202035",
    order_time: "2024-12-25",
    recycle_type: "phone",
    weight: "华为",
    real_weight: "华为mate50",
    recycle_worker: "李师傅",
  },
]);

// 设置订单状态颜色
const setStatusStyle = (order_status) => {
  let color = "";
  switch (+order_status) {
    case 1:
      color = "#f40";
      break;
    case 2:
      color = "#02a353";
      break;
    case 3:
      color = "#02a353";
      break;
    case 4:
      color = "#f5a000";
      break;
  }
  return {
    color,
  };
};

// 获取订单状态名称
const getOrderStatusName = (order_status) => {
  const len = orderStatusTab.length;
  for (let i = 0; i < len; i++) {
    if (orderStatusTab[i].status == order_status) {
      return orderStatusTab[i].status_name;
    }
  }
};

// 复制订单号
const copy = (order_id) => {
  uni.setClipboardData({
    data: order_id,
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

// 跳转订单列表
const linkOrder = (type = "clothes") => {
  uni.navigateTo({
    url: `/pages/order/index?type=${type}`,
  });
};
const linkOrderDetail = (id) => {
  uni.navigateTo({
    url: `/pages/order/detail?order_id=${id}`,
  });
};
const evaluate = (id) => {
  uni.navigateTo({
    url: `/pages/order/evaluate?order_id=${id}`,
  });
};

onLoad((e) => {
  orderStatusActiveInd.value = e.order_status;
});
</script>

<style lang="scss" scoped>
.order-list-wrapper {
  box-sizing: border-box;
  .order-status-tab {
    margin-bottom: 20rpx;
    background-color: #fff;
    .order-status-tab-item {
      height: 80rpx;
      font-size: 28rpx;
      color: #888;
      &.active {
        font-size: 32rpx;
        color: #111;
      }
    }
  }
  .order-list {
    padding: 0 30rpx;
    max-height: calc(100vh - var(--window-top) - 80rpx);
    overflow-x: hidden;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    .order-item {
      padding: 30rpx;
      margin-bottom: 20rpx;
      font-size: 28rpx;
      border-radius: 16rpx;
      background-color: #fff;
      .order-status {
        margin-bottom: 20rpx;
        padding-bottom: 20rpx;
        border-bottom: 1rpx solid #f1f1f1;
        font-size: 24rpx;
        .copy-icon {
          width: 24rpx;
          height: 24rpx;
          margin-left: 10rpx;
          background: url("~@/static/icon/copy.png") no-repeat center/contain;
        }
        .status {
          font-size: 28rpx;
          margin-left: auto;
        }
      }
      .recycle-type,
      .recycle-weight,
      .real-recycle-weight {
        margin-bottom: 20rpx;
      }
      .tit {
        color: #222;
      }
      .operate-box {
        margin-top: 30rpx;
        .order-detail,
        .evaluate,
        .reorder {
          color: #f5a000;
          height: 50rpx;
          font-size: 24rpx;
          border-radius: 39rpx;
          border: 2rpx solid #f5a000;
        }
        .order-detail {
          width: 140rpx;
        }
        .reorder {
          width: 140rpx;
          margin-left: 20rpx;
        }
        .evaluate {
          width: 120rpx;
          margin-left: 20rpx;
          border-color: #ffc903;
          color: #333;
          background-color: #ffc903;
        }
      }
    }
  }
  .empty-box {
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
