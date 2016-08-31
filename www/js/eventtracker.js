var EventTracker = {
	settings: {
		DEBUG: true,
		DISABLED: false,
		trackedLinksQuery: "a.track"
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
			window.mixpanel.track("appOpened");
			EventTracker.track_links();
		});	
	},
	track: function (event, properties) {
		$.extend(properties, {'language': $.i18n().locale});

		if (properties.type === "PlayerEvent") {
			$.extend(properties, {
				'trackNumber': properties.media.src.match(/-(\d\d?)\.mp3/)[1],
				'timeCode': Math.round(properties.media._position)
			});

			if (event === "PlayerStop") {
				if (properties.media._position < 0) {
					// don't track flase MEDIA_STOPPED event where media._position == -1
					return
				}
				
				var completionBuffer = 2; // seconds before end from which MEDIA_STOPPED will be counted as completion
				if (properties.media._position >= properties.media._duration - completionBuffer) {
					$.extend(properties, {'completed': true});
				} else {
					$.extend(properties, {'completed': false});
				}
			}
		}

		// delete media object before tracking to Mixpanel
		delete properties.media;
		
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
	},
	track_links: function () {
		mixpanel.track_links(EventTracker.settings.trackedLinksQuery, "ClickedLink", function (element) {
			var properties = {
				'linkText': element.textContent,
				'language': $.i18n().locale,
				'isExternal': element.getAttribute('class').search('external') > -1
			}
			return properties;
		});
	}
}