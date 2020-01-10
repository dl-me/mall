<template>
  <div class="custom-service">
    <Header theme="white">
      <template slot="mid">客服</template>
    </Header>
    <van-popup v-model="show">
      <a v-for="(call,index) in telephone" :key="index" :href="'tel:' + call" class="service">{{call}}</a>
    </van-popup>
    <van-skeleton title avatar :row="10" />
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
import Footer from "@/components/footer/Footer.vue";
export default {
  name: "CustomerService",
  data() {
    return {
      telephone: ["028-67876808", "028-87878446"],
      show: false
    };
  },
  mounted() {
    this.show = true;
  },
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="less" scoped>
.custom-service {
  height: 100%;
  .service {
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #ebedf0;
  }
}
</style>
<style lang="less">
.van-popup--center {
  width: 250px;
  border-radius: 20px;
}
.van-skeleton {
  box-sizing: border-box;
  padding-top: 20px;
}
</style>
