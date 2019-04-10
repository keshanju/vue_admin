<template>
  <div>
    <dxUserSearchForm @onSearch="onSearch"></dxUserSearchForm>
    <br>
    <dx-form ref="dxFormSearchOrder1"></dx-form>
    <br/>
    <!-- <DxForm :ref="dxFormKey1"></DxForm>
    <br> -->
    <DxDataGrid :ref="dxDataGridKey1"></DxDataGrid>

    <OrderErrorList ref="order_error_list"></OrderErrorList>
  </div>
</template>
<script lang="ts">
import HomeController from "./listController";
export default HomeController;
</script>
