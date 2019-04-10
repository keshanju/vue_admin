<template>
    <div class="login">
        <div class="login-wrap">
            <div class="login-window">
                <DxForm :ref="dxFormKey1"></DxForm>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import IndexController from "./indexController";
export default IndexController;
</script>
<style scoped>
.login {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/login-bg.jpg);
  background-size: 100%;
}
.login-window {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: hsla(0, 0%, 100%, 0.3);
  overflow: hidden;
}


.login .dx-fieldset .dx-field {
  margin-bottom: 10px;
}
.login .dx-fieldset .dx-field-label {
  width: 30%;
}
.login .dx-fieldset .dx-field-value {
  width: 70% !important;
}


</style>


