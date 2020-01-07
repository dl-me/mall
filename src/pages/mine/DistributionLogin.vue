<template>
  <div class="distributionLogin">
    <Header theme="white" :hideBack="true">
      <template slot="mid">分销注册</template>
    </Header>
    <div class="login">
      <input v-model="value" type="text" placeholder="请输入您的姓名" />
      <input v-model="phone" type="text" placeholder="请输入您的手机号" />
      <button @click="update">完成</button>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
export default {
  name: "DistributionLogin",
  data() {
    return {
      value: "",
      phone: ""
    };
  },
  methods: {
    async update() {
      await this.$api.additionalPhone({
        realName: this.value,
        phone: this.phone
      });

      await this.$api.load();

      this.$router.replace("/");
    }
  },
  components: {
    Header
  }
};
</script>

<style lang="less" scoped>
.distributionLogin {
  height: 100vh;
  .login {
    margin-top: 0.42rem;
    input {
      box-sizing: border-box;
      height: 1.06rem;
      width: 90%;
      padding: 0 0.34rem;
      margin: 0.2rem 5%;
      border: 1px solid #e6e6e6;
    }
    button {
      height: 1.06rem;
      width: 90%;
      margin: 0.34rem 5%;
      color: #6d4b0e;
      background-image: linear-gradient(135deg, #edcd95 10%, #cfad69 100%);
    }
  }
}
</style>
