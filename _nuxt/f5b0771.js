(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{330:function(t,e,r){var content=r(354);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(109).default)("1892873a",content,!0,{sourceMap:!1})},353:function(t,e,r){"use strict";r(330)},354:function(t,e,r){var o=r(108)((function(i){return i[1]}));o.push([t.i,".container{font-size:14px;margin:5px;padding:10px}.text-bold{font-size:20px;font-weight:700}.results{color:#777}ul{margin-bottom:0}",""]),o.locals={},t.exports=o},375:function(t,e,r){"use strict";r.r(e);r(19),r(11),r(172),r(36);var o=r(318);var l={data:function(){return{results:"",textStuff:""}},head:function(){return{title:"Dragon to Sheets"}},methods:{htmlPaste:function(t){var e="";try{window.clipboardData&&window.clipboardData.getData?(e=window.clipboardData.getData("Text"),alert("May not work in Internet Explorer")):t.clipboardData&&t.clipboardData.getData&&(e=t.clipboardData.getData("text/html")),this.processInput(e)}catch(t){alert("Error! Not valid pasted data.")}},processInput:function(t){try{this.results=function(t){var e=o.parse(t),r=e.querySelector("#main-content").text,l=e.querySelector("#dragon-profile-share").getAttribute("data-id"),n=e.querySelector('span[data-tooltip-source="#dragon-profile-icon-sex-tooltip"]').querySelector("img").getAttribute("src").match(/\/([^/]+)\.png$/)[1];n=n[0].toUpperCase()+n.slice(1);var c=e.querySelector('span[data-tooltip-source="#dragon-profile-icon-eternal-youth-tooltip"]');c=c?"Yes":"No";var d=e.querySelector('span[data-tooltip-source="#dragon-profile-icon-silhouette-tooltip"]');d=d?"Yes":"No";var f=e.querySelector('span[data-tooltip-source="#dragon-profile-icon-reflect-tooltip"]');f=f?"Yes":"No";var h=e.querySelector("#dragon-profile-physical"),v=h.querySelectorAll(".dragon-profile-stat-value"),x=v[0].text.slice(0,-2),y=v[1].text.slice(0,-2),m=v[2].text.slice(0,-3),S=h.querySelectorAll(".dragon-profile-stat-icon-value"),_=S[0].childNodes[0].text.trim(),w=S[0].querySelector("strong").text.split(" (")[0],C=S[1].childNodes[0].text.trim(),N=S[1].querySelector("strong").text.split(" (")[0],D=S[2].childNodes[0].text.trim(),k=S[2].querySelector("strong").text.split(" (")[0],A=S[3].querySelector("strong").text,T=S[4].querySelector("strong").text,element=S[5].childNodes[0].text.trim(),P=S[5].querySelector("strong").text,Y=e.querySelector(".dragon-profile-lineage-parents").querySelector("em");Y=Y?"1":"2+";var z=e.querySelector(".dragon-profile-lineage-offspring").querySelector("em"),I="";return I+=r,I+="\t"+n,I+="\t"+T,I+="\t"+_,I+="\t"+w,I+="\t"+C,I+="\t"+N,I+="\t"+D,I+="\t"+k,I+="\t"+element,I+="\t"+P,I+="\t"+Y,I+="\t"+c,I+="\t"+d,I+="\t"+l,I+="\t"+A,I+="\t"+(z=z?"No":"Yes"),I+="\t"+x,I+="\t"+y,I+="\t"+m,I+="\t"+f,I+"\t"+e.querySelector("time").getAttribute("datetime")}(t)}catch(t){alert("Not valid dragon data?")}},copyText:function(){this.$refs.res.select(),document.execCommand("copy"),this.$refs.res.blur(),this.results="Text copied successfully!"}}},n=(r(353),r(67)),component=Object(n.a)(l,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"container"},[t._m(0),t._v("\n  Select All on dragon page, copy, paste into box."),e("br"),t._v("\n  Text comes out, copy that and paste into Google Sheets."),e("br"),t._v('\n  Click the "Copy" button to copy the result text.'),e("br"),e("br"),t._v(" "),t._m(1),e("br"),t._v(" "),e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.textStuff,expression:"textStuff"}],staticStyle:{width:"90%"},attrs:{placeholder:"Copy Paste here."},domProps:{value:t.textStuff},on:{paste:t.htmlPaste,input:function(e){e.target.composing||(t.textStuff=e.target.value)}}}),e("br"),t._v(" "),e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.results,expression:"results"}],ref:"res",staticClass:"results",staticStyle:{width:"90%"},attrs:{placeholder:"Results to copy into sheet will be shown here."},domProps:{value:t.results},on:{input:function(e){e.target.composing||(t.results=e.target.value)}}}),e("br"),t._v(" "),e("button",{on:{click:t.copyText}},[t._v("Copy")]),e("br"),e("br"),e("br"),t._v(" "),e("hr"),t._v(" "),t._m(2)])}),[function(){var t=this._self._c;return t("div",{staticClass:"text-bold"},[this._v("What is this?"),t("br")])},function(){var t=this._self._c;return t("div",{staticClass:"text-bold"},[t("a",{attrs:{target:"_blank",rel:"noopener noreferrer",href:"https://docs.google.com/spreadsheets/d/1C_Bsog-brvpPR1ANAhLgegZdtorwwtCUcswm40W7cCc"}},[this._v("Click for Sheets Link Here")])])},function(){var t=this,e=t._self._c;return e("div",{staticClass:"footnote",staticStyle:{"font-size":"10px"}},[e("a",{attrs:{target:"_blank",rel:"noopener noreferrer",href:"https://www1.flightrising.com/forums/gde/3269795"}},[t._v("Tool thread")]),e("br"),t._v("\n  Tool by BlueLatios. Tool inspired by G1 Hoarders Pinglist site.")])}],!1,null,null,null);e.default=component.exports}}]);