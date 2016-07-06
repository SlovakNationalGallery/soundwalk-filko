SoundWalk Filko
=================

SoundWalk is an open source mobile application built using PhoneGap (Apache Cordova). It is written entirely using HTML, CSS, and JavaScript, and runs on numerous platforms (tested for iOS and Android)

SoundWalk uses:

* PhoneGap: http://www.phonegap.com
* jQuery Mobile: http://jquerymobile.com/

## Installation

Requires [Node.js](https://nodejs.org/)

```
sudo npm install -g phonegap
phonegap  plugin add cordova-plugin-media
phonegap  plugin add cordova-plugin-inappbrowser
phonegap  plugins add cordova-plugin-device
phonegap run ios
```

## Usage

To start a local server to run the app in your browser:

```
phonegap serve
```

To test on your phone you can download the nifty [PhoneGap Developer mobile app](http://docs.phonegap.com/getting-started/2-install-mobile-app/) and point it to the Server Address you see after starting `phonegap serve`.