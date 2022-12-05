<template>
  <modal name="cancelOrder" :adaptive="true">
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
  props: ['dataOrder','typeBtn'],
  methods: {
    ...mapActions('order', ['getOrderHistories', 'cancelOrder']),
    confirm() {
    
      this.cancelOrder(this.dataOrder)
        .then(() => {
          this.$modal.hide('cancelOrder')
          this.$emit('susses')
        })
        .catch(() => {
          this.$modal.hide('cancelOrder')
        })
    },
    cancel() {
      this.$modal.hide('cancelOrder')
    }
  }
}
</script>
