import{s as T,n as C}from"../chunks/scheduler.ZvbRK0ck.js";import{S as R,i as $,s as h,m as I,e as b,n as y,d as c,f as _,o as x,c as v,w as D,x as m,D as E,g as p,p as O,l as W,k as S,r as k,t as P,b as M,B as F}from"../chunks/index.D4zfOep-.js";import{h as q,i as A,j as U,f as z,P as H}from"../chunks/PageHeadline.zjx-BUZ1.js";const L=[{name:"Rwanda Mabanza",description:"Filter roast. Washed process. Dark plum, burned cherry notes."},{name:"Colombia",description:"Washed process. Berry notes."},{name:"Yirgacheffe",description:"Natural process. Grassy notes."}],N=[{coffeeBeansId:1,recipeTarget:"17g + 270g. 5m boil.",recipeResult:"2m10s + 15s drip.",outWeight:230,rating:3.5,recipeThoughts:"Can be better.",timestamp:new Date(2023,12,20)},{coffeeBeansId:1,recipeTarget:"18g + 290g. 5m boil.",recipeResult:"2m10s + 15s drip.",outWeight:235,rating:4,recipeThoughts:"It's better.",timestamp:new Date(2023,12,23)},{coffeeBeansId:1,recipeTarget:"20g + 300g. 5m boil.",recipeResult:"2m30s + 5s drip.",outWeight:240,rating:4.5,recipeThoughts:"It's great.",timestamp:new Date(2023,12,26)},{coffeeBeansId:2,recipeTarget:"17g + 270g. 5m boil.",recipeResult:"2m10s + 15s drip.",outWeight:230,rating:3.5,recipeThoughts:"Can be better.",timestamp:new Date(2023,12,20)},{coffeeBeansId:2,recipeTarget:"18g + 290g. 5m boil.",recipeResult:"2m10s + 15s drip.",outWeight:235,rating:4,recipeThoughts:"It's better.",timestamp:new Date(2023,12,23)},{coffeeBeansId:2,recipeTarget:"20g + 300g. 5m boil.",recipeResult:"2m30s + 5s drip.",outWeight:240,rating:4.5,recipeThoughts:"It's great.",timestamp:new Date(2023,12,26)},{coffeeBeansId:3,recipeTarget:"17g + 270g. 5m boil.",recipeResult:"2m10s + 15s drip.",outWeight:230,rating:3.5,recipeThoughts:"Can be better.",timestamp:new Date(2023,12,20)},{coffeeBeansId:3,recipeTarget:"18g + 290g. 5m boil.",recipeResult:"2m10s + 15s drip.",outWeight:235,rating:4,recipeThoughts:"It's better.",timestamp:new Date(2023,12,23)},{coffeeBeansId:3,recipeTarget:"20g + 300g. 5m boil.",recipeResult:"2m30s + 5s drip.",outWeight:240,rating:4.5,recipeThoughts:"It's great.",timestamp:new Date(2023,12,26)}];var V={BASE_URL:"./",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{MODE:j}=V;async function G(){j==="development"&&(await q()===!1&&L.forEach(async n=>{await A(n)}),await U()===!1&&N.forEach(async n=>{await z(n)}))}var Y={BASE_URL:"./",MODE:"production",DEV:!1,PROD:!0,SSR:!1};function J(n){let t;return{c(){t=P("Other")},l(s){t=M(s,"Other")},m(s,r){p(s,t,r)},d(s){s&&c(t)}}}function K(n){let t,s="Initialize dev DB",r,f;return{c(){t=b("button"),t.textContent=s,this.h()},l(a){t=v(a,"BUTTON",{class:!0,type:!0,"data-svelte-h":!0}),D(t)!=="svelte-niadbe"&&(t.textContent=s),this.h()},h(){m(t,"class","init-db-button svelte-1ws3yp6"),m(t,"type","button")},m(a,u){p(a,t,u),r||(f=F(t,"click",n[1]),r=!0)},p:C,d(a){a&&c(t),r=!1,f()}}}function Q(n){let t,s,r,f,a,u="Credits",d,o,w="Coffee beans icons created by Freepik - Flaticon",g;s=new H({props:{$$slots:{default:[J]},$$scope:{ctx:n}}});let l=n[0]==="development"&&K(n);return{c(){t=h(),I(s.$$.fragment),r=h(),l&&l.c(),f=h(),a=b("h5"),a.textContent=u,d=h(),o=b("a"),o.textContent=w,this.h()},l(e){y("svelte-1tq7k8",document.head).forEach(c),t=_(e),x(s.$$.fragment,e),r=_(e),l&&l.l(e),f=_(e),a=v(e,"H5",{class:!0,"data-svelte-h":!0}),D(a)!=="svelte-rvnewg"&&(a.textContent=u),d=_(e),o=v(e,"A",{href:!0,style:!0,title:!0,"data-svelte-h":!0}),D(o)!=="svelte-16x14pq"&&(o.textContent=w),this.h()},h(){document.title="Other - PourOverPotato app",m(a,"class","svelte-1ws3yp6"),m(o,"href","https://www.flaticon.com/free-icons/coffee-beans"),E(o,"color","cornflowerblue"),m(o,"title","coffee beans icons")},m(e,i){p(e,t,i),O(s,e,i),p(e,r,i),l&&l.m(e,i),p(e,f,i),p(e,a,i),p(e,d,i),p(e,o,i),g=!0},p(e,[i]){const B={};i&4&&(B.$$scope={dirty:i,ctx:e}),s.$set(B),e[0]==="development"&&l.p(e,i)},i(e){g||(W(s.$$.fragment,e),g=!0)},o(e){S(s.$$.fragment,e),g=!1},d(e){e&&(c(t),c(r),c(f),c(a),c(d),c(o)),k(s,e),l&&l.d(e)}}}function X(n){const{MODE:t}=Y;async function s(){t==="development"&&(await G(),setTimeout(()=>{location.reload(),alert("Dev DB filled.")},1e3))}return[t,s]}class se extends R{constructor(t){super(),$(this,t,X,Q,T,{})}}export{se as component};
