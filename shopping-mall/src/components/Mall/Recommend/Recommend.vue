<template>
  <div class="recommend-box" >
    <div class="title-name">商品推荐</div>
    <div class="wrapper" ref="wrapper">
      <div class="recommend-list">
        <div v-for="(item) in recommend_datas" :key="item.id" class="recommend-item">
          <div><img :src="item.image" alt="" class="recommend-image"  @click="clickToDetail(item.goodsId)"></div>
          <div class="goods-name">{{item.goodsName}}</div>
          <div class="price">
            <div>￥{{item.price}}</div>
            <div class="mallPrice">￥{{item.mallPrice}}</div>
          </div>
          <div class="see-btn">
            <div class="car-icon"><van-icon name="cart" class="car-icon"  @click.native="addToShoppingCar(item.goodsId)"></van-icon></div>
            <div class="detail" @click.native="clickToDetail(item.goodsId)">查看详情</div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Recommend",
    components: {
    },
    props: {},
    data() {
      return {
        recommend_datas:[],
      }
    },
    methods: {
      async getData() {
        try {
          let res = await this.$api.recommend();
          this.recommend_datas = res.data.recommend;
        } catch (e) {
          console.log(e);
        }
      },

      //点击跳转到详情页
      clickToDetail(id){
        if(this.$route.path !== "/commodity-details"){
          this.$router.push({path: "/commodity-details", query:{id:id}});
        }
      },
      //加入购物车
      async addToShoppingCar(goodsId) {
        try {
          await this.$api.addShop(goodsId);
          this.$toast('加入购物车成功');
        } catch (e) {
          console.log(e);
        }
      },
    },
    mounted() {
      this.getData();
      this.$nextTick(()=>{
        this.scroll = new BScroll(this.$refs.wrapper, {
          scrollX: true, click:false})
      });
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
  .recommend-box{
    background: #fff;
  }
  .title-name{
    font-size: 15px;
    color: #3A3A3A;
    padding: 5px 0 5px 15px;
    border-bottom: 1px solid #eee;
  }
  .wrapper{
    width: 100%;
    display: flex;
    overflow: hidden;
  }
  .recommend-list{
    display: flex;
    padding-bottom: 10px;
    flex: 1;
    .recommend-item{
      width: 125px;
      .recommend-image{
        width:125px;
      }
      .goods-name{
        overflow: hidden;
        height:20px;
        text-overflow: ellipsis;
        white-space:nowrap;
        padding-left:5px;
        font-size:14px;
        color:#333;
        width:100%;
        box-sizing: border-box;
      }
      .price{
        width:80%;
        display: flex;
        font-size:14px;
        color:#333;
        height:20px;
        line-height:20px;
        margin-left:5px;
        .mallPrice{
          font-size:12px;
          text-decoration: line-through;
          color:#ccc;
          margin-left:5px;
          margin-top:1px;
        }
      }
      .see-btn{
        width:90%;
        height: 30px;
        line-height: 30px;
        margin: 0 auto;
        display: flex;
        border-radius: 5px;
        .car-icon{
          color:#fff;
          background: #feca3a;
          width: 20%;
          border-bottom-left-radius: 5px;
          border-top-left-radius: 5px;
          padding-left:2px;
        }
        .detail{
          background: #ff4c38;
          color: #fff;
          width: 80%;
          font-size:14px;
          text-align: center;
          border-bottom-right-radius: 5px;
          border-top-right-radius: 5px;
        }
      }

    }


  }


</style>