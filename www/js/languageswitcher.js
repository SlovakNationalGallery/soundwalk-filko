console.log("languageSwitcher!!!");

LanguageSwitcher = {
	languages: ["sk", "en"],
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
	}
}

$.getJSON( "i18n/messages.json?v="+new Date().getTime(), function( data ) {
  console.log("getJSON success");
  LanguageSwitcher.loadMessages(data);
});