var EventTracker = {
	settings: {
		DEBUG: true,
    DISABLED: false,
	},
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
			// track appOpened once mixpanel has been initialised
			EventTracker.track("appOpened", {});
		});	
	},
	track: function (event, properties) {
    $.extend(properties, {'language': $.i18n().locale});
    
    if (EventTracker.settings.DEBUG) {
        console.log("******");
        console.log("event: " + event);
        console.log(properties);
        console.log("/******");
    };
    if (EventTracker.settings.DISABLED) {
			return;
    };
    window.mixpanel.track(event, properties);
	}
}