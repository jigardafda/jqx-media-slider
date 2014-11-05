$(function(argument) {
	
	//SyntaxHighlighter.all();

	function getRandomImgUrl(height, width, type, num) {
		var arr = ["abstract", "animals", "business", "cats", "city", 
				   "food", "nightlife", "fashion", "people", "nature",
				   "sports" ,"technics", "transport"], url;
		type = type || arr[Math.ceil(Math.random() * arr.length - 1)];
		height = height || 50;
		width = width || 50;
		num = num || Math.ceil(Math.random() * 10);
		return "http://lorempixel.com/" + height +"/" + width + "/" + type + "/" + num;
	}

	function getRandomImgUrlArray(total ,height ,width ,type ,num) {
		var x = [], i, url;
		for(i = 0; i < total; i++){
			url = getRandomImgUrl(height, width, type, num);
			x.push({
				src: url,
				alt: url
			})
		}
		return x;
	}
	

	$("#example1").mediaSlider({
		items: getRandomImgUrlArray(20)
	});

	$("#example2").mediaSlider({
		changeOffset: 200,
		items: getRandomImgUrlArray(20)
	});

	$("#example3").mediaSlider({
		itemHeight: 100,
		itemWidth: 100,
		changeOffset: 200,
		items: getRandomImgUrlArray(20, 100, 100)
	});

	$("#example4").mediaSlider({
		itemHeight: 200,
		itemWidth: $("#example4").width() - 20*2,
		changeOffset: $("#example4").width() - 20*2,
		widthBetweenItems: 0,
		items: getRandomImgUrlArray(5, $("#example4").width() - 20*2, 200)
	});

	$("#example5").mediaSlider({
		itemHeight: 300,
		itemWidth: $("#example4").width() - 20*2,
		changeOffset: $("#example4").width() - 20*2,
		widthBetweenItems: 0,
		items: [
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
			"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?",
			"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
			"Lorem ipsum dolor sit amet, saepe ceteros comprehensam sea ut, mei elitr atomorum intellegebat no, ferri integre luptatum at vis. Cu appetere insolens corrumpit his, paulo dissentiunt an vis, altera commune ei sea. At pro agam aperiam instructior. Nam te timeam suscipit detraxit, unum posse honestatis ea est. Cu utinam munere eam, nullam veritus an pro.Adhuc euismod conceptam per id, cum similique definiebas ne. Ex est augue legendos expetendis, duo ne mutat nonumy, ex molestiae persequeris per. Ex singulis reprehendunt mei, pri ea congue maluisset. Mutat electram honestatis sea te, id ius legimus delectus. Option deserunt eam no, magna mutat ut nec. Ex mundi ludus quo, libris graecis ea vel. Ut cum minim delectus, ne melius omnesque cum. Vitae mucius an has. Duo maiorum salutandi ne. Soluta detraxit vim no. Maiorum denique scribentur ex his. Enim detracto oporteat ei quo, an doming melius assentior vis. Nec saepe mollis adipiscing cu, nobis appetere vituperatoribus id quo, duo et legere populo partiendo. Quo in perpetua salutatus euripidis, te vim persecuti signiferumque, accusam laboramus deterruisset nec ex."
		
		],
		itemRender: function(item, container){
			var div = $('<div>').css({
										"height": "100%",
										"width": "100%",
										"overflow": "auto"
									}).html($('<p>').css("margin", "10px").html(item));
			return div;
		}
	});

	$("#example6").mediaSlider({
		itemHeight: 315,
		itemWidth: $("#example6").width() - 20*2,
		changeOffset: $("#example6").width() - 20*2,
		widthBetweenItems: 0,
		items: [
			'<iframe width="' + (parseFloat($("#example6").width()) - 20*2) + '" height="315" src="https://www.youtube.com/embed/vyYXkN0ZKCU" frameborder="0" allowfullscreen></iframe>',
			'<iframe width="' + (parseFloat($("#example6").width()) - 20*2) + '" height="315" src="https://www.youtube.com/embed/U7Ht2dFQPLE" frameborder="0" allowfullscreen></iframe>',
			'<iframe width="' + (parseFloat($("#example6").width()) - 20*2) + '" height="315" src="https://www.youtube.com/embed/OMv3zKbeh08" frameborder="0" allowfullscreen></iframe>'
		],
		itemRender: function(item){
			return item;
		}
	});

});