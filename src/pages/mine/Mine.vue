<template>
  <div>
    <div class="mine">
      <div class="mine-header">我的</div>
      <div class="personal">
        <div class="avatar-info">
          <div class="avatar">
            <img :src="info.icon" alt />
          </div>
          <p class="mine-name">{{info.nickname}}</p>
        </div>
      </div>

      <router-link v-if="info.distributor" tag="div" to="/Distribution" class="distribute-content">
        <div class="distribution">
          <p>分销中心</p>
          <div class="integral">
            <p>积分：{{distributorInfo.growthPoint}}</p>
            <img src="../../assets/mine-next.png" alt />
          </div>
        </div>
      </router-link>
    </div>

    <ul class="mine-list">
      <router-link tag="li" to="/Order">
        <div class="mine-list-desc">
          <img src="../../assets/order.png" alt />
          <p>我的订单</p>
        </div>
        <span class="iconfont">&#xe62c;</span>
      </router-link>
      <router-link tag="li" to="/AddressManagement">
        <div class="mine-list-desc">
          <img src="../../assets/map.png" alt />
          <p>地址管理</p>
        </div>
        <span class="iconfont">&#xe62c;</span>
      </router-link>
      <li>
        <div class="mine-list-desc">
          <img src="../../assets/servers.png" alt />
          <p>客服中心</p>
        </div>
        <span class="iconfont">&#xe62c;</span>
      </li>
      <router-link tag="li" to="/Set">
        <div class="mine-list-desc">
          <img src="../../assets/order.png" alt />
          <p>设置</p>
        </div>
        <span class="iconfont">&#xe62c;</span>
      </router-link>
    </ul>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/footer/Footer.vue";
import info from "@/api/mock.js";

export default {
  name: "Mine",
  data() {
    return {
      distributorInfo: { growthPoint: 0 }
    };
  },
  mounted() {
    this.getDistributorInfo()
  },
  watch: {
    info() {
    this.getDistributorInfo()
    }
  },
  computed: {
    info() {
      return this.$store.state.userInfo || {};
    }
  },
  methods: {
    getDistributorInfo(){
      if(this.info.distributor) {
      this.$api
        .distributorInfo()
        .then(distributorInfo => (this.distributorInfo = distributorInfo));
    }
    }
  },
  components: {
    Footer
  }
};
</script>

<style lang="less" scoped>
.mine {
  background-image: url("../../assets/mine-bg.png");
  height: 185px;
  background-size: 100% 100%;
  border-radius: 0 0 25px 25px;
  position: relative;
  .mine-header {
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 0.32rem;
  }
  .personal {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 15px;
    .avatar-info {
      display: flex;
      align-items: center;
      .avatar {
        height: 80px;
        width: 80px;
        background-color: #fff;
        border-radius: 50%;
        overflow: hidden;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
        }
      }
      .mine-name {
        font-size: 0.36rem;
        color: #333;
        margin-left: 10px;
      }
    }
    .mine-next {
      img {
        height: 20px;
        width: 20px;
      }
    }
  }
}
.distribute-content {
  width: 100%;
  position: absolute;
  bottom: -25px;
  .distribution {
    height: 50px;
    background-image: linear-gradient(135deg, #333 10%, #000 100%);
    color: #cfad69;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 15px;
    border-radius: 8px;
    margin: 0 15px;
    font-size: 0.3rem;
    .integral {
      display: flex;
      align-items: center;
      p {
        font-size: 0.24rem;
      }
      img {
        height: 18px;
        width: 18px;
      }
    }
  }
}
.mine-list {
  margin: 40px 15px;
  li {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e5e5e5;
    font-size: 0.3rem;
    .mine-list-desc {
      display: flex;
      align-items: center;
      img {
        height: 20px;
        width: 20px;
        margin-right: 10px;
      }
    }
    .next {
      height: 20px;
      width: 20px;
    }
  }
  li:last-child {
    border-bottom: none;
  }
}
</style>
