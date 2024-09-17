/**
 * Royal Audio Player
 * Playlist select box selector.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function (){
var FWDRAPComboBoxSelector = function(
			arrowW,
			arrowH,
			arrowN_str,
			arrowS_str,
			label1, 
			backgroundNormalColor,
			backgroundSelectedColor,
			textNormalColor,
			textSelectedColor,
			totalHeight,
			useHEX,
			nBC,
			sBC
		){

		'use strict';
		
		var _s = this;
		var prototype = FWDRAPComboBoxSelector.prototype;

		_s.arrowN_str = arrowN_str;
		_s.arrowS_str = arrowS_str;
		
		_s.label1_str = label1;
		_s.backgroundNormalColor_str = backgroundNormalColor;
		_s.backgroundSelectedColor_str = backgroundSelectedColor;
		_s.textNormalColor_str = textNormalColor;
		_s.textSelectedColor_str = textSelectedColor;
		
		_s.useHEX = useHEX;
		_s.nBC = nBC;
		_s.sBC = textSelectedColor;
		
		_s.totalWidth = 400;
		
		_s.totalHeight = totalHeight;
		_s.arrowWidth = arrowW;
		_s.arrowHeight = arrowH;
		
		_s.hasPointerEvent_bl = FWDRAPUtils.hasPointerEvent;
		_s.isMbl = FWDRAPUtils.isMobile;
		_s.isDisabled_bl = false;
		
		
		//##########################################//
		/* initialize _s */
		//##########################################//
		_s.init = function(){
			_s.setBackfaceVisibility();
			_s.setButtonMode(true);
			_s.setupMainContainers();
			_s.setWidth(_s.totalWidth);
			_s.setHeight(_s.totalHeight);
		};

	
		//##########################################//
		/* setup main containers */
		//##########################################//
		_s.setupMainContainers = function(){
			
			_s.bk_sdo = new FWDRAPDisplayObject("div");
			_s.bk_sdo.getStyle().backgroundColor = _s.backgroundNormalColor_str;
			_s.bk_sdo.screen.className = 'fwdrap-combobox-selector-background';
			_s.addChild(_s.bk_sdo);
			
			_s.text_sdo = new FWDRAPDisplayObject("div");
			_s.text_sdo.screen.className = 'fwdrap-selector-text';
			_s.text_sdo.getStyle().whiteSpace = "nowrap";
			_s.text_sdo.setBackfaceVisibility();
			_s.text_sdo.setOverflow("visible");
			_s.text_sdo.setDisplay("inline-block");
			_s.text_sdo.getStyle().fontFamily = "Arial";
			_s.text_sdo.getStyle().fontSize= "13px";
			_s.text_sdo.getStyle().fontWeight = "100";
			_s.text_sdo.getStyle().padding = "6px 6px 6px 5px";
			_s.text_sdo.getStyle().color = _s.normalColor_str;
			_s.text_sdo.getStyle().fontSmoothing = "antialiased";
			_s.text_sdo.getStyle().webkitFontSmoothing = "antialiased";
			_s.text_sdo.getStyle().textRendering = "optimizeLegibility";
			
			_s.text_sdo.setInnerHTML(_s.label1_str);
			_s.addChild(_s.text_sdo);
			
			_s.arrow_do = new FWDRAPDisplayObject("div");
			_s.arrow_do.setOverflow("visible");
			
			if(_s.useHEX){
				_s.arrowN_img = new Image();
				_s.arrowN_img.src = _s.arrowN_str;
				_s.arrowS_img = new Image();
				_s.arrowS_img.src = _s.arrowS_str;
				_s.arrowN_sdo = new FWDRAPDisplayObject("div");
				_s.arrowS_sdo = new FWDRAPDisplayObject("div");
				
				_s.arrowN_img.onload = function(){
					_s.arrowN_sdo.setWidth(_s.arrowN_img.width);
					_s.arrowN_sdo.setHeight(_s.arrowN_img.height);
					_s.arrowN_cnv = FWDRAPUtils.getCanvasWithModifiedColor(_s.arrowN_img, _s.nBC, true);
					_s.scrubbelinesNImage_img = _s.arrowN_cnv.image;
					_s.arrowN_sdo.getStyle().background = "url('" + _s.scrubbelinesNImage_img.src + "') repeat-y";
				}

				_s.arrowS_img.onload = function(){
					_s.arrowS_sdo.setWidth(_s.arrowS_img.width);
					_s.arrowS_sdo.setHeight(_s.arrowS_img.height);
					_s.arrowS_cnv = FWDRAPUtils.getCanvasWithModifiedColor(_s.arrowS_img, _s.sBC, true);
					_s.scrubbelinesSImage_img = _s.arrowS_cnv.image;
					_s.arrowS_sdo.getStyle().background = "url('" + _s.scrubbelinesSImage_img.src + "') repeat-y";
				}
			}else{
				_s.arrowN_sdo = new FWDRAPDisplayObject("div");
				_s.arrowN_sdo.screen.style.backgroundImage = "url(" + _s.arrowN_str + ")";
				_s.arrowS_sdo = new FWDRAPDisplayObject("div");
				_s.arrowS_sdo.screen.style.backgroundImage = "url(" + _s.arrowS_str + ")";
			}
			
			_s.arrowS_sdo.setAlpha(0);
			_s.arrow_do.addChild(_s.arrowN_sdo);
			_s.arrow_do.addChild(_s.arrowS_sdo);
			_s.addChild(_s.arrow_do);
			
			_s.arrowN_sdo.setWidth(_s.arrowWidth);
			_s.arrowN_sdo.setHeight(_s.arrowHeight);
			_s.arrowS_sdo.setWidth(_s.arrowWidth);
			_s.arrowS_sdo.setHeight(_s.arrowHeight);
			
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
				_s.screen.addEventListener("mousedown", _s.onMouseDown);
				_s.screen.addEventListener("click", _s.onClick);
			}

		};
		
		_s.onMouseOver = function(e){
			if(_s.isDisabled_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				FWDAnimation.killTweensOf(_s.text_sdo);
				_s.setSelectedState(true, 0);
				_s.dispatchEvent(FWDRAPComboBoxSelector.MOUSE_OVER);
			}
		};
			
		_s.onMouseOut = function(e){
			if(_s.isDisabled_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				FWDAnimation.killTweensOf(_s.text_sdo);
				_s.setNormalState(true, true);
				_s.dispatchEvent(FWDRAPComboBoxSelector.MOUSE_OUT);
			}
		};
		
		_s.onClick = function(e){
			if(_s.isDeveleper_bl){
				window.open("http://www.webdesign-flash.ro", "_blank");
				return;
			}
			if(_s.isDisabled_bl) return;
			if(e.preventDefault) e.preventDefault();
			_s.dispatchEvent(FWDRAPComboBoxSelector.CLICK);
		};
		
		_s.onMouseDown = function(e){
			if(e.preventDefault) e.preventDefault();
			_s.dispatchEvent(FWDRAPComboBoxSelector.MOUSE_DOWN, {e:e});
		};
		

		//###########################################//
		/* set selected / normal state */
		//###########################################//
		_s.setSelectedState = function(animate, dl){
			
			FWDAnimation.killTweensOf(_s.bk_sdo);
			FWDAnimation.killTweensOf(_s.text_sdo);
			FWDAnimation.killTweensOf(_s.arrowS_sdo);
			if(animate){
				FWDAnimation.to(_s.bk_sdo, .6, {alpha:1, ease:Expo.easeOut});	
				FWDAnimation.to(_s.text_sdo.screen, .6, {css:{color:_s.textSelectedColor_str}, ease:Expo.easeOut});
				FWDAnimation.to(_s.arrowS_sdo, .6, {alpha:1, ease:Expo.easeOut});
			}else{
				_s.bk_sdo.setAlpha(1);
				_s.text_sdo.getStyle().color = _s.textSelectedColor_str;
				_s.arrowS_sdo.alpha = 1;
			}
		};
		
		_s.setNormalState = function(animate, removeDelay){
			var dll = .6;
			if(removeDelay) dll = 0;
			dll = 0;
			FWDAnimation.killTweensOf(_s.bk_sdo);
			FWDAnimation.killTweensOf(_s.text_sdo);
			FWDAnimation.killTweensOf(_s.arrowS_sdo);
			if(animate){
				FWDAnimation.to(_s.bk_sdo, .6, {alpha:0, delay:dll, ease:Expo.easeOut});	
				FWDAnimation.to(_s.text_sdo.screen, .6, {css:{color:_s.textNormalColor_str}, delay:dll, ease:Expo.easeOut});
				FWDAnimation.to(_s.arrowS_sdo, .6, {alpha:0, delay:dll, ease:Expo.easeOut});
			}else{
				_s.bk_sdo.setAlpha(0);
				_s.text_sdo.getStyle().color = _s.textNormalColor_str;
				FWDAnimation.to(_s.text_sdo.screen, .01, {css:{color:_s.textNormalColor_str}});
				_s.arrowS_sdo.alpha = 0;
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
			
			_s.text_sdo.setX(6);
			
			_s.text_sdo.setY(Math.round((_s.totalHeight - _s.text_sdo.getHeight())/2) + 1);
			
			_s.arrow_do.setX(_s.totalWidth - _s.arrowWidth - 9);
			_s.arrow_do.setY(Math.round((_s.totalHeight - _s.arrowHeight)/2));
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
			_s.setSelectedState(true);
			if(FWDRAPUtils.hasTransform2d){
				FWDAnimation.to(_s.arrowN_sdo.screen, .8, {css:{rotation:180}, ease:Quart.easeOut});
				FWDAnimation.to(_s.arrowS_sdo.screen, .8, {css:{rotation:180}, ease:Quart.easeOut});
			}
		};
		
		_s.enable = function(){
			
			_s.isDisabled_bl = false;
			_s.setNormalState(true);
			if(FWDRAPUtils.hasTransform2d){
				FWDAnimation.to(_s.arrowN_sdo.screen, .8, {css:{rotation:0}, ease:Quart.easeOut});
				FWDAnimation.to(_s.arrowS_sdo.screen, .8, {css:{rotation:0}, ease:Quart.easeOut});
			}
			_s.setButtonMode(true);
		};
		
		_s.setText = function(text){
			if (FWDRAPUtils.isIEAndLessThen9){
				_s.text_sdo.screen.innerText = text;
			}else{
				_s.text_sdo.setInnerHTML(text);
			}
		};
		
		_s.init();
	};
	
	/* set prototype */
	FWDRAPComboBoxSelector.setPrototype = function(){
		FWDRAPComboBoxSelector.prototype = new FWDRAPDisplayObject ("div");
	};
	
	FWDRAPComboBoxSelector.FIRST_BUTTON_CLICK = "onFirstClick";
	FWDRAPComboBoxSelector.SECOND_BUTTON_CLICK = "secondButtonOnClick";
	FWDRAPComboBoxSelector.MOUSE_OVER = "onMouseOver";
	FWDRAPComboBoxSelector.MOUSE_OUT = "onMouseOut";
	FWDRAPComboBoxSelector.MOUSE_DOWN = "onMouseDown";
	FWDRAPComboBoxSelector.CLICK = "onClick";
	
	FWDRAPComboBoxSelector.prototype = null;
	window.FWDRAPComboBoxSelector = FWDRAPComboBoxSelector;
}(window));