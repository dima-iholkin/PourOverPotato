import{s as b,d as D,u as V,g as z,e as T,n as v}from"./scheduler.Cw1-ZcKD.js";import{S as C,i as N,e as u,c as f,a as _,d as c,z as i,g as p,q,o as w,y as I,s as y,k as j,f as P,m as k,h as g,n as B,r as F}from"./index.DHsbL8_X.js";function L(l){let t,a;const s=l[2].default,e=D(s,l,l[1],null);return{c(){t=u("a"),e&&e.c(),this.h()},l(r){t=f(r,"A",{href:!0,class:!0});var n=_(t);e&&e.l(n),n.forEach(c),this.h()},h(){i(t,"href",l[0]),i(t,"class","svelte-1tglhn2")},m(r,n){p(r,t,n),e&&e.m(t,null),a=!0},p(r,[n]){e&&e.p&&(!a||n&2)&&V(e,s,r,r[1],a?T(s,r[1],n,null):z(r[1]),null),(!a||n&1)&&i(t,"href",r[0])},i(r){a||(q(e,r),a=!0)},o(r){w(e,r),a=!1},d(r){r&&c(t),e&&e.d(r)}}}function R(l,t,a){let{$$slots:s={},$$scope:e}=t,{href:r=void 0}=t;return l.$$set=n=>{"href"in n&&a(0,r=n.href),"$$scope"in n&&a(1,e=n.$$scope)},[r,e,s]}class Q extends C{constructor(t){super(),N(this,t,R,L,b,{href:0})}}function U(l){let t,a="add";return{c(){t=u("span"),t.textContent=a,this.h()},l(s){t=f(s,"SPAN",{class:!0,"data-svelte-h":!0}),I(t)!=="svelte-1ot69je"&&(t.textContent=a),this.h()},h(){i(t,"class","material-icons")},m(s,e){p(s,t,e)},p:v,i:v,o:v,d(s){s&&c(t)}}}class Y extends C{constructor(t){super(),N(this,t,null,U,b,{})}}function G(l){let t,a,s,e,r,n,h,S,m,E="Add recipe",x;return h=new Y({}),{c(){t=u("div"),a=y(),s=u("div"),e=u("a"),r=u("button"),n=u("div"),j(h.$$.fragment),S=y(),m=u("p"),m.textContent=E,this.h()},l(o){t=f(o,"DIV",{class:!0}),_(t).forEach(c),a=P(o),s=f(o,"DIV",{class:!0});var d=_(s);e=f(d,"A",{href:!0,tabindex:!0});var A=_(e);r=f(A,"BUTTON",{class:!0});var O=_(r);n=f(O,"DIV",{class:!0});var $=_(n);k(h.$$.fragment,$),S=P($),m=f($,"P",{class:!0,"data-svelte-h":!0}),I(m)!=="svelte-1hg3q39"&&(m.textContent=E),$.forEach(c),O.forEach(c),A.forEach(c),d.forEach(c),this.h()},h(){i(t,"class","page-bottom-gap svelte-14x9rx6"),i(m,"class","svelte-14x9rx6"),i(n,"class","svelte-14x9rx6"),i(r,"class","my-button svelte-14x9rx6"),i(e,"href",l[0]),i(e,"tabindex","-1"),i(s,"class","fab-container svelte-14x9rx6")},m(o,d){p(o,t,d),p(o,a,d),p(o,s,d),g(s,e),g(e,r),g(r,n),B(h,n,null),g(n,S),g(n,m),x=!0},p(o,[d]){(!x||d&1)&&i(e,"href",o[0])},i(o){x||(q(h.$$.fragment,o),x=!0)},o(o){w(h.$$.fragment,o),x=!1},d(o){o&&(c(t),c(a),c(s)),F(h)}}}function H(l,t,a){let{href:s}=t;return l.$$set=e=>{"href"in e&&a(0,s=e.href)},[s]}class W extends C{constructor(t){super(),N(this,t,H,G,b,{href:0})}}function X(l){const t=localStorage.getItem(`sortOrder_${l}`);if(t===null)return 0;const a=Number.parseInt(t);return Number.isNaN(a)?(console.warn(`Error reading sortOrder_${l} from LocalStorage, value was: ${t}.`),0):a}function Z(l,t){localStorage.setItem(`sortOrder_${l}`,t)}function J(l){let t,a="No items added yet...";return{c(){t=u("p"),t.textContent=a,this.h()},l(s){t=f(s,"P",{class:!0,"data-svelte-h":!0}),I(t)!=="svelte-1a0xdip"&&(t.textContent=a),this.h()},h(){i(t,"class","no-items-yet svelte-1azt3qr")},m(s,e){p(s,t,e)},p:v,i:v,o:v,d(s){s&&c(t)}}}class tt extends C{constructor(t){super(),N(this,t,null,J,b,{})}}export{W as A,Q as C,tt as N,X as l,Z as s};
