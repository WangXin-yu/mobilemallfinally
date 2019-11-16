<template>
  <div>
    <TitleSlotBack>评价中心</TitleSlotBack>
    <div class="image-bg-box" @click="menu">
      <img src="../../../images/comment.jpg" alt="" class="image-bg">
    </div>
    <div class="mid-btns-box">
      <div class="mid-btns">
        <div class="to-be-comment" @click="Choose(0)" :class="{'chosed': 0 === choose_index}">待评价</div>
        <div class="commented" @click="Choose(1)" :class="{'chosed': 1 === choose_index}">已评价</div>
      </div>
    </div>
    <div v-if="choose_index===0">
      <div class="wrap" ref="wrapper">
        <div class="content">
          <div class="item" v-for="item in to_be_commented" :key="item.zid">
            <div class="item_image_box" @click="clickToDetail(item.cid)"><img :src="item.image_path" alt="" class="item_image"></div>
            <div class="name-and-btn">
              <div class="name">{{item.name}}</div>
              <div class="comment-btn" @click="goToCommented(item)" >
                <div><img src="../../../images/comment-message.png" alt="" class="comment-message-icon"></div>
                <div>评论晒单</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="choose_index===1">
      <div class="wrap2" ref="wrapper2">
        <div class="content">
          <div class="item_right" v-for="item in commented" :key="item.zid">
            <div v-for="item_goods in item.goods" :key="item_goods.idd" class="item_right_goods">
              <div class="item_image_box" @click="clickToDetail(item_goods.id)"><img :src="item_goods.image" alt="" class="item_image"></div>
              <div class="name-and-btn">
                <div class="name">{{item_goods.name}}</div>
                <div class="comment-btn" @click="goToCommentedDetail(item)" >
                  <div><img src="../../../images/input-icon.png" alt="" class="comment-message-icon"></div>
                  <div>查看评论</div>
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
  import TitleSlotBack from "../../../views/TitleSlotBack"
  import BScroll from 'better-scroll'
  export default {
    name: "Comment",
    components: {
      TitleSlotBack
    },
    props: {},
    data() {
      return {
        choose_index: 0,
        to_be_commented:[],
        commented:[],
        scroll: '',
      }
    },
    methods: {
      Choose(index){
         this.choose_index = index;
      },
      //获取未评价
      async getToBeCommented(){
        try{
          let res = await this.$api.tobeEvaluated();
          this.to_be_commented = res.data.list;
        }catch(err){
          console.log(err);
        }
      },
      //获取已经评价
      async getCommented(){
        try{
          let res = await this.$api.alreadyEvaluated();
          this.commented = res.data.list;
        }catch(err){
          console.log(err);
        }
      },
      //跳转到添加评论界面
      goToCommented(item){
        this.$router.push({path: "/comment-detail", query:{item: item}});
      },
      //跳转到添加评论界面
      goToCommentedDetail(item){
        this.$router.push({path: "/commented", query:{item: item}});
      },
      //监听鼠标滚轮事件
      menu() {
        console.log(this.$refs.wrapper.scrollTop);
      },
      //点击跳转到详情页
      clickToDetail(id){
        if(this.$route.path !== "/commodity-details"){
          this.$router.push({path: "/commodity-details", query:{id:id}});
        }
      }
    },
    beforeRouteEnter(to,from, next){
      if(from.path === "/commented"){
        next(vm=>{
          vm.choose_index = 1;
        })
      }
      next();
    },
    mounted() {
      this.getToBeCommented();
      this.getCommented();
      this.$nextTick(()=>{
        new BScroll( this.$refs.wrapper, {
          scrollY: true, click:true, pullUpLoad: {
          },
          scrollToEndFlag: {
            type: Boolean,
            default: false,
          }},
        );
        // scroll1.on('pullingUp', () => {
        //   this.getToBeCommented(2);
        //   setTimeout(() => {
        //     // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则上拉事件只会执行一次
        //     scroll1.finishPullUp()
        //   }, 3000)
        // })
      })
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
  .image-bg-box{
    width: 100%;
    height: 25vh;
    .image-bg{
      width:100%;
      height:100%;
    }
  }
  .mid-btns-box{
    width: 90%;
    height: 40px;
    margin: 0 auto;
    position: relative;
    .mid-btns{
      width: 100%;
      height: 40px;
      line-height: 40px;
      margin: 0 auto;
      background: #fff;
      border-radius: 5px;
      position: absolute;
      top: -20px;
      box-shadow: 0px 0px 5px #666;
      display: flex;
      z-index: 1;
      justify-content: space-around;
      .to-be-comment, .commented{
        font-size:14px;
        width: 80px;
        text-align: center;
        color:#666;
      }
      .chosed{
        color: #3A3A3A;
        border-bottom: 3px solid #ff4c38;
      }
    }
  }
  .wrap{
    position: absolute;
    top: 211px;
    bottom: 0;
    left: 0;
    right: 0;
    padding-top: 20px;
    background: #fff;
    overflow: hidden;
    .content{
      padding-top: 25px;
      .item{
        display: flex;
        border-bottom: 1px solid #eee;
        .item_image_box{
          margin-left: 25px;
          .item_image{
            width: 80px;
            height: 80px;
          }
        }
        .name-and-btn{
          position: relative;
          width:70%;
          .name{
            padding-top:5px;
            font-size:12px;
            margin-left:25px;
          }
          .comment-btn{
            display: flex;
            justify-content: center;
            width: 85px;
            height: 25px;
            border: 1px solid #d81e06;
            border-radius: 15px;
            position:absolute;
            right: 0;
            bottom: 10px;
            text-align: center;
            line-height: 25px;
            font-size:12px;
            color: #d81e06;
            .comment-message-icon{
              width:10px;
              height: 10px;
              margin-top:2.5px;
              margin-right: 5px;
            }
          }
        }
      }


    }
  }
  .wrap2{
    position: absolute;
    top: 211px;
    bottom: 0;
    left: 0;
    right: 0;
    padding-top: 20px;
    background: #fff;
    overflow: hidden;
  }
  .item_right{
    border-bottom: 1px solid #eee;
    .item_right_goods{
      display: flex;
      .item_image_box {
        margin-left: 25px;
        .item_image {
          width: 80px;
          height: 80px;
        }
      }
      .name-and-btn{
        position: relative;
        width:70%;
        .name{
          padding-top:5px;
          font-size:12px;
          margin-left:25px;
        }
        .comment-btn{
          display: flex;
          justify-content: center;
          width: 85px;
          height: 25px;
          border: 1px solid #666;
          border-radius: 15px;
          position:absolute;
          right: 0;
          bottom: 10px;
          text-align: center;
          line-height: 25px;
          font-size:12px;
          color: #666;
          .comment-message-icon{
            width:15px;
            height: 15px;
            margin-top:5px;
            margin-right: 5px;
          }
        }
      }
    }
  }
</style>