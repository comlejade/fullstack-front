<template>
  <div>
    <dl class="fly-panel fly-list-one">
      <dt class="fly-panel-title">本周热议</dt>
      <dd v-for="(item, index) in list" :key="'hostList' + index">
        <a href="">{{ item.title }}</a>
        <span><i class="iconfont icon-pinglun1"></i> {{ item.answer }}</span>
      </dd>

      <!-- 无数据时 -->
      <!--
        <div class="fly-none">没有相关数据</div>
        -->
    </dl>
  </div>
</template>

<script>
import { getTop } from '@/api/content'

export default {
  name: 'hotList',
  data () {
    return {
      list: []
    }
  },
  mounted () {
    getTop().then(res => {
      if (res.code === 200) {
        this.list = res.data
      }
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
