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
        address: localStorage.getItem('address')
      }
      //add user
      let dataUser = JSON.parse(localStorage.getItem('dataUser'))
      dataUser.push(user)
      localStorage.setItem('dataUser', JSON.stringify(dataUser))
      //save user localStorage
      this.$modal.hide('register')
      user.password = helper.decodeSha1(this.password)
      localStorage.setItem('user', JSON.stringify(user))
      ;(this.user = ''), (this.password = ''), this.$emit('loginSuccess')
    }
  }
}
</script>
<style lang="scss">
.modal {
  width: 600px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: start;
  padding: 20px;
  max-width: 90%;
  position: relative;
  &-icon {
    position: absolute;
    top: 10px;
    right: 0;
    img {
      height: 120px;
      object-fit: contain;
    }
  }
  &-top {
    h3 {
      margin-top: 4vh;
      font-family: 'SVN-ARCO Typography';
      color: #f1af1f;
      font-weight: 400;
      font-size: 200%;
      font-style: normal;
    }
    p {
      font-family: 'Quicksand';
      color: #794821;
      font-weight: 700;
      font-size: 150%;
      margin-bottom: 4.8vh;
    }
  }
  .form-item {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    label {
      display: block;
      font-family: 'Quicksand';
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
      color: #794821;
      margin-bottom: 10px;
    }
    input {
      background: hsla(0, 0%, 100%, 0.1);
      border-radius: 4px;
      height: 40px;
      border: none;
      color: #794821;
      padding-left: 15px;
      border: 1px solid rgba(121, 72, 33, 0.5);
      outline: none;
      width: 100%;
    }
    button {
      margin: 0 auto;
      margin-top: 20px;
      height: 50px;
      color: #794821;
      background: #f1af1f;
      border-radius: 4px;
      font-family: 'SVN-ARCO Typography';
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 20px;
      padding-bottom: 4px;
      border: none;
      cursor: pointer;
      transition: all 0.3s;
      width: 170px;
      border-radius: 30px;
    }
  }
}
.vm--modal {
  // max-width: 80% !important;
  // margin: 0 auto !important;
  background-color: unset !important;
  width: auto !important;
  height: auto !important;
  box-shadow: unset !important;
}
.vm--container {
  background-color: rgba(1, 1, 1, 0.85) !important;
  z-index: 9999999999999 !important;
}
@media screen and (max-width: 650px) {
  .modal {
    margin: 0 auto;
  }
}
@media screen and (max-width: 450px) {
  .modal-icon {
    top: 60px;
    img {
      height: 80px;
    }
  }
}
</style>
