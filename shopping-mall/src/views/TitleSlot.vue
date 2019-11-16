<template>
  <div>
    <div class="title">
      <slot>undefined</slot>
    </div>
  </div>
  
</template>

<script>
  export default {
    name: "TitleSlot",
    components: {},
    props: {},
    data() {
      return {}
    },
    methods: {
      goBack(){
        this.$router.go(-1);
      }
    },
    mounted() {

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
    position:relative;
    .goback{
      width:20px;
      height: 20px;
      position:absolute;
      left: 10px;
      top: 10px;
    }
  }

</style>