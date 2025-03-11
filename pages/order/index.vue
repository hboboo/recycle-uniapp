<template>
  <view class="order-wrapper">
    <view class="order-banner"></view>
    <view class="main">
      <view class="form">
        <view class="top flex-center-between">
          <text class="title">上门取件回收</text>
          <text class="city" @click="showServiceCity = true">上门城市?</text>
        </view>
        <!-- 取件地址 -->
        <view class="form-item flex">
          <view class="form-label flex-center">
            <icon class="address-icon icon"></icon>
            <text class="name">取件地址</text>
          </view>
          <view class="form-content flex-center-between" @click="fillAddress">
            <text class="flex-1">{{ form.address || "请填写地址" }}</text>
            <icon class="icon"></icon>
          </view>
        </view>
        <!-- 上门时间 -->
        <view class="form-item flex-center">
          <view class="form-label flex-center">
            <icon class="time-icon icon"></icon>
            <text class="name">上门时间</text>
          </view>
          <view class="form-content flex-center-between" @click="showAppointDate = true">
            <text>{{ form.time || "预约上门时间" }}</text>
            <icon class="icon"></icon>
          </view>
        </view>
        <!-- 预估重量 -->
        <view v-if="form.type == 'clothes' || form.type == 'books'" class="form-item">
          <view class="form-label flex-center">
            <icon class="weight-icon icon"></icon>
            <text class="name">预估重量</text>
          </view>
          <view class="weight-select flex-center-between">
            <view
              class="weight-item flex-center-center flex-column"
              :class="{ active: weightActivedIndex == index, books: form.type == 'books' }"
              v-for="(item, index) in weightList"
              :key="item.id"
              @click="weightActivedIndex = index"
            >
              <text>{{ item.weight }}</text>
              <text class="describe">{{ item.describe }}</text>
              <icon v-if="weightActivedIndex == index" class="correct-icon"></icon>
            </view>
          </view>
        </view>
        <!-- 选择家电类型 -->
        <view v-if="form.type == 'home-appliances'" class="form-item">
          <view class="form-label flex-center">
            <icon class="home-appliances-icon icon"></icon>
            <text class="name">家电类型</text>
          </view>
          <view class="home-appliances-select flex-center-between flex-wrap">
            <view
              class="home-appliances-item flex-center-center"
              :class="{ active: homeAppliancesIndex == index }"
              v-for="(item, index) in weightList"
              :key="item.id"
              @click="homeAppliancesIndex = index"
            >
              <text>{{ item.name }}</text>
            </view>
          </view>
        </view>
        <!-- 选择手机品牌 -->
        <view v-if="form.type == 'phone'" class="form-item">
          <view class="form-label flex-center">
            <icon class="phone-brand-icon icon"></icon>
            <text class="name">手机品牌</text>
          </view>
          <view class="phone-brand-select flex-center-between flex-wrap">
            <view
              class="phone-brand-item flex-center-center"
              :class="{ active: homeAppliancesIndex == index }"
              v-for="(item, index) in weightList"
              :key="item.id"
              @click="homeAppliancesIndex = index"
            >
              <text>{{ item.name }}</text>
            </view>
          </view>
          <view v-if="homeAppliancesIndex != -1" class="phone-model">
            <input
              v-model="form.phone_model"
              class="input"
              placeholder-class="placeholder"
              placeholder="请输入手机型号"
              type="text"
            />
          </view>
        </view>
        <!-- 奖励选择 -->
        <view class="form-item">
          <view class="form-label flex-center">
            <icon class="reward-icon icon"></icon>
            <text class="name">奖励选择</text>
          </view>
          <view class="reward-select">
            <view
              class="reward-item"
              :class="{ active: rewardActivedIndex == index }"
              v-for="(item, index) in rewardList"
              :key="item.id"
              @click="rewardActivedIndex = index"
            >
              <view class="title flex-center">
                <text>{{ item.title }}</text>
                <icon class="reward-type-icon" :class="[item.type]"></icon>
              </view>
              <view class="describe">
                {{ item.describe }}
              </view>
              <view class="num">{{ item.num }}人已选</view>
              <icon v-if="rewardActivedIndex == index" class="correct-icon"></icon>
            </view>
          </view>
        </view>
      </view>
      <!-- 通知与客服 -->
      <view class="notice-box flex-center-between">
        <view class="notice" @click="showAppointNotice = true"></view>
        <view class="service" @click="linkService"></view>
      </view>
      <!-- 用户评价 -->
      <view class="comment">
        <view class="title title-decoration-s">用户评价</view>
        <view class="comment-item" v-for="comment in commentList" :key="comment.id">
          <view class="user-info flex">
            <view class="avatar">
              <image class="image" :src="comment.avatar" mode="aspectFit"></image>
            </view>
            <view class="info">
              <view class="nickname">
                {{ comment.nickname }}
              </view>
              <view class="time">
                {{ comment.time }}
              </view>
            </view>
          </view>
          <view class="comment-content">
            {{ comment.comment }}
          </view>
        </view>
      </view>
      <!-- 提交 -->
      <view class="submit flex-center-center" @click="submit">确认预约</view>

      <!-- 回收服务城市 -->
      <service-city v-model="showServiceCity"></service-city>
      <!-- 新增地址 -->
      <add-address v-model="showAddAddress" :showClose="false" @confirm="confirmAddress"></add-address>
      <!-- 预约日期 -->
      <dui-appoint-date v-model="showAppointDate" @confirm="confirmAppointDate"></dui-appoint-date>
      <!-- 预约须知 -->
      <appoint-notice v-model="showAppointNotice"></appoint-notice>
      <dui-toast ref="toast"></dui-toast>
    </view>
  </view>
</template>

<script setup>
import { reactive, computed, ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

// 弹窗相关
const showServiceCity = ref(false);
const showAddAddress = ref(false);
const showAppointNotice = ref(false);
const toast = ref(null);

const showAppointDate = ref(false);
const confirmAppointDate = (e) => {
  const { date, time_period } = e;
  form.time = `${date} ${time_period}`;
};

const fillAddress = () => {
  showAddAddress.value = true;
};
const confirmAddress = (e) => {
  const { name, phone, area, address_detail } = e;
  form.address = `${name} ${phone} ${area} ${address_detail}`;
};

const form = reactive({
  type: "clothes", //回收类型
  address: "", //地址
  time: "", //预约时间
  weight: "", //重量类型、家电类型、手机品牌类型
  reward: "", //奖励
  phone_model: "", //手机型号
});

// 预估重量、奖励、家电类型、手机品牌类型选中状态
const weightActivedIndex = ref(0);
const rewardActivedIndex = ref(-1);
const homeAppliancesIndex = ref(-1);

// 预估重量列表
const weightList = computed(() => {
  let list = [];
  switch (form.type) {
    case "clothes":
      list = clothesWeightList;
      break;
    case "books":
      list = bookWeightList;
      break;
    case "home-appliances":
      list = homeAppliancesList;
      break;
    case "phone":
      list = phoneBrandList;
      break;
  }
  return list;
});
const clothesWeightList = reactive([
  {
    id: "1",
    weight: "3-10kg",
    describe: "约20件",
  },
  {
    id: "2",
    weight: "10-20kg",
    describe: "约40件",
  },
  {
    id: "3",
    weight: "20-50kg",
    describe: "约60件",
  },
  {
    id: "4",
    weight: "50kg以上",
    describe: "约150件",
  },
]);
const bookWeightList = reactive([
  {
    id: 1,
    weight: "5-10本",
  },
  {
    id: 2,
    weight: "10-20本",
  },
  {
    id: 3,
    weight: "20本以上",
  },
]);
const homeAppliancesList = reactive([
  {
    id: 1,
    name: "洗衣机",
  },
  {
    id: 2,
    name: "冰箱",
  },
  {
    id: 3,
    name: "空调",
  },
  {
    id: 4,
    name: "电视",
  },
  {
    id: 5,
    name: "热水器",
  },
  {
    id: 6,
    name: "电饭锅",
  },
  {
    id: 7,
    name: "电磁炉",
  },
  {
    id: 999,
    name: "其他",
  },
]);
const phoneBrandList = reactive([
  {
    id: 1,
    name: "华为",
  },
  {
    id: 2,
    name: "小米",
  },
  {
    id: 3,
    name: "魅族",
  },
  {
    id: 4,
    name: "oppo",
  },
  {
    id: 5,
    name: "vivo",
  },
  {
    id: 6,
    name: "苹果",
  },
  {
    id: 7,
    name: "三星",
  },
  {
    id: 999,
    name: "其他",
  },
]);

// 奖励列表
const rewardList = ref([
  {
    id: "1",
    type: "beans",
    title: "回收豆-1kg旧衣=80回收豆",
    describe: "回收豆可在“福利”专区兑换物品",
    num: "100w",
  },
  {
    id: "2",
    type: "cash",
    title: "现金奖励-1kg旧衣=0.8元",
    describe: "按实际回收重量发放，需自行提现",
    num: "200w",
  },
]);

// 用户评价列表
const commentList = ref([
  {
    id: 101,
    nickname: "风过无痕",
    avatar: "/static/icon/avatar.png",
    time: "2025-03-10 09:30",
    comment: "服务态度超好，回收效率高，太满意了！",
  },
  {
    id: 102,
    nickname: "云淡天高",
    avatar: "/static/icon/avatar.png",
    time: "2025-03-10 14:15",
    comment: "方便快捷，价格也合理，强烈推荐！",
  },
  {
    id: 103,
    nickname: "夜雨微凉",
    avatar: "/static/icon/avatar.png",
    time: "2025-03-10 18:45",
    comment: "上门服务太赞了，省时省力，必须五星好评！",
  },
]);

// 联系客服
const linkService = () => {
  uni.navigateTo({
    url: `/pages/user/online-service/online-service`,
  });
};

const submit = () => {
  form.weight = weightList.value[weightActivedIndex.value]?.id;
  form.reward = rewardList.value[rewardActivedIndex.value]?.id;
  if (!form.address) {
    toast.value.showToast("请填写地址！");
    return;
  }
  if (!form.time) {
    toast.value.showToast("请选择预约上门时间！");
    return;
  }
  if (!form.weight) {
    let message = "";
    if (form.type == "phone") {
      message = "请选择手机品牌！";
    } else if (form.type == "home-appliances") {
      message = "请选择家电类型！";
    } else {
      message = "请选择预估重量！";
    }
    toast.value.showToast(message);
    return;
  }
  if (!form.reward) {
    toast.value.showToast("请选择奖励！");
    return;
  }
  //请求服务端接口
  toast.value.showToast("模拟提交成功！");
};

onLoad((e) => {
  form.type = e.type;
});
</script>

<style lang="scss" scoped>
.order-wrapper {
  padding-bottom: 120rpx;
  .order-banner {
    width: 100%;
    height: 200rpx;
    background: url("../../static/icon/order-banner2.jpg") no-repeat center/cover;
  }
  .main {
    padding: 15rpx 30rpx 30rpx;
    font-size: 28rpx;
    .form {
      padding: 40rpx 30rpx;
      margin-bottom: 30rpx;
      border-radius: 20rpx;
      background-color: #fff;
      box-shadow: 0 0 10rpx #eee;
      .top {
        margin-bottom: 40rpx;
        .title {
          font-size: 32rpx;
          font-weight: bold;
        }
        .city {
          position: relative;
          z-index: 0;
          &::before {
            content: "";
            position: absolute;
            bottom: 5rpx;
            left: 10rpx;
            width: 90rpx;
            height: 10rpx;
            border-radius: 5rpx;
            background-color: #3eff96;
            z-index: -1;
          }
        }
      }
      .form-item {
        align-items: flex-start;
        margin: 30rpx 0;
        line-height: 46rpx;
        &:last-child {
          margin-bottom: 0;
        }
        .form-label {
          .icon {
            width: 46rpx;
            height: 46rpx;
            margin-right: 10rpx;
            background-repeat: no-repeat;
            background-size: contain;
            &.address-icon {
              background-image: url("../../static/icon/address.png");
            }
            &.time-icon {
              background-image: url("../../static/icon/time.png");
            }
            &.weight-icon {
              background-image: url("../../static/icon/weight.png");
            }
            &.reward-icon {
              background-image: url("../../static/icon/reward.png");
            }
            &.home-appliances-icon {
              background-image: url("../../static/icon/home-appliances.png");
            }
            &.phone-brand-icon {
              background-image: url("../../static/icon/phone.png");
            }
          }
        }
        .form-content {
          width: 410rpx;
          padding-bottom: 30rpx;
          margin-left: auto;
          border-bottom: 1rpx solid #eee;
          .icon {
            width: 30rpx;
            height: 30rpx;
            margin: 0 0 0 20rpx;
            background: url("../../static/icon/r-arrow.png") no-repeat center/contain;
          }
        }
        .weight-select {
          margin-top: 38rpx;
          .weight-item {
            position: relative;
            width: 138rpx;
            height: 138rpx;
            border: 3rpx solid #eee;
            border-radius: 8rpx;
            &.books {
              width: 190rpx;
            }
            .describe {
              font-size: 24rpx;
              color: #999;
            }
            .correct-icon {
              position: absolute;
              top: 0;
              left: 0;
              width: 30rpx;
              height: 30rpx;
              border-radius: 3rpx 0 10rpx 0;
              background: #ffc903 url("../../static/icon/correct.png") no-repeat center/contain;
              background-size: 20rpx;
            }
            &.active {
              border-color: #ffc903;
              background-color: #fffdf5;
            }
          }
        }
        //家电类型选择
        .home-appliances-select {
          margin-top: 38rpx;
          .home-appliances-item {
            width: 140rpx;
            height: 70rpx;
            margin-bottom: 16rpx;
            border-radius: 6rpx;
            color: #333;
            font-size: 26rpx;
            border: 2rpx solid transparent;
            background-color: #f5f5f5;
            &.active {
              border-color: #ffc903;
              background-color: #fffdf5;
            }
          }
        }
        //手机品牌选择
        .phone-brand-select {
          margin: 38rpx 0 10rpx;
          .phone-brand-item {
            width: 140rpx;
            height: 70rpx;
            margin-bottom: 16rpx;
            border-radius: 6rpx;
            color: #333;
            font-size: 26rpx;
            border: 2rpx solid transparent;
            background-color: #f5f5f5;
            &.active {
              border-color: #ffc903;
              background-color: #fffdf5;
            }
          }
        }
        .phone-model {
          padding: 14rpx 20rpx;
          border-radius: 6rpx;
          border: 1rpx solid #ffc903;
          .input {
            font-size: 28rpx;
            .placeholder {
              font-size: 24rpx;
            }
          }
        }
        //奖励选择
        .reward-select {
          margin-top: 38rpx;
          .reward-item {
            position: relative;
            padding: 20rpx;
            margin-bottom: 20rpx;
            border: 3rpx solid #eee;
            border-radius: 8rpx;
            &:last-child {
              margin-bottom: 0;
            }
            .title {
              .reward-type-icon {
                width: 30rpx;
                height: 30rpx;
                margin-left: 10rpx;
                &.beans {
                  background: url("../../static/icon/beans.png?v=1") no-repeat center/contain;
                }
                &.cash {
                  background: url("../../static/icon/red-package.png") no-repeat center/contain;
                }
              }
            }
            .describe {
              margin: 5rpx 0;
              font-size: 24rpx;
              color: #999;
            }
            .num {
              font-size: 24rpx;
              color: #999;
            }
            &.active {
              background-color: #fffdf5;
              border: 3rpx solid #ffc903;
            }
            .correct-icon {
              position: absolute;
              bottom: 0;
              right: 0;
              width: 30rpx;
              height: 30rpx;
              border-radius: 10rpx 0 3rpx 0;
              background: #ffc903 url("../../static/icon/correct.png") no-repeat center/contain;
              background-size: 20rpx;
            }
          }
        }
      }
    }
    //预约须知、在线客服
    .notice-box {
      margin-bottom: 30rpx;
      .notice,
      .service {
        width: 330rpx;
        height: 140rpx;
        border-radius: 20rpx;
        background-color: #fff;
      }
      .notice {
        background: url("../../static/icon/notice1.jpg") no-repeat center/contain;
      }
      .service {
        background: url("../../static/icon/online-service.jpg") no-repeat center/contain;
      }
    }
    //用户评价
    .comment {
      padding: 35rpx;
      border-radius: 10rpx;
      background-color: #fff;
      .title {
        margin-bottom: 30rpx;
        font-size: 30rpx;
      }
      .comment-item {
        position: relative;
        margin-bottom: 40rpx;
        &:last-child {
          margin-bottom: 0;
        }
        &::before {
          content: "好评";
          position: absolute;
          right: 0;
          top: 20rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 80rpx;
          height: 80rpx;
          border-radius: 50%;
          border: 1rpx solid #f40;
          color: #f40;
          opacity: 0.1;
          transform: rotate(-45deg);
        }
        .user-info {
          margin-bottom: 15rpx;
          .avatar {
            width: 60rpx;
            height: 60rpx;
            margin-right: 20rpx;
            .image {
              width: 100%;
              height: 100%;
            }
          }
          .info {
            .nickname {
              font-size: 24rpx;
              color: #555;
            }
            .time {
              font-size: 24rpx;
              color: #999;
            }
          }
        }
        .comment-content {
          padding-left: 80rpx;
          font-size: 24rpx;
          color: #333;
        }
      }
    }
    .submit {
      position: fixed;
      left: 30rpx;
      right: 30rpx;
      bottom: 30rpx;
      height: 86rpx;
      font-weight: bold;
      color: #222;
      background-color: #ffc903;
      border-radius: 86rpx;
      box-shadow: 0 0 10rpx #eee;
    }
  }
}
</style>
