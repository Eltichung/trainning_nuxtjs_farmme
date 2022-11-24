<template>
  <modal  name="example" :adaptive="true">
    <div class="modal">
      <div class="modal-top">
        <h3>Welcome to farmme</h3>
        <p>First, let get your Email</p>
      </div>
      <form action="">
        <div class="form-item">
          <label for="" style=" text-align:start">Email (This email will be used to receive NFT Items.)</label>
          <input type="text" />
        </div>
        <div class="form-item">
          <button>Register</button>
        </div>
      </form>
      <div class="modal-icon">
        <img src="~/assets/img/model_icon.png" alt="" />
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'MyComponent'
}
</script>
<style lang="scss">
.modal {
    width: 600px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: 20px;
    max-width: 90%;
    position: relative;
    &-icon
    {
        position: absolute;
        top: 10px;
        right: 0;
        img
        {
            height:120px;
            object-fit: contain;
        }
       
    }
  &-top {
    h3 {
      margin-top: 4vh;
      font-family: 'SVN-ARCO Typography';
      color: #f1af1f;
      font-weight: 400;
      font-size: 200%;
      font-style: normal;
    }
    p {
      font-family: 'Quicksand';
      color: #794821;
      font-weight: 700;
      font-size: 150%;
      margin-bottom: 4.8vh;
    }
  }
  .form-item {
    display:flex;
    flex-direction: column;
    justify-content:flex-start;
    label {
        font-family: "Quicksand";
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
      color: #794821;
      margin-bottom: 10px;
    }
    input {
      background: hsla(0, 0%, 100%, 0.1);
      border-radius: 4px;
      height: 40px;
      border: none;
      color: #794821;
      padding-left: 15px;
      border: 1px solid rgba(121, 72, 33, 0.5);
      outline: none;
      width: 100%;
    }
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
}
.vm--modal
{
    // max-width: 80% !important;
    // margin: 0 auto !important;
    background-color: unset !important;;
    width: auto !important;
  height: auto !important;
  box-shadow: unset !important;
}
.vm--container {
    background-color: rgba(1,1,1,0.85)!important;
    z-index: 9999999999999 !important;
}
@media  screen and (max-width: 650px) {
    .modal
    {
        margin: 0 auto;
    }
}
@media  screen and (max-width: 450px) {
    .modal-icon {
    top: 60px;
    img
    {
        height: 80px;
    }
}
}
</style>
