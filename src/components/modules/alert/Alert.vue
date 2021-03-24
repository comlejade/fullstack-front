<template>
  <div v-show="isShow">
    <div class="alert">
      <div class="msg flex">{{ msg }}</div>
      <div v-if="type === 'alert'">
        <div class="btn success" @click="close">确定</div>
      </div>
      <div v-else-if="type === 'confirm'" class="btn-group">
        <div class="btn cancel" @click="cancelEvent">取消</div>
        <div class="btn success" @click="successEvent">确定</div>
      </div>
    </div>
    <div class="mask" @click="closeMask"></div>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    type: {
      type: String,
      default: 'alert'
    },
    msg: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: false
    },
    cancel: {
      type: Function,
      default: () => { console.log('点击了cancel') }
    },
    success: {
      type: Function,
      default: () => { console.log('点击了success') }
    }
  },
  methods: {
    close () {
      this.isShow = false
    },
    closeMask () {
      if (this.type === 'alert') {
        this.close()
      }
    },
    cancelEvent () {
      this.cancel()
      this.close()
    },
    successEvent () {
      this.success()
      this.close()
    }
  }
}
</script>

<style lang="scss" scoped>
$btn-green: #009688;
$btn-green-dark: darken($btn-green, 4%);
$btn-grey: #eee;
$btn-grey-dark: darken($btn-grey, 4%);

.alert {
  width: 300px;
  height: 150px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -150px;
  margin-left: -75px;
  z-index: 3000;
  padding: 20px 10px;
  background: #fff;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}

.flex {
  flex: 1;
}

.btn {
  width: 105px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  cursor: pointer;
  &.success {
    color: #fff;
    background: $btn-green;
    &:hover {
      background: $btn-green-dark;
    }
  }
  &.cancel {
    background: $btn-grey;
    color: #333;
    &:hover {
      background: $btn-grey-dark;
    }
  }
}

.btn-group {
  width: 100%;
  display: flex;
  flex: row nowrap;
  justify-content: space-around;
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 2999;
}
</style>
