export default function ({ $axios, app, redirect }) {
  $axios.create({
    baseURL: process.env.BASE_URL
  })
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400 || code === 500) {
      app.$toast.error(error.response.data && error.response.data.message)
    }
    if (code === 401) {
      app.store.dispatch('login/logoutUser')
      app.router.replace('/home')
    }
  })
}
