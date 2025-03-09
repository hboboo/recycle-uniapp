<template>
  <view class="index-wrapper">
    <view class="banner flex"></view>
    <view class="top-box">
      <!-- 轮播 -->
      <swiper class="swiper" circular vertical :autoplay="true" :interval="2500" :duration="600">
        <swiper-item class="swiper-item flex-center" v-for="(item, index) in swiperList" :key="index">
          <view class="notice flex-center">
            <image class="avatar-icon" :src="item.avatar" mode="aspectFill"></image>
            <text>{{ item.nickname }}</text>
            <text class="type">{{ item.type_name }}</text>
            回收成功
            <text class="time">{{ item.time }}</text>
          </view>
        </swiper-item>
      </swiper>

      <!-- 旧衣回收分类 -->
      <view class="clothing-block">
        <view class="clothing-classify flex-center-between">
          <view
            class="classify-item flex-center flex-column"
            v-for="item in clothingClassifyList"
            :key="item.name"
            @click="linkOrder(item)"
          >
            <image class="icon" :src="item.icon" mode="aspectFit"></image>
            <text class="name">{{ item.name }}</text>
          </view>
        </view>
        <image src="/static/icon/banner2.jpg" class="rec-banner" mode="aspectFill" @click="linkOrder()"></image>
      </view>
    </view>
    <view class="main-block">
      <!-- 所有回收类别 -->
      <view class="recycle-classify flex-center-between">
        <view
          class="classify-item flex-center flex-column"
          v-for="item in recyleClassifyList"
          :key="item.name"
          @click="linkOrder(item)"
        >
          <image class="icon" :src="item.icon" mode="aspectFit"></image>
          <text class="name">{{ item.name }}</text>
        </view>
      </view>

      <!-- 热门活动 -->
      <view class="hot-activity bottom-block">
        <view class="title">热门活动</view>
        <view class="flex-center-between">
          <view class="hot-activity-item" @click="activityClick">
            <image class="image" src="../../static/icon/activity2.jpg" mode="aspectFill"></image>
          </view>
          <view class="hot-activity-item" @click="activityClick">
            <image class="image" src="../../static/icon/activity2.jpg" mode="aspectFill"></image>
          </view>
        </view>
      </view>

      <!-- 更多精彩 -->
      <view class="more-activity bottom-block">
        <view class="title">更多精彩</view>
        <view class="activity-list flex-center-between flex-wrap">
          <view class="activity-item" v-for="(item, index) in activityList" :key="index" @click="activityClick">
            <image class="image" :src="item.image" mode="aspectFill"></image>
          </view>
        </view>
      </view>

      <!-- 常见问题 -->
      <view class="common-question bottom-block">
        <view class="title flex-center-between">
          <text>常见问题</text>
          <icon class="update-icon" @click="changeQuestion"></icon>
        </view>
        <view class="question-list flex-center-between flex-wrap">
          <view class="question-item" v-for="(item, index) in questionList" :key="item.id">
            <view class="question">
              {{ index + 1 + "、" + item.question }}
            </view>
            <view class="answer">
              {{ item.answer }}
            </view>
          </view>
        </view>
      </view>
    </view>

    <dui-toast ref="toast"></dui-toast>
  </view>
</template>

<script setup>
import { ref, reactive } from "vue";

//轮播图
const swiperList = [
  {
    nickname: "从前有座山",
    avatar: "/static/icon/avatar.png",
    type: "clothes",
    type_name: "旧衣物",
    time: "2024-11-15 00:00",
  },
  {
    nickname: "今天又是老八出局",
    avatar: "/static/icon/avatar.png",
    type: "books",
    type_name: "书籍",
    time: "2024-11-15 00:00",
  },
  {
    nickname: "急急急急急急",
    avatar: "/static/icon/avatar.png",
    type: "clothes",
    type_name: "旧衣物",
    time: "2024-11-15 00:00",
  },
];
//顶部旧衣服分类
const clothingClassifyList = reactive([
  {
    type: "clothes",
    name: "四季衣物",
    icon: "/static/icon/clothes.png",
  },
  {
    type: "clothes",
    name: "鞋靴旧包",
    icon: "/static/icon/shoes1.png",
  },
  {
    type: "clothes",
    name: "围巾帽子",
    icon: "/static/icon/hat.png",
  },
  {
    type: "clothes",
    name: "床单被套",
    icon: "/static/icon/bed-sheet.png",
  },
  {
    type: "clothes",
    name: "毛绒玩具",
    icon: "/static/icon/toy.png",
  },
]);
//所有回收类别
const recyleClassifyList = reactive([
  {
    type: "clothes",
    name: "旧衣回收",
    icon: "/static/icon/clothes.png",
  },
  {
    type: "clothes",
    name: "毛绒玩具",
    icon: "/static/icon/toy.png",
  },
  {
    type: "books",
    name: "书籍回收",
    icon: "/static/icon/book.png",
  },
  {
    type: "home-appliances",
    name: "家电回收",
    icon: "/static/icon/household-appliances.png",
  },
  {
    type: "phone",
    name: "手机平板",
    icon: "/static/icon/mobile.png",
  },
]);
//更多精彩活动
const activityList = [
  {
    id: 1,
    image: "../../static/icon/activity2.jpg",
  },
  {
    id: 2,
    image: "../../static/icon/activity.jpg",
  },
  {
    id: 3,
    image: "../../static/icon/activity2.jpg",
  },
  {
    id: 4,
    image: "../../static/icon/activity3.jpg",
  },
];
//常见问题
let questionList = ref([
  {
    id: 1,
    question: "回收后可以获得那些奖励？",
    answer: "衣物回收：五公斤起，回收后可以获得红包奖励。书籍回收...",
  },
  {
    id: 2,
    question: "回收后可以获得那些奖励？",
    answer: "衣物回收：五公斤起，回收后可以获得红包奖励。书籍回收...",
  },
  {
    id: 3,
    question: "回收后可以获得那些奖励？",
    answer: "衣物回收：五公斤起，回收后可以获得红包奖励。书籍回收...",
  },
]);
const changeQuestion = () => {
  questionList.value = [
    {
      id: 4,
      question: "参与回收需要准备什么？",
      answer: "您需要准备好待回收的物品（如衣物或书籍），确保物品干净并打包好，方便回收人员取件。",
    },
    {
      id: 5,
      question: "不支持上门回收的城市怎么办？",
      answer: "如果您所在城市暂不支持上门回收，可以选择附近的回收站点寄送，或联系客服咨询其他解决方案。",
    },
    {
      id: 6,
      question: "回收的物品有哪些要求？",
      answer: "衣物需干净、无严重破损；书籍需完整、无缺页。具体要求可参考平台回收指南。",
    },
  ];
};

const linkOrder = (item) => {
  const type = item ? item.type : "clothes";
  uni.navigateTo({
    url: `/pages/order/index?type=${type}`,
  });
};

const toast = ref(null);
const activityClick = () => {
  toast.value.showToast({
    content: "活动模块非核心功能，根据需求自定义补充！",
  });
};
</script>

<style lang="scss">
.index-wrapper {
  padding-bottom: 10rpx;
}
.banner {
  width: 100%;
  height: 260rpx;
  margin-bottom: 245rpx;
  background-color: #ffc903;
  background: url("/static/icon/banner1.png") no-repeat center/cover;
}
.top-box {
  position: absolute;
  top: 30rpx;
  left: 30rpx;
  right: 30rpx;
  color: #333;
}
// 轮播
.swiper {
  width: 100%;
  height: 50rpx;
  margin-bottom: 20rpx;
  .swiper-item {
    width: 100%;
    height: 100%;
    .notice {
      width: 100%;
      font-size: 26rpx;
      color: #503500;
      .avatar-icon {
        width: 35rpx;
        height: 35rpx;
        margin-right: 6rpx;
        border-radius: 50%;
      }
      .type {
        padding: 0 10rpx;
        font-weight: bold;
      }
      .time {
        margin-left: auto;
      }
    }
  }
}
// 旧衣回收分类
.clothing-block {
  padding: 46rpx 30rpx;
  background-color: #fff;
  border-radius: 20rpx;
  box-shadow: 2rpx 1rpx 3rpx 0 #f5f5f5;
  .clothing-classify {
    font-size: 24rpx;
    color: #333;
    .classify-item {
      .icon {
        width: 70rpx;
        height: 70rpx;
        margin-bottom: 14rpx;
      }
    }
  }
  .rec-banner {
    width: 100%;
    height: 100rpx;
    margin: 60rpx 0 10rpx;
    border-radius: 100rpx;
    box-shadow: 5rpx 5rpx 20rpx #ccc;
  }
}
// 主内容
.main-block {
  margin: 0 30rpx;
  .recycle-classify {
    padding: 30rpx;
    margin-bottom: 20rpx;
    font-size: 24rpx;
    color: #333;
    background-color: #fff;
    border-radius: 20rpx;
    border: 1px solid #f5f5f5;
    .classify-item {
      .icon {
        width: 70rpx;
        height: 70rpx;
        margin-bottom: 14rpx;
      }
    }
  }
}

// 热门活动盒子/标题
.bottom-block {
  position: relative;
  padding: 30rpx;
  margin-bottom: 30rpx;
  border-radius: 20rpx;
  background-color: #fff;
  overflow: hidden;
  .title {
    position: relative;
    margin-bottom: 20rpx;
    font-size: 32rpx;
    z-index: 1;
    &::before {
      content: "";
      position: absolute;
      top: 6rpx;
      left: 15rpx;
      width: 35rpx;
      height: 35rpx;
      border-radius: 50%;
      background-color: #3eff96;
      z-index: -1;
    }
  }
}

//热门活动图片
.hot-activity {
  .hot-activity-item {
    width: 300rpx;
    height: 420rpx;
    border-radius: 20rpx;
    .image {
      width: 100%;
      height: 100%;
      border-radius: inherit;
    }
  }
}

//更多精彩活动
.more-activity {
  .activity-list {
    .activity-item {
      width: 300rpx;
      height: 420rpx;
      margin-bottom: 30rpx;
      border-radius: 20rpx;
      &:nth-last-child(1),
      &:nth-last-child(2) {
        margin-bottom: 0;
      }
      .image {
        width: 100%;
        height: 100%;
        border-radius: inherit;
      }
    }
  }
}

//常见问题
.common-question {
  padding: 35rpx 30rpx;
  margin-bottom: 20rpx;
  border-radius: 20rpx;
  background-color: #fff;
  border: 1px solid #f5f5f5;
  .title {
    margin-bottom: 20rpx;
    font-size: 32rpx;
    .update-icon {
      width: 34rpx;
      height: 34rpx;
      background: url("../../static/icon/update.png") no-repeat center/contain;
    }
  }
  .question-list {
    .question-item {
      margin-bottom: 32rpx;
      font-size: 28rpx;
      &:last-child {
        margin-bottom: 0;
      }
      .question {
        margin-bottom: 10rpx;
      }
      .answer {
        font-size: 24rpx;
        color: #777;
      }
    }
  }
}
</style>
