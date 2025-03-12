<template>
  <view class="address-wrapper">
    <view class="address-list">
      <view class="address-item flex-center-between" v-for="(item, index) in addressList" :key="item.id">
        <view>
          <text class="area">{{ item.area }}</text>
          <view class="address-detail">
            {{ item.address_detail }}
          </view>
          <view class="contact-info"> {{ item.name }} {{ item.phone }} </view>
        </view>
        <view class="operate-box flex-center flex-column">
          <icon class="edit-icon" @click="editAddress(item)"></icon>
          <icon class="delete-icon" @click="delAddress(index)"></icon>
        </view>
      </view>
    </view>
    <empty v-if="!addressList.length" class="empty"></empty>
    <view class="bottom-btn flex-center-center" @click="addNewAddress"> 新增地址 </view>
    <!-- 新增地址 -->
    <add-address
      v-model="showAddAddress"
      :currentAddressData="currentAddressData"
      :showClose="false"
      @confirm="confirmAddress"
    ></add-address>
    <dui-toast ref="toast"></dui-toast>
  </view>
</template>

<script setup>
import { ref } from "vue";

const addressList = ref([
  {
    id: 1,
    name: "刘鼻涕",
    phone: "13600000000",
    area: "广东省广州市天河区",
    address_detail: "中山二路xxx号50002",
  },
  {
    id: 2,
    name: "王哪跑",
    phone: "13600000002",
    area: "广东省中山市一二区",
    address_detail: "中山二路xxx号821102",
  },
  {
    id: 3,
    name: "陈极简",
    phone: "13600000002",
    area: "广东省中山市一二区",
    address_detail: "中山二路xxx号821102",
  },
  {
    id: 4,
    name: "吴所谓",
    phone: "13600000002",
    area: "广东省中山市一二区",
    address_detail: "中山二路xxx号821102",
  },
  {
    id: 5,
    name: "张工资",
    phone: "13600000002",
    area: "广东省中山市一二区",
    address_detail: "中山二路xxx号821102",
  },
  {
    id: 6,
    name: "林着雨",
    phone: "13600000002",
    area: "广东省中山市一二区",
    address_detail: "中山二路xxx号821102",
  },
  {
    id: 7,
    name: "范困",
    phone: "13600000002",
    area: "广东省中山市一二区",
    address_detail: "中山二路xxx号821102",
  },
]);

const showAddAddress = ref(false);
const currentAddressData = ref("");

const editAddress = (item) => {
  currentAddressData.value = JSON.stringify(item);
  showAddAddress.value = true;
};
const delAddress = (index) => {
  addressList.value.splice(index, 1);
};

const addNewAddress = () => {
  showAddAddress.value = true;
  currentAddressData.value = "{}";
};

const confirmAddress = (e) => {
  addressList.value.push(e);
};
</script>

<style lang="scss" scoped>
.address-wrapper {
  padding: 30rpx 30rpx 130rpx;
  .address-list {
    .address-item {
      padding: 30rpx;
      margin-bottom: 20rpx;
      font-size: 28rpx;
      background-color: #fff;
      border-radius: 15rpx;
      .area {
        font-size: 24rpx;
        color: #888;
      }
      .address-detail {
        margin: 10rpx 0;
      }
      .operate-box {
        .edit-icon {
          width: 39rpx;
          height: 39rpx;
          margin-bottom: 15rpx;
          opacity: 0.7;
          background: url("~@/static/icon/edit.png") no-repeat center/contain;
        }
        .delete-icon {
          width: 30rpx;
          height: 30rpx;
          opacity: 0.7;
          background: url("~@/static/icon/delete.png") no-repeat center/contain;
        }
      }
    }
  }
  .empty {
    margin-top: 300rpx;
  }
  .bottom-btn {
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
