import axios from "axios";
import qs from "qs";

const URL = "http://47.111.115.249:8089";
const API = {
  //根据分类获取产品
  getCategoryProductList: "/home/categoryProductList",
  // 首页内容页信息展示
  getContent: "/home/content",
  // 获取侧边栏分类
  getProductCateList: "/home/productCateList",
  // 分类获取推荐商品
  getRecommendProductList: "/home/recommendProductList",
  // 根据分类获取专题
  getSubjectList: "/home/subjectList",
  // 微信共享登录
  getAuth: "/wx/login/authorization",
  config: "/wx/jssdk/getConfig",

  // 用户会员信息管理
  additionalPhone: "/member/info/additionalPhone", // 补充手机信息
  distributorInfo: "/member/info/distributorInfo", //分销信息
  makeDistributorShareQrcode: "/member/info/makeDistributorShareQrcode", //分销二维码
  listMember: "/member/info/listMember", // 团队列表
  load: "/member/info/load", // 获取用户基本信息
  royaltyList: "/member/info/royaltyList", //返佣记录

  // 地址
  getAddressList: "/member/address/list",
  getAddress: "/member/address",
  addAddress: "/member/address/add",
  deleteAddress: "/member/address/delete",
  updateAddress: "/member/address/update",

  // 商品管理
  getProductDetail: "/product/productDetail",
  getProductSpec: "/product/getProductSpec",
  getSearchProductList: "/product/searchProductList",
  calcPostage: "/order/calcPostage",

  // 购物车
  add: "/cart/add",
  clear: "/cart/clear",
  delete: "/cart/delete",
  getProduct: "/cart/getProduct", //用于重选规格
  getList: "/cart/list", // 获取某个会员的购物车列表
  getQuantity: "/cart/update/quantity", // 修改某个商品数量
  updateAttr: "/cart/update/attr",
  getLogout: "/home/logout",
  generateConfirmOrderSection: "/order/generateConfirmOrderSection", // 未选择全部购买

  // 首页内容管理
  advertiseList: "/home/advertiseList",

  // 下单相关
  generateConfirmOrder: "/order/generateConfirmOrder",

  // 订单相关
  getOrder: "/order",
  orderList: "/order/orderList",
  confirmReceiptOrder: "/order/orderList/confirmReceiptOrder",
  cancelOrder: "/order/cancelOrder",
  directOrderConfirm: "/order/directOrderConfirm",
  deleteOrder: "/order/deleteOrder",
  ensurePay: "/order/ensurePay",
  generateOrder: "/order/generateOrder"
};

// 可选的错误
const ERROR = {
  orderList: "orderList"
};

// 同步到 vuex
const SYNCING = {
  getAddressList: "addressList",
  load: "userInfo"
};

export default function(Vue) {
  Vue.prototype.$api = new Proxy(API, {
    get: function(target, property) {
      if (property.startsWith("$")) {
        return target[property];
      }

      let uri = target[property];

      if (!uri) {
        return;
      }

      return function(data, path, json = false) {
        let isGetType = property.startsWith("get");

        let options = {
          url: `${URL}${uri}${path ? `/${path}` : ""}`,
          ...(isGetType
            ? { method: "get", params: data }
            : {
                method: "post",
                ...(json
                  ? { data }
                  : {
                      data: qs.stringify(data),
                      headers: {
                        "content-type": "application/x-www-form-urlencoded"
                      }
                    })
              })
        };

        return axios(options)
          .then(res => {
            let message;

            if (res.status === 200) {
              res = res.data;

              if (res.code === 200) {
                let value = res.data;

                // sync vuex

                let key = SYNCING[property];

                if (key) {
                  let vue = target["$vue"];

                  if (vue) {
                    vue.$store.commit("apiSync", { key, value });
                  }
                }

                return value;
              }

              message = res.message;
            }

            throw Error(ERROR[property] || message || "请求失败"); // 错误信息
          })
          .catch(error => {
            let errorCallback = target["$error"];

            if (!errorCallback) {
              return;
            }

            errorCallback(error.message);
          });
      };
    },
    set: function(target, property, value) {
      switch (property) {
        case "$error":
          if (typeof value === "function") {
            target[property] = value;
          }
          break;
        case "$vue":
          target[property] = value;
          break;
      }

      return true;
    }
  });
}
