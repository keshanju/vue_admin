<template>
  <div>
    <dx-popup
      :visible.sync="options.visible"
      :title="options.title"
      ref="dxPopup1"
      width="300"
      height="150"
    >
      <dx-scroll-view>
        <DxForm ref="DxForm1"></DxForm>
      </dx-scroll-view>
    </dx-popup>
  </div>
</template>
<script lang="ts" src="./createHtmlController.ts">
</script>
