import{d as M,a as U,u as V,s as G,h as q,c as k,i as d,j as R,o as g,b as C,w as x,k as a,l as w,m as z,p as r,q as h,f as l,g as m,t as c,e as L,_ as F}from"./index-eea24952.js";import{E as J}from"./el-col-97c48648.js";const K={class:"form-widget-list"},Q={key:0,class:"gridcol-action"},X=M({__name:"grid-col-widget",props:{widget:{type:Object,default:()=>{}},parentWidget:{type:Object,default:()=>{}},parentList:{type:Array,default:()=>[]},indexOfParentList:Number,colHeight:String},setup(i){const e=i,{checkWidgetMove:W,setSelectId:u,selectParentWidget:P,moveUpWidget:H,moveDownWidget:O,cloneGridCol:b,removeWidget:I,emitHistoryChange:f}=U(),S=V(),{selectedId:v,formConfig:y}=G(S),s=q({span:e.widget.options.span||12,offset:e.widget.options.offset||0,push:e.widget.options.push||0,pull:e.widget.options.pull||0}),$=k(()=>e.widget.id===v.value),B=k(()=>e.colHeight?{height:e.colHeight+"px"}:{}),D=t=>{W(t)},N=()=>{I(e.parentList,e.indexOfParentList,e.parentWidget)},T=(t,n)=>{const p=t.newIdx;n[p]&&u(n[p]),f()},j=()=>{f()};return d(()=>e.widget.options.span,t=>{s.span=t}),d(()=>e.widget.options.md,t=>{s.span=t}),d(()=>e.widget.options.sm,t=>{s.span=t}),d(()=>e.widget.options.xs,t=>{s.span=t}),d(()=>e.widget.options.offset,t=>{s.offset=t}),d(()=>e.widget.options.push,t=>{s.push=t}),d(()=>e.widget.options.pull,t=>{s.pull=t}),d(()=>y.value.layoutType,t=>{e.widget.options.responsive?t==="H5"?s.span=e.widget.options.xs||12:t==="Pad"?s.span=e.widget.options.sm||12:s.span=e.widget.options.md||12:s.span=e.widget.options.span||12},{immediate:!0}),d(()=>e.widget.options.responsive,t=>{let n=y.value.layoutType;t?n==="H5"?s.span=e.widget.options.xs||12:n==="Pad"?s.span=e.widget.options.sm||12:s.span=e.widget.options.md||12:s.span=e.widget.options.span||12}),(t,n)=>{const p=R("draggable"),A=J;return i.widget.type==="grid-col"?(g(),C(A,h({class:"grid-cell",key:i.widget.id},s,{class:[$.value?"selected":""],onClick:n[5]||(n[5]=L(o=>l(u)(i.widget),["stop"])),style:B.value}),{default:x(()=>[a(p,h({list:i.widget.widgetList,"item-key":"id"},{group:"dragGroup",ghostClass:"ghost",animation:200},{tag:"div","component-data":{name:"fade"},handle:".drag-handler",move:D,onAdd:n[0]||(n[0]=o=>T(o,i.widget.widgetList)),onUpdate:j}),{item:x(({element:o,index:E})=>[w("div",K,[o.category==="container"?(g(),C(z(o.type+"-widget"),{widget:o,key:o.id,"parent-list":i.widget.widgetList,"index-of-parent-list":E,"parent-widget":i.widget},null,8,["widget","parent-list","index-of-parent-list","parent-widget"])):r("",!0)])]),_:1},16,["list"]),l(v)===i.widget.id&&i.widget.type==="grid-col"?(g(),m("div",Q,[w("i",{title:"",onClick:n[1]||(n[1]=L(o=>l(P)(i.parentWidget),["stop"]))},[a(c,{"icon-class":"el-back"})]),i.parentList&&i.parentList.length>1?(g(),m("i",{key:0,title:"",onClick:n[2]||(n[2]=o=>l(H)(i.parentList,i.indexOfParentList))},[a(c,{"icon-class":"el-move-up"})])):r("",!0),i.parentList&&i.parentList.length>1?(g(),m("i",{key:1,title:"",onClick:n[3]||(n[3]=o=>l(O)(i.parentList,i.indexOfParentList))},[a(c,{"icon-class":"el-move-down"})])):r("",!0),w("i",{title:"",onClick:n[4]||(n[4]=o=>l(b)(i.widget,i.parentWidget))},[a(c,{"icon-class":"el-clone"})]),w("i",{title:"",onClick:N},[a(c,{"icon-class":"el-delete"})])])):r("",!0)]),_:1},16,["class","style"])):r("",!0)}}});const _=F(X,[["__scopeId","data-v-38e97dbc"]]);export{_ as default};
