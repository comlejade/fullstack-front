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
          <div class="layui-tab-item layui-show">
            <!-- 重置密码 -->
            <!--
          <div class="fly-msg">{{d.username}}，请重置您的密码</div>
          <div class="layui-form layui-form-pane"  style="margin-top: 30px;">
            <form action="/user/repass" method="post">
              <div class="layui-form-item">
                <label for="L_pass" class="layui-form-label">密码</label>
                <div class="layui-input-inline">
                  <input type="password" id="L_pass" name="pass" required lay-verify="required" autocomplete="off" class="layui-input">
                </div>
                <div class="layui-form-mid layui-word-aux">6到16个字符</div>
              </div>
              <div class="layui-form-item">
                <label for="L_repass" class="layui-form-label">确认密码</label>
                <div class="layui-input-inline">
                  <input type="password" id="L_repass" name="repass" required lay-verify="required" autocomplete="off" class="layui-input">
                </div>
              </div>
              <div class="layui-form-item">
                <label for="L_vercode" class="layui-form-label">人类验证</label>
                <div class="layui-input-inline">
                  <input type="text" id="L_vercode" name="vercode" required lay-verify="required" placeholder="请回答后面的问题" autocomplete="off" class="layui-input">
                </div>
                <div class="layui-form-mid">
                  <span style="color: #c00;">{{d.vercode}}</span>
                </div>
              </div>
              <div class="layui-form-item">
                <input type="hidden" name="username" value="{{d.username}}">
                <input type="hidden" name="email" value="{{d.email}}">
                <button class="layui-btn" alert="1" lay-filter="*" lay-submit>提交</button>
              </div>
            </form>
          </div>

          <div class="fly-error">该重置密码链接已失效，请重新校验您的信息</div>
          <div class="fly-error">非法链接，请重新校验您的信息</div>
          -->

            <div class="layui-form layui-form-pane">
              <form method="post">
                <div class="layui-form-item">
                  <label for="L_email" class="layui-form-label">用户名</label>
                  <ValidationProvider rules="required|email" v-slot="{ errors }">
                    <div class="layui-input-inline">
                      <input type="text" id="L_email" v-model="username" name="用户名" placeholder="请输入用户名" autocomplete="off" class="layui-input">
                    </div>
                    <div class="layui-form-mid error">{{ errors[0] }}</div>
                  </ValidationProvider>
                </div>
                <div class="layui-form-item">
                  <label for="L_vercode" class="layui-form-label">验证码</label>
                  <ValidationProvider rules="required|length:4" v-slot="{ errors }">
                    <div class="layui-input-inline">
                      <input type="text" id="L_vercode" v-model="vercode" name="验证码" placeholder="请输入验证码" autocomplete="off" class="layui-input">
                    </div>
                    <div class="code layui-form-mid">
                      <span style="color: #c00;" @click="_getCode" v-html="svg"></span>
                    </div>
                    <div class="layui-form-mid error">{{ errors[0] }}</div>
                  </ValidationProvider>
                </div>
                <div class="layui-form-item">
                  <button class="layui-btn" type="button" @click="submit">提交</button>
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
import { getCode, forget } from '../api/login'
import { ValidationProvider, extend } from 'vee-validate'
import { required, email, length } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: '请输入{_field_}'
})

extend('email', {
  ...email,
  message: '请输入正确的邮箱格式'
})

extend('length', {
  ...length,
  message: '{_field_}要求长度位{length}'
})

export default {
  name: 'Forget',
  components: {
    ValidationProvider
  },
  data () {
    return {
      username: '',
      vercode: '',
      svg: ''
    }
  },
  methods: {
    _getCode () {
      getCode().then(res => {
        if (res.code === 200) {
          this.svg = res.data
        }
      })
    },
    submit () {
      forget({
        username: this.username,
        code: this.vercode
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
