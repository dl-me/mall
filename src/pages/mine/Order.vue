<template>
  <div class="order">
    <Header theme="white">
      <template slot="mid">订单</template>
    </Header>

    <van-tabs v-model="active">
      <van-tab v-for="{title,status} in tabs" :key="title" :title="title">
        <order-list :status="status" @click="onClick">
          <template #status="{item}">{{getTitle(item)}}</template>
          <template #footer="{item,remove}">
            <van-button
              v-show="item.status === 0"
              size="mini"
              @click="cancelOrder(item,remove)"
            >取消订单</van-button>
            <van-button v-show="item.status === 0" size="mini" @click="payOrder(item)">立即付款</van-button>

            <van-button v-show="item.status === 2" size="mini" @click="confirmOrder(item)">确认收货</van-button>

            <van-button
              v-show="item.status === 3"
              size="mini"
              @click="deleteOrder(item,remove)"
            >删除订单</van-button>
          </template>
        </order-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
import OrderList from "@/components/OrderList";

export default {
  name: "Order",
  data() {
    return {
      active: undefined,
      tabs: [
        {
          title: "全部",
          status: undefined
        },
        {
          title: "待付款",
          status: 0
        },
        {
          title: "待收货",
          status: 2
        },
        {
          title: "已完成",
          status: 3
        }
      ]
    };
  },
  methods: {
    payOrder() {
      this.$api.ensurePay({ orderId: this.id, payType: 2 });
    },
    async deleteOrder(item, remove) {
      await this.$dialog.alert({
        title: "删除订单",
        message: "是否删除此订单？",
        showCancelButton: true,
        closeOnPopstate: true
      });

      await this.$api.deleteOrder({
        orderId: item.id
      });

      remove();
    },
    async confirmOrder(item) {
      await this.$dialog.alert({
        title: "确认收货",
        message: "是否确认收货？",
        showCancelButton: true,
        closeOnPopstate: true
      });

      await this.$api.confirmReceiptOrder({
        orderId: item.id
      });
    },
    async cancelOrder(item, remove) {
      await this.$dialog.alert({
        title: "取消订单",
        message: "是否取消该订单？",
        showCancelButton: true,
        closeOnPopstate: true
      });

      await this.$api.cancelOrder({
        orderId: item.id
      });

      remove();
    },
    getTitle(item) {
      let { title, status } = this.tabs[this.active];

      if (status !== undefined) {
        return title;
      }

      return this.getOrderType(item).title;
    },
    onClick(item) {
      this.$router.push(`/orderDetail?id=${item.id}`);
    },
    getOrderType(item) {
      return this.tabs.find(tab => tab.status === item.status) || {};
    }
  },
  components: {
    Header,
    OrderList
  }
};
</script>

<style lang="less" scoped>
.order {
  display: flex;
  flex-direction: column;
  height: 100%;

  .search {
    height: 18px;
    width: 18px;
  }
}
</style>

<style lang="less">
.order {
  .van-tabs__line {
    background-color: #cfad69;
  }
  .van-card__footer .van-button {
    margin-left: 10px;
  }
  .van-tabs--line {
    flex: 1;
    overflow: hidden;
  }
  .van-card__desc {
    font-size: 0.24rem;
    margin: 4px 0px;
  }
  .van-card__title {
    font-size: 0.28rem;
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
    margin-right: 10px;
  }
  .van-card__price {
    color: #333;
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
    .van-card {
      background-color: unset;
    }
    .van-tabs__track {
      background-color: #f1f1f1;
      height: 100vh;
      overflow: auto;
      .van-tab__pane {
        margin-bottom: 68px;
        background-color: #fff;
      }
    }
  }
}
</style>

