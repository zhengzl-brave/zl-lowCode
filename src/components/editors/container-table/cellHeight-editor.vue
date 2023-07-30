<template>
    <el-form-item label="高度">
        <el-input type="text" v-model="optionModel.cellHeight"></el-input>
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