import{s as E,o as F,n as d}from"../chunks/scheduler.oXSsTagU.js";import{S as H,i as T,s as k,k as v,l as z,d as m,f as b,m as x,g as $,n as y,o as _,p as N,q as u,r as C,t as G,b as I,u as j,v as P,w as J,e as S,c as A,x as D}from"../chunks/index.R4ieXPpT.js";import{e as q}from"../chunks/each.CL_J9NQd.js";import{M as K}from"../chunks/CardFlexRow.A_TCjY6i.js";import{s as L,R as O}from"../chunks/sortRecipes.0Fq1zHiQ.js";import{P as Q}from"../chunks/PageHeadline.I8UMbvW4.js";import{g as U}from"../chunks/indexedDB.O9C-AmX6.js";import{r as V}from"../chunks/routes.cWr1MGu-.js";function B(c,t,r){const n=c.slice();return n[1]=t[r],n}function W(c){let t;return{c(){t=G("Recipes")},l(r){t=I(r,"Recipes")},m(r,n){$(r,t,n)},d(r){r&&m(t)}}}function X(c){let t,r,n=q(c[0]),e=[];for(let s=0;s<n.length;s+=1)e[s]=M(B(c,n,s));const i=s=>_(e[s],1,1,()=>{e[s]=null});return{c(){for(let s=0;s<e.length;s+=1)e[s].c();t=P()},l(s){for(let l=0;l<e.length;l+=1)e[l].l(s);t=P()},m(s,l){for(let a=0;a<e.length;a+=1)e[a]&&e[a].m(s,l);$(s,t,l),r=!0},p(s,l){if(l&1){n=q(s[0]);let a;for(a=0;a<n.length;a+=1){const h=B(s,n,a);e[a]?(e[a].p(h,l),u(e[a],1)):(e[a]=M(h),e[a].c(),u(e[a],1),e[a].m(t.parentNode,t))}for(j(),a=n.length;a<e.length;a+=1)i(a);N()}},i(s){if(!r){for(let l=0;l<n.length;l+=1)u(e[l]);r=!0}},o(s){e=e.filter(Boolean);for(let l=0;l<e.length;l+=1)_(e[l]);r=!1},d(s){s&&m(t),J(e,s)}}}function Y(c){let t,r="No recipes added yet.";return{c(){t=S("p"),t.textContent=r},l(n){t=A(n,"P",{"data-svelte-h":!0}),D(t)!=="svelte-1wkojli"&&(t.textContent=r)},m(n,e){$(n,t,e)},p:d,i:d,o:d,d(n){n&&m(t)}}}function Z(c){let t,r="loading...";return{c(){t=S("p"),t.textContent=r},l(n){t=A(n,"P",{"data-svelte-h":!0}),D(t)!=="svelte-qeejp2"&&(t.textContent=r)},m(n,e){$(n,t,e)},p:d,i:d,o:d,d(n){n&&m(t)}}}function M(c){let t,r;return t=new O({props:{recipe:c[1],showCoffeeBeans:!0}}),{c(){v(t.$$.fragment)},l(n){x(t.$$.fragment,n)},m(n,e){y(t,n,e),r=!0},p(n,e){const i={};e&1&&(i.recipe=n[1]),t.$set(i)},i(n){r||(u(t.$$.fragment,n),r=!0)},o(n){_(t.$$.fragment,n),r=!1},d(n){C(t,n)}}}function ee(c){let t,r,n,e,i,s,l,a;r=new Q({props:{$$slots:{default:[W]},$$scope:{ctx:c}}});const h=[Z,Y,X],p=[];function R(o,f){return o[0]===void 0?0:o[0].length===0?1:2}return e=R(c),i=p[e]=h[e](c),l=new K({props:{href:V.addRecipe()}}),{c(){t=k(),v(r.$$.fragment),n=k(),i.c(),s=k(),v(l.$$.fragment),this.h()},l(o){z("svelte-yiovha",document.head).forEach(m),t=b(o),x(r.$$.fragment,o),n=b(o),i.l(o),s=b(o),x(l.$$.fragment,o),this.h()},h(){document.title="Pour over recipes"},m(o,f){$(o,t,f),y(r,o,f),$(o,n,f),p[e].m(o,f),$(o,s,f),y(l,o,f),a=!0},p(o,[f]){const w={};f&16&&(w.$$scope={dirty:f,ctx:o}),r.$set(w);let g=e;e=R(o),e===g?p[e].p(o,f):(j(),_(p[g],1,1,()=>{p[g]=null}),N(),i=p[e],i?i.p(o,f):(i=p[e]=h[e](o),i.c()),u(i,1),i.m(s.parentNode,s))},i(o){a||(u(r.$$.fragment,o),u(i),u(l.$$.fragment,o),a=!0)},o(o){_(r.$$.fragment,o),_(i),_(l.$$.fragment,o),a=!1},d(o){o&&(m(t),m(n),m(s)),C(r,o),p[e].d(o),C(l,o)}}}function te(c,t,r){let n;return F(()=>{U().then(e=>{r(0,n=e.sort(L))})}),[n]}class fe extends H{constructor(t){super(),T(this,t,te,ee,E,{})}}export{fe as component};
