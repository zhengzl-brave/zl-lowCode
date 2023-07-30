<template>
    <form-item-wrapper :field="field" :rules="rules" :parent-list="parentList" :parent-widget="parentWidget"
        :index-of-parent-list="indexOfParentList" :design-state="designState">
        <el-input type="textarea" ref="fieldEditor" v-model="field.options.defaultValue" :disabled="field.options.disabled"
            :readonly="field.options.readonly" :size="field.options.size || 'default'"
            :placeholder="field.options.placeholder" :rows="field.options.rows" :minlength="field.options.minLength"
            :maxlength="field.options.maxLength" :show-word-limit="field.options.showWordLimit"></el-input>
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
    indexOfParentList: Number
})
</script>

<style lang='scss' scoped></style>