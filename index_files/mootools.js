var SimpleToggler = new Class({
	
	initialize: function(toggleables){
		this.toggleables = $$(toggleables);
		this.attach();
	},
	
	attach: function(){
		this.toggleables.each(function(toggleable){
			// The first child element will be the toggler
			var toggler = toggleable.getChildren()[0].addClass('toggler');
			
			// The second child element will be the item to toggle
			var itemToToggle = toggler.getNext();
			
			// A slider will be applied to the item to toggle, and it will be hidden initally
			var slider = new Fx.Slide(itemToToggle).hide();
			
			// When the slider has completed then ensure the toggleable element is set to open
			slider.addEvent('complete', function() {
				toggleable.toggleClass('open');
			});
			
			// Upon a click on the toggler, toggle the slider
			toggler.addEvent('click', function(e){
				e.stop();					
				slider.toggle()
			});
		});
	}
	
});