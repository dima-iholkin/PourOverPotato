import{s as we,b as K,a as q,f as pe,r as Be,t as De,n as F}from"../chunks/scheduler.Cw1-ZcKD.js";import{S as Ce,i as ke,v as H,k as T,m as E,n as I,q as B,o as D,r as R,e as P,s as V,t as ee,c as O,a as G,f as z,b as te,d as w,z as S,C as _e,g as M,h as y,D as he,A as Q,B as Me,j as de,w as J,l as Ne,p as ce,u as me,y as se}from"../chunks/index.DHsbL8_X.js";import{c as ye,d as Fe,f as Te,s as Ee,e as ge,u as Ie,o as Re,h as Pe,i as Oe}from"../chunks/manageCoffeeBeans.C7RhAe7S.js";import{g as x}from"../chunks/entry.CkYdZ-DM.js";import{d as Ve,P as ze}from"../chunks/PageHeadline.F-LKfGZW.js";import{r as W}from"../chunks/routes.DSKwA-rI.js";import{e as re,p as Le,a as ue,s as be,h as Ae}from"../chunks/core.mqgva03L.js";import{S as Ke,R as je}from"../chunks/SortRecipesSelect.CXnC_mbk.js";import{A as Ue,N as qe}from"../chunks/NoItemsYetP.cE9NhKtD.js";import{L as Se}from"../chunks/Loading.BjzKhRf5.js";import{L as He,T as We}from"../chunks/Textarea.JDIYw7SM.js";import{M as Ye}from"../chunks/Modal.CK9wnrsL.js";import{F as Ge,D as Je,a as Qe}from"../chunks/FlexRow.D5-olN0-.js";import{D as Xe}from"../chunks/DeleteConfirmationModal.Chmr1ysO.js";function Ze({params:a}){return{coffeeBeansName:a.name}}const Pt=Object.freeze(Object.defineProperty({__proto__:null,load:Ze},Symbol.toStringTag,{value:"Module"}));function xe(a){let e;return{c(){e=ee("Coffee beans name:")},l(n){e=te(n,"Coffee beans name:")},m(n,t){M(n,e,t)},d(n){n&&w(e)}}}function et(a){let e,n,t,o,r,l,i,u,c,m,$,f,s,p,d,v,L,g,_,C,N,U,Y;t=new He({props:{for_:"name",valid:!a[3],$$slots:{default:[xe]},$$scope:{ctx:a}}});function le(b){a[23](b)}function ie(b){a[24](b)}function fe(b){a[25](b)}let X={id:"description",initialValue:a[0].description,label:"Description:",name:"description",placeholder:nt};return a[4]!==void 0&&(X.resizeTextarea=a[4]),a[10]!==void 0&&(X.this_=a[10]),a[2]!==void 0&&(X.value=a[2]),s=new We({props:X}),K.push(()=>H(s,"resizeTextarea",le)),K.push(()=>H(s,"this_",ie)),K.push(()=>H(s,"value",fe)),s.$on("keydown",a[14]),{c(){e=P("form"),n=P("div"),T(t.$$.fragment),o=V(),r=P("input"),u=V(),c=P("p"),m=ee(a[11]),$=V(),f=P("div"),T(s.$$.fragment),L=V(),g=P("button"),_=ee("Save changes"),this.h()},l(b){e=O(b,"FORM",{class:!0});var k=G(e);n=O(k,"DIV",{class:!0});var A=G(n);E(t.$$.fragment,A),o=z(A),r=O(A,"INPUT",{id:!0,autocomplete:!0,class:!0,name:!0,placeholder:!0,type:!0}),u=z(A),c=O(A,"P",{class:!0});var j=G(c);m=te(j,a[11]),j.forEach(w),A.forEach(w),$=z(k),f=O(k,"DIV",{class:!0});var ne=G(f);E(s.$$.fragment,ne),ne.forEach(w),L=z(k),g=O(k,"BUTTON",{class:!0,type:!0});var ae=G(g);_=te(ae,"Save changes"),ae.forEach(w),k.forEach(w),this.h()},h(){S(r,"id","name"),S(r,"autocomplete","off"),S(r,"class",l=pe(a[3]?"input-name-validation-failed":"input-name")+" svelte-1v2lvap"),S(r,"name","name"),S(r,"placeholder",i=a[3]?"":"Example: Rwanda Mabanza"),S(r,"type","text"),_e(r,"unsaved-changes",a[0].name!==void 0&&a[1].trim()!==a[0].name),S(c,"class","mt-2 text-sm text-red-600"),S(n,"class","mb-5"),S(f,"class","my-div mb-5 svelte-1v2lvap"),S(g,"class","button-submit svelte-1v2lvap"),g.disabled=C=a[3]||a[12]===!1||re.hasValidName({name:a[1]})!==!0,S(g,"type","submit"),S(e,"class","mx-auto")},m(b,k){M(b,e,k),y(e,n),I(t,n,null),y(n,o),y(n,r),a[21](r),he(r,a[1]),y(n,u),y(n,c),y(c,m),y(e,$),y(e,f),I(s,f,null),y(e,L),y(e,g),y(g,_),a[26](g),a[27](e),N=!0,U||(Y=[Q(r,"input",a[22]),Q(r,"focusin",a[19]),Q(r,"input",a[17]),Q(r,"keydown",a[13]),Q(g,"keydown",a[18]),Q(e,"submit",Me(a[15]))],U=!0)},p(b,k){const A={};k[0]&8&&(A.valid=!b[3]),k[1]&1&&(A.$$scope={dirty:k,ctx:b}),t.$set(A),(!N||k[0]&8&&l!==(l=pe(b[3]?"input-name-validation-failed":"input-name")+" svelte-1v2lvap"))&&S(r,"class",l),(!N||k[0]&8&&i!==(i=b[3]?"":"Example: Rwanda Mabanza"))&&S(r,"placeholder",i),k[0]&2&&r.value!==b[1]&&he(r,b[1]),(!N||k[0]&11)&&_e(r,"unsaved-changes",b[0].name!==void 0&&b[1].trim()!==b[0].name),(!N||k[0]&2048)&&de(m,b[11]);const j={};k[0]&1&&(j.initialValue=b[0].description),!p&&k[0]&16&&(p=!0,j.resizeTextarea=b[4],q(()=>p=!1)),!d&&k[0]&1024&&(d=!0,j.this_=b[10],q(()=>d=!1)),!v&&k[0]&4&&(v=!0,j.value=b[2],q(()=>v=!1)),s.$set(j),(!N||k[0]&4106&&C!==(C=b[3]||b[12]===!1||re.hasValidName({name:b[1]})!==!0))&&(g.disabled=C)},i(b){N||(B(t.$$.fragment,b),B(s.$$.fragment,b),N=!0)},o(b){D(t.$$.fragment,b),D(s.$$.fragment,b),N=!1},d(b){b&&w(e),R(t),a[21](null),R(s),a[26](null),a[27](null),U=!1,Be(Y)}}}function tt(a){let e,n,t,o;function r(u){a[29](u)}function l(u){a[30](u)}let i={onFocusReverse:a[28],onStateChange:a[16],title:"Edit coffee beans",$$slots:{default:[et]},$$scope:{ctx:a}};return a[5]!==void 0&&(i.setFocus=a[5]),a[6]!==void 0&&(i.setState=a[6]),e=new Ye({props:i}),K.push(()=>H(e,"setFocus",r)),K.push(()=>H(e,"setState",l)),{c(){T(e.$$.fragment)},l(u){E(e.$$.fragment,u)},m(u,c){I(e,u,c),o=!0},p(u,c){const m={};c[0]&512&&(m.onFocusReverse=u[28]),c[0]&8095|c[1]&1&&(m.$$scope={dirty:c,ctx:u}),!n&&c[0]&32&&(n=!0,m.setFocus=u[5],q(()=>n=!1)),!t&&c[0]&64&&(t=!0,m.setState=u[6],q(()=>t=!1)),e.$set(m)},i(u){o||(B(e.$$.fragment,u),o=!0)},o(u){D(e.$$.fragment,u),o=!1},d(u){R(e,u)}}}const nt="Example: Washed process. Notes: plum, cherry.";function at(a,e,n){const t=h=>{i(h)};let{item:o}=e,r,l,i,u,c,m,$,f=o.name??"",s=o.description??"",p="",d=!1,v=!1;function L(h){h.key==="Enter"&&(h.preventDefault(),$.focus())}function g(h){h.key==="Enter"&&(h.metaKey||h.ctrlKey)&&(h.preventDefault(),u.requestSubmit())}async function _(){n(1,f=f.trim()),n(2,s=s.trim());const h=new re({id:o.id,name:f,description:s}),Z=Le.create(h);if(Z==="ValidationFailed_NameMustBeAtLeast3CharsLong"){n(3,d=!0),n(11,p="Name must be at least 3 characters long.");return}const oe=await ye(Z);if(oe==="Failure_NameAlreadyExist"){n(3,d=!0),n(11,p="Coffee beans with this name already exist.");return}if(oe==="CoffeeBeansNotFound"){n(3,d=!1),ue("CoffeeBeans not found in the database. Operation aborted.");return}ue("Coffee beans modified."),n(0,o=oe),i("closed"),x(W.home).then(()=>x(W.coffeeBeansItem(oe.name)))}function C(h){h==="open"&&(n(1,f=o.name??""),n(2,s=o.description??""),n(11,p=""),De().then(()=>{r(),c.focus()}))}function N(){if(re.hasValidName({name:f})==="ValidationFailed_NameMustBeAtLeast3CharsLong"){n(3,d=!0),n(11,p="Name must be at least 3 characters long.");return}if(f.trim().toLowerCase()===o.name.toLowerCase()){n(11,p="");return}Fe(f).then(h=>{switch(h){case"CoffeeBeansNotFound":n(3,d=!1),n(11,p="");break;case"Failure_NameAlreadyExist":n(3,d=!0),n(11,p=`Coffee beans "${f.trim()}" already exist.`);break}})}function U(h){h.key==="Tab"&&h.shiftKey===!1&&(h.preventDefault(),l())}function Y(h){const Z=h.currentTarget.value.length;c.setSelectionRange(Z,Z)}function le(h){K[h?"unshift":"push"](()=>{c=h,n(8,c)})}function ie(){f=this.value,n(1,f)}function fe(h){r=h,n(4,r)}function X(h){$=h,n(10,$)}function b(h){s=h,n(2,s)}function k(h){K[h?"unshift":"push"](()=>{m=h,n(9,m)})}function A(h){K[h?"unshift":"push"](()=>{u=h,n(7,u)})}const j=()=>m.focus();function ne(h){l=h,n(5,l)}function ae(h){i=h,n(6,i)}return a.$$set=h=>{"item"in h&&n(0,o=h.item)},a.$$.update=()=>{a.$$.dirty[0]&8&&d===!1&&n(11,p=""),a.$$.dirty[0]&7&&(o&&f.trim()===o.name&&s.trim()===o.description?n(12,v=!1):n(12,v=!0))},[o,f,s,d,r,l,i,u,c,m,$,p,v,L,g,_,C,N,U,Y,t,le,ie,fe,X,b,k,A,j,ne,ae]}class ot extends Ce{constructor(e){super(),ke(this,e,at,tt,we,{setModalState:20,item:0},null,[-1,-1])}get setModalState(){return this.$$.ctx[20]}}function $e(a,e,n){const t=a.slice();return t[15]=e[n],t}function st(a){return document.title=a[5].name+" - PourOverPotato app",{c:F,l:F,m:F,d:F}}function rt(a){return{c(){this.h()},l(e){this.h()},h(){document.title="404 Not Found - PourOverPotato app"},m:F,d:F}}function lt(a){return{c(){this.h()},l(e){this.h()},h(){document.title="loading... - PourOverPotato app"},m:F,d:F}}function it(a){let e,n,t,o=a[5].description+"",r,l,i,u,c,m,$;e=new Ge({props:{$$slots:{default:[_t]},$$scope:{ctx:a}}});const f=[bt,gt,ht],s=[];function p(d,v){return d[0]===void 0?0:d[0].length===0?1:2}return i=p(a),u=s[i]=f[i](a),m=new Ue({props:{href:W.addRecipe(a[5].name)}}),{c(){T(e.$$.fragment),n=V(),t=P("p"),r=ee(o),l=V(),u.c(),c=V(),T(m.$$.fragment),this.h()},l(d){E(e.$$.fragment,d),n=z(d),t=O(d,"P",{class:!0});var v=G(t);r=te(v,o),v.forEach(w),l=z(d),u.l(d),c=z(d),E(m.$$.fragment,d),this.h()},h(){S(t,"class","coffee-beans-description svelte-1v2zit7")},m(d,v){I(e,d,v),M(d,n,v),M(d,t,v),y(t,r),M(d,l,v),s[i].m(d,v),M(d,c,v),I(m,d,v),$=!0},p(d,v){const L={};v&262204&&(L.$$scope={dirty:v,ctx:d}),e.$set(L),(!$||v&32)&&o!==(o=d[5].description+"")&&de(r,o);let g=i;i=p(d),i===g?s[i].p(d,v):(me(),D(s[g],1,1,()=>{s[g]=null}),ce(),u=s[i],u?u.p(d,v):(u=s[i]=f[i](d),u.c()),B(u,1),u.m(c.parentNode,c));const _={};v&32&&(_.href=W.addRecipe(d[5].name)),m.$set(_)},i(d){$||(B(e.$$.fragment,d),B(u),B(m.$$.fragment,d),$=!0)},o(d){D(e.$$.fragment,d),D(u),D(m.$$.fragment,d),$=!1},d(d){d&&(w(n),w(t),w(l),w(c)),R(e,d),s[i].d(d),R(m,d)}}}function ft(a){let e,n="<h1>404</h1> <p>Coffee beans not found.</p>";return{c(){e=P("div"),e.innerHTML=n,this.h()},l(t){e=O(t,"DIV",{class:!0,"data-svelte-h":!0}),se(e)!=="svelte-akmamj"&&(e.innerHTML=n),this.h()},h(){S(e,"class","loading-position svelte-1v2zit7")},m(t,o){M(t,e,o)},p:F,i:F,o:F,d(t){t&&w(e)}}}function ut(a){let e,n,t;return n=new Se({}),{c(){e=P("div"),T(n.$$.fragment),this.h()},l(o){e=O(o,"DIV",{class:!0});var r=G(e);E(n.$$.fragment,r),r.forEach(w),this.h()},h(){S(e,"class","loading-position svelte-1v2zit7")},m(o,r){M(o,e,r),I(n,e,null),t=!0},p:F,i(o){t||(B(n.$$.fragment,o),t=!0)},o(o){D(n.$$.fragment,o),t=!1},d(o){o&&w(e),R(n)}}}function dt(a){let e=a[5].name+"",n;return{c(){n=ee(e)},l(t){n=te(t,e)},m(t,o){M(t,n,o)},p(t,o){o&32&&e!==(e=t[5].name+"")&&de(n,e)},d(t){t&&w(n)}}}function ct(a){let e,n;return e=new Qe({props:{slot:"button",buttonText:"Delete"}}),e.$on("click",a[11]),{c(){T(e.$$.fragment)},l(t){E(e.$$.fragment,t)},m(t,o){I(e,t,o),n=!0},p:F,i(t){n||(B(e.$$.fragment,t),n=!0)},o(t){D(e.$$.fragment,t),n=!1},d(t){R(e,t)}}}function mt(a){let e,n="Please confirm you want to delete these coffee beans.",t,o,r="The dependent recipes will be deleted too.";return{c(){e=P("p"),e.textContent=n,t=V(),o=P("p"),o.textContent=r},l(l){e=O(l,"P",{"data-svelte-h":!0}),se(e)!=="svelte-jtslft"&&(e.textContent=n),t=z(l),o=O(l,"P",{"data-svelte-h":!0}),se(o)!=="svelte-puw9d7"&&(o.textContent=r)},m(l,i){M(l,e,i),M(l,t,i),M(l,o,i)},p:F,d(l){l&&(w(e),w(t),w(o))}}}function pt(a){let e,n,t;function o(l){a[10](l)}let r={slot:"modal",onDeleteClick:a[6],$$slots:{default:[mt]},$$scope:{ctx:a}};return a[2]!==void 0&&(r.setModalState=a[2]),e=new Xe({props:r}),K.push(()=>H(e,"setModalState",o)),{c(){T(e.$$.fragment)},l(l){E(e.$$.fragment,l)},m(l,i){I(e,l,i),t=!0},p(l,i){const u={};i&262144&&(u.$$scope={dirty:i,ctx:l}),!n&&i&4&&(n=!0,u.setModalState=l[2],q(()=>n=!1)),e.$set(u)},i(l){t||(B(e.$$.fragment,l),t=!0)},o(l){D(e.$$.fragment,l),t=!1},d(l){R(e,l)}}}function _t(a){let e,n,t,o,r="Edit",l,i,u,c,m,$,f,s,p;e=new ze({props:{$$slots:{default:[dt]},$$scope:{ctx:a}}});function d(_){a[9](_)}let v={item:a[5]};a[4]!==void 0&&(v.setModalState=a[4]),i=new ot({props:v}),K.push(()=>H(i,"setModalState",d));function L(_){a[12](_)}let g={$$slots:{modal:[pt],button:[ct]},$$scope:{ctx:a}};return a[3]!==void 0&&(g.setDropdownState=a[3]),m=new Je({props:g}),K.push(()=>H(m,"setDropdownState",L)),{c(){T(e.$$.fragment),n=V(),t=P("div"),o=P("button"),o.textContent=r,l=V(),T(i.$$.fragment),c=V(),T(m.$$.fragment),this.h()},l(_){E(e.$$.fragment,_),n=z(_),t=O(_,"DIV",{class:!0});var C=G(t);o=O(C,"BUTTON",{class:!0,type:!0,"data-svelte-h":!0}),se(o)!=="svelte-gleq7e"&&(o.textContent=r),l=z(C),E(i.$$.fragment,C),c=z(C),E(m.$$.fragment,C),C.forEach(w),this.h()},h(){S(o,"class","edit-button svelte-1v2zit7"),S(o,"type","button"),S(t,"class","menu-container svelte-1v2zit7")},m(_,C){I(e,_,C),M(_,n,C),M(_,t,C),y(t,o),y(t,l),I(i,t,null),y(t,c),I(m,t,null),f=!0,s||(p=Q(o,"click",a[8]),s=!0)},p(_,C){const N={};C&262176&&(N.$$scope={dirty:C,ctx:_}),e.$set(N);const U={};C&32&&(U.item=_[5]),!u&&C&16&&(u=!0,U.setModalState=_[4],q(()=>u=!1)),i.$set(U);const Y={};C&262156&&(Y.$$scope={dirty:C,ctx:_}),!$&&C&8&&($=!0,Y.setDropdownState=_[3],q(()=>$=!1)),m.$set(Y)},i(_){f||(B(e.$$.fragment,_),B(i.$$.fragment,_),B(m.$$.fragment,_),f=!0)},o(_){D(e.$$.fragment,_),D(i.$$.fragment,_),D(m.$$.fragment,_),f=!1},d(_){_&&(w(n),w(t)),R(e,_),R(i),R(m),s=!1,p()}}}function ht(a){let e,n,t,o=[],r=new Map,l,i;function u(f){a[13](f)}let c={};a[1]!==void 0&&(c.sortOrderValue=a[1]),e=new Ke({props:c}),K.push(()=>H(e,"sortOrderValue",u));let m=ge(a[0]);const $=f=>f[15].id;for(let f=0;f<m.length;f+=1){let s=$e(a,m,f),p=$(s);r.set(p,o[f]=ve(p,s))}return{c(){T(e.$$.fragment),t=V();for(let f=0;f<o.length;f+=1)o[f].c();l=J()},l(f){E(e.$$.fragment,f),t=z(f);for(let s=0;s<o.length;s+=1)o[s].l(f);l=J()},m(f,s){I(e,f,s),M(f,t,s);for(let p=0;p<o.length;p+=1)o[p]&&o[p].m(f,s);M(f,l,s),i=!0},p(f,s){const p={};!n&&s&2&&(n=!0,p.sortOrderValue=f[1],q(()=>n=!1)),e.$set(p),s&33&&(m=ge(f[0]),me(),o=Ie(o,s,$,1,f,m,r,l.parentNode,Re,ve,l,$e),ce())},i(f){if(!i){B(e.$$.fragment,f);for(let s=0;s<m.length;s+=1)B(o[s]);i=!0}},o(f){D(e.$$.fragment,f);for(let s=0;s<o.length;s+=1)D(o[s]);i=!1},d(f){f&&(w(t),w(l)),R(e,f);for(let s=0;s<o.length;s+=1)o[s].d(f)}}}function gt(a){let e,n;return e=new qe({}),{c(){T(e.$$.fragment)},l(t){E(e.$$.fragment,t)},m(t,o){I(e,t,o),n=!0},p:F,i(t){n||(B(e.$$.fragment,t),n=!0)},o(t){D(e.$$.fragment,t),n=!1},d(t){R(e,t)}}}function bt(a){let e,n;return e=new Se({}),{c(){T(e.$$.fragment)},l(t){E(e.$$.fragment,t)},m(t,o){I(e,t,o),n=!0},p:F,i(t){n||(B(e.$$.fragment,t),n=!0)},o(t){D(e.$$.fragment,t),n=!1},d(t){R(e,t)}}}function ve(a,e){let n,t,o;return t=new je({props:{coffeeBeansName:e[5].name,href:W.recipeItem(e[15].id),recipe:e[15]}}),{key:a,first:null,c(){n=J(),T(t.$$.fragment),this.h()},l(r){n=J(),E(t.$$.fragment,r),this.h()},h(){this.first=n},m(r,l){M(r,n,l),I(t,r,l),o=!0},p(r,l){e=r;const i={};l&32&&(i.coffeeBeansName=e[5].name),l&1&&(i.href=W.recipeItem(e[15].id)),l&1&&(i.recipe=e[15]),t.$set(i)},i(r){o||(B(t.$$.fragment,r),o=!0)},o(r){D(t.$$.fragment,r),o=!1},d(r){r&&w(n),R(t,r)}}}function $t(a){let e,n,t,o,r,l;function i(s,p){return s[5]===void 0?lt:s[5]==="CoffeeBeansNotFound"?rt:st}let u=i(a),c=u(a);const m=[ut,ft,it],$=[];function f(s,p){return s[5]===void 0?0:s[5]==="CoffeeBeansNotFound"?1:2}return t=f(a),o=$[t]=m[t](a),{c(){c.c(),e=J(),n=V(),o.c(),r=J()},l(s){const p=Ne("svelte-1xzg8rg",document.head);c.l(p),e=J(),p.forEach(w),n=z(s),o.l(s),r=J()},m(s,p){c.m(document.head,null),y(document.head,e),M(s,n,p),$[t].m(s,p),M(s,r,p),l=!0},p(s,[p]){u!==(u=i(s))&&(c.d(1),c=u(s),c&&(c.c(),c.m(e.parentNode,e)));let d=t;t=f(s),t===d?$[t].p(s,p):(me(),D($[d],1,1,()=>{$[d]=null}),ce(),o=$[t],o?o.p(s,p):(o=$[t]=m[t](s),o.c()),B(o,1),o.m(r.parentNode,r))},i(s){l||(B(o),l=!0)},o(s){D(o),l=!1},d(s){s&&(w(n),w(r)),c.d(s),w(e),$[t].d(s)}}}function vt(a,e,n){let{data:t}=e,o,r,l,i,u,c;async function m(){if(i===void 0||i==="CoffeeBeansNotFound")return;const g=i,_=await Ee(g.id);if(_==="CoffeeBeansNotFound"){ue("CoffeeBeans not found in the database. Operation aborted.");return}const C=_.recipesCount===1?"recipe":"recipes",N=_.recipesCount>0?` and ${_.recipesCount} ${C}`:"";Ae(`Coffee beans "${g.name}"`+N+" deleted.",async()=>{await Oe(g.id),x(W.coffeeBeansItem(g.name)).then(()=>x(W.home))},async()=>{await Pe(g.id)}),x(W.home)}async function $(){const g=await Te(t.coffeeBeansName);if(g===void 0){n(5,i="CoffeeBeansNotFound");return}n(5,i=g);const _=await Ve(i.id);n(0,u=_.sort(be))}const f=()=>l("open");function s(g){l=g,n(4,l)}function p(g){o=g,n(2,o)}const d=()=>{o("open"),r("closed")};function v(g){r=g,n(3,r)}function L(g){c=g,n(1,c)}return a.$$set=g=>{"data"in g&&n(7,t=g.data)},a.$$.update=()=>{a.$$.dirty&3&&u&&n(0,u=u.sort((c==null?void 0:c.sortOrderFunc)??be)),a.$$.dirty&128&&window.indexedDB&&$()},[u,c,o,r,l,i,m,t,f,s,p,d,v,L]}class Ot extends Ce{constructor(e){super(),ke(this,e,vt,$t,we,{data:7})}}export{Ot as component,Pt as universal};
