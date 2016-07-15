console.log("languageSwitcher!!!");

LanguageSwitcher = {
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
		if ($.inArray(language, LanguageSwitcher.languages) > -1) {
			$.i18n( {locale: language} );
		}
		else {
			console.log("unknown language "+language+" passed to setLanguage()");
		}
	},
	switchLanguage: function(selector, language) {
		LanguageSwitcher.setLanguage(language);
		$(selector).i18n();
	}
}