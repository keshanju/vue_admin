<template>
  <div>
     <DxDataGrid :ref="dxDataGridKey1"></DxDataGrid>
     <server_node_error ref="server_node_error"></server_node_error>
  </div>
</template>
<script lang="ts">
import HomeController from './listController';
export default HomeController;
</script>
