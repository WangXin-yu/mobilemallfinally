<template>
  <div class="edit-address-box">
    <TitleSlotBack>编辑地址</TitleSlotBack>
    <van-address-edit
        :area-list="areaList"
        show-delete
        show-set-default
        show-search-result
        :address-info = "addressInfo"
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import TitleSlotBack from "../../../../views/TitleSlotBack";
import areaList from "./area";
export default {
  name: "EditAddress",
  components: {
    TitleSlotBack
  },
  props: {},
  data() {
    return {
      areaList,
      addressInfo:{},
      searchResult: [],
      id: '',
    };
  },
  methods: {
    async onSave(content){
      try{

        //将得到的地址信息调用接口传入到数据库
        //参数：name:用户名,tel:电话，address:(省+市+区+详情地址)，isDefault：是否默认
        // province：省，city：市，county：区，addressDetail：详情地址，
        //areaCode：地区代码，id：修改地址时候要传id
        let address = content.province + content.city + content.county + content.addressDetail;
        content.address = address;
        if(!this.addressInfo.id){
          //添加地址
          await this.$api.postAddress(content);
          this.$toast('添加地址成功');
          this.$router.push("/address")
        }else{
          //修改地址
          content.id = this.addressInfo.id;
          await this.$api.postAddress(content)
          this.$toast('修改地址成功');
          this.$router.push("/address")
        }
      }catch(err){
        console.log(err);
      }
    },
    async onDelete(){
      try{
        if(this.addressInfo.id){
          await this.$api.deleteAddress(this.addressInfo.id);
          this.$toast('删除地址成功');
          this.$router.push("/address")
        }
      }catch(err){
        console.log(err);
      }
    },

    onChangeDetail(){

    }

  },
  mounted() {
    if(this.$route.query.detail){
      this.addressInfo = this.$route.query.detail
    }
    if(this.addressInfo.id){
      this.addressInfo.id = this.$route.query.id
    }
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.edit-address-box {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
}
.name-box,
.phone-box,
.region-box,
.address-box,
.set-default-box {
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  height: 40px;
  display: flex;
  font-size: 14px;
  border-bottom: 1px solid #eee;
}
.set-default-box {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.name-text,
.phone-text,
.region-text,
.address-text {
  width: 25%;
  box-sizing: border-box;
  line-height:40px;
}
.default-text {
  width: 40%;
  line-height:40px;
}
.name-input,
.phone-input,
.region-input,
.address-input {
  border: none;
  height: 30px;
  padding-top:5px;
  box-sizing: border-box;
}
.btn{
  width:92%;
  height:40px;
  box-sizing: border-box;
  line-height: 40px;
  text-align: center;
  margin: 0 auto;
  margin-top:50px;
  font-size:14px;
}
.save{
  background: #ff4444;
  color: #fff;
}
.cancle{
  margin-top:10px;
  background: #fff;
  border: 1px solid #eee
}
</style>
