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
			
			// add to native storage
			NativeStorage.setItem("filko-preferred-lang",language, 
				function (setLang) {
					// console.log("succesfully set preferred language to native storage: "+setLang);
				}, 
				function (error) {
					console.log(error);
					return false;
				});
		}
		else {
			console.log("unknown language "+language+" passed to setLanguage()");
			return false;
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
	},
	// retrieve the most preferred user language
	retrievePreferredLang: function () {
		// 1. try previously stored value from Native Storage
		// var storedLang = LanguageSwitcher.retrieveLangFromNativeStorage();
		var storedLang;
		NativeStorage.getItem("filko-preferred-lang", 
			function (language) {
				storedLang = language;
				return;
			}, 
			function (error) {
				console.log("error in NativeStorage.getItem() with code:");
				console.log(error);
				// NATIVE_WRITE_FAILED = 1
				// ITEM_NOT_FOUND = 2
				// NULL_REFERENCE = 3
				// UNDEFINED_TYPE = 4
				// JSON_ERROR = 5
				// WRONG_PARAMETER = 6
				return false;
			}
		);
		if (storedLang) {
			// console.log("setting storedLang: "+storedLang);
			return storedLang;
		}

		// 2. get preferred language from device
		var deviceLang;
		navigator.globalization.getPreferredLanguage(
	    	function (preferredLangObj) {
	    		var preferredLangValue = preferredLangObj.value;
	            for (var i = 0; i < LanguageSwitcher.languages.length; i++) {
					if (preferredLangValue.startsWith(LanguageSwitcher.languages[i])) {
						deviceLang = LanguageSwitcher.languages[i];
						return;
					}
				}
				console.log("unknown preferred language value "+preferredLangValue+" passed to setLangFromGlobalizationPrefLang()");
				return false;
	         },
	      	function (error) { 
	      		console.log(error);
	      		return false;
	      	}
	  	);

		if (deviceLang) {
			// console.log("setting deviceLang: "+deviceLang);
			return deviceLang;
		}

		// 3. fallback to fallbackLang
		// console.log("setting fallbackLang: "+LanguageSwitcher.fallbackLang);
		return LanguageSwitcher.fallbackLang;
	}
}

$.getJSON( "i18n/messages.json?v="+new Date().getTime(), function( data ) {
  LanguageSwitcher.loadMessages(data);
});