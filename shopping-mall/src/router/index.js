import Vue from "vue";
import VueRouter from "vue-router";
import BottomFrameOfMall from "../views/BottomFrameOfMall";

Vue.use(VueRouter);

const routes = [
  {
    path: "/mall",
    redirect: "/"
  },
  {
    path:"/",
    component: BottomFrameOfMall,
    children:[
      {
        path: "",
        name: "mall",
        component: () => import("../components/Mall/Mall.vue"),
      }
    ]
  },

  {
    path: "/class",
    component: BottomFrameOfMall,
    children:[
      {
        path: "",
        name: "class",
        component: () => import("../components/Class/Class.vue"),
        meta:{
          title: "商品分类"
        }
      }
    ]
  },
  {
    path: "/shopping-car",
    component: BottomFrameOfMall,
    children:[
      {
        path: "",
        name: "shopping-car",
        component: () => import("../components/ShoppingCar/ShoppingCar.vue"),
        meta:{
          title: "购物车"
        }
      }
    ]
  },
  {
    path: "/my",
    component: BottomFrameOfMall,
    children:[
      {
        path: "",
        name: "my",
        component: () => import("../components/My/My.vue"),
        meta:{
          title: "会员中心"
        }
      }
    ]
  },
  {
    path: "/commodity-details",
    name: "commodity-details",
    component: ()=> import("../components/CommodityDetails/CommodityDetails.vue")
  },
  {
    path: "/log-and-register",
    name: "log-and-register",
    component: () => import ("../components/LogAndRegister/LogAndRegister.vue")
  },
  {
    path: "/user-info",
    name: "user-info",
    component: () => import ("../components/My/UserInfo/UserInfo.vue")
  },
  {
    path: "/city",
    name: "city",
    component: () => import ("../components/City/City.vue")
  },
  {
    path: "/my-orders",
    name: "my-orders",
    component: () => import ("../components/My/MyOrders/MyOrders.vue")
  },
  {
    path: "/comment",
    name: "comment",
    component: () => import ("../components/My/Comment/Comment.vue")
  },
  {
    path: "/collections",
    name: "collections",
    component: () => import ("../components/My/Collections/Collections.vue")
  },
  {
    path: "/address",
    name: "address",
    component: () => import ("../components/My/Address/Address.vue")
  },
  {
    path: "/history",
    name: "history",
    component: () => import ("../components/My/History/History.vue")
  },
  {
    path: "/order-settlement",
    name: "order-settlement",
    component: () => import ("../components/ShoppingCar/OrderSettlement/OrderSettlement.vue")
  },
  {
    path: "/edit-address",
    name: "edit-address",
    component: () => import ("../components/My/Address/EditAddress/EditAddress.vue")
  },
  {
    path: "/comment-detail",
    name: "comment-detail",
    component: () => import ("../components/My/Comment/CommentDetails/CommentDetails.vue")
  },
  {
    path: "/commented",
    name: "commented",
    component: () => import ("../components/My/Comment/Commented/Commented.vue")
  },
  {
    path: "/test-gaode",
    name: "test-gaode",
    component: () => import ("../views/TestGaoDe.vue"),
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to,from, next) => {
  document.title = to.meta.title;
  from;
  next();
});
export default router;
