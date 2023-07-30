<template>
    <el-form-item label="标签" v-if="isShow">
        <el-input type="text" v-model="optionModel.label"></el-input>
    </el-form-item>
</template>

<script setup lang='ts'>
import { useDesignerStore } from '@/store/modules/designer';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const props = defineProps({
    optionModel: {
        type: Object,
        default: () => {}
    }
})
const designStore = useDesignerStore()
const { selectedWidget } = storeToRefs(designStore)

const isShow = computed(() => {
    return !selectedWidget.value.category && selectedWidget.value.type !== 'html-text'
})
</script>

<style lang='scss' scoped></style>