import api from '~/ultis/api'
import { helper } from '~/helpers/index'
export default {
  getItem({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(api.API_GET_ITEM, data)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          helper.processErrorAPI(error)
          reject(error)
        })
    })
  },
  getDetailItem({ commit, state }, id) {
    let query = `${api.API_GET_DETAIL_ITEM}/${id}`
    return new Promise((resolve, reject) => {
      this.$axios
        .get(query)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          helper.processErrorAPI(error)
          reject(error)
        })
    })
  },
  buyItem({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(api.API_GET_BUY_ITEM, data)
        .then((response) => {
          helper.processSuccessAPI()
          resolve(response)
        })
        .catch((error) => {
          helper.processErrorAPI(error)
          reject(error)
        })
    })
  }
}
