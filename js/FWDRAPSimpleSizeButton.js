/**
 * Royal Audio Player
 * Simple size button.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function (window){
var FWDRAPSimpleSizeButton = function(
		nImgPath, 
		sImgPath,
		buttonWidth,
		buttonHeight, 
	    useHEX,
	    nBC,
	    sBC,
	    showOver){

		'use strict';
		
		var _s = this;
		var prototype = FWDRAPSimpleSizeButton.prototype;
	
		_s.useHEX = useHEX;
		_s.nBC = nBC;
		_s.sBC = sBC;
		
		_s.nImgPath_str = nImgPath;
		_s.sImgPath_str = sImgPath;
		
		_s.buttonWidth = buttonWidth;
		_s.buttonHeight = buttonHeight;

		_s.showOver = showOver;
		if(!useHEX){
			_s.showOver = false;
		}

		_s.isMbl = FWDRAPUtils.isMobile;
		_s.hasPointerEvent_bl = FWDRAPUtils.hasPointerEvent;
		_s.isDisabled_bl = false;
		
		
		//##########################################//
		/* initialize */
		//##########################################//
		_s.init = function(){
			_s.setupMainContainers();
			_s.setWidth(_s.buttonWidth);
			_s.setHeight(_s.buttonHeight);
			_s.setButtonMode(true);
			_s.setNormalState();
		};

		
		//##########################################//
		/* setup main containers */
		//##########################################//
		_s.setupMainContainers = function(){
			
			_s.nImg = new Image();
			_s.nImg.src = _s.nImgPath_str;
			
			if(_s.useHEX && !_s.showOver){
				_s.n_do = new FWDRAPTransformDisplayObject("div");
				_s.n_do.setWidth(_s.buttonWidth);
				_s.n_do.setHeight(_s.buttonHeight);
				_s.nImg.onload = function(){	
					_s.n_do_canvas = FWDRAPUtils.getCanvasWithModifiedColor(_s.nImg, _s.nBC).canvas;
					_s.n_do.screen.appendChild(_s.n_do_canvas);
				}
				_s.addChild(_s.n_do);
			}else{
				_s.n_do = new FWDRAPDisplayObject("img");
				_s.n_do.setScreen(_s.nImg);
				_s.n_do.setWidth(_s.buttonWidth);
				_s.n_do.setHeight(_s.buttonHeight);
				_s.addChild(_s.n_do);
			}
			
			_s.sImg = new Image();
			_s.sImg.src = _s.sImgPath_str;
			
			if(_s.useHEX){
				_s.s_do = new FWDRAPTransformDisplayObject("div");
				_s.s_do.setWidth(_s.buttonWidth);
				_s.s_do.setHeight(_s.buttonHeight);
				var clr = _s.sBC;
				if(_s.showOver){
					clr = _s.nBC
				}

				_s.sImg.onload = function(){
					_s.s_do_canvas = FWDRAPUtils.getCanvasWithModifiedColor(_s.sImg, clr).canvas;
					_s.s_do.screen.appendChild(_s.s_do_canvas);
				}
				if(!_s.showOver){
					_s.s_do.setAlpha(0);
				}else{
					_s.s_do.setAlpha(1);
				}
				_s.addChild(_s.s_do);
			}else{
				_s.s_do = new FWDRAPDisplayObject("img");
				_s.s_do.setScreen(_s.sImg);
				_s.s_do.setWidth(_s.buttonWidth);
				_s.s_do.setHeight(_s.buttonHeight);
				_s.addChild(_s.s_do);
				_s.s_do.setAlpha(1);
			}
			
			if(_s.showOver){
				_s.addChild(_s.s_do);
			}
			
			if(_s.hasPointerEvent_bl){
				_s.screen.addEventListener("pointerup", _s.onMouseUp);
				_s.screen.addEventListener("pointerover", _s.setSelectedState);
				_s.screen.addEventListener("pointerout", _s.setNormalState);
			}else if(_s.screen.addEventListener){	
				if(!_s.isMbl){
					_s.screen.addEventListener("mouseover", _s.setSelectedState);
					_s.screen.addEventListener("mouseout", _s.setNormalState);
					_s.screen.addEventListener("mouseup", _s.onMouseUp);
				}
				_s.screen.addEventListener("touchend", _s.onMouseUp);
			}
		};

		
		//####################################//
		/* Set normal / selected state */
		//####################################//
		_s.setNormalState = function(e){
			FWDAnimation.killTweensOf(_s.s_do);
			if(_s.showOver || !_s.useHEX){
				FWDAnimation.to(_s.s_do, .6, {alpha:1, ease:Quart.easeOut});
			}else{
				FWDAnimation.to(_s.s_do, .6, {alpha:0, ease:Quart.easeOut});
			}
		};
		
		_s.setSelectedState = function(e){
			FWDAnimation.killTweensOf(_s.s_do);
			if(_s.showOver  || !_s.useHEX){
				FWDAnimation.to(_s.s_do, .6, {alpha:0, ease:Quart.easeOut});
			}else{
				FWDAnimation.to(_s.s_do, .6, {alpha:1, ease:Quart.easeOut});
			}
		};
		
		_s.onMouseUp = function(e){
			_s.dispatchEvent(FWDRAPSimpleSizeButton.MOUSE_UP);
			_s.dispatchEvent(FWDRAPSimpleSizeButton.CLICK);
		};

		
		//##########################################//
		/* Update HEX color of a canvaas */
		//##########################################//
		_s.updateHEXColors = function(nBC, sBC){
			if(_s.n_do_canvas){
				FWDRAPUtils.changeCanvasHEXColor(_s.nImg, _s.n_do_canvas, nBC);
			}
			var clr = sBC;
			if(_s.showOver){
				clr = nBC;
			}
			FWDRAPUtils.changeCanvasHEXColor(_s.sImg, _s.s_do_canvas, clr);
		}
			
		_s.init();
	};
	
	
	/* set prototype */
	FWDRAPSimpleSizeButton.setPrototype = function(){
		FWDRAPSimpleSizeButton.prototype = null;
		FWDRAPSimpleSizeButton.prototype = new FWDRAPTransformDisplayObject("div", "relative");
	};
	
	FWDRAPSimpleSizeButton.MOUSE_UP = "onClick";
	FWDRAPSimpleSizeButton.CLICK = "onClick";
	
	FWDRAPSimpleSizeButton.prototype = null;
	window.FWDRAPSimpleSizeButton = FWDRAPSimpleSizeButton;
}(window));