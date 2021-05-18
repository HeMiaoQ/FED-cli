<template>
  <div>
    <div class="open" @click="onOpen">打开调试</div>
    <div class="close" @click="onClose">关闭调试</div>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  computed: {},
  methods: {
    onOpen () {
      this.$utils.OPEN_VCONSOLE()
      Toast('调试模式已打开')
    },
    onClose () {
      this.$utils.CLOSE_VCONSOLE()
      Toast('调试模式已关闭')
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 30px;
}
.open,
.close {
  width: 200px;
  font-size: 30px;
  line-height: 40px;
  background: #ffcc00;
  color: #fff;
  text-align: center;
  margin: 30px;
}
</style>
