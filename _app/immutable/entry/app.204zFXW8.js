import{s as C,d as q,o as U,e as A,t as j}from"../chunks/scheduler.oXSsTagU.js";import{S as M,i as W,s as z,v as h,f as F,g as E,o as g,p as y,q as w,d as b,e as G,c as H,a as J,y as D,A as d,t as K,b as Q,j as X,u as L,B as k,k as v,m as I,n as R,r as P}from"../chunks/index.R4ieXPpT.js";const Y="modulepreload",Z=function(a,e){return new URL(a,e).href},O={},p=function(e,n,i){let s=Promise.resolve();if(n&&n.length>0){const c=document.getElementsByTagName("link");s=Promise.all(n.map(t=>{if(t=Z(t,i),t in O)return;O[t]=!0;const r=t.endsWith(".css"),l=r?'[rel="stylesheet"]':"";if(!!i)for(let u=c.length-1;u>=0;u--){const m=c[u];if(m.href===t&&(!r||m.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${t}"]${l}`))return;const o=document.createElement("link");if(o.rel=r?"stylesheet":Y,r||(o.as="script",o.crossOrigin=""),o.href=t,document.head.appendChild(o),r)return new Promise((u,m)=>{o.addEventListener("load",u),o.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${t}`)))})}))}return s.then(()=>e()).catch(c=>{const t=new Event("vite:preloadError",{cancelable:!0});if(t.payload=c,window.dispatchEvent(t),!t.defaultPrevented)throw c})},re={};function $(a){let e,n,i;var s=a[1][0];function c(t,r){return{props:{data:t[3],form:t[2]}}}return s&&(e=k(s,c(a)),a[12](e)),{c(){e&&v(e.$$.fragment),n=h()},l(t){e&&I(e.$$.fragment,t),n=h()},m(t,r){e&&R(e,t,r),E(t,n,r),i=!0},p(t,r){if(r&2&&s!==(s=t[1][0])){if(e){L();const l=e;g(l.$$.fragment,1,0,()=>{P(l,1)}),y()}s?(e=k(s,c(t)),t[12](e),v(e.$$.fragment),w(e.$$.fragment,1),R(e,n.parentNode,n)):e=null}else if(s){const l={};r&8&&(l.data=t[3]),r&4&&(l.form=t[2]),e.$set(l)}},i(t){i||(e&&w(e.$$.fragment,t),i=!0)},o(t){e&&g(e.$$.fragment,t),i=!1},d(t){t&&b(n),a[12](null),e&&P(e,t)}}}function x(a){let e,n,i;var s=a[1][0];function c(t,r){return{props:{data:t[3],$$slots:{default:[ee]},$$scope:{ctx:t}}}}return s&&(e=k(s,c(a)),a[11](e)),{c(){e&&v(e.$$.fragment),n=h()},l(t){e&&I(e.$$.fragment,t),n=h()},m(t,r){e&&R(e,t,r),E(t,n,r),i=!0},p(t,r){if(r&2&&s!==(s=t[1][0])){if(e){L();const l=e;g(l.$$.fragment,1,0,()=>{P(l,1)}),y()}s?(e=k(s,c(t)),t[11](e),v(e.$$.fragment),w(e.$$.fragment,1),R(e,n.parentNode,n)):e=null}else if(s){const l={};r&8&&(l.data=t[3]),r&8215&&(l.$$scope={dirty:r,ctx:t}),e.$set(l)}},i(t){i||(e&&w(e.$$.fragment,t),i=!0)},o(t){e&&g(e.$$.fragment,t),i=!1},d(t){t&&b(n),a[11](null),e&&P(e,t)}}}function ee(a){let e,n,i;var s=a[1][1];function c(t,r){return{props:{data:t[4],form:t[2]}}}return s&&(e=k(s,c(a)),a[10](e)),{c(){e&&v(e.$$.fragment),n=h()},l(t){e&&I(e.$$.fragment,t),n=h()},m(t,r){e&&R(e,t,r),E(t,n,r),i=!0},p(t,r){if(r&2&&s!==(s=t[1][1])){if(e){L();const l=e;g(l.$$.fragment,1,0,()=>{P(l,1)}),y()}s?(e=k(s,c(t)),t[10](e),v(e.$$.fragment),w(e.$$.fragment,1),R(e,n.parentNode,n)):e=null}else if(s){const l={};r&16&&(l.data=t[4]),r&4&&(l.form=t[2]),e.$set(l)}},i(t){i||(e&&w(e.$$.fragment,t),i=!0)},o(t){e&&g(e.$$.fragment,t),i=!1},d(t){t&&b(n),a[10](null),e&&P(e,t)}}}function T(a){let e,n=a[6]&&V(a);return{c(){e=G("div"),n&&n.c(),this.h()},l(i){e=H(i,"DIV",{id:!0,"aria-live":!0,"aria-atomic":!0,style:!0});var s=J(e);n&&n.l(s),s.forEach(b),this.h()},h(){D(e,"id","svelte-announcer"),D(e,"aria-live","assertive"),D(e,"aria-atomic","true"),d(e,"position","absolute"),d(e,"left","0"),d(e,"top","0"),d(e,"clip","rect(0 0 0 0)"),d(e,"clip-path","inset(50%)"),d(e,"overflow","hidden"),d(e,"white-space","nowrap"),d(e,"width","1px"),d(e,"height","1px")},m(i,s){E(i,e,s),n&&n.m(e,null)},p(i,s){i[6]?n?n.p(i,s):(n=V(i),n.c(),n.m(e,null)):n&&(n.d(1),n=null)},d(i){i&&b(e),n&&n.d()}}}function V(a){let e;return{c(){e=K(a[7])},l(n){e=Q(n,a[7])},m(n,i){E(n,e,i)},p(n,i){i&128&&X(e,n[7])},d(n){n&&b(e)}}}function te(a){let e,n,i,s,c;const t=[x,$],r=[];function l(o,u){return o[1][1]?0:1}e=l(a),n=r[e]=t[e](a);let _=a[5]&&T(a);return{c(){n.c(),i=z(),_&&_.c(),s=h()},l(o){n.l(o),i=F(o),_&&_.l(o),s=h()},m(o,u){r[e].m(o,u),E(o,i,u),_&&_.m(o,u),E(o,s,u),c=!0},p(o,[u]){let m=e;e=l(o),e===m?r[e].p(o,u):(L(),g(r[m],1,1,()=>{r[m]=null}),y(),n=r[e],n?n.p(o,u):(n=r[e]=t[e](o),n.c()),w(n,1),n.m(i.parentNode,i)),o[5]?_?_.p(o,u):(_=T(o),_.c(),_.m(s.parentNode,s)):_&&(_.d(1),_=null)},i(o){c||(w(n),c=!0)},o(o){g(n),c=!1},d(o){o&&(b(i),b(s)),r[e].d(o),_&&_.d(o)}}}function ne(a,e,n){let{stores:i}=e,{page:s}=e,{constructors:c}=e,{components:t=[]}=e,{form:r}=e,{data_0:l=null}=e,{data_1:_=null}=e;q(i.page.notify);let o=!1,u=!1,m=null;U(()=>{const f=i.page.subscribe(()=>{o&&(n(6,u=!0),j().then(()=>{n(7,m=document.title||"untitled page")}))});return n(5,o=!0),f});function N(f){A[f?"unshift":"push"](()=>{t[1]=f,n(0,t)})}function S(f){A[f?"unshift":"push"](()=>{t[0]=f,n(0,t)})}function B(f){A[f?"unshift":"push"](()=>{t[0]=f,n(0,t)})}return a.$$set=f=>{"stores"in f&&n(8,i=f.stores),"page"in f&&n(9,s=f.page),"constructors"in f&&n(1,c=f.constructors),"components"in f&&n(0,t=f.components),"form"in f&&n(2,r=f.form),"data_0"in f&&n(3,l=f.data_0),"data_1"in f&&n(4,_=f.data_1)},a.$$.update=()=>{a.$$.dirty&768&&i.page.set(s)},[t,c,r,l,_,o,u,m,i,s,N,S,B]}class oe extends M{constructor(e){super(),W(this,e,ne,te,C,{stores:8,page:9,constructors:1,components:0,form:2,data_0:3,data_1:4})}}const ae=[()=>p(()=>import("../nodes/0.YoUlmPBe.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8]),import.meta.url),()=>p(()=>import("../nodes/1.JOLWiSz8.js"),__vite__mapDeps([9,1,2,3,4]),import.meta.url),()=>p(()=>import("../nodes/2.LdFPTPVg.js"),__vite__mapDeps([10,1,2,11,12,13,14,15,16,5,3,4,17]),import.meta.url),()=>p(()=>import("../nodes/3.uescwR5P.js"),__vite__mapDeps([18,5,3,4,1]),import.meta.url),()=>p(()=>import("../nodes/4.sLHHwRrU.js"),__vite__mapDeps([19,1,2,11,12,13,20,16,21,22,14,15,5,3,4]),import.meta.url),()=>p(()=>import("../nodes/5.2WIErKwq.js"),__vite__mapDeps([23,1,2,16,14,15,24]),import.meta.url),()=>p(()=>import("../nodes/6.U6CI1Py4.js"),__vite__mapDeps([25,1,2,11,12,13,20,16,21,22,14,15,5,3,4]),import.meta.url),()=>p(()=>import("../nodes/7.v44UkFMe.js"),__vite__mapDeps([26,1,2,4,3,16,21,11,6,5,7,27]),import.meta.url)],le=[],fe={"/":[2],"/coffee_beans":[3],"/coffee_beans/[name]":[4],"/other":[5],"/recipes":[6],"/recipes/add":[7]},ce={handleError:({error:a})=>{console.error(a)},reroute:()=>{}};export{fe as dictionary,ce as hooks,re as matchers,ae as nodes,oe as root,le as server_loads};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["../nodes/0.YoUlmPBe.js","../chunks/scheduler.oXSsTagU.js","../chunks/index.R4ieXPpT.js","../chunks/stores.tGqExNGR.js","../chunks/entry.HUWYQ4PW.js","../chunks/routes.cPq6d6_6.js","../chunks/MySidebar.1-575C-a.js","../assets/MySidebar.HwxGE7BM.css","../assets/0.Swk2ARb9.css","../nodes/1.JOLWiSz8.js","../nodes/2.LdFPTPVg.js","../chunks/each.6w4Ej4nR.js","../chunks/Card.KbaBnTJX.js","../assets/Card.f83AbQaD.css","../chunks/PageHeadline.I8UMbvW4.js","../assets/PageHeadline.fj0eob-R.css","../chunks/indexedDB.LXsa1hKK.js","../assets/2.9kJEoxIZ.css","../nodes/3.uescwR5P.js","../nodes/4.sLHHwRrU.js","../chunks/sortRecipes.XrNoxUZq.js","../chunks/naming.kUvCv0xb.js","../assets/sortRecipes.PDDWihwS.css","../nodes/5.2WIErKwq.js","../assets/5.-tixxR8Q.css","../nodes/6.U6CI1Py4.js","../nodes/7.v44UkFMe.js","../assets/7.n1YtCagq.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
