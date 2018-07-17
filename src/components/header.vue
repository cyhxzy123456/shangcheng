<template>
  <div>
    <div class="header">
      <symbol id="icon-cart" viewBox="0 0 38 32">
        <title>cart</title>
        <path class="path1"></path>
        <path class="path2"></path>
        <path class="path3"></path>
        <path class="path4"></path>
      </symbol>
      <div class="navbar">
        <div class="navbar-left-container">
          <a href="/">
            <img class="navbar-brand-logo" src="static/logo.png"></a>
        </div>
        <div class="navbar-right-container" style="display: flex;">
          <div class="navbar-menu-container">
            <!--<a href="/" class="navbar-link">我的账户</a>-->
            <span class="navbar-link"></span>
            <a href="javascript:void(0)">{{userName}}</a>
            <a href="javascript:void(0)" class="navbar-link" @click="showLogDialog" :v-show="userName==''">登录</a>
            <a href="javascript:void(0)" class="navbar-link" :v-show="!userName==''">Logout</a>
            <a href="javascript:void(0)" class="navbar-link">注册</a>

            <div class="navbar-cart-container">
              <span class="navbar-cart-count"></span>
              <a class="navbar-link navbar-cart-link" href="/#/cart">
                <svg class="navbar-cart-logo">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Dialog :isShow="showLog" @close ="closeMyself('showLog')">
      <log-form @hasLog="logSuccess"></log-form>
    </Dialog>
  </div>
</template>
<script>
import Dialog from './dialog.vue'
import LogForm from './logForm.vue'
export default {
  components: {Dialog, LogForm},
  name: 'NavHeader',
  data () {
    return {
      showLog: false,
      userName: ''
    }
  },
  methods: {
    showLogDialog () {
      this.showLog = true
    },
    closeMyself (attr) {
      this[attr] = false
    },
    logSuccess (data) {
      this.showLog = false
      alert('登录成功')
      // console.log(data)
      this.userName = data
    }
  }
}
</script>
<style scoped>
  .header{background:#fff}
  .navbar {
    display: flex;
    justify-content: space-between;
    align-content: center;
    width: 100%;
    height: 70px;
    max-width: 1280px;
    margin: 0 auto;
    padding: 5px 20px 10px 20px;
  }
  .navbar-left-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: -20px;
  }
  .navbar-left-container img{height:70px}
  .navbar-right-container {
    display: none;
    justify-content: flex-start;
    align-items: center;
  }
  .navbar-menu-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-top: 10px;
  }
  .navbar-menu-container a{display:inline-block;margin:0 10px}
  .navbar-cart-logo {
    width: 25px;
    height: 25px;
    transform: scaleX(-1);
    background:url("/static/car-bg.png") no-repeat;
    background-size:contain;
  }
  .header a, .footer a {
    color: #666;
    text-decoration: none;
  }

</style>
