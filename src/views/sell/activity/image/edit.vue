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
           <dx-form ref="dxForm1"></dx-form>
      </dx-scroll-view>
    </dx-popup>
  </div>
</template>
<script lang="ts" src="./editController.ts"></script>
