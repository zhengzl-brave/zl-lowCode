<template>
    <div class="field-wrapper">
        <div class="content-item" v-if="!field.options.hidden || designState === true" :style="{ display: displayStyle }"
            :class="[selected && !currentView ? 'selected' : '']">
            <slot></slot>
        </div>
        <div class="field-action" v-if="selected && !currentView">
            <i title="" @click.stop="selectParentWidget(parentWidget)">
                <svg-icon icon-class="el-back" />
            </i>
            <i title="" v-if="parentList && parentList.length > 1" @click.stop="moveUpWidget(parentList, indexOfParentList!)">
                <svg-icon icon-class="el-move-up" />
            </i>
            <i title="" v-if="parentList && parentList.length > 1" @click.stop="moveDownWidget(parentList, indexOfParentList!)">
                <svg-icon icon-class="el-move-down" />
            </i>
            <i title="" @click.stop="deleteWidget">
                <svg-icon icon-class="el-delete" />
            </i>
        </div>
    </div>
</template>

<script setup lang='ts'>
import useDesigner from '@/hooks/useDesigner';
import { useDesignerStore } from '@/store/modules/designer';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const designStore = useDesignerStore()
const { selectedId } = storeToRefs(designStore)

const { selectParentWidget, moveUpWidget, moveDownWidget, removeWidget } = useDesigner()

const props = defineProps({
    field: {
        type: Object,
        default: () => { }
    },
    designState: {
        type: Boolean,
        default: false
    },
    displayStyle: {
        type: String,
        default: 'block'
    },
    parentList: {
        type: Array,
        default: () => []
    },
    parentWidget: {
        type: Object,
        default: () => { }
    },
    indexOfParentList: Number,
    currentView: {
        type: Boolean,
        default: false
    }
})

const selected = computed(() => {
    return selectedId.value === props.field.id
})

const deleteWidget = () => {
    removeWidget(props.parentList, props.indexOfParentList as number, props.parentWidget)
}
</script>

<style lang='scss' scoped>
.field-wrapper {
    position: relative;

    .content-item {
        display: flex;
        align-items: center;
        min-height: 20px;

        &.selected {
            outline: 2px solid $--color-primary;
        }
    }

    .field-action {
        position: absolute;
        bottom: 0;
        right: -2px;
        height: 22px;
        line-height: 22px;
        background: $--color-primary;
        z-index: 9;

        i {
            font-size: 14px;
            color: #fff;
            margin: 0 5px;
            cursor: pointer;
        }
    }
}
</style>