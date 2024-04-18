import{s as Oe,j as we,n as Ee}from"./scheduler.vcOl-ZmV.js";import{S as Re,i as Ve,k as je,m as qe,n as ze,q as Ge,o as He,r as Ke,e as h,t as g,s as N,c as v,a as _,b as m,d as f,f as C,z as E,g as G,h as i,j as S,y as Le,F as Fe,A as Me,C as Ue,G as Je}from"./index.Otd-Ubpp.js";import{n as de}from"./naming.kUvCv0xb.js";import{x as Ie}from"./indexedDB.omaGZViy.js";import{C as Qe}from"./NoItemsYetP.NVTdTwxN.js";import{e as We,u as Xe,d as Ye}from"./each.dJ2YfOui.js";import{s as Se,b as Ze,c as $e,d as xe,e as et,f as tt,g as at}from"./PageHeadline.5NItdQjD.js";function Ne(a){let e,t=a[0].rating+"",l,n;return{c(){e=h("p"),l=g(t),n=g("⭐")},l(s){e=v(s,"P",{});var r=_(e);l=m(r,t),n=m(r,"⭐"),r.forEach(f)},m(s,r){G(s,e,r),i(e,l),i(e,n)},p(s,r){r&1&&t!==(t=s[0].rating+"")&&S(l,t)},d(s){s&&f(e)}}}function Ce(a){let e,t=a[0].outWeight+"",l,n;return{c(){e=h("p"),l=g(t),n=g("g ☕")},l(s){e=v(s,"P",{});var r=_(e);l=m(r,t),n=m(r,"g ☕"),r.forEach(f)},m(s,r){G(s,e,r),i(e,l),i(e,n)},p(s,r){r&1&&t!==(t=s[0].outWeight+"")&&S(l,t)},d(s){s&&f(e)}}}function Pe(a){let e,t="❤";return{c(){e=h("p"),e.textContent=t},l(l){e=v(l,"P",{"data-svelte-h":!0}),Le(e)!=="svelte-1hblm8c"&&(e.textContent=t)},m(l,n){G(l,e,n)},d(l){l&&f(e)}}}function lt(a){let e,t,l,n,s=Ie(a[0].timestamp)+"",r,T,c,P,I,A,o,u,B,W,D,pe=de.recipe.recipeTarget+"",x,ee,te,w,H=a[0].recipeTarget+"",U,ae,O,R,ge=de.recipe.recipeResult+"",le,se,re,j,K=a[0].recipeResult+"",J,ie,V,L,me=de.recipe.recipeThoughts+"",ne,oe,ce,q,M=a[0].recipeThoughts+"",Q,k=a[0].rating>0&&Ne(a),b=a[0].outWeight>0&&Ce(a),y=a[0].favorite===!0&&Pe();return{c(){e=h("div"),t=h("div"),l=h("p"),n=g("🕒 "),r=g(s),T=N(),c=h("div"),k&&k.c(),P=N(),b&&b.c(),I=N(),y&&y.c(),A=N(),o=h("h5"),u=g(a[1]),B=N(),W=h("div"),D=h("p"),x=g(pe),ee=g(":"),te=N(),w=h("p"),U=g(H),ae=N(),O=h("div"),R=h("p"),le=g(ge),se=g(":"),re=N(),j=h("p"),J=g(K),ie=N(),V=h("div"),L=h("p"),ne=g(me),oe=g(":"),ce=N(),q=h("p"),Q=g(M),this.h()},l(p){e=v(p,"DIV",{class:!0});var d=_(e);t=v(d,"DIV",{class:!0});var X=_(t);l=v(X,"P",{});var fe=_(l);n=m(fe,"🕒 "),r=m(fe,s),fe.forEach(f),T=C(X),c=v(X,"DIV",{class:!0});var z=_(c);k&&k.l(z),P=C(z),b&&b.l(z),I=C(z),y&&y.l(z),z.forEach(f),X.forEach(f),A=C(d),o=v(d,"H5",{class:!0});var ke=_(o);u=m(ke,a[1]),ke.forEach(f),B=C(d),W=v(d,"DIV",{});var Y=_(W);D=v(Y,"P",{class:!0});var ue=_(D);x=m(ue,pe),ee=m(ue,":"),ue.forEach(f),te=C(Y),w=v(Y,"P",{class:!0});var be=_(w);U=m(be,H),be.forEach(f),Y.forEach(f),ae=C(d),O=v(d,"DIV",{});var Z=_(O);R=v(Z,"P",{class:!0});var he=_(R);le=m(he,ge),se=m(he,":"),he.forEach(f),re=C(Z),j=v(Z,"P",{class:!0});var ye=_(j);J=m(ye,K),ye.forEach(f),Z.forEach(f),ie=C(d),V=v(d,"DIV",{});var $=_(V);L=v($,"P",{class:!0});var ve=_(L);ne=m(ve,me),oe=m(ve,":"),ve.forEach(f),ce=C($),q=v($,"P",{class:!0});var Be=_(q);Q=m(Be,M),Be.forEach(f),$.forEach(f),d.forEach(f),this.h()},h(){E(c,"class","right-header-horizontal svelte-1tak70c"),E(t,"class","header svelte-1tak70c"),E(o,"class","svelte-1tak70c"),E(D,"class","label svelte-1tak70c"),E(w,"class","content svelte-1tak70c"),E(R,"class","label svelte-1tak70c"),E(j,"class","content svelte-1tak70c"),E(L,"class","label svelte-1tak70c"),E(q,"class","content svelte-1tak70c"),E(e,"class","card-content svelte-1tak70c")},m(p,d){G(p,e,d),i(e,t),i(t,l),i(l,n),i(l,r),i(t,T),i(t,c),k&&k.m(c,null),i(c,P),b&&b.m(c,null),i(c,I),y&&y.m(c,null),i(e,A),i(e,o),i(o,u),i(e,B),i(e,W),i(W,D),i(D,x),i(D,ee),i(W,te),i(W,w),i(w,U),i(e,ae),i(e,O),i(O,R),i(R,le),i(R,se),i(O,re),i(O,j),i(j,J),i(e,ie),i(e,V),i(V,L),i(L,ne),i(L,oe),i(V,ce),i(V,q),i(q,Q)},p(p,d){d&1&&s!==(s=Ie(p[0].timestamp)+"")&&S(r,s),p[0].rating>0?k?k.p(p,d):(k=Ne(p),k.c(),k.m(c,P)):k&&(k.d(1),k=null),p[0].outWeight>0?b?b.p(p,d):(b=Ce(p),b.c(),b.m(c,I)):b&&(b.d(1),b=null),p[0].favorite===!0?y||(y=Pe(),y.c(),y.m(c,null)):y&&(y.d(1),y=null),d&2&&S(u,p[1]),d&1&&H!==(H=p[0].recipeTarget+"")&&S(U,H),d&1&&K!==(K=p[0].recipeResult+"")&&S(J,K),d&1&&M!==(M=p[0].recipeThoughts+"")&&S(Q,M)},d(p){p&&f(e),k&&k.d(),b&&b.d(),y&&y.d()}}}function st(a){let e,t;return e=new Qe({props:{href:a[2],$$slots:{default:[lt]},$$scope:{ctx:a}}}),{c(){je(e.$$.fragment)},l(l){qe(e.$$.fragment,l)},m(l,n){ze(e,l,n),t=!0},p(l,[n]){const s={};n&4&&(s.href=l[2]),n&11&&(s.$$scope={dirty:n,ctx:l}),e.$set(s)},i(l){t||(Ge(e.$$.fragment,l),t=!0)},o(l){He(e.$$.fragment,l),t=!1},d(l){Ke(e,l)}}}function rt(a,e,t){let{recipe:l}=e,{coffeeBeansName:n}=e,{href:s}=e;return a.$$set=r=>{"recipe"in r&&t(0,l=r.recipe),"coffeeBeansName"in r&&t(1,n=r.coffeeBeansName),"href"in r&&t(2,s=r.href)},[l,n,s]}class mt extends Re{constructor(e){super(),Ve(this,e,rt,st,Oe,{recipe:0,coffeeBeansName:1,href:2})}}var F=(a=>(a[a.Latest=0]="Latest",a[a.Earliest=1]="Earliest",a[a.BestRating=2]="BestRating",a[a.WorstRating=3]="WorstRating",a[a.BiggerWeight=4]="BiggerWeight",a[a.SmallerWeight=5]="SmallerWeight",a[a.Favorite=6]="Favorite",a))(F||{});function it(a){const e=Ae(a),t=localStorage.getItem(e);if(t===null)return F.Latest;const l=Number.parseInt(t);return Number.isNaN(l)?F.Latest:l in F?l:(console.warn("loadSortOrder function read value from LocalStorage not present in RecipesSortOrderEnum."),F.Latest)}function nt(a,e){const t=Ae(a);localStorage.setItem(t,e)}function Ae(a){return`sortOrder_${a}`}function Te(a,e,t){const l=a.slice();return l[5]=e[t],l}function De(a,e){let t,l=e[5].key+"",n;return{key:a,first:null,c(){t=h("option"),n=g(l),this.h()},l(s){t=v(s,"OPTION",{});var r=_(t);n=m(r,l),r.forEach(f),this.h()},h(){t.__value=e[5].value,Ue(t,t.__value),this.first=t},m(s,r){G(s,t,r),i(t,n)},p(s,r){e=s},d(s){s&&f(t)}}}function ot(a){let e,t,l="Sorted by",n,s,r=[],T=new Map,c,P,I=We(_e);const A=o=>o[5].value;for(let o=0;o<I.length;o+=1){let u=Te(a,I,o),B=A(u);T.set(B,r[o]=De(B,u))}return{c(){e=h("div"),t=h("p"),t.textContent=l,n=N(),s=h("select");for(let o=0;o<r.length;o+=1)r[o].c();this.h()},l(o){e=v(o,"DIV",{class:!0});var u=_(e);t=v(u,"P",{"data-svelte-h":!0}),Le(t)!=="svelte-1ft4ueu"&&(t.textContent=l),n=C(u),s=v(u,"SELECT",{id:!0,name:!0,class:!0});var B=_(s);for(let W=0;W<r.length;W+=1)r[W].l(B);B.forEach(f),u.forEach(f),this.h()},h(){E(s,"id",a[1]),E(s,"name",a[1]),E(s,"class","svelte-b5s4o7"),a[0]===void 0&&we(()=>a[4].call(s)),E(e,"class","select-container svelte-b5s4o7")},m(o,u){G(o,e,u),i(e,t),i(e,n),i(e,s);for(let B=0;B<r.length;B+=1)r[B]&&r[B].m(s,null);Fe(s,a[0],!0),c||(P=Me(s,"change",a[4]),c=!0)},p(o,[u]){u&0&&(I=We(_e),r=Xe(r,u,A,1,o,I,T,s,Ye,De,null,Te)),u&1&&Fe(s,o[0])},i:Ee,o:Ee,d(o){o&&f(e);for(let u=0;u<r.length;u+=1)r[u].d();c=!1,P()}}}const ct="sort-recipes-",_e=[{value:F.Latest,key:"latest",sortOrderFunc:Se},{value:F.Earliest,key:"earliest",sortOrderFunc:Ze},{value:F.Favorite,key:"favorite",sortOrderFunc:$e},{value:F.BestRating,key:"best rating",sortOrderFunc:xe},{value:F.WorstRating,key:"worst rating",sortOrderFunc:et},{value:F.BiggerWeight,key:"more coffee",sortOrderFunc:tt},{value:F.SmallerWeight,key:"less coffee",sortOrderFunc:at}];function ft(a,e,t){let{pageName:l}=e;const n=ct+l;let{sortOrderValue:s}=e,r=it(n);function T(){r=Je(this),t(0,r)}return a.$$set=c=>{"pageName"in c&&t(3,l=c.pageName),"sortOrderValue"in c&&t(2,s=c.sortOrderValue)},a.$$.update=()=>{var c;if(a.$$.dirty&1){const P=((c=_e.find(I=>I.value===r))==null?void 0:c.sortOrderFunc)??Se;t(2,s={value:r,sortOrderFunc:P}),nt(n,r)}},[r,n,s,l,T]}class kt extends Re{constructor(e){super(),Ve(this,e,ft,ot,Oe,{pageName:3,sortOrderValue:2})}}export{mt as R,kt as S};
