<template>
  <view class="evaluate-wrapper">
    <view class="main">
      <!-- 订单信息 -->
      <view class="order-info">
        <view class="order-info-item flex-center">
          <text class="name">回收类型：</text>
          <text class="val">{{ switchRecycleTypeName(orderInfo.recycle_type) }}</text>
        </view>
        <view class="order-info-item flex-center">
          <text class="name">回收重量：</text>
          <text class="val">{{ orderInfo.real_weight }}</text>
        </view>
        <view class="order-info-item flex-center">
          <text class="name">下单时间：</text>
          <text class="val">{{ orderInfo.order_time }}</text>
        </view>
      </view>
      <!-- 评价 -->
      <view class="comment-box">
        <view class="flex-center">
          <text>您对本次服务评价</text>
          <icon class="comment-icon"></icon>
        </view>
        <textarea
          class="textarea"
          v-model="form.comment"
          placeholder="请输入您对本次服务的评价"
          placeholder-class="placeholder"
        />
        <view class="comment-tag">
          <view
            class="comment-tag-item"
            :class="{ active: item.actived }"
            v-for="(item, index) in tagList"
            :key="index"
            @click="selectTag(item)"
          >
            {{ item.name }}
          </view>
        </view>
        <view class="flex-center">
          <text>满意评分&nbsp;&nbsp;</text>
          <uni-rate :max="5" v-model="form.rate" />
        </view>
      </view>
    </view>
    <view class="submit-btn flex-center-center" @click="submit">提交</view>
    <dui-toast ref="toast"></dui-toast>
  </view>
</template>

<script setup>
import { ref, reactive } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { switchRecycleTypeName } from "@/utils/switch.js";

const toast = ref(null);
let order_id = ref(0);
let orderInfo = ref({
  order_time: "2024-12-25 12:00",
  recycle_worker: "李师傅",
  recycle_type: "books",
  weight: "5-10本",
  real_weight: "5本",
});

let tagList = ref([
  {
    id: 1,
    name: "上门速度快",
  },
  {
    id: 2,
    name: "服务态度好",
  },
  {
    id: 3,
    name: "礼貌热情",
  },
  {
    id: 4,
    name: "风雨无阻",
  },
  {
    id: 5,
    name: "超给力",
  },
  {
    id: 6,
    name: "平台超棒",
  },
  {
    id: 6,
    name: "下次再来",
  },
]);

const selectTag = (item) => {
  item.actived = !item.actived;
};

const form = reactive({
  comment: "",
  tag: [],
  rate: 5,
});

const submit = () => {
  console.log("form.comment:", form.comment);
  const params = {
    ...form,
  };
  if (!params.comment) {
    return toast.value.showToast("请输入您对本次服务的评价！");
  }
  toast.value.showToast("提交成功！");
  //
};

onLoad((e) => {
  order_id.value = e.order_id;
  console.log(e);
});
</script>

<style lang="scss" scoped>
.evaluate-wrapper {
  padding: 20rpx 30rpx;
  .main {
    padding: 30rpx;
    border-radius: 15rpx;
    font-size: 28rpx;
    box-sizing: border-box;
    background-color: #fff;
  }
  .order-info {
    padding-bottom: 30rpx;
    margin-bottom: 36rpx;
    border-bottom: 2rpx dashed #eee;
    .order-info-item {
      margin-bottom: 10rpx;
      .name {
        width: 150rpx;
        color: #555;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .comment-box {
    font-size: 28rpx;
    .placeholder {
      font-size: 28rpx;
    }
    .textarea {
      width: 100%;
      padding: 20rpx;
      margin: 15rpx 0 20rpx;
      font-size: 28rpx;
      box-sizing: border-box;
      border-radius: 10rpx;
      background-color: #f7f7f7;
    }
    .comment-icon {
      width: 36rpx;
      height: 36rpx;
      background: url("~@/static/icon/comment.png") no-repeat center/contain;
    }
    .comment-tag {
      margin-bottom: 20rpx;
      .comment-tag-item {
        display: inline-block;
        padding: 6rpx 10rpx;
        margin: 0 15rpx 15rpx 0;
        font-size: 22rpx;
        border-radius: 4rpx;
        background-color: #f7f7f7;
        &.active {
          color: #6c4702;
          background-color: rgb(255, 202, 62);
        }
      }
    }
  }
  .submit-btn {
    position: fixed;
    bottom: 40rpx;
    left: 30rpx;
    right: 30rpx;
    height: 78rpx;
    font-size: 26rpx;
    border-radius: 80rpx;
    background-color: #ffc903;
  }
}
</style>
