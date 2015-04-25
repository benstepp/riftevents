(function() {
	'use-strict';

	var portfolio = document.getElementById('portfolio');
	var portfolioLength = portfolio.children.length;

	var currentWidth;

	function getWidth() {
		//the width of the first child of the portfolio is sufficient
		var width = portfolio.children[0].getBoundingClientRect().width;

		//quick check if the width of the items changed
		if (width !== currentWidth) {
			currentWidth = width;
			resizeItems();
		}
	}

	function resizeItems() {
		//height to set items to, because who doesnt love 16:9
		var setHeight = currentWidth*9/16;

		for (var i=0; i < portfolioLength; i++) {
			portfolio.children[i].style.height = setHeight.toString()+'px';
		}
	}

	function init() {
		getWidth();
		window.addEventListener('resize',getWidth);
	}

	init();

})();