var EventTracker = {
	settings: {
		DEBUG: true,
    DISABLED: false,
	},
	init: function (secretsPath) {
		// Initialize using relevant token from secret .gitignore'd JSON file
		// depending on whether app is run in browser (development) or phone (production)
		$.getJSON(secretsPath, function(data) {
			var developmentHosts = ["192.", "localhost"]
			if (window.location.hostname.toLowerCase().search(developmentHosts[0]) > -1 || window.location.hostname.toLowerCase().search(developmentHosts[1]) > -1 ) {
				var mpToken = data.mixpanelDevelopmentToken;
			} else {
				var mpToken = data.mixpanelProductionToken;
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