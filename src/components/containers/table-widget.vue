<template>
    <container-wrapper :widget="widget" :parent-widget="parentWidget" :parent-list="parentList"
        :index-of-parent-list="indexOfParentList">
        <div class="table-container" :key="widget.id" :class="[selected ? 'selected' : '']" @click.stop="setSelectId(widget)">
            <table class="table-layout">
                <tbody>
                    <tr v-for="(row, rowIdx) in widget.rows" :key="row.id">
                        <template v-for="(colWidget, colIdx) in row.cols" :key="colWidget.id">
                            <table-cell-widget :widget="colWidget" :parent-list="row.cols"
                                :parent-widget="widget" :row-index="rowIdx" :row-length="widget.rows.length"
                               :col-index="colIdx" :col-length="row.cols.length"
                               :col-array="row.cols" :row-array="widget.rows"></table-cell-widget>
                        </template>
                    </tr>
                </tbody>
            </table>
        </div>
    </container-wrapper>
</template>

<script setup lang='ts'>
import { computed } from 'vue';
import containerWrapper from '../common/container-wrapper.vue';
import tableCellWidget from './table-cell-widget.vue';
import { storeToRefs } from 'pinia'
import { useDesignerStore } from '@/store/modules/designer';
import useDesigner from '@/hooks/useDesigner';

const designerStore = useDesignerStore()
const { selectedId } = storeToRefs(designerStore)
const { setSelectId } = useDesigner()


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
    indexOfParentList: Number
})

const selected = computed(() => {
    return props.widget.id === selectedId.value
})
</script>

<style lang='scss' scoped>
.table-container {
    border: 1px dashed #336699;
    box-sizing: border-box;
    padding: 3px;

    .table-layout {
        width: 100%;

        td {
            height: 48px;
            padding: 3px;
            border: 1px dashed #336699;
        }
    }
}

.table-container.selected {
    outline: 2px solid $--color-primary !important;
}</style>