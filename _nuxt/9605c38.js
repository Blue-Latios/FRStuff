(window.webpackJsonp=window.webpackJsonp||[]).push([[5,3],{269:function(e,t,n){"use strict";n.r(t);n(11),n(25);var r={props:{line:{required:!0}},data:function(){return{hidden:!1}},computed:{icon:function(){return this.hidden?"V":"^"},result:function(){var e=this.line.split("<br>");return this.line.substring(e[0].length+4)},name:function(){var e=this.line.split("<br>");return e[0]+(e[1]?"<br>":"")}}},o=n(64),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("span",{on:{click:function(){return e.hidden=!e.hidden}}},[n("b",[e._v(e._s(e.icon))]),e._v(" "),n("span",{domProps:{innerHTML:e._s(e.name)}})]),e._v(" "),e.hidden?e._e():n("span",{domProps:{innerHTML:e._s(e.result)}})])}),[],!1,null,null,null);t.default=component.exports},275:function(e,t,n){var content=n(280);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(97).default)("1147967c",content,!0,{sourceMap:!1})},279:function(e,t,n){"use strict";n(275)},280:function(e,t,n){var r=n(96)(!1);r.push([e.i,".container{padding:10px;margin:5px;font-size:14px}.text-bold{font-weight:700;font-size:20px}.preformat{white-space:pre-wrap;padding:5px;font-size:12px}ul{margin-bottom:0}",""]),e.exports=r},284:function(e,t,n){"use strict";n.r(t);n(11),n(25),n(1),n(3),n(18),n(98),n(35),n(15);var r=n(270),o=n.n(r),l=n(271),c=n.n(l),d=n(273),h=n.n(d),f=n(269),m=["a","an","the","and","of","but","or","for","nor","with","in","on","at","to","from","by"],v=["Randomized Fishpot","Pretty in Pink","Dustcarve Worker Cache","Dustcarve Battle Cache"];function _(text){var e=w((text=text.toLowerCase().split(/[\s]+/))[0],!0);return text.slice(1).forEach((function(t){e+=" "+w(t)})),e}function w(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(e.split(/[-]+/)[0]!=e){var n=w((e=e.split(/[-]+/))[0],t);return e.slice(1).forEach((function(e){n+="-"+w(e)})),n}return t||!m.includes(e)?e.charAt(0).toUpperCase()+e.slice(1):e}function k(line){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,s="";return 3==e?o.a[line]?(s+="<b>"+line+"</b><br><ul>",o.a[line].forEach((function(e){s=s.concat("<li>",e[1]," of ",k(e[0]),"</li>")})),s.concat("</ul>")):s.concat('The task "<b>'+line+'</b>" is undefined!<br>'):c.a[line]?(c.a[line].id>=574&&c.a[line].id<=576?s=line:c.a[line].containers||c.a[line].monsters||c.a[line].gathering||c.a[line].baldwin||c.a[line].swap||c.a[line].marketplace?(s+=line+"<br>",c.a[line].baldwin&&(2!=e&&(s+="<i>Baldwin</i><br>"),s+=c.a[line].baldwin.yield>1?"<i>(Recipe: x"+c.a[line].baldwin.yield+")</i><ul>":"<ul>",c.a[line].baldwin.items.forEach((function(e){s=s.concat("<li>",e[1]," of ",k(e[0],2),"</li>")})),s+="</ul>"),c.a[line].containers&&(1==c.a[line].containers.length?v.includes(c.a[line].containers[0])||(s=(s+="Found in:<br><ul>").concat("<li>",k(c.a[line].containers[0]),"</li>"),s+="</ul>"):(s+="Found in:<br><ul>",c.a[line].containers.forEach((function(e){v.includes(e)||(s=s.concat("<li>",k(e),"</li>"))})),s+="</ul>")),c.a[line].gathering&&(s=s.concat(c.a[line].gathering.method," Lv. ",c.a[line].gathering.level," in: "),"All"==c.a[line].gathering.locations[0]?s+="All locations.<br>":(s+=c.a[line].gathering.locations[0],c.a[line].gathering.locations.slice(1).forEach((function(e){s+=", "+e})),s+="<br>")),c.a[line].monsters&&(s+="Dropped by:<br><ul>",c.a[line].monsters.forEach((function(e){"[C]"==e[0].split(" ")[0]?s+="<li>"+e[0].substring(4)+" ("+e[1]+")</li>":s+="<li>"+e[0]+" in "+h.a[e[0]]+" ("+e[1]+")</li>"})),s+="</ul>"),c.a[line].swap&&(1!=e&&(s+="<i>Swipp Swap</i><br><ul>"),c.a[line].swap.forEach((function(e){s=s.concat("<li>",e[1]," of ",k(e[0],1),"</li>")})),s+="</ul>"),c.a[line].marketplace&&(s+="Purchasable in <i>Marketplace</i> for "+c.a[line].marketplace+" treasure<br>")):s=line,s):line.concat(" is not in the database yet!<br>")}function C(line){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,t="";return 3==e?o.a[line]?(t+="[size=4][b]"+line+"[/b][/size]<br>[list]",o.a[line].forEach((function(e){t=t.concat("[*]",e[1]," of ",C(e[0]),"<br>")})),t.concat("[/list]<br>")):t:c.a[line]?(c.a[line].id>=574&&c.a[line].id<=576?t="[gamedb item="+c.a[line].id+"]":c.a[line].containers||c.a[line].monsters||c.a[line].gathering||c.a[line].baldwin||c.a[line].swap||c.a[line].marketplace?(t+="[gamedb item="+c.a[line].id+"]<br>",c.a[line].baldwin&&(2!=e&&(t+="[i]Baldwin[/i]<br>"),t+=c.a[line].baldwin.yield>1?"[size=2][i](Recipe: x"+c.a[line].baldwin.yield+")[/i][/size][list]":"[list]",c.a[line].baldwin.items.forEach((function(e){t=t.concat("[*]",e[1]," of ",C(e[0],2),"<br>")})),t+="[/list]"),c.a[line].containers&&(1==c.a[line].containers.length?v.includes(c.a[line].containers[0])||(t=(t+="Found in:<br>[list]").concat("[*]",C(c.a[line].containers[0]),"<br>"),t+="[/list]"):(t+="Found in:<br>[list]",c.a[line].containers.forEach((function(e){v.includes(e)||(t=t.concat("[*]",C(e),"<br>"))})),t+="[/list]")),c.a[line].gathering&&(t=t.concat(c.a[line].gathering.method," Lv. ",c.a[line].gathering.level," in: "),"All"==c.a[line].gathering.locations[0]?t+="All locations.<br>":(t+=c.a[line].gathering.locations[0],c.a[line].gathering.locations.slice(1).forEach((function(e){t+=", "+e})),t+="<br>")),c.a[line].monsters&&(t+="Dropped by:<br>","[C]"==c.a[line].monsters[0][0].split(" ")[0]?t+=c.a[line].monsters[0][0].substring(4)+" ("+c.a[line].monsters[0][1]+")<br>":(t+="[list]",c.a[line].monsters.forEach((function(e){t+="[*]"+e[0]+" in "+h.a[e[0]]+" ("+e[1]+")<br>"})),t+="[/list]")),c.a[line].swap&&(1!=e&&(t+="[i]Swipp Swap[/i]<br>[list]"),c.a[line].swap.forEach((function(e){t=t.concat("[*]",e[1]," of ",C(e[0],1),"<br>")})),t+="[/list]"),c.a[line].marketplace&&(t+="Purchasable in [i]Marketplace[/i] for "+c.a[line].marketplace+" treasure<br>")):t="[gamedb item="+c.a[line].id+"]",t):line.concat(" is not in the database yet!<br>")}var x={components:{Expandable:f.default},data:function(){return{result:[],resultBBCode:"",resultVisual:"",textStuff:""}},head:function(){return{title:"Database Shortcut"}},methods:{generate:function(){var e,t,s,n,r=(e=this.textStuff,t=e.split("\n"),s=[],n="",t.forEach((function(line){var a=line.trim();"hibden:"===a.substring(0,7).toLowerCase()?(a=_(a.slice(7).trim()),s=s.concat(k(a,3)+"<br>"),n+=C(a,3)+"<br>"):(a=_(a),s=s.concat(k(a)+"<br>"),n+=C(a)+"<br>")})),[s,n]);this.result=r[0],this.resultBBCode=r[1]},generateVisual:function(){""!=this.resultBBCode&&(this.resultVisual=this.resultBBCode)}}},E=(n(279),n(64)),component=Object(E.a)(x,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[e._m(0),e._v("\n  tl;dr, game database info simplified."),n("br"),e._v(" "),n("b",[e._v("At present, items included are up to page 5 of the Hibernal Den tasks.")]),n("br"),n("br"),e._v(" "),e._m(1),e._v("\n  \n  Enter the item name in the box below."),n("br"),e._v("\n  You can enter multiple item names by seperating them with linebreaks"),n("br"),e._v("\n  (the Enter key stuff). Press the Submit button to show results. Click"),n("br"),e._v("\n  on the arrow keys to expand and shrink items."),n("br"),n("br"),e._v("\n  \n  Example input:"),n("br"),e._v("\n  Glass Beaker"),n("br"),e._v("\n  Rusted Treasure Chest"),n("br"),n("br"),e._v("\n  \n  The BBCode button prints out a nice detailed visual representation BBCode"),n("br"),e._v("\n  which you can preview in a Forum post or a dragon's bio."),n("br"),e._v(" "),e._m(2),e._v(" Swipp and Baldwin items coming soon."),n("br"),n("br"),e._v('\n  \n  For Hibernal Den items, you can start input a line with "Hibden:"'),n("br"),e._v("\n  followed by the name of the Hibernal Den Task."),n("br"),e._v("\n  Hibden:Clay for the Den"),n("br"),n("br"),e._v("\n  \n  Notes: Make sure to "),n("b",[e._v("match capitalization")]),e._v(" with the Game Database, such as"),n("br"),e._v('\n  "Clay for the Den" and "Green Ooze". Some items, like Broken Bottles, have their'),n("br"),e._v("\n  full info omitted for ease of use. "),e._m(3),n("br"),e._v("\n  *All items in Rusted Treasure Chest are also in Iron Treasure Chest and"),n("br"),e._v("\n  Gilded Decorative Chest, and all items in Iron Treasure Chest are also in Gilded"),n("br"),e._v("\n  Decorative Chest."),n("br"),e._v("\n  Chests that are unobtainable are excluded. "),n("strike",[e._v("So is Pinkerton.")]),n("br"),n("br"),e._v(" "),n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.textStuff,expression:"textStuff"}],staticStyle:{width:"90%"},attrs:{placeholder:"Enter item name here."},domProps:{value:e.textStuff},on:{input:function(t){t.target.composing||(e.textStuff=t.target.value)}}}),n("br"),e._v(" "),n("button",{on:{click:e.generate}},[e._v("Submit")]),e._v(" "),n("button",{on:{click:e.generateVisual}},[e._v("BBCode")]),n("br"),n("br"),e._v(" "),e._l(e.result,(function(line,i){return n("Expandable",{key:i,attrs:{line:line}})})),e._v(" "),""!=e.resultVisual?n("div",[e._v("Copy everything from here:"),n("br")]):e._e(),e._v(" "),n("p",{staticClass:"preformat",domProps:{innerHTML:e._s(e.resultVisual)}})],2)}),[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"text-bold"},[e._v("What is this?"),n("br")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"text-bold"},[e._v("How to:"),n("br")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("b",[e._v("At present, the items included are focused on Hibernal Den Task"),n("br"),e._v("\n  items.")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("b",[e._v("Chests are mostly RNG so do not try to focus"),n("br"),e._v("\n  on getting an item from chests.")])}],!1,null,null,null);t.default=component.exports;installComponents(component,{Expandable:n(269).default})}}]);