var A=Object.defineProperty;var D=(n,e,t)=>e in n?A(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var i=(n,e,t)=>(D(n,typeof e!="symbol"?e+"":e,t),t),q=(n,e,t)=>{if(!e.has(n))throw TypeError("Cannot "+t)};var o=(n,e,t)=>{if(e.has(n))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(n):e.set(n,t)};var c=(n,e,t)=>(q(n,e,"access private method"),t);const z=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const l of a)if(l.type==="childList")for(const b of l.addedNodes)b.tagName==="LINK"&&b.rel==="modulepreload"&&s(b)}).observe(document,{childList:!0,subtree:!0});function t(a){const l={};return a.integrity&&(l.integrity=a.integrity),a.referrerpolicy&&(l.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?l.credentials="include":a.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(a){if(a.ep)return;a.ep=!0;const l=t(a);fetch(a.href,l)}};z();var u,E,d,f,p,w,g,M,m,L,C,_;const r=class{constructor(e=`.${r.template_placeholder}`,t=document){o(this,u);o(this,d);o(this,p);o(this,g);o(this,m);o(this,C);i(this,"element");i(this,"style");i(this,"classList");const s=c(this,m,L).call(this,e,t);c(this,d,f).call(this,s)?c(this,p,w).call(this,s):this.element=s,c(this,u,E).call(this)}dot(e){for(let t of e)t.length>=2&&t[1]!=""&&this.text(t[0],t[1]),t.length==3&&this.attr(t[0],t[2]);return this}DOM(e=`.${r.template_placeholder}`){return new r(e,this.element)}q(e){return c(this,m,L).call(this,e,this.element)}a(e){return this.element.querySelectorAll(e)}static fromElement(e){var s;const t=new r;return t.element=e,c(s=t,u,E).call(s),t}attr(e,t){this.element.querySelectorAll(e).forEach(s=>c(this,C,_).call(this,s,t))}text(e,t){this.element.querySelectorAll(e).forEach(s=>s.textContent=t)}};let h=r;u=new WeakSet,E=function(){var e,t;this.style=(e=this.element)==null?void 0:e.style,this.classList=(t=this.element)==null?void 0:t.classList},d=new WeakSet,f=function(e){return e==null?void 0:e.classList.contains(r.template_placeholder)},p=new WeakSet,w=function(e){var s;const t=(s=e.lazyParent)!=null?s:e.parentElement;this.element=e.cloneNode(!0),t.append(this.element),c(this,g,M).call(this,e)},g=new WeakSet,M=function(e){c(this,d,f).call(this,this.element)&&this.element.classList.remove(r.template_placeholder),e.lazyParent||(e.lazyParent=e.parentElement),c(this,d,f).call(this,e)&&e.remove()},m=new WeakSet,L=function(e,t){r.CACHE.has(t)||r.CACHE.set(t,new Map);const s=r.CACHE.get(t);return s.has(e)||s.set(e,t.querySelector(e)),s.get(e)},C=new WeakSet,_=function(e,t){for(let s in t){const a=[s,t[s]];r.events.includes(s)?e.addEventListener(...a):e.setAttribute(...a)}},i(h,"template_placeholder","lazydom"),i(h,"events",["click","change"]),i(h,"CACHE",new Map);const v=class{constructor(e){i(this,"today",new Date);i(this,"calendar_date",new Date);i(this,"calrows",6);i(this,"calcols",7);i(this,"cal_size",this.calrows*this.calcols);i(this,"cal_cells",[]);this.calendar=e.DOM(".calendar"),this.month_title=e.DOM(".month"),this.left_btn=this.calendar.q("img.left.btn"),this.right_btn=this.calendar.q("img.right.btn"),this.calendar_date.setDate(1),this.buildCalendar(),this.bindEvents(),this.drawCalendar()}bindEvents(){this.left_btn.addEventListener("click",e=>this.flipCalendar(-1)),this.right_btn.addEventListener("click",e=>this.flipCalendar(1))}flipCalendar(e){this.calendar_date.setMonth(this.calendar_date.getMonth()+e),this.drawCalendar()}buildCalendar(){for(let e=0;e<this.cal_size;e++){const t=this.calendar.DOM();t.element.textContent="99",this.cal_cells.push(t)}}drawCalendar(){this.changeCalTitle();const e=this.lastCalendarDay(),t=this.calendar_date.getDay();for(let s=0;s<this.cal_cells.length;s++){const a=this.cal_cells[s],l=s+1-t;a.element.textContent=l>=1&&l<=e?l:" ",a.classList.remove("today"),this.isCalToday(l)&&a.classList.add("today")}}changeCalTitle(){this.calendar.text(".month",`${this.calendarMonthName()} ${this.calendar_date.getFullYear()}`)}isCalToday(e){return this.calendar_date.getFullYear()==this.today.getFullYear()&&this.calendar_date.getMonth()==this.today.getMonth()&&e==this.today.getDate()}calendarMonthName(){return v.month_names[this.calendar_date.getMonth()]}lastCalendarDay(){return new Date(this.calendar_date.getFullYear(),this.calendar_date.getMonth()+1,0).getDate()}};let y=v;i(y,"month_names",["January","February","March","April","May","June","July","August","September","October","November","December"]);class N{constructor(){i(this,"app",new h("#app"));this.calendar=new y(this.app)}}new N;