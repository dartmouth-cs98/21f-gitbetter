(function(t){function e(e){for(var i,r,o=e[0],l=e[1],c=e[2],d=0,f=[];d<o.length;d++)r=o[d],Object.prototype.hasOwnProperty.call(a,r)&&a[r]&&f.push(a[r][0]),a[r]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(t[i]=l[i]);u&&u(e);while(f.length)f.shift()();return s.push.apply(s,c||[]),n()}function n(){for(var t,e=0;e<s.length;e++){for(var n=s[e],i=!0,o=1;o<n.length;o++){var l=n[o];0!==a[l]&&(i=!1)}i&&(s.splice(e--,1),t=r(r.s=n[0]))}return t}var i={},a={app:0},s=[];function r(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=i,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(n,i,function(e){return t[e]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="app://./";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=e,o=o.slice();for(var c=0;c<o.length;c++)e(o[c]);var u=l;s.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},2267:function(t,e,n){"use strict";(function(t){var i=n("2b0e"),a=n("77e9");i["default"].use(a["a"]),e["a"]={data(){return{send_to_terminal:"",banner:{header:"GitBetter 🔥",helpHeader:'Enter "help" for more information.',emoji:{first:"🔅",second:"🔆",time:750},sign:"GitBetterShell $"},commands:[{name:"credits",get(){return"With ❤️ By Salah Bentayeb @halasproject."}},{name:"uname",get(){return navigator.appVersion}}]}},methods:{prompt(e){"node -v"==e&&(this.send_to_terminal=t.versions.node)}}}}).call(this,n("4362"))},"2c84":function(t,e,n){},"2f9d":function(t,e,n){"use strict";n("2c84")},"2fe5":function(t,e,n){},"465c":function(t,e,n){},5193:function(t,e,n){"use strict";n("7ca6")},"56d7":function(t,e,n){"use strict";n.r(e);var i=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"wrapper",attrs:{id:"app"}},[n("Navigation"),n("div",{staticClass:"divider"}),n("router-view")],1)},s=[],r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("nav",{staticClass:"nav level has-shadow"},[n("router-link",{staticClass:"level-item has-text-centered is-info",attrs:{to:"/"}},[t._v(" Home ")]),t._m(0),n("router-link",{staticClass:"level-item has-text-centered is-info",attrs:{to:"/help"}},[t._v(" Help ")])],1)},o=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"level-item has-text-centered"},[n("div",{staticClass:"is-info",staticStyle:{"font-size":"40px"}},[t._v(" Git Better ")])])}],l={name:"Navigation",data(){return{links:[{id:0,text:"Home",page:"/"},{id:1,text:"Help",page:"/help"}]}}},c=l,u=(n("d655"),n("2877")),d=Object(u["a"])(c,r,o,!1,null,"a0f8dd64",null),f=d.exports,p={name:"App",components:{Navigation:f}},m=p,v=(n("cf25"),Object(u["a"])(m,a,s,!1,null,null,null)),h=v.exports,b=n("8c4f"),_=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"columns"},[n("link",{attrs:{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"}}),n("div",{staticClass:"column is-fullheight is-one-fifth sidebar"},[n("Sidebar")],1),n("div",{staticClass:"top-wrapper column"},[n("div",{staticClass:"terminal-wrapper"},[n("div",{staticClass:"headline-component"},[t._v(" Terminal "),n("md-button",{staticClass:"md-icon-button md-raised closing-icon",attrs:{id:"opening-icon"},nativeOn:{click:function(e){return t.openVisualization()}}},[n("md-icon",{staticClass:"fa fa-plus"})],1)],1),n("Terminal")],1),n("div",{staticClass:"visualizations-wrapper",attrs:{id:"visualizations"}},[n("div",{staticClass:"headline-component"},[n("div",[t._v("Visualizations")]),n("md-button",{staticClass:"md-icon-button md-raised closing-icon",attrs:{id:"closing-icon"},nativeOn:{click:function(e){return t.closeVisualization()}}},[n("md-icon",[t._v("close")])],1)],1),n("VizWindow")],1)])])},g=[],y=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},C=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vis-box"},[n("h1",{staticClass:"title"},[t._v(" Window for the git visualizations! ")])])}],w={name:"VizWindow",props:{msg:String}},j=w,x=(n("2f9d"),Object(u["a"])(j,y,C,!1,null,"d579ffce",null)),O=x.exports,E=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-shell",{attrs:{banner:t.banner,shell_input:t.send_to_terminal,commands:t.commands},on:{shell_output:t.prompt}})],1)},S=[],z=n("2267"),$=z["a"],k=Object(u["a"])($,E,S,!1,null,null,null),H=k.exports,B=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},V=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"sidebar ml-0"},[n("div",[n("b",[t._v("Project Structure:")])])])}],P={name:"Sidebar"},T=P,W=(n("d483"),Object(u["a"])(T,B,V,!1,null,"b70548e8",null)),I=W.exports,M=n("43f9"),G=n.n(M);n("51de"),n("e094");i["default"].use(G.a);var N={name:"Home",components:{VizWindow:O,Terminal:H,Sidebar:I},methods:{closeVisualization(){document.getElementById("visualizations").style.display="none",document.getElementById("opening-icon").style.display="block"},openVisualization(){document.getElementById("visualizations").style.display="block",document.getElementById("opening-icon").style.display="none"}}},J=N,A=(n("5193"),Object(u["a"])(J,_,g,!1,null,"7f2e2042",null)),q=A.exports,D=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"main"},[n("div",{staticClass:"columns"},[n("div",{staticClass:"column is-fullheight is-one-fifth sidebar"},[n("Sidebar")],1),t._m(0)])])},F=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"column mr-4 top-container"},[n("div",{staticClass:"container"},[n("h1",{staticClass:"title"},[t._v("Help")])])])}],K={name:"Home",components:{Sidebar:I}},L=K,Q=(n("c16c"),Object(u["a"])(L,D,F,!1,null,"6f774a00",null)),R=Q.exports;i["default"].use(b["a"]);var U=new b["a"]({routes:[{path:"/",name:"Home",component:q},{path:"/help",name:"Help",component:R}]});i["default"].config.productionTip=!1,n("b383"),new i["default"]({render:t=>t(h),router:U}).$mount("#app")},"7ca6":function(t,e,n){},b383:function(t,e,n){},c16c:function(t,e,n){"use strict";n("e744")},cf25:function(t,e,n){"use strict";n("fea6")},d483:function(t,e,n){"use strict";n("2fe5")},d655:function(t,e,n){"use strict";n("465c")},e744:function(t,e,n){},fea6:function(t,e,n){}});
//# sourceMappingURL=app.841defd2.js.map