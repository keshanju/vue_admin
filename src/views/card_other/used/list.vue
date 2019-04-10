<template>
  <div>
    <dx-popup
      :visible.sync="options.visible"
      :title="options.title"
      :toolbarItems="options.toolbarItems"
      :width="options.width"
      :height="options.height"
      :onHidden="options.onHidden"
    >
      <dx-scroll-view>
        <dx-data-grid ref="dxDataGrid1"></dx-data-grid>
      </dx-scroll-view>
    </dx-popup>
  </div>
</template>
<script lang="ts" src="./listController.ts">
</script>

