/**
 * Royal Audio Player
 * Playback rate window.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function (window){
	
	var FWDRAPPlaybackRateWindow = function(_d, prt){

		'use strict';
		
		var _s = this;
		var prototype = FWDRAPPlaybackRateWindow.prototype;
				
		_s.embedColoseN_img = _d.embedColoseN_img;
		_s.bkColor = _d.scrubbersToolTipLabelBackgroundColor;
		
		_s.buttons_ar = [];
		
		_s.embedWindowBackground_str = _d.shareBkPath_str;
		_s.embedWindowCloseButtonMargins = _d.playbackRateButtonsMargins;
		_s.scrubbersHeight = _d.mainScrubberBkLeft_img.height;
		_s.scrubberBkMiddlePath_str = _d.mainScrubberBkMiddlePath_str;
		_s.scrubbersBkLeftAndRightWidth = _d.mainScrubberBkLeft_img.width;
	
		_s.useHEX = _d.useHEX; 
		_s.nBC = _d.nBC;
		_s.sBC = _d.sBC;
		_s.mainScrubberDragMiddlePath_str = _d.mainScrubberDragMiddlePath_str;
		_s.scrubberDragLeftWidth = _d.mainScrubberDragLeft_img.width;
		_s.playbackRateWindowTextColor_str = _d.playbackRateWindowTextColor_str;
		_s.defaultPlaybackRate = _d.defaultPlaybackRate;
		_s.toolTipsButtonFontColor_str = _d.scrubbersToolTipLabelFontColor;
		_s.toopTipPointerUp_str = _d.toopTipPointer_str;
		_s.toopTipBk_str = _d.toopTipBk_str;
			
		_s.totalWidth = 0;
		_s.sW = 0;
		_s.sH = 0;
		_s.minMarginXSpace = 20;
		_s.hSpace = 20;
		_s.minHSpace = 10;
		_s.vSpace = 15;
		_s.minValue = 0.5;
		_s.maxValue = 3.0;
		_s.pointerWidth = 7;
		_s.pointerHeight = 4;
		_s.percent = 0;
		
		_s.toolTip_do;
		
		_s.useVectorIcons_bl = _d.useVectorIcons;
		_s.isMbl = FWDRAPUtils.isMobile;
	

		//#################################//
		/* init */
		//#################################//
		_s.init = function(){
			if(_s.clsBtn) return;
			
			_s.setBackfaceVisibility();
			_s.mainHld = new FWDRAPDisplayObject("div");
			_s.mainHld.hasTransform3d_bl = false;
			_s.mainHld.hasTransform2d_bl = false;
			_s.mainHld.setBackfaceVisibility();
			
			_s.bk_do = new FWDRAPDisplayObject("div");
			_s.bk_do.getStyle().width = "100%";
			_s.bk_do.getStyle().height = "100%";
			_s.bk_do.setAlpha(.9);
			_s.bk_do.screen.className = 'fwdrap-window-background';
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
				_s.clsBtn = new FWDRAPSimpleButton(_d.playbackRateWindowClooseN_img, _d.playbackRateClosePathS_str, undefined,
						true,
						_d.useHEX,
						_d.nBC,
						_d.sBC, 
						false, false, false, true);
			}
			_s.clsBtn.screen.className = 'fwdrap-close-button';
			_s.clsBtn.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.closeButtonOnMouseUpHandler);
			
			_s.addChild(_s.mainHld);
			_s.mainHld.addChild(_s.bk_do);
			_s.mainHld.addChild(_s.clsBtn); 
			
			_s.setupScrubber();
			_s.setupTooltip();
			
		};
	
		_s.closeButtonOnMouseUpHandler = function(){
			if(!_s.isShowed_bl) return;
			_s.hide(true);
		};
		
		_s.positionAndResize = function(){
			_s.sW = prt.sW;
			_s.sH = prt.sH;
			
			var buttonfinalX = _s.sW - _s.clsBtn.w - _s.embedWindowCloseButtonMargins;
			var buttonFinalY = _s.embedWindowCloseButtonMargins;
			var finalY = 0;
			
			_s.clsBtn.setX(buttonfinalX);
			_s.clsBtn.setY(buttonFinalY);
			_s.setY(finalY);
			
			_s.setWidth(_s.sW);
			_s.setHeight(_s.sH);
			_s.mainHld.setWidth(_s.sW);
			_s.mainHld.setHeight(_s.sH);
			_s.positionScruber();
			_s.updateScrubber(_s.percent);
		};
		
		_s.setupTooltip = function(){
			
			_s.mainToolTip_do = new FWDRAPDisplayObject("div");
			_s.mainToolTip_do.setOverflow("visible");
			
			_s.pointerHolder_do = new FWDRAPDisplayObject("div");
			_s.pointerHolder_do.setOverflow('visible');
			_s.addChild(_s.pointerHolder_do);
			_s.mainToolTip_do.getStyle().backgroundColor = _s.bkColor;
			_s.mainToolTip_do.screen.className = 'fwdrap-controler-tooltip-background';
		
			_s.text_do = new FWDRAPDisplayObject("div");
			_s.text_do.hasTransform3d_bl = false;
			_s.text_do.hasTransform2d_bl = false;
			_s.text_do.screen.className = 'fwdrap-controler-tooltip-text';
			_s.text_do.setBackfaceVisibility();
			_s.text_do.setDisplay("inline");
			_s.text_do.getStyle().fontFamily = "Arial";
			_s.text_do.getStyle().fontSize= "12px";
			_s.text_do.getStyle().color = _s.toolTipsButtonFontColor_str;
			_s.text_do.getStyle().whiteSpace= "nowrap";
			_s.text_do.getStyle().padding = "4px 7px";

			_s.pointer_do = new FWDRAPDisplayObject("div");
			_s.pointer_do.screen.className = 'fwdrap-controler-tooltip-pointer';
			_s.pointer_do.setBkColor(_s.bkColor);
			_s.pointer_do.screen.style = "border: 4px solid transparent; border-top-color: " + _s.bkColor + ";";
			_s.pointerHolder_do.addChild(_s.pointer_do);
			
		
			_s.pointer_do.setHeight(_s.pointerHeight);
			_s.mainToolTip_do.addChild(_s.pointerHolder_do);
			_s.mainToolTip_do.addChild(_s.text_do);
			_s.mainHld.addChild(_s.mainToolTip_do);
		};
		

		//##########################################//
		/* set label */
		//##########################################//
		_s.setTooltipLabel = function(label){
		
			if(label == 1) label = "1.0";
			if(label) _s.text_do.setInnerHTML(label);
			
			if(_s.mainToolTip_do.w != 0){
				var finalX = parseInt((_s.mainToolTip_do.w - _s.pointerWidth)/2);
				var finalY = _s.mainToolTip_do.h;
			
				_s.pointer_do.setX(finalX);
				_s.pointer_do.setY(finalY); 
				return;
			}
			
			setTimeout(function(){
				_s.mainToolTip_do.setWidth(_s.text_do.getWidth());
				_s.mainToolTip_do.setHeight(_s.text_do.getHeight());
				
				var finalX = parseInt((_s.mainToolTip_do.w - _s.pointerWidth)/2);
				var finalY = _s.mainToolTip_do.h;
			
				_s.pointer_do.setX(finalX);
				_s.pointer_do.setY(finalY); 
			},50)
		};
		

		//###########################################//
		/* Setup buttons */
		//###########################################//
		_s.setupScrubber = function(){

			//setup background bar
			_s.scrubber_do = new FWDRAPDisplayObject("div");
			_s.scrubber_do.setOverflow('visible');
			_s.scrubber_do.setHeight(_s.scrubbersHeight);
			_s.scrubber_do.setButtonMode(true);
			
			_s.scrubberBkLeft_do = new FWDRAPDisplayObject("img");
			var scrubberBkLeft_img = new Image();
			scrubberBkLeft_img.src = _d.mainScrubberBkLeft_img.src;
			_s.scrubberBkLeft_do.setScreen(scrubberBkLeft_img);
			_s.scrubberBkLeft_do.setWidth(_d.mainScrubberBkLeft_img.wideth);
			_s.scrubberBkLeft_do.setHeight(_d.mainScrubberBkLeft_img.height);
			_s.scrubberBkLeft_do.screen.className = 'fwdrap-scrubber-bk-left';
			
			_s.scrubberBkRight_do = new FWDRAPDisplayObject("img");
			var scrubberBkRight_img = new Image();
			scrubberBkRight_img.src = _d.mainScrubberBkRight_img.src;
			_s.scrubberBkRight_do.setScreen(scrubberBkRight_img);
			_s.scrubberBkRight_do.setWidth(_d.mainScrubberBkRight_img.width);
			_s.scrubberBkRight_do.setHeight(_d.mainScrubberBkRight_img.height);
			_s.scrubberBkRight_do.screen.className = 'fwdrap-scrubber-bk-right';
			
			var middleImage = new Image();
			middleImage.src = _s.scrubberBkMiddlePath_str;

			_s.scrubberBkMiddle_do = new FWDRAPDisplayObject("div");	
			_s.scrubberBkMiddle_do.getStyle().background = "url('" + _s.scrubberBkMiddlePath_str + "')";
			_s.scrubberBkMiddle_do.screen.className = 'fwdrap-scrubber-bk-middle';

			_s.scrubberBkMiddle_do.setHeight(_s.scrubbersHeight);
			_s.scrubberBkMiddle_do.setX(_s.scrubbersBkLeftAndRightWidth);
			
			//setup darg bar.
			_s.scrubberDrag_do = new FWDRAPDisplayObject("div");
			_s.scrubberDrag_do.setHeight(_s.scrubbersHeight);
			
			if(_s.useHEX){
				_s.scrubberDragLeft_do = new FWDRAPDisplayObject("div");
				_s.scrubberDragLeft_do.setWidth(_d.mainScrubberDragLeft_img.width);
				_s.scrubberDragLeft_do.setHeight(_d.mainScrubberDragLeft_img.height);
				_s.scrubberDragLeft_canvas = FWDRAPUtils.getCanvasWithModifiedColor(_d.mainScrubberDragLeft_img, _s.nBC).canvas;
				_s.scrubberDragLeft_do.screen.appendChild(_s.scrubberDragLeft_canvas);	
			}else{
				_s.mainScrubberDragLeft_img = new Image();
				_s.mainScrubberDragLeft_img.src = _d.mainScrubberDragLeft_img.src;
				_s.mainScrubberDragLeft_img.width = _d.mainScrubberDragLeft_img.width;
				_s.mainScrubberDragLeft_img.height = _d.mainScrubberDragLeft_img.height;
				_s.scrubberDragLeft_do = new FWDRAPDisplayObject("img");
				_s.scrubberDragLeft_do.setScreen(_s.mainScrubberDragLeft_img);
			}
			
			_s.mainScrubberMiddleImage = new Image();
			_s.mainScrubberMiddleImage.src = _d.mainScrubberDragMiddlePath_str;
			
			if(_s.useHEX){
				_s.mainScrubberDragMiddle_do = new FWDRAPDisplayObject("div");
				_s.mainScrubberMiddleImage.onload = function(){
					_s.mainScrubberDragMiddle_canvas = FWDRAPUtils.getCanvasWithModifiedColor(_s.mainScrubberMiddleImage, _s.nBC, true);
					_s.mainSCrubberMiddleCanvas = _s.mainScrubberDragMiddle_canvas.canvas;
					_s.mainSCrubberDragMiddleImageBackground = _s.mainScrubberDragMiddle_canvas.image;
					_s.mainScrubberDragMiddle_do.getStyle().background = "url('" + _s.mainSCrubberDragMiddleImageBackground.src + "') repeat-x";
				}
			}else{
				_s.mainScrubberDragMiddle_do = new FWDRAPDisplayObject("div");	
				_s.mainScrubberDragMiddle_do.getStyle().background = "url('" + _s.mainScrubberDragMiddlePath_str + "') repeat-x";
			}
			
			_s.mainScrubberDragMiddle_do.setHeight(_s.scrubbersHeight);
			_s.mainScrubberDragMiddle_do.setX(_s.scrubberDragLeftWidth);
			
		
			_s.scrubberBarLine_do = new FWDRAPDisplayObject("img");
			var scrubberBarLine_img = new Image();
			scrubberBarLine_img.src = _d.mainScrubberLine_img.src;
			_s.scrubberBarLine_do.setScreen(scrubberBarLine_img);
			_s.scrubberBarLine_do.setWidth(_d.mainScrubberLine_img.width);
			_s.scrubberBarLine_do.setHeight(_d.mainScrubberLine_img.height);
			_s.scrubberBarLine_do.setAlpha(0);
			_s.scrubberBarLine_do.hasTransform3d_bl = false;
			_s.scrubberBarLine_do.hasTransform2d_bl = false;
			_s.scrubberBarLine_do.screen.className = 'fwdrap-scrubber-line';
			
			_s.minTime_do = new FWDRAPDisplayObject("div");
			_s.minTime_do.hasTransform3d_bl = false;
			_s.minTime_do.hasTransform2d_bl = false;
			_s.minTime_do.getStyle().fontFamily = "Arial";
			_s.minTime_do.getStyle().fontSize= "12px";
			_s.minTime_do.getStyle().whiteSpace= "nowrap";
			_s.minTime_do.getStyle().textAlign = "left";
			_s.minTime_do.getStyle().color = _s.playbackRateWindowTextColor_str;
			_s.minTime_do.screen.className = 'fwdrap-playbackrate-text';
			_s.minTime_do.setInnerHTML("0.5");
			_s.mainHld.addChild(_s.minTime_do);
			
			_s.maxTime_do = new FWDRAPDisplayObject("div");
			_s.maxTime_do.hasTransform3d_bl = false;
			_s.maxTime_do.hasTransform2d_bl = false;
			_s.maxTime_do.getStyle().fontFamily = "Arial";
			_s.maxTime_do.getStyle().fontSize= "12px";
			_s.maxTime_do.getStyle().whiteSpace= "nowrap";
			_s.maxTime_do.getStyle().textAlign = "left";
			_s.maxTime_do.getStyle().color = _s.playbackRateWindowTextColor_str;
			_s.maxTime_do.screen.className = 'fwdrap-playbackrate-text';
			_s.maxTime_do.setInnerHTML("3.0");
			_s.mainHld.addChild(_s.maxTime_do);
			
			//add all children
			_s.scrubber_do.addChild(_s.scrubberBkLeft_do);
			_s.scrubber_do.addChild(_s.scrubberBkMiddle_do);
			_s.scrubber_do.addChild(_s.scrubberBkRight_do);
			_s.scrubber_do.addChild(_s.scrubberBarLine_do);
			_s.scrubberDrag_do.addChild(_s.scrubberDragLeft_do);
			_s.scrubberDrag_do.addChild(_s.mainScrubberDragMiddle_do);
			_s.scrubber_do.addChild(_s.scrubberDrag_do);
			_s.scrubber_do.addChild(_s.scrubberBarLine_do);
			_s.mainHld.addChild(_s.scrubber_do);
			
			
			if(_s.isMbl){
				if(_s.hasPointerEvent_bl){
					_s.scrubber_do.screen.addEventListener("pointerover", _s.mainScrubberOnOverHandler);
					_s.scrubber_do.screen.addEventListener("pointerout", _s.mainScrubberOnOutHandler);
					_s.scrubber_do.screen.addEventListener("pointerdown", _s.mainScrubberOnDownHandler);
				}else{
					_s.scrubber_do.screen.addEventListener("touchstart", _s.mainScrubberOnDownHandler);
				}
			}else if(_s.screen.addEventListener){	
				_s.scrubber_do.screen.addEventListener("mouseover", _s.mainScrubberOnOverHandler);
				_s.scrubber_do.screen.addEventListener("mouseout", _s.mainScrubberOnOutHandler);
				_s.scrubber_do.screen.addEventListener("mousedown", _s.mainScrubberOnDownHandler);
			}
		}
		
		_s.mainScrubberOnOverHandler =  function(e){};
		
		_s.mainScrubberOnOutHandler =  function(e){};
		
		_s.mainScrubberOnDownHandler =  function(e){
			
			if(e.preventDefault) e.preventDefault();
			_s.isScrubbing_bl = true;
			var viewportMouseCoordinates = FWDRAPUtils.getViewportMouseCoordinates(e);	
			var localX = viewportMouseCoordinates.screenX - _s.scrubber_do.getGlobalX();
			
			if(localX < 0){
				localX = 0;
			}else if(localX > _s.scruberWidth - _s.scrubbersOffsetWidth){
				localX = _s.scruberWidth - _s.scrubbersOffsetWidth;
			}	
			var percentScrubbed = localX/_s.scruberWidth;
			var playlistItemPercentScrubb = localX/_s.scruberWidth;
			
			if(_s.disable_do) _s.addChild(_s.disable_do);
			
			_s.updateScrubber(percentScrubbed);
			
			_s.dispatchEvent(FWDRAPController.START_TO_SCRUB);
			_s.dispatchEvent(FWDRAPController.SCRUB_PLAYLIST_ITEM, {percent:playlistItemPercentScrubb});
			_s.dispatchEvent(FWDRAPController.SCRUB, {percent:percentScrubbed});
			
			if(_s.isMbl){
				if(_s.hasPointerEvent_bl){
					window.addEventListener("pointermove", _s.mainScrubberMoveHandler);
					window.addEventListener("pointerup", _s.mainScrubberEndHandler);
				}else{
					window.addEventListener("touchmove", _s.mainScrubberMoveHandler, {passive:false});
					window.addEventListener("touchend", _s.mainScrubberEndHandler);
				}
			}else{
				window.addEventListener("mousemove", _s.mainScrubberMoveHandler);
				window.addEventListener("mouseup", _s.mainScrubberEndHandler);		
			}
		};
		
		_s.mainScrubberMoveHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			var viewportMouseCoordinates = FWDRAPUtils.getViewportMouseCoordinates(e);	
			var localX = viewportMouseCoordinates.screenX - _s.scrubber_do.getGlobalX();
			
			if(localX < 0){
				localX = 0;
			}else if(localX > _s.scruberWidth - _s.scrubbersOffsetWidth){
				localX = _s.scruberWidth - _s.scrubbersOffsetWidth;
			}
			
			var percentScrubbed = localX/_s.scruberWidth;
			var playlistItemPercentScrubb = localX/_s.scruberWidth;
			
			_s.updateScrubber(percentScrubbed);
			_s.dispatchEvent(FWDRAPController.SCRUB_PLAYLIST_ITEM, {percent:playlistItemPercentScrubb});
			_s.dispatchEvent(FWDRAPController.SCRUB, {percent:percentScrubbed});
		};
		
		_s.mainScrubberEndHandler = function(e){
			_s.isScrubbing_bl = false;
			if(_s.disable_do){
				if(_s.contains(_s.disable_do)) _s.removeChild(_s.disable_do);
			}
			_s.updateScrubber();
		
			_s.dispatchEvent(FWDRAPController.STOP_TO_SCRUB);
			if(_s.isMbl){
				if(_s.hasPointerEvent_bl){
					window.removeEventListener("pointermove", _s.mainScrubberMoveHandler);
					window.removeEventListener("pointerup", _s.mainScrubberEndHandler);
				}else{
					window.removeEventListener("touchmove", _s.mainScrubberMoveHandler);
					window.removeEventListener("touchend", _s.mainScrubberEndHandler);
				}
			}else{
				if(window.removeEventListener){
					window.removeEventListener("mousemove", _s.mainScrubberMoveHandler);
					window.removeEventListener("mouseup", _s.mainScrubberEndHandler);		
				}else if(document.detachEvent){
					document.detachEvent("onmousemove", _s.mainScrubberMoveHandler);
					document.detachEvent("onmouseup", _s.mainScrubberEndHandler);		
				}
			}
		};
		
		_s.updateScrubber = function(percent, set){
			_s.percent = percent;
			if(percent < 0){
				percent = 0;
			}else if(percent > 1){
				percent = 1;
			}

			var finalWidth = parseInt(percent * _s.scruberWidth); 
			
			if(_s.isScrubbing_bl || set){
				_s.defaultPlaybackRate = Number(_s.minValue + (_s.maxValue - _s.minValue) * finalWidth / _s.scruberWidth).toFixed(1);
			}else{
				finalWidth = (_s.defaultPlaybackRate - _s.minValue) / (_s.maxValue - _s.minValue) * _s.scruberWidth;
			}
			
			if(finalWidth < 1 && _s.isMainScrubberLineVisible_bl){
				_s.isMainScrubberLineVisible_bl = false;
				FWDAnimation.to(_s.scrubberBarLine_do, .5, {alpha:0});
			}else if(finalWidth > 2 && !_s.isMainScrubberLineVisible_bl){
				_s.isMainScrubberLineVisible_bl = true;
				FWDAnimation.to(_s.scrubberBarLine_do, .5, {alpha:1});
			}
			
			_s.scrubberDrag_do.setWidth(finalWidth);
			
			_s.setTooltipLabel(_s.defaultPlaybackRate);
			_s.mainToolTip_do.setX(_s.scrubber_do.x + finalWidth - Math.round(_s.mainToolTip_do.w/2) + 1);
			_s.mainToolTip_do.setY(_s.scrubber_do.y - _s.mainToolTip_do.h - 5);
			
			if(finalWidth > _s.scruberWidth - _s.scrubbersOffsetWidth) finalWidth = _s.scruberWidth - _s.scrubbersOffsetWidth;
			FWDAnimation.to(_s.scrubberBarLine_do, .8, {x:finalWidth, ease:Expo.easeOut});
			
			_s.dispatchEvent(FWDRAPPlaybackRateWindow.SET_PLAYBACK_RATE, {rate:_s.defaultPlaybackRate});
		};
		
		
		//########################################//
		/* Position buttons */
		//########################################//
		_s.positionScruber = function(){
			_s.scruberWidth = Math.min(600, _s.sW - 100);
			_s.scrubber_do.setWidth(_s.scruberWidth);
			_s.scrubber_do.setX(Math.round((_s.sW - _s.scruberWidth)/2));
			_s.scrubber_do.setY(Math.round((_s.sH - _s.scrubbersHeight)/2));
			_s.scrubberBkMiddle_do.setWidth(_s.scruberWidth - _s.scrubbersBkLeftAndRightWidth * 2);
			_s.scrubberBkRight_do.setX(_s.scruberWidth - _s.scrubbersBkLeftAndRightWidth);
			_s.mainScrubberDragMiddle_do.setWidth(_s.scruberWidth - _s.scrubbersBkLeftAndRightWidth);
			_s.minTime_do.setX(_s.scrubber_do.x - 26);
			_s.minTime_do.setY(_s.scrubber_do.y + 4);
			_s.maxTime_do.setX(_s.scrubber_do.x + _s.scrubber_do.w + 8);
			_s.maxTime_do.setY(_s.scrubber_do.y + 4);
		}
		

		//###########################################//
		/* show / hide */
		//###########################################//
		_s.show = function(id){
			if(_s.isShowed_bl) return;
			_s.isShowed_bl = true;
			prt.main_do.addChild(_s);

			_s.init();


			if(!FWDRAPUtils.isMobile || (FWDRAPUtils.isMobile && FWDRAPUtils.hasPointerEvent)) prt.main_do.setSelectable(true);

			if(_s.useVectorIcons_bl){
				_s.checkButtonsId_to = setInterval(function(){
					
					if(_s.clsBtn.w != 0){
				
						_s.positionAndResize();
						
						clearInterval(_s.checkButtonsId_to);
						clearTimeout(_s.hideCompleteId_to);
						clearTimeout(_s.showCompleteId_to);
						_s.mainHld.setY(- _s.sH);

						_s.positionScruber();
						setTimeout(function(){
							_s.updateScrubber(_s.percent);
						},200)
						
						_s.showCompleteId_to = setTimeout(_s.showCompleteHandler, 900);
						
						FWDAnimation.to(_s.mainHld, .8, {y:0, delay:.1, ease:Expo.easeInOut});
					
					}
				
				}, 50);
			}else{

				_s.positionAndResize();
				
				clearTimeout(_s.hideCompleteId_to);
				clearTimeout(_s.showCompleteId_to);
				_s.mainHld.setY(- _s.sH);
				
				_s.positionScruber();
				setTimeout(function(){
					_s.updateScrubber(_s.percent);
				},200)
				
				_s.showCompleteId_to = setTimeout(_s.showCompleteHandler, 900);
				setTimeout(function(){
					FWDAnimation.to(_s.mainHld, .8, {y:0, delay:.1, ease:Expo.easeInOut});
				}, 100);
			}
		};
		
		_s.showCompleteHandler = function(){};
		
		_s.hide = function(animate){
			if(!_s.isShowed_bl) return;
			_s.isShowed_bl = false;
			
			if(prt.customContextMenu_do) prt.customContextMenu_do.enable();
			
			clearTimeout(_s.hideCompleteId_to);
			clearTimeout(_s.showCompleteId_to);
			
			if(!FWDRAPUtils.isMobile || (FWDRAPUtils.isMobile && FWDRAPUtils.hasPointerEvent)) prt.main_do.setSelectable(false);
			_s.hideCompleteId_to = setTimeout(_s.hideCompleteHandler, 800);
			FWDAnimation.killTweensOf(_s.mainHld);
			if(animate){
				FWDAnimation.to(_s.mainHld, .8, {y:-_s.sH, ease:Expo.easeInOut});
			}else{
				_s.hideCompleteHandler();
			}
		};
		
		_s.hideCompleteHandler = function(){
			if(prt.main_do.contains(_s)) prt.main_do.removeChild(_s);
			_s.dispatchEvent(FWDRAPPlaybackRateWindow.HIDE_COMPLETE);
			
		};
		
		//##########################################//
		/* Update HEX color of a canvaas */
		//##########################################//
		_s.updateHEXColors = function(normalColor_str, selectedColor_str){
			
			if(_d.skinPath_str.indexOf("hex_white") != -1){
				_s.selectedColor_str = "#FFFFFF";
			}else{
				_s.selectedColor_str = selectedColor_str;
			}
			
			_s.clsBtn.updateHEXColors(normalColor_str, _s.selectedColor_str);
			FWDRAPUtils.changeCanvasHEXColor(_s.mainScrubberDragLeft_img, _s.scrubberDragLeft_canvas, normalColor_str);
			
			
			var newCenterImage = FWDRAPUtils.changeCanvasHEXColor(_s.mainScrubberMiddleImage, _s.mainSCrubberMiddleCanvas, normalColor_str, true);
			_s.mainScrubberDragMiddle_do.getStyle().background = "url('" + newCenterImage.src + "') repeat-x";
			
		}
	
		if(_d.useHEX){
			_s.init();
		}
	};

		
	/* set prototype */
	FWDRAPPlaybackRateWindow.setPrototype = function(){
		FWDRAPPlaybackRateWindow.prototype = new FWDRAPDisplayObject("div");
	};
	
	FWDRAPPlaybackRateWindow.HIDE_COMPLETE = "hideComplete";
	FWDRAPPlaybackRateWindow.SET_PLAYBACK_RATE = "setPlaybackRate";
	
	FWDRAPPlaybackRateWindow.prototype = null;
	window.FWDRAPPlaybackRateWindow = FWDRAPPlaybackRateWindow;
}(window));