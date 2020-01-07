<template>
  <div class="commodity">
    <product-list></product-list>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/footer/Footer.vue";
import ProductList from "@/components/ProductList";

export default {
  name: "Commodity",
  data() {
    return {};
  },
  components: {
    ProductList,
    Footer
  }
};
</script>

<style lang="less" scoped>
.commodity {
  height: 100%;
  overflow: auto;
  padding-bottom: 50px;
  box-sizing: border-box;
}
</style>
