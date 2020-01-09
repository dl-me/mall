import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/home/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/commodity", //商品
    name: "commodity",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/commodity/Commodity.vue")
  },
  {
    path: "/shoppingCart", //购物车
    name: "shoppingCart",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../pages/shoppingCart/ShoppingCart.vue"
      )
  },
  {
    path: "/customerService", //客服
    name: "customerService",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../pages/customerService/CustomerService.vue"
      )
  },
  {
    path: "/mine", //我的
    name: "mine",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/mine/Mine.vue")
  },
  {
    path: "/order", //我的订单
    name: "order",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/mine/Order.vue")
  },
  {
    path: "/orderDetail", // 订单详情
    name: "orderDetail",
    component: () =>
      import(
        /* webpackChunkName: "OrderDetail" */ "../pages/mine/OrderDetail.vue"
      )
  },
  {
    path: "/address", //地址选择
    name: "address",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/mine/Address.vue")
  },
  {
    path: "/addressEdit", //地址编辑
    name: "addressEdit",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/mine/AddressEdit.vue")
  },
  {
    path: "/addressManagement", //地址管理
    name: "addressManagement",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../pages/mine/AddressManagement.vue"
      )
  },
  {
    path: "/set", //设置
    name: "set",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/mine/Set.vue")
  },
  {
    path: "/nickname", //昵称
    name: "nickname",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/mine/Nickname.vue")
  },
  {
    path: "/distribution", //分销中心
    name: "distribution",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/mine/Distribution.vue")
  },
  {
    path: "/distributionLogin", //分销注册
    name: "distributionLogin",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../pages/mine/DistributionLogin.vue"
      )
  },
  {
    path: "/rebateRecord", //返佣记录
    name: "rebateRecord",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/mine/RebateRecord.vue")
  },
  {
    path: "/teamManagement", //团队管理
    name: "teamManagement",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/mine/TeamManagement.vue")
  },
  {
    path: "/qrCode", //分销二维码
    name: "qrCode",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/mine/QRCode.vue")
  },
  {
    path: "/productDetails", //商品详情
    name: "productDetails",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/home/ProductDetails.vue")
  },
  {
    path: "/search", //搜索框
    name: "search",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/home/Search.vue")
  },
  {
    path: "/placeOrder", //下单界面
    name: "placeOrder",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/home/PlaceOrder.vue")
  },
  {
    path: "/CateItem", //根据分类跳转页面
    name: "CateItem",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/home/CateItem.vue")
  }
];

//distribution
const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    //切换路由自动滚动到顶部
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach( (to, _, next) => {
  if(to.name === 'distribution' && !router.app.$options.store.state.userInfo.distributor) {
    next('/');
  }

  next();
})



export default router;
