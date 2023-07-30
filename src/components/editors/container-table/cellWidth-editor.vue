<template>
    <el-form-item label="宽度">
        <el-input type="text" v-model="optionModel.cellWidth"></el-input>
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