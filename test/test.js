$(function() {

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
						alt: url.replace("http://lorempixel.com/","")
					})
				}
				return x;
			}
	
			/**
			 * Example 1 
			 * container -> #e1
			 */
			var e1 = $("#e1").mediaSlider({
				items: getRandomImgUrlArray(10, 50, 50)
			});

			/**
			 * Example 2 
			 * container -> #e2
			 */
			var e2 = $("#e2").mediaSlider({
				itemWidth: 200,
			    itemHeight: 100,
			    changeOffset: 200,
			    widthBetweenItems: 0,
				items: [
						"First String",
						"Second String",
						"Third String",
						"Fourth String",
						"Fifth String"
				],
				itemRender: function(context){
			        return '<div class="text-block"><p>' + context + '</p></div>';
			    }
			});

			/**
			 * Example 3 
			 * container -> #e3
			 */
			var e3 = $("#e3").mediaSlider({
				itemWidth: 100,
			    itemHeight: 100,
			    changeOffset: 200,
			    widthBetweenItems: 5,
				items: getRandomImgUrlArray(2, 100, 100)
			});

			$("#e3-add-button").on("click", function(){
				e3.appendItems([
					{
						src: getRandomImgUrl(100, 100)
					}
				]);
			});

			/**
			 * Example 4
			 * container -> #e4
			 */
			var e4 = $("#e4").mediaSlider({
				itemWidth: 100,
			    itemHeight: 100,
			    changeOffset: 200,
			    widthBetweenItems: 5,
				items: getRandomImgUrlArray(2, 100, 100)
			});

			$("#e4-add-button").on("click", function(){
				e4.appendItems([
					{
						src: getRandomImgUrl(100, 100)
					}
				]);
			});

			/**
			 * Example 5
			 * container -> #e5
			 */
			var e5 = $("#e5").mediaSlider({
				itemWidth: 100,
			    itemHeight: 100,
			    changeOffset: 200,
			    widthBetweenItems: 5,
			    sliderButtons: "in",
				items: getRandomImgUrlArray(20, 100, 100)
			});

			/**
			 * Example 6
			 * container -> #e6
			 */
			var e6 = $("#e6").mediaSlider({
				itemWidth: 150,
			    itemHeight: 100,
			    changeOffset: 200,
			    widthBetweenItems: 5,
			    sliderButtons: "in",
			    widthOfSliderButtons: 40,
				items: getRandomImgUrlArray(12, 150, 100)
			});

			$("#e6-add-button").on("click", function(){
				e6.appendItems([
					{
						src: getRandomImgUrl(150, 100)
					}
				]);
			});

});