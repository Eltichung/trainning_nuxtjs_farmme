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
export default {
  props: ['connectMetamask'],
  methods: {
    login() {
      this.connectMetamask()
    }
  }
}
</script>
