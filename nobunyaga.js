if (location.href.indexOf("app0.mixi") >= 0 || location.href.indexOf("app.mbga") >= 0 || location.href.indexOf("ld.mygc") >= 0) {
	var xmModel = {

	};

	var xmActions = {
		toMap: function() {
			$('#navi #menu #dmenu a img').eq(1).click();
		}
	};

	chrome.runtime.onMessage.addListener(function (message) {
		if (message.type == 'startTrial') {
			console.log('start trial.');
			setTimeout(xmActions.toMap, 500);
		}
	});
}
