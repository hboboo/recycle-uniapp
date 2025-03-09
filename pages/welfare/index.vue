<template>
  <view class="welfare-wrapper">
    <view class="welfare-banner">
      <image class="image" src="../../static/icon/welfare-banner.jpg" mode="aspectFill"></image>
      <view class="top-info">
        <!-- 回收豆 -->
        <view class="recycle-beans flex-center-center">
          <text class="num">{{ recycleBeans }}</text>
          <icon class="beans-icon"></icon>
        </view>
        <!-- 签到 -->
        <view class="sign-block">
          <view class="sign-info flex-center-between">
            <text>
              我的回收豆:
              <text class="count">{{ recycleBeans }}</text>
            </text>
            <text>
              连续签到
              <text class="count">{{ signDay }}</text>
              天
            </text>
          </view>
          <view class="sign-box flex-center-between">
            <view class="sign-item flex-center flex-column" v-for="item in signList" :key="item.id">
              <text>+{{ item.reward }}</text>
              <icon class="beans-icon"></icon>
              <icon v-if="item.is_sign" class="correct-icon"></icon>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 商城 -->
    <view class="shop-block">
      <view class="menu">
        <uv-tabs :list="menuList" @click="handleTabClick" lineColor="#ffc904"></uv-tabs>
      </view>
      <!-- 商城列表 -->
      <view class="shop-list flex-start-between flex-wrap">
        <view class="goods-item" v-for="goods in goodsList" :key="goods.id" @click="linkDetail(goods.id)">
          <view class="goods-pic">
            <icon class="post-icon"></icon>
            <image class="image" :src="goods.pic" mode=""></image>
          </view>
          <view class="goods-info">
            <view class="goods-title text-overflow">
              {{ goods.title }}
            </view>
            <view class="goods-price flex-center-between">
              <text>￥{{ goods.price }}</text>
              <text class="tip">可使用回收豆抵扣</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from "vue";
const recycleBeans = ref("300");
const signDay = ref(1);

const signList = reactive([
  {
    id: 1,
    reward: 1,
    is_sign: true,
  },
  {
    id: 2,
    reward: 1,
  },
  {
    id: 3,
    reward: 2,
  },
  {
    id: 4,
    reward: 2,
  },
  {
    id: 5,
    reward: 2,
  },
  {
    id: 6,
    reward: 2,
  },
  {
    id: 7,
    reward: 5,
  },
]);
const menuList = [
  {
    id: 1,
    name: "全部",
  },
  {
    id: 2,
    name: "零食",
  },
  {
    id: 3,
    name: "百货",
  },
  {
    id: 4,
    name: "电影票",
  },
  {
    id: 5,
    name: "话费",
  },
  {
    id: 6,
    name: "公益",
  },
  {
    id: 7,
    name: "其他",
  },
  {
    id: 8,
    name: "其他",
  },
];
const goodsList = reactive([
  {
    id: 1,
    title: "超级大大电饭煲家用电饭煲",
    price: 9.9,
    pic: "/static/icon/goods2.png",
  },
  {
    id: 2,
    title: "超级大大电饭煲家用电饭煲",
    price: 18.9,
    pic: "/static/icon/goods2.png",
  },
  {
    id: 3,
    title: "超级大大电饭煲家用电饭煲",
    price: 18.9,
    pic: "/static/icon/goods2.png",
  },
  {
    id: 4,
    title: "超级大大电饭煲家用电饭煲",
    price: 18.9,
    pic: "/static/icon/goods2.png",
  },
  {
    id: 5,
    title: "超级大大电饭煲家用电饭煲",
    price: 18.9,
    pic: "/static/icon/goods2.png",
  },
  {
    id: 6,
    title: "超级大大电饭煲家用电饭煲",
    price: 18.9,
    pic: "/static/icon/goods2.png",
  },
]);

// 点击tab
const handleTabClick = (index) => {
  console.log(index);
  // 根据index请求后端获取对应的商品列表
};

const linkDetail = (id) => {
  uni.navigateTo({
    url: `/pages/welfare/goods-detail/goods-detail?id=${id}`,
  });
};
</script>

<style lang="scss" scoped>
.welfare-banner {
  width: 100%;
  height: 280rpx;
  margin-bottom: 190rpx;
  .image {
    width: 100%;
    height: 100%;
  }
  .beans-icon {
    width: 40rpx;
    height: 40rpx;
    background: url("../../static/icon/beans.png?a=1") no-repeat center/contain;
  }
  .top-info {
    position: absolute;
    top: 0;
    left: 30rpx;
    right: 30rpx;
    .recycle-beans {
      position: relative;
      width: 150rpx;
      height: 150rpx;
      margin: 0 auto;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.5);
      animation: slide 1s ease infinite alternate-reverse;
      .num {
        font-size: 38rpx;
      }
    }
    //签到
    .sign-block {
      padding: 28rpx 25rpx;
      margin-top: 60rpx;
      background-color: #fff;
      border-radius: 10rpx;
      box-shadow: 0 0 6rpx #f0f0f0;
      .sign-info {
        margin-bottom: 20rpx;
        color: #333;
        font-size: 28rpx;
        .count {
          padding: 0 8rpx;
          color: #ffb700;
          font-weight: bold;
          font-size: 32rpx;
        }
      }
      .sign-box {
        .sign-item {
          position: relative;
          width: 80rpx;
          padding: 20rpx 0;
          font-size: 24rpx;
          background-color: #f5f5f5;
          border-radius: 8rpx;
          .correct-icon {
            position: absolute;
            top: 0;
            left: 0;
            width: 26rpx;
            height: 26rpx;
            border-radius: 3rpx 0 25rpx 0;
            background: #3eff96 url("../../static/icon/correct.png") no-repeat center/contain;
            background-size: 18rpx;
          }
        }
        .beans-icon {
          width: 36rpx;
          height: 36rpx;
          margin-top: 10rpx;
        }
      }
    }
  }
}
//商城
.shop-block {
  padding: 0 30rpx;
  .menu {
    margin-bottom: 20rpx;
    white-space: nowrap;
    overflow-x: auto;
    background-color: #fff;
    border-radius: 10rpx;
  }
}
.shop-list {
  .goods-item {
    width: 48.2%;
    margin-bottom: 26rpx;
    border-radius: 10rpx;
    background-color: #fff;
    .goods-pic {
      position: relative;
      width: 100%;
      height: 360rpx;
      .post-icon {
        position: absolute;
        bottom: 10rpx;
        right: 10rpx;
        width: 40rpx;
        height: 40rpx;
        z-index: 1;
        background: url("../../static/icon/post.png") no-repeat center/contain;
      }
      .image {
        width: 100%;
        height: 100%;
        border-radius: 10rpx 10rpx 0 0;
      }
    }
    .goods-info {
      padding: 20rpx;
      font-size: 28rpx;
      color: #333;
      .goods-title {
        margin-bottom: 6rpx;
      }
      .goods-price {
        color: #f40;
        font-weight: bold;
        .tip {
          font-size: 18rpx;
          color: #999;
        }
      }
    }
  }
}

@keyframes slide {
  100% {
    transform: translateY(20rpx);
  }
}
</style>
