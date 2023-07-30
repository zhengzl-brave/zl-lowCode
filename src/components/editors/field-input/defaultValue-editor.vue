<template>
    <el-form-item label="默认值">
        <el-input type="text" v-model="optionModel.defaultValue" @change="emitInput"></el-input>
    </el-form-item>
</template>

<script setup lang='ts'>
import { useDesignerStore } from '@/store/modules/designer';
import { storeToRefs } from 'pinia';
defineProps({
    optionModel: {
        type: Object,
        default: () => {}
    }
})

const designerStore = useDesignerStore()
const { selectedWidget } = storeToRefs(designerStore)

const changeValue = (val: string) => {
    designerStore.setDesignStore('selectedWidget',
            { ...selectedWidget.value, options: { ...selectedWidget.value.options, defaultValue: val } })
}

const emitInput = (newVal: string) => {
    changeValue(newVal)
}
</script>

<style lang='scss' scoped></style>