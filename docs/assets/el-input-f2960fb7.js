import{aW as ze,c as f,bi as Ke,ao as ke,U as T,aU as X,i as Z,bj as je,at as xe,K as We,N as Ue,L as te,aE as we,bk as Ye,ax as se,aD as ae,d as Pe,O as Xe,af as Ze,R as qe,aG as Ge,Z as Qe,ay as Je,Q as Se,bl as et,bm as tt,bn as at,aw as ot,aT as nt,V as F,W as Ce,a6 as st,ah as lt,a8 as rt,ai as it,o as m,g as S,p as y,F as oe,n as b,f as t,v as W,l as V,b as I,w as A,m as U,a1 as B,q as ne,k as ut,M as ct,e as dt,bo as pt,z as Y,x as ft,a3 as vt,aY as Ie,as as mt}from"./index-eea24952.js";const yt=()=>ze&&/firefox/i.test(window.navigator.userAgent),ht=o=>/([\uAC00-\uD7AF\u3130-\u318F])+/gi.test(o),bt=["class","style"],gt=/^on[A-Z]/,xt=(o={})=>{const{excludeListeners:v=!1,excludeKeys:i}=o,a=f(()=>((i==null?void 0:i.value)||[]).concat(bt)),r=ke();return r?f(()=>{var l;return Ke(Object.entries((l=r.proxy)==null?void 0:l.$attrs).filter(([u])=>!a.value.includes(u)&&!(v&&gt.test(u))))}):f(()=>({}))};function wt(o){const v=T();function i(){if(o.value==null)return;const{selectionStart:r,selectionEnd:l,value:u}=o.value;if(r==null||l==null)return;const x=u.slice(0,Math.max(0,r)),c=u.slice(Math.max(0,l));v.value={selectionStart:r,selectionEnd:l,value:u,beforeTxt:x,afterTxt:c}}function a(){if(o.value==null||v.value==null)return;const{value:r}=o.value,{beforeTxt:l,afterTxt:u,selectionStart:x}=v.value;if(l==null||u==null||x==null)return;let c=r.length;if(r.endsWith(u))c=r.length-u.length;else if(r.startsWith(l))c=l.length;else{const g=l[x-1],d=r.indexOf(g,x-1);d!==-1&&(c=d+1)}o.value.setSelectionRange(c,c)}return[i,a]}function St(o,{afterFocus:v,afterBlur:i}={}){const a=ke(),{emit:r}=a,l=X(),u=T(!1),x=d=>{u.value||(u.value=!0,r("focus",d),v==null||v())},c=d=>{var p;d.relatedTarget&&((p=l.value)!=null&&p.contains(d.relatedTarget))||(u.value=!1,r("blur",d),i==null||i())},g=()=>{var d;(d=o.value)==null||d.focus()};return Z(l,d=>{d&&(d.setAttribute("role","button"),d.setAttribute("tabindex","-1"))}),je(l,"click",g),{wrapperRef:l,isFocused:u,handleFocus:x,handleBlur:c}}let w;const Ct=`
  height:0 !important;
  visibility:hidden !important;
  ${yt()?"":"overflow:hidden !important;"}
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
`,It=["letter-spacing","line-height","padding-top","padding-bottom","font-family","font-weight","font-size","text-rendering","text-transform","width","text-indent","padding-left","padding-right","border-width","box-sizing"];function Et(o){const v=window.getComputedStyle(o),i=v.getPropertyValue("box-sizing"),a=Number.parseFloat(v.getPropertyValue("padding-bottom"))+Number.parseFloat(v.getPropertyValue("padding-top")),r=Number.parseFloat(v.getPropertyValue("border-bottom-width"))+Number.parseFloat(v.getPropertyValue("border-top-width"));return{contextStyle:It.map(u=>`${u}:${v.getPropertyValue(u)}`).join(";"),paddingSize:a,borderSize:r,boxSizing:i}}function Ee(o,v=1,i){var a;w||(w=document.createElement("textarea"),document.body.appendChild(w));const{paddingSize:r,borderSize:l,boxSizing:u,contextStyle:x}=Et(o);w.setAttribute("style",`${x};${Ct}`),w.value=o.value||o.placeholder||"";let c=w.scrollHeight;const g={};u==="border-box"?c=c+l:u==="content-box"&&(c=c-r),w.value="";const d=w.scrollHeight-r;if(xe(v)){let p=d*v;u==="border-box"&&(p=p+r+l),c=Math.max(p,c),g.minHeight=`${p}px`}if(xe(i)){let p=d*i;u==="border-box"&&(p=p+r+l),c=Math.min(p,c)}return g.height=`${c}px`,(a=w.parentNode)==null||a.removeChild(w),w=void 0,g}const zt=We({id:{type:String,default:void 0},size:Ue,disabled:Boolean,modelValue:{type:te([String,Number,Object]),default:""},type:{type:String,default:"text"},resize:{type:String,values:["none","both","horizontal","vertical"]},autosize:{type:te([Boolean,Object]),default:!1},autocomplete:{type:String,default:"off"},formatter:{type:Function},parser:{type:Function},placeholder:{type:String},form:{type:String},readonly:{type:Boolean,default:!1},clearable:{type:Boolean,default:!1},showPassword:{type:Boolean,default:!1},showWordLimit:{type:Boolean,default:!1},suffixIcon:{type:we},prefixIcon:{type:we},containerRole:{type:String,default:void 0},label:{type:String,default:void 0},tabindex:{type:[String,Number],default:0},validateEvent:{type:Boolean,default:!0},inputStyle:{type:te([Object,Array,String]),default:()=>Ye({})}}),kt={[se]:o=>ae(o),input:o=>ae(o),change:o=>ae(o),focus:o=>o instanceof FocusEvent,blur:o=>o instanceof FocusEvent,clear:()=>!0,mouseleave:o=>o instanceof MouseEvent,mouseenter:o=>o instanceof MouseEvent,keydown:o=>o instanceof Event,compositionstart:o=>o instanceof CompositionEvent,compositionupdate:o=>o instanceof CompositionEvent,compositionend:o=>o instanceof CompositionEvent},Pt=["role"],Ft=["id","type","disabled","formatter","parser","readonly","autocomplete","tabindex","aria-label","placeholder","form"],Vt=["id","tabindex","disabled","readonly","autocomplete","aria-label","placeholder","form"],Tt=Pe({name:"ElInput",inheritAttrs:!1}),Nt=Pe({...Tt,props:zt,emits:kt,setup(o,{expose:v,emit:i}){const a=o,r=Xe(),l=Ze(),u=f(()=>{const e={};return a.containerRole==="combobox"&&(e["aria-haspopup"]=r["aria-haspopup"],e["aria-owns"]=r["aria-owns"],e["aria-expanded"]=r["aria-expanded"]),e}),x=f(()=>[a.type==="textarea"?re.b():s.b(),s.m(Fe.value),s.is("disabled",z.value),s.is("exceed",Re.value),{[s.b("group")]:l.prepend||l.append,[s.bm("group","append")]:l.append,[s.bm("group","prepend")]:l.prepend,[s.m("prefix")]:l.prefix||a.prefixIcon,[s.m("suffix")]:l.suffix||a.suffixIcon||a.clearable||a.showPassword,[s.bm("suffix","password-clear")]:K.value&&Q.value},r.class]),c=f(()=>[s.e("wrapper"),s.is("focus",G.value)]),g=xt({excludeKeys:f(()=>Object.keys(u.value))}),{form:d,formItem:p}=qe(),{inputId:le}=Ge(a,{formItemContext:p}),Fe=Qe(),z=Je(),s=Se("input"),re=Se("textarea"),L=X(),C=X(),q=T(!1),N=T(!1),O=T(!1),ie=T(),D=X(a.inputStyle),k=f(()=>L.value||C.value),{wrapperRef:Ve,isFocused:G,handleFocus:H,handleBlur:_}=St(k,{afterBlur(){var e;a.validateEvent&&((e=p==null?void 0:p.validate)==null||e.call(p,"blur").catch(n=>Ce()))}}),ue=f(()=>{var e;return(e=d==null?void 0:d.statusIcon)!=null?e:!1}),R=f(()=>(p==null?void 0:p.validateState)||""),ce=f(()=>R.value&&et[R.value]),Te=f(()=>O.value?tt:at),Ne=f(()=>[r.style,a.inputStyle]),de=f(()=>[a.inputStyle,D.value,{resize:a.resize}]),E=f(()=>ot(a.modelValue)?"":String(a.modelValue)),K=f(()=>a.clearable&&!z.value&&!a.readonly&&!!E.value&&(G.value||q.value)),Q=f(()=>a.showPassword&&!z.value&&!a.readonly&&!!E.value&&(!!E.value||G.value)),P=f(()=>a.showWordLimit&&!!g.value.maxlength&&(a.type==="text"||a.type==="textarea")&&!z.value&&!a.readonly&&!a.showPassword),J=f(()=>E.value.length),Re=f(()=>!!P.value&&J.value>Number(g.value.maxlength)),Me=f(()=>!!l.suffix||!!a.suffixIcon||K.value||a.showPassword||P.value||!!R.value&&ue.value),[$e,Ae]=wt(L);nt(C,e=>{if(Be(),!P.value||a.resize!=="both")return;const n=e[0],{width:h}=n.contentRect;ie.value={right:`calc(100% - ${h+15+6}px)`}});const M=()=>{const{type:e,autosize:n}=a;if(!(!ze||e!=="textarea"||!C.value))if(n){const h=Ie(n)?n.minRows:void 0,j=Ie(n)?n.maxRows:void 0,ge=Ee(C.value,h,j);D.value={overflowY:"hidden",...ge},F(()=>{C.value.offsetHeight,D.value=ge})}else D.value={minHeight:Ee(C.value).minHeight}},Be=(e=>{let n=!1;return()=>{var h;if(n||!a.autosize)return;((h=C.value)==null?void 0:h.offsetParent)===null||(e(),n=!0)}})(M),$=()=>{const e=k.value,n=a.formatter?a.formatter(E.value):E.value;!e||e.value===n||(e.value=n)},ee=async e=>{$e();let{value:n}=e.target;if(a.formatter&&(n=a.parser?a.parser(n):n),!N.value){if(n===E.value){$();return}i(se,n),i("input",n),await F(),$(),Ae()}},pe=e=>{i("change",e.target.value)},fe=e=>{i("compositionstart",e),N.value=!0},ve=e=>{var n;i("compositionupdate",e);const h=(n=e.target)==null?void 0:n.value,j=h[h.length-1]||"";N.value=!ht(j)},me=e=>{i("compositionend",e),N.value&&(N.value=!1,ee(e))},Le=()=>{O.value=!O.value,ye()},ye=async()=>{var e;await F(),(e=k.value)==null||e.focus()},Oe=()=>{var e;return(e=k.value)==null?void 0:e.blur()},De=e=>{q.value=!1,i("mouseleave",e)},He=e=>{q.value=!0,i("mouseenter",e)},he=e=>{i("keydown",e)},_e=()=>{var e;(e=k.value)==null||e.select()},be=()=>{i(se,""),i("change",""),i("clear"),i("input","")};return Z(()=>a.modelValue,()=>{var e;F(()=>M()),a.validateEvent&&((e=p==null?void 0:p.validate)==null||e.call(p,"change").catch(n=>Ce()))}),Z(E,()=>$()),Z(()=>a.type,async()=>{await F(),$(),M()}),st(()=>{!a.formatter&&a.parser,$(),F(M)}),v({input:L,textarea:C,ref:k,textareaStyle:de,autosize:lt(a,"autosize"),focus:ye,blur:Oe,select:_e,clear:be,resizeTextarea:M}),(e,n)=>rt((m(),S("div",ne(t(u),{class:t(x),style:t(Ne),role:e.containerRole,onMouseenter:He,onMouseleave:De}),[y(" input "),e.type!=="textarea"?(m(),S(oe,{key:0},[y(" prepend slot "),e.$slots.prepend?(m(),S("div",{key:0,class:b(t(s).be("group","prepend"))},[W(e.$slots,"prepend")],2)):y("v-if",!0),V("div",{ref_key:"wrapperRef",ref:Ve,class:b(t(c))},[y(" prefix slot "),e.$slots.prefix||e.prefixIcon?(m(),S("span",{key:0,class:b(t(s).e("prefix"))},[V("span",{class:b(t(s).e("prefix-inner"))},[W(e.$slots,"prefix"),e.prefixIcon?(m(),I(t(B),{key:0,class:b(t(s).e("icon"))},{default:A(()=>[(m(),I(U(e.prefixIcon)))]),_:1},8,["class"])):y("v-if",!0)],2)],2)):y("v-if",!0),V("input",ne({id:t(le),ref_key:"input",ref:L,class:t(s).e("inner")},t(g),{type:e.showPassword?O.value?"text":"password":e.type,disabled:t(z),formatter:e.formatter,parser:e.parser,readonly:e.readonly,autocomplete:e.autocomplete,tabindex:e.tabindex,"aria-label":e.label,placeholder:e.placeholder,style:e.inputStyle,form:a.form,onCompositionstart:fe,onCompositionupdate:ve,onCompositionend:me,onInput:ee,onFocus:n[0]||(n[0]=(...h)=>t(H)&&t(H)(...h)),onBlur:n[1]||(n[1]=(...h)=>t(_)&&t(_)(...h)),onChange:pe,onKeydown:he}),null,16,Ft),y(" suffix slot "),t(Me)?(m(),S("span",{key:1,class:b(t(s).e("suffix"))},[V("span",{class:b(t(s).e("suffix-inner"))},[!t(K)||!t(Q)||!t(P)?(m(),S(oe,{key:0},[W(e.$slots,"suffix"),e.suffixIcon?(m(),I(t(B),{key:0,class:b(t(s).e("icon"))},{default:A(()=>[(m(),I(U(e.suffixIcon)))]),_:1},8,["class"])):y("v-if",!0)],64)):y("v-if",!0),t(K)?(m(),I(t(B),{key:1,class:b([t(s).e("icon"),t(s).e("clear")]),onMousedown:dt(t(pt),["prevent"]),onClick:be},{default:A(()=>[ut(t(ct))]),_:1},8,["class","onMousedown"])):y("v-if",!0),t(Q)?(m(),I(t(B),{key:2,class:b([t(s).e("icon"),t(s).e("password")]),onClick:Le},{default:A(()=>[(m(),I(U(t(Te))))]),_:1},8,["class"])):y("v-if",!0),t(P)?(m(),S("span",{key:3,class:b(t(s).e("count"))},[V("span",{class:b(t(s).e("count-inner"))},Y(t(J))+" / "+Y(t(g).maxlength),3)],2)):y("v-if",!0),t(R)&&t(ce)&&t(ue)?(m(),I(t(B),{key:4,class:b([t(s).e("icon"),t(s).e("validateIcon"),t(s).is("loading",t(R)==="validating")])},{default:A(()=>[(m(),I(U(t(ce))))]),_:1},8,["class"])):y("v-if",!0)],2)],2)):y("v-if",!0)],2),y(" append slot "),e.$slots.append?(m(),S("div",{key:1,class:b(t(s).be("group","append"))},[W(e.$slots,"append")],2)):y("v-if",!0)],64)):(m(),S(oe,{key:1},[y(" textarea "),V("textarea",ne({id:t(le),ref_key:"textarea",ref:C,class:t(re).e("inner")},t(g),{tabindex:e.tabindex,disabled:t(z),readonly:e.readonly,autocomplete:e.autocomplete,style:t(de),"aria-label":e.label,placeholder:e.placeholder,form:a.form,onCompositionstart:fe,onCompositionupdate:ve,onCompositionend:me,onInput:ee,onFocus:n[2]||(n[2]=(...h)=>t(H)&&t(H)(...h)),onBlur:n[3]||(n[3]=(...h)=>t(_)&&t(_)(...h)),onChange:pe,onKeydown:he}),null,16,Vt),t(P)?(m(),S("span",{key:0,style:ft(ie.value),class:b(t(s).e("count"))},Y(t(J))+" / "+Y(t(g).maxlength),7)):y("v-if",!0)],64))],16,Pt)),[[it,e.type!=="hidden"]])}});var Rt=vt(Nt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/input/src/input.vue"]]);const At=mt(Rt);export{At as E,ht as i};