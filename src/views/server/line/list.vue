<template>
  <div>
     <DxDataGrid :ref="dxDataGridKey1"></DxDataGrid>
     <line_limit_edit ref="line_limit_edit"></line_limit_edit>
  </div>
</template>
<script lang="ts">
import HomeController from './listController';
export default HomeController;
</script>
