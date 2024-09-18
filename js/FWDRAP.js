/**
 * Royal Audio Player
 * Main class.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function (window){
	
	var FWDRAP = function(props){

		'use strict';
		
		var _s = this;
		_s.listeners = {events_ar:[]};
	
		_s.mainFolderPath_str = props.mainFolderPath;
		if((_s.mainFolderPath_str.lastIndexOf("/") + 1) != _s.mainFolderPath_str.length){
			_s.mainFolderPath_str += "/";
		}
		
		_s.skinPath_str = props.skinPath;
		if((_s.skinPath_str.lastIndexOf("/") + 1) != _s.skinPath_str.length){
			_s.skinPath_str += "/";
		}
		
		_s.warningIconPath_str = _s.mainFolderPath_str + _s.skinPath_str + "warningIcon.png";
		
		_s.useYoutube_bl = props.useYoutube || "no"; 
		_s.useYoutube_bl = _s.useYoutube_bl == "yes" ? true : false;
		
		_s.useVideo_bl = props.useVideo || "no"; 
		_s.useVideo_bl = _s.useVideo_bl == "yes" ? true : false;
		
		_s.instanceName_str = props.instanceName;
		if(!_s.instanceName_str){
			alert("FWDRAP instance name is requires please make sure that the instanceName parameter exsists and it's value is uinique.");
			return;
		}
		
		if(window[_s.instanceName_str]){
			alert("FWDRAP instance name " + _s.instanceName_str +  " is already defined and contains a different instance reference, set a different instance name.");
			return;
		}else{
			window[_s.instanceName_str] = _s;
		}
		
		if(document.cookie.indexOf("FWDRAP=" + _s.instanceName_str) != -1 && !_s.isMbl) return;
		
		FWDRAP.instaces_ar.push(_s);	
	
		/* Init */
		_s.init = function(){
			
			FWDTweenLite .ticker.useRAF(false);
			_s.props_obj = props;
			 
		
			if(!_s.props_obj){
				alert("FWDRAP constructor properties object is not defined!");
				return;
			}
			
			_s.useOnlyAPI_bl = _s.props_obj.useOnlyAPI; 
			_s.useOnlyAPI_bl = _s.useOnlyAPI_bl == "yes" ? true : false;
			
			if(!_s.props_obj.parentId && !_s.useOnlyAPI_bl){		
				alert("Property parentId is not defined in the FWDRAP constructor, _s property represents the div id into which the megazoom is added as a child!");
				return;
			}
			
			if(!FWDRAPUtils.getChildById(_s.props_obj.parentId) && !_s.useOnlyAPI_bl){
				alert("FWDRAP holder div is not found, please make sure that the div exsists and the id is correct! " + _s.props_obj.parentId);
				return;
			}

			_s.stageContainer = FWDRAPUtils.getChildById(_s.props_obj.parentId);
			
			_s.popupWindowBackgroundColor = _s.props_obj.popupWindowBackgroundColor || "#000000";
			
			_s.prevCatId = -1;
			_s.catId = -1;
			_s.id = -1;
			_s.prevId = -1;
			_s.lastPercentPlayed = 0;
			_s.totalAudio = 0;
			_s.sW = 0;
			_s.sH = 0;
			_s.maxWidth = _s.props_obj.maxWidth || 2000;
			_s.maxHeight = 0;
			_s.popupWindowWidth = _s.props_obj.popupWindowWidth || 500;
			_s.popupWindowHeight = _s.props_obj.popupWindowHeight || 400;
		
			_s.hasOpenedInPopup_bl = false;
			_s.isAPIReady_bl = false;
			_s.isPlaylistLoaded_bl = false;
			_s.isFlashScreenReady_bl = false;
			_s.orintationChangeComplete_bl = true;
			_s.useDeepLinking_bl = _s.props_obj.useDeepLinking;
			_s.useDeepLinking_bl = _s.useDeepLinking_bl == "yes" ? true : false;
			_s.openInPopup_bl = false;
			
			_s.initializeOnlyWhenVisible_bl = _s.props_obj.initializeOnlyWhenVisible; 
			_s.initializeOnlyWhenVisible_bl = _s.initializeOnlyWhenVisible_bl == "yes" ? true : false;
			
			setTimeout(function(){
				
				try{
					if(window.opener 
						&& window.opener.openedPlayerInstance 
						&& window.opener.openedPlayerInstance == _s.instanceName_str){
						_s.openInPopup_bl = true;
						_s.popupWindow = window.opener[_s.instanceName_str];
						window.opener[_s.instanceName_str].removeAndDisablePlayer();
					}else{
						if(window.opener 
						&& window.opener.openedPlayerInstance 
						&& window.opener.openedPlayerInstance != _s.instanceName_str){
							return;
						}
					}
				}catch(e){}
				
				
				_s.isMbl = FWDRAPUtils.isMobile;
				_s.hasPointerEvent_bl = FWDRAPUtils.hasPointerEvent;
				_s.setupmain_do();
				_s.startResizeHandler();
				
				if(_s.initializeOnlyWhenVisible_bl){
					window.addEventListener("scroll", _s.onInitlalizeScrollHandler);
					_s.initTimer_to = setTimeout(_s.onInitlalizeScrollHandler, 500);
				}else{
					_s.setupPlayer();
				}
				
			}, 49);
			
		
			_s.googleAnalyticsTrackingCode = _s.props_obj.googleAnalyticsTrackingCode; 
			if(!window['gtag'] && _s.googleAnalyticsTrackingCode && !FWDRAPUtils.isLocal){
				var script = document.createElement('script');
			    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + _s.googleAnalyticsTrackingCode;
			    script.setAttribute("async", "true");
			    script.onload = function() {
			      	_s.initGoogleAnalytics();
			    };
			    document.head.appendChild(script);
			}else if(window['gtag'] && _s.googleAnalyticsTrackingCode && !FWDRAPUtils.isLocal){
				 _s.initGoogleAnalytics();
			}
			
		};

		_s.initGoogleAnalytics = function(){
			  // Once the script is loaded, initialize Google Analytics
		      window.dataLayer = window.dataLayer || [];
			  _s.gtag = function(){dataLayer.push(arguments);}

		      _s.gtag('js', new Date());
		      _s.gtag('config', _s.googleAnalyticsTrackingCode);
		}
		
		_s.onInitlalizeScrollHandler = function(){
			
			var scrollOffsets = FWDRAPUtils.getScrollOffsets();
			_s.pageXOffset = scrollOffsets.x;
			_s.pageYOffset = scrollOffsets.y;
			
			if(_s.main_do.getRect().top >= -_s.sH && _s.main_do.getRect().top < _s.ws.h){
				window.removeEventListener("scroll", _s.onInitlalizeScrollHandler);
				_s.setupPlayer();
			}
		};
		
		_s.setupPlayer = function(){
			clearTimeout(_s.initTimer_to);
			_s.setupInfo();
			_s.setupData();
		}
		
		_s.popup = function(){
			if(_s.popupWindow && !_s.popupWindow.closed) return
			var myWindow;
			var left = (screen.width/2)-(_s.popupWindowWidth/2);
			var top = (screen.height/2)-(_s.popupWindowHeight/2);
			var loc = "no";
			if(FWDRAPUtils.isSafari) loc = "yes";
			
			try{
				if(FWDRAPUtils.isMobile){
					_s.popupWindow = window.open(location.href);
				}else{
					_s.popupWindow = window.open(location.href,"",'location='+loc+', width='+_s.popupWindowWidth+', height='+_s.popupWindowHeight+', top='+top+', left='+left);
				}
				
				if(_s.popupWindow){
					_s.stageContainer.style.display = "none";
					if(_s.preloader_do) _s.preloader_do.hide(false);
					_s._d.closeData();
					_s.stop();
					window.openedPlayerInstance = _s.instanceName_str;
					_s.hasOpenedInPopup_bl = true;
					_s.isAPIReady_bl = false;
				}
				_s.stopResizeHandler();
				_s.dispatchEvent(FWDRAP.POPUP);
			}catch(e){
			}
		};
		
		
		_s.removeAndDisablePlayer = function(){
			try{
				_s.stageContainer.style.display = "none";
			}catch(e){}
		};
		

		//#############################################//
		/* setup main do */
		//#############################################//
		_s.setupmain_do = function(){
			_s.main_do = new FWDRAPDisplayObject("div", "relative");
			_s.main_do.getStyle().msTouchAction = "none";
			_s.main_do.getStyle().webkitTapHighlightColor = "rgba(0, 0, 0, 0)";
			_s.main_do.setBackfaceVisibility();
			_s.main_do.setOverflow("visible");
			if(!FWDRAPUtils.isMobile || (FWDRAPUtils.isMobile && FWDRAPUtils.hasPointerEvent)) _s.main_do.setSelectable(false);
			
			if(_s.openInPopup_bl){
				if(!FWDRAPUtils.isIEAndLessThen9) document.getElementsByTagName("body")[0].style.display = "none";
				document.documentElement.appendChild(_s.main_do.screen);
				_s.main_do.setPosition("fixed");
				_s.main_do.getStyle().zIndex = "2147483646";
				document.documentElement.style.overflow = "hidden";
				document.documentElement.style.backgroundColor = _s.popupWindowBackgroundColor;	
				_s.main_do.setBkColor(_s.popupWindowBackgroundColor);
				_s.main_do.getStyle().width = "100%";
				_s.main_do.setHeight(3000);
			}else{
				_s.stageContainer.style.overflow = "visible";
				_s.stageContainer.appendChild(_s.main_do.screen);
			}
		};
		

		//#############################################//
		/* setup info_do */
		//#############################################//
		_s.setupInfo = function(){
			FWDRAPInfo.setPrototype();
			_s.info_do = new FWDRAPInfo(_s, _s.warningIconPath_str);
		};	
		

		//#############################################//
		/* resize handler */
		//#############################################//
		_s.startResizeHandler = function(){
			if(window.addEventListener){
				window.addEventListener("resize", _s.onResizeHandler);
			}else if(window.attachEvent){
				window.attachEvent("onresize", _s.onResizeHandler);
			}
			_s.onResizeHandler(true);
			_s.resizeHandlerId_to = setTimeout(function(){_s.resizeHandler(true);}, 50);
		};
		
		_s.stopResizeHandler = function(){
			clearTimeout(_s.resizeHandlerId_to);
			clearTimeout(_s.resizeHandler2Id_to);
			clearTimeout(_s.orientationChangeId_to);
			if(window.removeEventListener){
				window.removeEventListener("resize", _s.onResizeHandler);
			}else if(window.detachEvent){
				window.detachEvent("onresize", _s.onResizeHandler);
			}	
		};
		
		_s.onResizeHandler = function(e){
			_s.resizeHandler();
			clearTimeout(_s.resizeHandler2Id_to);
			_s.resizeHandler2Id_to = setTimeout(function(){_s.resizeHandler();}, 300);
		};
		
		_s.resizeHandler = function(overwrite){
			
			_s.ws = FWDRAPUtils.getViewportSize();
			
			if(!_s.openInPopup_bl){
				_s.stageContainer.style.width = "100%";
				if(_s.stageContainer.offsetWidth > _s.maxWidth && !_s.openInPopup_bl){
					_s.stageContainer.style.width = _s.maxWidth + "px";
				}
				_s.sW = _s.stageContainer.offsetWidth;
				if(_s.controller_do) _s.maxHeight = _s.controller_do.h;
				
				_s.sH = _s.maxHeight;
				_s.main_do.setWidth(_s.sW);
			}else{
				_s.sW = _s.ws.w;
				if(_s.controller_do){
					_s.sH = _s.controller_do.sH;
				}
			}
			
			if(_s.preloader_do) _s.positionPreloader();
			if(_s.controller_do) _s.controller_do.resizeAndPosition(overwrite);
			if(_s.categories_do) _s.categories_do.resizeAndPosition();
			if(_s.playlist_do) _s.playlist_do.resizeAndPosition();
			if(_s.info_do && _s.info_do.isShowed_bl) _s.info_do.positionAndResize();
			if(_s.shareWindow_do && _s.shareWindow_do.isShowed_bl) _s.shareWindow_do.positionAndResize();
			if(_s.passWindow_do && _s.passWindow_do.isShowed_bl) _s.passWindow_do.positionAndResize();
			if(_s.lgdWindow_do && _s.lgdWindow_do.isShowed_bl) _s.lgdWindow_do.positionAndResize();
			if(_s.playbackRateWindow_do && _s.playbackRateWindow_do.isShowed_bl) _s.playbackRateWindow_do.positionAndResize();
			if(_s.atb_do && _s.atb_do.isShowed_bl) _s.atb_do.positionAndResize();
			if(_s.ytb_do) _s.ytb_do.resizeAndPosition();

			_s.positionVideoHolder();
			
			if(_s._d && !overwrite){
				_s.setStageContainerHeight(false);
			}else{
				_s.setStageContainerHeight(true);
			}
		};

		
		//#############################################//
		/* resize main container */
		//#############################################//
		_s.setStageContainerHeight = function(animate){
			
			if(!_s.controller_do){
				if(!_s.openInPopup_bl){
					if(_s.sH){
						_s.main_do.setHeight(_s.sH);
						_s.stageContainer.style.height = _s.sH + "px";
					}
				}
				return;
			}
			
			if(_s.openInPopup_bl){
				if(!_s.ws) _s.ws = FWDRAPUtils.getViewportSize();
				
				_s.sW = _s.ws.w;
				_s.main_do.setX(0);
				_s.main_do.setY(0);
				_s.main_do.getStyle().width = "100%";
				
				_s.main_do.setHeight(3000);
				_s.controller_do.setX(0);
				FWDAnimation.killTweensOf(_s.controller_do);
				
				if(!_s.isFullScreen_bl) _s.controller_do.setY(0);
				_s.controller_do.setX(0);
				
				if(!_s.isFullScreen_bl) _s.controller_do.setY(0);
				_s.controller_do.setX(0);
			
				if(_s.playlist_do){
					FWDAnimation.killTweensOf(_s.playlist_do);
					_s.playlist_do.setX(0);
					
					_s.playlist_do.setY(_s.controller_do.h);	
					
					_s.playlist_do.setX(0);
					_s.playlist_do.setY(_s.controller_do.h);
				}
				return;
			}
			
			if(_s.playlist_do && _s.playlist_do.isShowed_bl){
				_s.maxHeight += _s.playlist_do.h;
			}
			if(_s.playlist_do) _s.playlist_do.setY(_s.controller_do.h);
		
			FWDAnimation.killTweensOf(_s.stageContainer);
			if(animate){
				if(_s.playlist_do){
					if(_s.playlist_do.isShowed_bl){
						_s.main_do.setHeight(_s.controller_do.h + _s.playlist_do.h);
						FWDAnimation.to(_s.stageContainer, .8, {css:{height:_s.controller_do.h + _s.playlist_do.h}, ease:Expo.easeInOut});
					}else{
						_s.main_do.setHeight(_s.controller_do.h);
						FWDAnimation.to(_s.stageContainer, .8, {css:{height:_s.controller_do.h}, ease:Expo.easeInOut});
					}
				}else{
					_s.main_do.setHeight(_s.controller_do.h);
					FWDAnimation.to(_s.stageContainer, .8, {css:{height:_s.controller_do.h}, ease:Expo.easeInOut});
				}
				
			}else{
				if(_s.playlist_do){
					if(_s.playlist_do.isShowed_bl){
						_s.main_do.setHeight(_s.controller_do.h + _s.playlist_do.h);
						_s.stageContainer.style.height = (_s.controller_do.h + _s.playlist_do.h) + "px";
					}else{
						_s.main_do.setHeight(_s.controller_do.h);
						_s.stageContainer.style.height = (_s.controller_do.h) + "px";
					}
				}else{
					_s.main_do.setHeight(_s.controller_do.h);
					_s.stageContainer.style.height = _s.controller_do.h + "px";
				}
			}	
		};

		
		//#############################################//
		/* setup context menu */
		//#############################################//
		_s.setupContextMenu = function(){
			_s.customContextMenu_do = new FWDRAPContextMenu(_s.main_do, _s._d.rightClickContextMenu_str);
		};
		

		//#############################################//
		/* Setup main instances */
		//#############################################//
		_s.setupMainInstances = function(){
			if(_s.controller_do) return;
			_s.setupAudioScreen();
			_s.setupController();
			if(_s.useYoutube_bl || _s.useVideo_bl){
				_s.setupVideosHolder();
				_s.setupHider();
			}
			if(_s.useYoutube_bl) _s.setupYoutubePlayer();
			if(_s.useVideo_bl) _s.setupVideoScreen();
			if(_s._d.showShareButton_bl) _s.setupShareWindow();
			if(_s._d.showPlaybackRateButton_bl) _s.setupPlaybackRateWindow();
			_s.setupPasswordWindow();
			_s.setupLoggedInWindow();
			if(_s._d.showPlaylistsButtonAndPlaylists_bl) _s.setupCategories();
			if(_s._d.showPlayListButtonAndPlaylist_bl) _s.setupPlaylist();
			_s.controller_do.resizeAndPosition();
			if(_s._d.addKeyboardSupport_bl) _s.addKeyboardSupport();
		};
		

		//######################################//
		/* Add keyboard support */
		//######################################//
		_s.addKeyboardSupport = function(){
			document.addEventListener("keydown",  _s.onKeyDownHandler);	
			document.addEventListener("keyup",  _s.onKeyUpHandler);	
		};
		
		_s.onKeyDownHandler = function(e){

			if(_s.isSpaceDown_bl || !_s.hasStartedToPlay_bl || FWDRAP.isSearchedFocused_bl) return;
			_s.isSpaceDown_bl = true;
			if(e.preventDefault) e.preventDefault();

			//pause
			if(_s != FWDRAP.keyboardCurInstance) return
			if (e.keyCode == 32){
				
				if(_s.audioType_str == FWDRAP.YOUTUBE){
					if(!_s.ytb_do.isSafeToBeControlled_bl) return;
					_s.ytb_do.togglePlayPause();
				}else if((_s.audioType_str == FWDRAP.VIDEO || _s.audioType_str == FWDRAP.HLS)  && _s.videoScreen_do){
					if(!_s.videoScreen_do.isSafeToBeControlled_bl) return;
					if(_s.videoScreen_do) _s.videoScreen_do.togglePlayPause();
				}else{
					if(!_s.audioScreen_do.isSafeToBeControlled_bl) return;
					_s.audioScreen_do.togglePlayPause();
				}
				if(e.preventDefault) e.preventDefault();
				return false;
			}else if (e.keyCode == 77){
				if(_s.volume != 0) _s.lastVolume = _s.volume;
				if(_s.volume != 0){
					_s.volume = 0;
				}else{
					_s.volume = _s.lastVolume;
				}
				_s.setVolume(_s.volume);
			}else if (e.keyCode == 38){
				_s.volume += .1;
				if(_s.volume > 1) _s.volume = 1;
				_s.setVolume(_s.volume);
			}else if (e.keyCode == 40){
				_s.volume -= .1;
				if(_s.volume < 0) _s.volume = 0;
				_s.setVolume(_s.volume);
			}else if (e.keyCode == 77){
				if(_s.volume < 0) _s.volume = 0;
				_s.setVolume(_s.volume);
			}else if (e.keyCode == 39 && !_s.isAdd_bl){
				var curTime = _s.getCurrentTime();
				if(curTime.length == 5) curTime = "00:" + curTime;
				if(curTime.length == 7) curTime = "0" + curTime;
				curTime = FWDRAPUtils.getSecondsFromString(curTime);
				curTime += 5;
				curTime = FWDRAPUtils.formatTime(curTime);
				if(curTime.length == 5) curTime = "00:" + curTime;
				if(curTime.length == 7) curTime = "0" + curTime;
				
				_s.scrubbAtTime(curTime);
			}else if (e.keyCode == 37 && !_s.isAdd_bl){
				var curTime = _s.getCurrentTime();
				if(curTime.length == 5) curTime = "00:" + curTime;
				if(curTime.length == 7) curTime = "0" + curTime;
				curTime = FWDRAPUtils.getSecondsFromString(curTime);
				curTime -= 5;
				curTime = FWDRAPUtils.formatTime(curTime);
				if(curTime.length == 5) curTime = "00:" + curTime;
				if(curTime.length == 7) curTime = "0" + curTime;
				_s.scrubbAtTime(curTime);
			}
		};
		
		_s.onKeyUpHandler = function(e){
			_s.isSpaceDown_bl = false;
		};


		//##########################################//
		/* Setup embed window */
		//##########################################//
		_s.setupLoggedInWindow = function(){
			FWDRAPPassword.setPrototype();
			_s.lgdWindow_do = new FWDRAPPassword(_s._d, _s, true);
		};

		
		//##########################################//
		/* Setup embed window */
		//##########################################//
		_s.setupPasswordWindow = function(){
			FWDRAPPassword.setPrototype();
			_s.passWindow_do = new FWDRAPPassword(_s._d, _s);
			_s.passWindow_do.addListener(FWDRAPPassword.CORRECT, _s.passordCorrect);
		};
		
		_s.passordCorrect = function(){
			_s.passWindow_do.hide();
			_s.hasPassedPassowrd_bl = true;
			_s.play();
		}
		

		//###############################################//
		/* Setup click screen */
		//###############################################//
		_s.setupClickScreen = function(){
			_s.dumyClick_do = new FWDRAPDisplayObject("div");
			_s.dumyClick_do.getStyle().width = "100%";
			_s.dumyClick_do.getStyle().height = "100%";
			if(FWDRAPUtils.isIE){
				_s.dumyClick_do.setBkColor("#00FF00");
				_s.dumyClick_do.setAlpha(.00001);
			}
			if(_s.dumyClick_do.screen.addEventListener){
				_s.dumyClick_do.screen.addEventListener("click", _s.playPauseClickHandler);
			}else if(_s.dumyClick_do.screen.attachEvent){
				_s.dumyClick_do.screen.attachEvent("onclick", _s.playPauseClickHandler);
			}
		};
		
		_s.playPauseClickHandler = function(e){
			if(e.button == 2) return;
			
			if(_s.disableClick_bl) return;
			_s.firstTapPlaying_bl = _s.isPlaying_bl;
			
			FWDRAP.keyboardCurInstance = _s;
			
			if(_s.audioType_str == FWDRAP.YOUTUBE){
				_s.ytb_do.togglePlayPause();
			}else if(_s.audioType_str == FWDRAP.VIDEO){
				if(_s.videoScreen_do) _s.videoScreen_do.togglePlayPause();
			}
		};
		

		//########################################//
		/* add double click and tap support */
		//########################################//
		_s.addDoubleClickSupport = function(){	
			if(!_s.isMbl && _s.dumyClick_do.screen.addEventListener){
				_s.dumyClick_do.screen.addEventListener("mousedown", _s.onFirstDown);
				if(FWDRAPUtils.isIEWebKit) _s.dumyClick_do.screen.addEventListener("dblclick", _s.onSecondDown);
			}else if(_s.isMbl){
				_s.dumyClick_do.screen.addEventListener("touchstart", _s.onFirstDown);
			}else if(_s.dumyClick_do.screen.addEventListener){
				_s.dumyClick_do.screen.addEventListener("mousedown", _s.onFirstDown);
			}
		};
		
		_s.onFirstDown = function(e){
			if(e.button == 2) return;
			if(_s.isFullscreen_bl && e.preventDefault) e.preventDefault();
			var viewportMouseCoordinates = FWDRAPUtils.getViewportMouseCoordinates(e);
			_s.firstTapX = viewportMouseCoordinates.screenX;
			_s.firstTapY = viewportMouseCoordinates.screenY;
			
			_s.firstTapPlaying_bl = _s.isPlaying_bl;
			
			if(FWDRAPUtils.isIEWebKit) return;
			
			if(_s.isMbl){
				_s.dumyClick_do.screen.addEventListener("touchstart", _s.onSecondDown);
				_s.dumyClick_do.screen.removeEventListener("touchstart", _s.onFirstDown);
			}else{
				if(_s.dumyClick_do.screen.addEventListener){
					_s.dumyClick_do.screen.addEventListener("mousedown", _s.onSecondDown);
					_s.dumyClick_do.screen.removeEventListener("mousedown", _s.onFirstDown);
				}
			}
			clearTimeout(_s.secondTapId_to);
			_s.secondTapId_to = setTimeout(_s.doubleTapExpired, 250);
		};
		
		_s.doubleTapExpired = function(){
			clearTimeout(_s.secondTapId_to);
			if(_s.isMbl){
				_s.dumyClick_do.screen.removeEventListener("touchstart", _s.onSecondDown);
				_s.dumyClick_do.screen.addEventListener("touchstart", _s.onFirstDown);
			}else{
				if(_s.dumyClick_do.screen.addEventListener){
					_s.dumyClick_do.screen.removeEventListener("mousedown", _s.onSecondDown);
					_s.dumyClick_do.screen.addEventListener("mousedown", _s.onFirstDown);
				}
			}
		};
		
		_s.onSecondDown = function(e){
			if(e.preventDefault) e.preventDefault();
			var viewportMouseCoordinates = FWDRAPUtils.getViewportMouseCoordinates(e);
			var dx;
			var dy;
			
			if(FWDRAPUtils.isIEWebKit) _s.firstTapPlaying_bl = _s.isPlaying_bl;

			if(e.touches && e.touches.length != 1) return;
			dx = Math.abs(viewportMouseCoordinates.screenX - _s.firstTapX);   
			dy = Math.abs(viewportMouseCoordinates.screenY - _s.firstTapY); 
		
			if(_s.isMbl && (dx > 10 || dy > 10)){
				return;
			}else if(!_s.isMbl && (dx > 2 || dy > 2)){
				return
			}
			_s.switchFullScreenOnDoubleClick();
			
			if(!FWDRAPUtils.isIEWebKit){
				if(_s.firstTapPlaying_bl){
					_s.play();
				}else{
					_s.pause();
				}
			}
		};
		
		_s.switchFullScreenOnDoubleClick = function(){
			_s.disableClick();
			if(!_s.isFullScreen_bl){
				_s.goFullScreen();
			}else{
				_s.goNormalScreen();
			}
		};

		
		//####################################//
		/* Setup hider */
		//####################################//
		_s.setupHider = function(){
			FWDRAPHider.setPrototype();
			_s.hider = new FWDRAPHider(_s.main_do, _s.controller_do.videoControllerHolder_do, 2000);
			_s.hider.addListener(FWDRAPHider.SHOW, _s.hiderShowHandler);
			_s.hider.addListener(FWDRAPHider.HIDE, _s.hiderHideHandler);
			_s.hider.addListener(FWDRAPHider.HIDE_COMPLETE, _s.hiderHideCompleteHandler);
		};
		
		_s.hiderShowHandler = function(){
			if(_s.controller_do) _s.controller_do.showVideoContoller(true);
			_s.showCursor();
		};
		
		_s.hiderHideHandler = function(){
			if(FWDRAPUtils.isIphone) return;
			
			if(_s.audioType_str == FWDRAP.VIDEO && _s.videoScreen_do && !_s.videoScreen_do.isPlaying_bl){
				_s.hider.reset();
				return;
			}else if(_s.audioType_str == FWDRAP.YOUTUBE && _s.ytb_do && !_s.ytb_do.isPlaying_bl){
				_s.hider.reset();
				return;
			}
			
			if(FWDRAPUtils.hitTest(_s.controller_do.videoControllerHolder_do.screen, _s.hider.globalX, _s.hider.globalY)){
				_s.hider.reset();
				return;
			}
			
			_s.hideCursor();
			_s.controller_do.hideVideoContoller(true);
		};
		
		_s.hiderHideCompleteHandler = function(){};
		
		_s.setupVideosHolder = function(){
			
			_s.videosHolder_do = new FWDRAPDisplayObject("div");
			_s.videosHolder_do.getStyle().background = "url('" + _s._d.thumbnailBkPath_str + "')";
			_s.controller_do.mainHolder_do.addChild(_s.videosHolder_do);
			if(!_s._d.showVideoFullScreenButton_bl || _s.openInPopup_bl) return;
			
			_s.setupClickScreen();
			_s.setupDisableClick();
			_s.addDoubleClickSupport();
			
			
			_s.fullScreenButtonOverlay_do = new FWDRAPDisplayObject("div");
			_s.fullScreenButtonOverlay_do.getStyle().background = "url('" + _s._d.thumbnailBkPath_str + "')";
			_s.fullScreenButtonOverlay_do.screen.className = 'fwdrap-video-player-overlay';
			_s.fullScreenButtonOverlay_do.setWidth(_s._d.controllerHeight);
			_s.fullScreenButtonOverlay_do.setHeight(_s._d.controllerHeight);
			
			FWDRAPSimpleButton.setPrototype();
			if(_s._d.useVectorIcons){				
				_s.largePlayButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<div class='table-fwdrap-button'><span class='table-cell-fwdrap-button fwdrap-icon-play'></span></div>",
						"fwdrap-large-play-button-normal-state",
						"fwdrap-large-play-button-selected-state"
				);
			}else{
				_s.largePlayButton_do = new FWDRAPSimpleButton(_s._d.largePlayN_img, _s._d.largePlayS_str, undefined, true,
														 _s._d.useHEX,
														 _s._d.nBC,
														 _s._d.sBC,
														 false, false, false, true);
			}
			
			_s.largePlayButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.largePlayButtonUpHandler);
			_s.largePlayButton_do.screen.className = 'fwdrap-large-play-button';
			_s.largePlayButton_do.hide();
			
			FWDRAPComplexButton.setPrototype();
			if(_s._d.useVectorIcons){
				_s.fullScreenButton_do = new FWDRAPComplexButton(0, 0, 0, 0, true, 0, 0, 0,
					"<span class='fwdrap-icon fwdrap-icon-screen-maximise'></span>",
					"<span class='fwdrap-icon fwdrap-icon-screen-minimise'></span>",
					"fwdrap-main-button-normal-state",
					"fwdrap-main-button-selected-state"
				);
			}else{
				_s.fullScreenButton_do = new FWDRAPComplexButton(
					_s._d.fullScreenN_img,
					_s._d.fullScreenS_str,
					_s._d.normalScreenN_img,
					_s._d.normalScreenS_str,
					true,
					_s._d.useHEX,
					_s._d.nBC,
					_s._d.sBC
				);
			}
			
			if(_s._d.showButtonsToolTips_bl){
				FWDRAPToolTip.setPrototype();
				_s.fullscreenToolTip_do = new FWDRAPToolTip(_s.fullScreenButton_do, _s._d.toopTipBk_str,  "full screen / normal screen", _s._d.toolTipsBkClr, _s._d.toolTipsFntClr, _s._d.toolTipsDl);
				document.documentElement.appendChild(_s.fullscreenToolTip_do.screen);
				_s.fullScreenButton_do.addListener(FWDRAPComplexButton.SHOW_TOOLTIP, _s.fullScreenShowToolTipHandler);
			}
			
			_s.fullScreenButton_do.addListener(FWDRAPComplexButton.MOUSE_UP, _s.toggleFullScreen);
			_s.videosHolder_do.setWidth(_s._d.controllerHeight);
			_s.videosHolder_do.setHeight(_s._d.controllerHeight);
			_s.checkShowFullScreenButtonHitTest();
			
			setTimeout(function(){
				_s.videosHolder_do.addChild(_s.dumyClick_do);
				if(_s.disableClick_do) _s.main_do.addChild(_s.disableClick_do);
				_s.videosHolder_do.addChild(_s.fullScreenButtonOverlay_do);
				if(!_s.controller_do.mainHolder_do.contains(_s.fullScreenButton_do)) _s.videosHolder_do.addChild(_s.fullScreenButton_do);
				_s.videosHolder_do.addChild(_s.largePlayButton_do);
				_s.hideFullScreenButtonAndOverlay(false, true);
			}, 50);
		};
		
		_s.largePlayButtonUpHandler = function(){
			_s.disableClick();
			_s.largePlayButton_do.hide();
			_s.play();
		};
		
		_s.fullScreenShowToolTipHandler = function(e){
			_s.controller_do.showToolTip(_s.fullScreenButton_do, _s.fullscreenToolTip_do, e.e);
		};
		
		_s.toggleFullScreen = function(){
			if(_s.isMbl && _s.fullScreenButton_do.alpha < .5){
				_s.showFullScreenButtonAndOverlay(true);
				return;
			}
			if(_s.fullScreenButton_do.currentState == 1){
				_s.goFullScreen();
			}else{
				_s.goNormalScreen();
			}
		}
		
		_s.positionVideoHolder = function(){
			if(_s.isFullScreen_bl){
				var viewportSize = FWDRAPUtils.getViewportSize();
				_s.videosHolder_do.setWidth(viewportSize.w);
				_s.videosHolder_do.setHeight(viewportSize.h);
				_s.largePlayButton_do.setX(parseInt((viewportSize.w - _s.largePlayButton_do.w)/2));
				_s.largePlayButton_do.setY(parseInt((viewportSize.h - _s.largePlayButton_do.h)/2));
			}else{
				if(_s.videosHolder_do ){
					_s.videosHolder_do.setWidth(_s._d.controllerHeight);
					_s.videosHolder_do.setHeight(_s._d.controllerHeight);
				}
			}
		};
		
		_s.checkShowFullScreenButtonHitTest = function(){
			if(_s.fullScreenButtonOverlay_do && _s.fullScreenButtonOverlay_do.screen.addEventListener){
				_s.fullScreenButtonOverlay_do.screen.addEventListener("mousemove", _s.checkShowFullScreenButtonHitTestHandler);
				window.removeEventListener("mousemove", _s.checkFullScreenAndOverlayHit);
			}
		};
		
		_s.checkShowFullScreenButtonHitTestHandler = function(){
			if(_s.isFullScreen_bl) return;
			if(_s.fullScreenButtonOverlay_do.screen.addEventListener){
				_s.fullScreenButtonOverlay_do.screen.removeEventListener("mousemove", _s.checkShowFullScreenButtonHitTestHandler);
				window.addEventListener("mousemove", _s.checkFullScreenAndOverlayHit);
			}
			_s.showFullScreenButtonAndOverlay(true);
		}
		
		_s.checkFullScreenAndOverlayHit = function(e){
			if(_s.isFullScreen_bl) return;
			if(_s.fullScreenButtonOverlay_do.screen.EventListener){
				_s.fullScreenButtonOverlay_do.screen.removeEventListener("mousemove", _s.showFullScreenButtonAndOverlay);
			}
			var vc = FWDRAPUtils.getViewportMouseCoordinates(e);	
			if(!FWDRAPUtils.hitTest(_s.fullScreenButtonOverlay_do.screen, vc.screenX, vc.screenY)){
				_s.checkShowFullScreenButtonHitTest();
				_s.hideFullScreenButtonAndOverlay(true);
			}
		};
		
		_s.showFullScreenButtonAndOverlay = function(animate){
			if(_s.isFullScreenButtonAndOverlayShowed_bl) return;
			_s.isFullScreenButtonAndOverlayShowed_bl = true;
		
			FWDAnimation.killTweensOf(_s.fullScreenButton_do);
			FWDAnimation.killTweensOf(_s.fullScreenButtonOverlay_do);
			if(animate){
				FWDAnimation.to(_s.fullScreenButton_do, .8, {alpha:1, ease:Expo.easeOut});
				FWDAnimation.to(_s.fullScreenButtonOverlay_do, .8, {alpha:.6, ease:Expo.easeOut});
			}else{
				_s.fullScreenButton_do.setAlpha(1);
				_s.fullScreenButtonOverlay_do.setAlpha(.6);
			}
			_s.positionVideoHolder();
		};
		
		_s.hideFullScreenButtonAndOverlay = function(animate, overwrite){
			if(!_s.isFullScreenButtonAndOverlayShowed_bl && !overwrite) return;
			_s.isFullScreenButtonAndOverlayShowed_bl = false;
			if(!_s.fullScreenButton_do) return;
			FWDAnimation.killTweensOf(_s.fullScreenButton_do);
			FWDAnimation.killTweensOf(_s.fullScreenButtonOverlay_do);
			if(animate){
				if(_s.videosHolder_do.x == 0) FWDAnimation.to(_s.fullScreenButton_do, .8, {alpha:0, ease:Expo.easeOut});
				FWDAnimation.to(_s.fullScreenButtonOverlay_do, .8, {alpha:0, ease:Expo.easeOut});
			}else{
				if(_s.videosHolder_do.x == 0) _s.fullScreenButton_do.setAlpha(0);
				_s.fullScreenButtonOverlay_do.setAlpha(0);
			}
		};
		

		//#####################################//
		/* Setup disable click */
		//#####################################//
		_s.setupDisableClick = function(){
			_s.disableClick_do = new FWDRAPDisplayObject("div");
		};
		
		_s.disableClick = function(){
			_s.disableClick_bl = true;
			clearTimeout(_s.disableClickId_to);
			if(_s.disableClick_do){
				_s.disableClick_do.getStyle().width = "5000px";
				_s.disableClick_do.getStyle().height = "5000px";
			}
			_s.disableClickId_to =  setTimeout(function(){
				if(_s.disableClick_do){
					_s.disableClick_do.setWidth(0);
					_s.disableClick_do.setHeight(0);
				}
				_s.disableClick_bl = false;
			}, 500);
		};
		

		//#############################################//
		/* go fullscreen / normal screen */
		//#############################################//
		_s.goFullScreen = function(){
			if(!_s.isAPIReady_bl) return;
			
			if(document.addEventListener){
				document.addEventListener("fullscreenchange", _s.onFullScreenChange);
				document.addEventListener("mozfullscreenchange", _s.onFullScreenChange);
				document.addEventListener("webkitfullscreenchange", _s.onFullScreenChange);
				document.addEventListener("MSFullscreenChange", _s.onFullScreenChange);
			}
			
			if(document.documentElement.requestFullScreen) {
				document.documentElement.requestFullScreen();
			}else if(document.documentElement.mozRequestFullScreen){ 
				document.documentElement.mozRequestFullScreen();
			}else if(document.documentElement.webkitRequestFullScreen){
				document.documentElement.webkitRequestFullScreen();
			}else if(document.documentElement.msRequestFullscreen){
				document.documentElement.msRequestFullscreen();
			}
			
			_s.disableClick();
			
			_s.main_do.getStyle().position = "fixed";
			_s.controller_do.setOverflow("visible");
			_s.controller_do.mainHolder_do.setOverflow("visible");
			document.documentElement.style.overflow = "hidden";
			_s.main_do.getStyle().zIndex = 9999999999998;
			if(_s.playlist_do) _s.playlist_do.setVisible(false);
			_s.controller_do.goFullScreen();
			_s.controller_do.videoControllerHolder_do.addChild(_s.fullScreenButton_do);
			_s.videosHolder_do.setX(0);
			_s.fullScreenButtonOverlay_do.setVisible(false);
		
			_s.isFullScreen_bl = true;
			_s.fullScreenButton_do.setButtonState(0);
			
			var scrollOffsets = FWDRAPUtils.getScrollOffsets();
			_s.lastX = scrollOffsets.x;
			_s.lastY = scrollOffsets.y;
			if(_s.hider && _s.audioType_str == FWDRAP.VIDEO && _s.videoScreen_do && _s.videoScreen_do.isPlaying_bl){
				_s.hider.start();
			}else if(_s.hider && _s.audioType_str == FWDRAP.YOUTUBE && _s.ytb_do && _s.ytb_do.isPlaying_bl){
				_s.hider.start();
			}
			if(_s.playlist_do && _s.playlist_do.ascDscButton_do) _s.playlist_do.ascDscButton_do.setAlpha(0);
			
			if(_s.audioType_str == FWDRAP.VIDEO && _s.videoScreen_do && !_s.videoScreen_do.isPlaying_bl){
				_s.largePlayButton_do.show();
			}else if(_s.audioType_str == FWDRAP.YOUTUBE && _s.ytb_do && !_s.ytb_do.isPlaying_bl && !_s.isMbl){
				_s.largePlayButton_do.show();
			}
			
			window.scrollTo(0,0);
		
			if(_s.isMbl) window.addEventListener("touchmove", _s.disableFullScreenOnMobileHandler, {passive:false});
			
			_s.resizeHandler(true);
			
		};
		
		_s.disableFullScreenOnMobileHandler = function(e){
			if(e.preventDefault) e.preventDefault();
		};
		
		_s.goNormalScreen = function(){		
			if(!_s.isAPIReady_bl || !_s.isFullScreen_bl) return;
			
			if(document.cancelFullScreen) {  
				document.cancelFullScreen();  
			}else if (document.mozCancelFullScreen) {  
				document.mozCancelFullScreen();  
			}else if (document.webkitCancelFullScreen) {  
				document.webkitCancelFullScreen();  
			}else if (document.msExitFullscreen) {  
				document.msExitFullscreen();  
			}
			_s.disableClick();
			_s.addmain_doToTheOriginalParent();
			_s.showCursor();
			if(_s.fullScreenButton_do) _s.fullScreenButton_do.setButtonState(1);
			if(_s.playlist_do && _s.playlist_do.ascDscButton_do) _s.playlist_do.ascDscButton_do.setAlpha(1);
			_s.isFullScreen_bl = false;
		};
		
		_s.addmain_doToTheOriginalParent = function(){
			if(!_s.isFullScreen_bl) return;
			
			if(document.removeEventListener){
				document.removeEventListener("fullscreenchange", _s.onFullScreenChange);
				document.removeEventListener("mozfullscreenchange", _s.onFullScreenChange);
				document.removeEventListener("webkitfullscreenchange", _s.onFullScreenChange);
				document.removeEventListener("MSFullscreenChange", _s.onFullScreenChange);
			}
			
			_s.isFullScreen_bl = false;
			if(!_s.isEmbedded_bl){
				if(FWDRAPUtils.isIEAndLessThen9){
					document.documentElement.style.overflow = "auto";
				}else{
					document.documentElement.style.overflow = "visible";
				}	
				_s.main_do.getStyle().position = "relative";
			}

			_s.controller_do.setOverflow("hidden");
			_s.controller_do.mainHolder_do.setOverflow("hidden");
			_s.controller_do.goNormalScreen();
			_s.videosHolder_do.addChild(_s.fullScreenButton_do);
			document.documentElement.style.overflow = "visible";

			_s.main_do.getStyle().zIndex = 0;
			if(_s.playlist_do){
				_s.playlist_do.setVisible(true);
				if(_s.playlist_do.ascDscButton_do) _s.playlist_do.ascDscButton_do.setAlpha(1);
			}
			_s.hideFullScreenButtonAndOverlay(false);
			_s.fullScreenButtonOverlay_do.setVisible(true);
			_s.checkShowFullScreenButtonHitTest();
			if(_s.largePlayButton_do) _s.largePlayButton_do.hide();
			if(_s.hider){
				_s.hider.reset();
				_s.hider.stop();
			}
			_s.resizeHandler(true);
			
			window.scrollTo(_s.lastX, _s.lastY);
			if(!FWDRAPUtils.isIE){
				setTimeout(function(){
					window.scrollTo(_s.lastX, _s.lastY);
				}, 150);
			}
			
			if(_s.isMbl) window.removeEventListener("touchmove", _s.disableFullScreenOnMobileHandler);
		};
		
		_s.onFullScreenChange = function(e){
			if(!(document.fullScreen || document.msFullscreenElement  || document.mozFullScreen || document.webkitIsFullScreen || document.msieFullScreen)){
				_s.fullScreenButton_do.setButtonState(1);
				_s.addmain_doToTheOriginalParent();
				_s.isFullScreen_bl = false;
				_s.resizeHandler(true);
			}
		};
		

		//###########################################//
		/* Hide / show cursor */
		//###########################################//
		_s.hideCursor = function(){
			document.documentElement.style.cursor = "none";
			if(_s.dumyClick_do) _s.dumyClick_do.getStyle().cursor = "none";
			document.getElementsByTagName("body")[0].style.cursor = "none";
		};
		
		_s.showCursor = function(){
			document.documentElement.style.cursor = "auto";
			document.getElementsByTagName("body")[0].style.cursor = "auto";
			if(_s.dumyClick_do) _s.dumyClick_do.getStyle().cursor = "auto";
		};
	

		//#############################################//
		/* setup _d */
		//#############################################//
		_s.setupData = function(){
			if(_s._d) return;
			FWDRAPAudioData.setPrototype();
			_s._d = new FWDRAPAudioData(_s.props_obj, _s.rootElement_el, _s);

			_s._d.addListener(FWDRAPAudioData.UPDATE_IMAGE, _s.onImageUpdate);
			_s._d.addListener(FWDRAPAudioData.PRELOADER_LOAD_DONE, _s.onPreloaderLoadDone);
			_s._d.addListener(FWDRAPAudioData.SOUNDCLOUD_TRACK_READY, _s.onSoundClooudReady);
			_s._d.addListener(FWDRAPAudioData.RADIO_TRACK_READY, _s.onRadioReady);
			_s._d.addListener(FWDRAPAudioData.RADIO_TRACK_UPDATE, _s.onRadioTrackUpdate);
			_s._d.addListener(FWDRAPAudioData.LOAD_ERROR, _s._dLoadError);
			_s._d.addListener(FWDRAPAudioData.SKIN_PROGRESS, _s._dSkinProgressHandler);
			_s._d.addListener(FWDRAPAudioData.SKIN_LOAD_COMPLETE, _s._dSkinLoadComplete);
			_s._d.addListener(FWDRAPAudioData.PLAYLIST_LOAD_COMPLETE, _s._dPlayListLoadComplete);
		};
		
		_s.onSoundClooudReady = function(e){
			_s._d.playlist_ar[_s.id].source = e.source;
			_s.setSource();
			if(_s.isPlaylistItemClicked_bl) _s.play();
		};
		
		_s.onImageUpdate = function(e){
			_s.controller_do.loadThumb(e.image);
		}
		
		_s.onRadioReady = function(e){
			if(!_s.isShoutcast_bl && !_s.isIcecast_bl){
				_s._d.closeJsonPLoader();
				return
			}
			
			_s.audioPath = _s.radioSource_str = e.source;
			if(_s.prevAudioPath == _s.audioPath && _s.prevSongTitle == e.songTitle) return;
			
			if(_s.prevAudioPath != _s.audioPath){
				_s.setSource();
				if(_s.isPlaylistItemClicked_bl) _s.play();
			}

			_s.controller_do.setTitle(_s._d.playlist_ar[_s.id].title + ' - ' + e.songTitle);
			
			_s.prevAudioPath = _s.audioPath;
			_s.prevSongTitle = e.songTitle;
		};
		
		_s.onRadioTrackUpdate = function(e){
			_s.curTitle = e.songTitle;
			if(_s.curTitle ==  _s.prevTitle) return;
			_s.controller_do.setTitle(e.songTitle);
			_s.prevTitle = _s.curTitle;
		}
		
		_s.onPreloaderLoadDone = function(){

			_s.maxHeight = _s._d.controllerHeight;
			_s.setupPreloader();
			if(!_s.isMbl) _s.setupContextMenu();
			
			_s.resizeHandler();
			
			if(!_s.openInPopup_bl) _s.main_do.setHeight(_s._d.controllerHeight);
			_s.stageContainer.style.height = _s._d.controllerHeight + "px";
		};
		
		_s._dLoadError = function(e){
			_s.maxHeight = 200;
			if(_s.preloader_do) _s.preloader_do.hide(false);
			_s.main_do.addChild(_s.info_do);
			_s.info_do.showText(e.text);
			if(e.doNotResize){
				_s.main_do.setHeight(_s._d.controllerHeight);
				_s.stageContainer.style.height = (_s._d.controllerHeight) + "px";	
			}
			
			_s.dispatchEvent(FWDRAP.ERROR, {error:e.text});
		};
		
		_s._dSkinProgressHandler = function(e){};
		
		_s._dSkinLoadComplete = function(){	
			if(_s.openInPopup_bl) _s._d.showPopupButton_bl = false;
			if(_s.useDeepLinking_bl){
				setTimeout(function(){_s.setupDL();}, 200);
			}else{
				if(FWDRAPUtils.getCookie('FWDRAPusePP')){
					_s.catId = FWDRAPUtils.getCookie('FWDRAPcatId');
					_s.id = FWDRAPUtils.getCookie('FWDRAPid');
				}else if(_s.openInPopup_bl){
					_s.catId = _s.popupWindow.catId;
					_s.id = _s.popupWindow.id;
				}else{
					_s.catId = _s._d.startAtPlaylist;
					_s.id = _s._d.startAtTrack;
				}
				_s.loadInternalPlaylist();
			}
			_s.setupContinousPlayback();
		};
	
		_s._dPlayListLoadComplete = function(){
		
			if(!_s.isAPIReady_bl){
				_s.dispatchEvent(FWDRAP.READY);
				
			} 
			if(_s._d.randomizePlaylist_bl) _s._d.playlist_ar = FWDRAPUtils.randomizeArray(_s._d.playlist_ar);
			if(_s._d.startAtRandomTrack_bl){
				_s.id = Math.max(0,parseInt(Math.random() * _s._d.playlist_ar.length) - 1);
				if(_s.useDeepLinking_bl){
					FWDAddress.setValue(_s.instanceName_str + "?catid=" + _s.catId + "&trackid=" + _s.id);
				}
			}
			
			_s.isAPIReady_bl = true;
			_s.isPlaylistLoaded_bl = true;
			if(_s.openInPopup_bl){
				_s._d.autoPlay_bl = true;
				_s._d.showPlayListByDefault_bl = true;
			}
		
			
			_s.setupMainInstances();
			_s.updatePlaylist();
			_s.resizeHandler();
		
			_s.dispatchEvent(FWDRAP.LOAD_PLAYLIST_COMPLETE);
		};
		
		_s.updatePlaylist = function(){
			if(_s.main_do) if(_s.main_do.contains(_s.info_do)) _s.main_do.removeChild(_s.info_do);
			_s.preloader_do.hide(true);
			_s.prevId = -1;
			_s.totalAudio = _s._d.playlist_ar.length;
			_s.controller_do.enableControllerWhileLoadingPlaylist();
	    	_s.controller_do.cleanThumbnails(true);
	    	
	    	if(_s.playlist_do) _s.playlist_do.updatePlaylist(_s._d.playlist_ar);
	    	if(_s.openInPopup_bl && _s.popupWindow.videoScreen_do) _s.lastPercentPlayed = _s.popupWindow.videoScreen_do.lastPercentPlayed;
	    	_s.setSource();
			if(_s._d.autoPlay_bl || _s._d.playTrackAfterPlaylistLoad_bl){
				setTimeout(_s.play, 1000);
			} 
		
			
			if(_s.playlist_do && _s.playlist_do.isShowed_bl){
				_s.controller_do.setPlaylistButtonState("selected");
				
			}
			if(_s.playlist_do && _s.playlist_do.comboBox_do) _s.playlist_do.comboBox_do.setButtonsStateBasedOnId(_s.catId);
			
			if(_s._d.playlist_ar && _s._d.playlist_ar[_s.id]){
				_s.videoNameGa = _s._d.playlist_ar[_s.id]["titleText"];
				_s.videoCat = _s._d.cats_ar[_s.catId]["playlistsName"];
			}	
		};
		
		_s.loadInternalPlaylist = function(){
			_s.isPlaylistLoaded_bl = false;
			_s.isPlaylistItemClicked_bl = false;
			_s.stop();

			if(_s.hider){
				_s.hider.reset();
				_s.hider.stop();
			}

			_s.preloader_do.show(true);

			if(_s.controller_do){
				_s.controller_do.disableControllerWhileLoadingPlaylist();
				_s.controller_do.loadThumb();
			}
			
			if(_s.playlist_do){
				_s.playlist_do.destroyPlaylist();
				if( _s.playlist_do.comboBox_do)  _s.playlist_do.comboBox_do.hide(false, true);
			} 
			
			_s._d.loadPlaylist(_s.catId);
			if(_s.isAPIReady_bl) _s.dispatchEvent(FWDRAP.START_TO_LOAD_PLAYLIST);
		};


		//#############################################//
		/* Setup continuous playback */
		//#############################################//
		this.setupContinousPlayback =  function(){
			if(!_s._d.useContinuousPlayback_bl) return;
			_s.ppPplayedOnce = false;
			window.onbeforeunload = function (e) {
				var date = new Date();
		   		date.setTime(date.getTime() + (20000));
		   		var pp = 0;
				var isPlaying_bl;
		   		if(_s.audioType_str == FWDRAP.YOUTUBE && _s.ytb_do){
					if(_s.ytb_do){
						pp = _s.ytb_do.lastPercentPlayed;
						isPlaying_bl = _s.ytb_do.isPlaying_bl;
					}
				}else if(_s.audioType_str == FWDRAP.VIDEO && _s.videoScreen_do){
					if(_s.videoScreen_do){
						pp = _s.videoScreen_do.lastPercentPlayed;
						isPlaying_bl = _s.videoScreen_do.isPlaying_bl;
					}
				}else{
					if(_s.audioScreen_do){
						pp = _s.audioScreen_do.lastPercentPlayed;
						isPlaying_bl = _s.audioScreen_do.isPlaying_bl;
					}
				}
		
				document.cookie = "FWDRAPusePP=true; expires=" + date.toGMTString() + ", 01-Jan-70 00:00:01 GMT; path=/";
				document.cookie = "FWDRAPVolume=" + _s.volume + "; expires=" + date.toGMTString() + ", 01-Jan-70 00:00:01 GMT; path=/";
				document.cookie = "FWDRAPpp=" + pp + "; expires=" + date.toGMTString() + ", 01-Jan-70 00:00:01 GMT; path=/";
				document.cookie = "FWDRAPppPlay=" + isPlaying_bl + "; expires=" + date.toGMTString() + ", 01-Jan-70 00:00:01 GMT; path=/";
				document.cookie = "FWDRAPcatId=" + _s.catId + "; expires=" + date.toGMTString() + ", 01-Jan-70 00:00:01 GMT; path=/";
				document.cookie = "FWDRAPid=" + _s.id + "; expires=" + date.toGMTString() + ", 01-Jan-70 00:00:01 GMT; path=/";
			};
		}


		//#####################//
		/* Setup a to b */
		//####################//
		_s.setupAtbWindow = function(){
			FWDRAPATB.setPrototype();
			_s.atb_do = new FWDRAPATB(_s.controller_do, _s);
			_s.atb_do.addListener(FWDRAPATB.HIDE_COMPLETE, _s.atbWindowHideCompleteHandler);
		};
		
		_s.atbWindowHideCompleteHandler = function(){
			if(_s.controller_do && !_s.isMbl){
				_s.controller_do.atbButton_do.isDisabled_bl = false;
				_s.controller_do.atbButton_do.setNormalState(true);
			}
		};
		

		//#####################//
		/* Setup share window */
		//####################//
		_s.setupPlaybackRateWindow = function(){
			FWDRAPPlaybackRateWindow.setPrototype();
			_s.playbackRateWindow_do = new FWDRAPPlaybackRateWindow(_s._d, _s);
			_s.playbackRateWindow_do.addListener(FWDRAPPlaybackRateWindow.HIDE_COMPLETE, _s.playbackRateWindowHideCompleteHandler);
			_s.playbackRateWindow_do.addListener(FWDRAPPlaybackRateWindow.SET_PLAYBACK_RATE, _s.playbackRateWindowSetPlaybackRateHandler);
		};
		
		_s.playbackRateWindowHideCompleteHandler = function(){
			if(_s.controller_do && !_s.isMbl){
				_s.controller_do.playbackRateButton_do.isDisabled_bl = false;
				_s.controller_do.playbackRateButton_do.setNormalState(true);
			}
		};
		
		_s.playbackRateWindowSetPlaybackRateHandler = function(e){
			_s.setPlaybackRate(e.rate);
		}
		
		_s.setupVideoScreen = function(){
			FWDRAPVideoScreen.setPrototype();
			_s.videoScreen_do = new FWDRAPVideoScreen(_s, _s._d.volume);
			_s.videoScreen_do.addListener(FWDRAPVideoScreen.ERROR, _s.audioScreenErrorHandler);
			_s.videoScreen_do.addListener(FWDRAPVideoScreen.SAFE_TO_SCRUBB, _s.audioScreenSafeToScrubbHandler);
			_s.videoScreen_do.addListener(FWDRAPVideoScreen.STOP, _s.audioScreenStopHandler);
			_s.videoScreen_do.addListener(FWDRAPVideoScreen.PLAY, _s.audioScreenPlayHandler);
			_s.videoScreen_do.addListener(FWDRAPVideoScreen.PAUSE, _s.audioScreenPauseHandler);
			_s.videoScreen_do.addListener(FWDRAPVideoScreen.UPDATE, _s.audioScreenUpdateHandler);
			_s.videoScreen_do.addListener(FWDRAPVideoScreen.UPDATE_TIME, _s.audioScreenUpdateTimeHandler);
			_s.videoScreen_do.addListener(FWDRAPVideoScreen.LOAD_PROGRESS, _s.audioScreenLoadProgressHandler);
			_s.videoScreen_do.addListener(FWDRAPVideoScreen.PLAY_COMPLETE, _s.audioScreenPlayCompleteHandler);
			_s.videosHolder_do.addChild(_s.videoScreen_do);
		};
		

		//############################################//
		/* Setup youtube player */
		//############################################//
		_s.setupYoutubePlayer = function(){
			if(location.protocol.indexOf("file:") != -1 && (FWDRAPUtils.isOpera || FWDRAPUtils.isIE)) return;
			FWDRAPYoutubeScreen.setPrototype();
			_s.ytb_do = new FWDRAPYoutubeScreen(_s, _s._d.volume);
			_s.ytb_do.addListener(FWDRAPYoutubeScreen.READY, _s.youtubeReadyHandler);
			_s.ytb_do.addListener(FWDRAPAudioScreen.START, _s.audioScreenStartHandler);
			_s.ytb_do.addListener(FWDRAPAudioScreen.ERROR, _s.audioScreenErrorHandler);
			_s.ytb_do.addListener(FWDRAPYoutubeScreen.SAFE_TO_SCRUBB, _s.audioScreenSafeToScrubbHandler);
			_s.ytb_do.addListener(FWDRAPYoutubeScreen.STOP, _s.audioScreenStopHandler);
			_s.ytb_do.addListener(FWDRAPYoutubeScreen.PLAY, _s.audioScreenPlayHandler);
			_s.ytb_do.addListener(FWDRAPYoutubeScreen.PAUSE, _s.audioScreenPauseHandler);
			_s.ytb_do.addListener(FWDRAPYoutubeScreen.UPDATE, _s.audioScreenUpdateHandler);
			_s.ytb_do.addListener(FWDRAPYoutubeScreen.UPDATE_TIME, _s.audioScreenUpdateTimeHandler);
			_s.ytb_do.addListener(FWDRAPYoutubeScreen.LOAD_PROGRESS, _s.audioScreenLoadProgressHandler);
			_s.ytb_do.addListener(FWDRAPYoutubeScreen.PLAY_COMPLETE, _s.audioScreenPlayCompleteHandler);
			_s.videosHolder_do.addChild(_s.ytb_do);	
			
		};
		
		_s.youtubeReadyHandler = function(e){};
		
		
		//############################################//
		/* update deeplink */
		//############################################//
		_s.setupDL = function(){
			_s.setOnceDL = true;
			FWDAddress.onChange = _s.dlChangeHandler;
			_s.dlChangeHandler();
		};
		
		_s.dlChangeHandler = function(){
			if(_s.hasOpenedInPopup_bl) return;
			var mustReset_bl = false;
			
			if(_s.categories_do && _s.categories_do.isOnDOM_bl){
				_s.categories_do.hide();
				return;
			}
			
			_s.catId = parseInt(FWDAddress.getParameter("catid"));
			_s.id = parseInt(FWDAddress.getParameter("trackid"));

			if(FWDRAPUtils.getCookie('FWDRAPusePP') == 'true' && _s.setOnceDL && location.hash.indexOf('catid=') == -1){
				_s.catId = FWDRAPUtils.getCookie('FWDRAPcatId');
				_s.id = FWDRAPUtils.getCookie('FWDRAPid');
				_s.setOnceDL = false;
				location.hash = _s.instanceName_str + "?catid=" + _s.catId + "&trackid=" + _s.id;
				return;
			}
			
			if(_s.catId == undefined || _s.id == undefined || isNaN(_s.catId) || isNaN(_s.id)){
				
				_s.catId = _s._d.startAtPlaylist;
				_s.id = _s._d.startAtTrack;
				
				mustReset_bl = true;
			}
			
			if(_s.catId < 0 || _s.catId > _s._d.totalCategories - 1 && !mustReset_bl){
				_s.catId = _s._d.startAtPlaylist;
				_s.id = _s._d.startAtTrack;
				mustReset_bl = true;
			}
			
			if(_s._d.playlist_ar){
				if(_s.id < 0 && !mustReset_bl){
					_s.id = _s._d.startAtTrack;
					mustReset_bl = true;
				}else if(_s.prevCatId == _s.catId && _s.id > _s._d.playlist_ar.length - 1  && !mustReset_bl){
					_s.id = _s._d.playlist_ar.length - 1;
					mustReset_bl = true;
				}
			}
			
			if(mustReset_bl){
				location.hash = _s.instanceName_str + "?catid=" + _s.catId + "&trackid=" + _s.id;
				return;
			}
			
			
			if(_s.prevCatId != _s.catId){
				_s.loadInternalPlaylist();
				_s.prevCatId = _s.catId;
			}else{
				_s.setSource(false);
				if(_s.audioType_str != FWDRAP.HLS) _s.play();
				_s.changeHLS_bl = true;
			}
		};

		
		//#############################################//
		/* setup preloader */
		//#############################################//
		_s.setupPreloader = function(){
			FWDRAPPreloader.setPrototype();
			_s.preloader_do = new FWDRAPPreloader(_s._d, 60, 40);
			_s.preloader_do.show(true);
			_s.main_do.addChild(_s.preloader_do);
		};
		
		_s.positionPreloader = function(){
			_s.preloader_do.setX(parseInt((_s.sW - _s.preloader_do.w)/2));
			if(_s.controller_do){
				_s.preloader_do.setY(parseInt((_s.controller_do.h - _s.preloader_do.h)/2) - 12);
			}else{
				_s.preloader_do.setY(parseInt((_s.maxHeight - _s.preloader_do.h)/2) - 12);
			}
		};
		

		//###########################################//
		/* setup categories */
		//###########################################//
		_s.setupCategories = function(){
			FWDRAPCategories.setPrototype();
			_s.categories_do = new FWDRAPCategories(_s._d);
			_s.categories_do.getStyle().zIndex = "2147483647";
			_s.categories_do.addListener(FWDRAPCategories.HIDE_COMPLETE, _s.categoriesHideCompleteHandler);
			if(_s._d.showPlaylistsByDefault_bl){
				_s.showCatWidthDelayId_to = setTimeout(function(){
					_s.showCategories();
				}, 1400);
			};
		};
		
		_s.categoriesHideCompleteHandler = function(e){
			_s.controller_do.setCategoriesButtonState("unselected");
			if(_s.customContextMenu_do) _s.customContextMenu_do.updateParent(_s.main_do);
			
			if(_s.useDeepLinking_bl){
				if(_s.categories_do.id != _s.catId){
					_s.catId = _s.categories_do.id;
					_s.id = 0;
					FWDAddress.setValue(_s.instanceName_str + "?catid=" + _s.catId + "&trackid=" + _s.id);
				}
			}else{
				if(_s.catId == _s.categories_do.id) return;
				_s.catId = _s.categories_do.id;
				_s.id = 0;
				_s.loadInternalPlaylist(_s.catId);
			}
		};
		

		//###########################################//
		/* setup playslist */
		//###########################################//
		_s.setupPlaylist = function(){
			FWDRAPPlaylist.setPrototype();
			_s.playlist_do = new FWDRAPPlaylist(_s._d, _s);
			_s.playlist_do.addListener(FWDRAPPlaylist.CHANGE_PLAYLIST, _s.playlistChangePlaylistHandler);
			_s.playlist_do.addListener(FWDRAPPlaylistItem.MOUSE_UP, _s.palylistItemOnUpHandler);
			_s.playlist_do.addListener(FWDRAPPlaylistItem.DOWNLOAD, _s.palylistItemDownloadHandler);
			_s.playlist_do.addListener(FWDRAPPlaylistItem.BUY, _s.palylistItemBuyHandler);
			_s.playlist_do.addListener(FWDRAPPlaylist.UPDATE_TRACK_TITLE_if_FOLDER, _s.palylistUpdateFolderTrackTitle);
			_s.main_do.addChild(_s.playlist_do);
		};
		
		_s.playlistChangePlaylistHandler = function(e){
			_s.controller_do.setCategoriesButtonState("unselected");
			if(_s.customContextMenu_do) _s.customContextMenu_do.updateParent(_s.main_do);
			
			if(_s.useDeepLinking_bl){
				if(e.id != _s.catId){
					_s.catId = e.id;
					_s.id = 0;
					FWDAddress.setValue(_s.instanceName_str + "?catid=" + _s.catId + "&trackid=" + _s.id);
				}
			}else{
				if(_s.catId == e.id) return;
				_s.catId = e.id;
				_s.id = 0; 
				_s.loadInternalPlaylist(_s.catId);
			}
		}
		
		_s.palylistItemOnUpHandler = function(e){
			_s.isPlaylistItemClicked_bl = true;

			if(e.id == _s.id){
				if(_s.audioType_str == FWDRAP.AUDIO && _s.audioScreen_do.isPlaying_bl){
					_s.pause();
				}else if(_s.audioType_str == FWDRAP.AUDIO && (!_s.audioScreen_do.isStopped_bl || _s.audioScreen_do.isStopped_bl)){
					_s.play();
				}else if((_s.audioType_str == FWDRAP.VIDEO || _s.audioType_str == FWDRAP.HLS) && _s.videoScreen_do.isPlaying_bl){
					_s.pause();
				}else if((_s.audioType_str == FWDRAP.VIDEO || _s.audioType_str == FWDRAP.HLS) && !_s.videoScreen_do.isStopped_bl){
					_s.play();
				}else if(_s.ytb_do && _s.audioType_str == FWDRAP.YOUTUBE && _s.ytb_do.isPlaying_bl){
					_s.pause();
				}else if(_s.audioType_str == FWDRAP.YOUTUBE){
					_s.play();
				}
			}else{
				if(_s.useDeepLinking_bl && _s.id != e.id){
					FWDAddress.setValue(_s.instanceName_str + "?catid=" + _s.catId + "&trackid=" + e.id);
					_s.id = e.id;
				}else{
					_s.id = e.id;
					_s.setSource(true);
					_s.changeHLS_bl = true;
					if(_s.autioType_str != FWDRAP.HLS) _s.play();
				}
			}
			if(_s._d.playlist_ar && _s._d.playlist_ar[_s.id]){
				_s.videoNameGa = _s._d.playlist_ar[_s.id]["titleText"]
				_s.videoCat = _s._d.cats_ar[_s.catId]["playlistsName"];;
			}
		};
		
		_s.palylistItemDownloadHandler = function(e){
			_s.downloadMP3(e.id);
		};
		
		_s.palylistUpdateFolderTrackTitle = function(e){
			_s.controller_do.setTitle(e.title);
		};
		
		_s.palylistItemBuyHandler = function(e){
			_s.buy(e.id);
		};
		

		//#####################//
		/* Setup share window */
		//####################//
		_s.setupShareWindow = function(){
			FWDRAPShareWindow.setPrototype();
			_s.shareWindow_do = new FWDRAPShareWindow(_s._d, _s);
			_s.shareWindow_do.addListener(FWDRAPShareWindow.HIDE_COMPLETE, _s.shareWindowHideCompleteHandler);
		};
		
		_s.shareWindowHideCompleteHandler = function(){
			if(_s.controller_do && !_s.isMbl){
				_s.controller_do.shareButton_do.isDisabled_bl = false;
				_s.controller_do.shareButton_do.setNormalState(true);
			}
		};
		

		//###########################################//
		/* setup controller */
		//###########################################//
		_s.setupController = function(){
			FWDRAPController.setPrototype();
			_s.controller_do = new FWDRAPController(_s._d, _s);
			_s.controller_do.addListener(FWDRAPController.POPUP, _s.controllerOnPopupHandler);
			_s.controller_do.addListener(FWDRAPController.PLAY, _s.controllerOnPlayHandler);
			_s.controller_do.addListener(FWDRAPController.PLAY_NEXT, _s.controllerPlayNextHandler);
			_s.controller_do.addListener(FWDRAPController.PLAY_PREV, _s.controllerPlayPrevHandler);
			_s.controller_do.addListener(FWDRAPController.PAUSE, _s.controllerOnPauseHandler);
			_s.controller_do.addListener(FWDRAPController.VOLUME_START_TO_SCRUB, _s.volumeStartToScrubbHandler);
			_s.controller_do.addListener(FWDRAPController.VOLUME_STOP_TO_SCRUB, _s.volumeStopToScrubbHandler);
			_s.controller_do.addListener(FWDRAPController.START_TO_SCRUB, _s.controllerStartToScrubbHandler);
			_s.controller_do.addListener(FWDRAPController.SCRUB, _s.controllerScrubbHandler);
			_s.controller_do.addListener(FWDRAPController.SCRUB_PLAYLIST_ITEM, _s.controllerPlaylistItemScrubbHandler);
			_s.controller_do.addListener(FWDRAPController.STOP_TO_SCRUB, _s.controllerStopToScrubbHandler);
			_s.controller_do.addListener(FWDRAPController.CHANGE_VOLUME, _s.controllerChangeVolumeHandler);
			_s.controller_do.addListener(FWDRAPController.SHOW_CATEGORIES, _s.showCategoriesHandler);
			_s.controller_do.addListener(FWDRAPController.SHOW_PLAYLIST, _s.showPlaylistHandler);
			_s.controller_do.addListener(FWDRAPController.HIDE_PLAYLIST, _s.hidePlaylistHandler);
			_s.controller_do.addListener(FWDRAPController.ENABLE_LOOP, _s.enableLoopHandler);
			_s.controller_do.addListener(FWDRAPController.DISABLE_LOOP, _s.disableLoopHandler);
			_s.controller_do.addListener(FWDRAPController.ENABLE_SHUFFLE, _s.enableShuffleHandler);
			_s.controller_do.addListener(FWDRAPController.DISABLE_SHUFFLE, _s.disableShuffleHandler);
			_s.controller_do.addListener(FWDRAPController.SHARE, _s.controllerShareHandler);
			_s.controller_do.addListener(FWDRAPController.DOWNLOAD_MP3, _s.controllerButtonDownloadMp3Handler);
			_s.controller_do.addListener(FWDRAPController.BUY, _s.controllerButtonBuyHandler);
			_s.controller_do.addListener(FWDRAPController.SHOW_ATOB, _s.showAtobWindowHandler);
			_s.controller_do.addListener(FWDRAPController.SHOW_PLAYBACKRATE, _s.showPlaybacrateWindowHandler);
			_s.main_do.addChild(_s.controller_do);
			if(_s.openInPopup_bl && _s._d.showPlaylistsButtonAndPlaylists_bl){
				_s.controller_do.setPlaylistButtonState("selected");
				if(_s.controller_do.playlistButton_do) _s.controller_do.playlistButton_do.disableForGood();
			}
		};
		
		_s.showPlaybacrateWindowHandler = function(e){
			_s.playbackRateWindow_do.show();
			if(_s.controller_do && !_s.isMbl){
				_s.controller_do.playbackRateButton_do.setSelectedState();
				_s.controller_do.playbackRateButton_do.isDisabled_bl = true;
			}
		};
		
		_s.controllerShareHandler = function(e){
			_s.shareWindow_do.show();
			if(_s.controller_do && !_s.isMbl){
				_s.controller_do.shareButton_do.setSelectedState();
				_s.controller_do.shareButton_do.isDisabled_bl = true;
			}
		};
		
		_s.controllerOnPopupHandler = function(){
			_s.popup();
		};
		
		_s.controllerOnPlayHandler = function(e){
			_s.play();
		};
		
		_s.controllerPlayNextHandler = function(e){
			if(_s._d.shuffle_bl){
				_s.playShuffle();
			}else{
				_s.playNext();
			}
		};
		
		_s.controllerPlayPrevHandler = function(e){
			if(_s._d.shuffle_bl){
				_s.playShuffle();
			}else{
				_s.playPrev();
			}
		};
		
		_s.controllerOnPauseHandler = function(e){
			_s.isPlaylistItemClicked_bl = true;
			_s.pause();
		};
		
		_s.volumeStartToScrubbHandler = function(e){
			if(_s.playlist_do) _s.playlist_do.showDisable();
		};
		
		_s.volumeStopToScrubbHandler = function(e){
			if(_s.playlist_do) _s.playlist_do.hideDisable();
		};
		
		
		_s.controllerStartToScrubbHandler = function(e){
			if(_s.playlist_do) _s.playlist_do.showDisable();
			if(_s.audioType_str == FWDRAP.YOUTUBE && _s.ytb_do){
				_s.ytb_do.startToScrub();
			}else if(_s.audioType_str == FWDRAP.VIDEO && _s.videoScreen_do){
				_s.videoScreen_do.startToScrub();
			}else{
				_s.audioScreen_do.startToScrub();
			}
		};
		
		_s.controllerScrubbHandler = function(e){
			if(_s.audioType_str == FWDRAP.YOUTUBE && _s.ytb_do){
				_s.ytb_do.scrub(e.percent);
			}else if(_s.audioType_str == FWDRAP.VIDEO && _s.videoScreen_do){
				_s.videoScreen_do.scrub(e.percent);
			}else{
				_s.audioScreen_do.scrub(e.percent);
			}
		};
		
		_s.controllerPlaylistItemScrubbHandler = function(e){
			if(_s.playlist_do) _s.playlist_do.updateCurItemProgress(e.percent);
		};
		
		_s.controllerStopToScrubbHandler = function(e){
			if(_s.playlist_do) _s.playlist_do.hideDisable();
			if(_s.audioType_str == FWDRAP.YOUTUBE && _s.ytb_do){
				_s.ytb_do.stopToScrub();
			}else if(_s.audioType_str == FWDRAP.VIDEO && _s.videoScreen_do){
				_s.videoScreen_do.stopToScrub();
			}else{
				_s.audioScreen_do.stopToScrub();
			}
		};
		
		_s.controllerChangeVolumeHandler = function(e){
			_s.setVolume(e.percent);
		};
		
		_s.showCategoriesHandler = function(e){
			_s.showCategories();
			_s.controller_do.setCategoriesButtonState("selected");
		};
		
		_s.showPlaylistHandler = function(e){
			if(_s._d.animateOnIntro_bl){
				_s.playlist_do.show(true);
			}else{
				_s.playlist_do.show(false);
			}
			
			_s.controller_do.setPlaylistButtonState("selected");
		};
		
		_s.hidePlaylistHandler = function(e){
			if(_s._d.animateOnIntro_bl){
				_s.playlist_do.hide(true);
			}else{
				_s.playlist_do.hide(false);
			}
			
			_s.controller_do.setPlaylistButtonState("unselected");
		};
		
		_s.enableLoopHandler = function(e){
			_s._d.loop_bl = true;
			_s._d.shuffle_bl = false;
			_s.controller_do.setLoopStateButton("selected");
			_s.controller_do.setShuffleButtonState("unselected");
		};
		
		_s.disableLoopHandler = function(e){
			_s._d.loop_bl = false;
			_s.controller_do.setLoopStateButton("unselected");
		};
		
		_s.enableShuffleHandler = function(e){
			_s._d.shuffle_bl = true;
			_s._d.loop_bl = false;
			_s.controller_do.setShuffleButtonState("selected");
			_s.controller_do.setLoopStateButton("unselected");
		};
		
		_s.disableShuffleHandler = function(e){
			_s._d.shuffle_bl = false;
			_s.controller_do.setShuffleButtonState("unselected");
		};
		
		_s.controllerButtonDownloadMp3Handler = function(e){
			_s.downloadMP3();
		};

		_s.showAtobWindowHandler =  function(e){
			_s.atb_do.show(true);
			if(_s.controller_do && !_s.isMbl){
				_s.controller_do.atbButton_do.setSelectedState();
				_s.controller_do.atbButton_do.isDisabled_bl = true;
			}
		}
		
		_s.controllerButtonBuyHandler = function(){
			_s.buy();
		};
		

		//###########################################//
		/* setup FWDRAPAudioScreen */
		//###########################################//
		_s.setupAudioScreen = function(){	
			FWDRAPAudioScreen.setPrototype();
			_s.audioScreen_do = new FWDRAPAudioScreen(_s._d.volume, _s._d.autoPlay_bl, _s._d.loop_bl);
			_s.audioScreen_do.addListener(FWDRAPAudioScreen.START, _s.audioScreenStartHandler);
			_s.audioScreen_do.addListener(FWDRAPAudioScreen.ERROR, _s.audioScreenErrorHandler);
			_s.audioScreen_do.addListener(FWDRAPAudioScreen.SAFE_TO_SCRUBB, _s.audioScreenSafeToScrubbHandler);
			_s.audioScreen_do.addListener(FWDRAPAudioScreen.STOP, _s.audioScreenStopHandler);
			_s.audioScreen_do.addListener(FWDRAPAudioScreen.PLAY, _s.audioScreenPlayHandler);
			_s.audioScreen_do.addListener(FWDRAPAudioScreen.PAUSE, _s.audioScreenPauseHandler);
			_s.audioScreen_do.addListener(FWDRAPAudioScreen.UPDATE, _s.audioScreenUpdateHandler);
			_s.audioScreen_do.addListener(FWDRAPAudioScreen.UPDATE_TIME, _s.audioScreenUpdateTimeHandler);
			_s.audioScreen_do.addListener(FWDRAPAudioScreen.LOAD_PROGRESS, _s.audioScreenLoadProgressHandler);
			_s.audioScreen_do.addListener(FWDRAPAudioScreen.PLAY_COMPLETE, _s.audioScreenPlayCompleteHandler);
			if(_s.useOnlyAPI_bl){
				document.documentElement.appendChild(_s.audioScreen_do.screen);
			}else{
				_s.main_do.addChild(_s.audioScreen_do);	
			}
		};
		
		_s.audioScreenStartHandler = function(){
			_s.sendGAPlayedEvent();
			_s.dispatchEvent(FWDRAP.START);
		};
		
		_s.audioScreenErrorHandler = function(e){
			var error;
			_s.isPlaying_bl = false;
			_s.showCursor();
			if(_s.largePlayButton_do) _s.largePlayButton_do.hide();
			
			error = e.text;
			if(_s.main_do) _s.main_do.addChild(_s.info_do);
			if(_s.info_do) _s.info_do.showText(error);
		
			if(_s.hider){
				_s.hider.reset();
				_s.hider.stop();
			}
			_s.dispatchEvent(FWDRAP.ERROR, {error:error});
		};
		
		_s.audioScreenSafeToScrubbHandler = function(){
			if(_s.controller_do) _s.controller_do.enableMainScrubber(); 
			if(_s.hider && _s.isFullScreen_bl) _s.hider.start();
			if(FWDRAPUtils.getCookie('FWDRAPusePP') && !_s.playedOnceCP_bl){
				_s.setVolume(Number(FWDRAPUtils.getCookie('FWDRAPVolume')));
				setTimeout(function(){
					_s.scrub(Number(FWDRAPUtils.getCookie('FWDRAPpp')));
				}, 200);
			}
		};
		
		_s.audioScreenStopHandler = function(e){
			_s.isPlaying_bl = false;
			_s.showCursor();
			if(_s.largePlayButton_do) _s.largePlayButton_do.hide();
			if(_s.hider){
				_s.hider.reset();
				_s.hider.stop();
			}
			if(_s.main_do) if(_s.main_do.contains(_s.info_do)) _s.main_do.removeChild(_s.info_do);
			if(_s.controller_do){
				_s.controller_do.showPlayButton();
				_s.controller_do.pauseVis();
				_s.controller_do.disableMainScrubber();
			}
			_s.dispatchEvent(FWDRAP.STOP);
		};
		
		_s.sendGAPlayedEvent = function(){

			if(_s.gtag && _s.videoNameGa){
				var params = {
					'track_url': _s.audioPath,
					'playlist_name' : _s.videoCat,
					'track_name': _s.videoNameGa
					
				}
				
				_s.gtag('event', 'played', params);
			}
			
			_s.prevVideoNameGa = _s.videoNameGa;
		}
		
		_s.audioScreenPlayHandler = function(){
			if(_s.main_do) if(_s.main_do.contains(_s.info_do)) _s.main_do.removeChild(_s.info_do);
			
			if(_s._d.playlist_ar && _s._d.playlist_ar[_s.id]){
				_s.videoNameGa = _s._d.playlist_ar[_s.id]["titleText"];
				_s.videoCat = _s._d.cats_ar[_s.catId]["playlistsName"];
			}

			if(_s._d.openPopupOnPlay_bl && !_s.openInPopup_bl){
				_s.popup();
				return;
			}
		
			
			_s.isPlaying_bl = true;
			FWDRAP.keyboardCurInstance = _s;
			_s.showCursor();
			if(_s.controller_do){
				_s.controller_do.showPauseButton();
				_s.controller_do.startVis();
			}
			if(_s.hider && _s.isFullScreen_bl) _s.hider.start();
			if(_s.largePlayButton_do) _s.largePlayButton_do.hide();
			if(_s.playlist_do) _s.playlist_do.setCurItemPauseState();
			if(_s.openInPopup_bl){
				setTimeout(function(){
					if(!_s.scrubbedFirstTimeInPopup_bl) _s.scrub(_s.lastPercentPlayed);
					_s.scrubbedFirstTimeInPopup_bl = true;
				},600);
			}
			if(!_s.hasStartedToPlay_bl) if(_s._d.playlist_ar[_s.id].startAtTime) _s.scrubbAtTime(_s._d.playlist_ar[_s.id].startAtTime);

			if(_s.audioType_str == FWDRAP.AUDIO){
				_s.controller_do.initVisualizer(_s.audioScreen_do.audio_el);
			}
			
			_s.hasStartedToPlay_bl = true;
			_s.dispatchEvent(FWDRAP.PLAY);
		};
		
		_s.audioScreenPauseHandler = function(){
			_s.isPlaying_bl = false;
			if(_s.hider){
				_s.hider.reset();
				_s.hider.stop();
			}
			if(!FWDRAPUtils.isIphone && _s.largePlayButton_do && _s.isFullScreen_bl){
				if(_s.audioType_str == FWDRAP.VIDEO){
					_s.largePlayButton_do.show();
				}else if(_s.audioType_str == FWDRAP.YOUTUBE && !_s.isMbl){
					_s.largePlayButton_do.show();
				}
			}
			_s.showCursor();
			if(_s.controller_do){
				_s.controller_do.showPlayButton();
				_s.controller_do.pauseVis();
			}
			
			if(_s.playlist_do){
				_s.playlist_do.setCurItemPlayState();
			}
			_s.dispatchEvent(FWDRAP.PAUSE);
		};
		
		_s.audioScreenUpdateHandler = function(e){
			var percent;	
			
			percent = e.percent;
			if(_s.controller_do) _s.controller_do.updateMainScrubber(percent);
			if(_s.playlist_do) _s.playlist_do.updateCurItemProgress(percent);
			
			_s.dispatchEvent(FWDRAP.UPDATE, {percent:percent});
		};
		
		_s.audioScreenUpdateTimeHandler = function(e, e2){
			if(_s.prevSeconds != e.seconds) _s.totalTimePlayed += 1;
			_s.totalTimeInSeconds = e.totalTimeInSeconds;

			_s.curTimeInSecond = e.seconds;
			_s.totalTime = e.totalTime;
			_s.curTime = e.curTime;
			_s.prevSeconds = e.seconds
			_s.totalPercentPlayed = _s.totalTimePlayed / e.totalTimeInSeconds;
			if(!isFinite(_s.totalPercentPlayed)) _s.totalPercentPlayed = 0;

			if(_s.controller_do 
			   && !_s.controller_do.isMainScrubberScrubbing_bl
			   && _s.atb_do
			   && _s.atb_do.isShowed_bl
			   && !_s.atb_do.scrub){
				
				var a = _s.totalTimeInSeconds * _s.atb_do.pa;
				var b = _s.totalTimeInSeconds * _s.atb_do.pb;

				if(_s.prevCurTimeInSeconds != _s.curTimeInSecond){
					_s.prevCurTimeInSeconds = _s.curTimeInSecond;
					if(_s.curTimeInSecond < a){
						_s.scrub(_s.atb_do.pa);
					}else if(_s.curTimeInSecond > b){
						_s.scrub(_s.atb_do.pa);
					}
				}
			}

			var curTime;
			var totalTime;
			
			curTime = e.curTime;
			totalTime = e.totalTime;
			
			if(_s.controller_do) _s.controller_do.updateTime(curTime, totalTime);
			
			if(_s._d.playlist_ar[_s.id] && _s._d.playlist_ar[_s.id].stopAtTime && FWDRAPUtils.getSecondsFromString(_s._d.playlist_ar[_s.id].stopAtTime) <= e.seconds) _s.stop();
			
			if(totalTime.length>5){
				_s.totalDuration = FWDRAPUtils.getSecondsFromString(totalTime);
			}else{
				_s.totalDuration = FWDRAPUtils.getSecondsFromString("00:" + totalTime);
			}
		
			_s.dispatchEvent(FWDRAP.UPDATE_TIME, {curTime:curTime, totalTime:totalTime});
		};
		
		_s.audioScreenLoadProgressHandler = function(e){
			if(_s.controller_do) _s.controller_do.updatePreloaderBar(e.percent);
		};
		
		_s.audioScreenPlayCompleteHandler = function(){
			
			if(_s._d.playlist_ar && _s._d.playlist_ar[_s.id]){
				_s.videoNameGa = _s._d.playlist_ar[_s.id]["titleText"]
				_s.videoCat = _s._d.cats_ar[_s.catId]["playlistsName"];;
			}
			
			_s.dispatchEvent(FWDRAP.PLAY_COMPLETE);
			if(_s.audioType_str == FWDRAP.YOUTUBE && _s.ytb_do){
				if(_s._d.loop_bl){
					_s.ytb_do.replay();
				}else if(_s._d.shuffle_bl){
					_s.playShuffle();
				}else{
					if(_s._d.playlistLoop_bl){	
						_s.playNext();
					}else{
						if(_s.id == _s.playlist_do.items_ar.length - 1){
							var tempId = _s.catId + 1;
							if(tempId > _s._d.totalCategories - 1) tempId = 0;
							_s._d.autoPlay_bl = true;
							_s.loadPlaylist(tempId);
						}else{
							_s.playNext();
						}
					}
				}
			}else if(_s.audioType_str == FWDRAP.VIDEO && _s.videoScreen_do){
				if(_s._d.loop_bl){
					_s.videoScreen_do.replay();
				}else if(_s._d.shuffle_bl){
					_s.playShuffle();
				}else{
					if(_s._d.playlistLoop_bl){	
						_s.playNext();
					}else{
						if(_s.id == _s.playlist_do.items_ar.length - 1){
							var tempId = _s.catId + 1;
							if(tempId > _s._d.totalCategories - 1) tempId = 0;
							_s._d.autoPlay_bl = true;
							_s.loadPlaylist(tempId);
						}else{
							_s.playNext();
						}
					}
				}
			}else{
				
				if(_s._d.loop_bl){
					_s.audioScreen_do.replay();
				}else if(_s._d.shuffle_bl){
					_s.playShuffle();
				}else{
					if(_s._d.playlistLoop_bl){	
						_s.playNext();
					}else{
						if(_s.id == _s.playlist_do.items_ar.length - 1){
							var tempId = _s.catId + 1;
							if(tempId > _s._d.totalCategories - 1) tempId = 0;
							_s._d.autoPlay_bl = true;
							_s.loadPlaylist(tempId);
						}else{
							_s.playNext();
						}
					}
				}
			}
		};
		
		_s.loadID3IfPlaylistDisabled = function(){
			var source = _s._d.playlist_ar[_s.id].source;
			var title = _s._d.playlist_ar[_s.id].title;
			if(title != "...") return;
			source = source + "?rand=" + parseInt(Math.random() * 99999999);
				
			ID3.loadTags(source, function() {
				var obj = _s._d.playlist_ar[_s.id];
				var tags = ID3.getAllTags(source);
				
				obj.title = tags.artist + " - " +  tags.title;
				obj.titleText = obj.title;
				_s.controller_do.setTitle(obj.title);
			});
		};
		
		
		//#######################################//
		/* Set source based on id */
		//#######################################//
		_s.setSource = function(itemClicked){
			if(_s.totalAudio == 0) return
			
			_s.stop(true);

			if(_s._d.playlist_ar[_s.id] && !_s._d.playlist_ar[_s.id]['playIfLoggedIn']){
				_s.lgdWindow_do.hide();
			}
			
			if(_s.useYoutube_bl && _s.ytb_do && !_s.ytb_do.isReady_bl){
				setTimeout(_s.setSource, 200);
				return
			}
			
			if(itemClicked) _s.itemClicked = itemClicked;

			if(_s.passWindow_do) _s.passWindow_do.hide();

			if(_s.id < 0){
				_s.id = 0;
			}else if(_s.id > _s.totalAudio - 1){
				_s.id = _s.totalAudio - 1;
			}
			
			if(_s.id == -1) return;
			_s.audioPath = _s._d.playlist_ar[_s.id].source;

			_s.isShoutcast_bl = _s._d.playlist_ar[_s.id].isShoutcast_bl;
			_s.isIcecast_bl = _s._d.playlist_ar[_s.id].isIcecast_bl;
			
			if(_s._d.playlist_ar[_s.id].controlerThumbnailPath) _s.controller_do.loadThumb(_s._d.playlist_ar[_s.id].controlerThumbnailPath);
			if(_s._d.playlist_ar[_s.id].title) _s.controller_do.setTitle(_s._d.playlist_ar[_s.id].title);
		
			if(_s.isShoutcast_bl && _s.prevAudioPath != _s.audioPath){
				_s.radioSource_str = undefined;
				_s.prevAudioPath = _s.audioPath;
				if(_s.playlist_do) _s.playlist_do.activateItems(_s.id, _s.itemClicked);
				_s.resizeHandler();
				_s._d.startLoadingShoutcast(_s.audioPath);
				return;
			}
			
			if(_s.isIcecast_bl && _s.prevAudioPath != _s.audioPath){
				_s.radioSource_str = undefined;
				_s.prevAudioPath = _s.audioPath;
				if(_s.playlist_do) _s.playlist_do.activateItems(_s.id, _s.itemClicked);
				_s.resizeHandler();
				_s._d.startLoadingIcecast(_s.audioPath);
				return;
			}
			
			if((_s.isShoutcast_bl || _s.isIcecast_bl) && _s.radioSource_str){
				_s.audioPath = _s.radioSource_str;
			}

			_s.prevAudioPath = _s.audioPath;
		
			_s.isShoutcast_bl = _s._d.playlist_ar[_s.id].isShoutcast_bl;
			_s.isIcecast_bl = _s._d.playlist_ar[_s.id].isIcecast_bl;
		
			_s.videoPosterPath = _s._d.playlist_ar[_s.id].videoPosterPath;
			
			if(_s.audioPath.indexOf("soundcloud.") != -1 && _s.audioPath.indexOf("https://api.soundcloud.") == -1){
				_s._d.startToGetSoundcloudUrl(_s.audioPath);
				_s.isLoadingSoundcloudTrack_bl = true;
				_s.audioType_str = FWDRAP.AUDIO;
			}else{
				_s.audioType_str = FWDRAP.AUDIO;
				_s.isLoadingSoundcloudTrack_bl = false;
			}
			
			_s.finalAudioPath_str = _s.audioPath;
			if(_s.audioPath.indexOf(".") == -1 && _s.audioPath.length == 11){
				_s.audioType_str = FWDRAP.YOUTUBE;
			}else if(_s.audioPath.toLowerCase().indexOf(".mp4") != -1){
				_s.audioType_str = FWDRAP.VIDEO;
				
			}else{
				if( _s.audioPath.toLowerCase().indexOf(".m3u8") != -1){	
					_s.audioType_str = FWDRAP.HLS;
				}else{
					_s.audioType_str = FWDRAP.AUDIO;
				}
			}
			
			if(_s.isMbl){	
				if(_s.largePlayButton_do) _s.largePlayButton_do.hide();
			}else{
				if(_s.largePlayButton_do && _s.isFullScreen_bl) _s.largePlayButton_do.show();
			}


			//LOAD atb plugin
			if(_s._d.playlist_ar[_s.id]['atb'] && !_s.isATBJsLoaded_bl){
				var script = document.createElement('script');
				script.src = _s._d.mainFolderPath_str + 'java/FWDRAPATB.js';
				document.head.appendChild(script);
				script.onerror = function(){
					_s.main_do.addChild(_s.info_do);
					_s.info_do.showText('A to B plugin js file named <font color="#FF0000">FWDRAPATB.js</font> is not found. Please make sure that the content folder contains the java folder that contains the <font color="#FF0000">FWDRAPATB.js</font> file.');
					if(_s.preloader_do) _s.preloader_do.hide();
					return;
				}
				
				script.onload = function () {
					_s.isATBJsLoaded_bl = true;
					_s.setupAtbWindow();
					_s.setSource(_s.audioPath);
					if(_s.isPlaylistItemClicked_bl) _s.play()
				}
				return;
			}
			
			//LOAD HLS
			if(_s.audioPath.indexOf(".m3u8") != -1 && !_s.isHLSJsLoaded_bl && !FWDRAP.isHLSJsLoaded_bl){
				if(location.protocol.indexOf("file:") != -1){
					_s.main_do.addChild(_s.info_do);
					_s.info_do.showText("This browser dosen't allow playing HLS / live streaming videos local, please test online.");
					_s.resizeHandler();
					return;
				}
				
				var script = document.createElement('script');
				script.src = _s._d.hlsPath_str;
				document.head.appendChild(script);
				script.onerror = function(){
					_s.main_do.addChild(_s.info_do);
					_s.info_do.showText("Error loading HLS library <font color='#FF0000'>" + _s._d.hlsPath_str + "</font>.");
					if(_s.preloader_do) _s.preloader_do.hide();
					return;
				}
				
				script.onload = function () {
					_s.isHLSJsLoaded_bl = true;
					FWDRAP.isHLSJsLoaded_bl = true;
					_s.setupHLS();
					_s.setSource(_s.audioPath);
				}
				return;
			}
					
			if(_s.audioType_str == FWDRAP.YOUTUBE){
				if(!_s.ytb_do) return;
				if(_s.ytb_do.ytb && !_s.ytb_do.ytb.cueVideoById) return;	
				if(_s.videoScreen_do) _s.videoScreen_do.setX(-5000);
				_s.ytb_do.setX(0);
				if(!_s.isLoadingSoundcloudTrack_bl){
					_s.ytb_do.setSource(_s.audioPath);
					if(_s._d.autoPlay_bl || _s.isPlaylistItemClicked_bl) _s.play();
					if(FWDRAPUtils.getCookie('FWDRAPppPlay') && !_s.isMobile_bl && !_s.ppPplayedOnce){
						_s.play();
						setTimeout(_s.play, 1000);
					}
				}
				if(_s.isMbl){
					if(_s.largePlayButton_do) _s.largePlayButton_do.hide();
				}else{
					if(_s.largePlayButton_do && _s.isFullScreen_bl) _s.largePlayButton_do.show();
				}
			
			}else if(_s.audioType_str == FWDRAP.VIDEO || _s.audioType_str == FWDRAP.HLS){
			
				if(_s.ytb_do) _s.ytb_do.setX(-5000);
				if(!_s.isLoadingSoundcloudTrack_bl){
					_s.videoScreen_do.setSource(_s.audioPath);
					_s.videoScreen_do.initVideo();
					
					if(_s.audioType_str == FWDRAP.HLS){
						_s.videoScreen_do.setX(-5000);
						_s.setupHLS();
						_s.hlsJS.loadSource(_s.audioPath);
						_s.hlsJS.attachMedia(_s.videoScreen_do.video_el);
						_s.isHLSManifestReady_bl = true;
						if(_s._d.autoPlay_bl || _s.isPlaylistItemClicked_bl){
							_s.play();
						}
					}else{
						_s.videoScreen_do.setX(0);
						if(_s._d.autoPlay_bl || _s.isPlaylistItemClicked_bl) _s.play();
						if(Boolean(FWDRAPUtils.getCookie('FWDRAPppPlay') == 'true') && !_s.isMobile_bl && !_s.ppPplayedOnce){
							_s.play();
						}
					}
				}
				if(_s.largePlayButton_do && _s.isFullScreen_bl) _s.largePlayButton_do.show();
			}else{
				_s.goNormalScreen();
				if(_s.ytb_do) _s.ytb_do.setX(-5000);
				if(_s.videoScreen_do) _s.videoScreen_do.setX(-5000);
				
				_s.audioScreen_do.setSource(_s.audioPath);
				if(_s._d.autoPlay_bl) _s.play();
				if(Boolean(FWDRAPUtils.getCookie('FWDRAPppPlay') == 'true') && !_s.isMobile_bl && !_s.ppPplayedOnce){
					_s.play();
				}
			}
			
			_s.controller_do.pauseVis();
			_s.controller_do.setTitle(_s._d.playlist_ar[_s.id].title);
			if(_s._d.playlist_ar[_s.id].duration == undefined){
				_s.controller_do.updateTime("00:00", "00:00");
			}else{
				_s.controller_do.updateTime("00:00", FWDRAPUtils.formatTotalTime(_s._d.playlist_ar[_s.id].duration));
			}
			_s.controller_do.loadThumb(_s._d.playlist_ar[_s.id].thumbPath);
		
			if(_s.playlist_do){
				_s.playlist_do.activateItems(_s.id, _s.itemClicked);
			}else{
				_s.loadID3IfPlaylistDisabled();
			}
			_s.setPlaybackRate(_s._d.defaultPlaybackRate);
		};
		
		_s.destroyHLS = function(){
			if(_s.hlsJS){
				_s.hlsJS.destroy();
				_s.hlsJS = null;
			}
		}
				
		_s.setupHLS = function(){
			if(_s.hlsJS) return;
			_s.isHLSJsLoaded_bl = true;
			_s.hlsJS = new Hls();

			FWDRAPRegisterHLSError(_s);
		}
		
		var recoverDecodingErrorDate,recoverSwapAudioCodecDate;
		function handleMediaError() {
			  if(autoRecoverError) {
				var now = performance.now();
				if(!recoverDecodingErrorDate || (now - recoverDecodingErrorDate) > 3000) {
				  recoverDecodingErrorDate = performance.now();
				  _s.HLSError_str = "try to recover media Error ..."
				  _s.hlsJS.recoverMediaError();
				} else {
				  if(!recoverSwapAudioCodecDate || (now - recoverSwapAudioCodecDate) > 3000) {
					recoverSwapAudioCodecDate = performance.now();
					_s.HLSError_str = "try to swap Audio Codec and recover media Error ...";
					_s.hlsJS.swapAudioCodec();
					_s.hlsJS.recoverMediaError();
				  } else {
					_s.HLSError_str = "cannot recover, last media error recovery failed ...";
				  }
				}
			  }
			  
			  if(_s.HLSError_str){
				if(console) console.log(_s.HLSError_str);
				_s.main_do.addChild(_s.info_do);
				_s.info_do.showText(_s.HLSError_str);
				_s.resizeHandler();
			}
		}
		
		
		//####################################//
		// API
		//###################################//
		_s.loadPlaylist = function(id){
			if(!_s.isAPIReady_bl) return;
			if(_s._d.prevId == id) return;
			
			_s.catId = id;
			_s.id = 0;
			
			if(_s.catId < 0){
				_s.catId = 0;
			}else if(_s.catId > _s._d.totalCategories - 1){
				_s.catId = _s._d.totalCategories - 1;
			};
			if(_s.useDeepLinking_bl){
				FWDAddress.setValue(_s.instanceName_str + "?catid=" + _s.catId + "&trackid=" + _s.id);
			}else{
				_s.loadInternalPlaylist();
			}
		};
		
		_s.playNext = function(){	
			if(!_s.isAPIReady_bl || !_s.isPlaylistLoaded_bl) return;

			_s.isPlaylistItemClicked_bl = true;
			
			if(_s._d.showPlayListButtonAndPlaylist_bl){		
				if(_s.playlist_do.items_ar[_s.playlist_do.curItem_do.sortId + 1]){
					_s.id = _s.playlist_do.items_ar[_s.playlist_do.curItem_do.sortId + 1].id;
				}else{
					_s.id = _s.playlist_do.items_ar[0].id;
				}
			}else{
				_s.id ++;
				if(_s.id < 0){
					_s.id = _s.totalAudio - 1;
				}else if(_s.id > _s.totalAudio - 1){
					_s.id = 0;
				}
			}
			
			if(_s.useDeepLinking_bl){
				FWDAddress.setValue(_s.instanceName_str + "?catid=" + _s.catId + "&trackid=" + _s.id);
			}else{
				_s.setSource();
				_s.changeHLS_bl = true;
				if(_s.audioType_str != FWDRAP.HLS) _s.play();
			}
			_s.prevId = _s.id;
			
			if(_s._d.playlist_ar && _s._d.playlist_ar[_s.id]){
				_s.videoNameGa = _s._d.playlist_ar[_s.id]["titleText"]
				_s.videoCat = _s._d.cats_ar[_s.catId]["playlistsName"];;
			}
		};
		
		_s.playPrev = function(){
			if(!_s.isAPIReady_bl || !_s.isPlaylistLoaded_bl) return;
			_s.isPlaylistItemClicked_bl = true;

			if(_s._d.showPlayListButtonAndPlaylist_bl){		
				if(_s.playlist_do.items_ar[_s.playlist_do.curItem_do.sortId - 1]){
					_s.id = _s.playlist_do.items_ar[_s.playlist_do.curItem_do.sortId - 1].id;
				}else{
					_s.id = _s.playlist_do.items_ar[_s.totalAudio - 1].id;
				}
			}else{
				_s.id --;	
				if(_s.id < 0){
					_s.id = _s.totalAudio - 1;
				}else if(_s.id > _s.totalAudio - 1){
					_s.id = 0;
				}
			}
			
			if(_s.useDeepLinking_bl){
				FWDAddress.setValue(_s.instanceName_str + "?catid=" + _s.catId + "&trackid=" + _s.id);
			}else{
				_s.setSource();
				_s.changeHLS_bl = true;
				if(_s.audioType_str != FWDRAP.HLS) _s.play();
			}
			_s.prevId = _s.id;
			
			if(_s._d.playlist_ar && _s._d.playlist_ar[_s.id]){
				_s.videoNameGa = _s._d.playlist_ar[_s.id]["titleText"]
				_s.videoCat = _s._d.cats_ar[_s.catId]["playlistsName"];;
			}
		};
		
		_s.playShuffle = function(){
			if(!_s.isAPIReady_bl || !_s.isPlaylistLoaded_bl) return;
			_s.isPlaylistItemClicked_bl = true;

			var tempId = parseInt(Math.random() * _s._d.playlist_ar.length);
			while(tempId == _s.id) tempId = parseInt(Math.random() * _s._d.playlist_ar.length);
			_s.id = tempId;	
			if(_s.id < 0){
				_s.id = _s.totalAudio - 1;
			}else if(_s.id > _s.totalAudio - 1){
				_s.id = 0;
			}

			if(_s.useDeepLinking_bl){
				FWDAddress.setValue(_s.instanceName_str + "?catid=" + _s.catId + "&trackid=" + _s.id);
			}else{
				_s.setSource();
				_s.changeHLS_bl = true;
				if(_s.audioType_str != FWDRAP.HLS) _s.play();
			}
			_s.prevId = _s.id;
			
			if(_s._d.playlist_ar && _s._d.playlist_ar[_s.id]){
				_s.videoNameGa = _s._d.playlist_ar[_s.id]["titleText"]
				_s.videoCat = _s._d.cats_ar[_s.catId]["playlistsName"];;
			}
		};
		
		_s.playSpecificTrack = function(catId, trackId){	
			if(!_s.isAPIReady_bl || !_s.isPlaylistLoaded_bl) return;
			
			_s.catId = catId;
			_s.id = trackId;
			
			if(_s.catId < 0){
				_s.catId = 0;
			}else if(_s.catId > _s._d.totalCategories - 1){
				_s.catId = _s._d.totalCategories - 1;
			};
			if(_s.id < 0) _s.id = 0;
			
			if(_s.useDeepLinking_bl){
				FWDAddress.setValue(_s.instanceName_str + "?catid=" + _s.catId + "&trackid=" + _s.id);
			}else{
				_s.setSource();
				_s.changeHLS_bl = true;
				if(_s.audioType_str != FWDRAP.HLS) _s.play();
			}
			_s.prevId = _s.id;
			
			if(_s._d.playlist_ar && _s._d.playlist_ar[_s.id]){
				_s.videoNameGa = _s._d.playlist_ar[_s.id]["titleText"]
				_s.videoCat = _s._d.cats_ar[_s.catId]["playlistsName"];;
			}
		};
		
		_s.play = function(){
		
			if(!_s.isAPIReady_bl || !_s.isPlaylistLoaded_bl || _s.isLoadingSoundcloudTrack_bl) return;
			
			//_s.isPlaylistItemClicked_bl = true;
			
			if(_s.isShoutcast_bl && !_s._d.shoutcastReady) return;
			
			if(_s.audioType_str == FWDRAP.HLS){
				if(location.protocol.indexOf("file:") >= 0){
					_s.main_do.addChild(_s.info_do);
					_s.info_do.showText("HLS m3u8 videos can't be played local on _s browser, please test it online!.");
					_s.info_do.positionAndResize();
					return;
				}
			}

			if((_s._d.playIfLoggedIn || _s._d.playlist_ar[_s.id]['playIfLoggedIn']) && _s.lgdWindow_do){
				_s.lgdWindow_do.show();
				return;
			}
			
			if(_s._d.playlist_ar[_s.id]["isPrivate"] && !_s.hasPassedPassowrd_bl && _s.passWindow_do){
				_s.passWindow_do.show();
				return;
			}
			_s.hasPassedPassowrd_bl = true;
		
			if(_s.largePlayButton_do) _s.largePlayButton_do.hide();
			FWDRAP.pauseAllAudio(_s);
			if(_s.audioType_str == FWDRAP.YOUTUBE && _s.ytb_do){
				_s.ytb_do.play();
			}else if((_s.audioType_str == FWDRAP.VIDEO || _s.audioType_str == FWDRAP.HLS)  && _s.videoScreen_do){
				if(_s.audioType_str == FWDRAP.HLS_JS && !_s.isHLSManifestReady_bl){
					_s.videoScreen_do.initVideo();
					_s.setupHLS();
					_s.hlsJS.loadSource(_s.audioPath);
					_s.hlsJS.attachMedia(_s.videoScreen_do.video_el);
					_s.hlsJS.on(Hls.Events.MANIFEST_PARSED,function(e){
						_s.isHLSManifestReady_bl = true;
						if(_s.audioType_str == FWDRAP.HLS_JS) _s.play();
					});
				}else{
					if(_s.videoScreen_do) _s.videoScreen_do.play();
				}
			}else{
				_s.audioScreen_do.play();
				
			}
		};
		
		_s.resume = function(){
			if(!_s.isAPIReady_bl) return;
			if(_s.audioType_str == FWDRAP.HLS){
				_s.flashObject.playerResume();
			}
		};
		
		_s.pause = function(){
			if(!_s.isAPIReady_bl || !_s.isPlaylistLoaded_bl) return;
			_s.isPlaylistItemClicked_bl = true;
			if(_s.largePlayButton_do && _s.isFullScreen_bl) _s.largePlayButton_do.show();
			if(_s.audioType_str == FWDRAP.YOUTUBE){
				_s.ytb_do.pause();
			}else if((_s.audioType_str == FWDRAP.VIDEO || _s.audioType_str == FWDRAP.HLS)  && _s.videoScreen_do){
				_s.videoScreen_do.pause();
			}else{
				if(_s.audioScreen_do) _s.audioScreen_do.pause();
			}
		};
		
		_s.stop = function(resetRadio){
			if(!_s.isAPIReady_bl) return;
			
			if(_s.controller_do){
				if(_s.controller_do.ttm) _s.controller_do.ttm.hide();
				_s.controller_do.disableAtbButton();
			}
		
			_s.hasStartedToPlay_bl = false;
			_s.hasPassedPassowrd_bl = false;
			_s.isShoutcast_bl = false;
			_s.isIcecast_bl = false;
			
			_s._d.closeJsonPLoader();
			_s.destroyHLS();
			if(_s.opener_do) _s.opener_do.showPlayButton();
			if(_s.largePlayButton_do) _s.largePlayButton_do.hide();
			if(_s.playlist_do){
				_s.playlist_do.setCurItemPlayState();
				_s.playlist_do.updateCurItemProgress(0);
			} 
			_s.showCursor();
			if(_s.audioType_str == FWDRAP.YOUTUBE && _s.ytb_do){
				_s.ytb_do.stop();
			}else if((_s.audioType_str == FWDRAP.VIDEO || _s.audioType_str == FWDRAP.HLS)  && _s.videoScreen_do){
				_s.videoScreen_do.stop();
			}else{
				_s.audioScreen_do.stop();	
			}
			
			_s.setPlaybackRate(_s._d.defaultPlaybackRate);
			
			_s.hasHlsPlayedOnce_bl = false;
			_s.isSafeToScrub_bl = false;
			_s.hlsState = undefined;
			_s.changeHLS_bl = false;
		};
		
		_s.startToScrub = function(){
			if(!_s.isAPIReady_bl || !_s.isPlaylistLoaded_bl) return;
			if(_s.audioType_str == FWDRAP.YOUTUBE){
				_s.videoScreen_do.startToScrub();
			}else if(_s.audioType_str == FWDRAP.VIDEO && _s.videoScreen_do){
				_s.videoScreen_do.startToScrub();
			}else{
				_s.audioScreen_do.startToScrub();
			}
		};
		
		_s.stopToScrub = function(){
			if(!_s.isAPIReady_bl || !_s.isPlaylistLoaded_bl) return;
			if(_s.audioType_str == FWDRAP.YOUTUBE){
				_s.videoScreen_do.stopToScrub();
			}else if(_s.audioType_str == FWDRAP.VIDEO && _s.videoScreen_do){
				_s.videoScreen_do.stopToScrub();
			}else{
				_s.audioScreen_do.stopToScrub();
			}
		};
		
		_s.scrubbAtTime = function(duration){
			if(!_s.isAPIReady_bl || !duration) return;
			if(String(duration).indexOf(":") != -1) duration = FWDRAPUtils.getSecondsFromString(duration);
			if(_s.audioType_str == FWDRAP.YOUTUBE && _s.ytb_do && _s.ytb_do.isSafeToBeControlled_bl){
				_s.ytb_do.scrubbAtTime(duration);
			}else if(_s.audioType_str == FWDRAP.AUDIO){
				if(_s.audioScreen_do) _s.audioScreen_do.scrubbAtTime(duration);
			}else if(FWDRAP.VIDEO){
				if(_s.videoScreen_do) _s.videoScreen_do.scrubbAtTime(duration);
			}
		};
		
		_s.scrub = function(percent){
			if(!_s.isAPIReady_bl || !_s.isPlaylistLoaded_bl) return;
			if(isNaN(percent)) return;
			
			if(percent < 0){
				percent = 0;
			}else if(percent > 1){
				percent = 1;
			}
			if(_s.audioType_str == FWDRAP.YOUTUBE){
				_s.ytb_do.scrub(percent);
			}else if(_s.audioType_str == FWDRAP.VIDEO && _s.videoScreen_do){
				_s.videoScreen_do.scrub(percent);
			}else{
				if(_s.audioType_str == FWDRAP.HLS){
					_s.flashObject.playerSeek(percent * _s.HLSDuration);
				}else{
					if(_s.audioScreen_do) _s.audioScreen_do.scrub(percent);
				}
			}
		};
		
		_s.setPlaybackRate = function(rate){
			if(!_s.isAPIReady_bl) return;
			_s._d.defaultPlaybackRate = rate;
			if(_s.audioType_str == FWDRAP.VIDEO && _s.videoScreen_do){
				_s.videoScreen_do.setPlaybackRate(rate);
			}else if(_s.audioType_str == FWDRAP.AUDIO && _s.audioScreen_do){
				_s.audioScreen_do.setPlaybackRate(rate);
			}else if(_s.audioType_str == FWDRAP.YOUTUBE && _s.ytb_do){
				_s.ytb_do.setPlaybackRate(rate);
			}
		}
		
		_s.setVolume = function(volume){
			if(!_s.isAPIReady_bl) return;
			_s.volume = volume;
			
			if(_s.controller_do) _s.controller_do.updateVolume(volume, true);
		
			if(_s.audioType_str == FWDRAP.YOUTUBE && _s.ytb_do){
				_s.ytb_do.setVolume(volume);
			}else if((_s.audioType_str == FWDRAP.VIDEO || _s.audioType_str == FWDRAP.HLS)  && _s.videoScreen_do){
				_s.videoScreen_do.setVolume(volume);
			}else{
				if(_s.audioScreen_do) _s.audioScreen_do.setVolume(volume);
			}
		};
		
		
		_s.showCategories = function(){
			if(!_s.isAPIReady_bl) return;
			if(_s.categories_do){
				_s.categories_do.show(_s.catId);
				if(_s.customContextMenu_do) _s.customContextMenu_do.updateParent(_s.categories_do);
				_s.controller_do.setCategoriesButtonState("selected");
			}
		};
		
		_s.hideCategories = function(){
			if(!_s.isAPIReady_bl) return;
			if(_s.categories_do){
				_s.categories_do.hide();
				_s.controller_do.setCategoriesButtonState("unselected");
			}
		};
		
		_s.showPlaylist = function(){
			if(!_s.isAPIReady_bl) return;
			if(_s.playlist_do){
				if(_s._d.animateOnIntro_bl){
					_s.playlist_do.show(true);
				}else{
					_s.playlist_do.show(false);
				}
				_s.controller_do.setPlaylistButtonState("selected");
			}
		};
		
		_s.hidePlaylist = function(){
			if(!_s.isAPIReady_bl) return;
			if(_s.playlist_do){
				if(_s._d.animateOnIntro_bl){
					_s.playlist_do.hide(true);
				}else{
					_s.playlist_do.hide(false);
				}
				_s.controller_do.setPlaylistButtonState("unselected");
			}
			if(_s.shareWindow_do) _s.shareWindow_do.hide(true);
		};
		
		_s.share = function(){
			if(!_s.isAPIReady_bl) return;
			if(_s.shareWindow_do) _s.shareWindow_do.show();
		};	
		
		_s.getIsAPIReady = function(){
			return _s.isAPIReady_bl;
		};
		
		_s.getCatId = function(){
			return _s.catId;
		};
		
		_s.getTrackId = function(){
			return _s.id;
		};
		
		
		_s.getTrackTitle = function(){
			if(!_s.isAPIReady_bl) return;
			return _s._d.playlist_ar[_s.id].title;
		};
		
		_s.getCurrentTime = function(){
			if(!_s.isAPIReady_bl) return;
			
			if(_s.audioType_str == FWDRAP.YOUTUBE){
				return _s.ytb_do.getCurrentTime()
			}else if(_s.audioType_str == FWDRAP.AUDIO){
				return _s.audioScreen_do.getCurrentTime();
			}else if((_s.audioType_str == FWDRAP.VIDEO || _s.audioType_str == FWDRAP.HLS)  && _s.videoScreen_do){
				return _s.videoScreen_do.getCurrentTime();
			}
		};
		
		_s.getDuration = function(){
			if(!_s.isAPIReady_bl) return;
			if(_s.audioType_str == FWDRAP.YOUTUBE){
				return _s.ytb_do.getDuration()
			}else if(_s.audioType_str == FWDRAP.AUDIO){
				return _s.audioScreen_do.getDuration();
			}else if((_s.audioType_str == FWDRAP.VIDEO || _s.audioType_str == FWDRAP.HLS)  && _s.videoScreen_do){
				return _s.videoScreen_do.getDuration();
			}
		};
		
		_s.downloadMP3 = function(pId){
			if(!_s.isAPIReady_bl) return;
			if(document.location.protocol == "file:"){
				var error = "Downloading mp3 files local is not allowed or possible!. To function properly please test online.";
				_s.main_do.addChild(_s.info_do);
				_s.info_do.showText(error);
				return;
			}
			
			if(pId == undefined) pId = _s.id;
			
			if((_s._d.playIfLoggedIn || _s._d.playlist_ar[_s.id]['playIfLoggedIn']) && _s.lgdWindow_do){
				_s.lgdWindow_do.positionAndResize();
				_s.lgdWindow_do.show();
				return;
			}

			_s.videoNameGa = _s._d.playlist_ar[pId]["titleText"];
			_s.videoCat = _s._d.cats_ar[_s.catId]["playlistsName"];
			
			if(_s.gtag && _s.videoNameGa){
				var params = {
					'track_url': _s.audioPath,
					'playlist_name' : _s.videoCat,
					'track_name': _s.videoNameGa
					
				}
				
				_s.gtag('event', 'download', params);
			}
			
			var source = _s._d.playlist_ar[pId].downloadPath;
			
			var sourceName = _s._d.playlist_ar[pId].titleText;
			_s._d.downloadMp3(source, sourceName);
		};
		
		_s.buy = function(pId){
			if(!_s.isAPIReady_bl) return;
			
			if(document.location.protocol == "file:"){
				var error = "Buying mp3 files local is not allowed or possible!. To function properly please test online.";
				_s.main_do.addChild(_s.info_do);
				_s.info_do.showText(error);
				return;
			}
			
			if(pId == undefined) pId = _s.id;
			
			var buy = _s._d.playlist_ar[pId].buy;
			if(buy.indexOf("http") != -1 && buy.indexOf("http") < 3){
				window.open(buy);
			}else{
				eval(buy);
			}
		};
		
		_s.addTrack = function(source, title, thumbnailSource, duration, addFirst, download, buy){
			if(_s.isReady_bl) return;
			if(_s.playlist_do) _s.playlist_do.addTrack(source, title, thumbnailSource, duration, addFirst, download, buy );
		}
		
		_s.updateHEXColors = function(normalColor, selectedColor){
			if(!_s.isAPIReady_bl) return;
			_s.controller_do.updateHEXColors(normalColor, selectedColor);
			if(_s.largePlayButton_do) _s.largePlayButton_do.updateHEXColors(normalColor, "#FFFFFF");
			if(_s.shareWindow_do) _s.shareWindow_do.updateHEXColors(normalColor, selectedColor);
			if(_s.playbackRateWindow_do) _s.playbackRateWindow_do.updateHEXColors(normalColor, selectedColor);
			
			if(_s.playlist_do) _s.playlist_do.updateHEXColors(normalColor, selectedColor);
		};
		

		//###########################################//
		/* event dispatcher */
		//###########################################//
		_s.addListener = function (type, listener){
	    	if(!_s.listeners) return;
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function.");
	    	
	    	
	        var event = {};
	        event.type = type;
	        event.listener = listener;
	        event.target = _s;
	        _s.listeners.events_ar.push(event);
	    };
	    
	    _s.dispatchEvent = function(type, props){
	    	if(_s.listeners == null) return;
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	
	        for (var i=0, len=_s.listeners.events_ar.length; i < len; i++){
	        	if(_s.listeners.events_ar[i].target === _s && _s.listeners.events_ar[i].type === type){		
	    	        if(props){
	    	        	for(var prop in props){
	    	        		_s.listeners.events_ar[i][prop] = props[prop];
	    	        	}
	    	        }
	        		_s.listeners.events_ar[i].listener.call(_s, _s.listeners.events_ar[i]);
	        	}
	        }
	    };
	    
	   _s.removeListener = function(type, listener){
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function." + type);
	    	
	        for (var i=0, len=_s.listeners.events_ar.length; i < len; i++){
	        	if(_s.listeners.events_ar[i].target === _s 
	        			&& _s.listeners.events_ar[i].type === type
	        			&& _s.listeners.events_ar[i].listener ===  listener
	        	){
	        		_s.listeners.events_ar.splice(i,1);
	        		break;
	        	}
	        }  
	    };		
	    
		if(_s.useYoutube_bl){	
			if((location.protocol.indexOf("file:") != -1 && FWDRAPUtils.isIE)
			   || (location.protocol.indexOf("file:") != -1 && FWDRAPUtils.isOpera)){
				_s.stageContainer = FWDRAPUtils.getChildById(props.parentId);
				_s.setupmain_do();
				_s.setupInfo();
				_s.main_do.addChild(_s.info_do);
				_s.info_do.allowToRemove_bl = false;
				_s.info_do.showText("This browser dosen't allow the Youtube API to run local, please test it online or in another browser like Firefox or Chrome! If you don't want to use Youtube set <font color=\"#FF000000\">useYoutube:\"no\"</font>.");
				_s.resizeHandler();
				return;
			}	
		}
		
		setTimeout(FWDRAP.checkIfHasYoutube, 100);
	};
	
	
	FWDRAP.checkIfHasYoutube = function(){
		
		if(FWDRAP.checkIfHasYoutube_bl) return;
		FWDRAP.checkIfHasYoutube_bl = true;
		
		var hasYoutube_bl = false;
		var tt = FWDRAP.instaces_ar.length;
		var audio;
		for(var i=0; i<tt; i++){
			audio = FWDRAP.instaces_ar[i];
			if(audio.useYoutube_bl) hasYoutube_bl = true;
		}
		
		
		if(hasYoutube_bl){
			setTimeout(FWDRAP.setupYoutubeAPI, 500);
		}else{
			setTimeout(FWDRAP.setupAllInstances, 500);
		}
	};
	
	
	FWDRAP.setupYoutubeAPI = function(){
		
		if(FWDRAP.isYoutubeAPICreated_bl) return;
		FWDRAP.isYoutubeAPICreated_bl = true;
		
		if(typeof YT != "undefined"){
			FWDRAP.setupAllInstances();
		}else{
			window.onYouTubeIframeAPIReady = function(){
				FWDRAP.setupAllInstances();
			};
			var tag = document.createElement("script");
			tag.src = "https://www.youtube.com/iframe_api";
			var firstScriptTag = document.getElementsByTagName("script")[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		}
	};
	
	FWDRAP.setupAllInstances = function(){
		
		if(FWDRAP.areInstancesCreated_bl) return;
	
		var args = FWDRAPUtils.getUrlArgs(window.location.search);
		var embedTest = args.RAPInstanceName;
	
		if(FWDRAP.audioStartBehaviour != "pause" 
			&& FWDRAP.audioStartBehaviour != "stop"
			&& FWDRAP.audioStartBehaviour != "none"
		){
			FWDRAP.audioStartBehaviour = "pause";
		}
		if(FWDRAPUtils.isMbl) FWDRAP.audioStartBehaviour = "stop";

		FWDRAP.areInstancesCreated_bl = true;
		var tt = FWDRAP.instaces_ar.length;
		
		var audio;
		var autoPlayFound_bl = false;
		var prevVideo;
		
		if(embedTest){
			for(var i=0; i<tt; i++){
				audio = FWDRAP.instaces_ar[i];
				if(audio.props.instanceName == embedTest){
					FWDRAP.isEmbedded_bl = true;
					audio.init();
					return;
				}
			}
		}
		
		for(var i=0; i<tt; i++){
			audio = FWDRAP.instaces_ar[i];
			prevVideo = FWDRAP.instaces_ar[i - 1];
			audio.init();
		};
	};
	
	FWDRAP.pauseAllAudio = function(pAudio){
	
		var totalAudio = FWDRAP.instaces_ar.length;
		var audio;
		
		for(var i=0; i<totalAudio; i++){
			audio = FWDRAP.instaces_ar[i];
			if(audio != pAudio) audio.stop();
		};
	};
	
	FWDRAP.stopAllAudio = function(pAudio){
		var tt = FWDRAP.instaces_ar.length;
		var audio;
		for(var i=0; i<tt; i++){
			audio = FWDRAP.instaces_ar[i];
			if(audio != pAudio){
				audio.stop();
			}
		};
	};
	
	FWDRAP.hasHTMLHLS = (function(){
		var videoTest_el = document.createElement("video");
		var flag = false;
		
		if(videoTest_el.canPlayType){
			flag = Boolean(videoTest_el.canPlayType('application/vnd.apple.mpegurl') === "probably" || videoTest_el.canPlayType('application/vnd.apple.mpegurl') === "maybe");
		}
		return flag;
	}());
	
	FWDRAP.getAudioFormats = (function(){
		var audio_el = document.createElement("audio");
		if(!audio_el.canPlayType) return;
		var extention_str = "";
		var extentions_ar = [];
		if(audio_el.canPlayType('audio/mpeg') == "probably" || audio_el.canPlayType('audio/mpeg') == "maybe"){
			extention_str += ".mp3";
		}
		
		if(audio_el.canPlayType("audio/ogg") == "probably" || audio_el.canPlayType("audio/ogg") == "maybe"){
			extention_str += ".ogg";
		}
		
		if(audio_el.canPlayType("audio/mp4") == "probably" || audio_el.canPlayType("audio/mp4") == "maybe"){
			extention_str += ".webm";
		}
		
		extentions_ar = extention_str.split(".");
		extentions_ar.shift();
		
		audio_el = null;
		return extentions_ar;
	})();
	
	FWDRAP.hasCanvas = (function(){
		return Boolean(document.createElement("canvas"));
	})();
	

	FWDRAP.getAudioFormats = (function(){
		var audio_el = document.createElement("audio");
		if(!audio_el.canPlayType) return;
		var extention_str = "";
		var extentions_ar = [];
		if(audio_el.canPlayType('audio/mpeg') == "probably" || audio_el.canPlayType('audio/mpeg') == "maybe"){
			extention_str += ".mp3";
		}
		
		if(audio_el.canPlayType("audio/ogg") == "probably" || audio_el.canPlayType("audio/ogg") == "maybe"){
			extention_str += ".ogg";
		}
		
		if(audio_el.canPlayType("audio/mp4") == "probably" || audio_el.canPlayType("audio/mp4") == "maybe"){
			extention_str += ".webm";
		}
		
		extentions_ar = extention_str.split(".");
		extentions_ar.shift();
		
		audio_el = null;
		return extentions_ar;
	})();

	/* set prototype */
	FWDRAP.setPrototype =  function(){
		FWDRAP.prototype = new FWDRAPEventDispatcher();
	};
	
	
	FWDRAP.instaces_ar = [];
	
	FWDRAP.YOUTUBE = "youtube";
	FWDRAP.VIDEO = "video";
	FWDRAP.AUDIO = "audio";
	FWDRAP.READY = "ready";
	FWDRAP.START_TO_LOAD_PLAYLIST = "startToLoadPlaylist";
	FWDRAP.LOAD_PLAYLIST_COMPLETE = "loadPlaylistComplete";
	FWDRAP.STOP = "stop";
	FWDRAP.PLAY = "play";
	FWDRAP.PAUSE = "pause";
	FWDRAP.UPDATE = "update";
	FWDRAP.UPDATE_TIME = "updateTime";
	FWDRAP.ERROR = "error";
	FWDRAP.PLAY_COMPLETE = "playComplete";
	FWDRAP.POPUP = "popup";
	FWDRAP.START = "start";
	FWDRAP.HLS = "hls_flash";
	
	
	window.FWDRAP = FWDRAP;
	
}(window));