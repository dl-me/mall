<template>
  <div class="tab-bar">
    <van-tabbar v-model="active" inactive-color="#767676" active-color="#fff">
      <van-tabbar-item v-for="(item,index) in tabbars" :key="index" :to="(item.name)">
        <span>{{item.title}}</span>
        <img slot="icon" slot-scope="props" :src="props.active ? item.active : item.normal" />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      // selected: "/",
      active: 0,
      tabbars: [
        {
          name: "/",
          title: "首页",
          normal: require("../../assets/index.png"),  //默认图标
          active: require("../../assets/selectedhome.png")  //选中图标
        },
        {
          name: "Commodity",
          title: "商品",
          normal: require("../../assets/shangping.png"),
          active: require("../../assets/shangpingChecked.png")
        },
        {
          name: "ShoppingCart",
          title: "购物车",
          normal: require("../../assets/shopping.png"),
          active: require("../../assets/shoppingchecked.png")
        },
        {
          name: "customerService",
          title: "客服",
          normal: require("../../assets/server.png"),
          active: require("../../assets/serverChecked.png")
        },
        {
          name: "Mine",
          title: "我的",
          normal: require("../../assets/me.png"),
          active: require("../../assets/minechecked.png")
        }
      ]
    };
    
  },

  mounted() {
    if (this.$route.name == "index") {
      this.active = 0;
    } else if (this.$route.name == "commodity") {
      this.active = 1;
    } else if (this.$route.name == "shoppingCart") {
      this.active = 2;
    } else if (this.$route.name == "customerService") {
      this.active = 3;
    } else if (this.$route.name == "mine") {
      this.active = 4;
    } 
  }


};
</script>

<style lang="less">
.tab-bar {
  .van-tabbar-item__icon {
    margin-bottom: 0px;
  }
  .van-tabbar {
    background-color: #000;
  }
  #tabbar {
    display: flex;
    justify-content: space-around;
    background-color: #000;
    border: none;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    color: #767676;
  }
  .van-tabbar-item__icon img {
    height: 0.54rem;
    width: 0.54rem;
  }
  #tabbar.mint-tabbar {
    background-image: unset;
  }
  #tabbar.mint-tabbar > .mint-tab-item.is-selected {
    background-color: unset;
    color: #fff;
  }
  .mint-tab-item .mint-tab-item-icon {
    height: 27px;
    width: 27px;
  }
  .mint-tab-item-label {
    color: #767676;
  }
}
</style>
