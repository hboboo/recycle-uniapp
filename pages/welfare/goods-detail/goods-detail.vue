<template>
  <view class="goods-details-wrapper">
    <swiper class="swiper" circular :indicator-dots="true" :autoplay="false" :interval="2000" :duration="500">
      <swiper-item v-for="item in goodsDetail.pic" :key="item">
        <view class="swiper-item">
          <image class="image" src="@/static/icon/goods2.png" mode="aspectFill"></image>
        </view>
      </swiper-item>
    </swiper>
    <view class="content">
      <view class="price-box flex-center-between">
        <view>
          <text class="price">￥{{ goodsDetail.price }}</text>
          <text class="sales">已兑换{{ goodsDetail.sales }}</text>
        </view>
        <view class="beans"> 回收豆可抵扣5.5元 </view>
      </view>
      <view class="title"> 超级大大电饭煲家用电饭煲多功能节能 </view>
      <view class="inventory flex-center-between">
        <text>包邮</text>
        <text>3天内发货</text>
        <text>库存：20</text>
      </view>
      <view class="detail">
        <view class="detail-tit"> 商品说明 </view>
        <view class="detail-desc">
          这款电饭煲采用先进的智能温控技术，能够精准调节烹饪温度，确保米饭口感软糯香甜。内胆选用高品质不粘涂层，耐用且易清洗，让每一次煮饭都省心省力。无论是蒸煮白米饭还是煲汤，它都能轻松胜任，满足全家人的多样化需求。
        </view>
        <view class="detail-desc">
          独特的外观设计搭配现代简约风格，让这款电饭煲成为厨房中的一道亮丽风景线。它还配备了24小时预约功能，只需提前设置，回家即可享用热腾腾的美食。节能环保的运行模式，既实用又贴心，是现代家庭不可或缺的烹饪助手。
        </view>
        <image class="image" src="@/static/icon/goods2.png" mode="aspectFill"></image>
      </view>
    </view>
    <view class="bottom-btn flex-center-between">
      <view class="service-btn btn flex-center-center flex-1" @click="linkService">
        <text>客服</text>
        <icon class="service-icon"></icon>
      </view>
      <view class="exchange-btn btn flex-center-center" @click="exchange"> 立即兑换 </view>
    </view>
    <dui-toast ref="toast"></dui-toast>
  </view>
</template>

<script setup>
import { ref } from "vue";

const goodsDetail = ref({
  pic: ["https://xxx1", "https://xxx2", "https://xxx3"],
  price: "20.5",
  sales: 200,
});

const linkService = () => {
  uni.navigateTo({
    url: "/pages/user/online-service/online-service",
  });
};

const toast = ref(null);
const exchange = () => {
  toast.value.showToast({
    content: "兑换成功",
  });
};
</script>

<style lang="scss" scoped>
.goods-details-wrapper {
  padding-bottom: 15rpx;
  .swiper {
    height: 410rpx;
  }
  .swiper-item {
    display: block;
    height: 100%;
    text-align: center;
    .image {
      width: 100%;
      height: 100%;
    }
  }
}
.content {
  padding: 20rpx 30rpx;
  color: #4f3b00;
  background-color: #fff;
  .price-box {
    margin-bottom: 22rpx;
    color: #f40;
    .price {
      margin-right: 20rpx;
      font-size: 35rpx;
      font-weight: bold;
    }
    .sales {
      font-size: 24rpx;
    }
    .beans {
      padding: 4rpx 10rpx;
      font-size: 22rpx;
      border-radius: 4rpx;
      background-color: #ffe3d8;
    }
  }
  .title {
    margin-bottom: 20rpx;
  }
  .inventory {
    margin-bottom: 20rpx;
    font-size: 24rpx;
    color: #888;
  }
  .detail {
    .detail-tit {
      padding-bottom: 20rpx;
      margin-bottom: 20rpx;
      font-size: 30rpx;
      border-bottom: 1rpx solid #f7f7f7;
    }
    .detail-desc {
      font-size: 28rpx;
      line-height: 2;
      color: #555;
      text-indent: 2em;
    }
    .image {
      width: 100%;
    }
  }
}

.bottom-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15rpx 30rpx;
  font-size: 28rpx;
  border-top: 2rpx solid #eee;
  background-color: #fff;
  .btn {
    height: 75rpx;
    border-radius: 10rpx;
  }
  .service-btn {
    margin-right: 16rpx;
    background-color: #ffc903;
    .service-icon {
      width: 30rpx;
      height: 30rpx;
      background: url("~@/static/icon/service.png") no-repeat center/contain;
    }
  }
  .exchange-btn {
    width: 78%;
    color: #fff;
    background-color: #f40;
  }
}
</style>
