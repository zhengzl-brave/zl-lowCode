<template>
    <el-form-item label="HTML"></el-form-item>
    <el-form-item label-width="0">
        <el-input type="textarea" v-model="optionModel.htmlContent" :row="5" class="html-content-editor"></el-input>
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