<template>
  <div>
    <TitleSlotBack>我的订单</TitleSlotBack>
    <div class="topTabs">
      <div :class="{chosed: status==0}" class="tab-item" @click="toggleTab(0)">全部</div>
      <div :class="{chosed: status==1}" class="tab-item" @click="toggleTab(1)">待支付</div>
      <div :class="{chosed: status==2}" class="tab-item" @click="toggleTab(2)">待发货</div>
      <div :class="{chosed: status==3}" class="tab-item" @click="toggleTab(3)">待收货</div>
      <div :class="{chosed: status==4}" class="tab-item" @click="toggleTab(4)">已完成</div>
    </div>

    <div v-if="status===0">
      <div v-for="item  in total_status0" :key="item.id">
        {{item}}
      </div>
    </div>

    <div v-if="status===1">
      <div v-for="item  in pay_status1" :key="item.id">
        {{item}}
      </div>
    </div>

    <div v-if="status===2">
      <div v-for="item  in deliver_status2" :key="item.id">
        {{item}}
      </div>
    </div>

    <div v-if="status===3">
      <div v-for="item  in eeceiving_status3" :key="item.id">
        {{item}}
      </div>
    </div>

    <div class="wrap4" ref="wrapper" v-if="status===4">
      <div class="order-complete-box">
        <div v-for="item  in complete_status4" :key="item.id"
             class="order-complete-item">
          <div class="order-id">
            <div>订单编号: {{item.order_id}}</div>
          </div>
          <div v-for="(item_son,index) in item.order_list" :key="item_son.id">
            <div class="order-shop-detail">
              <div class="image-and-name">
                <div @click="clickToDetail(item_son.cid)" ><img :src="item_son.image_path" alt="" class="shop-image"></div>
                <div class="name">{{item_son.name}}</div>
              </div>

              <div>
                <div class="price">￥{{(item_son.mallPrice).toFixed(2)}}</div>
                <div class="count">x{{item_son.count}}</div>
              </div>
            </div>
            <div class="address-detail" v-if="index === item.order_list.length-1" >
              <div class="date">创建时间:{{item.add_time}}</div>
              <div class="address">收货地址:{{item.address}}</div>
              <div class="count">
                共计{{item_son.count}}件商品 合计{{(item.mallPrice*item.order_list[0].count).toFixed(2)}}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
  import TitleSlotBack from "../../../views/TitleSlotBack"
  import BScroll from 'better-scroll'
  export default {
    name: "MyOrders",
    components: {
      TitleSlotBack
    },
    props: {},
    data() {
      return {
        status: 0,//0->全部， 1->待支付, 2->待发货, 3->待收货, 4->已完成
        //分别表示各个状态存的数据
        total_status0: ["全部"],
        pay_status1: ["待支付"],
        deliver_status2: ["待发货"],
        eeceiving_status3: ["待收货"],
        complete_status4: ["已完成"],
      }
    },
    methods: {
      toggleTab(status){
        this.status = status;
        if(this.status === 4){
          this.getComplete_status4();

        }
      },
      async getComplete_status4(){
        try{
          let res = await this.$api.getMyOrder();
          this.complete_status4 = res.list;
        }catch(err){
          console.log(err);
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
      this.getComplete_status4();
      this.status = this.$route.query.status
      if(this.status === 4){
        this.$nextTick(()=>{
          this.scroll = new BScroll(this.$refs.wrapper, {
            scrollY: true, click:true})
        });
      }
    },
    created() {

    },
    filters: {},
    computed: {},
    watch: {},
    directives: {}
  }
</script>

<style scoped lang="scss">
  .topTabs{
    display: flex;
    justify-content: space-around;
    width: 100%;
    height:44px;
    line-height:44px;
    font-size:14px;
    color: #666;
    background: #fff;
    .tab-item{
      width: 50px;
      text-align: center;
    }
  }
  .chosed{
    border-bottom: 2px solid #ff4c38;
  }
  .wrap4{
    position: absolute;
    top: 88px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    margin-top:20px;
    .order-complete-box{
      width: 100%;
      .order-complete-item{
        margin: 10px 10px;
        width:95%;
        background: #fff;
        border-radius: 12px;
        padding-bottom: 5px;
        .order-id{
          margin: 0 10px;
          padding: 10px 0;
          border-bottom: 1px solid #eee;
          font-size:15px;
        }
        .order-shop-detail{
         margin: 10px 10px;
          display: flex;
          justify-content: space-between;
          flex-direction: row;
          .shop-image{
            width:100px;
            height: 100px;
            border: 1px solid #eee;
            border-radius: 12px;
          }
          .name{
            font-size:14px;
            margin-left:10px;
          }
          .image-and-name{
            display: flex;
          }
          .price{
            font-size:14px;
            margin-left: 15px;
          }
          .count{
            color: #ccc;
            text-align: right;
            font-size:14px;
          }
        }
        .address-detail{
          border-top: 1px solid #eee;
          margin: 0 10px;
          margin-bottom: 10px;
          font-size:14px;
        }
        .address-detail>div{
          text-align: right;
          margin-right:10px;
          line-height: 25px;
        }
      }
    }
  }

</style>