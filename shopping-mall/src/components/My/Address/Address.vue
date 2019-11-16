<template>
  <div class="address">
    <TitleSlotBack>地址列表</TitleSlotBack>
    <van-address-list
        v-model="chosenAddressId"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
        @click-item="onSelect"
    />
  </div>

</template>

<script>
  import TitleSlotBack from "../../../views/TitleSlotBack"
  export default {
    name: "Address",
    components: {
      TitleSlotBack
    },
    props: {},
    data() {
      return {
        list: [],
        chosenAddressId:1,
      }
    },
    methods: {
      async getAddress(){
        try{
          let res = await this.$api.getAddress();
          this.list = res.address;
          this.list.forEach((item, index)=>{
            if(item.isDefault){
              this.chosenAddressId = index + 1;
            }
          })
          let id = 1;
          this.list.map(item=>{
            item.id = id++;
          });
        }catch(err){
          console.log(err);
        }
      },
      onAdd(){
        this.$router.push("/edit-address");
      },
      onEdit(item, index){
        this.$router.push({path:"/edit-address", query:{id: item._id, detail: this.list[index]}});
      },
      // 当勾选时设置为默认地址
      async onSelect(item){
        try{
          await this.$api.setDefaultAddress(item._id)
        }catch(err){
          console.log(err);
        }
      },
    },
    mounted() {
      this.getAddress();
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
  .address{
    position:absolute;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
  }
  .add-address{
    width: 100%;
    height: 40px;
    position: absolute;
    bottom: 50px;
    background: red;
    color: #fff;
    text-align: center;
    line-height: 40px;
  }
</style>