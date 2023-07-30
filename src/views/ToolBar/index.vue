<template>
    <div class="tool-bar">
        <div class="left">
            <el-button link type="primary" @click="handleUndo">
                <svg-icon icon-class="undo" />
            </el-button>
            <el-button link type="primary" @click="handleRedo">
                <svg-icon icon-class="redo" />
            </el-button>
            <el-button-group>
                <el-button :type="layoutType === 'PC' ? 'info': ''" @click="changeLayoutType('PC')">PC</el-button>
                <el-button :type="layoutType === 'Pad' ? 'info': ''" @click="changeLayoutType('Pad')">Pad</el-button>
                <el-button :type="layoutType === 'H5' ? 'info': ''" @click="changeLayoutType('H5')">H5</el-button>
            </el-button-group>
        </div>
        <div class="right">
            <el-button  type="primary" @click="clearDesigner">
                <svg-icon icon-class="el-delete" />清空
            </el-button>
            <el-button  type="primary" @click="isViewDialog = true">
                <svg-icon icon-class="el-view" />预览
            </el-button>
            <el-button  type="primary">
                导入JSON
            </el-button>
            <el-button  type="primary" @click="handleExportJson">
                导出JSON
            </el-button>
            <el-button  type="primary" @click="handleShowSfc">
                <svg-icon icon-class="vue-sfc" style="color: #fff;" />生成SFC
            </el-button>
        </div>
    </div>

    <div class="is-view" v-if="isViewDialog">
        <el-dialog title="预览" v-model="isViewDialog" :show-close="true" :close-on-click-modal="false"
            :close-on-press-escape="false" center :destroy-on-close="true" :append-to-body="true" class="drag-dialog"
            width="75%">
            <div class="render-rap">
                <form-render :form-json="formJson" :preview-state="true" :currentViewState="isViewDialog" />
            </div>
        </el-dialog>
    </div>

    <div class="export-json" v-if="isExportJson">
        <el-dialog title="导出JSON" v-model="isExportJson" :show-close="true" class="drag-dialog" center append-to-body
            :close-on-click-modal="false" :close-on-press-escape="false" :destroy-on-close="true">
            <code-editor mode="json" :readonly="true" v-model="jsonContent" />
        </el-dialog>
    </div>

    <div class="is-sfc" v-if="isSfcDialog">
        <el-dialog title="生成SFC" v-model="isSfcDialog" :show-close="true" class="drag-dialog" center append-to-body
            :close-on-click-modal="false" :close-on-press-escape="false" :destroy-on-close="true" width="75%">
            <el-tabs type="border-card" class="dialog-tab" v-model="activeSfcTab">
                <el-tab-pane label="Vue2" name="vue2">
                    <code-editor mode="html" :readonly="true" :user-worker="false" v-model="sfcCodeV2" />
                </el-tab-pane>
                <el-tab-pane label="Vue3" name="vue3">
                    <code-editor mode="html" :readonly="true" :user-worker="false" v-model="sfcCodeV3" />
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    </div>
</template>

<script setup lang='ts'>
import svgIcon from '@/components/common/svg-icon.vue';
import useDesigner from '@/hooks/useDesigner';
import { useDesignerStore } from '@/store/modules/designer';
import { deepClone } from '@/utils';
import { genSFC } from '@/utils/sfcGenerator'
import { storeToRefs } from 'pinia';
import { computed, reactive, toRefs } from 'vue';
import formRender from '@/components/form-render/index.vue'
import codeEditor from '@/components/common/code-editor.vue';
const { undoHistoryStep, redoHistoryStep, clearDesigner, getLayoutType, changeLayoutType } = useDesigner()

const designerStore = useDesignerStore()
const { widgetList, formConfig } = storeToRefs(designerStore)

const state = reactive({
    isViewDialog: false,
    isExportJson: false,
    isSfcDialog: false,
    jsonContent: '',
    activeSfcTab: 'vue3',
    sfcCodeV2: '',
    sfcCodeV3: ''
})

const { isViewDialog, isExportJson, isSfcDialog, jsonContent, activeSfcTab, sfcCodeV2, sfcCodeV3 } = toRefs(state)

const formJson = computed(() => {
    return {
        widgetList: deepClone(widgetList.value),
        formConfig: deepClone(formConfig.value)
    }
})

const handleExportJson = () => {
    let widgets = deepClone(widgetList.value)
    state.jsonContent = JSON.stringify({ widgets }, null, ' ')
    state.isExportJson = true
}

const handleShowSfc = () => {
    // loadBeautifier((beautifier: any) => {
    //     state.sfcCodeV2 = genSFC({}, widgetList.value, beautifier)
    //     state.sfcCodeV3 = genSFC({}, widgetList.value, beautifier, true)
    //     state.isSfcDialog = true
    // })
    state.sfcCodeV2 = genSFC(formConfig.value, widgetList.value)
    state.sfcCodeV3 = genSFC(formConfig.value, widgetList.value, true)
    state.isSfcDialog = true
}

const layoutType = computed(() => {
    return getLayoutType()
})
const handleUndo = () => {
    undoHistoryStep()
}
const handleRedo = () => {
    redoHistoryStep()
}
</script>

<style lang='scss' scoped>
.tool-bar {
    display: flex;
    justify-content: space-between;
}
</style>