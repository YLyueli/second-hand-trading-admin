<template>
  <div class="login-container">
    <div class="login-wrap">
      <div class="title">校园二手交易平台管理系统</div>
      <div class="user">
        <label class="tip"
               for="account">账号</label>
        <input type="text"
               id="account"
               v-model="account"
               placeholder="请输入账号">
      </div>
      <div class="pwd">
        <label class="tip"
               for="password">密码</label>
        <input type="password"
               id="password"
               v-model="password"
               placeholder="请输入密码">
      </div>
      <div class="btn"
           @click="login">登录</div>
    </div>
  </div>
</template>
<script>
import { user } from "../../axios/api.js";
import { Message } from 'element-ui';
export default ({
  data () {
    return {
      account: '19855109897',
      password: 'yyllyyll'
    }
  },
  methods: {
    login () {
      if (!this.account)
      {
        Message.warning('账号不能为空')
        return
      }
      if (!this.password)
      {
        Message.warning('密码不能为空')
        return
      }
      user.login({
        user_id: this.account,
        password: this.password
      }).then(res => {
        if (res.status === 0)
        {
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('user_name', res.data.userInfo.user_name)
          localStorage.setItem('account', this.account)
          Message.success({
            duration: 1000,
            message: '登录成功'
          })
          setTimeout(() => {
            this.$router.push('/')
          }, 1000);
        }
      })
    }
  }
})
</script>
<style scoped lang="scss">
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url("../../assets/login_bg.jpeg") no-repeat 0 0;
  background-size: cover;
}
.login-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 460px;
  height: 360px;
  opacity: 0.6;
  background-color: #fff;
  border-radius: 18px;
  font-size: 16px;
  .title {
    font-weight: 700;
    padding: 30px 0 20px 0;
    font-size: 24px;
  }
  .user,
  .pwd {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin: 0 auto;
  }
  label {
    margin: 10px 0;
  }
  input {
    width: 260px;
    height: 36px;
    padding-left: 20px;
    border-radius: 6px;
  }
  .btn {
    margin-top: 30px;
    width: 290px;
    height: 40px;
    line-height: 40px;
    color: #fff;
    border-radius: 16px;
    background-color: #3a595b;
    cursor: pointer;
  }
}
</style>