<template>
    <el-form-item label="组件宽度">
        <el-input type="text" v-model="optionModel.columnWidth"></el-input>
    </el-form-item>
</template>

<script setup lang='ts'>
const props = defineProps({
    optionModel: {
        type: Object,
        default: () => {}
    }
})
</script>

<style lang='scss' scoped></style>