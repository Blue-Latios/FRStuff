(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{341:function(t,e,o){var content=o(400);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(110).default)("2df753e2",content,!0,{sourceMap:!1})},399:function(t,e,o){"use strict";o(341)},400:function(t,e,o){var r=o(109)((function(i){return i[1]}));r.push([t.i,".container{font-size:14px;margin:5px;padding:10px}.text-bold{font-size:20px;font-weight:700}.results{color:#777}ul{margin-bottom:0}",""]),r.locals={},t.exports=r},421:function(t,e,o){"use strict";o.r(e);o(11),o(35),o(14),o(19);var r={data:function(){return{results:"",textStuff:""}},head:function(){return{title:"Gene Format Updater"}},methods:{htmlPaste:function(t){var e="";try{window.clipboardData&&window.clipboardData.getData?(e=window.clipboardData.getData("Text"),alert("May not work in Internet Explorer")):t.clipboardData&&t.clipboardData.getData&&(e=t.clipboardData.getData("text")),this.processInput(e)}catch(t){alert("Error! Not valid pasted data.")}},processInput:function(t){try{this.results=function(t){for(var e,o=/\[item\s*=\s*(Primary|Secondary|Tertiary)\s+Gene\s*:\s*([^\(\)\[\]]+)\s*\(\s*([^\(\)\s]+)\s*\)\s*\]/gi,r=[];null!==(e=o.exec(t));){var n=e[1].toLowerCase();console.log(n);var l=e[2].trim();console.log(l);var c=e[3];console.log(c),r.push({replacement:"[item=".concat(n.charAt(0).toUpperCase()+n.slice(1).toLowerCase()," ").concat(c.charAt(0).toUpperCase()+c.slice(1).toLowerCase()," Gene: ").concat(l.charAt(0).toUpperCase()+l.slice(1).toLowerCase(),"]"),index:e.index,last:e.index+e[0].length})}for(var d=t.slice(0,r[0].index)+r[0].replacement,i=1;i<r.length;i++)d+=t.slice(r[i-1].last,r[i].index)+r[i].replacement;return d+t.slice(r[r.length-1].last,t.length)}(t)}catch(t){alert("Not text?")}},copyText:function(){this.$refs.res.select(),document.execCommand("copy"),this.$refs.res.blur(),this.results="Text copied successfully!"}}},n=(o(399),o(67)),component=Object(n.a)(r,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"container"},[t._m(0),t._v("\n  Select All wishlist text containing old gene format,"),e("br"),t._v("\n  copy, paste into box. Text comes out, copy that and"),e("br"),t._v("\n  paste into the wishlist, or in a Notepad/textfile"),e("br"),t._v("\n  to check first."),e("br"),t._v('\n  Click the "Copy" button to copy the result text.'),e("br"),e("br"),t._v(" "),e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.textStuff,expression:"textStuff"}],staticStyle:{width:"90%"},attrs:{placeholder:"Copy Paste here."},domProps:{value:t.textStuff},on:{paste:t.htmlPaste,input:function(e){e.target.composing||(t.textStuff=e.target.value)}}}),e("br"),t._v(" "),e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.results,expression:"results"}],ref:"res",staticClass:"results",staticStyle:{width:"90%"},attrs:{placeholder:"Results to copy into sheet will be shown here."},domProps:{value:t.results},on:{input:function(e){e.target.composing||(t.results=e.target.value)}}}),e("br"),t._v(" "),e("button",{on:{click:t.copyText}},[t._v("Copy")]),e("br"),e("br"),e("br"),t._v(" "),e("hr"),t._v(" "),t._m(1)])}),[function(){var t=this._self._c;return t("div",{staticClass:"text-bold"},[this._v("What is this?"),t("br")])},function(){var t=this,e=t._self._c;return e("div",{staticClass:"footnote",staticStyle:{"font-size":"10px"}},[e("a",{attrs:{target:"_blank",rel:"noopener noreferrer",href:"https://www1.flightrising.com/forums/gde/3269795"}},[t._v("Tool thread")]),e("br"),t._v("\n  Tool by BlueLatios.")])}],!1,null,null,null);e.default=component.exports}}]);