import{s as ne,b as P,a as $,f as ue,r as de,t as we,j as Se,n as Me}from"./scheduler.vcOl-ZmV.js";import{S as ae,i as le,v as ee,k as G,m as J,n as W,q as L,o as q,r as X,e as w,s as j,t as U,c as S,a as N,f as A,b as H,d as C,y as te,z as c,g as D,h as k,C as V,A as F,B as ke,j as se,J as me,F as _e,u as Be,p as Ee,G as Ie,w as re}from"./index.Otd-Ubpp.js";import{e as he,u as ye,d as Fe}from"./each.dJ2YfOui.js";import{y as Ne,t as De,i as je}from"./indexedDB.omaGZViy.js";import{L as oe,T as Ae}from"./Textarea.nT9hUE4u.js";import{M as Oe}from"./Modal.CWCPsnM5.js";const ft={recipeTarget:"Example: 17 clicks, 15g + 260g filtered water.",recipeResult:"Example: 2m15s draw down + 15s drip.",recipeThoughts:"Example: Perfect balance. Perfect concentration. Flowery notes."};function ze(n){let t;return{c(){t=U("Coffee beans name:")},l(e){t=H(e,"Coffee beans name:")},m(e,l){D(e,t,l)},d(e){e&&C(t)}}}function Le(n){let t,e,l,o,s,r,u,a,i,f,m,v,d,h,p,_,I,E,M="Save",g,B,O;l=new oe({props:{for_:"name",valid:!n[0],$$slots:{default:[ze]},$$scope:{ctx:n}}});function K(T){n[23](T)}function Q(T){n[24](T)}function Y(T){n[25](T)}let Z={id:"description",label:"Description:",name:"description",placeholder:qe};return n[1]!==void 0&&(Z.resizeTextarea=n[1]),n[7]!==void 0&&(Z.this_=n[7]),n[9]!==void 0&&(Z.value=n[9]),d=new Ae({props:Z}),P.push(()=>ee(d,"resizeTextarea",K)),P.push(()=>ee(d,"this_",Q)),P.push(()=>ee(d,"value",Y)),d.$on("keydown",n[11]),{c(){t=w("form"),e=w("div"),G(l.$$.fragment),o=j(),s=w("input"),a=j(),i=w("p"),f=U(n[10]),m=j(),v=w("div"),G(d.$$.fragment),I=j(),E=w("button"),E.textContent=M,this.h()},l(T){t=S(T,"FORM",{class:!0});var y=N(t);e=S(y,"DIV",{class:!0});var z=N(e);J(l.$$.fragment,z),o=A(z),s=S(z,"INPUT",{id:!0,autocomplete:!0,class:!0,name:!0,placeholder:!0,type:!0}),a=A(z),i=S(z,"P",{class:!0});var R=N(i);f=H(R,n[10]),R.forEach(C),z.forEach(C),m=A(y),v=S(y,"DIV",{class:!0});var ie=N(v);J(d.$$.fragment,ie),ie.forEach(C),I=A(y),E=S(y,"BUTTON",{class:!0,type:!0,"data-svelte-h":!0}),te(E)!=="svelte-ro3ydn"&&(E.textContent=M),y.forEach(C),this.h()},h(){c(s,"id","name"),c(s,"autocomplete","off"),c(s,"class",r=ue(n[0]?"input-name-validation-failed":"input-name")+" svelte-tjgl6z"),c(s,"name","name"),c(s,"placeholder",u=n[0]?"":"Example: Rwanda Mabanza"),c(s,"type","text"),c(i,"class","mt-2 text-sm text-red-600 dark:text-red-500"),c(e,"class","mb-5"),c(v,"class","my-div mb-5 svelte-tjgl6z"),c(E,"class","button-submit svelte-tjgl6z"),c(E,"type","submit"),c(t,"class","mx-auto")},m(T,y){D(T,t,y),k(t,e),W(l,e,null),k(e,o),k(e,s),n[21](s),V(s,n[8]),k(e,a),k(e,i),k(i,f),k(t,m),k(t,v),W(d,v,null),k(t,I),k(t,E),n[26](E),n[27](t),g=!0,B||(O=[F(s,"input",n[22]),F(s,"focusin",n[17]),F(s,"input",n[13]),F(s,"keydown",n[12]),F(E,"keydown",n[16]),F(t,"submit",ke(n[14]))],B=!0)},p(T,y){const z={};y[0]&1&&(z.valid=!T[0]),y[1]&1&&(z.$$scope={dirty:y,ctx:T}),l.$set(z),(!g||y[0]&1&&r!==(r=ue(T[0]?"input-name-validation-failed":"input-name")+" svelte-tjgl6z"))&&c(s,"class",r),(!g||y[0]&1&&u!==(u=T[0]?"":"Example: Rwanda Mabanza"))&&c(s,"placeholder",u),y[0]&256&&s.value!==T[8]&&V(s,T[8]),(!g||y[0]&1024)&&se(f,T[10]);const R={};!h&&y[0]&2&&(h=!0,R.resizeTextarea=T[1],$(()=>h=!1)),!p&&y[0]&128&&(p=!0,R.this_=T[7],$(()=>p=!1)),!_&&y[0]&512&&(_=!0,R.value=T[9],$(()=>_=!1)),d.$set(R)},i(T){g||(L(l.$$.fragment,T),L(d.$$.fragment,T),g=!0)},o(T){q(l.$$.fragment,T),q(d.$$.fragment,T),g=!1},d(T){T&&C(t),X(l),n[21](null),X(d),n[26](null),n[27](null),B=!1,de(O)}}}function Pe(n){let t,e,l,o;function s(a){n[29](a)}function r(a){n[30](a)}let u={onFocusReverse:n[28],onStateChange:n[15],title:"Add new coffee beans",$$slots:{default:[Le]},$$scope:{ctx:n}};return n[2]!==void 0&&(u.setFocus=n[2]),n[3]!==void 0&&(u.setState=n[3]),t=new Oe({props:u}),P.push(()=>ee(t,"setFocus",s)),P.push(()=>ee(t,"setState",r)),{c(){G(t.$$.fragment)},l(a){J(t.$$.fragment,a)},m(a,i){W(t,a,i),o=!0},p(a,i){const f={};i[0]&64&&(f.onFocusReverse=a[28]),i[0]&2035|i[1]&1&&(f.$$scope={dirty:i,ctx:a}),!e&&i[0]&4&&(e=!0,f.setFocus=a[2],$(()=>e=!1)),!l&&i[0]&8&&(l=!0,f.setState=a[3],$(()=>l=!1)),t.$set(f)},i(a){o||(L(t.$$.fragment,a),o=!0)},o(a){q(t.$$.fragment,a),o=!1},d(a){X(t,a)}}}const qe="Example: Washed process. Notes: plum, cherry.";function Ve(n,t,e){let{onModalStateChange:l=void 0}=t,{onSavedCoffeeBeans:o=void 0}=t;const s=b=>{a(b)};let r,u,a,i,f,m,v,d="",h="",p=!1,_="";function I(b){b.key==="Enter"&&(b.metaKey||b.ctrlKey)&&(b.preventDefault(),i.requestSubmit())}function E(b){b.key==="Enter"&&(b.preventDefault(),v.focus())}function M(){p&&(e(0,p=!1),e(10,_=""))}async function g(){const b=Ne.create({name:d,description:h});if(b==="ValidationFailed_NameMustBeAtLeast3CharsLong"){e(0,p=!0),e(10,_="Name must be at least 3 characters long.");return}const x=await De(b);if(x==="Failure_NameAlreadyExist"){e(0,p=!0),e(10,_="Coffee beans with this name exist already.");return}je(`Coffee beans "${x.name}" created.`),o!==void 0&&o(x),a("closed"),e(8,d=""),e(9,h="")}function B(b){b==="open"&&(e(8,d=""),e(9,h=""),e(10,_=""),we().then(()=>{r(),f.focus()})),l!==void 0&&l(b)}function O(b){b.key==="Tab"&&b.shiftKey===!1&&(b.preventDefault(),u())}function K(b){const x=b.currentTarget.value.length;f.setSelectionRange(x,x)}function Q(b){P[b?"unshift":"push"](()=>{f=b,e(5,f)})}function Y(){d=this.value,e(8,d)}function Z(b){r=b,e(1,r)}function T(b){v=b,e(7,v)}function y(b){h=b,e(9,h)}function z(b){P[b?"unshift":"push"](()=>{m=b,e(6,m)})}function R(b){P[b?"unshift":"push"](()=>{i=b,e(4,i)})}const ie=()=>m.focus();function Ce(b){u=b,e(2,u)}function Te(b){a=b,e(3,a)}return n.$$set=b=>{"onModalStateChange"in b&&e(18,l=b.onModalStateChange),"onSavedCoffeeBeans"in b&&e(19,o=b.onSavedCoffeeBeans)},n.$$.update=()=>{n.$$.dirty[0]&1&&p===!1&&e(10,_="")},[p,r,u,a,i,f,m,v,d,h,_,I,E,M,g,B,O,K,l,o,s,Q,Y,Z,T,y,z,R,ie,Ce,Te]}class Re extends ae{constructor(t){super(),le(this,t,Ve,Pe,ne,{onModalStateChange:18,onSavedCoffeeBeans:19,setModalState:20},null,[-1,-1])}get setModalState(){return this.$$.ctx[20]}}function pe(n,t,e){const l=n.slice();return l[13]=t[e],l}function Ue(n){let t;return{c(){t=U("Coffee beans:")},l(e){t=H(e,"Coffee beans:")},m(e,l){D(e,t,l)},d(e){e&&C(t)}}}function He(n){let t,e="Loading coffee beans...";return{c(){t=w("option"),t.textContent=e,this.h()},l(l){t=S(l,"OPTION",{"data-svelte-h":!0}),te(t)!=="svelte-1sf778f"&&(t.textContent=e),this.h()},h(){t.disabled=!0,t.selected=!0,t.__value="",V(t,t.__value)},m(l,o){D(l,t,o)},p:Me,d(l){l&&C(t)}}}function Ke(n){let t,e=[],l=new Map,o,s=n[1]===void 0&&n[5]===!0&&be(),r=he(n[4]);const u=a=>a[13].id;for(let a=0;a<r.length;a+=1){let i=pe(n,r,a),f=u(i);l.set(f,e[a]=ve(f,i))}return{c(){s&&s.c(),t=re();for(let a=0;a<e.length;a+=1)e[a].c();o=re()},l(a){s&&s.l(a),t=re();for(let i=0;i<e.length;i+=1)e[i].l(a);o=re()},m(a,i){s&&s.m(a,i),D(a,t,i);for(let f=0;f<e.length;f+=1)e[f]&&e[f].m(a,i);D(a,o,i)},p(a,i){a[1]===void 0&&a[5]===!0?s||(s=be(),s.c(),s.m(t.parentNode,t)):s&&(s.d(1),s=null),i&18&&(r=he(a[4]),e=ye(e,i,u,1,a,r,l,o.parentNode,Fe,ve,o,pe))},d(a){a&&(C(t),C(o)),s&&s.d(a);for(let i=0;i<e.length;i+=1)e[i].d(a)}}}function be(n){let t;return{c(){t=w("option"),this.h()},l(e){t=S(e,"OPTION",{}),N(t).forEach(C),this.h()},h(){t.disabled=!0,t.selected=!0,t.__value="",V(t,t.__value)},m(e,l){D(e,t,l)},d(e){e&&C(t)}}}function ve(n,t){let e,l=t[13].name+"",o,s,r;return{key:n,first:null,c(){e=w("option"),o=U(l),this.h()},l(u){e=S(u,"OPTION",{});var a=N(e);o=H(a,l),a.forEach(C),this.h()},h(){e.selected=s=t[1]===t[13].id,e.__value=r=t[13].id,V(e,e.__value),this.first=e},m(u,a){D(u,e,a),k(e,o)},p(u,a){t=u,a&16&&l!==(l=t[13].name+"")&&se(o,l),a&18&&s!==(s=t[1]===t[13].id)&&(e.selected=s),a&16&&r!==(r=t[13].id)&&(e.__value=r,V(e,e.__value))},d(u){u&&C(e)}}}function ge(n){let t,e='<span class="material-icons md-18">add</span>',l,o,s,r,u,a;function i(m){n[12](m)}let f={onSavedCoffeeBeans:n[3]};return n[6]!==void 0&&(f.setModalState=n[6]),o=new Re({props:f}),P.push(()=>ee(o,"setModalState",i)),{c(){t=w("button"),t.innerHTML=e,l=j(),G(o.$$.fragment),this.h()},l(m){t=S(m,"BUTTON",{class:!0,"data-svelte-h":!0}),te(t)!=="svelte-h0kid9"&&(t.innerHTML=e),l=A(m),J(o.$$.fragment,m),this.h()},h(){c(t,"class","button-add bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-700 transition svelte-1xjn7qa")},m(m,v){D(m,t,v),D(m,l,v),W(o,m,v),r=!0,u||(a=F(t,"click",ke(n[11])),u=!0)},p(m,v){const d={};v&8&&(d.onSavedCoffeeBeans=m[3]),!s&&v&64&&(s=!0,d.setModalState=m[6],$(()=>s=!1)),o.$set(d)},i(m){r||(L(o.$$.fragment,m),r=!0)},o(m){q(o.$$.fragment,m),r=!1},d(m){m&&(C(t),C(l)),X(o,m),u=!1,a()}}}function Ge(n){let t,e,l,o,s,r,u,a,i,f,m,v,d,h,p;l=new oe({props:{for_:fe,valid:!n[0],$$slots:{default:[Ue]},$$scope:{ctx:n}}});function _(g,B){return g[4]!==void 0?Ke:He}let I=_(n),E=I(n),M=n[5]&&ge(n);return{c(){t=w("div"),e=w("div"),G(l.$$.fragment),o=j(),s=w("div"),r=w("select"),E.c(),i=j(),M&&M.c(),f=j(),m=w("p"),v=U(n[7]),this.h()},l(g){t=S(g,"DIV",{});var B=N(t);e=S(B,"DIV",{class:!0});var O=N(e);J(l.$$.fragment,O),o=A(O),s=S(O,"DIV",{class:!0});var K=N(s);r=S(K,"SELECT",{id:!0,class:!0,name:!0,tabindex:!0});var Q=N(r);E.l(Q),Q.forEach(C),i=A(K),M&&M.l(K),K.forEach(C),O.forEach(C),f=A(B),m=S(B,"P",{class:!0});var Y=N(m);v=H(Y,n[7]),Y.forEach(C),B.forEach(C),this.h()},h(){c(r,"id",fe),c(r,"class",u=ue(n[0]?"invalid":"valid")+" svelte-1xjn7qa"),r.disabled=a=n[4]===void 0,c(r,"name",fe),c(r,"tabindex","0"),n[1]===void 0&&Se(()=>n[10].call(r)),c(s,"class","select-container svelte-1xjn7qa"),c(e,"class","container svelte-1xjn7qa"),c(m,"class","text-sm text-red-600 dark:text-red-500"),me(m,"mt-2",n[7].length>0)},m(g,B){D(g,t,B),k(t,e),W(l,e,null),k(e,o),k(e,s),k(s,r),E.m(r,null),n[9](r),_e(r,n[1],!0),k(s,i),M&&M.m(s,null),k(t,f),k(t,m),k(m,v),d=!0,h||(p=[F(r,"change",n[10]),F(r,"change",n[8])],h=!0)},p(g,[B]){const O={};B&1&&(O.valid=!g[0]),B&65536&&(O.$$scope={dirty:B,ctx:g}),l.$set(O),I===(I=_(g))&&E?E.p(g,B):(E.d(1),E=I(g),E&&(E.c(),E.m(r,null))),(!d||B&1&&u!==(u=ue(g[0]?"invalid":"valid")+" svelte-1xjn7qa"))&&c(r,"class",u),(!d||B&16&&a!==(a=g[4]===void 0))&&(r.disabled=a),B&18&&_e(r,g[1]),g[5]?M?(M.p(g,B),B&32&&L(M,1)):(M=ge(g),M.c(),L(M,1),M.m(s,null)):M&&(Be(),q(M,1,1,()=>{M=null}),Ee()),(!d||B&128)&&se(v,g[7]),(!d||B&128)&&me(m,"mt-2",g[7].length>0)},i(g){d||(L(l.$$.fragment,g),L(M),d=!0)},o(g){q(l.$$.fragment,g),q(M),d=!1},d(g){g&&C(t),X(l),E.d(),n[9](null),M&&M.d(),h=!1,de(p)}}}const fe="coffee-beans";function Je(n,t,e){let{onSavedCoffeeBeans:l=void 0}=t,{allCoffeeBeans:o}=t,{selectedCoffeeBeansId:s}=t,{validationFailed:r=!1}=t,{showAddButton:u=!0}=t,{selectDOM:a=void 0}=t,i,f="";function m(){r&&e(0,r=!1)}function v(_){P[_?"unshift":"push"](()=>{a=_,e(2,a)})}function d(){s=Ie(this),e(1,s),e(4,o)}const h=()=>{i!==void 0&&i("open")};function p(_){i=_,e(6,i)}return n.$$set=_=>{"onSavedCoffeeBeans"in _&&e(3,l=_.onSavedCoffeeBeans),"allCoffeeBeans"in _&&e(4,o=_.allCoffeeBeans),"selectedCoffeeBeansId"in _&&e(1,s=_.selectedCoffeeBeansId),"validationFailed"in _&&e(0,r=_.validationFailed),"showAddButton"in _&&e(5,u=_.showAddButton),"selectDOM"in _&&e(2,a=_.selectDOM)},n.$$.update=()=>{n.$$.dirty&1&&(r?e(7,f="Please select coffee beans."):e(7,f=""))},[r,s,a,l,o,u,i,f,m,v,d,h,p]}class ct extends ae{constructor(t){super(),le(this,t,Je,Ge,ne,{onSavedCoffeeBeans:3,allCoffeeBeans:4,selectedCoffeeBeansId:1,validationFailed:0,showAddButton:5,selectDOM:2})}}function We(n){let t;return{c(){t=U("Favorite:")},l(e){t=H(e,"Favorite:")},m(e,l){D(e,t,l)},d(e){e&&C(t)}}}function Xe(n){let t,e,l,o,s,r,u,a=n[0]?"❤":"🤍",i,f,m,v;return e=new oe({props:{for_:"favorite",$$slots:{default:[We]},$$scope:{ctx:n}}}),{c(){t=w("div"),G(e.$$.fragment),l=j(),o=w("div"),s=w("input"),r=j(),u=w("label"),i=U(a),this.h()},l(d){t=S(d,"DIV",{class:!0});var h=N(t);J(e.$$.fragment,h),l=A(h),o=S(h,"DIV",{class:!0});var p=N(o);s=S(p,"INPUT",{id:!0,name:!0,type:!0,class:!0}),r=A(p),u=S(p,"LABEL",{id:!0,for:!0,class:!0});var _=N(u);i=H(_,a),_.forEach(C),p.forEach(C),h.forEach(C),this.h()},h(){c(s,"id","favorite"),c(s,"name","favorite"),c(s,"type","checkbox"),c(s,"class","svelte-1jjz4qc"),c(u,"id","favorite-checkbox"),c(u,"for","favorite"),c(u,"class","svelte-1jjz4qc"),c(o,"class","input-container svelte-1jjz4qc"),c(t,"class","container svelte-1jjz4qc")},m(d,h){D(d,t,h),W(e,t,null),k(t,l),k(t,o),k(o,s),k(o,r),k(o,u),k(u,i),f=!0,m||(v=F(u,"click",n[1]),m=!0)},p(d,[h]){const p={};h&4&&(p.$$scope={dirty:h,ctx:d}),e.$set(p),(!f||h&1)&&a!==(a=d[0]?"❤":"🤍")&&se(i,a)},i(d){f||(L(e.$$.fragment,d),f=!0)},o(d){q(e.$$.fragment,d),f=!1},d(d){d&&C(t),X(e),m=!1,v()}}}function Qe(n,t,e){let{value:l=!1}=t;function o(){l===!0?e(0,l=!1):e(0,l=!0)}return n.$$set=s=>{"value"in s&&e(0,l=s.value)},[l,o]}class dt extends ae{constructor(t){super(),le(this,t,Qe,Xe,ne,{value:0})}}function Ye(n){let t;return{c(){t=U("Timestamp:")},l(e){t=H(e,"Timestamp:")},m(e,l){D(e,t,l)},d(e){e&&C(t)}}}function Ze(n){let t,e,l,o,s,r,u;return e=new oe({props:{for_:ce,$$slots:{default:[Ye]},$$scope:{ctx:n}}}),{c(){t=w("div"),G(e.$$.fragment),l=j(),o=w("input"),this.h()},l(a){t=S(a,"DIV",{class:!0});var i=N(t);J(e.$$.fragment,i),l=A(i),o=S(i,"INPUT",{id:!0,class:!0,name:!0,type:!0}),i.forEach(C),this.h()},h(){c(o,"id",ce),c(o,"class","bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"),c(o,"name",ce),c(o,"type","datetime-local"),c(t,"class","container svelte-1iivmi0")},m(a,i){D(a,t,i),W(e,t,null),k(t,l),k(t,o),V(o,n[0]),s=!0,r||(u=F(o,"input",n[1]),r=!0)},p(a,[i]){const f={};i&4&&(f.$$scope={dirty:i,ctx:a}),e.$set(f),i&1&&V(o,a[0])},i(a){s||(L(e.$$.fragment,a),s=!0)},o(a){q(e.$$.fragment,a),s=!1},d(a){a&&C(t),X(e),r=!1,u()}}}const ce="timestamp";function xe(n,t,e){let{value:l}=t;function o(){l=this.value,e(0,l)}return n.$$set=s=>{"value"in s&&e(0,l=s.value)},[l,o]}class mt extends ae{constructor(t){super(),le(this,t,xe,Ze,ne,{value:0})}}function $e(n){let t;return{c(){t=U(n[1])},l(e){t=H(e,n[1])},m(e,l){D(e,t,l)},p(e,l){l&2&&se(t,e[1])},d(e){e&&C(t)}}}function et(n){let t,e,l,o,s,r='<svg fill="none" viewBox="0 0 18 2" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="svelte-1nfrhyi"><path d="M1 1h16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>',u,a,i,f,m='<svg fill="none" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="svelte-1nfrhyi"><path d="M9 1v16M1 9h16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>',v,d,h;return e=new oe({props:{for_:n[2],$$slots:{default:[$e]},$$scope:{ctx:n}}}),{c(){t=w("div"),G(e.$$.fragment),l=j(),o=w("div"),s=w("button"),s.innerHTML=r,u=j(),a=w("input"),i=j(),f=w("button"),f.innerHTML=m,this.h()},l(p){t=S(p,"DIV",{class:!0});var _=N(t);J(e.$$.fragment,_),l=A(_),o=S(_,"DIV",{class:!0});var I=N(o);s=S(I,"BUTTON",{id:!0,class:!0,tabindex:!0,type:!0,"data-svelte-h":!0}),te(s)!=="svelte-ss836l"&&(s.innerHTML=r),u=A(I),a=S(I,"INPUT",{id:!0,autocomplete:!0,name:!0,type:!0,class:!0}),i=A(I),f=S(I,"BUTTON",{id:!0,class:!0,tabindex:!0,type:!0,"data-svelte-h":!0}),te(f)!=="svelte-vs8q80"&&(f.innerHTML=m),I.forEach(C),_.forEach(C),this.h()},h(){c(s,"id","decrement-button"),c(s,"class","minus-button svelte-1nfrhyi"),c(s,"tabindex","-1"),c(s,"type","button"),c(a,"id",n[2]),c(a,"autocomplete","off"),c(a,"name",n[2]),c(a,"type","text"),c(a,"class","svelte-1nfrhyi"),c(f,"id","increment-button"),c(f,"class","plus-button svelte-1nfrhyi"),c(f,"tabindex","-1"),c(f,"type","button"),c(o,"class","input-container svelte-1nfrhyi"),c(t,"class","container svelte-1nfrhyi")},m(p,_){D(p,t,_),W(e,t,null),k(t,l),k(t,o),k(o,s),k(o,u),k(o,a),V(a,n[0]),k(o,i),k(o,f),v=!0,d||(h=[F(s,"click",n[4]),F(a,"input",n[9]),F(a,"focusin",nt),F(a,"focusout",n[3]),F(a,"keydown",tt),F(f,"click",n[5])],d=!0)},p(p,[_]){const I={};_&4&&(I.for_=p[2]),_&2050&&(I.$$scope={dirty:_,ctx:p}),e.$set(I),(!v||_&4)&&c(a,"id",p[2]),(!v||_&4)&&c(a,"name",p[2]),_&1&&a.value!==p[0]&&V(a,p[0])},i(p){v||(L(e.$$.fragment,p),v=!0)},o(p){q(e.$$.fragment,p),v=!1},d(p){p&&C(t),X(e),d=!1,de(h)}}}function tt(n){const t=n.key;if(t!=="Tab"&&(t<"0"||t>"9")&&t!=="."&&t!=="Backspace"&&t!=="Delete"&&t!=="ArrowLeft"&&t!=="ArrowRight"){n.preventDefault();return}}function nt(n){const t=n.currentTarget.value.length;n.currentTarget.setSelectionRange(0,t)}function at(n,t,e){let{value:l=0}=t,{labelText:o=""}=t,{nameAttr:s=""}=t,{min:r=0}=t,{max:u=Number.MAX_SAFE_INTEGER}=t,{step:a=1}=t;function i(h){v(h.currentTarget.value)}function f(){v(l),l>=r+a&&e(0,l-=a)}function m(){v(l),l<=u-a&&e(0,l+=a)}function v(h){const p=Number(h);if(isNaN(p)){e(0,l=r);return}if(p>u){e(0,l=u);return}if(p<r){e(0,l=r);return}if(p%a!==0){e(0,l=Math.floor(p/a)*a);return}e(0,l=p)}function d(){l=this.value,e(0,l)}return n.$$set=h=>{"value"in h&&e(0,l=h.value),"labelText"in h&&e(1,o=h.labelText),"nameAttr"in h&&e(2,s=h.nameAttr),"min"in h&&e(6,r=h.min),"max"in h&&e(7,u=h.max),"step"in h&&e(8,a=h.step)},[l,o,s,i,f,m,r,u,a,d]}class _t extends ae{constructor(t){super(),le(this,t,at,et,ne,{value:0,labelText:1,nameAttr:2,min:6,max:7,step:8})}}export{ct as C,dt as F,_t as N,mt as T,ft as p};
