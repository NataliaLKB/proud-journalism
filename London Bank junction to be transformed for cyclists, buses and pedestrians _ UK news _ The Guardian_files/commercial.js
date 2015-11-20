define("common/modules/commercial/article-aside-adverts",["Promise","common/utils/$","common/utils/$css","common/utils/config","common/utils/fastdom-idle","common/modules/commercial/create-ad-slot","common/modules/commercial/commercial-features","lodash/objects/defaults"],function(e,o,n,t,i,c,r,a){function m(m){var s,l,u,d,f=a(m||{},{columnSelector:".js-secondary-column",adSlotContainerSelector:".js-ad-slot-container"}),g=o(f.columnSelector),h=g.length&&"none"===n(g,"display");return!r.articleAsideAdverts||h?!1:(s="Article"===t.page.contentType?o(".js-content-main-column"):!1,u=o(".js-components-container",".js-secondary-column"),d=o(f.adSlotContainerSelector),new e(function(e){i.read(function(){l=!s.length||"football"!==t.page.section&&s.dim().height>=1300||"football"===t.page.section&&s.dim().height>=2200?"right-sticky":s.dim().height>=600?"right":"right-small",i.write(function(){"Article"===t.page.contentType&&"advertisement-features"===t.page.sponsorshipType&&u.addClass("u-h"),d.append(c(l,"mpu-banner-ad")),e(d)})})}))}return{init:m}}),define("lodash/objects/cloneDeep",["../internals/baseClone","../internals/baseCreateCallback"],function(e,o){function n(n,t,i){return e(n,!0,"function"==typeof t&&o(t,i,1))}return n}),define("common/modules/commercial/article-body-adverts",["Promise","common/utils/$","common/utils/config","common/utils/detect","common/utils/fastdom-idle","common/modules/article/spacefinder","common/modules/commercial/create-ad-slot","common/modules/commercial/commercial-features","lodash/objects/cloneDeep"],function(e,o,n,t,i,c,r,a,m){function s(){return{minAbove:t.isBreakpoint({max:"tablet"})?300:700,minBelow:300,selectors:{" > h2":{minAbove:"mobile"===t.getBreakpoint()?20:0,minBelow:250}," > *:not(p):not(h2)":{minAbove:35,minBelow:400}," .ad-slot":{minAbove:500,minBelow:500}}}}function l(){var e=m(s());return e.minAbove=300,e.selectors[" > h2"].minAbove=20,e}function u(){var e=m(s());return e.selectors[" .ad-slot"]={minAbove:1300,minBelow:1300},e}function d(){return c.getParaWithSpace(u()).then(function(o){return"undefined"==typeof o||f.length>=9?e.resolve(null):(g.push(["inline"+(f.length+1),"inline"]),h(o).then(function(){return d()}))})}var f=[],g=[["inline1","inline"],["inline2","inline"]],h=function(n){if(n){var t=g[f.length],c=o.create(r(t[0],t[1]));return f.push(c),new e(function(e){i.write(function(){c.insertBefore(n),e(null)})})}return e.resolve(null)},p=function(){var o,i;return a.articleBodyAdverts?(o=s(),i=n.page.hasInlineMerchandise?c.getParaWithSpace(l()).then(function(e){return e&&g.unshift(["im","im"]),h(e)}):e.resolve(null),n.switches.viewability&&"mobile"!==t.getBreakpoint()?i.then(function(){return c.getParaWithSpace(o).then(function(e){return h(e)}).then(function(){return c.getParaWithSpace(o).then(function(e){return h(e)}).then(function(){return d()})})}):i.then(function(){return c.getParaWithSpace(o).then(function(e){return h(e)}).then(function(){return t.isBreakpoint({max:"tablet"})?c.getParaWithSpace(o).then(function(e){return h(e)}):e.resolve(null)})})):!1};return{init:p,getRules:s,getLenientRules:l,reset:function(){f=[]}}}),define("common/modules/commercial/front-commercial-components",["bonzo","common/utils/$","common/utils/config","common/modules/commercial/create-ad-slot","common/modules/commercial/commercial-features"],function(e,o,n,t,i){function c(){if(!i.frontCommercialComponents)return!1;var c,r=o.create('<div class="fc-container"></div>'),a=e(t("merchandising-high","commercial-component-high")),m=o(".fc-container");return m.length>=2?(c=0,m.length>=4&&(c="Network Front"===n.page.contentType?3:2),r.append(a).insertAfter(m[c])):void 0}return{init:c}}),define("common/modules/commercial/slice-adverts",["bonzo","qwery","Promise","common/utils/$","common/utils/config","common/utils/detect","common/utils/fastdom-idle","common/modules/commercial/create-ad-slot","common/modules/user-prefs","common/modules/commercial/commercial-features","lodash/objects/defaults","lodash/collections/contains","lodash/collections/map","common/utils/chain"],function(e,o,n,t,i,c,r,a,m,s,l,u,d,f){var g=i.page.showMpuInAllContainers?999:3,h=function(h){if(!s.sliceAdverts)return!1;for(var p,w,v,b,y=l(h||{},{containerSelector:".fc-container",sliceSelector:".js-fc-slice-mpu-candidate"}),k=o(y.containerSelector),A=0,C=[],j=1,B=m.get("container-states");A<k.length;)p=k[A],w=e(p).data("id"),v=t(y.sliceSelector,p),b=u(["uk","us","au"],i.page.pageId)&&0===A,i.page.showMpuInAllContainers?(C.push(v.first()),A++):!v.length||b||B&&"closed"===B[w]?A++:(C.push(v.first()),A+=j+1);return n.all(f(C).slice(0,g).and(d,function(o,i){var m="inline"+(i+1),s=e(a(m,"container-inline")).addClass("ad-slot--mobile"),l=e(a(m,"container-inline")).addClass("ad-slot--not-mobile");return new n(function(e){r.write(function(){"mobile"!==c.getBreakpoint()?o.removeClass("fc-slice__item--no-mpu").append(l):s.insertAfter(t.ancestor(o[0],"fc-container")),e(null)})})}).valueOf()).then(function(){return C})};return{init:h}}),define("common/modules/commercial/third-party-tags/audience-science-gateway",["common/utils/config"],function(e){function o(){return e.switches.audienceScienceGateway?require(["js!//js.revsci.net/gateway/gw.js?csid=F09828&auto=t&bpid=theguardian"]):void 0}return{load:o}}),define("common/modules/commercial/third-party-tags/imr-worldwide",["common/utils/config"],function(e){function o(){if(e.switches.imrWorldwide){var o=new Image;return o.src=["//secure-uk.imrworldwide.com/cgi-bin/m?ci=uk-305078h&cg=0&cc=1&ts=compact","&si=",encodeURI(window.location.href),"&rp=",encodeURI(document.referrer),"&rnd=",(new Date).getTime()].join(""),o}}return{load:o}}),define("common/modules/commercial/third-party-tags/remarketing",["common/utils/config"],function(e){function o(){return e.switches.remarketing?require(["js!"+n],function(){window.google_trackConversion({google_conversion_id:971225648,google_custom_params:window.google_tag_params,google_remarketing_only:!0})}):void 0}var n="//www.googleadservices.com/pagead/conversion_async.js";return{load:o}}),define("text!common/views/commercial/outbrain.html",[],function(){return'<div class="OUTBRAIN" data-widget-id="<%=widgetCode%>" data-ob-template="guardian"></div>'}),define("common/modules/commercial/third-party-tags/outbrain",["fastdom","common/utils/$","common/utils/config","common/utils/detect","common/utils/mediator","common/utils/template","common/modules/identity/api","text!common/views/commercial/outbrain.html","lodash/collections/contains","common/modules/experiments/ab"],function(e,o,n,t,i,c,r,a,m,s){var l="//widgets.outbrain.com/outbrain.js";return{load:function(){var n,i,r,s=o(".js-outbrain"),u=o(".js-outbrain-container"),d={},f=t.getBreakpoint(),g=this.getSection();f=m(["wide","desktop"],f)?"desktop":f,d={desktop:{image:{sections:"AR_12",all:"AR_13"},text:{sections:"AR_14",all:"AR_15"}},tablet:{image:{sections:"MB_6",all:"MB_7"},text:{sections:"MB_8",all:"MB_9"}},mobile:{image:{sections:"MB_4",all:"MB_5"}}},i=d[f].image[g],n=i,e.write(function(){s.css("display","block"),u.append(o.create(c(a,{widgetCode:n}))),"mobile"!==f&&(r=d[f].text[g],u.append(o.create(c(a,{widgetCode:r})))),this.tracking(n),require(["js!"+l])}.bind(this))},tracking:function(e){require(["ophan/ng"],function(o){o.record({outbrain:{widgetId:e}})})},getSection:function(){return n.page.section.toLowerCase().match("news")||m(["politics","world","business","commentisfree"],n.page.section.toLowerCase())?"sections":"all"},identityPolicy:function(){return!r.isUserLoggedIn()||!(r.isUserLoggedIn()&&n.page.commentable)},hasHighRelevanceComponent:function(){return t.adblockInUse()||"int"===n.page.edition.toLowerCase()},init:function(){!n.switches.outbrain||n.page.isFront||n.page.isPreview||!this.identityPolicy()||s.getParticipations().InjectNetworkFrontTest2&&"variant"===s.getParticipations().InjectNetworkFrontTest2.variant&&s.testCanBeRun("InjectNetworkFrontTest2")||"childrens-books-site"===n.page.section||(this.hasHighRelevanceComponent()?this.load():i.on("modules:commercial:dfp:rendered",function(e){"dfp-ad--merchandising-high"===e.slot.getSlotId().getDomId()&&e.isEmpty&&this.load()}.bind(this)))}}}),define("common/modules/commercial/third-party-tags",["Promise","common/utils/config","common/utils/mediator","common/modules/commercial/commercial-features","common/modules/commercial/third-party-tags/audience-science-gateway","common/modules/commercial/third-party-tags/audience-science-pql","common/modules/commercial/third-party-tags/imr-worldwide","common/modules/commercial/third-party-tags/remarketing","common/modules/commercial/third-party-tags/krux","common/modules/commercial/third-party-tags/outbrain"],function(e,o,n,t,i,c,r,a,m,s){function l(){if(!t.thirdPartyTags)return!1;switch(o.page.edition.toLowerCase()){case"uk":c.load(),i.load()}return s.init(),n.once("modules:commercial:dfp:rendered",function(){u()}),e.resolve(null)}function u(){r.load(),a.load(),m.load()}return{init:l}}),define("bootstraps/commercial",["Promise","common/utils/config","common/utils/mediator","common/utils/robust","common/modules/commercial/article-aside-adverts","common/modules/commercial/article-body-adverts","common/modules/commercial/badges","common/modules/commercial/dfp-api","common/modules/commercial/front-commercial-components","common/modules/commercial/slice-adverts","common/modules/commercial/third-party-tags","lodash/collections/forEach"],function(e,o,n,t,i,c,r,a,m,s,l,u){var d=[["cm-articleAsideAdverts",i.init],["cm-articleBodyAdverts",c.init],["cm-sliceAdverts",s.init],["cm-frontCommercialComponents",m.init],["cm-thirdPartyTags",l.init],["cm-badges",r.init]];return{init:function(){var i=[];u(d,function(e){t.catchErrorsAndLog(e[0],function(){i.push(e[1]())})}),e.all(i).then(function(){o.switches.commercial&&t.catchErrorsAndLogAll([["cm-dfp",a.init],["cm-ready",function(){n.emit("page:commercial:ready")}]])})}}});
//# sourceMappingURL=commercial.js.map