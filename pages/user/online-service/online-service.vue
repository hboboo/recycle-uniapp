<template>
  <view class="online-service-wrapper">
    <view class="main">
      <view class="title">
        <view>模拟扫码跳转客服咨询 </view>
        <view class="tip"> 客服在线时间：08:00-21:00 </view>
      </view>
      <view class="qrcode">
        <image class="image" src="@/static/icon/qrcode.png" mode="aspectFit"></image>
      </view>
    </view>
  </view>
</template>

<script setup></script>

<style lang="scss" scoped>
.online-service-wrapper {
  height: calc(100vh - var(--window-top));
  padding: 30rpx;
  box-sizing: border-box;
  background-color: #fff;
  overflow: hidden;
  .main {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, 0);
    .qrcode {
      width: 330rpx;
      height: 330rpx;
      padding: 20rpx;
      box-shadow: 0 0 8rpx #eee;
      border-radius: 10rpx;
      .image {
        width: 100%;
        height: 100%;
      }
    }
    .title {
      margin-bottom: 30rpx;
      font-size: 28rpx;
      text-align: center;
      .tip {
        font-size: 26rpx;
        color: #999;
      }
    }
  }
}
</style>
