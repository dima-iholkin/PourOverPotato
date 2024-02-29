var $=Object.defineProperty;var K=(t,e,n)=>e in t?$(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var i=(t,e,n)=>(K(t,typeof e!="symbol"?e+"":e,n),n);const C=(t,e)=>e.some(n=>t instanceof n);let E,v;function q(){return E||(E=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function z(){return v||(v=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const D=new WeakMap,b=new WeakMap,B=new WeakMap;function G(t){const e=new Promise((n,s)=>{const a=()=>{t.removeEventListener("success",d),t.removeEventListener("error",c)},d=()=>{n(m(t.result)),a()},c=()=>{s(t.error),a()};t.addEventListener("success",d),t.addEventListener("error",c)});return B.set(e,t),e}function J(t){if(D.has(t))return;const e=new Promise((n,s)=>{const a=()=>{t.removeEventListener("complete",d),t.removeEventListener("error",c),t.removeEventListener("abort",c)},d=()=>{n(),a()},c=()=>{s(t.error||new DOMException("AbortError","AbortError")),a()};t.addEventListener("complete",d),t.addEventListener("error",c),t.addEventListener("abort",c)});D.set(t,e)}let T={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return D.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return m(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function j(t){T=t(T)}function X(t){return z().includes(t)?function(...e){return t.apply(S(this),e),m(this.request)}:function(...e){return m(t.apply(S(this),e))}}function H(t){return typeof t=="function"?X(t):(t instanceof IDBTransaction&&J(t),C(t,q())?new Proxy(t,T):t)}function m(t){if(t instanceof IDBRequest)return G(t);if(b.has(t))return b.get(t);const e=H(t);return e!==t&&(b.set(t,e),B.set(e,t)),e}const S=t=>B.get(t);function Q(t,e,{blocked:n,upgrade:s,blocking:a,terminated:d}={}){const c=indexedDB.open(t,e),o=m(c);return s&&c.addEventListener("upgradeneeded",r=>{s(m(c.result),r.oldVersion,r.newVersion,m(c.transaction),r)}),n&&c.addEventListener("blocked",r=>n(r.oldVersion,r.newVersion,r)),o.then(r=>{d&&r.addEventListener("close",()=>d()),a&&r.addEventListener("versionchange",f=>a(f.oldVersion,f.newVersion,f))}).catch(()=>{}),o}const U=["get","getKey","getAll","getAllKeys","count"],Y=["put","add","delete","clear"],I=new Map;function L(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(I.get(e))return I.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,a=Y.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(a||U.includes(n)))return;const d=async function(c,...o){const r=this.transaction(c,a?"readwrite":"readonly");let f=r.store;return s&&(f=f.index(o.shift())),(await Promise.all([f[n](...o),a&&r.done]))[0]};return I.set(e,d),d}j(t=>({...t,get:(e,n,s)=>L(e,n)||t.get(e,n,s),has:(e,n)=>!!L(e,n)||t.has(e,n)}));const Z=["continue","continuePrimaryKey","advance"],x={},R=new WeakMap,F=new WeakMap,ee={get(t,e){if(!Z.includes(e))return t[e];let n=x[e];return n||(n=x[e]=function(...s){R.set(this,F.get(this)[e](...s))}),n}};async function*te(...t){let e=this;if(e instanceof IDBCursor||(e=await e.openCursor(...t)),!e)return;e=e;const n=new Proxy(e,ee);for(F.set(n,e),B.set(n,S(e));e;)yield n,e=await(R.get(n)||e.continue()),R.delete(n)}function M(t,e){return e===Symbol.asyncIterator&&C(t,[IDBIndex,IDBObjectStore,IDBCursor])||e==="iterate"&&C(t,[IDBIndex,IDBObjectStore])}j(t=>({...t,get(e,n,s){return M(e,n)?te:t.get(e,n,s)},has(e,n){return M(e,n)||t.has(e,n)}}));class A{constructor(e,n){i(this,"id");i(this,"name");i(this,"description");this.id=n,this.name=e.name,this.description=e.description}}class W{constructor(e){i(this,"name");i(this,"description");this.name=e.name,this.description=e.description}static create(e){const n=e.name.trim(),s=e.description.trim();if(n.length<3)return"ValidationFailed_NameMustBeAtLeast3CharsLong";const a={name:n,description:s};return new W(a)}}class V{constructor(e){i(this,"id");i(this,"name");i(this,"description");this.id=e.id,this.name=e.name,this.description=e.description}static create(e){const n=e.name.trim(),s=e.description.trim();if(n.length<3)return"ValidationFailed_NameMustBeAtLeast3CharsLong";const a={id:e.id,name:n,description:s};return new V(a)}}class P{constructor(e,n){i(this,"id");i(this,"coffeeBeansId");i(this,"recipeTarget");i(this,"recipeResult");i(this,"recipeThoughts");i(this,"rating");i(this,"outWeight");i(this,"timestamp");this.id=n,this.coffeeBeansId=e.coffeeBeansId,this.recipeTarget=e.recipeTarget,this.recipeResult=e.recipeResult,this.recipeThoughts=e.recipeThoughts,this.rating=e.rating,this.outWeight=e.outWeight,this.timestamp=e.timestamp}}function he(t){const e=t.getTimezoneOffset()*6e4;return new Date(t.getTime()-e).toISOString().slice(0,-8)}function ne(t){const e=Date.parse(t);return new Date(e)}function pe(t){const e=Math.floor((Date.now()-t.getTime())/1e3);if(Math.floor(e/86400)>=1){const d=new Date;return d.setDate(d.getDate()-1),d.toDateString()===t.toDateString()?"yesterday":t.toLocaleString(void 0,{dateStyle:"short"})}const s=Math.floor(e/3600);if(s>1)return s+" hours ago";if(s===1)return"1 hour ago";const a=Math.floor(e/60);return a>1?a+" minutes ago":"just now"}function se(t){const e=new CustomEvent("addToast",{detail:t});document.dispatchEvent(e)}class y{constructor(e,n){i(this,"id");i(this,"name");i(this,"description");i(this,"nameLowerCase");this.id=n,this.name=e.name,this.description=e.description,this.nameLowerCase=e.nameLowerCase}toCoffeeBeans(){return new A(this,this.id)}}class ie{constructor(e){i(this,"name");i(this,"description");i(this,"nameLowerCase");this.name=e.name,this.description=e.description,this.nameLowerCase=e.name.toLowerCase()}}class l{constructor(e,n){i(this,"id");i(this,"coffeeBeansId");i(this,"recipeTarget");i(this,"recipeResult");i(this,"recipeThoughts");i(this,"rating");i(this,"outWeight");i(this,"timestamp");this.id=n,this.coffeeBeansId=e.coffeeBeansId,this.recipeTarget=e.recipeTarget,this.recipeResult=e.recipeResult,this.recipeThoughts=e.recipeThoughts,this.rating=e.rating,this.outWeight=e.outWeight,this.timestamp=e.timestamp}toRecipe(){const e={coffeeBeansId:this.coffeeBeansId,recipeTarget:this.recipeTarget,recipeResult:this.recipeResult,recipeThoughts:this.recipeThoughts,rating:this.rating,outWeight:this.outWeight,timestamp:new Date(this.timestamp)};return new P(e,this.id)}}class oe{constructor(e){i(this,"coffeeBeansId");i(this,"recipeTarget");i(this,"recipeResult");i(this,"recipeThoughts");i(this,"rating");i(this,"outWeight");i(this,"timestamp");this.coffeeBeansId=e.coffeeBeansId,this.recipeTarget=e.recipeTarget,this.recipeResult=e.recipeResult,this.recipeThoughts=e.recipeThoughts,this.rating=e.rating,this.outWeight=e.outWeight,this.timestamp=e.timestamp.getTime()}}const ae="entities",w=2,p="coffeeBeans",g="nameLowerCase",h="recipes";async function u(){return await Q(ae,w,{async upgrade(t,e,n,s){switch(e){case 0:N(t);break;case 1:{N(t),await re(t,s);break}}}})}function N(t){if(t.objectStoreNames.contains(p)===!1&&t.createObjectStore(p,{keyPath:"id",autoIncrement:!0}).createIndex(g,g,{unique:!0}),t.objectStoreNames.contains(h)===!1){const e=t.createObjectStore(h,{keyPath:"id",autoIncrement:!0});e.createIndex("coffeeBeansId","coffeeBeansId",{unique:!1}),e.createIndex("outWeight","outWeight",{unique:!1}),e.createIndex("rating","rating",{unique:!1}),e.createIndex("timestamp","timestamp",{unique:!1})}}async function re(t,e){const n=await e.objectStore(h).getAll();for(const s of n){const a={...s,timestamp:s.timestamp.getTime()};await e.objectStore(h).put(a)}}async function ce(t){if(await fe(t.name)!==void 0)return"Failure_NameAlreadyExist";const n=new ie(t);try{const a=await(await u()).add(p,n);return new y(n,a).toCoffeeBeans()}catch(s){if(s instanceof DOMException&&s.name==="ConstraintError")return console.error(`A ConstraintError occurred while saving coffee beans "${t.name}" to the database.`),"Failure_NameAlreadyExist";throw s}}async function de(t){const e=await u(),n=new oe(t),s=await e.add(h,n);return new l(n,s).toRecipe()}async function me(){return await(await u()).count(p)>0}async function le(){return await(await u()).count(h)>0}async function we(){const t=await u(),e=IDBKeyRange.bound(Number.MIN_SAFE_INTEGER,Number.MAX_SAFE_INTEGER);await t.delete(p,e),await t.delete(h,e)}async function ge(t){await(await u()).delete(p,t)}async function Be(t){await(await u()).delete(h,t)}async function ye(t){const e=await u(),n=await e.getAllFromIndex(h,"coffeeBeansId",t);return await Promise.all(n.map(async s=>await e.delete(h,s.id))),n.length}async function be(t){const e=await u(),n=await e.getFromIndex(p,g,t.name.toLowerCase());if(n!==void 0&&n.id!==t.id)return"Failure_NameAlreadyExist";const s={id:t.id,name:t.name,description:t.description,nameLowerCase:t.name.toLowerCase()};await e.put(p,s);const a={name:s.name,description:s.description};return new A(a,s.id)}async function Ie(t){const e=await u(),n={...t,timestamp:t.timestamp.getTime()},s=new l(n,t.id);return await e.put(h,s),s.toRecipe()}async function Ce(){const t={dbVersion:w,coffeeBeans:await _(),recipes:await O()},e=JSON.stringify(t);return new Blob([e],{type:"application/json"})}async function _(){return(await(await u()).getAll(p)).map(s=>new y(s,s.id).toCoffeeBeans())}async function O(){return(await(await u()).getAll(h)).map(s=>new l(s,s.id).toRecipe())}async function De(t){const n=await(await u()).get(p,t);return n===void 0?n:new y(n,n.id).toCoffeeBeans()}async function fe(t){const n=await(await u()).getFromIndex(p,g,t.toLowerCase());if(n!==void 0)return new y(n,n.id).toCoffeeBeans()}async function Te(t){const n=await(await u()).get(h,t);if(n!==void 0)return new l(n,n.id).toRecipe()}async function Se(t){return(await(await u()).getAllFromIndex(h,"coffeeBeansId",t)).map(a=>new l(a,a.id).toRecipe())}async function Re(t){const e=JSON.parse(await t.text());if(e.dbVersion===void 0){alert("dbVersion property not found in the file.");return}if(e.dbVersion===0){alert("The file's dbVersion cannot be 0.");return}if(e.dbVersion>w){alert(`The file's dbVersion "${w}" is newer than the current dbVersion.
       Try refreshing the page and importing again. If the issue persists, please contact the developer.`);return}if(e.coffeeBeans===void 0||Array.isArray(e.coffeeBeans)===!1){alert("coffeeBeans array not found.");return}if(e.recipes===void 0||Array.isArray(e.recipes)===!1){alert("recipes array not found.");return}const n=new Map,s=await _();let a=0;for(let o of e.coffeeBeans){o=new A(o,o.id);const r=s.find(k=>k.name.toLowerCase()===o.name.toLowerCase());if(r!==void 0&&r.id===o.id){n.set(o.id,r.id);continue}else if(r!==void 0){n.set(o.id,r.id);continue}const f=await ce(o);if(f==="Failure_NameAlreadyExist")throw alert("Failure_NameAlreadyExist error during importing CoffeeBeans. This shouldn't be possible, sorry. Contact the developer, I guess."),new Error("Failure_NameAlreadyExist");n.set(o.id,f.id),a++}const d=await O();let c=0;for(let o of e.recipes){if(o.timestamp=ne(o.timestamp),o=new P(o,o.id),n.has(o.coffeeBeansId)===!1)throw alert(`Could not find a correct CoffeeBeansId for imported recipe with Id ${o.id}. Sorry, something went wrong.`),new Error("Could not find a correct CoffeeBeansId for an imported recipe.");o.coffeeBeansId=n.get(o.coffeeBeansId),d.find(f=>f.timestamp.getTime()===o.timestamp.getTime()&&f.outWeight===o.outWeight&&f.rating===o.rating&&f.recipeTarget===o.recipeTarget&&f.recipeResult===o.recipeResult&&f.recipeThoughts===o.recipeThoughts&&f.coffeeBeansId===o.coffeeBeansId)===void 0&&(await de(o),c++)}se(`${a} new coffee beans and ${c} new recipes imported.`)}export{A as C,P as R,O as a,Se as b,pe as c,Te as d,Be as e,he as f,_ as g,se as h,De as i,Ie as j,de as k,V as l,be as m,ye as n,ge as o,ne as p,fe as q,ce as r,me as s,le as t,W as u,we as v,Ce as w,Re as x};
