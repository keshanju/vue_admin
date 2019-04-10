<template>
    <div class="page-container">
        <!-- <div class="page-header">
                        <h1 class="page-title">面板组件</h1>
                    </div> -->
        <div class="page-content">
            <router-view></router-view>
            <div style="clear:both"></div>
        </div>
    </div>

</template>
<script lang="ts">
import IndexController from "./indexController";
export default IndexController;
</script>
<style scoped>
/*
page-container
*/
.page-container {
  width: 100%;
}

.page-container .page-header {
  margin: 40px 0 20px;
  position: relative;
  margin-top: 0px;
  margin-bottom: 0px;
  padding: 20px;
  background: 0px 0px;
  border-bottom: none;
}

.page-title {
  margin-top: 0px;
  margin-bottom: 0px;
  font-size: 18px;
}

.page-container .page-content {
  padding: 20px;
}

.page-header + .page-content {
  padding-top: 0px;
}
</style>


