<template>
  <div class="home">
    <DxForm :ref="dxFormKey1"></DxForm>
    <br />
    <DxDataGrid :ref="dxDataGridKey1"></DxDataGrid>
    <AreaList ref="AreaList"></AreaList>
  </div>
</template>
<script lang="ts">
import HomeController from "./listController";
export default HomeController;
</script>
