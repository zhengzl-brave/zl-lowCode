import{K as h,L as o,bk as n,d as m,T as g,c,Q as $,at as p,aY as N,o as _,b as x,w as C,v as j,n as v,f,x as O,m as w,a3 as E,as as k}from"./index-eea24952.js";const K=Symbol("rowContextKey"),S=h({tag:{type:String,default:"div"},span:{type:Number,default:24},offset:{type:Number,default:0},pull:{type:Number,default:0},push:{type:Number,default:0},xs:{type:o([Number,Object]),default:()=>n({})},sm:{type:o([Number,Object]),default:()=>n({})},md:{type:o([Number,Object]),default:()=>n({})},lg:{type:o([Number,Object]),default:()=>n({})},xl:{type:o([Number,Object]),default:()=>n({})}}),B=m({name:"ElCol"}),L=m({...B,props:S,setup(b){const t=b,{gutter:u}=g(K,{gutter:c(()=>0)}),a=$("col"),d=c(()=>{const e={};return u.value&&(e.paddingLeft=e.paddingRight=`${u.value/2}px`),e}),i=c(()=>{const e=[];return["span","offset","pull","push"].forEach(s=>{const l=t[s];p(l)&&(s==="span"?e.push(a.b(`${t[s]}`)):l>0&&e.push(a.b(`${s}-${t[s]}`)))}),["xs","sm","md","lg","xl"].forEach(s=>{p(t[s])?e.push(a.b(`${s}-${t[s]}`)):N(t[s])&&Object.entries(t[s]).forEach(([l,r])=>{e.push(l!=="span"?a.b(`${s}-${l}-${r}`):a.b(`${s}-${r}`))})}),u.value&&e.push(a.is("guttered")),[a.b(),e]});return(e,y)=>(_(),x(w(e.tag),{class:v(f(i)),style:O(f(d))},{default:C(()=>[j(e.$slots,"default")]),_:3},8,["class","style"]))}});var P=E(L,[["__file","/home/runner/work/element-plus/element-plus/packages/components/col/src/col.vue"]]);const I=k(P);export{I as E,K as r};
