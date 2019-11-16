<template>
  <div class="bg">
    <div class="goback" @click="goBack">
      <img src="../../images/goback-white.png" class="goback-arrow" alt="">
    </div>
    <div class="log-box">
      <div class="title">
        登录 / 注册
      </div>
      <form action="">
        <div ><input type="text" class="username" placeholder="USERNAME" v-model="username_input"></div>
        <div ><input type="password" class="username" placeholder="PASSWORD" v-model="password_input"></div>
        <div class="phone-number">
          <div class="name">手机号码</div>
          <div class="input-box"><input type="text" class="phone-number-input" placeholder="仅注册需要"></div>
        </div>
        <div class="verification">
          <div class="name">短信验证码</div>
          <div class="input-box"><input type="text" class="verification-input" placeholder="仅注册需要">
          </div>
          <div><button class="verification-btn">发送验证码</button></div>
        </div>
        <div class="bottom-verification">
          <div class="name">验证码</div>
          <div class="boottom-input-box"><input type="text" class="boottom-verification-input"
                                                placeholder="请输入验证码" v-model="verification_input">
          </div>
          <div v-html="verification" @click="changeVerification"></div>
        </div>
        <div class="bottom-btn">
          <div class="log-btn" @click="Login">登录</div>
          <div class="register-btn" @click="registerAccount">注册</div>
        </div>
      </form>
    </div>
  </div>
  
</template>

<script>

  export default {
    name: "LogAndRegister",
    components: {},
    props: {},
    data() {
      return {
        verification: '',         //验证码svg
        username_input:'',        //用户名框的值
        password_input: '',     //密码框的值
        verification_input:'',  //验证码输入框的值
      }
    },
    methods: {
      //发送获取验证码请求
      async getData() {
        try {
          let result = await this.$api.getAverify();
          result = result.replace('/v1', '');
          this.$axios.req(result).then(res => {
            this.verification = res;
          }).catch(err => {
            console.log(err);
          })
        } catch (e) {
          console.log(e);
        }
      },
      //发送更换验证码请求
      changeVerification() {
        this.getData();
      },
      // 注册按钮事件
      async registerAccount(){
        try {
          if(!this.username_input){
            this.$toast('请输入要注册的用户名');
            return;
          }
          if(!this.password_input){
            this.$toast('请输入密码');
            return;
          }
          if(!this.verification_input){
            this.$toast('验证码不能为空');
            return;
          }
          let result = await this.$api.register(this.username_input, this.password_input, this.verification_input);
          //表示注册成功
          let user_info_data = result.userInfo;
          localStorage.setItem('userInfo', JSON.stringify({}));
          //将用户信息添加到localstorage
          let user_info = JSON.parse(localStorage.getItem('userInfo'));
          user_info = user_info_data
          localStorage.setItem('userInfo', JSON.stringify(user_info));

          if(result.code === 200){
            //跳转到商城主页
            this.$router.push("/");
          //  设置登录成功状态
            localStorage.setItem("login_state", true);
            this.$toast('注册成功');
          };
          if(result.code === -2){
            this.$toast('验证码错误');
          }
          if(result.msg === "用户名已存在"){
            this.$toast('用户名已存在');
          }
        } catch (e) {
          console.log(e);
        }
      },
      //登录按钮时间
      async Login(){
        try {
          if(!this.username_input){
            this.$toast('请输入用户名');
            return;
          }
          if(!this.password_input){
            this.$toast('请输入密码');
            return;
          }
          if(!this.verification_input){
            this.$toast('验证码不能为空');
            return;
          }
          let result = await this.$api.login(this.username_input, this.password_input, this.verification_input);
          //表示注册成功
          let user_info_data = result.userInfo;
          localStorage.setItem('userInfo', JSON.stringify({}));
          //将用户信息添加到localstorage
          let user_info = JSON.parse(localStorage.getItem('userInfo'));
          user_info = user_info_data
          localStorage.setItem('userInfo', JSON.stringify(user_info));

          if(result.code === 200){
            //跳转到商城主页
            this.$router.push("/");
            //  设置登录成功状态
            localStorage.setItem("login_state", true);
            this.$toast('登陆成功');
          }
          if(result.code === -2){
            this.$toast('验证码错误');
          }
        } catch (e) {
          console.log(e);
        }
      },
      //退后按钮
      goBack(){
        this.$router.go(-1);
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
  .bg{
    position:absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: url("../../images/logbg.jpg")  0  100% no-repeat;
    .goback{
      width:30px;
      height:30px;
      background: rgba(0, 0, 0, .5);
      position: absolute;
      left:20px;
      top: 20px;
      border-radius: 50%;
      .goback-arrow{
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
    .log-box{
      width:90%;
      box-shadow: 1px 1px 5px #ccc;
      height:500px;
      background: #fff;
      margin: 0 auto;
      margin-top:120px;
      box-sizing: border-box;
      padding: 15px;
      .title{
        font-size:20px;
      }
    }
    .username{
      border: none;
      margin-top: 40px;
      padding-bottom: 25px;

      width:100%;
      border-bottom: 1px solid #eee;
      font-size:14px;
      &::placeholder {
        color:#bbb;
        font-size:15px;
      }
    }
    .phone-number, .verification,.bottom-verification{
      margin-top:30px;
      display: flex;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
      font-size:14px;
      color: #3A3A3A;
      .name{
        width:80px;
      }
      .input-box{
        width:50%;
      }
      .phone-number-input, .verification-input{
        border: none;
        &::placeholder {
          color:#bbb;
          font-size:15px;
        }
      }
    }
    .verification{
      margin-top:20px;
      .verification-input{
        width:60%;
        margin-left:5px;
        &::placeholder {
          color:#bbb;
          font-size:15px;
        }
      }
      .verification-btn{
        width:80px;
        height:30px;
        font-size:12px;
        border: none;
        background: #07c160;
        color:#fff;
        margin-right:20px;
      }
    }
    .bottom-verification{
      border: none;

      .name{
        width:60px;
        line-height:30px;
      }
      .boottom-input-box{
        width:50%;
        .boottom-verification-input{
          border: none;
          height:30px;
          padding-bottom:10px;
          border-bottom: 1px solid #eee;
          &::placeholder {
            color:#bbb;
            font-size:15px;
          }
        }
      }
    }
    .bottom-btn{
      display: flex;
      margin-top:15px;
      width:100%;
      height:40px;
      .log-btn, .register-btn{
        width:90px;
        height:40px;
        background: #07c160;
        border-radius: 3px;
        margin-right:10px;
        text-align: center;
        line-height: 40px;
        color: #fff;
        font-size:14px;
      }
      .register-btn{
        background: #ff4444;
      }
    }
  }
</style>