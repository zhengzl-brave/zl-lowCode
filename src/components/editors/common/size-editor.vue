<template>
    <el-form-item label="组件大小">
        <el-select v-model="optionModel.size">
            <el-option v-for="item in state.widgetSize" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
    </el-form-item>
</template>

<script setup lang='ts'>
import { reactive } from 'vue';

defineProps({
    optionModel: {
        type: Object,
        default: () => { }
    }
})
const state = reactive({
    widgetSize: [
        { label: 'default', value: '' },
        { label: 'large', value: 'large' },
        { label: 'small', value: 'small' }
    ]
})
</script>

<style lang='scss' scoped></style>