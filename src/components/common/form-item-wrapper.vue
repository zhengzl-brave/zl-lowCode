<template>
    <div class="field-wrapper">
        <el-form-item v-if="!!field.formItemFlag && (!field.options.hidden || (designState === true))" :label="label"
            :label-width="labelWidth + 'px'" :title="field.options.labelTooltip" :rules="rules" :prop="getPropName()"
            :class="[selected && !currentView ? 'selected' : '']">
            <template #label>
                <span class="custom-label">
                    {{ label }}
                </span>
            </template>
            <slot></slot>
        </el-form-item>

        <div class="field-action" v-if="selected && !currentView">
            <i title="" @click="selectParentWidget(parentWidget)">
                <svg-icon icon-class="el-back" />
            </i>
            <i v-if="parentList && parentList.length > 1" title="" @click="moveUpWidget(parentList, indexOfParentList!)">
                <svg-icon icon-class="el-move-up" />
            </i>
            <i v-if="parentList && parentList.length > 1" title="" @click="moveDownWidget(parentList, indexOfParentList!)">
                <svg-icon icon-class="el-move-down" />
            </i>
            <i title="" @click="deleteWidget">
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
    parentList: {
        type: Array,
        default: () => []
    },
    parentWidget: {
        type: Object,
        default: () => { }
    },
    indexOfParentList: Number,
    rules: {
        type: Array,
        default: () => []
    },
    subFormRowIndex: { /* 子表单组件行索引，从0开始计数 */
        type: Number,
        default: -1
    },
    subFormColIndex: { /* 子表单组件列索引，从0开始计数 */
        type: Number,
        default: -1
    },
    subFormRowId: { /* 子表单组件行Id，唯一id且不可变 */
        type: String,
        default: ''
    },
    currentView: {
        type: Boolean,
        default: false
    }
})

const designStore = useDesignerStore()
const { selectedId } = storeToRefs(designStore)

const label = computed(() => props.field.options.labelHidden ? '' : props.field.options.label)

const selected = computed(() => selectedId.value === props.field.id)

const labelWidth = computed(() => {
    if (props.field.options.labelWidth) {
        return props.field.options.labelWidth
    } else if (props.field.options.labelHidden) {
        return 0
    } else {
        return 120
    }
})

const subFormName = () => {
    return !!props.parentWidget ? props.parentWidget.options.name : ''
}
const subFormItemFlag = computed(() => {
    return props.parentWidget ? props.parentWidget.type === 'sub-form' : false
})

const getPropName = () => {
    if (subFormItemFlag.value && !props.designState) {
        return subFormName + "." + props.subFormRowIndex + "." + props.field.options.name + ""
    } else {
        return props.field.options.name
    }
}

const deleteWidget = () => {
    removeWidget(props.parentList, props.indexOfParentList as number, props.parentWidget)
}
</script>

<style lang='scss' scoped>
.field-wrapper {
    position: relative;

    .el-form-item {
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
            margin: 0 3px;
            cursor: pointer;
        }
    }
}
</style>