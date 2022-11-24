<template>
  <div class="header-fix middle-xs container_1">
    <div class="logo">
      <img src="~/assets/img/logo_farm_me.png" alt="" />
    </div>
    <ul class="menu">
      <li><a href="#">HOME</a></li>
      <li><a href="#">ORDER HISTORY</a></li>
      <li><a href="#">NFT MARKET</a></li>
    </ul>
    <div class="meta_mask" @click="connect">
      <img src="~/assets/img/logo.png" alt="" />
      <p>{{textMetaMask}}</p>
    </div>
  </div>
</template>
<script>
import { helper } from '~/helpers/index'
export default{
  data() {
    return {
      textMetaMask: "Connect MetaMask",
    }
  },
  methods:{
    async connect(){
      helper.getBalance()
      .then((data)=>{
        this.$modal.show('example')
        this.textMetaMask=(data)
      })
    }
  }
}
</script>
