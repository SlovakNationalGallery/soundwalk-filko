EventTracker = {
	init: function (secretsPath) {
		// Initialize using relevant token from secret .gitignore'd JSON file
		// depending on whether app is run in browser (development) or phone (production)
		$.getJSON(secretsPath, function(data) {        
			var developmentPathname = "index.html";
			if (window.location.pathname.toLowerCase().search(developmentPathname) < 0) {
				var mpToken = data.mixpanelProductionToken;
			} else {
				var mpToken = data.mixpanelDevelopmentToken;
			}
			window.mixpanel.init(mpToken);
			window.mixpanel.track("appOpened");
		});	
	}
}