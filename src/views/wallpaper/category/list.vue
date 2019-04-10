<template>
  <div>
    <DxDataGrid :ref="dxDataGridKey1"></DxDataGrid>
    <myEdit ref="myEdit"></myEdit>
  </div>
</template>
<script lang="ts">
  import HomeController from './listController';

  export default HomeController;
</script>
