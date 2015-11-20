define("common/utils/fsm",[],function(){function t(t){this.context=t.context||void 0,this.states=t.states||{},this.context.state=t.initial||"",this.debug=t.debug||!1,this.onChangeState=t.onChangeState.bind(this.context)||function(){}}return t.prototype.log=function(){this.debug&&window.console&&window.console.log&&window.console.log.apply(window.console,arguments)},t.prototype.trigger=function(t,e){this.log("fsm: (event)",t);var i=this.context.state,s=function(){};(this.states[i].events[t]||s).call(this.context,e),(i!==this.context.state||this.context.reloadState)&&(this.context.reloadState=!1,this.onChangeState(i,this.context.state),(this.states[i].leave||s).apply(this.context),(this.states[this.context.state].enter||s).apply(this.context),this.log("fsm: (state)",i+" -> "+this.context.state))},t}),define("common/modules/ui/blockSharing",["bean","bonzo","qwery","common/utils/$"],function(t,e,i,s){var n=function(t){var n=i("> *",t).slice(2);e(n).addClass("u-h"),s(".js-blockshare-expand",t).removeClass("u-h")},o=function(){t.on(document.body,"click",".js-blockshare-expand",function(t){var i=e(t.currentTarget),n=i.parent()[0];s("> *",n).removeClass("u-h"),i.addClass("u-h")}),s.forEachElement(".block-share",n)};return{init:o,truncateBlockShareIcons:n}}),define("text!common/views/content/block-sharing.html",[],function(){return'<li class="<%=articleType%>-lightbox__item <%=articleType%>-lightbox__item--img js-<%=articleType%>-slide">\n    <div class="<%=articleType%>-lightbox__img-container"><img class="<%=articleType%>-lightbox__img js-<%=articleType%>-lightbox-img"></div>\n    <div class="<%=articleType%>-lightbox__info js-<%=articleType%>-lightbox-info">\n        <div class="<%=articleType%>-lightbox__progress <%=articleType%>-lightbox__progress--info">\n            <span class="<%=articleType%>-lightbox__index"><%=index%></span>\n            <span class="<%=articleType%>-lightbox__progress-separator"></span>\n            <span class="<%=articleType%>-lightbox__count"><%=count%></span>\n            </div>\n        <div class="<%=articleType%>-lightbox__img-caption"><%=caption%></div>\n        <div class="<%=articleType%>-lightbox__img-credit"><%=credit%></div>\n        <div class="block-share block-share--<%=articleType%> hide-on-mobile" data-link-name="block share">\n            <%=shareButtons%>\n        </div>\n        <div class="block-share--<%=articleType%>-mobile" data-open-overlay-on-click="share-modal-<%=index%>" data-link-name="open mobile block share">\n            <button class="block-share__item--mobile button button--small button--tone-media-variant mobile-only">\n                Share\n            </button>\n        </div>\n    </div>\n    <div id="share-modal-<%=index%>" class="overlay share-modal overlay--<%=articleType%> js-share-modal">\n        <div class="share-modal__content" data-link-name="mobile block share">\n            <div class="share-modal__title">Share this post</div>\n            <%=shareButtonsMobile%>\n            <button class="share-modal__close js-overlay-close" data-link-name="close"><i class="i i-close-icon-dark-small"></i><span class="u-h">close</span></button>\n        </div>\n    </div>\n</li>\n'}),define("text!common/views/content/button.html",[],function(){return'<div class="gallery-lightbox__btn gallery-lightbox__btn--<%=label%> js-gallery-<%=label%>">\n<button class="gallery-lightbox__btn-body"><i></i><%=label%></button>\n</div>'}),define("text!common/views/content/endslate.html",[],function(){return'<li class="gallery-lightbox__item gallery-lightbox__item--endslate js-gallery-slide">\n<div class="gallery-lightbox__endslate js-gallery-endslate fc-container--media"></div>\n</li>'}),define("text!common/views/content/loader.html",[],function(){return'<div class="pamplemousse gallery-lightbox__loader js-loader">\n<div class="pamplemousse__pip"><i></i></div>\n<div class="pamplemousse__pip"><i></i></div>\n<div class="pamplemousse__pip"><i></i></div>\n</div>'}),define("text!common/views/content/share-button.html",[],function(){return'<a class="rounded-icon block-share__item block-share__item--<%=css%> js-blockshare-link" href="<%=url%>" target="_blank" data-link-name="social <%=css%>">\n    <span class="u-h"><%=text%></span>\n    <%= icon %>\n</a>\n'}),define("text!common/views/content/share-button-mobile.html",[],function(){return'<a class="share-modal__link" href="<%=url%>" target="_blank" data-link-name="social <%=css%>">\n    <div class="share-modal__item button button--xlarge share-modal__item--<%=css%>">\n        <%= icon %>\n        <%=text%>\n    </div>\n</a>\n'}),define("common/modules/gallery/lightbox",["bean","bonzo","qwery","common/utils/$","common/utils/ajax","common/utils/config","common/utils/detect","common/utils/fsm","common/utils/mediator","common/utils/template","common/utils/url","common/modules/component","common/modules/ui/blockSharing","common/modules/ui/images","common/views/svgs","text!common/views/content/block-sharing.html","text!common/views/content/button.html","text!common/views/content/endslate.html","text!common/views/content/loader.html","text!common/views/content/share-button.html","text!common/views/content/share-button-mobile.html","lodash/collections/map","lodash/functions/throttle","lodash/collections/forEach","common/utils/chain"],function(t,e,i,s,n,o,l,a,r,h,c,d,g,m,u,p,b,x,y,f,v,w,_,k,C){function E(){function n(t){var e=b;return h(e,{label:t})}this.showEndslate="mobile"!==l.getBreakpoint()&&"childrens-books-site"!==o.page.section&&"Gallery"===o.page.contentType,this.useSwipe=l.hasTouchScreen(),this.swipeThreshold=.05,this.galleryLightboxHtml='<div class="overlay gallery-lightbox gallery-lightbox--closed gallery-lightbox--hover"><div class="gallery-lightbox__sidebar">'+n("close")+'<div class="gallery-lightbox__progress  gallery-lightbox__progress--sidebar"><span class="gallery-lightbox__index js-gallery-index"></span><span class="gallery-lightbox__progress-separator"></span><span class="gallery-lightbox__count js-gallery-count"></span></div>'+n("next")+n("prev")+n("info-button")+'</div><div class="js-gallery-swipe gallery-lightbox__swipe-container"><ul class="gallery-lightbox__content js-gallery-content"></ul></div></div>',this.lightboxEl=e.create(this.galleryLightboxHtml),this.$lightboxEl=e(this.lightboxEl).prependTo(document.body),this.$indexEl=s(".js-gallery-index",this.lightboxEl),this.$countEl=s(".js-gallery-count",this.lightboxEl),this.$contentEl=s(".js-gallery-content",this.lightboxEl),this.nextBtn=i(".js-gallery-next",this.lightboxEl)[0],this.prevBtn=i(".js-gallery-prev",this.lightboxEl)[0],this.closeBtn=i(".js-gallery-close",this.lightboxEl)[0],this.infoBtn=i(".js-gallery-info-button",this.lightboxEl)[0],this.$swipeContainer=s(".js-gallery-swipe"),t.on(this.nextBtn,"click",this.trigger.bind(this,"next")),t.on(this.prevBtn,"click",this.trigger.bind(this,"prev")),t.on(this.closeBtn,"click",this.close.bind(this)),t.on(this.infoBtn,"click",this.trigger.bind(this,"toggle-info")),this.handleKeyEvents=this.handleKeyEvents.bind(this),this.resize=this.trigger.bind(this,"resize"),this.toggleInfo=function(t){var i=e(t.target).hasClass("js-gallery-lightbox-info")||s.ancestor(t.target,"js-gallery-lightbox-info");i||this.trigger("toggle-info")}.bind(this),l.hasTouchScreen()&&this.disableHover(),t.on(window,"popstate",function(t){t.state||this.trigger("close")}.bind(this)),this.fsm=new a({initial:"closed",onChangeState:function(t,e){this.$lightboxEl.removeClass("gallery-lightbox--"+t).addClass("gallery-lightbox--"+e)},context:this,states:this.states})}function T(){if("lightboxImages"in o.page&&o.page.lightboxImages.images.length>0){var i,s,n,l,a=window.location.hash,r=o.page.lightboxImages;t.on(document.body,"click",".js-gallerythumbs",function(t){t.preventDefault();var s=e(t.currentTarget),n=s.attr("href")||s.attr("data-gallery-url"),o=n.split("#img-"),l=parseInt(o[1],10),a=isNaN(l)?1:l;i=i||new E,i.loadGalleryfromJson(r,a)}),i=i||new E,s="/"+o.page.pageId,n=/\?index=(\d+)/.exec(document.location.href),n?(c.pushUrl(null,document.title,s,!0),i.loadGalleryfromJson(r,parseInt(n[1],10))):(l=/^#(?:img-)?(\d+)$/.exec(a),l&&i.loadGalleryfromJson(r,parseInt(l[1],10)))}}return E.prototype.generateImgHTML=function(t,e){var i=o.page.shortUrl,s=0===t.src.indexOf("//")?"http:":"",n=[{text:"Facebook",css:"facebook",icon:u("shareFacebook",["icon"]),url:"https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(i+"/sfb#img-"+e)},{text:"Twitter",css:"twitter",icon:u("shareTwitter",["icon"]),url:"https://twitter.com/intent/tweet?text="+encodeURIComponent(o.page.webTitle)+"&url="+encodeURIComponent(i+"/stw#img-"+e)},{text:"Pinterest",css:"pinterest",icon:u("sharePinterest",["icon"]),url:encodeURI("http://www.pinterest.com/pin/create/button/?description="+o.page.webTitle+"&url="+i+"&media="+s+t.src)}];return h(p.replace(/^\s+|\s+$/gm,""),{articleType:"gallery",count:this.images.length,index:e,caption:t.caption,credit:t.displayCredit?t.credit:"",blockShortUrl:i,shareButtons:w(n,h.bind(null,f)).join(""),shareButtonsMobile:w(n,h.bind(null,v)).join("")})},E.prototype.initSwipe=function(){var e,i,s,n,o=20;t.on(this.$swipeContainer[0],"touchstart",function(t){e=this.swipeContainerWidth*this.swipeThreshold,i=t.touches[0].pageX,s=0}.bind(this)),n=function(t){t.preventDefault(),t.touches.length>1||t.scale&&1!==t.scale||(s=t.touches[0].pageX-i,this.translateContent(this.index,s,o))}.bind(this),t.on(this.$swipeContainer[0],"touchmove",_(n,o,{trailing:!1})),t.on(this.$swipeContainer[0],"touchend",function(){var t;t=Math.abs(s)>e?s>e?1:-1:0,s=0,1===t?this.index>1?this.trigger("prev"):this.trigger("reload"):-1===t&&this.index<this.$slides.length?this.trigger("next"):this.trigger("reload")}.bind(this))},E.prototype.disableHover=function(){this.$lightboxEl.removeClass("gallery-lightbox--hover")},E.prototype.trigger=function(t,e){this.fsm.trigger(t,e)},E.prototype.loadGalleryfromJson=function(t,e){this.index=e,this.galleryJson&&t.id===this.galleryJson.id?this.trigger("open"):this.trigger("loadJson",t)},E.prototype.loadSurroundingImages=function(i,n){var o,l;C([-1,0,1]).and(w,function(t){return i+t===0?n-1:(i-1+t)%n}).and(k,function(i){o=this.images[i],l=e(this.$images[i]),l.attr("src")||(l.parent().append(e.create(y)),l.attr("src",o.src),l.attr("srcset",o.srcsets),l.attr("sizes",o.sizes),t.one(l[0],"load",function(){s(".js-loader").remove()}))}.bind(this))},E.prototype.translateContent=function(t,e,i){var s=-1*(t-1)*this.swipeContainerWidth,n=this.$contentEl[0];n.style.webkitTransitionDuration=i+"ms",n.style.mozTransitionDuration=i+"ms",n.style.msTransitionDuration=i+"ms",n.style.transitionDuration=i+"ms",n.style.webkitTransform="translate("+(s+e)+"px,0)translateZ(0)",n.style.mozTransform="translate("+(s+e)+"px,0)",n.style.msTransform="translate("+(s+e)+"px,0)",n.style.transform="translate("+(s+e)+"px,0)translateZ(0)"},E.prototype.states={closed:{enter:function(){this.hide()},leave:function(){this.show(),c.pushUrl({},document.title,"/"+this.galleryJson.id)},events:{open:function(){this.swipe&&this.swipe.slide(this.index,0),this.state="image"},loadJson:function(t){this.galleryJson=t,this.images=t.images,this.$countEl.text(this.images.length);var i=C(this.images).and(w,function(t,e){return this.generateImgHTML(t,e+1)}.bind(this)).join("").value();this.$contentEl.html(i),this.$images=s(".js-gallery-lightbox-img",this.$contentEl[0]),this.showEndslate&&this.loadEndslate(),this.$slides=s(".js-gallery-slide",this.$contentEl[0]),this.useSwipe&&this.initSwipe(),this.galleryJson.images.length<2&&(e([this.nextBtn,this.prevBtn]).hide(),s(".gallery-lightbox__progress",this.lightboxEl).hide()),this.state="image"}}},image:{enter:function(){this.swipeContainerWidth=this.$swipeContainer.dim().width,this.loadSurroundingImages(this.index,this.images.length),this.translateContent(this.index,0,this.useSwipe&&l.isBreakpoint({max:"tablet"})?100:0),c.pushUrl({},document.title,"/"+this.galleryJson.id+"#img-"+this.index,!0),t.on(this.$swipeContainer[0],"click",".js-gallery-content",this.toggleInfo),r.on("window:resize",this.resize),this.$indexEl.text(this.index),m.upgradePictures()},leave:function(){t.off(this.$swipeContainer[0],"click",this.toggleInfo),r.off("window:resize",this.resize)},events:{next:function(t){this.trackInteraction(t+":next"),this.pulseButton(this.nextBtn),this.index===this.images.length?this.showEndslate?this.state="endslate":(this.index=1,this.reloadState=!0):(this.index+=1,this.reloadState=!0)},prev:function(t){this.trackInteraction(t+":previous"),this.pulseButton(this.prevBtn),1===this.index?this.showEndslate?this.state="endslate":(this.index=this.images.length,this.reloadState=!0):(this.index-=1,this.reloadState=!0)},reload:function(){this.reloadState=!0},"toggle-info":function(){this.pulseButton(this.infoBtn),this.$lightboxEl.toggleClass("gallery-lightbox--show-info")},"hide-info":function(){this.pulseButton(this.infoBtn),this.$lightboxEl.removeClass("gallery-lightbox--show-info")},"show-info":function(){this.pulseButton(this.infoBtn),this.$lightboxEl.addClass("gallery-lightbox--show-info")},resize:function(){this.swipeContainerWidth=this.$swipeContainer.dim().width,this.loadSurroundingImages(this.index,this.images.length),this.translateContent(this.index,0,0)},close:function(){this.state="closed"}}},endslate:{enter:function(){this.translateContent(this.$slides.length,0,0),this.index=this.images.length+1,r.on("window:resize",this.resize)},leave:function(){r.off("window:resize",this.resize)},events:{next:function(t){this.trackInteraction(t+":next"),this.pulseButton(this.nextBtn),this.index=1,this.state="image"},prev:function(t){this.trackInteraction(t+":previous"),this.pulseButton(this.prevBtn),this.index=this.images.length,this.state="image"},reload:function(){this.reloadState=!0},resize:function(){this.swipeContainerWidth=this.$swipeContainer.dim().width,this.translateContent(this.$slides.length,0,0)},close:function(){this.state="closed"}}}},E.prototype.show=function(){var i=e(document.body);this.bodyScrollPosition=i.scrollTop(),i.addClass("has-overlay"),this.$lightboxEl.addClass("gallery-lightbox--open"),t.off(document.body,"keydown",this.handleKeyEvents),t.on(document.body,"keydown",this.handleKeyEvents)},E.prototype.close=function(){c.hasHistorySupport?c.back():this.trigger("close"),this.trigger("close")},E.prototype.hide=function(){var i=e(document.body);i.removeClass("has-overlay"),t.off(document.body,"keydown",this.handleKeyEvents),window.setTimeout(function(){this.bodyScrollPosition&&i.scrollTop(this.bodyScrollPosition),this.$lightboxEl.removeClass("gallery-lightbox--open"),m.upgradePictures(),r.emit("ui:images:vh")}.bind(this),1)},E.prototype.pulseButton=function(t){var i=e(t);i.addClass("gallery-lightbox__button-pulse"),window.setTimeout(function(){i.removeClass("gallery-lightbox__button-pulse")},75)},E.prototype.handleKeyEvents=function(t){37===t.keyCode?this.trigger("prev"):39===t.keyCode?this.trigger("next"):38===t.keyCode?this.trigger("show-info"):40===t.keyCode?this.trigger("hide-info"):27===t.keyCode?this.close():73===t.keyCode&&this.trigger("toggle-info")},E.prototype.endslate=new d,E.prototype.loadEndslate=function(){this.endslate.rendered||(this.endslateEl=e.create(x),this.$contentEl.append(this.endslateEl),this.endslate.componentClass="gallery-lightbox__endslate",this.endslate.endpoint="/gallery/most-viewed.json",this.endslate.ready=function(){r.emit("page:new-content")},this.endslate.prerender=function(){e(this.elem).addClass(this.componentClass)},this.endslate.fetch(i(".js-gallery-endslate",this.endslateEl),"html"))},E.prototype.trackInteraction=function(t){r.emit("module:clickstream:interaction",t)},{init:T,GalleryLightbox:E}}),define("bootstraps/image-content",["common/modules/gallery/lightbox"],function(t){return{init:function(){t.init()}}});
//# sourceMappingURL=image-content.js.map