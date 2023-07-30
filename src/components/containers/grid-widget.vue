<template>
    <container-wrapper :widget="widget" :parent-widget="parentWidget" :parent-list="parentList" :index-of-parent-list="indexOfParentList">
        <el-row class="grid-container" :key="widget.id" :gutter="widget.options.gutter" :class="[selected ? 'selected': '']" @click.stop="setSelectId(widget)">
            <template v-for="(colWidget, colIdx) in widget?.cols" :key="colWidget.id">
                <grid-col-widget :widget="colWidget" :index-of-parent-list="colIdx" :parent-widget="widget"
                    :parent-list="widget.cols" :col-height="widget.options.colHeight"></grid-col-widget>
            </template>
        </el-row>
    </container-wrapper>
</template>

<script setup lang='ts'>
import gridColWidget from './grid-col-widget.vue';
import containerWrapper from '../common/container-wrapper.vue';
import { computed } from 'vue';
import { useDesignerStore } from '@/store/modules/designer';
import { storeToRefs } from 'pinia'
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
.el-row.grid-container {
    min-height: 50px;
    outline: 1px dashed #336699;
    margin: 0 !important;
    padding: 4px;
}
.selected {
    outline: 2px solid $--color-primary !important;
}
</style>