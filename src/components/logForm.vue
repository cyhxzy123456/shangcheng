<template>
  <div>
    <div class="login-form">
      <div class="g-form">
        <div class="g-form-line">
          <span class="g-form-label">用户名：</span>
          <div class="g-form-input">
            <input type="text"
                   v-model="usernameModel" placeholder="请输入用户名">
          </div>
          <span class="g-form-error">{{userErrors.errorText}}</span>
        </div>
        <div class="g-form-line">
          <span class="g-form-label">密码：</span>
          <div class="g-form-input">
            <input type="password"
                   v-model="passwordModel" placeholder="请输入密码">
          </div>
          <span class="g-form-error">{{passErrors.errorText}}</span>
        </div>
        <div class="g-form-line">
          <div class="g-form-btn">
            <a class="button" @click="onLogin">登录</a>
            <span>{{errorText}}</span>
          </div>
        </div>
        <p></p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name : 'logForm',
  data () {
    return {
      usernameModel: '',
      passwordModel : '',
      errorText : ''
    }
  },
  methods : {
    onLogin () {
      if (!this.userErrors.status || !this.passErrors.status) {
        this.errorText = '部分验证不合格'
      } else { // 验证通过
        this.errorText = '';
        axios.post('api/users/login', {
          userName: this.usernameModel,
          userPwd: this.passwordModel
        })
          .then(
            function(res){
              this.$emit('hasLog',res.data)
            }
          ).catch(
            function(err){
              console.log(err)
            }
          )
      }
    }
  },
  computed : {
    userErrors () {
      let errorText , status
      if (/@/g.test(this.usernameModel )) {
        status = false ;
        errorText = '必须有@'
      } else {
        status = true;
        errorText = ''
      }
      if (!this.userFlag) {
        errorText = ''
        this.userFlag = true
      }
      return {
        status, errorText // 最后返回的一定是个对象，这个对象的名字就是userErrors
      }
    },

    passErrors () {
      let errorText , status
      if (!/^\w{1,6}$/g.test(this.passwordModel )) {
        status = false ;
        errorText = '1-6位'
      } else {
        status = true
        errorText = ''
      }
      // 第一次执行先不做判断
      if (!this.passFlag) {
        errorText = ''
        this.passFlag = true
      }
      return {
        status, errorText // 最后返回的一定是个对象，这个对象的名字就是userErrors
      }
    }
  }
}
</script>
<style scoped>
  .g-form-input{display: inline-block}
  .g-form-label{width:100px;display:inline-block}
  .button{display:block;background:blue;
    -webkit-border-radius:5px;
    -moz-border-radius:5px;
    border-radius:5px;width:100px;padding:5px 10px;margin:20px auto 0;color:#fff}
  .g-form-line{margin-bottom: 10px}
</style>
