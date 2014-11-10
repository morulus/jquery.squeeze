!(function($) {
	var fit = function(img, range) {
	
		return new (function(img, range) {
			$(img).hide();
			this.img = img;
			var that = this;
			
			this.image = new Image();
			this.image.onload = function() {
				
				that.recalc();
			};
			this.image.src = $(img).attr("src");
			
			this.recalc = function() {
				
				var width = this.image.width;
				var height = this.image.height;
				
				
				var container = $(this.img).parent();
				if (typeof range.width == 'undefined' || typeof range.height == 'undefined') {
					var parentwidth = $(container).width();
					var parentheight = $(container).height();
				} else {
					var parentwidth = range.width;
					var parentheight = range.height;
				}
				
				
				var new_width = parentwidth;
				var new_height = height*(new_width/width);
				if (new_height>parentheight) {
					var new_height = parentheight;
					var new_width = width*(new_height/height);
				}

				// Convert to percents
				var new_width_perc = (new_width/parentwidth)*100;
				var margin_top_perc = (((parentheight-new_height)/2)/parentheight)*100;
				
				
				$(this.img).css({
					'width': new_width_perc+'%',
					'height': 'auto',
					'margin-top': Math.round(margin_top_perc)+'%',
					
					'-webkit-transform': 'matrix(0.203,0,0,0.198,0,0)',
					'-o-transform': 'matrix(0.203,0,0,0.198,0,0)',
					'-ms-transform': 'matrix(0.203,0,0,0.198,0,0)',
					'-moz-transform': 'matrix(0.203,0,0,0.198,0,0)',
					'transform': 'matrix(0.203,0,0,0.198,0,0)',
					'-webkit-transition': '-webkit-transform 0.3s ease-out',
					'-o-transition': '-o-transform 0.3s ease-out',
					'-ms-transition': '-ms-transform 0.3s ease-out',
					'-moz-transition': '-moz-transform 0.3s ease-out',
					'transition': 'transform 0.3s ease-out',
					'opacity': 0,
					'display': 'inline'
				}).animate({
					opacity: 1
				}, 250);
				var img = this.img;
				setTimeout(function() {
					$(img).css({
						'-webkit-transform': 'matrix(1,0,0,1,0,0)',
						'-o-transform': 'matrix(1,0,0,1,0,0)',
						'-ms-transform': 'matrix(1,0,0,1,0,0)',
						'-moz-transform': 'matrix(1,0,0,1,0,0)',
						'transform': 'matrix(1,0,0,1,0,0)'
					});
				}, 100);
			};
		})(img, (range || {}));
	};

	$.fn.fitimage = $.fn.squeeze = function(options) {
		var options = options || {};
		return $(this).each(function() {
			fit(this, options);
		});
	};
})(jQuery);