(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1978],{61978:function(e,t,n){"use strict";function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t,n,r,o,i,c){try{var u=e[i](c),a=u.value}catch(s){return void n(s)}u.done?t(a):Promise.resolve(a).then(r,o)}function u(e){return function(){var t=this,n=arguments;return new Promise((function(r,o){var i=e.apply(t,n);function u(e){c(i,r,o,u,a,"next",e)}function a(e){c(i,r,o,u,a,"throw",e)}u(void 0)}))}}n.r(t),n.d(t,{checkGnosisSafeContext:function(){return s}});var a=function(e){return Promise.race([e.getSafeInfo(),new Promise((function(e){return setTimeout(e,200)}))])},s=function(){var e=u(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t1=a,e.next=3,n.e(5822).then(n.t.bind(n,85822,23));case 3:return e.t2=e.sent.default,e.t3=new e.t2,e.next=7,(0,e.t1)(e.t3);case 7:if(e.t0=!!e.sent,!e.t0){e.next=10;break}e.t0=t();case 10:return e.abrupt("return",e.t0);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();t.default=function(e){var t=e.preferred,r=e.label,i=e.iconSrc,c=e.svg,s=e.networkId,f="https://".concat(4===s?"rinkeby.":"","gnosis-safe.io/app");return{name:r||"Gnosis Safe",iconSrc:i,svg:c||'\n<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 440 440">\n    <path d="M220,9.82C103.92,9.82,9.82,103.92,9.82,220S103.92,430.18,220,430.18,430.18,336.08,430.18,220,336.08,9.82,220,9.82ZM373.83,231.47H276.3a59.41,59.41,0,1,1,.45-20.67h97.08a10.34,10.34,0,1,1,0,20.67Z"/>\n</svg>\n',wallet:function(){var e=u(regeneratorRuntime.mark((function e(t){var r,i,c,u,s,f;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.createModernProviderInterface,e.next=3,n.e(5822).then(n.t.bind(n,85822,23));case 3:return e.t0=e.sent.default,i=new e.t0,e.next=7,Promise.all([n.e(9351),n.e(6844)]).then(n.bind(n,96844));case 7:return c=e.sent,u=c.SafeAppProvider,e.next=11,a(i);case 11:if(s=e.sent){e.next=14;break}return e.abrupt("return",{provider:void 0,interface:null});case 14:return f=new u(s,i),e.abrupt("return",{provider:f,interface:o(o({},r(f)),{},{connect:function(){return Promise.resolve([s.safeAddress])}})});case 16:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),type:"sdk",link:f,installMessage:function(){return'\n        <p style="font-size: 0.889rem; font-family: inherit; margin: 0.889rem 0;">\n            Click the button below to open the Gnosis Safe interface.\n        </p>\n        '},desktop:!0,mobile:!1,preferred:t}}}}]);