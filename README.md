# zl-lowCode

## 关于该项目

- 基于vue3 + typeScript + Element plus 低代码平台

## 插件使用

- 通过使用插件 vuedraggable 完成组件的拖拽功能
   [vuedraggable](https://www.itxst.com/vue-draggable/tutorial.html)

- 通过使用 ace-builds 完成文本编辑
   [ace-builds](https://github.com/ajaxorg/ace)

- 通过使用 js-beautify 完成编辑器代码格式化和美化效果
   [js-beautify](https://github.com/beautify-web/js-beautify)

- 全局数据共享使用的是pinia
   [pinia](https://pinia.web3doc.top/)

## 项目结构说明

- views/FormDesign: 项目布局相关
- components/common: 文本编辑组件，不同类型微件的外部容器组件，图标组件
- components/containers: 容器的微件部分，用于拖拽后展示，组件命名：微件type属性 + '-widget'
- components/fields: 基础字段微件展示，组件命名：微件type属性 + '-widget'
- components/editors: 右侧面板编辑组件，组件自动引入的，命名格式： 微件options属性 + '-editor'
- components/form-render: 关于组件预览部分，其中容器组件预览和拖拽展示有所区别，单独封装，格式：微件type属性 + '-item'
- components/setting-panel: 右侧面板组件，可以通过表单编辑设置微件的属性信息
- components/widget-from：中间拖拽结果展示
- components/widget-panel: 左侧面板组件，展示当前有的容器及字段微件

## 安装

```
pnpm i

pnpm dev

pnpm build

```
