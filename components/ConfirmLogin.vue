<template>
  <modal name="login" :adaptive="true">
    <div class="modal">
      <h3>Please Connect Wallet!</h3>
      <div class="btn between-xs">
        <button @click="login">Login</button>
      </div>
      <img src="~/assets/img/icon2.png" alt="" />
    </div>
  </modal>
</template>
<script>
import { helper } from '~/helpers/index'
export default {
  methods: {
    login() {
      helper.getBalance().then((data) => {
        let isUser = false
        localStorage.setItem('address', data)
        let dataUser = JSON.parse(localStorage.getItem('dataUser'))
        dataUser.forEach((item) => {
          if (item.address == data) {
            localStorage.setItem('user', JSON.stringify(item))
            this.$emit('loginSuccess')
            isUser = true
            return
          }
        })
        if (!isUser) this.$modal.show('register')
      })
    }
  }
}
</script>
