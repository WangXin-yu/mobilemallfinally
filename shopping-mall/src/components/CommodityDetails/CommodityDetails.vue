<template>
  <div class="detail-box" ref="wrapper">
    <div class="wrapper" >
      <div class="goback" @click="goBack">
        <img src="../../images/goback-white.png" class="goback-arrow" alt="" />
      </div>
<!--     图片预览效果 -->
      <van-image-preview
          v-model="show_preview"
          :images="preview_images"
          @change="onChange(1)"
      >
      </van-image-preview>
<!--      -->
      <van-swipe :autoplay="3000" >
        <van-swipe-item>
          <img :src="goodOne.image" class="preview"   @click="showPreview"/>
        </van-swipe-item>
        <van-swipe-item>
          <img :src="goodOne.image_path" class="preview"  @click="showPreview"/>
        </van-swipe-item>
      </van-swipe>
      <div class="name">
        {{ goodOne.name }}
      </div>
      <div class="price">￥{{ goodOne.present_price }}</div>
      <div class="collection-box">
        <div>运费: {{ 0 }}</div>
        <div>剩余: {{ goodOne.amount }}</div>
        <div class="collection-btn">
          <div v-if="collect">
            取消收藏:
          </div>
          <div v-if="collect">
            <img
                src="../../images/heart.png"
                class="collect-icon"
                alt=""
                @click="collectToggle"
            />
          </div>
          <div v-if="!collect">
            收藏:
          </div>
          <div v-if="!collect">
            <img
                src="../../images/cancle-heart.png"
                class="collect-icon"
                alt=""
                @click="collectToggle"
            />
          </div>
        </div>
      </div>
      <div class="enter-the-shop">
        <div class="left">
          <div><img src="../../images/shop.png" class="shop-icon" alt="" /></div>
          <div>有赞的店</div>
          <div class="official">官方</div>
        </div>
        <div class="right">
          <div>进入店铺</div>
          <div>
            <img src="../../images/arrow.png" class="arrow-icon" alt="" />
          </div>
        </div>
      </div>
      <!--商品详情与商品评论的选项卡 -->
      <DetailAndComment
          :detail="goodOne.detail"
          :goodsId="goodsId"
          :shops_img="shops_img"
          :goodOne="goodOne"
          :comment="comment"
          v-if="flag"
      >
      </DetailAndComment>
    </div>
    <div class="bottom-btn">
      <div class="bottom-fixed">
        <div class="icon first">
          <div>
            <img
                src="../../images/home-page.png"
                class="customer-service"
                alt=""
            />
          </div>
          <div @click="goToMall">首页</div>
        </div>
        <div class="icon" @click="goToShoppingCar">
          <div  class="car-count-box">
            <img
                src="../../images/shopping-car.png"
                class="customer-service"
                alt=""
            />
            <div class="car-count">
              {{car_count}}
            </div>
          </div>
          <div>
            购物车
          </div>
        </div>
        <div class="add-to-cart" @click="addToShoppingCar">
          加入购物车
        </div>
        <div class="immediate-purchase" @click="immediatePurchase">
          立即购买
        </div>
        <!--    立即购买-->
        <van-popup
        v-model="show"
        closeable
        close-icon="close"
        position="bottom"
        :style="{ height: '35%' }"
        :duration="duration"
      >
        <div class="elastic-frame">
          <div class="shop-img-box">
            <img :src="shops_img" alt="" class="shop-img" />
          </div>
          <div class="name-and-price">
            <div class="name">{{ goodOne.name }}</div>
            <div class="price">￥{{ goodOne.present_price }}</div>
          </div>
        </div>
        <div class="count-container">
          <div class="count-box">
            <div>购买数量:</div>
            <div class="surplus-box">
              <div class="surplus-count">剩余10000件</div>
              <div class="limit">每人限购50件</div>
            </div>
          </div>
          <div class="stepping-device">
            <van-stepper v-model="count" max="50" />
          </div>
        </div>
        <div class="btn" @click="settlementPurchase">
          立即购买
        </div>
      </van-popup>
      </div>
    </div>
  </div>
</template>

<script>
import DetailAndComment from "./DetailAndComment/DetailAndComment.vue";
import BScroll from 'better-scroll'
export default {
  name: "CommodityDetails",
  components: {
    DetailAndComment
  },
  props: {},
  data() {
    return {
      goodsId: "",
      goodOne: {},
      shops_img: "",
      collect: false,
      flag: false,
      comment: [],
      show_preview: false,  //图片预览
      preview_images: [],   //预览图片的数组
      duration: 0.1,
      show: false,
      count: 1,
      car_count: '',
    };
  },
  methods: {
    showPreview(){
      this.show_preview = true;
    },
    onChange(index) {
      this.index = index;
    },
    //获取购物车的数据
    async getShoppingCarData(){
      try{
        this.car_count = '';
        let count = 0;
        let res = await this.$api.getCard();
        console.log(res);
        res.shopList.forEach(item=>{
          count += item.count;
        })
        this.car_count = count;
      }catch(err){
        console.log(err);
      }
    },
    async getData() {
      try {
        this.goodsId = this.$route.query.id;
        let res = await this.$api.goodOne(this.goodsId);
        this.comment = res.goods.comment;
        this.goodOne = res.goods.goodsOne;
        this.preview_images.push(this.goodOne.image);
        this.preview_images.push(this.goodOne.image_path);
        this.flag = true;
        this.addToHistory();
        this.addToHistory();
        this.shops_img = this.goodOne.image;
        //获取完商品信息后要判断是否收藏
        this.isCollectShop();
      } catch (e) {
        console.log(e);
      }
    },
    //跳转到购物车页面
    goToShoppingCar() {
      this.$router.push("/shopping-car");
    },
    //添加到浏览记录
    addToHistory(){
      //将此商品添加到浏览记录里面
      let history = JSON.parse(localStorage.getItem('history'));
      history = history.filter((item)=>{
        return  this.goodOne.name != item.name;
      })
      history.push(this.goodOne);
      localStorage.setItem('history', JSON.stringify(history));
      JSON.parse(localStorage.getItem('history'));
    },
    immediatePurchase() {
      this.show = true;
    },
    //弹出层的立即购买
    settlementPurchase() {
      this.$store.state.checked_shops = [];
      let obj = {};
      obj.name = this.goodOne.name;
      obj.present_price = this.goodOne.present_price;
      obj.cid = this.goodOne.id;
      obj.count = this.count;
      obj.image_path = this.goodOne.image_path;
      this.$store.state.checked_shops.push(obj);
      this.$router.push("/order-settlement");
    },
    //跳转到首页
    goToMall(){
      this.$router.push("/");
    },
    //加入购物车
    async addToShoppingCar() {
      try {
        await this.$api.addShop(this.goodsId);
        this.getShoppingCarData();
        this.$toast('加入购物车成功');
      } catch (e) {
        console.log(e);
      }
    },
    //退后按钮
    goBack() {
      this.$router.push("/");
    },
    //切换收藏按钮
    collectToggle() {
      this.collect = !this.collect;
      //将该商品添加到数据库
      if (this.collect) {
        //调用收藏接口，添加到数据库
        this.collectShop();
      } else {
        //调用取消收藏接口
        this.cancleCollectShop();
      }
    },
    //调用收藏接口
    async collectShop() {
      try {
        await this.$api.collection(this.goodOne);
      } catch (err) {
        console.log(err);
      }
    },
    //调用取消收藏接口
    async cancleCollectShop() {
      try {
        await this.$api.cancelCollection(this.goodOne.id);
      } catch (err) {
        console.log(err);
      }
    },
    //查询商品是否收藏
    async isCollectShop() {
      try {
        let res = await this.$api.isCollection(this.goodOne.id);
        if (res.isCollection) {
          //已经收藏
          this.collect = true;
        } else {
          //没有收藏
          this.collect = false;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  //组件内的守卫来检查是直接购买还是购物车购买
  beforeRouteEnter(to, from, next){
    if(from.path != ''){
      //将
      next(vm=>{
        vm.getData()
      })   //跳转到另一个路由
    }else{
      next(false);//不跳转
    }
  },
  mounted() {
    this.$nextTick(()=>{
      this.scroll = new BScroll(this.$refs.wrapper, {
        scrollY: true, click:true })
    });
    this.getShoppingCarData();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.car-count-box{
  position:relative;
  .car-count{
    position: absolute;
    width:15px;
    height:15px;
    line-height:15px;
    background: red;
    top: -5px;
    right: 10px;
    border-radius: 50%;
    color: #fff;
    font-size:12px;

  }
}

.goback {
  width: 30px;
  height: 30px;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 10px;
  top: 10px;
  border-radius: 50%;
  z-index: 1;
  .goback-arrow {
    width: 15px;
    height: 15px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
  }
}
.detail-box {
  background: #fff;
  position:absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 55px;
  overflow: hidden;
  .wrap{
  }
}
.preview {
  width: 100%;
  height: 400px;
  border-bottom: 1px solid #f2f2f2;
}
.click-preview {
  position: fixed;
  bottom: 0;
  top: 0;
  right: 0;
  left: 0;
  height: 100%;
  background: #000;
}
.click-image {
  position: absolute;
  top: 133px;
}
.name {
  margin: 10px 0;
  margin-left: 10px;
}
.price {
  margin-left: 10px;
  color: #ff4c38;
  font-size: 14px;
  margin-bottom: 20px;
}
.collection-box {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #f2f2f2;
  border-bottom: 1px solid #f2f2f2;
  color: #666;
  font-size: 12px;
  margin: 0 10px;
  line-height: 30px;

  .collection-btn {
    display: flex;
    justify-content: center;
    width: 80px;
  }
  .collect-icon {
    width: 20px;
    height: 20px;
    margin-left: 5px;
    margin-top: 5px;
    color: #ff4c38;
  }
}
.enter-the-shop {
  display: flex;
  justify-content: space-between;
  margin: 0 10px;
  height: 50px;
  line-height: 50px;
  .left {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    .shop-icon {
      width: 15px;
      height: 15px;
      margin-right: 5px;
      margin-top: 17px;
    }
    .official {
      background: #ff4c38;
      height: 24px;
      width: 40px;
      text-align: center;
      line-height: 24px;
      margin-top: 13px;
      margin-left: 10px;
      border-radius: 3px;
      color: #fff;
    }
  }
  .right {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    .arrow-icon {
      width: 20px;
      height: 20px;
      margin-top: 14px;
    }
  }
}
.bottom-btn{
  width: 100%;
  height: 55px;
  position:fixed;
  bottom: 0;
  background: red;
}
/*  */
.bottom-fixed {
  height: 55px;
  z-index: 100;
  position: fixed;
  bottom: 0;
  display: flex;
  width: 100%;
  .icon:first-child {
    border-right: 1px solid #f2f2f2;
  }
}
._detail {
  /deep/ img {
    display: block;
  }
}
.icon {
  width: 14%;
  padding: 0;
  border-right: 1px solid #f2f2f2;
  background: #fff;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 14px;
  color: #3a3a3a;
  border-top: 1px solid #f2f2f2;
  img {
    height: 20px;
    width: 20px;
  }
}
.customer-service {
  width: 20px;
  height: 20px;
}
.add-to-cart {
  height: 100%;
  width: 36%;
  background: #ff8855;
  line-height: 55px;
  text-align: center;
  color: #fff;
}
.immediate-purchase {
  height: 100%;
  width: 36%;
  background: #ff4444;
  line-height: 55px;
  text-align: center;
  color: #fff;
}
.elastic-frame {
  width: 100%;
  position: relative;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  font-size: 14px;
  border-bottom: 1px solid #eee;
  .shop-img-box {
    width: 80px;
    height: 80px;
    top: -40px;
    .shop-img {
      position: fixed;
      width: 80px;
      height: 80px;
      bottom: 25%;
      border: 1px solid #eee;
    }
  }
  .name-and-price {
    padding: 10px;
    .name {
      padding-bottom: 5px;
    }
    .price {
      color: #ff4444;
    }
  }
}
.count-container {
  display: flex;
  font-size: 12px;
  padding: 0 20px;
  line-height: 25px;
  border-bottom: 1px solid #eee;
  .surplus-box {
    display: flex;
    .surplus-count {
      color: #ccc;
    }
    .limit {
      color: #ff4444;
      margin-left: 10px;
    }
    padding-bottom: 10px;
  }
  .stepping-device {
    margin-top: 10px;
    margin-left: 40px;
  }
}
.btn {
  width: 100%;
  height: 50px;
  color: #fff;
  background: #ff4444;
  text-align: center;
  line-height: 50px;
  position: absolute;
  bottom: 0;
}
</style>
