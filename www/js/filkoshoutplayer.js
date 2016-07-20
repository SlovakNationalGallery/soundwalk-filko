FilkoShoutPlayer = {
	medias: [],
	shoutCounter: 0,
	audioFileNames: [
		"filko-shout-1.mp3",
		"filko-shout-2.mp3",
		"filko-shout-3.mp3",
		"filko-shout-4.mp3",
		"filko-shout-5.mp3",
		"filko-shout-6.mp3",
		"filko-shout-7.mp3",
		"filko-shout-8.mp3",
		"filko-shout-9.mp3",
		"filko-shout-10.mp3"
	],
	isPlaying: false,
	initMediaFiles: function () {
		var root_path = "/";
		if (device.platform == "Android") {
			root_path = "/android_asset/www/";
		}
		for (var i = 0; i < FilkoShoutPlayer.audioFileNames.length; i++) {
			var soundPath = root_path + 'sounds/' + FilkoShoutPlayer.audioFileNames[i];
			FilkoShoutPlayer.medias[i] = new Media(
				soundPath,
				function() {
					// console.log('Media file read succesfully');
					if (FilkoShoutPlayer.medias[i] !== null) {
						this.release();
					}
				},
				function(error) {
					console.log("error");
					navigator.notification.alert(
						'Unable to read the media file.'  + error.code,
						function(){},
						'Error'
						);
					console.log('Unable to read the media file (Code): ' + error.code);
				}
			);
		}
	},
	playNextFilkoShout: function () {
		// Play audio
		FilkoShoutPlayer.medias[FilkoShoutPlayer.shoutCounter].play();
		// increment shoutCounter
		if (FilkoShoutPlayer.shoutCounter < FilkoShoutPlayer.audioFileNames.length - 1) {
			FilkoShoutPlayer.shoutCounter += 1;
		}
		else {
			FilkoShoutPlayer.shoutCounter = 0;	
		}
	}
}