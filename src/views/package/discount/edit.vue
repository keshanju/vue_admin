<template>
    <dx-popup :visible.sync="options.visible" :title="options.title" :toolbarItems="options.toolbarItems">
        <dx-scroll-view>
            {{formData1}}
            <dx-form ref="dxForm1"></dx-form>
        </dx-scroll-view>
    </dx-popup>
</template>
<script lang="ts" src="./editController.ts">
</script>

