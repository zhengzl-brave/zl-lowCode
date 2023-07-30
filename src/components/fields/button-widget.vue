<template>
    <field-wrapper :field="field" :design-state="designState" :display-style="field.options.displayStyle"
        :parent-list="parentList" :parent-widget="parentWidget" :index-of-parent-list="indexOfParentList">
        <el-button :type="field.options.buttonType" :plain="field.options.plain" :round="field.options.round"
            :circle="field.options.circle" :icon="field.options.icon" :disabled="field.options.disabled" :style="btnStyle">
            {{ field.options.label }}
        </el-button>
    </field-wrapper>
</template>

<script setup lang='ts'>
import { computed } from 'vue';
import fieldWrapper from '../common/field-wrapper.vue';
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
    indexOfParentList: Number
})

const btnStyle = computed(() => {
    return { 'width': props.field.options.columnWidth }
})

</script>

<style lang='scss' scoped></style>