<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li>
            <router-link to="/login">登入</router-link>
          </li>
          <li class="layui-this">找回密码
            <!--重置密码-->
          </li>
        </ul>
        <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
          <ValidationObserver ref="observer" v-slot="{ validate }">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <form method="post" @submit.prevent="validate().then(submit)">
                  <div class="layui-form-item">
                    <label for="L_email" class="layui-form-label">用户名</label>
                    <ValidationProvider rules="required|email" name="email" v-slot="{ errors }">
                      <div class="layui-input-inline">
                        <input type="text" id="L_email" v-model="username" placeholder="请输入用户名" autocomplete="off" class="layui-input">
                      </div>
                      <div class="layui-form-mid error">{{ errors[0] }}</div>
                    </ValidationProvider>
                  </div>
                  <div class="layui-form-item">
                    <label for="L_vercode" class="layui-form-label">验证码</label>
                    <ValidationProvider rules="required|length:4" name="code" v-slot="{ errors }">
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
                    <button class="layui-btn" lay-submit>提交</button>
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
import { getCode, forget } from '../api/login'
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
  name: 'Forget',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      username: '',
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
      forget({
        username: this.username,
        code: this.code
      }).then(res => {
        if (res.code === 200) {
          alert('邮件发送成功！')
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
