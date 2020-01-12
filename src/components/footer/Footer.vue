<template>
  <div class="tab-bar">
    <van-tabbar :value="active" inactive-color="#767676" active-color="#fff" @change="onChange">
      <van-tabbar-item
        v-for="(item, index) in tabbars"
        :key="index"
        @click="onClick(index)"
      >
        <span>{{ item.title }}</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? item.active : item.normal"
        />
      </van-tabbar-item>
    </van-tabbar>


    <van-popup
      v-model="show"
      closeable
      close-icon="close"
      position="bottom"
      :style="{ height: '20%' }"
    >
      <a
        v-for="(call, index) in telephone"
        :key="index"
        :href="'tel:' + call"
        class="service"
        >{{ call }}</a
      >
    </van-popup>

    
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      // selected: "/",
      telephone: ["028-67876808", "028-87878446"],
      show: false,
      active: 0,
      tabbars: [
        {
          name: "/",
          title: "首页",
          normal: require("../../assets/src/index.png"), //默认图标
          active: require("../../assets/src/selectedhome.png") //选中图标
        },
        {
          name: "Commodity",
          title: "商品",
          normal: require("../../assets/src/shangping.png"),
          active: require("../../assets/src/shangpingChecked.png")
        },
        {
          name: "ShoppingCart",
          title: "购物车",
          normal: require("../../assets/src/shopping.png"),
          active: require("../../assets/src/shoppingchecked.png")
        },
        {
          name: "customerService",
          title: "客服",
          normal: require("../../assets/src/server.png"),
          active: require("../../assets/src/serverChecked.png")
        },
        {
          name: "Mine",
          title: "我的",
          normal: require("../../assets/src/me.png"),
          active: require("../../assets/src/minechecked.png")
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
      this.show = true;
    } else if (this.$route.name == "mine") {
      this.active = 4;
    }
  },
  methods:{
    onChange(index) {
      if(index !== 3) {
        this.active = index;
      }
    },
    onClick(index){
      if(index === 3){
        this.show = true;
      } else {
        this.$router.push(this.tabbars[index].name);
      }
    }
  }
};
</script>

<style lang="less">
.tab-bar {
  .service {
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #ebedf0;
  }
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
