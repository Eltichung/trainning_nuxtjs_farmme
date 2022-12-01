export default function ({ $axios, app, redirect }) {
  $axios.defaults.headers.common['Authorization'] =
    'Bearer 256|WWSqAEjVvum4W3Cdy3tDKdH7YnC7fuG7TsQ6WdFP'
  $axios.create({
    baseURL: process.env.BASE_URL
  })
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400 || code === 401 || code === 500) {
      app.$toast.error(error.response.data && error.response.data.message)
    }
  })
}
