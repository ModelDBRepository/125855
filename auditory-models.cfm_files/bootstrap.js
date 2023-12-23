window.addEvent('domready', function(){

	var smoothScroller, simpleToggler, courses, galleries;

	// Load footnote handlers
	if ($('footnotes')){
		new Asset.css(LIB_LOCATION + 'css/footnotes.css');
		new Asset.javascript(LIB_LOCATION + 'js/mootools-smooth-scroll.js', {
			'onload': function(){
				if(!smoothScroller){
					smoothScroller = new Fx.SmoothScroll();
				}
			}
		});
	} 
	
	// Load toggle handlers
	var toggleables = $$('.simpleToggler');
	if (toggleables){
		new Asset.css(LIB_LOCATION + 'css/simple-toggler.css');		
		new Asset.javascript(LIB_LOCATION + 'js/mootools-slide.js');
		new Asset.javascript(LIB_LOCATION + 'js/mootools.simpleToggler.js', {
			'onload': function(){	
				if(!simpleToggler){
					simpleToggler = new SimpleToggler(toggleables);
				}
			}
		});
	}
	
	// Load course link handlers
	var courseLinks = $$('a.course-link');
	if (courseLinks){
		new Asset.javascript(LIB_LOCATION + 'js/mootools.courses.js', {
			'onload': function(){	
				if(!courses){
					courses = new Courses(courseLinks);
				}
			}
		});
	}
	
	// Load gallery handler
	var galleries = $$('div.gallery');
	if (galleries){
		new Asset.css(LIB_LOCATION + 'css/slimbox/slimbox.css');
		new Asset.javascript(LIB_LOCATION + 'js/slimbox.js');
	} 
	
}).addEvent('load', function(){

	var captionHelper, enlarger;

	var imagesWithCaptions = $$('.imageWithCaption');
	if (imagesWithCaptions.length > 0) {
		new Asset.javascript(LIB_LOCATION + 'js/mootools.captionHelper.js', {
			'onload': function(){	
				if(!captionHelper){
					captionHelper = new CaptionHelper(imagesWithCaptions);
					captionHelper.adjustWidth();
				}
			}
		});
	} 
	
	var enlargers = $$('a.enlarger');
	if(enlargers.length > 0){
		new Asset.javascript(LIB_LOCATION + 'js/mootools.enlarger.js', {
			'onload': function(){	
				if(!enlarger){
					enlarger = new Enlarger(enlargers);
					enlarger.createEnlargmentDisplays();
				}		
			}
		});
	}
});