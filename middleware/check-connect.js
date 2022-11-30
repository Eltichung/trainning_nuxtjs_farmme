import { helper } from '~/helpers/index'
export default async function () {
  let isConnect = await helper.checkConnection()
  if (!isConnect) {
    localStorage.removeItem('user')
    localStorage.removeItem('address')
  }
}
