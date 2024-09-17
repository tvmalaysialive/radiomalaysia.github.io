/**
 * Royal Audio Player
 * Playlist select box.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function (window){
	
	var FWDRAPComboBox = function(prt, props_obj){

		'use strict';
		
		var _s = this;
		var prototype = FWDRAPComboBox.prototype;
		
		_s.categories_ar = props_obj.categories_ar;
		_s.buttons_ar = [];
		
	
		_s.arrowW = props_obj.arrowW;
		_s.arrowH = props_obj.arrowH;
		
		_s.useHEX = prt._d.useHEX; 
		_s.nBC = prt._d.nBC;
		_s.sBC = prt._d.sBC;
	
		_s.arrowN_str = props_obj.arrowN_str 
		_s.arrowS_str = props_obj.arrowS_str;
		_s.bk1_str = props_obj.bk1_str;
		_s.bk2_str = props_obj.bk2_str;
		
		_s.selectorLabel_str = props_obj.selectorLabel;
		_s.selectorBkColorN_str = props_obj.selectorBackgroundNormalColor;
		_s.selectorBkColorS_str = props_obj.selectorBackgroundSelectedColor;
		_s.selectorTextColorN_str = props_obj.selectorTextNormalColor;
		_s.selectorTextColorS_str = props_obj.selectorTextSelectedColor;
		
		_s.itemBkColorN_str = props_obj.buttonBackgroundNormalColor;
		_s.itemBkColorS_str = props_obj.buttonBackgroundSelectedColor;
		_s.itemTextColorN_str = props_obj.buttonTextNormalColor;
		_s.itemTextColorS_str = props_obj.buttonTextSelectedColor;
		
		_s.scrollBarHandlerFinalY = 0;
		
		_s.finalX;
		_s.finalY;
		_s.totalButtons = _s.categories_ar.length;
		_s.curId = props_obj.startAtPlaylist;
		_s.buttonsHolderWidth = 0;
		_s.buttonsHolderHeight = 0;
		_s.totalWidth = prt.sW;
		_s.buttonHeight = props_obj.buttonHeight;
		
		_s.totalButtonsHeight = 0;
		_s.sapaceBetweenButtons = 0;
		_s.thumbnailsFinalY = 0;
		_s.vy = 0;
		_s.vy2 = 0;
		_s.friction = .9;
		
		_s.addMouseWheelSupport_bl = prt._d.addScrollBarMouseWheelSupport_bl;
		_s.scollbarSpeedSensitivity = .5;
		_s.hasPointerEvent_bl = FWDRAPUtils.hasPointerEvent;
		_s.isMbl = FWDRAPUtils.isMobile;
		
		_s.init = function(){
			_s.setOverflow("visible");
			_s.setupMainContainers();
			_s.setupScrollLogic();
			_s.getMaxWidthResizeAndPosition();
			_s.setupSeparator();
			_s.mainButtonsHolder_do.setVisible(false);
			_s.bk_do.setVisible(false);
			
		};

		
		//###############################//
		/* setup separator */
		//###############################//
		_s.setupSeparator = function(){
			_s.separator_do = new FWDRAPDisplayObject("div");
			_s.separator_do.setBackfaceVisibility();
			_s.separator_do.hasTransform3d_bl = false;
			_s.separator_do.hasTransform2d_bl = false;
			_s.separator_do.getStyle().background = "url('" + prt.playlistSeparator_img.src + "')";
			_s.separator_do.screen.className = 'fwdrap-controler-separator';
			_s.separator_do.setHeight(prt.playlistSeparator_img.height);
			_s.separator_do.setY(_s.buttonHeight);
			_s.addChild(_s.separator_do);
		};

		
		//#####################################//
		/* setup main containers */
		//####################################//
		_s.setupMainContainers = function(){
			var button_do;
			
			_s.mainHolder_do = new FWDRAPDisplayObject("div");
			_s.mainHolder_do.setOverflow("visible");
			_s.addChild(_s.mainHolder_do);
			
			_s.bk_do = new FWDRAPDisplayObject("div");
			_s.bk_do.setY(_s.buttonHeight);
			_s.bk_do.screen.className = 'fwdrap-playlist-background';
			_s.bk_do.setBkColor(prt.playlistBackgroundColor_str);
			_s.bk_do.setAlpha(0);
			
			_s.mainHolder_do.addChild(_s.bk_do);
			
			_s.mainButtonsHolder_do = new FWDRAPDisplayObject("div");
			_s.mainButtonsHolder_do.setY(_s.buttonHeight);
			_s.mainHolder_do.addChild(_s.mainButtonsHolder_do);
			
			if(!prt.expandPlaylistBackground_bl){
				_s.dummyBk_do =  new FWDRAPDisplayObject("div");
				_s.dummyBk_do.getStyle().background = "url('" + prt.controllerBkPath_str +  "')";
			}else{
				_s.dummyBk_do = new FWDRAPDisplayObject("img");
				var imageBk_img = new Image();
				imageBk_img.src = prt.controllerBkPath_str;
				_s.dummyBk_do.setScreen(imageBk_img);
				_s.dummyBk_do.getStyle().backgroundColor = "#000000";
			}
			_s.dummyBk_do.screen.className = 'fwdrap-combobox-background';
	
			_s.dummyBk_do.setHeight(_s.buttonHeight);
			_s.mainHolder_do.addChild(_s.dummyBk_do);
			
			_s.buttonsHolder_do = new FWDRAPDisplayObject("div");
			_s.mainButtonsHolder_do.addChild(_s.buttonsHolder_do);
			
			var selLabel = _s.selectorLabel_str;
			
			if(_s.selectorLabel_str == "default"){
				selLabel = _s.categories_ar[_s.curId];
			}
			
			FWDRAPComboBoxSelector.setPrototype();

			_s.selector_do = new FWDRAPComboBoxSelector(
					11,
					6,
					props_obj.arrowN_str,
					props_obj.arrowS_str,
					selLabel,
					_s.selectorBkColorN_str,
					_s.selectorBkColorS_str,
					_s.selectorTextColorN_str,
					_s.selectorTextColorS_str,
					_s.buttonHeight,
					_s.useHEX,
					_s.nBC,
					_s.sBC);
			_s.mainHolder_do.addChild(_s.selector_do);
			_s.selector_do.setNormalState(false);
			_s.selector_do.addListener(FWDRAPComboBoxSelector.MOUSE_DOWN, _s.openMenuHandler);
			
			for(var i=0; i<_s.totalButtons; i++){
				FWDRAPComboBoxButton.setPrototype();
				button_do = new FWDRAPComboBoxButton(
						_s,
						_s.categories_ar[i],
						_s.bk1_str,
						_s.bk2_str,
						_s.itemBkColorN_str,
						_s.itemBkColorS_str,
						_s.itemTextColorN_str,
						_s.itemTextColorS_str,
						i,
						_s.buttonHeight);
				_s.buttons_ar[i] = button_do;
				button_do.addListener(FWDRAPComboBoxButton.MOUSE_DOWN, _s.buttonOnMouseDownHandler);
				_s.buttonsHolder_do.addChild(button_do);
			}
		};
		
		_s.buttonOnMouseDownHandler = function(e){
		
			_s.curId = e.id;
			clearTimeout(_s.hideMenuTimeOutId_to);
			_s.hide(true);
			_s.selector_do.enable(); 
			if(_s.isMbl){
				if(_s.hasPointerEvent_bl){
					window.removeEventListener("RAPointerDown", _s.checkOpenedMenu);
				}else{
					window.removeEventListener("touchstart", _s.checkOpenedMenu);
				}
			}else{
				if(window.addEventListener){
					window.removeEventListener("mousedown", _s.checkOpenedMenu);
					window.removeEventListener("mousemove", _s.checkOpenedMenu);
				}else if(document.attachEvent){
					document.detachEvent("onmousemove", _s.checkOpenedMenu);
				}
			}
			
			if(prt._d.showPlaylistsSelectBoxNumbers_bl){
				_s.selector_do.setText(_s.buttons_ar[_s.curId].label1_str.substr(4));
			}else{
				_s.selector_do.setText(_s.buttons_ar[_s.curId].label1_str);
			}
			
			_s.isButtonCliecked_bl = true;
			_s.dispatchEvent(FWDRAPComboBox.BUTTON_PRESSED, {id:_s.curId})
		};
		
		_s.openMenuHandler = function(e){
			if(FWDAnimation.isTweening(_s.mainButtonsHolder_do)) return;
			if(_s.isShowed_bl){
				_s.checkOpenedMenu(e.e, true);
			}else{
				_s.selector_do.disable();
				_s.selector_do.setNormalState(true);
				_s.show(true);
				_s.startToCheckOpenedMenu();
				_s.dispatchEvent(FWDRAPComboBox.OPEN);
			}
		};
		

		//#######################################//
		/* Disable or enable buttons */
		//#######################################//
		_s.setButtonsStateBasedOnId = function(id){
			_s.curId = id;
			for(var i=0; i<_s.totalButtons; i++){
				var button_do = _s.buttons_ar[i];
				if(i == _s.curId){
					button_do.disable();
				}else{
					button_do.enable();
				}
			}
			if(prt._d.showPlaylistsSelectBoxNumbers_bl){
				_s.selector_do.setText(_s.buttons_ar[_s.curId].label1_str.substr(4));
			}else{
				_s.selector_do.setText(_s.buttons_ar[_s.curId].label1_str);
			}
			if(_s.scrHandler_do){
				_s.updateScrollBarSizeActiveAndDeactivate();
				_s.updateScrollBarHandlerAndContent(false, true);
			}else{
				_s.thumbnailsFinalY = 0;
			}
		};
		
		_s.setValue = function(id){
			_s.curId = id;
			_s.setButtonsStateBasedOnId();
		};

		
		//#######################################//
		/* Start to check if mouse is over menu */
		//#######################################//
		_s.startToCheckOpenedMenu = function(e){
			if(_s.isMbl){
				if(_s.hasPointerEvent_bl){
					window.addEventListener("RAPointerDown", _s.checkOpenedMenu);
				}else{
					window.addEventListener("touchstart", _s.checkOpenedMenu);
				}
			}else{
				if(window.addEventListener){
					window.addEventListener("mousedown", _s.checkOpenedMenu);
				}else if(document.attachEvent){
					document.attachEvent("onmousemove", _s.checkOpenedMenu);
				}
			}
		};
		
		_s.checkOpenedMenu = function(e, forceHide){
		
			var vc = FWDRAPUtils.getViewportMouseCoordinates(e);	
			var hideDelay  = 1000;
			if(e.type == "mousedown") hideDelay = 0;
			if(!FWDRAPUtils.hitTest(_s.screen, vc.screenX, vc.screenY) &&
			   !FWDRAPUtils.hitTest(_s.mainButtonsHolder_do.screen, vc.screenX, vc.screenY)
			   || forceHide
			){
				_s.hide(true, e);
				_s.selector_do.enable();
			
				if(_s.isMbl){
					if(_s.hasPointerEvent_bl){
						window.removeEventListener("RAPointerDown", _s.checkOpenedMenu);
					}else{
						window.removeEventListener("touchstart", _s.checkOpenedMenu);
					}
				}else{
					if(window.addEventListener){
						window.removeEventListener("mousemove", _s.checkOpenedMenu);
						window.removeEventListener("mousedown", _s.checkOpenedMenu);
					}else if(document.attachEvent){
						document.detachEvent("onmousemove", _s.checkOpenedMenu);
					}
				}
				if(FWDRAPUtils.hitTest(_s.selector_do.screen, vc.screenX, vc.screenY)){
					setTimeout(function(){
						_s.selector_do.setSelectedState(true);
					}, 50)
				}
			}else{
				clearTimeout(_s.hideMenuTimeOutId_to);
			}
		};
		
		
		//########################################//
		/* Get max width and position */
		//#######################################//
		_s.getMaxWidthResizeAndPosition = function(){
			
			var button_do;
			var finalX;
			var finalY;
			_s.totalButtonsHeight = 0;		
			
			for(var i=0; i<_s.totalButtons; i++){
				button_do = _s.buttons_ar[i];
				button_do.setY(1 + (i * (button_do.totalHeight + _s.sapaceBetweenButtons)));
				_s.totalWidth = prt.sW;
				button_do.totalWidth =  _s.totalWidth;
				button_do.setWidth(_s.totalWidth);
				button_do.centerText();
			}
		
			_s.totalButtonsHeight = button_do.getY() + button_do.totalHeight - _s.sapaceBetweenButtons;
			
			_s.dummyBk_do.setWidth(_s.totalWidth + 6);
			_s.setWidth(_s.totalWidth);
			_s.setHeight(_s.buttonHeight);
			_s.selector_do.totalWidth =  _s.totalWidth;
			_s.selector_do.setWidth(_s.totalWidth + 6);
			_s.selector_do.centerText();
			_s.buttonsHolder_do.setWidth(_s.totalWidth);
			_s.buttonsHolder_do.setHeight(_s.totalButtonsHeight);
		};


		//######################################//
		/* position */
		//######################################//
		_s.position = function(){		
			if (FWDRAPUtils.isAndroid){
				_s.setX(Math.floor(_s.finalX));
				_s.setY(Math.floor(_s.finalY-1));
				setTimeout(_s.poscombo-box, 100);
			}else{
				_s.poscombo-box();
			}
		};
			
		_s.resizeAndPosition = function(){
			_s.sW = prt.sW;
			_s.sH = prt.sH;
			_s.bk_do.setWidth(_s.sW);
			_s.bk_do.setHeight(_s.sH);
			_s.mainButtonsHolder_do.setWidth(_s.sW);
			_s.mainButtonsHolder_do.setHeight(_s.sH);
			
			if(_s.totalButtonsHeight > _s.mainButtonsHolder_do.h){
				_s.allowToScrollAndScrollBarIsActive_bl = true;
			}else{
				_s.allowToScrollAndScrollBarIsActive_bl = false;
			}

			if(!_s.allowToScrollAndScrollBarIsActive_bl && _s.scrMainHolder_do){
				_s.scrMainHolder_do.setVisible(false);
			}else if(_s.allowToScrollAndScrollBarIsActive_bl && _s.scrMainHolder_do && _s.isShowed_bl){
				_s.scrMainHolder_do.setVisible(true);
			}
			
			_s.separator_do.setWidth(_s.sW);
			if(_s.scrHandler_do) _s.updateScrollBarSizeActiveAndDeactivate();
			_s.getMaxWidthResizeAndPosition();
			_s.updateScrollBarHandlerAndContent();
		};
		
		_s.hide = function(animate, overwrite){
			if(!_s.isShowed_bl && !overwrite) return;
			FWDAnimation.killTweensOf(_s);
			_s.isShowed_bl = false;
			
			FWDAnimation.killTweensOf(_s.mainButtonsHolder_do);
			FWDAnimation.killTweensOf(_s.bk_do);
			if(animate){
				FWDAnimation.to(_s.mainButtonsHolder_do, .8, {y:-_s.totalButtonsHeight, ease:Expo.easeInOut, onComplete:_s.hideComplete});	
				FWDAnimation.to(_s.bk_do, .8, {alpha:0});	
			}else{

				_s.bk_do.setVisible(false);
				_s.mainButtonsHolder_do.setY(_s.buttonHeight - _s.totalButtonsHeight);
				_s.bk_do.setAlpha(0);
				_s.setHeight(_s.buttonHeight);
				_s.hideComplete();
			}
		};
		
		_s.hideComplete = function(){
			_s.mainButtonsHolder_do.setVisible(false);
			_s.bk_do.setVisible(false);
		}

		_s.show = function(animate, overwrite){
			if(_s.isShowed_bl && !overwrite) return;
			FWDAnimation.killTweensOf(_s);
			_s.mainButtonsHolder_do.setY(- _s.totalButtonsHeight);
			_s.isShowed_bl = true;
			_s.mainButtonsHolder_do.setVisible(true);
			_s.bk_do.setVisible(true);
			_s.resizeAndPosition();
			_s.updateScrollBarHandlerAndContent(false, true);
			FWDAnimation.killTweensOf(_s.mainButtonsHolder_do);
			FWDAnimation.killTweensOf(_s.bk_do);
			if(_s.scrMainHolder_do && _s.allowToScrollAndScrollBarIsActive_bl) _s.scrMainHolder_do.setVisible(true);
			if(animate){
				FWDAnimation.to(_s.bk_do, .8, {alpha:1});
				FWDAnimation.to(_s.mainButtonsHolder_do, .8, {y:_s.buttonHeight, ease:Expo.easeInOut});
			}else{
				_s.bk_do.setAlpha(1);
				_s.mainButtonsHolder_do.setY(_s.buttonHeight);
			}
		};
		
		_s.setupScrollLogic = function(){
			if(_s.isMbl){
				_s.setupMobileScrollbar();
			}else{
				_s.setupScrollbar();
				if(_s.addMouseWheelSupport_bl) _s.addMouseWheelSupport();
			}
		};

		
		//##########################################//
		/* setup mobile scrollbar */
		//##########################################//
		_s.setupMobileScrollbar = function(){
			if(_s.hasPointerEvent_bl){
				_s.mainButtonsHolder_do.screen.addEventListener("pointerdown", _s.scrollBarTouchStartHandler);
			}else{
				_s.mainButtonsHolder_do.screen.addEventListener("touchstart", _s.scrollBarTouchStartHandler);
			}
			_s.mainButtonsHolder_do.screen.addEventListener("mousedown", _s.scrollBarTouchStartHandler);
			_s.updateMobileScrollBarId_int = setInterval(_s.updateMobileScrollBar, 16);
			
		};
		
		_s.scrollBarTouchStartHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			_s.isScrollingOnMove_bl = false;
			FWDAnimation.killTweensOf(_s.buttonsHolder_do);
			var vc = FWDRAPUtils.getViewportMouseCoordinates(e);		
			_s.isDragging_bl = true;
			_s.lastPresedY = vc.screenY;
			_s.checkLastPresedY = vc.screenY;
			
			if(_s.hasPointerEvent_bl){
				window.addEventListener("pointerup", _s.scrollBarTouchEndHandler);
				window.addEventListener("pointermove", _s.scrollBarTouchMoveHandler);
			}else{
				window.addEventListener("touchend", _s.scrollBarTouchEndHandler);
				window.addEventListener("touchmove", _s.scrollBarTouchMoveHandler, {passive:false});
			}
			
			window.addEventListener("mouseup", _s.scrollBarTouchEndHandler);
			window.addEventListener("mousemove", _s.scrollBarTouchMoveHandler);
			clearInterval(_s.updateMoveMobileScrollbarId_int);
			_s.updateMoveMobileScrollbarId_int = setInterval(_s.updateMoveMobileScrollbar, 20);
		};
		
		_s.scrollBarTouchMoveHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			e.stopImmediatePropagation();
		
			if(_s.totalButtonsHeight < _s.mainButtonsHolder_do.h) return;
			prt.showDisable();
		
			var vc = FWDRAPUtils.getViewportMouseCoordinates(e);	
			if(vc.screenY >= _s.checkLastPresedY + 6 || vc.screenY <= _s.checkLastPresedY - 6) _s.isScrollingOnMove_bl = true;
			var toAdd = vc.screenY - _s.lastPresedY;
		
			_s.thumbnailsFinalY += toAdd;
			_s.thumbnailsFinalY = Math.round(_s.thumbnailsFinalY);
			
			_s.lastPresedY = vc.screenY;
			_s.vy = toAdd  * 2;
		};
		
		_s.scrollBarTouchEndHandler = function(e){
			_s.isDragging_bl = false;
			clearInterval(_s.updateMoveMobileScrollbarId_int);
			clearTimeout(_s.disableOnMoveId_to);
			_s.disableOnMoveId_to = setTimeout(function(){
				prt.hideDisable();
			},100);
			if(_s.hasPointerEvent_bl){
				window.removeEventListener("pointerup", _s.scrollBarTouchEndHandler);
				window.removeEventListener("pointermove", _s.scrollBarTouchMoveHandler);
			}else{
				window.removeEventListener("touchend", _s.scrollBarTouchEndHandler);
				window.removeEventListener("touchmove", _s.scrollBarTouchMoveHandler);
			}
			window.removeEventListener("mousemove", _s.scrollBarTouchMoveHandler);
		};
		
		_s.updateMoveMobileScrollbar = function(){
			_s.buttonsHolder_do.setY(_s.thumbnailsFinalY);
		};
		
		_s.updateMobileScrollBar = function(animate){
			
			if(!_s.isDragging_bl){
			
				if(_s.totalButtonsHeight < _s.mainButtonsHolder_do.h) _s.thumbnailsFinalY = 0.01;
				
				_s.vy *= _s.friction;
				_s.thumbnailsFinalY += _s.vy;	
			
				if(_s.thumbnailsFinalY > 0){
					_s.vy2 = (0 - _s.thumbnailsFinalY) * .3;
					_s.vy *= _s.friction;
					_s.thumbnailsFinalY += _s.vy2;
				}else if(_s.thumbnailsFinalY < _s.mainButtonsHolder_do.h - _s.totalButtonsHeight){
					_s.vy2 = (_s.mainButtonsHolder_do.h - _s.totalButtonsHeight - _s.thumbnailsFinalY) * .3;
					_s.vy *= _s.friction;
					_s.thumbnailsFinalY += _s.vy2;
				}
				
				_s.buttonsHolder_do.setY(Math.round(_s.thumbnailsFinalY));
			}
		};
		
		
		//#################################//
		/* setup mouse scrollbar */
		//#################################//
		_s.setupScrollbar = function(){
			_s.scrMainHolder_do = new FWDRAPDisplayObject("div");
			_s.scrMainHolder_do.setVisible(false);
			
			_s.scrMainHolder_do.setWidth(prt.scrWidth);
			
			//track
			_s.scrTrack_do = new FWDRAPDisplayObject("div");
			_s.scrTrack_do.setWidth(prt.scrWidth);
			
			var playlistScrBkTop_img = new Image();
			playlistScrBkTop_img.src = prt.playlistScrBkTop_img.src;
			_s.scrTrackTop_do = new FWDRAPDisplayObject("img");
			_s.scrTrackTop_do.setWidth(prt.scrTrackTop_do.w);
			_s.scrTrackTop_do.setHeight(prt.scrTrackTop_do.h);
			_s.scrTrackTop_do.setScreen(playlistScrBkTop_img);
			_s.scrTrackTop_do.screen.className = 'fwdrap-scrollbar-top-background';
			
			
			_s.scrTrackMiddle_do = new FWDRAPDisplayObject("div");
			_s.scrTrackMiddle_do.screen.className = 'fwdrap-scrollbar-middle-background';
			_s.scrTrackMiddle_do.getStyle().background = "url('" + prt._d.scrBkMiddlePath_str + "')";
			_s.scrTrackMiddle_do.setWidth(prt.scrWidth);
			_s.scrTrackMiddle_do.setY(_s.scrTrackTop_do.h);
		
			var scrTrackBottomImage_img = new Image();
			scrTrackBottomImage_img.src = prt._d.scrBkBottomPath_str;
			_s.scrTrackBottom_do = new FWDRAPDisplayObject("img");
			_s.scrTrackBottom_do.setScreen(scrTrackBottomImage_img);
			_s.scrTrackBottom_do.setWidth(_s.scrTrackTop_do.w);
			_s.scrTrackBottom_do.setHeight(_s.scrTrackTop_do.h);
			_s.scrTrackBottom_do.screen.className = 'fwdrap-scrollbar-bottom-background';
			
			//handler
			_s.scrHandler_do = new FWDRAPDisplayObject("div");
			_s.scrHandler_do.setWidth(prt.scrWidth);
			
		
			_s.playlistScrDragTop_img = new Image();
			_s.playlistScrDragTop_img.src = prt._d.scrDragBottomPath_str;
			
			_s.playlistScrDragTop_img.width = prt.playlistScrDragTop_img.width;
			_s.playlistScrDragTop_img.height = prt.playlistScrDragTop_img.height;
			
			_s.scrHandlerTop_do = new FWDRAPDisplayObject("img");
			if(_s.useHEX){
				_s.scrHandlerTop_do = new FWDRAPDisplayObject("div");
				_s.scrHandlerTop_do.setWidth(_s.playlistScrDragTop_img.width);
				_s.scrHandlerTop_do.setHeight(_s.playlistScrDragTop_img.height);
				_s.mainScrubberDragTop_canvas = FWDRAPUtils.getCanvasWithModifiedColor(_s.playlistScrDragTop_img, _s.nBC).canvas;
				_s.scrHandlerTop_do.screen.appendChild(_s.mainScrubberDragTop_canvas);	
			}else{
				_s.scrHandlerTop_do = new FWDRAPDisplayObject("img");
				_s.scrHandlerTop_do.setScreen(_s.playlistScrDragTop_img);
			}
			
			_s.scrHandlerMiddle_do = new FWDRAPDisplayObject("div");
			_s.middleImage = new Image();
			_s.middleImage.src = prt._d.scrDragMiddlePath_str;
			if(_s.useHEX){
				_s.middleImage.onload = function(){
					_s.scrubberDragMiddle_canvas = FWDRAPUtils.getCanvasWithModifiedColor(_s.middleImage, _s.nBC, true);
					_s.scrubberDragImage_img = _s.scrubberDragMiddle_canvas.image;
					_s.scrHandlerMiddle_do.getStyle().background = "url('" + _s.scrubberDragImage_img.src + "') repeat-y";
				}
			}else{
				_s.scrHandlerMiddle_do.getStyle().background = "url('" + prt._d.scrDragMiddlePath_str + "')";
			}
	
			_s.scrHandlerMiddle_do.setWidth(prt.scrWidth);
			_s.scrHandlerMiddle_do.setY(_s.scrHandlerTop_do.h);
			
			_s.scrHandlerBottom_do = new FWDRAPDisplayObject("div");
			_s.bottomImage = new Image();
			_s.bottomImage.src = prt._d.scrDragMiddlePath_str;
			if(_s.useHEX){
				_s.bottomImage.onload = function(){
					_s.scrubberDragBottom_canvas = FWDRAPUtils.getCanvasWithModifiedColor(_s.bottomImage, _s.nBC, true);
					_s.scrubberDragBottomImage_img = _s.scrubberDragBottom_canvas.image;
					_s.scrHandlerBottom_do.getStyle().background = "url('" + _s.scrubberDragBottomImage_img.src + "') repeat-y";
					
				}
			}else{
				_s.scrHandlerBottom_do.getStyle().background = "url('" + prt.playlistScrDragTop_img.src + "')";
			}
			_s.scrHandlerBottom_do.setWidth(prt.scrWidth);
			_s.scrHandlerBottom_do.setY(_s.scrHandlerTop_do.h);
		
			
			_s.scrHandlerBottom_do.setWidth(_s.scrHandlerTop_do.w);
			_s.scrHandlerBottom_do.setHeight(_s.scrHandlerTop_do.h);
			_s.scrHandler_do.setButtonMode(true);
			
			_s.playlistScrLines_img = new Image();
			_s.playlistScrLines_img.src = prt.playlistScrLines_img.src;
			_s.playlistScrLines_img.width = prt.playlistScrLines_img.width;
			_s.playlistScrLines_img.height = prt.playlistScrLines_img.height;
		
			_s.scrHandlerLinesN_do = new FWDRAPDisplayObject("img");
			_s.scrHandlerLinesN_do.setScreen(_s.playlistScrLines_img);
			_s.scrHandlerLinesN_do.screen.className = 'fwdrap-handler-lines-1';

			_s.scrHandlerLinesS_img = new Image();
			_s.scrHandlerLinesS_img.src = prt._d.scrLinesSPath_str;
			_s.scrHandlerLinesS_do = new FWDRAPDisplayObject("img");
			_s.scrHandlerLinesS_do.setScreen(_s.scrHandlerLinesS_img);
			_s.scrHandlerLinesS_do.setWidth(_s.scrHandlerLinesN_do.w);
			_s.scrHandlerLinesS_do.setHeight(_s.scrHandlerLinesN_do.h);
			_s.scrHandlerLinesS_do.screen.className = 'fwdrap-handler-lines-2';
		
			_s.scrHandlerLinesS_do.setAlpha(0);
					
			_s.scrHandlerLines_do = new FWDRAPDisplayObject("div");
			_s.scrHandlerLines_do.setWidth(_s.scrHandlerLinesN_do.w);
			_s.scrHandlerLines_do.setHeight(_s.scrHandlerLinesN_do.h);
			_s.scrHandlerLines_do.setButtonMode(true);
				
			_s.scrTrack_do.addChild(_s.scrTrackTop_do);
			_s.scrTrack_do.addChild(_s.scrTrackMiddle_do);
			_s.scrTrack_do.addChild(_s.scrTrackBottom_do);
			_s.scrHandler_do.addChild(_s.scrHandlerTop_do);
			_s.scrHandler_do.addChild(_s.scrHandlerMiddle_do);
			_s.scrHandler_do.addChild(_s.scrHandlerBottom_do);
			_s.scrHandlerLines_do.addChild(_s.scrHandlerLinesN_do);
			_s.scrHandlerLines_do.addChild(_s.scrHandlerLinesS_do);
			_s.scrMainHolder_do.addChild(_s.scrTrack_do);
			_s.scrMainHolder_do.addChild(_s.scrHandler_do);
			_s.scrMainHolder_do.addChild(_s.scrHandlerLines_do);
			_s.mainButtonsHolder_do.addChild(_s.scrMainHolder_do);
			
			_s.scrHandler_do.screen.addEventListener("mouseover", _s.scrollBarHandlerOnMouseOver);
			_s.scrHandler_do.screen.addEventListener("mouseout", _s.scrollBarHandlerOnMouseOut);
			_s.scrHandler_do.screen.addEventListener("mousedown", _s.scrollBarHandlerOnMouseDown);
			_s.scrHandlerLines_do.screen.addEventListener("mouseover", _s.scrollBarHandlerOnMouseOver);
			_s.scrHandlerLines_do.screen.addEventListener("mouseout", _s.scrollBarHandlerOnMouseOut);
			_s.scrHandlerLines_do.screen.addEventListener("mousedown", _s.scrollBarHandlerOnMouseDown);
			
		};
		
		
		_s.scrollBarHandlerOnMouseOver = function(e){
			if(!_s.allowToScrollAndScrollBarIsActive_bl) return; 
			FWDAnimation.killTweensOf(_s.scrHandlerLinesN_do);
			FWDAnimation.killTweensOf(_s.scrHandlerLinesS_do);
			FWDAnimation.to(_s.scrHandlerLinesN_do, .8, {alpha:0, ease:Expo.easeOut});
			FWDAnimation.to(_s.scrHandlerLinesS_do, .8, {alpha:1, ease:Expo.easeOut});
		};
		
		_s.scrollBarHandlerOnMouseOut = function(e){
			if(_s.isDragging_bl || !_s.allowToScrollAndScrollBarIsActive_bl) return;
			FWDAnimation.killTweensOf(_s.scrHandlerLinesN_do);
			FWDAnimation.killTweensOf(_s.scrHandlerLinesS_do);
			FWDAnimation.to(_s.scrHandlerLinesN_do, .8, {alpha:1, ease:Expo.easeOut});
			FWDAnimation.to(_s.scrHandlerLinesS_do, .8, {alpha:0, ease:Expo.easeOut});
		};
		
		_s.scrollBarHandlerOnMouseDown = function(e){
			if(!_s.allowToScrollAndScrollBarIsActive_bl) return;
			var vc = FWDRAPUtils.getViewportMouseCoordinates(e);		
			_s.isDragging_bl = true;
			_s.yPositionOnPress = _s.scrHandler_do.y;
			_s.lastPresedY = vc.screenY;
			FWDAnimation.killTweensOf(_s.scrHandler_do);
			prt.showDisable();
			
			if(window.addEventListener){
				window.addEventListener("mousemove", _s.scrollBarHandlerMoveHandler);
				window.addEventListener("mouseup", _s.scrollBarHandlerEndHandler);	
			}else if(document.attachEvent){
				document.attachEvent("onmousemove", _s.scrollBarHandlerMoveHandler);
				document.attachEvent("onmouseup", _s.scrollBarHandlerEndHandler);
			}
		};
		
		_s.scrollBarHandlerMoveHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			var vc = FWDRAPUtils.getViewportMouseCoordinates(e);	
			var linesY = _s.scrollBarHandlerFinalY + parseInt((_s.scrHandler_do.h - _s.scrHandlerLines_do.h)/2);
	
			_s.scrollBarHandlerFinalY = Math.round(_s.yPositionOnPress + vc.screenY - _s.lastPresedY);
			if(_s.scrollBarHandlerFinalY >= _s.scrTrack_do.h - _s.scrHandler_do.h){
				_s.scrollBarHandlerFinalY = _s.scrTrack_do.h -  _s.scrHandler_do.h;
			}else if(_s.scrollBarHandlerFinalY <= 0){
				_s.scrollBarHandlerFinalY = 0;
			}
			
			_s.scrHandler_do.setY(_s.scrollBarHandlerFinalY);
			FWDAnimation.killTweensOf(_s.scrHandler_do);
			FWDAnimation.to(_s.scrHandlerLines_do, .8, {y:linesY, ease:Quart.easeOut});
			_s.updateScrollBarHandlerAndContent(true);
		};
		
		_s.scrollBarHandlerEndHandler = function(e){
			var vc = FWDRAPUtils.getViewportMouseCoordinates(e);	
			_s.isDragging_bl = false;
			
			if(!FWDRAPUtils.hitTest(_s.scrHandler_do.screen, vc.screenX, vc.screenY)){
				FWDAnimation.killTweensOf(_s.scrHandlerLinesN_do);
				FWDAnimation.killTweensOf(_s.scrHandlerLinesS_do);
				FWDAnimation.to(_s.scrHandlerLinesN_do, .8, {alpha:1, ease:Expo.easeOut});
				FWDAnimation.to(_s.scrHandlerLinesS_do, .8, {alpha:0, ease:Expo.easeOut});
			}
			
			prt.hideDisable();
			FWDAnimation.killTweensOf(_s.scrHandler_do);
			FWDAnimation.to(_s.scrHandler_do, .4, {y:_s.scrollBarHandlerFinalY, ease:Quart.easeOut});
			
			if(window.removeEventListener){
				window.removeEventListener("mousemove", _s.scrollBarHandlerMoveHandler);
				window.removeEventListener("mouseup", _s.scrollBarHandlerEndHandler);	
			}else if(document.detachEvent){
				document.detachEvent("onmousemove", _s.scrollBarHandlerMoveHandler);
				document.detachEvent("onmouseup", _s.scrollBarHandlerEndHandler);
			}
		};
		
		_s.updateScrollBarSizeActiveAndDeactivate = function(){
			if(_s.disableForAWhileAfterThumbClick_bl) return;
		
			if(_s.allowToScrollAndScrollBarIsActive_bl){
				_s.allowToScrollAndScrollBarIsActive_bl = true;
				_s.scrMainHolder_do.setX(_s.sW - _s.scrMainHolder_do.w);
				_s.scrMainHolder_do.setHeight(_s.mainButtonsHolder_do.h);
				_s.scrTrack_do.setHeight(_s.scrMainHolder_do.h);
				_s.scrTrackMiddle_do.setHeight(_s.scrTrack_do.h - (_s.scrTrackTop_do.h * 2));
				_s.scrTrackBottom_do.setY(_s.scrTrackMiddle_do.y + _s.scrTrackMiddle_do.h);
				_s.scrMainHolder_do.setAlpha(1);
				_s.scrHandler_do.setButtonMode(true);
				_s.scrHandlerLines_do.setButtonMode(true);
			}else{
				_s.allowToScrollAndScrollBarIsActive_bl = false;
				_s.scrMainHolder_do.setX(_s.sW - _s.scrMainHolder_do.w);
				_s.scrMainHolder_do.setHeight(_s.mainButtonsHolder_do.h);
				_s.scrTrack_do.setHeight(_s.scrMainHolder_do.h);
				_s.scrTrackMiddle_do.setHeight(_s.scrTrack_do.h - (_s.scrTrackTop_do.h * 2));
				_s.scrTrackBottom_do.setY(_s.scrTrackMiddle_do.y + _s.scrTrackMiddle_do.h);
				_s.scrMainHolder_do.setAlpha(.5);
				_s.scrHandler_do.setY(0);
				_s.scrHandler_do.setButtonMode(false);
				_s.scrHandlerLines_do.setButtonMode(false);
			}
			
			_s.scrHandler_do.setHeight(Math.max(30, Math.round(Math.min(1,(_s.scrMainHolder_do.h/_s.totalButtonsHeight)) * _s.scrMainHolder_do.h)));
			_s.scrHandlerMiddle_do.setHeight(_s.scrHandler_do.h - (_s.scrHandlerTop_do.h * 2));
			FWDAnimation.killTweensOf(_s.scrHandlerLines_do);
			_s.scrHandlerLines_do.setY(_s.scrollBarHandlerFinalY + parseInt((_s.scrHandler_do.h - _s.scrHandlerLines_do.h)/2));
			_s.scrHandlerBottom_do.setY(_s.scrHandler_do.h - _s.scrHandlerBottom_do.h - 1);
		};
		

		//###########################################//
		/* Add mousewheel support */
		//###########################################//
		_s.addMouseWheelSupport = function(){
			if(_s.screen.addEventListener){
				_s.screen.addEventListener('DOMMouseScroll', _s.mouseWheelHandler);
				_s.screen.addEventListener ("mousewheel", _s.mouseWheelHandler);
			}else if(_s.screen.attachEvent){
				_s.screen.attachEvent('onmousewheel', _s.mouseWheelHandler);
			}
		};
		
		_s.mouseWheelHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			
			if(_s.disableMouseWheel_bl || _s.isDragging_bl) return false;
			
			var dir = e.detail || e.wheelDelta;	
			if(e.wheelDelta) dir *= -1;
			if(dir > 0){
				_s.scrollBarHandlerFinalY += Math.round((160 * _s.scollbarSpeedSensitivity)  * (_s.mainButtonsHolder_do.h/_s.totalButtonsHeight));
			}else if(dir < 0){
				_s.scrollBarHandlerFinalY -= Math.round((160 * _s.scollbarSpeedSensitivity)  * (_s.mainButtonsHolder_do.h/_s.totalButtonsHeight));
			}
		
			if(_s.scrollBarHandlerFinalY >= _s.scrTrack_do.h - _s.scrHandler_do.h){
				_s.scrollBarHandlerFinalY = _s.scrTrack_do.h -  _s.scrHandler_do.h;
			}else if(_s.scrollBarHandlerFinalY <= 0){
				_s.scrollBarHandlerFinalY = 0;
			}
			
			var linesY = _s.scrollBarHandlerFinalY + parseInt((_s.scrHandler_do.h - _s.scrHandlerLines_do.h)/2);
			FWDAnimation.killTweensOf(_s.scrHandler_do);
			FWDAnimation.killTweensOf(_s.scrHandlerLines_do);
			FWDAnimation.to(_s.scrHandlerLines_do, .8, {y:linesY, ease:Quart.easeOut});
			FWDAnimation.to(_s.scrHandler_do, .5, {y:_s.scrollBarHandlerFinalY, ease:Quart.easeOut});
			_s.isDragging_bl = true;
			_s.updateScrollBarHandlerAndContent(true);
			_s.isDragging_bl = false;
		
			if(e.preventDefault){
				e.preventDefault();
			}else{
				return false;
			}
		};
		
		_s.updateScrollBarHandlerAndContent = function(animate, overwrite){
			
			if(_s.disableForAWhileAfterThumbClick_bl) return;
			if(!_s.allowToScrollAndScrollBarIsActive_bl && !overwrite) return;
			var percentScrolled = 0;
			var thumb;
			
			if(_s.isDragging_bl && !_s.isMbl){
				percentScrolled = (_s.scrollBarHandlerFinalY/(_s.scrMainHolder_do.h - _s.scrHandler_do.h));
				if(percentScrolled == "Infinity"){
					percentScrolled = 0;
				}else if(percentScrolled >= 1){
					percentScrolled = 1;
				}
				_s.thumbnailsFinalY = Math.round(percentScrolled * (_s.totalButtonsHeight - _s.mainButtonsHolder_do.h)) * -1;
			}else{
			
				percentScrolled = _s.curId/(_s.totalButtons - 1);
				_s.thumbnailsFinalY = Math.min(0, Math.round(percentScrolled * (_s.totalButtonsHeight - _s.mainButtonsHolder_do.h)) * -1);
				
				if(_s.scrMainHolder_do){
					_s.scrollBarHandlerFinalY = Math.round((_s.scrMainHolder_do.h - _s.scrHandler_do.h) * percentScrolled);
					
					if(_s.scrollBarHandlerFinalY < 0){
						_s.scrollBarHandlerFinalY = 0;
					}else if(_s.scrollBarHandlerFinalY > _s.scrMainHolder_do.h - _s.scrHandler_do.h - 1){
						_s.scrollBarHandlerFinalY = _s.scrMainHolder_do.h - _s.scrHandler_do.h - 1;
					}
					
					FWDAnimation.killTweensOf(_s.scrHandler_do);
					FWDAnimation.killTweensOf(_s.scrHandlerLines_do);
					if(animate){
						FWDAnimation.to(_s.scrHandler_do, .4, {y:_s.scrollBarHandlerFinalY, ease:Quart.easeOut});
						FWDAnimation.to(_s.scrHandlerLines_do, .8, {y:_s.scrollBarHandlerFinalY + parseInt((_s.scrHandler_do.h - _s.scrHandlerLinesN_do.h)/2), ease:Quart.easeOut});
					}else{
						_s.scrHandler_do.setY(_s.scrollBarHandlerFinalY);
						_s.scrHandlerLines_do.setY(_s.scrollBarHandlerFinalY + parseInt((_s.scrHandler_do.h - _s.scrHandlerLinesN_do.h)/2));
					}
				}
			}
			
			if(_s.lastThumbnailFinalY != _s.thumbnailsFinalY){
				FWDAnimation.killTweensOf(_s.buttonsHolder_do);
				if(animate){
					FWDAnimation.to(_s.buttonsHolder_do, .5, {y:_s.thumbnailsFinalY, ease:Quart.easeOut});
				}else{
					_s.buttonsHolder_do.setY(_s.thumbnailsFinalY);
				}
			}
			
			_s.lastThumbnailFinalY = _s.thumbnailsFinalY;
		};
		
	
		_s.init();
	};
	
	/* set prototype */
	FWDRAPComboBox.setPrototype =  function(){
		FWDRAPComboBox.prototype = new FWDRAPDisplayObject("div");
	};

	FWDRAPComboBox.OPEN = "open";
	FWDRAPComboBox.HIDE_COMPLETE = "infoWindowHideComplete";
	FWDRAPComboBox.BUTTON_PRESSED = "buttonPressed";

	FWDRAPComboBox.prototype = null;
	window.FWDRAPComboBox = FWDRAPComboBox;
	
}(window));