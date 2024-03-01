import{n as H,l as It,k as vt,B as ct,s as j,a as et,u as st,g as nt,b as at,h as bt,o as yt,j as xt,C as Tt,c as rt,d as St,e as Ut,r as Mt}from"../chunks/scheduler.FewvdMMF.js";import{K as qt,L as Et,M as Bt,N as Dt,S as z,i as F,e as k,s as B,t as Ot,c as w,a as O,z as R,f as D,b as Lt,d as _,x as h,g as q,h as y,A as Y,j as Nt,q as S,o as U,k as V,m as A,n as P,r as G,u as lt,p as ot,O as Vt,P as At,H as E,y as Pt,C as ut}from"../chunks/index.Czz-Se56.js";import{e as ft,u as Gt,f as Ht}from"../chunks/each.WAMKkCCB.js";import{b as Rt}from"../chunks/paths.JiA9o6-n.js";import{p as W}from"../chunks/stores.xUCNuVwl.js";import{r as C}from"../chunks/routes.oDD19Cll.js";import{g as tt}from"../chunks/entry.odFJkewz.js";import{M as jt,a as dt}from"../chunks/Modal.Bg1Fh3fb.js";import{v as zt,i as Ft}from"../chunks/indexedDB.DSM7SfQo.js";function Kt(a,t,s,e){if(!t)return H;const n=a.getBoundingClientRect();if(t.left===n.left&&t.right===n.right&&t.top===n.top&&t.bottom===n.bottom)return H;const{delay:r=0,duration:l=300,easing:o=It,start:i=qt()+r,end:c=i+l,tick:g=H,css:$}=s(a,{from:t,to:n},e);let d=!0,v=!1,f;function p(){$&&(f=Bt(a,0,1,l,r,o,$)),r||(v=!0)}function m(){$&&Dt(a,f),d=!1}return Et(b=>{if(!v&&b>=i&&(v=!0),v&&b>=c&&(g(1,0),m()),!d)return!1;if(v){const M=b-i,N=0+1*o(M/l);g(N,1-N)}return!0}),p(),g(0,1),m}function Zt(a){const t=getComputedStyle(a);if(t.position!=="absolute"&&t.position!=="fixed"){const{width:s,height:e}=t,n=a.getBoundingClientRect();a.style.position="absolute",a.style.width=s,a.style.height=e,kt(a,n)}}function kt(a,t){const s=a.getBoundingClientRect();if(t.left!==s.left||t.top!==s.top){const e=getComputedStyle(a),n=e.transform==="none"?"":e.transform;a.style.transform=`${n} translate(${t.left-s.left}px, ${t.top-s.top}px)`}}function wt(a){const t=a-1;return t*t*t+1}function Yt(a,{from:t,to:s},e={}){const n=getComputedStyle(a),r=n.transform==="none"?"":n.transform,[l,o]=n.transformOrigin.split(" ").map(parseFloat),i=t.left+t.width*l/s.width-(s.left+l),c=t.top+t.height*o/s.height-(s.top+o),{delay:g=0,duration:$=v=>Math.sqrt(v)*120,easing:d=wt}=e;return{delay:g,duration:vt($)?$(Math.sqrt(i*i+c*c)):$,easing:d,css:(v,f)=>{const p=f*i,m=f*c,b=v+f*t.width/s.width,M=v+f*t.height/s.height;return`transform: ${r} translate(${p}px, ${m}px) scale(${b}, ${M});`}}}function mt(a,{delay:t=0,duration:s=400,easing:e=wt,x:n=0,y:r=0,opacity:l=0}={}){const o=getComputedStyle(a),i=+o.opacity,c=o.transform==="none"?"":o.transform,g=i*(1-l),[$,d]=ct(n),[v,f]=ct(r);return{delay:t,duration:s,easing:e,css:(p,m)=>`
			transform: ${c} translate(${(1-p)*$}${d}, ${(1-p)*v}${f});
			opacity: ${i-g*m}`}}const Jt=a=>({}),pt=a=>({});function Qt(a){let t,s,e='<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"></path></svg> <span class="sr-only">Check icon</span>',n,r,l,o,i,c,g='<span class="sr-only">Close</span> <svg class="w-3 h-3" fill="none" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>',$,d,v;const f=a[2].button,p=et(f,a,a[1],pt);return{c(){t=k("div"),s=k("div"),s.innerHTML=e,n=B(),r=k("div"),l=Ot(a[0]),o=B(),p&&p.c(),i=B(),c=k("button"),c.innerHTML=g,this.h()},l(m){t=w(m,"DIV",{class:!0,role:!0});var b=O(t);s=w(b,"DIV",{class:!0,"data-svelte-h":!0}),R(s)!=="svelte-1f6f1j5"&&(s.innerHTML=e),n=D(b),r=w(b,"DIV",{id:!0,class:!0});var M=O(r);l=Lt(M,a[0]),M.forEach(_),o=D(b),p&&p.l(b),i=D(b),c=w(b,"BUTTON",{class:!0,"data-dismiss-target":!0,type:!0,"aria-label":!0,"data-svelte-h":!0}),R(c)!=="svelte-hr0026"&&(c.innerHTML=g),b.forEach(_),this.h()},h(){h(s,"class","inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200"),h(r,"id","toast-content"),h(r,"class","text-base font-normal svelte-xg2awo"),h(c,"class","my-close-button ms-auto -mx-1.5 -my-1.5 bg-gray-200 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-300 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 svelte-xg2awo"),h(c,"data-dismiss-target","#toast-success"),h(c,"type","button"),h(c,"aria-label","Close"),h(t,"class","my-toast flex items-center max-w-xl p-4 bg-gray-100 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 svelte-xg2awo"),h(t,"role","alert")},m(m,b){q(m,t,b),y(t,s),y(t,n),y(t,r),y(r,l),y(t,o),p&&p.m(t,null),y(t,i),y(t,c),$=!0,d||(v=Y(c,"click",a[3]),d=!0)},p(m,[b]){(!$||b&1)&&Nt(l,m[0]),p&&p.p&&(!$||b&2)&&st(p,f,m,m[1],$?at(f,m[1],b,Jt):nt(m[1]),pt)},i(m){$||(S(p,m),$=!0)},o(m){U(p,m),$=!1},d(m){m&&_(t),p&&p.d(m),d=!1,v()}}}function Wt(a,t,s){let{$$slots:e={},$$scope:n}=t,{message:r}=t;function l(o){bt.call(this,a,o)}return a.$$set=o=>{"message"in o&&s(0,r=o.message),"$$scope"in o&&s(1,n=o.$$scope)},[r,n,e,l]}class Ct extends z{constructor(t){super(),F(this,t,Wt,Qt,j,{message:0})}}function Xt(a){let t,s="Undo",e,n;return{c(){t=k("button"),t.textContent=s,this.h()},l(r){t=w(r,"BUTTON",{slot:!0,type:!0,"aria-label":!0,class:!0,"data-svelte-h":!0}),R(t)!=="svelte-j5y622"&&(t.textContent=s),this.h()},h(){h(t,"slot","button"),h(t,"type","button"),h(t,"aria-label","Close"),h(t,"class","svelte-piy52p")},m(r,l){q(r,t,l),e||(n=Y(t,"click",function(){vt(a[0])&&a[0].apply(this,arguments)}),e=!0)},p(r,l){a=r},d(r){r&&_(t),e=!1,n()}}}function te(a){let t,s;return t=new Ct({props:{message:a[1],$$slots:{button:[Xt]},$$scope:{ctx:a}}}),t.$on("click",a[2]),{c(){V(t.$$.fragment)},l(e){A(t.$$.fragment,e)},m(e,n){P(t,e,n),s=!0},p(e,[n]){const r={};n&2&&(r.message=e[1]),n&9&&(r.$$scope={dirty:n,ctx:e}),t.$set(r)},i(e){s||(S(t.$$.fragment,e),s=!0)},o(e){U(t.$$.fragment,e),s=!1},d(e){G(t,e)}}}function ee(a,t,s){let{onClickUndo:e}=t,{message:n}=t;function r(l){bt.call(this,a,l)}return a.$$set=l=>{"onClickUndo"in l&&s(0,e=l.onClickUndo),"message"in l&&s(1,n=l.message)},[e,n,r]}class se extends z{constructor(t){super(),F(this,t,ee,te,j,{onClickUndo:0,message:1})}}function ht(a,t,s){const e=a.slice();return e[6]=t[s],e}function ne(a){let t,s;function e(){return a[4](a[6])}function n(){return a[5](a[6])}return t=new se({props:{message:a[6].message,onClickUndo:e}}),t.$on("click",n),{c(){V(t.$$.fragment)},l(r){A(t.$$.fragment,r)},m(r,l){P(t,r,l),s=!0},p(r,l){a=r;const o={};l&1&&(o.message=a[6].message),l&1&&(o.onClickUndo=e),t.$set(o)},i(r){s||(S(t.$$.fragment,r),s=!0)},o(r){U(t.$$.fragment,r),s=!1},d(r){G(t,r)}}}function ae(a){let t,s;function e(){return a[3](a[6])}return t=new Ct({props:{message:a[6].message}}),t.$on("click",e),{c(){V(t.$$.fragment)},l(n){A(t.$$.fragment,n)},m(n,r){P(t,n,r),s=!0},p(n,r){a=n;const l={};r&1&&(l.message=a[6].message),t.$set(l)},i(n){s||(S(t.$$.fragment,n),s=!0)},o(n){U(t.$$.fragment,n),s=!1},d(n){G(t,n)}}}function gt(a,t){let s,e,n,r,l,o,i,c=H,g;const $=[ae,ne],d=[];function v(f,p){return f[6].onClickUndo===void 0?0:1}return e=v(t),n=d[e]=$[e](t),{key:a,first:null,c(){s=k("div"),n.c(),r=B(),this.h()},l(f){s=w(f,"DIV",{class:!0});var p=O(s);n.l(p),r=D(p),p.forEach(_),this.h()},h(){h(s,"class","toast-wrapper"),this.first=s},m(f,p){q(f,s,p),d[e].m(s,null),y(s,r),g=!0},p(f,p){t=f;let m=e;e=v(t),e===m?d[e].p(t,p):(lt(),U(d[m],1,1,()=>{d[m]=null}),ot(),n=d[e],n?n.p(t,p):(n=d[e]=$[e](t),n.c()),S(n,1),n.m(s,r))},r(){i=s.getBoundingClientRect()},f(){Zt(s),c(),kt(s,i)},a(){c(),c=Kt(s,i,Yt,{})},i(f){g||(S(n),f&&xt(()=>{g&&(o&&o.end(1),l=Vt(s,mt,{y:100}),l.start())}),g=!0)},o(f){U(n),l&&l.invalidate(),f&&(o=At(s,mt,{x:100})),g=!1},d(f){f&&_(s),d[e].d(),f&&o&&o.end()}}}function re(a){let t,s=[],e=new Map,n,r=ft(a[0]);const l=o=>o[6].timestamp;for(let o=0;o<r.length;o+=1){let i=ht(a,r,o),c=l(i);e.set(c,s[o]=gt(c,i))}return{c(){t=k("div");for(let o=0;o<s.length;o+=1)s[o].c();this.h()},l(o){t=w(o,"DIV",{id:!0,class:!0});var i=O(t);for(let c=0;c<s.length;c+=1)s[c].l(i);i.forEach(_),this.h()},h(){h(t,"id","toast-provider"),h(t,"class","svelte-25lye2")},m(o,i){q(o,t,i);for(let c=0;c<s.length;c+=1)s[c]&&s[c].m(t,null);n=!0},p(o,[i]){if(i&7){r=ft(o[0]),lt();for(let c=0;c<s.length;c+=1)s[c].r();s=Gt(s,i,l,1,o,r,e,t,Ht,gt,null,ht);for(let c=0;c<s.length;c+=1)s[c].a();ot()}},i(o){if(!n){for(let i=0;i<r.length;i+=1)S(s[i]);n=!0}},o(o){for(let i=0;i<s.length;i+=1)U(s[i]);n=!1},d(o){o&&_(t);for(let i=0;i<s.length;i+=1)s[i].d()}}}function le(a,t,s){let e=[];yt(()=>{document.addEventListener("addToast",c=>{const g=Date.now(),$={message:c.detail.message,timeout:c.detail.timeout,timestamp:g,onClickUndo:c.detail.onClickUndo,onUndoIgnored:c.detail.onUndoIgnored};e.push($),s(0,e),setTimeout(()=>{r($)},$.timeout)})});function n(c){c.onUndoIgnored&&(c.onUndoIgnored=void 0),r(c),c.onClickUndo&&c.onClickUndo()}function r(c){c.onUndoIgnored&&c.onUndoIgnored();const g=e.findIndex($=>$.timestamp===c.timestamp);g!==-1&&(e.splice(g,1),s(0,e))}return[e,n,r,c=>r(c),c=>n(c),c=>r(c)]}class oe extends z{constructor(t){super(),F(this,t,le,re,j,{})}}const ie=""+new URL("../assets/coffee-beans-icon.fIzMs2hj.png",import.meta.url).href;function ce(a){let t,s="dashboard";return{c(){t=k("span"),t.textContent=s,this.h()},l(e){t=w(e,"SPAN",{class:!0,"data-svelte-h":!0}),R(t)!=="svelte-uhkmif"&&(t.textContent=s),this.h()},h(){h(t,"class","material-icons")},m(e,n){q(e,t,n)},p:H,i:H,o:H,d(e){e&&_(t)}}}class ue extends z{constructor(t){super(),F(this,t,null,ce,j,{})}}function fe(a){let t,s,e,n,r='<span class="material-icons recipes-icon svelte-d12lmw" style="padding: 2px 0;">content_copy</span> <span class="svelte-d12lmw">Recipes</span>',l,o,i,c,g,$,d,v="Coffee beans",f,p,m,b,M,N,K="Other",L;return b=new ue({}),{c(){t=k("div"),s=k("div"),e=k("a"),n=k("button"),n.innerHTML=r,l=B(),o=k("a"),i=k("button"),c=k("img"),$=B(),d=k("span"),d.textContent=v,f=B(),p=k("a"),m=k("button"),V(b.$$.fragment),M=B(),N=k("span"),N.textContent=K,this.h()},l(T){t=w(T,"DIV",{class:!0});var I=O(t);s=w(I,"DIV",{class:!0});var u=O(s);e=w(u,"A",{href:!0});var x=O(e);n=w(x,"BUTTON",{type:!0,class:!0,"data-svelte-h":!0}),R(n)!=="svelte-1olslb5"&&(n.innerHTML=r),x.forEach(_),l=D(u),o=w(u,"A",{href:!0});var Z=O(o);i=w(Z,"BUTTON",{type:!0,class:!0});var J=O(i);c=w(J,"IMG",{src:!0,alt:!0,class:!0}),$=D(J),d=w(J,"SPAN",{class:!0,"data-svelte-h":!0}),R(d)!=="svelte-yc6fjb"&&(d.textContent=v),J.forEach(_),Z.forEach(_),f=D(u),p=w(u,"A",{href:!0});var it=O(p);m=w(it,"BUTTON",{type:!0,class:!0});var Q=O(m);A(b.$$.fragment,Q),M=D(Q),N=w(Q,"SPAN",{class:!0,"data-svelte-h":!0}),R(N)!=="svelte-700qdn"&&(N.textContent=K),Q.forEach(_),it.forEach(_),u.forEach(_),I.forEach(_),this.h()},h(){h(n,"type","button"),h(n,"class","svelte-d12lmw"),E(n,"active",a[2]===C.recipes),h(e,"href",C.recipes),Tt(c.src,g=ie)||h(c,"src",g),h(c,"alt","A coffee beans icon"),h(c,"class","svelte-d12lmw"),E(c,"active-img",a[2]===C.home),h(d,"class","svelte-d12lmw"),E(d,"active",a[2]===C.home),h(i,"type","button"),h(i,"class","svelte-d12lmw"),E(i,"active",a[2]===C.home),h(o,"href",C.home),h(N,"class","svelte-d12lmw"),E(N,"active",a[2]===C.other),h(m,"type","button"),h(m,"class","svelte-d12lmw"),E(m,"active",a[2]===C.other),h(p,"href",C.other),h(s,"class","grid h-full max-w-lg grid-cols-3 mx-auto font-medium"),h(t,"class","bottom-nav svelte-d12lmw"),E(t,"as-gap",a[0]),E(t,"bottom-nav-static",a[1].url.pathname===C.addRecipe()||a[1].url.pathname.substring(0,a[1].url.pathname.lastIndexOf("/")+1)+1===C.recipeItem(1))},m(T,I){q(T,t,I),y(t,s),y(s,e),y(e,n),y(s,l),y(s,o),y(o,i),y(i,c),y(i,$),y(i,d),y(s,f),y(s,p),y(p,m),P(b,m,null),y(m,M),y(m,N),L=!0},p(T,[I]){(!L||I&4)&&E(n,"active",T[2]===C.recipes),(!L||I&4)&&E(c,"active-img",T[2]===C.home),(!L||I&4)&&E(d,"active",T[2]===C.home),(!L||I&4)&&E(i,"active",T[2]===C.home),(!L||I&4)&&E(N,"active",T[2]===C.other),(!L||I&4)&&E(m,"active",T[2]===C.other),(!L||I&1)&&E(t,"as-gap",T[0]),(!L||I&2)&&E(t,"bottom-nav-static",T[1].url.pathname===C.addRecipe()||T[1].url.pathname.substring(0,T[1].url.pathname.lastIndexOf("/")+1)+1===C.recipeItem(1))},i(T){L||(S(b.$$.fragment,T),L=!0)},o(T){U(b.$$.fragment,T),L=!1},d(T){T&&_(t),G(b)}}}function de(a,t,s){let e,n;rt(a,W,l=>s(1,n=l));let{asGap:r=!1}=t;return a.$$set=l=>{"asGap"in l&&s(0,r=l.asGap)},a.$$.update=()=>{a.$$.dirty&2&&s(2,e=Rt+n.route.id)},[r,n,e]}class _t extends z{constructor(t){super(),F(this,t,de,fe,j,{asGap:0})}}function me(a){let t,s="arrow_back";return{c(){t=k("span"),t.textContent=s,this.h()},l(e){t=w(e,"SPAN",{class:!0,"data-svelte-h":!0}),R(t)!=="svelte-12vjxfs"&&(t.textContent=s),this.h()},h(){h(t,"class","material-icons md-24")},m(e,n){q(e,t,n)},p:H,i:H,o:H,d(e){e&&_(t)}}}class pe extends z{constructor(t){super(),F(this,t,null,me,j,{})}}function he(a){let t,s="favorite_border";return{c(){t=k("span"),t.textContent=s,this.h()},l(e){t=w(e,"SPAN",{class:!0,"data-svelte-h":!0}),R(t)!=="svelte-teydos"&&(t.textContent=s),this.h()},h(){h(t,"class","material-icons md-24 svelte-1c6h8fp")},m(e,n){q(e,t,n)},p:H,i:H,o:H,d(e){e&&_(t)}}}class ge extends z{constructor(t){super(),F(this,t,null,he,j,{})}}function _e(a){let t,s;return t=new ge({}),{c(){V(t.$$.fragment)},l(e){A(t.$$.fragment,e)},m(e,n){P(t,e,n),s=!0},p:H,i(e){s||(S(t.$$.fragment,e),s=!0)},o(e){U(t.$$.fragment,e),s=!1},d(e){G(t,e)}}}function $e(a){let t,s,e,n,r;return s=new pe({}),{c(){t=k("button"),V(s.$$.fragment),this.h()},l(l){t=w(l,"BUTTON",{class:!0});var o=O(t);A(s.$$.fragment,o),o.forEach(_),this.h()},h(){h(t,"class","vertical-center-children svelte-6q0yth")},m(l,o){q(l,t,o),P(s,t,null),e=!0,n||(r=Y(t,"click",a[3]),n=!0)},p:H,i(l){e||(S(s.$$.fragment,l),e=!0)},o(l){U(s.$$.fragment,l),e=!1},d(l){l&&_(t),G(s),n=!1,r()}}}function ve(a){let t,s,e,n,r,l,o,i,c='<div class="logo-container svelte-6q0yth"><span class="text-2xl font-semibold whitespace-nowrap dark:text-white svelte-6q0yth">PourOverPotato</span> <p class="sublogo svelte-6q0yth">Save your best recipes for later use</p></div>',g;const $=[$e,_e],d=[];function v(f,p){return f[1]!==C.home?0:1}return r=v(a),l=d[r]=$[r](a),{c(){t=k("nav"),s=k("div"),e=k("div"),n=k("div"),l.c(),o=B(),i=k("a"),i.innerHTML=c,this.h()},l(f){t=w(f,"NAV",{class:!0});var p=O(t);s=w(p,"DIV",{class:!0});var m=O(s);e=w(m,"DIV",{class:!0});var b=O(e);n=w(b,"DIV",{class:!0});var M=O(n);l.l(M),M.forEach(_),o=D(b),i=w(b,"A",{href:!0,"data-svelte-h":!0}),R(i)!=="svelte-1wmgnn8"&&(i.innerHTML=c),b.forEach(_),m.forEach(_),p.forEach(_),this.h()},h(){h(n,"class","icon-button vertical-center-children svelte-6q0yth"),h(i,"href",C.home),h(e,"class","left-nav-side vertical-center-children svelte-6q0yth"),h(s,"class","flex flex-wrap items-center justify-between mx-auto p-4"),h(t,"class","svelte-6q0yth"),E(t,"as-gap",a[0]),E(t,"nav-static",a[2].url.pathname===C.addRecipe()||a[2].url.pathname.substring(0,a[2].url.pathname.lastIndexOf("/")+1)+1===C.recipeItem(1))},m(f,p){q(f,t,p),y(t,s),y(s,e),y(e,n),d[r].m(n,null),y(e,o),y(e,i),g=!0},p(f,[p]){let m=r;r=v(f),r===m?d[r].p(f,p):(lt(),U(d[m],1,1,()=>{d[m]=null}),ot(),l=d[r],l?l.p(f,p):(l=d[r]=$[r](f),l.c()),S(l,1),l.m(n,null)),(!g||p&1)&&E(t,"as-gap",f[0]),(!g||p&4)&&E(t,"nav-static",f[2].url.pathname===C.addRecipe()||f[2].url.pathname.substring(0,f[2].url.pathname.lastIndexOf("/")+1)+1===C.recipeItem(1))},i(f){g||(S(l),g=!0)},o(f){U(l),g=!1},d(f){f&&_(t),d[r].d()}}}function be(a,t,s){let e;rt(a,W,o=>s(2,e=o));let{asGap:n=!1}=t,r=C.home;W.subscribe(o=>{s(1,r=o.url.pathname)});function l(){history.length===0?tt(C.home,{replaceState:!0}):history.back()}return a.$$set=o=>{"asGap"in o&&s(0,n=o.asGap)},[n,r,e,l]}class $t extends z{constructor(t){super(),F(this,t,be,ve,j,{asGap:0})}}function ye(a){let t,s=`<p class="svelte-1qp1gq4">Please try turning persistent storage ON in your browser, it will make your data relatively safe from a browser
      eviction.</p>`,e,n,r,l="Enable persistent storage",o,i,c="Cancel",g,$;return{c(){t=k("div"),t.innerHTML=s,e=B(),n=k("div"),r=k("button"),r.textContent=l,o=B(),i=k("button"),i.textContent=c,this.h()},l(d){t=w(d,"DIV",{class:!0,"data-svelte-h":!0}),R(t)!=="svelte-1ekvqww"&&(t.innerHTML=s),e=D(d),n=w(d,"DIV",{class:!0});var v=O(n);r=w(v,"BUTTON",{class:!0,type:!0,"data-svelte-h":!0}),R(r)!=="svelte-14smfyg"&&(r.textContent=l),o=D(v),i=w(v,"BUTTON",{class:!0,type:!0,"data-svelte-h":!0}),R(i)!=="svelte-s3q1kw"&&(i.textContent=c),v.forEach(_),this.h()},h(){h(t,"class","text-container svelte-1qp1gq4"),h(r,"class","enable svelte-1qp1gq4"),h(r,"type","button"),h(i,"class","cancel svelte-1qp1gq4"),h(i,"type","button"),h(n,"class","buttons-container svelte-1qp1gq4")},m(d,v){q(d,t,v),q(d,e,v),q(d,n,v),y(n,r),y(n,o),y(n,i),g||($=[Y(r,"click",a[1]),Y(i,"click",a[2])],g=!0)},p:H,d(d){d&&(_(t),_(e),_(n)),g=!1,Mt($)}}}function ke(a){let t,s,e;function n(l){a[3](l)}let r={title:"Persistent storage not enabled",$$slots:{default:[ye]},$$scope:{ctx:a}};return a[0]!==void 0&&(r.setState=a[0]),t=new jt({props:r}),St.push(()=>Pt(t,"setState",n)),{c(){V(t.$$.fragment)},l(l){A(t.$$.fragment,l)},m(l,o){P(t,l,o),e=!0},p(l,[o]){const i={};o&33&&(i.$$scope={dirty:o,ctx:l}),!s&&o&1&&(s=!0,i.setState=l[0],Ut(()=>s=!1)),t.$set(i)},i(l){e||(S(t.$$.fragment,l),e=!0)},o(l){U(t.$$.fragment,l),e=!1},d(l){G(t,l)}}}const X="persistentStorageCheckDate";function we(a,t,s){let e;rt(a,W,i=>s(4,e=i));let n;yt(async()=>{await navigator.storage.persisted()===!1&&(localStorage.getItem(X)===null||localStorage.getItem(X)!==new Date().toDateString())&&await zt()&&(localStorage.setItem(X,new Date().toDateString()),n("open"))});async function r(){if(await navigator.storage.persist()==!1)alert("Sorry, your browser refused to enable persistent storage. It means your data is still at risk of being evicted at any moment by the browser. Try using Firefox browser, it seems to be the only browser to allow enabling persistent storage always.");else{n("closed"),Ft("Persistent storage enabled.");const c=e.url.pathname;tt(C.home).then(()=>tt(c))}}const l=()=>n("closed");function o(i){n=i,s(0,n)}return[n,r,l,o]}class Ce extends z{constructor(t){super(),F(this,t,we,ke,j,{})}}function Ie(a){let t,s,e,n,r,l,o,i,c,g,$,d,v,f,p,m,b,M,N,K,L;t=new $t({}),e=new $t({props:{asGap:!0}}),r=new dt({}),i=new dt({props:{asGap:!0}});const T=a[1].default,I=et(T,a,a[0],null);return f=new _t({props:{asGap:!0}}),m=new _t({}),M=new oe({}),K=new Ce({}),{c(){V(t.$$.fragment),s=B(),V(e.$$.fragment),n=B(),V(r.$$.fragment),l=B(),o=k("div"),V(i.$$.fragment),c=B(),g=k("div"),I&&I.c(),$=B(),d=k("div"),v=B(),V(f.$$.fragment),p=B(),V(m.$$.fragment),b=B(),V(M.$$.fragment),N=B(),V(K.$$.fragment),this.h()},l(u){A(t.$$.fragment,u),s=D(u),A(e.$$.fragment,u),n=D(u),A(r.$$.fragment,u),l=D(u),o=w(u,"DIV",{id:!0,style:!0});var x=O(o);A(i.$$.fragment,x),c=D(x),g=w(x,"DIV",{class:!0});var Z=O(g);I&&I.l(Z),$=D(Z),d=w(Z,"DIV",{class:!0}),O(d).forEach(_),Z.forEach(_),x.forEach(_),v=D(u),A(f.$$.fragment,u),p=D(u),A(m.$$.fragment,u),b=D(u),A(M.$$.fragment,u),N=D(u),A(K.$$.fragment,u),this.h()},h(){h(d,"class","bottom-gap svelte-1ruqigr"),h(g,"class","page-container svelte-1ruqigr"),h(o,"id","content"),ut(o,"display","flex"),ut(o,"flex-direction","row")},m(u,x){P(t,u,x),q(u,s,x),P(e,u,x),q(u,n,x),P(r,u,x),q(u,l,x),q(u,o,x),P(i,o,null),y(o,c),y(o,g),I&&I.m(g,null),y(g,$),y(g,d),q(u,v,x),P(f,u,x),q(u,p,x),P(m,u,x),q(u,b,x),P(M,u,x),q(u,N,x),P(K,u,x),L=!0},p(u,[x]){I&&I.p&&(!L||x&1)&&st(I,T,u,u[0],L?at(T,u[0],x,null):nt(u[0]),null)},i(u){L||(S(t.$$.fragment,u),S(e.$$.fragment,u),S(r.$$.fragment,u),S(i.$$.fragment,u),S(I,u),S(f.$$.fragment,u),S(m.$$.fragment,u),S(M.$$.fragment,u),S(K.$$.fragment,u),L=!0)},o(u){U(t.$$.fragment,u),U(e.$$.fragment,u),U(r.$$.fragment,u),U(i.$$.fragment,u),U(I,u),U(f.$$.fragment,u),U(m.$$.fragment,u),U(M.$$.fragment,u),U(K.$$.fragment,u),L=!1},d(u){u&&(_(s),_(n),_(l),_(o),_(v),_(p),_(b),_(N)),G(t,u),G(e,u),G(r,u),G(i),I&&I.d(u),G(f,u),G(m,u),G(M,u),G(K,u)}}}function xe(a,t,s){let{$$slots:e={},$$scope:n}=t;return a.$$set=r=>{"$$scope"in r&&s(0,n=r.$$scope)},[n,e]}class Te extends z{constructor(t){super(),F(this,t,xe,Ie,j,{})}}function Se(a){let t;const s=a[0].default,e=et(s,a,a[1],null);return{c(){e&&e.c()},l(n){e&&e.l(n)},m(n,r){e&&e.m(n,r),t=!0},p(n,r){e&&e.p&&(!t||r&2)&&st(e,s,n,n[1],t?at(s,n[1],r,null):nt(n[1]),null)},i(n){t||(S(e,n),t=!0)},o(n){U(e,n),t=!1},d(n){e&&e.d(n)}}}function Ue(a){let t,s;return t=new Te({props:{$$slots:{default:[Se]},$$scope:{ctx:a}}}),{c(){V(t.$$.fragment)},l(e){A(t.$$.fragment,e)},m(e,n){P(t,e,n),s=!0},p(e,[n]){const r={};n&2&&(r.$$scope={dirty:n,ctx:e}),t.$set(r)},i(e){s||(S(t.$$.fragment,e),s=!0)},o(e){U(t.$$.fragment,e),s=!1},d(e){G(t,e)}}}function Me(a,t,s){let{$$slots:e={},$$scope:n}=t;return a.$$set=r=>{"$$scope"in r&&s(1,n=r.$$scope)},[e,n]}class Pe extends z{constructor(t){super(),F(this,t,Me,Ue,j,{})}}export{Pe as component};
