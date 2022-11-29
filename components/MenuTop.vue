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
      <p @click="connect" v-if="isConnect">Connect Metamask</p>
      <p @click="logout" v-else>{{ Username }}</p>
    </div>
    <Teleport to="body">
      <LogoutForm @logoutSuccess="logoutSuccess" />
    </Teleport>
    <Teleport to="body">
      <RegisterForm @loginSuccess="loginSuccess" />
    </Teleport>
  </div>
</template>
<script>
import { helper } from '~/helpers/index'
export default {
  data() {
    return {
      isConnect: true,
      Username: ''
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
        let isUser = false
        localStorage.setItem('address', data)
        let dataUser = JSON.parse(localStorage.getItem('dataUser'))
        dataUser.forEach((item) => {
          if (item.address == data) {
            localStorage.setItem('user', JSON.stringify(item))
            this.loginSuccess()
            isUser = true
            return
          }
        })
        if (!isUser) this.$modal.show('register')
      })
    },
    loginSuccess() {
      this.isConnect = false
      let dataUser = JSON.parse(localStorage.getItem('user'))
      this.Username = dataUser.user
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
