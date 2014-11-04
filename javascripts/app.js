$(function(argument) {

	function randomImageUrlGenrator(height, width, type, num) {
		var arr = ["abstract", "animals", "business", "cats", "city", 
				   "food", "nightlife", "fashion", "people", "nature",
				   "sports" ,"technics", "transport"], url;
		type = type || arr[Math.ceil(Math.random() * arr.length - 1)];
		height = height || 50;
		width = width || 50;
		num = num || Math.ceil(Math.random() * 10);
		return "http://lorempixel.com/" + height +"/" + width + "/" + type + "/" + num;
	}

	function randomImageUrlArrayGenrator(total ,height ,width ,type ,num) {
		var x = [], i, url;
		for(i = 0; i < total; i++){
			url = randomImageUrlGenrator(height, width, type, num);
			x.push({
				src: url,
				alt: url
			})
		}
		return x;
	}
	

	$("#example1").mediaSlider({
		items: randomImageUrlArrayGenrator(20)
	});

	$("#example2").mediaSlider({
		changeOffset: 200,
		items: randomImageUrlArrayGenrator(20)
	});

	$("#example3").mediaSlider({
		itemHeight: 100,
		itemWidth: 100,
		changeOffset: 200,
		items: randomImageUrlArrayGenrator(20, 100, 100)
	});

	$("#example3").mediaSlider({
		itemHeight: 180,
		itemWidth: 300,
		changeOffset: 500,
		widthBetweenItems: 5,
		items: randomImageUrlArrayGenrator(15, 500, 180)
	});
});