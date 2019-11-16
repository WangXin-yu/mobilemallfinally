<template>
  <div class="detailAndCom">
    <van-tabs bind:change="onChange">
      <van-tab title="商品详情">
        <div v-html="detail" class="_detail"></div>
      </van-tab>
      <van-tab title="商品评论">
        <div>
          <div class="comment" v-for="item in comment" :key="item.k">
            <!--            -->
            <div class="user">
              <div>
                <img
                  src="../../../images/my-head.png"
                  alt=""
                  class="userhead"
                />
              </div>
              <div class="username-and-star">
                <div class="username">{{item.comment_nickname}}</div>
                <div class="star">
                  <van-rate v-model="item.rate" color="#ee0a24" :size="20" />
                </div>
                <div class="content">
                  {{ item.content }}
                </div>
              </div>
              <div class="date">
                {{ item.comment_time }}
              </div>
            </div>
            <!--            -->
          </div>
        </div>
      </van-tab>
    </van-tabs>

<!--    <div class="bottom-fixed">-->
<!--      <div class="icon first">-->
<!--        <div>-->
<!--          <img-->
<!--            src="../../../images/home-page.png"-->
<!--            class="customer-service"-->
<!--            alt=""-->
<!--          />-->
<!--        </div>-->
<!--        <div @click="goToMall">首页</div>-->
<!--      </div>-->
<!--      <div class="icon" @click="goToShoppingCar">-->
<!--        <div>-->
<!--          <img-->
<!--            src="../../../images/shopping-car.png"-->
<!--            class="customer-service"-->
<!--            alt=""-->
<!--          />-->
<!--        </div>-->
<!--        <div>购物车</div>-->
<!--      </div>-->
<!--      <div class="add-to-cart" @click="addToShoppingCar">-->
<!--        加入购物车-->
<!--      </div>-->
<!--      <div class="immediate-purchase" @click="immediatePurchase">-->
<!--        立即购买-->
<!--      </div>-->
<!--      &lt;!&ndash;    立即购买&ndash;&gt;-->
<!--      <van-popup-->
<!--        v-model="show"-->
<!--        closeable-->
<!--        close-icon="close"-->
<!--        position="bottom"-->
<!--        :style="{ height: '35%' }"-->
<!--        :duration="duration"-->
<!--      >-->
<!--        <div class="elastic-frame">-->
<!--          <div class="shop-img-box">-->
<!--            <img :src="shops_img" alt="" class="shop-img" />-->
<!--          </div>-->
<!--          <div class="name-and-price">-->
<!--            <div class="name">{{ goodOne.name }}</div>-->
<!--            <div class="price">￥{{ goodOne.present_price }}</div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="count-container">-->
<!--          <div class="count-box">-->
<!--            <div>购买数量:</div>-->
<!--            <div class="surplus-box">-->
<!--              <div class="surplus-count">剩余10000件</div>-->
<!--              <div class="limit">每人限购50件</div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="stepping-device">-->
<!--            <van-stepper v-model="count" max="50" />-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="btn" @click="settlementPurchase">-->
<!--          立即购买-->
<!--        </div>-->
<!--      </van-popup>-->
<!--    </div>-->
  </div>
</template>

<script>
export default {
  name: "DetailAndComment",
  components: {},
  props: {
    detail: {
      type: String,
      default: ""
    },
    goodsId: {
      type: String,
      default: ""
    },
    shops_img: {
      type: String,
      default: ""
    },
    goodOne: {
      type: Object,
      default: () => {}
    },
    comment: {
      type: Array,
      default: () => {}
    }
  },
  data() {
    return {
      comment_datas: [],
      duration: 0.1,
      show: false,
      count: 1,
      user_info: {},
    };
  },
  methods: {
    //加入购物车
    async addToShoppingCar() {
      try {
        await this.$api.addShop(this.goodsId);
        this.$toast('加入购物车成功');
      } catch (e) {
        console.log(e);
      }
    },
    //跳转到购物车页面
    goToShoppingCar() {
      this.$router.push("/shopping-car");
    },
    //立即购买
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
    //获取评论的条数
    async getComments() {
      try {
        await this.$api.evaluateOne(this.goodOne._id);
      } catch (err) {
        console.log(err);
      }
    },
    //跳转到首页
    goToMall(){
      this.$router.push("/");
    }
  },
  mounted() {
    this.user_info = JSON.parse(localStorage.getItem("userInfo"));
  },
  created() {
    this.getComments();
  },
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.detailAndCom {
  margin-bottom: 50px;
}
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
.comment {
  border-bottom: 1px solid #eee;
  .user {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    .userhead {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 1px solid #eee;
    }
    .username {
      margin-bottom: 10px;
      font-size: 14px;
    }
    .date {
      line-height: 50px;
      font-size: 13px;
      color: #666;
    }
  }
  .content{
  }
}
</style>
