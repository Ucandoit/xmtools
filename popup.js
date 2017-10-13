document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('startTrial').addEventListener('click', function() {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		  chrome.tabs.sendMessage(tabs[0].id, {type: "startTrial"}, function(response) {
			console.log(response.farewell);
		  });
		});
	});

	document.getElementById('startTrial').addEventListener('click', function() {
		// test only
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		  chrome.tabs.sendMessage(tabs[0].id, {type: "unitTest"}, function(response) {
			console.log(response.farewell);
		  });
		});
	});
});
