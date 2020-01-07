<template>
  <div class="custom-service">
    <van-skeleton title avatar :row="10" />
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/footer/Footer.vue";
export default {
  name: "CustomerService",
  data() {
    return {};
  },
  components: {
    Footer
  }
};
</script>

<style lang="less" scoped>
.custom-service {
  height: 100%;
  padding-top: 160px;
}
</style>
