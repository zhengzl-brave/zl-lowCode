<template>
    <el-scrollbar class="side-scroll-bar" :style="{ height: scrollHeight }">
        <div class="panel-container">
            <el-tabs v-model="currentTab">
                <el-tab-pane name="compLib">
                    <template #label>
                        <span>组件库</span>
                    </template>
                    <el-collapse class="widget-collapse" v-model="activeNames">
                        <el-collapse-item name="1" title="容器">
                            <draggable tag="ul" :list="containers" item-key="key"
                                :group="{ name: 'dragGroup', pull: 'clone', put: false }" ghost-class="ghost" :sort="false"
                                :clone="copyNewContainerWidget" :move="checkWidgetMove">
                                <template #item="{ element: ctn }">
                                    <li class="widget-item" :title="ctn.displayName">
                                        <span>{{ ctn.displayName }}</span>
                                    </li>
                                </template>

                            </draggable>
                        </el-collapse-item>

                        <el-collapse-item name="2" title="基础字段">
                            <draggable tag="ul" :list="basicFields" item-key="key"
                                :group="{ name: 'dragGroup', pull: 'clone', put: false }" ghost-class="ghost" :sort="false"
                                :move="checkFieldMove" :clone="copyNewFieldWidget">
                                <template #item="{ element: fld }">
                                    <li class="widget-item" :title="fld.displayName">
                                        <span>{{ fld.displayName }}</span>
                                    </li>
                                </template>
                            </draggable>
                        </el-collapse-item>

                    </el-collapse>
                </el-tab-pane>
                <el-tab-pane name="fromLib">
                    <template #label>
                        <span>表单模板</span>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>
    </el-scrollbar>
</template>

<script setup lang='ts'>
import { computed, onMounted, reactive, toRefs } from 'vue';
import { containers as panelInfo, basicFields as fieldsInfo } from '@/config/widget-config'
import { generateId } from '@/utils'
import useDesigner from '@/hooks/useDesigner'
const { copyNewContainerWidget, copyNewFieldWidget, checkWidgetMove, checkFieldMove } = useDesigner()
import { bannedWidgets } from '@/config/program'

const state = reactive({
    scrollHeight: '0px',
    currentTab: 'compLib',
    activeNames: ['1', '2', '3']
})

const containers = computed(() => {
    return panelInfo.map(item => ({
        ...item,
        key: generateId()
    })).filter(v => !v.internal)
})

const basicFields = computed(() => {
    return fieldsInfo.map(item => ({
        ...item,
        key: generateId()
    })).filter(v => !bannedWidgets.includes(v.type))
})

const { scrollHeight, currentTab, activeNames } = toRefs(state)
onMounted(() => {
    state.scrollHeight = window.innerHeight - 52 + 'px'
})
</script>

<style lang='scss' scoped>
.side-scroll-bar {
    width: 260px;
    box-sizing: border-box;
    padding: 0 12px;

    .panel-container {
        .widget-collapse {

            ul {
                display: flex;
                justify-content: space-between;
                list-style: none;
                flex-wrap: wrap;
            }

            .widget-item {
                width: calc(50% - 10px);
                border: 1px solid #e8e9eb;
                text-align: center;
                box-sizing: border-box;
                margin: 5px;
                padding: 3px 0;
                border-radius: 5px;
                cursor: move;
            }
        }
    }
}
</style>