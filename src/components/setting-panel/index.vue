<template>
    <el-container class="panel-container">
        <el-tabs v-model="activeTab">
            <el-tab-pane label="组件设置" name="1">
                <el-scrollbar class="setting-scroll" :height="scrollHeight">
                    <template v-if="selectedWidget">
                        <el-form :model="optionModel" size="small" label-position="left" label-width="120px"
                            class="setting-form">
                            <el-collapse class="setting-collapse" v-model="collActiveName">
                                <el-collapse-item name="1" title="常见属性">
                                    <template v-for="(editName, proName) in commonProps">
                                        <component v-if="hasPropEditor(proName, editName)" :is="editName"
                                        :option-model="optionModel"
                                        ></component>
                                    </template>
                                </el-collapse-item>
                            </el-collapse>
                        </el-form>
                    </template>
                </el-scrollbar>
            </el-tab-pane>

            <el-tab-pane label="表单设置" name="2">
                <el-scrollbar class="setting-scroll" :height="scrollHeight">
                    表单
                </el-scrollbar>
            </el-tab-pane>
        </el-tabs>
    </el-container>
</template>

<script setup lang='ts'>
import useDesigner from '@/hooks/useDesigner';
import { computed, onMounted, reactive, toRefs, watch } from 'vue';
import propertyRegister from '@/config/propertyRegister'
import { useDesignerStore } from '@/store/modules/designer';
import { storeToRefs } from 'pinia';

const designerStore = useDesignerStore()
const { selectedWidget } = storeToRefs(designerStore)
const { hasConfig, saveCurrentHistoryStep } = useDesigner()

const state = reactive({
    activeTab: '1',
    scrollHeight: '0px',
    collActiveName: ['1',]
})

const { activeTab, scrollHeight, collActiveName } = toRefs(state)

const { COMMON_PROPERTIES, ADVANCED_PROPERTIES, EVENT_PROPERTIES } = propertyRegister

const pros = reactive({
    commonProps: COMMON_PROPERTIES,
    advProps: ADVANCED_PROPERTIES,
    eventProps: EVENT_PROPERTIES,
})
const { commonProps } = toRefs(pros)

const optionModel = computed({
    get: () => {
        return selectedWidget.value.options
    },
    set: (val: any) => {
        selectedWidget.value.options = val
    }
})

const hasPropEditor = (propName: string, editName: string) => {
    if(!editName) return false

    // 如有前缀名则去掉
    let originalPropName = propName.replace(selectedWidget.value.type + '-', '') 

    return hasConfig(selectedWidget.value, originalPropName)
}

watch(() => selectedWidget.value?.options, () => {
    saveCurrentHistoryStep()
}, {deep: true})

onMounted(() => {
    state.scrollHeight = window.innerHeight - 56 - 48 + 'px'
})
</script>

<style lang='scss' scoped>
.panel-container {
    padding: 0 8px;

    .el-tabs {
        width: 100%;
    }
  
}

</style>