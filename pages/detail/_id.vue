<template>
  <div class="detail">
    <LoadingScreen v-if="loading" />
    <div class="bg_detail">
      <img src="~/assets/img/bg-2.png" alt="" />
    </div>
    <div class="detail-main">
      <div class="detail-main-content">
        <div class="container_1 detail-page">
          <div class="detail-item-img col-xs-5">
            <img :src="`/img/${dataSkateboard.image}.png`" alt="" v-if="!loading" />
          </div>
          <div class="detail-item-text col-xs-7">
            <div class="box-main">
              <h3>RANDOM FM</h3>
              <h4>{{ dataSkateboard.description }}</h4>
              <div class="box between-xs">
                <div class="box-item col-xs-6">
                  <p>Type:</p>
                  <p>{{ dataSkateboard.type }}</p>
                </div>
                <div class="box-item col-xs-6">
                  <p>Color:</p>
                  <p>{{ dataSkateboard.color }}</p>
                </div>
                <div class="box-item col-xs-6">
                  <p>Speed move:</p>
                  <p>{{ dataSkateboard.speed_move }}</p>
                </div>
                <div class="box-item col-xs-6">
                  <p>Energy (s):</p>
                  <p>{{ dataSkateboard.energy }}</p>
                </div>
                <div class="box-item col-xs-6">
                  <p>Acceleration (s):</p>
                  <p>{{ dataSkateboard.acceleration }}</p>
                </div>
                <div class="box-item col-xs-6">
                  <div class="box-item-more">
                    <p>Energy</p>
                    <p>Regeneration(m):</p>
                  </div>
                  <p>{{ dataSkateboard.energy_regeneration }}</p>
                </div>
              </div>
            </div>
            <div class="box-main">
              <div class="box v2 between-xs top-xs">
                <div class="box-item center-xs">
                  <p>Total pool</p>
                  <p>{{ getTotalPoll(dataSkateboard) }}</p>
                </div>
                <div class="box-item center-xs">
                  <p>Price per item</p>
                  <p>{{ dataSkateboard.price }} USDT</p>
                </div>
                <div class="box-item center-xs">
                  <p>Amount</p>
                  <div class="box-input">
                    <div class="box-input-img" @click="decreaseCount">
                      <img src="~/assets/img/minus.png" />
                    </div>
                    <div class="input">
                      <input type="number" v-model="count" />
                    </div>
                    <div class="box-input-img" @click="increaseCount">
                      <img src="~/assets/img/plus.png" alt="" />
                    </div>
                  </div>
                </div>
                <div class="box-item center-xs">
                  <p>Discount Code</p>
                  <input type="text" v-model="discountCode" />
                </div>
                <div class="box-item center-xs">
                  <p>Total pay</p>
                  <p class="orange">{{ getTotalPay(dataSkateboard.price) }}</p>
                  <button
                    :class="{ disable_btn: dataSkateboard.sold_out }"
                    @click="submit"
                    v-if="statusBtn"
                  >
                    {{ dataSkateboard.sold_out ? 'Sold Out' : 'Pay order' }}
                  </button>
                  <button v-else class="disable_btn">Bought</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { helper } from '~/helpers/index'
export default {
  layout: 'baseLayout',
  data() {
    return {
      dataSkateboard: {},
      count: 1,
      discountCode: '',
      statusBtn: true,
      loading: true
    }
  },
  watch: {
    count(newValue) {
      if (
        newValue > this.dataSkateboard.maximum_quantity ||
        newValue > this.dataSkateboard.quantity_in_stock
      ) {
        alert('err')
        this.count = this.dataSkateboard.maximum_quantity
      } else if (newValue <= 0) {
        alert('err')
        this.count = 1
      }
    }
  },
  created() {
    this.getdata()
    this.$axios.defaults.headers.common['Authorization'] =
      'Bearer 256|WWSqAEjVvum4W3Cdy3tDKdH7YnC7fuG7TsQ6WdFP'
  },
  methods: {
    ...mapActions('item', ['getDetailItem', 'buyItem']),
    getTotalPoll(data) {
      return `${data.quantity_in_stock}/${data.quantity}`
    },
    getTotalPay(price) {
      return `${(this.count * price).toFixed(2)} USDT`
    },
    increaseCount() {
      if (this.count < this.dataSkateboard.maximum_quantity) this.count++
    },
    decreaseCount() {
      if (this.count > 1) this.count--
    },
    getdata() {
      this.getDetailItem(this.$route.params.id).then((res) => {
        this.dataSkateboard = res.data.data
        this.loading = false
      })
    },
    async submit() {
      let regexSpecial = /^[a-zA-Z0-9]*$/
      let isConnect = await helper.checkConnection()
      this.discountCode = this.discountCode.trim()
      if (regexSpecial.test(this.discountCode) && this.discountCode.length < 10) {
        if (isConnect && localStorage.getItem('address') != null) {
          this.statusBtn = false
          let dataItime = {
            item_id: this.dataSkateboard.id,
            quantity: this.count,
            coupon_code: this.discountCode
          }
          setTimeout(() => (this.statusBtn = true), 1000)
          this.loading = true
          this.buyItem(dataItime)
            .then((res) => {
              this.getdata()
            })
            .catch(() => (this.loading = false))
        } else {
          this.$modal.show('login')
        }
      } else {
        this.$toast.error('Err')
      }
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/style/detail.scss';
</style>
