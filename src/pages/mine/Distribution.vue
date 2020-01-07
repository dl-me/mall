<template>
  <div class="distribution">
    <Header theme="white">
      <template slot="mid">分销中心</template>
    </Header>
    <div class="distribution-content">
      <div class="distribution-item">
        <div class="distribution-avatar">
          <img :src="icon" alt="头像" />
        </div>
        <p class="distribution-avatar">{{ nickname }}</p>
      </div>
      <div class="distribution-money-total">
        <div class="distribution-money">
          <p>累计个人余额(元)</p>
          <p>¥{{ totalCommission }}</p>
        </div>
        <router-link tag="div" to="/RebateRecord" class="rebate-record">返佣记录</router-link>
      </div>
    </div>
    <div class="vip-growth">
      <div class="withdrawable">
        <p>可提现余额(元)</p>
        <p>{{ withdrawalCommission }}</p>
      </div>
      <div class="growth-value">
        <p>我的成长值</p>
        <p>{{ growthPoint }}</p>
      </div>
    </div>
    <router-link tag="div" to="/TeamManagement" class="team-management">
      <div class="team-title">
        <p>团队管理</p>
        <p>
          <span>当前共{{ totalMember }}人</span>
          <span class="iconfont">&#xe62c;</span>
        </p>
      </div>
    </router-link>
    <router-link tag="div" to="/QRCode" class="develop">发展团队</router-link>
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
export default {
  name: "Distribution",
  data() {
    return {
      data: {},
      loadData: {},
      growthPoint: 0,
      totalMember: 0,
      nickname: "",
      icon: "",
      withdrawalCommission: 0,
      totalCommission: 0
    };
  },
  mounted() {
    this.distributorInfo();
    this.load();
  },
  methods: {
    async distributorInfo() {
      this.data = await this.$api.distributorInfo();
      this.growthPoint = this.data.growthPoint; //成长值
      this.totalMember = this.data.totalMember; // 团队人数
      this.withdrawalCommission = this.data.withdrawalCommission; // 提现余额
      this.totalCommission = this.data.totalCommission; //个人余额
    },
    async load() {
      this.loadData = await this.$api.load();
      this.nickname = this.loadData.nickname; // 昵称
      this.icon = this.loadData.icon; // 头像
    }
  },
  components: {
    Header
  }
};
</script>

<style lang="less" scoped>
.distribution {
  color: #d8bc85;
  box-sizing: border-box;
  .distribution-content {
    width: 95%;
    height: 3rem;
    margin: 0.3rem auto;
    background-image: url("../../assets/vipbg.png");
    background-size: 100% 100%;
    border-radius: 20px;
    .distribution-item {
      // margin: .4rem;
      display: flex;
      align-items: center;
      padding: 0.4rem 0.2rem;
      .distribution-avatar {
        margin-left: 0.16rem;
        font-size: 0.3rem;
        img {
          height: 0.66rem;
          width: 0.66rem;
          border-radius: 50%;
        }
      }
    }
    .distribution-money-total {
      padding: 0 0.4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 0.97rem;
      .distribution-money {
        p:last-child {
          margin-top: 0.12rem;
          font-size: 0.36rem;
          height: 0.56rem;
          line-height: 0.56rem;
        }
      }
      .rebate-record {
        width: 1.36rem;
        height: 0.58rem;
        line-height: 0.58rem;
        text-align: center;
        background-color: #6e6e6e;
        border-radius: 0.2rem;
        font-size: 0.24rem;
      }
    }
  }
  .vip-growth {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 1.48rem;
    .withdrawable,
    .growth-value {
      width: 50%;
      height: 60%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      p {
        margin: 0.14rem 0;
      }
      p:last-child {
        font-size: 0.36rem;
      }
    }
    .withdrawable {
      border-right: 1px solid #e3e3e3;
    }
  }
  .team-management {
    padding: 0.3rem;
    box-sizing: border-box;
    margin-top: 0.2rem;
    border-top: 0.2rem solid #f1f1f1;
    .team-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      p {
        .iconfont {
          font-size: 0.24rem;
          color: #999;
        }
        span {
          img {
            height: 0.24rem;
            width: 0.24rem;
          }
        }
      }
    }
  }
  .develop {
    display: flex;
    align-items: center;
    justify-content: center;
    // width: 100%;
    height: 0.8rem;
    margin: 0.3rem;
    box-sizing: border-box;
    text-align: center;
    border: 1px solid #cfad69;
  }
}
</style>
