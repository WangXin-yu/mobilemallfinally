<template>
  <div class="commented-box">
    <TitleSlotBack>评价详情</TitleSlotBack>
    <div class="user">
      <div><img src="../../../../images/my-head.png" alt="" class="userhead"></div>
      <div class="username-and-star">
        <div class="username">{{user_info.nickname}}</div>
        <div class="star"><van-rate v-model="item_array.rate" color="#ee0a24"  :size="20" /></div>
      </div>
      <div class="date">
        {{item_array.comment_time}}
      </div>

    </div>


    <div class="comment-content">
      评价内容:
      {{item_array.content}}
    </div>
    <div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div v-for="item in item_array.goods" :key="item.id" class="shop-item">
      <div class="image-and-name">
        <div><img :src="item.image" alt="" class="shop-image"></div>
        <div class="name">{{item.name}}</div>
      </div>
      <div class="car-icon-box"><img class="car-icon" src="../../../../images/commented-car.png" alt=""></div>
    </div>
  </div>
</template>

<script>
  import TitleSlotBack from "../../../../views/TitleSlotBack"
  export default {
    name: "Commented",
    components: {
      TitleSlotBack
    },
    props: {},
    data() {
      return {
        item_array:[],
        star: 4,
        user_info: {},
      }
    },
    methods: {},
    mounted() {
      this.item_array = this.$route.query.item;

      this.user_info = JSON.parse(localStorage.getItem("userInfo"));
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
  .commented-box{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
  }
  .user{
    display: flex;
    justify-content: space-between;
    padding: 10px;
    .userhead{
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 1px solid #eee;
    }
    .username{
      margin-bottom: 10px;
      font-size:14px;
    }
    .date{
      line-height: 50px;
      font-size:13px;
      color:#666
    }
  }
  .comment-content{
    font-size:14px;
    padding-left:10px;
    padding-bottom: 10px;
    box-sizing: border-box;
  }
  .shop-item{
    border-top: 1px solid #eee;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    height: 60px;
    .image-and-name{
      display: flex;
      .shop-image{
        width:60px;
        height: 60px;
      }
      .name{
        font-size:14px;
      }
    }

    .car-icon-box{
      height:40px;
      width: 40px;
      border-radius: 50%;
      background: #ffe6e2;
      margin-left: 20px;
      position:relative;
      .car-icon{
        width:25px;
        height:25px;
        position:absolute;
        top:0;
        bottom:0;
        left:0;
        right:0;
        margin: auto;
      }
    }
  }
</style>