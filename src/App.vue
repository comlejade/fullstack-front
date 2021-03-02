<template>
  <div id="app">
    <div class="layui-container">
      <form class="layui-form layui-form-pane">
        <div class="layui-form-item">
          <label class="layui-form-label">手机/邮箱</label>
          <ValidationProvider rules="required" name="用户名" v-slot="{ errors }">
            <div class="layui-input-inline">
              <input type="text" name="username" v-model.trim="username" placeholder="请输入手机/邮箱" autocomplete="off" class="layui-input">
            </div>
            <span class="layui-form-mid error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">密码</label>
          <ValidationProvider rules="required" name="密码" v-slot="{ errors }">
            <div class="layui-input-inline">
              <input type="password" name="password" v-model="password" placeholder="请输入密码" autocomplete="off" class="layui-input">
            </div>
            <span class="layui-form-mid error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">验证码</label>
          <ValidationProvider name="验证码" rules="required" v-slot="{ errors }">
            <div class="layui-input-inline">
              <input type="text" name="code" v-model="code" placeholder="请输入验证码" autocomplete="off" class="layui-input">
            </div>
            <div class="layui-form-mid layui-word-aux pic" v-html="svg" @click="getCaptcha"></div>
            <span class="layui-form-mid error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <button type="button" class="layui-btn">点击登录</button>
        <a class="forget-btn" href="http://www.layui.com">忘记密码？</a>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ValidationProvider, extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import zh from 'vee-validate/dist/locale/zh_CN.json'

for (const rule in rules) {
  extend(rule, {
    ...rules[rule],
    message: zh.messages[rule]
  })
}

export default {
  name: 'App',
  components: {
    ValidationProvider
  },
  data () {
    return {
      svg: '',
      username: '',
      password: '',
      code: ''
    }
  },
  methods: {
    getCaptcha () {
      axios.get('http://localhost:3000/getCaptcha').then(res => {
        if (res.data.code === 200) {
          this.svg = res.data.data
        }
      })
    }
  },
  mounted () {
    this.getCaptcha()
  }
}
</script>

<style lang="scss" scoped>
#app {
  background: #f2f2f2;
}

.layui-container {
  background: #ffff;
}

input {
  width: 200px;
}

.forget-btn {
  margin-left: 10px;
  &:hover {
    color: #009688;
  }
}

.pic {
  margin-left: 10px;
  position: relative;
  top: -15px;
}

.error {
  margin-left: 10px;
  color: red;
}
</style>
