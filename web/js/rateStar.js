(function($){
	
	var methods = {
		_init: function(option){
			var icons = '<i class="material-icons">star_border</i><i class="material-icons">star_border</i><i class="material-icons">star_border</i><i class="material-icons">star_border</i><i class="material-icons">star_border</i>';
			this.append(icons);

			this.children("i").hover(function(){
				var index = $(this).parent('.rate').children('i').index(this);
				
				for(i = 0; i < index+1; i++){
					$(this).parent('.rate').children('i').eq(i).text('star');
				}

			},function(){
				$(this).parent('.rate').children('i').text('star_border');
				$(this).parent('.rate').children('i.active').text('star');
			});

			this.children("i").click(function(){
				$(this).parent('.rate').children('i').text('star_border');
				$(this).parent('.rate').children('i').removeClass('active');
				var index = $(this).parent('.rate').children('i').index(this);
				
				for(i = 0; i < index+1; i++){
					$(this).parent('.rate').children('i').eq(i).addClass('active');
					$(this).parent('.rate').children('i').eq(i).text('star');
				}
				$(this).parent('.rate').attr("data-value",index+1);
			});
		},
		updateValue: function(value){
			this.attr("data-value",value);
			this.children('i').text('star_border');
			this.children("i").removeClass('active');
			for(j = 0; j < value; j++){
				this.children('i').eq(j).addClass('active');
				this.children('i').eq(j).text('star');
			}
		},
		value: function(value){
			if (value === undefined){
				return this.attr("data-value");
			}else{
				this.rateStar('updateValue',value);
			}
		}
	}

	$.fn.rateStar = function(method){
		if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
            return methods._init.apply( this, arguments );
		} else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
		}
		
	}

})(jQuery);

