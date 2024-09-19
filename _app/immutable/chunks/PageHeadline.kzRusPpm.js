import{o as c,R as o,g as d,d as m,h as p,E as f,r as u}from"./core.D-38Eqyu.js";import{s as w,d as b,u as R,g as S,e as _}from"./scheduler.Cw1-ZcKD.js";import{S as D,i as B,e as E,c as g,a as h,d as l,z as y,g as I,q as v,o as j}from"./index.D7LFJCWc.js";async function A(a){const n=new p(a),e=(await c()).transaction([o,f],"readwrite"),s=await e.objectStore(o).add(n);return await u(a.coffeeBeansId,e),await e.done,new d({...n,id:s}).toRecipe()}async function O(){return await(await c()).count(o)>0}async function P(a){const n=d.fromRecipe(a),e=(await c()).transaction([o,f],"readwrite");return await e.objectStore(o).put(n),await u(a.coffeeBeansId,e),await e.done,n.toRecipe()}async function x(){return(await(await c()).getAll(o)).filter(e=>e.softDeletionTimestamp===void 0).map(e=>new d(e).toRecipe())}async function H(a){const t=await(await c()).get(o,a);if(!(t===void 0||t.softDeletionTimestamp))return new d(t).toRecipe()}async function q(a){return(await(await c()).getAllFromIndex(o,m,a)).filter(s=>s.softDeletionTimestamp===void 0).map(s=>new d(s).toRecipe())}async function z(a){const t=(await c()).transaction([o,f],"readwrite"),e=await t.objectStore(o).get(a);e!==void 0&&(await t.objectStore(o).delete(a),await u(e.coffeeBeansId,t),await t.done)}async function X(a){const t=(await c()).transaction([o,f],"readwrite"),e=await t.objectStore(o).get(a);return e===void 0?"RecipeNotFound":(e.softDeletionTimestamp=Date.now(),await t.objectStore(o).put(e),await u(e.coffeeBeansId,t),await t.done,"Success")}async function k(a){const t=(await c()).transaction([o,f],"readwrite"),e=await t.objectStore(o).get(a);return e===void 0?"RecipeNotFound":(e.softDeletionTimestamp=void 0,await t.objectStore(o).put(e),await u(e.coffeeBeansId,t),await t.done,"Success")}function C(a){let n,t;const e=a[1].default,s=b(e,a,a[0],null);return{c(){n=E("h1"),s&&s.c(),this.h()},l(i){n=g(i,"H1",{class:!0});var r=h(n);s&&s.l(r),r.forEach(l),this.h()},h(){y(n,"class","svelte-1iu2sn2")},m(i,r){I(i,n,r),s&&s.m(n,null),t=!0},p(i,[r]){s&&s.p&&(!t||r&1)&&R(s,e,i,i[0],t?_(e,i[0],r,null):S(i[0]),null)},i(i){t||(v(s,i),t=!0)},o(i){j(s,i),t=!1},d(i){i&&l(n),s&&s.d(i)}}}function $(a,n,t){let{$$slots:e={},$$scope:s}=n;return a.$$set=i=>{"$$scope"in i&&t(0,s=i.$$scope)},[s,e]}class G extends D{constructor(n){super(),B(this,n,$,C,w,{})}}export{G as P,O as a,q as b,A as c,H as d,P as e,x as g,z as h,X as s,k as u};
