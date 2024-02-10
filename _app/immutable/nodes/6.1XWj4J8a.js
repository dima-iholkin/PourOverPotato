import{s as M,o as j,n as E}from"../chunks/scheduler.QZKnv3vM.js";import{S as F,i as H,s as w,k as h,l as O,d,f as y,m as b,g,n as k,o as _,p as I,q as $,r as B,t as q,b as D,u as L,v as N,w as T}from"../chunks/index.CHfITGLb.js";import{P as z,e as A}from"../chunks/PageHeadline.dJVkQ42h.js";import{g as G,a as J}from"../chunks/indexedDB.vUzQvWEJ.js";import{A as K,S as Q,s as U}from"../chunks/NoItemsYetP.54nxMtoY.js";import{r as R}from"../chunks/routes.z25Z1unV.js";import{R as V}from"../chunks/RecipeCard.0dTVzGhH.js";import{L as W}from"../chunks/Loading.EgPeQWTv.js";import{A as X}from"../chunks/AddDemoCoffeeBeans_PageBlock.0KkobVGC.js";function S(c,t,r){const e=c.slice();return e[2]=t[r],e}function Y(c){let t;return{c(){t=q("Recipes")},l(r){t=D(r,"Recipes")},m(r,e){g(r,t,e)},d(r){r&&d(t)}}}function Z(c){let t,r,e,s;t=new Q({props:{$$slots:{default:[te]},$$scope:{ctx:c}}});let f=A(c[0]),a=[];for(let n=0;n<f.length;n+=1)a[n]=C(S(c,f,n));const p=n=>_(a[n],1,1,()=>{a[n]=null});return{c(){h(t.$$.fragment),r=w();for(let n=0;n<a.length;n+=1)a[n].c();e=N()},l(n){b(t.$$.fragment,n),r=y(n);for(let l=0;l<a.length;l+=1)a[l].l(n);e=N()},m(n,l){k(t,n,l),g(n,r,l);for(let m=0;m<a.length;m+=1)a[m]&&a[m].m(n,l);g(n,e,l),s=!0},p(n,l){const m={};if(l&32&&(m.$$scope={dirty:l,ctx:n}),t.$set(m),l&1){f=A(n[0]);let i;for(i=0;i<f.length;i+=1){const o=S(n,f,i);a[i]?(a[i].p(o,l),$(a[i],1)):(a[i]=C(o),a[i].c(),$(a[i],1),a[i].m(e.parentNode,e))}for(L(),i=f.length;i<a.length;i+=1)p(i);I()}},i(n){if(!s){$(t.$$.fragment,n);for(let l=0;l<f.length;l+=1)$(a[l]);s=!0}},o(n){_(t.$$.fragment,n),a=a.filter(Boolean);for(let l=0;l<a.length;l+=1)_(a[l]);s=!1},d(n){n&&(d(r),d(e)),B(t,n),T(a,n)}}}function x(c){let t,r;return t=new X({}),{c(){h(t.$$.fragment)},l(e){b(t.$$.fragment,e)},m(e,s){k(t,e,s),r=!0},p:E,i(e){r||($(t.$$.fragment,e),r=!0)},o(e){_(t.$$.fragment,e),r=!1},d(e){B(t,e)}}}function ee(c){let t,r;return t=new W({}),{c(){h(t.$$.fragment)},l(e){b(t.$$.fragment,e)},m(e,s){k(t,e,s),r=!0},p:E,i(e){r||($(t.$$.fragment,e),r=!0)},o(e){_(t.$$.fragment,e),r=!1},d(e){B(t,e)}}}function te(c){let t;return{c(){t=q("Sorted by latest recipe date")},l(r){t=D(r,"Sorted by latest recipe date")},m(r,e){g(r,t,e)},d(r){r&&d(t)}}}function C(c){let t,r;return t=new V({props:{coffeeBeansName:c[2].coffeeBeansName,href:R.recipeItem(c[2].id),recipe:c[2]}}),{c(){h(t.$$.fragment)},l(e){b(t.$$.fragment,e)},m(e,s){k(t,e,s),r=!0},p(e,s){const f={};s&1&&(f.coffeeBeansName=e[2].coffeeBeansName),s&1&&(f.href=R.recipeItem(e[2].id)),s&1&&(f.recipe=e[2]),t.$set(f)},i(e){r||($(t.$$.fragment,e),r=!0)},o(e){_(t.$$.fragment,e),r=!1},d(e){B(t,e)}}}function re(c){let t,r,e,s,f,a,p,n;r=new z({props:{$$slots:{default:[Y]},$$scope:{ctx:c}}});const l=[ee,x,Z],m=[];function i(o,u){return o[0]===void 0?0:o[0].length===0?1:2}return s=i(c),f=m[s]=l[s](c),p=new K({props:{href:R.addRecipe()}}),{c(){t=w(),h(r.$$.fragment),e=w(),f.c(),a=w(),h(p.$$.fragment),this.h()},l(o){O("svelte-t7jrhh",document.head).forEach(d),t=y(o),b(r.$$.fragment,o),e=y(o),f.l(o),a=y(o),b(p.$$.fragment,o),this.h()},h(){document.title="Pour over recipes - PourOverPotato app"},m(o,u){g(o,t,u),k(r,o,u),g(o,e,u),m[s].m(o,u),g(o,a,u),k(p,o,u),n=!0},p(o,[u]){const v={};u&32&&(v.$$scope={dirty:u,ctx:o}),r.$set(v);let P=s;s=i(o),s===P?m[s].p(o,u):(L(),_(m[P],1,1,()=>{m[P]=null}),I(),f=m[s],f?f.p(o,u):(f=m[s]=l[s](o),f.c()),$(f,1),f.m(a.parentNode,a))},i(o){n||($(r.$$.fragment,o),$(f),$(p.$$.fragment,o),n=!0)},o(o){_(r.$$.fragment,o),_(f),_(p.$$.fragment,o),n=!1},d(o){o&&(d(t),d(e),d(a)),B(r,o),m[s].d(o),B(p,o)}}}function ne(c,t,r){let e;async function s(){const f=await G(),a=new Map;f.forEach(p=>a.set(p.id,p.name)),r(0,e=(await J()).sort(U).map(p=>{const n=a.get(p.coffeeBeansId)??"";return{...p,coffeeBeansName:n}}))}return j(()=>{s()}),[e]}class ue extends F{constructor(t){super(),H(this,t,ne,re,M,{})}}export{ue as component};
