<template>
  <modal name="logout" :adaptive="true">
    <div class="modal">
      <h3>Confirm Logout</h3>
      <div class="btn between-xs">
        <button @click="logout">YES</button>
        <button>NO</button>
      </div>
      <img src="~/assets/img/icon2.png" alt="" />
    </div>
  </modal>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('auth', ['logoutUser']),
    logout() {
      this.logoutUser()
      this.$modal.hide('logout')
      this.$emit('logoutSuccess')
    }
  }
}
</script>
