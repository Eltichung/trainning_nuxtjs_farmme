<template>
  <modal name="register" :adaptive="true">
    <div class="modal">
      <div class="modal-top">
        <h3>Welcome to farmme</h3>
        <p>Register</p>
      </div>
      <ValidationObserver v-slot="{ handleSubmit, reset }">
        <form action="" @submit.prevent="handleSubmit(submit)">
          <div class="form-item">
            <ValidationProvider rules="required|min:6|max:30" v-slot="{ errors }">
              <label for="user" style="text-align: start">User</label>
              <input v-model="user" type="text" name="user" />
              <p class="err">{{ errors[0] }}</p>
            </ValidationProvider>
          </div>
          <div class="form-item">
            <ValidationProvider rules="required|min:6" v-slot="{ errors }">
              <label for="password" style="text-align: start">Password</label>
              <input v-model="password" type="password" name="password" />
              <p class="err">{{ errors[0] }}</p>
            </ValidationProvider>
          </div>
          <div class="form-item">
            <button>Register</button>
          </div>
        </form>
      </ValidationObserver>
      <div class="modal-icon">
        <img src="~/assets/img/model_icon.png" alt="" />
      </div>
    </div>
  </modal>
</template>
<script>
import { helper } from '~/helpers/index'
export default {
  props: ['address'],
  data() {
    return {
      user: '',
      password: ''
    }
  },
  methods: {
    submit() {
      let user = {
        user: this.user,
        password: helper.decodeSha1(this.password),
        address: this.address
      }
      //add user
      let dataUser = JSON.parse(localStorage.getItem('dataUser'))
      dataUser.push(user)
      localStorage.setItem('dataUser', JSON.stringify(dataUser))
      //save user localStorage
      this.$modal.hide('register')
      user.password = helper.decodeSha1(this.password)
      localStorage.setItem('address', this.address)
      localStorage.setItem('user', JSON.stringify(user))
      this.user = ''
      this.password = ''
      this.$emit('loginSuccess')
    }
  }
}
</script>
