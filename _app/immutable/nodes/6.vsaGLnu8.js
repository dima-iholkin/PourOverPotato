import{s as D,o as E,n as g}from"../chunks/scheduler.CLMd_sLG.js";import{S as F,i as O,s as k,m as x,n as T,d as m,f as b,o as C,g as _,p as y,k as $,q as I,l as h,r as P,t as z,b as G,u as A,e as w,v as B,c as N,w as j,x as J,y as K}from"../chunks/index.ikDpSZE5.js";import{e as M}from"../chunks/each.VSbhRpyy.js";import{P as L,g as Q}from"../chunks/PageHeadline.LTitun6w.js";import{M as U,s as V}from"../chunks/MyFab.8abP6dYF.js";import{r as R}from"../chunks/routes.-HNyXvxp.js";import{R as W}from"../chunks/RecipeCard.tHAKeRMg.js";function S(f,e,r){const t=f.slice();return t[1]=e[r],t}function X(f){let e;return{c(){e=z("Recipes")},l(r){e=G(r,"Recipes")},m(r,t){_(r,e,t)},d(r){r&&m(e)}}}function Y(f){let e,r="Sorted by latest recipe",t,l,c,p=M(f[0]),o=[];for(let s=0;s<p.length;s+=1)o[s]=H(S(f,p,s));const d=s=>$(o[s],1,1,()=>{o[s]=null});return{c(){e=w("h2"),e.textContent=r,t=k();for(let s=0;s<o.length;s+=1)o[s].c();l=B(),this.h()},l(s){e=N(s,"H2",{class:!0,"data-svelte-h":!0}),j(e)!=="svelte-21fhux"&&(e.textContent=r),t=b(s);for(let a=0;a<o.length;a+=1)o[a].l(s);l=B(),this.h()},h(){J(e,"class","svelte-12ofamk")},m(s,a){_(s,e,a),_(s,t,a);for(let i=0;i<o.length;i+=1)o[i]&&o[i].m(s,a);_(s,l,a),c=!0},p(s,a){if(a&1){p=M(s[0]);let i;for(i=0;i<p.length;i+=1){const n=S(s,p,i);o[i]?(o[i].p(n,a),h(o[i],1)):(o[i]=H(n),o[i].c(),h(o[i],1),o[i].m(l.parentNode,l))}for(A(),i=p.length;i<o.length;i+=1)d(i);I()}},i(s){if(!c){for(let a=0;a<p.length;a+=1)h(o[a]);c=!0}},o(s){o=o.filter(Boolean);for(let a=0;a<o.length;a+=1)$(o[a]);c=!1},d(s){s&&(m(e),m(t),m(l)),K(o,s)}}}function Z(f){let e,r="No recipes added yet.";return{c(){e=w("p"),e.textContent=r},l(t){e=N(t,"P",{"data-svelte-h":!0}),j(e)!=="svelte-1wkojli"&&(e.textContent=r)},m(t,l){_(t,e,l)},p:g,i:g,o:g,d(t){t&&m(e)}}}function ee(f){let e,r="loading...";return{c(){e=w("p"),e.textContent=r},l(t){e=N(t,"P",{"data-svelte-h":!0}),j(e)!=="svelte-qeejp2"&&(e.textContent=r)},m(t,l){_(t,e,l)},p:g,i:g,o:g,d(t){t&&m(e)}}}function H(f){let e,r;return e=new W({props:{href:R.recipeItem(f[1].id),recipe:f[1],showCoffeeBeansName:!0}}),{c(){x(e.$$.fragment)},l(t){C(e.$$.fragment,t)},m(t,l){y(e,t,l),r=!0},p(t,l){const c={};l&1&&(c.href=R.recipeItem(t[1].id)),l&1&&(c.recipe=t[1]),e.$set(c)},i(t){r||(h(e.$$.fragment,t),r=!0)},o(t){$(e.$$.fragment,t),r=!1},d(t){P(e,t)}}}function te(f){let e,r,t,l,c,p,o,d;r=new L({props:{$$slots:{default:[X]},$$scope:{ctx:f}}});const s=[ee,Z,Y],a=[];function i(n,u){return n[0]===void 0?0:n[0].length===0?1:2}return l=i(f),c=a[l]=s[l](f),o=new U({props:{href:R.addRecipe()}}),{c(){e=k(),x(r.$$.fragment),t=k(),c.c(),p=k(),x(o.$$.fragment),this.h()},l(n){T("svelte-t7jrhh",document.head).forEach(m),e=b(n),C(r.$$.fragment,n),t=b(n),c.l(n),p=b(n),C(o.$$.fragment,n),this.h()},h(){document.title="Pour over recipes - PourOverPotato app"},m(n,u){_(n,e,u),y(r,n,u),_(n,t,u),a[l].m(n,u),_(n,p,u),y(o,n,u),d=!0},p(n,[u]){const q={};u&16&&(q.$$scope={dirty:u,ctx:n}),r.$set(q);let v=l;l=i(n),l===v?a[l].p(n,u):(A(),$(a[v],1,1,()=>{a[v]=null}),I(),c=a[l],c?c.p(n,u):(c=a[l]=s[l](n),c.c()),h(c,1),c.m(p.parentNode,p))},i(n){d||(h(r.$$.fragment,n),h(c),h(o.$$.fragment,n),d=!0)},o(n){$(r.$$.fragment,n),$(c),$(o.$$.fragment,n),d=!1},d(n){n&&(m(e),m(t),m(p)),P(r,n),a[l].d(n),P(o,n)}}}function ne(f,e,r){let t;return E(()=>{Q().then(l=>{r(0,t=l.sort(V))})}),[t]}class fe extends F{constructor(e){super(),O(this,e,ne,te,D,{})}}export{fe as component};