<template>
  <div>
    <TitleSlotBack>城市列表</TitleSlotBack>

<!--    搜索框-->
    <div class="search-div">
      <div class="search-box">
        <div style="padding-top: 5px"><van-icon name="search" size="1.5em"/></div>
        <input type="text" class="search-input"
               placeholder="请输入城市关键字" v-model="search_keys">
      </div>
    </div>
    <div v-if="isflag">
      <!--    当前城市和热门城市-->
      <div class="current-city">当前城市</div>
      <div class="current-city-box">
        <div class="city-item">重庆</div>
      </div>
      <div class="hot-city">热门城市</div>
      <div class="hot-city-box">
        <div class="city-item"  v-for="item in city_array.hotCities" :key = "item.id"
             @click="choseCity(item.name)">{{item.name}}</div>
      </div>
      <!--    城市列表-->
      <div class="city-list">
        <div v-for="(item,index)  in city_array.cities" :key="item.id">
          <div class="city-index"><a :name="index">{{index}}</a></div>
          <div >
            <div v-for="(item) in city_array.cities[index]" :key="item.id"
                 class="list-city-item" @click="choseCity(item.name)">
              {{item.name}}
            </div>
          </div>
        </div>
      </div>
      <!--    -->
      <!--    侧边索引-->
      <div class="side-index">
        <div  v-for="(item) in city_index" :key="item.idd" class="index">
          <a :href="item" class="index">{{item.replace('#', '')}}</a>
        </div>
      </div>
    </div>
    <div v-else class="search-item-box">
      <div v-for="item in search_city" :key="item.idd" class="search-item"
      @click="choseCity(item.name)">
        {{item.name}}
      </div>
    </div>
  </div>
</template>

<script>
  import city from "./city"
  import TitleSlotBack from "../../views/TitleSlotBack"
  export default {
    name: "City",
    components: {
      TitleSlotBack,
    },
    props: {},
    data() {
      return {
        city_array:[],
        city_index: [], //存储所有城市的ABCD
        search_city: [], //存储搜索出来的城市
        chose_index: -1,  //选中的城市的索引
        search_keys: '',  //搜索框的值
        isflag: true,     //控制搜索框的输入限制
      }
    },
    methods: {
      choseCity(city){
        this.$router.push({path:"/", query:{city: city}});
      },
    },
    mounted() {
      this.city_array = city.data;
      this.city_index = Object.keys(this.city_array.cities)
      this.city_index = this.city_index.map(item=>{
        return item = '#'+ item;
      })
    },
    created() {

    },
    filters: {},
    computed: {

    },
    watch: {
      search_keys(val){
        if(val.trim() != ""){
          this.isflag = false;
          if(val.charCodeAt(0) >= 65 && val.charCodeAt(0) <= 90){
            val = val.toLowerCase();
          }
          let arr1 = [];
          for(let i in this.city_array.cities){
            this.city_array.cities[i].map(item=>{
              if (item.name.includes(val) || item.spell.includes(val)){
                arr1.push(item);
              }
            })
          }
          this.search_city = arr1;
        }else{
          this.isflag = true;
        }
      },
    },
    directives: {}
  }
</script>

<style scoped lang="scss">
  .search-div{
    display: flex;
    justify-content: space-around;
    color: #757575;
    margin-top: 10px;
  }
  .search-box{
    width: 90%;
    background: #fff;
    height: 30px;
    display: flex;
    justify-content: space-around;
    border-radius: 3px;

  }
  .search-input{
    width: 90%;
    border: none;
    height: 30px;
    border: none;
    background: transparent;
    padding: 0;
    &::placeholder{
      font-size: 15px;
    }
  }
  .search-icon{
    color: #ccc;
  }

  .city-item{
    width: 100px;
    height:25px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size:15px;
    margin: 10px 0;
  }
  .current-city,.hot-city{
    margin: 10px;
    font-size:14px;
  }
  .current-city-box,.hot-city-box{
    padding: 0 10px;
    padding-right: 40px;
    width: 100%;
    box-sizing: border-box;
    background: #fff;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .list-city-item{
    padding: 10px 10px;
    width: 100%;
    font-size:13px;
    color: #3A3A3A;
    box-sizing: border-box;
    background: #fff;
    border-bottom: 1px solid #eeeeee;
  }
  .city-index{
    margin-left: 10px;
    box-sizing: border-box;
    margin: 10px;
  }
  .side-index{
    position: fixed;
    right: 10px;
    top: 10vh;
    width:15px;
    height: 80vh;
    text-align: center;
    font-size:14px;

    .index{
      margin: 7px 0;
      color: #2fc2d7;
    }
  }
  .search-item-box{
    margin-top:20px;
    .search-item{
      padding: 0 20px;
      height: 30px;
      line-height: 30px;
      background: #fff;
      border-bottom: 1px solid #eee;

    }
  }

</style>