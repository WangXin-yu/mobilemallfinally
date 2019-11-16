<template>
  <div class="my-box">
    <TitleSlot>会员中心</TitleSlot>
    <div class="head-box">
      <div v-if="login_state===true">
        <img src="../../images/set.png" alt="" class="set-image" @click="toUserInfo" >
      </div>
      <div class = "head-image-box">
        <div v-if="login_state === true">
          <img class="head-image" :src="user_info.avatar" alt="">
        </div>
        <div v-if="login_state === false">
          <img class="head-image" src="../../images/my-head.png" alt="">
        </div>
        <div v-if="login_state === false">
          <div class="log" @click="toLogAndRegister">登录/注册</div>
        </div>
        <div v-if="login_state === true">
          <div class="welcome" >欢迎您: {{user_info.nickname}}</div>
          <div class="quit" @click="Quit">退出登录</div>
        </div>
     </div>
    </div>
    <div class="to-be-operated">
      <div class="item" @click="goToMyOrder(1)">
        <div><img src="../../images/pay.png" alt="" class="operate-image"></div>
        <div>代付款</div>
      </div>
      <div class="item" @click="goToMyOrder(2)">
        <div><img src="../../images/deliver.png" alt="" class="operate-image"></div>
        <div>待发货</div>
      </div>
      <div class="item" @click="goToMyOrder(3)">
        <div><img src="../../images/receiving.png" alt="" class="operate-image"></div>
        <div>待收货</div>
      </div>
      <div class="item" @click="goToComment">
        <div class="comment-count-box">
          <div>
            <img src="../../images/evaluate.png" alt="" class="operate-image">
          </div>
          <div class="comment-count">
            <div class="comment-count-text">{{to_be_commented}}</div>
          </div>
        </div>
        <div>评价</div>
      </div>
      <div class="item" @click="goToMyOrder(4)">
        <div><img src="../../images/complete.png" alt="" class="operate-image"></div>
        <div>已完成</div>
      </div>
    </div>

    <div class="all-orders"  @click="goToMyOrder(0)">
      <div class="left">
        <img src="../../images/order.png" alt="" class="all-orders-icon">
        <div>全部订单</div>
      </div>
      <div><img src="../../images/arrow.png" alt="" class="all-orders-icon"></div>
    </div>
    <div class="all-orders" @click="goToCollections">
      <div class="left">
        <img src="../../images/my-collect.png" alt="" class="all-orders-icon">
        <div>收藏商品</div>
      </div>
      <div><img src="../../images/arrow.png" alt="" class="all-orders-icon"></div>
    </div>
    <div class="all-orders" @click="goToAddress">
      <div class="left">
        <img src="../../images/my-collect.png" alt="" class="all-orders-icon">
        <div>地址管理</div>
      </div>
      <div><img src="../../images/arrow.png" alt="" class="all-orders-icon"></div>
    </div>
    <div class="all-orders" @click="goToHistory">
      <div class="left">
        <img src="../../images/my-history.png" alt="" class="all-orders-icon">
        <div>最近浏览</div>
      </div>
      <div><img src="../../images/arrow.png" alt="" class="all-orders-icon"></div>
    </div>
  </div>
</template>

<script>
  import TitleSlot from "../../views/TitleSlot"
  export default {
    name: "My",
    components: {
      TitleSlot
    },
    props: {},
    data() {
      return {
        user_info:[],
        login_state: 'false',//存储用户的登录状态
        to_be_commented: 0,
      }
    },
    methods: {
      // 初始化用户信息
      async getUserInfo(){
        try {
          let result = await this.$api.user();
          if(result.code === -1){
            this.user_info = [];
            //将登录状态设置为未登录状态
            localStorage.setItem("login_state", false);
          }else {
            this.user_info = result.userInfo;
            //将登录状态设置为未登录状态
            localStorage.setItem("login_state", true);
          }
        } catch (e) {
          console.log(e);
        }
      },
      //    //获取未评价
      async getToBeCommented(page){
        try{
          let res = await this.$api.tobeEvaluated(page);
          this.to_be_commented = res.data.list.length;
          console.log(this.to_be_commented);
        }catch(err){
          console.log(err);
        }
      },
      //退出登录事件
      async Quit(){
          try {
            //将登录状态设置为未登录状态
            localStorage.setItem("login_state", false);
            this.login_state = false;
            let result = await this.$api.loginOut();
            this.user_info = [];
            console.log(result);
            //将localstorage的信息初始化
            localStorage.setItem("city", JSON.stringify(''));
          } catch (e) {
            console.log(e);
          }
        },
      //登录界面
      toLogAndRegister(){
        this.$router.push("/log-and-register");
      },
      //跳转到用户信息界面
      toUserInfo(){
        this.$router.push("/user-info");
      },
      //跳转到订单页
      goToMyOrder(status){
        this.$router.push({path: "/my-orders", query:{status: status}});
      },
      //跳转到评价界面
      goToComment(){
        this.$router.push("/comment");
      },
      //跳转到收藏界面
      goToCollections(){
        this.$router.push("/collections");
      },
      //跳转到地址管理
      goToAddress(){
        this.$router.push("/address");
      },
      //跳转到浏览记录
      goToHistory(){
        this.$router.push("/history");
      }
    },
    mounted() {
      this.login_state = JSON.parse(localStorage.getItem("login_state"));
      this.getToBeCommented();
      this.getUserInfo();
      //进入购物车页面底部高亮
      this.$store.state.index = 3;
    },
    created() {
    },
    filters: {},
    computed: {
    },
    watch: {},
    directives: {}
  }
</script>

<style scoped lang="scss">
  .my-box{
    position:absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #fff;
  }
  .title{
    height:43px;
    line-height: 43px;
    text-align: center;
    background: #fff;
    border-bottom: 1px solid #eee;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
  }
  .head-box{
    height: 210px;
    background: #ea1c71;
    padding: 15px;
    box-sizing: border-box;
    text-align: center;
    position: relative;
    .head-image-box{
      width:180px;
      height:120px;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      position: absolute;
      text-align: center;
      .welcome{
        width:160px;
        text-align: center;
        margin: 10px auto;
        color:#fff;
        font-size:16px;
        font-weight: bold;
      }
      .quit{
        color:#fff;
        font-size:14px;
      }
      .head-image{
        width:70px;
        height:70px;
        border-radius: 50%;
      }
      .log{
        margin-top: 20px;
        font-size: 14px;
        color: #fff;
      }
    }
    .set-image{
      width:20px;
      height: 20px;
      float: right;
      color: #fff
    }
  }
  .to-be-operated{
    height: 80px;
    line-height: 80px;
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
    box-sizing: border-box;
    background: #fff;
    .item{
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .item>div{
      height: 25px;
      line-height:25px;
      text-align: center;
      font-size:14px;
      color: #3A3A3A;
    }
    .operate-image{
      width:25px;
      height:25px;
    }
  }
  .all-orders{
    height:40px;
    line-height: 40px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    padding-left: 15px;
    box-sizing: border-box;
    color: #3A3A3A;
    font-size:14px;
    margin-bottom:15px;
    .left{
      display: flex;

    }
    .all-orders-icon{
      width: 20px;
      height: 20px;
      margin-top:10px;
      margin-right:5px;
    }
  }
  .comment-count-box{
    position: relative;
    .comment-count{
      width: 20px;
      height: 20px;
      background: red;
      border-radius: 50%;
      position: absolute;
      top: -10px;
      right: -5px;
      color: #fff;
      .comment-count-text{
        line-height: 20px;
        font-size:12px;
      }
    }
  }


</style>