<template>
  <div class="location-text">
    <div  class="city-name-box" v-if="city !== ''">{{city}}</div>
    <div @click="toCity"><img src="../../../images/city-icon.svg" alt="" class="location-icon"></div>
  </div>
  
</template>

<script>
  export default {
    name: "Location",
    components: {},
    props: {
      city:{
        type: String,
        default: '',
      }
    },
    data() {
      return {
      }
    },
    methods: {
      toCity(){
        this.$router.push("/city");
      }
    },
    mounted() {
    },
    created() {
    },
    filters: {},
    computed: {

    },
    watch: {},
    directives: {}
  }
</script>

<style scoped lang="scss">
  .location-text{
    color: #333;
    line-height: 30px;
    display: flex;
  }
  .location-icon{
    width: 15px;
    height: 15px;
    margin-top:7px;
    margin-left:5px;
  }
  .city-name-box{
    text-align: center;
  }
</style>