<template>
    <container-item-wrapper :widget="widget">
        <el-row :key="widget.id" :gutter="widget.options.gutter" class="grid-container" v-show="!widget.options.hidden">
            <template v-for="(colWidget, colIdx) in widget.cols" :key="colIdx">
                <grid-col-item :widget="colWidget" :parent-list="widget.cols" :index-of-parent-list="colIdx"
                    :parent-widget="widget" :col-height="widget.options.colHeight">
                    <!-- 递归传递插槽 -->
                    <template v-for="slot in Object.keys($slots)" v-slot:[slot]="scope">
                        <slot :name="slot" v-bind="scope" />
                    </template>
                </grid-col-item>
            </template>
        </el-row>
    </container-item-wrapper>
</template>

<script setup lang='ts'>

import GridColItem from './grid-col-item.vue'
import containerItemWrapper from '@/components/common/container-item-wrapper.vue';
const props = defineProps({
    widget: {
        type: Object,
        default: () => { }
    }
})
</script>

<style lang='scss' scoped></style>