<template>
  <div class="home">
    <div class="home-title">
      <div class="home-logo">
        <img src="@/assets/logo.png" alt />
      </div>
      <div class="search-category">
        <router-link tag="div" to="/Search" class="search">
          <span class="iconfont">&#xe644;</span>
        </router-link>
        <div class="category" @click="classifyMask = !classifyMask">
          <span class="iconfont">
            {{
            classifyMask ? "&#xe642;" : "&#xe600;"
            }}
          </span>
        </div>
      </div>
      <div class="classify" @click.self="classifyMask = false" v-show="classifyMask">
        <div class="mask">
          <div class="more-con">
            <van-collapse
              v-for="(productItem, id) in productCateLists"
              :key="id"
              v-model="activeCateId"
              accordion
            >
              <van-collapse-item :title="productItem.name" :name="productItem.id">
                <template v-if="secCateDict[productItem.id]">
                  <div
                    v-for="sec in secCateDict[productItem.id]"
                    :key="sec.id"
                    @click="cateItem(sec.id)"
                  >{{ sec.name }}</div>
                </template>
              </van-collapse-item>
            </van-collapse>
          </div>
        </div>
      </div>
    </div>

    <div class="carousel">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item
          v-for="item in advertiseList.filter(item => item.type === 0).slice(0,5)"
          :key="item.id"
        >
          <img :src="item.pic" @click="onAdvertiseClick(item)" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <div
      class="details"
      v-for="(item) in advertiseList.filter(item => item.type === 1).slice(0,3)"
      :key="item.id"
      :style="{backgroundImage: `url('${item.pic}')`}"
      v-veveal.slideLeft
    >
      <div class="details-desc">
        <button class="view-now" @click="onAdvertiseClick(item)" v-veveal.slideInUp.slow>立即查看</button>
      </div>
    </div>

    <div class="kind">
      <p class="refrigeration">推荐商品</p>
      <div class="kind-content">
        <router-link
          tag="div"
          class="kind-item"
          v-for="(recommendItem, index) in recommendProductLists"
          :key="index"
          :to="`/ProductDetails?id=${recommendItem.id}`"
          v-veveal.fadeInUp
        >
          <div class="kind-item-content" v-veveal.fadeInLeft>
            <p class="kind-item-title">{{ recommendItem.name }}</p>
            <p class="kind-item-desc">{{ recommendItem.subTitle }}</p>
          </div>
          <div class="kind-item-img" v-veveal.fadeInRight>
            <img :src="recommendItem.pic" />
          </div>
        </router-link>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/footer/Footer.vue";
import { log } from "util";
export default {
  name: "home",
  data() {
    return {
      classifyMask: false,
      activeCateId: undefined,
      secCateDict: {},
      recommendProductLists: [],
      productCateLists: [],
      advertiseList: []
    };
  },
  components: {
    Footer
  },
  watch: {
    activeCateId(id) {
      if (!id || this.secCateDict[id]) {
        return;
      }

      this.$api.getProductCateList({ parentId: id }).then(list => {
        this.$set(this.secCateDict, id, list);
      });
    }
  },
  mounted() {
    this.getAdvertiseList();
    this.recommendProductList();
    this.productCateList();
  },
  methods: {
    onAdvertiseClick(item) {
      window.open(item.url);
    },
    async getAdvertiseList() {
      this.advertiseList = await this.$api.advertiseList();
    },
    async recommendProductList() {
      this.recommendProductLists = await this.$api.getRecommendProductList({
        pageSize: 10,
        pageNum: 1
      });
    },
    async productCateList() {
      this.productCateLists = await this.$api.getProductCateList({
        parentId: 0
      });
    },

    cateItem(id) {
      this.$router.push({ path: "/CateItem", query: { typeId: id } });
    }
  }
};
</script>
<style lang="less" scoped>
.home {
  .iconfont {
    color: #fff;
  }
  .home-title {
    width: 100%;
    height: 50px;
    background-image: linear-gradient(135deg, #000 10%, #333 100%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    z-index: 99;
    .home-logo img {
      height: 23px;
      line-height: 23px;
      width: 106px;
    }
    .search-category {
      display: flex;
      // justify-content: space-around;
      width: 16%;
      align-items: center;
      .search {
        margin-right: 10px;
      }
      .category {
        transition: all 0.2s ease-out;
      }
      img {
        height: 16px;
        width: 16px;
      }
    }
  }
  .classify {
    z-index: 99;
    position: fixed;
    left: 0;
    top: 50px;
    width: 100%;
    height: 85%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
    // transition: all transform 2s;
    // transform: rotate(250deg);

    .mask {
      width: 50%;
      height: 100%;
      background-color: #111;
      position: absolute;
      right: 0;
      bottom: 0;
      font-size: 14px;
      font-size: 0.22rem;
      text-align: center;
      .more-con {
        color: #fff;
        font-size: 0.28rem;
        .more-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 0 0.6rem;
          height: 0.9rem;
          img {
            height: 20px;
            width: 20px;
          }
        }
        .more-detail:first-child {
          li:last-child {
            margin-bottom: 90px;
          }
        }
        .more-detail {
          height: 0.8rem;
          line-height: 0.8rem;
          padding-bottom: 1.6rem;
          li {
            text-align: left;
            margin-left: 0.9rem;
          }
        }
      }
    }
  }

  .carousel {
    margin-top: 50px;
    .van-swipe-item {
      width: 100%;
      height: 555px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .mint-swipe-indicator {
      background: #848385;
    }
  }
  .details {
    position: relative;
    height: 100%;
    width: 100%;

    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    img {
      height: 100%;
      width: 100%;
    }
    .details-desc {
      width: 50%;
      overflow: auto;
      margin: auto;
      position: absolute;
      bottom: 24%;
      right: 0;
      left: 0;
      color: #fff;
      text-align: center;

      .details-name {
        font-size: 0.4rem;
      }
      .details-content {
        font-size: 0.36rem;
        color: #676767;
        margin: 10px 0;
      }
      .signature {
        font-size: 0.24rem;
        border-top: 1px solid #fff;
        width: 90px;
        text-align: center;
        margin: 20px auto;
        padding: 10px 0;
      }
      .view-now {
        width: 150px;
        height: 40px;
        border: none;
        background-color: transparent;
        outline: none;
        color: #fff;
        border: 1px solid #fff;
        font-size: 0.28rem;
      }
    }
  }
  .kind {
    background-color: #f1f1f1;
    .refrigeration {
      height: 63px;
      color: #333333;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      font-size: 0.32rem;
    }
    .refrigeration:after {
      content: "";
      height: 1px;
      background: #999999;
      position: absolute;
      width: 40px;
      top: 80%;
      left: 46%;
    }
    .kind-content {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      box-sizing: border-box;
      padding-bottom: 70px;
      .kind-item:nth-child(2n) {
        margin-left: 0;
      }
      .kind-item {
        box-sizing: border-box;
        //   height: 250px;
        // flex: 1;
        width: 46%;
        background-color: #fff;
        margin: 2% 2.5%;
        .kind-item-content {
          margin: 15px 0 0 15px;
          .kind-item-title {
            color: #999999;
            font-size: 0.22rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .kind-item-desc {
            color: #333;
            margin-top: 0.2rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 0.32rem;
          }
        }
        .kind-item-img {
          text-align: right;
          padding-right: 6px;
          overflow: hidden;

          img {
            height: 127px;
            width: auto;
          }
        }
      }
    }
  }
}
</style>

<style lang="less">
.home {
  height: 100%;
  overflow: auto;
  [class*="van-hairline"]::after,
  .van-collapse-item {
    border-top: none;
    // border-bottom: 1px solid #808080;
  }
  .van-cell:not(:last-child)::after,
  [class*="van-hairline"]::after {
    border-bottom: none;
  }
  .van-collapse-item__title--expanded {
    border-bottom: none;
  }
  .van-cell--clickable:active {
    background-color: unset;
  }
  .van-cell {
    color: #fff;
    background-color: #000;
  }
  .van-collapse-item__content {
    background-color: #000;
    padding: 0 0.2rem;
    line-height: 2.8;
  }
  .van-cell .van-cell--clickable .van-collapse-item__title {
    border-color: none;
  }
  .mint-swipe-indicators {
    .mint-swipe-indicator {
      background: #8a898b;
    }
    .mint-swipe-indicator.is-active {
      background: #fff;
    }
  }
}
</style>
