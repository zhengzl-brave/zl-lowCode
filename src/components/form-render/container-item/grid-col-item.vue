<template>
    <el-col class="grid-cell" :key="widget.id" v-bind="layoutProps" :style="colHeightStyle">
        <template v-for="(subWidget, swIdx) in widget.widgetList">
            <component v-if="subWidget.category === 'container'" :is="subWidget.type + '-item'" :key="widget.id"
                :parent-list="widget.widgetList" :index-of-parent-list="swIdx" :widget="subWidget">
                <!-- 递归传递插槽 -->
                <template v-for="slot in Object.keys($slots)" v-slot:[slot]="scope">
                    <slot :name="slot" v-bind="scope" />
                </template>
            </component>
        </template>
    </el-col>
</template>

<script setup lang='ts'>
import { useDesignerStore } from '@/store/modules/designer';
import { storeToRefs } from 'pinia';
import { computed, reactive, toRefs } from 'vue';

const props = defineProps({
    widget: {
        type: Object,
        default: () => { }
    },
    colHeight: {
        type: String,
        default: '0px'
    }
})

const state = reactive({
    layoutProps: {
        span: props.widget.options.span,
        md: props.widget.options.md || 12,
        sm: props.widget.options.sm || 12,
        xs: props.widget.options.xs || 12,
        offset: props.widget.options.offset || 0,
        push: props.widget.options.push || 0,
        pull: props.widget.options.pull || 0,
    }
})

const { layoutProps } = toRefs(state)

const designerStore = useDesignerStore()
const { formConfig } = storeToRefs(designerStore)

const colHeightStyle = computed(() => {
    return props.colHeight ? { height: props.colHeight + 'px' } : {}
})

const initLayoutProps = () => {
    if (props.widget.options.responsive) {
        let lyType = formConfig.value.layoutType
        if (lyType === 'H5') {
            state.layoutProps.span = props.widget.options.xs || 12
        } else if (lyType === 'Pad') {
            state.layoutProps.span = props.widget.options.sm || 12
        } else {
            state.layoutProps.span = props.widget.options.md || 12
        }
    }
}
initLayoutProps()
</script>

<style lang='scss' scoped></style>