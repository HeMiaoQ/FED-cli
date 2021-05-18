export default [
  {
    path: '/vconsole',
    name: 'vconsole',
    meta: {
      title: '设置调试模式'
    },
    component: () => import(/* webpackChunkName: "vconsole" */ '@/views/vconsole/index.vue')
  }
]
