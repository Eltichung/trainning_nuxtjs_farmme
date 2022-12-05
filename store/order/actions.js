import api from '~/ultis/api'
import { helper } from '~/helpers/index'
export default {
  getOrderHistories({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`${api.API_GET_ORDER_HISTORIES}?page=${data}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          helper.processErrorAPI(error)
          reject(error)
        })
    })
  },
  cancelOrder({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(api.API_CANCEL_ORDER, data)
        .then((response) => {
          helper.processSuccessAPI()
          resolve(response)
        })
        .catch((error) => {
          helper.processErrorAPI(error)
          reject(error)
        })
    })
  },
  completeOrder({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(api.API_GET_COMPLETE, data)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          helper.processErrorAPI(error)
          reject(error)
        })
    })
  }
}
