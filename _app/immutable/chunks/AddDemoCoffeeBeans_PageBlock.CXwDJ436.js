import{s as B,o as w,n as h}from"./scheduler.Cw1-ZcKD.js";import{S as N,i as P,w as x,g as E,u as $,o as k,p as T,q as v,d as C,k as q,m as I,n as R,r as S,e as p,s as A,c as _,a as W,y as b,f as g,z as y,h as u,A as Y}from"./index.D7LFJCWc.js";import{a as z}from"./manageCoffeeBeans.l_UoDZFL.js";import{f as M}from"./manageData.IgINgcHi.js";import{a as O}from"./PageHeadline.kzRusPpm.js";import{N as U}from"./NoItemsYetP.D5qBnwgu.js";import{a as V}from"./core.D-38Eqyu.js";function j(c){let e,t;return e=new U({}),{c(){q(e.$$.fragment)},l(o){I(e.$$.fragment,o)},m(o,s){R(e,o,s),t=!0},p:h,i(o){t||(v(e.$$.fragment,o),t=!0)},o(o){k(e.$$.fragment,o),t=!1},d(o){S(e,o)}}}function F(c){let e,t,o="You have no coffee beans or recipes added yet...",s,i,a="Would you like to add 3 demo coffee beans and recipes?",r,n,l="Add demo coffee beans and recipes",d,D;return{c(){e=p("div"),t=p("p"),t.textContent=o,s=A(),i=p("p"),i.textContent=a,r=A(),n=p("button"),n.textContent=l,this.h()},l(m){e=_(m,"DIV",{class:!0});var f=W(e);t=_(f,"P",{"data-svelte-h":!0}),b(t)!=="svelte-1adc83f"&&(t.textContent=o),s=g(f),i=_(f,"P",{"data-svelte-h":!0}),b(i)!=="svelte-1to9di7"&&(i.textContent=a),r=g(f),n=_(f,"BUTTON",{class:!0,type:!0,"data-svelte-h":!0}),b(n)!=="svelte-4fa3lo"&&(n.textContent=l),f.forEach(C),this.h()},h(){y(n,"class","add-demo-coffee-beans svelte-1fw2k21"),y(n,"type","button"),y(e,"class","empty-db-message-container svelte-1fw2k21")},m(m,f){E(m,e,f),u(e,t),u(e,s),u(e,i),u(e,r),u(e,n),d||(D=Y(n,"click",c[2]),d=!0)},p:h,i:h,o:h,d(m){m&&C(e),d=!1,D()}}}function G(c){let e,t,o,s;const i=[F,j],a=[];function r(n,l){return n[0]===!1&&n[1]===!1?0:1}return e=r(c),t=a[e]=i[e](c),{c(){t.c(),o=x()},l(n){t.l(n),o=x()},m(n,l){a[e].m(n,l),E(n,o,l),s=!0},p(n,[l]){let d=e;e=r(n),e===d?a[e].p(n,l):($(),k(a[d],1,1,()=>{a[d]=null}),T(),t=a[e],t?t.p(n,l):(t=a[e]=i[e](n),t.c()),v(t,1),t.m(o.parentNode,o))},i(n){s||(v(t),s=!0)},o(n){k(t),s=!1},d(n){n&&C(o),a[e].d(n)}}}function H(c,e,t){let{onAddDemoEntities:o}=e,s=!0,i=!0;w(()=>{z().then(r=>{t(0,s=r)}),O().then(r=>{t(1,i=r)})});function a(){M().then(()=>{V("Demo coffee beans and recipes added."),o()})}return c.$$set=r=>{"onAddDemoEntities"in r&&t(3,o=r.onAddDemoEntities)},[s,i,a,o]}class te extends N{constructor(e){super(),P(this,e,H,G,B,{onAddDemoEntities:3})}}export{te as A};