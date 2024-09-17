/**
 * Royal Audio Player
 * Audio screen.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function(window){
	
	var FWDRAPAudioScreen = function(volume){

		'use strict';
		
		var _s = this;
		var prototype = FWDRAPAudioScreen.prototype;
	
		
		_s.lastPercentPlayed = 0;
		_s.volume = volume;
		_s.curDuration = 0;
		_s.countNormalMp3Errors = 0;
		_s.countShoutCastErrors = 0;
		_s.maxShoutCastCountErrors = 5;
		_s.maxNormalCountErrors = 1;
		_s.hasError_bl = true;
		_s.isStopped_bl = true;
		
		
		//###############################################//
		/* init */
		//###############################################//
		_s.init = function(){
			_s.setupAudio();
			_s.setHeight(0);
		};

	
		//###############################################//
		/* Setup audio element */
		//##############################################//
		_s.setupAudio = function(){
			if(_s.audio_el == null){
				_s.audio_el = document.createElement("audio");
				_s.screen.appendChild(_s.audio_el);
				_s.audio_el.controls = false;
				_s.audio_el.preload = "auto";
				if(!FWDRAPUtils.isLocal) _s.audio_el.crossOrigin = "*";
				_s.audio_el.volume = _s.volume;
			}
			
			_s.audio_el.addEventListener("error", _s.errorHandler);
			_s.audio_el.addEventListener("canplay", _s.safeToBeControlled);
			_s.audio_el.addEventListener("canplaythrough", _s.safeToBeControlled);
			_s.audio_el.addEventListener("progress", _s.updateProgress);
			_s.audio_el.addEventListener("timeupdate", _s.updateAudio);
			_s.audio_el.addEventListener("pause", _s.pauseHandler);
			_s.audio_el.addEventListener("play", _s.playHandler);
			_s.audio_el.addEventListener("ended", _s.endedHandler);
		};
		
		_s.destroyAudio = function(){
			if(_s.audio_el){
				_s.audio_el.removeEventListener("error", _s.errorHandler);
				_s.audio_el.removeEventListener("canplay", _s.safeToBeControlled);
				_s.audio_el.removeEventListener("canplaythrough", _s.safeToBeControlled);
				_s.audio_el.removeEventListener("progress", _s.updateProgress);
				_s.audio_el.removeEventListener("timeupdate", _s.updateAudio);
				_s.audio_el.removeEventListener("pause", _s.pauseHandler);
				_s.audio_el.removeEventListener("play", _s.playHandler);
				_s.audio_el.removeEventListener("ended", _s.endedHandler);
				_s.audio_el.src = "";
				_s.audio_el.load();
			}
		};
		

		//##########################################//
		/* Video error handler. */
		//##########################################//
		_s.errorHandler = function(e){
			if(_s.sourcePath_str == null || _s.sourcePath_str == undefined) return;
			
			if(_s.isNormalMp3_bl && _s.countNormalMp3Errors <= _s.maxNormalCountErrors){
				_s.stop();
				_s.testShoutCastId_to = setTimeout(_s.play, 200);
				_s.countNormalMp3Errors ++;
				return;
			}
			
			if(_s.isShoutcast_bl && _s.countShoutCastErrors <= _s.maxShoutCastCountErrors && _s.audio_el.networkState == 0){
				_s.testShoutCastId_to = setTimeout(_s.play, 200);
				_s.countShoutCastErrors ++;
				return;
			}
			
			var error_str;
			_s.hasError_bl = true;
			_s.stop();
			
			if(_s.audio_el.networkState == 0){
				error_str = "error '_s.audio_el.networkState = 1'";
			}else if(_s.audio_el.networkState == 1){
				error_str = "error '_s.audio_el.networkState = 1'";
			}else if(_s.audio_el.networkState == 2){
				error_str = "'_s.audio_el.networkState = 2'";
			}else if(_s.audio_el.networkState == 3){
				error_str = "source not found <font color='#FF0000'>" + _s.sourcePath_str + "</font>";
			}else{
				error_str = e;
			}
			
			if(window.console) window.console.log(_s.audio_el.networkState);
			
			_s.dispatchEvent(FWDRAPAudioScreen.ERROR, {text:error_str });
		};

		
		//##############################################//
		/* Set path */
		//##############################################//
		_s.setSource = function(sourcePath){
			
			_s.sourcePath_str = sourcePath;
			clearTimeout(_s.testShoutCastId_to);
			
			if(_s.sourcePath_str.indexOf(";") != -1){
				_s.isShoutcast_bl = true;
				_s.countShoutCastErrors = 0;
			}else{
				_s.isShoutcast_bl = false;
			}
			
			if(_s.sourcePath_str.indexOf(";") == -1){
				_s.isNormalMp3_bl = true;
				_s.countNormalMp3Errors = 0;
			}else{
				_s.isNormalMp3_bl = false;
			}
			
			
			_s.lastPercentPlayed = 0;
			if(_s.audio_el) _s.stop(true);
		};
	

		//##########################################//
		/* Play / pause / stop methods */
		//##########################################//
		_s.play = function(overwrite){
		
			if(_s.isStopped_bl){
				_s.isPlaying_bl = false;
				_s.hasError_bl = false;
				_s.allowScrubing_bl = false;
				_s.isStopped_bl = false;
				_s.setupAudio();
				_s.audio_el.src = _s.sourcePath_str;

				_s.play();
			}else if(!_s.audio_el.ended || overwrite){
				try{
					_s.isPlaying_bl = true;
					_s.hasPlayedOnce_bl = true;
					var prm = _s.audio_el.play();
					if(prm !== undefined) {
					    prm.then(function(){}, function(){});
					}
					
					if(FWDRAPUtils.isIE) _s.dispatchEvent(FWDRAPAudioScreen.PLAY);
				}catch(e){};
			}
		};

		_s.pause = function(){
			if(_s == null) return;
			if(_s.audio_el == null) return;
			if(!_s.audio_el.ended){
				try{
					_s.audio_el.pause();
					_s.isPlaying_bl = false;
					if(FWDRAPUtils.isIE) _s.dispatchEvent(FWDRAPAudioScreen.PAUSE);
				}catch(e){};
				
			}
		};
		
		_s.pauseHandler = function(){
			if(_s.allowScrubing_bl) return;
			_s.dispatchEvent(FWDRAPAudioScreen.PAUSE);
		};
		
		_s.playHandler = function(){
			if(_s.allowScrubing_bl) return;
			if(!_s.isStartEventDispatched_bl){
				_s.dispatchEvent(FWDRAPAudioScreen.START);
				_s.isStartEventDispatched_bl = true;
			}
			_s.dispatchEvent(FWDRAPAudioScreen.PLAY);
		};
		
		_s.endedHandler = function(){
			_s.dispatchEvent(FWDRAPAudioScreen.PLAY_COMPLETE);
		};
		
		
		_s.getDuration = function(){
			return FWDRAPUtils.formatTime(_s.audio_el.duration);
		}
		
		_s.getCurrentTime = function(){
			return FWDRAPUtils.formatTime(_s.audio_el.currentTime);
		}
	
		_s.stop = function(overwrite){
			_s.dispatchEvent(FWDRAPAudioScreen.UPDATE_TIME, {curTime:"00:00" , totalTime:"00:00", seconds:0});
			if((_s == null || _s.audio_el == null || _s.isStopped_bl) && !overwrite) return;
			_s.isPlaying_bl = false;
			_s.isStopped_bl = true;
			_s.hasPlayedOnce_bl = true;
			_s.isSafeToBeControlled_bl = false;
			_s.isStartEventDispatched_bl = false;
			clearTimeout(_s.testShoutCastId_to);
			_s.audio_el.pause();
			_s.destroyAudio();
			_s.dispatchEvent(FWDRAPAudioScreen.STOP);
			_s.dispatchEvent(FWDRAPAudioScreen.LOAD_PROGRESS, {percent:0});
		};
		
		_s.togglePlayPause = function(){
			if(_s == null) return;
			if(!_s.isSafeToBeControlled_bl) return;
			if(_s.isPlaying_bl){
				_s.pause();
			}else{
				_s.play();
			}
		};


		//###########################################//
		/* Check if audio is safe to be controlled */
		//###########################################//
		_s.safeToBeControlled = function(){
			if(!_s.isSafeToBeControlled_bl){
				_s.hasHours_bl = Math.floor(_s.audio_el.duration / (60 * 60)) > 0;
				_s.isPlaying_bl = true;
				_s.isSafeToBeControlled_bl = true;
				_s.dispatchEvent(FWDRAPAudioScreen.SAFE_TO_SCRUBB);
				_s.dispatchEvent(FWDRAPAudioScreen.SAFE_TO_UPDATE_VOLUME);
			}
		};
	

		//###########################################//
		/* Update progress */
		//##########################################//
		_s.updateProgress = function(){
			var buffered;
			var percentLoaded = 0;
			
			if(_s.audio_el.buffered.length > 0){
				buffered = _s.audio_el.buffered.end(_s.audio_el.buffered.length - 1);
				percentLoaded = buffered.toFixed(1)/_s.audio_el.duration.toFixed(1);
				if(isNaN(percentLoaded) || !percentLoaded) percentLoaded = 0;
			}
			
			if(percentLoaded == 1) _s.audio_el.removeEventListener("progress", _s.updateProgress);
			
			_s.dispatchEvent(FWDRAPAudioScreen.LOAD_PROGRESS, {percent:percentLoaded});
		};
		

		//##############################################//
		/* Update audio */
		//#############################################//
		_s.updateAudio = function(){
			var percentPlayed; 
			if (!_s.allowScrubing_bl) {
				percentPlayed = _s.audio_el.currentTime /_s.audio_el.duration;
				_s.dispatchEvent(FWDRAPAudioScreen.UPDATE, {percent:percentPlayed});
			}
			
			var totalTime = FWDRAPUtils.formatTime(_s.audio_el.duration);
			var curTime = FWDRAPUtils.formatTime(_s.audio_el.currentTime);
			
			
			if(!isNaN(_s.audio_el.duration)){
				_s.dispatchEvent(FWDRAPAudioScreen.UPDATE_TIME, {curTime: curTime, totalTime:totalTime, seconds:Math.round(_s.audio_el.currentTime), totalTimeInSeconds:_s.audio_el.duration});
			}else{
				_s.dispatchEvent(FWDRAPAudioScreen.UPDATE_TIME, {curTime:"00:00" , totalTime:"00:00", seconds:0, totalTimeInSeconds:0});
			}
			_s.lastPercentPlayed = percentPlayed;
			_s.curDuration = curTime;
		};
		

		//###############################################//
		/* Scrub */
		//###############################################//
		_s.startToScrub = function(){
			_s.allowScrubing_bl = true;
		};
		
		_s.stopToScrub = function(){
			_s.allowScrubing_bl = false;
		};
		
		_s.scrubbAtTime = function(duration){
			_s.audio_el.currentTime = duration;
			var totalTime = FWDRAPUtils.formatTime(_s.audio_el.duration);
			var curTime = FWDRAPUtils.formatTime(_s.audio_el.currentTime);
			_s.dispatchEvent(FWDRAPAudioScreen.UPDATE_TIME, {curTime: curTime, totalTime:totalTime, seconds:duration});
		};
		
		_s.scrub = function(percent, e){
			if(_s.audio_el == null || !_s.audio_el.duration) return;
			if(e) _s.startToScrub();
			try{
				_s.audio_el.currentTime = _s.audio_el.duration * percent;
				var totalTime = FWDRAPUtils.formatTime(_s.audio_el.duration);
				var curTime = FWDRAPUtils.formatTime(_s.audio_el.currentTime);
				_s.dispatchEvent(FWDRAPAudioScreen.UPDATE_TIME, {curTime: curTime, totalTime:totalTime});
			}catch(e){}
		};
		

		//###############################################//
		/* replay */
		//###############################################//
		_s.replay = function(){
			_s.scrub(0);
			_s.play();
		};
		

		//###############################################//
		/* Volume */
		//###############################################//
		_s.setVolume = function(vol){
			if(vol != undefined) _s.volume = vol;
			if(_s.audio_el) _s.audio_el.volume = _s.volume;
		};
		
		
		_s.setPlaybackRate = function(rate){
			if(!_s.audio_el) return;
			_s.audio_el.defaultPlaybackRate = rate;
			_s.audio_el.playbackRate = rate;
		}

		_s.init();
	};


	/* set prototype */
	FWDRAPAudioScreen.setPrototype = function(){
		FWDRAPAudioScreen.prototype = new FWDRAPDisplayObject("div");
	};
	
	FWDRAPAudioScreen.ERROR = "error";
	FWDRAPAudioScreen.UPDATE = "update";
	FWDRAPAudioScreen.UPDATE = "update";
	FWDRAPAudioScreen.UPDATE_TIME = "updateTime";
	FWDRAPAudioScreen.SAFE_TO_SCRUBB = "safeToControll";
	FWDRAPAudioScreen.SAFE_TO_UPDATE_VOLUME = "safeToUpdateVolume";
	FWDRAPAudioScreen.LOAD_PROGRESS = "loadProgress";
	FWDRAPAudioScreen.START = "start";
	FWDRAPAudioScreen.PLAY = "play";
	FWDRAPAudioScreen.PAUSE = "pause";
	FWDRAPAudioScreen.STOP = "stop";
	FWDRAPAudioScreen.PLAY_COMPLETE = "playComplete";
	window.FWDRAPAudioScreen = FWDRAPAudioScreen;

}(window));