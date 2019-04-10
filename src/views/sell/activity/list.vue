<template>
    <div>
        <DxDataGrid :ref="dxDataGridKey1"></DxDataGrid>
        <Image_List :visible="image_dialog.visible" @onHide="image_dialog.onHide" :id="image_dialog.id"></Image_List>
    </div>
</template>
<script lang="ts">
    import HomeController from './listController';

    export default HomeController;
</script>
