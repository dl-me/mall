<template>
  <div class="search">
    <div class="search-header">
      <div v-show="back" class="back-icon" @click="goBack">
        <span class="iconfont">&#xe60a;</span>
      </div>
      <van-search v-if="!category" background="unset" placeholder="请输入商品关键词" v-model="searchText" />
      <span class="search-input" v-else>分类列表{{list&&list[0]?` - ${list[0].productCategoryName}`:''}}</span>
    </div>

    <van-list
      v-model="loading"
      :immediate-check="false"
      :finished="finished"
      @load="onLoad"
      loading-text="商品查询中"
      finished-text="没有更多啦"
    >
      <div class="products-similar">
        <div
          class="products-similar-item"
          v-for="item in list"
          :key="item.id"
          @click="goDetail(item.id)"
        >
          <div class="products-similar-item-img">
            <img :src="item.pic" />
          </div>
          <div class="products-similar-item-desc">
            <p class="products-similar-item-title">{{item.name}}</p>
            <p class="products-similar-item-new">￥{{item.price}}</p>
            <del class="products-similar-item-old">￥{{item.originalPrice}}</del>
            <p class="products-similar-item-return" v-if="$store.state.userInfo.distributor">
              返佣
              <span>￥{{item.royaltyParam}}</span>
            </p>
            <button class="immediately" @click.stop="onSelect(item)">立即购买</button>
          </div>
        </div>
      </div>
    </van-list>

    <product-type-select
      v-if="typeShow"
      v-model="typeShow"
      :specList="specList"
      :defaultSize="currentSelectingProductSize"
      :selectedSpec="currentSelectingProductSpec"
      @sizeChange="onTypeSelectSizeChange"
      @change="onSpecChange"
    >
      <div class="add-type-shoppingCart" @click="goConfirmOrder">
        <div class="add-to-shoppingCart" style="flex:1">确定</div>
      </div>
    </product-type-select>
  </div>
</template>

<script>
import ProductTypeSelect from "@/components/ProductTypeSelect";

export default {
  name: "ProductList",
  props: ["back", "category"],
  data() {
    return {
      loading: false,
      typeShow: false,
      list: [],
      pageSize: 10,
      pageNum: 1,
      maxPages: Infinity,
      searchText: "",
      timer: undefined,
      specList: [],
      currentSelectingProductSize: 1,
      currentSelectingProductSpec: undefined,
      currentSelectingProductName: undefined
    };
  },
  computed: {
    finished() {
      return this.pageNum > this.maxPages;
    },
    options() {
      let typeId = this.category;

      return {
        ...(typeId
          ? {
              typeId
            }
          : {
              merchantId: 1,
              productName: this.searchText
            }),
        pageSize: this.pageSize,
        pageNum: this.pageNum
      };
    }
  },
  watch: {
    searchText() {
      this.reset();
      this.dqueryList();
    },
    pageNum() {
      this.dqueryList();
    }
  },
  mounted() {
    if (!this.back || this.category) {
      this.queryList();
    }
  },
  methods: {
    async onSelect(item) {
      let list = await this.$api.getProductSpec({ productId: 7 });

      if (!list || !list.length) {
        this.$notify({
          type: "error",
          message: "商品没有可选规格"
        });
        return;
      }

      this.specList = list;
      this.currentSelectingProductName = item.name;
      this.currentSelectingProductSpec = list[0];
      this.typeShow = true;
    },
    onSpecChange(spec) {
      this.currentSelectingProductSpec = spec;
    },
    onTypeSelectSizeChange(size) {
      this.currentSelectingProductSize = size;
    },
    goConfirmOrder() {
      this.$store.commit("setPendingOrder", {
        spec: {
          ...this.currentSelectingProductSpec,
          productName: this.currentSelectingProductName
        },
        productNum: this.currentSelectingProductSize
      });

      this.typeShow = false;
      this.$router.push("/PlaceOrder?type=p");
    },
    dqueryList() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = undefined;
      }

      this.timer = setTimeout(() => {
        this.queryList();
      }, 400);
    },
    async queryList() {
      if (this.finished) {
        this.loading = false;
        return;
      }

      let res = await this.$api[
        this.category ? "getCategoryProductList" : "getSearchProductList"
      ](this.options);
      let data;

      if ("pages" in res) {
        data = res.data;
        this.maxPages = res.total;
      } else {
        data = res;
      }

      this.list.push(...data);

      this.loading = false;
    },
    reset() {
      this.list = [];
      this.pageNum = 1;
      this.maxPages = Infinity;
    },
    onLoad() {
      this.pageNum++;
    },
    goDetail(id) {
      this.$router.push(`/ProductDetails?id=${id}`);
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  components: {
    ProductTypeSelect
  }
};
</script>

<style lang="less" scoped>
.search {
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  .search-header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 100%;
    color: #fff;
    background: #333;
    position: fixed;
    .back-icon {
      box-sizing: border-box;
      padding: 15px;
      .iconfont{
        color: #fff;
      }
    }
    .search-input {
      display: flex;
      align-items: center;
      width: 80%;
      text-align: left;
      border: 0;
      outline: none;
      position: relative;
      input {
        height: 33px;
        width: 100%;
        //   position: relative;
        border-radius: 6px;
        outline: none;
        border: none;
        box-sizing: border-box;
        padding: 0 10px;
      }
      span {
        position: absolute;
        right: 0;
        height: 33px;
        width: 33px;
        line-height: 33px;
        text-align: center;

        img {
          height: 18px;
          width: 18px;
        }
      }
    }
  }
  .products-similar {
    min-height: 180px;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    justify-content: space-between;
    .products-similar-item:nth-child(2n) {
      margin-left: 0;
    }
    .products-similar-item {
      box-sizing: border-box;
      width: 46%;
      background-color: #fff;
      margin: 10px 6px;
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
      .products-similar-item-img {
        img {
          height: 100%;
          width: 100%;
        }
      }
      .products-similar-item-desc {
        box-sizing: border-box;
        padding: 10px 15px;
        text-align: center;
        p {
          margin: 5px 0;
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
          margin-bottom: 0.15rem;
        }
        .products-similar-item-title {
          font-size: 0.28rem;
          margin: 0.2rem 0;
          line-height: 0.38rem;
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
          margin: 0.2rem 0;
        }
      }
    }
    .products-similar-item:nth-of-type(1),
    .products-similar-item:nth-of-type(2) {
      margin-top: 70px;
    }
  }
}
</style>
<style lang="less">
.search {
  .van-search {
    width: 90%;
    padding: 10px 12px 10px 0px;
  }
  .van-search__content {
    width: 90%;
  }
}
</style>

