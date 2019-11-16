<template>
  <div class="search-div">
    <div class="search-box">
      <div style="padding-top: 5px"><van-icon name="search" size="1.5em"/></div>
      <input type="text" class="search-input" v-model="search_keys"
             placeholder="请输入搜索关键字" @click="search" @keyup.enter="searchKeys">

    </div>
    <div class="search-text" v-if="show" @click="cancelSearch">取消</div>
    <van-popup
        position="right"
        :overlay="overlay"
        v-model="show"
        :style="{
            width:'100%',
            height: '100%',
            marginTop:'45px',
         }"
    >
      <div class="no-search-history" v-if="search_history.length <= 0">
        暂无搜索历史
      </div>
      <div v-if="search_history.length > 0 && search_arr.length <= 0">
        <div class="history-title">
          <div class="history-text">搜索历史</div>
          <div class="delete-icon-box" @click="deleteSearchHistory">
            <img src="../../../images/search-delete.png" alt=""  class="delete-icon">
          </div>
        </div>
        <div class="history-item-box">
          <div class="history-item" v-for="item in search_history" :key="item.id" @click="clickToSearch(item)">
            {{item}}
          </div>
        </div>
      </div>
      <div v-if="search_arr.length">
        <div v-for="item in search_arr" :key="item.idd" class="search-item">
          <div class="item-image-box" @click="clickToDetail(item.id)"><img :src="item.image" alt="" class="item-image"></div>
          <div class="name-and-price">
            <div class="name" v-html="item.name"></div>
            <div class="price">
              <div class="present-price">￥{{item.present_price }} </div>
              <div class="old-price"> {{ item.orl_price}}</div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
  
</template>

<script>
  export default {
    name: "SearchInput",
    components: {},
    props: {},
    data() {
      return {
        show: false,      //控制搜索弹框
        overlay: false,   //控制搜索弹框的遮罩层
        search_keys: '',    //绑定输入框的输入的关键字
        search_arr: [], //搜索出来的数据
        search_history: [], //搜索历史
        show_history: false,  //是否显示搜索历史
      }
    },
    methods: {
      search(){
        this.show = true;
      },
      //隐藏搜索面板后输入框清空
      cancelSearch(){
        this.show = false;
        this.search_keys = '';
        this.search_arr =[];
      },
      //搜索
      async searchKeys(){
        try{
          if(this.search_keys.trim()){
            let res = await this.$api.search(this.search_keys);
            this.search_arr = res.data.list;
            this.search_arr.map(item=>{
              item.name = item.name.replace(this.search_keys, "<span style='color:red'>"+this.search_keys+"</span>")
            })
            //将该关键字加入到历史搜索记录中
            if(!localStorage.getItem("search_history")){
              localStorage.setItem("search_history", JSON.stringify([]));
            }
            let search_history = JSON.parse(localStorage.getItem('search_history'));
            search_history = search_history.filter(item=>{
              return this.search_keys != item;
            })
            if( this.search_arr.length > 0){
              search_history.push(this.search_keys);
              localStorage.setItem("search_history", JSON.stringify(search_history));
            }
          }
          this.search_history = JSON.parse(localStorage.getItem("search_history"));
        }catch(err){
          console.log(err);
        }
      },
      //点击跳转到详情页
      clickToDetail(id){
        if(this.$route.path !== "/commodity-details"){
          this.$router.push({path: "/commodity-details", query:{id:id}});
        }
      },
      //删除
      deleteSearchHistory(){
        localStorage.setItem("search_history", JSON.stringify([]));
        this.search_history = JSON.parse(localStorage.getItem("search_history"));
      },
      //点击搜索历史跳转到搜索界面
      clickToSearch(item){
        this.search_keys = item;
        this.searchKeys();
      }
    },
    mounted() {
      this.search_history = JSON.parse(localStorage.getItem("search_history"));
    },
    created() {

    },
    filters: {},
    computed: {},
    watch: {
      search_keys(val){
        if(!val.trim()){  //如果输入框为空，那么展示的搜索数据的数组设置为空
          this.search_arr = [];
        }
      }
    },
    directives: {}
  }
</script>

<style scoped lang="scss">
  .history-title{
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    color:#000;
    .delete-icon{
      width:15px;
      height:15px;
    }
  }
  .history-item-box{
    display: flex;
    padding: 10px 20px;
    flex-wrap: wrap;
    .history-item{
      margin-right:5px;
      margin-bottom:10px;
      height: 30px;
      line-height: 30px;
      padding: 0 20px;
      border-radius: 15px;
      background: #eee;
    }
  }

  .search-div{
    display: flex;
    width:100%;
    color: #757575;

  }
  .search-box{
    width: 85%;
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
  }
  .search-icon{
    color: #ccc;
  }
  .search-text{
    line-height:30px;
    margin-left:10px;
  }
  .no-search-history{
    text-align: center;
    margin-top:150px;
  }
  .search-cancle{
    position:fixed;
    right: 0;
    top: -10px;
  }
  .search-item{
    display: flex;
    padding: 10px;
    border-bottom: 1px solid #eee;
    .item-image{
      width:80px;
      height:80px;
      border: 1px solid #eee
    }

    .name-and-price{
      margin-left:20px;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      .name{

      }
      .price{
        display: flex;
        margin-bottom: 20px;
        .present-price{
          color:#ff4c38;
          font-weight: bold;
        }
        .old-price{
          text-decoration: line-through;
          margin-left: 5px;
        }
      }
    }
  }
</style>