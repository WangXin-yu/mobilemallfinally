<template>
  <div>
    <van-image-preview
        v-model="show"
        :images="images"
        @change="onChange"
    >

      <template v-slot:index>第{{ index }}页</template>
    </van-image-preview>
    <div @click="click1">adasdasd</div>
  </div>
</template>

<script>
export default {
  name: "TestGaoDe",
  components: {},
  props: {},
  data() {
    return {
      show: false,
      index: 0,
      images: [
        "http://e.hiphotos.baidu.com/image/h%3D300/sign=907f6e689ddda144c5096ab282b6d009/dc54564e9258d1092f7663c9db58ccbf6c814d30.jpg",
          "http://c.hiphotos.baidu.com/image/h%3D300/sign=0cc74ef9a3773912db268361c8188675/9922720e0cf3d7ca810f3732f81fbe096a63a9fd.jpg"]
    }
  },
  methods: {
    click1(){
      this.show = true;
    },
    onChange(index) {
      this.index = index;
    }
  },
  mounted() {
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
  .amap-demo {
    height: 300px;
  }
</style>
