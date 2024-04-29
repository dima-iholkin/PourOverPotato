const __vite__fileDeps=["../nodes/0.kVwSH5A5.js","../chunks/scheduler.Cw1-ZcKD.js","../chunks/index.DLYhtmCw.js","../chunks/each.0pZX8dbx.js","../chunks/paths.lp8V_sRB.js","../chunks/stores.PNhDsDHn.js","../chunks/entry.CGhZ_rxY.js","../chunks/control.CYgJF_JY.js","../chunks/routes.-mnQr-mB.js","../chunks/Modal.CU_NDJLL.js","../assets/Modal.C5WUTvZp.css","../chunks/indexedDB.DaEOTApc.js","../assets/0.4pePtaDq.css","../nodes/1.CBoN6od4.js","../nodes/2.TTsLubsu.js","../chunks/PageHeadline.DZrytPUU.js","../assets/PageHeadline.D5RMp3px.css","../chunks/NoItemsYetP.CwEmW2aG.js","../assets/NoItemsYetP.CNnuXi0H.css","../chunks/Loading.85VJZv4p.js","../assets/Loading.DLkpAupv.css","../chunks/AddDemoCoffeeBeans_PageBlock.Bcm47cxK.js","../assets/AddDemoCoffeeBeans_PageBlock.VksWyno5.css","../assets/2.9KM77vTK.css","../nodes/3.CRzAKJKA.js","../nodes/4.Bw03e1rH.js","../chunks/SortRecipesSelect.DsjjQu2h.js","../chunks/naming.DmthAWfq.js","../assets/SortRecipesSelect.n0oQDp8z.css","../chunks/FlexRow.ByUt0MZi.js","../assets/FlexRow.I85Im5HU.css","../chunks/DeleteConfirmationModal.CJy15qH9.js","../assets/DeleteConfirmationModal.BsHhFZqh.css","../chunks/Textarea.DLiSzTbf.js","../assets/Textarea.C5uvCrF_.css","../assets/4.foZnOfHY.css","../nodes/5.BUu2Zv_b.js","../assets/5.COepvKJN.css","../nodes/6.BFFjILEW.js","../nodes/7.C0v7mCRe.js","../chunks/NumberInput.B0aJoAiO.js","../assets/NumberInput.B6GiYZyZ.css","../assets/7.Cu-9ldFK.css","../nodes/8.Dhb4LDum.js","../assets/8.DCoaJWUt.css"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{s as N,i as B,o as U,b as I,t as j}from"../chunks/scheduler.Cw1-ZcKD.js";import{S as z,i as W,s as F,w as h,f as G,g as k,o as g,p as A,q as w,d as b,e as H,c as J,a as K,z as O,D as p,t as Q,b as X,j as Y,u as D,E as R,k as P,m as T,n as y,r as L}from"../chunks/index.DLYhtmCw.js";const Z="modulepreload",M=function(a,e){return new URL(a,e).href},V={},d=function(e,n,i){let r=Promise.resolve();if(n&&n.length>0){const _=document.getElementsByTagName("link"),t=document.querySelector("meta[property=csp-nonce]"),s=(t==null?void 0:t.nonce)||(t==null?void 0:t.getAttribute("nonce"));r=Promise.all(n.map(o=>{if(o=M(o,i),o in V)return;V[o]=!0;const f=o.endsWith(".css"),l=f?'[rel="stylesheet"]':"";if(!!i)for(let E=_.length-1;E>=0;E--){const v=_[E];if(v.href===o&&(!f||v.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${o}"]${l}`))return;const u=document.createElement("link");if(u.rel=f?"stylesheet":Z,f||(u.as="script",u.crossOrigin=""),u.href=o,s&&u.setAttribute("nonce",s),document.head.appendChild(u),f)return new Promise((E,v)=>{u.addEventListener("load",E),u.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${o}`)))})}))}return r.then(()=>e()).catch(_=>{const t=new Event("vite:preloadError",{cancelable:!0});if(t.payload=_,window.dispatchEvent(t),!t.defaultPrevented)throw _})};function $(a){return/^\d+$/.test(a)}const oe={integer:$};function x(a){let e,n,i;var r=a[1][0];function _(t,s){return{props:{data:t[3],form:t[2]}}}return r&&(e=R(r,_(a)),a[12](e)),{c(){e&&P(e.$$.fragment),n=h()},l(t){e&&T(e.$$.fragment,t),n=h()},m(t,s){e&&y(e,t,s),k(t,n,s),i=!0},p(t,s){if(s&2&&r!==(r=t[1][0])){if(e){D();const o=e;g(o.$$.fragment,1,0,()=>{L(o,1)}),A()}r?(e=R(r,_(t)),t[12](e),P(e.$$.fragment),w(e.$$.fragment,1),y(e,n.parentNode,n)):e=null}else if(r){const o={};s&8&&(o.data=t[3]),s&4&&(o.form=t[2]),e.$set(o)}},i(t){i||(e&&w(e.$$.fragment,t),i=!0)},o(t){e&&g(e.$$.fragment,t),i=!1},d(t){t&&b(n),a[12](null),e&&L(e,t)}}}function ee(a){let e,n,i;var r=a[1][0];function _(t,s){return{props:{data:t[3],$$slots:{default:[te]},$$scope:{ctx:t}}}}return r&&(e=R(r,_(a)),a[11](e)),{c(){e&&P(e.$$.fragment),n=h()},l(t){e&&T(e.$$.fragment,t),n=h()},m(t,s){e&&y(e,t,s),k(t,n,s),i=!0},p(t,s){if(s&2&&r!==(r=t[1][0])){if(e){D();const o=e;g(o.$$.fragment,1,0,()=>{L(o,1)}),A()}r?(e=R(r,_(t)),t[11](e),P(e.$$.fragment),w(e.$$.fragment,1),y(e,n.parentNode,n)):e=null}else if(r){const o={};s&8&&(o.data=t[3]),s&8215&&(o.$$scope={dirty:s,ctx:t}),e.$set(o)}},i(t){i||(e&&w(e.$$.fragment,t),i=!0)},o(t){e&&g(e.$$.fragment,t),i=!1},d(t){t&&b(n),a[11](null),e&&L(e,t)}}}function te(a){let e,n,i;var r=a[1][1];function _(t,s){return{props:{data:t[4],form:t[2]}}}return r&&(e=R(r,_(a)),a[10](e)),{c(){e&&P(e.$$.fragment),n=h()},l(t){e&&T(e.$$.fragment,t),n=h()},m(t,s){e&&y(e,t,s),k(t,n,s),i=!0},p(t,s){if(s&2&&r!==(r=t[1][1])){if(e){D();const o=e;g(o.$$.fragment,1,0,()=>{L(o,1)}),A()}r?(e=R(r,_(t)),t[10](e),P(e.$$.fragment),w(e.$$.fragment,1),y(e,n.parentNode,n)):e=null}else if(r){const o={};s&16&&(o.data=t[4]),s&4&&(o.form=t[2]),e.$set(o)}},i(t){i||(e&&w(e.$$.fragment,t),i=!0)},o(t){e&&g(e.$$.fragment,t),i=!1},d(t){t&&b(n),a[10](null),e&&L(e,t)}}}function S(a){let e,n=a[6]&&q(a);return{c(){e=H("div"),n&&n.c(),this.h()},l(i){e=J(i,"DIV",{id:!0,"aria-live":!0,"aria-atomic":!0,style:!0});var r=K(e);n&&n.l(r),r.forEach(b),this.h()},h(){O(e,"id","svelte-announcer"),O(e,"aria-live","assertive"),O(e,"aria-atomic","true"),p(e,"position","absolute"),p(e,"left","0"),p(e,"top","0"),p(e,"clip","rect(0 0 0 0)"),p(e,"clip-path","inset(50%)"),p(e,"overflow","hidden"),p(e,"white-space","nowrap"),p(e,"width","1px"),p(e,"height","1px")},m(i,r){k(i,e,r),n&&n.m(e,null)},p(i,r){i[6]?n?n.p(i,r):(n=q(i),n.c(),n.m(e,null)):n&&(n.d(1),n=null)},d(i){i&&b(e),n&&n.d()}}}function q(a){let e;return{c(){e=Q(a[7])},l(n){e=X(n,a[7])},m(n,i){k(n,e,i)},p(n,i){i&128&&Y(e,n[7])},d(n){n&&b(e)}}}function ne(a){let e,n,i,r,_;const t=[ee,x],s=[];function o(l,m){return l[1][1]?0:1}e=o(a),n=s[e]=t[e](a);let f=a[5]&&S(a);return{c(){n.c(),i=F(),f&&f.c(),r=h()},l(l){n.l(l),i=G(l),f&&f.l(l),r=h()},m(l,m){s[e].m(l,m),k(l,i,m),f&&f.m(l,m),k(l,r,m),_=!0},p(l,[m]){let u=e;e=o(l),e===u?s[e].p(l,m):(D(),g(s[u],1,1,()=>{s[u]=null}),A(),n=s[e],n?n.p(l,m):(n=s[e]=t[e](l),n.c()),w(n,1),n.m(i.parentNode,i)),l[5]?f?f.p(l,m):(f=S(l),f.c(),f.m(r.parentNode,r)):f&&(f.d(1),f=null)},i(l){_||(w(n),_=!0)},o(l){g(n),_=!1},d(l){l&&(b(i),b(r)),s[e].d(l),f&&f.d(l)}}}function ie(a,e,n){let{stores:i}=e,{page:r}=e,{constructors:_}=e,{components:t=[]}=e,{form:s}=e,{data_0:o=null}=e,{data_1:f=null}=e;B(i.page.notify);let l=!1,m=!1,u=null;U(()=>{const c=i.page.subscribe(()=>{l&&(n(6,m=!0),j().then(()=>{n(7,u=document.title||"untitled page")}))});return n(5,l=!0),c});function E(c){I[c?"unshift":"push"](()=>{t[1]=c,n(0,t)})}function v(c){I[c?"unshift":"push"](()=>{t[0]=c,n(0,t)})}function C(c){I[c?"unshift":"push"](()=>{t[0]=c,n(0,t)})}return a.$$set=c=>{"stores"in c&&n(8,i=c.stores),"page"in c&&n(9,r=c.page),"constructors"in c&&n(1,_=c.constructors),"components"in c&&n(0,t=c.components),"form"in c&&n(2,s=c.form),"data_0"in c&&n(3,o=c.data_0),"data_1"in c&&n(4,f=c.data_1)},a.$$.update=()=>{a.$$.dirty&768&&i.page.set(r)},[t,_,s,o,f,l,m,u,i,r,E,v,C]}class ae extends z{constructor(e){super(),W(this,e,ie,ne,N,{stores:8,page:9,constructors:1,components:0,form:2,data_0:3,data_1:4})}}const le=[()=>d(()=>import("../nodes/0.kVwSH5A5.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12]),import.meta.url),()=>d(()=>import("../nodes/1.CBoN6od4.js"),__vite__mapDeps([13,1,2,5,6,4,7]),import.meta.url),()=>d(()=>import("../nodes/2.TTsLubsu.js"),__vite__mapDeps([14,1,2,3,11,15,16,8,4,17,18,19,20,21,22,23]),import.meta.url),()=>d(()=>import("../nodes/3.CRzAKJKA.js"),__vite__mapDeps([24,7,8,4]),import.meta.url),()=>d(()=>import("../nodes/4.Bw03e1rH.js"),__vite__mapDeps([25,1,2,3,6,4,7,11,15,16,8,26,27,17,18,28,19,20,29,9,5,10,30,31,32,33,34,35]),import.meta.url),()=>d(()=>import("../nodes/5.BUu2Zv_b.js"),__vite__mapDeps([36,1,2,6,4,7,11,31,9,5,8,10,32,37]),import.meta.url),()=>d(()=>import("../nodes/6.BFFjILEW.js"),__vite__mapDeps([38,1,2,3,11,15,16,8,4,26,27,17,18,28,19,20,21,22]),import.meta.url),()=>d(()=>import("../nodes/7.C0v7mCRe.js"),__vite__mapDeps([39,1,2,6,4,7,5,11,27,8,40,3,15,16,33,34,9,10,41,42]),import.meta.url),()=>d(()=>import("../nodes/8.Dhb4LDum.js"),__vite__mapDeps([43,1,2,6,4,7,11,27,8,40,3,15,16,33,34,9,5,10,41,19,20,29,30,31,32,44]),import.meta.url)],fe=[],ce={"/":[2],"/coffee_beans":[3],"/coffee_beans/[name]":[4],"/other":[5],"/recipes":[6],"/recipes/add":[7],"/recipes/[id=integer]":[8]},_e={handleError:({error:a})=>{console.error(a)},reroute:()=>{}};export{ce as dictionary,_e as hooks,oe as matchers,le as nodes,ae as root,fe as server_loads};