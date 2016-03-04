(function($){
	$.fn.rankStar = function(value){
		var percent = value + '%';
		var trans = Math.round((value / 100 * 5) * 100)/100;
		this.children('.starbg').children(".full").css("width",percent);
		this.children('.points').text(trans);
	}
})(jQuery);