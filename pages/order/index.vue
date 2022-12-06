<template>
  <div class="detail order-page">
    <LoadingScreen v-if="loading" />
    <div class="bg_detail"><img src="~/assets/img/bg-2.png" alt="" /></div>
    <div class="order">
      <h1 class="order-title"><span>ORDER</span>HISTORY</h1>
      <div class="order-container">
        <div class="box-page">
          <h3>My Order</h3>
        </div>
        <div class="order-main">
          <table>
            <thead>
              <tr class="between-xs">
                <th>Order date</th>
                <th>NFT</th>
                <th>Items</th>
                <th>Price per item</th>
                <th>Discount fee</th>
                <th>Order Paid</th>
                <th>Status</th>
                <th>Txhash</th>
              </tr>
            </thead>
            <tr class="between-xs middle-xs" v-for="item in dataHistories" :key="item.id">
              <td>
                <p>{{ item.date }}</p>
                <p>{{ getTime(item.created_at) }}</p>
              </td>
              <td>{{ item.item_name }}</td>
              <td>{{ item.item_quantity }} item</td>
              <td>{{ item.item_unit_price }} USDT</td>
              <td>{{ item.coupon_percent }}%</td>
              <td>{{ item.total }} USDT</td>
              <td :class="`status_${item.status}`">{{ getStatus(item.status) }}</td>
              <td colspan="2" class="hash" :class="{ hash_active: item.status == 1 }">
                <p>{{ item.tx_hash }}</p>
              </td>
              <td colspan="2" class="hash" :class="{ hash_active: item.status == 2 }">
                <div class="order-btn">
                  <button class="btn btn-pay" @click="payItem(item.id)">Pay</button>
                  <button class="btn btn-cancel" @click="cancelItem(item.id)">Cancel</button>
                </div>
              </td>
              <td colspan="2" class="hash" :class="{ hash_active: item.status == 3 }"></td>
            </tr>
          </table>
          <div class="box-pagination">
            <p>Total {{ itemCount }} records</p>
            <vPagination
              v-model="currentPage"
              :page-count="pageCount"
              :labels="paginationAnchorTexts"
            ></vPagination>
          </div>
        </div>
      </div>
    </div>
    <Teleport to="body">
      <ConfirmOrder :dataOrder="dataOrder" :typeBtn="typeBtn" @succsses="succsses" />
    </Teleport>
  </div>
</template>
<script>
import { helper } from '~/helpers/index'
import { mapActions } from 'vuex'
import constants from '~/ultis/constants'
export default {
  layout: 'baseLayout',
  data() {
    return {
      loading: true,
      currentPage: 1,
      dataHistories: [],
      itemCount: 0,
      pageCount: 1,
      dataOrder: {},
      typeBtn: '',
      paginationAnchorTexts: {
        first: ' ',
        prev: 'Pre',
        next: 'Next',
        last: ' '
      }
    }
  },
  watch: {
    currentPage() {
      this.getDataHistories()
    }
  },
  created() {
    this.getDataHistories()
  },
  methods: {
    ...mapActions('order', ['getOrderHistories', 'cancelOrder', 'completeOrder']),
    getDataHistories() {
      this.loading = true
      this.getOrderHistories({ page: this.currentPage })
        .then((res) => {
          this.dataHistories = res.data.data.orders
          this.itemCount = res.data.data.total
          this.pageCount = Math.round(res.data.data.total / res.data.data.perPage)
        })
        .finally(() => {
          this.loading = false
        })
    },
    getStatus(status) {
      return constants.STATUS_ORDER[status]
    },
    payItem(id) {
      this.dataOrder = {
        tx_hash: localStorage.getItem('address'),
        order_id: id
      }
      this.typeBtn = 'pay'
      this.$modal.show('confirmOrder')
    },
    cancelItem(id) {
      this.dataOrder = {
        id: id
      }
      this.typeBtn = 'cancel'
      this.$modal.show('confirmOrder')
    },
    succsses() {
      this.loading = true
      this.getDataHistories()
    },
    getTime(time) {
      return helper.convertDate(time, 'HH:mm:ss')
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/style/detail.scss';
</style>
