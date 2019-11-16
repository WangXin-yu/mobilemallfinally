<template>
  <div>
    <TitleSlotBack>我的收藏</TitleSlotBack>
    <div class="wrap" ref="wrapper">
      <div class="container">
        <div v-for="item in collections" :key="item.id" class="collection-item">
          <div class="image-box" @click="clickToDetail(item.cid)"><img :src="item.image_path" class="image" alt=""></div>
          <div>
            <div class="name">{{item.name}}</div>
            <div class="price">￥{{item.present_price}}</div>
          </div>
          <div class="delete-icon-box" @click="cancleCollect(item.cid)">
            <img src="../../../images/collections-delete.png" alt="" class="delete-icon">
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
  import TitleSlotBack from "../../../views/TitleSlotBack"
  export default {
    name: "Collections",
    components: {
      TitleSlotBack,
    },
    props: {},
    data() {
      return {
        collections: [],
      }
    },
    methods: {
      async getCollectionsList(){
        try{
          let res = await this.$api.getCollection();
          this.collections = res.data.list;
        }catch(err){
          console.log(err);
        }
      },
      async cancleCollect(id){
        try{
          await this.$api.cancelCollection(id);
          //取消收藏成功后重新获取收藏列表
          this.getCollectionsList();
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
      this.getCollectionsList()
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
  .wrap{
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 0;
    overflow: hidden;
    background: #fff;
    .container{
      width: 100%;
      .collection-item{
        width: 100%;
        padding: 10px 10px;
        display: flex;
        border-bottom: 1px solid #eee;
        height:80px;
        position: relative;
        .image{
          width: 80px;
          height: 80px;
          border: 1px solid #eee;
          box-sizing: border-box;
          box-shadow: 0px 0px 2px #f2f2f2;
          margin-right: 20px;
        }
        .name{
          font-size:14px;
          margin-bottom: 20px;
        }
        .price{
          color: #ff4444;
          font-size:14px;
          font-weight: bold;
        }
        .delete-icon-box{
          .delete-icon{
            width: 12px;
            height: 12px;
          }
          position: absolute;
          right: 45px;
          bottom: 10px;
        }
      }
    }
  }
</style>