<template>
  <div>
    <loader
      object="#ff9633"
      color1="#ffffff"
      color2="#17fd3d"
      size="5"
      speed="2"
      bg="#343a40"
      objectbg="#999793"
      opacity="80"
      name="circular"
      disableScrolling="true"
      v-if="loading"
    ></loader>
    <div class="main">
      <MenuTop />
      <div class="time">
        <h3>{{ dataEvents.name }}</h3>
        <div class="clock">
          <p>{{ time.day }}</p>
          <p>{{ time.hours }}</p>
        </div>
      </div>
      <div class="list-product container_1">
        <Tilt
          :options="options"
          v-for="item in dataItems"
          class="item"
          :parallax="true"
          :class="{ disable: item.quantity_in_stock == 0 }"
        >
          <div class="sale" v-if="item.best_sale">
            <img src="~/assets/img/best-seller.png" />
          </div>
          <div class="item-img">
            <img :src="getUrlImg(item.image)" alt="" />
          </div>
          <div class="item-price">
            <h3>{{ item.name }}</h3>
            <p>Stock availabel:{{ item.quantity_in_stock }}</p>
            <div class="item-price-btn">
              <div class="item-price-btn-text">
                <p class="green">$ {{ item.price }}</p>
                <p>$ {{ item.base_price }}</p>
              </div>
              <button :class="{ disable_btn: checkQuantity(item.quantity_in_stock) }">
                {{ getStatusButton(item.quantity_in_stock) }}
              </button>
            </div>
          </div>
        </Tilt>
      </div>
    </div>
    <div class="bg">
      <img src="~/assets/img/bg-1.png" alt="" />
    </div>
    <div class="gallery container_1 between-xs">
      <div class="gallery-text col-xs-6">
        <div class="box-content">
          <h3>EVENT PRE-ORDER</h3>
          <h2>SKATEBOARD NFT</h2>
          <p>
            Our Beloved Farmers! We are so excited to bring the Pre-Order NFT Skateboard Event to
            you.
          </p>
          <p>
            The holiday season is upon us, and you know what time it is: time to start enjoying the
            new feature - Amazing Race. Here are the hot items of 2022 that you should own the one
            you need and become the master farmer.
          </p>
          <p>
            It's a good thing you're reading this right now, because the hot deal NFT Skateboard and
            best seller package with good price will be sold out soon.
          </p>
        </div>
      </div>
      <div class="gallery-slider col-xs-6">
        <carousel
          :per-page="1"
          :autoplay="true"
          :paginationEnabled="false"
          :autoplayTimeout="1500"
          :loop="true"
          :navigationEnabled="true"
          navigationNextLabel=" "
          navigationPrevLabel=" "
        >
          <slide>
            <div>
              <img src="~/assets/img/slide_item.jpg" alt="" />
            </div>
          </slide>
          <slide>
            <div>
              <img src="~/assets/img/slide_item1.jpg" alt="" />
            </div>
          </slide>
          <slide>
            <div>
              <img src="~/assets/img/slide_item2.jpg" alt="" />
            </div>
          </slide>
        </carousel>
      </div>
    </div>
  </div>
</template>
<script>
import { helper } from '~/helpers/index'
import option from '~/ultis/option_vanilla'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      loading: true,
      dataItems: [],
      dataEvents: {},
      time: '',
      options: {}
    }
  },
  created() {
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
    localStorage.setItem('dataUser', JSON.stringify(data))
    this.getItem().then(async (res) => {
      this.dataItems = res.data.data.items
      this.dataEvents = res.data.data.event
      this.end_date = res.data.data.event.end_date
    })
    this.option = option
  },
  methods: {
    ...mapActions('item', ['getItem']),
    getUrlImg(urlItem) {
      return require(`~/assets/img/${urlItem}.png`)
    },
    getStatusButton(quantity_in_stock) {
      if (quantity_in_stock <= 0) return 'Sold Out'
      else return 'Buy now'
    },
    checkQuantity(quantity_in_stock) {
      return quantity_in_stock == 0 ? true : false
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 1000)
    setInterval(() => {
      this.time = helper.countDown(this.end_date)
    }, 1000)
  }
}
</script>
