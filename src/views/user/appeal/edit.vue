<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <Form1 :id="options.id"></Form1>
      </div>
      <div class="col-md-4">
        <Form2  @onSearchUser="onSearchUser" ref="formKey2"></Form2>
      </div>
      <div class="col-md-4">
        <Audit1 ref="formKey3" :appeal_id="options.id"></Audit1>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import HomeController from "./editController";
export default HomeController;
</script>