(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{332:function(t,e,r){var content=r(358);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(109).default)("c07c66e0",content,!0,{sourceMap:!1})},357:function(t,e,r){"use strict";r(332)},358:function(t,e,r){var o=r(108)((function(i){return i[1]}));o.push([t.i,".container{font-size:14px;margin:5px;padding:10px}.text-bold{font-size:20px;font-weight:700}.results{color:#777}ul{margin-bottom:0}",""]),o.locals={},t.exports=o},377:function(t,e,r){"use strict";r.r(e);r(19),r(11),r(36);var o=r(318);var n={data:function(){return{results:"",textStuff:""}},head:function(){return{title:"Recent History to Sheets"}},methods:{htmlPaste:function(t){var e="";try{window.clipboardData&&window.clipboardData.getData?(e=window.clipboardData.getData("Text"),alert("May not work in Internet Explorer")):t.clipboardData&&t.clipboardData.getData&&(e=t.clipboardData.getData("text/html")),this.processInput(e)}catch(t){alert("Error! Not valid pasted data.")}},processInput:function(t){try{this.results=function(t){for(var e=o.parse(t),pattern=/itemicon-([^]*?)-(prev|scry)/,r=/\/cms\/([^]*?)\//,n=/icon_([^]*?)\.png/,l=e.querySelectorAll(".itemicon"),c=e.querySelectorAll(".ah-listing-left"),d=e.querySelectorAll(".ah-listing-right"),v="",i=0;i<l.length;i++){var h,f,m=void 0,y=void 0,x=void 0,_=void 0;if(l[i].getAttribute("href"))m="Dragon",y="#"+l[i].getAttribute("href").split("/").slice(-1),x="1";else{var w=l[i].getAttribute("class").split(" "),S=void 0;3==w.length?"fam"==(S=pattern.exec(w[1])[1].trim())&&(S="Familiar"):S=r.exec(l[i].querySelector("img").getAttribute("src"))[1].trim(),m=S[0].toUpperCase()+S.slice(1),y=l[i].getAttribute("data-name"),x=l[i].getAttribute("data-quantity")}var A=c[i].querySelectorAll("div")[2];h=A.querySelector("b").text,f=A.text.trim().split("on ")[1];var C=d[i].querySelector("img").getAttribute("src"),D=m;D+="\t"+y,D+="\t"+h,D+="\t"+x,D+="\t"+(_=(_=n.exec(C)[1].trim())[0].toUpperCase()+_.slice(1)),D+="\t"+d[i].querySelector(".ah-listing-cost").text,v+=(D+="\t"+f)+"\n"}return v}(t)}catch(t){alert("Not valid AH data?")}},copyText:function(){this.$refs.res.select(),document.execCommand("copy"),this.$refs.res.blur(),this.results="Text copied successfully!"}}},l=(r(357),r(67)),component=Object(l.a)(n,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"container"},[t._m(0),t._v("\n  Select All on Recent History of your Activity Ledger,"),e("br"),t._v("\n  copy, paste into box. Text comes out, copy that and"),e("br"),t._v("\n  paste into Google Sheets."),e("br"),t._v('\n  Click the "Copy" button to copy the result text.'),e("br"),e("br"),t._v("\n  \n  No template Sheets link, but the data is as follows:"),e("br"),t._v("\n  1st column is item type."),e("br"),t._v("\n  2nd column is item name."),e("br"),t._v("\n  3rd column is activity type (Purchased/Sold)."),e("br"),t._v("\n  4th column is item quantity."),e("br"),t._v("\n  5th column is currency type (Gems/Treasure)."),e("br"),t._v("\n  6th column is the currency number."),e("br"),t._v("\n  7th column is the sales date."),e("br"),e("br"),t._v(" "),e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.textStuff,expression:"textStuff"}],staticStyle:{width:"90%"},attrs:{placeholder:"Copy Paste here."},domProps:{value:t.textStuff},on:{paste:t.htmlPaste,input:function(e){e.target.composing||(t.textStuff=e.target.value)}}}),e("br"),t._v(" "),e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.results,expression:"results"}],ref:"res",staticClass:"results",staticStyle:{width:"90%"},attrs:{placeholder:"Results to copy into sheet will be shown here."},domProps:{value:t.results},on:{input:function(e){e.target.composing||(t.results=e.target.value)}}}),e("br"),t._v(" "),e("button",{on:{click:t.copyText}},[t._v("Copy")]),e("br"),e("br"),e("br"),t._v(" "),e("hr"),t._v(" "),t._m(1)])}),[function(){var t=this._self._c;return t("div",{staticClass:"text-bold"},[this._v("What is this?"),t("br")])},function(){var t=this,e=t._self._c;return e("div",{staticClass:"footnote",staticStyle:{"font-size":"10px"}},[e("a",{attrs:{target:"_blank",rel:"noopener noreferrer",href:"https://www1.flightrising.com/forums/gde/3269795"}},[t._v("Tool thread")]),e("br"),t._v("\n  Tool by BlueLatios.")])}],!1,null,null,null);e.default=component.exports}}]);