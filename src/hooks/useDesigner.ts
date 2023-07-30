import { nextTick, reactive, toRefs } from "vue";
import { deepClone, generateId, getDefaultFormConfig } from "@/utils";
import { containers, basicFields } from "@/config/widget-config";
import { useDesignerStore } from "@/store/modules/designer";
import { ElMessage } from "element-plus";
import { storeToRefs } from "pinia";

var historyData = {
  index: -1,
  maxStep: 20,
  steps: [] as any,
};

let defaultFormConfig = deepClone(getDefaultFormConfig());

const useDesigner = () => {
  const state = reactive({
    // 微件列表
    widgetList: [],
    // 选择高亮项的id
    selectedId: null,
    // 选择高亮项
    selectedWidget: null as any,
    // 选中组件名称
    selectWidgetName: null,
    // 表单设计器
    formWidget: null as any,
  });

  const designerStore = useDesignerStore();
  const { widgetList, formConfig } = storeToRefs(designerStore);

  const registerFormWidget = (widget: any) => {
    state.formWidget = widget;
  };

  const changeLayoutType = (layout: string) => {
    designerStore.setDesignStore("formConfig", {
      ...formConfig.value,
      layoutType: layout,
    });
  };

  const getLayoutType = () => {
    return formConfig.value.layoutType || "PC";
  };

  const initDesigner = () => {
    designerStore.setDesignStore("formConfig", { ...defaultFormConfig });
    designerStore.setDesignStore("widgetList", []);
  };

  const initHistoryData = () => {
    historyData.index++;
    historyData.steps[historyData.index] = {
      widgetList: deepClone(widgetList.value),
      formConfig: deepClone(formConfig.value),
    };
  };

  // 对历史数据做一份拷贝
  const emitHistoryChange = () => {
    if (historyData.index === historyData.maxStep - 1) {
      historyData.steps.shift();
    } else {
      historyData.index++;
    }
    historyData.steps[historyData.index] = {
      widgetList: deepClone(widgetList.value),
      formConfig: deepClone(formConfig.value),
    };

    if (historyData.index < historyData.steps.length - 1) {
      historyData.steps = historyData.steps.slice(0, historyData.index + 1);
    }
  };

  const saveCurrentHistoryStep = () => {
    historyData.steps[historyData.index] = deepClone({
      widgetList: deepClone(widgetList.value),
      formConfig: deepClone(formConfig.value),
    });
  };

  // 根据容器type获取容器项的数据
  const getContainerByType = (typeName: string, isCat = true) => {
    let allWidgets = [...containers, ...basicFields];
    let foundCon = null;
    allWidgets.forEach((con: any) => {
      if (
        (isCat ? !!con.category : !con.category) &&
        !!con.type &&
        con.type === typeName
      ) {
        foundCon = con;
      }
    });

    return foundCon;
  };

  // 属性clone时候，对数据的拷贝及调整
  const copyNewContainerWidget = (origin: any) => {
    let newCon = deepClone(origin);
    newCon.id = newCon.type.replace(/-/g, "") + generateId();
    newCon.options.name = newCon.id;
    if (newCon.type === "grid") {
      let newCol = deepClone(getContainerByType("grid-col"));
      let tmpId = generateId();
      newCol.id = "grid-col-" + tmpId;
      newCol.options.name = "gridCol" + tmpId;
      newCon.cols.push(newCol);

      newCol = deepClone(newCol);
      tmpId = generateId();
      newCol.id = "grid-col-" + tmpId;
      newCol.options.name = "gridCol" + tmpId;
      newCon.cols.push(newCol);
    } else if (newCon.type === "table") {
      let newRow: any = { cols: [] };
      newRow.id = "table-row-" + generateId();
      newRow.merged = false;
      let newCell = deepClone(getContainerByType("table-cell"));
      newCell.id = "table-cell-" + generateId();
      newCell.options.name = newCell.id;
      newCell.merged = false;
      newCell.options.colspan = 1;
      newCell.options.rowspan = 1;
      newRow.cols.push(newCell);
      newCon.rows.push(newRow);
    } else if (newCon.type === "tab") {
      let newTabPane = deepClone(getContainerByType("tab-pane"));
      newTabPane.id = "tab-pane-" + generateId();
      newTabPane.options.name = "tab1";
      newTabPane.options.label = "tab 1";
      newCon.tabs.push(newTabPane);
    }

    delete newCon.displayName;
    return newCon;
  };

  // 拷贝基础字段
  const copyNewFieldWidget = (origin: any) => {
    let newWidget = deepClone(origin);
    let tempId = generateId();
    newWidget.id = newWidget.type.replace(/-/g, "") + tempId;
    newWidget.options.name = newWidget.id;
    newWidget.options.label =
      newWidget.options.label || newWidget.type.toLowerCase();

    delete newWidget.displayName;
    return newWidget;
  };

  // 绑定move移动事件,true表示元素可拖拽，用于定义哪些元素可拖拽
  const checkWidgetMove = (evt: any) => {
    /* Only field widget can be dragged into sub-form */
    if (!!evt.draggedContext && !!evt.draggedContext.element) {
      let wgCategory = evt.draggedContext.element.category;
      if (!!evt.to) {
        if (
          evt.to.className === "sub-form-table" &&
          wgCategory === "container"
        ) {
          return false;
        }
      }
    }

    return true;
  };

  // 基础字段部分定义是否可拖拽方式
  const checkFieldMove = (evt: any) => {
    if (!!evt.draggedContext && !!evt.draggedContext.element) {
      let wgType = evt.draggedContext.element.type + "";
      if (!!evt.to) {
        if (evt.to.className === "sub-form-table" && wgType === "slot") {
          return false;
        }
      }
    }

    return true;
  };

  // 选中组件时候获取当前数据
  const setSelectId = (selected: any) => {
    clearSelected();
    if (!selected) {
      return;
    }
    if (selected.id) {
      state.selectedId = selected.id;
      designerStore.setDesignStore("selectedId", selected.id);
      designerStore.setDesignStore("selectedWidget", selected);
      state.selectWidgetName = selected.options.name;
    }
  };

  // 清除选中
  const clearSelected = () => {
    state.selectedId = null;
    designerStore.setDesignStore("selectedId", null);
    designerStore.setDesignStore("selectedWidget", null);
    state.selectWidgetName = null;
  };

  const selectParentWidget = (parentWeight: any) => {
    if (parentWeight) {
      setSelectId(parentWeight);
    } else {
      clearSelected();
    }
  };

  // 向上移动微件
  const moveUpWidget = (parentList: any, indexOfParentList: number) => {
    if (parentList) {
      if (indexOfParentList === 0) {
        return ElMessage.warning("已经移动到了最上面");
      }

      let tempWidget = parentList[indexOfParentList];
      parentList.splice(indexOfParentList, 1);
      parentList.splice(indexOfParentList - 1, 0, tempWidget);
    }
    emitHistoryChange();
  };

  // 向下移动微件
  const moveDownWidget = (parentList: any, indexOfParentList: number) => {
    if (parentList) {
      if (indexOfParentList === parentList.length - 1) {
        return ElMessage.warning("已经移动到了最下面");
      }
      let tempWidget = parentList[indexOfParentList];
      parentList.splice(indexOfParentList, 1);
      parentList.splice(indexOfParentList + 1, 0, tempWidget);
    }
    emitHistoryChange();
  };

  const removeWidget = (
    parentList: any,
    indexOfParentList: number,
    parentWidget: any
  ) => {
    if (parentList) {
      let nextSelected: any = null;
      if (parentList.length === 1) {
        if (!!parentWidget) {
          nextSelected = parentWidget;
        }
      } else if (parentList.length === 1 + indexOfParentList) {
        nextSelected = parentList[indexOfParentList - 1];
      } else {
        nextSelected = parentList[indexOfParentList + 1];
      }

      nextTick(() => {
        parentList.splice(indexOfParentList, 1);
        clearSelected();
        setSelectId(nextSelected);
        emitHistoryChange();
      });
    }
  };

  // 克隆复制微件（grid or table）
  const cloneContainer = (containWidget: any) => {
    if (containWidget.type === "grid") {
      let newGrid = deepClone(getContainerByType("grid"));
      newGrid.id = newGrid.type + generateId();
      newGrid.options.name = newGrid.id;
      containWidget.cols.forEach((gridCol: any) => {
        let newGridCol = deepClone(getContainerByType("grid-col"));
        let tmpId = generateId();
        newGridCol.id = "grid-col-" + tmpId;
        newGridCol.options.name = "gridCol" + tmpId;
        newGridCol.options.span = gridCol.options.span;
        newGrid.cols.push(newGridCol);
      });

      return newGrid;
    } else if (containWidget.type === "table") {
      let newTable = deepClone(getContainerByType("table"));
      newTable.id = newTable.type + generateId();
      newTable.options.name = newTable.id;
      containWidget.rows.forEach((tRow: any) => {
        let newRow = deepClone(tRow);
        newRow.id = "table-row-" + generateId();
        newRow.cols.forEach((col: any) => {
          col.id = "table-cell-" + generateId();
          col.options.name = col.id;
          col.widgetList = []; //清空组件列表
        });
        newTable.rows.push(newRow);
      });

      return newTable;
    } else {
      //其他容器组件不支持clone操作
      return null;
    }
  };

  // 克隆grid-col
  const cloneGridCol = (widget: any, parentWidget: any) => {
    let newGridCol = deepClone(getContainerByType("grid-col"));
    newGridCol.options.span = widget.options.span;
    let tmpId = generateId();
    newGridCol.id = "grid-col-" + tmpId;
    newGridCol.options.name = "gridCol" + tmpId;

    parentWidget.cols.push(newGridCol);
  };

  // 追加表格行
  const appendTableRow = (widget: any) => {
    let rowIdx = widget.rows.length; //确定插入行位置
    let newRow = deepClone(widget.rows[widget.rows.length - 1]);
    newRow.id = "table-row-" + generateId();
    newRow.merged = false;
    newRow.cols.forEach((col: any) => {
      col.id = "table-cell-" + generateId();
      col.options.name = col.id;
      col.merged = false;
      col.options.colspan = 1;
      col.options.rowspan = 1;
      col.widgetList.length = 0;
    });
    widget.rows.splice(rowIdx, 0, newRow);
    emitHistoryChange();
  };

  // 追加表格列
  const appendTableCol = (widget: any) => {
    let colIdx = widget.rows[0].cols.length; //确定插入列位置
    widget.rows.forEach((row: any) => {
      let newCol = deepClone(getContainerByType("table-cell"));
      newCol.id = "table-cell-" + generateId();
      newCol.options.name = newCol.id;
      newCol.merged = false;
      newCol.options.colspan = 1;
      newCol.options.rowspan = 1;
      newCol.widgetList.length = 0;
      row.cols.splice(colIdx, 0, newCol);
    });
    emitHistoryChange();
  };

  // 指定编辑组件的展示
  const hasConfig = (widget: any, configName: string) => {
    let originalWidget: any = null;
    if (widget?.category) {
      originalWidget = getContainerByType(widget.type);
    } else {
      originalWidget = getContainerByType(widget.type, false);
    }

    if (!originalWidget || !originalWidget.options) {
      return false;
    }

    return Object.keys(originalWidget.options).indexOf(configName) > -1;
  };

  // 移除指定的grid-col
  const deleteColOfGrid = (gridWidget: any, colIdx: number) => {
    if (gridWidget && gridWidget.cols) {
      gridWidget.cols.splice(colIdx, 1);
    }
    emitHistoryChange();
  };

  // 添加新的grid-col
  const addNewColOfGrid = (gridWidget: any) => {
    const cols = gridWidget.cols;
    let newGridCol = deepClone(getContainerByType("grid-col"));
    let tmpId = generateId();
    newGridCol.id = "grid-col-" + tmpId;
    newGridCol.options.name = "gridCol" + tmpId;
    if (!!cols && cols.length > 0) {
      let spanSum = 0;
      cols.forEach((col: any) => {
        spanSum += col.options.span;
      });

      if (spanSum >= 24) {
        //this.$message.info('列栅格之和超出24')
        console.log("列栅格之和超出24");
        gridWidget.cols.push(newGridCol);
      } else {
        newGridCol.options.span = 24 - spanSum > 12 ? 12 : 24 - spanSum;
        gridWidget.cols.push(newGridCol);
      }
    } else {
      gridWidget.cols = [newGridCol];
    }
    emitHistoryChange();
  };

  // 撤销
  const undoHistoryStep = () => {
    if (historyData.index !== 0) {
      historyData.index--;
    }
    const widgets = deepClone(historyData.steps[historyData.index]?.widgetList);
    designerStore.setDesignStore("widgetList", widgets);
    const forms = deepClone(historyData.steps[historyData.index]?.formConfig);
    designerStore.setDesignStore("formConfig", forms);
  };

  // 恢复
  const redoHistoryStep = () => {
    if (historyData.index !== historyData.steps.length - 1) {
      historyData.index++;
    }
    const widgets = deepClone(historyData.steps[historyData.index]?.widgetList);
    designerStore.setDesignStore("widgetList", widgets);
    const forms = deepClone(historyData.steps[historyData.index]?.formConfig);
    designerStore.setDesignStore("formConfig", forms);
  };

  // 清空
  const clearDesigner = () => {
    let emptyWidgetListFlag = widgetList.value.length === 0;
    clearSelected();
    designerStore.setDesignStore("widgetList", []);
    designerStore.setDesignStore("formConfig", defaultFormConfig);
    if (!emptyWidgetListFlag) {
      emitHistoryChange();
    } else {
      saveCurrentHistoryStep();
    }
  };

  return {
    ...toRefs(state),
    copyNewContainerWidget,
    copyNewFieldWidget,
    checkWidgetMove,
    checkFieldMove,
    setSelectId,
    clearSelected,
    selectParentWidget,
    moveUpWidget,
    moveDownWidget,
    cloneContainer,
    registerFormWidget,
    removeWidget,
    appendTableRow,
    appendTableCol,
    hasConfig,
    cloneGridCol,
    deleteColOfGrid,
    addNewColOfGrid,
    initHistoryData,
    emitHistoryChange,
    saveCurrentHistoryStep,
    undoHistoryStep,
    redoHistoryStep,
    clearDesigner,
    changeLayoutType,
    getLayoutType,
    initDesigner,
  };
};

export default useDesigner;
