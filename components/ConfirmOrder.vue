<template>
  <modal name="confirmOrder" :adaptive="true">
    <div class="modal">
      <h3>Are you sure?</h3>
      <div class="btn between-xs">
        <button @click="confirm">Yes</button>
        <button @click="cancel">No</button>
      </div>
    </div>
  </modal>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: ['dataOrder', 'typeBtn'],
  methods: {
    ...mapActions('order', ['getOrderHistories', 'completeOrder', 'cancelOrder']),
    confirm() {
      if (this.typeBtn === 'pay') {
        this.completeOrder(this.dataOrder)
          .then(() => {
            this.$emit('succsses')
          })
          .finally(() => {
            this.$modal.hide('confirmOrder')
          })
      } else if (this.typeBtn === 'cancel') {
        this.cancelOrder(this.dataOrder)
          .then(() => {
            this.$emit('succsses')
          })
          .finally(() => {
            this.$modal.hide('confirmOrder')
          })
      }
    },
    cancel() {
      this.$modal.hide('confirmOrder')
    }
  }
}
</script>
