<template>
    <el-form-item label="必填字段">
        <el-switch v-model="optionModel.required"></el-switch>
    </el-form-item>
</template>

<script setup lang='ts'>
defineProps({
    optionModel: {
        type: Object,
        default: () => {}
    }
})
</script>

<style lang='scss' scoped></style>