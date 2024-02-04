import{s as D,o as T,n as g}from"../chunks/scheduler.AO9fmgJ9.js";import{S as G,i as J,k as y,m as P,n as B,q as $,o as d,r as E,s as C,e as M,t as v,f as b,c as q,a as R,b as w,d as p,y as j,g as h,h as k,j as F,l as U,p as K,u as L,v as I,x as Q}from"../chunks/index.aOryA6iz.js";import{e as A,u as V,o as W}from"../chunks/each.Ps9lscrY.js";import{C as X,F as Y,M as Z}from"../chunks/Card.88gmIURc.js";import{P as x}from"../chunks/PageHeadline.tjTqjmKn.js";import{a as ee,b as te}from"../chunks/indexedDB.b1TVZGZV.js";import{r as H}from"../chunks/routes.7NYnkK08.js";function ne(i){let e,s=i[0].name+"",t,a,r,f,n,l=i[1]===1?"recipe":"recipes",u;return{c(){e=M("h5"),t=v(s),a=C(),r=M("p"),f=v(i[1]),n=C(),u=v(l),this.h()},l(c){e=q(c,"H5",{class:!0});var _=R(e);t=w(_,s),_.forEach(p),a=b(c),r=q(c,"P",{class:!0});var o=R(r);f=w(o,i[1]),n=b(o),u=w(o,l),o.forEach(p),this.h()},h(){j(e,"class","svelte-1vf88y3"),j(r,"class","svelte-1vf88y3")},m(c,_){h(c,e,_),k(e,t),h(c,a,_),h(c,r,_),k(r,f),k(r,n),k(r,u)},p(c,_){_&1&&s!==(s=c[0].name+"")&&F(t,s),_&2&&F(f,c[1]),_&2&&l!==(l=c[1]===1?"recipe":"recipes")&&F(u,l)},d(c){c&&(p(e),p(a),p(r))}}}function re(i){let e,s,t,a=i[0].description+"",r,f;return e=new Y({props:{$$slots:{default:[ne]},$$scope:{ctx:i}}}),{c(){y(e.$$.fragment),s=C(),t=M("p"),r=v(a),this.h()},l(n){P(e.$$.fragment,n),s=b(n),t=q(n,"P",{class:!0});var l=R(t);r=w(l,a),l.forEach(p),this.h()},h(){j(t,"class","svelte-1vf88y3")},m(n,l){B(e,n,l),h(n,s,l),h(n,t,l),k(t,r),f=!0},p(n,l){const u={};l&11&&(u.$$scope={dirty:l,ctx:n}),e.$set(u),(!f||l&1)&&a!==(a=n[0].description+"")&&F(r,a)},i(n){f||($(e.$$.fragment,n),f=!0)},o(n){d(e.$$.fragment,n),f=!1},d(n){n&&(p(s),p(t)),E(e,n)}}}function se(i){let e,s;return e=new X({props:{href:i[2],$$slots:{default:[re]},$$scope:{ctx:i}}}),{c(){y(e.$$.fragment)},l(t){P(e.$$.fragment,t)},m(t,a){B(e,t,a),s=!0},p(t,[a]){const r={};a&4&&(r.href=t[2]),a&11&&(r.$$scope={dirty:a,ctx:t}),e.$set(r)},i(t){s||($(e.$$.fragment,t),s=!0)},o(t){d(e.$$.fragment,t),s=!1},d(t){E(e,t)}}}function ae(i,e,s){let{item:t}=e,{recipeCount:a=0}=e,{href:r}=e;return i.$$set=f=>{"item"in f&&s(0,t=f.item),"recipeCount"in f&&s(1,a=f.recipeCount),"href"in f&&s(2,r=f.href)},[t,a,r]}class le extends G{constructor(e){super(),J(this,e,ae,se,D,{item:0,recipeCount:1,href:2})}}function O(i,e,s){const t=i.slice();return t[1]=e[s],t}function oe(i){let e;return{c(){e=v("Coffee beans")},l(s){e=w(s,"Coffee beans")},m(s,t){h(s,e,t)},d(s){s&&p(e)}}}function fe(i){let e=[],s=new Map,t,a,r=A(i[0]);const f=n=>n[1].id;for(let n=0;n<r.length;n+=1){let l=O(i,r,n),u=f(l);s.set(u,e[n]=z(u,l))}return{c(){for(let n=0;n<e.length;n+=1)e[n].c();t=I()},l(n){for(let l=0;l<e.length;l+=1)e[l].l(n);t=I()},m(n,l){for(let u=0;u<e.length;u+=1)e[u]&&e[u].m(n,l);h(n,t,l),a=!0},p(n,l){l&1&&(r=A(n[0]),L(),e=V(e,l,f,1,n,r,s,t.parentNode,W,z,t,O),K())},i(n){if(!a){for(let l=0;l<r.length;l+=1)$(e[l]);a=!0}},o(n){for(let l=0;l<e.length;l+=1)d(e[l]);a=!1},d(n){n&&p(t);for(let l=0;l<e.length;l+=1)e[l].d(n)}}}function ie(i){let e,s="No coffee beans added yet.";return{c(){e=M("p"),e.textContent=s},l(t){e=q(t,"P",{"data-svelte-h":!0}),Q(e)!=="svelte-1pt8418"&&(e.textContent=s)},m(t,a){h(t,e,a)},p:g,i:g,o:g,d(t){t&&p(e)}}}function ce(i){let e,s="loading...";return{c(){e=M("p"),e.textContent=s},l(t){e=q(t,"P",{"data-svelte-h":!0}),Q(e)!=="svelte-qeejp2"&&(e.textContent=s)},m(t,a){h(t,e,a)},p:g,i:g,o:g,d(t){t&&p(e)}}}function z(i,e){let s,t,a;return t=new le({props:{item:e[1],recipeCount:e[1].recipeCount,href:H.coffeeBeansItem(e[1].name)}}),{key:i,first:null,c(){s=I(),y(t.$$.fragment),this.h()},l(r){s=I(),P(t.$$.fragment,r),this.h()},h(){this.first=s},m(r,f){h(r,s,f),B(t,r,f),a=!0},p(r,f){e=r;const n={};f&1&&(n.item=e[1]),f&1&&(n.recipeCount=e[1].recipeCount),f&1&&(n.href=H.coffeeBeansItem(e[1].name)),t.$set(n)},i(r){a||($(t.$$.fragment,r),a=!0)},o(r){d(t.$$.fragment,r),a=!1},d(r){r&&p(s),E(t,r)}}}function ue(i){let e,s,t,a,r,f,n,l;s=new x({props:{$$slots:{default:[oe]},$$scope:{ctx:i}}});const u=[ce,ie,fe],c=[];function _(o,m){return o[0]===void 0?0:o[0].length===0?1:2}return a=_(i),r=c[a]=u[a](i),n=new Z({props:{href:H.addRecipe()}}),{c(){e=C(),y(s.$$.fragment),t=C(),r.c(),f=C(),y(n.$$.fragment),this.h()},l(o){U("svelte-n9a09p",document.head).forEach(p),e=b(o),P(s.$$.fragment,o),t=b(o),r.l(o),f=b(o),P(n.$$.fragment,o),this.h()},h(){document.title="PourOverPotato app"},m(o,m){h(o,e,m),B(s,o,m),h(o,t,m),c[a].m(o,m),h(o,f,m),B(n,o,m),l=!0},p(o,[m]){const S={};m&16&&(S.$$scope={dirty:m,ctx:o}),s.$set(S);let N=a;a=_(o),a===N?c[a].p(o,m):(L(),d(c[N],1,1,()=>{c[N]=null}),K(),r=c[a],r?r.p(o,m):(r=c[a]=u[a](o),r.c()),$(r,1),r.m(f.parentNode,f))},i(o){l||($(s.$$.fragment,o),$(r),$(n.$$.fragment,o),l=!0)},o(o){d(s.$$.fragment,o),d(r),d(n.$$.fragment,o),l=!1},d(o){o&&(p(e),p(t),p(f)),E(s,o),c[a].d(o),E(n,o)}}}function pe(i,e,s){let t;return T(()=>{ee().then(a=>{s(0,t=a),t==null||t.forEach(async r=>{r.recipeCount=await te(r.id),s(0,t)})})}),[t]}class be extends G{constructor(e){super(),J(this,e,pe,ue,D,{})}}export{be as component};
