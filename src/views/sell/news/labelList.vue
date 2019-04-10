<template>
    <div>
        <DxDataGrid :ref="dxDataGridKey1"></DxDataGrid>
        <CreateHtml ref="CreateHtml1"></CreateHtml>
        <DxChart ref="DxChartHtml"></DxChart>
    </div>
</template>
<script lang="ts">
    import HomeController from './labelListController';

    export default HomeController;
</script>
