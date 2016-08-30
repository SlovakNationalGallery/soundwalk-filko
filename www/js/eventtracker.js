EventTracker = {
	init: function (secretsPath) {
		// Initialize using relevant token from secret .gitignore'd JSON file
		$.getJSON(secretsPath, function(data) {        
			var developmentHost = "192."
			if (window.location.hostname.toLowerCase().search(developmentHost) < 0) {
				var mpToken = data.mixpanelProductionToken;
			} else {
				var mpToken = data.mixpanelDevelopmentToken;
			}
			window.mixpanel.init(mpToken);
			window.mixpanel.track("appOpened");
		});	
	}
}