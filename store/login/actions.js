import api from '~/ultis/api'
export default {
  logout({ commit, state }) {
    localStorage.removeItem('user')
    localStorage.removeItem('address')
    this.$axios.defaults.headers.common['Authorization'] = null
  },
  login({ commit, state }) {
    this.$axios.defaults.headers.common['Authorization'] =
      'Bearer 256|WWSqAEjVvum4W3Cdy3tDKdH7YnC7fuG7TsQ6WdFP'
  }
}
