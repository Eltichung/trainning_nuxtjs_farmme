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
  props: ['dataOrder'],
  methods: {
    ...mapActions('order', ['getOrderHistories', 'completeOrder']),
    confirm() {
      console.log(this.dataOrder)
      this.completeOrder(this.dataOrder)
        .then(() => {
          this.$modal.hide('confirmOrder')
          this.$emit('susses')
        })
        .catch(() => {
          this.$modal.hide('confirmOrder')
        })
    },
    cancel() {
      this.$modal.hide('confirmOrder')
    }
  }
}
</script>
