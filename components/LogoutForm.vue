<template>
 <modal name="logout" :adaptive="true">
    <div class="modal">
      <h3>Confirm Logout</h3>
      <div class="btn between-xs">
        <button @click="logout">YES</button>
        <button>NO</button>
      </div>
      <img src="~/assets/img/icon2.png" alt="" />
    </div>
  </modal>    
</template>
<script>
export default{
  methods:{
    logout(){
      localStorage.removeItem('user');
      localStorage.removeItem('address');
      this.$modal.hide('logout')
      this.$emit('logoutSuccess')
    }
  }
}
</script>
<style lang="scss" scoped>
img
{
  position: absolute;
  top: 10px;
  right: 10px;
  height:90px;
  object-fit: contain;
}
h3
{
  margin-top: 4vh;
  font-family: "SVN-ARCO Typography";
  color: #f1af1f;
  font-weight: 400;
  font-size: 250%;
  font-style: normal;
  text-align:center;
}
.btn {
  display:flex;
    button {
      margin: 0 auto;
      margin-top: 20px;
      height: 50px;
      color: #794821;
      background: #f1af1f;
      border-radius: 4px;
      font-family: 'SVN-ARCO Typography';
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 20px;
      padding-bottom: 4px;
      border: none;
      cursor: pointer;
      transition: all 0.3s;
      width: 170px;
      border-radius: 30px;
    }
}
</style>