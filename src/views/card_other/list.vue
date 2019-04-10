<template>
    <div>
        <dx-data-grid ref="dx-data-grid-ref1"></dx-data-grid>
        <DefineEdit :visible="define_dialog.visible" @onHide="define_dialog.onHide" :id="define_dialog.id" ></DefineEdit>
        <Import :visible="import_dialog.visible" @onHide="import_dialog.onHide" :id="import_dialog.id" ></Import>
        <UnUsedList :visible="unused_dialog.visible" @onHide="unused_dialog.onHide" :id="unused_dialog.id" ></UnUsedList>
        <UsedList :visible="used_dialog.visible" @onHide="used_dialog.onHide" :id="used_dialog.id" ></UsedList>
        <AbandonList :visible="abandon_dialog.visible" @onHide="abandon_dialog.onHide" :id="abandon_dialog.id" ></AbandonList>
    </div>
</template>
<script lang="ts" src="./listController.ts">
</script>

