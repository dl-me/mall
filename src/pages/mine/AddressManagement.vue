<template>
  <div class="addressManagement">
    <Header theme="white">
      <template slot="mid">地址管理</template>
    </Header>
    <div class="address-scrool">
      <div class="management-desc" v-for="address in addressList" :key="address.id">
        <div class="info-num">
          <p>
            <span>{{address.name}}</span>
            <span class="phone">{{address.phoneNumber}}</span>
            <span class="default" v-show="address.defaultStatus">默认</span>
          </p>
          <p class="address">{{address.detailAddress}}</p>
        </div>
        <router-link tag="div" :to="'/AddressEdit?id=' + address.id" class="edit">
          <span class="iconfont">&#xe652;</span>
        </router-link>
      </div>
    </div>

    <div class="add-bg">
      <router-link tag="div" :to="`/AddressEdit`" class="add-address">
        <span class="iconfont">&#xe6d2;</span>
        新增收货地址
      </router-link>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
export default {
  name: "AddressManagement",
  data() {
    return {
      addressList: []
    };
  },
  mounted() {
    this.$api.getAddressList().then(res => {
      this.addressList = res;
    });
  },
  components: {
    Header
  }
};
</script>

<style lang="less" scoped>
.addressManagement {
  box-sizing: border-box;
  padding-bottom: 70px;
  height: 100%;
  overflow: hidden;
  .address-scrool {
    height: 100%;
    overflow: auto;
    .management-desc {
      display: flex;
      align-items: center;
      width: 100%;
      height: 66px;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0 15px;
      .info-num {
        margin-left: 10px;
        p {
          font-size: 0.3rem;
        }
        .address {
          margin-top: 0.2rem;
          font-size: 0.24rem;
          color: #999;
        }
        .phone {
          margin-left: 15px;
        }
        .default {
          color: #edcd95;
          border: 1px solid #edcd95;
          font-size: 0.2rem;
          border-radius: 4px;
          box-sizing: border-box;
          margin-left: 0.2rem;
          padding: 1px 4px;
        }
      }
      .edit {
        .iconfont {
          color: #999;
          font-size: 0.4rem;
        }
      }
    }
  }

  .add-bg {
    width: 100%;
    height: 73px;
    background: #fff;
    position: fixed;
    bottom: 0;
    .add-address {
      width: 90%;
      box-sizing: border-box;
      border: 1px solid #ccc;
      text-align: center;
      margin: 0.34rem 5%;
      padding: 15px;
      font-size: 0.3rem;
    }
  }
}
</style>
