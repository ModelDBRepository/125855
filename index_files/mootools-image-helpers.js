//MooTools More, <http://mootools.net/more>. Copyright (c) 2006-2009 Aaron Newton <http://clientcide.com/>, Valerio Proietti <http://mad4milk.net> & the MooTools team <http://mootools.net/developers>, MIT Style License.

MooTools.More={version:"1.2.3.1"};Element.implement({measure:function(e){var g=function(h){return !!(!h||h.offsetHeight||h.offsetWidth);};if(g(this)){return e.apply(this);
}var d=this.getParent(),b=[],f=[];while(!g(d)&&d!=document.body){b.push(d.expose());d=d.getParent();}var c=this.expose();var a=e.apply(this);c();b.each(function(h){h();
});return a;},expose:function(){if(this.getStyle("display")!="none"){return $empty;}var a=this.style.cssText;this.setStyles({display:"block",position:"absolute",visibility:"hidden"});
return function(){this.style.cssText=a;}.bind(this);},getDimensions:function(a){a=$merge({computeSize:false},a);var d={};var c=function(f,e){return(e.computeSize)?f.getComputedSize(e):f.getSize();
};if(this.getStyle("display")=="none"){d=this.measure(function(){return c(this,a);});}else{try{d=c(this,a);}catch(b){}}return $chk(d.x)?$extend(d,{width:d.x,height:d.y}):$extend(d,{x:d.width,y:d.height});
},getComputedSize:function(a){a=$merge({styles:["padding","border"],plains:{height:["top","bottom"],width:["left","right"]},mode:"both"},a);var c={width:0,height:0};
switch(a.mode){case"vertical":delete c.width;delete a.plains.width;break;case"horizontal":delete c.height;delete a.plains.height;break;}var b=[];$each(a.plains,function(g,f){g.each(function(h){a.styles.each(function(i){b.push((i=="border")?i+"-"+h+"-width":i+"-"+h);
});});});var e={};b.each(function(f){e[f]=this.getComputedStyle(f);},this);var d=[];$each(a.plains,function(g,f){var h=f.capitalize();c["total"+h]=0;c["computed"+h]=0;
g.each(function(i){c["computed"+i.capitalize()]=0;b.each(function(k,j){if(k.test(i)){e[k]=e[k].toInt()||0;c["total"+h]=c["total"+h]+e[k];c["computed"+i.capitalize()]=c["computed"+i.capitalize()]+e[k];
}if(k.test(i)&&f!=k&&(k.test("border")||k.test("padding"))&&!d.contains(k)){d.push(k);c["computed"+h]=c["computed"+h]-e[k];}});});});["Width","Height"].each(function(g){var f=g.toLowerCase();
if(!$chk(c[f])){return;}c[f]=c[f]+this["offset"+g]+c["computed"+g];c["total"+g]=c[f]+c["total"+g];delete c["computed"+g];},this);return $extend(e,c);}});
(function(){var a=Element.prototype.position;Element.implement({position:function(r){if(r&&($defined(r.x)||$defined(r.y))){return a?a.apply(this,arguments):this;
}$each(r||{},function(t,s){if(!$defined(t)){delete r[s];}});r=$merge({relativeTo:document.body,position:{x:"center",y:"center"},edge:false,offset:{x:0,y:0},returnPos:false,relFixedPosition:false,ignoreMargins:false,allowNegative:false},r);
var b={x:0,y:0};var h=false;var c=this.measure(function(){return document.id(this.getOffsetParent());});if(c&&c!=this.getDocument().body){b=c.measure(function(){return this.getPosition();
});h=true;r.offset.x=r.offset.x-b.x;r.offset.y=r.offset.y-b.y;}var q=function(s){if($type(s)!="string"){return s;}s=s.toLowerCase();var t={};if(s.test("left")){t.x="left";
}else{if(s.test("right")){t.x="right";}else{t.x="center";}}if(s.test("upper")||s.test("top")){t.y="top";}else{if(s.test("bottom")){t.y="bottom";}else{t.y="center";
}}return t;};r.edge=q(r.edge);r.position=q(r.position);if(!r.edge){if(r.position.x=="center"&&r.position.y=="center"){r.edge={x:"center",y:"center"};}else{r.edge={x:"left",y:"top"};
}}this.setStyle("position","absolute");var p=document.id(r.relativeTo)||document.body;var i=p==document.body?window.getScroll():p.getPosition();var o=i.y;
var g=i.x;if(Browser.Engine.trident){var l=p.getScrolls();o+=l.y;g+=l.x;}var j=this.getDimensions({computeSize:true,styles:["padding","border","margin"]});
if(r.ignoreMargins){r.offset.x=r.offset.x-j["margin-left"];r.offset.y=r.offset.y-j["margin-top"];}var n={};var d=r.offset.y;var e=r.offset.x;var k=window.getSize();
switch(r.position.x){case"left":n.x=g+e;break;case"right":n.x=g+e+p.offsetWidth;break;default:n.x=g+((p==document.body?k.x:p.offsetWidth)/2)+e;break;}switch(r.position.y){case"top":n.y=o+d;
break;case"bottom":n.y=o+d+p.offsetHeight;break;default:n.y=o+((p==document.body?k.y:p.offsetHeight)/2)+d;break;}if(r.edge){var m={};switch(r.edge.x){case"left":m.x=0;
break;case"right":m.x=-j.x-j.computedRight-j.computedLeft;break;default:m.x=-(j.x/2);break;}switch(r.edge.y){case"top":m.y=0;break;case"bottom":m.y=-j.y-j.computedTop-j.computedBottom;
break;default:m.y=-(j.y/2);break;}n.x=n.x+m.x;n.y=n.y+m.y;}n={left:((n.x>=0||h||r.allowNegative)?n.x:0).toInt(),top:((n.y>=0||h||r.allowNegative)?n.y:0).toInt()};
if(p.getStyle("position")=="fixed"||r.relFixedPosition){var f=window.getScroll();n.top=n.top.toInt()+f.y;n.left=n.left.toInt()+f.x;}if(r.returnPos){return n;
}else{this.setStyles(n);}return this;}});})();Fx.Elements=new Class({Extends:Fx.CSS,initialize:function(b,a){this.elements=this.subject=$$(b);this.parent(a);
},compute:function(g,h,j){var c={};for(var d in g){var a=g[d],e=h[d],f=c[d]={};for(var b in a){f[b]=this.parent(a[b],e[b],j);}}return c;},set:function(b){for(var c in b){var a=b[c];
for(var d in a){this.render(this.elements[c],d,a[d],this.options.unit);}}return this;},start:function(c){if(!this.check(c)){return this;}var h={},j={};
for(var d in c){var f=c[d],a=h[d]={},g=j[d]={};for(var b in f){var e=this.prepare(this.elements[d],b,f[b]);a[b]=e.from;g[b]=e.to;}}return this.parent(h,j);
}});var Drag=new Class({Implements:[Events,Options],options:{snap:6,unit:"px",grid:false,style:true,limit:false,handle:false,invert:false,preventDefault:false,modifiers:{x:"left",y:"top"}},initialize:function(){var b=Array.link(arguments,{options:Object.type,element:$defined});
this.element=document.id(b.element);this.document=this.element.getDocument();this.setOptions(b.options||{});var a=$type(this.options.handle);this.handles=((a=="array"||a=="collection")?$$(this.options.handle):document.id(this.options.handle))||this.element;
this.mouse={now:{},pos:{}};this.value={start:{},now:{}};this.selection=(Browser.Engine.trident)?"selectstart":"mousedown";this.bound={start:this.start.bind(this),check:this.check.bind(this),drag:this.drag.bind(this),stop:this.stop.bind(this),cancel:this.cancel.bind(this),eventStop:$lambda(false)};
this.attach();},attach:function(){this.handles.addEvent("mousedown",this.bound.start);return this;},detach:function(){this.handles.removeEvent("mousedown",this.bound.start);
return this;},start:function(c){if(this.options.preventDefault){c.preventDefault();}this.mouse.start=c.page;this.fireEvent("beforeStart",this.element);
var a=this.options.limit;this.limit={x:[],y:[]};for(var d in this.options.modifiers){if(!this.options.modifiers[d]){continue;}if(this.options.style){this.value.now[d]=this.element.getStyle(this.options.modifiers[d]).toInt();
}else{this.value.now[d]=this.element[this.options.modifiers[d]];}if(this.options.invert){this.value.now[d]*=-1;}this.mouse.pos[d]=c.page[d]-this.value.now[d];
if(a&&a[d]){for(var b=2;b--;b){if($chk(a[d][b])){this.limit[d][b]=$lambda(a[d][b])();}}}}if($type(this.options.grid)=="number"){this.options.grid={x:this.options.grid,y:this.options.grid};
}this.document.addEvents({mousemove:this.bound.check,mouseup:this.bound.cancel});this.document.addEvent(this.selection,this.bound.eventStop);},check:function(a){if(this.options.preventDefault){a.preventDefault();
}var b=Math.round(Math.sqrt(Math.pow(a.page.x-this.mouse.start.x,2)+Math.pow(a.page.y-this.mouse.start.y,2)));if(b>this.options.snap){this.cancel();this.document.addEvents({mousemove:this.bound.drag,mouseup:this.bound.stop});
this.fireEvent("start",[this.element,a]).fireEvent("snap",this.element);}},drag:function(a){if(this.options.preventDefault){a.preventDefault();}this.mouse.now=a.page;
for(var b in this.options.modifiers){if(!this.options.modifiers[b]){continue;}this.value.now[b]=this.mouse.now[b]-this.mouse.pos[b];if(this.options.invert){this.value.now[b]*=-1;
}if(this.options.limit&&this.limit[b]){if($chk(this.limit[b][1])&&(this.value.now[b]>this.limit[b][1])){this.value.now[b]=this.limit[b][1];}else{if($chk(this.limit[b][0])&&(this.value.now[b]<this.limit[b][0])){this.value.now[b]=this.limit[b][0];
}}}if(this.options.grid[b]){this.value.now[b]-=((this.value.now[b]-(this.limit[b][0]||0))%this.options.grid[b]);}if(this.options.style){this.element.setStyle(this.options.modifiers[b],this.value.now[b]+this.options.unit);
}else{this.element[this.options.modifiers[b]]=this.value.now[b];}}this.fireEvent("drag",[this.element,a]);},cancel:function(a){this.document.removeEvent("mousemove",this.bound.check);
this.document.removeEvent("mouseup",this.bound.cancel);if(a){this.document.removeEvent(this.selection,this.bound.eventStop);this.fireEvent("cancel",this.element);
}},stop:function(a){this.document.removeEvent(this.selection,this.bound.eventStop);this.document.removeEvent("mousemove",this.bound.drag);this.document.removeEvent("mouseup",this.bound.stop);
if(a){this.fireEvent("complete",[this.element,a]);}}});Element.implement({makeResizable:function(a){var b=new Drag(this,$merge({modifiers:{x:"width",y:"height"}},a));
this.store("resizer",b);return b.addEvent("drag",function(){this.fireEvent("resize",b);}.bind(this));}});Drag.Move=new Class({Extends:Drag,options:{droppables:[],container:false,precalculate:false,includeMargins:true,checkDroppables:true},initialize:function(c,b){this.parent(c,b);
this.droppables=$$(this.options.droppables);this.container=document.id(this.options.container);if(this.container&&$type(this.container)!="element"){this.container=document.id(this.container.getDocument().body);
}var a=this.element.getStyle("position");if(a=="static"){a="absolute";}if([this.element.getStyle("left"),this.element.getStyle("top")].contains("auto")){this.element.position(this.element.getPosition(this.element.offsetParent));
}this.element.setStyle("position",a);this.addEvent("start",this.checkDroppables,true);this.overed=null;},start:function(f){if(this.container){var b=this.container.getCoordinates(this.element.getOffsetParent()),c={},e={};
["top","right","bottom","left"].each(function(g){c[g]=this.container.getStyle("border-"+g).toInt();e[g]=this.element.getStyle("margin-"+g).toInt();},this);
var d=this.element.offsetWidth+e.left+e.right;var a=this.element.offsetHeight+e.top+e.bottom;if(this.options.includeMargins){$each(e,function(h,g){e[g]=0;
});}if(this.container==this.element.getOffsetParent()){this.options.limit={x:[0-e.left,b.right-c.left-c.right-d+e.right],y:[0-e.top,b.bottom-c.top-c.bottom-a+e.bottom]};
}else{this.options.limit={x:[b.left+c.left-e.left,b.right-c.right-d+e.right],y:[b.top+c.top-e.top,b.bottom-c.bottom-a+e.bottom]};}}if(this.options.precalculate){this.positions=this.droppables.map(function(g){return g.getCoordinates();
});}this.parent(f);},checkAgainst:function(c,b){c=(this.positions)?this.positions[b]:c.getCoordinates();var a=this.mouse.now;return(a.x>c.left&&a.x<c.right&&a.y<c.bottom&&a.y>c.top);
},checkDroppables:function(){var a=this.droppables.filter(this.checkAgainst,this).getLast();if(this.overed!=a){if(this.overed){this.fireEvent("leave",[this.element,this.overed]);
}if(a){this.fireEvent("enter",[this.element,a]);}this.overed=a;}},drag:function(a){this.parent(a);if(this.options.checkDroppables&&this.droppables.length){this.checkDroppables();
}},stop:function(a){this.checkDroppables();this.fireEvent("drop",[this.element,this.overed,a]);this.overed=null;return this.parent(a);}});Element.implement({makeDraggable:function(a){var b=new Drag.Move(this,a);
this.store("dragger",b);return b;}});