import Vue from 'vue'
import { ValidationProvider, extend, ValidationObserver } from 'vee-validate'
import { required, email, confirmed, min, min_value, max } from 'vee-validate/dist/rules'
import { localize } from 'vee-validate'
import en from 'vee-validate/dist/locale/en.json'
import ar from 'vee-validate/dist/locale/ar.json'
localize({
  en,
  ar
})
extend('required', required)
extend('email', email)
extend('min', min)
extend('max', max)
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
