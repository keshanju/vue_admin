<template>
  <div>
    <dx-popup :visible.sync="options.visible" :title="options.title" ref="dxPopup1">
      <dx-scroll-view>
        <dx-data-grid ref="dxDataGrid1"></dx-data-grid>
      </dx-scroll-view>
    </dx-popup>
    <AreaEdit ref="AreaEdit1"></AreaEdit>
    <AreaLine ref="AreaLine"></AreaLine>
  </div>
</template>
<script lang="ts" src="./arealistController.ts">

</script>
