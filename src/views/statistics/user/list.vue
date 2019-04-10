<template>
    <div>
        <DxForm :ref="dxFormKey1"></DxForm>
        <br/>
        <DxDataGrid :ref="dxDataGridKey1"></DxDataGrid>
        <br/>
        <DxForm :ref="dxFormKey2"></DxForm>
        <br/>
        <DxChart ref="DxChartHtml"></DxChart>
    </div>
</template>
<script lang="ts">
    import HomeController from './listController'

    export default HomeController
</script>