<template>
  <div class="fly-panel" style="margin-bottom: 0;">

    <div class="fly-panel-title fly-filter">
      <a href="" :class="{'layui-this': status === '' && tag === ''}" @click.prevent="search()">综合</a>
      <span class="fly-mid"></span>
      <a href="" :class="{'layui-this': status === '0'}" @click.prevent="search(0)">未结</a>
      <span class="fly-mid"></span>
      <a href="" :class="{'layui-this': status === '1'}" @click.prevent="search(1)">已结</a>
      <span class="fly-mid"></span>
      <a href="" :class="{'layui-this': tag === '精华'}" @click.prevent="search(2)">精华</a>
      <span class="fly-filter-right layui-hide-xs">
        <a href="" :class="{'layui-this': sort === 'created'}" @click.prevent="search(3)">按最新</a>
        <span class="fly-mid"></span>
        <a href="" :class="{'layui-this': sort === 'answer'}" @click.prevent="search(4)">按热议</a>
      </span>
    </div>

    <list-item :lists="lists" :isEnd="isEnd" @nextPage="nextPage" />

  </div>
</template>

<script>
import ListItem from './ListItem.vue'
import { getList } from '@/api/content'

export default {
  name: 'list',
  components: {
    ListItem
  },
  data () {
    return {
      isEnd: false,
      status: '',
      tag: '',
      sort: 'created',
      page: 0,
      limit: 20,
      catalog: '',
      lists: []
    }
  },
  mounted () {
    this._getList()
  },
  methods: {
    search (val) {
      switch (val) {
        // 未结贴
        case 0:
          this.status = '0'
          this.tag = ''
          break
        // 已结贴
        case 1:
          this.status = '1'
          this.tag = ''
          break
        // 查询精华标签
        case 2:
          this.status = ''
          this.tag = '精华'
          break
        // 按照创建时间查询
        case 3:
          this.sort = 'created'
          break
        // 按照回帖数查询
        case 4:
          this.sort = 'answer'
          break
        // 默认
        default:
          this.status = ''
          this.tag = ''
      }
    },
    _getList () {
      if (this.isEnd) return
      const options = {
        catalog: this.catalog,
        isTop: 0,
        page: this.page,
        limit: this.limit,
        sort: this.sort,
        tag: this.tag,
        status: this.status
      }
      getList(options).then(res => {
        console.log(res)
        // 判断lists长度是否为0,如果为0直接赋值，如果不是，就把后面请求的加入进来
        // 异常判断，res.code不是200，要有提示

        // 如果lists长度小于20，那么说明是最后一页，不用再发起请求
        if (res.code === 200) {
          if (res.data.length < this.limit) {
            this.isEnd = true
          }
          if (this.lists.length === 0) {
            this.lists = res.data
          } else {
            this.lists = this.lists.concat(res.data)
          }
        }
      }).catch(err => {
        if (err) {
          this.$alert(err.message)
        }
      })
    },
    nextPage () {
      this.page++
      this._getList()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
