/*! 版权所有，翻版必究 */!function(e){var t=window.webpackHotUpdate;window.webpackHotUpdate=function(e,n){!function(e,t){if(!O[e]||!w[e])return;for(var n in w[e]=!1,t)Object.prototype.hasOwnProperty.call(t,n)&&(h[n]=t[n]);0==--g&&0===b&&D()}(e,n),t&&t(e,n)};var n,r=!0,o="e95f42720dc08d121ffc",i={},a=[],c=[];function s(e){var t=H[e];if(!t)return S;var r=function(r){return t.hot.active?(H[r]?-1===H[r].parents.indexOf(e)&&H[r].parents.push(e):(a=[e],n=r),-1===t.children.indexOf(r)&&t.children.push(r)):(console.warn("[HMR] unexpected require("+r+") from disposed module "+e),a=[]),S(r)},o=function(e){return{configurable:!0,enumerable:!0,get:function(){return S[e]},set:function(t){S[e]=t}}};for(var i in S)Object.prototype.hasOwnProperty.call(S,i)&&"e"!==i&&"t"!==i&&Object.defineProperty(r,i,o(i));return r.e=function(e){return"ready"===u&&f("prepare"),b++,S.e(e).then(t,(function(e){throw t(),e}));function t(){b--,"prepare"===u&&(m[e]||x(e),0===b&&0===g&&D())}},r.t=function(e,t){return 1&t&&(e=r(e)),S.t(e,-2&t)},r}function d(t){var r={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_selfInvalidated:!1,_disposeHandlers:[],_main:n!==t,active:!0,accept:function(e,t){if(void 0===e)r._selfAccepted=!0;else if("function"==typeof e)r._selfAccepted=e;else if("object"==typeof e)for(var n=0;n<e.length;n++)r._acceptedDependencies[e[n]]=t||function(){};else r._acceptedDependencies[e]=t||function(){}},decline:function(e){if(void 0===e)r._selfDeclined=!0;else if("object"==typeof e)for(var t=0;t<e.length;t++)r._declinedDependencies[e[t]]=!0;else r._declinedDependencies[e]=!0},dispose:function(e){r._disposeHandlers.push(e)},addDisposeHandler:function(e){r._disposeHandlers.push(e)},removeDisposeHandler:function(e){var t=r._disposeHandlers.indexOf(e);t>=0&&r._disposeHandlers.splice(t,1)},invalidate:function(){switch(this._selfInvalidated=!0,u){case"idle":(h={})[t]=e[t],f("ready");break;case"ready":P(t);break;case"prepare":case"check":case"dispose":case"apply":(v=v||[]).push(t)}},check:_,apply:E,status:function(e){if(!e)return u;l.push(e)},addStatusHandler:function(e){l.push(e)},removeStatusHandler:function(e){var t=l.indexOf(e);t>=0&&l.splice(t,1)},data:i[t]};return n=void 0,r}var l=[],u="idle";function f(e){u=e;for(var t=0;t<l.length;t++)l[t].call(null,e)}var p,h,y,v,g=0,b=0,m={},w={},O={};function k(e){return+e+""===e?+e:e}function _(e){if("idle"!==u)throw new Error("check() is only allowed in idle status");return r=e,f("check"),(t=1e4,t=t||1e4,new Promise((function(e,n){if("undefined"==typeof XMLHttpRequest)return n(new Error("No browser support"));try{var r=new XMLHttpRequest,i=S.p+""+o+".hot-update.json";r.open("GET",i,!0),r.timeout=t,r.send(null)}catch(e){return n(e)}r.onreadystatechange=function(){if(4===r.readyState)if(0===r.status)n(new Error("Manifest request to "+i+" timed out."));else if(404===r.status)e();else if(200!==r.status&&304!==r.status)n(new Error("Manifest request to "+i+" failed."));else{try{var t=JSON.parse(r.responseText)}catch(e){return void n(e)}e(t)}}}))).then((function(e){if(!e)return f(j()?"ready":"idle"),null;w={},m={},O=e.c,y=e.h,f("prepare");var t=new Promise((function(e,t){p={resolve:e,reject:t}}));h={};return x(0),"prepare"===u&&0===b&&0===g&&D(),t}));var t}function x(e){O[e]?(w[e]=!0,g++,function(e){var t=document.createElement("script");t.charset="utf-8",t.src=S.p+""+e+"."+o+".hot-update.js",document.head.appendChild(t)}(e)):m[e]=!0}function D(){f("ready");var e=p;if(p=null,e)if(r)Promise.resolve().then((function(){return E(r)})).then((function(t){e.resolve(t)}),(function(t){e.reject(t)}));else{var t=[];for(var n in h)Object.prototype.hasOwnProperty.call(h,n)&&t.push(k(n));e.resolve(t)}}function E(t){if("ready"!==u)throw new Error("apply() is only allowed in ready status");return function t(r){var c,s,d,l,u;function p(e){for(var t=[e],n={},r=t.map((function(e){return{chain:[e],id:e}}));r.length>0;){var o=r.pop(),i=o.id,a=o.chain;if((l=H[i])&&(!l.hot._selfAccepted||l.hot._selfInvalidated)){if(l.hot._selfDeclined)return{type:"self-declined",chain:a,moduleId:i};if(l.hot._main)return{type:"unaccepted",chain:a,moduleId:i};for(var c=0;c<l.parents.length;c++){var s=l.parents[c],d=H[s];if(d){if(d.hot._declinedDependencies[i])return{type:"declined",chain:a.concat([s]),moduleId:i,parentId:s};-1===t.indexOf(s)&&(d.hot._acceptedDependencies[i]?(n[s]||(n[s]=[]),g(n[s],[i])):(delete n[s],t.push(s),r.push({chain:a.concat([s]),id:s})))}}}}return{type:"accepted",moduleId:e,outdatedModules:t,outdatedDependencies:n}}function g(e,t){for(var n=0;n<t.length;n++){var r=t[n];-1===e.indexOf(r)&&e.push(r)}}j();var b={},m=[],w={},_=function(){console.warn("[HMR] unexpected require("+D.moduleId+") to disposed module")};for(var x in h)if(Object.prototype.hasOwnProperty.call(h,x)){var D;u=k(x),D=h[x]?p(u):{type:"disposed",moduleId:x};var E=!1,P=!1,M=!1,I="";switch(D.chain&&(I="\nUpdate propagation: "+D.chain.join(" -> ")),D.type){case"self-declined":r.onDeclined&&r.onDeclined(D),r.ignoreDeclined||(E=new Error("Aborted because of self decline: "+D.moduleId+I));break;case"declined":r.onDeclined&&r.onDeclined(D),r.ignoreDeclined||(E=new Error("Aborted because of declined dependency: "+D.moduleId+" in "+D.parentId+I));break;case"unaccepted":r.onUnaccepted&&r.onUnaccepted(D),r.ignoreUnaccepted||(E=new Error("Aborted because "+u+" is not accepted"+I));break;case"accepted":r.onAccepted&&r.onAccepted(D),P=!0;break;case"disposed":r.onDisposed&&r.onDisposed(D),M=!0;break;default:throw new Error("Unexception type "+D.type)}if(E)return f("abort"),Promise.reject(E);if(P)for(u in w[u]=h[u],g(m,D.outdatedModules),D.outdatedDependencies)Object.prototype.hasOwnProperty.call(D.outdatedDependencies,u)&&(b[u]||(b[u]=[]),g(b[u],D.outdatedDependencies[u]));M&&(g(m,[D.moduleId]),w[u]=_)}var A,N=[];for(s=0;s<m.length;s++)u=m[s],H[u]&&H[u].hot._selfAccepted&&w[u]!==_&&!H[u].hot._selfInvalidated&&N.push({module:u,parents:H[u].parents.slice(),errorHandler:H[u].hot._selfAccepted});f("dispose"),Object.keys(O).forEach((function(e){!1===O[e]&&function(e){delete installedChunks[e]}(e)}));var L,T,V=m.slice();for(;V.length>0;)if(u=V.pop(),l=H[u]){var R={},$=l.hot._disposeHandlers;for(d=0;d<$.length;d++)(c=$[d])(R);for(i[u]=R,l.hot.active=!1,delete H[u],delete b[u],d=0;d<l.children.length;d++){var B=H[l.children[d]];B&&((A=B.parents.indexOf(u))>=0&&B.parents.splice(A,1))}}for(u in b)if(Object.prototype.hasOwnProperty.call(b,u)&&(l=H[u]))for(T=b[u],d=0;d<T.length;d++)L=T[d],(A=l.children.indexOf(L))>=0&&l.children.splice(A,1);f("apply"),void 0!==y&&(o=y,y=void 0);for(u in h=void 0,w)Object.prototype.hasOwnProperty.call(w,u)&&(e[u]=w[u]);var C=null;for(u in b)if(Object.prototype.hasOwnProperty.call(b,u)&&(l=H[u])){T=b[u];var U=[];for(s=0;s<T.length;s++)if(L=T[s],c=l.hot._acceptedDependencies[L]){if(-1!==U.indexOf(c))continue;U.push(c)}for(s=0;s<U.length;s++){c=U[s];try{c(T)}catch(e){r.onErrored&&r.onErrored({type:"accept-errored",moduleId:u,dependencyId:T[s],error:e}),r.ignoreErrored||C||(C=e)}}}for(s=0;s<N.length;s++){var q=N[s];u=q.module,a=q.parents,n=u;try{S(u)}catch(e){if("function"==typeof q.errorHandler)try{q.errorHandler(e)}catch(t){r.onErrored&&r.onErrored({type:"self-accept-error-handler-errored",moduleId:u,error:t,originalError:e}),r.ignoreErrored||C||(C=t),C||(C=e)}else r.onErrored&&r.onErrored({type:"self-accept-errored",moduleId:u,error:e}),r.ignoreErrored||C||(C=e)}}if(C)return f("fail"),Promise.reject(C);if(v)return t(r).then((function(e){return m.forEach((function(t){e.indexOf(t)<0&&e.push(t)})),e}));return f("idle"),new Promise((function(e){e(m)}))}(t=t||{})}function j(){if(v)return h||(h={}),v.forEach(P),v=void 0,!0}function P(t){Object.prototype.hasOwnProperty.call(h,t)||(h[t]=e[t])}var H={};function S(t){if(H[t])return H[t].exports;var n=H[t]={i:t,l:!1,exports:{},hot:d(t),parents:(c=a,a=[],c),children:[]};return e[t].call(n.exports,n,n.exports,s(t)),n.l=!0,n.exports}S.m=e,S.c=H,S.d=function(e,t,n){S.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},S.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},S.t=function(e,t){if(1&t&&(e=S(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(S.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)S.d(n,r,function(t){return e[t]}.bind(null,r));return n},S.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return S.d(t,"a",t),t},S.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},S.p="",S.h=function(){return o},s(1)(S.s=1)}([function(e,t){const n="background:rgba(0, 185, 119,0.2) !important;white-space: break-spaces;";e.exports={KeyId:"data-hightlight-id",TranslateRe:/&(nbsp);/g,ReWord:/^[a-zA-Z]*$/,DefineClass:"hight-lignt-input",NodeName:["B","I","SPAN","EM"],RegMobile:/Android|iPhone|BlackBerry|BB10|Opera Mini|Phone|Mobile|Silk|Windows Phone|Mobile(?:.+)Firefox\b/i,EventType:{click:"click"},ReSearch:"reSearch",DefineStyle:n,DefineSpan:function(e){return`<span style ="${n}" >${e}</span>`}}},function(e,t,n){"use strict";n.r(t);var r=n(0);function o(e,t,n){e.addEventListener(t,e=>{n(e),function(e){var t=e||window.event;t&&t.stopPropagation?t.stopPropagation():t.cancelBubble=!0}(e)})}function i(e){const t=e?e.nodeName:null;return t?r.NodeName.indexOf(t)>-1?function e(t){const n=t.parentNode,o=n.nodeName;if(r.NodeName.indexOf(o)>-1)return e(n);return n}(e):e:null}function a(e){let t=e.getAttribute(r.KeyId)||null;return t||(t=(1e7*Math.random()).toString(16).substr(0,4)+"-"+(new Date).getTime()+"-"+Math.random().toString().substr(2,5),e.setAttribute(r.KeyId,t)),{key:t,current:e}}function c(e,t){return new Promise((n,o)=>{(function(e,t){return new Promise((n,r)=>{const{key:o,current:i}=a(e);let c=i.innerHTML||"",s=i.innerText||"";t&&(t.id===o?(c=t.oldValue,s=t.text):function(e){e&&(e.target.innerHTML=e.oldValue)}(t)),n({current:i,html:c,text:s,key:o})})})(e,t).then(({current:e,html:i,text:a,key:c})=>{new Promise((e,t)=>{const n=window.getSelection();if("Range"===n.type)t();else if("Caret"===n.type){const o=function e(t,n,o){if("undefined"!==t&&t&&r.ReWord.test(t[n])){const e=function e(t,n,o,i){if(!r.ReWord.test(t)||!t)return{word:"",index:""};"left"===i?o-=1:o+=1;const a=n[o];return/^[a-zA-Z]*$/.test(a)&&a?("left"==i?t=a+t:t+=a,e(t,n,o,i)):"left"===i&&(o=t.length+o,/^[a-zA-Z]*$/.test(n[o]))?e(t,n,o,"right"):{word:t,index:o-t.length}}(t[n]||"",t,n,"left"),o=e.index,i=e.word;let a=t,c=[];if(i){const e=t.substr(0,o),n=t.substr(o+i.length);a=`${e}${Object(r.DefineSpan)(i)}${n}`,c=[o,o+i.length]}return{word:i||"",oldValue:t,newValue:a,offset:c}}return o===r.ReSearch||n-1==0?{word:"",oldValue:t,newValue:t,offset:[]}:e(t,n-1,o=r.ReSearch)}(n.focusNode.data,n.focusOffset);o.word?(o.isWord=!0,e(o)):t()}else t()}).then(o=>{let s=o.newValue,d=o.oldValue;const l={target:e,newValue:s,oldValue:(i||d).replace(r.TranslateRe,""),id:c,word:o.word,offset:o.offset,text:a};if(!t||t.offset!==o.offset){const t=l.oldValue.indexOf(d);if(t>-1)l.offset=[o.offset[0]+t,o.offset[1]+t],l.target.innerHTML=l.oldValue.replace(d,s);else{let t=l.oldValue.split("&nbsp;");t=t.join(" ");const n=function(e,t){if(2!==t.length||!e)return null;const n=e.substring(t[0],t[1]),o=e.substr(0,t[0]),i=e.substr(t[1]);return{word:n,value:`${o}${Object(r.DefineSpan)(n)}${i}`}}(t,l.offset);n&&(e.innerHTML=n.value)}}n(l)}).catch(e=>{o(e)})}).catch(e=>{o(e)})})}window.HightLignt=class{constructor(e,t=[]){this.$root=e||document.getElementsByTagName("body")[0],this.notClassName=[r.DefineClass,...t],this.marks=[],this.callback=null,this.id="",this.word={},this.current="",this.isLoading=!1,this.markNumber=0}run(){console.log("run"),this.bindEventListener(this.$root,e=>{this.isSetLoading(!0);const{event:t,type:n}=e,o=(a=t.target||null,s=this.notClassName,function(e,t){const n=e.className?e.className.split(" "):[];return n.filter(e=>-1===t.indexOf(e)).length!==n.length&&n.length>0?null:e}(i(a),s));var a,s;const d=this.marks.shift()||null;if(o)switch(n){case r.EventType.click:c(o,d).then(e=>{this.emitHook(e)}).catch(e=>{this.isSetLoading(!1)})}})}emitHook(e){this.isSetLoading(),this.marks.push(e),this.hooks({content:e.oldValue,text:e.text,word:e.word,offset:e.offset})}isSetLoading(e=!1){this.isLoading=e}bindEventListener(e,t){const n=r.EventType.click;o(e,n,e=>{this.isLoading||t({event:e,type:n})})}hooks(e){this.callback(e)}hook(e){"function"==typeof e&&(this.callback=e)}clearAllMarks(){if(this.marks.length>0)for(;this.marks.length>0;){const e=this.marks.shift();e&&(e.target.innerHTML=e.oldValue)}}}}]);