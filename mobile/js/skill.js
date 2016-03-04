function produceSlider(mainSlider,taginput,items){
	var rangescount = taginput.tagsinput('items').length;

	mainSlider.children(".slidercontent").children(".circles-slider").slider({
        min: 0, 
        max: 100, 
        value: 50,
        range: "min",
        animate: true,
        slide: function( event, ui ) {
			$(this).parent(".slidercontent").children(".count").children("label").text( ui.value );
			if(ui.value < 1){
				$(this).parent(".slidercontent").children(".count").children("label").text(1);
				return false;
			}
		},
		change: function( event, ui ){
			$(this).parent(".slidercontent").children(".count").children("label").text( ui.value );
		},
		stop: function( event, ui ){
			var valueamount = 0;
			var percentarray = [];
			rangescount = taginput.tagsinput('items').length;

			for (var i = 0; i < rangescount; i++) {
				valueamount = valueamount + mainSlider.children(".slidercontent").eq(i).children(".circles-slider").slider("value");
			}

			for (var j = 0; j < rangescount; j++){
				var percent = Math.round(mainSlider.children(".slidercontent").eq(j).children(".circles-slider").slider("value") / valueamount * 100);
				percentarray.push(percent);
			}

			var percentarraySum = percentarray.reduce(function(a, b){return a+b;});
			var miner = percentarraySum - 100;


			if(miner != 0){
				var maxValue = Math.max.apply(this, percentarray);
				var maxIndex = $.inArray(maxValue,percentarray);
				percentarray[maxIndex] = percentarray[maxIndex] - miner;
			}

			if(rangescount > 1){
				var add = 0;
				for (var k = 0; k < rangescount - 1 ; k++) {
					var add = add + percentarray[k];
					mainSlider.children(".wrapmuSlider").children(".mutipleSlider").rangeslider("values",k,add);
				}
			}

		}
    }).slider("pips", {
        first: "pip",
        last: "pip",
        step: "10"
    }).slider("float", {
        handle: false
    });
	
    mainSlider.children(".slidercontent").children(".count").children("label").text(function(){
    	return $(this).parent().parent().children(".circles-slider").slider("value");
    });
	
}
function AddSlider(mainSlider,taginput,items){
	var rangescount = taginput.tagsinput('items').length;

	mainSlider.children(".slidercontent").eq(rangescount-1).children(".circles-slider").slider({
        min: 0, 
        max: 100, 
        value: 50,
        range: "min",
        animate: true,
        slide: function( event, ui ) {
			$(this).parent(".slidercontent").children(".count").children("label").text( ui.value );
			if(ui.value < 1){
				$(this).parent(".slidercontent").children(".count").children("label").text(1);
				return false;
			}
		},
		change: function( event, ui ){
			$(this).parent(".slidercontent").children(".count").children("label").text( ui.value );
		},
		stop: function( event, ui ){
			var valueamount = 0;
			var percentarray = [];
			rangescount = taginput.tagsinput('items').length;

			for (var i = 0; i < rangescount; i++) {
				valueamount = valueamount + mainSlider.children(".slidercontent").eq(i).children(".circles-slider").slider("value");
			}

			for (var j = 0; j < rangescount; j++){
				var percent = Math.round(mainSlider.children(".slidercontent").eq(j).children(".circles-slider").slider("value") / valueamount * 100);
				percentarray.push(percent);
			}

			var percentarraySum = percentarray.reduce(function(a, b){return a+b;});
			var miner = percentarraySum - 100;


			if(miner != 0){
				var maxValue = Math.max.apply(this, percentarray);
				var maxIndex = $.inArray(maxValue,percentarray);
				percentarray[maxIndex] = percentarray[maxIndex] - miner;
			}

			if(rangescount > 1){
				var add = 0;
				for (var k = 0; k < rangescount - 1 ; k++) {
					var add = add + percentarray[k];
					mainSlider.children(".wrapmuSlider").children(".mutipleSlider").rangeslider("values",k,add);
				}
			}

		}
    }).slider("pips", {
        first: "pip",
        last: "pip",
        step: "10"
    }).slider("float", {
        handle: false
    });
	
    mainSlider.children(".slidercontent").children(".count").children("label").text(function(){
    	return $(this).parent().parent().children(".circles-slider").slider("value");
    });
	
}
var averageValue = function (value, index, count){
	if(value % count == 0){
		return value/count;
	}
	else if (value % count != 0 && value > 0){
		return (index < value % count) ? Math.floor(value/count)+1 : Math.floor(value/count);
	}
	else if(value % count != 0 && value < 0){
		return (index < -(value % count)) ? Math.floor(value/count) : Math.floor(value/count)+1;
	}
}
function addRange(mainSlider,taginput,items){

	var rangescount = taginput.tagsinput('items').length;

	if(rangescount > 1){
		var handleArray = [];
		var typeArray = [];
		var initArray = [];
		var percentarray = [];
		

		for( a = 0; a < rangescount; a++ ){
			initArray.push(mainSlider.children(".slidercontent").eq(a).children(".circles-slider").slider("value"));
		}

		var valueamount = initArray.reduce(function(a, b){return a+b;});


		for( b = 0; b < rangescount; b++ ){
			var percent = Math.round(initArray[b] / valueamount * 100);
			percentarray.push(percent);
		}

		var percentarraySum = percentarray.reduce(function(a, b){return a+b;});
		var miner = percentarraySum - 100;


		if(miner != 0){
			var maxValue = Math.max.apply(this, percentarray);
			var maxIndex = $.inArray(maxValue,percentarray);
			percentarray[maxIndex] = percentarray[maxIndex] - miner;
		}

		for( p = 0; p < rangescount-1; p++ ){
			var typetext = 'range' + (p+1);
			var handlevalue = 0;
			for(q = 0; q < p+1; q++){
				handlevalue = handlevalue + percentarray[q];
			}
			handleArray.push({value: handlevalue,type:typetext});
		}
		
		for( t = 0; t < rangescount; t++ ){
			var typetext = 'range' + t;
			typeArray.push({type:typetext,text:items[t]});
		}

		mainSlider.children(".wrapmuSlider").children(".mutipleSlider").rangeslider({
			// set min and maximum values
			min: 0,
			max: 100,
			// step
			step: 1,
			// range
			range: false,
			// show tooltips
			tooltips: false,
			// current data
			handles: handleArray,
			ticks:{
				tickMain: 10,
				tickSide: 10,
				tickShowLabelMain : false
			},
			// display type names
			showTypeNames: true,
			typeNames: typeArray,
			mainClass: 'range0',
			type: 'number',
			slide: function(e, ui) {
				return false;
			}
		});
	}
}
function beginHtml(mainSlider,taglenth,items){
	for( r = 0; r < taglenth; r++ ){
		var slidercontent = '<div class="slidercontent" data-name="' + items[r] + '"><div class="barname">' + items[r] + '</div><div class="count"><label></label>/100</div><div class="circles-slider"></div></div>';
		mainSlider.append(slidercontent);
	}

}
function addHtml(mainSlider,taglenth,items,rangeID){
	var item = items[taglenth-1];
	var slidercontent = '<div class="slidercontent" data-name="' + items[taglenth-1] + '"><div class="barname">' + items[taglenth-1] + '</div><div class="count"><label></label>/100</div><div class="circles-slider"></div></div>';
	
	if(taglenth < 2){
		mainSlider.append(slidercontent);
	}else if(taglenth == 2){
		mainSlider.append(slidercontent);
		addRangeHtml(mainSlider,rangeID);
	}else{
		$(slidercontent).insertBefore(mainSlider.children(".wrapmuSlider"));
	}
}
function removeHtml(mainSlider,taglenth,item){
	if(taglenth == 1){
		mainSlider.children("[data-name='"+ item +"']").remove();
		mainSlider.children(".wrapmuSlider").remove();
	}else{
		mainSlider.children("[data-name='"+ item +"']").remove();
	}
}
function addcardbeginHtml(mainSlider,taglenth,items){
	for( r = 0; r < taglenth; r++ ){
		var card = '<div class="card" data-name="' + items[r] + '"><div class="name"><h3>' + items[r] + '</h3></div><div class="inputs tags"><input type="text" class="tagsinput" value="" data-role="tagsinput" placeholder="Use this skill in..."><span class="img"><i class="fa fa-tag"></i></span><div class="wrongmessage"></div></div><div class="cardslider"></div></div>';
		$(card).insertBefore(mainSlider.parent("form").children(".btn"));
		var incardID = $("form .card[data-name='"+ items[r] +"']").children(".tags").children(".tagsinput");
		tagInit(incardID,true);
	}
	
}
function addcardHtml(mainSlider,taglenth,items){
	var card = '<div class="card" data-name="' + items[taglenth-1] + '"><div class="name"><h3>' + items[taglenth-1] + '</h3></div><div class="inputs tags"><input type="text" class="tagsinput" value="" data-role="tagsinput" placeholder="Use this skill in..."><span class="img"><i class="fa fa-tag"></i></span><div class="wrongmessage"></div></div><div class="cardslider"></div></div>';
	$(card).insertBefore(mainSlider.parent("form").children(".btn"));
	var incardID = $(".form .card[data-name='"+ items[taglenth-1] +"']").children(".tags").children(".tagsinput");
	tagInit(incardID,true);
}
function removecardHtml(mainSlider,item){
	mainSlider.parent("form").children("[data-name='"+ item +"']").remove();
}
function addRangeHtml(mainSlider){
	var rangehtml = '<div class="wrapmuSlider"><div class="mutipleSlider"></div></div>';
	mainSlider.append(rangehtml);
}

function tagInit(taginput,incard){
	taginput.tagsinput();
	$('.bootstrap-tagsinput input').css("width","auto");

	var slider;
	if(!incard){
		slider = $("#mainSlider");
	}else{
		slider = taginput.parent(".tags").parent(".card").children(".cardslider");
	}
	if(taginput.tagsinput('items').length > 0){
		beginHtml(slider,taginput.tagsinput('items').length,taginput.tagsinput('items'));
		if(!incard){
			addcardbeginHtml(slider,taginput.tagsinput('items').length,taginput.tagsinput('items'));
		}
		produceSlider(slider,taginput,taginput.tagsinput('items'));
		
	}
	if(taginput.tagsinput('items').length > 1){

		addRangeHtml(slider);
		addRange(slider,taginput,taginput.tagsinput('items'));
	}
	taginput.on('itemAdded', function(event) {
		addHtml(slider,$(this).tagsinput('items').length,$(this).tagsinput('items'));
		if(!incard){
			addcardHtml(slider,taginput.tagsinput('items').length,taginput.tagsinput('items'));
		}
		AddSlider(slider,$(this),$(this).tagsinput('items'));
		addRange(slider,$(this),$(this).tagsinput('items'));
	});
	var deletetagvalue = 0;
	taginput.on('beforeItemRemove', function(event) {
		deletetagvalue = $(this).tagsinput('items').indexOf(event.item);
	});
	taginput.on('itemRemoved', function(event) {
		removeHtml(slider,$(this).tagsinput('items').length,event.item);
		if(!incard){
			removecardHtml(slider,event.item);
		}
		addRange(slider,$(this),$(this).tagsinput('items'));
	});
}
function initFromServer(data) {
    for(var skill in data) {
        var skillData = data[skill];
        $('#mainSkill').tagsinput('add', skill);
        $('#mainSlider>div[data-name="'+skill+'"]>div.circles-slider').slider("value",skillData.value);

        for(var tag in skillData.tags) {
            $('.card[data-name="'+skill+'"] .tagsinput').tagsinput('add', tag);
            $('.card[data-name="'+skill+'"]>.cardslider>div[data-name="'+tag+'"]>.circles-slider').slider('value',skillData.tags[tag]);
        }
        
        var id = $('.card[data-name="'+skill+'"] .tagsinput');
        var slider = id.parent(".tags").parent(".card").children(".cardslider");
        addRange(slider,id,id.tagsinput('items'));
    }
    addRange($("#mainSlider"),$('#mainSkill'),$('#mainSkill').tagsinput('items'));
}

$(function() {
	var data = {
           'php':{
               'value':10,
               'tags':{
                   'web':20,
                   'app':30
               }
           },
           'js':{
               'value':40,
               'tags':{
                   'rac.js':60,
                   'nodeJs':40
               }
           },
           'asp.net':{
               'value':70
           }
       };
    
	tagInit($('#mainSkill'),false);
	initFromServer(data);
});