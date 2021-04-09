<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8">
        <top />
        <list />
      </div>
      <div class="layui-col-md4">
        <tips />
        <sign />
        <hot-list />
        <ads />
        <links />
      </div>
    </div>
  </div>
</template>

<script>
import Tips from '@/components/sidebar/Tips.vue'
import Sign from '@/components/sidebar/Sign.vue'
import HotList from '@/components/sidebar/HotList.vue'
import Ads from '@/components/sidebar/Ads.vue'
import Links from '@/components/sidebar/Links.vue'
import List from '@/components/contents/List.vue'
import Top from '@/components/contents/Top.vue'
export default {
  name: 'index',
  components: {
    Tips,
    Sign,
    HotList,
    Ads,
    Links,
    List,
    Top
  }
}
</script>

<style lang="scss" scoped>
</style>
