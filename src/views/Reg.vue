<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li>
            <router-link to="/login">登入</router-link>
          </li>
          <li class="layui-this">注册</li>
        </ul>
        <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
          <ValidationObserver ref="observer" v-slot="{ validate }">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <form method="post" @submit.prevent="validate().then(submit)">
                  <div class="layui-form-item">
                    <label for="L_email" class="layui-form-label">用户名</label>
                    <ValidationProvider rules="required|email" name="username" v-slot="{ errors }">
                      <div class="layui-input-inline">
                        <input type="text" id="L_email" v-model="username" placeholder="请输入用户名" autocomplete="off" class="layui-input">
                      </div>
                      <div class="layui-form-mid layui-word-aux">将会成为您唯一的登入名</div>
                      <div class="layui-form-mid error">{{ errors[0] }}</div>
                    </ValidationProvider>
                  </div>
                  <div class="layui-form-item">
                    <label for="L_nickname" class="layui-form-label">昵称</label>
                    <ValidationProvider rules="required|min:4" name="name" v-slot="{ errors }">
                      <div class="layui-input-inline">
                        <input type="text" id="L_nickname" v-model="name" placeholder="请输入昵称" autocomplete="off" class="layui-input">
                      </div>
                      <div class="layui-form-mid error">{{ errors[0] }}</div>
                    </ValidationProvider>
                  </div>
                  <div class="layui-form-item">
                    <label for="L_pass" class="layui-form-label">密码</label>
                    <ValidationProvider rules="required|min:6|max:16|confirmed:confirmation" name="password" v-slot="{ errors }">
                      <div class="layui-input-inline">
                        <input type="password" id="L_pass" v-model="password" placeholder="请输入密码" autocomplete="off" class="layui-input">
                      </div>
                      <div class="layui-form-mid layui-word-aux">6到16个字符</div>
                      <div class="layui-form-mid error">{{ errors[0] }}</div>
                    </ValidationProvider>
                  </div>
                  <div class="layui-form-item">
                    <label for="L_repass" class="layui-form-label">确认密码</label>
                    <ValidationProvider vid="confirmation" v-slot="{ errors }">
                      <div class="layui-input-inline">
                        <input type="password" id="L_repass" v-model="repassword" placeholder="请再次输入密码" autocomplete="off" class="layui-input">
                      </div>
                      <div class="layui-form-mid error">{{ errors[0] }}</div>
                    </ValidationProvider>
                  </div>
                  <div class="layui-form-item">
                    <label for="L_vercode" class="layui-form-label">验证码</label>
                    <ValidationProvider rules="required|length:4" name="code" ref="codefield" v-slot="{ errors }">
                      <div class="layui-input-inline">
                        <input type="text" id="L_vercode" v-model="code" placeholder="请输入验证码" autocomplete="off" class="layui-input">
                      </div>
                      <div class="code layui-form-mid">
                        <span style="color: #c00;" @click="_getCode" v-html="svg"></span>
                      </div>
                      <div class="layui-form-mid error">{{ errors[0] }}</div>
                    </ValidationProvider>
                  </div>
                  <div class="layui-form-item">
                    <button class="layui-btn" lay-filter="*" lay-submit>立即注册</button>
                  </div>
                  <div class="layui-form-item fly-form-app">
                    <span>或者直接使用社交账号快捷注册</span>
                    <a href="" onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})" class="iconfont icon-qq" title="QQ登入"></a>
                    <a href="" onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})" class="iconfont icon-weibo" title="微博登入"></a>
                  </div>
                </form>
              </div>
            </div>
          </ValidationObserver>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { getCode, reg } from '../api/login'
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
  name: 'Reg',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      username: '',
      name: '',
      password: '',
      repassword: '',
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
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      reg({
        username: this.username,
        name: this.name,
        password: this.password,
        code: this.code,
        sid: this.$store.state.sid
      }).then(res => {
        if (res.code === 200) {
          this.username = ''
          this.name = ''
          this.password = ''
          this.repassword = ''
          this.code = ''
          requestAnimationFrame(() => {
            this.$refs.observer.reset()
          })
          this.$alert('注册成功')
          setTimeout(() => {
            this.$router.push('/login')
          }, 1000)
        } else {
          this.$refs.observer.setErrors(res.msg)
        }
      })
    }
  },
  mounted () {
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
