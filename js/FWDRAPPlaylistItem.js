/**
 * Royal Audio Player
 * Playlist item.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function(){
var FWDRAPPlaylistItem = function(
			title_str,
			titleText_str,
			playlistDownloadButtonN_img,
			playlistDownloadButtonS_str,
			playlistBuyButtonN_img,
			playlistBuyButtonS_str,
			playlistItemGrad1Path,
			playlistItemGrad2Path,
			playlistItemProgress1,
			playlistItemProgress2,
			playlistPlayButtonN_img,
			playlistItemBk1Path_str,
			playlistItemBk2Path_str,
			playlistPlayButtonN_str,
			playlistPlayButtonS_str,
			playlistPauseButtonN_str,
			playlistPauseButtonS_str,
			titleNormalColor_str,
			trackTitleSelected_str,
			durationColor_str,
			id,
			playPauseButtonOffsetLeftAndRight,
			trackTitleOffsetLeft,
			durationOffsetRight,
			downloadButtonOffsetRight,
			showPlayPauseButton,
			showDownloadButton,
			showBuyButton,
			showDuration,
			useHEX,
			nBC,
			n2BC,
			sBC,
			prt
		){
		
		'use strict';

		var _s = this;
		var prototype = FWDRAPPlaylistItem.prototype;
		_s.playlistItemGrad1Path = playlistItemGrad1Path;
		_s.playlistItemGrad2Path = playlistItemGrad2Path;
		_s.playlistItemProgress1 = playlistItemProgress1;
		_s.playlistItemProgress2 = playlistItemProgress2;
		_s.playlistPlayButtonN_img = playlistPlayButtonN_img;
		_s.playlistDownloadButtonN_img = playlistDownloadButtonN_img;
		_s.playlistDownloadButtonS_str = playlistDownloadButtonS_str;
		_s.playlistBuyButtonN_img = playlistBuyButtonN_img;
		_s.playlistBuyButtonS_str = playlistBuyButtonS_str;
	
		_s.title_str = title_str;
		_s.titleText_str = titleText_str;
		
		_s.useHEX = useHEX; 
		_s.nBC = nBC;
		_s.n2BC = n2BC;
		_s.sBC = sBC;
		
		_s.playlistItemBk1Path_str = playlistItemBk1Path_str;
		_s.playlistItemBk2Path_str = playlistItemBk2Path_str;
		_s.playlistPlayButtonN_str = playlistPlayButtonN_str;
		_s.playlistPlayButtonS_str = playlistPlayButtonS_str;
		_s.playlistPauseButtonN_str = playlistPauseButtonN_str;
		_s.playlistPauseButtonS_str = playlistPauseButtonS_str;
		_s.titleNormalColor_str = titleNormalColor_str;
		_s.trackTitleSelected_str = trackTitleSelected_str;
		_s.durationColor_str = durationColor_str;
	
		_s.itemHeight = prt._d.playlistItemHeight;
		_s.id = id;
		_s.sortId = id;
		_s.playPauseButtonOffsetLeftAndRight = playPauseButtonOffsetLeftAndRight;
		_s.trackTitleOffsetLeft = trackTitleOffsetLeft;
		_s.duration = showDuration;
		_s.durationOffsetRight = durationOffsetRight;
		_s.textHeight;
		_s.durationWidth = 0;
		_s.titleWidth = 0;
		_s.playPauseButtonWidth = _s.playlistPlayButtonN_img.width;
		_s.playPauseButtonHeight = _s.playlistPlayButtonN_img.height;
		_s.progressPercent = 0;
		_s.sW = 0;
		_s.downloadButtonOffsetRight = downloadButtonOffsetRight;
		_s.type = -1;
		
		_s.showDownloadButton_bl = showDownloadButton;

		_s.showBuyButton_bl = showBuyButton;
		_s.showPlayPauseButton_bl = showPlayPauseButton;
		_s.showDuration_bl = showDuration;
		_s.isMbl = FWDRAPUtils.isMobile;
		_s.hasPointerEvent_bl = FWDRAPUtils.hasPointerEvent;
		

		//##########################################//
		/* initialize _s */
		//##########################################//
		_s.init = function(){
			if(window['isWhite']){
				_s.n2BC = '#888888';
			}
			
			_s.setupProgress();
			
			_s.setupTitle();
			if(_s.showPlayPauseButton_bl) _s.setupPlayPauseButton();
			_s.setupGrad();
			if(_s.showDuration_bl) _s.setupDuration();
			_s.setNormalState(false, true);
			_s.setupDumy();
			if(_s.showDownloadButton_bl) _s.setupDownloadButton();
			if(_s.showBuyButton_bl) _s.setupBuyButton();
			
			if(_s.id % 2 == 0){
				_s.getStyle().background = "url('" + _s.playlistItemBk1Path_str + "')";
				_s.screen.className = 'fwdrap-playlist-item-bacground-even';
				_s.grad_do.getStyle().background = "url('" + _s.playlistItemGrad1Path + "')";
				_s.grad_do.screen.className = 'fwdrap-playlist-item-gradient-even';
				_s.progress_do.getStyle().background = "url('" + _s.playlistItemProgress1 + "') repeat-x";
				_s.progress_do.screen.className = 'fwdrap-playlist-item-progress-even';
				_s.type = 1;
			}else{
				_s.getStyle().background = "url('" + _s.playlistItemBk2Path_str + "')";
				_s.screen.className = 'fwdrap-playlist-item-bacground-odd';
				_s.grad_do.getStyle().background = "url('" + _s.playlistItemGrad2Path + "')";
				_s.grad_do.screen.className = 'fwdrap-playlist-item-gradient-odd';
				_s.progress_do.getStyle().background = "url('" + _s.playlistItemProgress2 + "') repeat-x";
				_s.progress_do.screen.className = 'fwdrap-playlist-item-progress-odd';
				_s.type = 2;
			}
			
			if(_s.isMbl){
				if(_s.hasPointerEvent_bl){
					_s.dumy_do.screen.addEventListener("pointerup", _s.onMouseUp);
					_s.dumy_do.screen.addEventListener("pointerover", _s.onMouseOver);
					_s.dumy_do.screen.addEventListener("pointerout", _s.onMouseOut);
				}else{
					_s.dumy_do.screen.addEventListener("touchend", _s.onMouseUp);
				}
			}else{	
				_s.dumy_do.screen.addEventListener("mouseover", _s.onMouseOver);
				_s.dumy_do.screen.addEventListener("mouseout", _s.onMouseOut);
				_s.dumy_do.screen.addEventListener("mouseup", _s.onMouseUp);
			}
		};
		
		_s.onMouseOver = function(e, animate){
			if(_s.isActive_bl) return;
			if(!e.pointerType || e.pointerType == "mouse"){
				_s.setSelectedState(true);
			}
		};
			
		_s.onMouseOut = function(e){
			if(_s.isActive_bl) return;
			if(!e.pointerType || e.pointerType == "mouse"){
				_s.setNormalState(true);
			}
		};
		
		_s.onMouseUp = function(e){
			if(prt.isScrollingOnMove_bl || e.button == 2) return;
			if(e.preventDefault) e.preventDefault();
			_s.dispatchEvent(FWDRAPPlaylistItem.MOUSE_UP, {id:_s.id});
		};
		

		//#################################//
		/* Change images source */
		//#################################//
		_s.changeSource = function(c){
			
			if(c == 0){
				if(_s.type != 1){
					_s.grad_do.getStyle().background = "url('" + _s.playlistItemGrad1Path + "')";
					_s.getStyle().background = "url('" + _s.playlistItemBk1Path_str + "')";
					_s.progress_do.getStyle().background = "url('" + _s.playlistItemProgress1 + "')";
					_s.type = 1;
				}
			}else{
				if(_s.type != 2){
					_s.grad_do.getStyle().background = "url('" + _s.playlistItemGrad2Path + "')";
					_s.getStyle().background = "url('" + _s.playlistItemBk2Path_str + "')";
					_s.progress_do.getStyle().background = "url('" + _s.playlistItemProgress2 + "')";
					_s.type = 2;		
				}
			}
		};
		

		//###########################################//
		// Resize and position _s...
		//###########################################//
		_s.resize = function(width, height){
			if(FWDRAPUtils.isIEAndLessThen9 && !_s.textHeight || _s == null) return;
			_s.sW = width;
			_s.sH = height;
			var offsetW = 0;
			
			var yPos = parseInt((height - _s.textHeight)/2) + 1;
			var duratY = parseInt((height - _s.duratH)/2) + 1; 

			if(_s.playPause_do){
				_s.titleText_do.setX(_s.playPauseButtonOffsetLeftAndRight * 2 + _s.playPause_do.w + _s.trackTitleOffsetLeft - 2);
				_s.playPause_do.setY(parseInt((height - _s.playPause_do.h)/2));
			}else{
				_s.titleText_do.setX(_s.trackTitleOffsetLeft);
			}
				
			_s.titleText_do.setY(yPos);
			
			if(_s.buyButton_do && _s.downloadButton_do){
				if(_s.durat_do){
					_s.durat_do.setX(width - _s.durationWidth - _s.durationOffsetRight + 1);
					_s.durat_do.setY(duratY);
					offsetW = _s.durat_do.x;
				}else{
					offsetW = width;
				}
				
				_s.downloadButton_do.setX(offsetW - _s.downloadButton_do.w - _s.downloadButtonOffsetRight + 3);
				_s.downloadButton_do.setY(parseInt((height - _s.downloadButton_do.h)/2));
				
				var oY = 4;
				if(prt._d.useVectorIcons) oY = 10;
				_s.buyButton_do.setX(_s.downloadButton_do.x - _s.buyButton_do.w - oY);
				_s.buyButton_do.setY(parseInt((height - _s.buyButton_do.h)/2));
			
				if(_s.titleText_do.x + _s.titleWidth + _s.downloadButton_do.w + _s.buyButton_do.w + _s.downloadButtonOffsetRight + 4> offsetW){
					_s.grad_do.setX(_s.buyButton_do.x - _s.downloadButtonOffsetRight + 2);
				}else{
					_s.grad_do.setX(-300);
				}
			}else if(_s.downloadButton_do){
				if(_s.durat_do){
					_s.durat_do.setX(width - _s.durationWidth - _s.durationOffsetRight + 1);
					_s.durat_do.setY(duratY);
					offsetW = _s.durat_do.x;
				}else{
					offsetW = width;
				}
				
				_s.downloadButton_do.setX(offsetW - _s.downloadButton_do.w - _s.downloadButtonOffsetRight + 3);
				_s.downloadButton_do.setY(parseInt((height - _s.downloadButton_do.h)/2));
			
				if(_s.titleText_do.x + _s.titleWidth + _s.downloadButton_do.w + _s.downloadButtonOffsetRight > offsetW){
					_s.grad_do.setX(_s.downloadButton_do.x - _s.downloadButtonOffsetRight + 2);
				}else{
					_s.grad_do.setX(-300);
				}
			}else if(_s.buyButton_do){
				
				if(_s.durat_do){
					_s.durat_do.setX(width - _s.durationWidth - _s.durationOffsetRight + 1);
					_s.durat_do.setY(duratY);
					offsetW = _s.durat_do.x;
				}else{
					offsetW = width;
				}
				
				_s.buyButton_do.setX(offsetW - _s.buyButton_do.w - _s.downloadButtonOffsetRight + 3);
				_s.buyButton_do.setY(parseInt((height - _s.buyButton_do.h)/2));
			
				if(_s.titleText_do.x + _s.titleWidth + _s.buyButton_do.w + _s.downloadButtonOffsetRight > offsetW){
					_s.grad_do.setX(_s.buyButton_do.x - _s.downloadButtonOffsetRight + 2);
				}else{
					_s.grad_do.setX(-300);
				}
			}else if(_s.durat_do){
				_s.durat_do.setX(width - _s.durationWidth - _s.durationOffsetRight + 1);
				_s.durat_do.setY(duratY);
				if(_s.titleText_do.x + _s.titleWidth > _s.durat_do.x){
					_s.grad_do.setX(_s.durat_do.x - _s.durationOffsetRight - 3);
				}else{
					_s.grad_do.setX(-300);
				}
			}else if(_s.downloadButton_do){
				_s.downloadButton_do.setX(width - _s.downloadButton_do.w - _s.downloadButtonOffsetRight + 2);
				if(_s.titleText_do.x + _s.titleWidth > _s.downloadButton_do.x){
					_s.grad_do.setX(_s.downloadButton_do.x - _s.downloadButtonOffsetRight + 2);
				}else{
					_s.grad_do.setX(-300);
				}
				_s.downloadButton_do.setY(parseInt((height - _s.downloadButton_do.h)/2));
			}else{
				if(_s.titleText_do.x + _s.titleWidth >  width - 10){
					_s.grad_do.setX(width - 15);
				}else{
					_s.grad_do.setX(-300);
				}
			}
			
			_s.dumy_do.setWidth(width);
			_s.dumy_do.setHeight(height);
			_s.setWidth(width);
			_s.setHeight(height);
		};
		

		//###########################################//
		/* setup download button */
		//###########################################//
		_s.setupDownloadButton = function(){
			if(prt._d.useVectorIcons){
				FWDRAPSimpleButton.setPrototype();
				_s.downloadButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='fwdrap-icon-small fwdrap-icon fwdrap-icon-download'></span>",
						"fwdrap-main-button-normal-state",
						"fwdrap-main-button-selected-state"
				);
			}else{
				FWDRAPSimpleSizeButton.setPrototype();
				_s.downloadButton_do = new FWDRAPSimpleSizeButton(
						_s.playlistDownloadButtonS_str,
						_s.playlistDownloadButtonN_img.src,
						_s.playlistDownloadButtonN_img.width,
						_s.playlistDownloadButtonN_img.height,
						_s.useHEX,
						_s.n2BC,
						_s.sBC
					);
			}
			
			_s.downloadButton_do.getStyle().position = "absolute";
			_s.downloadButton_do.addListener(FWDRAPSimpleSizeButton.CLICK, _s.dwButtonClickHandler);
			_s.addChild(_s.downloadButton_do);
		};
		
		_s.dwButtonClickHandler = function(){
			_s.dispatchEvent(FWDRAPPlaylistItem.DOWNLOAD, {id:_s.id});
		};
		
		//###########################################//
		/* setup buy button */
		//###########################################//
		_s.setupBuyButton = function(){
			
			if(prt._d.useVectorIcons){
				FWDRAPSimpleButton.setPrototype();
				_s.buyButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='fwdrap-icon-small fwdrap-icon fwdrap-icon-cart'></span>",
						"fwdrap-main-button-normal-state",
						"fwdrap-main-button-selected-state"
				);
			}else{
				FWDRAPSimpleSizeButton.setPrototype();
				_s.buyButton_do = new FWDRAPSimpleSizeButton(
						_s.playlistBuyButtonS_str,
						_s.playlistBuyButtonN_img.src,
						_s.playlistBuyButtonN_img.width,
						_s.playlistBuyButtonN_img.height,
						_s.useHEX,
						_s.n2BC,
						_s.sBC
					);
			}
			
			_s.buyButton_do.getStyle().position = "absolute";
			_s.buyButton_do.addListener(FWDRAPSimpleSizeButton.CLICK, _s.buyButtonClickHandler);
			_s.addChild(_s.buyButton_do);
		};
		
		_s.buyButtonClickHandler = function(){
			_s.dispatchEvent(FWDRAPPlaylistItem.BUY, {id:_s.id});
		};

		
		//###########################################//
		/* setup progress */
		//###########################################//
		_s.setupProgress = function(){
			_s.progress_do = new FWDRAPDisplayObject("div");
			_s.progress_do.setBackfaceVisibility();
			_s.progress_do.getStyle().height = '100%';
			_s.addChild(_s.progress_do);
		};
		
		_s.updateProgressPercent = function(percent){
			if(_s == null) return;
			if(_s.progressPercent == percent) return;
			_s.progressPercent = percent;
			_s.progress_do.setWidth(parseInt(_s.sW * percent));	
		};
		

		//###########################################//
		/* setup play/pause button */
		//###########################################//
		_s.setupPlayPauseButton = function(){
			_s.playPause_do = new FWDRAPDisplayObject("div");
			_s.playPause_do.setWidth(_s.playPauseButtonWidth);
			_s.playPause_do.setHeight(_s.playPauseButtonHeight);
			
			_s.playN_do = new FWDRAPDisplayObject("div");	
			if(_s.useHEX){
				_s.playNImage_img = new Image();
				_s.playNImage_img.src = _s.playlistPlayButtonN_str;
				_s.playNImage_img.onload = function(){
					var testCanvas = FWDRAPUtils.getCanvasWithModifiedColor(_s.playNImage_img, _s.n2BC, true);
					_s.playNImageCanvas = testCanvas.canvas;
					_s.playNImageBackground = testCanvas.image;
					_s.playN_do.getStyle().background = "url('" + _s.playNImageBackground.src + "')";
				}
			}else{
				_s.playN_do.getStyle().background = "url('" + _s.playlistPlayButtonN_str + "') no-repeat";
			}
			_s.playN_do.setWidth(_s.playPauseButtonWidth);
			_s.playN_do.setHeight(_s.playPauseButtonHeight);
			
			_s.playS_do = new FWDRAPDisplayObject("div");	
			if(_s.useHEX){
				_s.playSImage_img = new Image();
				_s.playSImage_img.src = _s.playlistPlayButtonS_str;
				_s.playSImage_img.onload = function(){
					var testCanvas = FWDRAPUtils.getCanvasWithModifiedColor(_s.playSImage_img, _s.nBC, true);
					_s.playSImageCanvas = testCanvas.canvas;
					_s.playSImageBackground = testCanvas.image;
					_s.playS_do.getStyle().background = "url('" + _s.playSImageBackground.src + "')";
				}
			}else{
				_s.playS_do.getStyle().background = "url('" + _s.playlistPlayButtonS_str + "') no-repeat";
			}
			_s.playS_do.setWidth(_s.playPauseButtonWidth);
			_s.playS_do.setHeight(_s.playPauseButtonHeight);
			_s.playS_do.setAlpha(0);
			
			
			_s.pauseN_do = new FWDRAPDisplayObject("div");	
			if(_s.useHEX){
				_s.pauseNImage_img = new Image();
				_s.pauseNImage_img.src = _s.playlistPauseButtonN_str;
				_s.pauseNImage_img.onload = function(){
					var testCanvas = FWDRAPUtils.getCanvasWithModifiedColor(_s.pauseNImage_img, _s.n2BC, true);
					_s.pauseNImageCanvas = testCanvas.canvas;
					_s.pauseNImageBackground = testCanvas.image;
					_s.pauseN_do.getStyle().background = "url('" + _s.pauseNImageBackground.src + "')";
				}
			}else{
				_s.pauseN_do.getStyle().background = "url('" + _s.playlistPauseButtonN_str + "') no-repeat";
			}
			
			_s.pauseN_do.setWidth(_s.playPauseButtonWidth);
			_s.pauseN_do.setHeight(_s.playPauseButtonHeight);
			
			
			_s.pauseS_do = new FWDRAPDisplayObject("div");	
			if(_s.useHEX){
				_s.pauseSImage_img = new Image();
				_s.pauseSImage_img.src = _s.playlistPauseButtonS_str;
				_s.pauseSImage_img.onload = function(){
					if(!_s) return;
					var testCanvas = FWDRAPUtils.getCanvasWithModifiedColor(_s.pauseSImage_img, _s.nBC, true);
					_s.pauseSImageCanvas = testCanvas.canvas;
					_s.pauseSImageBackground = testCanvas.image;
					_s.pauseS_do.getStyle().background = "url('" + _s.pauseSImageBackground.src + "')";
				}
			}else{
				_s.pauseS_do.getStyle().background = "url('" + _s.playlistPauseButtonS_str + "') no-repeat";
			}
			_s.pauseS_do.setWidth(_s.playPauseButtonWidth);
			_s.pauseS_do.setHeight(_s.playPauseButtonHeight);
			_s.pauseN_do.setX(-300);
			_s.pauseS_do.setX(-300);
			_s.pauseS_do.setAlpha(0);
			
			_s.playPause_do.setX(_s.playPauseButtonOffsetLeftAndRight);
			
			_s.playPause_do.addChild(_s.playN_do);
			_s.playPause_do.addChild(_s.playS_do);
			_s.playPause_do.addChild(_s.pauseN_do);
			_s.playPause_do.addChild(_s.pauseS_do);
			_s.addChild(_s.playPause_do);
		};
		

		//###########################################//
		/* setup title */
		//###########################################//
		_s.setupTitle = function(){
			_s.titleText_do = new FWDRAPDisplayObject("div");
			
			var cls = 'fwdrap-playlist-item-white-text';
			if(prt._d.isDark){
				cls = 'fwdrap-playlist-item-dark-text';
			}
			_s.titleText_do.screen.className = cls;
			_s.slTitle = _s.titleText_do.screen.className;
		
			_s.titleText_do.setOverflow("visible");
			_s.titleText_do.setBackfaceVisibility();
			_s.titleText_do.getStyle().fontFamily = "Arial";
			_s.titleText_do.getStyle().fontSize= "12px";
			_s.titleText_do.getStyle().whiteSpace= "nowrap";
			_s.titleText_do.getStyle().textAlign = "left";
			_s.titleText_do.setInnerHTML(_s.title_str);
			_s.addChild(_s.titleText_do);
		};
		
		_s.updateTitle = function(){
			if(_s == null) return;
			_s.titleText_do.setInnerHTML(_s.title_str);
		};
		
		_s.setTextSizes = function(overwrite){
			if(_s == null) return;
			if(_s.textHeight && !overwrite) return;
			
			_s.titleWidth = _s.titleText_do.screen.offsetWidth;
			_s.textHeight = _s.titleText_do.screen.offsetHeight;
			if(_s.durat_do) _s.duratH = _s.durat_do.screen.offsetHeight;
		
			if(_s.durat_do){
				_s.durationWidth = _s.durat_do.screen.offsetWidth;
			}
			_s.grad_do.setWidth(150);
		};
		

		//##########################################//
		/* Setup grad */
		//##########################################//
		_s.setupGrad = function(){
			_s.grad_do = new FWDRAPDisplayObject("div");
			_s.grad_do.setOverflow("visible");
			if(FWDRAPUtils.isApple){
				_s.grad_do.hasTransform3d_bl = false;
				_s.grad_do.hasTransform2d_bl = false;
			}
			_s.grad_do.setBackfaceVisibility();
			_s.grad_do.setHeight(_s.itemHeight - 1);
			_s.addChild(_s.grad_do);
		};
		

		//###########################################//
		/* setup duration */
		//###########################################//
		_s.setupDuration = function(){
			_s.durat_do = new FWDRAPDisplayObject("div");

			var cls = 'fwdrap-playlist-item-white-duration';
			if(prt._d.isDark){
				cls = 'fwdrap-playlist-item-dark-duration';
			}
			_s.durat_do.setOverflow("visible");
			_s.durat_do.setBackfaceVisibility();
			_s.durat_do.screen.className = cls;
			_s.durCls = _s.durat_do.screen.className;
			_s.durat_do.getStyle().fontFamily = "Arial";
			_s.durat_do.getStyle().fontSize= "12px";
			_s.durat_do.getStyle().whiteSpace= "nowrap";
			_s.durat_do.getStyle().textAlign = "left";
			_s.durat_do.setInnerHTML(_s.duration);
			_s.addChild(_s.durat_do);
		};
		

		//###########################################//
		/* setup dummy */
		//###########################################//
		_s.setupDumy = function(){
			_s.dumy_do = new FWDRAPDisplayObject("div");
			_s.dumy_do.setButtonMode(true);
			if(FWDRAPUtils.isIE){
				_s.dumy_do.setBkColor("#FFFFFF");
				_s.dumy_do.setAlpha(.001);
			}
			_s.addChild(_s.dumy_do);
		};

		
		//##############################//
		/* set normal/selected state*/
		//##############################//
		_s.setNormalState = function(animate, overwrite){
			if(!_s.isSelected_bl && !overwrite) return;
			_s.isSelected_bl = false;
			_s.removeTitleSlectedClass();
			
			if(animate){
				FWDAnimation.to(_s.titleText_do.screen, .8, {css:{color:_s.titleNormalColor_str}, ease:Expo.easeOut});
				if(_s.durat_do){
					FWDAnimation.to(_s.durat_do.screen, .8, {css:{color:_s.durationColor_str}, ease:Expo.easeOut});
				}
				if(_s.playPause_do){
					FWDAnimation.to(_s.pauseS_do, .8, {alpha:0, ease:Expo.easeOut});
					FWDAnimation.to(_s.playS_do, .8, {alpha:0, ease:Expo.easeOut});
				}
			}else{
				FWDAnimation.killTweensOf(_s.titleText_do);
				_s.titleText_do.getStyle().color = _s.titleNormalColor_str;
				if(_s.durat_do) _s.durat_do.getStyle().color = _s.durationColor_str;
				if(_s.playPause_do){
					FWDAnimation.killTweensOf(_s.pauseS_do);
					FWDAnimation.killTweensOf(_s.playS_do);
					_s.pauseS_do.setAlpha(0);
					_s.playS_do.setAlpha(0);
				}
			}
		};
		
		_s.setSelectedState = function(animate){
			if(_s.isSelected_bl) return;
			_s.isSelected_bl = true;
			_s.setTitleSelectedClass();
		
			if(animate){
				FWDAnimation.to(_s.titleText_do.screen, .8, {css:{color:_s.trackTitleSelected_str}, ease:Expo.easeOut});
				if(_s.durat_do){
					FWDAnimation.to(_s.durat_do.screen, .8, {css:{color:_s.trackTitleSelected_str}, ease:Expo.easeOut});
				}
				if(_s.playPause_do){
					FWDAnimation.to(_s.pauseS_do, .8, {alpha:1, ease:Expo.easeOut});
					FWDAnimation.to(_s.playS_do, .8, {alpha:1, ease:Expo.easeOut});
				}
			}else{
				FWDAnimation.killTweensOf(_s.titleText_do);
				_s.titleText_do.getStyle().color = _s.trackTitleSelected_str;
				if(_s.durat_do) _s.durat_do.getStyle().color = _s.trackTitleSelected_str;
				
				if(_s.playPause_do){
					FWDAnimation.killTweensOf(_s.pauseS_do);
					FWDAnimation.killTweensOf(_s.playS_do);
					_s.pauseS_do.setAlpha(1);
					_s.playS_do.setAlpha(1);
				}
			}
		};

		_s.setTitleSelectedClass = function(){
			if(_s.slTitle){
				_s.titleText_do.screen.className = _s.slTitle  + ' active';
			}
			if(_s.durat_do){
				_s.durat_do.screen.className = _s.durCls  + ' active';
			}
		}

		_s.removeTitleSlectedClass = function(){
			if(_s.slTitle && !_s.isActive_bl){
				_s.titleText_do.screen.className = _s.slTitle ;
			}
			if(_s.durat_do){
				_s.durat_do.screen.className = _s.durCls;
			}
		}
		

		//##############################//
		/* set active/deactive states */
		//##############################//
		_s.setActive = function(){
			if(_s.isActive_bl) return;
			_s.isActive_bl = true;
			_s.setSelectedState(true);
			_s.setTitleSelectedClass();
		};
		
		_s.setInActive = function(){
			if(!_s.isActive_bl) return;
			_s.isActive_bl = false;
			_s.setNormalState(true);
			_s.updateProgressPercent(0);
			_s.showPlayButton();

			_s.removeTitleSlectedClass();

		};
		

		//##############################//
		/* show pause / play button */
		//##############################//
		_s.showPlayButton = function(){
			if(!_s) return;
			if(!_s.playN_do) return;
			_s.playN_do.setX(0);
			_s.playS_do.setX(0);
			_s.pauseN_do.setX(-300);
			_s.pauseS_do.setX(-300);
		};
		
		_s.showPauseButton = function(){
			if(!_s.playN_do) return;
			_s.playN_do.setX(-300);
			_s.playS_do.setX(-300);
			_s.pauseN_do.setX(0);
			_s.pauseS_do.setX(0);
		};
		

		//##############################//
		/* destroy */
		//##############################//
		_s.destroy = function(){
			if(_s.playNImage_img){
				_s.playNImage_img.onload = '';
				_s.playNImage_img = null;
				_s.playSImage_img.onload = '';
				_s.playSImage_img = null;
				_s.pauseNImage_img.onload = '';
				_s.pauseNImage_img = null;
				_s.pauseSImage_img.onload = '';
				_s.pauseSImage_img = null;
			}

			_s.playlistItemGrad1Path = null;
			_s.playlistItemProgress1 = null;
			_s.playlistPlayButtonN_img = null;
			_s.playlistDownloadButtonN_img = null;
			_s.playlistDownloadButtonS_str = null;
			_s.playlistBuyButtonN_img = null;
			_s.playlistBuyButtonS_str = null;
		
			_s.progress_do = null;
			_s.playPause_do = null;
			_s.playN_do = null;
			_s.playS_do = null;
			_s.pauseN_do = null;
			_s.pauseS_do = null;
			_s.titleText_do = null;
			_s.grad_do = null;
			_s.durat_do = null;
			_s.dumy_do = null;
			
			_s.title_str = null;
			_s.playlistItemBk1Path_str = null;
			_s.playlistItemBk2Path_str = null;
			_s.playlistPlayButtonN_str = null;
			_s.playlistPlayButtonS_str = null;
			_s.playlistPauseButtonN_str = null;
			_s.playlistPauseButtonS_str = null;
			_s.titleNormalColor_str = null;
			_s.trackTitleSelected_str = null;
			_s.durationColor_str = durationColor_str;
			
			_s.setInnerHTML("");
			_s = null;
			prototype = null;
			FWDRAPPlaylistItem.prototype = null;
		};
		
		
		//##########################################//
		/* Update HEX color of a canvaas */
		//##########################################//
		_s.updateHEXColors = function(nBC, n2BC, sBC){
			
			_s.nBC = nBC;
			_s.n2BC = n2BC
			_s.sBC = sBC;
		
			_s.titleNormalColor_str = _s.nBC;
			_s.trackTitleSelected_str = _s.n2BC;
			var btnNclr = '#666666';
			if(window['isWhite']){
				btnNclr = '#888888';
			} 

			if(_s.isSelected_bl) {
				_s.titleText_do.getStyle().color = _s.trackTitleSelected_str;
				if(_s.durat_do) _s.durat_do.getStyle().color = _s.trackTitleSelected_str;
			}else{
				_s.titleText_do.getStyle().color = _s.titleNormalColor_str;
				if(_s.durat_do) _s.durat_do.getStyle().color = _s.titleNormalColor_str;
			}
		
			if(_s.buyButton_do) _s.buyButton_do.updateHEXColors(btnNclr, _s.n2BC);
			if(_s.downloadButton_do) _s.downloadButton_do.updateHEXColors(btnNclr, _s.n2BC);
			
			if(_s.playNImage_img){
				var playNImage_img = FWDRAPUtils.changeCanvasHEXColor(_s.playNImage_img, _s.playNImageCanvas, btnNclr, true);
				var playSImage_img = FWDRAPUtils.changeCanvasHEXColor(_s.playSImage_img, _s.playSImageCanvas, n2BC, true);
				_s.playN_do.getStyle().background = "url('" + playNImage_img.src + "')";
				_s.playS_do.getStyle().background = "url('" + playSImage_img.src + "')";
				
				var pauseNImage_img = FWDRAPUtils.changeCanvasHEXColor(_s.pauseNImage_img, _s.pauseNImageCanvas, btnNclr, true);
				var pauseSImage_img = FWDRAPUtils.changeCanvasHEXColor(_s.pauseSImage_img, _s.pauseSImageCanvas, n2BC, true);
				_s.pauseN_do.getStyle().background = "url('" + pauseNImage_img.src + "')";
				_s.pauseS_do.getStyle().background = "url('" + pauseSImage_img.src + "')";
			}	
		}
	
		_s.init();
	};
	
	/* set prototype */
	FWDRAPPlaylistItem.setPrototype = function(){
		FWDRAPPlaylistItem.prototype = new FWDRAPDisplayObject("div");
	};
	
	FWDRAPPlaylistItem.PLAY = "play";
	FWDRAPPlaylistItem.PAUSE = "pause";
	FWDRAPPlaylistItem.MOUSE_UP = "mouseUp";
	FWDRAPPlaylistItem.DOWNLOAD = "download";
	FWDRAPPlaylistItem.BUY = "buy";

	
	FWDRAPPlaylistItem.prototype = null;
	window.FWDRAPPlaylistItem = FWDRAPPlaylistItem;
	
}());