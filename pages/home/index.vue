<template>
  <div>
    <div class="main">
      <MenuTop />
      <div class="time">
        <h3>EVENT PRE-ORDER SKATEBOARD NFT</h3>
        <div class="clock">
          <p>2D</p>
          <p>04:03:59</p>
        </div>
      </div>
      <ItemCard />
    </div>
    <div class="bg">
      <img src="~/assets/img/bg-1.png" alt="" />
    </div>
    <div class="gallery container_1">
      <div class="gallery-text col-xs-6">
        <h3>EVENT PRE-ORDER</h3>
        <h2>SKATEBOARD NFT</h2>
        <p>
          Our Beloved Farmers! We are so excited to bring the Pre-Order NFT
          Skateboard Event to you.
        </p>
        <p>
          The holiday season is upon us, and you know what time it is: time to
          start enjoying the new feature - Amazing Race. Here are the hot items
          of 2022 that you should own the one you need and become the master
          farmer.
        </p>
        <p>
          It's a good thing you're reading this right now, because the hot deal
          NFT Skateboard and best seller package with good price will be sold
          out soon.
        </p>
      </div>
      <div class="gallery-slider col-xs-6">
        <carousel :per-page="1" :autoplay="true" :paginationEnabled="false" :autoplayTimeout="1500" :loop="true">
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
    <footer-page />
  </div>
</template>
<script>
import ItemCard from '../../components/ItemCard.vue'

export default {}
</script>
