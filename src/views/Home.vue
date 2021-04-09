<template>
  <div>
    <panel />
    <router-view></router-view>
  </div>
</template>

<script>
import Panel from '@/components/Panel.vue'

export default {
  name: 'Home',
  components: {
    Panel
  }

}
</script>

<style lang="scss" scoped>
</style>
