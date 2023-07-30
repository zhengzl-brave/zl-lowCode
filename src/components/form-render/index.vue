<template>
    <el-form label-position="left" size="default" class="render-form" :model="formDataModel" ref="renderForm"
        @submit.prevent>
        <template v-for="(widget, index) in widgetList" :key="widget.id">
            <component v-if="'container' === widget.category" :key="widget.id" :is="widget.type + '-item'" :widget="widget"
                :parent-list="widgetList" :index-of-parent-list="index" :parent-widget="null">
                <template v-for="slot in Object.keys($slots)" v-slot:[slot]="scope">
                    <slot :name="slot" v-bind="scope"></slot>
                </template>
            </component>

            <component v-else :is="widget.type + '-widget'" :field="widget" :form-model="formDataModel" :parent-list="widgetList"
                :index-of-parent-list="index" :parent-widget="null" :current-view="currentViewState">
                <template v-for="slot in Object.keys($slots)" v-slot:[slot]="scope">
                    <slot :name="slot" v-bind="scope" />
                </template>
            </component>
        </template>
    </el-form>
</template>

<script setup lang='ts'>
import { computed, reactive, toRefs } from 'vue';
import { buildDefaultFormJson } from '@/utils'
const state = reactive({
    formDataModel: {}
})

const props = defineProps({
    formJson: {
        type: Object,
        default: () => buildDefaultFormJson()
    },
    currentViewState: {
        type: Boolean,
        default: false
    }
})


const widgetList = computed(() => {
    return props.formJson!.widgetList
})

const { formDataModel } = toRefs(state)
</script>

<style lang='scss' scoped></style>