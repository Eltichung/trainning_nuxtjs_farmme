<template>
  <div>
    <div class="main">
      <LoadingScreen v-if="loading" />
      <div class="time">
        <h3>{{ dataEvents.name }}</h3>
        <div class="clock">
          <p v-html="time"></p>
        </div>
      </div>
      <div class="list-product container_1">
        <Tilt
          :options="{ max: 18, speed: 400 }"
          v-for="item in dataItems"
          class="item"
          :parallax="true"
          :class="{ disable: !item.quantity_in_stock }"
        >
          <div class="sale" v-if="item.best_sale">
            <img src="~/assets/img/best-seller.png" />
          </div>
          <div class="item-img">
            <img :src="`/img/${item.image}.png`" alt="" />
          </div>
          <div class="item-price">
            <h3>{{ item.name }}</h3>
            <p>Stock availabel:{{ item.quantity_in_stock }}</p>
            <div class="item-price-btn">
              <div class="item-price-btn-text" :class="{ disable_price: !item.quantity_in_stock }">
                <p class="green">$ {{ item.price }}</p>
                <p>{{ item.quantity_in_stock ? `$ ${item.base_price}` : 'Sold Out' }}</p>
              </div>
              <NuxtLink
                class="btn_buy"
                :class="{ disable_btn: !item.quantity_in_stock }"
                :to="`/detail/${item.id}`"
              >
                {{ item.quantity_in_stock ? 'Buy now' : 'Sold Out' }}
              </NuxtLink>
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
import { mapActions } from 'vuex'
export default {
  layout: 'baseLayout',
  data() {
    return {
      loading: true,
      dataItems: [],
      dataEvents: {},
      time: '',
      interval: true
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
    //get data api
    this.getItem().then((res) => {
      this.dataItems = res.data.data.items
      this.dataEvents = res.data.data.event
      this.countDown(res.data.data.event.end_date)
      this.loading = false
      if (this.interval) {
        setInterval(() => {
          this.countDown(res.data.data.event.end_date)
        }, 1000)
        this.interval = false
      }
    })
  },
  methods: {
    ...mapActions('item', ['getItem']),
    countDown(endDate) {
      const timeNow = new Date().getTime()
      const countDownToTime = new Date(endDate).getTime()
      const timeDifference = countDownToTime - timeNow
      if (timeDifference <= 0) {
        this.time = 'Sold Out'
      } else {
        let seconds = Math.floor((timeDifference / 1000) % 60)
        let minutes = Math.floor((timeDifference / 1000 / 60) % 60)
        let hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24)
        let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
        //format
        seconds = seconds < 10 ? `0 ${seconds}` : seconds
        minutes = minutes < 10 ? `0 ${minutes}` : minutes
        hours = hours < 10 ? `0 ${hours}` : hours
        this.time = `${days} DAY <span>${hours} : ${minutes} : ${seconds}</span>`
      }
    },
    getDetail(id) {
      this.$router.push(`/detail/${id}`)
    }
  }
}
</script>
