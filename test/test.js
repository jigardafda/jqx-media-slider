$(function() {

			/**
			 * Example 1 
			 * container -> #e1
			 */
			var e1 = $("#e1").mediaSlider({
				items: [
					{
						src: "http://lorempixel.com/g/100/100/sports/1"
					},
					{
						src: "http://lorempixel.com/g/100/100/sports/2"
					},
					{
						src: "http://lorempixel.com/g/100/100/sports/3"
					},
					{
						src: "http://lorempixel.com/g/100/100/sports/4"
					},
					{
						src: "http://lorempixel.com/g/100/100/sports/5"
					}
				]
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
					{
						text: "First String"
					},
					{
						text: "Second String"
					},
					{
						text: "Third String"
					},
					{
						text: "Fourth String"
					},
					{
						text: "Fifth String"
					}
				],
				itemRender: function(context){
			        return '<div class="text-block"><p>' + context.text + '</p></div>';
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
				items: [
					{
						src: "http://lorempixel.com/g/100/100/sports/1"
					},
					{
						src: "http://lorempixel.com/g/100/100/sports/2"
					}
				]
			});

			$("#e3-add-button").on("click", function(){
				var randomImgUrl = "http://lorempixel.com/g/100/100/sports/" + Math.ceil(Math.random() * 10);
				e3.appendItems([
					{
						src: randomImgUrl
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
				items: [
					{
						src: "http://lorempixel.com/g/100/100/city/1"
					},
					{
						src: "http://lorempixel.com/g/100/100/city/2"
					}
				]
			});

			$("#e4-add-button").on("click", function(){
				var randomImgUrl = "http://lorempixel.com/g/100/100/city/" + Math.ceil(Math.random() * 10);
				e4.appendItems([
					{
						src: randomImgUrl
					}
				]);
			});

});