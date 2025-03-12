<template>
  <view class="suggestion-feedback">
    <view class="main">
      <!-- 反馈类目 -->
      <view class="feedback-section">
        <view class="tit">反馈类目</view>
        <view class="category-list flex-center">
          <view
            class="category-item flex-center-center"
            :class="{ active: categoryActiveInd == index }"
            v-for="(item, index) in categoryList"
            :key="item.id"
            @click="categoryActiveInd = index"
          >
            {{ item.name }}
          </view>
        </view>
      </view>
      <!-- 详细描述 -->
      <view class="feedback-section">
        <view class="tit">详细描述</view>
        <textarea
          v-model="desc"
          class="textarea"
          placeholder="请详细输入您的问题描述"
          name=""
          id=""
          cols="30"
          rows="10"
        ></textarea>
      </view>
      <!-- 上传图片 -->
      <view class="feedback-section">
        <view class="tit">上传图片</view>
        <uni-file-picker limit="9" title="最多选择9张图片"></uni-file-picker>
      </view>
    </view>
    <view class="submit-btn flex-center-center" @click="submit">提交</view>

    <dui-toast ref="toast"></dui-toast>
  </view>
</template>

<script setup>
import { ref } from "vue";

const categoryActiveInd = ref(0);
const categoryList = ref([
  {
    id: 1,
    name: "产品建议",
  },
  {
    id: 3,
    name: "bug反馈",
  },
  {
    id: 4,
    name: "投诉举报",
  },
  {
    id: 5,
    name: "其他问题",
  },
]);

const desc = ref("");
const toast = ref(null);

const submit = () => {
  const params = {
    id: categoryList.value[categoryActiveInd.value].id,
    desc: desc.value,
  };
  if (!params.desc) {
    return toast.value.showToast("请输入您的问题描述");
  }
  toast.value.showToast("提交成功");
};
</script>

<style lang="scss" scoped>
.suggestion-feedback {
  padding: 30rpx;
  .main {
    padding: 38rpx 30rpx 42rpx;
    border-radius: 15rpx;
    background-color: #fff;
  }
  .feedback-section {
    margin-bottom: 50rpx;
    &:last-child {
      margin-bottom: 0;
    }
    .tit {
      margin-bottom: 15rpx;
      font-size: 30rpx;
    }
    .category-list {
      .category-item {
        width: 130rpx;
        height: 45rpx;
        margin-right: 10rpx;
        font-size: 24rpx;
        border-radius: 4rpx;
        background-color: #f7f7f7;
        &.active {
          background-color: #ffc903;
        }
      }
    }
    .textarea {
      padding: 20rpx;
      border-radius: 10rpx;
      background-color: #f7f7f7;
    }
  }
  .submit-btn {
    position: fixed;
    left: 30rpx;
    right: 30rpx;
    bottom: 50rpx;
    height: 70rpx;
    font-size: 28rpx;
    border-radius: 70rpx;
    background-color: #ffc903;
  }
}
</style>
