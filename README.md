SoundWalk Filko
=================

![image](filko.png)

SoundWalk is an open source mobile application built using PhoneGap (Apache Cordova). It is written entirely using HTML, CSS, and JavaScript, and runs on numerous platforms (tested for iOS and Android)

SoundWalk uses:

* PhoneGap: http://www.phonegap.com
* jQuery Mobile: http://jquerymobile.com/
* jQuery.i18n https://github.com/wikimedia/jquery.i18n

## Installation

Requires [Node.js](https://nodejs.org/)

```
npm install -g phonegap
npm install  -g cordova-splash
phonegap plugin add cordova-plugin-media
phonegap plugin add cordova-plugin-inappbrowser
phonegap plugin add cordova-plugin-device
phonegap plugin add cordova-plugin-globalization
phonegap plugin add cordova-plugin-nativestorage
phonegap plugin add cordova-plugin-statusbar
phonegap plugin add cordova-plugin-splashscreen
```

## Usage

To start a local server to run the app in your browser:

```
phonegap serve
```

To test on your phone you can download the nifty [PhoneGap Developer mobile app](http://docs.phonegap.com/getting-started/2-install-mobile-app/) and point it to the Server Address you see after starting `phonegap serve`.

In case you receive an `Unable to download archive from the server` error in the PhoneGap Developer mobile app, it might help to create a WiFi hotspot on your phone, join this network on your computer, restart `phonegap serve` and connect again. See [this issue on Github](https://github.com/phonegap/phonegap-app-desktop/issues/360#issuecomment-103969087) for details.

## Building Native Apps

More info on how to use Cordova to build native apps for various platform can be found on the [Cordova CLI documentation](https://cordova.apache.org/docs/en/latest/guide/cli). Since this app is already structured as a cordova app, you can skip straight to [adding platforms](https://cordova.apache.org/docs/en/latest/guide/cli/#add-platforms).

To generate splash-screens for all platforms (after platforms have been added):

```
cordova-splash
```