import api from '~/ultis/api'
export default {
  getItem({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(api.API_GET_ITEM, data)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
