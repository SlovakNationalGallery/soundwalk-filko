console.log("languageSwitcher!!!");

languageSwitcher = {
	languages: ["en", "sk"],
	loadMessages: function() {
		$.i18n().load( {
			"en" : {
			  "soundwalk-filko-title": "Filko EN",
			  "soundwalk-filko-sub-title": "SoundWalk EN",
			},
			"sk" : {
			  "soundwalk-filko-title": "Filko SK",
			  "soundwalk-filko-sub-title": "SoundWalk SK",
			}
		} );
	},
	setLanguage: function(language) {
		if ($.inArray(language, languageSwitcher.languages)) {
			$.i18n( {locale: language} );
		}
		else {
			console.log("unknown language "+language+" passed to setLanguage()");
		}
		
	},
}