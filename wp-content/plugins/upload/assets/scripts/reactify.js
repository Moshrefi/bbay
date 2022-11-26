(function(){'use strict';function FastClick(layer,options){var oldOnClick;options=options||{};this.trackingClick=!1;this.trackingClickStart=0;this.targetElement=null;this.touchStartX=0;this.touchStartY=0;this.lastTouchIdentifier=0;this.touchBoundary=options.touchBoundary||10;this.layer=layer;this.tapDelay=options.tapDelay||200;this.tapTimeout=options.tapTimeout||700;if(FastClick.notNeeded(layer)){return}
function bind(method,context){return function(){return method.apply(context,arguments)}}
var methods=['onMouse','onClick','onTouchStart','onTouchMove','onTouchEnd','onTouchCancel'];var context=this;for(var i=0,l=methods.length;i<l;i++){context[methods[i]]=bind(context[methods[i]],context)}
if(deviceIsAndroid){layer.addEventListener('mouseover',this.onMouse,!0);layer.addEventListener('mousedown',this.onMouse,!0);layer.addEventListener('mouseup',this.onMouse,!0)}
layer.addEventListener('click',this.onClick,!0);layer.addEventListener('touchstart',this.onTouchStart,!1);layer.addEventListener('touchmove',this.onTouchMove,!1);layer.addEventListener('touchend',this.onTouchEnd,!1);layer.addEventListener('touchcancel',this.onTouchCancel,!1);if(!Event.prototype.stopImmediatePropagation){layer.removeEventListener=function(type,callback,capture){var rmv=Node.prototype.removeEventListener;if(type==='click'){rmv.call(layer,type,callback.hijacked||callback,capture)}else{rmv.call(layer,type,callback,capture)}};layer.addEventListener=function(type,callback,capture){var adv=Node.prototype.addEventListener;if(type==='click'){adv.call(layer,type,callback.hijacked||(callback.hijacked=function(event){if(!event.propagationStopped){callback(event)}}),capture)}else{adv.call(layer,type,callback,capture)}}}
if(typeof layer.onclick==='function'){oldOnClick=layer.onclick;layer.addEventListener('click',function(event){oldOnClick(event)},!1);layer.onclick=null}}
var deviceIsWindowsPhone=navigator.userAgent.indexOf("Windows Phone")>=0;var deviceIsAndroid=navigator.userAgent.indexOf('Android')>0&&!deviceIsWindowsPhone;var deviceIsIOS=/iP(ad|hone|od)/.test(navigator.userAgent)&&!deviceIsWindowsPhone;var deviceIsIOS4=deviceIsIOS&&(/OS 4_\d(_\d)?/).test(navigator.userAgent);var deviceIsIOSWithBadTarget=deviceIsIOS&&(/OS [6-7]_\d/).test(navigator.userAgent);var deviceIsBlackBerry10=navigator.userAgent.indexOf('BB10')>0;FastClick.prototype.needsClick=function(target){switch(target.nodeName.toLowerCase()){case 'button':case 'select':case 'textarea':if(target.disabled){return!0}
break;case 'input':if((deviceIsIOS&&target.type==='file')||target.disabled){return!0}
break;case 'label':case 'iframe':case 'video':return!0}
return(/\bneedsclick\b/).test(target.className)};FastClick.prototype.needsFocus=function(target){switch(target.nodeName.toLowerCase()){case 'textarea':return!0;case 'select':return!deviceIsAndroid;case 'input':switch(target.type){case 'button':case 'checkbox':case 'file':case 'image':case 'radio':case 'submit':return!1}
return!target.disabled&&!target.readOnly;default:return(/\bneedsfocus\b/).test(target.className)}};FastClick.prototype.sendClick=function(targetElement,event){var clickEvent,touch;if(document.activeElement&&document.activeElement!==targetElement){document.activeElement.blur()}
touch=event.changedTouches[0];clickEvent=document.createEvent('MouseEvents');clickEvent.initMouseEvent(this.determineEventType(targetElement),!0,!0,window,1,touch.screenX,touch.screenY,touch.clientX,touch.clientY,!1,!1,!1,!1,0,null);clickEvent.forwardedTouchEvent=!0;targetElement.dispatchEvent(clickEvent)};FastClick.prototype.determineEventType=function(targetElement){if(deviceIsAndroid&&targetElement.tagName.toLowerCase()==='select'){return'mousedown'}
return'click'};FastClick.prototype.focus=function(targetElement){var length;if(deviceIsIOS&&targetElement.setSelectionRange&&targetElement.type.indexOf('date')!==0&&targetElement.type!=='time'&&targetElement.type!=='month'&&targetElement.type!=='email'){length=targetElement.value.length;targetElement.setSelectionRange(length,length)}else{targetElement.focus()}};FastClick.prototype.updateScrollParent=function(targetElement){var scrollParent,parentElement;scrollParent=targetElement.fastClickScrollParent;if(!scrollParent||!scrollParent.contains(targetElement)){parentElement=targetElement;do{if(parentElement.scrollHeight>parentElement.offsetHeight){scrollParent=parentElement;targetElement.fastClickScrollParent=parentElement;break}
parentElement=parentElement.parentElement}while(parentElement);}
if(scrollParent){scrollParent.fastClickLastScrollTop=scrollParent.scrollTop}};FastClick.prototype.getTargetElementFromEventTarget=function(eventTarget){if(eventTarget.nodeType===Node.TEXT_NODE){return eventTarget.parentNode}
return eventTarget};FastClick.prototype.onTouchStart=function(event){var targetElement,touch,selection;if(event.targetTouches.length>1){return!0}
targetElement=this.getTargetElementFromEventTarget(event.target);touch=event.targetTouches[0];if(deviceIsIOS){selection=window.getSelection();if(selection.rangeCount&&!selection.isCollapsed){return!0}
if(!deviceIsIOS4){if(touch.identifier&&touch.identifier===this.lastTouchIdentifier){event.preventDefault();return!1}
this.lastTouchIdentifier=touch.identifier;this.updateScrollParent(targetElement)}}
this.trackingClick=!0;this.trackingClickStart=event.timeStamp;this.targetElement=targetElement;this.touchStartX=touch.pageX;this.touchStartY=touch.pageY;if((event.timeStamp-this.lastClickTime)<this.tapDelay){event.preventDefault()}
return!0};FastClick.prototype.touchHasMoved=function(event){var touch=event.changedTouches[0],boundary=this.touchBoundary;if(Math.abs(touch.pageX-this.touchStartX)>boundary||Math.abs(touch.pageY-this.touchStartY)>boundary){return!0}
return!1};FastClick.prototype.onTouchMove=function(event){if(!this.trackingClick){return!0}
if(this.targetElement!==this.getTargetElementFromEventTarget(event.target)||this.touchHasMoved(event)){this.trackingClick=!1;this.targetElement=null}
return!0};FastClick.prototype.findControl=function(labelElement){if(labelElement.control!==undefined){return labelElement.control}
if(labelElement.htmlFor){return document.getElementById(labelElement.htmlFor)}
return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea')};FastClick.prototype.onTouchEnd=function(event){var forElement,trackingClickStart,targetTagName,scrollParent,touch,targetElement=this.targetElement;if(!this.trackingClick){return!0}
if((event.timeStamp-this.lastClickTime)<this.tapDelay){this.cancelNextClick=!0;return!0}
if((event.timeStamp-this.trackingClickStart)>this.tapTimeout){return!0}
this.cancelNextClick=!1;this.lastClickTime=event.timeStamp;trackingClickStart=this.trackingClickStart;this.trackingClick=!1;this.trackingClickStart=0;if(deviceIsIOSWithBadTarget){touch=event.changedTouches[0];targetElement=document.elementFromPoint(touch.pageX-window.pageXOffset,touch.pageY-window.pageYOffset)||targetElement;targetElement.fastClickScrollParent=this.targetElement.fastClickScrollParent}
targetTagName=targetElement.tagName.toLowerCase();if(targetTagName==='label'){forElement=this.findControl(targetElement);if(forElement){this.focus(targetElement);if(deviceIsAndroid){return!1}
targetElement=forElement}}else if(this.needsFocus(targetElement)){if((event.timeStamp-trackingClickStart)>100||(deviceIsIOS&&window.top!==window&&targetTagName==='input')){this.targetElement=null;return!1}
this.focus(targetElement);this.sendClick(targetElement,event);if(!deviceIsIOS||targetTagName!=='select'){this.targetElement=null;event.preventDefault()}
return!1}
if(deviceIsIOS&&!deviceIsIOS4){scrollParent=targetElement.fastClickScrollParent;if(scrollParent&&scrollParent.fastClickLastScrollTop!==scrollParent.scrollTop){return!0}}
if(!this.needsClick(targetElement)){event.preventDefault();this.sendClick(targetElement,event)}
return!1};FastClick.prototype.onTouchCancel=function(){this.trackingClick=!1;this.targetElement=null};FastClick.prototype.onMouse=function(event){if(!this.targetElement){return!0}
if(event.forwardedTouchEvent){return!0}
if(!event.cancelable){return!0}
if(!this.needsClick(this.targetElement)||this.cancelNextClick){if(event.stopImmediatePropagation){event.stopImmediatePropagation()}else{event.propagationStopped=!0}
event.stopPropagation();event.preventDefault();return!1}
return!0};FastClick.prototype.onClick=function(event){var permitted;if(this.trackingClick){this.targetElement=null;this.trackingClick=!1;return!0}
if(event.target.type==='submit'&&event.detail===0){return!0}
permitted=this.onMouse(event);if(!permitted){this.targetElement=null}
return permitted};FastClick.prototype.destroy=function(){var layer=this.layer;if(deviceIsAndroid){layer.removeEventListener('mouseover',this.onMouse,!0);layer.removeEventListener('mousedown',this.onMouse,!0);layer.removeEventListener('mouseup',this.onMouse,!0)}
layer.removeEventListener('click',this.onClick,!0);layer.removeEventListener('touchstart',this.onTouchStart,!1);layer.removeEventListener('touchmove',this.onTouchMove,!1);layer.removeEventListener('touchend',this.onTouchEnd,!1);layer.removeEventListener('touchcancel',this.onTouchCancel,!1)};FastClick.notNeeded=function(layer){var metaViewport;var chromeVersion;var blackberryVersion;var firefoxVersion;if(typeof window.ontouchstart==='undefined'){return!0}
chromeVersion=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1];if(chromeVersion){if(deviceIsAndroid){metaViewport=document.querySelector('meta[name=viewport]');if(metaViewport){if(metaViewport.content.indexOf('user-scalable=no')!==-1){return!0}
if(chromeVersion>31&&document.documentElement.scrollWidth<=window.outerWidth){return!0}}}else{return!0}}
if(deviceIsBlackBerry10){blackberryVersion=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);if(blackberryVersion[1]>=10&&blackberryVersion[2]>=3){metaViewport=document.querySelector('meta[name=viewport]');if(metaViewport){if(metaViewport.content.indexOf('user-scalable=no')!==-1){return!0}
if(document.documentElement.scrollWidth<=window.outerWidth){return!0}}}}
if(layer.style.msTouchAction==='none'||layer.style.touchAction==='manipulation'){return!0}
firefoxVersion=+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1];if(firefoxVersion>=27){metaViewport=document.querySelector('meta[name=viewport]');if(metaViewport&&(metaViewport.content.indexOf('user-scalable=no')!==-1||document.documentElement.scrollWidth<=window.outerWidth)){return!0}}
if(layer.style.touchAction==='none'||layer.style.touchAction==='manipulation'){return!0}
return!1};FastClick.attach=function(layer,options){return new FastClick(layer,options)};if(typeof define==='function'&&typeof define.amd==='object'&&define.amd){define(function(){return FastClick})}else if(typeof module!=='undefined'&&module.exports){module.exports=FastClick.attach;module.exports.FastClick=FastClick}else{window.FastClick=FastClick}}())