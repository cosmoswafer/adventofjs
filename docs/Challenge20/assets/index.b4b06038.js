var z=Object.defineProperty;var S=(s,e,t)=>e in s?z(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var a=(s,e,t)=>(S(s,typeof e!="symbol"?e+"":e,t),t),P=(s,e,t)=>{if(!e.has(s))throw TypeError("Cannot "+t)};var c=(s,e,t)=>{if(e.has(s))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(s):e.set(s,t)};var r=(s,e,t)=>(P(s,e,"access private method"),t);const T=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const v of n.addedNodes)v.tagName==="LINK"&&v.rel==="modulepreload"&&i(v)}).observe(document,{childList:!0,subtree:!0});function t(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerpolicy&&(n.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?n.credentials="include":o.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(o){if(o.ep)return;o.ep=!0;const n=t(o);fetch(o.href,n)}};T();var h,x,p,f,u,A,w,E,m,b,g,C;const l=class{constructor(e=`.${l.template_placeholder}`,t=document){c(this,h);c(this,p);c(this,u);c(this,w);c(this,m);c(this,g);a(this,"element");a(this,"style");a(this,"classList");const i=r(this,m,b).call(this,e,t);r(this,p,f).call(this,i)?r(this,u,A).call(this,i):this.element=i,r(this,h,x).call(this)}dot(...e){for(let t of e){const i=t[0],o=t[1],n=t[2];(t.length>2&&o!=""||t.length==2)&&this.text(i,o),t.length==3&&this.attr(i,n)}return this}DOM(e=`.${l.template_placeholder}`){return new l(e,this.element)}q(e){return r(this,m,b).call(this,e,this.element)}a(e){return this.element.querySelectorAll(e)}static fromElement(e){var i;const t=new l;return t.element=e,r(i=t,h,x).call(i),t}attr(e,t){this.element.querySelectorAll(e).forEach(i=>r(this,g,C).call(this,i,t))}text(e,t){this.element.querySelectorAll(e).forEach(i=>i.textContent=t)}};let d=l;h=new WeakSet,x=function(){var e,t;this.style=(e=this.element)==null?void 0:e.style,this.classList=(t=this.element)==null?void 0:t.classList},p=new WeakSet,f=function(e){return e==null?void 0:e.classList.contains(l.template_placeholder)},u=new WeakSet,A=function(e){var i;const t=(i=e.lazyParent)!=null?i:e.parentElement;this.element=e.cloneNode(!0),t.append(this.element),r(this,w,E).call(this,e)},w=new WeakSet,E=function(e){r(this,p,f).call(this,this.element)&&this.element.classList.remove(l.template_placeholder),e.lazyParent||(e.lazyParent=e.parentElement),r(this,p,f).call(this,e)&&e.remove()},m=new WeakSet,b=function(e,t){l.CACHE.has(t)||l.CACHE.set(t,new Map);const i=l.CACHE.get(t);return i.has(e)||i.set(e,t.querySelector(e)),i.get(e)},g=new WeakSet,C=function(e,t){for(let i in t){const o=[i,t[i]];l.events.includes(i)?e.addEventListener(...o):e.nodeName==="INPUT"&&i==="value"?e.value=t[i]:e.setAttribute(...o)}},a(d,"template_placeholder","lazydom"),a(d,"events",["click","change"]),a(d,"CACHE",new Map);const k=[{id:39,title:"Tech to Look Forward to in 2022",description:"In this episode, Amy and James discuss the future of web development: Astro, Veet, Supabase, SvelteKit, Redwood.js, Blitz.js, GitHub Co-Pilot, Web Assembly, Blockchain, w3, no-code, and low-code.",cover:"cover__episode-39.png",link:"https://www.compressed.fm/episode/39"},{id:38,title:"2021 Gift Guide",description:"This episode is full of picks! Amy and James talk about all of their favorite things, just in time for the holidays.",cover:"cover__episode-38.png",link:"https://www.compressed.fm/episode/38"},{id:37,title:"Building a Course",description:"In this episode, Amy and James discuss all the things that go into course creation: why? What? How? Where to Host? Building the right audience.",cover:"cover__episode-37.png",link:"https://www.compressed.fm/episode/37"},{id:36,title:"SVGs FTW",description:"In this episode, Amy and James discuss all things SVGs: what is, why and when to reach for it, and seven different ways to get an SVG on the page, and the pros and cons of each method.",cover:"cover__episode-36.png",link:"https://www.compressed.fm/episode/36"},{id:35,title:"Crossover Episode with Purrfect Dev",description:"This is a crossover episode with our friends, Alex Patterson and Brittney Postma from the Purrfect.dev podcast. In this episode, we all discuss our jobs. Even though we're all in tech, our day- to - day work looks vastly different.",cover:"cover__episode-35.png",link:"https://www.compressed.fm/episode/35"},{id:34,title:"Getting git",description:"In this episode, Amy and James explain the fundamentals of git and their most-used commands. They also explain basic different workflows, if you're working with a team or by yourself.",cover:"cover__episode-34.png",link:"https://www.compressed.fm/episode/34"},{id:33,title:"Small Design Tweaks that Make All the Difference",description:"In this episode, Amy and James talk about small design tweaks that you can make that will make a big difference. These recommendations are helpful if you're looking for basic principles and guidelines to take your site to the next level.",cover:"cover__episode-33.png",link:"https://www.compressed.fm/episode/33"}];var y,L;class I{constructor(){c(this,y);a(this,"tocUl",new d("aside ul.toc"));a(this,"mainContents",new d("main .columns"));console.log({episodes:k}),r(this,y,L).call(this);const e=this.tocUl.q("li");e!=null&&e.click()}selectToc(e){this.tocUl.a(".selected").forEach(i=>i.classList.remove("selected")),e.classList.add("selected")}updateContents(e){this.mainContents.dot([".cover","",{src:e.cover}],[".title",e.title],[".summary",e.summary],["a","",{href:e.moreLink}])}}y=new WeakSet,L=function(){for(const e of k){const t=this.tocUl.DOM();t.dot([".episode",`Episode ${e.id}`],[".title",e.title]),t.element.addEventListener("click",()=>{this.selectToc(t.element),this.updateContents({episode:`Episode ${e.id}`,title:e.title,cover:`images/${e.cover}`,summary:e.description,moreLink:e.link})})}};new I;