<template>
  <div class="rebateRecord">
    <Header theme="white">
      <template slot="mid">返佣记录</template>
    </Header>
    <div class="rebete-scrool">
      <van-list
        v-model="loading"
        :immediate-check="false"
        :finished="finished"
        @load="onLoad"
        loading-text="记录查询中"
        finished-text="没有更多啦"
      >
        <div class="order-record" v-for="(item,index) in Array(20).fill(list).flat()" :key="index">
          <div class="order-record-left">
            <p class="order-num">订单： {{item.orderSn}}</p>
            <p>{{item.remark}}</p>
            <p>{{new Date(item.royaltyTime).toLocaleString()}}</p>
          </div>
          <div class="order-record-right" v-if="item.royaltyAmount>0">+{{item.royaltyAmount}}</div>
          <div class="order-record-right" v-if="item.royaltyAmount<0">-{{item.royaltyAmount}}</div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
export default {
  name: "RebateRecord",
  data() {
    return {
      loading: false,
      list: [],
      pageSize: 10,
      pageNum: 1,
      maxPages: Infinity
    };
  },
  watch: {
    pageNum() {
      this.queryList();
    }
  },
  computed: {
    finished() {
      return this.pageNum > this.maxPages;
    },
    options() {
      return {
        pageSize: this.pageSize,
        pageNum: this.pageNum
      };
    }
  },
  mounted() {
    this.queryList();
  },
  methods: {
    onLoad() {
      this.pageNum++;
    },
    async queryList() {
      if (this.finished) {
        this.loading = false;
        return;
      }

      let { pages, data } = await this.$api.royaltyList(this.options);

      this.maxPages = pages;
      this.list.push(...data);

      this.loading = false;
    }
  },
  components: {
    Header
  }
};
</script>

<style lang="less" scoped>
.rebateRecord {
  height: 100%;
  overflow: hidden;
  .rebete-scrool {
    height: 100%;
    overflow: auto;
    .order-record:last-child {
      margin-bottom: 1rem;
    }
    .order-record {
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0.4rem 0.3rem;
      border-bottom: 1px solid #e6e6e6;
      .order-record-left {
        color: #999;
        font-family: PingFangSC-Regular, PingFang SC;
        p {
          margin: 0.12rem 0;
          font-size: 0.24rem;
        }
        .order-num {
          font-size: 0.28rem;
          color: #333333;
        }
      }
      .order-record-right {
        font-size: 0.36rem;
        margin-top: 0.1rem;
        font-family: PingFangSC-Medium, PingFang SC;
      }
    }
  }
}
</style>
