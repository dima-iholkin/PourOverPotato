import{s as N,o as J,n as j}from"../chunks/scheduler.c6D-u3vw.js";import{S as O,i as V,k as g,m as b,n as k,q as d,o as h,r as C,e as I,s as w,t as B,c as E,a as R,d as p,f as v,b as y,x as S,g as $,h as P,j as A,l as K,p as z,u as G,v as D}from"../chunks/index.uR5eFXUy.js";import{e as H,u as Q,o as U}from"../chunks/each.SsXDy5GB.js";import{g as W,b as X}from"../chunks/indexedDB.Q_ZGv_fi.js";import{C as Y,A as Z,s as x,a as ee,S as te}from"../chunks/NoItemsYetP.vzLr9CNR.js";import{r as T}from"../chunks/routes.r-Xq-va3.js";import{F as ne}from"../chunks/FlexRow.GGLUjX4k.js";import{L as se}from"../chunks/Loading.fvMZ11oo.js";import{A as re}from"../chunks/AddDemoCoffeeBeans_PageBlock.NY2sMb9o.js";import{P as ae}from"../chunks/PageHeadline.F2eDUn1P.js";function oe(c){let t,n=c[0].name+"",e,o,r,l,u,i=c[1]===1?"recipe":"recipes",a;return{c(){t=I("h5"),e=B(n),o=w(),r=I("p"),l=B(c[1]),u=w(),a=B(i),this.h()},l(s){t=E(s,"H5",{class:!0});var m=R(t);e=y(m,n),m.forEach(p),o=v(s),r=E(s,"P",{class:!0});var f=R(r);l=y(f,c[1]),u=v(f),a=y(f,i),f.forEach(p),this.h()},h(){S(t,"class","svelte-hw40yk"),S(r,"class","recipes-count svelte-hw40yk")},m(s,m){$(s,t,m),P(t,e),$(s,o,m),$(s,r,m),P(r,l),P(r,u),P(r,a)},p(s,m){m&1&&n!==(n=s[0].name+"")&&A(e,n),m&2&&A(l,s[1]),m&2&&i!==(i=s[1]===1?"recipe":"recipes")&&A(a,i)},d(s){s&&(p(t),p(o),p(r))}}}function fe(c){let t,n,e,o,r=c[0].description+"",l,u;return n=new ne({props:{$$slots:{default:[oe]},$$scope:{ctx:c}}}),{c(){t=I("div"),g(n.$$.fragment),e=w(),o=I("p"),l=B(r),this.h()},l(i){t=E(i,"DIV",{class:!0});var a=R(t);b(n.$$.fragment,a),a.forEach(p),e=v(i),o=E(i,"P",{class:!0});var s=R(o);l=y(s,r),s.forEach(p),this.h()},h(){S(t,"class","flex-row svelte-hw40yk"),S(o,"class","content svelte-hw40yk")},m(i,a){$(i,t,a),k(n,t,null),$(i,e,a),$(i,o,a),P(o,l),u=!0},p(i,a){const s={};a&11&&(s.$$scope={dirty:a,ctx:i}),n.$set(s),(!u||a&1)&&r!==(r=i[0].description+"")&&A(l,r)},i(i){u||(d(n.$$.fragment,i),u=!0)},o(i){h(n.$$.fragment,i),u=!1},d(i){i&&(p(t),p(e),p(o)),C(n)}}}function le(c){let t,n;return t=new Y({props:{href:c[2],$$slots:{default:[fe]},$$scope:{ctx:c}}}),{c(){g(t.$$.fragment)},l(e){b(t.$$.fragment,e)},m(e,o){k(t,e,o),n=!0},p(e,[o]){const r={};o&4&&(r.href=e[2]),o&11&&(r.$$scope={dirty:o,ctx:e}),t.$set(r)},i(e){n||(d(t.$$.fragment,e),n=!0)},o(e){h(t.$$.fragment,e),n=!1},d(e){C(t,e)}}}function ie(c,t,n){let{item:e}=t,{recipeCount:o=0}=t,{href:r}=t;return c.$$set=l=>{"item"in l&&n(0,e=l.item),"recipeCount"in l&&n(1,o=l.recipeCount),"href"in l&&n(2,r=l.href)},[e,o,r]}class ce extends O{constructor(t){super(),V(this,t,ie,le,N,{item:0,recipeCount:1,href:2})}}function L(c,t,n){const e=c.slice();return e[3]=t[n],e}function ue(c){let t;return{c(){t=B("Coffee beans")},l(n){t=y(n,"Coffee beans")},m(n,e){$(n,t,e)},d(n){n&&p(t)}}}function me(c){let t,n,e=[],o=new Map,r,l;t=new te({props:{$$slots:{default:[_e]},$$scope:{ctx:c}}});let u=H(c[0]);const i=a=>a[3].id;for(let a=0;a<u.length;a+=1){let s=L(c,u,a),m=i(s);o.set(m,e[a]=M(m,s))}return{c(){g(t.$$.fragment),n=w();for(let a=0;a<e.length;a+=1)e[a].c();r=D()},l(a){b(t.$$.fragment,a),n=v(a);for(let s=0;s<e.length;s+=1)e[s].l(a);r=D()},m(a,s){k(t,a,s),$(a,n,s);for(let m=0;m<e.length;m+=1)e[m]&&e[m].m(a,s);$(a,r,s),l=!0},p(a,s){const m={};s&64&&(m.$$scope={dirty:s,ctx:a}),t.$set(m),s&1&&(u=H(a[0]),G(),e=Q(e,s,i,1,a,u,o,r.parentNode,U,M,r,L),z())},i(a){if(!l){d(t.$$.fragment,a);for(let s=0;s<u.length;s+=1)d(e[s]);l=!0}},o(a){h(t.$$.fragment,a);for(let s=0;s<e.length;s+=1)h(e[s]);l=!1},d(a){a&&(p(n),p(r)),C(t,a);for(let s=0;s<e.length;s+=1)e[s].d(a)}}}function pe(c){let t,n;return t=new re({props:{onAddDemoEntities:c[2]}}),{c(){g(t.$$.fragment)},l(e){b(t.$$.fragment,e)},m(e,o){k(t,e,o),n=!0},p:j,i(e){n||(d(t.$$.fragment,e),n=!0)},o(e){h(t.$$.fragment,e),n=!1},d(e){C(t,e)}}}function $e(c){let t,n;return t=new se({}),{c(){g(t.$$.fragment)},l(e){b(t.$$.fragment,e)},m(e,o){k(t,e,o),n=!0},p:j,i(e){n||(d(t.$$.fragment,e),n=!0)},o(e){h(t.$$.fragment,e),n=!1},d(e){C(t,e)}}}function _e(c){let t;return{c(){t=B("Sorted by latest recipe date")},l(n){t=y(n,"Sorted by latest recipe date")},m(n,e){$(n,t,e)},d(n){n&&p(t)}}}function M(c,t){let n,e,o;return e=new ce({props:{href:T.coffeeBeansItem(t[3].name),item:t[3],recipeCount:t[3].recipeCount}}),{key:c,first:null,c(){n=D(),g(e.$$.fragment),this.h()},l(r){n=D(),b(e.$$.fragment,r),this.h()},h(){this.first=n},m(r,l){$(r,n,l),k(e,r,l),o=!0},p(r,l){t=r;const u={};l&1&&(u.href=T.coffeeBeansItem(t[3].name)),l&1&&(u.item=t[3]),l&1&&(u.recipeCount=t[3].recipeCount),e.$set(u)},i(r){o||(d(e.$$.fragment,r),o=!0)},o(r){h(e.$$.fragment,r),o=!1},d(r){r&&p(n),C(e,r)}}}function de(c){let t,n,e,o,r,l,u,i;n=new ae({props:{$$slots:{default:[ue]},$$scope:{ctx:c}}});const a=[$e,pe,me],s=[];function m(f,_){return f[0]===void 0?0:f[0].length===0?1:2}return o=m(c),r=s[o]=a[o](c),u=new Z({props:{href:T.addRecipe()}}),{c(){t=w(),g(n.$$.fragment),e=w(),r.c(),l=w(),g(u.$$.fragment),this.h()},l(f){K("svelte-n9a09p",document.head).forEach(p),t=v(f),b(n.$$.fragment,f),e=v(f),r.l(f),l=v(f),b(u.$$.fragment,f),this.h()},h(){document.title="PourOverPotato app"},m(f,_){$(f,t,_),k(n,f,_),$(f,e,_),s[o].m(f,_),$(f,l,_),k(u,f,_),i=!0},p(f,[_]){const q={};_&64&&(q.$$scope={dirty:_,ctx:f}),n.$set(q);let F=o;o=m(f),o===F?s[o].p(f,_):(G(),h(s[F],1,1,()=>{s[F]=null}),z(),r=s[o],r?r.p(f,_):(r=s[o]=a[o](f),r.c()),d(r,1),r.m(l.parentNode,l))},i(f){i||(d(n.$$.fragment,f),d(r),d(u.$$.fragment,f),i=!0)},o(f){h(n.$$.fragment,f),h(r),h(u.$$.fragment,f),i=!1},d(f){f&&(p(t),p(e),p(l)),C(n,f),s[o].d(f),C(u,f)}}}function he(c,t,n){let e;J(()=>{o()});async function o(){const l=await W(),u=await Promise.all(l.map(async i=>{const a=await X(i.id);return{...i,recipeCount:a.length,latestRecipeTimestamp:a.length>0?a.sort(x)[0].timestamp:void 0}}));n(0,e=u.sort(ee))}return[e,o,()=>o()]}class Ie extends O{constructor(t){super(),V(this,t,he,de,N,{})}}export{Ie as component};
