<template>
  <div class="detail">
    <MenuTop />
    <div class="bg_detail">
      <img src="~/assets/img/bg-2.png" alt="" />
    </div>
    <div class="detail-main">
      <div class="detail-main-content">
        <div class="container_1 detail-page">
          <div class="detail-item-img col-xs-5">
            <img :src="urlImg" alt="" />
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
                    <div class="box-input-img" @click="increaseCount">
                      <img src="~/assets/img/plus.png" alt="" />
                    </div>
                    <div class="input">
                      <input type="number" v-model="count" />
                    </div>
                    <div class="box-input-img" @click="decreaseCount">
                      <img src="~/assets/img/minus.png" />
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
                    {{ getStatusButton(dataSkateboard.sold_out) }}
                  </button>
                  <button v-else class="disable_btn">Bought</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterPage />
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { helper } from '~/helpers/index'
export default {
  data() {
    return {
      dataSkateboard: {},
      count: 1,
      urlImg: '',
      discountCode: '',
      loading: false,
      statusBtn: true
    }
  },
  created() {
    this.getDetailItem(this.$route.params.id).then((res) => {
      this.dataSkateboard = res.data.data
      this.getUrlImg()
    })
  },
  watch: {
    count(newValue) {
      if (
        newValue > this.dataSkateboard.maximum_quantity ||
        newValue > this.dataSkateboard.quantity_in_stock ||
        newValue < 0
      ) {
        alert('err')
        this.count = this.dataSkateboard.maximum_quantity
      }
    },
    discountCode(newValue) {
      if (!this.checkDiscountCode(newValue)) this.$toast.error('Value not valid')
    }
  },
  methods: {
    ...mapActions('item', ['getDetailItem']),
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
    getUrlImg() {
      this.urlImg = require(`~/assets/img/${this.dataSkateboard.image}.png`)
    },
    getStatusButton(sold_out) {
      return sold_out ? 'Sold Out' : 'Pay order'
    },
    checkDiscountCode(newValue) {
      let regexLength = /^.{0,10}$/
      let regexSpecial = /[!@#\$%\^\&*\)\(+=._-]/g
      if (!regexSpecial.test(newValue) && regexLength.test(newValue)) return true
      else return false
    },
    async submit() {
      let isConnect = await helper.checkConnection()
      if (this.checkDiscountCode(this.discountCode)) {
        if (isConnect) {
          this.statusBtn = false 
          setTimeout(() => (this.statusBtn = true), 1000)
        } else this.$modal.show('login')
      } else this.$toast.error('Err')
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/style/detail.scss';
</style>
