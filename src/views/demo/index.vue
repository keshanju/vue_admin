<template>
  <div>
    <!-- <p>
      <DxDataGrid ref="DxDataGrid1"></DxDataGrid>
    </p>-->
    <p>
      <DxTabPanel ref="DxTabPanel1">
        <div slot="item" slot-scope="item" :item="item">{{item.id}}

            <div v-show="item.id==1">
                111111111111111111111
            </div>
            <div v-show="item.id==2">
                22222222222222222
            </div>
            
            <div v-show="item.id==3">
                333333333333333333
            </div>
            
        </div>
      </DxTabPanel>
    </p>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import HomeController from "./indexController";
export default HomeController;
</script>
<style>
</style>
