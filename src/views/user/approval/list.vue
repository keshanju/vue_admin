<template>
  <div>
    <dxUserSearchForm @onSearch="onSearch"></dxUserSearchForm>
    <br>
    <DxDataGrid :ref="dxDataGridKey1"></DxDataGrid>
  </div>
</template>
<script lang="ts">
import HomeController from "./listController";
export default HomeController;
</script>

<style>
</style>
