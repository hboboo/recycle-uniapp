<template>
  <view class="common-question-wrapper">
    <view class="input-box flex-center-between">
      <input v-model="searchVal" class="input flex-1" type="text" placeholder="请输入关键字" />
      <view class="search-icon flex-center-center" @click="search"></view>
    </view>

    <view class="question-list flex-center-between flex-wrap">
      <view class="question-item" v-for="(item, index) in questionList" :key="item.id">
        <view class="question"> A：{{ item.question }} </view>
        <view class="answer"> Q：{{ item.answer }} </view>
      </view>
    </view>

    <empty v-if="noData" class="empty-data"></empty>
  </view>
</template>

<script setup>
import { ref } from "vue";

const noData = ref(false);

const searchVal = ref("");
const search = () => {
  const params = {
    //....
  };
};

let questionList = ref([
  {
    id: 1,
    question: "回收后有什么奖励？",
    answer: "衣物回收：5公斤起，可得红包。书籍回收：10本起，有积分。",
  },
  {
    id: 2,
    question: "奖励怎么领取？",
    answer: "回收完成后，奖励自动到账，查看账户余额即可。",
  },
  {
    id: 3,
    question: "哪些物品能回收？",
    answer: "旧衣物、书籍和小型电子产品都可以回收。",
  },
  {
    id: 4,
    question: "回收有重量要求吗？",
    answer: "是的，衣物至少5公斤，书籍至少10本。",
  },
  {
    id: 5,
    question: "奖励多久到账？",
    answer: "回收确认后，奖励24小时内到账。",
  },
]);
</script>

<style lang="scss" scoped>
.common-question-wrapper {
  padding: 30rpx;
  .input-box {
    height: 70rpx;
    margin-bottom: 20rpx;
    .input {
      height: 100%;
      padding: 0 20rpx;
      box-sizing: border-box;
      font-size: 28rpx;
      border-radius: 10rpx 0 0 10rpx;
      color: #222;
      background-color: #fff;
      &::placeholder {
        font-size: 28rpx;
        color: #888;
      }
    }
    .search-icon {
      width: 100rpx;
      height: 100%;
      font-size: 28rpx;
      border-radius: 0 10rpx 10rpx 0;
      background: #ffc903 url("~@/static/icon/search.png") no-repeat center/contain;
      background-size: 38%;
    }
  }
  .question-list {
    .question-item {
      padding: 30rpx;
      margin-bottom: 15rpx;
      font-size: 28rpx;
      border-radius: 15rpx;
      background-color: #fff;
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

  .empty-data {
    margin-top: 300rpx;
  }
}
</style>
