var q=Object.defineProperty;var Y=(t,e,s)=>e in t?q(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var o=(t,e,s)=>Y(t,typeof e!="symbol"?e+"":e,s);class B{constructor(e){o(this,"id");o(this,"name");o(this,"description");this.id=e.id,this.name=e.name,this.description=e.description}static hasValidName(e){return e.name.trim().length<3?"ValidationFailed_NameMustBeAtLeast3CharsLong":!0}}class O{constructor(e){o(this,"name");o(this,"description");this.name=e.name,this.description=e.description}static create(e){if(B.hasValidName(e)==="ValidationFailed_NameMustBeAtLeast3CharsLong")return"ValidationFailed_NameMustBeAtLeast3CharsLong";const s=e.name.trim(),a=e.description.trim(),n={name:s,description:a};return new O(n)}}class F{constructor(e){o(this,"id");o(this,"name");o(this,"description");this.id=e.id,this.name=e.name,this.description=e.description}static create(e){if(B.hasValidName(e)==="ValidationFailed_NameMustBeAtLeast3CharsLong")return"ValidationFailed_NameMustBeAtLeast3CharsLong";const s=e.name.trim(),a=e.description.trim(),n={id:e.id,name:s,description:a};return new F(n)}}const v=(t,e)=>e.some(s=>t instanceof s);let y,V;function X(){return y||(y=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function K(){return V||(V=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const N=new WeakMap,I=new WeakMap,C=new WeakMap;function $(t){const e=new Promise((s,a)=>{const n=()=>{t.removeEventListener("success",i),t.removeEventListener("error",r)},i=()=>{s(l(t.result)),n()},r=()=>{a(t.error),n()};t.addEventListener("success",i),t.addEventListener("error",r)});return C.set(e,t),e}function H(t){if(N.has(t))return;const e=new Promise((s,a)=>{const n=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",r),t.removeEventListener("abort",r)},i=()=>{s(),n()},r=()=>{a(t.error||new DOMException("AbortError","AbortError")),n()};t.addEventListener("complete",i),t.addEventListener("error",r),t.addEventListener("abort",r)});N.set(t,e)}let E={get(t,e,s){if(t instanceof IDBTransaction){if(e==="done")return N.get(t);if(e==="store")return s.objectStoreNames[1]?void 0:s.objectStore(s.objectStoreNames[0])}return l(t[e])},set(t,e,s){return t[e]=s,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function x(t){E=t(E)}function U(t){return K().includes(t)?function(...e){return t.apply(R(this),e),l(this.request)}:function(...e){return l(t.apply(R(this),e))}}function z(t){return typeof t=="function"?U(t):(t instanceof IDBTransaction&&H(t),v(t,X())?new Proxy(t,E):t)}function l(t){if(t instanceof IDBRequest)return $(t);if(I.has(t))return I.get(t);const e=z(t);return e!==t&&(I.set(t,e),C.set(e,t)),e}const R=t=>C.get(t);function G(t,e,{blocked:s,upgrade:a,blocking:n,terminated:i}={}){const r=indexedDB.open(t,e),f=l(r);return a&&r.addEventListener("upgradeneeded",c=>{a(l(r.result),c.oldVersion,c.newVersion,l(r.transaction),c)}),s&&r.addEventListener("blocked",c=>s(c.oldVersion,c.newVersion,c)),f.then(c=>{i&&c.addEventListener("close",()=>i()),n&&c.addEventListener("versionchange",d=>n(d.oldVersion,d.newVersion,d))}).catch(()=>{}),f}function Te(t,{blocked:e}={}){const s=indexedDB.deleteDatabase(t);return e&&s.addEventListener("blocked",a=>e(a.oldVersion,a)),l(s).then(()=>{})}const J=["get","getKey","getAll","getAllKeys","count"],Q=["put","add","delete","clear"],S=new Map;function L(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(S.get(e))return S.get(e);const s=e.replace(/FromIndex$/,""),a=e!==s,n=Q.includes(s);if(!(s in(a?IDBIndex:IDBObjectStore).prototype)||!(n||J.includes(s)))return;const i=async function(r,...f){const c=this.transaction(r,n?"readwrite":"readonly");let d=c.store;return a&&(d=d.index(f.shift())),(await Promise.all([d[s](...f),n&&c.done]))[0]};return S.set(e,i),i}x(t=>({...t,get:(e,s,a)=>L(e,s)||t.get(e,s,a),has:(e,s)=>!!L(e,s)||t.has(e,s)}));const Z=["continue","continuePrimaryKey","advance"],_={},j=new WeakMap,A=new WeakMap,ee={get(t,e){if(!Z.includes(e))return t[e];let s=_[e];return s||(s=_[e]=function(...a){j.set(this,A.get(this)[e](...a))}),s}};async function*te(...t){let e=this;if(e instanceof IDBCursor||(e=await e.openCursor(...t)),!e)return;e=e;const s=new Proxy(e,ee);for(A.set(s,e),C.set(s,R(e));e;)yield s,e=await(j.get(s)||e.continue()),j.delete(s)}function M(t,e){return e===Symbol.asyncIterator&&v(t,[IDBIndex,IDBObjectStore,IDBCursor])||e==="iterate"&&v(t,[IDBIndex,IDBObjectStore])}x(t=>({...t,get(e,s,a){return M(e,s)?te:t.get(e,s,a)},has(e,s){return M(e,s)||t.has(e,s)}}));function Be(t,e){return t.favorite===e.favorite?se(t,e):t.favorite===!0?-1:e.favorite===!0?1:0}function Ce(t,e){return t.outWeight===e.outWeight?D(t,e):t.outWeight-e.outWeight}function Ie(t,e){return t.outWeight===e.outWeight?D(t,e):e.outWeight-t.outWeight}function Se(t,e){return t.rating===e.rating?D(t,e):t.rating-e.rating}function se(t,e){return t.rating===e.rating?D(t,e):e.rating-t.rating}function ve(t,e){return t.timestamp.getTime()-e.timestamp.getTime()}function D(t,e){return e.timestamp.getTime()-t.timestamp.getTime()}class b{constructor(e){o(this,"id");o(this,"name");o(this,"nameLowerCase");o(this,"description");o(this,"softDeletionTimestamp");this.id=e.id,this.name=e.name,this.nameLowerCase=e.nameLowerCase,this.description=e.description,this.softDeletionTimestamp=e.softDeletionTimestamp}static fromCoffeeBeans(e){const s={...e,nameLowerCase:e.name.toLowerCase(),softDeletionTimestamp:void 0};return new b(s)}toCoffeeBeans(){return new B(this)}}class Ne{constructor(e){o(this,"name");o(this,"nameLowerCase");o(this,"description");o(this,"softDeletionTimestamp");this.name=e.name,this.nameLowerCase=e.name.toLowerCase(),this.description=e.description,this.softDeletionTimestamp=void 0}}class oe extends B{constructor(s,a){super(s);o(this,"recipeCount");o(this,"latestRecipeTimestamp");o(this,"earliestRecipeTimestamp");this.recipeCount=a.recipeCount,this.latestRecipeTimestamp=a.latestRecipeTimestamp,this.earliestRecipeTimestamp=a.earliestRecipeTimestamp}}function ae(t,e){const s={recipeCount:e.recipesCount,latestRecipeTimestamp:e.latestRecipeTimestamp?new Date(e.latestRecipeTimestamp):void 0,earliestRecipeTimestamp:e.earliestRecipeTimestamp?new Date(e.earliestRecipeTimestamp):void 0};return new oe(t,s)}class ne{constructor(e){o(this,"id");o(this,"coffeeBeansId");o(this,"roastDate");o(this,"bagNumber");o(this,"recipeTarget");o(this,"recipeResult");o(this,"recipeThoughts");o(this,"favorite");o(this,"rating");o(this,"outWeight");o(this,"timestamp");this.id=e.id,this.coffeeBeansId=e.coffeeBeansId,this.roastDate=e.roastDate,this.bagNumber=e.bagNumber,this.recipeTarget=e.recipeTarget,this.recipeResult=e.recipeResult,this.recipeThoughts=e.recipeThoughts,this.favorite=e.favorite,this.rating=e.rating,this.outWeight=e.outWeight,this.timestamp=e.timestamp}get daysSinceRoast(){if(this.roastDate===void 0||!(this.roastDate instanceof Date)||this.roastDate.getTime()===0)return;const e=new Date(this.roastDate.getFullYear(),this.roastDate.getMonth(),this.roastDate.getDate(),12,0,0,0),s=new Date(this.timestamp.getFullYear(),this.timestamp.getMonth(),this.timestamp.getDate(),12,0,0,0),a=e.getTime(),n=s.getTime();return Math.round((n-a)/(1e3*60*60*24))}static calculateDaysSinceRoast(e,s){if(s===void 0||!(s instanceof Date)||s.getTime()===0)return;const a=new Date(s.getFullYear(),s.getMonth(),s.getDate(),12,0,0,0),n=new Date(e.getFullYear(),e.getMonth(),e.getDate(),12,0,0,0),i=a.getTime(),r=n.getTime();return Math.round((r-i)/(1e3*60*60*24))}}class Ee{constructor(e){o(this,"coffeeBeansId");o(this,"roastDate");o(this,"bagNumber");o(this,"recipeTarget");o(this,"recipeResult");o(this,"recipeThoughts");o(this,"favorite");o(this,"rating");o(this,"outWeight");o(this,"timestamp");this.coffeeBeansId=e.coffeeBeansId,this.roastDate=e.roastDate,this.bagNumber=e.bagNumber,this.recipeTarget=e.recipeTarget,this.recipeResult=e.recipeResult,this.recipeThoughts=e.recipeThoughts,this.favorite=e.favorite,this.rating=e.rating,this.outWeight=e.outWeight,this.timestamp=e.timestamp}}class w{constructor(e){o(this,"id");o(this,"coffeeBeansId");o(this,"roastDate");o(this,"bagNumber");o(this,"recipeTarget");o(this,"recipeResult");o(this,"recipeThoughts");o(this,"favorite");o(this,"rating");o(this,"outWeight");o(this,"timestamp");o(this,"softDeletionTimestamp");this.id=e.id,this.coffeeBeansId=e.coffeeBeansId,this.roastDate=e.roastDate,this.bagNumber=e.bagNumber,this.recipeTarget=e.recipeTarget,this.recipeResult=e.recipeResult,this.recipeThoughts=e.recipeThoughts,this.favorite=e.favorite??!1,this.rating=e.rating,this.outWeight=e.outWeight,this.timestamp=e.timestamp,this.softDeletionTimestamp=e.softDeletionTimestamp}static fromRecipe(e){let s;e.roastDate===void 0||e.roastDate.getTime()===0?s=void 0:s=e.roastDate.getTime();let a;e.bagNumber===""?a=void 0:a=e.bagNumber;const n={...e,roastDate:s,bagNumber:a,timestamp:e.timestamp.getTime(),softDeletionTimestamp:void 0};return new w(n)}toRecipe(){const e={...this,roastDate:this.roastDate?new Date(this.roastDate):void 0,bagNumber:this.bagNumber??"",favorite:this.favorite??!1,timestamp:new Date(this.timestamp)};return new ne(e)}}class Re{constructor(e){o(this,"coffeeBeansId");o(this,"roastDate");o(this,"bagNumber");o(this,"recipeTarget");o(this,"recipeResult");o(this,"recipeThoughts");o(this,"favorite");o(this,"rating");o(this,"outWeight");o(this,"timestamp");o(this,"softDeletionTimestamp");let s;e.roastDate===void 0||e.roastDate.getTime()===0?s=void 0:s=e.roastDate.getTime();let a;e.bagNumber===""?a=void 0:a=e.bagNumber,this.coffeeBeansId=e.coffeeBeansId,this.roastDate=s,this.bagNumber=a,this.recipeTarget=e.recipeTarget,this.recipeResult=e.recipeResult,this.recipeThoughts=e.recipeThoughts,this.favorite=e.favorite??!1,this.rating=e.rating,this.outWeight=e.outWeight,this.timestamp=e.timestamp.getTime(),this.softDeletionTimestamp=void 0}toRecipeDB(e,s){return new w({...e,id:s})}}async function je(){const e=(await ge()).transaction([u,h],"readonly"),a=(await e.objectStore(u).getAll()).filter(i=>i.softDeletionTimestamp===void 0).map(i=>new b(i).toCoffeeBeans()),n=[];for(const i of a){const r=await e.objectStore(h).get(i.id),f={recipesCount:(r==null?void 0:r.recipesCount)??0,latestRecipeTimestamp:r==null?void 0:r.latestRecipeTimestamp,earliestRecipeTimestamp:r==null?void 0:r.earliestRecipeTimestamp},c=ae(i,f);n.push(c)}return await e.done,n}async function ie(t,e){var i,r;let s=await e.objectStore(h).get(t);const n=(await e.objectStore(m).index(P).getAll(t)).filter(f=>f.softDeletionTimestamp===void 0).map(f=>new w(f).toRecipe()).toSorted(D);s={id:t,recipesCount:n.length,latestRecipeTimestamp:(i=n[0])==null?void 0:i.timestamp.getTime(),earliestRecipeTimestamp:(r=n.at(-1))==null?void 0:r.timestamp.getTime()},await e.objectStore(h).put(s)}async function re(t){if(t.db.objectStoreNames.contains(h)===!1)throw new Error(`Object store ${h} wasn't found.`);await t.objectStore(h).clear();const e=await t.objectStore(u).getAll();for(const s of e)await ie(s.id,t)}function W(t){const e=new CustomEvent("addToast",{detail:{message:t,timeout:5e3}});document.dispatchEvent(e)}function ye(t,e,s){const a=new CustomEvent("addToast",{detail:{message:t,timeout:1e4,onClickUndo:e,onUndoIgnored:s}});document.dispatchEvent(a)}async function ce(t){if(t.db.objectStoreNames.contains(u)===!1)return;const e=await t.objectStore(u).getAll(),s=t;for(const a of e){const n={...a,softDeletionTimestamp:void 0},i=new b(n);await s.objectStore(u).put(i)}}async function ue(t){if(t.db.objectStoreNames.contains(u)===!1)return;const e=await t.objectStore(u).getAll(),s=t;for(const a of e){const n={...a,softDeletionTimestamp:a.softDeleted?Date.now():void 0},i=new b(n);await s.objectStore(u).put(i)}}async function fe(t){if(t.db.objectStoreNames.contains(u)===!1)return;t.objectStore(u).indexNames.contains(p)&&t.objectStore(u).deleteIndex(p);const e=await t.objectStore(u).getAll(),s=new Map;e.forEach(n=>{const i=s.get(n.nameLowerCase);i===void 0?s.set(n.nameLowerCase,1):s.set(n.nameLowerCase,i+1)});for await(const[n,i]of s){if(i<2)continue;let r=e.filter(c=>c.nameLowerCase.startsWith(n+"-")).map(c=>c.nameLowerCase.slice(n.length+1)).map(c=>Number(c)).filter(c=>Number.isInteger(c)).sort().at(-1);if(r===void 0||isNaN(r))throw W("Something went wrong with coffee beans deduplication during migration. Please contact the developer."),new Error("Something went wrong with greatestNum value.");const f=e.filter(c=>c.nameLowerCase===n);for await(const c of f){r++;const d=c.name+"-"+r,k=new b({...c,name:d,nameLowerCase:d.toLowerCase(),softDeletionTimestamp:void 0});await t.objectStore(u).put(k)}}t.objectStore(u).createIndex(p,p,{unique:!0});let a=!1;s.forEach(n=>{n>=2&&a===!1&&(a=!0,W("Coffee beans with duplicate names were renamed to make them unique."))})}async function me(t){if(t.db.objectStoreNames.contains(m)===!1)return;const e=await t.objectStore(m).getAll(),s=t;for(const a of e){const n={...a,roastDate:void 0,bagNumber:void 0,favorite:!1,timestamp:a.timestamp.getTime(),softDeletionTimestamp:void 0},i=new w(n);await s.objectStore(m).put(i)}}async function de(t){if(t.db.objectStoreNames.contains(m)===!1)return;const e=await t.objectStore(m).getAll(),s=t;for(const a of e){const n={...a,roastDate:void 0,bagNumber:void 0,favorite:a.favorite??!1,softDeletionTimestamp:a.softDeleted?Date.now():void 0},i=new w(n);await s.objectStore(m).put(i)}}const he=5,le="entities",u="coffeeBeans",m="recipes",h="enhancedCoffeeBeans",p="nameLowerCase",P="coffeeBeansId",T="softDeletionTimestamp";async function ge(){return await G(le,he,{async upgrade(t,e,s,a){switch(e){case 0:break;case 1:{const n=a;await ce(n),await me(n);break}case 2:{const n=a;await ue(n),await de(n);break}case 3:{await fe(a);break}}pe(a),await re(a)}})}function pe(t){const e=t.db;e.objectStoreNames.contains(u)===!1&&e.createObjectStore(u,{keyPath:"id",autoIncrement:!0}),be(t),we(t),e.objectStoreNames.contains(m)===!1&&e.createObjectStore(m,{keyPath:"id",autoIncrement:!0}),g(t,P),g(t,"roastDate"),g(t,"bagNumber"),g(t,"outWeight"),g(t,"rating"),g(t,"timestamp"),g(t,T),e.objectStoreNames.contains(h)===!1&&e.createObjectStore(h,{keyPath:"id"})}function be(t){t.objectStore(u).indexNames.contains(p)||t.objectStore(u).createIndex(p,p,{unique:!0})}function we(t){t.objectStore(u).indexNames.contains(T)||t.objectStore(u).createIndex(T,T,{unique:!1})}function g(t,e){t.objectStore(m).indexNames.contains(e)||t.objectStore(m).createIndex(e,e,{unique:!1})}export{u as C,le as D,h as E,m as R,T as S,W as a,b,p as c,P as d,B as e,Ne as f,w as g,Re as h,O as i,Ee as j,Te as k,re as l,F as m,ye as n,ge as o,ve as p,Be as q,ie as r,D as s,se as t,Se as u,Ie as v,Ce as w,ne as x,je as y};
