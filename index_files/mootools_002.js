var Courses = new Class({
	Implements: Options,
	
	options: {},
	
	initialize: function(courseLinks, options){
		this.setOptions(options);
		this.courseLinks = $$(courseLinks);
		
		var ed = new Element('div',{
			'class':'enlargementDisplay',
			'id':'courseDisplay',
			'styles': {
				'opacity': '0'				
			}
		}).injectAfter('footer');
		

		// Enable drag/drop
		var dragger = new Drag.Move(ed,{
			// This is a hack to make dragging possible in IE
			onStart: function(el){
				if(Browser.Engine.trident) 
					this.handles.ondragstart = function(){
						return false;};
			}
		});
		
		// Align the enlargement display above the course
		ed.position({relativeTo: this});
		
		this.courseLinks.addEvent('click', function(e){
			e.stop();
			ed.load('/neuroscience/_shared/courses/?cn=' + this.rel)
			ed.fade('show');
		});
	}

});
Courses.implement(new Options);