<template>
  <van-list
    v-model="loading"
    :immediate-check="false"
    :finished="finished"
    @load="onLoad"
    loading-text="订单查询中"
    finished-text="没有更多啦"
  >
    <template v-for="item in list">
      <div
        v-if="item.status <= 3 && (status !== undefined ? item.status === status: true)"
        :key="item.id"
        @click="onClick(item)"
      >
        <div class="order-time">
          <p class="order-time-title">
            下单时间：
            <span>{{new Date(item.createTime).toLocaleString()}}</span>
          </p>
          <p class="status">
            <slot name="status" :item="item"></slot>
          </p>
        </div>
        <van-card
          v-for="spec in item.orderItemList.slice(0,2)"
          :key="spec.id"
          :num="spec.productQuantity"
          :price="spec.productPrice"
          :desc="JSON.parse(spec.productAttr).map(({value}) => value).join(';')"
          :title="spec.productName"
        >
          <template slot="thumb">
            <router-link
              tag="img"
              :to="`/ProductDetails?id=${spec.productId}`"
              class="card-thumb"
              :src="spec.productPic"
              :alt="spec.name"
            />
          </template>
          <div slot="tags">
            <div class="total">
              <p>
                合计：¥
                <span>{{item.totalAmount}}</span>
              </p>
            </div>
          </div>

          <div slot="footer" @click.stop="timer = null">
            <slot name="footer" :item="item" :remove="remove(item.id)"></slot>
          </div>
        </van-card>
      </div>
    </template>
  </van-list>
</template>
<script>
export default {
  name: "OrderList",
  props: ["status"],
  data() {
    return {
      loading: false,
      list: [],
      pageSize: 10,
      pageNum: 1,
      maxPages: Infinity,
      timer: undefined
    };
  },
  computed: {
    finished() {
      return this.pageNum > this.maxPages;
    },
    options() {
      return {
        productName: this.searchText,
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        status: this.status
      };
    }
  },
  watch: {
    pageNum() {
      this.queryList();
    }
  },
  mounted() {
    this.queryList();
  },
  methods: {
    async queryList() {
      if (this.finished) {
        this.loading = false;
        return;
      }

      let { pages, data } = await this.$api.orderList(this.options);

      this.maxPages = pages;
      this.list.push(...data);

      this.loading = false;
    },
    remove(id) {
      return () => (this.list = this.list.filter(item => item.id !== id));
    },
    onLoad() {
      this.pageNum++;
    },
    onClick(item) {
      this.$emit("click", item);
    }
  }
};
</script>
<style lang="less" scoped>
.van-card {
  background-color: #fff;
}

.card-thumb {
  width: 100%;
  height: 100%;
}

.order-time {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 15px 0px;
  border-top: 10px solid #f1f1f1;
  .order-time-title {
    font-size: 0.24rem;
    color: #333;
  }
  .status {
    color: #cfad69;
    font-size: 0.28rem;
  }
}
.total {
  text-align: right;
  margin-top: 16px;
  color: #333;
  font-size: 12px;
  box-sizing: border-box;
  position: absolute;
  bottom: -25px;
  right: 0;
  span {
    font-size: 0.3rem;
  }
}
</style>

