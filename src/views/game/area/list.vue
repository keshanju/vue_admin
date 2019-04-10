<template>
  <div class="home">
    <DxDataGrid :ref="dxDataGridKey1"></DxDataGrid>
    <AreaLine ref="AreaLine"></AreaLine>
  </div>
</template>
<script lang="ts">
import HomeController from './listController';
export default HomeController;
</script>
