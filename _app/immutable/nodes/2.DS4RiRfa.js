import{s as U,j as ne,n as H,o as le,b as oe,a as ie}from"../chunks/scheduler.Cw1-ZcKD.js";import{S as J,i as K,k as I,m as V,n as N,q as k,o as C,r as P,e as y,t as L,s as O,c as B,a as w,b as F,d as p,f as E,z as R,g as v,h as $,j as z,y as ce,G as X,A as fe,D as ue,H as me,l as pe,p as se,u as re,v as _e,w as M}from"../chunks/index.DHsbL8_X.js";import{e as j,u as ae,i as de,g as he,o as $e}from"../chunks/manageCoffeeBeans.CzXUSSc2.js";import{P as ge,d as ve}from"../chunks/PageHeadline.DK2gBKFE.js";import{r as S}from"../chunks/routes.9lc0K48O.js";import{s as q,a as be,b as ke,c as Ce}from"../chunks/sortCoffeeBeans.DuV8qXjh.js";import{C as ye,l as Be,g as Re,A as we,s as Oe}from"../chunks/NoItemsYetP.Dhuoo2Go.js";import{L as Ee}from"../chunks/Loading.BjzKhRf5.js";import{A as Ie}from"../chunks/AddDemoCoffeeBeans_PageBlock.CF9UDAx0.js";function Ve(o){let t,r,s,a=o[0].name+"",l,i,c,m,d,u=o[1]===1?"recipe":"recipes",_,e,n,f=o[0].description+"",g;return{c(){t=y("div"),r=y("div"),s=y("h5"),l=L(a),i=O(),c=y("p"),m=L(o[1]),d=O(),_=L(u),e=O(),n=y("p"),g=L(f),this.h()},l(h){t=B(h,"DIV",{class:!0});var b=w(t);r=B(b,"DIV",{class:!0});var D=w(r);s=B(D,"H5",{class:!0});var Q=w(s);l=F(Q,a),Q.forEach(p),i=E(D),c=B(D,"P",{class:!0});var T=w(c);m=F(T,o[1]),d=E(T),_=F(T,u),T.forEach(p),D.forEach(p),b.forEach(p),e=E(h),n=B(h,"P",{class:!0});var W=w(n);g=F(W,f),W.forEach(p),this.h()},h(){R(s,"class","svelte-1a3o24z"),R(c,"class","recipes-count svelte-1a3o24z"),R(r,"class","flex-card-row svelte-1a3o24z"),R(t,"class","flex-row svelte-1a3o24z"),R(n,"class","content svelte-1a3o24z")},m(h,b){v(h,t,b),$(t,r),$(r,s),$(s,l),$(r,i),$(r,c),$(c,m),$(c,d),$(c,_),v(h,e,b),v(h,n,b),$(n,g)},p(h,b){b&1&&a!==(a=h[0].name+"")&&z(l,a),b&2&&z(m,h[1]),b&2&&u!==(u=h[1]===1?"recipe":"recipes")&&z(_,u),b&1&&f!==(f=h[0].description+"")&&z(g,f)},d(h){h&&(p(t),p(e),p(n))}}}function Ne(o){let t,r;return t=new ye({props:{href:o[2],$$slots:{default:[Ve]},$$scope:{ctx:o}}}),{c(){I(t.$$.fragment)},l(s){V(t.$$.fragment,s)},m(s,a){N(t,s,a),r=!0},p(s,[a]){const l={};a&4&&(l.href=s[2]),a&11&&(l.$$scope={dirty:a,ctx:s}),t.$set(l)},i(s){r||(k(t.$$.fragment,s),r=!0)},o(s){C(t.$$.fragment,s),r=!1},d(s){P(t,s)}}}function Pe(o,t,r){let{item:s}=t,{recipeCount:a=0}=t,{href:l}=t;return o.$$set=i=>{"item"in i&&r(0,s=i.item),"recipeCount"in i&&r(1,a=i.recipeCount),"href"in i&&r(2,l=i.href)},[s,a,l]}class Le extends J{constructor(t){super(),K(this,t,Pe,Ne,U,{item:0,recipeCount:1,href:2})}}var A=(o=>(o[o.Name=0]="Name",o[o.NameReverse=1]="NameReverse",o[o.LatestRecipe=2]="LatestRecipe",o[o.EarliestRecipe=3]="EarliestRecipe",o))(A||{});function Y(o,t,r){const s=o.slice();return s[3]=t[r],s}function Z(o,t){let r,s=t[3].key+"",a;return{key:o,first:null,c(){r=y("option"),a=L(s),this.h()},l(l){r=B(l,"OPTION",{});var i=w(r);a=F(i,s),i.forEach(p),this.h()},h(){r.__value=t[3].value,ue(r,r.__value),this.first=r},m(l,i){v(l,r,i),$(r,a)},p(l,i){t=l},d(l){l&&p(r)}}}function Fe(o){let t,r,s="Sorted by",a,l,i=[],c=new Map,m,d,u=j(G);const _=e=>e[3].value;for(let e=0;e<u.length;e+=1){let n=Y(o,u,e),f=_(n);c.set(f,i[e]=Z(f,n))}return{c(){t=y("div"),r=y("p"),r.textContent=s,a=O(),l=y("select");for(let e=0;e<i.length;e+=1)i[e].c();this.h()},l(e){t=B(e,"DIV",{class:!0});var n=w(t);r=B(n,"P",{"data-svelte-h":!0}),ce(r)!=="svelte-1ft4ueu"&&(r.textContent=s),a=E(n),l=B(n,"SELECT",{id:!0,name:!0,class:!0});var f=w(l);for(let g=0;g<i.length;g+=1)i[g].l(f);f.forEach(p),n.forEach(p),this.h()},h(){R(l,"id",x),R(l,"name",x),R(l,"class","svelte-b5s4o7"),o[0]===void 0&&ne(()=>o[2].call(l)),R(t,"class","select-container svelte-b5s4o7")},m(e,n){v(e,t,n),$(t,r),$(t,a),$(t,l);for(let f=0;f<i.length;f+=1)i[f]&&i[f].m(l,null);X(l,o[0],!0),m||(d=fe(l,"change",o[2]),m=!0)},p(e,[n]){n&0&&(u=j(G),i=ae(i,n,_,1,e,u,c,l,de,Z,null,Y)),n&1&&X(l,e[0])},i:H,o:H,d(e){e&&p(t);for(let n=0;n<i.length;n+=1)i[n].d();m=!1,d()}}}const x="coffeebeans-sort-order",G=[{value:A.Name,key:"name",sortOrderFunc:q},{value:A.NameReverse,key:"name reverse",sortOrderFunc:be},{value:A.LatestRecipe,key:"latest recipe",sortOrderFunc:ke},{value:A.EarliestRecipe,key:"earliest recipe",sortOrderFunc:Ce}];function Ae(o,t,r){let{sortOrderValue:s}=t,a=Be("coffeeBeans");function l(){a=me(this),r(0,a)}return o.$$set=i=>{"sortOrderValue"in i&&r(1,s=i.sortOrderValue)},o.$$.update=()=>{var i;if(o.$$.dirty&1){const c=((i=G.find(m=>m.value===a))==null?void 0:i.sortOrderFunc)??q;r(1,s={value:a,sortOrderFunc:c}),Re("coffeeBeans",a)}},[a,s,l]}class De extends J{constructor(t){super(),K(this,t,Ae,Fe,U,{sortOrderValue:1})}}function ee(o,t,r){const s=o.slice();return s[5]=t[r],s}function Te(o){let t;return{c(){t=L("Coffee beans")},l(r){t=F(r,"Coffee beans")},m(r,s){v(r,t,s)},d(r){r&&p(t)}}}function ze(o){let t,r,s,a=[],l=new Map,i,c;function m(e){o[4](e)}let d={};o[1]!==void 0&&(d.sortOrderValue=o[1]),t=new De({props:d}),oe.push(()=>_e(t,"sortOrderValue",m));let u=j(o[0]);const _=e=>e[5].id;for(let e=0;e<u.length;e+=1){let n=ee(o,u,e),f=_(n);l.set(f,a[e]=te(f,n))}return{c(){I(t.$$.fragment),s=O();for(let e=0;e<a.length;e+=1)a[e].c();i=M()},l(e){V(t.$$.fragment,e),s=E(e);for(let n=0;n<a.length;n+=1)a[n].l(e);i=M()},m(e,n){N(t,e,n),v(e,s,n);for(let f=0;f<a.length;f+=1)a[f]&&a[f].m(e,n);v(e,i,n),c=!0},p(e,n){const f={};!r&&n&2&&(r=!0,f.sortOrderValue=e[1],ie(()=>r=!1)),t.$set(f),n&1&&(u=j(e[0]),re(),a=ae(a,n,_,1,e,u,l,i.parentNode,$e,te,i,ee),se())},i(e){if(!c){k(t.$$.fragment,e);for(let n=0;n<u.length;n+=1)k(a[n]);c=!0}},o(e){C(t.$$.fragment,e);for(let n=0;n<a.length;n+=1)C(a[n]);c=!1},d(e){e&&(p(s),p(i)),P(t,e);for(let n=0;n<a.length;n+=1)a[n].d(e)}}}function He(o){let t,r;return t=new Ie({props:{onAddDemoEntities:o[3]}}),{c(){I(t.$$.fragment)},l(s){V(t.$$.fragment,s)},m(s,a){N(t,s,a),r=!0},p:H,i(s){r||(k(t.$$.fragment,s),r=!0)},o(s){C(t.$$.fragment,s),r=!1},d(s){P(t,s)}}}function Me(o){let t,r;return t=new Ee({}),{c(){I(t.$$.fragment)},l(s){V(t.$$.fragment,s)},m(s,a){N(t,s,a),r=!0},p:H,i(s){r||(k(t.$$.fragment,s),r=!0)},o(s){C(t.$$.fragment,s),r=!1},d(s){P(t,s)}}}function te(o,t){let r,s,a;return s=new Le({props:{href:S.coffeeBeansItem(t[5].name),item:t[5],recipeCount:t[5].recipeCount}}),{key:o,first:null,c(){r=M(),I(s.$$.fragment),this.h()},l(l){r=M(),V(s.$$.fragment,l),this.h()},h(){this.first=r},m(l,i){v(l,r,i),N(s,l,i),a=!0},p(l,i){t=l;const c={};i&1&&(c.href=S.coffeeBeansItem(t[5].name)),i&1&&(c.item=t[5]),i&1&&(c.recipeCount=t[5].recipeCount),s.$set(c)},i(l){a||(k(s.$$.fragment,l),a=!0)},o(l){C(s.$$.fragment,l),a=!1},d(l){l&&p(r),P(s,l)}}}function je(o){let t,r,s,a,l,i,c,m;r=new ge({props:{$$slots:{default:[Te]},$$scope:{ctx:o}}});const d=[Me,He,ze],u=[];function _(e,n){return e[0]===void 0?0:e[0].length===0?1:2}return a=_(o),l=u[a]=d[a](o),c=new we({props:{href:S.addRecipe()}}),{c(){t=O(),I(r.$$.fragment),s=O(),l.c(),i=O(),I(c.$$.fragment),this.h()},l(e){pe("svelte-n9a09p",document.head).forEach(p),t=E(e),V(r.$$.fragment,e),s=E(e),l.l(e),i=E(e),V(c.$$.fragment,e),this.h()},h(){document.title="PourOverPotato app"},m(e,n){v(e,t,n),N(r,e,n),v(e,s,n),u[a].m(e,n),v(e,i,n),N(c,e,n),m=!0},p(e,[n]){const f={};n&256&&(f.$$scope={dirty:n,ctx:e}),r.$set(f);let g=a;a=_(e),a===g?u[a].p(e,n):(re(),C(u[g],1,1,()=>{u[g]=null}),se(),l=u[a],l?l.p(e,n):(l=u[a]=d[a](e),l.c()),k(l,1),l.m(i.parentNode,i))},i(e){m||(k(r.$$.fragment,e),k(l),k(c.$$.fragment,e),m=!0)},o(e){C(r.$$.fragment,e),C(l),C(c.$$.fragment,e),m=!1},d(e){e&&(p(t),p(s),p(i)),P(r,e),u[a].d(e),P(c,e)}}}function qe(o,t,r){let s,a;le(()=>{l()});async function l(){const m=await he(),d=await Promise.all(m.map(async u=>{const _=await ve(u.id),e=_.sort(Oe),n=_.length;return{...u,recipeCount:n,latestRecipeTimestamp:n>0?e[0].timestamp:void 0,earliestRecipeTimestamp:n>0?e[n-1].timestamp:void 0}}));r(0,s=d.sort(q))}const i=()=>l();function c(m){a=m,r(1,a)}return o.$$.update=()=>{o.$$.dirty&3&&s&&r(0,s=s.sort((a==null?void 0:a.sortOrderFunc)??q))},[s,a,l,i,c]}class Ze extends J{constructor(t){super(),K(this,t,qe,je,U,{})}}export{Ze as component};
