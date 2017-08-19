/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _functions = __webpack_require__(1);
	
	(0, _functions.openMic)().then(input);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	
	module.exports = {
	  openMic: function openMic() {
	    return new Promise(function (resolve, reject) {
	      reject(new Error('foo'));
	      if (!navigator.getUserMedia) {
	        reject(new Error("WebRTC(getUserMedia) is not supported."));
	        return;
	      }
	
	      navigator.getUserMedia({
	        video: false,
	        audio: true
	      }, function (stream) {
	        console.log('getUserMedia: ', stream);
	        var audioContext = new AudioContext();
	        var input = audioContext.createMediaStreamSource(stream);
	        resolve(input);
	      }, function (e) {
	        reject(e);
	      });
	    });
	  },
	
	  startMicLevelDetection: function startMicLevelDetection(source, callback) {
	    var analyser = source.context.createAnalyser();
	    analyser.fftSize = 32;
	    analyser.smoothingTimeConstant = 0.3;
	    source.connect(analyser);
	
	    var buf = new Uint8Array(16);
	    var onTimer = function onTimer() {
	      analyser.getByteFrequencyData(buf);
	
	      var bufSum = buf.reduce(function (sum, value) {
	        return sum + value;
	      });
	      var level = Math.floor(bufSum / buf.length);
	      callback(level);
	    };
	
	    return setInterval(onTimer, 100);
	  },
	
	  getTime: function getTime() {
	    return new Date().getTime();
	  },
	
	  startLimitTimer: function startLimitTimer(limitTimeInMSec, options) {
	    var _this = this;
	
	    options = options || {};
	    var limitCallback = options.limit || function () {};
	    var progressCallback = options.progress || function (percent) {};
	
	    var timeFromStart = 0;
	    var timeAtPrevFrame = this.getTime();
	
	    var updateFrame = function updateFrame() {
	      var now = _this.getTime();
	      timeFromStart += now - timeAtPrevFrame;
	      timeAtPrevFrame = now;
	
	      var percent = Math.floor(timeFromStart / limitTimeInMSec * 100);
	      if (100 <= percent) {
	        stop();
	        progressCallback(100);
	        limitCallback();
	        return;
	      }
	
	      progressCallback(percent);
	    };
	    var timerID = setInterval(updateFrame, 100);
	
	    return function () {
	      clearInterval(timerID);
	    };
	  }
	};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";
	
	window.URL = window.URL || window.webkitURL;
	
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
	
	window.AudioContext = window.AudioContext || window.webkitAudioContext;

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map