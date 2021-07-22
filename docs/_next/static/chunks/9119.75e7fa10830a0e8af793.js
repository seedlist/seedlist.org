(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9119],{76358:function(e,n,r){"use strict";r.r(n),r.d(n,{AccountNameRequiredError:function(){return d},AccountNotSupported:function(){return p},AmountRequired:function(){return l},BluetoothRequired:function(){return f},BtcUnmatchedApp:function(){return E},CantOpenDevice:function(){return g},CantScanQRCode:function(){return ke},CashAddrNotSupported:function(){return h},CurrencyNotSupported:function(){return A},DBNotReset:function(){return Xe},DBWrongPassword:function(){return Ye},DeviceAppVerifyNotSupported:function(){return T},DeviceGenuineSocketEarlyClose:function(){return N},DeviceHalted:function(){return C},DeviceInOSUExpected:function(){return v},DeviceNameInvalid:function(){return S},DeviceNotGenuineError:function(){return D},DeviceOnDashboardExpected:function(){return m},DeviceOnDashboardUnexpected:function(){return I},DeviceShouldStayInApp:function(){return we},DeviceSocketFail:function(){return R},DeviceSocketNoBulkStatus:function(){return O},DisconnectedDevice:function(){return _},DisconnectedDeviceDuringOperation:function(){return U},ETHAddressNonEIP:function(){return be},EnpointConfigError:function(){return y},EthAppPleaseEnableContractData:function(){return w},FeeEstimationFailed:function(){return P},FeeNotLoaded:function(){return Be},FeeRequired:function(){return xe},FeeTooHigh:function(){return Ge},FirmwareNotRecognized:function(){return F},FirmwareOrAppUpdateRequired:function(){return Ke},GasLessThanEstimate:function(){return ue},GenuineCheckFailed:function(){return We},HardResetFail:function(){return L},InvalidAddress:function(){return b},InvalidAddressBecauseDestinationIsAlsoSource:function(){return k},InvalidXRPTag:function(){return M},LatestMCUInstalledError:function(){return B},LedgerAPI4xx:function(){return ze},LedgerAPI5xx:function(){return je},LedgerAPIError:function(){return G},LedgerAPIErrorWithMessage:function(){return q},LedgerAPINotAvailable:function(){return H},MCUNotGenuineToDashboard:function(){return Ee},ManagerAppAlreadyInstalledError:function(){return W},ManagerAppDepInstallRequired:function(){return j},ManagerAppDepUninstallRequired:function(){return K},ManagerAppRelyOnBTCError:function(){return z},ManagerDeviceLockedError:function(){return V},ManagerFirmwareNotEnoughSpaceError:function(){return Y},ManagerNotEnoughSpaceError:function(){return X},ManagerUninstallBTCDep:function(){return Q},NetworkDown:function(){return Z},NoAccessToCamera:function(){return oe},NoAddressesFound:function(){return J},NoDBPathGiven:function(){return Ve},NotEnoughBalance:function(){return $},NotEnoughBalanceBecauseDestinationNotCreated:function(){return te},NotEnoughBalanceInParentAccount:function(){return ne},NotEnoughBalanceToDelegate:function(){return ee},NotEnoughGas:function(){return ie},NotEnoughSpendableBalance:function(){return re},NotSupportedLegacyAddress:function(){return ae},PairingFailed:function(){return He},PasswordIncorrectError:function(){return se},PasswordsDontMatchError:function(){return ce},RecipientRequired:function(){return ge},RecommendSubAccountsToEmpty:function(){return de},RecommendUndelegation:function(){return pe},StatusCodes:function(){return Ze},SyncError:function(){return qe},TimeoutTagged:function(){return le},TransportError:function(){return Qe},TransportInterfaceNotAvailable:function(){return _e},TransportOpenUserCancelled:function(){return Oe},TransportRaceCondition:function(){return Ue},TransportStatusError:function(){return $e},TransportWebUSBGestureRequired:function(){return ye},UnavailableTezosOriginatedAccountReceive:function(){return he},UnavailableTezosOriginatedAccountSend:function(){return Ae},UnexpectedBootloader:function(){return fe},UnknownMCU:function(){return x},UpdateFetchFileFail:function(){return Te},UpdateIncorrectHash:function(){return Ne},UpdateIncorrectSig:function(){return De},UpdateYourApp:function(){return me},UserRefusedAddress:function(){return ve},UserRefusedAllowManager:function(){return Se},UserRefusedDeviceNameChange:function(){return Ie},UserRefusedFirmwareUpdate:function(){return Ce},UserRefusedOnDevice:function(){return Re},WebsocketConnectionError:function(){return Pe},WebsocketConnectionFailed:function(){return Fe},WrongAppForCurrency:function(){return Me},WrongDeviceForAccount:function(){return Le},addCustomErrorDeserializer:function(){return i},createCustomErrorClass:function(){return a},deserializeError:function(){return u},getAltStatusMessage:function(){return Je},serializeError:function(){return c}});var t={},o={},i=function(e,n){o[e]=n},a=function(e){var n=function(n,r){Object.assign(this,r),this.name=e,this.message=n||e,this.stack=(new Error).stack};return n.prototype=new Error,t[e]=n,n},u=function(e){if("object"===typeof e&&e){try{var n=JSON.parse(e.message);n.message&&n.name&&(e=n)}catch(p){}var r=void 0;if("string"===typeof e.name){var i=e.name,c=o[i];if(c)r=c(e);else{var s="Error"===i?Error:t[i];s||(console.warn("deserializing an unknown class '"+i+"'"),s=a(i)),r=Object.create(s.prototype);try{for(var d in e)e.hasOwnProperty(d)&&(r[d]=e[d])}catch(p){}}}else r=new Error(e.message);return!r.stack&&Error.captureStackTrace&&Error.captureStackTrace(r,u),r}return new Error(String(e))},c=function(e){return e?"object"===typeof e?s(e,[]):"function"===typeof e?"[Function: "+(e.name||"anonymous")+"]":e:e};function s(e,n){var r={};n.push(e);for(var t=0,o=Object.keys(e);t<o.length;t++){var i=o[t],a=e[i];"function"!==typeof a&&(a&&"object"===typeof a?-1!==n.indexOf(e[i])?r[i]="[Circular]":r[i]=s(e[i],n.slice(0)):r[i]=a)}return"string"===typeof e.name&&(r.name=e.name),"string"===typeof e.message&&(r.message=e.message),"string"===typeof e.stack&&(r.stack=e.stack),r}var d=a("AccountNameRequired"),p=a("AccountNotSupported"),l=a("AmountRequired"),f=a("BluetoothRequired"),E=a("BtcUnmatchedApp"),g=a("CantOpenDevice"),h=a("CashAddrNotSupported"),A=a("CurrencyNotSupported"),T=a("DeviceAppVerifyNotSupported"),N=a("DeviceGenuineSocketEarlyClose"),D=a("DeviceNotGenuine"),m=a("DeviceOnDashboardExpected"),I=a("DeviceOnDashboardUnexpected"),v=a("DeviceInOSUExpected"),C=a("DeviceHalted"),S=a("DeviceNameInvalid"),R=a("DeviceSocketFail"),O=a("DeviceSocketNoBulkStatus"),_=a("DisconnectedDevice"),U=a("DisconnectedDeviceDuringOperation"),y=a("EnpointConfig"),w=a("EthAppPleaseEnableContractData"),P=a("FeeEstimationFailed"),F=a("FirmwareNotRecognized"),L=a("HardResetFail"),M=a("InvalidXRPTag"),b=a("InvalidAddress"),k=a("InvalidAddressBecauseDestinationIsAlsoSource"),B=a("LatestMCUInstalledError"),x=a("UnknownMCU"),G=a("LedgerAPIError"),q=a("LedgerAPIErrorWithMessage"),H=a("LedgerAPINotAvailable"),W=a("ManagerAppAlreadyInstalled"),z=a("ManagerAppRelyOnBTC"),j=a("ManagerAppDepInstallRequired"),K=a("ManagerAppDepUninstallRequired"),V=a("ManagerDeviceLocked"),Y=a("ManagerFirmwareNotEnoughSpace"),X=a("ManagerNotEnoughSpace"),Q=a("ManagerUninstallBTCDep"),Z=a("NetworkDown"),J=a("NoAddressesFound"),$=a("NotEnoughBalance"),ee=a("NotEnoughBalanceToDelegate"),ne=a("NotEnoughBalanceInParentAccount"),re=a("NotEnoughSpendableBalance"),te=a("NotEnoughBalanceBecauseDestinationNotCreated"),oe=a("NoAccessToCamera"),ie=a("NotEnoughGas"),ae=a("NotSupportedLegacyAddress"),ue=a("GasLessThanEstimate"),ce=a("PasswordsDontMatch"),se=a("PasswordIncorrect"),de=a("RecommendSubAccountsToEmpty"),pe=a("RecommendUndelegation"),le=a("TimeoutTagged"),fe=a("UnexpectedBootloader"),Ee=a("MCUNotGenuineToDashboard"),ge=a("RecipientRequired"),he=a("UnavailableTezosOriginatedAccountReceive"),Ae=a("UnavailableTezosOriginatedAccountSend"),Te=a("UpdateFetchFileFail"),Ne=a("UpdateIncorrectHash"),De=a("UpdateIncorrectSig"),me=a("UpdateYourApp"),Ie=a("UserRefusedDeviceNameChange"),ve=a("UserRefusedAddress"),Ce=a("UserRefusedFirmwareUpdate"),Se=a("UserRefusedAllowManager"),Re=a("UserRefusedOnDevice"),Oe=a("TransportOpenUserCancelled"),_e=a("TransportInterfaceNotAvailable"),Ue=a("TransportRaceCondition"),ye=a("TransportWebUSBGestureRequired"),we=a("DeviceShouldStayInApp"),Pe=a("WebsocketConnectionError"),Fe=a("WebsocketConnectionFailed"),Le=a("WrongDeviceForAccount"),Me=a("WrongAppForCurrency"),be=a("ETHAddressNonEIP"),ke=a("CantScanQRCode"),Be=a("FeeNotLoaded"),xe=a("FeeRequired"),Ge=a("FeeTooHigh"),qe=a("SyncError"),He=a("PairingFailed"),We=a("GenuineCheckFailed"),ze=a("LedgerAPI4xx"),je=a("LedgerAPI5xx"),Ke=a("FirmwareOrAppUpdateRequired"),Ve=a("NoDBPathGiven"),Ye=a("DBWrongPassword"),Xe=a("DBNotReset");function Qe(e,n){this.name="TransportError",this.message=e,this.stack=(new Error).stack,this.id=n}Qe.prototype=new Error,i("TransportError",(function(e){return new Qe(e.message,e.id)}));var Ze={PIN_REMAINING_ATTEMPTS:25536,INCORRECT_LENGTH:26368,MISSING_CRITICAL_PARAMETER:26624,COMMAND_INCOMPATIBLE_FILE_STRUCTURE:27009,SECURITY_STATUS_NOT_SATISFIED:27010,CONDITIONS_OF_USE_NOT_SATISFIED:27013,INCORRECT_DATA:27264,NOT_ENOUGH_MEMORY_SPACE:27268,REFERENCED_DATA_NOT_FOUND:27272,FILE_ALREADY_EXISTS:27273,INCORRECT_P1_P2:27392,INS_NOT_SUPPORTED:27904,CLA_NOT_SUPPORTED:28160,TECHNICAL_PROBLEM:28416,OK:36864,MEMORY_PROBLEM:37440,NO_EF_SELECTED:37888,INVALID_OFFSET:37890,FILE_NOT_FOUND:37892,INCONSISTENT_FILE:37896,ALGORITHM_NOT_SUPPORTED:38020,INVALID_KCV:38021,CODE_NOT_INITIALIZED:38914,ACCESS_CONDITION_NOT_FULFILLED:38916,CONTRADICTION_SECRET_CODE_STATUS:38920,CONTRADICTION_INVALIDATION:38928,CODE_BLOCKED:38976,MAX_VALUE_REACHED:38992,GP_AUTH_FAILED:25344,LICENSING:28482,HALTED:28586};function Je(e){switch(e){case 26368:return"Incorrect length";case 26624:return"Missing critical parameter";case 27010:return"Security not satisfied (dongle locked or have invalid access rights)";case 27013:return"Condition of use not satisfied (denied by the user?)";case 27264:return"Invalid data received";case 27392:return"Invalid parameter received"}if(28416<=e&&e<=28671)return"Internal error, please report"}function $e(e){this.name="TransportStatusError";var n=Object.keys(Ze).find((function(n){return Ze[n]===e}))||"UNKNOWN_ERROR",r=Je(e)||n,t=e.toString(16);this.message="Ledger device: "+r+" (0x"+t+")",this.stack=(new Error).stack,this.statusCode=e,this.statusText=n}$e.prototype=new Error,i("TransportStatusError",(function(e){return new $e(e.statusCode)}))},27590:function(e,n,r){"use strict";r.d(n,{ZP:function(){return u}});var t=r(17187),o=r.n(t),i=r(76358),a=r(48764).Buffer;class u{constructor(){this.exchangeTimeout=3e4,this.unresponsiveTimeout=15e3,this.deviceModel=null,this._events=new(o()),this.send=async(e,n,r,t,o=a.alloc(0),u=[i.StatusCodes.OK])=>{if(o.length>=256)throw new i.TransportError("data.length exceed 256 bytes limit. Got: "+o.length,"DataLengthTooBig");const c=await this.exchange(a.concat([a.from([e,n,r,t]),a.from([o.length]),o])),s=c.readUInt16BE(c.length-2);if(!u.some((e=>e===s)))throw new i.TransportStatusError(s);return c},this.exchangeBusyPromise=void 0,this.exchangeAtomicImpl=async e=>{if(this.exchangeBusyPromise)throw new i.TransportRaceCondition("An action was already pending on the Ledger device. Please deny or reconnect.");let n;const r=new Promise((e=>{n=e}));this.exchangeBusyPromise=r;let t=!1;const o=setTimeout((()=>{t=!0,this.emit("unresponsive")}),this.unresponsiveTimeout);try{const r=await e();return t&&this.emit("responsive"),r}finally{clearTimeout(o),n&&n(),this.exchangeBusyPromise=null}},this._appAPIlock=null}exchange(e){throw new Error("exchange not implemented")}setScrambleKey(e){}close(){return Promise.resolve()}on(e,n){this._events.on(e,n)}off(e,n){this._events.removeListener(e,n)}emit(e,...n){this._events.emit(e,...n)}setDebugMode(){console.warn("setDebugMode is deprecated. use @ledgerhq/logs instead. No logs are emitted in this anymore.")}setExchangeTimeout(e){this.exchangeTimeout=e}setExchangeUnresponsiveTimeout(e){this.unresponsiveTimeout=e}static create(e=3e3,n){return new Promise(((r,t)=>{let o=!1;const a=this.listen({next:n=>{o=!0,a&&a.unsubscribe(),u&&clearTimeout(u),this.open(n.descriptor,e).then(r,t)},error:e=>{u&&clearTimeout(u),t(e)},complete:()=>{u&&clearTimeout(u),o||t(new i.TransportError(this.ErrorMessage_NoDeviceFound,"NoDeviceFound"))}}),u=n?setTimeout((()=>{a.unsubscribe(),t(new i.TransportError(this.ErrorMessage_ListenTimeout,"ListenTimeout"))}),n):null}))}decorateAppAPIMethods(e,n,r){for(let t of n)e[t]=this.decorateAppAPIMethod(t,e[t],e,r)}decorateAppAPIMethod(e,n,r,t){return async(...o)=>{const{_appAPIlock:a}=this;if(a)return Promise.reject(new i.TransportError("Ledger Device is busy (lock "+a+")","TransportLocked"));try{return this._appAPIlock=e,this.setScrambleKey(t),await n.apply(r,o)}finally{this._appAPIlock=null}}}}u.isSupported=void 0,u.list=void 0,u.listen=void 0,u.open=void 0,u.ErrorMessage_ListenTimeout="No Ledger device found (timeout)",u.ErrorMessage_NoDeviceFound="No Ledger device found"},28716:function(e,n,r){"use strict";r.d(n,{c:function(){return i}});let t=0;const o=[],i=(e,n,r)=>{const i={type:e,id:String(++t),date:new Date};n&&(i.message=n),r&&(i.data=r),function(e){for(let r=0;r<o.length;r++)try{o[r](e)}catch(n){console.error(n)}}(i)},a=e=>(o.push(e),()=>{const n=o.indexOf(e);-1!==n&&(o[n]=o[o.length-1],o.pop())});"undefined"!==typeof window&&(window.__ledgerLogsListen=a)}}]);