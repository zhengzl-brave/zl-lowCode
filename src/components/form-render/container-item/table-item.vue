<template>
    <container-item-wrapper :widget="widget">
        <div class="table-container" :key="widget.id" v-show="!widget.options.hidden">
            <table class="table-layout" :ref="widget.id">
                <tbody>
                    <tr v-for="(row, rowIdx) in widget.rows" :key="row.id">
                        <template v-for="(colWidget, colIdx) in row.cols">
                            <table-cell-item v-if="!colWidget.merged" :widget="colWidget" :key="colIdx"
                                :parent-list="widget.cols" :row-index="rowIdx" :col-index="colIdx" :parent-widget="widget">
                                <!-- 递归传递插槽 -->
                                <template v-for="slot in Object.keys($slots)" v-slot:[slot]="scope">
                                    <slot :name="slot" v-bind="scope" />
                                </template>
                            </table-cell-item>
                        </template>
                    </tr>
                </tbody>
            </table>
        </div>
    </container-item-wrapper>
</template>

<script setup lang='ts'>
import tableCellItem from './table-cell-item.vue';
import containerItemWrapper from '@/components/common/container-item-wrapper.vue';
const props = defineProps({
    widget: {
        type: Object,
        default: () => { }
    }
})
</script>

<style lang='scss' scoped>
.table-layout {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
}
</style>