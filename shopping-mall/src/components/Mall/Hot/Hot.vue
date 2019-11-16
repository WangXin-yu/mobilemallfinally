<template>
  <div>
    <div class="hot-title">热销商品</div>
    <div class="recommend-box" >
      <div class="wrapper" ref="wrapper">
        <div class="recommend-list">
          <div v-for="(item) in hot_datas" :key="item.id" class="recommend-item" @click="clickToDetail(item.goodsId)">
            <div><img :src="item.image" alt="" class="recommend-image"></div>
            <div class="goods-name">{{item.name}}</div>
            <div class="price">
              <div><span class="￥">￥</span>{{item.price}}</div>
              <div class="mallPrice">￥{{item.mallPrice}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
  export default {
    name: "Hot",
    components: {},
    props: {
      hot_datas: {
        type: Array,
        default: ()=>{}
      }
    },
    data() {
      return {}
    },
    methods: {
      //点击跳转到详情页
      clickToDetail(id){
        this.$router.push({path: "/commodity-details", query:{id:id}});
      }
    },
    mounted() {
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
  .hot-title{
    text-align: center;
    color: #ff4c38;
    font-size:15px;
  }
  .recommend-list {
    display: flex;
    flex-wrap: wrap;
    margin-top:15px;
    .recommend-item {
      width: 50%;
      outline: 1px solid #eee;
      background: #fff;
      .recommend-image {
        width: 100%;
      }

      .goods-name {
        overflow: hidden;
        height: 20px;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-left: 5px;
        font-size: 14px;
        color: #ff4c38;
        width: 100%;
        box-sizing: border-box;
      }

      .price {
        display: flex;
        justify-content: center;
        font-size: 14px;
        color: #ff4c38;
        height: 20px;
        line-height: 20px;
        font-weight: bold;
        .￥{
          font-weight: normal;
        }
        .mallPrice {
          font-size: 12px;
          text-decoration: line-through;
          color: #ccc;
          margin-left: 5px;
          margin-top: 1px;
          font-weight: normal;
        }
      }
    }
  }
</style>