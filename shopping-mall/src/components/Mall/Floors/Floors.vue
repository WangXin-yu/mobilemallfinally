<template>
  <div class="floors-box">
    <div class="floor">
      <div class="floor-title">
        <span class="circular">1F</span>休闲食品
      </div>
      <div class="floor-list clearfix">
        <div v-for="(item) in floor1" :key="item.id" class="floor-item" @click="clickToDetail(item.goodsId)">
            <img :src="item.image" alt="" class="floor-image">
        </div>
      </div>
    </div>

    <div class="floor">
      <div class="floor-title">
        <span class="circular">2F</span>新鲜水果
      </div>
      <div class="floor-list clearfix">
        <div v-for="(item) in floor2" :key="item.id" class="floor-item" @click="clickToDetail(item.goodsId)">
          <img :src="item.image" alt="" class="floor-image">
        </div>
      </div>
    </div>

    <div class="floor">
      <div class="floor-title">
        <span class="circular">3F</span>营养奶品
      </div>
      <div class="floor-list clearfix">
        <div v-for="(item) in floor3" :key="item.id" class="floor-item" @click="clickToDetail(item.goodsId)">
          <img :src="item.image" alt="" class="floor-image">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "Floors",
    components: {},
    props: {},
    data() {
      return {
        floor1:[],
        floor2:[],
        floor3:[],
      }
    },
    methods: {
      async getData() {
        try {
          let res = await this.$api.recommend();
          this.floor1 = res.data.floor1;
          this.floor2 = res.data.floor2;
          this.floor3= res.data.floor3;
        } catch (e) {
          console.log(e);
        }
      },
      //点击跳转到详情页
      clickToDetail(id){
        this.$router.push({path: "/commodity-details", query:{id:id}});
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
  .floor-title{
    font-size: 15px;
    color: #ff4c38;
    border-bottom: 1px solid #f2f2f2;
    text-align: center;
    margin: 10px 0;
  }
  .circular{
    width:20px;
    height:20px;
    border-radius: 50%;
    background: #ff4c38;
    color: #fff;
    display: inline-block;
    margin-right: 5px;
  }
  .floors-box, .floor{
    width: 100%;
    margin-bottom:5px;
  }
  .floor-list{
    width: 100%;
    .floor-item{
      width:49.3%;
      float: left;
      outline: 1px solid #f2f2f2;
      .floor-image{
        width: 100%;
        display: block;
      }
    }
  }
  .clearfix::after{
    content: "";
    display: block;
    clear:both;
  }
</style>