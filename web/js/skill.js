function produceSlider(mainSlider,taginput,items){
	var rangescount = taginput.materialtags('items').length;

	mainSlider.children(".slidercontent").children(".flat-slider").slider({
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
			rangescount = taginput.materialtags('items').length;

			for (var i = 0; i < rangescount; i++) {
				valueamount = valueamount + mainSlider.children(".slidercontent").eq(i).children(".flat-slider").slider("value");
			}

			for (var j = 0; j < rangescount; j++){
				var percent = Math.round(mainSlider.children(".slidercontent").eq(j).children(".flat-slider").slider("value") / valueamount * 100);
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
    }).slider("float", {
        handle: false
    });
	
    mainSlider.children(".slidercontent").children(".count").children("label").text(function(){
    	return $(this).parent().parent().children(".flat-slider").slider("value");
    });
	
}
function AddSlider(mainSlider,taginput,items){
	var rangescount = taginput.materialtags('items').length;

	mainSlider.children(".slidercontent").eq(rangescount-1).children(".flat-slider").slider({
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
			rangescount = taginput.materialtags('items').length;

			for (var i = 0; i < rangescount; i++) {
				valueamount = valueamount + mainSlider.children(".slidercontent").eq(i).children(".flat-slider").slider("value");
			}

			for (var j = 0; j < rangescount; j++){
				var percent = Math.round(mainSlider.children(".slidercontent").eq(j).children(".flat-slider").slider("value") / valueamount * 100);
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
    }).slider("float", {
        handle: false
    });
	
    mainSlider.children(".slidercontent").children(".count").children("label").text(function(){
    	return $(this).parent().parent().children(".flat-slider").slider("value");
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

	var rangescount = taginput.materialtags('items').length;

	if(rangescount > 1){
		var handleArray = [];
		var typeArray = [];
		var initArray = [];
		var percentarray = [];
		

		for( a = 0; a < rangescount; a++ ){
			initArray.push(mainSlider.children(".slidercontent").eq(a).children(".flat-slider").slider("value"));
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
		var slidercontent = '<div class="slidercontent" data-name="' + items[r] + '"><p class="barname">' + items[r] + '</p><p class="count"><label></label>/100</p><div class="flat-slider"></div></div>';
		mainSlider.append(slidercontent);
	}

}
function addHtml(mainSlider,taglenth,items,rangeID){
	var item = items[taglenth-1];
	var slidercontent = '<div class="slidercontent" data-name="' + items[taglenth-1] + '"><p class="barname">' + items[taglenth-1] + '</p><p class="count"><label></label>/100</p><div class="flat-slider"></div></div>';
	
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
function addcardbeginHtml(taglenth,items){
	for( r = 0; r < taglenth; r++ ){
		var card = '<div class="cardtag" data-name="' + items[r] + '"><div class="container pTitle"><div class="row"><div class="col s12"><span class="card-title grey-text">' + items[r] + '</span></div></div></div><div class="container"><div class="row"><div class="input-field col s12"><input placeholder="" type="text" class="tagsinput" data-role="materialtags"><label>Tags</label></div><div class="col s12 cardslider"></div></div></div></div>';
		$(card).insertBefore("#skillcards .card-action");
		var incardID = $("#skillcards .cardtag[data-name='"+ items[r] +"']  .tagsinput");
		tagInit(incardID,true);
	}
	
}
function addcardHtml(taglenth,items){
	var card = '<div class="cardtag" data-name="' + items[taglenth-1] + '"><div class="container pTitle"><div class="row"><div class="col s12"><span class="card-title grey-text">' + items[taglenth-1] + '</span></div></div></div><div class="container"><div class="row"><div class="input-field col s12"><input placeholder="" type="text" class="tagsinput" data-role="materialtags"><label>Tags</label></div><div class="col s12 cardslider"></div></div></div></div>';
	$(card).insertBefore("#skillcards .card-action");
	var incardID = $("#skillcards .cardtag[data-name='"+ items[taglenth-1] +"'] .tagsinput");
	var cardID = $("#skillcards .cardtag[data-name='"+ items[taglenth-1] +"']");
	cardID.hide();
	tagInit(incardID,true);
	cardID.slideDown('slow');
}
function removecardHtml(item){
	$("#skillcards .card").children("[data-name='"+ item +"']").slideUp('slow',function(){
		$('this').remove();
	});
}
function addRangeHtml(mainSlider){
	var rangehtml = '<div class="wrapmuSlider"><div class="mutipleSlider"></div></div>';
	mainSlider.append(rangehtml);
}

function tagInit(taginput,incard){
	taginput.materialtags();
	var slider;
	if(!incard){
		slider = taginput.parent().parent(".row").children(".mainslider");
	}else{
		slider = taginput.parent().parent(".row").children(".cardslider");
	}
	
	if(taginput.materialtags('items').length > 0){
		beginHtml(slider,taginput.materialtags('items').length,taginput.materialtags('items'));
		if(!incard){
			addcardbeginHtml(taginput.materialtags('items').length,taginput.materialtags('items'));
		}
		produceSlider(slider,taginput,taginput.materialtags('items'));
		
	}
	if(taginput.materialtags('items').length > 1){
		addRangeHtml(slider);
		addRange(slider,taginput,taginput.materialtags('items'));
	}
	taginput.on('itemAdded', function(event) {
		addHtml(slider,$(this).materialtags('items').length,$(this).materialtags('items'));
		if(!incard){
			addcardHtml(taginput.materialtags('items').length,taginput.materialtags('items'));
		}
		AddSlider(slider,$(this),$(this).materialtags('items'));
		addRange(slider,$(this),$(this).materialtags('items'));
	});
	var deletetagvalue = 0;
	taginput.on('beforeItemRemove', function(event) {
		deletetagvalue = $(this).materialtags('items').indexOf(event.item);
	});
	taginput.on('itemRemoved', function(event) {
		removeHtml(slider,$(this).materialtags('items').length,event.item);
		if(!incard){
			removecardHtml(event.item);
			
		}
		addRange(slider,$(this),$(this).materialtags('items'));
	});
}

(function($){
	function addviewSlider(main,name,invalue){
		var slider = '<div class="slidercontent" data-name="' + name + '"><p class="barname">' + name + '</p><p class="count"><label>'+ invalue +'</label>/100</p><div class="flat-slider"></div></div>';
		main.append(slider);
		main.children("[data-name='"+ name +"']").children(".flat-slider").slider({
	        min: 0, 
	        max: 100, 
	        value: invalue,
	        range: "min",
	        animate: false,
	        slide: function( event, ui ) {
	        	return false;
			}
	    }).slider("float", {
	        handle: false
	    });
	}
	function addviewRange(main,initArray,items,rangescount){

		if(rangescount > 1){
			addRangeHtml(main);

			var handleArray = [];
			var typeArray = [];
			var percentarray = [];
			

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

			main.children(".wrapmuSlider").children(".mutipleSlider").rangeslider({
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
	$.fn.viewSkill = function(data){
		var mainblockdiv = '<div class="col s12 view"><div class="card main"><div class="container"><p class="TI">Main Skill</p></div></div></div>';
		this.append(mainblockdiv);
		var mainblock = this.children(".view").children(".main").children(".container");
		var initdata = [];
		var textarray = [];
		
		for(var skill in data) {
			addviewSlider(mainblock,skill,data[skill].value);

			textarray.push(skill);
			initdata.push(data[skill].value);

			var childiv = '<div class="col s12 m12 l6 view" data-name="' + skill + '"><div class="card"><div class="container"><p class="TI">'+ skill +'</p></div></div></div>';
			
			if(data[skill].tags == null){
				
			}else{
				this.append(childiv);
			}
			
			var childinitdata = [];
			var childtextarray = [];
			for(var tag in data[skill].tags) {
				var childblock = this.children("[data-name='"+ skill +"']").children(".card").children(".container");
				addviewSlider(childblock,tag,data[skill].tags[tag]);

				childtextarray.push(tag);
				childinitdata.push(data[skill].tags[tag]);
			}
			
			addviewRange(childblock,childinitdata,childtextarray,childinitdata.length);
		}
		addviewRange(mainblock,initdata,textarray,Object.keys(data).length);
	}
	$.fn.hrviewSkill = function(data){
		var mainblockdiv = '<div class="col s12 m6 l8 origin"><div class="view"><div class="card main"><div class="col s12"><p class="TI">Main Skill</p></div></div></div></div><div class="col s12 m6 l4 onlytag"><div class="view"><div class="card"><div class="col s12"><p class="TI">All Skills</p></div></div></div></div></div>';
		this.append(mainblockdiv);
		var mainblock = this.children(".origin").children(".view").children(".main").children(".col");
		var tagblock = this.children(".onlytag").children(".view").children(".card").children(".col");
		var initdata = [];
		var textarray = [];
		
		for(var skill in data) {
			addviewSlider(mainblock,skill,data[skill].value);
			addviewSlider(tagblock,skill,data[skill].value);

			textarray.push(skill);
			initdata.push(data[skill].value);

			var childiv = '<div class="col s12 m12 l6 view small" data-name="' + skill + '"><div class="card"><div class="col s12"><p class="TI">'+ skill +'</p></div></div></div>';
			
			if(data[skill].tags == null){
				
			}else{
				this.children(".origin").append(childiv);
			}
			
			var childinitdata = [];
			var childtextarray = [];
			for(var tag in data[skill].tags) {
				var childblock = this.children(".origin").children("[data-name='"+ skill +"']").children(".card").children(".col");
				addviewSlider(childblock,tag,data[skill].tags[tag]);
				addviewSlider(tagblock,tag,data[skill].tags[tag]);

				childtextarray.push(tag);
				childinitdata.push(data[skill].tags[tag]);
			}
			
			addviewRange(childblock,childinitdata,childtextarray,childinitdata.length);
		}
		addviewRange(mainblock,initdata,textarray,Object.keys(data).length);
	}
})(jQuery);






function initFromServer(data) {
    for(var skill in data) {
        var skillData = data[skill];
        $('#mainSkill').materialtags('add', skill);
        $('#mainSlider>div[data-name="'+skill+'"]>div.flat-slider').slider("value",skillData.value);

        for(var tag in skillData.tags) {
            $('.card[data-name="'+skill+'"] .tagsinput').materialtags('add', tag);
            $('.card[data-name="'+skill+'"]>.cardslider>div[data-name="'+tag+'"]>.flat-slider').slider('value',skillData.tags[tag]);
        }
        
        var id = $('.card[data-name="'+skill+'"] .tagsinput');
        var slider = id.parent(".tags").parent(".card").children(".cardslider");
        addRange(slider,id,id.materialtags('items'));
    }
    addRange($("#mainSlider"),$('#mainSkill'),$('#mainSkill').materialtags('items'));
}