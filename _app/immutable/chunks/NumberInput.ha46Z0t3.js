import{s as ae,b as R,a as ee,f as re,r as he,t as Be,j as Me,n as Ee}from"./scheduler.Cw1-ZcKD.js";import{S as le,i as se,v as te,k as W,m as X,n as J,q as y,o as q,r as Q,e as B,s as O,t as U,c as M,a as D,f as z,b as K,d as C,y as ne,z as h,g as V,h as w,D as j,A as N,B as Ce,j as ie,C as A,G as me,u as Ie,p as Fe,H as Ne,w as fe}from"./index.DHsbL8_X.js";import{j as De,e as _e,u as Ve,i as Ae}from"./manageCoffeeBeans.CzXUSSc2.js";import{a as ge}from"./sortCoffeeBeans.DnolUgAw.js";import{n as Oe,a as ve}from"./dateHelpers.DtGJLfnR.js";import{L as oe,T as ze}from"./Textarea.DSVAmZwN.js";import{M as Le}from"./Modal.BfvLJiFc.js";const ct={recipeTarget:"Example: 17 clicks, 15g + 260g filtered water.",recipeResult:"Example: 2m15s draw down + 15s drip.",recipeThoughts:"Example: Perfect balance. Perfect concentration. Flowery notes."};function Pe(n){let t;return{c(){t=U("Coffee beans name:")},l(e){t=K(e,"Coffee beans name:")},m(e,l){V(e,t,l)},d(e){e&&C(t)}}}function ye(n){let t,e,l,i,s,o,c,a,u,r,m,b,d,k,f,g,I,v,E="Save",p,S,L;l=new oe({props:{for_:"name",valid:!n[0],$$slots:{default:[Pe]},$$scope:{ctx:n}}});function G(T){n[23](T)}function Z(T){n[24](T)}function x(T){n[25](T)}let $={id:"description",label:"Description:",name:"description",placeholder:qe};return n[1]!==void 0&&($.resizeTextarea=n[1]),n[7]!==void 0&&($.this_=n[7]),n[9]!==void 0&&($.value=n[9]),d=new ze({props:$}),R.push(()=>te(d,"resizeTextarea",G)),R.push(()=>te(d,"this_",Z)),R.push(()=>te(d,"value",x)),d.$on("keydown",n[11]),{c(){t=B("form"),e=B("div"),W(l.$$.fragment),i=O(),s=B("input"),a=O(),u=B("p"),r=U(n[10]),m=O(),b=B("div"),W(d.$$.fragment),I=O(),v=B("button"),v.textContent=E,this.h()},l(T){t=M(T,"FORM",{class:!0});var F=D(t);e=M(F,"DIV",{class:!0});var P=D(e);X(l.$$.fragment,P),i=z(P),s=M(P,"INPUT",{id:!0,autocomplete:!0,class:!0,name:!0,placeholder:!0,type:!0}),a=z(P),u=M(P,"P",{class:!0});var H=D(u);r=K(H,n[10]),H.forEach(C),P.forEach(C),m=z(F),b=M(F,"DIV",{class:!0});var ue=D(b);X(d.$$.fragment,ue),ue.forEach(C),I=z(F),v=M(F,"BUTTON",{class:!0,type:!0,"data-svelte-h":!0}),ne(v)!=="svelte-ro3ydn"&&(v.textContent=E),F.forEach(C),this.h()},h(){h(s,"id","name"),h(s,"autocomplete","off"),h(s,"class",o=re(n[0]?"input-name-validation-failed":"input-name")+" svelte-tjgl6z"),h(s,"name","name"),h(s,"placeholder",c=n[0]?"":"Example: Rwanda Mabanza"),h(s,"type","text"),h(u,"class","mt-2 text-sm text-red-600 dark:text-red-500"),h(e,"class","mb-5"),h(b,"class","my-div mb-5 svelte-tjgl6z"),h(v,"class","button-submit svelte-tjgl6z"),h(v,"type","submit"),h(t,"class","mx-auto")},m(T,F){V(T,t,F),w(t,e),J(l,e,null),w(e,i),w(e,s),n[21](s),j(s,n[8]),w(e,a),w(e,u),w(u,r),w(t,m),w(t,b),J(d,b,null),w(t,I),w(t,v),n[26](v),n[27](t),p=!0,S||(L=[N(s,"input",n[22]),N(s,"focusin",n[17]),N(s,"input",n[13]),N(s,"keydown",n[12]),N(v,"keydown",n[16]),N(t,"submit",Ce(n[14]))],S=!0)},p(T,F){const P={};F[0]&1&&(P.valid=!T[0]),F[1]&1&&(P.$$scope={dirty:F,ctx:T}),l.$set(P),(!p||F[0]&1&&o!==(o=re(T[0]?"input-name-validation-failed":"input-name")+" svelte-tjgl6z"))&&h(s,"class",o),(!p||F[0]&1&&c!==(c=T[0]?"":"Example: Rwanda Mabanza"))&&h(s,"placeholder",c),F[0]&256&&s.value!==T[8]&&j(s,T[8]),(!p||F[0]&1024)&&ie(r,T[10]);const H={};!k&&F[0]&2&&(k=!0,H.resizeTextarea=T[1],ee(()=>k=!1)),!f&&F[0]&128&&(f=!0,H.this_=T[7],ee(()=>f=!1)),!g&&F[0]&512&&(g=!0,H.value=T[9],ee(()=>g=!1)),d.$set(H)},i(T){p||(y(l.$$.fragment,T),y(d.$$.fragment,T),p=!0)},o(T){q(l.$$.fragment,T),q(d.$$.fragment,T),p=!1},d(T){T&&C(t),Q(l),n[21](null),Q(d),n[26](null),n[27](null),S=!1,he(L)}}}function Re(n){let t,e,l,i;function s(a){n[29](a)}function o(a){n[30](a)}let c={onFocusReverse:n[28],onStateChange:n[15],title:"Add coffee beans",$$slots:{default:[ye]},$$scope:{ctx:n}};return n[2]!==void 0&&(c.setFocus=n[2]),n[3]!==void 0&&(c.setState=n[3]),t=new Le({props:c}),R.push(()=>te(t,"setFocus",s)),R.push(()=>te(t,"setState",o)),{c(){W(t.$$.fragment)},l(a){X(t.$$.fragment,a)},m(a,u){J(t,a,u),i=!0},p(a,u){const r={};u[0]&64&&(r.onFocusReverse=a[28]),u[0]&2035|u[1]&1&&(r.$$scope={dirty:u,ctx:a}),!e&&u[0]&4&&(e=!0,r.setFocus=a[2],ee(()=>e=!1)),!l&&u[0]&8&&(l=!0,r.setState=a[3],ee(()=>l=!1)),t.$set(r)},i(a){i||(y(t.$$.fragment,a),i=!0)},o(a){q(t.$$.fragment,a),i=!1},d(a){Q(t,a)}}}const qe="Example: Washed process. Notes: plum, cherry.";function je(n,t,e){let{onModalStateChange:l=void 0}=t,{onSavedCoffeeBeans:i=void 0}=t;const s=_=>{a(_)};let o,c,a,u,r,m,b,d="",k="",f=!1,g="";function I(_){_.key==="Enter"&&(_.metaKey||_.ctrlKey)&&(_.preventDefault(),u.requestSubmit())}function v(_){_.key==="Enter"&&(_.preventDefault(),b.focus())}function E(){f&&(e(0,f=!1),e(10,g=""))}async function p(){const _=Oe.create({name:d,description:k});if(_==="ValidationFailed_NameMustBeAtLeast3CharsLong"){e(0,f=!0),e(10,g="Name must be at least 3 characters long.");return}const Y=await De(_);if(Y==="Failure_NameAlreadyExist"){e(0,f=!0),e(10,g="Coffee beans with this name exist already.");return}if(Y==="DatabaseError"){e(0,f=!1),ve("CoffeeBeans not saved because of a database error.");return}ve(`Coffee beans "${Y.name}" created.`),i!==void 0&&i(Y),a("closed"),e(8,d=""),e(9,k="")}function S(_){_==="open"&&(e(8,d=""),e(9,k=""),e(10,g=""),Be().then(()=>{o(),r.focus()})),l!==void 0&&l(_)}function L(_){_.key==="Tab"&&_.shiftKey===!1&&(_.preventDefault(),c())}function G(_){const Y=_.currentTarget.value.length;r.setSelectionRange(Y,Y)}function Z(_){R[_?"unshift":"push"](()=>{r=_,e(5,r)})}function x(){d=this.value,e(8,d)}function $(_){o=_,e(1,o)}function T(_){b=_,e(7,b)}function F(_){k=_,e(9,k)}function P(_){R[_?"unshift":"push"](()=>{m=_,e(6,m)})}function H(_){R[_?"unshift":"push"](()=>{u=_,e(4,u)})}const ue=()=>m.focus();function Te(_){c=_,e(2,c)}function Se(_){a=_,e(3,a)}return n.$$set=_=>{"onModalStateChange"in _&&e(18,l=_.onModalStateChange),"onSavedCoffeeBeans"in _&&e(19,i=_.onSavedCoffeeBeans)},n.$$.update=()=>{n.$$.dirty[0]&1&&f===!1&&e(10,g="")},[f,o,c,a,u,r,m,b,d,k,g,I,v,E,p,S,L,G,l,i,s,Z,x,$,T,F,P,H,ue,Te,Se]}class He extends le{constructor(t){super(),se(this,t,je,Re,ae,{onModalStateChange:18,onSavedCoffeeBeans:19,setModalState:20},null,[-1,-1])}get setModalState(){return this.$$.ctx[20]}}function be(n,t,e){const l=n.slice();return l[15]=t[e],l}function Ue(n){let t;return{c(){t=U("Coffee beans:")},l(e){t=K(e,"Coffee beans:")},m(e,l){V(e,t,l)},d(e){e&&C(t)}}}function Ke(n){let t,e="Loading coffee beans...";return{c(){t=B("option"),t.textContent=e,this.h()},l(l){t=M(l,"OPTION",{"data-svelte-h":!0}),ne(t)!=="svelte-1sf778f"&&(t.textContent=e),this.h()},h(){t.disabled=!0,t.selected=!0,t.__value="",j(t,t.__value)},m(l,i){V(l,t,i)},p:Ee,d(l){l&&C(t)}}}function Ge(n){let t,e=[],l=new Map,i,s=n[0]===void 0&&n[4]===!0&&pe(),o=_e(n[3].sort(ge));const c=a=>a[15].id;for(let a=0;a<o.length;a+=1){let u=be(n,o,a),r=c(u);l.set(r,e[a]=ke(r,u))}return{c(){s&&s.c(),t=fe();for(let a=0;a<e.length;a+=1)e[a].c();i=fe()},l(a){s&&s.l(a),t=fe();for(let u=0;u<e.length;u+=1)e[u].l(a);i=fe()},m(a,u){s&&s.m(a,u),V(a,t,u);for(let r=0;r<e.length;r+=1)e[r]&&e[r].m(a,u);V(a,i,u)},p(a,u){a[0]===void 0&&a[4]===!0?s||(s=pe(),s.c(),s.m(t.parentNode,t)):s&&(s.d(1),s=null),u&9&&(o=_e(a[3].sort(ge)),e=Ve(e,u,c,1,a,o,l,i.parentNode,Ae,ke,i,be))},d(a){a&&(C(t),C(i)),s&&s.d(a);for(let u=0;u<e.length;u+=1)e[u].d(a)}}}function pe(n){let t;return{c(){t=B("option"),this.h()},l(e){t=M(e,"OPTION",{}),D(t).forEach(C),this.h()},h(){t.disabled=!0,t.selected=!0,t.__value="",j(t,t.__value)},m(e,l){V(e,t,l)},d(e){e&&C(t)}}}function ke(n,t){let e,l=t[15].name+"",i,s,o;return{key:n,first:null,c(){e=B("option"),i=U(l),this.h()},l(c){e=M(c,"OPTION",{});var a=D(e);i=K(a,l),a.forEach(C),this.h()},h(){e.selected=s=t[0]===t[15].id,e.__value=o=t[15].id,j(e,e.__value),this.first=e},m(c,a){V(c,e,a),w(e,i)},p(c,a){t=c,a&8&&l!==(l=t[15].name+"")&&ie(i,l),a&9&&s!==(s=t[0]===t[15].id)&&(e.selected=s),a&8&&o!==(o=t[15].id)&&(e.__value=o,j(e,e.__value))},d(c){c&&C(e)}}}function we(n){let t,e='<span class="material-icons md-18">add</span>',l,i,s,o,c,a;function u(m){n[14](m)}let r={onSavedCoffeeBeans:n[2]};return n[6]!==void 0&&(r.setModalState=n[6]),i=new He({props:r}),R.push(()=>te(i,"setModalState",u)),{c(){t=B("button"),t.innerHTML=e,l=O(),W(i.$$.fragment),this.h()},l(m){t=M(m,"BUTTON",{class:!0,"data-svelte-h":!0}),ne(t)!=="svelte-h0kid9"&&(t.innerHTML=e),l=z(m),X(i.$$.fragment,m),this.h()},h(){h(t,"class","button-add bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-700 transition svelte-178uw3o")},m(m,b){V(m,t,b),V(m,l,b),J(i,m,b),o=!0,c||(a=N(t,"click",Ce(n[13])),c=!0)},p(m,b){const d={};b&4&&(d.onSavedCoffeeBeans=m[2]),!s&&b&64&&(s=!0,d.setModalState=m[6],ee(()=>s=!1)),i.$set(d)},i(m){o||(y(i.$$.fragment,m),o=!0)},o(m){q(i.$$.fragment,m),o=!1},d(m){m&&(C(t),C(l)),Q(i,m),c=!1,a()}}}function We(n){let t,e,l,i,s,o,c,a,u,r,m,b,d,k,f;l=new oe({props:{for_:de,valid:!n[7],$$slots:{default:[Ue]},$$scope:{ctx:n}}});function g(p,S){return p[3]!==void 0?Ge:Ke}let I=g(n),v=I(n),E=n[4]&&we(n);return{c(){t=B("div"),e=B("div"),W(l.$$.fragment),i=O(),s=B("div"),o=B("select"),v.c(),u=O(),E&&E.c(),r=O(),m=B("p"),b=U(n[8]),this.h()},l(p){t=M(p,"DIV",{});var S=D(t);e=M(S,"DIV",{class:!0});var L=D(e);X(l.$$.fragment,L),i=z(L),s=M(L,"DIV",{class:!0});var G=D(s);o=M(G,"SELECT",{id:!0,class:!0,name:!0,tabindex:!0});var Z=D(o);v.l(Z),Z.forEach(C),u=z(G),E&&E.l(G),G.forEach(C),L.forEach(C),r=z(S),m=M(S,"P",{class:!0});var x=D(m);b=K(x,n[8]),x.forEach(C),S.forEach(C),this.h()},h(){h(o,"id",de),h(o,"class",c=re(n[7]?"invalid":"valid")+" svelte-178uw3o"),o.disabled=a=n[3]===void 0,h(o,"name",de),h(o,"tabindex","0"),n[0]===void 0&&Me(()=>n[12].call(o)),A(o,"unsaved-changes",n[5]!==void 0&&n[5]!==n[0]),h(s,"class","select-container svelte-178uw3o"),h(e,"class","container svelte-178uw3o"),h(m,"class","text-sm text-red-600 dark:text-red-500"),A(m,"mt-2",n[8].length>0)},m(p,S){V(p,t,S),w(t,e),J(l,e,null),w(e,i),w(e,s),w(s,o),v.m(o,null),n[11](o),me(o,n[0],!0),w(s,u),E&&E.m(s,null),w(t,r),w(t,m),w(m,b),d=!0,k||(f=[N(o,"change",n[12]),N(o,"change",n[9])],k=!0)},p(p,[S]){const L={};S&128&&(L.valid=!p[7]),S&262144&&(L.$$scope={dirty:S,ctx:p}),l.$set(L),I===(I=g(p))&&v?v.p(p,S):(v.d(1),v=I(p),v&&(v.c(),v.m(o,null))),(!d||S&128&&c!==(c=re(p[7]?"invalid":"valid")+" svelte-178uw3o"))&&h(o,"class",c),(!d||S&8&&a!==(a=p[3]===void 0))&&(o.disabled=a),S&9&&me(o,p[0]),(!d||S&161)&&A(o,"unsaved-changes",p[5]!==void 0&&p[5]!==p[0]),p[4]?E?(E.p(p,S),S&16&&y(E,1)):(E=we(p),E.c(),y(E,1),E.m(s,null)):E&&(Ie(),q(E,1,1,()=>{E=null}),Fe()),(!d||S&256)&&ie(b,p[8]),(!d||S&256)&&A(m,"mt-2",p[8].length>0)},i(p){d||(y(l.$$.fragment,p),y(E),d=!0)},o(p){q(l.$$.fragment,p),q(E),d=!1},d(p){p&&C(t),Q(l),v.d(),n[11](null),E&&E.d(),k=!1,he(f)}}}const de="coffee-beans";function Xe(n,t,e){let{onSavedCoffeeBeans:l=void 0}=t;const i=v=>{e(7,m=v),m?e(8,b="Please select coffee beans."):e(8,b="")};let{allCoffeeBeans:s}=t,{selectedCoffeeBeansId:o}=t,{showAddButton:c=!0}=t,{selectDOM:a=void 0}=t,{initialCoffeeBeansId:u=void 0}=t,r,m=!1,b="";function d(){m&&i(!1)}function k(v){R[v?"unshift":"push"](()=>{a=v,e(1,a)})}function f(){o=Ne(this),e(0,o),e(3,s)}const g=()=>{r!==void 0&&r("open")};function I(v){r=v,e(6,r)}return n.$$set=v=>{"onSavedCoffeeBeans"in v&&e(2,l=v.onSavedCoffeeBeans),"allCoffeeBeans"in v&&e(3,s=v.allCoffeeBeans),"selectedCoffeeBeansId"in v&&e(0,o=v.selectedCoffeeBeansId),"showAddButton"in v&&e(4,c=v.showAddButton),"selectDOM"in v&&e(1,a=v.selectDOM),"initialCoffeeBeansId"in v&&e(5,u=v.initialCoffeeBeansId)},[o,a,l,s,c,u,r,m,b,d,i,k,f,g,I]}class ht extends le{constructor(t){super(),se(this,t,Xe,We,ae,{onSavedCoffeeBeans:2,setValidationFailed:10,allCoffeeBeans:3,selectedCoffeeBeansId:0,showAddButton:4,selectDOM:1,initialCoffeeBeansId:5})}get setValidationFailed(){return this.$$.ctx[10]}}function Je(n){let t;return{c(){t=U("Favorite:")},l(e){t=K(e,"Favorite:")},m(e,l){V(e,t,l)},d(e){e&&C(t)}}}function Qe(n){let t,e,l,i,s,o,c,a=n[0]?"❤":"🤍",u,r,m,b;return e=new oe({props:{for_:"favorite",$$slots:{default:[Je]},$$scope:{ctx:n}}}),{c(){t=B("div"),W(e.$$.fragment),l=O(),i=B("div"),s=B("label"),o=B("input"),c=O(),u=U(a),this.h()},l(d){t=M(d,"DIV",{class:!0});var k=D(t);X(e.$$.fragment,k),l=z(k),i=M(k,"DIV",{class:!0});var f=D(i);s=M(f,"LABEL",{for:!0,class:!0});var g=D(s);o=M(g,"INPUT",{id:!0,name:!0,type:!0,class:!0}),c=z(g),u=K(g,a),g.forEach(C),f.forEach(C),k.forEach(C),this.h()},h(){h(o,"id","favorite"),h(o,"name","favorite"),h(o,"type","checkbox"),h(o,"class","svelte-1418fzr"),h(s,"for","favorite"),h(s,"class","svelte-1418fzr"),A(s,"unsaved-changes",n[1]!==void 0&&n[1]!==n[0]),h(i,"class","input-container svelte-1418fzr"),h(t,"class","container svelte-1418fzr")},m(d,k){V(d,t,k),J(e,t,null),w(t,l),w(t,i),w(i,s),w(s,o),o.checked=n[0],w(s,c),w(s,u),r=!0,m||(b=N(o,"change",n[2]),m=!0)},p(d,[k]){const f={};k&8&&(f.$$scope={dirty:k,ctx:d}),e.$set(f),k&1&&(o.checked=d[0]),(!r||k&1)&&a!==(a=d[0]?"❤":"🤍")&&ie(u,a),(!r||k&3)&&A(s,"unsaved-changes",d[1]!==void 0&&d[1]!==d[0])},i(d){r||(y(e.$$.fragment,d),r=!0)},o(d){q(e.$$.fragment,d),r=!1},d(d){d&&C(t),Q(e),m=!1,b()}}}function Ye(n,t,e){let{value:l=!1}=t,{initialValue:i=void 0}=t;function s(){l=this.checked,e(0,l)}return n.$$set=o=>{"value"in o&&e(0,l=o.value),"initialValue"in o&&e(1,i=o.initialValue)},[l,i,s]}class mt extends le{constructor(t){super(),se(this,t,Ye,Qe,ae,{value:0,initialValue:1})}}function Ze(n){let t;return{c(){t=U("Timestamp:")},l(e){t=K(e,"Timestamp:")},m(e,l){V(e,t,l)},d(e){e&&C(t)}}}function xe(n){let t,e,l,i,s,o,c;return e=new oe({props:{for_:ce,$$slots:{default:[Ze]},$$scope:{ctx:n}}}),{c(){t=B("div"),W(e.$$.fragment),l=O(),i=B("input"),this.h()},l(a){t=M(a,"DIV",{class:!0});var u=D(t);X(e.$$.fragment,u),l=z(u),i=M(u,"INPUT",{id:!0,class:!0,name:!0,type:!0}),u.forEach(C),this.h()},h(){h(i,"id",ce),h(i,"class","bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 svelte-wm7fn4"),h(i,"name",ce),h(i,"type","datetime-local"),A(i,"unsaved-changes",n[1]!==void 0&&n[1]!==n[0]),h(t,"class","container svelte-wm7fn4")},m(a,u){V(a,t,u),J(e,t,null),w(t,l),w(t,i),j(i,n[0]),s=!0,o||(c=N(i,"input",n[2]),o=!0)},p(a,[u]){const r={};u&8&&(r.$$scope={dirty:u,ctx:a}),e.$set(r),u&1&&j(i,a[0]),(!s||u&3)&&A(i,"unsaved-changes",a[1]!==void 0&&a[1]!==a[0])},i(a){s||(y(e.$$.fragment,a),s=!0)},o(a){q(e.$$.fragment,a),s=!1},d(a){a&&C(t),Q(e),o=!1,c()}}}const ce="timestamp";function $e(n,t,e){let{value:l}=t,{initialValue:i=void 0}=t;function s(){l=this.value,e(0,l)}return n.$$set=o=>{"value"in o&&e(0,l=o.value),"initialValue"in o&&e(1,i=o.initialValue)},[l,i,s]}class _t extends le{constructor(t){super(),se(this,t,$e,xe,ae,{value:0,initialValue:1})}}function et(n){let t;return{c(){t=U(n[1])},l(e){t=K(e,n[1])},m(e,l){V(e,t,l)},p(e,l){l&2&&ie(t,e[1])},d(e){e&&C(t)}}}function tt(n){let t,e,l,i,s,o='<svg fill="none" viewBox="0 0 18 2" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="svelte-1qa6suw"><path d="M1 1h16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>',c,a,u,r,m='<svg fill="none" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="svelte-1qa6suw"><path d="M9 1v16M1 9h16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>',b,d,k;return e=new oe({props:{for_:n[2],$$slots:{default:[et]},$$scope:{ctx:n}}}),{c(){t=B("div"),W(e.$$.fragment),l=O(),i=B("div"),s=B("button"),s.innerHTML=o,c=O(),a=B("input"),u=O(),r=B("button"),r.innerHTML=m,this.h()},l(f){t=M(f,"DIV",{class:!0});var g=D(t);X(e.$$.fragment,g),l=z(g),i=M(g,"DIV",{class:!0});var I=D(i);s=M(I,"BUTTON",{id:!0,class:!0,tabindex:!0,type:!0,"data-svelte-h":!0}),ne(s)!=="svelte-14vipen"&&(s.innerHTML=o),c=z(I),a=M(I,"INPUT",{id:!0,autocomplete:!0,name:!0,type:!0,class:!0}),u=z(I),r=M(I,"BUTTON",{id:!0,class:!0,tabindex:!0,type:!0,"data-svelte-h":!0}),ne(r)!=="svelte-vdxn36"&&(r.innerHTML=m),I.forEach(C),g.forEach(C),this.h()},h(){h(s,"id","decrement-button"),h(s,"class","minus-button svelte-1qa6suw"),h(s,"tabindex","-1"),h(s,"type","button"),A(s,"unsaved-changes",n[3]!==void 0&&n[3]!==n[0]),h(a,"id",n[2]),h(a,"autocomplete","off"),h(a,"name",n[2]),h(a,"type","text"),h(a,"class","svelte-1qa6suw"),A(a,"unsaved-changes",n[3]!==void 0&&n[3]!==n[0]),h(r,"id","increment-button"),h(r,"class","plus-button svelte-1qa6suw"),h(r,"tabindex","-1"),h(r,"type","button"),A(r,"unsaved-changes",n[3]!==void 0&&n[3]!==n[0]),h(i,"class","input-container svelte-1qa6suw"),h(t,"class","container svelte-1qa6suw")},m(f,g){V(f,t,g),J(e,t,null),w(t,l),w(t,i),w(i,s),w(i,c),w(i,a),j(a,n[0]),w(i,u),w(i,r),b=!0,d||(k=[N(s,"click",n[5]),N(a,"input",n[10]),N(a,"focusin",at),N(a,"focusout",n[4]),N(a,"keydown",nt),N(r,"click",n[6])],d=!0)},p(f,[g]){const I={};g&4&&(I.for_=f[2]),g&4098&&(I.$$scope={dirty:g,ctx:f}),e.$set(I),(!b||g&9)&&A(s,"unsaved-changes",f[3]!==void 0&&f[3]!==f[0]),(!b||g&4)&&h(a,"id",f[2]),(!b||g&4)&&h(a,"name",f[2]),g&1&&a.value!==f[0]&&j(a,f[0]),(!b||g&9)&&A(a,"unsaved-changes",f[3]!==void 0&&f[3]!==f[0]),(!b||g&9)&&A(r,"unsaved-changes",f[3]!==void 0&&f[3]!==f[0])},i(f){b||(y(e.$$.fragment,f),b=!0)},o(f){q(e.$$.fragment,f),b=!1},d(f){f&&C(t),Q(e),d=!1,he(k)}}}function nt(n){const t=n.key;if(t!=="Tab"&&(t<"0"||t>"9")&&t!=="."&&t!=="Backspace"&&t!=="Delete"&&t!=="ArrowLeft"&&t!=="ArrowRight"){n.preventDefault();return}}function at(n){const t=n.currentTarget.value.length;n.currentTarget.setSelectionRange(0,t)}function lt(n,t,e){let{value:l=0}=t,{labelText:i=""}=t,{nameAttr:s=""}=t,{initialValue:o=void 0}=t,{min:c=0}=t,{max:a=Number.MAX_SAFE_INTEGER}=t,{step:u=1}=t;function r(f){d(f.currentTarget.value)}function m(){d(l),l>=c+u&&e(0,l-=u)}function b(){d(l),l<=a-u&&e(0,l+=u)}function d(f){const g=Number(f);if(isNaN(g)){e(0,l=c);return}if(g>a){e(0,l=a);return}if(g<c){e(0,l=c);return}if(g%u!==0){e(0,l=Math.floor(g/u)*u);return}e(0,l=g)}function k(){l=this.value,e(0,l)}return n.$$set=f=>{"value"in f&&e(0,l=f.value),"labelText"in f&&e(1,i=f.labelText),"nameAttr"in f&&e(2,s=f.nameAttr),"initialValue"in f&&e(3,o=f.initialValue),"min"in f&&e(7,c=f.min),"max"in f&&e(8,a=f.max),"step"in f&&e(9,u=f.step)},[l,i,s,o,r,m,b,c,a,u,k]}class gt extends le{constructor(t){super(),se(this,t,lt,tt,ae,{value:0,labelText:1,nameAttr:2,initialValue:3,min:7,max:8,step:9})}}export{ht as C,mt as F,gt as N,_t as T,ct as p};
