<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8">
        <list />
      </div>
      <div class="layui-col-md4">
        <hot-list />
        <ads />
        <links />
      </div>
    </div>
  </div>
</template>

<script>
import HotList from '@/components/sidebar/HotList.vue'
import Ads from '@/components/sidebar/Ads.vue'
import Links from '@/components/sidebar/Links.vue'
import List from '@/components/contents/List.vue'
export default {
  name: 'template1',
  components: {
    HotList,
    Ads,
    Links,
    List
  }
}
</script>

<style lang="scss" scoped>
</style>
