<template>
    <el-container class="main-container">
        <el-header class="main-header">
            <div class="float-left">
                <span>zl-lowCode</span>
            </div>
            <div class="float-right">
                <el-dropdown :hide-timeout="2000" class="drop-down">
                    <span class="el-dropdown-link">
                        简体中文
                        <svg-icon icon-class="el-arrow-down" />
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="zh-CN">简体中文</el-dropdown-item>
                            <el-dropdown-item command="en-US">英文</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <a src="javascript:void(0)"><svg-icon icon-class="github" />GitHub</a>
            </div>
        </el-header>


        <el-container class="main-content">
            <el-aside class="aside-left">
                <widgetPanel />
            </el-aside>

            <el-container class="form-weight">
                <el-header class="form-header">
                    <tool-bar />
                </el-header>
                <el-main class="form-main">
                    <widgetForm />
                </el-main>
            </el-container>

            <el-aside class="aside-right">
                <setting-panel />
            </el-aside>
        </el-container>
    </el-container>
</template>

<script setup lang='ts'>
import widgetPanel from '@/components/widget-panel/index.vue'
import widgetForm from '@/components/widget-form/index.vue'
import settingPanel from '@/components/setting-panel/index.vue'
import toolBar from '@/views/ToolBar/index.vue'

</script>

<style lang='scss' scoped>
.main-container {
    .main-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 48px;
        border-bottom: 2px dotted #EBEEF5;

        .float-left {
            font-weight: bold;
        }

        .float-right {
            a {
                color: #606266;
                font-size: 14px;
                cursor: pointer;
            }

            .drop-down {
                line-height: 1.8;
                font-size: 13px;
                padding-right: 8px;
            }
        }

    }

    .main-content {
        .form-weight {
            .form-header {
                height: 42px;
                line-height: 42px;
                margin-bottom: 6px;
            }

            .form-main {
                margin-top: -20px;
                overflow: hidden;
            }
        }
    }

    ::-webkit-scrollbar {
        display: none;
    }

}
</style>