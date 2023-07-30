<template>
    <el-form-item label="显示类型">
        <el-select v-model="optionModel.buttonType">
            <el-option label="default" value=""></el-option>
            <el-option label="primary" value="primary"></el-option>
            <el-option label="success" value="success"></el-option>
            <el-option label="warning" value="warning"></el-option>
            <el-option label="danger" value="danger"></el-option>
            <el-option label="info" value="info"></el-option>
            <el-option label="text" value="text"></el-option>
        </el-select>
    </el-form-item>
</template>

<script setup lang='ts'>
defineProps({
    optionModel: {
        type: Object,
        default: () => { }
    }
})
</script>

<style lang='scss' scoped></style>