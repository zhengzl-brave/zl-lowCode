<template>
    <div class="container-wrap">
        <slot></slot>
        <div class="container-action" v-if="showAction">
            <i title="" @click="selectParentWidget(parentWidget)">
                <svg-icon icon-class="el-back" />
            </i>
            <i v-if="parentList && parentList.length > 1" title="" @click="moveUpWidget(parentList, indexOfParentList!)">
                <svg-icon icon-class="el-move-up" />
            </i>
            <i v-if="parentList && parentList.length > 1" title="" @click="moveDownWidget(parentList, indexOfParentList!)">
                <svg-icon icon-class="el-move-down" />
            </i>
            <i v-if="widget.type === 'table'" title="" @click="appendTableRow(widget)">
                <svg-icon icon-class="el-insert-row" />
            </i>
            <i v-if="widget.type === 'table'" title="" @click="appendTableCol(widget)">
                <svg-icon icon-class="el-insert-column" />
            </i>
            <i v-if="['grid', 'table'].includes(widget.type)" title="" @click="copyWidget">
                <svg-icon icon-class="el-clone" />
            </i>
            <i @click="deleteWidget" title="">
                <svg-icon icon-class="el-delete" />
            </i>
        </div>
    </div>
</template>

<script setup lang='ts'>
import svgIcon from '@/components/common/svg-icon.vue'
import { useDesignerStore } from '@/store/modules/designer';
import { storeToRefs } from 'pinia'
import { computed } from 'vue';
import useDesigner from '@/hooks/useDesigner'

const designerStore = useDesignerStore() 
const { selectedId } = storeToRefs(designerStore)
const { selectParentWidget, moveUpWidget, moveDownWidget, cloneContainer, setSelectId, 
    removeWidget, appendTableRow, appendTableCol, emitHistoryChange } = useDesigner()

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
})

const showAction = computed(() => {
    return props.widget.id === selectedId.value && !props.widget.internal
})

const copyWidget = () => {
    if(props.parentList) {
        let newCon = cloneContainer(props.widget)
        props.parentList.splice(props.indexOfParentList! + 1, 0, newCon)
        setSelectId(newCon)
        emitHistoryChange()
    }
}

const deleteWidget = () => {
    removeWidget(props.parentList, props.indexOfParentList as number, props.parentWidget)
}
</script>

<style lang='scss' scoped>
.container-wrap {
    position: relative;
    .container-action {
        position: absolute;
        bottom: 0;
        right: -2px;
        z-index: 99;
        height: 28px;
        background-color: $--color-primary;

        i {
            font-size: 14px;
            color: #fff;
            margin: 0 5px;
            cursor: pointer;
        }
    }
}
</style>