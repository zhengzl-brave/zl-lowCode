<template>
    <el-col class="grid-cell" v-if="widget.type === 'grid-col'" :key="widget.id" v-bind="layoutProps" 
    :class="[selected ? 'selected': '']"  @click.stop="setSelectId(widget)" :style="colHeightStyle">
        <draggable :list="widget.widgetList" item-key="id" v-bind="{ group: 'dragGroup', ghostClass: 'ghost', animation: 200 }"
            tag="div" :component-data="{ name: 'fade' }" handle=".drag-handler" :move="checkContainerMove" 
            @add="(evt: any) => dragAdd(evt, widget.widgetList)" @update="dragUpdate">
            <template #item="{ element: subwidget, index: swIdx }">
                <div class="form-widget-list">
                    <template v-if="subwidget.category === 'container'">
                        <component :is="subwidget.type + '-widget'" :widget="subwidget" :key="subwidget.id" :parent-list="widget.widgetList"
                            :index-of-parent-list="swIdx" :parent-widget="widget" />
                    </template>
                </div>
            </template>
        </draggable>

        <div class="gridcol-action" v-if="selectedId === widget.id && widget.type === 'grid-col'">
            <i title="" @click.stop="selectParentWidget(parentWidget)">
                <svg-icon icon-class="el-back" />
            </i>
            <i v-if="parentList && parentList.length > 1" title="" @click="moveUpWidget(parentList, indexOfParentList!)">
                <svg-icon icon-class="el-move-up" />
            </i>
            <i v-if="parentList && parentList.length > 1" title="" @click="moveDownWidget(parentList, indexOfParentList!)">
                <svg-icon icon-class="el-move-down" />
            </i>
            <i title="" @click="cloneGridCol(widget, parentWidget)">
                <svg-icon icon-class="el-clone" />
            </i>
            <i title="" @click="deleteWidget">
                <svg-icon icon-class="el-delete" />
            </i>
        </div>
    </el-col>
</template>

<script setup lang='ts'>
import useDesigner from '@/hooks/useDesigner';
import { useDesignerStore } from '@/store/modules/designer';
import { storeToRefs } from 'pinia';
import { computed, reactive, watch } from 'vue';
import svgIcon from '../common/svg-icon.vue';

const { checkWidgetMove, setSelectId, selectParentWidget, moveUpWidget, moveDownWidget, cloneGridCol, removeWidget, emitHistoryChange } = useDesigner()
const props = defineProps({
    widget: {
        type: Object,
        default: () => { }
    },
    parentWidget: {
        type: Object,
        default: () => { }
    },
    parentList: {
        type: Array,
        default: () => []
    },
    indexOfParentList: Number,
    colHeight: String
})

const designerStore = useDesignerStore()
const { selectedId, formConfig } = storeToRefs(designerStore)

const layoutProps = reactive({
    span: props.widget.options.span || 12,
    offset: props.widget.options.offset || 0,
    push: props.widget.options.push || 0,
    pull: props.widget.options.pull || 0
})

const selected = computed(() => {
    return props.widget.id === selectedId.value
})

const colHeightStyle = computed(() => {
    return props.colHeight ? { height: props.colHeight + 'px'} : {}
})
const checkContainerMove = (evt: any) => {
    checkWidgetMove(evt)
}

const deleteWidget = () => {
    removeWidget(props.parentList, props.indexOfParentList as number, props.parentWidget)
}

const dragAdd = (evt: any, subList: any) => {
    const newIdx = evt.newIdx
    if(subList[newIdx]) {
        setSelectId(subList[newIdx])
    }
    emitHistoryChange()
}

const dragUpdate = () => {
    emitHistoryChange()
}

watch(() => props.widget.options.span, val => {
    layoutProps.span = val
})
watch(() => props.widget.options.md, val => {
    layoutProps.span = val
})
watch(() => props.widget.options.sm, val => {
    layoutProps.span = val
})
watch(() => props.widget.options.xs, val => {
    layoutProps.span = val
})
watch(() => props.widget.options.offset, val => {
    layoutProps.offset = val
})
watch(() => props.widget.options.push, val => {
    layoutProps.push = val
})
watch(() => props.widget.options.pull, val => {
    layoutProps.pull = val
})

watch(() => formConfig.value.layoutType, val => {
    if(props.widget.options.responsive) {
        if(val === 'H5') {
            layoutProps.span = props.widget.options.xs || 12
        } else if(val === 'Pad') {
            layoutProps.span = props.widget.options.sm || 12
        } else {
            layoutProps.span = props.widget.options.md || 12
        }
    } else {
        layoutProps.span = props.widget.options.span || 12
    }
}, { immediate: true })

watch(() => props.widget.options.responsive, val => {
    let lyType = formConfig.value.layoutType
    if(val) {
        if(lyType === 'H5') {
            layoutProps.span = props.widget.options.xs || 12
        } else if(lyType === 'Pad') {
            layoutProps.span = props.widget.options.sm || 12
        } else {
            layoutProps.span = props.widget.options.md || 12
        }
    } else {
        layoutProps.span = props.widget.options.span || 12
    }
})
</script>

<style lang='scss' scoped>
.grid-cell {
    min-height: 38px;
    padding: 3px;
    outline: 1px dashed #336699;
    position: relative;

    &.selected {
        border: 1px solid $--color-primary;
    }

    .gridcol-action {
        position: absolute;
        bottom: 0;
        right: -2px;
        height: 28px;
        line-height: 28px;
        background-color: $--color-primary;
        z-index: 99;
        i {
            color: #fff;
            font-size: 14px;
            margin: 0 5px;
            cursor: pointer;
        }
    }
}
</style>