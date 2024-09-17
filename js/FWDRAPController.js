/**
 * Royal Audio Player
 * Controller.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function(){
var FWDRAPController = function(
			_d,
			prt
		){
		
		'use strict';

		var _s = this;
		_s._d = _d;
		var prototype = FWDRAPController.prototype;
		
		_s.bk_img = _d.bk_img;
		_s.thumbnail_img = _d.thumbnail_img;
		_s.separator1_img = _d.separator1_img;
		_s.separator2_img = _d.separator2_img;
		_s.prevN_img = _d.prevN_img;
		_s.prevS_img = _d.prevS_img;
		_s.playN_img = _d.playN_img;
		_s.playS_img = _d.playS_img;
		_s.pauseN_img = _d.pauseN_img;
		_s.pauseS_img = _d.pauseS_img;
		_s.nextN_img = _d.nextN_img;
		_s.nextS_img = _d.nextS_img;
		_s.mainScrubberBkLeft_img = _d.mainScrubberBkLeft_img;
		_s.mainScrubberBkRight_img = _d.mainScrubberBkRight_img;
		_s.mainScrubberDragLeft_img = _d.mainScrubberDragLeft_img;
		_s.mainScrubberLine_img = _d.mainScrubberLine_img;
		_s.mainScrubberLeftProgress_img = _d.mainScrubberLeftProgress_img;
		_s.volumeScrubberBkLeft_img = _d.volumeScrubberBkLeft_img;
		_s.volumeScrubberBkRight_img = _d.volumeScrubberBkRight_img;
		_s.volumeScrubberDragLeft_img = _d.volumeScrubberDragLeft_img;
		_s.volumeScrubberLine_img = _d.volumeScrubberLine_img;
		_s.volumeN_img = _d.volumeN_img;
		_s.thumb_img = null;
		_s.titleBarLeft_img = _d.titleBarLeft_img;
		_s.titleBarRigth_img = _d.titleBarRigth_img;
		
		_s.categoriesN_img = _d.categoriesN_img;
		_s.replayN_img = _d.replayN_img;
		_s.playlistN_img = _d.playlistN_img;
		_s.shuffleN_img = _d.shuffleN_img;
		_s.downloaderN_img = _d.downloaderN_img;
		_s.shareN_img = _d.shareN_img;
		_s.popupN_img = _d.popupN_img;
		_s.controllerBk_img = _d.controllerBk_img;
		
		_s.titlebarAnimBkPath_img = _d.titlebarAnimBkPath_img;
		_s.titlebarLeftPath_img = _d.titlebarLeftPath_img;
		_s.titlebarRightPath_img = _d.titlebarRightPath_img;
		_s.soundAnimationPath_img = _d.soundAnimationPath_img;
		
		_s.buttons_ar = [];
	
		_s.controllerBkPath_str = _d.controllerBkPath_str;
		_s.thumbnailBkPath_str = _d.thumbnailBkPath_str;
		_s.mainScrubberBkMiddlePath_str = _d.mainScrubberBkMiddlePath_str;
		_s.volumeScrubberBkMiddlePath_str = _d.volumeScrubberBkMiddlePath_str;
		_s.mainScrubberDragMiddlePath_str = _d.mainScrubberDragMiddlePath_str;
		_s.volumeScrubberDragMiddlePath_str = _d.volumeScrubberDragMiddlePath_str;
		_s.timeColor_str = _d.timeColor_str;
		_s.titleColor_str = _d.titleColor_str;
		_s.progressMiddlePath_str = _d.progressMiddlePath_str;
		_s.titlebarBkMiddlePattern_str = _d.titlebarBkMiddlePattern_str;
		_s.toolTipsFntClr = _d.toolTipsFntClr;
		
		_s.useHEX = _d.useHEX; 
		_s.nBC = _d.nBC;
		_s.n2BC = _d.n2BC;
		_s.sBC = _d.sBC;
		
		_s.controllerHeight = _d.controllerHeight;
		_s.minLeftWidth = 150;
		_s.thumbWidthAndHeight = _s.controllerHeight;
		_s.sW = 0;
		_s.sH = _s.controllerHeight;
		_s.scrubbersBkLeftAndRightWidth = _s.mainScrubberBkLeft_img.width;
		_s.mainScrubberWidth = 0;
		_s.totalVolumeBarWidth = 100;
		_s.minVolumeBarWidth = 60;
		_s.volumeScrubberWidth = 0;
		_s.spaceBetweenVolumeButtonAndScrubber = _d.spaceBetweenVolumeButtonAndScrubber;

		_s.mainScrubberOffsetTop = _d.mainScrubberOffsetTop;
		_s.spaceBetweenMainScrubberAndTime = _d.spaceBetweenMainScrubberAndTime;
		_s.startTimeSpace = _d.startTimeSpace;
		_s.scrubbersHeight = _s.mainScrubberBkLeft_img.height;
		_s.mainScrubberDragLeftWidth = _s.mainScrubberDragLeft_img.width;
		_s.scrubbersOffsetWidth = _d.scrubbersOffsetWidth;
		_s.scrubbersOffestTotalWidth = _d.scrubbersOffestTotalWidth;
		_s.volumeButtonAndScrubberOffsetTop = _d.volumeButtonAndScrubberOffsetTop;
		_s.volume = _d.volume;
		_s.lastVolume = _s.volume;
		_s.startSpaceBetweenButtons = _d.startSpaceBetweenButtons;
		_s.spaceBetweenButtons = _d.spaceBetweenButtons;
		_s.volumeScrubberOffestWidth = _d.volumeScrubberOffestWidth;
		_s.percentPlayed = 0;
		_s.separatorOffsetOutSpace = _d.separatorOffsetOutSpace;
		_s.separatorOffsetInSpace = _d.separatorOffsetInSpace;
		_s.titlebarHeight = _s.titlebarLeftPath_img.height;
		_s.titleBarOffsetTop = _d.titleBarOffsetTop;
		_s.animTextWidth = 0;
		_s.animationHolderWidth = 0;
		_s.lastTotalTimeLength = 0;
		_s.lastCurTimeLength = 0;
		_s.lastButtonsOffsetTop = _d.lastButtonsOffsetTop;
		_s.allButtonsOffsetTopAndBottom = _d.allButtonsOffsetTopAndBottom;
		_s.timeHeight = 0;
		_s.totalButtonsWidth = 0;
		_s.largerButtonHeight = 0;
		_s.scrubberOffsetBottom = _d.scrubberOffsetBottom;
		_s.equlizerOffsetLeft = _d.equlizerOffsetLeft;
		_s.toolTipsDl = _d.toolTipsDl;
		
		_s.showButtonsToolTips_bl = _d.showButtonsToolTips_bl;
		_s.showPlaylistsButtonAndPlaylists_bl = _d.showPlaylistsButtonAndPlaylists_bl;
		_s.loop_bl = _d.loop_bl;
		_s.shuffle_bl = _d.shuffle_bl;
		_s.allowToChangeVolume_bl = _d.allowToChangeVolume_bl;
		_s.showLoopButton_bl = _d.showLoopButton_bl;
		_s.showShuffleButton_bl = _d.showShuffleButton_bl;
		_s.showPlayListButtonAndPlaylist_bl = _d.showPlayListButtonAndPlaylist_bl;
		_s.showDownloadMp3Button_bl = _d.showDownloadMp3Button_bl;
		_s.showBuyButton_bl = _d.showBuyButton_bl;
		_s.showShareButton_bl = _d.showShareButton_bl;
		_s.showPopupButton_bl = _d.showPopupButton_bl;
		_s.animateOnIntro_bl = _d.animateOnIntro_bl;
		_s.showSoundAnimation_bl = _d.showSoundAnimation_bl;
		_s.showPlaybackRateButton_bl = _d.showPlaybackRateButton_bl;
		_s.showPlayListByDefault_bl = _d.showPlayListByDefault_bl;
		_s.showVideoFullScreenButton_bl = _d.showVideoFullScreenButton_bl;
		_s.showNextAndPrevButtons_bl = _d.showNextAndPrevButtons_bl;
		_s.disableScrubber_bl =  _d.disableScrubber_bl;
		_s.expandControllerBackground_bl = _d.expandControllerBackground_bl;
		_s.isMbl = FWDRAPUtils.isMobile;
		_s.hasPointerEvent_bl = FWDRAPUtils.hasPointerEvent;


		//##########################################//
		/* initialize _s */
		//##########################################//
		_s.init = function(){

			_s.videoControllerHolder_do = new FWDRAPDisplayObject("div");
			_s.videoControllerBk_do = new FWDRAPDisplayObject("div");
			_s.videoControllerBk_do.getStyle().background = "url('" + _s.controllerBkPath_str + "')";
			_s.videoControllerBk_do.getStyle().width = "100%";
			_s.videoControllerBk_do.getStyle().height = "100%";
			_s.videoControllerBk_do.screen.className = 'fwdrap-video-controler-background';
			_s.videoControllerHolder_do.addChild(_s.videoControllerBk_do);
			
			_s.mainHolder_do = new FWDRAPDisplayObject("div");
			if(_s.expandControllerBackground_bl){
				_s.mainBk_do = new FWDRAPDisplayObject("img");
				_s.mainBk_do.setScreen(_s.controllerBk_img);
				_s.mainHolder_do.addChild(_s.mainBk_do);
				_s.mainBk_do.setBkColor("#000000");
			}else{
				_s.mainHolder_do.getStyle().background = "url('" + _s.controllerBkPath_str + "')";
			}

			_s.mainHolder_do.screen.className = 'fwdrap-controler';
			
			_s.addChild(_s.mainHolder_do);
			_s.setupVisualizer();
			_s.setupThumb();
			_s.setupPrevButton();	
			_s.setupPlayPauseButton();
			_s.setupNextButton();	
			_s.setupSeparators();
			_s.setupMainScrubber();
			_s.setupTitlebar();
			_s.setupTime();
			_s.setupVolumeScrubber();
			if(_s.showPlaylistsButtonAndPlaylists_bl) _s.setupCategoriesButton();
			if(_s.showPlayListButtonAndPlaylist_bl) _s.setupPlaylistButton();
			if(_s.showLoopButton_bl) _s.setupLoopButton();
			if(_s.showShuffleButton_bl) _s.setupShuffleButton();
			if(_s.showPlaybackRateButton_bl) _s.setupPlaybacRateButton();
			if(_s.showShareButton_bl) _s.setupShareButton();
			if(_s.showDownloadMp3Button_bl) _s.setupDownloadButton();
			if(_s.showBuyButton_bl) _s.setupBuyButton();
			_s.setupAtbButton();
			if(_s.showPopupButton_bl) _s.setupPopupButton();
			if(_s.showButtonsToolTips_bl) _s.setupToolTips();
			if(!_s.isMbl) _s.setupDisable();
			
			_s.mainHolder_do.setY(-500);
			_s.showAnimationIntroId_to = setTimeout(function(){
				_s.mainHolder_do.setY(-_s.sH);
				if(_s.animateOnIntro_bl){
					_s.animateOnIntro(true);
				}else{
					_s.animateOnIntro(false);
				}
			},200);
			
			_s.tmpButtons_ar = _s.buttons_ar.concat();
			
			_s.setTotalButonsW();
			if(_d.useVectorIcons){
				setTimeout(function(){
					_s.setTotalButonsW();
					_s.resizeAndPosition(true);
				}, 500);
			}
		};

		_s.setTotalButonsW = function(){
			var button;
			_s.totalButtonsWidth = 0;
			for(var i=0; i<_s.tmpButtons_ar.length; i++){
				button = _s.tmpButtons_ar[i];
				_s.totalButtonsWidth += button.w;
				if(button.h > _s.largerButtonHeight) _s.largerButtonHeight = button.h;
			}
			if(!_s.showNextAndPrevButtons_bl){
				_s.totalButtonsWidth -= (_s.nextN_img.width - _s.prevN_img.width);
			}
			_s.totalButtonsWidth += _s.volumeButton_do.w;
			_s.totalButtonsWidth +=  _s.startSpaceBetweenButtons * 2;
			if(isNaN(_s.totalButtonsWidth)){
				setTimeout(_s.setTotalButonsW, 100);
			}
		}
		
		_s.goFullScreen = function(){
			_s.mainHolder_do.addChild(_s.videoControllerHolder_do);
			if(_s.playPauseButton_do) _s.videoControllerHolder_do.addChild(_s.playPauseButton_do);
			if(_s.currentTime_do) _s.videoControllerHolder_do.addChild(_s.currentTime_do);
			_s.currentTime_do.setY(0)
			if(_s.totalTime_do) _s.videoControllerHolder_do.addChild(_s.totalTime_do);
			if(_s.mainScrubber_do) _s.videoControllerHolder_do.addChild(_s.mainScrubber_do);
			if(_s.volumeButton_do) _s.videoControllerHolder_do.addChild(_s.volumeButton_do);
			if(_s.volumeScrubber_do) _s.videoControllerHolder_do.addChild(_s.volumeScrubber_do);
			_s.isFullScreen_bl = true;
		}
		
		_s.goNormalScreen = function(){
			_s.videoControllerHolder_do.setWidth(1);
			if(_s.ttm){
				_s.ttm.setX(0);
				_s.ttm2.setX(0);
			}
		
			_s.isFullScreen_bl = false;
			_s.mainHolder_do.removeChild(_s.videoControllerHolder_do);
			if(_s.volumeButton_do){
				_s.volumeButton_do.setX(0);
				_s.volumeButton_do.setY(0);
				_s.mainVolumeHolder_do.addChild(_s.volumeButton_do);
				_s.mainVolumeHolder_do.addChild(_s.volumeScrubber_do);
			}
			
			if(_s.volumeScrubber_do){
				 _s.mainHolder_do.addChild(_s.mainScrubber_do);
				_s.volumeScrubber_do.setY(parseInt((_s.volumeButton_do.h - _s.scrubbersHeight)/2));
			}
			
			if(_s.playPauseButton_do) _s.mainHolder_do.addChild(_s.playPauseButton_do);
			if(_s.currentTime_do) _s.mainHolder_do.addChild(_s.currentTime_do);
			if(_s.totalTime_do) _s.mainHolder_do.addChild(_s.totalTime_do);
		}
		

		//###########################################//
		// Resize and position _s...
		//###########################################//
		_s.resizeAndPosition = function(overwrite){
			
			if(prt.sW == _s.sW && prt.sH == _s.sH && !overwrite) return;
			
			if(prt.isFullScreen_bl){
				var ws = FWDRAPUtils.getViewportSize();
				_s.controllerHeight = _s.playPauseButton_do.h + 20;
				_s.sW = ws.w;
				_s.sH = ws.h;
			}else{
				_s.controllerHeight = _d.controllerHeight;
				_s.sH = _s.controllerHeight;
				_s.sW = prt.sW;
			}
			
			_s.positionButtons();
			_s.resizeVisualizer();
		};
		

		//#################################//
		/* animate on intro */
		//#################################//
		_s.animateOnIntro = function(animate){
			if(animate){
				FWDAnimation.to(_s.mainHolder_do, .8, {y:0, ease:Expo.easeInOut, onComplete:function(){_s.setOverflow('visible');}});
			}else{
				FWDAnimation.killTweensOf(_s.mainHolder_do);
				_s.mainHolder_do.setY(0);
				_s.setOverflow('visible');
			}
		};
		
		_s.hideVideoContoller = function(){
			FWDAnimation.killTweensOf(_s.videoControllerHolder_do);
			FWDAnimation.to(_s.videoControllerHolder_do, .8, {y:_s.sH, ease:Expo.easeInOut});
		}
		
		_s.showVideoContoller = function(){
			FWDAnimation.killTweensOf(_s.videoControllerHolder_do);
			FWDAnimation.to(_s.videoControllerHolder_do, .8, {y:_s.sH - _s.controllerHeight, ease:Expo.easeInOut});
		}

		
		//##############################//
		/* setup background */
		//##############################//
		_s.positionButtons = function(){
			
			var button;
			var prevItem;
			var leftWidth = 0;
			var minimizedSpaceBetweenButtons = 0;
			var totalButtons = _s.buttons_ar.length;
			
			if(prt.fullScreenButton_do){
				if(FWDRAPUtils.indexOfArray(_s.buttons_ar, prt.fullScreenButton_do) != -1){
					_s.buttons_ar.splice(FWDRAPUtils.indexOfArray(_s.buttons_ar, prt.fullScreenButton_do), 1);	
				}
				if(!_s.mainHolder_do.contains(_s.fullScreenButton_do)){
					if(prt.audioType_str == FWDRAP.VIDEO || prt.audioType_str == FWDRAP.YOUTUBE){
						prt.fullScreenButton_do.setX(parseInt((_s.controllerHeight - prt.fullScreenButton_do.w)/2) + 1);
						prt.fullScreenButton_do.setY(parseInt((_s.controllerHeight - prt.fullScreenButton_do.h)/2) + 1);
						if(!prt.isFullScreen_bl) prt.fullScreenButton_do.setAlpha(0);
					}else{
						prt.fullScreenButton_do.setX(-500);
					}
				}
			}
			
			if(prt.isFullScreen_bl){
				leftWidth = _s.sW;
				if(_s.sW < 500){
					_s.volumeScrubberWidth = 50;
					_s.showVolumeScrubber_bl = false;
				}else{
					_s.volumeScrubberWidth = 150;
					_s.showVolumeScrubber_bl = true;
				}
				
				var tempButtons_ar = [];
				tempButtons_ar.push(_s.playPauseButton_do);
				tempButtons_ar.push(_s.currentTime_do);
				tempButtons_ar.push(_s.mainScrubber_do);
				tempButtons_ar.push(_s.totalTime_do);
				tempButtons_ar.push(_s.volumeButton_do);
				if(_s.showVolumeScrubber_bl){
					tempButtons_ar.push(_s.volumeScrubber_do);
				}else{
					_s.volumeScrubber_do.setX(-1000);
				}
				tempButtons_ar.push(prt.fullScreenButton_do);
				totalButtons = tempButtons_ar.length;
				
				FWDAnimation.killTweensOf(_s.videoControllerHolder_do);
				_s.videoControllerHolder_do.setWidth(_s.sW);
				_s.videoControllerHolder_do.setHeight(_s.controllerHeight);
				_s.videoControllerHolder_do.setY(_s.sH - _s.controllerHeight);
				leftWidth -= _s.playPauseButton_do.w + _s.currentTime_do.w + _s.totalTime_do.w + _s.volumeButton_do.w + _s.volumeScrubberWidth + prt.fullScreenButton_do.w;
			
				leftWidth -= _s.spaceBetweenButtons * 8;
				if(!_s.showVolumeScrubber_bl){
					leftWidth += _s.volumeScrubberWidth;
					leftWidth += _s.spaceBetweenButtons;
				}
				_s.mainScrubberWidth = leftWidth;
				
				if(_s.mainScrubberWidth > 0 )_s.mainScrubber_do.setWidth(_s.mainScrubberWidth);
				_s.mainScrubberBkMiddle_do.setWidth(_s.mainScrubberWidth - _s.scrubbersBkLeftAndRightWidth * 2);
				_s.mainScrubberBkRight_do.setX(_s.mainScrubberWidth - _s.scrubbersBkLeftAndRightWidth);
				_s.mainScrubberDragMiddle_do.setWidth(_s.mainScrubberWidth - _s.scrubbersBkLeftAndRightWidth - _s.scrubbersOffsetWidth);
				_s.progressMiddle_do.setWidth(_s.mainScrubberWidth - _s.scrubbersBkLeftAndRightWidth - _s.scrubbersOffsetWidth);
				_s.updateMainScrubber(_s.percentPlayed);
					
				_s.volumeScrubber_do.setWidth(_s.volumeScrubberWidth);
				_s.volumeScrubberBkMiddle_do.setWidth(_s.volumeScrubberWidth - _s.scrubbersBkLeftAndRightWidth * 2);
				_s.volumeScrubberDragMiddle_do.setWidth(_s.volumeScrubberWidth - _s.scrubbersBkLeftAndRightWidth);
				_s.updateVolume(_s.volume);
				
				for(var i=0; i<totalButtons; i++){
					button = tempButtons_ar[i];
					
					if(i == 0){
						prevItem = _s.playPauseButton_do;
						button.setX(_s.spaceBetweenButtons - 2);
						button.setY(parseInt((_s.controllerHeight - button.h)/2));
					}else{
						prevItem = tempButtons_ar[i -1];
						if(button == _s.mainScrubber_do){
							button.setX(prevItem.x + prevItem.w + _s.spaceBetweenButtons);
						}else{
							button.setX(prevItem.x + prevItem.w + _s.spaceBetweenButtons);
						}
						button.setY(parseInt((_s.controllerHeight - button.h)/2));
					}
				}
				return;
			}

			if(_d.playlist_ar[prt.id]){
				if(_d.playlist_ar[prt.id]['atb']){
					if(FWDRAPUtils.indexOfArray(_s.buttons_ar, _s.atbButton_do) == -1){
						if(_s.popupButton_do){
							_s.buttons_ar.splice(_s.buttons_ar.length - 1,0, _s.atbButton_do);
						}else{
							_s.buttons_ar.splice(_s.buttons_ar.length, 0, _s.atbButton_do);
						}
						_s.atbButton_do.setVisible(true);
					}
				}else{
					var atobButtonIndex = FWDRAPUtils.indexOfArray(_s.buttons_ar, _s.atbButton_do);
					if(atobButtonIndex != -1){
						_s.buttons_ar.splice(atobButtonIndex, 1);
						_s.atbButton_do.setVisible(false);
					}
				}
			}
			
			if(_s.showBuyButton_bl && _d.playlist_ar[prt.id]){
				if(_d.playlist_ar[prt.id].buy && prt.isPlaylistLoaded_bl){
					if(FWDRAPUtils.indexOfArray(_s.buttons_ar, _s.buyButton_do) == -1){
						if(_s.showShareButton_bl && _s.showPopupButton_bl){
							_s.buttons_ar.splice(_s.buttons_ar.length - 2,0, _s.buyButton_do);
						}else if(_s.showShareButton_bl || _s.showPopupButton_bl){
							_s.buttons_ar.splice(_s.buttons_ar.length - 1,0, _s.buyButton_do);
						}else{
							_s.buttons_ar.splice(_s.buttons_ar.length,0, _s.buyButton_do);
						}
						_s.buyButton_do.setVisible(true);
					}
				}else{
					var buyButtonIndex = FWDRAPUtils.indexOfArray(_s.buttons_ar, _s.buyButton_do);
					if(buyButtonIndex != -1){
						_s.buttons_ar.splice(buyButtonIndex, 1);
						_s.buyButton_do.setVisible(false);
					}
				}
			};
			
			if(_s.showDownloadMp3Button_bl && _d.playlist_ar[prt.id]){
				if(_d.playlist_ar[prt.id].downloadable && prt.isPlaylistLoaded_bl){
					if(FWDRAPUtils.indexOfArray(_s.buttons_ar, _s.downloadButton_do) == -1){
						if(_s.showBuyButton_bl && _d.playlist_ar[prt.id].buy){
							_s.buttons_ar.splice(FWDRAPUtils.indexOfArray(_s.buttons_ar, _s.buyButton_do),0, _s.downloadButton_do);
						}else if(_s.showShareButton_bl && _s.showPopupButton_bl){
							_s.buttons_ar.splice(_s.buttons_ar.length - 2,0, _s.downloadButton_do);
						}else if(_s.showShareButton_bl || _s.showPopupButton_bl){
							_s.buttons_ar.splice(_s.buttons_ar.length - 1,0, _s.downloadButton_do);
						}else{
							_s.buttons_ar.splice(_s.buttons_ar.length,0, _s.downloadButton_do);
						}
						
						_s.downloadButton_do.setVisible(true);
					}
				}else{
					var downloadButtonIndex = FWDRAPUtils.indexOfArray(_s.buttons_ar, _s.downloadButton_do);
					if(downloadButtonIndex != -1){
						_s.buttons_ar.splice(downloadButtonIndex,1);
						_s.downloadButton_do.setVisible(false);
					}
				}
			};
			
			if(!_s.showNextAndPrevButtons_bl){
				if(FWDRAPUtils.indexOfArray(_s.buttons_ar, _s.prevButton_do) == -1){
					_s.buttons_ar.splice(0, 0, _s.prevButton_do);
				}
				
				if(FWDRAPUtils.indexOfArray(_s.buttons_ar, _s.nextButton_do) == -1){
					_s.buttons_ar.splice(2, 0, _s.nextButton_do);
				}
			}
			
			totalButtons = _s.buttons_ar.length;
			
			if(!_d.playlist_ar){
				_s.showThumbnail_bl = true;
			}else{
				if(_d.playlist_ar[prt.id] == undefined){
					_s.showThumbnail_bl = false;
				}else{
					_s.showThumbnail_bl = Boolean(_d.playlist_ar[prt.id].thumbPath);
				}
			}
				
			if(!_d.showThumbnail_bl) _s.showThumbnail_bl = false;
			if((prt.audioType_str == FWDRAP.YOUTUBE && prt.useYoutube_bl) || (prt.audioType_str == FWDRAP.VIDEO)){
				_s.showThumbnail_bl = true;
				prt.videosHolder_do.setX(0);
				if(prt.audioType_str == FWDRAP.YOUTUBE){
					if(prt.ytb_do) prt.ytb_do.setX(0);
					if(prt.videoScreen_do) prt.videoScreen_do.setX(-10000);
				}else if(prt.audioType_str == FWDRAP.VIDEO){
					if(prt.ytb_do) prt.ytb_do.setX(-100000);
					if(prt.videoScreen_do) prt.videoScreen_do.setX(0);
				}

			}else if(!_d.showThumbnail_bl){
				_s.showThumbnail_bl = false;
				if(prt.videosHolder_do) prt.videosHolder_do.setX(-100000);
			}else{
				if(prt.videosHolder_do) prt.videosHolder_do.setX(-100000);
			}
			
			if(_s.showThumbnail_bl){
				leftWidth += _s.thumbWidthAndHeight;
				_s.thumb_do.setX(0);
			}else{
				_s.thumb_do.setX(-300);
			}
			
			for(var i=0; i<totalButtons; i++){
				button = _s.buttons_ar[i];
				leftWidth += button.w + _s.spaceBetweenButtons;
			}
			
			if(totalButtons > 3){
				
				var lastButtonsTotalWidth = 0;
				for(var i=0; i<totalButtons; i++){
					button = _s.buttons_ar[i];
					if(i > 2){
						if(i == 3){
							lastButtonsTotalWidth += button.w;
						}else{
							lastButtonsTotalWidth += _s.buttons_ar[i].w + _s.spaceBetweenButtons;
						}
					}
				}
				
				if(lastButtonsTotalWidth < _s.minVolumeBarWidth){	
					for(var i=0; i<totalButtons; i++){
						button = _s.buttons_ar[i];
						if(i > 2){
							leftWidth -= button.w + _s.spaceBetweenButtons;
						}
					}
					
					_s.totalVolumeBarWidth = _s.minVolumeBarWidth + _s.volumeButton_do.w + _s.spaceBetweenVolumeButtonAndScrubber;
					_s.volumeScrubberWidth = _s.minVolumeBarWidth - _s.startSpaceBetweenButtons + _s.volumeScrubberOffestWidth;
					leftWidth += _s.totalVolumeBarWidth;
					leftWidth += _s.separatorOffsetOutSpace * 2 + _s.separatorOffsetInSpace * 2;
					leftWidth += _s.startSpaceBetweenButtons;
					leftWidth += _s.firstSeparator_do.w + _s.secondSeparator_do.w;
					_s.mainVolumeHolder_do.setY(_s.volumeButtonAndScrubberOffsetTop);
				}else{
					
					leftWidth -= _s.spaceBetweenButtons * 2;
					leftWidth += _s.separatorOffsetOutSpace * 2 + _s.separatorOffsetInSpace * 2;
					leftWidth += _s.startSpaceBetweenButtons * 2;
					leftWidth += _s.firstSeparator_do.w + _s.secondSeparator_do.w;
					
					lastButtonsTotalWidth = 0;
					for(var i=0; i<totalButtons; i++){
						button = _s.buttons_ar[i];
						if(i > 2){
							if(i == 3){
								lastButtonsTotalWidth += button.w;
							}else{
								lastButtonsTotalWidth += _s.buttons_ar[i].w + _s.spaceBetweenButtons;
							}
						}
					}
					lastButtonsTotalWidth -= 7;
					_s.totalVolumeBarWidth = lastButtonsTotalWidth + _s.volumeButton_do.w + _s.spaceBetweenVolumeButtonAndScrubber;
					_s.volumeScrubberWidth = lastButtonsTotalWidth - _s.volumeButton_do.w - _s.spaceBetweenVolumeButtonAndScrubber + _s.volumeScrubberOffestWidth;
					_s.mainVolumeHolder_do.setY(_s.volumeButtonAndScrubberOffsetTop);
				}
			}else{
				_s.totalVolumeBarWidth = _s.minVolumeBarWidth + _s.volumeButton_do.w + _s.spaceBetweenVolumeButtonAndScrubber;
				_s.volumeScrubberWidth = _s.minVolumeBarWidth - _s.startSpaceBetweenButtons + _s.volumeScrubberOffestWidth;
				leftWidth += _s.totalVolumeBarWidth;
				leftWidth += _s.separatorOffsetOutSpace * 2 + _s.separatorOffsetInSpace * 2;
				leftWidth += _s.startSpaceBetweenButtons;
				leftWidth += _s.firstSeparator_do.w + _s.secondSeparator_do.w;
				_s.mainVolumeHolder_do.setY(parseInt((_s.sH - _s.mainVolumeHolder_do.h)/2));
			}
			
			leftWidth = _s.sW - leftWidth;
			
			
			if(leftWidth > _s.minLeftWidth){

				_s.hasThmbOnLeft = true;
				_s.sH = _s.controllerHeight;
				_s.secondSeparator_do.setX(_s.firstSeparator_do.x + _s.firstSeparator_do.w + _s.separatorOffsetInSpace + leftWidth + _s.separatorOffsetInSpace);
				
				for(var i=0; i<totalButtons; i++){
					button = _s.buttons_ar[i];
					if(i == 0){
						prevItem = _s.thumb_do;
						if(_s.showThumbnail_bl){
							button.setX(prevItem.x + prevItem.w + _s.startSpaceBetweenButtons);
						}else{
							button.setX(_s.startSpaceBetweenButtons);
						}
						button.setY(parseInt((_s.sH - button.h)/2));
					}else if(i == 1){
						prevItem = _s.buttons_ar[i -1];
						button.setX(prevItem.x + prevItem.w + _s.spaceBetweenButtons);
						button.setY(parseInt((_s.sH - button.h)/2));
					}else if(i == 2){
						prevItem = _s.buttons_ar[i -1];
						button.setX(prevItem.x + prevItem.w + _s.spaceBetweenButtons);
						_s.firstSeparator_do.setX(button.x + button.w + _s.separatorOffsetOutSpace);
						button.setY(parseInt((_s.sH - button.h)/2));
					}else if(i == 3){
						_s.secondSeparator_do.setX(_s.firstSeparator_do.x + _s.firstSeparator_do.w + _s.separatorOffsetInSpace + leftWidth + _s.separatorOffsetInSpace);
						prevItem = _s.buttons_ar[i -1];
						button.setX(_s.secondSeparator_do.x + _s.secondSeparator_do.w + _s.separatorOffsetOutSpace);
						button.setY(_s.lastButtonsOffsetTop);
					}else{
						prevItem = _s.buttons_ar[i -1];
						button.setX(prevItem.x + prevItem.w + _s.spaceBetweenButtons);
						button.setY(_s.lastButtonsOffsetTop);
					}
				}
				
				//titlebar
				_s.mainTitlebar_do.setWidth(leftWidth);
				_s.mainTitlebar_do.setX(_s.firstSeparator_do.x + _s.firstSeparator_do.w + _s.separatorOffsetInSpace);
				_s.posTitleGrad();
				_s.titleBarRight_do.setX(_s.mainTitlebar_do.w - _s.titleBarRight_do.w);
				_s.mainTitlebar_do.setY(_s.titleBarOffsetTop);
				if(!_s.totalTime_do.w && FWDRAPUtils.isIEAndLessThen9) return;
				
				//main scrubber and time
				_s.currentTime_do.setX(_s.firstSeparator_do.x + _s.firstSeparator_do.w + _s.separatorOffsetInSpace);
				_s.totalTime_do.setX(_s.firstSeparator_do.x + _s.firstSeparator_do.w + _s.separatorOffsetInSpace + leftWidth - _s.totalTime_do.w);
				_s.currentTime_do.setY(_s.mainScrubberOffsetTop + parseInt((_s.mainScrubber_do.h - _s.currentTime_do.h)/2));
				_s.totalTime_do.setY(_s.mainScrubberOffsetTop + parseInt((_s.mainScrubber_do.h - _s.totalTime_do.h)/2));
				
				_s.mainScrubberWidth = leftWidth + _s.scrubbersOffestTotalWidth - _s.currentTime_do.w - _s.totalTime_do.w - _s.spaceBetweenMainScrubberAndTime * 2;
				_s.mainScrubber_do.setWidth(_s.mainScrubberWidth);
				_s.mainScrubberBkMiddle_do.setWidth(_s.mainScrubberWidth - _s.scrubbersBkLeftAndRightWidth * 2);
				_s.mainScrubberBkRight_do.setX(_s.mainScrubberWidth - _s.scrubbersBkLeftAndRightWidth);
				_s.mainScrubber_do.setX(_s.firstSeparator_do.x + _s.firstSeparator_do.w + _s.separatorOffsetInSpace - parseInt(_s.scrubbersOffestTotalWidth/2)  + _s.currentTime_do.w + _s.spaceBetweenMainScrubberAndTime);
				_s.mainScrubber_do.setY(_s.mainScrubberOffsetTop);
				_s.mainScrubberDragMiddle_do.setWidth(_s.mainScrubberWidth - _s.scrubbersBkLeftAndRightWidth - _s.scrubbersOffsetWidth);
				_s.progressMiddle_do.setWidth(_s.mainScrubberWidth - _s.scrubbersBkLeftAndRightWidth - _s.scrubbersOffsetWidth);
				_s.updateMainScrubber(_s.percentPlayed);
				
				//volume
				_s.mainVolumeHolder_do.setX(_s.secondSeparator_do.x + _s.secondSeparator_do.w + _s.separatorOffsetOutSpace);
				_s.mainVolumeHolder_do.setWidth(_s.totalVolumeBarWidth + _s.scrubbersOffestTotalWidth);
				_s.volumeScrubber_do.setX(_s.volumeButton_do.x + _s.volumeButton_do.w + _s.spaceBetweenVolumeButtonAndScrubber - parseInt(_s.scrubbersOffestTotalWidth/2));
				_s.volumeScrubber_do.setWidth(_s.volumeScrubberWidth);
				_s.volumeScrubberBkRight_do.setX(_s.volumeScrubberWidth - _s.scrubbersBkLeftAndRightWidth);
				_s.volumeScrubberBkMiddle_do.setWidth(_s.volumeScrubberWidth - _s.scrubbersBkLeftAndRightWidth * 2);
				_s.volumeScrubberDragMiddle_do.setWidth(_s.volumeScrubberWidth - _s.scrubbersBkLeftAndRightWidth);
				_s.updateVolume(_s.volume);
				_s.setHeight(_s.controllerHeight);
			}else{

				//thumbnail
				_s.thumb_do.setX(-300);
				_s.hasThmbOnLeft = false;
				if(prt.videosHolder_do) prt.videosHolder_do.setX(-100000);
				
				//separators
				_s.firstSeparator_do.setX(-300);
				_s.secondSeparator_do.setX(-300);
				
				//titlebar
				_s.mainTitlebar_do.setWidth(_s.sW);
				_s.mainTitlebar_do.setX(0);
				_s.mainTitlebar_do.setY(0);
				_s.posTitleGrad();
				_s.titleBarRight_do.setX(_s.mainTitlebar_do.w - _s.titleBarRight_do.w);
				
				//position buttons
				var totalButtonsWidthWithCustoRAPace = 0;
				var leftWidth;
				
				var tempTotalButtonWidth = _s.totalButtonsWidth;

				if(!_s.showNextAndPrevButtons_bl){
					if(FWDRAPUtils.indexOfArray(_s.buttons_ar, _s.prevButton_do) != -1){
						_s.buttons_ar.splice(FWDRAPUtils.indexOfArray(_s.buttons_ar, _s.prevButton_do), 1);
					}
					
					if(FWDRAPUtils.indexOfArray(_s.buttons_ar, _s.nextButton_do) != -1){
						_s.buttons_ar.splice(FWDRAPUtils.indexOfArray(_s.buttons_ar, _s.nextButton_do), 1);
					}
				}
				
				if(_s.downloadButton_do && FWDRAPUtils.indexOfArray(_s.buttons_ar, _s.downloadButton_do) != -1){
					tempTotalButtonWidth += _s.downloadButton_do.w;
				}
				if(_s.buyButton_do && FWDRAPUtils.indexOfArray(_s.buttons_ar, _s.buyButton_do) != -1){
					tempTotalButtonWidth += _s.buyButton_do.w;
				}
				
				if(_s.showVideoFullScreenButton_bl && (prt.audioType_str == FWDRAP.VIDEO || prt.audioType_str == FWDRAP.YOUTUBE) && prt.fullScreenButton_do){
					
					if(FWDRAPUtils.indexOfArray(_s.buttons_ar, prt.fullScreenButton_do) == -1){
						_s.mainHolder_do.addChild(prt.fullScreenButton_do);
						FWDAnimation.killTweensOf(prt.fullScreenButton_do);
						_s.buttons_ar.splice(0,0,prt.fullScreenButton_do);
					}
					tempTotalButtonWidth += prt.fullScreenButton_do.w;
					FWDAnimation.killTweensOf(_s.fullScreenButton_do);
					prt.fullScreenButton_do.setAlpha(1);
				}else{
					if(FWDRAPUtils.indexOfArray(_s.buttons_ar, prt.fullScreenButton_do) != -1){
						_s.buttons_ar.splice(FWDRAPUtils.indexOfArray(_s.buttons_ar, prt.fullScreenButton_do), 1);
						prt.fullScreenButton_do.setX(-500);
					}
				}
				
				
				totalButtons = _s.buttons_ar.length;
				minimizedSpaceBetweenButtons = parseInt((_s.sW - tempTotalButtonWidth)/(totalButtons));
				
				for(var i=0; i<totalButtons; i++){
					button = _s.buttons_ar[i];
					totalButtonsWidthWithCustoRAPace += button.w + minimizedSpaceBetweenButtons; 
				}
				
				totalButtonsWidthWithCustoRAPace += _s.volumeButton_do.w;
				leftWidth = parseInt((_s.sW - totalButtonsWidthWithCustoRAPace)/2)  - _s.startSpaceBetweenButtons;
				
				for(var i=0; i<totalButtons; i++){
					button = _s.buttons_ar[i];
					
					button.setY(_s.titleBarGradLeft_do.h + _s.allButtonsOffsetTopAndBottom + parseInt((_s.largerButtonHeight - button.h)/2));
					
					if(i == 0){
						button.setX(leftWidth + _s.startSpaceBetweenButtons);
					}else{
						prevItem = _s.buttons_ar[i -1];
						button.setX(Math.round(prevItem.x + prevItem.w + minimizedSpaceBetweenButtons));
					}
				}
				
				_s.mainVolumeHolder_do.setX(button.x + button.w + minimizedSpaceBetweenButtons);
				_s.mainVolumeHolder_do.setY(_s.titleBarGradLeft_do.h + _s.allButtonsOffsetTopAndBottom + parseInt((_s.largerButtonHeight - _s.volumeButton_do.h)/2));
				if(!_s.totalTime_do.w && FWDRAPUtils.isIEAndLessThen9) return;

				//main scrubber and time
				_s.currentTime_do.setX(_s.startTimeSpace);
				_s.currentTime_do.setY(_s.playPauseButton_do.y + _s.playPauseButton_do.h + _s.allButtonsOffsetTopAndBottom);
				_s.totalTime_do.setX(_s.sW - _s.startTimeSpace - _s.totalTime_do.w);
				_s.totalTime_do.setY(_s.playPauseButton_do.y + _s.playPauseButton_do.h + _s.allButtonsOffsetTopAndBottom);
				_s.mainScrubber_do.setX(_s.currentTime_do.x +  _s.currentTime_do.w + _s.spaceBetweenMainScrubberAndTime - parseInt(_s.scrubbersOffestTotalWidth/2));
				_s.mainScrubber_do.setY(_s.currentTime_do.y + parseInt((_s.currentTime_do.h - _s.mainScrubber_do.h)/2));
				_s.mainScrubberWidth = _s.sW + _s.scrubbersOffestTotalWidth - _s.currentTime_do.w - _s.totalTime_do.w - _s.spaceBetweenMainScrubberAndTime * 2 - _s.startTimeSpace * 2;
				_s.mainScrubber_do.setWidth(_s.mainScrubberWidth);
				_s.mainScrubberBkMiddle_do.setWidth(_s.mainScrubberWidth - _s.scrubbersBkLeftAndRightWidth * 2);
				_s.mainScrubberBkRight_do.setX(_s.mainScrubberWidth - _s.scrubbersBkLeftAndRightWidth);
				_s.mainScrubberDragMiddle_do.setWidth(_s.mainScrubberWidth - _s.scrubbersBkLeftAndRightWidth - _s.scrubbersOffsetWidth);
				_s.progressMiddle_do.setWidth(_s.mainScrubberWidth - _s.scrubbersBkLeftAndRightWidth - _s.scrubbersOffsetWidth);
				_s.updateMainScrubber(_s.percentPlayed);
				
				//volume
				_s.totalVolumeBarWidth = _s.volumeButton_do.w;
				_s.mainVolumeHolder_do.setWidth(_s.totalVolumeBarWidth);
				_s.volumeScrubber_do.setX(200)
				_s.updateVolume(_s.volume);
				
				_s.sH = _s.mainTitlebar_do.h + _s.largerButtonHeight + (_s.allButtonsOffsetTopAndBottom * 2) + _s.mainScrubber_do.h + _s.scrubberOffsetBottom;
			}
		
			_s.startToCheckIfAnimTitle();
			if(_s.mainBk_do){
				_s.mainBk_do.setWidth(_s.sW);
				_s.mainBk_do.setHeight(_s.sH);
			}
			_s.setWidth(_s.sW);
			_s.setHeight(_s.sH);
			_s.mainHolder_do.setWidth(_s.sW);
			_s.mainHolder_do.setHeight(_s.sH);
		};


		// Setup visuzlizer.
		_s.setupVisualizer = function(){
			if(FWDRAPUtils.isLocal) return;
			if(_d.useVis){
				FWDRAPVisualizer.setPrototype();
				_s.vis = new FWDRAPVisualizer(
					{'visPrst':_d.visPrst,
					 'visClr':_d.visClr,
					 'visCapClr':_d.visCapClr,
					 'useDumyVisualizeOnIOS':_d.useDumyVisualizeOnIOS});
				prt.main_do.addChild(_s.vis);
			}
		}

		_s.resizeVisualizer = function(){
			if(_s.vis){
				var offset = 0;
				if(FWDRAPUtils.isFirefox || FWDRAPUtils.isIE) offset = 1;
				var sW = _s.sW;
				var sH = 50;
				if(_s.vis.preset == 'bars1'){
					sH = 30;
				}else if(_s.vis.preset == 'bars2'){
					sH = 40;
				}
				var x = 0;
				var y = -sH;
				_s.vis.resize(x, y, sW, sH + offset);
			}
		}

		_s.initVisualizer = function(el){
			if(_s.vis) _s.vis.start(el);
		}

		_s.startVis = function(){
			if(_s.vis) _s.vis.play();
		}

		_s.pauseVis = function(){
			if(_s.vis) _s.vis.pause();
		}


		//###############################//
		/* setup a to b loop button */
		//##############################//
		_s.setupAtbButton = function(){
		
			FWDRAPSimpleButton.setPrototype();
			if(_d.useVectorIcons){
				_s.atbButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='fwdrap-icon fwdrap-icon-AB'></span>",
						"fwdrap-main-button-normal-state",
						"fwdrap-main-button-selected-state"
				);
			}else{
				_s.atbButton_do = new FWDRAPSimpleButton(
						_d.atbNPath_img,
						_d.atbSPath_str,
						undefined,
						true,
						_s.useHEX,
						_s.n2BC,
						_s.sBC
				);
			}
			
			_s.atbButton_do.addListener(FWDRAPSimpleButton.SHOW_TOOLTIP, _s.atbButtonShowTooltipHandler);
			_s.atbButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.atbButtonMouseUpHandler);
			_s.atbButton_do.setX(-5000);
			_s.atbButton_do.setY(parseInt((_s.sH - _s.atbButton_do.h)/2));
			_s.mainHolder_do.addChild(_s.atbButton_do); 
			
		};
		
		_s.atbButtonShowTooltipHandler = function(e){
			_s.showToolTip(_s.atbButton_do, _s.atbButtonToolTip_do, e.e);
		};
		
		_s.atbButtonMouseUpHandler = function(){
			_s.dispatchEvent(FWDRAPController.SHOW_ATOB);
		};

		_s.disableAtbButton = function(){
			if(_s.atbButton_do){
			
				_s.atbButton_do.disable();
			} 
		};
		
		_s.enableAtbButton = function(){
			if(_s.atbButton_do) _s.atbButton_do.enable();
		};
		

		//################################//
		/* Setup tooltips */
		//################################//		
		_s.setupToolTips = function(){

			FWDRAPToolTip.setPrototype();
			_s.prevButtonToolTip_do = new FWDRAPToolTip(_s.prevButton_do,  _d.toopTipPointerUp_str, "previous track", _d.toolTipsBkClr, _s.toolTipsFntClr, _s.toolTipsDl);
			document.documentElement.appendChild(_s.prevButtonToolTip_do.screen);
			
			FWDRAPToolTip.setPrototype();
			_s.playPauseToolTip_do = new FWDRAPToolTip(_s.playPauseButton_do,  _d.toopTipPointerUp_str, "play / pause", _d.toolTipsBkClr, _s.toolTipsFntClr, _s.toolTipsDl);
			document.documentElement.appendChild(_s.playPauseToolTip_do.screen);
			
			FWDRAPToolTip.setPrototype();
			_s.nextButtonToolTip_do = new FWDRAPToolTip(_s.nextButton_do,  _d.toopTipPointerUp_str, "next track", _d.toolTipsBkClr, _d.toolTipsFntClr, _s.toolTipsDl);
			document.documentElement.appendChild(_s.nextButtonToolTip_do.screen);
			
			if(_s.showPlaylistsButtonAndPlaylists_bl){
				FWDRAPToolTip.setPrototype();
				_s.playlistsButtonToolTip_do = new FWDRAPToolTip(_s.categoriesButton_do, _d.toopTipPointerUp_str, "show playlists", _d.toolTipsBkClr, _s.toolTipsFntClr, _s.toolTipsDl);
				document.documentElement.appendChild(_s.playlistsButtonToolTip_do.screen);
			}
			
			if(_s.showPlayListButtonAndPlaylist_bl){
				FWDRAPToolTip.setPrototype();
				_s.playlistButtonToolTip_do = new FWDRAPToolTip(_s.playlistButton_do, _d.toopTipPointerUp_str, "show / hide playlist", _d.toolTipsBkClr, _s.toolTipsFntClr, _s.toolTipsDl);
				document.documentElement.appendChild(_s.playlistButtonToolTip_do.screen);
			}
			
			if(_s.showLoopButton_bl){
				FWDRAPToolTip.setPrototype();
				_s.loopButtonToolTip_do = new FWDRAPToolTip(_s.loopButton_do,  _d.toopTipPointerUp_str, "loop", _d.toolTipsBkClr, _s.toolTipsFntClr, _s.toolTipsDl);
				document.documentElement.appendChild(_s.loopButtonToolTip_do.screen);
			}
			
			if(_s.showShuffleButton_bl){
				FWDRAPToolTip.setPrototype();
				_s.shuffleButtonToolTip_do = new FWDRAPToolTip(_s.shuffleButton_do,  _d.toopTipPointerUp_str, "shuffle", _d.toolTipsBkClr, _s.toolTipsFntClr, _s.toolTipsDl);
				document.documentElement.appendChild(_s.shuffleButtonToolTip_do.screen);
			}
			
			if(_s.showPlaybackRateButton_bl){
				FWDRAPToolTip.setPrototype();
				_s.playbackRateButtonToolTip_do = new FWDRAPToolTip(_s.playbackRateButton_do,  _d.toopTipPointerUp_str, "playback rate / speed", _d.toolTipsBkClr, _s.toolTipsFntClr, _s.toolTipsDl);
				document.documentElement.appendChild(_s.playbackRateButtonToolTip_do.screen);
			}

			FWDRAPToolTip.setPrototype();
			_s.atbButtonToolTip_do = new FWDRAPToolTip(_s.atbButton_do,  _d.toopTipPointerUp_str, "a to b loop", _d.toolTipsBkClr, _s.toolTipsFntClr, _s.toolTipsDl);
			document.documentElement.appendChild(_s.atbButtonToolTip_do.screen);
			
			if(_s.showShareButton_bl){
				FWDRAPToolTip.setPrototype();
				_s.shareButtonToolTip_do = new FWDRAPToolTip(_s.shareButton_do,  _d.toopTipPointerUp_str, "share", _d.toolTipsBkClr, _s.toolTipsFntClr, _s.toolTipsDl);
				document.documentElement.appendChild(_s.shareButtonToolTip_do.screen);
			}
			
			if(_s.showDownloadMp3Button_bl){
				FWDRAPToolTip.setPrototype();
				_s.downloadButtonToolTip_do = new FWDRAPToolTip(_s.downloadButton_do,  _d.toopTipPointerUp_str, "download track", _d.toolTipsBkClr, _s.toolTipsFntClr, _s.toolTipsDl);
				document.documentElement.appendChild(_s.downloadButtonToolTip_do.screen);
			}
			
			if(_s.showBuyButton_bl){
				FWDRAPToolTip.setPrototype();
				_s.buyButtonToolTip_do = new FWDRAPToolTip(_s.buyButton_do,  _d.toopTipPointerUp_str, "buy track", _d.toolTipsBkClr, _s.toolTipsFntClr, _s.toolTipsDl);
				document.documentElement.appendChild(_s.buyButtonToolTip_do.screen);
			}
			
			if(_s.showPopupButton_bl){
				FWDRAPToolTip.setPrototype();
				_s.populButtonToolTip_do = new FWDRAPToolTip(_s.popupButton_do,  _d.toopTipPointerUp_str, "popup", _d.toolTipsBkClr, _s.toolTipsFntClr, _s.toolTipsDl);
				document.documentElement.appendChild(_s.populButtonToolTip_do.screen);
			}
			
			FWDRAPToolTip.setPrototype();
			_s.volumeButtonToolTip_do = new FWDRAPToolTip(_s.volumeButton_do,  _d.toopTipPointerUp_str, "mute / unmute", _d.toolTipsBkClr, _s.toolTipsFntClr, _s.toolTipsDl);
			document.documentElement.appendChild(_s.volumeButtonToolTip_do.screen);
		};
		
		_s.showToolTip = function(button, toolTip, e){
			if(!_s.showButtonsToolTips_bl) return;
			var ws = FWDRAPUtils.getViewportSize();
			var wc = FWDRAPUtils.getViewportMouseCoordinates(e);
			
			var localX = parseInt(button.getGlobalX() + button.w/2 - toolTip.w/2);
			var localY = parseInt(button.getGlobalY() - toolTip.h - 8);
			var offseX = 0;

			if(localX < 0){
				offseX = localX;
				localX = 0;
			}else if(localX + toolTip.w > ws.w){
				offseX = (ws.w - (localX + toolTip.w)) * -1;
				localX = localX + (offseX * -1);
			}
			
			if(localY < 0){
				localY += button.h + toolTip.h + 12;
				toolTip.positionPointer(offseX, true);
			}else{
				toolTip.positionPointer(offseX, false);
			}

			toolTip.setX(localX);
			toolTip.setY(localY);
			toolTip.show();
		};
		

		//################################//
		/* Setup thumb */
		//################################//
		_s.setupThumb = function(){
			_s.thumb_do = new FWDRAPDisplayObject("div");
			_s.thumb_do.screen.className = 'fwdrap-controler-thumbnail';
			_s.thumb_do.getStyle().background = "url('" + _s.thumbnailBkPath_str + "')";
			_s.thumb_do.setWidth(_s.thumbWidthAndHeight);
			_s.thumb_do.setHeight(_s.thumbWidthAndHeight);
			_s.mainHolder_do.addChild(_s.thumb_do);
		};
		
		_s.loadThumb = function(thumbPath){
			_s.positionButtons();
			if(!_d.showThumbnail_bl) return;
		
			if(!thumbPath){
				_s.cleanThumbnails(true);
				_s.thumbPath_str = "none";
				return;
			}
			
			if(_s.thumbPath_str == thumbPath) return;
			
			_s.thumbPath_str = thumbPath;
			
			if(_s.thumb_img){
				_s.thumb_img.onload = null;
				_s.thumb_img.onerror = null;
				_s.thumb_img = null;
			}
			
			if(!_s.thumbPath_str) return;
			_s.thumb_img = new Image();
			_s.thumb_img.onload = _s.thumbImageLoadComplete;
			_s.thumb_img.onerror = _s.thumbImageLoadError;
			_s.thumb_img.src = _s.thumbPath_str;
		};
		
		_s.thumbImageLoadError = function(){
			_s.cleanThumbnails(true);
		};
		
		_s.thumbImageLoadComplete = function(){
			var thumbImage_do = new FWDRAPDisplayObject("img");
			thumbImage_do.setScreen(_s.thumb_img);
			var curW = _s.thumb_img.width;
			var curH = _s.thumb_img.height;
		
			var scaleX = _s.thumbWidthAndHeight/curW;
			var scaleY = _s.thumbWidthAndHeight/curH;
			var totalScale = 0;
			
			if(scaleX >= scaleY){
				totalScale = scaleX;
			}else if(scaleX <= scaleY){
				totalScale = scaleY;
			}
	
			thumbImage_do.setWidth(parseInt((curW * totalScale)));
			thumbImage_do.setHeight(parseInt((curH * totalScale)));
			thumbImage_do.setX(parseInt((_s.thumbWidthAndHeight - thumbImage_do.w)/2));
			thumbImage_do.setY(parseInt((_s.thumbWidthAndHeight - thumbImage_do.h)/2));
			thumbImage_do.setAlpha(0);
			
			for(var i=0; i<_s.thumb_do.getNumChildren(); i++){
				var child = _s.thumb_do.getChildAt(i);
				FWDAnimation.killTweensOf(child);
			}
			
			FWDAnimation.to(thumbImage_do, .8,{alpha:1,
				alpha:1,
				delay:.2,
				ease:Expo.easeOut,
				onComplete:_s.cleanThumbnails
			});
			_s.thumb_do.addChild(thumbImage_do);
		};
		
		
		_s.cleanThumbnails = function(removeAllChildren){
			var child;
			var startIndex = removeAllChildren? 0 : 1;
			while(_s.thumb_do.getNumChildren() > startIndex){
				child = _s.thumb_do.getChildAt(0);
				FWDAnimation.killTweensOf(child);
				_s.thumb_do.removeChild(child);
				child.destroy();
			}
		};

		
		//###############################//
		/* setup disable */
		//##############################//
		_s.setupDisable = function(){
			_s.disable_do = new FWDRAPDisplayObject("div");
			if(FWDRAPUtils.isIE){
				_s.disable_do.setBkColor("#FFFFFF");
				_s.disable_do.setAlpha(0);
			}
		};

		
		//##########################################//
		/* Setup prev button */
		//#########################################//
		_s.setupPrevButton = function(){
			FWDRAPSimpleButton.setPrototype();
			if(_d.useVectorIcons){
				_s.prevButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='fwdrap-icon fwdrap-icon-FF-left'></span>",
						"fwdrap-main-button-normal-state",
						"fwdrap-main-button-selected-state"
				);
			}else{
				_s.prevButton_do = new FWDRAPSimpleButton(_s.prevN_img, _d.prevSPath_str,
					undefined,
					true,
					_s.useHEX,
					_s.nBC,
					_s.sBC);
			}
		
			_s.prevButton_do.addListener(FWDRAPSimpleButton.SHOW_TOOLTIP, _s.prevButtonShowToolTipHandler);
			_s.prevButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.prevButtonOnMouseUpHandler);
			_s.buttons_ar.push(_s.prevButton_do);
			_s.mainHolder_do.addChild(_s.prevButton_do); 
				
			if(!_s.showNextAndPrevButtons_bl){
				_s.prevButton_do.setWidth(0);
			}
		};
		
		_s.prevButtonShowToolTipHandler = function(e){
			_s.showToolTip(_s.prevButton_do, _s.prevButtonToolTip_do, e.e);
		};
		
		_s.prevButtonOnMouseUpHandler = function(){
			_s.dispatchEvent(FWDRAPController.PLAY_PREV);
		};

		
		//################################################//
		/* Setup play button */
		//################################################//
		_s.setupPlayPauseButton = function(){

			FWDRAPComplexButton.setPrototype();
			if(_d.useVectorIcons){
				_s.playPauseButton_do = new FWDRAPComplexButton(0, 0, 0, 0, true, 0, 0, 0,
					"<span class='fwdrap-icon fwdrap-icon-play'></span>",
					"<span class='fwdrap-icon fwdrap-icon-pause'></span>",
					"fwdrap-main-button-normal-state",
					"fwdrap-main-button-selected-state"
				);
			}else{
				_s.playPauseButton_do = new FWDRAPComplexButton(
						_s.playN_img,
						_d.playSPath_str,
						_s.pauseN_img,
						_d.pauseSPath_str,
						true,
						_s.useHEX,
						_s.nBC,
						_s.sBC
				);
			}
			
			_s.buttons_ar.push(_s.playPauseButton_do);
			_s.playPauseButton_do.addListener(FWDRAPComplexButton.SHOW_TOOLTIP, _s.playButtonShowToolTipHandler);
			_s.playPauseButton_do.addListener(FWDRAPComplexButton.MOUSE_UP, _s.playButtonMouseUpHandler);
			_s.mainHolder_do.addChild(_s.playPauseButton_do);
		};
		
		
		_s.playButtonShowToolTipHandler = function(e){
			_s.showToolTip(_s.playPauseButton_do, _s.playPauseToolTip_do, e.e);
		};
		
		_s.showPlayButton = function(){
			if(!_s.playPauseButton_do) return;
			_s.playPauseButton_do.setButtonState(1);
		};
		
		_s.showPauseButton = function(){
			if(!_s.playPauseButton_do) return;
			_s.playPauseButton_do.setButtonState(0);
		};
		
		_s.playButtonMouseUpHandler = function(){
			if(_s.playPauseButton_do.currentState == 0){
				_s.dispatchEvent(FWDRAPController.PAUSE);
			}else{
				_s.dispatchEvent(FWDRAPController.PLAY);
			}
		};
		

		//##########################################//
		/* Setup next button */
		//#########################################//
		_s.setupNextButton = function(){
			FWDRAPSimpleButton.setPrototype();
			if(_d.useVectorIcons){
				_s.nextButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='fwdrap-icon fwdrap-icon-FF-right'></span>",
						"fwdrap-main-button-normal-state",
						"fwdrap-main-button-selected-state"
				);
			}else{
				_s.nextButton_do = new FWDRAPSimpleButton(_s.nextN_img, _d.nextSPath_str,
					undefined,
					true,
					_s.useHEX,
					_s.nBC,
					_s.sBC);
			}
			
			_s.nextButton_do.addListener(FWDRAPSimpleButton.SHOW_TOOLTIP, _s.nextButtonShowToolTipHandler);
			_s.nextButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.nextButtonOnMouseUpHandler);	
			_s.nextButton_do.setY(parseInt((_s.sH - _s.nextButton_do.h)/2));
			_s.buttons_ar.push(_s.nextButton_do);
			_s.mainHolder_do.addChild(_s.nextButton_do); 
			
			if(!_s.showNextAndPrevButtons_bl){
				_s.nextButton_do.setWidth(0);
			}
		};
		
		_s.nextButtonShowToolTipHandler = function(e){
			_s.showToolTip(_s.nextButton_do, _s.nextButtonToolTip_do, e.e);
		};
		
		_s.nextButtonOnMouseUpHandler = function(){
			_s.dispatchEvent(FWDRAPController.PLAY_NEXT);
		};

		
		//##########################################//
		/* Setup separators */
		//#########################################//
		_s.setupSeparators = function(){
			_s.firstSeparator_do = new FWDRAPDisplayObject("img");
			_s.firstSeparator_do.setScreen(_s.separator1_img);
			_s.firstSeparator_do.screen.className = 'fwdrap-controler-separator-1';
			
			_s.secondSeparator_do = new FWDRAPDisplayObject("img");
			_s.secondSeparator_do.setScreen(_s.separator2_img);
			_s.secondSeparator_do.screen.className = 'fwdrap-controler-separator-1';
			
			_s.firstSeparator_do.setX(-10);
			_s.secondSeparator_do.setX(-10);
			_s.firstSeparator_do.setY(parseInt((_s.sH - _s.firstSeparator_do.h)/2));
			_s.secondSeparator_do.setY(parseInt((_s.sH - _s.secondSeparator_do.h)/2));
			
			_s.mainHolder_do.addChild(_s.firstSeparator_do);
			_s.mainHolder_do.addChild(_s.secondSeparator_do);
		};
		

		//################################################//
		/* Setup title bar */
		//###############################################//
		_s.setupTitlebar = function(){
			_s.mainTitlebar_do = new FWDRAPDisplayObject("div");
			_s.mainTitlebar_do.getStyle().background = "url('" + _s.titlebarBkMiddlePattern_str + "')";
			_s.mainTitlebar_do.screen.className = 'fwdrap-titlebar-background-middle';
			_s.mainTitlebar_do.setHeight(_s.titlebarHeight);

			_s.titleBarLeft_do = new FWDRAPDisplayObject("img");
			_s.titleBarLeft_do.setScreen(_s.titleBarLeft_img);
			_s.titleBarLeft_do.screen.className = 'fwdrap-titlebar-background-left';

			_s.titleBarRight_do = new FWDRAPDisplayObject("img");
			var rImg = new Image();
			rImg.src = _d.titleBarRigthPath;
			_s.titleBarRight_do.setScreen(rImg);
			_s.titleBarRight_do.setWidth(_s.titleBarLeft_do.w);
			_s.titleBarRight_do.setHeight(_s.titleBarLeft_do.h);
			_s.titleBarRight_do.screen.className = 'fwdrap-titlebar-background-right';
			
			_s.simpleText_do = new FWDRAPDisplayObject("div");
			_s.simpleText_do.screen.className = 'fwdrap-controler-title';
			_s.simpleText_do.setOverflow("visible");
			_s.simpleText_do.setBackfaceVisibility();
			_s.simpleText_do.getStyle().fontFamily = "Arial";
			_s.simpleText_do.getStyle().fontSize= "12px";
			_s.simpleText_do.getStyle().whiteSpace= "nowrap";
			_s.simpleText_do.getStyle().textAlign = "left";
			_s.simpleText_do.getStyle().color = _s.titleColor_str;
			
			_s.animText1_do = new FWDRAPDisplayObject("div");
			_s.animText1_do.screen.className = 'fwdrap-controler-title';
			_s.animText1_do.setOverflow("visible");
			_s.animText1_do.setBackfaceVisibility();
			_s.animText1_do.getStyle().fontFamily = "Arial";
			_s.animText1_do.getStyle().fontSize= "12px";
			_s.animText1_do.getStyle().whiteSpace= "nowrap";
			_s.animText1_do.getStyle().textAlign = "left";
			_s.animText1_do.getStyle().color = _s.titleColor_str;

			_s.animText2_do = new FWDRAPDisplayObject("div");
			_s.animText2_do.screen.className = 'fwdrap-controler-title';
			_s.animText2_do.setOverflow("visible");
			_s.animText2_do.setBackfaceVisibility();
			_s.animText2_do.getStyle().fontFamily = "Arial";
			_s.animText2_do.getStyle().fontSize= "12px";
			_s.animText2_do.getStyle().whiteSpace= "nowrap";
			_s.animText2_do.getStyle().textAlign = "left";
			_s.animText2_do.getStyle().color = _s.titleColor_str;
			
			_s.titleBarGradLeft_do = new FWDRAPDisplayObject("img");
			_s.titleBarGradLeft_do.setScreen(_s.titlebarLeftPath_img);
			_s.titleBarGradLeft_do.setX(-50);
			
			var titlebarGradRight_img = new Image();
			titlebarGradRight_img.src = _d.titlebarRightPath_str;
			_s.titlebarGradRight_do = new FWDRAPDisplayObject("img");
			_s.titlebarGradRight_do.setScreen(titlebarGradRight_img);
			_s.titlebarGradRight_do.setWidth(_s.titleBarGradLeft_do.w);
			_s.titlebarGradRight_do.setHeight(_s.titleBarGradLeft_do.h);
			_s.titleBarGradLeft_do.screen.className = 'fwdrap-title-bar-grad-left';
			_s.titlebarGradRight_do.screen.className = 'fwdrap-title-bar-grad-right';
			
			_s.simpleText_do.setX(7);
			_s.simpleText_do.setAlpha(0);
			
			_s.positionTitleId_to = setTimeout(positionTitle, 400);
			
			function positionTitle(){
				if(_s == null) return;
				clearTimeout(_s.positionTitleId_to);
				if(_s.simpleText_do.getHeight() == 0){
					_s.positionTitleId_to = setTimeout(positionTitle, 400);
				}else{
					_s.simpleText_do.setY(parseInt((_s.mainTitlebar_do.h - _s.simpleText_do.getHeight())/2) + 1);
					_s.animText1_do.setY(parseInt((_s.mainTitlebar_do.h - _s.simpleText_do.getHeight())/2) + 1);
					_s.animText2_do.setY(parseInt((_s.mainTitlebar_do.h - _s.simpleText_do.getHeight())/2) + 1);	
					FWDAnimation.to(_s.simpleText_do, .5, {alpha:1});
				}
			}
			
			_s.mainTitlebar_do.addChild(_s.titleBarLeft_do);
			_s.mainTitlebar_do.addChild(_s.titleBarRight_do);
			_s.mainTitlebar_do.addChild(_s.simpleText_do);
			_s.mainTitlebar_do.addChild(_s.animText1_do);
			_s.mainTitlebar_do.addChild(_s.animText2_do);
			
			_s.mainTitlebar_do.addChild(_s.titleBarGradLeft_do);
			_s.mainTitlebar_do.addChild(_s.titlebarGradRight_do);
			_s.mainHolder_do.addChild(_s.mainTitlebar_do);
		};
		
		_s.setTitle = function(title){
			_s.simpleText_do.setInnerHTML(title);
			_s.animText1_do.setInnerHTML(title + "***");
			_s.animText2_do.setInnerHTML(title + "***");
			_s.animText1_do.setX(-1000);
			_s.animText2_do.setX(-1000);
			_s.startToCheckIfAnimTitle(true);
		};

		
		//############################################//
		/* Check title animation */
		//############################################//
		_s.startToCheckIfAnimTitle = function(stopCurrentAnimation){
		
			if(stopCurrentAnimation) _s.stopToAnimateText();
			clearTimeout(_s.animateTextId_to);
			clearTimeout(_s.startToAnimateTextId_to);
			_s.animateTextId_to = setTimeout(_s.checkIfAnimTitle, 10);
		};
		
		_s.checkIfAnimTitle = function(){
			_s.posTitleGrad();
		};

		_s.posTitleGrad = function(){
			var leftWidth = _s.mainTitlebar_do.w - 12;
			var tW = _s.simpleText_do.getWidth();
			leftWidth -= _s.animationHolderWidth;
		
			if(tW > leftWidth){
				if(leftWidth < 300){
					_s.titleBarGradLeft_do.setX(-20);
					_s.titlebarGradRight_do.setX(_s.mainTitlebar_do.w - _s.titlebarGradRight_do.w + 20);
				}else{
					_s.titleBarGradLeft_do.setX(0);
					_s.titlebarGradRight_do.setX(_s.mainTitlebar_do.w - _s.titlebarGradRight_do.w);
				}
				_s.titlebarGradRight_do.setY(0);
				if(_s.isTextAnimating_bl) return;
				clearTimeout(_s.startToAnimateTextId_to);
				_s.startToAnimateTextId_to = setTimeout(_s.startToAnimateText, 300);
			}else{
				_s.titleBarGradLeft_do.setX(-500);
				_s.titlebarGradRight_do.setY(-500);
				_s.stopToAnimateText();
			}
		}
		
		_s.startToAnimateText = function(){
			if(_s.isTextAnimating_bl) return;
			
			_s.isTextAnimating_bl = true;
			_s.animTextWidth = _s.animText1_do.getWidth();
			
			_s.simpleText_do.setX(-1000);
			
			_s.animText1_do.setX(_s.animationHolderWidth + 5);
			_s.animText2_do.setX(_s.animationHolderWidth + _s.animTextWidth + 10);
		
			clearInterval(_s.animateTextId_int);
			_s.animateTextId_int = setInterval(_s.animateText, 40);
		};
		
		_s.stopToAnimateText = function(){
			if(!_s.isTextAnimating_bl) return;
			_s.isTextAnimating_bl = false;
			
			_s.simpleText_do.setX(_s.animationHolderWidth + 7);
		
			_s.animText1_do.setX(-1000);
			_s.animText2_do.setX(-1000);
			
			clearInterval(_s.animateTextId_int);
		};
		
		_s.animateText = function(){
			_s.animText1_do.setX(_s.animText1_do.x - 1);
			_s.animText2_do.setX(_s.animText2_do.x - 1);
			
			if(_s.animText1_do.x < - (_s.animTextWidth - _s.animationHolderWidth))  _s.animText1_do.setX(_s.animText2_do.x  +  _s.animTextWidth + 5);
			if(_s.animText2_do.x < - (_s.animTextWidth - _s.animationHolderWidth))  _s.animText2_do.setX(_s.animText1_do.x  +  _s.animTextWidth + 5);
		};
		
	
		//################################################//
		/* Setup main scrubber */
		//################################################//
		_s.setupMainScrubber = function(){
			//setup background bar
			_s.mainScrubber_do = new FWDRAPDisplayObject("div");
			_s.mainScrubber_do.setY(parseInt((_s.sH - _s.scrubbersHeight)/2));
			_s.mainScrubber_do.setHeight(_s.scrubbersHeight);
			
			_s.mainScrubberBkLeft_do = new FWDRAPDisplayObject("img");
			_s.mainScrubberBkLeft_do.setScreen(_s.mainScrubberBkLeft_img);
			_s.mainScrubberBkLeft_do.screen.className = 'fwdrap-scrubber-bk-left';
			
			_s.mainScrubberBkRight_do = new FWDRAPDisplayObject("img");
			_s.mainScrubberBkRight_do.setScreen(_s.mainScrubberBkRight_img);
			_s.mainScrubberBkRight_do.screen.className = 'fwdrap-scrubber-bk-right';
			
			var middleImage = new Image();
			middleImage.src = _s.mainScrubberBkMiddlePath_str;
			
			_s.mainScrubberBkMiddle_do = new FWDRAPDisplayObject("div");	
			_s.mainScrubberBkMiddle_do.getStyle().background = "url('" + _s.mainScrubberBkMiddlePath_str + "')";
			_s.mainScrubberBkMiddle_do.screen.className = 'fwdrap-scrubber-bk-middle';

			_s.mainScrubberBkMiddle_do.setHeight(_s.scrubbersHeight);
			_s.mainScrubberBkMiddle_do.setX(_s.scrubbersBkLeftAndRightWidth);
			
			//setup progress bar
			_s.mainProgress_do = new FWDRAPDisplayObject("div");
			_s.mainProgress_do.setHeight(_s.scrubbersHeight);
		
			_s.progressLeft_do = new FWDRAPDisplayObject("img");
			_s.progressLeft_do.setScreen(_s.mainScrubberLeftProgress_img);
			
			middleImage = new Image();
			middleImage.src = _s.progressMiddlePath_str;
			
			_s.progressMiddle_do = new FWDRAPDisplayObject("div");	
			_s.progressMiddle_do.screen.className = 'fwdrap-progress-middle';
			_s.progressMiddle_do.getStyle().background = "url('" + _s.progressMiddlePath_str + "')";
			
			_s.progressMiddle_do.setHeight(_s.scrubbersHeight);
			_s.progressMiddle_do.setX(_s.mainScrubberDragLeftWidth);
			
			//setup darg bar.
			_s.mainScrubberDrag_do = new FWDRAPDisplayObject("div");
			_s.mainScrubberDrag_do.setHeight(_s.scrubbersHeight);
		
			if(_s.useHEX){
				_s.mainScrubberDragLeft_do = new FWDRAPDisplayObject("div");
				_s.mainScrubberDragLeft_do.setWidth(_s.mainScrubberDragLeft_img.width);
				_s.mainScrubberDragLeft_do.setHeight(_s.mainScrubberDragLeft_img.height);
				_s.mainScrubberDragLeft_canvas = FWDRAPUtils.getCanvasWithModifiedColor(_s.mainScrubberDragLeft_img, _s.nBC).canvas;
				_s.mainScrubberDragLeft_do.screen.appendChild(_s.mainScrubberDragLeft_canvas);	
				
			}else{
				_s.mainScrubberDragLeft_do = new FWDRAPDisplayObject("img");
				_s.mainScrubberDragLeft_do.setScreen(_s.mainScrubberDragLeft_img);
			}
			
			_s.mainScrubberMiddleImage = new Image();
			_s.mainScrubberMiddleImage.src = _s.mainScrubberDragMiddlePath_str;
			_s.volumeScrubberDragMiddle_do = new FWDRAPDisplayObject("div");
			
			if(_s.useHEX){
				_s.mainScrubberDragMiddle_do = new FWDRAPDisplayObject("div");
				_s.mainScrubberMiddleImage.onload = function(){
					var testCanvas = FWDRAPUtils.getCanvasWithModifiedColor(_s.mainScrubberMiddleImage, _s.nBC, true);
					_s.mainSCrubberMiddleCanvas = testCanvas.canvas;
					_s.mainSCrubberDragMiddleImageBackground = testCanvas.image;
					_s.mainScrubberDragMiddle_do.getStyle().background = "url('" + _s.mainSCrubberDragMiddleImageBackground.src + "') repeat-x";
				}
			}else{
				_s.mainScrubberDragMiddle_do = new FWDRAPDisplayObject("div");	
				_s.mainScrubberDragMiddle_do.getStyle().background = "url('" + _s.mainScrubberDragMiddlePath_str + "') repeat-x";
			}
			
			_s.mainScrubberDragMiddle_do.setHeight(_s.scrubbersHeight);
			_s.mainScrubberDragMiddle_do.setX(_s.mainScrubberDragLeftWidth);
			_s.mainScrubberBarLine_do = new FWDRAPDisplayObject("img");
			_s.mainScrubberBarLine_do.setScreen(_s.mainScrubberLine_img);
			_s.mainScrubberBarLine_do.setAlpha(0);
			_s.mainScrubberBarLine_do.hasTransform3d_bl = false;
			_s.mainScrubberBarLine_do.hasTransform2d_bl = false;
			_s.mainScrubberBarLine_do.screen.className = 'fwdrap-scrubber-line';
			
			//add all children
			_s.mainScrubber_do.addChild(_s.mainScrubberBkLeft_do);
			_s.mainScrubber_do.addChild(_s.mainScrubberBkMiddle_do);
			_s.mainScrubber_do.addChild(_s.mainScrubberBkRight_do);
			_s.mainScrubberDrag_do.addChild(_s.mainScrubberDragLeft_do);
			_s.mainScrubberDrag_do.addChild(_s.mainScrubberDragMiddle_do);
			_s.mainProgress_do.addChild(_s.progressLeft_do);
			_s.mainProgress_do.addChild(_s.progressMiddle_do);
			_s.mainScrubber_do.addChild(_s.mainProgress_do);
			_s.mainScrubber_do.addChild(_s.mainScrubberDrag_do);
			_s.mainScrubber_do.addChild(_s.mainScrubberBarLine_do);
			_s.mainHolder_do.addChild(_s.mainScrubber_do);
		
			if(!_s.disableScrubber_bl){
				if(_s.hasPointerEvent_bl){
					_s.mainScrubber_do.screen.addEventListener("pointerover", _s.mainScrubberOnOverHandler);
					_s.mainScrubber_do.screen.addEventListener("pointerout", _s.mainScrubberOnOutHandler);
					_s.mainScrubber_do.screen.addEventListener("pointerdown", _s.mainScrubberOnDownHandler);
				}else if(_s.screen.addEventListener){	
					if(!_s.isMbl){
						_s.mainScrubber_do.screen.addEventListener("mouseover", _s.mainScrubberOnOverHandler);
						_s.mainScrubber_do.screen.addEventListener("mousemove", _s.updateTooltipOnMove);
						_s.mainScrubber_do.screen.addEventListener("mouseout", _s.mainScrubberOnOutHandler);
						_s.mainScrubber_do.screen.addEventListener("mousedown", _s.mainScrubberOnDownHandler);
					}
					_s.mainScrubber_do.screen.addEventListener("touchstart", _s.mainScrubberOnDownHandler);
				}
			}
			
			_s.disableMainScrubber();

			if(_d.showMainScrubberToolTipLabel_bl){
				FWDRAPScrubberTooltip.setPrototype();
				_s.ttm = new FWDRAPScrubberTooltip(_s.mainScrubber_do, _d.scrubbersToolTipLabelBackgroundColor, _d.scrubbersToolTipLabelFontColor, '00:00');
				_s.addChild(_s.ttm);
			}
		};
		
		_s.updateToolTip = function(localX, percentScrubbed){
			if(!_d.showMainScrubberToolTipLabel_bl || isNaN(percentScrubbed)) return;
			_s.ttm.setLabel(FWDRAPUtils.formatTime(Math.round(prt.totalDuration * percentScrubbed)));
			_s.ttm.setX(Math.round(_s.mainScrubber_do.x + localX - _s.ttm.getWidth()/2));
			var y;
			if(_s.isFullScreen_bl){
				y = _s.videoControllerHolder_do.y + _s.mainScrubber_do.y - _s.ttm2.h - 4;
			}else{
				y = _s.mainScrubber_do.y - _s.ttm.h - 4;
			}
			_s.ttm.setY(y);
		}

		_s.updateTooltipOnMove = function(e){
			var viewportMouseCoordinates = FWDRAPUtils.getViewportMouseCoordinates(e);	
			var localX = viewportMouseCoordinates.screenX - _s.mainScrubber_do.getGlobalX();
			
			if(localX < 0){
				localX = 0;
			}else if(localX > _s.mainScrubberWidth - _s.scrubbersOffsetWidth){
				localX = _s.mainScrubberWidth - _s.scrubbersOffsetWidth;
			}
			var percentScrubbed = localX/_s.mainScrubberWidth;

			_s.updateToolTip(localX, percentScrubbed);
		}

		_s.mainScrubberOnOverHandler =  function(e){
			if(_s.isMainScrubberDisabled_bl) return;
			if(_d.showMainScrubberToolTipLabel_bl && prt.totalDuration != 0) _s.ttm.show();
			if(!_s.isMbl && _s.ttm){
				window.addEventListener('mousemove', _s.mainScrubberWMouseMove);
			}
			var viewportMouseCoordinates = FWDRAPUtils.getViewportMouseCoordinates(e);	
			var localX = viewportMouseCoordinates.screenX - _s.mainScrubber_do.getGlobalX();
		
			if(localX < 0){
				localX = 0;
			}else if(localX > _s.mainScrubberWidth - _s.scrubbersOffsetWidth){
				localX = _s.mainScrubberWidth - _s.scrubbersOffsetWidth;
			}
			var percentScrubbed = localX/_s.mainScrubberWidth;

			_s.updateToolTip(localX, percentScrubbed);
		};

		_s.mainScrubberWMouseMove = function(e){
			var wc = FWDRAPUtils.getViewportMouseCoordinates(e);
			_s.vcX = wc.screenX;
			_s.vcY = wc.screenY;
			
			if(!FWDRAPUtils.hitTest(_s.mainScrubber_do.screen, _s.vcX, _s.vcY)){
				if(!_s.isMainScrubberScrubbing_bl){
					window.removeEventListener('mousemove', _s.mainScrubberWMouseMove);
					_s.ttm.hide();
				} 
			}
			var viewportMouseCoordinates = FWDRAPUtils.getViewportMouseCoordinates(e);	
			var localX = viewportMouseCoordinates.screenX - _s.mainScrubber_do.getGlobalX();
			
			if(localX < 0){
				localX = 0;
			}else if(localX > _s.mainScrubberWidth - _s.scrubbersOffsetWidth){
				localX = _s.mainScrubberWidth - _s.scrubbersOffsetWidth;
			}
			var percentScrubbed = localX/_s.mainScrubberWidth;
			_s.updateToolTip(localX, percentScrubbed);
		}
		
		_s.mainScrubberOnOutHandler =  function(e){
			if(_s.isMainScrubberDisabled_bl) return;
			if(!_s.isMainScrubberScrubbing_bl){
				if(_s.ttm) _s.ttm.hide();
			}
		};
		
		_s.mainScrubberOnDownHandler =  function(e){
			
			if(_s.isMainScrubberDisabled_bl) return;
			if(e.preventDefault) e.preventDefault();
			_s.isMainScrubberScrubbing_bl = true;
			var viewportMouseCoordinates = FWDRAPUtils.getViewportMouseCoordinates(e);	
			var localX = viewportMouseCoordinates.screenX - _s.mainScrubber_do.getGlobalX();
			
			if(localX < 0){
				localX = 0;
			}else if(localX > _s.mainScrubberWidth - _s.scrubbersOffsetWidth){
				localX = _s.mainScrubberWidth - _s.scrubbersOffsetWidth;
			}	
			var percentScrubbed = localX/_s.mainScrubberWidth;
			var playlistItemPercentScrubb = localX/_s.mainScrubberWidth;
			
			if(_s.disable_do) _s.addChild(_s.disable_do);
			if(_d.showMainScrubberToolTipLabel_bl) _s.ttm.show();
			_s.updateMainScrubber(percentScrubbed);
			_s.updateToolTip(localX, percentScrubbed);
		
			_s.dispatchEvent(FWDRAPController.START_TO_SCRUB);
			_s.dispatchEvent(FWDRAPController.SCRUB_PLAYLIST_ITEM, {percent:playlistItemPercentScrubb});
			_s.dispatchEvent(FWDRAPController.SCRUB, {percent:percentScrubbed});
			
			if(_s.hasPointerEvent_bl){
				window.addEventListener("pointermove", _s.mainScrubberMoveHandler);
				window.addEventListener("pointerup", _s.mainScrubberEndHandler);
			}else{
				window.addEventListener("mousemove", _s.mainScrubberMoveHandler);
				window.addEventListener("mouseup", _s.mainScrubberEndHandler);		
				window.addEventListener("touchmove", _s.mainScrubberMoveHandler, {passive:false});
				window.addEventListener("touchend", _s.mainScrubberEndHandler);
			}
		};
		
		_s.mainScrubberMoveHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			var wc = FWDRAPUtils.getViewportMouseCoordinates(e);
			_s.vcX = wc.screenX;
			_s.vcY = wc.screenY;
			if(!FWDRAPUtils.hitTest(_s.mainScrubber_do.screen, _s.vcX, _s.vcY)){
				if(!_s.isMainScrubberScrubbing_bl){
					window.removeEventListener('mousemove', _s.mainScrubberWMouseMove);
					_s.ttm.hide();
				} 
			}

			var viewportMouseCoordinates = FWDRAPUtils.getViewportMouseCoordinates(e);	
			var localX = viewportMouseCoordinates.screenX - _s.mainScrubber_do.getGlobalX();
			
			if(localX < 0){
				localX = 0;
			}else if(localX > _s.mainScrubberWidth - _s.scrubbersOffsetWidth){
				localX = _s.mainScrubberWidth - _s.scrubbersOffsetWidth;
			}
			
			var percentScrubbed = localX/_s.mainScrubberWidth;
			var playlistItemPercentScrubb = localX/_s.mainScrubberWidth;
			
			_s.updateToolTip(localX, percentScrubbed);
			_s.updateMainScrubber(percentScrubbed);
			_s.dispatchEvent(FWDRAPController.SCRUB_PLAYLIST_ITEM, {percent:playlistItemPercentScrubb});
			_s.dispatchEvent(FWDRAPController.SCRUB, {percent:percentScrubbed});
		};
		
		_s.mainScrubberEndHandler = function(e){
			if(_s.disable_do){
				if(_s.contains(_s.disable_do)) _s.removeChild(_s.disable_do);
			}
		
			_s.isMainScrubberScrubbing_bl = false;
			if(e){
				var wp = FWDRAPUtils.getViewportMouseCoordinates(e);
				if(!FWDRAPUtils.hitTest(_s.mainScrubber_do.screen, wp.screenX, wp.screenY)){
					if(_s.ttm) _s.ttm.hide();
				}
			}
			_s.dispatchEvent(FWDRAPController.STOP_TO_SCRUB);
			if(_s.hasPointerEvent_bl){
				window.removeEventListener("pointermove", _s.mainScrubberMoveHandler);
				window.removeEventListener("pointerup", _s.mainScrubberEndHandler);
			}else{
				window.removeEventListener("mousemove", _s.mainScrubberMoveHandler);
				window.removeEventListener("mouseup", _s.mainScrubberEndHandler);		
				window.removeEventListener("touchmove", _s.mainScrubberMoveHandler);
				window.removeEventListener("touchend", _s.mainScrubberEndHandler);
			}
		};
		
		_s.disableMainScrubber = function(){
			if(!_s.mainScrubber_do) return;
			_s.isMainScrubberDisabled_bl = true;
			_s.mainScrubber_do.setButtonMode(false);
			_s.updateMainScrubber(0);
			_s.updatePreloaderBar(0);
			_s.mainScrubberEndHandler();
		};
		
		_s.enableMainScrubber = function(){
			if(!_s.mainScrubber_do) return;
			_s.isMainScrubberDisabled_bl = false;
			if(!_s.disableScrubber_bl) _s.mainScrubber_do.setButtonMode(true);
			_s.enableAtbButton();
		};
		
		_s.updateMainScrubber = function(percent){
		
			if(!_s.mainScrubber_do || isNaN(percent)) return;
			var finalWidth = parseInt(percent * _s.mainScrubberWidth); 

			_s.percentPlayed = percent;
			
			if(finalWidth < 1 && _s.isMainScrubberLineVisible_bl){
				_s.isMainScrubberLineVisible_bl = false;
				FWDAnimation.to(_s.mainScrubberBarLine_do, .5, {alpha:0});
			}else if(finalWidth > 2 && !_s.isMainScrubberLineVisible_bl){
				_s.isMainScrubberLineVisible_bl = true;
				FWDAnimation.to(_s.mainScrubberBarLine_do, .5, {alpha:1});
			}
			
			_s.mainScrubberDrag_do.setWidth(finalWidth);
			if(finalWidth > _s.mainScrubberWidth - _s.scrubbersOffsetWidth) finalWidth = _s.mainScrubberWidth - _s.scrubbersOffsetWidth;
			FWDAnimation.to(_s.mainScrubberBarLine_do, .8, {x:finalWidth, ease:Expo.easeOut});
		};
		
		_s.updatePreloaderBar = function(percent){
			
			if(!_s.mainProgress_do) return;
			var finalWidth = parseInt(percent * _s.mainScrubberWidth); 
			
			if(percent == 1){
				_s.mainProgress_do.setY(-30);
			}else if(_s.mainProgress_do.y != 0 && percent!= 1){
				_s.mainProgress_do.setY(0);
			}
			if(finalWidth > _s.mainScrubberWidth - _s.scrubbersOffsetWidth) finalWidth = _s.mainScrubberWidth - _s.scrubbersOffsetWidth;
			if(finalWidth < 0) finalWidth = 0;
			_s.mainProgress_do.setWidth(finalWidth);
		};

		
		//########################################//
		/* Setup time*/
		//########################################//
		_s.setupTime = function(){
			_s.currentTime_do = new FWDRAPDisplayObject("div");
			_s.currentTime_do.hasTransform3d_bl = false;
			_s.currentTime_do.hasTransform2d_bl = false;
			_s.currentTime_do.screen.className = 'fwdrap-controller-time';
			_s.currentTime_do.getStyle().fontFamily = "Arial";
			_s.currentTime_do.getStyle().fontSize= "12px";
			_s.currentTime_do.getStyle().whiteSpace= "nowrap";
			_s.currentTime_do.getStyle().textAlign = "left";
			_s.currentTime_do.getStyle().color = _s.timeColor_str;
			_s.currentTime_do.getStyle().fontSmoothing = "antialiased";
			_s.currentTime_do.getStyle().webkitFontSmoothing = "antialiased";
			_s.currentTime_do.getStyle().textRendering = "optimizeLegibility";	
			_s.currentTime_do.setInnerHTML("00");
			_s.mainHolder_do.addChild(_s.currentTime_do);
			
			_s.totalTime_do = new FWDRAPDisplayObject("div");
			_s.totalTime_do.hasTransform3d_bl = false;
			_s.totalTime_do.hasTransform2d_bl = false;
			_s.totalTime_do.screen.className = 'fwdrap-controller-time';
			_s.totalTime_do.getStyle().fontFamily = "Arial";
			_s.totalTime_do.getStyle().fontSize= "12px";
			_s.totalTime_do.getStyle().whiteSpace= "nowrap";
			_s.totalTime_do.getStyle().textAlign = "right";
			_s.totalTime_do.getStyle().color = _s.timeColor_str;
			_s.totalTime_do.getStyle().fontSmoothing = "antialiased";
			_s.totalTime_do.getStyle().webkitFontSmoothing = "antialiased";
			_s.totalTime_do.getStyle().textRendering = "optimizeLegibility";	
			_s.mainHolder_do.addChild(_s.totalTime_do);
			
			_s.updateTime();
			setTimeout(function(){
				if(_s == null) return;
				_s.timeHeight = _s.currentTime_do.getHeight();
				_s.currentTime_do.h = _s.timeHeight;
				_s.totalTime_do.h = _s.timeHeight;
				_s.sW = prt.sW;
				_s.positionButtons();
			}, 100);
		};
		
		_s.updateTime = function(currentTime, totalTime){
			
			if(!_s.currentTime_do || !totalTime) return;
			
			if(totalTime == "00:00") totalTime = currentTime;
			
			_s.currentTime_do.setInnerHTML(currentTime);
			_s.totalTime_do.setInnerHTML(totalTime);
			
			if(currentTime.length != _s.lastTotalTimeLength
			  || totalTime.length != _s.lastCurTimeLength){
				var currentTimeTempW = _s.currentTime_do.offsetWidth;
				var totalTimeTempW = _s.totalTime_do.offsetWidth;
				
				_s.currentTime_do.w = currentTimeTempW;
				_s.totalTime_do.w = totalTimeTempW;
				
				_s.positionButtons();
				
				setTimeout(function(){
					_s.currentTime_do.w = _s.currentTime_do.getWidth();
					_s.totalTime_do.w = _s.totalTime_do.getWidth();
					_s.positionButtons();
				}, 50);
			
				_s.lastCurTimeLength = currentTime.length;
				_s.lastTotalTimeLength = totalTime.length;
			}
		};

		
		//################################################//
		/* Setup volume scrubber */
		//################################################//
		_s.setupVolumeScrubber = function(){
			
			_s.mainVolumeHolder_do =  new FWDRAPDisplayObject("div");
			if(_s.volumeN_img) _s.mainVolumeHolder_do.setHeight(_s.volumeN_img.height);
			_s.mainHolder_do.addChild(_s.mainVolumeHolder_do);
			
			//setup volume button
			FWDRAPSimpleButton.setPrototype();
			if(_d.useVectorIcons){
				_s.volumeButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='fwdrap-icon fwdrap-icon-sound'></span>",
						"fwdrap-main-button-normal-state",
						"fwdrap-main-button-selected-state"
				);
				setTimeout(function(){
					_s.mainVolumeHolder_do.setHeight(_s.volumeButton_do.h);
					_s.volumeScrubber_do.setY(parseInt((_s.volumeButton_do.h - _s.scrubbersHeight)/2));
				}, 300);
			}else{
				_s.volumeButton_do = new FWDRAPSimpleButton(_s.volumeN_img, _d.volumeSPath_str, _d.volumeDPath_str,
						true,
						_s.useHEX,
						_s.n2BC,
						_s.sBC);
			}
			_s.volumeButton_do.addListener(FWDRAPSimpleButton.SHOW_TOOLTIP, _s.volumeButtonShowToolTipHandler);
			_s.volumeButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.volumeButtonOnMouseUpHandler);
			if(!_s.allowToChangeVolume_bl) _s.volumeButton_do.disable();
					
			//setup background bar
			_s.volumeScrubber_do = new FWDRAPDisplayObject("div");
			_s.volumeScrubber_do.setHeight(_s.scrubbersHeight);
			_s.volumeScrubber_do.setX(_s.volumeButton_do.w);
			_s.volumeScrubber_do.setY(parseInt((_s.volumeButton_do.h - _s.scrubbersHeight)/2));
			
			_s.volumeScrubberBkLeft_do = new FWDRAPDisplayObject("img");
			var volumeScrubberBkLeft_img = new Image();
			volumeScrubberBkLeft_img.src = _s.mainScrubberBkLeft_do.screen.src;
			_s.volumeScrubberBkLeft_do.setScreen(volumeScrubberBkLeft_img);
			_s.volumeScrubberBkLeft_do.setWidth(_s.mainScrubberBkLeft_do.w);
			_s.volumeScrubberBkLeft_do.setHeight(_s.mainScrubberBkLeft_do.h);
			_s.volumeScrubberBkLeft_do.screen.className = 'fwdrap-scrubber-bk-left';
			
			_s.volumeScrubberBkRight_do = new FWDRAPDisplayObject("img");
			var volumeScrubberBkRight_img = new Image();
			volumeScrubberBkRight_img.src = _s.mainScrubberBkRight_do.screen.src;
			_s.volumeScrubberBkRight_do.setScreen(volumeScrubberBkRight_img);
			_s.volumeScrubberBkRight_do.setWidth(_s.mainScrubberBkRight_do.w);
			_s.volumeScrubberBkRight_do.setHeight(_s.mainScrubberBkRight_do.h);
			_s.volumeScrubberBkRight_do.screen.className = 'fwdrap-scrubber-bk-right';

			var middleImage = new Image();
			middleImage.src = _s.volumeScrubberBkMiddlePath_str;
	
			_s.volumeScrubberBkMiddle_do = new FWDRAPDisplayObject("div");	
			_s.volumeScrubberBkMiddle_do.screen.className = 'fwdrap-scrubber-bk-middle';
			_s.volumeScrubberBkMiddle_do.getStyle().background = "url('" + _s.volumeScrubberBkMiddlePath_str + "')";
				
			_s.volumeScrubberBkMiddle_do.setHeight(_s.scrubbersHeight);
			_s.volumeScrubberBkMiddle_do.setX(_s.scrubbersBkLeftAndRightWidth);
			
			//setup darg bar.
			_s.volumeScrubberDrag_do = new FWDRAPDisplayObject("div");
			_s.volumeScrubberDrag_do.setHeight(_s.scrubbersHeight);
		
			if(_s.useHEX){
				_s.volumeScrubberDragLeft_do = new FWDRAPDisplayObject("div");
				_s.volumeScrubberDragLeft_do.setWidth(_s.volumeScrubberDragLeft_img.width);
				_s.volumeScrubberDragLeft_do.setHeight(_s.volumeScrubberDragLeft_img.height);
				_s.volumeScrubberDragLeft_canvas = FWDRAPUtils.getCanvasWithModifiedColor(_s.volumeScrubberDragLeft_img, _s.n2BC).canvas;
				_s.volumeScrubberDragLeft_do.screen.appendChild(_s.volumeScrubberDragLeft_canvas);	
			}else{
				_s.volumeScrubberDragLeft_do = new FWDRAPDisplayObject("img");
				_s.volumeScrubberDragLeft_do.setScreen(_s.volumeScrubberDragLeft_img);
			}

			if(_s.useHEX){
				_s.mainScrubberVolMiddleImage = new Image();
				_s.mainScrubberVolMiddleImage.src = _s.mainScrubberDragMiddlePath_str;
				
				_s.mainScrubberVolMiddleImage.onload = function(){
					var testCanvas = FWDRAPUtils.getCanvasWithModifiedColor(_s.mainScrubberVolMiddleImage, _s.nBC, true);
					_s.mainSCrubberVolMiddleCanvas = testCanvas.canvas;
					_s.mainSCrubberVolDragMiddleImageBackground = testCanvas.image;
					_s.volumeScrubberDragMiddle_do.getStyle().background = "url('" + _s.mainSCrubberVolDragMiddleImageBackground.src + "') repeat-x";
					
				}
			}else{
				_s.volumeScrubberDragMiddle_do = new FWDRAPDisplayObject("div");	
				_s.volumeScrubberDragMiddle_do.getStyle().background = "url('" + _s.volumeScrubberDragMiddlePath_str + "') repeat-x";
			}
		
			_s.volumeScrubberDragMiddle_do.setHeight(_s.scrubbersHeight);
			_s.volumeScrubberDragMiddle_do.setX(_s.mainScrubberDragLeftWidth);
		
			_s.volumeScrubberBarLine_do = new FWDRAPDisplayObject("img");
			var volumeScrubberBarLine_img = new Image();
			volumeScrubberBarLine_img.src = _s.mainScrubberBarLine_do.screen.src;
			_s.volumeScrubberBarLine_do.setScreen(volumeScrubberBarLine_img);
			_s.volumeScrubberBarLine_do.setWidth(_s.mainScrubberBarLine_do.w);
			_s.volumeScrubberBarLine_do.setHeight(_s.mainScrubberBarLine_do.h);
			_s.volumeScrubberBarLine_do.setAlpha(0);
			_s.volumeScrubberBarLine_do.hasTransform3d_bl = false;
			_s.volumeScrubberBarLine_do.hasTransform2d_bl = false;
			_s.volumeScrubberBarLine_do.screen.className = 'fwdrap-scrubber-line';
			
			//add all children
			_s.volumeScrubber_do.addChild(_s.volumeScrubberBkLeft_do);
			_s.volumeScrubber_do.addChild(_s.volumeScrubberBkMiddle_do);
			_s.volumeScrubber_do.addChild(_s.volumeScrubberBkRight_do);
			_s.volumeScrubber_do.addChild(_s.volumeScrubberBarLine_do);
			_s.volumeScrubberDrag_do.addChild(_s.volumeScrubberDragLeft_do);
			_s.volumeScrubberDrag_do.addChild(_s.volumeScrubberDragMiddle_do);
			_s.volumeScrubber_do.addChild(_s.volumeScrubberDrag_do);
			_s.volumeScrubber_do.addChild(_s.volumeScrubberBarLine_do);
			_s.mainVolumeHolder_do.addChild(_s.volumeButton_do); 
			_s.mainVolumeHolder_do.addChild(_s.volumeScrubber_do);
	
			if(_s.allowToChangeVolume_bl){
				if(_s.isMbl){
					if(_s.hasPointerEvent_bl){
						_s.volumeScrubber_do.screen.addEventListener("pointerover", _s.volumeScrubberOnOverHandler);
						_s.volumeScrubber_do.screen.addEventListener("pointerout", _s.volumeScrubberOnOutHandler);
						_s.volumeScrubber_do.screen.addEventListener("pointerdown", _s.volumeScrubberOnDownHandler);
					}else{
						_s.volumeScrubber_do.screen.addEventListener("touchstart", _s.volumeScrubberOnDownHandler);
					}
				}else if(_s.screen.addEventListener){	
					_s.volumeScrubber_do.screen.addEventListener("mouseover", _s.volumeScrubberOnOverHandler);
					_s.volumeScrubber_do.screen.addEventListener("mouseout", _s.volumeScrubberOnOutHandler);
					_s.volumeScrubber_do.screen.addEventListener("mousedown", _s.volumeScrubberOnDownHandler);
				}
			}

			if(_d.showMainScrubberToolTipLabel_bl){
				FWDRAPScrubberTooltip.setPrototype();
				_s.ttm2 = new FWDRAPScrubberTooltip(_s.volumeScrubber_do, _d.scrubbersToolTipLabelBackgroundColor, _d.scrubbersToolTipLabelFontColor, '10');
				_s.addChild(_s.ttm2);
			}
			
			_s.enableVolumeScrubber();
			_s.updateVolumeScrubber(_s.volume);
		};

		_s.updateVolumeToolTip = function(e){
			if(!_d.showMainScrubberToolTipLabel_bl) return;
			
			_s.ttm2.setLabel(Math.round(_s.volume * 100));

			var viewportMouseCoordinates = FWDRAPUtils.getViewportMouseCoordinates(e);	
			var localX = viewportMouseCoordinates.screenX - _s.mainVolumeHolder_do.getGlobalX();
			if(localX < 0){
				localX = 0;
			}else if(localX > _s.mainScrubberWidth - _s.scrubbersOffsetWidth){
				localX = _s.mainScrubberWidth - _s.scrubbersOffsetWidth;
			}
	
			var y;
			if(_s.isFullScreen_bl){
				y = _s.videoControllerHolder_do.y + _s.volumeScrubber_do.y - _s.ttm2.h - 4;
			}else{
				y = _s.volumeScrubber_do.getGlobalY() - _s.getGlobalY() - _s.ttm2.h - 4;
			}
			
			_s.ttm2.setX(getX());
			_s.ttm2.setY(y);
		
			clearTimeout(_s.setVolTooltipId_to);
			_s.setVolTooltipId_to = setTimeout(function(){
				_s.ttm2.setX(getX());
			},200)

			function getX(){
				if(_s.isFullScreen_bl){
					var x = _s.volumeScrubber_do.x;
				}else{
					var x = _s.mainVolumeHolder_do.x + _s.volumeScrubber_do.x;
				}
				
				x = Math.round(x + (_s.volume * _s.volumeScrubberWidth) - _s.ttm2.getWidth()/2);
				return x;
			}
		}
		
		_s.volumeButtonShowToolTipHandler = function(e){
			_s.showToolTip(_s.volumeButton_do, _s.volumeButtonToolTip_do, e);
		};
		
		_s.volumeButtonOnMouseUpHandler = function(){
			var vol = _s.lastVolume;
			
			if(_s.isMute_bl){
				vol = _s.lastVolume;
				_s.isMute_bl = false;
			}else{
				vol = 0.000001;
				_s.isMute_bl = true;
			};
			
			_s.updateVolume(vol);
		};
		
		_s.volumeScrubberOnOverHandler =  function(e){
			if(_s.isVolumeScrubberDisabled_bl) return;
			if(_d.showMainScrubberToolTipLabel_bl) _s.ttm2.show();
			_s.updateVolumeToolTip(e);
		};
		
		_s.volumeScrubberOnOutHandler =  function(e){
			if(_s.isVolumeScrubberDisabled_bl) return;
			if(!_s.isVolumeScrubberScrubbing_bl){
				if(_s.ttm2) _s.ttm2.hide();
			}
		};
		
		_s.volumeScrubberOnDownHandler =  function(e){
			if(_s.isVolumeScrubberDisabled_bl) return;
			if(e.preventDefault) e.preventDefault();
			var viewportMouseCoordinates = FWDRAPUtils.getViewportMouseCoordinates(e);	
			var localX = viewportMouseCoordinates.screenX - _s.volumeScrubber_do.getGlobalX();
			_s.isVolumeScrubberScrubbing_bl = true;
			if(localX < 0){
				localX = 0;
			}else if(localX > _s.volumeScrubberWidth - _s.scrubbersOffsetWidth){
				localX = _s.volumeScrubberWidth - _s.scrubbersOffsetWidth;
			}
			
			var percentScrubbed = localX/(_s.volumeScrubberWidth - _s.scrubbersOffsetWidth);
			
			if(_s.disable_do) _s.addChild(_s.disable_do);
			_s.lastVolume = percentScrubbed;
			_s.updateVolume(percentScrubbed);
			if(_d.showMainScrubberToolTipLabel_bl) _s.ttm2.show();
			_s.updateVolumeToolTip(e);
			_s.dispatchEvent(FWDRAPController.VOLUME_START_TO_SCRUB);
			
			if(_s.isMbl){
				if(_s.hasPointerEvent_bl){
					window.addEventListener("pointermove", _s.volumeScrubberMoveHandler);
					window.addEventListener("pointerup", _s.volumeScrubberEndHandler);
				}else{
					window.addEventListener("touchmove", _s.volumeScrubberMoveHandler);
					window.addEventListener("touchend", _s.volumeScrubberEndHandler);
				}
			}else{
				window.addEventListener("mousemove", _s.volumeScrubberMoveHandler);
				window.addEventListener("mouseup", _s.volumeScrubberEndHandler);		
			}
		};
		
		_s.volumeScrubberMoveHandler = function(e){
			if(_s.isVolumeScrubberDisabled_bl) return;
			if(e.preventDefault) e.preventDefault();
			var viewportMouseCoordinates = FWDRAPUtils.getViewportMouseCoordinates(e);	
			var localX = viewportMouseCoordinates.screenX - _s.volumeScrubber_do.getGlobalX();
			
			if(localX < 0){
				localX = 0;
			}else if(localX > _s.volumeScrubberWidth - _s.scrubbersOffsetWidth){
				localX = _s.volumeScrubberWidth - _s.scrubbersOffsetWidth;
			}
			var percentScrubbed = localX/(_s.volumeScrubberWidth - _s.scrubbersOffsetWidth);
			_s.lastVolume = percentScrubbed;
			_s.updateVolume(percentScrubbed);
			_s.updateVolumeToolTip(e);
		};
		
		_s.volumeScrubberEndHandler = function(e){
			_s.dispatchEvent(FWDRAPController.VOLUME_STOP_TO_SCRUB);
			_s.isVolumeScrubberScrubbing_bl = false;
			if(_s.disable_do){
				if(_s.contains(_s.disable_do)) _s.removeChild(_s.disable_do);
			}
			if(e){
				var wp = FWDRAPUtils.getViewportMouseCoordinates(e);
				if(!FWDRAPUtils.hitTest(_s.volumeScrubber_do.screen, wp.screenX, wp.screenY)){
					if(_s.ttm2) _s.ttm2.hide();
				}
			}
			if(_s.isMbl){
				if(_s.hasPointerEvent_bl){
					window.removeEventListener("pointermove", _s.volumeScrubberMoveHandler);
					window.removeEventListener("pointerup", _s.volumeScrubberEndHandler);
				}else{
					window.removeEventListener("touchmove", _s.volumeScrubberMoveHandler);
					window.removeEventListener("touchend", _s.volumeScrubberEndHandler);
				}
			}else{
				window.removeEventListener("mousemove", _s.volumeScrubberMoveHandler);
				window.removeEventListener("mouseup", _s.volumeScrubberEndHandler);
			}
		};
		
		_s.disableVolumeScrubber = function(){
			_s.isVolumeScrubberDisabled_bl = true;
			_s.volumeScrubber_do.setButtonMode(false);
			_s.volumeScrubberEndHandler();
		};
		
		_s.enableVolumeScrubber = function(){
			_s.isVolumeScrubberDisabled_bl = false;
			_s.volumeScrubber_do.setButtonMode(true);
		};
		
		_s.updateVolumeScrubber = function(percent){
			var finalWidth = parseInt(percent * _s.volumeScrubberWidth); 
			_s.volume = percent;
			
			_s.volumeScrubberDrag_do.setWidth(finalWidth);
			
			if(finalWidth < 1 && _s.isVolumeScrubberLineVisible_bl){
				_s.isVolumeScrubberLineVisible_bl = false;
				FWDAnimation.to(_s.volumeScrubberBarLine_do, .5, {alpha:0});
			}else if(finalWidth > 1 && !_s.isVolumeScrubberLineVisible_bl){
				_s.isVolumeScrubberLineVisible_bl = true;
				FWDAnimation.to(_s.volumeScrubberBarLine_do, .5, {alpha:1});
			}
			
			if(finalWidth > _s.volumeScrubberWidth - _s.scrubbersOffsetWidth) finalWidth = _s.volumeScrubberWidth - _s.scrubbersOffsetWidth;
			FWDAnimation.to(_s.volumeScrubberBarLine_do, .8, {x:finalWidth, ease:Expo.easeOut});
		};
		
		_s.updateVolume = function(volume, preventEvent){
			_s.volume = volume;
			if(_s.volume <= 0.000001){
				_s.isMute_bl = true;
				_s.volume = 0.000001;
			}else if(_s.volume >= 0.988){
				_s.isMute_bl = false;
				_s.volume = 1;
			}else{
				_s.isMute_bl = false;
			}
		
			if(_s.volume == 0.000001){
				if(_s.volumeButton_do) _s.volumeButton_do.setDisabledState();
			}else{
				if(_s.volumeButton_do) _s.volumeButton_do.setEnabledState();
			}
			
			if(_s.volumeScrubberBarLine_do) _s.updateVolumeScrubber(_s.volume);
			if(!preventEvent)  _s.dispatchEvent(FWDRAPController.CHANGE_VOLUME, {percent:_s.volume});
		};
		
		
		//##########################################//
		/* Setup playlist button */
		//#########################################//
		_s.setupPlaylistButton = function(){
			
			var sClr = _d.nBC
			if(_s.nBC ==  _s.n2BC) sClr = _s.sBC;

			FWDRAPSimpleButton.setPrototype();
			if(_d.useVectorIcons){
				_s.playlistButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='fwdrap-icon fwdrap-icon-playlist'></span>",
						"fwdrap-main-button-normal-state",
						"fwdrap-main-button-selected-state"
				);
			}else{
				_s.playlistButton_do = new FWDRAPSimpleButton(_s.playlistN_img, _d.playlistSPath_str,
						undefined,
						true,
						_s.useHEX,
						_s.n2BC,
						sClr);
			}

			_s.playlistButton_do.addListener(FWDRAPSimpleButton.SHOW_TOOLTIP, _s.playlistButtonShowToolTipHandler);
			_s.playlistButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.playlistButtonOnMouseUpHandler);
			_s.playlistButton_do.setY(parseInt((_s.sH - _s.playlistButton_do.h)/2));
			_s.buttons_ar.push(_s.playlistButton_do);
			_s.mainHolder_do.addChild(_s.playlistButton_do); 
			
			if(_s.showPlayListByDefault_bl){
				_s.setPlaylistButtonState("selected");
			}
		};
		
		_s.playlistButtonShowToolTipHandler = function(e){
			_s.showToolTip(_s.playlistButton_do, _s.playlistButtonToolTip_do, e.e);
		};
		
		_s.playlistButtonOnMouseUpHandler = function(){
			if(_s.playlistButton_do.isSelectedFinal_bl){
				_s.dispatchEvent(FWDRAPController.HIDE_PLAYLIST);
			}else{
				_s.dispatchEvent(FWDRAPController.SHOW_PLAYLIST);
			}
		};
		
		_s.setPlaylistButtonState = function(state){	
			if(!_s.playlistButton_do) return;
			if(state == "selected"){
				_s.playlistButton_do.setSelected();
			}else if(state == "unselected"){
				_s.playlistButton_do.setUnselected();
			}
		};
		

		//##########################################//
		/* Setup categories buttons */
		//##########################################//
		_s.setupCategoriesButton = function(){
			FWDRAPSimpleButton.setPrototype();
			if(_d.useVectorIcons){
				_s.categoriesButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='fwdrap-icon fwdrap-icon-playlists'></span>",
						"fwdrap-main-button-normal-state",
						"fwdrap-main-button-selected-state"
				);
			}else{
				_s.categoriesButton_do = new FWDRAPSimpleButton(_s.categoriesN_img, _d.categoriesSPath_str,
						undefined,
						true,
						_s.useHEX,
						_s.n2BC,
						_s.sBC);
			}

			_s.categoriesButton_do.addListener(FWDRAPSimpleButton.SHOW_TOOLTIP, _s.categoriesButtonShowTooltipHandler);
			_s.categoriesButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.categoriesButtonOnMouseUpHandler);
			_s.categoriesButton_do.setY(parseInt((_s.sH - _s.categoriesButton_do.h)/2));
			_s.buttons_ar.push(_s.categoriesButton_do);
			_s.mainHolder_do.addChild(_s.categoriesButton_do); 
		};
		
		_s.categoriesButtonShowTooltipHandler = function(e){
			_s.showToolTip(_s.categoriesButton_do, _s.playlistsButtonToolTip_do, e.e);
		};
		
		_s.categoriesButtonOnMouseUpHandler = function(){
			_s.dispatchEvent(FWDRAPController.SHOW_CATEGORIES);
		};
		
		_s.setCategoriesButtonState = function(state){	
			if(!_s.categoriesButton_do) return;
			if(state == "selected"){
				_s.categoriesButton_do.setSelected();
			}else if(state == "unselected"){
				_s.categoriesButton_do.setUnselected();
			}
		};
		

		//##########################################//
		/* Setup loop button */
		//#########################################//
		_s.setupLoopButton = function(){
			FWDRAPSimpleButton.setPrototype();
			if(_d.useVectorIcons){
				_s.loopButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='fwdrap-icon fwdrap-icon-loop'></span>",
						"fwdrap-main-button-normal-state",
						"fwdrap-main-button-selected-state"
				);
			}else{
				_s.loopButton_do = new FWDRAPSimpleButton(_s.replayN_img, _d.replaySPath_str,
					undefined,
					true,
					_s.useHEX,
					_s.n2BC,
					_s.sBC);
			}
			
			_s.loopButton_do.addListener(FWDRAPSimpleButton.SHOW_TOOLTIP, _s.loopButtonShowTooltipHandler);
			_s.loopButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.loopButtonOnMouseUpHandler);
			_s.loopButton_do.setY(parseInt((_s.sH - _s.loopButton_do.h)/2));
			_s.buttons_ar.push(_s.loopButton_do);
			_s.mainHolder_do.addChild(_s.loopButton_do); 
			if(_s.loop_bl) _s.setLoopStateButton("selected");
		};
		
		
		_s.loopButtonShowTooltipHandler = function(e){
			_s.showToolTip(_s.loopButton_do, _s.loopButtonToolTip_do, e.e);
		};
		
		_s.loopButtonOnMouseUpHandler = function(){
			if(_s.loopButton_do.isSelectedFinal_bl){
				_s.dispatchEvent(FWDRAPController.DISABLE_LOOP);
			}else{
				_s.dispatchEvent(FWDRAPController.ENABLE_LOOP);
			}
		};
		
		_s.setLoopStateButton = function(state){	
			if(!_s.loopButton_do) return;
			if(state == "selected"){
				_s.loopButton_do.setSelected();
			}else if(state == "unselected"){
				_s.loopButton_do.setUnselected();
			}
		};
		

		//##########################################//
		/* Setup download button */
		//#########################################//
		_s.setupDownloadButton = function(){
			FWDRAPSimpleButton.setPrototype();
			if(_d.useVectorIcons){
				_s.downloadButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='fwdrap-icon fwdrap-icon-download'></span>",
						"fwdrap-main-button-normal-state",
						"fwdrap-main-button-selected-state"
				);
			}else{
				_s.downloadButton_do = new FWDRAPSimpleButton(_s.downloaderN_img, _d.downloaderSPath_str,
					undefined,
					true,
					_s.useHEX,
					_s.n2BC,
					_s.sBC);
			}
			
			_s.downloadButton_do.addListener(FWDRAPSimpleButton.SHOW_TOOLTIP, _s.downloadButtonShowToolTipHandler);
			_s.downloadButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.downloadButtonOnMouseUpHandler);
			_s.downloadButton_do.setX(-300);
			_s.downloadButton_do.setY(parseInt((_s.sH - _s.downloadButton_do.h)/2));
			_s.mainHolder_do.addChild(_s.downloadButton_do); 
		};
		
		_s.downloadButtonShowToolTipHandler = function(e){
			_s.showToolTip(_s.downloadButton_do, _s.downloadButtonToolTip_do, e.e);
		};
		
		_s.downloadButtonOnMouseUpHandler = function(){
			_s.dispatchEvent(FWDRAPController.DOWNLOAD_MP3);
		};

		
		//##########################################//
		/* Setup buy button */
		//#########################################//
		_s.setupBuyButton = function(){
			FWDRAPSimpleButton.setPrototype();
			if(_d.useVectorIcons){
				_s.buyButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='fwdrap-icon fwdrap-icon-cart'></span>",
						"fwdrap-main-button-normal-state",
						"fwdrap-main-button-selected-state"
				);
			}else{
				_s.buyButton_do = new FWDRAPSimpleButton(_d.buyN_img, _d.buySPath_str,
					undefined,
					true,
					_s.useHEX,
					_s.n2BC,
					_s.sBC);
			}
			_s.buyButton_do.addListener(FWDRAPSimpleButton.SHOW_TOOLTIP, _s.buyButtonShowToolTipHandler);
			_s.buyButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.buyButtonOnMouseUpHandler);
			_s.buyButton_do.setX(-300);
			_s.buyButton_do.setY(parseInt((_s.sH - _s.buyButton_do.h)/2));
			_s.mainHolder_do.addChild(_s.buyButton_do);
		};
		
		_s.buyButtonShowToolTipHandler = function(e){
			_s.showToolTip(_s.buyButton_do, _s.buyButtonToolTip_do, e.e);
		};
		
		_s.buyButtonOnMouseUpHandler = function(){
			_s.dispatchEvent(FWDRAPController.BUY);
		};
		
		
		//##########################################//
		/* Setup playback rate */
		//#########################################//
		_s.setupPlaybacRateButton = function(){
			FWDRAPSimpleButton.setPrototype();
			if(_d.useVectorIcons){
				_s.playbackRateButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='fwdrap-icon fwdrap-icon-watch-later'></span>",
						"fwdrap-main-button-normal-state",
						"fwdrap-main-button-selected-state"
				);
			}else{
				_s.playbackRateButton_do = new FWDRAPSimpleButton(_d.playbackRateNormal_img, _d.playbackRateSelectedPath_str, null, true,
						_d.useHEX,
						_d.n2BC,
						_d.sBC);
			}
			_s.playbackRateButton_do.addListener(FWDRAPSimpleButton.SHOW_TOOLTIP, _s.playbacRateButtonShowToolTipHandler);
			_s.playbackRateButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.playbacRateButtonOnMouseUpHandler);
			_s.buttons_ar.push(_s.playbackRateButton_do);
			_s.mainHolder_do.addChild(_s.playbackRateButton_do); 
		};
		
		_s.playbacRateButtonShowToolTipHandler = function(e){
			_s.showToolTip(_s.playbackRateButton_do, _s.playbackRateButtonToolTip_do, e.e);
		};
		
		_s.playbacRateButtonOnMouseUpHandler = function(){
			_s.dispatchEvent(FWDRAPController.SHOW_PLAYBACKRATE);
		};
		
		
		//##########################################//
		/* Setup shuffle button */
		//#########################################//
		_s.setupShuffleButton = function(){
			FWDRAPSimpleButton.setPrototype();
			if(_d.useVectorIcons){
				_s.shuffleButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='fwdrap-icon fwdrap-icon-shuffle'></span>",
						"fwdrap-main-button-normal-state",
						"fwdrap-main-button-selected-state"
				);
			}else{
				_s.shuffleButton_do = new FWDRAPSimpleButton(_s.shuffleN_img, _d.shuffleSPath_str,
					undefined,
					true,
					_s.useHEX,
					_s.n2BC,
					_s.sBC);
			}
			
			_s.shuffleButton_do.addListener(FWDRAPSimpleButton.SHOW_TOOLTIP, _s.shuffleButtonShowToolTipHandler);
			_s.shuffleButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.shuffleButtonOnMouseUpHandler);
			_s.shuffleButton_do.setY(parseInt((_s.sH - _s.shuffleButton_do.h)/2));
			_s.buttons_ar.push(_s.shuffleButton_do);
			_s.mainHolder_do.addChild(_s.shuffleButton_do); 
			if(!_s.loop_bl && _s.shuffle_bl) _s.setShuffleButtonState("selected");
		};
		
		_s.shuffleButtonShowToolTipHandler = function(e){
			_s.showToolTip(_s.shuffleButton_do, _s.shuffleButtonToolTip_do, e.e);
		};
		
		_s.shuffleButtonOnMouseUpHandler = function(){
			if(_s.shuffleButton_do.isSelectedFinal_bl){
				_s.dispatchEvent(FWDRAPController.DISABLE_SHUFFLE);
			}else{
				_s.dispatchEvent(FWDRAPController.ENABLE_SHUFFLE);
			}
		};
		
		_s.setShuffleButtonState = function(state){	
			if(!_s.shuffleButton_do) return;
			if(state == "selected"){
				_s.shuffleButton_do.setSelected();
			}else if(state == "unselected"){
				_s.shuffleButton_do.setUnselected();
			}
		};

	
		//##########################################//
		/* Setup share button */
		//#########################################//
		_s.setupShareButton = function(){

			FWDRAPSimpleButton.setPrototype();
			if(_d.useVectorIcons){
				_s.shareButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='fwdrap-icon fwdrap-icon-share'></span>",
						"fwdrap-main-button-normal-state",
						"fwdrap-main-button-selected-state"
				);
			}else{
				_s.shareButton_do = new FWDRAPSimpleButton(_s.shareN_img, _d.shareSPath_str,
						undefined,
						true,
						_s.useHEX,
						_s.n2BC,
						_s.sBC);
			}
			_s.shareButton_do.addListener(FWDRAPSimpleButton.SHOW_TOOLTIP, _s.shareButtonShowToolTipHandler);
			_s.shareButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.faceboolButtonOnMouseUpHandler);
			_s.shareButton_do.setY(parseInt((_s.sH - _s.shareButton_do.h)/2));
			_s.buttons_ar.push(_s.shareButton_do);
			_s.mainHolder_do.addChild(_s.shareButton_do); 
		};
		
		_s.shareButtonShowToolTipHandler = function(e){
			_s.showToolTip(_s.shareButton_do, _s.shareButtonToolTip_do, e.e);
		};
		
		_s.faceboolButtonOnMouseUpHandler = function(){
			_s.dispatchEvent(FWDRAPController.SHARE);
		};
		

		//##########################################//
		/* Setup popup button */
		//#########################################//
		_s.setupPopupButton = function(){
			FWDRAPSimpleButton.setPrototype();
			if(_d.useVectorIcons){
				_s.popupButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='fwdrap-icon fwdrap-icon-popup'></span>",
						"fwdrap-main-button-normal-state",
						"fwdrap-main-button-selected-state"
				);
			}else{
				_s.popupButton_do = new FWDRAPSimpleButton(_s.popupN_img, _d.popupSPath_str,
						undefined,
						true,
						_s.useHEX,
						_s.n2BC,
						_s.sBC);
			}
			_s.popupButton_do.addListener(FWDRAPSimpleButton.SHOW_TOOLTIP, _s.popupButtonShowToolTipHandler);
			_s.popupButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.popupButtonOnMouseUpHandler);
			_s.popupButton_do.setY(parseInt((_s.sH - _s.popupButton_do.h)/2));
			_s.buttons_ar.push(_s.popupButton_do);
			_s.mainHolder_do.addChild(_s.popupButton_do); 
		};
		
		_s.popupButtonShowToolTipHandler = function(e){
			_s.showToolTip(_s.popupButton_do, _s.populButtonToolTip_do, e.e);
		};
		
		_s.popupButtonOnMouseUpHandler = function(){
			_s.dispatchEvent(FWDRAPController.POPUP);
		};

		
		//#########################################//
		/* disable all buttons except categories */
		//########################################//
		_s.disableControllerWhileLoadingPlaylist = function(){
			_s.prevButton_do.disable();
			_s.playPauseButton_do.disable();
			_s.nextButton_do.disable();
			if(_s.downloadButton_do) _s.downloadButton_do.disable();
			if(_s.buyButton_do) _s.buyButton_do.disable();
			if(_s.playlistButton_do) _s.playlistButton_do.disable(true);
			if(_s.shareButton_do) _s.shareButton_do.disable();
			_s.updateTime("...", "...");
			_s.setTitle("...");
		};
		
		_s.enableControllerWhileLoadingPlaylist = function(){
			_s.prevButton_do.enable();
			_s.playPauseButton_do.enable();
			_s.nextButton_do.enable();
			if(_s.downloadButton_do) _s.downloadButton_do.enable();
			if(_s.buyButton_do) _s.buyButton_do.enable();
			if(_s.playlistButton_do) _s.playlistButton_do.enable();
			if(_s.shareButton_do) _s.shareButton_do.enable();
		};
		
		_s.init();
	};
	

	/* set prototype */
	FWDRAPController.setPrototype = function(){
		FWDRAPController.prototype = new FWDRAPDisplayObject("div");
	};
	
	FWDRAPController.SHOW_ATOB = 'showAToB'
	FWDRAPController.SHOW_PLAYBACKRATE ="showPlaybackRate";
	FWDRAPController.SHARE = "shareShare";
	FWDRAPController.PLAY_NEXT = "playNext";
	FWDRAPController.PLAY_PREV = "playPrev";
	FWDRAPController.PLAY = "play";
	FWDRAPController.PAUSE = "pause";
	FWDRAPController.VOLUME_START_TO_SCRUB = "volumeStartToScrub";
	FWDRAPController.VOLUME_STOP_TO_SCRUB = "volumeStopToScrub";
	FWDRAPController.START_TO_SCRUB = "startToScrub";
	FWDRAPController.SCRUB = "scrub";
	FWDRAPController.SCRUB_PLAYLIST_ITEM = "scrubPlaylistItem";
	FWDRAPController.STOP_TO_SCRUB = "stopToScrub";
	FWDRAPController.CHANGE_VOLUME = "changeVolume";
	FWDRAPController.SHOW_CATEGORIES = "showCategories";
	FWDRAPController.SHOW_PLAYLIST = "showPlaylist";
	FWDRAPController.HIDE_PLAYLIST = "hidePlaylist";
	FWDRAPController.ENABLE_LOOP = "enableLoop";
	FWDRAPController.DISABLE_LOOP = "disableLoop";
	FWDRAPController.ENABLE_SHUFFLE = "enableShuffle";
	FWDRAPController.DISABLE_SHUFFLE = "disableShuffle";
	FWDRAPController.POPUP = "popup";
	FWDRAPController.DOWNLOAD_MP3 = "downloadMp3";
	FWDRAPController.BUY = "buy";
	
	FWDRAPController.prototype = null;
	window.FWDRAPController = FWDRAPController;
	
}());