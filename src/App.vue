<template>
  <div id="app">
    <div class="layui-container">
      <form class="layui-form layui-form-pane">
        <div class="layui-form-item">
          <label class="layui-form-label">手机/邮箱</label>
          <div class="layui-input-block">
            <input type="text" name="" placeholder="请输入手机/邮箱" autocomplete="off" class="layui-input">
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">密码</label>
          <div class="layui-input-block">
            <input type="password" name="" placeholder="请输入密码" autocomplete="off" class="layui-input">
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">验证码</label>
          <div class="layui-input-block">
            <input type="text" name="" placeholder="请输入验证码" autocomplete="off" class="layui-input">
          </div>
        </div>
        <button type="button" class="layui-btn">点击登录</button>
        <a class="forget-btn" href="http://www.layui.com">忘记密码？</a>
      </form>
    </div>
  </div>
</template>

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
</style>
