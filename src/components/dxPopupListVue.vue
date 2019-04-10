<template>
    <div>
        <dx-popup>
            <dx-scroll-view>
            </dx-scroll-view>
        </dx-popup>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import {
  DxDataGrid,
  DxForm,
  DxTreeView,
  DxPopup,
  DxTextArea
} from "devextreme-vue";
@Component({
  components: {
    DxDataGrid,
    DxForm,
    DxTreeView,
    DxPopup,
    DxTextArea
  }
})
export default class Home extends Vue {}
</script>
