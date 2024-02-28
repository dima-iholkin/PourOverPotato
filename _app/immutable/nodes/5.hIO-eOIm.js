import{s as R,d as xt,e as _t,n as w,r as bt,o as $t}from"../chunks/scheduler.c6D-u3vw.js";import{S as Y,i as J,y as Ct,e as h,s as b,k as U,c as x,a as S,z as C,f as $,d as i,m as V,x as m,g as d,h as y,n as q,A as F,q as L,o as G,r as z,t as vt,b as ht,D as it,v as pt,j as kt,l as yt}from"../chunks/index.uR5eFXUy.js";import{g as gt}from"../chunks/entry.XX61WLYJ.js";import{v as wt,h as ot,w as Dt,x as Pt}from"../chunks/indexedDB.Q_ZGv_fi.js";import{r as Tt}from"../chunks/routes.r-Xq-va3.js";import{D as Et}from"../chunks/DeleteConfirmationModal.ToFQCbZe.js";function It(u){let t;return{c(){t=vt("Please confirm you want to delete all your data.")},l(e){t=ht(e,"Please confirm you want to delete all your data.")},m(e,a){d(e,t,a)},d(e){e&&i(t)}}}function Mt(u){let t,e,a="Delete all data:",c,s,f="Delete all data",o,n,p,r,g,K;function N(_){u[3](_)}let D={onDeleteClick:u[1],$$slots:{default:[It]},$$scope:{ctx:u}};return u[0]!==void 0&&(D.setModalState=u[0]),n=new Et({props:D}),xt.push(()=>Ct(n,"setModalState",N)),{c(){t=h("div"),e=h("p"),e.textContent=a,c=b(),s=h("button"),s.textContent=f,o=b(),U(n.$$.fragment),this.h()},l(_){t=x(_,"DIV",{class:!0});var k=S(t);e=x(k,"P",{"data-svelte-h":!0}),C(e)!=="svelte-15f4b12"&&(e.textContent=a),c=$(k),s=x(k,"BUTTON",{class:!0,type:!0,"data-svelte-h":!0}),C(s)!=="svelte-14fbba6"&&(s.textContent=f),k.forEach(i),o=$(_),V(n.$$.fragment,_),this.h()},h(){m(s,"class","button-delete svelte-1m69evr"),m(s,"type","button"),m(t,"class","container svelte-1m69evr")},m(_,k){d(_,t,k),y(t,e),y(t,c),y(t,s),d(_,o,k),q(n,_,k),r=!0,g||(K=F(s,"click",u[2]),g=!0)},p(_,[k]){const P={};k&16&&(P.$$scope={dirty:k,ctx:_}),!p&&k&1&&(p=!0,P.setModalState=_[0],_t(()=>p=!1)),n.$set(P)},i(_){r||(L(n.$$.fragment,_),r=!0)},o(_){G(n.$$.fragment,_),r=!1},d(_){_&&(i(t),i(o)),z(n,_),g=!1,K()}}}function Bt(u,t,e){let a;async function c(){await wt(),ot("All data deleted."),gt(Tt.home)}const s=()=>a("open");function f(o){a=o,e(0,a)}return[a,c,s,f]}class jt extends Y{constructor(t){super(),J(this,t,Bt,Mt,R,{})}}function At(u){let t,e,a="Add toast",c,s,f="Add long toast",o,n;return{c(){t=h("div"),e=h("button"),e.textContent=a,c=b(),s=h("button"),s.textContent=f,this.h()},l(p){t=x(p,"DIV",{class:!0});var r=S(t);e=x(r,"BUTTON",{type:!0,class:!0,"data-svelte-h":!0}),C(e)!=="svelte-f2ypqv"&&(e.textContent=a),c=$(r),s=x(r,"BUTTON",{type:!0,class:!0,"data-svelte-h":!0}),C(s)!=="svelte-17rhmuo"&&(s.textContent=f),r.forEach(i),this.h()},h(){m(e,"type","button"),m(e,"class","svelte-16i7r5r"),m(s,"type","button"),m(s,"class","svelte-16i7r5r"),m(t,"class","container svelte-16i7r5r")},m(p,r){d(p,t,r),y(t,e),y(t,c),y(t,s),o||(n=[F(e,"click",u[0]),F(s,"click",u[1])],o=!0)},p:w,i:w,o:w,d(p){p&&i(t),o=!1,bt(n)}}}function Ht(u){return[()=>ot("Ethiopia Gesha"),()=>ot("Yirgacheffe Sidamo El Refugio Cafe De Mujeres Mabanza Aricha Kegwa")]}class Ot extends Y{constructor(t){super(),J(this,t,Ht,At,R,{})}}function St(u){let t,e,a="Export all data:",c,s,f="Export to file",o,n;return{c(){t=h("div"),e=h("p"),e.textContent=a,c=b(),s=h("button"),s.textContent=f,this.h()},l(p){t=x(p,"DIV",{class:!0});var r=S(t);e=x(r,"P",{style:!0,"data-svelte-h":!0}),C(e)!=="svelte-6a1m9a"&&(e.textContent=a),c=$(r),s=x(r,"BUTTON",{type:!0,class:!0,"data-svelte-h":!0}),C(s)!=="svelte-1rmfvr0"&&(s.textContent=f),r.forEach(i),this.h()},h(){it(e,"margin-right","0.5rem"),m(s,"type","button"),m(s,"class","svelte-10kv6sm"),m(t,"class","container svelte-10kv6sm")},m(p,r){d(p,t,r),y(t,e),y(t,c),y(t,s),o||(n=F(s,"click",u[0]),o=!0)},p:w,i:w,o:w,d(p){p&&i(t),o=!1,n()}}}function Nt(u){async function t(){const e=document.createElement("a"),a=await Dt();e.href=URL.createObjectURL(a),e.setAttribute("download","PourOverPotato.json"),document.body.appendChild(e),e.click(),document.body.removeChild(e)}return[t]}class Ut extends Y{constructor(t){super(),J(this,t,Nt,St,R,{})}}function Vt(u){let t,e,a="Import data:",c,s,f="Import from file",o,n;return{c(){t=h("div"),e=h("p"),e.textContent=a,c=b(),s=h("button"),s.textContent=f,this.h()},l(p){t=x(p,"DIV",{class:!0});var r=S(t);e=x(r,"P",{style:!0,"data-svelte-h":!0}),C(e)!=="svelte-1jemb82"&&(e.textContent=a),c=$(r),s=x(r,"BUTTON",{class:!0,"data-svelte-h":!0}),C(s)!=="svelte-1u0f5a8"&&(s.textContent=f),r.forEach(i),this.h()},h(){it(e,"margin-right","0.5rem"),m(s,"class","svelte-1uvboly"),m(t,"class","container svelte-1uvboly")},m(p,r){d(p,t,r),y(t,e),y(t,c),y(t,s),o||(n=F(s,"click",u[0]),o=!0)},p:w,i:w,o:w,d(p){p&&i(t),o=!1,n()}}}function qt(u){async function t(){const e=document.createElement("input");e.type="file",e.onchange=async()=>{if(e.files===null||e.files.item(0)===void 0||e.files.item(0)===null){alert("Please provide a single file.");return}if(e.files.length>1){alert("Please provide a single file.");return}const a=e.files.item(0);if(a.type!=="application/json"){alert("Please provide a JSON file.");return}await Pt(a)},e.click()}return[t]}class Lt extends Y{constructor(t){super(),J(this,t,qt,Vt,R,{})}}function Gt(u){let t,e,a,c,s,f=u[0]===!1&&mt(u);return{c(){t=h("p"),e=vt(u[0]),c=b(),f&&f.c(),s=pt(),this.h()},l(o){t=x(o,"P",{class:!0,style:!0});var n=S(t);e=ht(n,u[0]),n.forEach(i),c=$(o),f&&f.l(o),s=pt(),this.h()},h(){m(t,"class",a=u[0]?"text-green-500":"text-red-700"),it(t,"font-weight","bold")},m(o,n){d(o,t,n),y(t,e),d(o,c,n),f&&f.m(o,n),d(o,s,n)},p(o,n){n&1&&kt(e,o[0]),n&1&&a!==(a=o[0]?"text-green-500":"text-red-700")&&m(t,"class",a),o[0]===!1?f?f.p(o,n):(f=mt(o),f.c(),f.m(s.parentNode,s)):f&&(f.d(1),f=null)},d(o){o&&(i(t),i(c),i(s)),f&&f.d(o)}}}function zt(u){let t,e="loading...";return{c(){t=h("p"),t.textContent=e},l(a){t=x(a,"P",{"data-svelte-h":!0}),C(t)!=="svelte-qeejp2"&&(t.textContent=e)},m(a,c){d(a,t,c)},p:w,d(a){a&&i(t)}}}function mt(u){let t,e="Enable",a,c;return{c(){t=h("button"),t.textContent=e,this.h()},l(s){t=x(s,"BUTTON",{type:!0,class:!0,"data-svelte-h":!0}),C(t)!=="svelte-105jgsy"&&(t.textContent=e),this.h()},h(){m(t,"type","button"),m(t,"class","svelte-1p6ta5y")},m(s,f){d(s,t,f),a||(c=F(t,"click",u[1]),a=!0)},p:w,d(s){s&&i(t),a=!1,c()}}}function Ft(u){let t,e,a="Persistent storage enabled:",c,s;function f(p,r){return p[0]===void 0?zt:Gt}let o=f(u),n=o(u);return{c(){t=h("div"),e=h("p"),e.textContent=a,c=b(),s=h("div"),n.c(),this.h()},l(p){t=x(p,"DIV",{class:!0});var r=S(t);e=x(r,"P",{style:!0,"data-svelte-h":!0}),C(e)!=="svelte-11igao6"&&(e.textContent=a),c=$(r),s=x(r,"DIV",{class:!0,style:!0});var g=S(s);n.l(g),g.forEach(i),r.forEach(i),this.h()},h(){it(e,"margin-right","0.5rem"),m(s,"class","container-row-nowrap svelte-1p6ta5y"),m(s,"style",""),m(t,"class","container svelte-1p6ta5y")},m(p,r){d(p,t,r),y(t,e),y(t,c),y(t,s),n.m(s,null)},p(p,[r]){o===(o=f(p))&&n?n.p(p,r):(n.d(1),n=o(p),n&&(n.c(),n.m(s,null)))},i:w,o:w,d(p){p&&i(t),n.d()}}}function Rt(u,t,e){let a;$t(async()=>{e(0,a=await navigator.storage.persisted())});async function c(){await navigator.storage.persist()==!1?alert("Sorry, your browser refused to enable persistent storage. It means your data is still at risk of being evicted at any moment by the browser. Try using Firefox browser, it seems to be the only browser to allow enabling persistent storage always."):(ot("Persistent storage enabled."),e(0,a=!0))}return[a,c]}class Yt extends Y{constructor(t){super(),J(this,t,Rt,Ft,R,{})}}function Jt(u){let t,e,a="About app",c,s,f=`<p class="svelte-e9ehkx">It&#39;s an open-source application developed
    <a href="https://github.com/dima-iholkin/PourOverPotato" class="svelte-e9ehkx">on GitHub</a>.</p> <p class="svelte-e9ehkx">You can view the development process on the
    <a href="https://github.com/users/dima-iholkin/projects/5/views/1" class="svelte-e9ehkx">Projects page</a>.</p> <p class="svelte-e9ehkx">You can influence the work at the project&#39;s GitHub or just contact me.</p>`,o,n,p="About your data",r,g,K=`<p class="svelte-e9ehkx">Currently all data is saved only in the user&#39;s browser and is not sent anywhere. Later I want to add an ability to
    import and export data to a file, and sync data with Google Drive.</p> <p class="svelte-e9ehkx">This is not a finilized version of the application. Things may change and data integrity is not guaranteed, however
    I&#39;ll try hard to not break you data.</p>`,N,D,_="Manage your data",k,P,Q,j,W,A,X,E,rt="Delete your data",Z,H,tt,I,ut="Credits",et,M,ct="The coffee beans icon",lt,T,ft="created by Freepik - Flaticon",st,B,dt="Developer tools",nt,O,at;return P=new Yt({}),j=new Ut({}),A=new Lt({}),H=new jt({}),O=new Ot({}),{c(){t=b(),e=h("h5"),e.textContent=a,c=b(),s=h("div"),s.innerHTML=f,o=b(),n=h("h5"),n.textContent=p,r=b(),g=h("div"),g.innerHTML=K,N=b(),D=h("h5"),D.textContent=_,k=b(),U(P.$$.fragment),Q=b(),U(j.$$.fragment),W=b(),U(A.$$.fragment),X=b(),E=h("h5"),E.textContent=rt,Z=b(),U(H.$$.fragment),tt=b(),I=h("h5"),I.textContent=ut,et=b(),M=h("p"),M.textContent=ct,lt=b(),T=h("a"),T.textContent=ft,st=b(),B=h("h5"),B.textContent=dt,nt=b(),U(O.$$.fragment),this.h()},l(l){yt("svelte-1tq7k8",document.head).forEach(i),t=$(l),e=x(l,"H5",{class:!0,"data-svelte-h":!0}),C(e)!=="svelte-g523m9"&&(e.textContent=a),c=$(l),s=x(l,"DIV",{class:!0,"data-svelte-h":!0}),C(s)!=="svelte-7le8db"&&(s.innerHTML=f),o=$(l),n=x(l,"H5",{class:!0,"data-svelte-h":!0}),C(n)!=="svelte-belckq"&&(n.textContent=p),r=$(l),g=x(l,"DIV",{class:!0,"data-svelte-h":!0}),C(g)!=="svelte-189ij8d"&&(g.innerHTML=K),N=$(l),D=x(l,"H5",{class:!0,"data-svelte-h":!0}),C(D)!=="svelte-a9xi76"&&(D.textContent=_),k=$(l),V(P.$$.fragment,l),Q=$(l),V(j.$$.fragment,l),W=$(l),V(A.$$.fragment,l),X=$(l),E=x(l,"H5",{class:!0,"data-svelte-h":!0}),C(E)!=="svelte-lt73ae"&&(E.textContent=rt),Z=$(l),V(H.$$.fragment,l),tt=$(l),I=x(l,"H5",{class:!0,"data-svelte-h":!0}),C(I)!=="svelte-rvnewg"&&(I.textContent=ut),et=$(l),M=x(l,"P",{class:!0,"data-svelte-h":!0}),C(M)!=="svelte-oigu97"&&(M.textContent=ct),lt=$(l),T=x(l,"A",{href:!0,title:!0,class:!0,"data-svelte-h":!0}),C(T)!=="svelte-km7dmi"&&(T.textContent=ft),st=$(l),B=x(l,"H5",{class:!0,"data-svelte-h":!0}),C(B)!=="svelte-4eqdct"&&(B.textContent=dt),nt=$(l),V(O.$$.fragment,l),this.h()},h(){document.title="Other - PourOverPotato app",m(e,"class","page-headline svelte-e9ehkx"),m(s,"class","about-section svelte-e9ehkx"),m(n,"class","svelte-e9ehkx"),m(g,"class","about-section svelte-e9ehkx"),m(D,"class","svelte-e9ehkx"),m(E,"class","svelte-e9ehkx"),m(I,"class","svelte-e9ehkx"),m(M,"class","svelte-e9ehkx"),m(T,"href","https://www.flaticon.com/free-icons/coffee-beans"),m(T,"title","coffee beans icons"),m(T,"class","svelte-e9ehkx"),m(B,"class","svelte-e9ehkx")},m(l,v){d(l,t,v),d(l,e,v),d(l,c,v),d(l,s,v),d(l,o,v),d(l,n,v),d(l,r,v),d(l,g,v),d(l,N,v),d(l,D,v),d(l,k,v),q(P,l,v),d(l,Q,v),q(j,l,v),d(l,W,v),q(A,l,v),d(l,X,v),d(l,E,v),d(l,Z,v),q(H,l,v),d(l,tt,v),d(l,I,v),d(l,et,v),d(l,M,v),d(l,lt,v),d(l,T,v),d(l,st,v),d(l,B,v),d(l,nt,v),q(O,l,v),at=!0},p:w,i(l){at||(L(P.$$.fragment,l),L(j.$$.fragment,l),L(A.$$.fragment,l),L(H.$$.fragment,l),L(O.$$.fragment,l),at=!0)},o(l){G(P.$$.fragment,l),G(j.$$.fragment,l),G(A.$$.fragment,l),G(H.$$.fragment,l),G(O.$$.fragment,l),at=!1},d(l){l&&(i(t),i(e),i(c),i(s),i(o),i(n),i(r),i(g),i(N),i(D),i(k),i(Q),i(W),i(X),i(E),i(Z),i(tt),i(I),i(et),i(M),i(lt),i(T),i(st),i(B),i(nt)),z(P,l),z(j,l),z(A,l),z(H,l),z(O,l)}}}class ee extends Y{constructor(t){super(),J(this,t,null,Jt,R,{})}}export{ee as component};
