<template>
  <div class="fly-panel">
    <h3 class="fly-panel-title">温馨通道</h3>
    <div class="fly-panel-main layui-row">
      <ul class="layui-clear imooc-quick">
        <li class="layui-col-xs6" v-for="(item, index) in list" :key="'tips' + index">
          <a :href="item.link" target="_blank">{{item.title}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getTips } from '@/api/content'
export default {
  name: 'tips',
  data () {
    return {
      list: []
    }
  },
  mounted () {
    getTips().then(res => {
      if (res.code === 200) {
        this.list = res.data
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.fly-panel-main {
  padding: 15px;
}

.imooc-quick {
  border: 1px solid #f2f2f2;
  border-right: none;
  border-bottom: none;
  .layui-col-xs6 {
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    text-align: center;
    border: 1px solid #f2f2f2;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    border-left: none;
    border-top: none;
  }
  a {
    display: block;
  }
}
</style>
