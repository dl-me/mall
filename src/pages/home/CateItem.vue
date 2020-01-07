<template>
  <product-list :back="true" :category="$route.query.typeId"></product-list>
</template>

<script>
import ProductList from "@/components/ProductList";
export default {
  name: "CateItem",
  mounted() {
      console.log(this.$route.query.typeId);
      
  },
  components: {
    ProductList
  }
};
</script>

