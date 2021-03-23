<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li class="layui-this">登入</li>
          <li>
            <router-link to="/reg">注册</router-link>
          </li>
        </ul>
        <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
          <div class="layui-tab-item layui-show">
            <div class="layui-form layui-form-pane">
              <form method="post" @submit="_login">
                <div class="layui-form-item">
                  <label for="L_email" class="layui-form-label">用户名</label>
                  <ValidationProvider rules="required|email" name="email" v-slot="{errors}">
                    <div class="layui-input-inline">
                      <input type="text" id="L_email" v-model="username" placeholder="请输入用户名" autocomplete="off"
                        class="layui-input">
                    </div>
                    <div class="layui-form-mid error">{{ errors[0] }}</div>
                  </ValidationProvider>
                </div>
                <div class="layui-form-item">
                  <label for="L_pass" class="layui-form-label">密码</label>
                  <ValidationProvider rules="required|min:6" name="password" v-slot="{errors}">
                    <div class="layui-input-inline">
                      <input type="password" id="L_pass" v-model="password" placeholder="请输入密码" autocomplete="off"
                        class="layui-input">
                    </div>
                    <div class="layui-form-mid error">{{ errors[0] }}</div>
                  </ValidationProvider>
                </div>
                <div class="layui-form-item">
                  <label for="L_vercode" class="layui-form-label">验证码</label>
                  <ValidationProvider rules="required|length:4" name="code" v-slot="{errors}">
                    <div class="layui-input-inline">
                      <input type="text" id="L_vercode" v-model="code" placeholder="请输入验证码" autocomplete="off"
                        class="layui-input">
                    </div>
                    <div class="code layui-form-mid">
                      <span style="color: #c00;" @click="_getCode" v-html="svg"></span>
                    </div>
                    <div class="layui-form-mid error">{{ errors[0] }}</div>
                  </ValidationProvider>
                </div>
                <div class="layui-form-item">
                  <button class="layui-btn" lay-filter="*" lay-submit>立即登录</button>
                  <span style="padding-left:20px;">
                    <router-link to="/forget">忘记密码？</router-link>
                  </span>
                </div>
                <div class="layui-form-item fly-form-app">
                  <span>或者使用社交账号登入</span>
                  <a href="" onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})" class="iconfont icon-qq"
                    title="QQ登入"></a>
                  <a href="" onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})" class="iconfont icon-weibo"
                    title="微博登入"></a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCode, login } from '../api/login'
import { ValidationProvider } from 'vee-validate'
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'Login',
  components: {
    ValidationProvider
  },
  data () {
    return {
      username: '',
      password: '',
      code: '',
      svg: ''
    }
  },
  methods: {
    _getCode () {
      const sid = this.$store.state.sid
      getCode(sid).then(res => {
        if (res.code === 200) {
          this.svg = res.data
        }
      })
    },
    _login (e) {
      e.preventDefault()
      login({
        username: this.username,
        password: this.password,
        code: this.code,
        sid: this.$store.state.sid
      }).then(res => {
        if (res.code === 200) {
          console.log('登录成功')
        }
      })
    }
  },
  mounted () {
    let sid = ''
    if (localStorage.getItem('sid')) {
      sid = localStorage.getItem('sid')
    } else {
      sid = uuidv4()
      localStorage.setItem('sid', sid)
    }
    this.$store.commit('setSid', sid)
    this._getCode()
  }
}
</script>

<style lang="scss" scoped>
.error {
  color: red;
}
.code {
  position: relative;
  top: -15px;
}
</style>
