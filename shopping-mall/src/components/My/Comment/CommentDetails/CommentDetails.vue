<template>
  <div class="comment-detail">
    <TitleSlotBack>评论中心</TitleSlotBack>
    <div class="image-and-star">
      <div >
        <img :src="item.image_path" alt="" class="image">
      </div>
      <div class="title-and-star">
        <div class="title">商品评分</div>
        <div class="star">
          <van-rate
              v-model="rate"
              :size="25"
              color="#ee0a24"
              void-icon="star"
              void-color="#eee"
          />
        </div>
      </div>
    </div>
    <div>
      <textarea name="" v-model="comment_text" id="" cols="30" rows="10"
                placeholder="说说你的购买感受吧~~"></textarea>
    </div>
    <div class="checkbox">
      <van-checkbox v-model="anonymous"> 匿名评价</van-checkbox>
    </div>
    <div class="submit"  @click="submitComment">
      提交
    </div>
  </div>

</template>

<script>
  import TitleSlotBack from "../../../../views/TitleSlotBack"
  export default {
    name: "CommentDetails",
    components: {
      TitleSlotBack,
    },
    props: {},
    data() {
      return {
        item:{},
        rate: 5,
        anonymous: false,
        comment_text: '',
      }
    },
    methods: {
      async submitComment(){
        try{
          let comments = {};
          comments.anonymous = this.anonymous;
          comments.content = this.comment_text;
          comments.id = this.item.cid;
          comments.image = [];
          comments.order_id = this.item.order_id;
          comments.rate = this.rate;
          comments._id = this.item._id;
          await this.$api.comment(comments);
          this.$toast("评论成功");
          this.$router.push("/comment");
        }catch(err){
          console.log(err);
        }
      }
    },
    mounted() {
      this.item = this.$route.query.item;
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
  .comment-detail{
    position: absolute;
    bottom: 0;
    top: 0;
    right: 0;
    left: 0;
    background: #fff;
    .image-and-star{
      display: flex;
      background: #fff;
      padding-left:20px;
      height: 100px;
      .image{
        width: 100px;
        height: 100px;
        margin-right:20px;
      }
      .title-and-star{
        .title{
          margin-top:10px;
          margin-bottom:20px;
        }
      }
    }
  }
  textarea{
    outline: none;
    border: none;
    background: #eee;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
  }
  .checkbox{
    margin-left: 20px;
    margin-top: 5px;
  }
  .submit{
    width: 90%;
    height: 55px;
    background: #07c160;
    margin: 0 auto;
    text-align: center;
    line-height: 55px;
    margin-top: 20px;
    color: #fff;
    border-radius: 2px;
  }
</style>