<template>
  <div class="header-fix middle-xs container_1">
    <div class="logo">
      <img src="~/assets/img/logo_farm_me.png" alt="" />
    </div>
    <ul class="menu">
      <li>
        <NuxtLink to="/home">HOME</NuxtLink>
      </li>
      <li><a href="#">ORDER HISTORY</a></li>
      <li><a href="#">NFT MARKET</a></li>
    </ul>
    <div class="meta_mask">
      <img src="~/assets/img/logo.png" alt="" />
      <p @click="connect" v-if="isConnect" ref="isLogin">Connect Metamask</p>
      <p @click="logout" v-else>{{ Username }}</p>
    </div>
    <Teleport to="body">
      <LogoutForm @logoutSuccess="logoutSuccess" />
    </Teleport>
    <Teleport to="body">
      <RegisterForm @loginSuccess="loginSuccess" :address="address" />
    </Teleport>
    <Teleport to="body">
      <ConfirmLogin @loginSuccess="loginSuccess" :connectMetamask="connect" />
    </Teleport>
  </div>
</template>
<script>
import { helper } from '~/helpers/index'
export default {
  data() {
    return {
      isConnect: true,
      Username: '',
      address: ''
    }
  },
  created() {
    if (localStorage.getItem('address') != null && localStorage.getItem('user') != null) {
      this.isConnect = false
    }
    if (localStorage.getItem('user') != null) {
      this.Username = JSON.parse(localStorage.getItem('user')).user
    }
  },
  methods: {
    connect() {
      helper.getBalance().then((data) => {
        helper.checkAccount(data)
        let user = JSON.parse(localStorage.getItem('user'))
        this.address = data
        if (user != null) {
          this.loginSuccess()
        } else {
          this.$modal.hide('login')
          this.$modal.show('register')
        }
      })
    },
    loginSuccess() {
      this.isConnect = false
      let dataUser = JSON.parse(localStorage.getItem('user'))
      this.Username = dataUser.user
      this.$modal.hide('login')
    },
    logoutSuccess() {
      this.isConnect = true
    },
    logout() {
      this.$modal.show('logout')
    }
  }
}
</script>
