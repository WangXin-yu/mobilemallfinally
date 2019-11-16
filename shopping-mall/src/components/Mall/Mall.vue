<template>
  <div>
<!--头部定位搜索框-->
    <div class="header">
<!--      <Location class="position-container" :city="city"></Location>-->
      <div class="location-text">
        <div  class="city-name-box"><van-loading v-if="!city" color="#666"/>{{city}}</div>
        <div @click="toCity"><img src="../../images/city-icon.svg" alt="" class="location-icon"></div>
      </div>
      <SearchInput class="search-container"></SearchInput>
    </div>
    <div class="wrap" ref="wrapper">
      <div class="content">
        <!--轮播图分类导航广告区域-->
          <BanCateAdv></BanCateAdv>
          <!--推荐部分-->
          <Recommend></Recommend>
        <!--1-3Floors-->
          <Floors ></Floors>
        <!--    热销部分-->
          <Hot :hot_datas="datas.hotGoods"></Hot>
      </div>
    </div>
  </div>
</template>

<script>
  // import Location from "./Location/Location";
  import SearchInput from "./SearchInput/SearchInput";
  import BanCateAdv from "./BanCateAdv/BanCateAdv";
  import Recommend from "./Recommend/Recommend";
  import Floors from "./Floors/Floors";
  import Hot from "./Hot/Hot";
  import BScroll from 'better-scroll'
  export default {
    name: "Malls",
    components: {
      // Location,
      SearchInput,
      BanCateAdv,
      Recommend,
      Floors,
      Hot,
    },
    props: {},
    data() {
      return {
        datas:[],
        hot_datas: [],
        city: '',//城市列表传过来的city
      }
    },
    methods: {
      async getData() {
        try {
          let res = await this.$api.recommend();
          this.datas = res.data;

        } catch (e) {
          console.log(e);
        }
      },
      toCity() {
        this.$router.push("/city");
      },

    },
    mounted() {
      let _this = this;
      this.getData();
      //进入商城页面底部商城高亮
      this.$store.state.index = 0;
      this.$nextTick(()=>{
        this.scroll = new BScroll(this.$refs.wrapper, {
          scrollY: true, click:true,  pullUpLoad:true})
      });

      //建立浏览历史的数组存储浏览记录，存储在localstorage里面
      // localStorage.setItem('history', []);
      // console.log(localStorage.getItem('history', []));
      if(!localStorage.getItem('history')){
        localStorage.setItem('history', JSON.stringify([]));
      }
      if(localStorage.getItem('city') === '""'){
        // 高德地图定位
        AMap.plugin('AMap.Geolocation', function() {
          var geolocation = new AMap.Geolocation({
            // 是否使用高精度定位，默认：true
            enableHighAccuracy: true,
            // 设置定位超时时间，默认：无穷大
            timeout: 10000,
            // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
            buttonOffset: new AMap.Pixel(10, 20),
            //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            zoomToAccuracy: true,
            //  定位按钮的排放位置,  RB表示右下
            buttonPosition: 'RB'
          })
          geolocation.getCurrentPosition()
          AMap.event.addListener(geolocation, 'complete', onComplete)
          AMap.event.addListener(geolocation, 'error', onError)

          function onComplete (data) {
            // data是具体的定位信息
            _this.city = data.addressComponent.city.replace("市", '');
            //将定位信息存储到localstorage中避免下次再次获取
            localStorage.setItem("city", JSON.stringify(_this.city));

          }

          function onError (data) {
            // 定位出错
          }
        })
      }
      else{
        this.city = JSON.parse(localStorage.getItem('city'));
      }
      if(this.$route.query.city){
        this.city = this.$route.query.city;
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
  .wrap{
    position: absolute;
    top: 50px;
    bottom: 50px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
  .content{
  }
  .header{
    display: flex;
    justify-content:space-between;
    padding: 10px 10px 10px 20px;
    font-size:14px;
    box-sizing: border-box;
    height: 50px;
  }
  .position-container{
  }
  .search-container{
    width: 78%;
  }
  .location-text{
    color: #333;
    line-height: 30px;
    display: flex;
  }
  .location-icon{
    width: 15px;
    height: 15px;
    margin-top:7px;
    margin-left:5px;
  }
  .city-name-box{
    text-align: center;
  }
</style>