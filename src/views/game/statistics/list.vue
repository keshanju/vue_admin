<template>
  <div class="home">
    <dx-form ref="dxForm1"></dx-form>
    <br/>
    <DxDataGrid :ref="dxDataGridKey1"></DxDataGrid>
  </div>
</template>
<script lang="ts">
import HomeController from "./listController";
export default HomeController;
</script>
