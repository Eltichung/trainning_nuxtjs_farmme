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
  }
}
