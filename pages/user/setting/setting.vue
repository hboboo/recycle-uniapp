<template>
  <view class="setting-wrapper">
    <view class="setting-list">
      <view
        class="setting-item flex-center-between"
        v-for="item in settingList"
        :key="item.type"
        @click="settingClick(item.type)"
      >
        <text>{{ item.name }}</text>
        <icon class="arrow-icon"></icon>
      </view>
    </view>
    <view class="setting-list">
      <view
        class="setting-item flex-center-between"
        v-for="item in otherList"
        :key="item.type"
        @click="settingClick(item.type)"
      >
        <text>{{ item.name }}</text>
        <text class="version" v-if="item.type == 'version'">{{ item.version }}</text>
        <icon v-else class="arrow-icon"></icon>
      </view>
    </view>

    <dui-toast ref="toast"></dui-toast>
  </view>
</template>

<script setup>
import { ref } from "vue";

const toast = ref(null);
const settingList = ref([
  {
    type: "about-us",
    name: "关于我们",
  },
  {
    type: "user-assignment",
    name: "用户协议",
  },
  {
    type: "privacy-assignment",
    name: "隐私政策",
  },
  {
    type: "recycle-assignment",
    name: "回收协议",
  },
]);

const otherList = ref([
  {
    type: "version",
    name: "当前版本",
    version: "1.0.0",
  },
  {
    type: "logout",
    name: "退出登录",
  },
]);

const settingClick = (type) => {
  if (type == "logout") {
    //自行退出登录逻辑
    toast.value.showToast("退出登录！");
  } else if (type !== "version") {
    uni.navigateTo({
      url: `/pages/user/setting/${type}/${type}`,
    });
  }
};
</script>

<style lang="scss" scoped>
.setting-wrapper {
  padding: 30rpx;
  .setting-list {
    padding: 0 30rpx;
    margin-bottom: 20rpx;
    border-radius: 15rpx;
    background-color: #fff;
  }
  .setting-item {
    padding: 30rpx 0;
    font-size: 28rpx;
    border-bottom: 1rpx solid #f5f5f5;
    &:last-child {
      border-bottom: 0;
    }
    .version {
      color: #888;
    }
    .arrow-icon {
      width: 30rpx;
      height: 30rpx;
      background: url("~@/static/icon/r-arrow.png") no-repeat center/contain;
    }
  }
}
</style>
