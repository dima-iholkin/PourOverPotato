import{s as B,n as C}from"../chunks/scheduler.oXSsTagU.js";import{S as R,i as $,s as h,k as y,e as b,l as I,d as c,f as _,m as x,c as v,x as D,y as m,A as E,g as f,n as W,q as O,o as S,r as k,t as M,b as P,C as A}from"../chunks/index.R4ieXPpT.js";import{e as F,f as q,h as U,i as z}from"../chunks/indexedDB.LXsa1hKK.js";import{P as H}from"../chunks/PageHeadline.I8UMbvW4.js";const L=[{name:"Rwanda Mabanza",description:"Filter roast. Washed process. Dark plum, burned cherry notes."},{name:"Colombia",description:"Washed process. Berry notes."},{name:"Yirgacheffe",description:"Natural process. Grassy notes."}],N=[{coffeeBeansId:1,recipeTarget:"17g + 270g. 5m boil.",recipeResult:"2m10s + 15s drip.",outWeight:230,rating:3.5,recipeThoughts:"Can be better.",timestamp:new Date(2023,12,20)},{coffeeBeansId:1,recipeTarget:"18g + 290g. 5m boil.",recipeResult:"2m10s + 15s drip.",outWeight:235,rating:4,recipeThoughts:"It's better.",timestamp:new Date(2023,12,23)},{coffeeBeansId:1,recipeTarget:"20g + 300g. 5m boil.",recipeResult:"2m30s + 5s drip.",outWeight:240,rating:4.5,recipeThoughts:"It's great.",timestamp:new Date(2023,12,26)},{coffeeBeansId:2,recipeTarget:"17g + 270g. 5m boil.",recipeResult:"2m10s + 15s drip.",outWeight:230,rating:3.5,recipeThoughts:"Can be better.",timestamp:new Date(2023,12,20)},{coffeeBeansId:2,recipeTarget:"18g + 290g. 5m boil.",recipeResult:"2m10s + 15s drip.",outWeight:235,rating:4,recipeThoughts:"It's better.",timestamp:new Date(2023,12,23)},{coffeeBeansId:2,recipeTarget:"20g + 300g. 5m boil.",recipeResult:"2m30s + 5s drip.",outWeight:240,rating:4.5,recipeThoughts:"It's great.",timestamp:new Date(2023,12,26)},{coffeeBeansId:3,recipeTarget:"17g + 270g. 5m boil.",recipeResult:"2m10s + 15s drip.",outWeight:230,rating:3.5,recipeThoughts:"Can be better.",timestamp:new Date(2023,12,20)},{coffeeBeansId:3,recipeTarget:"18g + 290g. 5m boil.",recipeResult:"2m10s + 15s drip.",outWeight:235,rating:4,recipeThoughts:"It's better.",timestamp:new Date(2023,12,23)},{coffeeBeansId:3,recipeTarget:"20g + 300g. 5m boil.",recipeResult:"2m30s + 5s drip.",outWeight:240,rating:4.5,recipeThoughts:"It's great.",timestamp:new Date(2023,12,26)}];var V={BASE_URL:"./",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{MODE:G}=V;async function Y(){G==="development"&&(await F()===!1&&L.forEach(async n=>{await q(n)}),await U()===!1&&N.forEach(async n=>{await z(n)}))}var j={BASE_URL:"./",MODE:"production",DEV:!1,PROD:!0,SSR:!1};function J(n){let t;return{c(){t=M("Other")},l(s){t=P(s,"Other")},m(s,r){f(s,t,r)},d(s){s&&c(t)}}}function K(n){let t,s="Initialize dev DB",r,p;return{c(){t=b("button"),t.textContent=s,this.h()},l(a){t=v(a,"BUTTON",{type:!0,class:!0,"data-svelte-h":!0}),D(t)!=="svelte-1xa30lc"&&(t.textContent=s),this.h()},h(){m(t,"type","button"),m(t,"class","init-db-button svelte-1ws3yp6")},m(a,u){f(a,t,u),r||(p=A(t,"click",n[1]),r=!0)},p:C,d(a){a&&c(t),r=!1,p()}}}function Q(n){let t,s,r,p,a,u="Credits",d,o,w="Coffee beans icons created by Freepik - Flaticon",g;s=new H({props:{$$slots:{default:[J]},$$scope:{ctx:n}}});let l=n[0]==="development"&&K(n);return{c(){t=h(),y(s.$$.fragment),r=h(),l&&l.c(),p=h(),a=b("h5"),a.textContent=u,d=h(),o=b("a"),o.textContent=w,this.h()},l(e){I("svelte-1s7v8f",document.head).forEach(c),t=_(e),x(s.$$.fragment,e),r=_(e),l&&l.l(e),p=_(e),a=v(e,"H5",{class:!0,"data-svelte-h":!0}),D(a)!=="svelte-rvnewg"&&(a.textContent=u),d=_(e),o=v(e,"A",{href:!0,style:!0,title:!0,"data-svelte-h":!0}),D(o)!=="svelte-16x14pq"&&(o.textContent=w),this.h()},h(){document.title="Other",m(a,"class","svelte-1ws3yp6"),m(o,"href","https://www.flaticon.com/free-icons/coffee-beans"),E(o,"color","cornflowerblue"),m(o,"title","coffee beans icons")},m(e,i){f(e,t,i),W(s,e,i),f(e,r,i),l&&l.m(e,i),f(e,p,i),f(e,a,i),f(e,d,i),f(e,o,i),g=!0},p(e,[i]){const T={};i&4&&(T.$$scope={dirty:i,ctx:e}),s.$set(T),e[0]==="development"&&l.p(e,i)},i(e){g||(O(s.$$.fragment,e),g=!0)},o(e){S(s.$$.fragment,e),g=!1},d(e){e&&(c(t),c(r),c(p),c(a),c(d),c(o)),k(s,e),l&&l.d(e)}}}function X(n){const{MODE:t}=j;async function s(){t==="development"&&(await Y(),setTimeout(()=>{location.reload(),alert("Dev DB filled.")},1e3))}return[t,s]}class ae extends R{constructor(t){super(),$(this,t,X,Q,B,{})}}export{ae as component};
