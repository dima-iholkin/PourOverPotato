import{s as B,o as R,n as h}from"./scheduler.vcOl-ZmV.js";import{S as T,i as E,w as D,g as A,u as W,o as v,p as N,q as y,d as C,k as P,m as S,n as $,r as I,e as u,s as x,c as _,a as Y,y as g,f as w,z as b,h as p,A as q}from"./index.Otd-Ubpp.js";import{t as z,C as M,j,v as F,w as G,i as O}from"./indexedDB.omaGZViy.js";import{N as U}from"./NoItemsYetP.46DTwFtc.js";const V=[{name:"Rwanda Mabanza",description:"Washed process. Dark plum, dark cherry notes. (demo)"},{name:"Colombia El Refugio",description:"Natural process. Berry notes. (demo)"},{name:"Ethiopia Yirgacheffe",description:"Washed process. Grassy notes. (demo)"}];function H(n){return[{coffeeBeansId:n,recipeTarget:"17g + 270g. 5m boil.",recipeResult:"2m10s + 15s drip.",outWeight:230,favorite:!1,rating:3.5,recipeThoughts:"Can be better.",timestamp:new Date(2023,12,20)},{coffeeBeansId:n,recipeTarget:"18g + 290g. 5m boil.",recipeResult:"2m10s + 15s drip.",outWeight:235,favorite:!1,rating:4,recipeThoughts:"It's better.",timestamp:new Date(2023,12,23)},{coffeeBeansId:n,recipeTarget:"20g + 300g. 5m boil.",recipeResult:"2m30s + 5s drip.",outWeight:240,favorite:!0,rating:4.5,recipeThoughts:"It's great.",timestamp:new Date(2023,12,26)}]}async function J(){for(const n of V){const e=await z(n);if(e instanceof M){const t=H(e.id);for(const o of t)await j(o)}}}function K(n){let e,t;return e=new U({}),{c(){P(e.$$.fragment)},l(o){S(e.$$.fragment,o)},m(o,a){$(e,o,a),t=!0},p:h,i(o){t||(y(e.$$.fragment,o),t=!0)},o(o){v(e.$$.fragment,o),t=!1},d(o){I(e,o)}}}function L(n){let e,t,o="You have no coffee beans or recipes added yet...",a,c,r="Would you like to add 3 demo coffee beans and recipes?",i,s,l="Add demo coffee beans and recipes",f,k;return{c(){e=u("div"),t=u("p"),t.textContent=o,a=x(),c=u("p"),c.textContent=r,i=x(),s=u("button"),s.textContent=l,this.h()},l(m){e=_(m,"DIV",{class:!0});var d=Y(e);t=_(d,"P",{"data-svelte-h":!0}),g(t)!=="svelte-1adc83f"&&(t.textContent=o),a=w(d),c=_(d,"P",{"data-svelte-h":!0}),g(c)!=="svelte-1to9di7"&&(c.textContent=r),i=w(d),s=_(d,"BUTTON",{class:!0,type:!0,"data-svelte-h":!0}),g(s)!=="svelte-4fa3lo"&&(s.textContent=l),d.forEach(C),this.h()},h(){b(s,"class","add-demo-coffee-beans svelte-16arx12"),b(s,"type","button"),b(e,"class","empty-db-message-container svelte-16arx12")},m(m,d){A(m,e,d),p(e,t),p(e,a),p(e,c),p(e,i),p(e,s),f||(k=q(s,"click",n[2]),f=!0)},p:h,i:h,o:h,d(m){m&&C(e),f=!1,k()}}}function Q(n){let e,t,o,a;const c=[L,K],r=[];function i(s,l){return s[0]===!1&&s[1]===!1?0:1}return e=i(n),t=r[e]=c[e](n),{c(){t.c(),o=D()},l(s){t.l(s),o=D()},m(s,l){r[e].m(s,l),A(s,o,l),a=!0},p(s,[l]){let f=e;e=i(s),e===f?r[e].p(s,l):(W(),v(r[f],1,1,()=>{r[f]=null}),N(),t=r[e],t?t.p(s,l):(t=r[e]=c[e](s),t.c()),y(t,1),t.m(o.parentNode,o))},i(s){a||(y(t),a=!0)},o(s){v(t),a=!1},d(s){s&&C(o),r[e].d(s)}}}function X(n,e,t){let{onAddDemoEntities:o}=e,a=!0,c=!0;R(()=>{F().then(i=>{t(0,a=i)}),G().then(i=>{t(1,c=i)})});function r(){J().then(()=>{O("Demo coffee beans and recipes added."),o()})}return n.$$set=i=>{"onAddDemoEntities"in i&&t(3,o=i.onAddDemoEntities)},[a,c,r,o]}class oe extends T{constructor(e){super(),E(this,e,X,Q,B,{onAddDemoEntities:3})}}export{oe as A};
