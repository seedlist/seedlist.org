(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2939],{62939:function(e,n,t){"use strict";t.r(n);t(35666);var r=t(19618);t(44431),t(5942),t(51206);function o(e,n,t,r,o,a,i){try{var u=e[a](i),c=u.value}catch(s){return void t(s)}u.done?n(c):Promise.resolve(c).then(r,o)}function a(e){return function(){var n=this,t=arguments;return new Promise((function(r,a){var i=e.apply(n,t);function u(e){o(i,r,a,u,c,"next",e)}function c(e){o(i,r,a,u,c,"throw",e)}u(void 0)}))}}n.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.heading,t=e.description,o=e.icon,i=e.html,u=e.button;return function(){var e=a(regeneratorRuntime.mark((function e(a){var c,s,d,l;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(c=a.wallet,s=a.address,d=a.stateSyncStatus,l=a.stateStore,null!==s){e.next=5;break}if(!d.address){e.next=5;break}return e.next=5,new Promise((function(e){d.address&&d.address.then(e),setTimeout((function(){null===s&&e(void 0)}),500)}));case 5:if(l.address.get()||!c||!c.name){e.next=7;break}return e.abrupt("return",{heading:n||"Login and Authorize Your Wallet",description:t||"This dapp requires access to your wallet, please login and authorize access to your ".concat(c.name," accounts to continue."),eventCode:"loginFail",action:c.connect,icon:o||r.e,html:i,button:u});case 7:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()}}}]);