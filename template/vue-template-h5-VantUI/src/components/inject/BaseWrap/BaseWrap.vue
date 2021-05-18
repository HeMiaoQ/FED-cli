<template>
  <div v-on="$listeners" class="base-wrap" :class="{'display-inline': inline}" :style="paddingStyle">
    <slot></slot>
  </div>
</template>

<script>
import { CALC_REM } from '@/utils'

export default {
  props: {
    top: {
      type: [String, Number],
      default: '0'
    },
    left: {
      type: [String, Number],
      default: '0'
    },
    right: {
      type: [String, Number],
      default: '0'
    },
    bottom: {
      type: [String, Number],
      default: '0'
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    paddingStyle () {
      return {
        paddingTop: CALC_REM(this.top),
        paddingLeft: CALC_REM(this.left),
        paddingRight: CALC_REM(this.right),
        paddingBottom: CALC_REM(this.bottom)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .base-wrap {
    position: relative;
  }
  .display-inline {
    display: inline;
  }
</style>
