var c=Object.defineProperty;var u=(s,e,r)=>e in s?c(s,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):s[e]=r;var i=(s,e,r)=>(u(s,typeof e!="symbol"?e+"":e,r),r);const a=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}};a();class f{constructor(){i(this,"buttons",document.querySelectorAll("ul.question li"));i(this,"clickButton",e=>{const r=e.currentTarget,n=e.currentTarget.querySelector(".fulltext");r.classList.toggle("expand"),r.classList.contains("expand")?n.style.maxHeight=`${n.scrollHeight}px`:n.style.maxHeight="0px"});this.buttons.forEach(e=>{if(e.addEventListener("click",this.clickButton),e.classList.contains("expand")){const r=e.querySelector(".fulltext");r.style.maxHeight=`${r.scrollHeight}px`}})}}new f;