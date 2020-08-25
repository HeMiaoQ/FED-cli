<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>

    <div v-show="loading && !noNet" class="loading">
      <van-loading />
    </div>

    <div class="noNet" v-if="noNet">
      <img src="./assets/image/noNet.png" alt="">
      <p>网络错误</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import request from '@/services/request'
import api from '@/services/api'
import axios from '@/services/axios'
import { REGEXP_PHONE } from '@/services/constants'
import { CALC_REM } from '@/services/utils'
import { Loading } from 'vant'

export default {
  components: {
    [Loading.name]: Loading
  },
  computed: {
    ...mapState([
      'loading',
      'noNet'
    ])
  },
  async created () {
    this.updateLoadingStatus()

    /* eslint-disable */
    console.info(
      this.$request, '\n',
      this.$api, '\n',
      this.$axios, '\n',
      this.$constants, '\n',
      this.$utils, '\n',
    )
    console.info(
      request, '\n',
      api, '\n',
      axios, '\n',
      REGEXP_PHONE, '\n',
      CALC_REM, '\n',
    )

    // 请求接口示例
    // const params = {}
    // const options = {}
    // try {
    //   await this.$request(this.$api.topics, params, options)
    // } catch (e) {}
  },
  methods: {
    ...mapActions([
      'UPDATE_LOADING_STATUS'
    ]),
    updateLoadingStatus () {
      this.UPDATE_LOADING_STATUS(true)
      setTimeout(() => this.UPDATE_LOADING_STATUS(false), 3000)
    }
  }
}
</script>

<style lang="scss">
  @import "assets/style/common";
  @import "assets/iconfont/iconfont.css";

  .loading {
    .van-loading__spinner {
      width: 80px;
      height: 80px;
    }
  }

  .noNet, .loading {
    position: fixed;
    top: 360px;
    left: 50%;
    z-index: 3000;
    margin-left: -120px;
    width: 240px;
    height: 240px;
    background: rgba(0, 0, 0, 0.75);
    border-radius: 8px;
    padding: 80px;
  }
  .noNet {
    font-size: 0;
    padding: 0;
    img {
      position: absolute;
      left: 50%;
      margin-left: -40px;
      margin-top: 70px;
      width: 80px;
    }
    p {
      width: 100%;
      margin-top: 165px;
      text-align: center;
      font-size: 26px;
      color: white;
    }
  }
</style>
