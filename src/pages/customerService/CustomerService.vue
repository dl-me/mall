<template>
  <div class="custom-service">
   
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/footer/Footer.vue";
export default {
  name: "CustomerService",
  data() {
    return {
      telephone: ["028-67876808", "028-87878446"],
      show: false
    };
  },
  created(){
    this.$router.go(-1);
  },
  components: {
    Footer
  }
};
</script>

<style lang="less" scoped>
.custom-service {
  height: 100%;
  .service {
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #ebedf0;
  }
}
</style>
<style lang="less">
// .van-popup--center {
//   width: 250px;
//   border-radius: 20px;
// }
// .van-skeleton {
//   box-sizing: border-box;
//   padding-top: 20px;
// }
</style>
