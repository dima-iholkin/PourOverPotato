import{s as ye,r as Je,e as te,x as Ue,y as oe,t as kt,k as $t,n as Ge,c as It,o as Bt}from"../chunks/scheduler.AO9fmgJ9.js";import{S as Pe,i as Ve,e as k,k as G,s as S,c as $,a as V,m as j,f as F,x as he,d as m,y as _,g as I,n as z,h as g,E as ce,C as J,q as K,o as W,r as q,t as Q,b as Z,j as je,D as ue,z as ft,F as Ye,G as ot,H as Dt,v as Re,w as Nt,l as Mt}from"../chunks/index.aOryA6iz.js";import{g as St}from"../chunks/entry.0_wvchEv.js";import{p as Ft}from"../chunks/stores.cx0XrwxB.js";import{L as pe,M as yt,T as Ae}from"../chunks/Textarea.GKT8T1gW.js";import{m as Pt,e as Vt,C as Ot,a as Rt,h as At}from"../chunks/indexedDB.b1TVZGZV.js";import{n as ze}from"../chunks/naming.kUvCv0xb.js";import{r as Ht}from"../chunks/routes.7NYnkK08.js";import{e as ut}from"../chunks/each.Ps9lscrY.js";import{M as Lt}from"../chunks/MySidebar.JRmG_Qww.js";async function Ut({url:n}){return{coffeeBeansName:n.searchParams.get("coffee_beans_name")}}const Nn=Object.freeze(Object.defineProperty({__proto__:null,load:Ut},Symbol.toStringTag,{value:"Module"}));function Gt(n){let t;return{c(){t=Q(n[1])},l(e){t=Z(e,n[1])},m(e,l){I(e,t,l)},p(e,l){l&2&&je(t,e[1])},d(e){e&&m(t)}}}function jt(n){let t,e,l,a,s,r='<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2" class="svelte-1srudln"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"></path></svg>',o,i,u,p,v='<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18" class="svelte-1srudln"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"></path></svg>',c,w,E;return e=new pe({props:{_for:n[2],$$slots:{default:[Gt]},$$scope:{ctx:n}}}),{c(){t=k("div"),G(e.$$.fragment),l=S(),a=k("div"),s=k("button"),s.innerHTML=r,o=S(),i=k("input"),u=S(),p=k("button"),p.innerHTML=v,this.h()},l(h){t=$(h,"DIV",{class:!0});var B=V(t);j(e.$$.fragment,B),l=F(B),a=$(B,"DIV",{class:!0});var D=V(a);s=$(D,"BUTTON",{type:!0,id:!0,class:!0,"data-svelte-h":!0}),he(s)!=="svelte-190kxkt"&&(s.innerHTML=r),o=F(D),i=$(D,"INPUT",{id:!0,name:!0,type:!0,class:!0}),u=F(D),p=$(D,"BUTTON",{type:!0,id:!0,class:!0,"data-svelte-h":!0}),he(p)!=="svelte-yebheu"&&(p.innerHTML=v),D.forEach(m),B.forEach(m),this.h()},h(){_(s,"type","button"),_(s,"id","decrement-button"),_(s,"class","minus-button svelte-1srudln"),_(i,"id",n[2]),_(i,"name",n[2]),_(i,"type","text"),_(i,"class","svelte-1srudln"),_(p,"type","button"),_(p,"id","increment-button"),_(p,"class","plus-button svelte-1srudln"),_(a,"class","input-container svelte-1srudln"),_(t,"class","container svelte-1srudln")},m(h,B){I(h,t,B),z(e,t,null),g(t,l),g(t,a),g(a,s),g(a,o),g(a,i),ce(i,n[0]),g(a,u),g(a,p),c=!0,w||(E=[J(s,"click",n[4]),J(i,"input",n[9]),J(i,"keydown",zt),J(i,"focusout",n[3]),J(p,"click",n[5])],w=!0)},p(h,[B]){const D={};B&4&&(D._for=h[2]),B&2050&&(D.$$scope={dirty:B,ctx:h}),e.$set(D),(!c||B&4)&&_(i,"id",h[2]),(!c||B&4)&&_(i,"name",h[2]),B&1&&i.value!==h[0]&&ce(i,h[0])},i(h){c||(K(e.$$.fragment,h),c=!0)},o(h){W(e.$$.fragment,h),c=!1},d(h){h&&m(t),q(e),w=!1,Je(E)}}}function zt(n){const t=n.key;if((t<"0"||t>"9")&&t!=="."&&t!=="Backspace"&&t!=="Delete"&&t!=="ArrowLeft"&&t!=="ArrowRight"){n.preventDefault();return}}function Kt(n,t,e){let{value:l=0}=t,{labelText:a=""}=t,{nameAttr:s=""}=t,{min:r=0}=t,{max:o=Number.MAX_SAFE_INTEGER}=t,{step:i=1}=t;function u(E){c(E.currentTarget.value)}function p(){c(l),l>=r+i&&e(0,l-=i)}function v(){c(l),l<=o-i&&e(0,l+=i)}function c(E){const h=Number(E);if(isNaN(h)){e(0,l=r);return}if(h>o){e(0,l=o);return}if(h<r){e(0,l=r);return}if(h%i!==0){e(0,l=Math.floor(h/i)*i);return}e(0,l=h)}function w(){l=this.value,e(0,l)}return n.$$set=E=>{"value"in E&&e(0,l=E.value),"labelText"in E&&e(1,a=E.labelText),"nameAttr"in E&&e(2,s=E.nameAttr),"min"in E&&e(6,r=E.min),"max"in E&&e(7,o=E.max),"step"in E&&e(8,i=E.step)},[l,a,s,u,p,v,r,o,i,w]}class ct extends Pe{constructor(t){super(),Ve(this,t,Kt,jt,ye,{value:0,labelText:1,nameAttr:2,min:6,max:7,step:8})}}function ge(n,t,e){const l=Qe(n,t);localStorage.setItem(l,e)}function ve(n,t,e){const l=Qe(n,t),a=localStorage.getItem(l);if(a===null)return null;if(e==="number"){const s=Number.parseFloat(a);return Number.isNaN(s)?null:s}return a}function be(n,t){const e=Qe(n,t);localStorage.removeItem(e)}function Qe(n,t){return`form_${n}_${t}`}function Wt(n){let t;return{c(){t=Q("Add new coffee beans")},l(e){t=Z(e,"Add new coffee beans")},m(e,l){I(e,t,l)},d(e){e&&m(t)}}}function qt(n){let t;return{c(){t=Q("Coffee beans name:")},l(e){t=Z(e,"Coffee beans name:")},m(e,l){I(e,t,l)},d(e){e&&m(t)}}}function Xt(n){let t;return{c(){t=Q("Description:")},l(e){t=Z(e,"Description:")},m(e,l){I(e,t,l)},d(e){e&&m(t)}}}function Yt(n){let t,e,l='<span class="material-icons md-18">add</span>',a,s,r,o,i,u,p,v,c,w,E,h,B,D,R,P,Y,H,f,T,O,N,ae,de,ie,L,me="Save",b,ne,re;r=new Lt({props:{asGap:!0}}),u=new yt({props:{$$slots:{default:[Wt]},$$scope:{ctx:n}}}),u.$on("click",n[21]),w=new pe({props:{_for:"name",valid:!n[0],$$slots:{default:[qt]},$$scope:{ctx:n}}}),T=new pe({props:{_for:"description",$$slots:{default:[Xt]},$$scope:{ctx:n}}});function Te(C){n[24](C)}function _e(C){n[25](C)}let se={id:"description",name:"description",placeholder:Jt};return n[5]!==void 0&&(se._this=n[5]),n[8]!==void 0&&(se.value=n[8]),N=new Ae({props:se}),te.push(()=>ue(N,"_this",Te)),te.push(()=>ue(N,"value",_e)),N.$on("keydown",n[14]),{c(){t=S(),e=k("button"),e.innerHTML=l,a=S(),s=k("div"),G(r.$$.fragment),o=S(),i=k("div"),G(u.$$.fragment),p=S(),v=k("form"),c=k("div"),G(w.$$.fragment),E=S(),h=k("input"),R=S(),P=k("p"),Y=Q(n[9]),H=S(),f=k("div"),G(T.$$.fragment),O=S(),G(N.$$.fragment),ie=S(),L=k("button"),L.textContent=me,this.h()},l(C){t=F(C),e=$(C,"BUTTON",{class:!0,"data-svelte-h":!0}),he(e)!=="svelte-1ycn9kv"&&(e.innerHTML=l),a=F(C),s=$(C,"DIV",{class:!0});var M=V(s);j(r.$$.fragment,M),o=F(M),i=$(M,"DIV",{class:!0});var x=V(i);j(u.$$.fragment,x),p=F(x),v=$(x,"FORM",{class:!0});var U=V(v);c=$(U,"DIV",{class:!0});var le=V(c);j(w.$$.fragment,le),E=F(le),h=$(le,"INPUT",{class:!0,id:!0,name:!0,placeholder:!0,type:!0}),R=F(le),P=$(le,"P",{class:!0});var fe=V(P);Y=Z(fe,n[9]),fe.forEach(m),le.forEach(m),H=F(U),f=$(U,"DIV",{class:!0});var ee=V(f);j(T.$$.fragment,ee),O=F(ee),j(N.$$.fragment,ee),ee.forEach(m),ie=F(U),L=$(U,"BUTTON",{class:!0,type:!0,"data-svelte-h":!0}),he(L)!=="svelte-j4uhei"&&(L.textContent=me),U.forEach(m),x.forEach(m),M.forEach(m),this.h()},h(){_(e,"class","button-add svelte-cg43m0"),_(h,"class",B=Ue(n[0]?"input-name-validation-failed":"input-name")+" svelte-cg43m0"),_(h,"id","name"),_(h,"name","name"),_(h,"placeholder",D=n[0]?"":"Example: Rwanda Mabanza"),_(h,"type","text"),_(P,"class","mt-2 text-sm text-red-600 dark:text-red-500"),_(c,"class","mb-5"),_(f,"class","my-div mb-5 svelte-cg43m0"),_(L,"class","button-submit svelte-cg43m0"),_(L,"type","submit"),_(v,"class","max-w-sm mx-auto"),_(i,"class","inner-container svelte-cg43m0"),_(s,"class","modal-container svelte-cg43m0"),ft(s,"show-modal",n[1])},m(C,M){I(C,t,M),I(C,e,M),n[19](e),I(C,a,M),I(C,s,M),z(r,s,null),g(s,o),g(s,i),z(u,i,null),g(i,p),g(i,v),g(v,c),z(w,c,null),g(c,E),g(c,h),n[22](h),ce(h,n[7]),g(c,R),g(c,P),g(P,Y),g(v,H),g(v,f),z(T,f,null),g(f,O),z(N,f,null),g(v,ie),g(v,L),n[26](v),n[27](i),b=!0,ne||(re=[J(window,"keydown",n[12]),J(document,"click",n[17]),J(e,"click",Ye(n[20])),J(h,"input",n[23]),J(h,"input",n[16]),J(h,"keydown",n[13]),J(v,"submit",Ye(n[15]))],ne=!0)},p(C,[M]){const x={};M&268435456&&(x.$$scope={dirty:M,ctx:C}),u.$set(x);const U={};M&1&&(U.valid=!C[0]),M&268435456&&(U.$$scope={dirty:M,ctx:C}),w.$set(U),(!b||M&1&&B!==(B=Ue(C[0]?"input-name-validation-failed":"input-name")+" svelte-cg43m0"))&&_(h,"class",B),(!b||M&1&&D!==(D=C[0]?"":"Example: Rwanda Mabanza"))&&_(h,"placeholder",D),M&128&&h.value!==C[7]&&ce(h,C[7]),(!b||M&512)&&je(Y,C[9]);const le={};M&268435456&&(le.$$scope={dirty:M,ctx:C}),T.$set(le);const fe={};!ae&&M&32&&(ae=!0,fe._this=C[5],oe(()=>ae=!1)),!de&&M&256&&(de=!0,fe.value=C[8],oe(()=>de=!1)),N.$set(fe),(!b||M&2)&&ft(s,"show-modal",C[1])},i(C){b||(K(r.$$.fragment,C),K(u.$$.fragment,C),K(w.$$.fragment,C),K(T.$$.fragment,C),K(N.$$.fragment,C),b=!0)},o(C){W(r.$$.fragment,C),W(u.$$.fragment,C),W(w.$$.fragment,C),W(T.$$.fragment,C),W(N.$$.fragment,C),b=!1},d(C){C&&(m(t),m(e),m(a),m(s)),n[19](null),q(r),q(u),q(w),n[22](null),q(T),q(N),n[26](null),n[27](null),ne=!1,Je(re)}}}const Jt="Example: Washed process. Notes: plum, cherry.";function dt(n,t){const e=n.getBoundingClientRect(),l=t.clientX,a=t.clientY;return l<e.left||l>e.right||a<e.top||a>e.bottom}function Qt(n,t,e){let{savedCoffeeBeans:l=void 0}=t,a=!1,s,r,o,i,u,p="",v="",c=!1,w="";function E(){e(1,a=!0),kt().then(()=>{o.focus()})}function h(){e(1,a=!1),e(0,c=!1)}function B(b){a&&b.key==="Escape"&&e(1,a=!1)}function D(b){b.key==="Enter"&&(b.preventDefault(),i.focus())}function R(b){b.key==="Enter"&&(b.metaKey||b.ctrlKey)&&(b.preventDefault(),u.requestSubmit())}async function P(){const b=Pt.create({name:p,description:v});if(b==="ValidationFailed_NameMustBeAtLeast3CharsLong"){e(0,c=!0),e(9,w="Name must be at least 3 characters long.");return}const ne=await Vt(b);if(ne==="Failure_NameAlreadyExist"){e(0,c=!0),e(9,w="Coffee beans with this name exist already.");return}alert("New coffee beans saved successfully."),e(18,l=ne),h(),e(7,p=""),e(8,v="")}function Y(){c&&(e(0,c=!1),e(9,w=""))}function H(b){a!==!1&&dt(s,b)&&dt(r,b)&&h()}function f(b){te[b?"unshift":"push"](()=>{r=b,e(3,r)})}const T=()=>E(),O=()=>h();function N(b){te[b?"unshift":"push"](()=>{o=b,e(4,o)})}function ae(){p=this.value,e(7,p)}function de(b){i=b,e(5,i)}function ie(b){v=b,e(8,v)}function L(b){te[b?"unshift":"push"](()=>{u=b,e(6,u)})}function me(b){te[b?"unshift":"push"](()=>{s=b,e(2,s)})}return n.$$set=b=>{"savedCoffeeBeans"in b&&e(18,l=b.savedCoffeeBeans)},n.$$.update=()=>{n.$$.dirty&1&&c===!1&&e(9,w="")},[c,a,s,r,o,i,u,p,v,w,E,h,B,D,R,P,Y,H,l,f,T,O,N,ae,de,ie,L,me]}class Zt extends Pe{constructor(t){super(),Ve(this,t,Qt,Yt,ye,{savedCoffeeBeans:18})}}function mt(n,t,e){const l=n.slice();return l[9]=t[e],l}function xt(n){let t;return{c(){t=Q("Coffee beans:")},l(e){t=Z(e,"Coffee beans:")},m(e,l){I(e,t,l)},d(e){e&&m(t)}}}function en(n){let t,e="Loading coffee beans...";return{c(){t=k("option"),t.textContent=e,this.h()},l(l){t=$(l,"OPTION",{"data-svelte-h":!0}),he(t)!=="svelte-1sf778f"&&(t.textContent=e),this.h()},h(){t.disabled=!0,t.selected=!0,t.__value="",ce(t,t.__value)},m(l,a){I(l,t,a)},p:Ge,d(l){l&&m(t)}}}function tn(n){let t,e,l=n[1]===void 0&&_t(),a=ut(n[2]),s=[];for(let r=0;r<a.length;r+=1)s[r]=pt(mt(n,a,r));return{c(){l&&l.c(),t=Re();for(let r=0;r<s.length;r+=1)s[r].c();e=Re()},l(r){l&&l.l(r),t=Re();for(let o=0;o<s.length;o+=1)s[o].l(r);e=Re()},m(r,o){l&&l.m(r,o),I(r,t,o);for(let i=0;i<s.length;i+=1)s[i]&&s[i].m(r,o);I(r,e,o)},p(r,o){if(r[1]===void 0?l||(l=_t(),l.c(),l.m(t.parentNode,t)):l&&(l.d(1),l=null),o&6){a=ut(r[2]);let i;for(i=0;i<a.length;i+=1){const u=mt(r,a,i);s[i]?s[i].p(u,o):(s[i]=pt(u),s[i].c(),s[i].m(e.parentNode,e))}for(;i<s.length;i+=1)s[i].d(1);s.length=a.length}},d(r){r&&(m(t),m(e)),l&&l.d(r),Nt(s,r)}}}function _t(n){let t;return{c(){t=k("option"),this.h()},l(e){t=$(e,"OPTION",{}),V(t).forEach(m),this.h()},h(){t.disabled=!0,t.selected=!0,t.__value="",ce(t,t.__value)},m(e,l){I(e,t,l)},d(e){e&&m(t)}}}function pt(n){let t,e=n[9].name+"",l,a,s;return{c(){t=k("option"),l=Q(e),this.h()},l(r){t=$(r,"OPTION",{});var o=V(t);l=Z(o,e),o.forEach(m),this.h()},h(){var r;t.selected=a=((r=n[1])==null?void 0:r.id)===n[9].id,t.__value=s=n[9].id,ce(t,t.__value)},m(r,o){I(r,t,o),g(t,l)},p(r,o){var i;o&4&&e!==(e=r[9].name+"")&&je(l,e),o&6&&a!==(a=((i=r[1])==null?void 0:i.id)===r[9].id)&&(t.selected=a),o&4&&s!==(s=r[9].id)&&(t.__value=s,ce(t,t.__value))},d(r){r&&m(t)}}}function nn(n){let t,e,l,a,s,r,o,i,u,p,v,c,w,E,h,B;e=new pe({props:{_for:We,valid:!n[0],$$slots:{default:[xt]},$$scope:{ctx:n}}});function D(f,T){return f[2]!==void 0?tn:en}let R=D(n),P=R(n);function Y(f){n[8](f)}let H={};return n[4]!==void 0&&(H.savedCoffeeBeans=n[4]),u=new Zt({props:H}),te.push(()=>ue(u,"savedCoffeeBeans",Y)),{c(){t=k("div"),G(e.$$.fragment),l=S(),a=k("div"),s=k("select"),P.c(),i=S(),G(u.$$.fragment),v=S(),c=k("p"),w=Q(n[5]),this.h()},l(f){t=$(f,"DIV",{class:!0});var T=V(t);j(e.$$.fragment,T),l=F(T),a=$(T,"DIV",{class:!0});var O=V(a);s=$(O,"SELECT",{name:!0,id:!0,class:!0});var N=V(s);P.l(N),N.forEach(m),i=F(O),j(u.$$.fragment,O),O.forEach(m),T.forEach(m),v=F(f),c=$(f,"P",{class:!0});var ae=V(c);w=Z(ae,n[5]),ae.forEach(m),this.h()},h(){_(s,"name",We),_(s,"id",We),_(s,"class",r=Ue(n[0]?"invalid":"valid")+" svelte-cut39x"),s.disabled=o=n[2]===void 0,n[3]===void 0&&$t(()=>n[7].call(s)),_(a,"class","select-container svelte-cut39x"),_(t,"class","container svelte-cut39x"),_(c,"class","mt-2 text-sm text-red-600 dark:text-red-500")},m(f,T){I(f,t,T),z(e,t,null),g(t,l),g(t,a),g(a,s),P.m(s,null),ot(s,n[3],!0),g(a,i),z(u,a,null),I(f,v,T),I(f,c,T),g(c,w),E=!0,h||(B=[J(s,"change",n[6]),J(s,"change",n[7])],h=!0)},p(f,[T]){const O={};T&1&&(O.valid=!f[0]),T&4096&&(O.$$scope={dirty:T,ctx:f}),e.$set(O),R===(R=D(f))&&P?P.p(f,T):(P.d(1),P=R(f),P&&(P.c(),P.m(s,null))),(!E||T&1&&r!==(r=Ue(f[0]?"invalid":"valid")+" svelte-cut39x"))&&_(s,"class",r),(!E||T&4&&o!==(o=f[2]===void 0))&&(s.disabled=o),T&12&&ot(s,f[3]);const N={};!p&&T&16&&(p=!0,N.savedCoffeeBeans=f[4],oe(()=>p=!1)),u.$set(N),(!E||T&32)&&je(w,f[5])},i(f){E||(K(e.$$.fragment,f),K(u.$$.fragment,f),E=!0)},o(f){W(e.$$.fragment,f),W(u.$$.fragment,f),E=!1},d(f){f&&(m(t),m(v),m(c)),q(e),P.d(),q(u),h=!1,Je(B)}}}const We="coffee-beans";function sn(n,t,e){let{allCoffeeBeans:l}=t,{selectedCoffeeBeans:a}=t,{validationFailed:s=!1}=t,r=a==null?void 0:a.id,o,i="";function u(c){s&&e(0,s=!1),e(4,o=void 0)}function p(){r=Dt(this),e(3,r),e(2,l)}function v(c){o=c,e(4,o)}return n.$$set=c=>{"allCoffeeBeans"in c&&e(2,l=c.allCoffeeBeans),"selectedCoffeeBeans"in c&&e(1,a=c.selectedCoffeeBeans),"validationFailed"in c&&e(0,s=c.validationFailed)},n.$$.update=()=>{n.$$.dirty&12&&e(1,a=l==null?void 0:l.find(c=>c.id===r)),n.$$.dirty&20&&o instanceof Ot&&((l==null?void 0:l.find(c=>c.id===(o==null?void 0:o.id)))===void 0&&(l==null||l.push(o)),e(1,a=o),e(0,s=!1)),n.$$.dirty&1&&(s?e(5,i="Please select a coffee beans."):e(5,i=""))},[s,a,l,r,o,i,u,p,v]}class ln extends Pe{constructor(t){super(),Ve(this,t,sn,nn,ye,{allCoffeeBeans:2,selectedCoffeeBeans:1,validationFailed:0})}}function an(n){let t;return{c(){t=Q("Timestamp:")},l(e){t=Z(e,"Timestamp:")},m(e,l){I(e,t,l)},d(e){e&&m(t)}}}function rn(n){let t,e,l,a,s,r,o;return e=new pe({props:{_for:qe,$$slots:{default:[an]},$$scope:{ctx:n}}}),{c(){t=k("div"),G(e.$$.fragment),l=S(),a=k("input"),this.h()},l(i){t=$(i,"DIV",{class:!0});var u=V(t);j(e.$$.fragment,u),l=F(u),a=$(u,"INPUT",{name:!0,id:!0,type:!0,class:!0}),u.forEach(m),this.h()},h(){_(a,"name",qe),_(a,"id",qe),_(a,"type","datetime-local"),_(a,"class","svelte-12fyfgt"),_(t,"class","container svelte-12fyfgt")},m(i,u){I(i,t,u),z(e,t,null),g(t,l),g(t,a),ce(a,n[0]),s=!0,r||(o=J(a,"input",n[1]),r=!0)},p(i,[u]){const p={};u&4&&(p.$$scope={dirty:u,ctx:i}),e.$set(p),u&1&&ce(a,i[0])},i(i){s||(K(e.$$.fragment,i),s=!0)},o(i){W(e.$$.fragment,i),s=!1},d(i){i&&m(t),q(e),r=!1,o()}}}const qe="timestamp";function fn(n,t,e){let{value:l}=t;function a(){l=this.value,e(0,l)}return n.$$set=s=>{"value"in s&&e(0,l=s.value)},[l,a]}class on extends Pe{constructor(t){super(),Ve(this,t,fn,rn,ye,{value:0})}}function ht(n){const t=n.getTimezoneOffset()*6e4;return new Date(n.getTime()-t).toISOString().slice(0,-8)}function un(n){const t=Date.parse(n);return new Date(t)}function cn(n){let t=ze.recipe.recipeTarget+"",e,l;return{c(){e=Q(t),l=Q(":")},l(a){e=Z(a,t),l=Z(a,":")},m(a,s){I(a,e,s),I(a,l,s)},p:Ge,d(a){a&&(m(e),m(l))}}}function dn(n){let t=ze.recipe.recipeResult+"",e,l;return{c(){e=Q(t),l=Q(":")},l(a){e=Z(a,t),l=Z(a,":")},m(a,s){I(a,e,s),I(a,l,s)},p:Ge,d(a){a&&(m(e),m(l))}}}function mn(n){let t=ze.recipe.recipeThoughts+"",e,l;return{c(){e=Q(t),l=Q(":")},l(a){e=Z(a,t),l=Z(a,":")},m(a,s){I(a,e,s),I(a,l,s)},p:Ge,d(a){a&&(m(e),m(l))}}}function _n(n){let t,e,l="Add recipe",a,s,r,o,i,u,p,v,c,w,E,h,B,D,R,P,Y,H,f,T,O,N,ae,de,ie,L,me,b,ne,re,Te,_e,se,C,M,x,U,le,fe,ee,Ze="Save",Oe,Ke,xe;function gt(d){n[11](d)}let et={allCoffeeBeans:n[7],validationFailed:n[6]};n[0]!==void 0&&(et.selectedCoffeeBeans=n[0]),o=new ln({props:et}),te.push(()=>ue(o,"selectedCoffeeBeans",gt)),v=new pe({props:{_for:Ee,$$slots:{default:[cn]},$$scope:{ctx:n}}});function vt(d){n[12](d)}let tt={name:Ee,id:Ee,placeholder:pn};n[1]!==void 0&&(tt.value=n[1]),E=new Ae({props:tt}),te.push(()=>ue(E,"value",vt)),R=new pe({props:{_for:Ce,$$slots:{default:[dn]},$$scope:{ctx:n}}});function bt(d){n[13](d)}let nt={name:Ce,id:Ce,placeholder:hn};n[2]!==void 0&&(nt.value=n[2]),H=new Ae({props:nt}),te.push(()=>ue(H,"value",bt));function Et(d){n[14](d)}let st={labelText:ze.recipe.outWeight+" (g):",min:0,step:5,nameAttr:He};n[4]!==void 0&&(st.value=n[4]),N=new ct({props:st}),te.push(()=>ue(N,"value",Et));function Ct(d){n[15](d)}let lt={labelText:"Rating:",min:0,max:5,step:.5,nameAttr:Le};n[5]!==void 0&&(lt.value=n[5]),L=new ct({props:lt}),te.push(()=>ue(L,"value",Ct)),re=new pe({props:{_for:we,$$slots:{default:[mn]},$$scope:{ctx:n}}});function wt(d){n[16](d)}let at={name:we,id:we,placeholder:gn,textLinesCount:4};n[3]!==void 0&&(at.value=n[3]),se=new Ae({props:at}),te.push(()=>ue(se,"value",wt));function Tt(d){n[17](d)}let it={};return n[8]!==void 0&&(it.value=n[8]),U=new on({props:it}),te.push(()=>ue(U,"value",Tt)),{c(){t=S(),e=k("h1"),e.textContent=l,a=S(),s=k("form"),r=k("div"),G(o.$$.fragment),u=S(),p=k("div"),G(v.$$.fragment),c=S(),w=k("div"),G(E.$$.fragment),B=S(),D=k("div"),G(R.$$.fragment),P=S(),Y=k("div"),G(H.$$.fragment),T=S(),O=k("div"),G(N.$$.fragment),de=S(),ie=k("div"),G(L.$$.fragment),b=S(),ne=k("div"),G(re.$$.fragment),Te=S(),_e=k("div"),G(se.$$.fragment),M=S(),x=k("div"),G(U.$$.fragment),fe=S(),ee=k("button"),ee.textContent=Ze,this.h()},l(d){Mt("svelte-1rtnd68",document.head).forEach(m),t=F(d),e=$(d,"H1",{class:!0,"data-svelte-h":!0}),he(e)!=="svelte-jnfgxb"&&(e.textContent=l),a=F(d),s=$(d,"FORM",{id:!0});var y=V(s);r=$(y,"DIV",{class:!0});var ke=V(r);j(o.$$.fragment,ke),ke.forEach(m),u=F(y),p=$(y,"DIV",{class:!0});var $e=V(p);j(v.$$.fragment,$e),$e.forEach(m),c=F(y),w=$(y,"DIV",{class:!0});var Ie=V(w);j(E.$$.fragment,Ie),Ie.forEach(m),B=F(y),D=$(y,"DIV",{class:!0});var Be=V(D);j(R.$$.fragment,Be),Be.forEach(m),P=F(y),Y=$(y,"DIV",{class:!0});var De=V(Y);j(H.$$.fragment,De),De.forEach(m),T=F(y),O=$(y,"DIV",{class:!0});var Ne=V(O);j(N.$$.fragment,Ne),Ne.forEach(m),de=F(y),ie=$(y,"DIV",{class:!0});var Me=V(ie);j(L.$$.fragment,Me),Me.forEach(m),b=F(y),ne=$(y,"DIV",{class:!0});var Se=V(ne);j(re.$$.fragment,Se),Se.forEach(m),Te=F(y),_e=$(y,"DIV",{class:!0});var Fe=V(_e);j(se.$$.fragment,Fe),Fe.forEach(m),M=F(y),x=$(y,"DIV",{class:!0});var rt=V(x);j(U.$$.fragment,rt),rt.forEach(m),fe=F(y),ee=$(y,"BUTTON",{type:!0,form:!0,class:!0,"data-svelte-h":!0}),he(ee)!=="svelte-1jtz69h"&&(ee.textContent=Ze),y.forEach(m),this.h()},h(){document.title="Add recipe",_(e,"class","svelte-1ncgbfn"),_(r,"class","svelte-1ncgbfn"),_(p,"class","svelte-1ncgbfn"),_(w,"class","svelte-1ncgbfn"),_(D,"class","svelte-1ncgbfn"),_(Y,"class","svelte-1ncgbfn"),_(O,"class","svelte-1ncgbfn"),_(ie,"class","svelte-1ncgbfn"),_(ne,"class","svelte-1ncgbfn"),_(_e,"class","svelte-1ncgbfn"),_(x,"class","svelte-1ncgbfn"),_(ee,"type","submit"),_(ee,"form","add-recipe"),_(ee,"class","my-button svelte-1ncgbfn"),_(s,"id","add-recipe")},m(d,A){I(d,t,A),I(d,e,A),I(d,a,A),I(d,s,A),g(s,r),z(o,r,null),g(s,u),g(s,p),z(v,p,null),g(s,c),g(s,w),z(E,w,null),g(s,B),g(s,D),z(R,D,null),g(s,P),g(s,Y),z(H,Y,null),g(s,T),g(s,O),z(N,O,null),g(s,de),g(s,ie),z(L,ie,null),g(s,b),g(s,ne),z(re,ne,null),g(s,Te),g(s,_e),z(se,_e,null),g(s,M),g(s,x),z(U,x,null),g(s,fe),g(s,ee),Oe=!0,Ke||(xe=J(s,"submit",Ye(n[9])),Ke=!0)},p(d,[A]){const y={};A&128&&(y.allCoffeeBeans=d[7]),A&64&&(y.validationFailed=d[6]),!i&&A&1&&(i=!0,y.selectedCoffeeBeans=d[0],oe(()=>i=!1)),o.$set(y);const ke={};A&1048576&&(ke.$$scope={dirty:A,ctx:d}),v.$set(ke);const $e={};!h&&A&2&&(h=!0,$e.value=d[1],oe(()=>h=!1)),E.$set($e);const Ie={};A&1048576&&(Ie.$$scope={dirty:A,ctx:d}),R.$set(Ie);const Be={};!f&&A&4&&(f=!0,Be.value=d[2],oe(()=>f=!1)),H.$set(Be);const De={};!ae&&A&16&&(ae=!0,De.value=d[4],oe(()=>ae=!1)),N.$set(De);const Ne={};!me&&A&32&&(me=!0,Ne.value=d[5],oe(()=>me=!1)),L.$set(Ne);const Me={};A&1048576&&(Me.$$scope={dirty:A,ctx:d}),re.$set(Me);const Se={};!C&&A&8&&(C=!0,Se.value=d[3],oe(()=>C=!1)),se.$set(Se);const Fe={};!le&&A&256&&(le=!0,Fe.value=d[8],oe(()=>le=!1)),U.$set(Fe)},i(d){Oe||(K(o.$$.fragment,d),K(v.$$.fragment,d),K(E.$$.fragment,d),K(R.$$.fragment,d),K(H.$$.fragment,d),K(N.$$.fragment,d),K(L.$$.fragment,d),K(re.$$.fragment,d),K(se.$$.fragment,d),K(U.$$.fragment,d),Oe=!0)},o(d){W(o.$$.fragment,d),W(v.$$.fragment,d),W(E.$$.fragment,d),W(R.$$.fragment,d),W(H.$$.fragment,d),W(N.$$.fragment,d),W(L.$$.fragment,d),W(re.$$.fragment,d),W(se.$$.fragment,d),W(U.$$.fragment,d),Oe=!1},d(d){d&&(m(t),m(e),m(a),m(s)),q(o),q(v),q(E),q(R),q(H),q(N),q(L),q(re),q(se),q(U),Ke=!1,xe()}}}const Ee="recipe-target",pn="Example: 17 clicks, 15g + 260g. 5m boil.",Ce="recipe-result",hn="Example: 2m15s + 15s drip. 250g out.",we="recipe-thoughts",gn="Example: Perfect balance. Perfect concentration. Flowery notes.",He="out-weight",Le="rating",X="addRecipe",Xe="coffee-beans";function vn(n,t,e){let l;It(n,Ft,f=>e(18,l=f)),l.data.coffeeBeansName;let a=!1,s=!1,r,o,i,u,p,v,c,w=ht(new Date);Bt(()=>{i===""&&e(1,i=void 0),u===""&&e(2,u=void 0),p===""&&e(3,p=void 0),Rt().then(f=>{e(7,r=f)}).then(()=>{if(o===void 0){const f=ve(X,Xe,"number");f===null||e(0,o=r==null?void 0:r.find(T=>T.id===f))}if(i===void 0||i===""){const f=ve(X,Ee,"string");f===null||e(1,i=f)}if(u===void 0||u===""){const f=ve(X,Ce,"string");f===null||e(2,u=f)}if(p===void 0||p===""){const f=ve(X,we,"string");f===null||e(3,p=f)}if(v===void 0||v===0){const f=ve(X,He,"number");f===null||f===0||e(4,v=f)}if(c===void 0||c===0){const f=ve(X,Le,"number");f===null||f===0||e(5,c=f)}e(10,s=!0)}),e(8,w=ht(new Date))});async function E(f){if(o===void 0){e(6,a=!0);return}i==null&&e(1,i=""),e(1,i=i.trim()),u==null&&e(2,u=""),e(2,u=u.trim()),p==null&&e(3,p=""),e(3,p=p.trim());const T=un(w);if(o===void 0)throw new Error("Please select the coffee beans.");const O={coffeeBeansId:o.id,recipeTarget:i,recipeResult:u,recipeThoughts:p,outWeight:v,rating:c,timestamp:T};await At(O),be(X,Xe),be(X,Ee),be(X,Ce),be(X,we),be(X,He),be(X,Le),St(Ht.home)}function h(f){o=f,e(0,o)}function B(f){i=f,e(1,i)}function D(f){u=f,e(2,u)}function R(f){v=f,e(4,v)}function P(f){c=f,e(5,c)}function Y(f){p=f,e(3,p)}function H(f){w=f,e(8,w)}return n.$$.update=()=>{n.$$.dirty&1&&o!==void 0&&ge(X,Xe,o.id),n.$$.dirty&2&&i!=null&&ge(X,Ee,i),n.$$.dirty&4&&u!=null&&ge(X,Ce,u),n.$$.dirty&8&&p!=null&&ge(X,we,p),n.$$.dirty&1040&&v!==void 0&&s&&ge(X,He,v),n.$$.dirty&1056&&c!==void 0&&s&&ge(X,Le,c)},[o,i,u,p,v,c,a,r,w,E,s,h,B,D,R,P,Y,H]}class Mn extends Pe{constructor(t){super(),Ve(this,t,vn,_n,ye,{})}}export{Mn as component,Nn as universal};
