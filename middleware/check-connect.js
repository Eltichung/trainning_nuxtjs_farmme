import { helper } from '~/helpers/index'
export default async function () {
  //fake data
  if (localStorage.getItem('dataUser') == null) {
    let data = [
      {
        user: 'user1',
        password: helper.decodeSha1('123456'),
        address: '0x26ab9D60a13750b7C35e006679b85a5375900f0c'
      },
      {
        user: 'user2',
        password: helper.decodeSha1('123456'),
        address: '0x1Bb63ca507d7C4a0407879112aed765521207343'
      }
    ]
    await localStorage.setItem('dataUser', JSON.stringify(data))
  }
  let addressLocal
  if (localStorage.getItem('address') !== null) {
    addressLocal = localStorage.getItem('address').toLowerCase()
  }
  let address = await helper.checkConnection()
  if (!address.length || address[0] != addressLocal) {
    localStorage.removeItem('user')
    localStorage.removeItem('address')
  }
}
