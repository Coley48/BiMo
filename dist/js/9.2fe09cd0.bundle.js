(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{27:function(i,e,t){"use strict";t.r(e);var s=function(){var i=this,e=i.$createElement,t=i._self._c||e;return t("section",{staticClass:"sakumap"},[t("transition",{attrs:{name:"section"}},[t("div",{directives:[{name:"show",rawName:"v-show",value:i.isCoverShow,expression:"isCoverShow"}],staticClass:"sec-1"},[t("div",{staticClass:"cover"},[t("div",{staticClass:"opener",on:{click:function(e){return i.enter()}}},i._l(i.poemList,(function(e,s){return t("p",{key:s},[i._v("\n            "+i._s(e)+"\n          ")])})),0)])])]),i._v(" "),t("transition",[t("div",{directives:[{name:"show",rawName:"v-show",value:!i.isCoverShow,expression:"!isCoverShow"}],staticClass:"sec-2"},[t("div",{staticClass:"map-wrapper"},[t("ul",{staticClass:"launcher"},i._l(i.points,(function(e,s){return t("li",{key:s,style:e.position,attrs:{"data-content":e.title},on:{click:function(t){return i.showVideo(e.area,s)}}})})),0),i._v(" "),i.isVideoShow?t("video",{staticClass:"player",class:i.classObj,style:i.videoPosition,attrs:{autoplay:"",src:i.videoSrc},on:{click:function(e){i.isVideoFull=!i.isVideoFull}}}):i._e(),i._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:i.isVideoShow,expression:"isVideoShow"}],staticClass:"shelter",on:{click:i.hideVideo}})])])])],1)};s._withStripped=!0;var o=t(91).a,n=t(1),r=Object(n.a)(o,s,[],!1,null,"8d6be754",null);r.options.__file="src/view/sakumap/index.vue";e.default=r.exports},91:function(i,e,t){"use strict";(function(i){var s=t(0);function o(i,e){var t=Object.keys(i);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(i);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(i,e).enumerable}))),t.push.apply(t,s)}return t}function n(i,e,t){return e in i?Object.defineProperty(i,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):i[e]=t,i}e.a={data:function(){return this.$store.commit("setIndex",4),{index:-1,isCoverShow:!0,isVideoShow:!1,isVideoFull:!1,player:null,isPosition:!1}},methods:{enter:function(){this.isCoverShow=!1,this.$store.commit("hideNavbar")},showVideo:function(i,e){var t;this.isVideoShow=!0,this.index=e,null===(t=this.player)||void 0===t||t.play()},hideVideo:function(){var i;this.isVideoShow=!1,this.isVideoFull=!1,null===(i=this.player)||void 0===i||i.pause()}},mounted:function(){this.player=document.querySelector(".sakumap .player"),i(window).width()>=1280&&(this.isPosition=!0)},computed:function(i){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?o(Object(t),!0).forEach((function(e){n(i,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(i,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(e){Object.defineProperty(i,e,Object.getOwnPropertyDescriptor(t,e))}))}return i}({videoSrc:function(){return-1!==this.index?this.points[this.index].src:""},videoPosition:function(){return this.isPosition?this.points[this.index].position:""},classObj:function(){return n({full:this.isVideoFull},this.points[this.index].area,this.isPosition)}},Object(s.c)({poemList:function(i){return i.sakumap.poemList},points:function(i){return i.sakumap.points}}))}}).call(this,t(12))}}]);