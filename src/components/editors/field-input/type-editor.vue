<template>
    <el-form-item label="显示类型" v-if="selectedWidget.type === 'input'">
        <el-select v-model="optionModel.type">
            <el-option label="text" value="text"></el-option>
            <el-option label="password" value="password"></el-option>
        </el-select>
    </el-form-item>
</template>

<script setup lang='ts'>
import { useDesignerStore } from '@/store/modules/designer';
import { storeToRefs } from 'pinia';

const designerStore = useDesignerStore()
const { selectedWidget } = storeToRefs(designerStore)

defineProps({
    optionModel: {
        type: Object,
        default: () => {}
    }
})
</script>

<style lang='scss' scoped></style>