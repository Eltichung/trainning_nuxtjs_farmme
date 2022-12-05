import api from '~/ultis/api'
export default {
  logoutUser({ commit, state }) {
    localStorage.removeItem('user')
    localStorage.removeItem('address')
    this.$axios.defaults.headers.common['Authorization'] = null
  },
  loginUser({ commit, state }, data) {
    localStorage.setItem('address', data.address)
    localStorage.setItem('user', JSON.stringify(data.user))
    this.$axios.defaults.headers.common['Authorization'] =
      'Bearer 256|WWSqAEjVvum4W3Cdy3tDKdH7YnC7fuG7TsQ6WdFP'
  }
}
