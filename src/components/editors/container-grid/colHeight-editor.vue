<template>
    <div>
        <el-form-item label="栅格统一高度(px)">
            <el-input type="number" v-model="optionModel.colHeight" min="0" @input="inputNumberHandler"></el-input>
        </el-form-item>
    </div>
</template>

<script setup lang='ts'>
defineProps({
    optionModel: {
        type: Object,
        default: () =>{}
    }
})

const inputNumberHandler = (value: any) => {
    // 去掉非数字
    value = value.replace(/[^0-9]/gi, '')
}
</script>

<style lang='scss' scoped></style>