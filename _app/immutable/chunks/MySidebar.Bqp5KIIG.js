import{s as I,n as S,c as w}from"./scheduler.iw5UPFgZ.js";import{S as D,i as k,e as d,s as A,c as g,a as _,z as M,f as G,d as b,x as o,B as f,g as q,h as u}from"./index.dhUYh1Im.js";import{b as x}from"./paths.L4h_ioTo.js";import{p as z}from"./stores.EKQIyO43.js";import{r as h}from"./routes.vzx06RAX.js";function B(t){let e,r,c,a,s,m='<span class="ms-3">Coffee beans</span>',y,l,H='<span class="ms-3">Recipes</span>',L,n,T='<span class="ms-3">Other</span>';return{c(){e=d("aside"),r=d("div"),c=d("ul"),a=d("li"),s=d("a"),s.innerHTML=m,y=A(),l=d("a"),l.innerHTML=H,L=A(),n=d("a"),n.innerHTML=T,this.h()},l(i){e=g(i,"ASIDE",{class:!0,"aria-label":!0});var p=_(e);r=g(p,"DIV",{class:!0});var C=_(r);c=g(C,"UL",{class:!0});var E=_(c);a=g(E,"LI",{});var v=_(a);s=g(v,"A",{href:!0,class:!0,"data-svelte-h":!0}),M(s)!=="svelte-13nowvu"&&(s.innerHTML=m),y=G(v),l=g(v,"A",{href:!0,class:!0,"data-svelte-h":!0}),M(l)!=="svelte-sn97i0"&&(l.innerHTML=H),L=G(v),n=g(v,"A",{href:!0,class:!0,"data-svelte-h":!0}),M(n)!=="svelte-m60rgp"&&(n.innerHTML=T),v.forEach(b),E.forEach(b),C.forEach(b),p.forEach(b),this.h()},h(){o(s,"href",h.home),o(s,"class","svelte-14ane6h"),f(s,"bg-gray-200",t[1]===h.home),o(l,"href",h.recipes),o(l,"class","svelte-14ane6h"),f(l,"bg-gray-200",t[1]===h.recipes),o(n,"href",h.other),o(n,"class","svelte-14ane6h"),f(n,"bg-gray-200",t[1]===h.other),o(c,"class","space-y-2 font-medium"),o(r,"class","h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800"),o(e,"class","my-aside svelte-14ane6h"),o(e,"aria-label","Sidebar"),f(e,"as-gap",t[0])},m(i,p){q(i,e,p),u(e,r),u(r,c),u(c,a),u(a,s),u(a,y),u(a,l),u(a,L),u(a,n)},p(i,[p]){p&2&&f(s,"bg-gray-200",i[1]===h.home),p&2&&f(l,"bg-gray-200",i[1]===h.recipes),p&2&&f(n,"bg-gray-200",i[1]===h.other),p&1&&f(e,"as-gap",i[0])},i:S,o:S,d(i){i&&b(e)}}}function O(t,e,r){let c,a;w(t,z,m=>r(2,a=m));let{asGap:s=!1}=e;return t.$$set=m=>{"asGap"in m&&r(0,s=m.asGap)},t.$$.update=()=>{t.$$.dirty&4&&r(1,c=x+a.route.id)},[s,c,a]}class J extends D{constructor(e){super(),k(this,e,O,B,I,{asGap:0})}}export{J as M};
