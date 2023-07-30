<template>
    <field-wrapper :field="field" :design-state="designState" :display-style="field.options.displayStyle"
        :parent-list="parentList" :parent-widget="parentWidget" :index-of-parent-list="indexOfParentList">
        <div ref="fieldEditor" v-html="field.options.htmlContent"></div>
    </field-wrapper>
</template>

<script setup lang='ts'>

import fieldWrapper from '../common/field-wrapper.vue';
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