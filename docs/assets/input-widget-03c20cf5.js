import{d as s,h as f,o as u,b as r,w as c,k as m,ap as p}from"./index-eea24952.js";import{E as h}from"./el-input-f2960fb7.js";import{f as w}from"./form-item-wrapper-adbff8b1.js";import"./el-form-item-4ed993c7.js";const F=s({__name:"input-widget",props:{field:{type:Object,default:()=>{}},designState:{type:Boolean,default:!1},parentList:{type:Array,default:()=>[]},parentWidget:{type:Object,default:()=>{}},rules:{type:Array,default:()=>[]},indexOfParentList:Number},setup(e){const t=e,n=f({oldFieldValue:null}),o=l=>{n.oldFieldValue=p(t.field.options.defaultValue),t.field.options.onFocus&&new Function("event",t.field.options.onFocus).call(this,l)};return(l,i)=>{const a=h;return u(),r(w,{field:e.field,rules:e.rules,"parent-list":e.parentList,"parent-widget":e.parentWidget,"index-of-parent-list":e.indexOfParentList,"design-state":e.designState},{default:c(()=>[m(a,{"show-password":e.field.options.showPassword,placeholder:e.field.options.placeholder,clearable:e.field.options.clearable,minlength:e.field.options.minLength,maxlength:e.field.options.maxLength,"show-word-limit":e.field.options.showWordLimit,"prefix-icon":e.field.options.prefixIcon,"suffix-icon":e.field.options.suffixIcon,disabled:e.field.options.disabled,readonly:e.field.options.readonly,size:e.field.options.size||"default",type:e.field.options.type,modelValue:e.field.options.defaultValue,"onUpdate:modelValue":i[0]||(i[0]=d=>e.field.options.defaultValue=d),onFocus:o},null,8,["show-password","placeholder","clearable","minlength","maxlength","show-word-limit","prefix-icon","suffix-icon","disabled","readonly","size","type","modelValue"])]),_:1},8,["field","rules","parent-list","parent-widget","index-of-parent-list","design-state"])}}});export{F as default};