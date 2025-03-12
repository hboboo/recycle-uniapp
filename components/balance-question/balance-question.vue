<template>
  <popup v-model="showPopup" :clickModalClose="true" @close="close">
    <view class="balance-question-wrapper">
      <view class="title title-decoration">关于余额</view>
      <view class="content">
        这里是关于余额的一些常见说明。您账户中的余额可以用于平台内的各种消费，例如兑换商品、参与活动或提现至绑定的账户。
        余额不可转让，且请确保在有效期内使用。若余额来源异常或有其他疑问，请及时联系我们的在线客服进行咨询。
        我们致力于为您提供安全、便捷的余额管理服务！
      </view>
    </view>
  </popup>
</template>

<script setup>
import { ref, computed } from "vue";
const emits = defineEmits(["close", "update:modelValue"]);
const props = defineProps({
  modelValue: Boolean,
});
const showPopup = computed({
  get() {
    return props.modelValue;
  },
  set() {
    emits("update:modelValue", false);
  },
});
function closeCallBack() {
  emits("close");
  showPopup.value = false;
}

function close() {
  if (props.clickModalClose) {
    closeCallBack();
  }
}
</script>

<style lang="scss" scoped>
.balance-question-wrapper {
  width: 450rpx;
  height: auto;
  max-height: 75vh;
  overflow-y: auto;
  padding: 50rpx;
  border-radius: 15rpx;
  background-color: #fff;
  .title {
    margin-bottom: 40rpx;
    text-align: center;
    font-size: 34rpx;
  }
  .content {
    font-size: 28rpx;
    color: #444;
  }
}
</style>
