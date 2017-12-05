document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('startTrial').addEventListener('click', function() {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		  chrome.tabs.sendMessage(tabs[0].id, {type: "startTrial", questId: parseInt(document.getElementById('questId').value)}, function(response) {
			console.log(response.farewell);
		  });
		});
	});

	document.getElementById('unitTest').addEventListener('click', function() {
		// test only
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		  chrome.tabs.sendMessage(tabs[0].id, {type: "unitTest", questId: parseInt(document.getElementById('questId').value)}, function(response) {
			console.log(response.farewell);
		  });
		});
	});

	document.getElementById('startTraining').addEventListener('click', function() {
		var catId = $('#catId').val();
		var startLevel = parseInt($('#startLevel').val());
		var endLevel = parseInt($('#endLevel').val());
		var levelType = $("input[name=levelType]:checked").val();
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		  chrome.tabs.sendMessage(tabs[0].id, {type: "startTraining", catId: catId, startLevel: startLevel, endLevel: endLevel, levelType: levelType}, function(response) {
			console.log(response.farewell);
		  });
		});
	});
});
