(window.webpackJsonp=window.webpackJsonp||[]).push([[9,5],{277:function(e,t,n){"use strict";n.r(t);n(23);var r={props:{line:{required:!0}},data:function(){return{hidden:!1}},computed:{icon:function(){return this.hidden?"V":"^"},result:function(){var e=this.line.split("<br>");return this.line.substring(e[0].length+4)},name:function(){var e=this.line.split("<br>");return e[0]+(e[1]?"<br>":"")}}},o=n(64),component=Object(o.a)(r,(function(){var e=this,t=e._self._c;return t("div",[t("span",{on:{click:function(){return e.hidden=!e.hidden}}},[t("b",[e._v(e._s(e.icon))]),e._v(" "),t("span",{domProps:{innerHTML:e._s(e.name)}})]),e._v(" "),e.hidden?e._e():t("span",{domProps:{innerHTML:e._s(e.result)}})])}),[],!1,null,null,null);t.default=component.exports},284:function(e,t,n){var content=n(330);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(97).default)("34e90600",content,!0,{sourceMap:!1})},328:function(e,t){e.exports={1:"Thunder Lizards"}},329:function(e,t,n){"use strict";n(284)},330:function(e,t,n){var r=n(96)((function(i){return i[1]}));r.push([e.i,".container{font-size:14px;margin:5px;padding:10px}.text-bold{font-size:20px;font-weight:700}.preformat{font-size:12px;padding:5px;white-space:pre-wrap}ul{margin-bottom:0}",""]),r.locals={},e.exports=r},359:function(e,t,n){"use strict";n.r(t);n(11),n(42),n(1),n(3),n(18),n(98),n(35),n(15);var r=n(278),o=n.n(r),l=n(279),c=n.n(l),d=n(280),h=n.n(d),m=n(328),f=n.n(m),v=n(277),_=["a","an","the","and","of","but","or","for","nor","with","in","on","at","to","from","by"],w=["Randomized Fishpot","Pretty in Pink","Dustcarve Worker Cache","Dustcarve Battle Cache","Dustcarve Food Cache"];function x(text){var e=C((text=text.toLowerCase().split(/[\s]+/))[0],!0);return text.slice(1).forEach((function(t){e+=" "+C(t)})),e}function C(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return t||!_.includes(e)?t&&"'"==e.charAt(0)?"'"+e.charAt(1).toUpperCase()+e.slice(2):e.charAt(0).toUpperCase()+e.slice(1):e}var k={components:{Expandable:v.default},data:function(){return{result:[],resultBBCode:"",resultVisual:"",textStuff:"",simplemode:!1}},head:function(){return{title:"Database Shortcut"}},computed:{simpleModeText:function(){return this.result="",this.resultVisual="",this.resultBBCode="",this.simplemode?"Hibden Simple Mode: On":"Hibden Simple Mode: Off"}},methods:{generate:function(){var e=this.processText(this.textStuff);this.result=e[0],this.resultBBCode=e[1]},generateVisual:function(){""!=this.resultBBCode&&(this.resultVisual=this.resultBBCode,document.getElementById("test").scrollIntoView(!0))},processText:function(e){var t=this,n=e.split("\n"),s=[],r="";return n.forEach((function(line){var a=line.trim();"hibden:"===a.substring(0,7).toLowerCase()?(a=x(a.slice(7).trim()),s=s.concat(t.processLine(a,3)+"<br>"),r+=t.processLine2(a,3)+"<br>"):(a=x(a),s=s.concat(t.processLine(a)+"<br>"),r+=t.processLine2(a)+"<br>")})),[s,r]},processLine:function(line){var e=this,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,s="";return 3==t?o.a[line]?(s+="<b>"+line+"</b><br><ul>",o.a[line].forEach((function(t){s=s.concat("<li>",t[1]," of ",e.processLine(t[0],e.simplemode?9:0),"</li>")})),s.concat("</ul>")):s.concat('The task "<b>'+line+'</b>" is undefined!<br>'):c.a[line]?(9==t||c.a[line].id>=574&&c.a[line].id<=576?s=line:c.a[line].containers||c.a[line].monsters||c.a[line].gathering||c.a[line].baldwin||c.a[line].swap||c.a[line].marketplace||c.a[line].digsite?(s+=line+"<br>",c.a[line].baldwin&&(2!=t&&(s+="<i>Baldwin</i><br>"),s+="<i>(Lv. "+c.a[line].baldwin.level+" Recipe)</i>"+(c.a[line].baldwin.yield>1?" [x"+c.a[line].baldwin.yield+"]":"")+"<ul>",c.a[line].baldwin.items.forEach((function(t){s=s.concat("<li>",t[1]," of ",e.processLine(t[0],e.simplemode?9:2),"</li>")})),s+="</ul>"),c.a[line].containers&&(1==c.a[line].containers.length?w.includes(c.a[line].containers[0])||(s=(s+="Found in:<br><ul>").concat("<li>",this.processLine(c.a[line].containers[0],this.simplemode?9:0),"</li>"),s+="</ul>"):(s+="Found in:<br><ul>",c.a[line].containers.forEach((function(t){w.includes(t)||(s=s.concat("<li>",e.processLine(t,e.simplemode?9:0),"</li>"))})),s+="</ul>")),c.a[line].gathering&&(s=s.concat(c.a[line].gathering.method," Lv. ",c.a[line].gathering.level," in: "),"All"==c.a[line].gathering.locations[0]?s+="All locations.<br>":(s+=c.a[line].gathering.locations[0],c.a[line].gathering.locations.slice(1).forEach((function(e){s+=", "+e})),s+="<br>")),c.a[line].monsters&&(s+="Dropped by:<br><ul>",c.a[line].monsters.forEach((function(e){"[C]"==e[0].split(" ")[0]?s+="<li>"+e[0].substring(4)+" ("+e[1]+")</li>":s+="<li>"+e[0]+" in "+h.a[e[0]]+" ("+e[1]+")</li>"})),s+="</ul>"),c.a[line].swap&&(1!=t&&(s+="<i>Swipp Swap</i><br><ul>"),c.a[line].swap.forEach((function(t){s=s.concat("<li>",t[1]," of ",e.processLine(t[0],e.simplemode?9:1),"</li>")})),s+="</ul>"),c.a[line].marketplace&&(s+="Purchasable in <i>Marketplace</i> for "+c.a[line].marketplace+" treasure<br>"),c.a[line].digsite&&(s+="Diggable in Lv."+c.a[line].digsite+" digsite ("+f.a[c.a[line].digsite]+")<br>"),c.a[line].limited&&(s+="("+c.a[line].limited+")<br>")):s=line,s):line.concat(" is not in the database yet!<br>")},processLine2:function(line){var e=this,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n="";return 3==t?o.a[line]?(n+="[size=4][b]"+line+"[/b][/size]<br>[list]",o.a[line].forEach((function(t){n=n.concat("[*]",t[1]," of ",e.processLine2(t[0],e.simplemode?9:0),"<br>")})),n.concat("[/list]<br>")):n:c.a[line]?(9==t||c.a[line].id>=574&&c.a[line].id<=576?n="[gamedb item="+c.a[line].id+"]":c.a[line].containers||c.a[line].monsters||c.a[line].gathering||c.a[line].baldwin||c.a[line].swap||c.a[line].marketplace||c.a[line].digsite?(n+="[gamedb item="+c.a[line].id+"]<br>",c.a[line].baldwin&&(2!=t&&(n+="[i]Baldwin[/i]<br>"),n+="[size=2][i](Lv. "+c.a[line].baldwin.level+" Recipe)[/i]"+(c.a[line].baldwin.yield>1?" [x"+c.a[line].baldwin.yield+"]":"")+"[/size][list]",c.a[line].baldwin.items.forEach((function(t){n=n.concat("[*]",t[1]," of ",e.processLine2(t[0],e.simplemode?9:2),"<br>")})),n+="[/list]"),c.a[line].containers&&(1==c.a[line].containers.length?w.includes(c.a[line].containers[0])||(n=(n+="Found in:<br>[list]").concat("[*]",this.processLine2(c.a[line].containers[0],this.simplemode?9:0),"<br>"),n+="[/list]"):(n+="Found in:<br>[list]",c.a[line].containers.forEach((function(t){w.includes(t)||(n=n.concat("[*]",e.processLine2(t,e.simplemode?9:0),"<br>"))})),n+="[/list]")),c.a[line].gathering&&(n=n.concat(c.a[line].gathering.method," Lv. ",c.a[line].gathering.level," in: "),"All"==c.a[line].gathering.locations[0]?n+="All locations.<br>":(n+=c.a[line].gathering.locations[0],c.a[line].gathering.locations.slice(1).forEach((function(e){n+=", "+e})),n+="<br>")),c.a[line].monsters&&(n+="Dropped by:<br>","[C]"==c.a[line].monsters[0][0].split(" ")[0]?n+=c.a[line].monsters[0][0].substring(4)+" ("+c.a[line].monsters[0][1]+")<br>":(n+="[list]",c.a[line].monsters.forEach((function(e){n+="[*]"+e[0]+" in "+h.a[e[0]]+" ("+e[1]+")<br>"})),n+="[/list]")),c.a[line].swap&&(1!=t&&(n+="[i]Swipp Swap[/i]<br>[list]"),c.a[line].swap.forEach((function(t){n=n.concat("[*]",t[1]," of ",e.processLine2(t[0],e.simplemode?9:1),"<br>")})),n+="[/list]"),c.a[line].marketplace&&(n+="Purchasable in [i]Marketplace[/i] for "+c.a[line].marketplace+" treasure<br>"),c.a[line].digsite&&(n+="Diggable in Lv."+c.a[line].digsite+" digsite ("+f.a[c.a[line].digsite]+")<br>"),c.a[line].limited&&(n+="("+c.a[line].limited+")<br>")):n="[gamedb item="+c.a[line].id+"]",n):line.concat(" is not in the database yet!<br>")}}},L=k,B=(n(329),n(64)),component=Object(B.a)(L,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"container"},[e._m(0),e._v("\n  tl;dr, game database info simplified."),t("br"),e._v(" "),t("b",[e._v("At present, items included are those that are in Hibernal Den tasks.")]),t("br"),e._v("\n  Swipp and Baldwin items coming soon."),t("br"),t("br"),e._v(" "),e._m(1),e._v("\n  \n  Enter the item name in the box below."),t("br"),e._v("\n  You can enter multiple item names by seperating them with linebreaks"),t("br"),e._v("\n  (the Enter key stuff). Press the Submit button to show results. Click"),t("br"),e._v("\n  on the arrow keys to expand and shrink items."),t("br"),t("br"),e._v("\n  \n  The BBCode button prints out a nice detailed visual representation BBCode"),t("br"),e._v("\n  which you can preview in a Forum post or a dragon's bio. The Simple Mode"),t("br"),e._v("\n  simplifies the details of the results. (Click Submit again to generate the new text.)"),t("br"),t("br"),e._v('\n  \n  For Hibernal Den items, you can start input a line with "Hibden:"'),t("br"),e._v("\n  followed by the name of the Hibernal Den Task."),t("br"),t("br"),e._v("\n  \n  Example inputs:"),t("br"),e._v("\n  Glass Beaker"),t("br"),e._v("\n  Rusted Treasure Chest"),t("br"),e._v("\n  Hibden:Clay for the Den"),t("br"),t("br"),e._v("\n  \n  Notes: Some items, like Broken Bottles, have their"),t("br"),e._v("\n  full info omitted for ease of use. "),e._m(2),t("br"),e._v("\n  *All items in Rusted Treasure Chest are also in Iron Treasure Chest and"),t("br"),e._v("\n  Gilded Decorative Chest, and all items in Iron Treasure Chest are also in Gilded"),t("br"),e._v("\n  Decorative Chest."),t("br"),e._v("\n  Chests that are unobtainable are excluded. "),t("strike",[e._v("So is Pinkerton.")]),t("br"),t("br"),e._v(" "),t("textarea",{directives:[{name:"model",rawName:"v-model",value:e.textStuff,expression:"textStuff"}],staticStyle:{width:"90%"},attrs:{placeholder:"Enter item name here."},domProps:{value:e.textStuff},on:{input:function(t){t.target.composing||(e.textStuff=t.target.value)}}}),t("br"),e._v(" "),t("button",{on:{click:e.generate}},[e._v("Submit")]),e._v(" "),t("button",{on:{click:e.generateVisual}},[e._v("BBCode")]),e._v(" "),t("button",{on:{click:function(){return e.simplemode=!e.simplemode}}},[e._v(e._s(e.simpleModeText))]),t("br"),t("br"),e._v(" "),e._l(e.result,(function(line,i){return t("Expandable",{key:i,attrs:{line:line}})})),e._v(" "),""!=e.resultVisual?t("div",[t("b",[e._v("For BBCode, copy everything from here to the bottom of the page:")]),t("br")]):e._e(),e._v(" "),t("p",{staticClass:"preformat",attrs:{id:"test"},domProps:{innerHTML:e._s(e.resultVisual)}})],2)}),[function(){var e=this._self._c;return e("div",{staticClass:"text-bold"},[this._v("What is this?"),e("br")])},function(){var e=this._self._c;return e("div",{staticClass:"text-bold"},[this._v("How to:"),e("br")])},function(){var e=this,t=e._self._c;return t("b",[e._v("Chests are mostly RNG so do not try to focus"),t("br"),e._v("\n  on getting an item from chests.")])}],!1,null,null,null);t.default=component.exports;installComponents(component,{Expandable:n(277).default})}}]);