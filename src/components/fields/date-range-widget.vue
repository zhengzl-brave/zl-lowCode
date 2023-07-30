<template>

    <form-item-wrapper :field="field" :rules="rules" :parent-list="parentList" :parent-widget="parentWidget"
        :index-of-parent-list="indexOfParentList" :design-state="designState">
            <div :class="[field.options.autoFullWidth ? 'auto-full-width' : '']">
                <el-date-picker ref="fieldEditor" :type="field.options.type" v-model="field.options.defaultValue"
                      :disabled="field.options.disabled" :readonly="field.options.readonly"
                      :size="field.options.size"
                      :clearable="field.options.clearable" :editable="field.options.editable"
                      :format="field.options.format" :value-format="field.options.valueFormat"
                      :start-placeholder="field.options.startPlaceholder || '起始时间'"
                      :end-placeholder="field.options.endPlaceholder || '截止时间'"></el-date-picker>
            </div>
        </form-item-wrapper>
</template>

<script setup lang='ts'>
import formItemWrapper from '../common/form-item-wrapper.vue';

defineProps({
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
    rules: {
        type: Array,
        default: () => []
    },
    indexOfParentList: Number,
    formModel: {
        type: Object,
        default: () => { }
    }
})

</script>

<style lang='scss' scoped></style>