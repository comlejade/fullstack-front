<template>
  <div class="fly-panel" v-show="lists.length > 0">
    <div class="fly-panel-title fly-filter">
      <a>置顶</a>
      <a href="#signin" class="layui-hide-sm layui-show-xs-block fly-right" id="LAY_goSignin" style="color: #FF5722;">去签到</a>
    </div>
    <list-item :isShow="false" :lists="lists" />
  </div>
</template>

<script>
import ListItem from './ListItem.vue'
export default {
  name: 'top',
  components: {
    ListItem
  },
  data () {
    return {
      lists: [{
        uid: {
          name: 'imooc',
          isVip: 1
        },
        title: '大前端课程',
        content: '',
        created: '2021-04-04 10:10:10',
        catalog: 'ask',
        fav: 40,
        isEnd: 0,
        answer: 20,
        status: 0,
        isTop: 1,
        tags: [
          { name: '精华', class: 'layui-bg-red' },
          { name: '热门', class: 'layui-bg-blue' }
        ]
      }],
      page: 0,
      limit: 20,
      catalog: ''
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
