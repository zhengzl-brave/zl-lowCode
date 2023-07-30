import { defineAsyncComponent } from 'vue'
const compConts = import.meta.glob('./containers/*.vue')
const compFieles = import.meta.glob('./fields/*.vue')
const compEditors = import.meta.glob('./editors/**/*.vue')
const compRender = import.meta.glob('./form-render/container-item/*.vue')
const allComps = {...compConts, ...compFieles, ...compEditors, ...compRender}

export default function install(app: any) {
    for (const [key, value] of Object.entries(allComps)) {
        // 注册组件名字 约定文件名称即为组件的名称
        const name = key.substring(key.lastIndexOf('/')+1, key.lastIndexOf('.'))
        app.component(name, defineAsyncComponent(value as any));
    }
    
}