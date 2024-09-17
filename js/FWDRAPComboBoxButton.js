/**
 * Royal Audio Player
 * Playlist select box button.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function (){
var FWDRAPComboBoxButton = function(
			prt,
			label1, 
			bk1_str,
			bk2_str,
			backgroundNormalColor,
			backgroundSelectedColor,
			textNormalColor,
			textSelectedColor,
			id,
			totalHeight
		){

		'use strict';
		
		var _s = this;
		var prototype = FWDRAPComboBoxButton.prototype;
		
		_s.label1_str = label1;
		_s.backgroundNormalColor_str = backgroundNormalColor;
		_s.backgroundSelectedColor_str = backgroundSelectedColor;
		_s.nBC = textNormalColor;
		_s.sBC = textSelectedColor;
		_s.bk1_str = bk1_str;
		_s.bk2_str = bk2_str;
		
		_s.totalWidth = 400;
		_s.totalHeight = totalHeight;
		_s.id = id;

		_s.hasPointerEvent_bl = FWDRAPUtils.hasPointerEvent;
		_s.isMbl = FWDRAPUtils.isMobile;

	
		//##########################################//
		/* initialize _s */
		//##########################################//
		_s.init = function(){
			_s.setBackfaceVisibility();
			_s.setButtonMode(true);
			_s.setupMainContainers();
			_s.setWidth(_s.totalWidth);
			_s.setHeight(_s.totalHeight);
			_s.setNormalState();
		};
		

		//##########################################//
		/* setup main containers */
		//##########################################//
		_s.setupMainContainers = function(){

			_s.text_sdo = new FWDRAPDisplayObject("div");
			_s.text_sdo.getStyle().whiteSpace = "nowrap";
			_s.text_sdo.setBackfaceVisibility();
			_s.text_sdo.setOverflow("visible");
			_s.text_sdo.setDisplay("inline-block");
			_s.text_sdo.getStyle().fontFamily = "Arial";
			_s.text_sdo.getStyle().fontSize= "13px";
			_s.text_sdo.getStyle().padding = "6px";
			_s.text_sdo.getStyle().fontWeight = "100";
			_s.text_sdo.getStyle().color = _s.normalColor_str;
			_s.text_sdo.getStyle().fontSmoothing = "antialiased";
			_s.text_sdo.getStyle().webkitFontSmoothing = "antialiased";
			_s.text_sdo.getStyle().textRendering = "optimizeLegibility";	
			
			_s.bk_sdo = new FWDRAPDisplayObject("div");
			_s.bk_sdo.setBkColor(_s.backgroundNormalColor_str);
			
			if(_s.id % 2 == 0){
				_s.bk_sdo.getStyle().background = "url('" + _s.bk1_str + "')";
				_s.bk_sdo.screen.className = 'fwdrap-playlist-item-background-even';
				_s.text_sdo.screen.className = 'fwdrap-playlist-selector-item-text fwdrap-even';
			}else{
				_s.bk_sdo.getStyle().background = "url('" + _s.bk2_str + "')";
				_s.bk_sdo.screen.className = 'fwdrap-playlist-item-background-odd';
				_s.text_sdo.screen.className = 'fwdrap-playlist-selector-item-text fwdrap-odd';
				_s.type = 2;
			}
		
			_s.addChild(_s.bk_sdo);
			
		
			if (FWDRAPUtils.isIEAndLessThen9){
				_s.text_sdo.screen.innerText = _s.label1_str;
			}else{
				_s.text_sdo.setInnerHTML(_s.label1_str);
			}
			
			_s.addChild(_s.text_sdo);
			
			_s.dumy_sdo = new FWDRAPDisplayObject("div");
			if(FWDRAPUtils.isIE){
				_s.dumy_sdo.setBkColor("#FF0000");
				_s.dumy_sdo.setAlpha(0);
			};
			_s.addChild(_s.dumy_sdo);
			
			if(_s.isMbl){
				if(_s.hasPointerEvent_bl){
					_s.screen.addEventListener("MSPointerOver", _s.onMouseOver);
					_s.screen.addEventListener("MSPointerOut", _s.onMouseOut);
					_s.screen.addEventListener("MSPointerDown", _s.onMouseDown);
					_s.screen.addEventListener("MSPointerUp", _s.onClick);
				}else{
					_s.screen.addEventListener("touchend", _s.onMouseDown);
				}
			}else if(_s.screen.addEventListener){
				_s.screen.addEventListener("mouseover", _s.onMouseOver);
				_s.screen.addEventListener("mouseout", _s.onMouseOut);
				_s.screen.addEventListener("click", _s.onMouseDown);
				_s.screen.addEventListener("click", _s.onClick);
			}
		};
		
		_s.onMouseOver = function(e){
			if(_s.isDisabled_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				FWDAnimation.killTweensOf(_s.text_sdo);
				_s.setSelectedState(true);
				_s.dispatchEvent(FWDRAPComboBoxButton.MOUSE_OVER);
			}
		};
			
		_s.onMouseOut = function(e){
			if(_s.isDisabled_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				FWDAnimation.killTweensOf(_s.text_sdo);
				_s.setNormalState(true);
				_s.dispatchEvent(FWDRAPComboBoxButton.MOUSE_OUT);
			}
		};
		
		_s.onClick = function(e){
			if(_s.isDisabled_bl) return;
			if(e.preventDefault) e.preventDefault();
			_s.dispatchEvent(FWDRAPComboBoxButton.CLICK);
		};
		
		_s.onMouseDown = function(e){
			if(_s.isDisabled_bl || prt.isScrollingOnMove_bl) return;
			if(e.preventDefault) e.preventDefault();
			_s.dispatchEvent(FWDRAPComboBoxButton.MOUSE_DOWN, {id:_s.id});
		};


		//###########################################//
		/* set selected / normal state */
		//###########################################//
		_s.setSelectedState = function(animate){
			if(animate){
				FWDAnimation.to(_s.text_sdo.screen, .6, {css:{color:_s.sBC}, ease:Quart.easeOut});
			}else{;
				_s.text_sdo.getStyle().color = _s.sBC;
			}
		};
		
		_s.setNormalState = function(animate){
			if(animate){
				FWDAnimation.to(_s.text_sdo.screen, .6, {css:{color:_s.nBC}, ease:Quart.easeOut});
			}else{
				_s.text_sdo.getStyle().color = _s.nBC;
			}
		};

		
		//##########################################//
		/* center text */
		//##########################################//
		_s.centerText = function(){
			
			_s.dumy_sdo.setWidth(_s.totalWidth);
			_s.dumy_sdo.setHeight(_s.totalHeight);
			_s.bk_sdo.setWidth(_s.totalWidth);
			_s.bk_sdo.setHeight(_s.totalHeight);
			_s.text_sdo.setX(4);
			_s.text_sdo.setY(Math.round((_s.totalHeight - _s.text_sdo.getHeight())/2));
		};
		

		//###############################//
		/* get max text width */
		//###############################//
		_s.getMaxTextWidth = function(){
			return _s.text_sdo.getWidth();
		};

		
		//##############################//
		/* disable / enable */
		//#############################//
		_s.disable = function(){
			_s.isDisabled_bl = true;
			_s.setButtonMode(false);
			_s.setSelectedState(true);
		};
		
		_s.enable = function(){
			_s.isDisabled_bl = false;
			_s.setNormalState(true);
			_s.setButtonMode(true);
		};
		

		_s.init();
	};
	
	/* set prototype */
	FWDRAPComboBoxButton.setPrototype = function(){
		FWDRAPComboBoxButton.prototype = new FWDRAPDisplayObject("div");
	};
	
	FWDRAPComboBoxButton.FIRST_BUTTON_CLICK = "onFirstClick";
	FWDRAPComboBoxButton.SECOND_BUTTON_CLICK = "secondButtonOnClick";
	FWDRAPComboBoxButton.MOUSE_OVER = "onMouseOver";
	FWDRAPComboBoxButton.MOUSE_OUT = "onMouseOut";
	FWDRAPComboBoxButton.MOUSE_DOWN = "onMouseDown";
	FWDRAPComboBoxButton.CLICK = "onClick";
	
	FWDRAPComboBoxButton.prototype = null;
	window.FWDRAPComboBoxButton = FWDRAPComboBoxButton;
}(window));