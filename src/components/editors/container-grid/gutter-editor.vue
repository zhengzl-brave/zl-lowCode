<template>
    <div>
        <el-form-item label-width="0">
            <el-divider class="cusstom-divider">栅格属性设置</el-divider>
        </el-form-item>
        <el-form-item label="栅格间隔(px)">
            <el-input-number v-model="optionModel.gutter" style="width: 100%;"></el-input-number>
        </el-form-item>
        <el-form-item label="当前栅格列："></el-form-item>
        <el-form-item label-width="0">
            <li v-for="(colItem, colIdx) in selectedWidget.cols" :key="colIdx" class="col-item">
                <span class="col-title">栅格宽度{{ colIdx + 1 }}</span>
                <el-input-number v-model.number="colItem.options.span" :min="1" :max="24"
                    class="cell-span-input"></el-input-number>
                <el-button circle plain size="small" type="danger" icon="Minus" class="col-delete-button"
                    @click="deleteColOfGrid(selectedWidget, colIdx)"></el-button>
            </li>
        </el-form-item>
        <div class="add-btn">
            <el-button link type="primary" @click="addNewColOfGrid(selectedWidget)">增加栅格</el-button>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { useDesignerStore } from '@/store/modules/designer';
import useDesigner from '@/hooks/useDesigner';
import { storeToRefs } from 'pinia';

const designerStore = useDesignerStore()
const { selectedWidget } = storeToRefs(designerStore)
const { deleteColOfGrid, addNewColOfGrid } = useDesigner()

defineProps({
    optionModel: {
        type: Object,
        default: () => { }
    }
})
</script>

<style lang='scss' scoped>
.col-item {
    list-style: none;
    display: inline-block;

    .col-title {
        padding-right: 20px;
    }

    .cell-span-input {
        margin: 3px 5px;
    }
}
</style>