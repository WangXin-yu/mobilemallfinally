<template>
  <div class="ShoppingCar-box">
    <TitleSlot>购物车</TitleSlot>
    <div class="empty-content"  v-if="login_state==='false'">
      <div class="bg">
        <img src="../../images/ShoppingCar-icon.png" class="car-icon" alt="">
      </div>
      <div>请先登录奥~~</div>
      <button class="log-btn"  @click="goToLogin">去登录</button>
    </div>
<!--   已登录的状态下的购物车显示购物车中的清单-->
    <div v-else >
      <div class="top-tips" v-if="shop_list.length>0">
        <div class="choose-all">
          <div class="choose-icon" :class="{redbg:choose_all===true}" @click="chooseAll">
            <img src="../../images/shopping-car-choose-icon.png" class="choose-icon-image" alt="">
          </div>
          <div v-if="!choose_all" >
            全选
          </div>
          <div v-else >
            取消全选
          </div>
        </div>

        <div class="total-price-confirm-box">
          <div class="total-price">
            <div>合计:</div>
            <div class="price">￥{{total_price}}</div>
          </div>
          <div>
            请确认订单
          </div>
        </div>

      </div>
      <div class="delete_and_pay" v-if="show_delete">
        <div class="pay" @click="goToOrderSettlement">去结算</div>
        <div class="delete" @click="deleteShop(delete_arr_id)">删除</div>
      </div>
    </div>
    <!--  展示购物车的数据-->

    <div ref="wrapper" class="wrap" :class="{delete_top: show_delete}">
      <div class="shop-list-container">
        <div v-for="(item, index) in shop_list" :key="item.id">
          <div  class="shop-item-box"  v-if="item.count > 0">
            <div class="choose-icon-box" :class="{redbg: item.check===true}" @click="choseShop(index)">
              <img src="../../images/shopping-car-choose-icon.png" class="choose-icon-image" alt="">
            </div>
            <div class="shop-item-image-box" @click="clickToDetail(item.cid)" >
              <img :src="item.image_path" alt="" class="shop-item-image">
            </div>
            <div class="shop-item-detail-box">
              <div class="shop-item-name">
                {{item.name}}
              </div>
              <div class="price-and-number">
                <div class="price">￥{{item.mallPrice}}</div>
                <div class="number-choice">
                  <van-stepper @plus="addShop(item.count+1, item.cid, item.mallPrice)"
                               @minus="reduceShop(item.count-1, item.cid, item.mallPrice)" min="1"
                  v-model="item.count"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TitleSlot from "../../views/TitleSlot"
  import BScroll from "better-scroll";
  export default {
    name: "ShoppingCar",
    components: {
      TitleSlot
    },
    props: {},
    data() {
      return {
        login_state: 'false', //保存登录状态，如果为true则展示购物车的数据，否则提示购物车为空去购物
        choose_all: false,    //控制一键全选
        shop_list: [],        //存储购物车中所有的数据
        show_delete: false,
      }
    },
    methods: {
      //去登陆
      goToLogin(){
        alert(11);
        this.$router.push("/log-and-register");
      },
      //全选
      chooseAll(){
        this.shop_list.map(item=>{
          if(!this.choose_all){
            item.check = true;
          }else{
            item.check = false;
          }
        })
        this.choose_all = !this.choose_all;
        //全选后判断是否要显示delete和去结算面板
        this.judgeShowDelete();
      },
      //获取购物车的数据
      async getShoppingCarData(){
        try{
          let res = await this.$api.getCard();
          this.shop_list = res.shopList;
          //删除完商品后要重新遍历数组看是否显示delete和a去结算面板
          this.judgeShowDelete();
        }catch(err){
          console.log(err);
        }
      },
      //添加商品的数量
      async addShop(count,cid, mallPrice){
        try{
          await this.$api.editCart(count, cid, mallPrice)
        }catch(err){
          console.log(err);
        }
      },
      //减少商品的数量
      async reduceShop(count,cid, mallPrice){
        try{
          await this.$api.editCart(count, cid, mallPrice)
        }catch(err){
          console.log(err);
        }
      },
      //删除商品
      async deleteShop(delete_arr_id){
        try{
          //418fc60784d04e71beffe1ce5174c947   24afea564e5248b5a2bc59da95f09911
          await this.$api.deleteShop(delete_arr_id)
          //删除商品后要重新获取购物车数据
          this.getShoppingCarData();
        }catch(err){
          console.log(err);
        }
      },
      //选择商品
      choseShop(index){
        this.shop_list[index].check = !this.shop_list[index].check
        //选中商品后要计算总价格
        //选择商品后遍历数组判断是否要显示delete和去结算按钮
        this.judgeShowDelete()
      },
      //跳转到结算页面
      goToOrderSettlement(){
        //结算前将选中的商品存储到共享数组中
        this.$store.state.checked_shops = this.shop_list.filter(item=>{
          return item.check;
        })
        this.$router.push("/order-settlement");
      },
      //判断是否显示删除和去结算按钮
      judgeShowDelete(){
        let has_check = false;    //购物车中是否有选中的商品
        for(let i = 0; i < this.shop_list.length; i++){
          if(this.shop_list[i].check === true){
            //只要数组中有一个元素的check的值为true那么就显示delete和去结算按钮
            this.show_delete = true;
            has_check = true;
            break;
          }
        }
        if(!has_check){ //遍历完数组后仍然没有选中的, 那么就不现实delete和去结算按钮
          this.show_delete = false;
        }
      },
      //点击跳转到详情页
      clickToDetail(id){
        if(this.$route.path !== "/commodity-details"){
          this.$router.push({path: "/commodity-details", query:{id:id}});
        }
      }
    },
    mounted() {
      //进入购物车页面底部高亮
      this.$store.state.index = 2;
      this.login_state = localStorage.getItem('login_state');
      //获取购物车的数据
      this.getShoppingCarData();
      //进入到购物车界面要将共享的存储选择的商品的数组清空
      this.$store.state.checked_shops = [];
      this.$nextTick(() => {
        this.scroll1 = new BScroll(this.$refs.wrapper, {
          scrollY: true,
          click: true
        });
      });
    },
    created() {

    },
    filters: {},
    computed: {
      //计算所有的价格
      total_price:function(){
        let sum = 0;
        this.shop_list.forEach((item)=>{
          if(item.check === true)
          sum += item.mallPrice*item.count;
        });
        sum = sum.toFixed(2);
        return sum;
      },
      //将所有选中的商品的id存起来方便删除
      delete_arr_id:function () {
        let arr_id = [];
        this.shop_list.forEach((item)=>{
          if(item.check)
            arr_id.push(item.cid)
        });
        return arr_id;
      }
    },
    watch: {},
    directives: {}
  }
</script>

<style scoped lang="scss">
  .ShoppingCar-box{
    height:100vh;
    width:100%;
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
  .empty-content{
    width:150px;
    height:300px;
    margin: 0 auto;
    text-align: center;
    padding-top:60px;
    .bg{
      width:100%;
      height: 140px;
      background: #ffe0e7f2;
      border-radius: 50%;
      text-align: center;
      margin-bottom:25px;
      .car-icon{
        margin-top: 25px;
        width:110px;
        height:110px;
        color: #ff4c38;

      }
    }
    .log-btn{
      border: none;
      width: 140px;
      height:35px;
      border-radius: 50px;
      background: #fff;
      border: 1px solid #3A3A3A;
      margin-top:20px;
    }
  }
  .redbg{
    background: #ff4c38;
  }
  .delete_top{
    top:164px!important;
  }
  .top-tips{
    padding: 0 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    height:80px;
    line-height: 80px;
    font-size:14px;
    color:#3A3A3A;
    border-bottom: 1px solid #eee;
    .choose-all{
      display: flex;
      justify-content: space-around;

      .choose-icon{
        width:18px;
        height:18px;
        border: 1px solid #ccc;
        box-sizing: border-box;
        margin-top:31px;
        margin-right:5px;
        border-radius: 3px;
        position: relative;
        .choose-icon-image{
          width: 17px;
          height: 17px;
          position: absolute;
          left: 0;right:0;top:0;bottom:0;
          margin: auto;
        }
      }
    }
    .total-price-confirm-box{
      padding: 10px 0;
      padding-right:50px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      line-height:20px;
      .total-price{
        display: flex;
        justify-content: space-around;
        .price{
          color: #ff4c38;
          font-weight: bold;
        }
      }
    }
  }
  .delete_and_pay{
    height:40px;
    line-height:40px;
    margin-right: 15px;
    .delete, .pay{
      float:right;
      margin-top:5px;
      width:60px;
      height:35px;
      line-height:35px;
      text-align: center;
      background: #e6057f;
      border-radius: 2px;
      font-size:14px;
      color:#fff;
    }
    .pay{
      width:70px;
    }
    .delete{
      margin-right:6px;
    }
  }
  .wrap{
    width:100%;
    top:124px;
    bottom:50px;
    overflow: hidden;
    position: absolute;
  }
  .shop-list-container{
      display: flex;
      flex-direction: column;
      .shop-item-box{
        display: flex;
        padding: 0 10px;
        box-sizing: border-box;
        height: 110px;
        line-height: 110px;
        width: 100%;
        border-bottom: 1px solid #eee;
        .choose-icon-box{
          width:17px;
          height:17px;
          border: 1px solid #ccc;
          border-radius: 3px;
          margin-top: 41.5px;
          margin-right:15px;
          position: relative;
          .choose-icon-image{
            width: 17px;
            height: 17px;
            position: absolute;
            left: 0;right:0;top:0;bottom:0;
            margin: auto;
          }
        }
        .shop-item-image-box{

          .shop-item-image{
            margin-top: 15px;
            width: 80px;
            height: 80px;
            border: 1px solid #eee;
          }
        }
        .shop-item-detail-box{
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          line-height:20px;
          padding: 5px 0;
          padding-left: 20px;
          box-sizing: border-box;
          font-size:14px;
          color:#ff4c38;
          .shop-item-name{
            height:20px;
          }
          .price-and-number{
            width: 200px;
            display: flex;
            justify-content: space-between;
            .price{
              height:20px;
            }
          }
        }
      }
    }



</style>