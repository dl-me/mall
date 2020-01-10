<template>
  <div class="orderDetail">
    <Header theme="white">
      <template slot="mid">订单详情</template>
    </Header>
    <div class="payment-scrool">
      <div class="payment-status">
        <p>{{statusText}}</p>
        <p class="remain">剩余：{{parseInt(lastPayTime / 60)}}小时{{parseInt(lastPayTime % 60)}}分钟</p>
      </div>
      <div class="mailing-address">
        <div class="mail-info">
          <div class="info-desc">
            <p class="info-name">{{order.receiverName}} {{order.receiverPhone}}</p>
            <p
              class="info-address"
            >{{order.receiverProvince}}{{order.receiverCity}}{{order.receiverDetailAddress}}</p>
          </div>
        </div>
        <div class="mail"></div>
      </div>

      <div class="pending-desc">
        <div class="order-time">
          <p class="order-time-title">
            <img src="../../assets/src/mallicon.png" />
            <span>智冷库品</span>
          </p>
        </div>
        <div v-for="item in order.orderItemList" :key="item.id" class="order-content">
          <div class="show-img">
            <img :src="item.productPic" alt />
          </div>
          <div class="show-desc">
            <p class="show-title">{{item.productName}}</p>
            <p
              class="show-content"
            >{{JSON.parse(item.productAttr).map(({value}) => value).join(';')}}</p>
            <div class="price">
              <span class="show-price">￥{{item.productPrice}}</span>
              <span class="show-num">x {{item.productQuantity}}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="delivery-method">
        <span>配送方式</span>
        <span>包邮</span>
      </div>

      <div class="price-all">
        <p class="price" v-if="order.totalAmount !== undefined">
          <span>商品总额</span>
          <span>¥{{order.totalAmount.toFixed(2)}}</span>
        </p>
        <p class="price" v-if="order.freightAmount !== undefined">
          <span>运费</span>
          <span>+ ¥{{order.freightAmount.toFixed(2)}}</span>
        </p>
        <p class="price" v-if="order.payAmount !== undefined">
          <span>实付金额</span>
          <span class="actual-payment">¥{{order.payAmount.toFixed(2)}}</span>
        </p>
      </div>

      <div class="price-all">
        <p class="price">
          <span>订单编号</span>
          <span>{{order.orderSn}}</span>
        </p>
        <p class="price">
          <span>下单时间</span>
          <span>{{new Date(order.createTime).toLocaleString()}}</span>
        </p>
        <p class="price" v-if="1">
          <span>付款时间</span>
          <span>{{new Date(order.createTime).toLocaleString()}}</span>
        </p>
      </div>

      <div class="delete">
        <template v-if="order.status === 0">
          <button @click="cancelOrder">取消订单</button>
          <button class="immediately" @click="ensurePay">立即付款</button>
        </template>
        <template v-if="order.status === 2">
          <button class="immediately" @click="confirmOrder">确认收货</button>
        </template>
        <template v-if="order.status === 3">
          <button @click="deleteOrder">删除订单</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
export default {
  name: "orderDetail",
  data() {
    return {
      order: {},
      lastPayTime: Infinity,
      timer: undefined,
      times: 5
    };
  },
  computed: {
    id() {
      return this.$route.query.id;
    },
    statusText() {
      if (!this.order) {
        return "";
      }

      switch (this.order.status) {
        case 0:
          return "等待支付";
        case 2:
          return "卖家已发货";
        case 3:
          return "交易成功";

        default:
          return "";
      }
    }
  },
  mounted() {
    if (this.$route.query.pay) {
      this.ensurePay();
    }

    this.getOrder();
  },
  methods: {
    async ensurePay() {
      let data = await this.$api.ensurePay({ orderId: this.id, payType: 2 });

      try {
        if (!window.inWX) {
          if (!this.times) {
            return this.$notify("当前不在微信环境");
          }

          this.times--;

          setTimeout(() => {
            this.ensurePay();
          }, 1000);
          return;
        }

        let {
          nonce_str: nonceStr,
          appid: appId,
          sign: paySign,
          sign_type: signType,
          ...rest
        } = JSON.parse(data);

        window.WeixinJSBridge.invoke(
          "getBrandWCPayRequest",
          {
            nonceStr,
            appId,
            paySign,
            signType,
            ...rest
          },
          res => {
            switch (res.err_msg) {
              case "get_brand_wcpay_request:ok":
                this.$notify({
                  type: "success",
                  message: "支付成功"
                });

                break;

              case "get_brand_wcpay_request:cancel":
                this.$notify("支付已取消");

                break;

              case "get_brand_wcpay_request:fail":
                this.$notify("支付失败");

                break;
            }
          }
        );
      } catch (error) {
        this.$notify("发起支付失败");
      }
    },
    async getOrder() {
      this.order = await this.$api.getOrder({}, this.id);

      this.lastPayTime = this.order.lastPayTime;

      if (this.timer) {
        clearInterval(this.timer);
      }

      this.timer = setInterval(() => {
        this.lastPayTime -= 1;
      }, 60000);
    },
    async deleteOrder() {
      await this.$dialog.alert({
        title: "删除订单",
        message: "是否删除此订单？",
        showCancelButton: true,
        closeOnPopstate: true
      });

      await this.$api.deleteOrder({
        orderId: this.id
      });

      this.$router.replace("/Order");
    },
    async confirmOrder() {
      await this.$dialog.alert({
        title: "确认收货",
        message: "是否确认收货？",
        showCancelButton: true,
        closeOnPopstate: true
      });

      await this.$api.confirmReceiptOrder({
        orderId: this.id
      });
    },
    async cancelOrder() {
      await this.$dialog.alert({
        title: "取消订单",
        message: "是否取消该订单？",
        showCancelButton: true,
        closeOnPopstate: true
      });

      await this.$api.cancelOrder({
        orderId: this.id
      });

      this.$router.replace("/Order");
    }
  },
  components: {
    Header
  }
};
</script>

<style lang="less" scoped>
.orderDetail {
  height: 100%;
  overflow: hidden;
  background-color: #f1f1f1;
  .payment-scrool {
    height: 100%;
    overflow: auto;
    padding-bottom: 120px;
    box-sizing: border-box;
    .payment-status {
      height: 100px;
      background-color: #000;
      display: flex;
      flex-direction: column;
      justify-content: center;
      box-sizing: border-box;
      padding: 0 15px;
      p {
        color: #fff;
        font-size: 0.3rem;
      }
      .remain {
        font-size: 0.24rem;
        margin: 12px 0;
      }
    }
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
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px;
        box-sizing: border-box;
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
            margin: 7px 0;
          }
          .price {
            display: flex;
            justify-content: space-between;
            margin-top: 50px;
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
      span:first-child {
        color: #999;
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
        .actual-payment {
          font-size: 0.3rem;
          font-weight: 700;
        }
        span {
          font-size: 0.28rem;
        }
        span:first-child {
          color: #999;
        }
      }
    }
    .delete {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      text-align: right;
      padding: 11px 15px;
      box-sizing: border-box;
      background-color: #fff;
      button {
        width: 68px;
        height: 30px;
        border: none;
        background-color: transparent;
        outline: none;
        color: #ccc;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 0.24rem;
      }
      .immediately {
        background-image: linear-gradient(135deg, #edcd95 10%, #cfad69 100%);
        color: #6d4b0e;
        margin-left: 15px;
      }
      .sure {
        color: #cfad69;
        border: 1px solid #cfad69;
      }
    }
  }
}
</style>
