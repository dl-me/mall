<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "app",
  created() {
    this.init();
  },
  mounted() {
    this.$api.$vue = this;
    this.$api.$error = this.$notify;
    this.$api.getAddressList();

    window.onBridgeReady = function() {
      window.inWX = true;
    };

    if (typeof WeixinJSBridge == "undefined") {
      if (document.addEventListener) {
        document.addEventListener(
          "WeixinJSBridgeReady",
          window.onBridgeReady,
          false
        );
      } else if (document.attachEvent) {
        document.attachEvent("WeixinJSBridgeReady", window.onBridgeReady);
        document.attachEvent("onWeixinJSBridgeReady", window.onBridgeReady);
      }
    } else {
      window.onBridgeReady();
    }
  },
  methods: {
    async init() {
      let info = await this.$api.load();

      if (!info.distributor) {
        this.$router.replace("/DistributionLogin");
      }
    }
  }
};
</script>
<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
  overflow: hidden;
}
p {
  margin: 0;
}
ul {
  padding: 0;
}
li {
  list-style: none;
}
.van-notify--danger {
  line-height: 34px !important;
}
</style>
