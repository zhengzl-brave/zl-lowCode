<template>
    <td class="table-cell" :colspan="widget.options.colspan || 1" :rowspan="widget.options.rowspan || 1" :style="{
        width: widget.options.cellWidth + ' !important' || '', height: widget.options.cellHeight +
            ' !important' || '', 'word-break': !!widget.options.wordBreak ? 'break-all' : 'normal'
    }">
        <template v-for="(subWidget, swIdx) in widget.widgetList">
            <component v-if="subWidget.category === 'container'" :is="subWidget.type + '-item'" widget="subWidget"
                :key="swIdx" :parent-list="widget.widgetList" :index-of-parent-list="swIdx" :parent-widget="widget">
                <!-- 递归传递插槽 -->
                <template v-for="slot in Object.keys($slots)" v-slot:[slot]="scope">
                    <slot :name="slot" v-bind="scope" />
                </template>
            </component>
        </template>
    </td>
</template>

<script setup lang='ts'>
const props = defineProps({
    widget: {
        type: Object,
        default: () => { }
    }
})
</script>

<style lang='scss' scoped>
.table-cell {
    display: table-cell;
    height: 36px;
    border: 1px solid #e5e5e5;
}
</style>