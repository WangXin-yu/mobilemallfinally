<template>
  <div class="user-info">
    <TitleSlotBack>个人资料</TitleSlotBack>
    <div class="from">gitub</div>
    <div class="head-box">
      <div>头像</div>
      <div class="right">
        <div><img :src="user_info.avatar" alt="" class="head-image"></div>
        <div class="arrow-icon"><img src="../../../images/arrow.png" class="arrow-icon" alt=""></div>
      </div>
    </div>
    <div class="textname">
      <div class="textname-title">用户名</div>
      <div>
        <input type="text" class="username-input" placeholder="请输入用户名"
               v-model="user_info_v_model.username">
      </div>
    </div>
    <div class="textname">
      <div class="textname-title">昵称</div>
      <div>
        <input type="text" class="nickname-input" placeholder="请输入昵称"
               v-model="user_info_v_model.nickname">
      </div>
    </div>
    <div class="textname">
      <div class="textname-title">性别</div>
      <div>
        <input type="text" class="gender-input" placeholder="请输入性别"
               v-model="user_info_v_model.gender">
      </div>
    </div>
    <div class="textname">
      <div class="textname-title">邮箱</div>
      <div class="emali-input-box"><input type="text" class="email-input" placeholder="请输入邮箱"
      v-model="user_info_v_model.email"></div>
    </div>
    <div class="textname birthday">
      <div class="textname-title">出生年月</div>
      <div @click="chooseBirthday" class="choose-item">{{chosed_data}}</div>
    </div>
    <!--    年月日选择-->
     <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '40%' }"
     >
      <div>
        <van-datetime-picker
            close-on-click-overlay="true"
            v-model="currentDate"
            type="date"
            :max-date="maxDate"
            :min-date="minDate"
            @confirm="birthdayConfirm"
            @cancel="birthdayCancle"
        />
      </div>
    </van-popup>

<!--    底部按钮-->
    <div class="btn save" @click="Save">
      保存
    </div>

    <div class="btn cancle" @click="Cancle">取消</div>
  </div>

</template>

<script>
  import axios from 'axios'
  import TitleSlotBack from "../../../views/TitleSlotBack"
  import Vue from 'vue';
  import { Toast } from 'vant';
  Vue.use(Toast);
  export default {
    name: "UserInfo",
    components: {
      TitleSlotBack
    },
    props: {},
    data() {
      return {
        show:false,
        user_info: [],              //用户的信息
        //处理生日日期的数据
        currentDate: new Date(),    //当前的日期
        minDate: new Date(1970),    //最小的日期
        maxDate: new Date(),        //最大的日期
        chosed_data: '',            //最终选择的日期
        user_info_v_model: {
          //修改保存用户信息(gender,email,year,month,day,id,nickname,avatar)
          gender: '',
          email: '',
          year: 1,
          month: 1,
          day: 1,
          id: '',
          username: '', //用户名
          nickname:'',  //昵称
          avatar: '',

        },
      }
    },
    methods: {
      // 初始化用户信息
      async getUserInfo(){
        try {
          let result = await this.$api.user();
          if(result.code === -1){
            this.user_info = [];
            //如果得不到用户信息，那么将登录状态设置为未登录
            this.$store.state.login_state = false;
          }else {
            this.user_info = result.userInfo;
            //初始化界面输入框的值
            this.user_info_v_model.gender = this.user_info.gender;
            this.user_info_v_model.email = null;
            this.user_info_v_model.year = this.user_info.year;
            this.user_info_v_model.month = this.user_info.month;
            this.user_info_v_model.day = this.user_info.day;
            this.user_info_v_model.id = this.user_info._id;
            this.user_info_v_model.nickname = this.user_info.nickname;
            this.user_info_v_model.username = this.user_info.username;
            this.user_info_v_model.avatar = this.user_info.avatar;
            //得到到用户信息，那么将登录状态设置为已登录
            this.$store.state.login_state = true;
            //初始化生日
            this.chosed_data = this.user_info.year+"年"+this.user_info.month+"月"+this.user_info.day+"日";
          }
        } catch (e) {
          console.log(e);
        }
      },
      //保存按钮事件
      async Save(){

        Toast('提示内容');
        //发送接口存修改的属性(gender,email,year,month,day,id,nickname,avatar)
          try {
            let obj = {
              gender: this.user_info_v_model.gender,
              email: this.user_info_v_model.email,
              year: this.user_info_v_model.year,
              month: this.user_info_v_model.month,
              day: this.user_info_v_model.day,
              id: this.user_info_v_model.id,
              nickname: this.user_info_v_model.nickname,
            }
            let result = await axios.post(`api/saveUser`, obj);
            console.log(result);
          }catch(err){
            console.log(err);
          }
      },
      //取消按钮事件
      Cancle(){
        this.$router.push("/my");
      },
      //日期确定
      birthdayConfirm(value){
        this.chosed_data = this.$dayjs(value).format("YYYY年MM月DD日");
        this.user_info_v_model.year = this.$dayjs(value).year();
        this.user_info_v_model.month = this.$dayjs(value).month()+1;
        this.user_info_v_model.day = this.$dayjs(value).date();
        console.log(this.user_info_v_model.year);
        console.log(this.user_info_v_model.month);
        console.log(this.user_info_v_model.day);

        this.show = false;
      },
      //日期取消
      birthdayCancle(){
        this.show = false;
      },
      //开始生日选择，显示日期选择面板
      chooseBirthday(){
        this.show = true;
      }
    },

    mounted() {
      this.getUserInfo();
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
  .user-info{
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: #fff;
    font-size:14px;
  }
  .title{
    height:43px;
    line-height: 43px;
    text-align: center;
    background: #fff;
    border-bottom: 1px solid #eee;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 11;
    font-size:16px;
  }
  .from{
    line-height:40px;
    padding-left:15px;
    box-sizing: border-box;
    color: #3A3A3A;
  }
  .head-box{
    line-height:80px;
    height: 80px;
    border-top: 1px solid #eee;
    padding-left:15px;
    box-sizing: border-box;
    color: #3A3A3A;
    display: flex;
    justify-content: space-between;
    .right{
      display: flex;
      justify-content: space-around;
      margin-right:20px;
      .head-image{
        width:60px;
        height:60px;
        border-radius: 50%;
        margin-top: 10px;

      }
      .arrow-icon{
        width:25px;
        height:25px;
        margin-top: 10px;
      }
    }

  }
  .textname{
    display: flex;
    padding-left:15px;
    box-sizing: border-box;
    border-top: 1px solid #eee;
    line-height:40px;
    .textname-title{
      width:30%;
    }
    .email-input,.username-input, .nickname-input, .gender-input{
      border:none;
      &::placeholder{
        color: #bbb;
      }
    }
    .username-input{
      color: #bbb;
    }
    .username-text{
      color: #bbb;
    }

  }
  .birthday{
    border-bottom: 1px solid #eee;
  }
  .btn{
    width:80%;
    height:40px;
    line-height: 40px;
    text-align: center;
    background: red;
    margin: 0 auto;
    margin-top:50px;
    font-size:14px;
  }
  .save{
    background: #07c160;
    color: #fff;
  }
  .cancle{
    margin-top:10px;
    background: #fff;
    border: 1px solid #eee
  }
  .choose-date-box{
    .mongolia{
      width:100%;
      height: 60vh;
      position: fixed;
      top: 0;
      z-index:21;
      background: rgba(0, 0, 0, 0.5);
    }
    position: fixed;
    width: 100%;
    height:40vh;
    bottom:0;
    z-index:21;
  }
</style>