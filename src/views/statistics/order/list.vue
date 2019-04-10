<template>
    <div>
        <DxForm :ref="dxFormKey1"></DxForm>
        <br/>
        <DxDataGrid :ref="dxDataGridKey1"></DxDataGrid>
        <br/>
        <DxChart ref="DxChartHtml"></DxChart>
    </div>
</template>
<script lang="ts">
    import HomeController from './listController'

    export default HomeController
</script>