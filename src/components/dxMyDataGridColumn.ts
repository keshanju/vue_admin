import DevExpress from 'devextreme/bundles/dx.all';

export class dxMyDataGridColumn implements DevExpress.ui.dxDataGridColumn {
    visible?: false;
    filterOperations?: ["=", "contains"]
}

let cc: dxMyDataGridColumn[] = [{

}];