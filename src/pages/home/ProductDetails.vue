<template>
  <div class="productDetails" v-if="selectedSpec" @scroll="handleScroll">
    <div class="banner">
      <van-swipe @change="onChange">
        <van-swipe-item v-for="pic in albumPics" :key="pic">
          <img :src="pic" />
        </van-swipe-item>
        <div class="custom-indicator" slot="indicator">{{ current + 1 }}/{{ albumPics.length }}</div>
      </van-swipe>
    </div>
    <div class="scrollTop">
      <div class="header-abs-content" v-show="showAbs">
        <div class="header-abs" @click="goBack">
          <span class="iconfont">&#xe60a;</span>
        </div>
        <!-- <p class="header-right-icon" @click="shareShow = true">
          <span class="iconfont">&#xe626;</span>
        </p> -->
      </div>

      <div class="header-fixed" v-show="!showAbs" :style="opacityStyle">
        <div class="header-fixed-desc">
          <div class="iconfont header-fixed-back" @click="goBack">
            <span class="iconfont">&#xe60a;</span>
          </div>
          <div class="header-fixed-content">
            <span>商品</span>
            <span>详情</span>
            <span>推荐</span>
          </div>
          <!-- <p class="header-right-icon" @click="shareShow = true">
            <span class="iconfont">&#xe626;</span>
          </p> -->
        </div>
      </div>
    </div>

    <!-- 分享 -->
    <!-- <div class="type-selection" v-show="shareShow">
      <div class="shareFriends">
        <div class="friends">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-weixin" />
          </svg>
          <p>微信</p>
        </div>
        <div class="weChat">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-pengyouquan" />
          </svg>
          <p>微信朋友圈</p>
        </div>
        <p class="cancel" @click="shareShow = false">取消</p>
      </div>
    </div> -->

    <div class="product-desc">
      <p class="product-title">{{ data.name }}</p>
      <div class="product-price">
        <p class="new-price">
          <span>￥{{ selectedSpec.productPrice }}</span>
        </p>
        <del class="old-price">
          <span>￥{{ selectedSpec.originalPrice }}</span>
        </del>
      </div>
      <p class="sales">
        <span class="rebate" v-if="$store.state.userInfo.distributor">
          预计返佣
          <i>￥{{ selectedSpec.royaltyParam }}</i>
        </span>
        <span>
          销量
          <i>{{ data.sale }}</i>
        </span>
      </p>
    </div>

    <ul class="mine-list">
      <li @click="typeShow = true">
        <p class="mine-list-desc">
          类型数量选择：
          <span>{{ selectedSpec.specValue }}</span>
        </p>
        <span class="iconfont">&#xe62c;</span>
      </li>
      <router-link tag="li" to="/Address">
        <p class="mine-list-desc">
          发送至：
          <span>{{ sendTo }}</span>
        </p>
        <span class="iconfont">&#xe62c;</span>
      </router-link>
      <li>
        <p class="mine-list-desc">
          发货地：
          <span
            v-if="data.omsCompanyAddress"
          >{{data.omsCompanyAddress.province }}{{data.omsCompanyAddress.region }}</span>
        </p>
        <p class="freight">
          运费：
          <span>￥{{calcPostage}}</span>
        </p>
      </li>
    </ul>

    <!-- 商品详情 -->
    <p class="products-detail-title">商品详情</p>
    <div class="products-detail-img" v-html="data.detailMobileHtml"></div>

    <!-- 相似推荐 -->
    <p class="products-detail-title">相似推荐</p>

    <div class="products-similar">
      <div class="products-similar-item" v-for="item in recommendList" :key="item.id">
        <router-link
          tag="div"
          :to="'/ProductDetails?id=' + item.id"
          class="products-similar-item-img"
        >
          <img :src="item.pic" />
        </router-link>
        <div class="products-similar-item-desc">
          <p class="products-similar-item-title">{{ item.name }}</p>
          <p class="products-similar-item-new">￥{{ item.price }}</p>
          <del class="products-similar-item-old">￥{{ item.originalPrice }}</del>
          <p class="products-similar-item-return"  v-if="$store.state.userInfo.distributor">
            返佣
            <span>￥{{ item.royaltyParam }}</span>
          </p>
          <button class="immediately">立即购买</button>
        </div>
      </div>
    </div>

    <!-- 加入购物车 -->
    <div class="add-shoppingCart">
      <router-link tag="div" to="/ShoppingCart" class="shoppingCart-icon">
        <span class="iconfont">&#xe635;</span>
        <p>购物车</p>
      </router-link>
      <div class="add-shoppingCart-desc" @click="addCart">加入购物车</div>
      <div class="immediate-payment" @click="byNow">立即付款</div>
    </div>

    <product-type-select
      v-if="typeShow"
      v-model="typeShow"
      :specList="specList"
      :defaultSize="size"
      :selectedSpec="selectedSpec"
      @sizeChange="onSizeChange"
      @change="onSpecChange"
    >
      <div class="add-type-shoppingCart">
        <div class="add-to-shoppingCart" @click="addCart">加入购物车</div>
        <div class="buy-now" @click="byNow">立即购买</div>
      </div>
    </product-type-select>
  </div>
</template>

<script>
import ProductTypeSelect from "@/components/ProductTypeSelect";

export default {
  name: "ProductDetails",
  data() {
    return {
      data: {},
      selectedSpec: undefined,
      showAbs: true,
      typeShow: false,
      shareShow: false,
      current: 0,
      size: 1,
      opacityStyle: {
        opacity: 0
      },
      recommendList: [],
      calcPostage: 0
    };
  },
  watch: {
    "$route.query"() {
      this.init();
      document.querySelector(".productDetails").scrollTop = 0;
    },
    "$store.getters.sendTo"(address) {
      this.getCalcPostage();
    }
  },
  computed: {
    skuStock() {
      let selectedSpec = this.selectedSpec;

      return (
        selectedSpec &&
        (this.data.pmsSkuStockList || []).find(
          item =>
            item.productSpecId === selectedSpec.id &&
            item.productId === selectedSpec.productId
        )
      );
    },
    sendTo() {
      let address = this.$store.getters.sendTo;

      if (!address) {
        return "请选择地址";
      }

      let { province, city, region } = address;

      return `${province}${city}${region}`;
    },
    albumPics() {
      return (this.data.albumPics || "").split(",");
    },
    specList() {
      return this.data.pmsProductSpecList || [];
    }
  },
  mounted() {
    this.init().then(async () => {
      let wx = window.wx;

      if (!wx) {
        return;
      }

      let config = await this.$api.config({ curUrl: location.href });
      wx.config({
        debug: false,
        jsApiList: ["updateAppMessageShareData","updateTimelineShareData"],
        ...config
      });
      wx.ready(() => {
        wx.updateAppMessageShareData({
          title: "分享给你一个超值商品，快来看看吧", // 分享标题
          desc: this.data.name, // 分享描述
          link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: this.selectedSpec.specImg // 分享图标
        });

        wx.updateTimelineShareData({
          title: "分享给你一个超值商品，快来看看吧", // 分享标题
          desc: this.data.name, // 分享描述
          link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: this.selectedSpec.specImg // 分享图标
        });
      });
    });
  },
  methods: {
    async init() {
      let { id } = this.$route.query;

      if (id === undefined) {
        this.$router.go(-1);
      }

      await this.getProductDetail(id);
      this.size = 1;
      this.typeShow = false;

      this.getCalcPostage(this.$store.getters.sendTo);

      // 获取推荐商品
      this.recommendList = await this.$api.getRecommendProductList({
        pageSize: 4,
        pageNum: 1
      });

      setTimeout(() => {
        if (!this.selectedSpec) {
          this.$router.go(-1);
        }
      }, 100);
    },
    async getCalcPostage(address) {
      let data = this.data;

      if (!address || !data) {
        return;
      }

      let { province } = address;

      this.calcPostage = await this.$api.calcPostage({
        receiveCity: province,
        productId: data.id
      });
    },
    onSpecChange(selectedSpec) {
      this.selectedSpec = selectedSpec;
    },
    onSizeChange(size) {
      this.size = size;
    },
    async getProductDetail(id) {
      this.data = await this.$api.getProductDetail({ productId: id });
      this.selectedSpec = this.specList[0];
    },
    goBack() {
      this.$router.go(-1);
    },
    onChange(index) {
      this.current = index;
    },
    handleScroll(e) {
      const top = e.target.scrollTop;
      if (top > 60) {
        let opacity = top / 140;
        opacity = opacity > 1 ? 1 : opacity;
        this.opacityStyle = { opacity };
        this.showAbs = false;
      } else {
        this.showAbs = true;
      }
    },
    async addCart() {
      if (!this.selectedSpec) {
        this.$notify({
          type: "warning",
          message: "请选择商品类型"
        });

        this.typeShow = true;
      }

      let {
        productSn,
        productCategoryId,
        name: productName,
        subTitle: productSubTitle,
        brandName: productBrand
      } = this.data;

      let {
        id: productSpecId,
        productId,
        specName,
        specValue,
        specImg: productPic,
        productPrice: price
      } = this.selectedSpec;

      let { sp1, sp2, sp3, skuCode: productSkuCode, id: productSkuId } =
        this.skuStock || {};

      let names = specName.split("-");
      let values = specValue.split("-");

      let productAttr = JSON.stringify(
        names.map((name, index) => ({ key: name, value: values[index] }))
      );

      await this.$api.add(
        {
          productSpecId,
          productId,
          price,
          productAttr,
          productBrand,
          productCategoryId,
          productName,
          productPic,
          productSkuCode,
          productSkuId,
          productSn,
          productSubTitle,
          sp1,
          sp2,
          sp3,
          quantity: this.size
        },
        undefined,
        true
      );

      this.$notify({
        type: "success",
        message: "添加成功"
      });

      this.init();
    },
    byNow() {
      if (!this.selectedSpec) {
        this.$notify({
          type: "warning",
          message: "请选择商品类型"
        });

        this.typeShow = true;
      }

      let address = this.$store.getters.sendTo;

      if (!address) {
        this.$notify({
          type: "warning",
          message: "请选择收货地址"
        });
      }

      this.$store.commit("setPendingOrder", {
        spec: { ...this.selectedSpec, productName: this.data.name },
        productNum: this.size
      });

      this.$router.push("/PlaceOrder?type=p");
    }
  },
  components: {
    ProductTypeSelect
  }
};
</script>

<style lang="less" scoped>
.productDetails {
  height: 100%;
  overflow: auto;
  background-color: #f1f1f1;
  i {
    font-style: normal;
  }
  .banner {
    position: relative;
    overflow: hidden;
    height: 0;
    padding-bottom: 48%;
    .banner-img {
      width: 100%;
      height: unset;
    }
    .banner-number {
      position: absolute;
      right: 0.2rem;
      bottom: 0.2rem;
      height: 0.38rem;
      line-height: 0.38rem;
      padding: 0 0.2rem;
      border-radius: 0.2rem;
      background: rgba(0, 0, 0, 0.4);
      font-size: 0.24rem;
      color: #fff;
      .banner-icon {
        font-size: 0.24rem;
      }
    }
  }
  .header-abs-content {
    width: 100%;
    position: absolute;
    top: 20px;
    display: flex;
    justify-content: space-between;
    text-align: center;
    box-sizing: border-box;
    padding: 0 15px;
    .header-abs {
      width: 0.52rem;
      height: 0.52rem;
      line-height: 0.52rem;
      border-radius: 0.4rem;
      background: rgba(0, 0, 0, 0.4);
      span {
        color: #fff;
        font-size: 0.4rem;
      }
    }
    .header-right-icon {
      line-height: 26px;
      .iconfont {
        color: #fff;
        font-size: 0.36rem;
      }
    }
  }

  .header-fixed {
    z-index: 2;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 55px;
    line-height: 55px;
    text-align: center;
    color: #fff;
    background: #333;
    font-size: 0.32rem;
    .header-fixed-desc {
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding: 0 15px;
      .header-right-icon {
        .iconfont {
          color: #fff;
          font-size: 0.36rem;
        }
      }
      .header-fixed-content {
        width: 50%;
        display: flex;
        justify-content: space-around;
        font-size: 15px;
      }
      .header-fixed-back {
        .iconfont {
          font-size: 0.36rem;
        }
      }
    }
  }
  .product-desc {
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    padding: 0 15px;
    background-color: #fff;
    .product-title {
      font-size: 0.36rem;
      font-weight: 700;
      margin: 0.3rem 0;
    }
    .product-price {
      display: flex;
      align-items: center;
      .new-price {
        font-size: 0.32rem;
        font-weight: 700;
      }
      .old-price {
        margin-left: 10px;
        color: #999;
        font-size: 0.28rem;
        text-decoration: line-through;
      }
    }
    .sales {
      display: flex;
      justify-content: space-between;
      color: #999;
      font-size: 0.24rem;
      margin: 0.3rem 0;
      .rebate {
        color: #cfad69;
      }
    }
  }

  .mine-list {
    box-sizing: border-box;
    margin: 10px auto;
    background-color: #fff;
    padding: 0 15px;
    li {
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.28rem;
      .mine-list-desc {
        display: flex;
        align-items: center;
        color: #999;
        span {
          color: #333;
        }
        img {
          height: 20px;
          width: 20px;
          margin-right: 10px;
        }
        .iconfont {
          color: #999;
          font-size: 0.28rem;
        }
      }
      .next {
        height: 20px;
        width: 20px;
      }
      .freight {
        color: #999;
      }
    }
  }
  .products-detail-title {
    font-size: 0.3rem;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .products-detail-title:before {
    content: "";
    height: 1px;
    background: linear-gradient(135deg, #fff 10%, #999999 100%);
    width: 40px;
    margin-right: 10px;
  }
  .products-detail-title:after {
    content: "";
    height: 1px;
    background: linear-gradient(135deg, #999 10%, #fff 100%);
    width: 40px;
    margin-left: 10px;
  }
  .products-detail-img {
    img {
      width: 100%;
      height: auto;
    }
  }
  .products-similar {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    justify-content: space-between;
    padding-bottom: 70px;
    .products-similar-item:nth-child(2n) {
      margin-left: 0;
    }
    .products-similar-item {
      box-sizing: border-box;
      width: 46%;
      background-color: #fff;
      margin: 10px 6px;
      .products-similar-item-img {
        img {
          height: 100%;
          width: 100%;
        }
      }
      .products-similar-item-desc {
        box-sizing: border-box;
        padding: 0.3rem 0.2rem;
        text-align: center;
        p {
          margin: 0.2rem 0;
        }
        .immediately {
          width: 100%;
          height: 30px;
          font-size: 0.22rem;
          border: none;
          background-image: linear-gradient(135deg, #edcd95 10%, #cfad69 100%);
          outline: none;
          color: #6d4b0e;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .products-similar-item-title {
          font-size: 0.28rem;
          line-height: 0.35rem;
        }
        .products-similar-item-new {
          font-size: 0.24rem;
          font-weight: 700;
        }
        .products-similar-item-old {
          color: #999;
          font-size: 0.22rem;
          text-decoration: line-through;
        }
        .products-similar-item-return {
          color: #cfad69;
          font-size: 0.22rem;
        }
      }
    }
  }
  .add-shoppingCart {
    width: 100%;
    display: flex;
    position: fixed;
    bottom: 0;
    height: 50px;
    background-color: #fff;
    text-align: center;
    .shoppingCart-icon {
      width: 20%;
      font-size: 0.2rem;
      display: flex;
      align-items: center;
      flex-direction: column;
      .iconfont {
        font-size: 0.45rem;
        box-sizing: border-box;
        margin: 6% 0;
      }
    }
    .add-shoppingCart-desc,
    .immediate-payment {
      width: 40%;
      line-height: 50px;
      font-size: 0.3rem;
    }
    .add-shoppingCart-desc {
      background: #333;
      color: #fff;
    }
    .immediate-payment {
      background-image: linear-gradient(135deg, #edcd95 10%, #cfad69 100%);
      color: #6d4b0e;
    }
  }
  .type-selection {
    z-index: 99;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
    .shareFriends,
    .type-selection-box {
      width: 100%;
      background-color: #fff;
      position: absolute;
      bottom: 0;
      border-radius: 0.32rem 0.32rem 0 0;
      font-size: 14px;
    }

    // 分享
    .shareFriends {
      height: 120px;
      display: flex;
      justify-content: space-around;
      // align-items: center;
      flex-wrap: wrap;
      font-size: 0.22rem;
      text-align: center;
      .friends,
      .weChat {
        margin-top: 15px;
        .icon {
          height: .7rem;
          width: .7rem;
        }
        p {
          margin-top: 0.2rem;
        }
      }
      .cancel {
        // height: 57px;
        // line-height: 57px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-top: 1px solid #e5e5e5;
        font-size: 0.3rem;
      }
    }
    // 选择
    .type-selection-box {
      min-height: 8rem;
      .type-selection-detail {
        box-sizing: border-box;
        padding: 0 0.3rem 1.68rem;
        font-size: 0.28rem;
        .type-selection-img {
          display: flex;
          align-items: center;
          position: relative;
          img {
            height: 1.82rem;
            width: 1.82rem;
            position: absolute;
            bottom: -56px;
          }
        }
        .type-selection-price {
          margin: 0.34rem 0 0 1.8rem;
          p {
            margin: 0.1rem 0.2rem;
          }
          p:first-child {
            color: #cfad69;
            font-size: 0.3rem;
          }
          p:last-child {
            font-size: 0.24rem;
          }
        }

        .type-selection-num {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 50px;
          margin-top: 30px;
          .selection-num {
            display: flex;
            align-items: center;
            .selection-num-subtraction,
            .selection-num-addition {
              height: 0.7rem;
              line-height: 0.7rem;
              text-align: center;
              width: 0.7rem;
              border: 1px solid #999;
              color: #999;
            }
            .selection-num-actual {
              width: 20px;
              margin: 0 10px;
              text-align: center;
            }
          }
        }
      }
      .add-type-shoppingCart {
        display: flex;
        position: fixed;
        bottom: 0;
        height: 50px;
        line-height: 50px;
        width: 100%;
        text-align: center;
        font-size: 0.3rem;
        .add-to-shoppingCart {
          width: 50%;
          background: #333;
          color: #fff;
        }
        .buy-now {
          width: 50%;
          background-image: linear-gradient(135deg, #edcd95 10%, #cfad69 100%);
          color: #6d4b0e;
        }
      }
    }
  }
}
</style>
<style lang="less">
.productDetails {
  .van-swipe {
    position: unset;
  }
  .van-swipe-item {
    display: flex;
    overflow: unset;
    img {
      height: 4rem;
      width: auto;
      margin: 0 auto;
    }
  }
  .custom-indicator {
    color: #fff;
    position: absolute;
    bottom: 7px;
    right: 10px;
  }
}
</style>
