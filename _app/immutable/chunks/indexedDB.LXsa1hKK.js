var A=Object.defineProperty;var j=(t,e,n)=>e in t?A(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var s=(t,e,n)=>(j(t,typeof e!="symbol"?e+"":e,n),n);class N{constructor(e,n){s(this,"id");s(this,"name");s(this,"description");this.id=n,this.name=e.name,this.description=e.description}}class P{constructor(e){s(this,"name");s(this,"description");this.name=e.name,this.description=e.description}static create(e){let n=e.name.trim(),r=e.description.trim();if(n.length<3)return"ValidationFailed_NameMustBeAtLeast3CharsLong";const i={name:n,description:r};return new P(i)}}class F{constructor(e,n){s(this,"id");s(this,"coffeeBeansId");s(this,"recipeTarget");s(this,"recipeResult");s(this,"recipeThoughts");s(this,"rating");s(this,"outWeight");s(this,"timestamp");this.id=n,this.coffeeBeansId=e.coffeeBeansId,this.recipeTarget=e.recipeTarget,this.recipeResult=e.recipeResult,this.recipeThoughts=e.recipeThoughts,this.rating=e.rating,this.outWeight=e.outWeight,this.timestamp=e.timestamp}}const I=(t,e)=>e.some(n=>t instanceof n);let L,E;function O(){return L||(L=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function V(){return E||(E=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const y=new WeakMap,g=new WeakMap,l=new WeakMap;function k(t){const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("success",c),t.removeEventListener("error",o)},c=()=>{n(f(t.result)),i()},o=()=>{r(t.error),i()};t.addEventListener("success",c),t.addEventListener("error",o)});return l.set(e,t),e}function K(t){if(y.has(t))return;const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("complete",c),t.removeEventListener("error",o),t.removeEventListener("abort",o)},c=()=>{n(),i()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",c),t.addEventListener("error",o),t.addEventListener("abort",o)});y.set(t,e)}let b={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return y.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return f(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function v(t){b=t(b)}function _(t){return V().includes(t)?function(...e){return t.apply(D(this),e),f(this.request)}:function(...e){return f(t.apply(D(this),e))}}function q(t){return typeof t=="function"?_(t):(t instanceof IDBTransaction&&K(t),I(t,O())?new Proxy(t,b):t)}function f(t){if(t instanceof IDBRequest)return k(t);if(g.has(t))return g.get(t);const e=q(t);return e!==t&&(g.set(t,e),l.set(e,t)),e}const D=t=>l.get(t);function $(t,e,{blocked:n,upgrade:r,blocking:i,terminated:c}={}){const o=indexedDB.open(t,e),p=f(o);return r&&o.addEventListener("upgradeneeded",a=>{r(f(o.result),a.oldVersion,a.newVersion,f(o.transaction),a)}),n&&o.addEventListener("blocked",a=>n(a.oldVersion,a.newVersion,a)),p.then(a=>{c&&a.addEventListener("close",()=>c()),i&&a.addEventListener("versionchange",d=>i(d.oldVersion,d.newVersion,d))}).catch(()=>{}),p}const z=["get","getKey","getAll","getAllKeys","count"],G=["put","add","delete","clear"],w=new Map;function R(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(w.get(e))return w.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,i=G.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||z.includes(n)))return;const c=async function(o,...p){const a=this.transaction(o,i?"readwrite":"readonly");let d=a.store;return r&&(d=d.index(p.shift())),(await Promise.all([d[n](...p),i&&a.done]))[0]};return w.set(e,c),c}v(t=>({...t,get:(e,n,r)=>R(e,n)||t.get(e,n,r),has:(e,n)=>!!R(e,n)||t.has(e,n)}));const H=["continue","continuePrimaryKey","advance"],x={},C=new WeakMap,W=new WeakMap,J={get(t,e){if(!H.includes(e))return t[e];let n=x[e];return n||(n=x[e]=function(...r){C.set(this,W.get(this)[e](...r))}),n}};async function*Q(...t){let e=this;if(e instanceof IDBCursor||(e=await e.openCursor(...t)),!e)return;e=e;const n=new Proxy(e,J);for(W.set(n,e),l.set(n,D(e));e;)yield n,e=await(C.get(n)||e.continue()),C.delete(n)}function M(t,e){return e===Symbol.asyncIterator&&I(t,[IDBIndex,IDBObjectStore,IDBCursor])||e==="iterate"&&I(t,[IDBIndex,IDBObjectStore])}v(t=>({...t,get(e,n,r){return M(e,n)?Q:t.get(e,n,r)},has(e,n){return M(e,n)||t.has(e,n)}}));class B{constructor(e,n){s(this,"id");s(this,"name");s(this,"description");s(this,"nameLowerCase");this.id=n,this.name=e.name,this.description=e.description,this.nameLowerCase=e.nameLowerCase}toCoffeeBeans(){return new N(this,this.id)}}class U{constructor(e){s(this,"name");s(this,"description");s(this,"nameLowerCase");this.name=e.name,this.description=e.description,this.nameLowerCase=e.name.toLowerCase()}}class T{constructor(e,n){s(this,"id");s(this,"coffeeBeansId");s(this,"recipeTarget");s(this,"recipeResult");s(this,"recipeThoughts");s(this,"rating");s(this,"outWeight");s(this,"timestamp");this.id=n,this.coffeeBeansId=e.coffeeBeansId,this.recipeTarget=e.recipeTarget,this.recipeResult=e.recipeResult,this.recipeThoughts=e.recipeThoughts,this.rating=e.rating,this.outWeight=e.outWeight,this.timestamp=e.timestamp}toRecipe(){return new F(this,this.id)}}class X{constructor(e){s(this,"coffeeBeansId");s(this,"recipeTarget");s(this,"recipeResult");s(this,"recipeThoughts");s(this,"rating");s(this,"outWeight");s(this,"timestamp");this.coffeeBeansId=e.coffeeBeansId,this.recipeTarget=e.recipeTarget,this.recipeResult=e.recipeResult,this.recipeThoughts=e.recipeThoughts,this.rating=e.rating,this.outWeight=e.outWeight,this.timestamp=e.timestamp}}const Y="entities",Z=1,h="coffeeBeans",S="nameLowerCase",m="recipes";async function u(){return await $(Y,Z,{upgrade(t){if(t.objectStoreNames.contains(h)===!1&&t.createObjectStore(h,{keyPath:"id",autoIncrement:!0}).createIndex(S,S,{unique:!0}),t.objectStoreNames.contains(m)===!1){const e=t.createObjectStore(m,{keyPath:"id",autoIncrement:!0});e.createIndex("coffeeBeansId","coffeeBeansId",{unique:!1}),e.createIndex("outWeight","outWeight",{unique:!1}),e.createIndex("rating","rating",{unique:!1}),e.createIndex("timestamp","timestamp",{unique:!1})}}})}async function ne(t){if(await ee(t.name)!==void 0)return"Failure_NameAlreadyExist";const n=new U(t);try{const i=await(await u()).add(h,n);return new B(n,i).toCoffeeBeans()}catch(r){if(r instanceof DOMException&&r.name==="ConstraintError")return console.error(`A ConstraintError occurred while saving coffee beans "${t.name}" to the database.`),"Failure_NameAlreadyExist";throw r}}async function se(t){const e=await u(),n=new X(t),r=await e.add(m,n);return new T(n,r).toRecipe()}async function re(){return await(await u()).count(h)>0}async function ie(){return await(await u()).count(m)>0}async function oe(){return(await(await u()).getAll(h)).map(r=>new B(r,r.id).toCoffeeBeans())}async function ae(){return(await(await u()).getAll(m)).map(r=>new T(r,r.id).toRecipe())}async function ce(t){const n=await(await u()).get(h,t);return n===void 0?n:new B(n,n.id).toCoffeeBeans()}async function ee(t){const n=await(await u()).getFromIndex(h,S,t.toLowerCase());if(n!==void 0)return new B(n,n.id).toCoffeeBeans()}async function ue(t){return(await(await u()).getAllFromIndex(m,"coffeeBeansId",t)).map(i=>new T(i,i.id).toRecipe())}export{N as C,ee as a,ue as b,oe as c,ce as d,re as e,ne as f,ae as g,ie as h,se as i,P as j};