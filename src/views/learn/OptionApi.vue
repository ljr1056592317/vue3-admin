<template>
  <button @click="increment">Count is: {{ count }}</button>
  <button @click="sayHello">跟我说hello</button>
</template>
<script>
// 假设我们有一个 mixin
const myMixin = {
  created() {
    this.hello()
  },
  methods: {
    hello() {
      console.log('Hello from mixin!')
    }
  }
}
export default {
  // 用于注册该组件内的子组件。
  components: {
    // 在此注册子组件
  },
  // 这是一个数组，允许你在多个组件中重用一块代码。提供的选项将会被合并到组件自己的选项
  mixins: [myMixin], // 使用 mixin
  // 定义该组件接收的 props。它可以是一个数组，包含你接收的 prop 的名称；也可以是一个对象，定义 prop 的名称和类型
  props: {
    // 定义接收的props
    message: {
      type: String,
      default: 'Hello Vue!'
    }
  },
  inject: ['privideSayHello', 'provideValueStr'],
  // 在 Vue3 中，需要定义组件会触发的事件，使父组件能够监听这些事件。
  emits: ['helloVue'],
  // data() 返回的属性将会成为响应式的状态
  // 并且暴露在 `this` 上
  data() {
    return {
      count: 0,
      firstName: 'firstName'
    }
  },
  // 它们是组件间通信的一种方式。一个组件可以通过 provide 选项向下游组件提供数据或方法，然后下游组件可以通过 inject 选项来接收
  provide() {
    return {
      getMap: this.getMap
    }
  },
  // methods 是一些用来更改状态与触发更新的函数
  // 定义组件的方法
  methods: {
    increment() {
      this.count++
    },
    sayHello() {
      console.log(this.message)
      this.$emit('helloVue', this.firstName) // 触发一个自定义事件
    },
    getMap() {
      // 假设这是一个获取地图的方法
      return this.map
    }
  },
  // 定义组件的计算属性
  computed: {
    // 定义计算属性
    computedMessage() {
      return this.firstName + ' ' + this.count
    }
  },
  // 用于监视组件数据的更改。当数据改变时，你可以执行回调函数进行响应
  watch: {
    // 监视数据变化
    count(newVal, oldVal) {
      console.log(`count changed from ${oldVal} to ${newVal}`)
    }
  },
  // 这个选项允许你创建一个组件的“子类”。提供的选项将会被合并到原组件的选项中
  extends: {
    // 扩展另一个组件
    data() {
      return {
        extendedData: 'This data is from extended component!'
      }
    }
  },
  // 创建前：数据观测和初始化事件还未开始，此时 data 的响应式追踪、event/watcher 都还没有被设置，也就是说不能访问到data、computed、watch、methods上的方法和数据
  beforeCreate() {
    console.log(`The initial count is ${this.count}.创建前数据观测和初始化事件还未开始`)
  },
  // 创建后：实例创建完成，实例上配置的 options 包括 data、computed、watch、methods 等都配置完成，但是此时渲染得节点还未挂载到 DOM，所以不能访问到 $el 属性
  created() {
    console.log(`The initial count is ${this.count}.创建后：实例创建完成，实例上配置的`)
  },
  // 挂载前： 在挂载开始之前被调用，相关的render函数首次被调用。实例已完成以下的配置：编译模板，把data里面的数据和模板生成html。此时还没有挂载html到页面上
  beforeMount() {
    console.log(
      `The initial count is ${this.count}.挂载前： 在挂载开始之前被调用，相关的render函数首次被调用`
    )
  },
  // 挂载后：在el被新创建的 vm.$el 替换，并挂载到实例上去之后调用。实例已完成以下的配置：用上面编译好的html内容替换el属性指向的DOM对象。完成模板中的html渲染到html 页面中。此过程中进行ajax交互
  mounted() {
    console.log(
      `The initial count is ${this.count}.挂载后：在el被新创建的 vm.$el 替换，并挂载到实例上去之后调用`
    )
    console.log(
      this.privideSayHello,
      this.provideValueStr,
      'this.privideSayHello,this.provideValueStr'
    )
  },
  // 更新前：响应式数据更新时调用，此时虽然响应式数据更新了，但是对应的真实 DOM 还没有被渲染
  beforeUpdate() {
    console.log(
      `The initial count is ${this.count}.更新前：响应式数据更新时调用，此时虽然响应式数据更新了，但是对应的真实 DOM 还没有被渲染`
    )
  },
  // 更新后：在由于数据更改导致的虚拟DOM重新渲染和打补丁之后调用。此时 DOM 已经根据响应式数据的变化更新了。调用时，组件 DOM已经更新，所以可以执行依赖于DOM的操作。然而在大多数情况下，应该避免在此期间更改状态，因为这可能会导致更新无限循环。该钩子在服务器端渲染期间不被调用
  updated() {
    console.log(
      `The initial count is ${this.count}.更新后：在由于数据更改导致的虚拟DOM重新渲染和打补丁之后调用。此时 DOM 已经根据响应式数据的变化更新了`
    )
  },
  // 卸载前：实例销毁之前调用。这一步，实例仍然完全可用，this 仍能获取到实例
  beforeUnmount() {
    console.log(
      `The initial count is ${this.count}.卸载前：实例销毁之前调用。这一步，实例仍然完全可用，this 仍能获取到实例`
    )
  },
  // 卸载后：实例销毁后调用，调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。该钩子在服务端渲染期间不被调用

  unmounted() {
    console.log(
      `The initial count is ${this.count}.卸载后：实例销毁后调用，调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁`
    )
  }
}
</script>
<style lang="scss" scoped>
.test {
  color: red;
}
</style>
