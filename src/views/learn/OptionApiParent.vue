<template>
  <div class="test">测试模版</div>
  <OptionApi @helloVue="helloVue"></OptionApi>
</template>
<script lang="ts">
import OptionApi from './OptionApi.vue'
export default {
  components: {
    // 在此注册子组件
    OptionApi: OptionApi
  },
  // 它们是组件间通信的一种方式。一个组件可以通过 provide 选项向下游组件提供数据或方法，然后下游组件可以通过 inject 选项来接收
  provide() {
    return {
      privideSayHello: this.privideSayHello,
      provideValueStr: 'provideValueStr--provide提供的值'
    }
  },
  data() {
    return {
      count: 0,
      firstName: 'msg'
    }
  },
  methods: {
    helloVue(optionapiPamras) {
      console.log(optionapiPamras, 'optionapiPamras')
    },
    privideSayHello() {
      console.log('privideSayHello')
    }
  }
}
</script>
<style lang="scss" scoped>
.test {
  color: red;
}
</style>
