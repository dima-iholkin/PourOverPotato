const i={recipe:{recipeTarget:"Recipe target",recipeResult:"Recipe result",recipeThoughts:"My thoughts",outWeight:"Out weight"}};function u(t){const e=t.getTimezoneOffset()*6e4;return new Date(t.getTime()-e).toISOString().slice(0,-8)}function g(t){const e=Date.parse(t);return new Date(e)}function c(t){const e=Math.floor((Date.now()-t.getTime())/1e3);if(Math.floor(e/86400)>=1){const r=new Date;return r.setDate(r.getDate()-1),r.toDateString()===t.toDateString()?"yesterday":t.toLocaleString(void 0,{dateStyle:"short"})}const o=Math.floor(e/3600);if(o>1)return o+" hours ago";if(o===1)return"1 hour ago";const n=Math.floor(e/60);return n>1?n+" minutes ago":"just now"}export{c,u as f,i as n,g as p};
