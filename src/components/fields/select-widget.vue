<template>
    <form-item-wrapper :field="field" :rules="rules" :parent-list="parentList" :parent-widget="parentWidget"
        :index-of-parent-list="indexOfParentList" :design-state="designState">
        <el-select ref="fieldEditor" v-model="field.options.defaultValue" class="full-width-input"
            :disabled="field.options.disabled" :size="field.options.size" :clearable="field.options.clearable"
            :filterable="field.options.filterable" :allow-create="field.options.allowCreate"
            :automatic-dropdown="field.options.automaticDropdown" :multiple="field.options.multiple"
            :multiple-limit="field.options.multipleLimit" :placeholder="field.options.placeholder || '请选择'"
            :remote="field.options.remote" :default-first-option="allowDefaultFirstOption" @change="handleChnage">
            <el-option v-for="item in field.options.optionItems" :key="item.value" :label="item.label" :value="item.value"
                :disabled="item.disabled">
            </el-option>
        </el-select>
    </form-item-wrapper>
</template>

<script setup lang='ts'>
import { computed } from 'vue';
import formItemWrapper from '../common/form-item-wrapper.vue';
import { useDesignerStore } from '@/store/modules/designer';
import { storeToRefs } from 'pinia';
const designStore = useDesignerStore()
const { selectedWidget } = storeToRefs(designStore)

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
    indexOfParentList: Number,
    formModel: {
        type: Object,
        default: () => { }
    }
})

const allowDefaultFirstOption = computed(() => {
    return props.field.options.filterable && props.field.options.allowCreate
})

const handleChnage = (val: any) => {
    props.formModel[selectedWidget.value.options.name] = val
}

</script>

<style lang='scss' scoped></style>