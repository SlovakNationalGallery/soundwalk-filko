LanguageSwitcher = {
	languages: ["sk", "en"],
	fallbackLang: "sk",
	loadMessages: function(messages) {
		$.i18n().load( messages );
	},
	// set $.i18n locale if language is known
	setLanguage: function(language) {
		if ($.inArray(language, LanguageSwitcher.languages) > -1) {
			$.i18n( {locale: language} );
		}
		else {
			console.log("unknown language "+language+" passed to setLanguage()");
		}
	},
	// switch the language of a DOM element queried by [selector] to [language]
	switchLanguage: function(selector, language) {
		LanguageSwitcher.setLanguage(language);
		$(selector).i18n();
	},
	// set language from value returned by navigator.globalization.getPreferredLanguage
	setLangFromGlobalizationPrefLang: function(preferredLangValue) {
		for (var i = 0; i < LanguageSwitcher.languages.length; i++) {
			if (preferredLangValue.startsWith(LanguageSwitcher.languages[i])) {
				LanguageSwitcher.setLanguage(LanguageSwitcher.languages[i]);
				return LanguageSwitcher.languages[i];
			}
		}
		console.log("unknown preferred language value "+preferredLangValue+" passed to setLangFromGlobalizationPrefLang()");
		return false;
	}
}

$.getJSON( "i18n/messages.json?v="+new Date().getTime(), function( data ) {
  LanguageSwitcher.loadMessages(data);
});