<template>
    <form-item-wrapper :field="field" :rules="rules" :parent-list="parentList" :parent-widget="parentWidget"
        :index-of-parent-list="indexOfParentList" :design-state="designState">
        <el-input :show-password="field.options.showPassword" :placeholder="field.options.placeholder"
            :clearable="field.options.clearable" :minlength="field.options.minLength" :maxlength="field.options.maxLength"
            :show-word-limit="field.options.showWordLimit" :prefix-icon="field.options.prefixIcon"
            :suffix-icon="field.options.suffixIcon" :disabled="field.options.disabled" :readonly="field.options.readonly"
            :size="field.options.size || 'default'" :type="field.options.type"
            v-model="field.options.defaultValue" @focus="handleFocusCustomEvent"></el-input>
    </form-item-wrapper>
</template>

<script setup lang='ts'>
import { deepClone } from '@/utils';
import formItemWrapper from '../common/form-item-wrapper.vue';
import { reactive } from 'vue';
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
    rules: {
        type: Array,
        default: () => []
    },
    indexOfParentList: Number
})


const state = reactive({
    oldFieldValue: null
})

const handleFocusCustomEvent = (event: any) => {
    state.oldFieldValue = deepClone(props.field.options.defaultValue)  //保存修改change之前的值
    if (!!props.field.options.onFocus) {
        let customFn = new Function('event', props.field.options.onFocus)
        customFn.call(this, event)
    }
}
</script>

<style lang='scss' scoped></style>