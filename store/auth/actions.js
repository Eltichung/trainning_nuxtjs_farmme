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
      'Bearer 270|GM6fKcD4KXxQYaY4dbEo3lLVtWGyjHCO4cEv0c8n'
  }
}
