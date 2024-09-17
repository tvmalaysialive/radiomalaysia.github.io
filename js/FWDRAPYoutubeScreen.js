/**
 * Royal Audio Player
 * Youtube screen.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function(window){
	
	var FWDRAPYoutubeScreen = function(prt, volume){

		'use strict';
		
		var _s = this;
		var prototype = FWDRAPYoutubeScreen.prototype;
		
		_s.ytb = null;
		
		_s.lastQuality_str = "auto";
		
		_s.volume = volume;
		
		_s.controllerHeight = prt._d.controllerHeight;
		_s.isStopped_bl = true;
		_s.isPausedInEvent_bl = true;
		_s.isShowed_bl = true;
		_s.isMbl = FWDRAPUtils.isMobile;

		
		//###############################################//
		/* init */
		//###############################################//
		_s.init = function(){
			_s.getStyle().width = "100%";
			_s.getStyle().height = "100%";
			_s.hasTransform3d_bl = false;
			_s.hasTransform2d_bl = false;
			_s.setBkColor("#000000");
			_s.setBackfaceVisibility();
			_s.id = "youtubePlayer";

			prt.main_do.addChild(_s);
			_s.resizeAndPosition();
			_s.setupVideo();
		};
	

		//###############################################//
		/* Setup youtube video */
		//##############################################//
		_s.setupVideo = function(){
			if(_s.ytb) return;
			
			_s.videoHolder_do = new FWDRAPDisplayObject("div");
			_s.videoHolder_do.hasTransform3d_bl = false;
			_s.videoHolder_do.hasTransform2d_bl = false;
			_s.videoHolder_do.screen.setAttribute("id", prt.instanceName_str + "youtube");
			_s.videoHolder_do.getStyle().width = "100%";
			_s.videoHolder_do.getStyle().height = "100%";
			_s.videoHolder_do.setBackfaceVisibility();
			_s.addChild(_s.videoHolder_do);
			
			
			_s.ytb = new YT.Player(prt.instanceName_str + "youtube", {
				width:"100%",
				height:"100%",
				playerVars:{
					controls:0,
					disablekb:0,
					loop:0,
					autoplay:0,
					wmode:"opaque",
					showinfo:0,
					rel:0,
					modestbranding:1,
					iv_load_policy:3,
					cc_load_policy :0,
					fs:0,
					html5:0
			  	},
			  	events: {
			  		"onReady":_s.playerReadyHandler,
			  		"onError":_s.playerErrorHandler,
			  		"onStateChange":_s.stateChangeHandler,
			  		"onPlaybackQualityChange":_s.qualityChangeHandler
			  	}
		    });
		    _s.ytbIframe = document.getElementById(prt.instanceName_str + "youtube");
		};
		
		_s.playerReadyHandler = function(){
			_s.isReady_bl = true;

			_s.resizeAndPosition();
			_s.dispatchEvent(FWDRAPYoutubeScreen.READY);
			_s.hasBeenCreatedOnce_bl = true;
		};
		
		_s.stateChangeHandler = function(e){
			if(e.data == -1 && _s.isCued_bl && _s.isMbl){
				_s.isStopped_bl = false;
				FWDRAP.stopAllAudio(prt);
			}
			
			if(e.data == YT.PlayerState.PLAYING){
				if(!_s.isSafeToBeControlled_bl){
					_s.isStopped_bl = false;
					_s.isSafeToBeControlled_bl = true;
					_s.isPlaying_bl = true;
					_s.hasHours_bl = Math.floor(_s.ytb.getDuration() / (60 * 60)) > 0;
					_s.setVolume(_s.volume);
					_s.startToUpdate();
					_s.startToPreload();
					_s.scrub(0.00001);
					if(!_s.isMbl) _s.setQuality(_s.lastQuality_str);
					
					if(_s.ytb.getAvailableQualityLevels() && _s.ytb.getAvailableQualityLevels().length != 0){
						_s.dispatchEvent(FWDRAPYoutubeScreen.QUALITY_CHANGE, {qualityLevel:_s.ytb.getPlaybackQuality(), levels:_s.ytb.getAvailableQualityLevels()});
					}
					_s.setPlaybackRate();
				    _s.dispatchEvent(FWDRAPYoutubeScreen.SAFE_TO_SCRUBB);
				}
				if(_s.isPausedInEvent_bl) _s.dispatchEvent(FWDRAPYoutubeScreen.PLAY);
				if(!_s.isStartEventDispatched_bl){
					_s.dispatchEvent(FWDRAPAudioScreen.START);
					_s.isStartEventDispatched_bl = true;
				}
				_s.isPausedInEvent_bl = false;
				_s.hasError_bl = false;
				
			}else if(e.data == YT.PlayerState.PAUSED){
				if(!_s.isSafeToBeControlled_bl) return;
				_s.isStopped_bl = false;
				if(!_s.isPausedInEvent_bl) _s.dispatchEvent(FWDRAPYoutubeScreen.PAUSE);
				_s.isPausedInEvent_bl = true;
			}else if(e.data == YT.PlayerState.ENDED){
				if(_s.ytb.getCurrentTime() && _s.ytb.getCurrentTime() > 0){
					_s.isStopped_bl = false;
					setTimeout(function(){_s.dispatchEvent(FWDRAPYoutubeScreen.PLAY_COMPLETE);}, 100);
				}
			}else if(e.data == YT.PlayerState.CUED){
				if(!_s.isStopped_bl){
					_s.dispatchEvent(FWDRAPYoutubeScreen.CUED);
				}

				if(!_s.stopp){
					if(prt._d.autoPlay_bl || prt.isPlaylistItemClicked_bl){
				
						if(prt.isPlaylistItemClicked_bl) prt.play();

						if(prt._d.autoPlay_bl){
							prt.play();
						}
					}else{
						
					}
				}
				_s.isCued_bl = true;
				_s.resizeAndPosition();
			}
		};
		
		_s.qualityChangeHandler = function(e){
			if(_s.ytb.getAvailableQualityLevels() && _s.ytb.getAvailableQualityLevels().length != 0){
				_s.dispatchEvent(FWDRAPYoutubeScreen.QUALITY_CHANGE, {qualityLevel:_s.ytb.getPlaybackQuality()});
			}
		};
		
		_s.playerErrorHandler = function(e){
			_s.isPausedInEvent_bl = true;
			
			if(_s.isStopped_bl || _s.hasError_bl || !_s.isReady_bl) return;
			var error_str = "";
			_s.hasError_bl = true;
			if(e.data == 2){
				error_str = "The youtube id is not well formatted, make sure it has exactly 11 characters and that it dosn't contain invalid characters such as exclamation points or asterisks.";
			}else if(e.data == 5){
				error_str = "The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.";
			}else if(e.data == 100){
				error_str = "The youtube video request was not found, probably the video ID is incorrect.";
			}else if(e.data == 101 || e.data == 150){
				error_str = "The owner of the requested video does not allow it to be played in embedded players.";
			}
			_s.dispatchEvent(FWDRAPYoutubeScreen.ERROR, {text:error_str});
		};

		
		//##############################################//
		/* Resize and position */
		//##############################################//
		_s.resizeAndPosition = function(){
			_s.setWidth(prt.videosHolder_do.w);
			_s.setHeight(prt.videosHolder_do.h);

			if(prt.audioType_str == 'youtube'){
				if(!_s.width < 380){
					_s.ytbIframe.style.height = (prt.videosHolder_do.h + 300) + 'px';
					_s.ytbIframe.style.top = -150 + 'px';
				}else{
					_s.ytbIframe.style.height = (1.776 * prt.videosHolder_do.h) + 'px';
					_s.ytbIframe.style.top = ((prt.videosHolder_do.h - (1.776 * prt.videosHolder_do.h))/2) + 'px';
				}
			}
		};
		

		//##############################################//
		/* Set path */
		//##############################################//
		_s.setSource = function(sourcePath){
			if(sourcePath) _s.sourcePath_str = sourcePath;
		
			clearInterval(_s.setSourceId_int);
			_s.setSourceId_int = setInterval(function(){
				if(_s.ytb.cueVideoById && _s.ytb.setPlaybackRate){
					_s.ytb.cueVideoById(_s.sourcePath_str);
					clearInterval(_s.setSourceId_int);
				}
			},50);

			_s.stopp = false;
		};
	

		//##########################################//
		/* Play / pause / stop methods */
		//##########################################//
		_s.play = function(overwrite){
			
			FWDRAP.curInstance = prt;
			_s.isPlaying_bl = true;
			_s.hasError_bl = false;
			try{
				_s.ytb.playVideo();
				_s.startToUpdate();
			}catch(e){}
			_s.isStopped_bl = false;
		};

		_s.pause = function(){
			if(_s.isStopped_bl || _s.hasError_bl) return;
			_s.isPlaying_bl = false;
			try{
				_s.ytb.pauseVideo();
			}catch(e){}
			_s.stopToUpdate();
		};
		
		_s.togglePlayPause = function(){
			if(_s.isPlaying_bl){
				_s.pause();
			}else{
				_s.play();
			}
		};
		
		_s.resume = function(){
			if(_s.isStopped_bl) return;
			_s.play();
		};
		
		_s.togglePlayPause = function(){
			if(_s.isPlaying_bl){
				_s.pause();
			}else{
				_s.play();
			}
		};
		

		//###########################################//
		/* Updates. */
		//###########################################//
		_s.startToUpdate = function(){
			clearInterval(_s.updateVideoId_int);
			_s.updateVideoId_int = setInterval(_s.updateVideo, 500);
		};
		
		_s.stopToUpdate = function(){
			clearInterval(_s.updateVideoId_int);
		};
		
		_s.updateVideo = function(){
			var percentPlayed; 
			if(!_s.ytb){
				stopToUpdate();
				return;
			}
			if (!_s.allowScrubing_bl) {
				percentPlayed = _s.ytb.getCurrentTime() /_s.ytb.getDuration();
				_s.dispatchEvent(FWDRAPYoutubeScreen.UPDATE, {percent:percentPlayed});
			}
			
			var totalTime = FWDRAPUtils.formatTime(_s.ytb.getDuration());
			var curTime = FWDRAPUtils.formatTime(_s.ytb.getCurrentTime());
			
			_s.dispatchEvent(FWDRAPYoutubeScreen.UPDATE_TIME, {curTime:curTime , totalTime:totalTime, seconds:Math.round(_s.ytb.getCurrentTime()), totalTimeInSeconds:_s.ytb.getDuration()});
		};
		
		_s.getDuration = function(){
			return FWDRAPUtils.formatTime(_s.ytb.getDuration());
		}
		
		_s.getCurrentTime = function(){
			return FWDRAPUtils.formatTime(_s.ytb.getCurrentTime());
		}
		
		_s.startToPreload = function(){
			clearInterval(_s.preloadVideoId_int);
			_s.updatePreloadId_int = setInterval(_s.updateProgress, 500);
		};
		
		_s.stopToPreload = function(){
			clearInterval(_s.updatePreloadId_int);
		};
		
		_s.updateProgress = function(){
			if(!_s.ytb){
				stopToPreload();
				return;
			}
			var buffered;
			var percentLoaded = _s.ytb.getVideoLoadedFraction();
			
			_s.dispatchEvent(FWDRAPYoutubeScreen.LOAD_PROGRESS, {percent:percentLoaded});
		};
		

		//###########################################//
		/* Event handlers */
		//###########################################//	
		_s.stop = function(){
			if(_s.isStopped_bl) return;
			_s.isPlaying_bl = false;
			_s.isStopped_bl = true;
			_s.isCued_bl = false;
			_s.allowScrubing_bl = false;
			_s.isSafeToBeControlled_bl = false;
			_s.isQualityArrayDisapatched_bl = false;
			_s.isPausedInEvent_bl = true;
			_s.isStartEventDispatched_bl = false;
			clearInterval(_s.setSourceId_int);
			_s.stopToUpdate();
			_s.stopToPreload();
			_s.stopVideo();
			_s.dispatchEvent(FWDRAPYoutubeScreen.STOP);
			_s.dispatchEvent(FWDRAPYoutubeScreen.LOAD_PROGRESS, {percent:0});
			_s.dispatchEvent(FWDRAPYoutubeScreen.UPDATE_TIME, {curTime:"00:00" , totalTime:"00:00"});
		};
		
		_s.destroyYoutube = function(){
			if(_s.videoHolder_do){
				_s.videoHolder_do.screen.removeAttribute("id", prt.instanceName_str + "youtube");
				_s.videoHolder_do.destroy();
				_s.videoHolder_do = null;
			}
			if(_s.ytb) _s.ytb.destroy();
			_s.ytb = null;
		};
		
		_s.stopVideo = function(){
			_s.ytb.cueVideoById(_s.sourcePath_str);
			_s.stopp = true;
		};


		//###############################################//
		/* Scrub */
		//###############################################//
		_s.startToScrub = function(){
			if(!_s.isSafeToBeControlled_bl) return;
			_s.allowScrubing_bl = true;
		};
		
		_s.stopToScrub = function(){
			if(!_s.isSafeToBeControlled_bl) return;
			_s.allowScrubing_bl = false;
		};
		
		_s.scrubbAtTime = function(duration){
			if(!_s.isSafeToBeControlled_bl) return;
			_s.ytb.seekTo(duration);
		}
		
		
		_s.scrub = function(percent){
			if(!_s.isSafeToBeControlled_bl) return;
			_s.ytb.seekTo(percent * _s.ytb.getDuration());
		};

	
		//###############################################//
		/* Volume */
		//###############################################//
		_s.setVolume = function(vol){
			
			if(!_s.ytb) return;
			if(vol != undefined) _s.volume = vol;
			if(_s.ytb) _s.ytb.setVolume(vol * 100);
		};

		
		//###############################################//
		/* set quality */
		//###############################################//
		_s.setQuality = function(quality){
			_s.lastQuality_str = quality;
			_s.ytb.setPlaybackQuality(quality);
		};
		
		_s.setPlaybackRate = function(rate){
			if(!_s.ytb || _s.isMbl) return;
			if(rate) _s.rate = rate;
			_s.ytb.setPlaybackRate(_s.rate);
		};
		
	
		_s.init();
	};


	/* set prototype */
	FWDRAPYoutubeScreen.setPrototype = function(){
		FWDRAPYoutubeScreen.prototype = new FWDRAPDisplayObject("div");
	};
	
	FWDRAPYoutubeScreen.READY = "ready";
	FWDRAPYoutubeScreen.ERROR = "error";
	FWDRAPYoutubeScreen.UPDATE = "update";
	FWDRAPYoutubeScreen.UPDATE_TIME = "updateTime";
	FWDRAPYoutubeScreen.SAFE_TO_SCRUBB = "safeToControll";
	FWDRAPYoutubeScreen.LOAD_PROGRESS = "loadProgress";
	FWDRAPYoutubeScreen.PLAY = "play";
	FWDRAPYoutubeScreen.PAUSE = "pause";
	FWDRAPYoutubeScreen.STOP = "stop";
	FWDRAPYoutubeScreen.PLAY_COMPLETE = "playComplete";
	FWDRAPYoutubeScreen.CUED = "cued";
	FWDRAPYoutubeScreen.QUALITY_CHANGE = "qualityChange";


	window.FWDRAPYoutubeScreen = FWDRAPYoutubeScreen;

}(window));