(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{101:function(t,e,i){t.exports=i.p+"img/7563e06d.png"},102:function(t,e,i){t.exports=i.p+"img/a7437243.png"},103:function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"handle-bar",on:{click:function(e){return e.stopPropagation(),t.toggle()}}},[i("svg",{staticClass:"icon",attrs:{width:"1em",height:"1em",fill:"currentColor",t:"1602317390907",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"7552"}},[i("path",{attrs:{d:"M605.824 513.536l335.68 338.304c24.704 24.96 24.704 65.28 0 90.176-24.704 24.896-64.768 24.896-89.472 0L471.616 558.656l0 0c0 0 0 0 0 0-18.496-18.688-23.168-46.08-13.888-69.056 3.072-7.68 7.744-14.912 13.952-21.12l380.352-383.424c24.704-24.96 64.768-24.96 89.472 0 24.704 24.96 24.704 65.28 0 90.24L605.824 513.536zM219.072 511.296l340.736 338.944c25.088 24.96 25.088 65.408 0 90.368-12.544 12.48-28.992 18.752-45.44 18.752-16.448 0-32.896-6.208-45.44-18.752L82.88 556.48l0 0c0 0 0 0 0 0C64 537.728 59.264 510.336 68.736 487.232c3.136-7.68 7.872-14.912 14.144-21.12l386.112-384.128c12.544-12.48 28.992-18.752 45.44-18.752 16.448 0 32.896 6.208 45.376 18.688 25.088 25.024 25.088 65.408 0 90.368L219.072 511.296z","p-id":"7553"}})]),t._v(" "),t._t("default")],2)};s._withStripped=!0;var a={methods:{toggle:function(){this.$emit("toggle")}}},n=i(7),o=Object(n.a)(a,s,[],!1,null,"b6a522ce",null);o.options.__file="src/component/handle-bar.vue";e.a=o.exports},104:function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"image-slider-wrap"},[i("ul",{ref:"imageSlider",staticClass:"image-slider"},t._l(t.list,(function(e,s){return i("li",{key:s,attrs:{"data-index":s}},[i("img",{attrs:{src:e.origin,alt:""},on:{click:function(e){return t.display(e,s)}}})])})),0)])};s._withStripped=!0;var a=i(98).a,n=i(7),o=Object(n.a)(a,s,[],!1,null,"20ffddfe",null);o.options.__file="src/component/image-slider.vue";e.a=o.exports},85:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{staticClass:"ceremony"},[s("transition",{attrs:{name:"section"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.isCoverShow,expression:"isCoverShow"}],staticClass:"sec-1"},[s("div",{staticClass:"info",class:{show:t.isInfoShow}},[s("h3",[t._v(t._s(t.name[t.infoIndex]))]),t._v(" "),s("p",[t._v(t._s(t.info[t.infoIndex]))])]),t._v(" "),s("div",{staticClass:"cube"},t._l(t.cube,(function(e,i){return s("div",{key:i,class:i,attrs:{"data-content":e.name,"data-toggle":"popover"},on:{mouseover:function(i){return t.showInfo(e.index)},mouseleave:function(e){t.isInfoShow=!1},click:function(i){return t.enterVideo(e.index)}}},[s("video",{attrs:{preload:"metadata",muted:"",loop:"",autoplay:"","x5-video-player-type":"h5",playsinline:"true","webkit-playsinline":"true","x-webkit-airplay":"true","x5-video-orientation":"portraint","x5-video-player-fullscreen":"true"},domProps:{muted:!0}},[s("source",{attrs:{src:e.src}})])])})),0)])]),t._v(" "),s("transition",[s("div",{directives:[{name:"show",rawName:"v-show",value:!t.isCoverShow,expression:"!isCoverShow"}],staticClass:"sec-2"},[s("transition-group",{attrs:{name:"slide-toggle"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:0===t.slideIndex,expression:"slideIndex === 0"}],key:0,staticClass:"slide"},[s("div",{staticClass:"main-wrap"},[s("list-group",{staticClass:"left-part text-center",class:{active:t.isListActive},attrs:{title:"仪式环节",callback:t.listHandler,list:t.segmentTextList,index:t.listIndex},on:{click:function(e){t.isListActive=!1},active:t.skipVideo}},[s("handle-bar",{staticClass:"bar-rotate",class:{active:t.isListActive},on:{toggle:function(e){t.isListActive=!t.isListActive},"~toggle":function(e){return t.closeListTips(e)}}},[s("div",{staticClass:"right-center animated",class:t.listTipsState,attrs:{"data-toggle":"tips","data-content":"点击查看仪式主要环节"}})])],1),t._v(" "),s("div",{staticClass:"center-part"},[s("transition",[s("div",{directives:[{name:"show",rawName:"v-show",value:!t.isSliderActive,expression:"!isSliderActive"}],staticClass:"trigger left-bottom animated",class:t.backCeremonyTopTipsState,attrs:{"data-toggle":"tips","data-content":"点击返回仪式导航页"},on:{click:t.backTop,"~click":function(e){return t.closeBackTopTips(e)}}},[s("img",{attrs:{src:i(101),alt:""}})])]),t._v(" "),s("video-player",{attrs:{options:t.videoOptions,callback:t.videoHandler}})],1),t._v(" "),s("div",{staticClass:"right-part left-center animated",class:[{active:t.isSliderActive},t.factorTipsState],attrs:{"data-toggle":"tips","data-content":"点击浮动元素了解更多"}},[s("div",{staticClass:"trigger left-top animated",class:[{shake:t.isTriggerShake},t.sliderTipsState],attrs:{"data-toggle":"tips","data-content":"点击查看仪式关键元素"},on:{click:t.toggleSlider,"~click":function(e){return t.closeSliderTips(e)}}},[s("img",{attrs:{src:i(102),alt:""}})]),t._v(" "),s("image-slider",{class:{shake:t.isFactorShake},attrs:{list:t.element[t.index],callback:t.sliderHandler},on:{display:t.showMore}})],1)],1)]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:1===t.slideIndex,expression:"slideIndex === 1"}],key:1,staticClass:"slide"},[s("div",{staticClass:"factor-wrap"},[s("div",{staticClass:"back-to-video"},[s("handle-bar",{staticClass:"bar-shake",on:{toggle:t.backVideo},nativeOn:{"~click":function(e){return t.closeBackVideoTips(e)}}},[s("div",{staticClass:"right-center animated",class:t.backVideoTipsState,attrs:{"data-toggle":"tips","data-content":"点击返回视频"}})])],1),t._v(" "),s("div",{staticClass:"card-wrap"},[s("div",{staticClass:"card top-right animated",class:[{active:t.isCardActive},t.cardTipsState],attrs:{"data-toggle":"tips","data-content":"点击关键元素查看更多信息"}},[s("img",{staticClass:"origin",attrs:{src:t.currentElement.origin,alt:"",draggable:"false"}}),t._v(" "),s("img",{staticClass:"factor",style:t.currentElement.style,attrs:{src:t.currentElement.factor,alt:"",draggable:"false"},on:{click:function(e){t.isCardActive=!0},"~click":function(e){return t.closeCardTips(e)}}}),t._v(" "),s("div",{staticClass:"card-back",on:{click:function(e){t.isCardActive=!1}}},[s("img",{staticClass:"paint",attrs:{src:t.currentElement.paint,alt:"",draggable:"false"}}),t._v(" "),s("div",{staticClass:"text-content"},[s("h3",{staticClass:"name"},[t._v(t._s(t.currentElement.name))]),t._v(" "),s("p",{staticClass:"info"},[t._v(t._s(t.currentElement.info))])])])])])])])])],1)])],1)};s._withStripped=!0;var a=i(97).a,n=i(7),o=Object(n.a)(a,s,[],!1,null,"7c1bb9e6",null);o.options.__file="src/view/ceremony/index.vue";e.default=o.exports},97:function(t,e,i){"use strict";(function(t){var s=i(5),a=i(44),n=i(103),o=i(27),r=i(104),l=s.a.ceremony;e.a={data:function(){return{index:0,infoIndex:0,slideIndex:0,elementIndex:0,listIndex:-1,isCoverShow:!0,isInfoShow:!1,isListActive:!1,isSliderActive:!1,isCardActive:!1,isFactorShake:!1,isTriggerShake:!1,backCeremonyTopTipsState:sessionStorage.getItem("backCeremonyTopTipsState")||"show",listTipsState:sessionStorage.getItem("listTipsState")||"show",sliderTipsState:sessionStorage.getItem("sliderTipsState")||"show",factorTipsState:sessionStorage.getItem("factorTipsState")||"hide",backVideoTipsState:sessionStorage.getItem("backVideoTipsState")||"show",cardTipsState:sessionStorage.getItem("cardTipsState")||"show",name:l.name,info:l.info,cube:l.cube,segment:l.segment,element:l.element,imageSlider:null,videoPlayer:null,videoOptions:{fill:!0,controls:!0,controlBar:{pictureInPictureToggle:!1},sources:[{src:l.video[0],type:"video/mp4"}]}}},methods:{showInfo:function(t){this.isInfoShow=!0,this.infoIndex=t},toggleSlider:function(){this.isSliderActive=!this.isSliderActive,this.isListActive=!1},backTop:function(){var t;this.isCoverShow=!0,this.isListActive=!1,this.isSliderActive=!1,null===(t=this.player)||void 0===t||t.pause()},enterVideo:function(t){var e,i;this.index!==t&&(this.index=t,this.listIndex=-1,null===(i=this.player)||void 0===i||i.src(l.video[t]));null===(e=this.player)||void 0===e||e.play(),this.isCoverShow=!1,s.a.hideNavbar()},showMore:function(t){var e;this.slideIndex=1,this.elementIndex=t,null===(e=this.player)||void 0===e||e.pause(),this.isFactorShake=!1},backVideo:function(){var t;this.isCardActive=!1,this.slideIndex=0,null===(t=this.player)||void 0===t||t.play()},skipVideo:function(t){var e;this.listIndex=t,null===(e=this.player)||void 0===e||e.currentTime(this.segmentTimePoints[t])},updateTime:function(){var t,e=this,i=Math.floor(null===(t=this.player)||void 0===t?void 0:t.currentTime()),s=this.segmentTimePoints.indexOf(i);-1!=s&&(this.listIndex=s);var a=this.elementTimePoints.indexOf(i);-1!=a&&(this.isFactorShake=!0,this.isTriggerShake=!0,setTimeout((function(){e.isTriggerShake=!1}),3e3),this.imageSlider.slide(a-this.imageSlider.children(":nth-child(4)").attr("data-index")))},videoHandler:function(t){var e;this.player=t,null===(e=this.player)||void 0===e||e.on("timeupdate",s.a.debounce(this.updateTime,950))},listHandler:function(){},sliderHandler:function(t){this.imageSlider=t},closeBackTopTips:function(){this.backCeremonyTopTipsState="hide",sessionStorage.setItem("backCeremonyTopTipsState","hide")},closeSliderTips:function(){null===sessionStorage.getItem("factorTipsState")&&(this.factorTipsState="show"),sessionStorage.setItem("factorTipsState","hide"),this.sliderTipsState="hide",sessionStorage.setItem("sliderTipsState","hide")},closeListTips:function(){this.listTipsState="hide",sessionStorage.setItem("listTipsState","hide")},closeBackVideoTips:function(){this.backVideoTipsState="hide",sessionStorage.setItem("backVideoTipsState","hide")},closeCardTips:function(){this.cardTipsState="hide",sessionStorage.setItem("cardTipsState","hide")}},computed:{currentElement:function(){return this.element[this.index][this.elementIndex]},segmentTextList:function(){return this.segment[this.index].map((function(t){return t.text}))},segmentTimePoints:function(){return this.segment[this.index].map((function(t){return t.time}))},elementTimePoints:function(){return this.element[this.index].map((function(t){return t.time}))}},components:{ListGroup:a.default,HandleBar:n.a,VideoPlayer:o.a,ImageSlider:r.a},mounted:function(){s.a.goto(2);var e=t(window),a=e.height()/2,n=e.width()/2;if(n>=640){var o=t(".ceremony .sec-1");o.on("mousemove",(function(t){o.css("perspective-origin","".concat(t.clientX-n,"px ").concat(t.clientY-a,"px"))})),o.find(".cube").on("mouseover",(function(t){s.a.playClickAudio()})),i.e(0).then(i.t.bind(null,43,7)).then((function(){t(".card-back").on("mousewheel",(function(t){return t.stopPropagation()}))}))}}}}).call(this,i(26))},98:function(t,e,i){"use strict";(function(t){e.a={data:function(){return{slider:null,median:3}},props:{list:{type:Array,default:function(){return[]}},callback:{type:Function,default:function(){return null}}},methods:{display:function(t,e){var i=this.slider.find("img").index(t.target);i<this.median?this.slider.slide(-1):i==this.median?this.$emit("display",e):this.slider.slide(1)}},mounted:function(){this.slider=t(this.$refs.imageSlider),this.slider.slide=function(t){if(t<0)for(;t++<0;)this.prepend(this.children(":last"));else for(;t-- >0;)this.append(this.children(":first"))},this.callback&&this.callback(this.slider)}}}).call(this,i(26))}}]);