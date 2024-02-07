import{s as re,r as be,d as Z,z as ue,e as ve,t as Oe,l as Se,n as Fe}from"./scheduler.CLMd_sLG.js";import{S as ce,i as de,e as D,m as q,s as y,c as N,a as S,o as G,f as A,w as le,d as g,x as d,g as I,p as W,h as w,F as j,B as O,l as H,k as z,r as X,t as Y,b as J,j as me,A as ge,z as ke,C as Ce,G as Te,u as Pe,q as Le,H as Ve,v as fe,y as He}from"./index.ikDpSZE5.js";import{L as ae,M as ze,T as Re}from"./Textarea.WQzywiHd.js";import{e as Be}from"./each.VSbhRpyy.js";import{q as Ue,f as je,C as Ke}from"./PageHeadline.LTitun6w.js";import{M as qe}from"./MySidebar.0N2hOtb5.js";function Ge(n){let t;return{c(){t=Y(n[1])},l(e){t=J(e,n[1])},m(e,s){I(e,t,s)},p(e,s){s&2&&me(t,e[1])},d(e){e&&g(t)}}}function We(n){let t,e,s,o,a,i='<svg aria-hidden="true" fill="none" viewBox="0 0 18 2" xmlns="http://www.w3.org/2000/svg" class="svelte-1srudln"><path d="M1 1h16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>',f,l,r,v,b='<svg aria-hidden="true" fill="none" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" class="svelte-1srudln"><path d="M9 1v16M1 9h16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>',_,h,k;return e=new ae({props:{_for:n[2],$$slots:{default:[Ge]},$$scope:{ctx:n}}}),{c(){t=D("div"),q(e.$$.fragment),s=y(),o=D("div"),a=D("button"),a.innerHTML=i,f=y(),l=D("input"),r=y(),v=D("button"),v.innerHTML=b,this.h()},l(u){t=N(u,"DIV",{class:!0});var E=S(t);G(e.$$.fragment,E),s=A(E),o=N(E,"DIV",{class:!0});var C=S(o);a=N(C,"BUTTON",{class:!0,id:!0,type:!0,"data-svelte-h":!0}),le(a)!=="svelte-1sjm32z"&&(a.innerHTML=i),f=A(C),l=N(C,"INPUT",{id:!0,name:!0,type:!0,class:!0}),r=A(C),v=N(C,"BUTTON",{class:!0,id:!0,type:!0,"data-svelte-h":!0}),le(v)!=="svelte-dwjmuy"&&(v.innerHTML=b),C.forEach(g),E.forEach(g),this.h()},h(){d(a,"class","minus-button svelte-1srudln"),d(a,"id","decrement-button"),d(a,"type","button"),d(l,"id",n[2]),d(l,"name",n[2]),d(l,"type","text"),d(l,"class","svelte-1srudln"),d(v,"class","plus-button svelte-1srudln"),d(v,"id","increment-button"),d(v,"type","button"),d(o,"class","input-container svelte-1srudln"),d(t,"class","container svelte-1srudln")},m(u,E){I(u,t,E),W(e,t,null),w(t,s),w(t,o),w(o,a),w(o,f),w(o,l),j(l,n[0]),w(o,r),w(o,v),_=!0,h||(k=[O(a,"click",n[4]),O(l,"input",n[9]),O(l,"focusout",n[3]),O(l,"keydown",Xe),O(v,"click",n[5])],h=!0)},p(u,[E]){const C={};E&4&&(C._for=u[2]),E&2050&&(C.$$scope={dirty:E,ctx:u}),e.$set(C),(!_||E&4)&&d(l,"id",u[2]),(!_||E&4)&&d(l,"name",u[2]),E&1&&l.value!==u[0]&&j(l,u[0])},i(u){_||(H(e.$$.fragment,u),_=!0)},o(u){z(e.$$.fragment,u),_=!1},d(u){u&&g(t),X(e),h=!1,be(k)}}}function Xe(n){const t=n.key;if((t<"0"||t>"9")&&t!=="."&&t!=="Backspace"&&t!=="Delete"&&t!=="ArrowLeft"&&t!=="ArrowRight"){n.preventDefault();return}}function Ye(n,t,e){let{value:s=0}=t,{labelText:o=""}=t,{nameAttr:a=""}=t,{min:i=0}=t,{max:f=Number.MAX_SAFE_INTEGER}=t,{step:l=1}=t;function r(k){_(k.currentTarget.value)}function v(){_(s),s>=i+l&&e(0,s-=l)}function b(){_(s),s<=f-l&&e(0,s+=l)}function _(k){const u=Number(k);if(isNaN(u)){e(0,s=i);return}if(u>f){e(0,s=f);return}if(u<i){e(0,s=i);return}if(u%l!==0){e(0,s=Math.floor(u/l)*l);return}e(0,s=u)}function h(){s=this.value,e(0,s)}return n.$$set=k=>{"value"in k&&e(0,s=k.value),"labelText"in k&&e(1,o=k.labelText),"nameAttr"in k&&e(2,a=k.nameAttr),"min"in k&&e(6,i=k.min),"max"in k&&e(7,f=k.max),"step"in k&&e(8,l=k.step)},[s,o,a,r,v,b,i,f,l,h]}class pt extends ce{constructor(t){super(),de(this,t,Ye,We,re,{value:0,labelText:1,nameAttr:2,min:6,max:7,step:8})}}function Je(n){let t;return{c(){t=Y("Add new coffee beans")},l(e){t=J(e,"Add new coffee beans")},m(e,s){I(e,t,s)},d(e){e&&g(t)}}}function Qe(n){let t;return{c(){t=Y("Coffee beans name:")},l(e){t=J(e,"Coffee beans name:")},m(e,s){I(e,t,s)},d(e){e&&g(t)}}}function Ze(n){let t;return{c(){t=Y("Description:")},l(e){t=J(e,"Description:")},m(e,s){I(e,t,s)},d(e){e&&g(t)}}}function $e(n){let t,e,s='<span class="material-icons md-18">add</span>',o,a,i,f,l,r,v,b,_,h,k,u,E,C,B,p,T,F,P,L,ee,V,te,ne,se,R,ie="Save",c,$,we;i=new qe({props:{asGap:!0}}),r=new ze({props:{$$slots:{default:[Je]},$$scope:{ctx:n}}}),r.$on("click",n[21]),h=new ae({props:{_for:"name",valid:!n[0],$$slots:{default:[Qe]},$$scope:{ctx:n}}}),L=new ae({props:{_for:"description",$$slots:{default:[Ze]},$$scope:{ctx:n}}});function ye(m){n[24](m)}function Ae(m){n[25](m)}let _e={id:"description",name:"description",placeholder:xe};return n[5]!==void 0&&(_e._this=n[5]),n[8]!==void 0&&(_e.value=n[8]),V=new Re({props:_e}),Z.push(()=>ge(V,"_this",ye)),Z.push(()=>ge(V,"value",Ae)),V.$on("keydown",n[14]),{c(){t=y(),e=D("button"),e.innerHTML=s,o=y(),a=D("div"),q(i.$$.fragment),f=y(),l=D("div"),q(r.$$.fragment),v=y(),b=D("form"),_=D("div"),q(h.$$.fragment),k=y(),u=D("input"),B=y(),p=D("p"),T=Y(n[9]),F=y(),P=D("div"),q(L.$$.fragment),ee=y(),q(V.$$.fragment),se=y(),R=D("button"),R.textContent=ie,this.h()},l(m){t=A(m),e=N(m,"BUTTON",{class:!0,"data-svelte-h":!0}),le(e)!=="svelte-q4a19"&&(e.innerHTML=s),o=A(m),a=N(m,"DIV",{class:!0});var M=S(a);G(i.$$.fragment,M),f=A(M),l=N(M,"DIV",{class:!0});var Q=S(l);G(r.$$.fragment,Q),v=A(Q),b=N(Q,"FORM",{class:!0});var U=S(b);_=N(U,"DIV",{class:!0});var K=S(_);G(h.$$.fragment,K),k=A(K),u=N(K,"INPUT",{id:!0,class:!0,name:!0,placeholder:!0,type:!0}),B=A(K),p=N(K,"P",{class:!0});var x=S(p);T=J(x,n[9]),x.forEach(g),K.forEach(g),F=A(U),P=N(U,"DIV",{class:!0});var oe=S(P);G(L.$$.fragment,oe),ee=A(oe),G(V.$$.fragment,oe),oe.forEach(g),se=A(U),R=N(U,"BUTTON",{class:!0,type:!0,"data-svelte-h":!0}),le(R)!=="svelte-j4uhei"&&(R.textContent=ie),U.forEach(g),Q.forEach(g),M.forEach(g),this.h()},h(){d(e,"class","button-add svelte-cg43m0"),d(u,"id","name"),d(u,"class",E=ue(n[0]?"input-name-validation-failed":"input-name")+" svelte-cg43m0"),d(u,"name","name"),d(u,"placeholder",C=n[0]?"":"Example: Rwanda Mabanza"),d(u,"type","text"),d(p,"class","mt-2 text-sm text-red-600 dark:text-red-500"),d(_,"class","mb-5"),d(P,"class","my-div mb-5 svelte-cg43m0"),d(R,"class","button-submit svelte-cg43m0"),d(R,"type","submit"),d(b,"class","max-w-sm mx-auto"),d(l,"class","inner-container svelte-cg43m0"),d(a,"class","modal-container svelte-cg43m0"),ke(a,"show-modal",n[1])},m(m,M){I(m,t,M),I(m,e,M),n[19](e),I(m,o,M),I(m,a,M),W(i,a,null),w(a,f),w(a,l),W(r,l,null),w(l,v),w(l,b),w(b,_),W(h,_,null),w(_,k),w(_,u),n[22](u),j(u,n[7]),w(_,B),w(_,p),w(p,T),w(b,F),w(b,P),W(L,P,null),w(P,ee),W(V,P,null),w(b,se),w(b,R),n[26](b),n[27](l),c=!0,$||(we=[O(window,"keydown",n[12]),O(document,"click",n[17]),O(e,"click",Ce(n[20])),O(u,"input",n[23]),O(u,"input",n[16]),O(u,"keydown",n[13]),O(b,"submit",Ce(n[15]))],$=!0)},p(m,[M]){const Q={};M&268435456&&(Q.$$scope={dirty:M,ctx:m}),r.$set(Q);const U={};M&1&&(U.valid=!m[0]),M&268435456&&(U.$$scope={dirty:M,ctx:m}),h.$set(U),(!c||M&1&&E!==(E=ue(m[0]?"input-name-validation-failed":"input-name")+" svelte-cg43m0"))&&d(u,"class",E),(!c||M&1&&C!==(C=m[0]?"":"Example: Rwanda Mabanza"))&&d(u,"placeholder",C),M&128&&u.value!==m[7]&&j(u,m[7]),(!c||M&512)&&me(T,m[9]);const K={};M&268435456&&(K.$$scope={dirty:M,ctx:m}),L.$set(K);const x={};!te&&M&32&&(te=!0,x._this=m[5],ve(()=>te=!1)),!ne&&M&256&&(ne=!0,x.value=m[8],ve(()=>ne=!1)),V.$set(x),(!c||M&2)&&ke(a,"show-modal",m[1])},i(m){c||(H(i.$$.fragment,m),H(r.$$.fragment,m),H(h.$$.fragment,m),H(L.$$.fragment,m),H(V.$$.fragment,m),c=!0)},o(m){z(i.$$.fragment,m),z(r.$$.fragment,m),z(h.$$.fragment,m),z(L.$$.fragment,m),z(V.$$.fragment,m),c=!1},d(m){m&&(g(t),g(e),g(o),g(a)),n[19](null),X(i),X(r),X(h),n[22](null),X(L),X(V),n[26](null),n[27](null),$=!1,be(we)}}}const xe="Example: Washed process. Notes: plum, cherry.";function Ee(n,t){const e=n.getBoundingClientRect(),s=t.clientX,o=t.clientY;return s<e.left||s>e.right||o<e.top||o>e.bottom}function et(n,t,e){let{savedCoffeeBeans:s=void 0}=t,o=!1,a,i,f,l,r,v="",b="",_=!1,h="";function k(){e(1,o=!0),Oe().then(()=>{f.focus()})}function u(){e(1,o=!1),e(0,_=!1)}function E(c){o&&c.key==="Escape"&&e(1,o=!1)}function C(c){c.key==="Enter"&&(c.preventDefault(),l.focus())}function B(c){c.key==="Enter"&&(c.metaKey||c.ctrlKey)&&(c.preventDefault(),r.requestSubmit())}async function p(){const c=Ue.create({name:v,description:b});if(c==="ValidationFailed_NameMustBeAtLeast3CharsLong"){e(0,_=!0),e(9,h="Name must be at least 3 characters long.");return}const $=await je(c);if($==="Failure_NameAlreadyExist"){e(0,_=!0),e(9,h="Coffee beans with this name exist already.");return}alert("We saved the coffee beans successfully."),e(18,s=$),u(),e(7,v=""),e(8,b="")}function T(){_&&(e(0,_=!1),e(9,h=""))}function F(c){o!==!1&&Ee(a,c)&&Ee(i,c)&&u()}function P(c){Z[c?"unshift":"push"](()=>{i=c,e(3,i)})}const L=()=>k(),ee=()=>u();function V(c){Z[c?"unshift":"push"](()=>{f=c,e(4,f)})}function te(){v=this.value,e(7,v)}function ne(c){l=c,e(5,l)}function se(c){b=c,e(8,b)}function R(c){Z[c?"unshift":"push"](()=>{r=c,e(6,r)})}function ie(c){Z[c?"unshift":"push"](()=>{a=c,e(2,a)})}return n.$$set=c=>{"savedCoffeeBeans"in c&&e(18,s=c.savedCoffeeBeans)},n.$$.update=()=>{n.$$.dirty&1&&_===!1&&e(9,h="")},[_,o,a,i,f,l,r,v,b,h,k,u,E,C,B,p,T,F,s,P,L,ee,V,te,ne,se,R,ie]}class tt extends ce{constructor(t){super(),de(this,t,et,$e,re,{savedCoffeeBeans:18})}}function Me(n,t,e){const s=n.slice();return s[10]=t[e],s}function nt(n){let t;return{c(){t=Y("Coffee beans:")},l(e){t=J(e,"Coffee beans:")},m(e,s){I(e,t,s)},d(e){e&&g(t)}}}function st(n){let t,e="Loading coffee beans...";return{c(){t=D("option"),t.textContent=e,this.h()},l(s){t=N(s,"OPTION",{"data-svelte-h":!0}),le(t)!=="svelte-1sf778f"&&(t.textContent=e),this.h()},h(){t.disabled=!0,t.selected=!0,t.__value="",j(t,t.__value)},m(s,o){I(s,t,o)},p:Fe,d(s){s&&g(t)}}}function lt(n){let t,e,s=n[1]===void 0&&n[3]===!0&&De(),o=Be(n[2]),a=[];for(let i=0;i<o.length;i+=1)a[i]=Ne(Me(n,o,i));return{c(){s&&s.c(),t=fe();for(let i=0;i<a.length;i+=1)a[i].c();e=fe()},l(i){s&&s.l(i),t=fe();for(let f=0;f<a.length;f+=1)a[f].l(i);e=fe()},m(i,f){s&&s.m(i,f),I(i,t,f);for(let l=0;l<a.length;l+=1)a[l]&&a[l].m(i,f);I(i,e,f)},p(i,f){if(i[1]===void 0&&i[3]===!0?s||(s=De(),s.c(),s.m(t.parentNode,t)):s&&(s.d(1),s=null),f&6){o=Be(i[2]);let l;for(l=0;l<o.length;l+=1){const r=Me(i,o,l);a[l]?a[l].p(r,f):(a[l]=Ne(r),a[l].c(),a[l].m(e.parentNode,e))}for(;l<a.length;l+=1)a[l].d(1);a.length=o.length}},d(i){i&&(g(t),g(e)),s&&s.d(i),He(a,i)}}}function De(n){let t;return{c(){t=D("option"),this.h()},l(e){t=N(e,"OPTION",{}),S(t).forEach(g),this.h()},h(){t.disabled=!0,t.selected=!0,t.__value="",j(t,t.__value)},m(e,s){I(e,t,s)},d(e){e&&g(t)}}}function Ne(n){let t,e=n[10].name+"",s,o,a;return{c(){t=D("option"),s=Y(e),this.h()},l(i){t=N(i,"OPTION",{});var f=S(t);s=J(f,e),f.forEach(g),this.h()},h(){var i;t.selected=o=((i=n[1])==null?void 0:i.id)===n[10].id,t.__value=a=n[10].id,j(t,t.__value)},m(i,f){I(i,t,f),w(t,s)},p(i,f){var l;f&4&&e!==(e=i[10].name+"")&&me(s,e),f&6&&o!==(o=((l=i[1])==null?void 0:l.id)===i[10].id)&&(t.selected=o),f&4&&a!==(a=i[10].id)&&(t.__value=a,j(t,t.__value))},d(i){i&&g(t)}}}function Ie(n){let t,e,s;function o(i){n[9](i)}let a={};return n[5]!==void 0&&(a.savedCoffeeBeans=n[5]),t=new tt({props:a}),Z.push(()=>ge(t,"savedCoffeeBeans",o)),{c(){q(t.$$.fragment)},l(i){G(t.$$.fragment,i)},m(i,f){W(t,i,f),s=!0},p(i,f){const l={};!e&&f&32&&(e=!0,l.savedCoffeeBeans=i[5],ve(()=>e=!1)),t.$set(l)},i(i){s||(H(t.$$.fragment,i),s=!0)},o(i){z(t.$$.fragment,i),s=!1},d(i){X(t,i)}}}function at(n){let t,e,s,o,a,i,f,l,r,v,b,_,h,k;e=new ae({props:{_for:he,valid:!n[0],$$slots:{default:[nt]},$$scope:{ctx:n}}});function u(p,T){return p[2]!==void 0?lt:st}let E=u(n),C=E(n),B=n[3]&&Ie(n);return{c(){t=D("div"),q(e.$$.fragment),s=y(),o=D("div"),a=D("select"),C.c(),l=y(),B&&B.c(),r=y(),v=D("p"),b=Y(n[6]),this.h()},l(p){t=N(p,"DIV",{class:!0});var T=S(t);G(e.$$.fragment,T),s=A(T),o=N(T,"DIV",{class:!0});var F=S(o);a=N(F,"SELECT",{class:!0,id:!0,name:!0});var P=S(a);C.l(P),P.forEach(g),l=A(F),B&&B.l(F),F.forEach(g),T.forEach(g),r=A(p),v=N(p,"P",{class:!0});var L=S(v);b=J(L,n[6]),L.forEach(g),this.h()},h(){d(a,"class",i=ue(n[0]?"invalid":"valid")+" svelte-cut39x"),a.disabled=f=n[2]===void 0,d(a,"id",he),d(a,"name",he),n[4]===void 0&&Se(()=>n[8].call(a)),d(o,"class","select-container svelte-cut39x"),d(t,"class","container svelte-cut39x"),d(v,"class","mt-2 text-sm text-red-600 dark:text-red-500")},m(p,T){I(p,t,T),W(e,t,null),w(t,s),w(t,o),w(o,a),C.m(a,null),Te(a,n[4],!0),w(o,l),B&&B.m(o,null),I(p,r,T),I(p,v,T),w(v,b),_=!0,h||(k=[O(a,"change",n[8]),O(a,"change",n[7])],h=!0)},p(p,[T]){const F={};T&1&&(F.valid=!p[0]),T&8192&&(F.$$scope={dirty:T,ctx:p}),e.$set(F),E===(E=u(p))&&C?C.p(p,T):(C.d(1),C=E(p),C&&(C.c(),C.m(a,null))),(!_||T&1&&i!==(i=ue(p[0]?"invalid":"valid")+" svelte-cut39x"))&&d(a,"class",i),(!_||T&4&&f!==(f=p[2]===void 0))&&(a.disabled=f),T&20&&Te(a,p[4]),p[3]?B?(B.p(p,T),T&8&&H(B,1)):(B=Ie(p),B.c(),H(B,1),B.m(o,null)):B&&(Pe(),z(B,1,1,()=>{B=null}),Le()),(!_||T&64)&&me(b,p[6])},i(p){_||(H(e.$$.fragment,p),H(B),_=!0)},o(p){z(e.$$.fragment,p),z(B),_=!1},d(p){p&&(g(t),g(r),g(v)),X(e),C.d(),B&&B.d(),h=!1,be(k)}}}const he="coffee-beans";function it(n,t,e){let{allCoffeeBeans:s}=t,{selectedCoffeeBeans:o}=t,{validationFailed:a=!1}=t,{showAddButton:i=!0}=t,f=o==null?void 0:o.id,l,r="";function v(){a&&e(0,a=!1),e(5,l=void 0)}function b(){f=Ve(this),e(4,f),e(2,s)}function _(h){l=h,e(5,l)}return n.$$set=h=>{"allCoffeeBeans"in h&&e(2,s=h.allCoffeeBeans),"selectedCoffeeBeans"in h&&e(1,o=h.selectedCoffeeBeans),"validationFailed"in h&&e(0,a=h.validationFailed),"showAddButton"in h&&e(3,i=h.showAddButton)},n.$$.update=()=>{n.$$.dirty&20&&s!==void 0&&e(1,o=s.find(h=>h.id===f)),n.$$.dirty&36&&l instanceof Ke&&((s==null?void 0:s.find(h=>h.id===(l==null?void 0:l.id)))===void 0&&(s==null||s.push(l)),e(1,o=l),e(0,a=!1)),n.$$.dirty&1&&(a?e(6,r="Please select a coffee beans."):e(6,r=""))},[a,o,s,i,f,l,r,v,b,_]}class vt extends ce{constructor(t){super(),de(this,t,it,at,re,{allCoffeeBeans:2,selectedCoffeeBeans:1,validationFailed:0,showAddButton:3})}}function gt(n){const t=n.getTimezoneOffset()*6e4;return new Date(n.getTime()-t).toISOString().slice(0,-8)}function bt(n){const t=Date.parse(n);return new Date(t)}function ot(n){let t;return{c(){t=Y("Timestamp:")},l(e){t=J(e,"Timestamp:")},m(e,s){I(e,t,s)},d(e){e&&g(t)}}}function ft(n){let t,e,s,o,a,i,f;return e=new ae({props:{_for:pe,$$slots:{default:[ot]},$$scope:{ctx:n}}}),{c(){t=D("div"),q(e.$$.fragment),s=y(),o=D("input"),this.h()},l(l){t=N(l,"DIV",{class:!0});var r=S(t);G(e.$$.fragment,r),s=A(r),o=N(r,"INPUT",{id:!0,name:!0,type:!0,class:!0}),r.forEach(g),this.h()},h(){d(o,"id",pe),d(o,"name",pe),d(o,"type","datetime-local"),d(o,"class","svelte-12fyfgt"),d(t,"class","container svelte-12fyfgt")},m(l,r){I(l,t,r),W(e,t,null),w(t,s),w(t,o),j(o,n[0]),a=!0,i||(f=O(o,"input",n[1]),i=!0)},p(l,[r]){const v={};r&4&&(v.$$scope={dirty:r,ctx:l}),e.$set(v),r&1&&j(o,l[0])},i(l){a||(H(e.$$.fragment,l),a=!0)},o(l){z(e.$$.fragment,l),a=!1},d(l){l&&g(t),X(e),i=!1,f()}}}const pe="timestamp";function ut(n,t,e){let{value:s}=t;function o(){s=this.value,e(0,s)}return n.$$set=a=>{"value"in a&&e(0,s=a.value)},[s,o]}class wt extends ce{constructor(t){super(),de(this,t,ut,ft,re,{value:0})}}export{vt as C,pt as N,wt as T,gt as f,bt as p};
