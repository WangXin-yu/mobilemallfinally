<template>
  <div>
    <div class="footer">
      <div class="item" @click="bottomToggle(0)" :class="{ selected :this.$store.state.index===0}">
        <van-icon name="wap-home-o" size="1.5em"/>
        <div>商城</div>
      </div>
      <div class="item"  @click="bottomToggle(1)" :class="{ selected :this.$store.state.index===1}">
        <van-icon name="wap-nav" size="1.5em"/>
        <div>分类</div>
      </div>
      <div class="item"  @click="bottomToggle(2)" :class="{ selected :this.$store.state.index===2}">
        <van-icon name="cart" size="1.5em"/>
        <div>购物车</div>
      </div>
      <div class="item"  @click="bottomToggle(3)" :class="{ selected :this.$store.state.index===3}">
        <van-icon name="contact" size="1.5em"/>
        <div>我的</div>
      </div>
    </div>
    <div class="main">

    </div>
    <router-view></router-view>
  </div>

</template>

<script>

  export default {
    name: "BottomFrameOfMall",
    components: {
    },
    props: {},
    data() {
      return {
        index: 0, // 0-> mall , 1->class, 2->shoppingcar, 3->my
      }
    },
    methods: {
      bottomToggle(index){
        this.$store.state.index = index;
        if(index === 0){
          if(this.$route.path !== "/")
            this.$router.push("/");
        }else if(index === 1){
          if(this.$route.path !== "/class")
            //从底部打开分类页面，默认展示左侧第一个导航下的所有的数据
            this.$router.push({path:"/class", query:{default_left_nav_index: 0}});
        }else if(index === 2){
          if(this.$route.path !== "/shopping-car")
            this.$router.push("/shopping-car");
        }else if(index === 3){
          if(this.$route.path !== "/my")
            this.$router.push("/my");
        }
      }
    },
    mounted() {
    },
    created() {

    },
    filters: {},
    computed: {},
    watch: {
    },
    directives: {}
  }
</script>

<style scoped lang="scss">
  .footer{
    position: fixed;
    width:100%;
    height: 50px;
    background: #fff;
    font-size:14px;
    display: flex;
    justify-content: space-between;
    text-align: center;
    position: fixed;
    bottom: 0;
    color: #666;
    z-index: 1;
  }
  .item{
    width: 25%;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .selected{
    color: #e0322b;
  }
</style>