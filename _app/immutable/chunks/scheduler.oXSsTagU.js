function x(){}function w(t,n){for(const e in n)t[e]=n[e];return t}function E(t){return t()}function A(){return Object.create(null)}function j(t){t.forEach(E)}function F(t){return typeof t=="function"}function P(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}let i;function S(t,n){return t===n?!0:(i||(i=document.createElement("a")),i.href=n,t===i.href)}function U(t){return Object.keys(t).length===0}function q(t,...n){if(t==null){for(const c of n)c(void 0);return x}const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function B(t,n,e){t.$$.on_destroy.push(q(n,e))}function C(t,n,e,c){if(t){const r=y(t,n,e,c);return t[0](r)}}function y(t,n,e,c){return t[1]&&c?w(e.ctx.slice(),t[1](c(n))):e.ctx}function D(t,n,e,c){if(t[2]&&c){const r=t[2](c(e));if(n.dirty===void 0)return r;if(typeof r=="object"){const a=[],_=Math.max(n.dirty.length,r.length);for(let s=0;s<_;s+=1)a[s]=n.dirty[s]|r[s];return a}return n.dirty|r}return n.dirty}function G(t,n,e,c,r,a){if(r){const _=y(n,e,c,a);t.p(_,r)}}function H(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let c=0;c<e;c++)n[c]=-1;return n}return-1}function I(t){return t??""}let f;function h(t){f=t}function m(){if(!f)throw new Error("Function called outside component initialization");return f}function J(t){m().$$.on_mount.push(t)}function K(t){m().$$.after_update.push(t)}function L(t,n){const e=t.$$.callbacks[n.type];e&&e.slice().forEach(c=>c.call(this,n))}const l=[],g=[];let u=[];const p=[],k=Promise.resolve();let b=!1;function O(){b||(b=!0,k.then(z))}function N(){return O(),k}function v(t){u.push(t)}function Q(t){p.push(t)}const d=new Set;let o=0;function z(){if(o!==0)return;const t=f;do{try{for(;o<l.length;){const n=l[o];o++,h(n),M(n.$$)}}catch(n){throw l.length=0,o=0,n}for(h(null),l.length=0,o=0;g.length;)g.pop()();for(let n=0;n<u.length;n+=1){const e=u[n];d.has(e)||(d.add(e),e())}u.length=0}while(l.length);for(;p.length;)p.pop()();b=!1,d.clear(),h(t)}function M(t){if(t.fragment!==null){t.update(),j(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(v)}}function R(t){const n=[],e=[];u.forEach(c=>t.indexOf(c)===-1?n.push(c):e.push(c)),e.forEach(c=>c()),u=n}export{Q as A,C as a,D as b,B as c,K as d,g as e,A as f,H as g,z as h,F as i,U as j,v as k,R as l,f as m,x as n,J as o,h as p,E as q,j as r,P as s,N as t,G as u,l as v,O as w,S as x,I as y,L as z};
