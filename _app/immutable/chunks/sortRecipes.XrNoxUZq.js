import{s as ce,o as pe}from"./scheduler.oXSsTagU.js";import{S as ue,i as me,k as _e,m as he,n as de,q as ve,o as ge,r as be,e as b,t as f,s as E,c as k,a as q,b as c,d as o,f as R,y as B,g as _,h as n,j as C}from"./index.R4ieXPpT.js";import{d as ke}from"./indexedDB.LXsa1hKK.js";import{n as J}from"./naming.kUvCv0xb.js";import{C as qe}from"./Card.KbaBnTJX.js";function oe(r){let t,i=(r[2]?r[2].name:"loading...")+"",s;return{c(){t=b("h5"),s=f(i),this.h()},l(l){t=k(l,"H5",{class:!0});var p=q(t);s=c(p,i),p.forEach(o),this.h()},h(){B(t,"class","svelte-q0k8bd")},m(l,p){_(l,t,p),n(t,s)},p(l,p){p&4&&i!==(i=(l[2]?l[2].name:"loading...")+"")&&C(s,i)},d(l){l&&o(t)}}}function Be(r){let t,i,s=r[0].timestamp.toLocaleString(void 0,fe)+"",l,p,m,P=r[0].rating+"",W,K,y,T,d,ae=J.recipe.recipeTarget+"",O,Q,S=r[0].recipeTarget+"",L,j,v,le=J.recipe.recipeResult+"",U,X,w=r[0].recipeResult+"",H,M,h,ie=J.recipe.outWeight+"",Y,Z,$=r[0].outWeight+"",N,x,V,g,re=J.recipe.recipeThoughts+"",ee,te,D=r[0].recipeThoughts+"",z,u=r[1]&&oe(r);return{c(){t=b("div"),i=b("p"),l=f(s),p=E(),m=b("p"),W=f(P),K=f("/5"),y=E(),u&&u.c(),T=E(),d=b("p"),O=f(ae),Q=f(": "),L=f(S),j=E(),v=b("p"),U=f(le),X=f(": "),H=f(w),M=E(),h=b("p"),Y=f(ie),Z=f(": "),N=f($),x=f("g"),V=E(),g=b("p"),ee=f(re),te=f(": "),z=f(D),this.h()},l(e){t=k(e,"DIV",{class:!0});var a=q(t);i=k(a,"P",{class:!0});var ne=q(i);l=c(ne,s),ne.forEach(o),p=R(a),m=k(a,"P",{class:!0});var se=q(m);W=c(se,P),K=c(se,"/5"),se.forEach(o),a.forEach(o),y=R(e),u&&u.l(e),T=R(e),d=k(e,"P",{class:!0});var A=q(d);O=c(A,ae),Q=c(A,": "),L=c(A,S),A.forEach(o),j=R(e),v=k(e,"P",{class:!0});var F=q(v);U=c(F,le),X=c(F,": "),H=c(F,w),F.forEach(o),M=R(e),h=k(e,"P",{class:!0});var I=q(h);Y=c(I,ie),Z=c(I,": "),N=c(I,$),x=c(I,"g"),I.forEach(o),V=R(e),g=k(e,"P",{class:!0});var G=q(g);ee=c(G,re),te=c(G,": "),z=c(G,D),G.forEach(o),this.h()},h(){B(i,"class","timestamp svelte-q0k8bd"),B(m,"class","svelte-q0k8bd"),B(t,"class","card-header svelte-q0k8bd"),B(d,"class","svelte-q0k8bd"),B(v,"class","svelte-q0k8bd"),B(h,"class","svelte-q0k8bd"),B(g,"class","svelte-q0k8bd")},m(e,a){_(e,t,a),n(t,i),n(i,l),n(t,p),n(t,m),n(m,W),n(m,K),_(e,y,a),u&&u.m(e,a),_(e,T,a),_(e,d,a),n(d,O),n(d,Q),n(d,L),_(e,j,a),_(e,v,a),n(v,U),n(v,X),n(v,H),_(e,M,a),_(e,h,a),n(h,Y),n(h,Z),n(h,N),n(h,x),_(e,V,a),_(e,g,a),n(g,ee),n(g,te),n(g,z)},p(e,a){a&1&&s!==(s=e[0].timestamp.toLocaleString(void 0,fe)+"")&&C(l,s),a&1&&P!==(P=e[0].rating+"")&&C(W,P),e[1]?u?u.p(e,a):(u=oe(e),u.c(),u.m(T.parentNode,T)):u&&(u.d(1),u=null),a&1&&S!==(S=e[0].recipeTarget+"")&&C(L,S),a&1&&w!==(w=e[0].recipeResult+"")&&C(H,w),a&1&&$!==($=e[0].outWeight+"")&&C(N,$),a&1&&D!==(D=e[0].recipeThoughts+"")&&C(z,D)},d(e){e&&(o(t),o(y),o(T),o(d),o(j),o(v),o(M),o(h),o(V),o(g)),u&&u.d(e)}}}function Ce(r){let t,i;return t=new qe({props:{$$slots:{default:[Be]},$$scope:{ctx:r}}}),{c(){_e(t.$$.fragment)},l(s){he(t.$$.fragment,s)},m(s,l){de(t,s,l),i=!0},p(s,[l]){const p={};l&15&&(p.$$scope={dirty:l,ctx:s}),t.$set(p)},i(s){i||(ve(t.$$.fragment,s),i=!0)},o(s){ge(t.$$.fragment,s),i=!1},d(s){be(t,s)}}}const fe={timeStyle:"short",dateStyle:"long"};function Te(r,t,i){let{recipe:s}=t,{showCoffeeBeans:l=!1}=t,p;return pe(()=>{l===!0&&ke(s.coffeeBeansId).then(m=>{i(2,p=m)})}),r.$$set=m=>{"recipe"in m&&i(0,s=m.recipe),"showCoffeeBeans"in m&&i(1,l=m.showCoffeeBeans)},[s,l,p]}class $e extends ue{constructor(t){super(),me(this,t,Te,Ce,ce,{recipe:0,showCoffeeBeans:1})}}function De(r,t){return t.rating-r.rating}function Ie(r,t){return t.timestamp.getTime()-r.timestamp.getTime()}export{$e as R,De as a,Ie as s};