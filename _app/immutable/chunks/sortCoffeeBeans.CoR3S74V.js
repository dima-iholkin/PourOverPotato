function t(e,r){return e.name<r.name?-1:e.name>r.name?1:0}function s(e,r){return-t(e,r)}function n(e,r){return e.latestRecipeTimestamp===r.latestRecipeTimestamp?t(e,r):e.latestRecipeTimestamp===void 0?1:r.latestRecipeTimestamp===void 0?-1:r.latestRecipeTimestamp.getTime()-e.latestRecipeTimestamp.getTime()}function a(e,r){return e.latestRecipeTimestamp===r.latestRecipeTimestamp?t(e,r):e.earliestRecipeTimestamp===void 0?1:r.earliestRecipeTimestamp===void 0?-1:e.earliestRecipeTimestamp.getTime()-r.earliestRecipeTimestamp.getTime()}function i(e,r){return e.recipeCount===r.recipeCount?t(e,r):r.recipeCount-e.recipeCount}function p(e,r){return e.recipeCount===r.recipeCount?t(e,r):e.recipeCount-r.recipeCount}export{s as a,n as b,a as c,i as d,p as e,t as s};
