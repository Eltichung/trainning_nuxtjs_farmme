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
  props: ['dataOrder','typeBtn'],
  methods: {
    ...mapActions('order', ['getOrderHistories', 'completeOrder','cancelOrder']),
    confirm() {
      if(this.typeBtn==1)
      {
        this.completeOrder(this.dataOrder)
          .then(() => {
            this.$modal.hide('confirmOrder')
            this.$emit('susses')
          })
          .catch(() => {
            this.$modal.hide('confirmOrder')
          })
      }
      else if(this.typeBtn==2)
      {
        this.cancelOrder(this.dataOrder)
        .then(() => {
          this.$modal.hide('confirmOrder')
          this.$emit('susses')
        })
        .catch(() => {
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
