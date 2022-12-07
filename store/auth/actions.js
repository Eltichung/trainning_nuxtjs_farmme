import api from '~/ultis/api'
import { utils } from 'ethers'
import { helper } from '~/helpers/index'
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
  },
  addNetWork({ commit, state }, netWork) {
    ethereum
      .request({
        method: 'wallet_addEthereumChain',
        params: [netWork]
      })
      .then(() => {
        commit('SET_NETWORK', netWork)
        console.log(state.currentNetwork)
      })
      .catch((err) => helper.processErrorAPI(err))
  },
  switchNetWork({ commit, state, dispatch }, netWork) {
    ethereum
      .request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: netWork.chainId }]
      })
      .then(() => helper.processSuccessAPI())
      .catch((switchError) => {
        if (switchError.code === 4902) {
          dispatch('addNetWork', netWork)
        }
      })
  },
  sendTransaction({ commit, state, dispatch }) {
    let transactionParam = {
      to: '0x1Bb63ca507d7C4a0407879112aed765521207343',
      from: '0x26ab9D60a13750b7C35e006679b85a5375900f0c',
      value: (11 * 1e18).toString(16)
    };
    console.log(transactionParam)
    ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [transactionParam]
      })
      .then((txHash) => console.log(txHash))
      .catch((error) => console.error(error));
  }
}
