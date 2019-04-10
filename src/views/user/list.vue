<template>
    <div>
        <dxUserSearchForm @onSearch="onSearch" :is_search_user="true"></dxUserSearchForm>
        <!-- <DxForm :ref="dxSearchFormKey1"></DxForm> -->
        <br/>
        <DxDataGrid :ref="dxDataGridKey1"></DxDataGrid>
        <MyMaster ref="master_user" :visible="master_dialog.visible" @onHide="master_dialog.onHide"></MyMaster>
    </div>
</template>
<script lang="ts">
import HomeController from './listController';
export default HomeController;
</script>

