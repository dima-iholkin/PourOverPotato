var N=Object.defineProperty;var j=(t,e,n)=>e in t?N(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var r=(t,e,n)=>(j(t,typeof e!="symbol"?e+"":e,n),n);import{s as V,v as O,w as $,x as k,y as q}from"./scheduler.ZvbRK0ck.js";import{S as K,i as H,e as z,c as G,a as J,d as R,x as Q,g as U,l as X,k as Y}from"./index.D4zfOep-.js";const b=(t,e)=>e.some(n=>t instanceof n);let _,T;function Z(){return _||(_=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function ee(){return T||(T=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const C=new WeakMap,y=new WeakMap,g=new WeakMap;function te(t){const e=new Promise((n,s)=>{const i=()=>{t.removeEventListener("success",a),t.removeEventListener("error",o)},a=()=>{n(l(t.result)),i()},o=()=>{s(t.error),i()};t.addEventListener("success",a),t.addEventListener("error",o)});return g.set(e,t),e}function ne(t){if(C.has(t))return;const e=new Promise((n,s)=>{const i=()=>{t.removeEventListener("complete",a),t.removeEventListener("error",o),t.removeEventListener("abort",o)},a=()=>{n(),i()},o=()=>{s(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",a),t.addEventListener("error",o),t.addEventListener("abort",o)});C.set(t,e)}let D={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return C.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return l(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function P(t){D=t(D)}function se(t){return ee().includes(t)?function(...e){return t.apply(S(this),e),l(this.request)}:function(...e){return l(t.apply(S(this),e))}}function ie(t){return typeof t=="function"?se(t):(t instanceof IDBTransaction&&ne(t),b(t,Z())?new Proxy(t,D):t)}function l(t){if(t instanceof IDBRequest)return te(t);if(y.has(t))return y.get(t);const e=ie(t);return e!==t&&(y.set(t,e),g.set(e,t)),e}const S=t=>g.get(t);function re(t,e,{blocked:n,upgrade:s,blocking:i,terminated:a}={}){const o=indexedDB.open(t,e),p=l(o);return s&&o.addEventListener("upgradeneeded",c=>{s(l(o.result),c.oldVersion,c.newVersion,l(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),p.then(c=>{a&&c.addEventListener("close",()=>a()),i&&c.addEventListener("versionchange",h=>i(h.oldVersion,h.newVersion,h))}).catch(()=>{}),p}const ae=["get","getKey","getAll","getAllKeys","count"],oe=["put","add","delete","clear"],I=new Map;function v(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(I.get(e))return I.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,i=oe.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(i||ae.includes(n)))return;const a=async function(o,...p){const c=this.transaction(o,i?"readwrite":"readonly");let h=c.store;return s&&(h=h.index(p.shift())),(await Promise.all([h[n](...p),i&&c.done]))[0]};return I.set(e,a),a}P(t=>({...t,get:(e,n,s)=>v(e,n)||t.get(e,n,s),has:(e,n)=>!!v(e,n)||t.has(e,n)}));const ce=["continue","continuePrimaryKey","advance"],E={},L=new WeakMap,M=new WeakMap,de={get(t,e){if(!ce.includes(e))return t[e];let n=E[e];return n||(n=E[e]=function(...s){L.set(this,M.get(this)[e](...s))}),n}};async function*ue(...t){let e=this;if(e instanceof IDBCursor||(e=await e.openCursor(...t)),!e)return;e=e;const n=new Proxy(e,de);for(M.set(n,e),g.set(n,S(e));e;)yield n,e=await(L.get(n)||e.continue()),L.delete(n)}function x(t,e){return e===Symbol.asyncIterator&&b(t,[IDBIndex,IDBObjectStore,IDBCursor])||e==="iterate"&&b(t,[IDBIndex,IDBObjectStore])}P(t=>({...t,get(e,n,s){return x(e,n)?ue:t.get(e,n,s)},has(e,n){return x(e,n)||t.has(e,n)}}));class A{constructor(e,n){r(this,"id");r(this,"name");r(this,"description");this.id=n,this.name=e.name,this.description=e.description}}class W{constructor(e){r(this,"name");r(this,"description");this.name=e.name,this.description=e.description}static create(e){const n=e.name.trim(),s=e.description.trim();if(n.length<3)return"ValidationFailed_NameMustBeAtLeast3CharsLong";const i={name:n,description:s};return new W(i)}}class F{constructor(e){r(this,"id");r(this,"name");r(this,"description");this.id=e.id,this.name=e.name,this.description=e.description}static create(e){const n=e.name.trim(),s=e.description.trim();if(n.length<3)return"ValidationFailed_NameMustBeAtLeast3CharsLong";const i={id:e.id,name:n,description:s};return new F(i)}}class fe{constructor(e,n){r(this,"id");r(this,"coffeeBeansId");r(this,"recipeTarget");r(this,"recipeResult");r(this,"recipeThoughts");r(this,"rating");r(this,"outWeight");r(this,"timestamp");this.id=n,this.coffeeBeansId=e.coffeeBeansId,this.recipeTarget=e.recipeTarget,this.recipeResult=e.recipeResult,this.recipeThoughts=e.recipeThoughts,this.rating=e.rating,this.outWeight=e.outWeight,this.timestamp=e.timestamp}}class B{constructor(e,n){r(this,"id");r(this,"name");r(this,"description");r(this,"nameLowerCase");this.id=n,this.name=e.name,this.description=e.description,this.nameLowerCase=e.nameLowerCase}toCoffeeBeans(){return new A(this,this.id)}}class he{constructor(e){r(this,"name");r(this,"description");r(this,"nameLowerCase");this.name=e.name,this.description=e.description,this.nameLowerCase=e.name.toLowerCase()}}class m{constructor(e,n){r(this,"id");r(this,"coffeeBeansId");r(this,"recipeTarget");r(this,"recipeResult");r(this,"recipeThoughts");r(this,"rating");r(this,"outWeight");r(this,"timestamp");this.id=n,this.coffeeBeansId=e.coffeeBeansId,this.recipeTarget=e.recipeTarget,this.recipeResult=e.recipeResult,this.recipeThoughts=e.recipeThoughts,this.rating=e.rating,this.outWeight=e.outWeight,this.timestamp=e.timestamp}toRecipe(){return new fe(this,this.id)}}class le{constructor(e){r(this,"coffeeBeansId");r(this,"recipeTarget");r(this,"recipeResult");r(this,"recipeThoughts");r(this,"rating");r(this,"outWeight");r(this,"timestamp");this.coffeeBeansId=e.coffeeBeansId,this.recipeTarget=e.recipeTarget,this.recipeResult=e.recipeResult,this.recipeThoughts=e.recipeThoughts,this.rating=e.rating,this.outWeight=e.outWeight,this.timestamp=e.timestamp}}const pe="entities",me=1,u="coffeeBeans",w="nameLowerCase",f="recipes";async function d(){return await re(pe,me,{upgrade(t){if(t.objectStoreNames.contains(u)===!1&&t.createObjectStore(u,{keyPath:"id",autoIncrement:!0}).createIndex(w,w,{unique:!0}),t.objectStoreNames.contains(f)===!1){const e=t.createObjectStore(f,{keyPath:"id",autoIncrement:!0});e.createIndex("coffeeBeansId","coffeeBeansId",{unique:!1}),e.createIndex("outWeight","outWeight",{unique:!1}),e.createIndex("rating","rating",{unique:!1}),e.createIndex("timestamp","timestamp",{unique:!1})}}})}async function Ce(t){if(await we(t.name)!==void 0)return"Failure_NameAlreadyExist";const n=new he(t);try{const i=await(await d()).add(u,n);return new B(n,i).toCoffeeBeans()}catch(s){if(s instanceof DOMException&&s.name==="ConstraintError")return console.error(`A ConstraintError occurred while saving coffee beans "${t.name}" to the database.`),"Failure_NameAlreadyExist";throw s}}async function De(t){const e=await d(),n=new le(t),s=await e.add(f,n);return new m(n,s).toRecipe()}async function Se(){return await(await d()).count(u)>0}async function Le(){return await(await d()).count(f)>0}async function Re(t){const e=await d(),n=await e.getFromIndex(u,w,t.name.toLowerCase());if(n!==void 0&&n.id!==t.id)return"Failure_NameAlreadyExist";const s={id:t.id,name:t.name,description:t.description,nameLowerCase:t.name.toLowerCase()};await e.put(u,s);const i={name:s.name,description:s.description};return new A(i,s.id)}async function _e(t){const e=await d(),n=new m(t,t.id);return await e.put(f,n),n.toRecipe()}async function Te(){return(await(await d()).getAll(u)).map(s=>new B(s,s.id).toCoffeeBeans())}async function ve(){return(await(await d()).getAll(f)).map(s=>new m(s,s.id).toRecipe())}async function Ee(t){const n=await(await d()).get(u,t);return n===void 0?n:new B(n,n.id).toCoffeeBeans()}async function we(t){const n=await(await d()).getFromIndex(u,w,t.toLowerCase());if(n!==void 0)return new B(n,n.id).toCoffeeBeans()}async function xe(t){const n=await(await d()).get(f,t);if(n!==void 0)return new m(n,n.id).toRecipe()}async function Pe(t){return(await(await d()).getAllFromIndex(f,"coffeeBeansId",t)).map(i=>new m(i,i.id).toRecipe())}function ge(t){let e,n;const s=t[1].default,i=O(s,t,t[0],null);return{c(){e=z("h1"),i&&i.c(),this.h()},l(a){e=G(a,"H1",{class:!0});var o=J(e);i&&i.l(o),o.forEach(R),this.h()},h(){Q(e,"class","svelte-v0zu8i")},m(a,o){U(a,e,o),i&&i.m(e,null),n=!0},p(a,[o]){i&&i.p&&(!n||o&1)&&$(i,s,a,a[0],n?q(s,a[0],o,null):k(a[0]),null)},i(a){n||(X(i,a),n=!0)},o(a){Y(i,a),n=!1},d(a){a&&R(e),i&&i.d(a)}}}function Be(t,e,n){let{$$slots:s={},$$scope:i}=e;return t.$$set=a=>{"$$scope"in a&&n(0,i=a.$$scope)},[i,s]}class Me extends K{constructor(e){super(),H(this,e,Be,ge,V,{})}}export{A as C,Me as P,fe as R,Ee as a,xe as b,Te as c,Pe as d,_e as e,De as f,ve as g,Se as h,Ce as i,Le as j,F as k,Re as l,we as m,W as n};
