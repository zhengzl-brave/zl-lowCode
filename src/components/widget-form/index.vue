<template>
    <div class="form-container">
        <el-form class="widget-from" :label-position="labelPosition" :class="[layoutType + '-layout']"
            :validate-on-rule-change="false">
            <div class="form-widget-list">
                <draggable :list="widgetList" item-key="id"
                    v-bind="{ group: 'dragGroup', ghostClass: 'ghost', animation: 300 }" tag="div"
                    :component-data="{ name: 'fade' }" handle=".drag-handler" @add="onDragAdd" @update="onDragUpdate"
                    :move="checkMove">
                    <template #item="{ element: widget, index }">
                        <template v-if="widget.category === 'container'">
                            <component :is="`${widget.type}-widget`" :widget="widget" :key="widget.id"
                                :parent-list="widgetList" :index-of-parent-list="index" :parent-widget="null" />
                        </template>
                        <template v-else>
                            <component :is="`${widget.type}-widget`" :field="widget" :key="widget.id"
                                :parent-list="widgetList" :index-of-parent-list="index" :parent-widget="null" :design-state="true" />
                        </template>
                    </template>
                </draggable>
            </div>
        </el-form>
    </div>
</template>

<script setup lang='ts'>
import useDesigner from '@/hooks/useDesigner';
import { computed, onMounted, watch } from 'vue';
const { checkWidgetMove, setSelectId, initHistoryData, emitHistoryChange, getLayoutType, initDesigner } = useDesigner()
import { useDesignerStore } from "@/store/modules/designer";
import { storeToRefs } from 'pinia';
const designerStore = useDesignerStore()
const { widgetList, formConfig } = storeToRefs(designerStore)

const onDragAdd = (evt: any) => {
    const newIndex = evt.newIndex
    if (widgetList.value[newIndex]) {
        setSelectId(widgetList.value[newIndex])
    }
    emitHistoryChange()
}

const onDragUpdate = () => {
    emitHistoryChange()
}
const checkMove = (evt: any) => {
    return checkWidgetMove(evt)
}

watch(widgetList, val => {
    designerStore.setDesignStore('widgetList', val)
}, { deep: true })

const labelPosition = computed(() => {
    return formConfig.value && formConfig.value.labelPosition ? formConfig.value.labelPosition : 'left'
})

const layoutType = computed(() => getLayoutType())

initHistoryData()

initDesigner()

onMounted(() => {
})

defineExpose({
})
</script>

<style lang='scss' scoped>
.form-container {
    width: 100%;
    height: 100%;
    background-color: #f1f2f3;
    padding: 10px;

    .widget-from {
        height: 100%;
        width: 100%;
        background-color: #fff;

        .form-widget-list,
        div[name="fade"] {
            width: 100%;
            height: 100%;
        }
    }

    .el-form.Pad-layout {
        margin: 0 auto;
        max-width: 960px;
        border-radius: 15px;
        box-shadow: 0 0 1px 10px #495060;
    }

    .el-form.H5-layout {
        margin: 0 auto;
        width: 420px;
        border-radius: 15px;
        //border-width: 10px;
        box-shadow: 0 0 1px 10px #495060;
    }

}
</style>