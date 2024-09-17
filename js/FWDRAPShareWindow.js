/**
 * Royal Audio Player
 * Share window.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function (window){
	
	var FWDRAPShareWindow = function(_d, prt){

		'use strict';
		
		var _s = this;
		var prototype = FWDRAPShareWindow.prototype;
				
		_s.embedColoseN_img = _d.embedColoseN_img;
	
		_s.buttons_ar = [];
		
		_s.embedWindowBackground_str = _d.shareBkPath_str;
		_s.embedWindowCloseButtonMargins = _d.playbackRateButtonsMargins;
			
		_s.totalWidth = 0;
		_s.sW = 0;
		_s.sH = 0;
		_s.minMarginXSpace = 20;
		_s.hSpace = 20;
		_s.minHSpace = 10;
		_s.vSpace = 15;
		
		_s.useVectorIcons_bl = _d.useVectorIcons;
		_s.isMbl = FWDRAPUtils.isMobile;
	

		//#################################//
		/* init */
		//#################################//
		_s.init = function(){
			if(_s.clsBtn) return;
			if(_d.skinPath_str.indexOf("hex_white") != -1){
				_s.sBC = "#FFFFFF";
			}else{
				_s.sBC = _d.sBC;
			}
			
			_s.setBackfaceVisibility();
			_s.mainHld = new FWDRAPDisplayObject("div");
			_s.mainHld.hasTransform3d_bl = false;
			_s.mainHld.hasTransform2d_bl = false;
			_s.mainHld.setBackfaceVisibility();

			
			_s.bk_do = new FWDRAPDisplayObject("div");
			_s.bk_do.screen.className = 'fwdrap-window-background';
			_s.bk_do.getStyle().width = "100%";
			_s.bk_do.getStyle().height = "100%";
			_s.bk_do.setAlpha(.9);
			_s.bk_do.getStyle().background = "url('" + _s.embedWindowBackground_str + "')";
			
			//setup close button
			FWDRAPSimpleButton.setPrototype();
			
			if(_s.useVectorIcons_bl){
				_s.clsBtn = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<div class='table-fwdrap-button'><span class='table-cell-fwdrap-button fwdrap-icon-close'></span></div>",
						"fwdrap-categories-next-and-prev-normal-state",
						"fwdrap-categories-next-and-prev-selected-state"
				);
			}else{
				_s.clsBtn = new FWDRAPSimpleButton(_d.shareClooseN_img, _d.embedWindowClosePathS_str, undefined,
					true,
					_d.useHEX,
					_d.nBC,
					_s.sBC,
					false, false, false, true);
			}
			
			_s.clsBtn.screen.className = 'fwdrap-close-button';
			_s.clsBtn.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.closeButtonOnMouseUpHandler);
			
			_s.addChild(_s.mainHld);
			_s.mainHld.addChild(_s.bk_do);
			_s.mainHld.addChild(_s.clsBtn); 
			
			_s.setupButtons();
		};
	
		_s.closeButtonOnMouseUpHandler = function(){
			if(!_s.isShowed_bl) return;
			_s.hide();
		};
		
		_s.positionAndResize = function(){
			_s.sW = prt.sW;
			_s.sH = prt.sH;
			
			_s.clsBtn.setX(_s.sW - _s.clsBtn.w - _s.embedWindowCloseButtonMargins);
			_s.clsBtn.setY(_s.embedWindowCloseButtonMargins);
			
			_s.setWidth(_s.sW);
			_s.setHeight(_s.sH);
			_s.mainHld.setWidth(_s.sW);
			_s.mainHld.setHeight(_s.sH);
			_s.positionButtons();
		};
		
	
		//###########################################//
		/* Setup buttons */
		//###########################################//
		_s.setupButtons = function(){
			
			FWDRAPSimpleButton.setPrototype();
			if(_s.useVectorIcons_bl){
				_s.facebookButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='uvpicon fwdrap-icon-facebook'></span>",
						"fwdrap-social-media-buttons-normal-state",
						"fwdrap-social-media-buttons-selected-state"
				);
			}else{
				_s.facebookButton_do = new FWDRAPSimpleButton(_d.facebookN_img, _d.facebookSPath_str, undefined,
						true,
						_d.useHEX,
						_d.nBC,
						_d.sBC);
			}
			_s.facebookButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.facebookOnMouseUpHandler);
			_s.buttons_ar.push(_s.facebookButton_do);
			
			
			FWDRAPSimpleButton.setPrototype();
			if(_s.useVectorIcons_bl){
				_s.googleButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='uvpicon fwdrap-icon-google-plus'></span>",
						"fwdrap-social-media-buttons-normal-state",
						"fwdrap-social-media-buttons-selected-state"
				);
			}else{
				_s.googleButton_do = new FWDRAPSimpleButton(_d.googleN_img, _d.googleSPath_str, undefined,
						true,
						_d.useHEX,
						_d.nBC,
						_d.sBC);
			}
			_s.googleButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.googleOnMouseUpHandler);
			_s.buttons_ar.push(_s.googleButton_do);
			
			FWDRAPSimpleButton.setPrototype();
			if(_s.useVectorIcons_bl){
				_s.twitterButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='uvpicon fwdrap-icon-twitter'></span>",
						"fwdrap-social-media-buttons-normal-state",
						"fwdrap-social-media-buttons-selected-state"
				);
			}else{
				_s.twitterButton_do = new FWDRAPSimpleButton(_d.twitterN_img, _d.twitterSPath_str, undefined,
						true,
						_d.useHEX,
						_d.nBC,
						_d.sBC);
			}
			_s.twitterButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.twitterOnMouseUpHandler);
			_s.buttons_ar.push(_s.twitterButton_do);
			
			FWDRAPSimpleButton.setPrototype();
			if(_s.useVectorIcons_bl){
				_s.likedinButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='uvpicon fwdrap-icon-linkedin'></span>",
						"fwdrap-social-media-buttons-normal-state",
						"fwdrap-social-media-buttons-selected-state"
				);
			}else{
				_s.likedinButton_do = new FWDRAPSimpleButton(_d.likedInkN_img, _d.likedInSPath_str, undefined,
						true,
						_d.useHEX,
						_d.nBC,
						_d.sBC);
			}
			_s.likedinButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.likedinOnMouseUpHandler);
			_s.buttons_ar.push(_s.likedinButton_do);
			
			FWDRAPSimpleButton.setPrototype();
			if(_s.useVectorIcons_bl){
				_s.bufferButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='uvpicon fwdrap-icon-buffer'></span>",
						"fwdrap-social-media-buttons-normal-state",
						"fwdrap-social-media-buttons-selected-state"
				);
			}else{
				_s.bufferButton_do = new FWDRAPSimpleButton(_d.bufferkN_img, _d.bufferSPath_str, undefined,
						true,
						_d.useHEX,
						_d.nBC,
						_d.sBC);
			}
			_s.bufferButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.bufferOnMouseUpHandler);
			_s.buttons_ar.push(_s.bufferButton_do);
			
			FWDRAPSimpleButton.setPrototype();
			if(_s.useVectorIcons_bl){
				_s.diggButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='uvpicon fwdrap-icon-digg'></span>",
						"fwdrap-social-media-buttons-normal-state",
						"fwdrap-social-media-buttons-selected-state"
				);
			}else{
				_s.diggButton_do = new FWDRAPSimpleButton(_d.diggN_img, _d.diggSPath_str, undefined,
						true,
						_d.useHEX,
						_d.nBC,
						_d.sBC);
			}
			_s.diggButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.diggOnMouseUpHandler);
			_s.buttons_ar.push(_s.diggButton_do);
			
			FWDRAPSimpleButton.setPrototype();
			if(_s.useVectorIcons_bl){
				_s.redditButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='uvpicon fwdrap-icon-reddit'></span>",
						"fwdrap-social-media-buttons-normal-state",
						"fwdrap-social-media-buttons-selected-state"
				);
			}else{
				_s.redditButton_do = new FWDRAPSimpleButton(_d.redditN_img, _d.redditSPath_str, undefined,
						true,
						_d.useHEX,
						_d.nBC,
						_d.sBC);
			}
			_s.redditButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.redditOnMouseUpHandler);
			_s.buttons_ar.push(_s.redditButton_do);
			
			FWDRAPSimpleButton.setPrototype();
			if(_s.useVectorIcons_bl){
				_s.thumbrlButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='uvpicon fwdrap-icon-tumblr'></span>",
						"fwdrap-social-media-buttons-normal-state",
						"fwdrap-social-media-buttons-selected-state"
				);
			}else{
				_s.thumbrlButton_do = new FWDRAPSimpleButton(_d.thumbrlN_img, _d.thumbrlSPath_str, undefined,
						true,
						_d.useHEX,
						_d.nBC,
						_d.sBC);
			}
			_s.thumbrlButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.thumbrlOnMouseUpHandler);
			_s.buttons_ar.push(_s.thumbrlButton_do);
			
			_s.mainHld.addChild(_s.facebookButton_do);
			_s.mainHld.addChild(_s.googleButton_do);
			_s.mainHld.addChild(_s.twitterButton_do);
			_s.mainHld.addChild(_s.likedinButton_do);
			_s.mainHld.addChild(_s.bufferButton_do);
			_s.mainHld.addChild(_s.diggButton_do);
			_s.mainHld.addChild(_s.redditButton_do);
			_s.mainHld.addChild(_s.thumbrlButton_do);
		}
		
		
		_s.facebookOnMouseUpHandler = function(){
			var url = "http://www.facebook.com/share.php?u=" + encodeURIComponent(location.href);
			window.open(url,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600');
		};
		
		_s.googleOnMouseUpHandler = function(){
			var url = "https://plus.google.com/share?url=" + encodeURIComponent(location.href)
			window.open(url,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600');
		};
		
		_s.twitterOnMouseUpHandler = function(){
			var url = "http://twitter.com/home?status=" + encodeURIComponent(location.href)
			window.open(url,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600');
		};
		
		_s.likedinOnMouseUpHandler = function(){
			var url = "https://www.linkedin.com/cws/share?url=" + location.href;
			window.open(url,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600');
		};
		
		_s.bufferOnMouseUpHandler = function(){
			var url = "https://buffer.com/add?url=" + location.href;
			window.open(url,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600');
		};
		
		_s.diggOnMouseUpHandler = function(){
			var url = "http://digg.com/submit?url=" + location.href;
			window.open(url,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600');
		};
		
		_s.redditOnMouseUpHandler = function(){
			var url = "https://www.reddit.com/?submit=" + location.href;
			window.open(url,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600');
		};
		
		_s.thumbrlOnMouseUpHandler = function(){
			var url = "http://www.tumblr.com/share/link?url=" + location.href;
			window.open(url,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600');
		};
	
		
		//########################################//
		/* Position buttons */
		//########################################//
		_s.positionButtons = function(){
			var button;
			var prevButton;
			var rowsAr = [];
			var rowsWidthAr = [];
			var rowsThumbsWidthAr = [];
			var tempX;
			var tempY = 0;
			var maxY = 0;
			var totalRowWidth = 0;
			var rowsNr = 0;
			
			rowsAr[rowsNr] = [0];
			rowsWidthAr[rowsNr] = _s.buttons_ar[0].totalWidth;
			rowsThumbsWidthAr[rowsNr] = _s.buttons_ar[0].totalWidth;
			_s.totalButtons = _s.buttons_ar.length;
			
			for (var i=1; i<_s.totalButtons; i++){
				button = _s.buttons_ar[i];
				
				if (rowsWidthAr[rowsNr] + button.totalWidth + _s.minHSpace > _s.sW - _s.minMarginXSpace){	
					rowsNr++;
					rowsAr[rowsNr] = [];
					rowsAr[rowsNr].push(i);
					rowsWidthAr[rowsNr] = button.totalWidth;
					rowsThumbsWidthAr[rowsNr] = button.totalWidth;
				}else{
					rowsAr[rowsNr].push(i);
					rowsWidthAr[rowsNr] += button.totalWidth + _s.minHSpace;
					rowsThumbsWidthAr[rowsNr] += button.totalWidth;
				}
			}
		
			tempY = parseInt((_s.sH - ((rowsNr + 1) * (button.totalHeight + _s.vSpace) - _s.vSpace))/2);
			
			for (var i=0; i<rowsNr + 1; i++){
				var rowMarginXSpace = 0;
				
				var rowHSpace;
				
				if (rowsAr[i].length > 1){
					rowHSpace = Math.min((_s.sW - _s.minMarginXSpace - rowsThumbsWidthAr[i]) / (rowsAr[i].length - 1), _s.hSpace);
					
					var rowWidth = rowsThumbsWidthAr[i] + rowHSpace * (rowsAr[i].length - 1);
					
					rowMarginXSpace = parseInt((_s.sW - rowWidth)/2);
				}else{
					rowMarginXSpace = parseInt((_s.sW - rowsWidthAr[i])/2);
				}
				
				if (i > 0) tempY += button.h + _s.vSpace;
				
				for (var j=0; j<rowsAr[i].length; j++){
					button = _s.buttons_ar[rowsAr[i][j]];
				
					if (j == 0){
						tempX = rowMarginXSpace;
					}else{
						prevButton = _s.buttons_ar[rowsAr[i][j] - 1];
						tempX = prevButton.finalX + prevButton.totalWidth + rowHSpace;
					}
					

					button.finalX = tempX;
					button.finalY = tempY;
						
					if (maxY < button.finalY) maxY = button.finalY;
					
					_s.buttonsBarTotalHeight = maxY + button.totalHeight + _s.startY ;
					button.setX(button.finalX);
					button.setY(button.finalY);
				}
			}
		}
		
		
		//###########################################//
		/* show / hide */
		//###########################################//
		this.show = function(id){
			if(_s.isShowed_bl) return;
			_s.isShowed_bl = true;
			prt.main_do.addChild(_s);
			_s.init();
		
			if(_s.useVectorIcons_bl){
				_s.checkButtonsId_to = setInterval(function(){
					
					if(_s.clsBtn.w != 0){
				
						_s.positionAndResize();
						
						clearInterval(_s.checkButtonsId_to);
						clearTimeout(_s.hideCompleteId_to);
						clearTimeout(_s.showCompleteId_to);
						_s.mainHld.setY(- _s.sH);
						
						_s.showCompleteId_to = setTimeout(_s.showCompleteHandler, 900);
						
						FWDAnimation.to(_s.mainHld, .8, {y:0, delay:.1, ease:Expo.easeInOut});
					
					}
				
				}, 50);
			}else{
				_s.positionAndResize();
			
				clearTimeout(_s.hideCompleteId_to);
				clearTimeout(_s.showCompleteId_to);
				_s.mainHld.setY(- _s.sH);
				
				_s.showCompleteId_to = setTimeout(_s.showCompleteHandler, 900);
				setTimeout(function(){
					FWDAnimation.to(_s.mainHld, .8, {y:0, delay:.1, ease:Expo.easeInOut});
				}, 100);
			}
		};
		
		_s.showCompleteHandler = function(){};
		
		_s.hide = function(){
			if(!_s.isShowed_bl) return;
			_s.isShowed_bl = false;
			
			if(prt.customContextMenu_do) prt.customContextMenu_do.enable();
		
			clearTimeout(_s.hideCompleteId_to);
			clearTimeout(_s.showCompleteId_to);
			
			if(!FWDRAPUtils.isMobile || (FWDRAPUtils.isMobile && FWDRAPUtils.hasPointerEvent)) prt.main_do.setSelectable(false);
			_s.hideCompleteId_to = setTimeout(_s.hideCompleteHandler, 800);
			FWDAnimation.killTweensOf(_s.mainHld);
			FWDAnimation.to(_s.mainHld, .8, {y:-_s.sH, ease:Expo.easeInOut});
		};
		
		_s.hideCompleteHandler = function(){
			prt.main_do.removeChild(_s);
			_s.dispatchEvent(FWDRAPShareWindow.HIDE_COMPLETE);
		};
	
		if(_d.useHEX){
			_s.init();
		}
	};
	
		
	/* set prototype */
	FWDRAPShareWindow.setPrototype = function(){
		FWDRAPShareWindow.prototype = new FWDRAPDisplayObject("div");
	};
	
	FWDRAPShareWindow.HIDE_COMPLETE = "hideComplete";
	
	FWDRAPShareWindow.prototype = null;
	window.FWDRAPShareWindow = FWDRAPShareWindow;
}(window));