(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{80:function(e,i,t){"use strict";t.r(i);var s=function(){var e=this,i=e.$createElement,s=e._self._c||i;return s("section",{staticClass:"journey"},[s("transition",{attrs:{name:"section"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:e.isCoverShow,expression:"isCoverShow"}],staticClass:"sec-1"},[s("ul",{staticClass:"path-list"},e._l(e.list,(function(i,t){return s("li",{key:t,staticClass:"path-item",on:{click:function(i){return e.enterVideo(t)}}},[s("img",{attrs:{src:i.image,alt:"",draggable:"false"}}),e._v(" "),s("h2",{staticClass:"path-text"},[e._v(e._s(i.title))])])})),0)])]),e._v(" "),s("transition",[s("div",{directives:[{name:"show",rawName:"v-show",value:!e.isCoverShow,expression:"!isCoverShow"}],staticClass:"sec-2"},[s("div",{staticClass:"trigger",on:{click:e.backTop}},[s("img",{attrs:{src:t(98),alt:""}})]),e._v(" "),s("video-player",{attrs:{options:e.videoOptions,callback:e.videoHandler}})],1)])],1)};s._withStripped=!0;var o=t(25),a=t(7),n=a.a.journey,r={data:function(){return{index:0,isCoverShow:!0,list:n.list,videoPlayer:null,videoOptions:{fill:!0,controls:!0,controlBar:{pictureInPictureToggle:!1},sources:[{src:n.video[0],type:"video/mp4"}]}}},components:{VideoPlayer:o.a},methods:{backTop:function(){var e;null===(e=this.videoPlayer)||void 0===e||e.pause(),this.isCoverShow=!0},enterVideo:function(e){var i,t;this.index!==e&&(this.index=e,null===(t=this.videoPlayer)||void 0===t||t.src(n.video[e]));null===(i=this.videoPlayer)||void 0===i||i.play(),this.isCoverShow=!1,a.a.hideNavbar()},videoHandler:function(e){this.videoPlayer=e}},mounted:function(){a.a.goto(1)}},l=t(6),c=Object(l.a)(r,s,[],!1,null,null,null);c.options.__file="src/view/journey/index.vue";i.default=c.exports},98:function(e,i,t){e.exports=t.p+"img/5dcfab23.png"}}]);