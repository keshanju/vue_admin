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
        <input type="file" @change="getFile($event)" >
        <div class="download_text">
          下载Excel模板: <a style='color:red' href="/static/other_card_import_demo.xlsx"> 点击下载</a>  
        </div>
      </dx-scroll-view>
    </dx-popup>
  </div>
</template>
<script lang="ts" src="./importController.ts">
</script>
<style lang="less" scoped>
.download_text{
  margin-top: 10px;
  line-height: 150%;
}
</style>

