<template>
  <div class="placeOrder">
    <Header theme="white">
      <template slot="mid">填写订单</template>
    </Header>

    <!-- 已选界面 -->
    <router-link tag="div" to="/Address" class="mailing-address">
      <div class="mail-info">
        <div class="info-desc">
          <p class="info-name">{{ address.name }} {{ address.phoneNumber }}</p>
          <p v-if="!address.province" class="add-address-desc iconfont">&#xe6d2; &nbsp;新增收货地址</p>
          <p class="info-address" v-else>
            {{
            `${address.province}${address.region}${address.city}${address.detailAddress}`
            }}
          </p>
        </div>
        <div class="mail-next iconfont">&#xe62c;</div>
      </div>
      <div class="mail"></div>
    </router-link>

    <div class="pending-desc">
      <div class="order-time">
        <p class="order-time-title">
          <img src="../../assets/src/mallicon.png" />
          <span>智冷库品</span>
        </p>
      </div>
      <div v-if="pendingOrder" class="order-content">
        <div class="show-img">
          <img :src="pendingOrder.spec.specImg" alt />
        </div>
        <div class="show-desc">
          <p class="show-title">{{ pendingOrder.spec.productName }}</p>
          <p class="show-content">{{ pendingOrder.spec.specValue }}</p>
          <div class="price">
            <span class="show-price">￥{{ pendingOrder.spec.productPrice }}</span>
            <div class="selection-num">
              <van-stepper v-model="pendingOrder.productNum" />
            </div>
          </div>
        </div>
      </div>

      <div v-if="sorder">
        <div v-for="item in sorder.cartPromotionItemList" :key="item.id" class="order-content">
          <div class="show-img">
            <img :src="item.productPic" alt />
          </div>
          <div class="show-desc">
            <p class="show-title">{{ item.productName }}</p>
            <p class="show-content">
              {{
              JSON.parse(item.productAttr)
              .map(({ value }) => value)
              .join(";")
              }}
            </p>
            <div class="price">
              <span class="show-price">￥ {{ item.price }}</span>
              <div class="selection-num">
                <span>x {{ item.quantity }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="delivery-method">
      <span>配送方式</span>
      <span>包邮</span>
    </div>

    <div class="price-all">
      <p class="price">
        <span>支付方式</span>
        <span class="chosePay" @click="shareShow = true">
          微信支付
          <span class="iconfont">&#xe62c;</span>
        </span>
      </p>
    </div>

    <!-- 分享 -->
    <div class="type-selection" v-show="shareShow">
      <div class="shareFriends">
        <div class="cancel">
          <span @click="shareShow = false">取消</span>
          <span @click="shareShow = false">确定</span>
        </div>
        <div class="pay-type">
          <div class="weChat-pay-desc">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-weixin1" />
            </svg>
            <p class="weChatPay">微信支付</p>
          </div>
          <van-checkbox :value="true"></van-checkbox>
        </div>
      </div>
    </div>

    <div class="price-all">
      <p class="price">
        <span>商品总额</span>
        <span>￥{{ totalAmount }}</span>
      </p>
      <p class="price">
        <span>运费</span>
        <span>+￥{{ freightAmount }}</span>
      </p>
    </div>

    <div class="toPay">
      <p class="pay-total">
        合计:
        <span>￥{{ payAmount }}</span>
      </p>
      <p class="toPay-button" @click="doPay">去付款</p>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
export default {
  name: "place-order",
  data() {
    return {
      shareShow: false,
      pendingOrder: undefined,
      calcPostage: 0,
      sorder: undefined
    };
  },
  computed: {
    type() {
      return this.$route.query.type;
    },
    address() {
      return this.$store.getters.sendTo || {};
    },
    freightAmount() {
      switch (this.type) {
        case "p":
          return this.calcPostage;
        case "s":
          return this.sorder
            ? parseFloat(this.sorder.calcAmount.freightAmount)
            : 0;
        default:
          return 0;
      }
    },
    totalAmount() {
      switch (this.type) {
        case "p": {
          if (!this.pendingOrder) {
            return 0;
          }

          let {
            spec: { productPrice },
            productNum
          } = this.pendingOrder;

          return (productPrice * productNum).toFixed(2);
        }

        case "s":
          return this.sorder
            ? parseFloat(this.sorder.calcAmount.totalAmount)
            : 0;
        default:
          return 0;
      }
    },
    payAmount() {
      switch (this.type) {
        case "p":
          return (
            parseFloat(this.totalAmount) + parseFloat(this.calcPostage)
          ).toFixed(2);

        case "s":
          return this.sorder ? parseFloat(this.sorder.calcAmount.payAmount) : 0;
        default:
          return 0;
      }
    }
  },
  watch: {
    address() {
      if (this.type === "p") {
        this.getCalcPostage();
      }
    }
  },
  mounted() {
    let type = this.type;

    switch (type) {
      case "p": {
        let pendingOrder = this.$store.state.pendingOrder;

        if (pendingOrder) {
          this.pendingOrder = pendingOrder;
          this.$store.commit("setPendingOrder", undefined);
          this.getCalcPostage();

          return;
        }

        break;
      }
      case "s": {
        let idList = this.$store.state.idList;

        if (idList.length) {
          this.$api
            .generateConfirmOrderSection({ carItermIdStr: idList.join(",") })
            .then(res => (this.sorder = res));
          this.$store.commit("nonSelectd", []);
        } else {
          this.$api.generateConfirmOrder().then(res => (this.sorder = res));
        }
        return;
      }
    }

    this.$router.go(-1);
  },
  methods: {
    async getCalcPostage() {
      let { province } = this.address;

      this.calcPostage = await this.$api.calcPostage({
        receiveCity: province,
        productId: this.pendingOrder.spec.productId
      });
    },
    async doPay() {
      let id;

      switch (this.type) {
        case "p": {
          let pendingOrder = this.pendingOrder;
          if (pendingOrder) {
            let {
              spec: { productId, id: productSpecId },
              productNum
            } = pendingOrder;

            let { order } = await this.$api.directOrderConfirm({
              productId,
              productSpecId,
              productNum,
              memberReceiveId: this.address.id
            });

            id = order.id;
          }
          break;
        }

        case "s":
          if (this.sorder) {
            let id = await this.$api.generateOrder(
              {
                carItermIdStr: this.sorder.cartPromotionItemList
                  .map(item => item.id)
                  .join(","),
                memberReceiveAddressId: this.address.id,
                payType: 2
              },
              undefined,
              true
            );
          }
      }

      if (id) {
        this.$router.push(`/orderDetail?pay=1&id=${id}`);
      }
    }
  },
  components: {
    Header
  }
};
</script>

<style lang="less" scoped>
.placeOrder {
  height: 100%;
  overflow: auto;
  background-color: #f1f1f1;
  .mailing-address {
    background-color: #fff;
    .mail {
      position: relative;
      height: 3px;
      background: repeating-linear-gradient(
        45deg,
        #ffffff 10px,
        #ffffff 20px,
        #58c 20px,
        #58c 30px,
        #ffffff 30px,
        #ffffff 40px,
        #e55 40px,
        #e55 50px
      );
    }

    .mail-info {
      height: 90px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;
      box-sizing: border-box;
      .add-address-desc {
        font-size: 0.3rem;
        color: #999;
        margin: 0 auto;
        text-align: center;
      }
      .info-desc {
        .info-name {
          font-size: 0.3rem;
          color: #333;
        }
        .info-address {
          font-size: 0.24rem;
          color: #999;
          margin: 10px 0;
        }
      }
      .mail-next {
        img {
          height: 20px;
          width: 20px;
        }
      }
    }
  }
  .pending-desc {
    padding: 0 15px 20px;
    background-color: #fff;
    .order-time {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding-top: 5px;
      .order-time-title {
        padding: 0.2rem 0;
        img {
          height: 0.28rem;
          width: 0.28rem;
          margin-right: 0.1rem;
        }
      }
    }
    .order-content {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      margin-top: 20px;
      .show-img {
        vertical-align: middle;
        img {
          height: auto;
          width: 100px;
        }
      }
      .show-desc {
        flex: 1;
        padding-left: 1rem;

        .show-title {
          color: #333;
          font-size: 0.28rem;
        }
        .show-content {
          color: #999;
          font-size: 0.24rem;
          margin: 0.12rem 0;
        }
        .price {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 50px;
          .selection-num {
            display: flex;
            align-items: center;
            .selection-num-subtraction,
            .selection-num-addition {
              height: 0.5rem;
              line-height: 0.5rem;
              text-align: center;
              width: 0.5rem;
              border: 1px solid #999;
              color: #999;
            }
            .selection-num-actual {
              width: 20px;
              margin: 0 10px;
              text-align: center;
            }
          }
          .show-price {
            font-size: 0.28rem;
            color: #333;
          }
          .show-num {
            font-size: 0.24rem;
            color: #666;
          }
        }
      }
    }
  }
  .delivery-method {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    box-sizing: border-box;
    background-color: #fff;
    margin: 10px 0;
    span {
      font-size: 0.28rem;
    }
  }
  .price-all {
    padding: 11px 15px;
    box-sizing: border-box;
    background-color: #fff;
    margin: 10px 0;
    .price {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 30px;
      .chosePay {
        color: #999;
      }
      .actual-payment {
        font-size: 0.3rem;
        font-weight: 700;
      }
      span {
        font-size: 0.28rem;
      }
    }
  }
  .toPay {
    display: flex;
    align-items: center;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    height: 0.98rem;
    line-height: 0.98rem;
    width: 100%;
    font-size: 0.3rem;
    .pay-total {
      flex: 2;
      text-align: right;
      span {
        margin: 0 0.3rem 0 0;
      }
    }
    .toPay-button {
      flex: 1;
      background-image: linear-gradient(135deg, #edcd95 10%, #cfad69 100%);
      text-align: center;
    }
  }
  // 分享
  .type-selection {
    z-index: 99;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
    // 分享
    .shareFriends {
      width: 100%;
      background-color: #fff;
      position: absolute;
      bottom: 0;
      border-radius: 25px 25px 0 0;
      font-size: 14px;
      height: 105px;
      font-size: 0.22rem;
      text-align: center;
      .cancel {
        height: 1rem;
        line-height: 1rem;
        font-size: 0.3rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #e5e5e5;
        margin: 0 0.3rem;
        span {
          // height: 100%;
          // width: 50%;
          box-shadow: border-box;
          padding: 0 0.2rem;
        }
      }
      .pay-type {
        height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 25px;
        .weChat-pay-desc {
          width: 35%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .icon{
            height: .44rem;
            width: .44rem;
          }
        }
        .weChatPay {
          font-size: 15px;
        }
      }
    }
    // 选择
    .type-selection-box {
      height: 480px;
      .type-selection-detail {
        box-sizing: border-box;
        padding: 0 15px;
        font-size: 0.28rem;
        .type-selection-img {
          display: flex;
          align-items: center;
          img {
            height: 120px;
            width: 100px;
          }
          .type-selection-price {
            p {
              margin: 10px;
            }
            p:first-child {
              color: #cfad69;
              font-size: 0.3rem;
            }
            p:last-child {
              font-size: 0.24rem;
            }
          }
        }
        .type-selection-color {
          margin: 10px 0;
          .type-selection-color-kind {
            display: flex;
            // justify-content: space-around;
            margin: 10px 0;
            span {
              border: 1px solid #999;
              box-sizing: border-box;
              padding: 14px;
              color: #999;
              margin-right: 20px;
            }
            .selected {
              border: 1px solid #cfad69;
              color: #cfad69;
              background-color: #faf7f0;
            }
          }
        }
        .type-selection-size {
          margin: 10px 0;
          .type-selection-size-kind {
            display: flex;
            margin: 10px 0;
          }
          span {
            border: 1px solid #999;
            box-sizing: border-box;
            padding: 14px;
            color: #999;
            margin-right: 20px;
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
              height: 40px;
              line-height: 40px;
              text-align: center;
              width: 40px;
              border: 1px solid #999;
              color: #999;
            }
            .selection-num-actual {
              margin: 0 16px;
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
.pay-type {
  .van-checkbox__icon--checked .van-icon {
    background-color: #cfad69;
    border-color: #cfad69;
  }
  .mint-cell:last-child {
    background-image: unset;
  }
  .mint-cell-wrapper {
    background-image: unset;
  }
  .mint-checklist-title {
    margin: 0;
  }
  .mint-checklist-label {
    width: 63%;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
  }
  .mint-checkbox {
    box-shadow: border-box;
  }
  .mint-checkbox-input:checked + .mint-checkbox-core {
    background-color: #cfad69;
    border-color: #cfad69;
  }
}
</style>
