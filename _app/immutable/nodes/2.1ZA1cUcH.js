import{s as N,o as J,n as j}from"../chunks/scheduler.QZKnv3vM.js";import{S as O,i as V,k as g,m as b,n as k,q as d,o as h,r as C,e as R,s as v,t as B,c as S,a as A,d as p,f as w,b as P,x as E,g as $,h as y,j as I,l as K,p as z,u as G,v as D}from"../chunks/index.CHfITGLb.js";import{P as Q,e as H,u as U,o as W}from"../chunks/PageHeadline.dJVkQ42h.js";import{g as X,b as Y}from"../chunks/indexedDB.vUzQvWEJ.js";import{C as Z,A as x,s as ee,a as te,S as ne}from"../chunks/NoItemsYetP.54nxMtoY.js";import{r as T}from"../chunks/routes.YhNteIIo.js";import{F as re}from"../chunks/FlexRow.Y4rk8yok.js";import{L as se}from"../chunks/Loading.EgPeQWTv.js";import{A as ae}from"../chunks/AddDemoCoffeeBeans_PageBlock.1rfXsLZY.js";function oe(c){let t,n=c[0].name+"",e,o,r,f,i,u=c[1]===1?"recipe":"recipes",a;return{c(){t=R("h5"),e=B(n),o=v(),r=R("p"),f=B(c[1]),i=v(),a=B(u),this.h()},l(s){t=S(s,"H5",{class:!0});var m=A(t);e=P(m,n),m.forEach(p),o=w(s),r=S(s,"P",{class:!0});var l=A(r);f=P(l,c[1]),i=w(l),a=P(l,u),l.forEach(p),this.h()},h(){E(t,"class","svelte-w146l6"),E(r,"class","recipes-count svelte-w146l6")},m(s,m){$(s,t,m),y(t,e),$(s,o,m),$(s,r,m),y(r,f),y(r,i),y(r,a)},p(s,m){m&1&&n!==(n=s[0].name+"")&&I(e,n),m&2&&I(f,s[1]),m&2&&u!==(u=s[1]===1?"recipe":"recipes")&&I(a,u)},d(s){s&&(p(t),p(o),p(r))}}}function fe(c){let t,n,e,o,r=c[0].description+"",f,i;return n=new re({props:{$$slots:{default:[oe]},$$scope:{ctx:c}}}),{c(){t=R("div"),g(n.$$.fragment),e=v(),o=R("p"),f=B(r),this.h()},l(u){t=S(u,"DIV",{class:!0});var a=A(t);b(n.$$.fragment,a),a.forEach(p),e=w(u),o=S(u,"P",{class:!0});var s=A(o);f=P(s,r),s.forEach(p),this.h()},h(){E(t,"class","flex-row svelte-w146l6"),E(o,"class","content svelte-w146l6")},m(u,a){$(u,t,a),k(n,t,null),$(u,e,a),$(u,o,a),y(o,f),i=!0},p(u,a){const s={};a&11&&(s.$$scope={dirty:a,ctx:u}),n.$set(s),(!i||a&1)&&r!==(r=u[0].description+"")&&I(f,r)},i(u){i||(d(n.$$.fragment,u),i=!0)},o(u){h(n.$$.fragment,u),i=!1},d(u){u&&(p(t),p(e),p(o)),C(n)}}}function le(c){let t,n;return t=new Z({props:{href:c[2],$$slots:{default:[fe]},$$scope:{ctx:c}}}),{c(){g(t.$$.fragment)},l(e){b(t.$$.fragment,e)},m(e,o){k(t,e,o),n=!0},p(e,[o]){const r={};o&4&&(r.href=e[2]),o&11&&(r.$$scope={dirty:o,ctx:e}),t.$set(r)},i(e){n||(d(t.$$.fragment,e),n=!0)},o(e){h(t.$$.fragment,e),n=!1},d(e){C(t,e)}}}function ie(c,t,n){let{item:e}=t,{recipeCount:o=0}=t,{href:r}=t;return c.$$set=f=>{"item"in f&&n(0,e=f.item),"recipeCount"in f&&n(1,o=f.recipeCount),"href"in f&&n(2,r=f.href)},[e,o,r]}class ce extends O{constructor(t){super(),V(this,t,ie,le,N,{item:0,recipeCount:1,href:2})}}function L(c,t,n){const e=c.slice();return e[1]=t[n],e}function ue(c){let t;return{c(){t=B("Coffee beans")},l(n){t=P(n,"Coffee beans")},m(n,e){$(n,t,e)},d(n){n&&p(t)}}}function me(c){let t,n,e=[],o=new Map,r,f;t=new ne({props:{$$slots:{default:[_e]},$$scope:{ctx:c}}});let i=H(c[0]);const u=a=>a[1].id;for(let a=0;a<i.length;a+=1){let s=L(c,i,a),m=u(s);o.set(m,e[a]=M(m,s))}return{c(){g(t.$$.fragment),n=v();for(let a=0;a<e.length;a+=1)e[a].c();r=D()},l(a){b(t.$$.fragment,a),n=w(a);for(let s=0;s<e.length;s+=1)e[s].l(a);r=D()},m(a,s){k(t,a,s),$(a,n,s);for(let m=0;m<e.length;m+=1)e[m]&&e[m].m(a,s);$(a,r,s),f=!0},p(a,s){const m={};s&16&&(m.$$scope={dirty:s,ctx:a}),t.$set(m),s&1&&(i=H(a[0]),G(),e=U(e,s,u,1,a,i,o,r.parentNode,W,M,r,L),z())},i(a){if(!f){d(t.$$.fragment,a);for(let s=0;s<i.length;s+=1)d(e[s]);f=!0}},o(a){h(t.$$.fragment,a);for(let s=0;s<e.length;s+=1)h(e[s]);f=!1},d(a){a&&(p(n),p(r)),C(t,a);for(let s=0;s<e.length;s+=1)e[s].d(a)}}}function pe(c){let t,n;return t=new ae({}),{c(){g(t.$$.fragment)},l(e){b(t.$$.fragment,e)},m(e,o){k(t,e,o),n=!0},p:j,i(e){n||(d(t.$$.fragment,e),n=!0)},o(e){h(t.$$.fragment,e),n=!1},d(e){C(t,e)}}}function $e(c){let t,n;return t=new se({}),{c(){g(t.$$.fragment)},l(e){b(t.$$.fragment,e)},m(e,o){k(t,e,o),n=!0},p:j,i(e){n||(d(t.$$.fragment,e),n=!0)},o(e){h(t.$$.fragment,e),n=!1},d(e){C(t,e)}}}function _e(c){let t;return{c(){t=B("Sorted by latest recipe date")},l(n){t=P(n,"Sorted by latest recipe date")},m(n,e){$(n,t,e)},d(n){n&&p(t)}}}function M(c,t){let n,e,o;return e=new ce({props:{href:T.coffeeBeansItem(t[1].name),item:t[1],recipeCount:t[1].recipeCount}}),{key:c,first:null,c(){n=D(),g(e.$$.fragment),this.h()},l(r){n=D(),b(e.$$.fragment,r),this.h()},h(){this.first=n},m(r,f){$(r,n,f),k(e,r,f),o=!0},p(r,f){t=r;const i={};f&1&&(i.href=T.coffeeBeansItem(t[1].name)),f&1&&(i.item=t[1]),f&1&&(i.recipeCount=t[1].recipeCount),e.$set(i)},i(r){o||(d(e.$$.fragment,r),o=!0)},o(r){h(e.$$.fragment,r),o=!1},d(r){r&&p(n),C(e,r)}}}function de(c){let t,n,e,o,r,f,i,u;n=new Q({props:{$$slots:{default:[ue]},$$scope:{ctx:c}}});const a=[$e,pe,me],s=[];function m(l,_){return l[0]===void 0?0:l[0].length===0?1:2}return o=m(c),r=s[o]=a[o](c),i=new x({props:{href:T.addRecipe()}}),{c(){t=v(),g(n.$$.fragment),e=v(),r.c(),f=v(),g(i.$$.fragment),this.h()},l(l){K("svelte-n9a09p",document.head).forEach(p),t=w(l),b(n.$$.fragment,l),e=w(l),r.l(l),f=w(l),b(i.$$.fragment,l),this.h()},h(){document.title="PourOverPotato app"},m(l,_){$(l,t,_),k(n,l,_),$(l,e,_),s[o].m(l,_),$(l,f,_),k(i,l,_),u=!0},p(l,[_]){const q={};_&16&&(q.$$scope={dirty:_,ctx:l}),n.$set(q);let F=o;o=m(l),o===F?s[o].p(l,_):(G(),h(s[F],1,1,()=>{s[F]=null}),z(),r=s[o],r?r.p(l,_):(r=s[o]=a[o](l),r.c()),d(r,1),r.m(f.parentNode,f))},i(l){u||(d(n.$$.fragment,l),d(r),d(i.$$.fragment,l),u=!0)},o(l){h(n.$$.fragment,l),h(r),h(i.$$.fragment,l),u=!1},d(l){l&&(p(t),p(e),p(f)),C(n,l),s[o].d(l),C(i,l)}}}function he(c,t,n){let e;return J(()=>{X().then(async o=>{const r=await Promise.all(o.map(async f=>{const i=await Y(f.id);return{...f,recipeCount:i.length,latestRecipeTimestamp:i.length>0?i.sort(ee)[0].timestamp:void 0}}));n(0,e=r.sort(te))})}),[e]}class Ie extends O{constructor(t){super(),V(this,t,he,de,N,{})}}export{Ie as component};
