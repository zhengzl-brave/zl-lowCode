<template>
    <td class="table-cell" :class="[selected ? 'selected' : '']" :colspan="widget.options.colspan || 1"
        :rowspan="widget.options.rowspan || 1" @click.stop="setSelectId(widget)"
        :style="{width: widget.options.cellWidth + '!important' || '', height: widget.options.cellHeight + '!important' || '', 
        'word-break': !!widget.options.wordBreak ? 'break-all' : 'normal'}">
        <draggable :list="widget.widgetList" item-key="id" v-bind="{ group: 'dragGroup', ghostClass: 'ghost', animation: 200 }"
            tag="div" :component-data="{ name: 'fade' }" handle=".drag-handler" :move="checkContainerMove"
            @add="(evt: any) => dragAdd(evt, widget.widgetList)" @update="dragUpdate"
            >
            <template #item="{ element: subwidget, index: swIdx }">
                <div class="form-widget-list">
                    <component :is="subwidget.type + '-widget'" :widget="subwidget" :key="subwidget.id"
                        :parent-list="widget.widgetList" :index-of-parent-list="swIdx" :parent-widget="widget"></component>
                </div>
            </template>
        </draggable>
    </td>
</template>

<script setup lang='ts'>
import useDesigner from '@/hooks/useDesigner';
import { computed } from 'vue';
const { checkWidgetMove, setSelectId, emitHistoryChange } = useDesigner()

import { storeToRefs } from 'pinia'
import { useDesignerStore } from '@/store/modules/designer';

const designerStore = useDesignerStore()
const { selectedId } = storeToRefs(designerStore)

const props = defineProps({
    widget: {
        type: Object,
        default: () => { }
    },
    parentList: {
        type: Array,
        default: () => []
    },
    parentWidget: {
        type: Object,
        default: () => { }
    }
})

const selected = computed(() => {
    return props.widget.id === selectedId.value
})

const checkContainerMove = (evt: any) => {
    checkWidgetMove(evt)
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
</script>

<style lang='scss' scoped>
.table-cell.selected {
    outline: 2px solid $--color-primary;
}
</style>