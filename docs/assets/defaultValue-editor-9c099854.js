import{d as i,u as p,s as m,o as c,b as f,w as _,k as V,aq as g}from"./index-eea24952.js";import"./el-form-item-4ed993c7.js";import{E as x}from"./el-input-f2960fb7.js";const E=i({__name:"defaultValue-editor",props:{optionModel:{type:Object,default:()=>{}}},setup(t){const o=p(),{selectedWidget:a}=m(o),n=e=>{o.setDesignStore("selectedWidget",{...a.value,options:{...a.value.options,defaultValue:e}})},s=e=>{n(e)};return(e,l)=>{const u=x,d=g;return c(),f(d,{label:"默认值"},{default:_(()=>[V(u,{type:"text",modelValue:t.optionModel.defaultValue,"onUpdate:modelValue":l[0]||(l[0]=r=>t.optionModel.defaultValue=r),onChange:s},null,8,["modelValue"])]),_:1})}}});export{E as default};
