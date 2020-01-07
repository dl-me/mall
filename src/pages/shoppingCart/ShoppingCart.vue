<template>
  <div class="shoppingCart">
    <Header theme="white">
      <template slot="mid">购物车</template>
      <template slot="right">
        <span @click="payMode = !payMode">{{ payMode ? "编辑" : "完成" }}</span>
      </template>
    </Header>

    <div class="address-select">
      <div class="order-time">
        <p class="order-time-title">
          <img src="../../assets/mallicon.png" />
          <span>智冷库品</span>
        </p>
      </div>
      <van-checkbox-group v-model="result" ref="checkboxGroup">
        <van-checkbox
          v-for="(item, index) in list"
          :name="item.id"
          :key="index"
          label-disabled
        >
          <div class="order-in">
            <van-card :title="item.productName">
              <template slot="thumb">
                <router-link
                  tag="img"
                  :to="`/ProductDetails?id=${item.productId}`"
                  class="card-thumb"
                  :src="item.productPic"
                  :alt="item.name"
                />
              </template>
              <div class="cartSize" slot="desc" @click="onSelectSpec(item)">
                {{
                  JSON.parse(item.productAttr)
                    .map(({ value }) => value)
                    .join(";")
                }}
                <span class="iconfont">&#xe609;</span>
              </div>
              <div slot="tags" class="add-num">
                <div slot="tags">
                  <div class="total">
                    <p>
                      <span
                        >¥{{ (item.price * item.quantity).toFixed(2) }}</span
                      >
                    </p>
                  </div>
                </div>
                <div slot="footer">
                  <van-stepper
                    v-model="item.quantity"
                    @change="onSizeChange(item)"
                  />
                </div>
              </div>
            </van-card>
            <product-type-select
              v-if="typeShow"
              v-model="typeShow"
              :specList="specList"
              :defaultSize="item.quantity"
              :selectedSpec="currentSelectingProductSpec"
              @sizeChange="onTypeSelectSizeChange"
              @change="onSpecChange"
            >
              <div class="add-type-shoppingCart" @click="updateProduct(item)">
                <div class="add-to-shoppingCart">确定</div>
              </div>
            </product-type-select>
          </div>
        </van-checkbox>
      </van-checkbox-group>
    </div>

    <div class="shoppingCartPay">
      <div class="allSelect-but">
        <van-checkbox v-model="allSelected" @click="checkAll" label-disabled
          >全选</van-checkbox
        >
      </div>
      <div class="total-pay" v-show="payMode">
        <span class="total-money">合计：￥{{ totalMoney }}</span>
        <button @click="placeOrderPay" class="immediately-pay">立即购买</button>
      </div>
      <div class="total-pay" v-show="!payMode">
        <button class="immediately-del" @click="onDeleteCart">删除</button>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
import Footer from "@/components/footer/Footer.vue";
import ProductTypeSelect from "@/components/ProductTypeSelect";

export default {
  name: "ShoppingCart",
  data() {
    return {
      payMode: true,
      allSelected: false,
      list: [],
      result: [],
      typeShow: false,
      id: "",
      currentSelectingProduct: {},
      currentSelectingProductSpec: undefined,
      currentSelectingProductSize: 0
    };
  },
  watch: {
    typeShow(show) {
      if (!show) {
        this.currentSelectingProduct = {};
        this.currentSelectingProductSpec = undefined;
        this.currentSelectingProductSize = 0;
      }
    },
    result() {
      this.allSelected = this.result.length === this.list.length;
    },
    list() {
      this.allSelected = this.result.length === this.list.length;
    }
  },
  computed: {
    selectedList() {
      let set = new Set(this.result);
      return this.list.filter(item => set.has(item.id));
    },
    totalMoney() {
      return this.selectedList
        .reduce((count, item) => (count += item.quantity * item.price), 0)
        .toFixed(2);
    },
    specList() {
      return this.currentSelectingProduct.pmsProductSpecList || [];
    }
  },
  mounted() {
    this.getCartList();
  },
  methods: {
    placeOrderPay(){
      if(!this.allSelected){
        this.$store.commit('nonSelectd',this.result);
      }
      this.$router.push({path:'/PlaceOrder?type=s'});
    },
    seleckClose() {
      this.typeShow = false;
    },
    onSpecChange(spec) {
      this.currentSelectingProductSpec = spec;
    },
    onTypeSelectSizeChange(size) {
      this.currentSelectingProductSize = size;
    },
    onSizeChange({ id, quantity }) {
      this.$api.getQuantity({
        id,
        quantity
      });
    },
    async updateProduct(item) {
      let quantity = this.currentSelectingProductSize || item.quantity;

      let currentSelectingProductSpec = this.currentSelectingProductSpec;

      let {
        productSn,
        productCategoryId,
        name: productName,
        subTitle: productSubTitle,
        brandName: productBrand,
        pmsSkuStockList = []
      } = this.currentSelectingProduct;

      let {
        id,
        productId,
        specName,
        specValue,
        specImg: productPic,
        productPrice: price
      } = currentSelectingProductSpec;

      let { sp1, sp2, sp3, skuCode: productSkuCode } =
        currentSelectingProductSpec &&
        pmsSkuStockList.find(
          item => item.productSpecId === id && item.productId === productId
        );

      let names = specName.split("-");
      let values = specValue.split("-");

      let productAttr = JSON.stringify(
        names.map((name, index) => ({ key: name, value: values[index] }))
      );

      await this.$api.updateAttr(
        {
          ...item,
          productId,
          price,
          productAttr,
          productBrand,
          productCategoryId,
          productName,
          productPic,
          productSkuCode,
          productSkuId: 0,
          productSn,
          productSubTitle,
          sp1,
          sp2,
          sp3,
          quantity
        },
        undefined,
        true
      );

      this.typeShow = false;
      this.getCartList();
    },
    async delete() {
      let params = {};
      let data = await this.$api.delete(params);
    },
    // 获取某个会员 购物车列表
    async getCartList() {
      this.list = await this.$api.getList();
      this.allSelected = false;
      this.result = [];
      this.typeShow = false;
      this.currentSelectingProduct = {};
      this.currentSelectingProductSpec = undefined;
      this.currentSelectingProductSize = 0;
    
    },
    async onSelectSpec(item) {
      let productId = item.productId;

      this.currentSelectingProduct = await this.$api.getProductDetail({
        productId
      });

      let specValue = JSON.parse(item.productAttr)
        .map(({ value }) => value)
        .join("-");

      let selectedSpec = this.specList.find(
        spec => spec.specValue === specValue
      );

      if (!selectedSpec) {
        this.$notify("当前规格已失效，请重新选择");
        selectedSpec = this.specList[0];
      }

      if (!selectedSpec) {
        this.$notify("当前商品已无可选规格");

        return;
      }

      this.currentSelectingProductSpec = { ...selectedSpec };

      this.typeShow = true;
    },

    // 删除某个商品和清空购物车
    async onDeleteCart() {
      if (this.allSelected) {
        await this.$api.clear();
      } else {
        await this.$api.delete({ ids: this.result.join(",") });
      }

      this.$notify({
        type: "success",
        message: "删除成功"
      });

      this.getCartList();
    },

    checkAll() {
      this.$refs.checkboxGroup.toggleAll(!this.allSelected);
    }
  },
  components: {
    Header,
    Footer,
    ProductTypeSelect
  }
};
</script>

<style lang="less" scoped>
.order-time {
  flex: none;
  .order-time-title {
    padding: 0.2rem 0.3rem 0;
    img {
      height: 0.28rem;
      width: 0.28rem;
      margin-right: 0.1rem;
    }
  }
}

.shoppingCart {
  margin-bottom: 108px;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;
  box-sizing: border-box;
  .cartSize {
    font-size: 0.24rem;
    margin: 4px 0px;
    background: #f6f6f6;
    color: #999999;
    box-sizing: border-box;
    padding: 0 5px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .iconfont {
      font-size: 12px;
      color: #999999;
    }
  }
  .address-select {
    height: 100%;
    overflow: auto;
  }
  .shoppingCartPay {
    flex: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 54px;
    width: 100%;
    background: #fff;
    border-top: 1px solid #e6e6e6;
    .allSelect-but {
      display: flex;
      align-items: center;
    }
    .total-pay {
      display: flex;
      align-items: center;
      .immediately-pay,
      .immediately-del {
        height: 54px;
        width: 110px;
        background-image: linear-gradient(135deg, #edcd95 10%, #cfad69 100%);
        outline: none;
        color: #6d4b0e;
        margin-left: 0.3rem;
      }
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
      height: 172px;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      font-size: 0.22rem;
      text-align: center;
      img {
        height: 1.1rem;
        width: 1.1rem;
      }
      .friends,
      .weChat {
        margin-top: 15px;
        p {
          margin-top: 0.3rem;
        }
      }
      .cancel {
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
        .type-selection-color {
          margin: 0.6rem 0;
          .type-selection-color-kind {
            display: flex;
            margin: 0.2rem 0;
            flex-wrap: wrap;
            span {
              border: 1px solid #ccc;
              box-sizing: border-box;
              padding: 0.2rem;
              color: #666;
              margin-right: 0.2rem;
              margin-bottom: 0.2rem;
            }
            .selected {
              border: 1px solid #cfad69;
              color: #cfad69;
              background-color: #faf7f0;
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
          width: 100%;
          background: #333;
          color: #fff;
        }
      }
    }
  }
}
</style>

<style lang="less">
.shoppingCart {
  .card-thumb {
    width: 100%;
    height: 100%;
  }

  .van-checkbox__label {
    width: 90%;
  }
  .van-card__header {
    align-items: center;
  }
  .van-multi-ellipsis--l2,
  .van-multi-ellipsis--l3 {
    display: unset;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .van-card__content {
    position: relative;
    .down {
      position: absolute;
      right: 9%;
      top: 21%;
      font-size: 0.18rem;
      color: #999;
    }
  }
  .van-checkbox__icon--checked .van-icon {
    background-color: #cfad69;
    border-color: #cfad69;
  }
  .van-checkbox {
    margin: 0.4rem 0rem;
    box-sizing: border-box;
    padding: 0 0.3rem;
    justify-content: space-between;
  }
  .add-num {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 25px;
  }
  .van-card__footer .van-button {
    margin-left: 10px;
  }
  .van-tabs--line {
    flex: 1;
    overflow: hidden;
  }
  .van-card__title {
    font-size: 0.28rem;
    // width: 215px;
  }
  .van-card__bottom {
    line-height: 15px;
    .van-card__price,
    .van-card__num {
      margin-top: 36px;
      font-size: 0.28rem;
    }
  }
  .van-card__footer {
    margin: 40px 0 10px;
  }
  .van-tabs__content {
    height: 100%;
    overflow: auto;
    left: -15px;
    padding-bottom: 50px;
    box-sizing: border-box;
  }
  .van-card__thumb {
    width: 30%;
    margin-right: 10px;
  }
  .van-card__price {
    color: #333;
  }
  .van-card {
    background-color: #fff;
    padding: 0px;
  }
  .van-button--default {
    border: 1px solid #cccccc;
  }
  .van-button--mini {
    height: 0.6rem;
    line-height: 0.6rem;
    padding: 0px 11px;
    .van-tabs__line {
      background-color: #cfad69;
    }

    .van-tabs__track {
      background-color: #f1f1f1;
      height: 100vh;
      overflow: auto;
      // .mint-tab-container-wrap {
      //   margin-top: 50px;
      // }
      .van-tab__pane {
        margin-bottom: 68px;
        background-color: #fff;
      }
    }
  }
}
</style>
