<template>
    <div class="ace-container">
        <div class="ace-editor" ref="aceref"></div>
    </div>
</template>

<script setup lang='ts'>
import { onMounted, reactive, ref } from 'vue';
import ace from 'ace-builds'
import 'ace-builds/src-min-noconflict/theme-sqlserver' // 新设主题
import 'ace-builds/src-min-noconflict/mode-javascript' // 默认设置的语言模式
import 'ace-builds/src-min-noconflict/mode-json'
import 'ace-builds/src-min-noconflict/mode-css'
import 'ace-builds/src-min-noconflict/ext-language_tools'

const aceref: any = ref()

const props = defineProps({
    readonly: {
        type: Boolean,
        default: false
    },
    modelValue: {
        type: String
    },
    mode: {
        type: String,
        default: 'javascript'
    },
    // 是否开启语法检测
    userWorker: {
        type: Boolean,
        default: true
    }
})

const emit = defineEmits(['update:modelValue'])

const state = reactive({
    aceEditor: null as any,
    themePath: 'ace/theme/sqlserver', // 不导入 webpack-resolver，该模块路径会报错
    modePath: 'ace/mode/javascript', // 同上
})

const setJsonMode = () => {
    state.aceEditor.getSession().setMode('ace/mode/json')
}

const setCssMode = () => {
    state.aceEditor.getSession().setMode('ace/mode/css')
}

const init = () => {
    // 配置模式和主题动态加载
    ace.config.set('basePath', 'https://ks3-cn-beijing.ksyun.com/vform2021/ace')
    state.aceEditor = ace.edit(aceref.value, {
        maxLines: 20, // 最大行数，超过会自动出现滚动条
        minLines: 5, // 最小行数，还未到最大行数时，编辑器会自动伸缩大小
        fontSize: 12, // 编辑器内字体大小
        theme: state.themePath, // 默认设置的主题
        mode: state.modePath, // 默认设置的语言模式
        tabSize: 2, // 制表符设置为2个空格大小
        readOnly: props.readonly,
        highlightActiveLine: true,
        value: props.modelValue
    })

    state.aceEditor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,  // 设置代码片段提示
        enableLiveAutocompletion: true,  // 设置自动提示
    })

    if (props.mode === 'json') {
        setJsonMode()
    } else if (props.mode === 'css') {
        setCssMode()
    }

    if (!props.userWorker) {
        state.aceEditor.getSession().setUseWorker(false)
    }

    // 编辑时同步数据
    state.aceEditor.getSession().on('change', () => {
        emit('update:modelValue', state.aceEditor.getValue())
    })
}

onMounted(() => {
    init()
})



</script>

<style lang='scss' scoped>
.ace-editor {
    min-height: 300px;
}
</style>