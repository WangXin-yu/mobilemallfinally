<template>
  <div class="order-settlement-box">
<!--    {{shoppingcar_data}}-->
    <TitleSlotBack>订单结算</TitleSlotBack>
    <div class="choose-address" @click="goToAddAddress">
      <div v-if="!defaultAddress" @click="goToAddAddress">
        点击添加收货地址
      </div>
      <div v-else>
        <div class="name-and-phone">
          <div class="name">收货人:{{defaultAddress.name}}</div>
          <div class="phone">{{defaultAddress.tel}}</div>
        </div>
        <div class="address-box">
          <div class="address-icon-box">
            <img class="address-icon" src="../../../images/order-location.png" alt="">
          </div>
          <div class="address">收货地址:{{defaultAddress.address}}</div>
          <div class="arrow-box"><img src="../../../images/arrow.png" alt="" class="arrow"></div>
        </div>
        <div class="tips">(收货不便时，可选择免费收货服务)</div>
      </div>
    </div>
    <div class="colorful-line-box">
      <img src="../../../images/caitiao.jpg" alt="" class="colorful-line">
    </div>
    <div class="wrap" ref="wrapper">
      <div class="shoplist-box">
        <div class="shop-item" v-for="item in shoppingcar_data" :key="item.idd">
          <div><img :src="item.image_path" alt="" class="shop-image"></div>
          <div class="shop-item-detail">
            <div>{{item.name}}</div>
            <div class="price">￥{{item.present_price}}</div>
          </div>
          <div class="shop-item-count">x{{item.count}}</div>
        </div>
      </div>
    </div>
<!--    底部合计部分-->
    <div class="bottom-total">
      <div class="place-order" @click="placeOrder">提交订单</div>
      <div class="price">￥{{total_price}}</div>
      <div class="total">合计:</div>
    </div>
  </div>
  
</template>

<script>
  import BScroll from "better-scroll";
  import TitleSlotBack from "../../../views/TitleSlotBack"
  export default {
    name: "OrderSettlement",
    components: {
      TitleSlotBack
    },
    props: {},
    data() {
      return {
        total_price: 0,
        defaultAddress: {},
        ids:[],
        idDirect: false,
        count2:0,
      }
    },
    methods: {
      getShoppingCarData(){
        this.count2 = this.shoppingcar_data[0].count;
        this.getShopsIds();
        this.shoppingcar_data.forEach(item=>{
          this.total_price += item.present_price*item.count*1;
        })
        this.total_price = this.total_price.toString();
        let index = this.total_price.indexOf('.')
        this.total_price = this.total_price.slice(0, index + 4)
      },
      async getDefaultAddress(){
        try{
          let res = await this.$api.getDefaultAddress();
          this.defaultAddress = res.defaultAdd;
        }catch(err){
          console.log(err);
        }
      },
      //跳转到添加地址界面
      goToAddAddress(){
        this.$router.push("/address");
      },
      //提交订单
      async placeOrder(){
        try{
          if(!this.defaultAddress){
            this.$toast('请添加收货地址');
            return;
          }
          //参数：address:收货地址,tel:电话，orderId：所有商品的id，totalPrice：
          // 总价格,idDirect:用来判断是购物车结算还是直接购买,count:商品数量
          let order = {};
          order.address = this.defaultAddress.address;
          order.tel = this.defaultAddress.tel;
          order.orderId = this.ids;
          order.count = this.count2;
          order.totalPrice = this.total_price;
          if(!this.shoppingcar_data[0].mallPrice){
            order.idDirect = true;
          }
          await this.$api.placeOrder(order);
          this.$toast('订单结算成功');
          if(order.idDirect){
            this.$router.push({path:"/commodity-details", query:{id: this.ids[0]}})
          }else{
            this.$router.push("/shopping-car")
          }
        }catch(err){
          console.log(err);
        }
      },
      //获取所有订单的id
      getShopsIds(){
        this.shoppingcar_data.forEach(item=>{
          this.ids.push(item.cid);
        })
      },
    },
    //组件内的守卫来检查是直接购买还是购物车购买
    beforeRouteEnter(to, from, next){
      next(vm=>{
        if(from.path === "/commodity-details"){
          vm.idDirect = true;
        }
      });
    },
    mounted() {
      this.getShoppingCarData();
      this.getDefaultAddress();
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
      shoppingcar_data(){
        return this.$store.state.checked_shops;
      }
    },
    watch: {},
    directives: {}
  }
</script>

<style scoped lang="scss">


  .bottom-total{
    position:fixed;
    bottom:0;
    height:55px;
    line-height:55px;
    width:100%;
    display: flex;
    flex-direction: row-reverse;
    font-size:14px;
    .total, .price{
      margin-right:10px;
    }
    .price{
      color:#ff4c38;
    }
    .place-order{
      width:134px;
      height:55px;
      background: #ff4444;
      font-size:18px;
      color: #fff;
      line-height:55px;
      text-align: center;
    }
  }
  .order-settlement-box{
    position:absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
  }
  .choose-address{
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: center;
    font-size:15px;
    .name-and-phone{
      display: flex;
      justify-content: space-between;
      padding-left:10%;
      box-sizing: border-box;
      height:40px;
      line-height: 40px;
      font-size:14px;
      padding-right: 10%;
    }

    .address-box{
      display: flex;
      width:100%;
      height:30px;
      line-height: 30px;
      font-size:12px;
      .address{
        width:80%;
        text-align: left;
      }
      .address-icon-box{
        width:10%;
        .address-icon{
          width:20px;
          height:20px;
        }
      }
      .arrow-box{
        width:20px;
        height:20px;
        position: relative;
        .arrow{
          width:20px;
          height:20px;
          position:absolute;
          top:0;
          bottom:0;
          left:0;
          right:0;
          margin: auto;
        }
      }

    }
    .tips{
      height:20px;
      line-height:20px;
      padding-left:10%;
      font-size:12px;
      text-align: left;
      color:#f9cc9d;
    }

  }
  .colorful-line-box{
    height:10px;
    position: relative;
  }
  .colorful-line{
    width:100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
  .wrap{
    position: absolute;
    top: 151px;
    bottom: 55px;
    width:100%;
    overflow: hidden;
    .shoplist-box{
      display: flex;
      flex-direction: column;
      .shop-item{
        display: flex;
        justify-content: space-around;
        padding: 10px 0;
        height: 80px;
        border-bottom: 1px solid #eee;
        .shop-image{
          width: 80px;
          height: 80px;
          border: 1px solid #eee;
        }
        .shop-item-detail{
          width: 60%;
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          padding-bottom:20px;
          box-sizing: border-box;
          font-size:14px;
          color: #ff4c38;
          .price{
            font-weight: bold;
          }
        }
        .shop-item-count{
          line-height: 90px;
          color:#666;
        }
      }
    }
  }
</style>