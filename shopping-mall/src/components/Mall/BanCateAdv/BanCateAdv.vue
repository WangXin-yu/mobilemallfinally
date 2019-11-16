<template>
  <div>
<!--    banner区域-->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in banner_images" :key="index">
        <img :src="image.image" class="banner-image"/>
      </van-swipe-item>
    </van-swipe>
<!--    nav分类区域-->
    <div class="category-box">
      <div  v-for="(item, index) in nav_category" :key="item.id" @click="goToClass(index)">
        <div>
          <img :src="item.image" alt="" class="category_imgage">
          <div>{{item.mallCategoryName}}</div>
        </div>
      </div>
    </div>
<!--广告图-->
    <div >
      <img :src="ban_cate_adv_datas" alt="" class="adv_image">
    </div>
  </div>
  
</template>

<script>
  export default {
    name: "Banner",
    components: {},
    props: {},
    data() {
      return {
        banner_images: [],
        nav_category:[],
        ban_cate_adv_datas:'',
      }
    },
    methods: {
      async getData() {
        try {
          let res = await this.$api.recommend();
          this.banner_images = res.data.slides;
          this.nav_category = res.data.category;
          this.ban_cate_adv_datas = res.data.advertesPicture.PICTURE_ADDRESS;
        } catch (e) {
          console.log(e);
        }
      },
      //点击跳转到分类页面，注意索引关系
      goToClass(index){
        this.$router.push({path:"/class", query:{default_left_nav_index: index}})
      }
    },
    mounted() {
      this.getData();
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
  .banner-image{
    width: 100%;
    height: 190px;
  }
  .category-box{
    width: 95%;
    margin: 15px auto;
    background: #fff;
    border-radius: 15px;
    display: flex;
    justify-content: space-around;
    font-size: 14px;
    color: #3A3A3A;
    padding-top:15px;
    padding-bottom: 5px;
  }
  .category_imgage{
    width: 50px;
    height: 50px;
  }
  .adv_image{
    width: 100%;
    margin-bottom: 20px;
  }
</style>