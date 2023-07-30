<template>
    <el-form-item prop="name" :rules="nameRules">
        <template #label>
            <span>唯一名称</span>
            <el-tooltip effect="light" content="修改名称后需按回车键确认">
                <svg-icon icon-class="el-info" style="margin-top: 5px;" /></el-tooltip>
        </template>
        <template v-if="selectedWidget">
            <el-input type="text" v-model="optionModel.name" @change="changeInput"></el-input>
        </template>

    </el-form-item>
</template>

<script setup lang='ts'>
import { useDesignerStore } from '@/store/modules/designer';
import { deepClone } from '@/utils';
import { ElMessage } from 'element-plus';
import { storeToRefs } from 'pinia';
defineProps({
    optionModel: {
        type: Object,
        default: () => { }
    }
})

const designerStore = useDesignerStore()
const { selectedWidget } = storeToRefs(designerStore)

const nameRules = [{ required: true, message: 'name required' }]

const changeName = (val: string) => {
    designerStore.setDesignStore('selectedWidget',
            { ...selectedWidget.value, options: { ...selectedWidget.value.options, name: val } })
}

const oldName = deepClone(selectedWidget.value).options.name

const changeInput = (newName: string) => {
    
    if (newName === oldName) return
    if (!newName) {
        changeName(oldName)
        ElMessage.info('名称是必填的')
        return
    }
    changeName(newName)
}
</script>

<style lang='scss' scoped></style>