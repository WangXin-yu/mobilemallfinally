<template>
  <div>
    <TitileSlot>商品分类</TitileSlot>
    <div class="class-container clearfix">
      <!--      侧边导航-->
      <div class="side-nav">
        <div
          v-for="(item, index) in class_datas"
          :key="item.key"
          class="nav-item"
        >
          <div
            @click="getCategoryIndex(index)"
            :class="{ whitebg: index === category_index }"
          >
            {{ item.mallCategoryName }}
          </div>
        </div>
      </div>
      <div class="right-content">
        <!--        头部导航-->

        <div class="top-nav-box " ref="topNavWrapper">
          <div class="top-nav">
            <div
              class="top-nav-item"
              v-for="(item, index) in bxMallSubDto"
              :key="item.key"
              @click="_click(item.mallSubId, index)"
              :class="{ 'bottom-line': index === top_index }"
            >
              {{ item.mallSubName }}
            </div>
          </div>
        </div>
        <!--          -->
        <div class="wrap" ref="wrapper">
          <div class="trade-container">
            <div
              v-for="item in bxMallSubDto_datas"
              :key="item.id1"
              class="trade-item"
            >
              <div><img :src="item.image" alt="" class="trade-image" @click="clickToDetail(item.id)"/></div>
              <div>
                <div class="trade-name">{{ item.name }}</div>
                <div class="price">
                  <div class="trade-price">￥{{ item.present_price }}</div>
                  <div class="trade-small-price">{{ item.orl_price }}</div>
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
import BScroll from "better-scroll";
import TitileSlot from "../../views/TitleSlot";
export default {
  name: "Class",
  components: {
    TitileSlot
  },
  props: {},
  data() {
    return {
      class_datas: [], //获取左侧的导航的信息的数组
      category_index: 0, //左侧详情的头部导航的index
      bxMallSubDto_datas: [], //右侧详情里的数据
      bxMallSubDto: [], //存储顶部导航nav的数据
      top_index: 0, //默认打开顶部的第一个
      default_left_nav_index: 0 //默认打开左侧的第几个导航
    };
  },
  methods: {
    //获取左侧导航的数据
    async getData() {
      this.category_index = parseInt(this.$route.query.default_left_nav_index);
      try {
        let res = await this.$api.recommend();
        this.class_datas = res.data.category;
        this.bxMallSubDto = this.class_datas[this.category_index].bxMallSubDto;
        let mallSubId = this.class_datas[this.category_index].bxMallSubDto[0].mallSubId;
        this.getBxMallSubDto_datas(mallSubId)
      } catch (e) {
        console.log(e);
      }
    },
    //点击跳转到详情页
    clickToDetail(id){
      if(this.$route.path !== "/commodity-details"){
        this.$router.push({path: "/commodity-details", query:{id:id}});
      }
    },
    //点击头部导航后获取下面展示的数据
    async getBxMallSubDto_datas(mallSubId) {
      try {
        let res = await this.$api.category(mallSubId);
        this.bxMallSubDto_datas = res.dataList;
      } catch (e) {
        console.log(e);
      }
    },
    //点击头部导航后获取下面展示的数据
    _click(mallSubId, index) {
      this.top_index = index;
      this.getBxMallSubDto_datas(mallSubId);
    },
    //得到左侧导航的index
    getCategoryIndex(index) {
      this.category_index = index;
      this.bxMallSubDto = this.class_datas[this.category_index].bxMallSubDto;
      let mallSubId = this.class_datas[this.category_index].bxMallSubDto[this.default_left_nav_index].mallSubId;
      this.getBxMallSubDto_datas(mallSubId);
    }
  },
  mounted() {
    this.getData();
    this.$nextTick(() => {
      this.scroll1 = new BScroll(this.$refs.topNavWrapper, {
        scrollX: true,
        click: true
      });
    });
    this.$nextTick(() => {
      this.scroll2 = new BScroll(this.$refs.wrapper, {
        scrollY: true,
        click: true
      });
    });
    //进入分类页面底部高亮
    this.$store.state.index = 1;
  },
  created() {},
  filters: {},
  watch: {},
  directives: {}
};
</script>
<style></style>
<style scoped lang="scss">
.title {
  height: 43px;
  line-height: 43px;
  text-align: center;
  background: #fff;
  border-bottom: 1px solid #eee;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
}
.right-tabs {
  position: fixed;
  width: 100%;
}
.trade-container {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.side-nav {
  width: 21%;
  height: 100%;
  position: fixed;
  top: 43px;
  background: #f1f8ff;
  .nav-item {
    line-height: 43px;
    height: 43px;
    border-top: 1px solid #eee;
    text-align: center;
    color: #666;
    font-size: 14px;
  }
  .nav-item:last-child {
    border-bottom: 1px solid #eee;
  }
}
.right-content {
  width: 79%;
  float: right;
  background: #fff;
  font-size: 14px;

  .wrap {
    position: absolute;
    top: 87px;
    bottom: 50px;
    left: 21%;
    right: 0;
    overflow: hidden;
    background: #fff;
  }
  .trade-item {
    box-sizing: border-box;
    padding: 15px;
    background: #fff;
    border-bottom: 1px solid #eee;
    display: flex;
    flex: 1;
    .trade-image {
      width: 80px;
      height: 80px;
      border: 1px solid #eee;
    }
    .trade-name {
      color: red;
      margin-left: 15px;
    }
    .price {
      margin-top: 25px;
      display: flex;
      .trade-price {
        margin-left: 15px;
        color: red;
        font-weight: bold;
      }
      .trade-small-price {
        margin-left: 15px;
        text-decoration: line-through;
      }
    }
  }
}

/*头部导航*/
.top-nav-box {
  height: 43px;
  line-height: 43px;
  display: flex;
  overflow: hidden;

  .top-nav {
    display: flex;
    justify-content: space-around;
    flex: 1;
    border-bottom: 1px solid #eee;
    .top-nav-item {
      width: 75px;
      text-align: center;
      color: #666;
    }
  }
}

.clearfix:after {
  content: "";
  display: block;
  clear: both;
}
/*  点击左侧导航栏变白色*/
.whitebg {
  background: #fff;
}
/*  */
.bottom-line {
  border-bottom: 3px solid #ff4444;
  color: #ff4444 !important;
}
</style>
