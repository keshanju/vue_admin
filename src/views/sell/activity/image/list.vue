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
        <dx-data-grid ref="dxDataGrid1"></dx-data-grid >
      </dx-scroll-view>
    </dx-popup>
    <Image_Edit ref="image_edit" :visible="image_edit_dialog.visible" @onHide="image_edit_dialog.onHide" :id="image_edit_dialog.id" :activity_id="image_edit_dialog.activity_id"></Image_Edit>
  </div>
</template>
<script lang="ts" src="./listController.ts"></script>
