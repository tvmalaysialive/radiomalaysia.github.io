/**
 * Royal Audio Player
 * Button tooltip.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function (window){
var FWDRAPToolTip = function(
			buttonRef_do,
			toopTipPointerUp_str,
			toolTipLabel_str,
			bkColor,
			fontColor_str,
			toolTipsButtonsHideDelay
		){

		'use strict';
		
		var _s = this;
		var prototype = FWDRAPToolTip.prototype;
		
		_s.buttonRef_do = buttonRef_do;
		
		_s.fontColor_str = fontColor_str;
		_s.toolTipLabel_str = toolTipLabel_str;
		_s.toopTipPointerUp_str = toopTipPointerUp_str;
		
		_s.toolTipsButtonsHideDelay = toolTipsButtonsHideDelay * 1000;
		_s.pointerWidth = 8;
		_s.pointerHeight = 4;
		
		_s.isMbl = FWDRAPUtils.isMobile;
		_s.isShowed_bl = true;

	
		//##########################################//
		/* initialize _s */
		//##########################################//
		_s.init = function(){
			_s.setOverflow("visible");
			
			_s.setupMainContainers();
			_s.setLabel(_s.toolTipLabel_str);
			_s.hide();
			_s.getStyle().backgroundColor = bkColor;
			_s.screen.className = 'fwdrap-controler-tooltip-background';
			_s.getStyle().zIndex = 9999999999;
		};

		
		//##########################################//
		/* setup main containers */
		//##########################################//
		_s.setupMainContainers = function(){
			_s.pointerHolder_do = new FWDRAPDisplayObject("div");
			_s.pointerHolder_do.setOverflow('visible');
			_s.addChild(_s.pointerHolder_do);

			_s.text_do = new FWDRAPDisplayObject("div");
			_s.text_do.hasTransform3d_bl = false;
			_s.text_do.hasTransform2d_bl = false;
			_s.text_do.setBackfaceVisibility();
			_s.text_do.screen.className = 'fwdrap-controler-tooltip-text';
			_s.text_do.setDisplay("inline");
			_s.text_do.getStyle().fontFamily = "Arial";
			_s.text_do.getStyle().fontSize= "12px";
			_s.text_do.getStyle().color = _s.fontColor_str;
			_s.text_do.getStyle().whiteSpace= "nowrap";
			_s.text_do.getStyle().padding = "4px 7px";
			_s.setLabel();
			_s.addChild(_s.text_do);

			_s.pointer_do = new FWDRAPDisplayObject("div");
			_s.pointer_do.screen.className = 'fwdrap-controler-tooltip-pointer';
			_s.pointer_do.setBkColor(_s.bkColor);
			_s.pointer_do.screen.style = "border: 4px solid transparent; border-top-color: " + bkColor + ";";
			_s.pointerHolder_do.addChild(_s.pointer_do);
		};

		
		//##########################################//
		/* set label */
		//##########################################//
		_s.setLabel = function(label){
			_s.text_do.setInnerHTML(toolTipLabel_str);
			setTimeout(function(){
				if(_s == null) return;
					_s.setWidth(_s.text_do.getWidth());
					_s.setHeight(_s.text_do.getHeight());
					_s.positionPointer();
				},50);
		};
		
		_s.positionPointer = function(offsetX, showPointerUp){
			
			var finalX;
			var finalY;
			
			if(!offsetX) offsetX = 0;
			
			finalX = parseInt((_s.w - _s.pointerWidth)/2) + offsetX;
			
			if(showPointerUp){
				finalY =-3;
				_s.pointerHolder_do.setX(finalX);
				_s.pointerHolder_do.setY(finalY);
			}else{
				finalY = _s.h;
				_s.pointerHolder_do.setX(finalX);
				_s.pointerHolder_do.setY(finalY);
			}
		};

		
		//##########################################//
		/* show / hide*/
		//##########################################//
		_s.tt = 0;
		_s.show = function(){
			_s.isShowed_bl = true;
			FWDAnimation.killTweensOf(_s);
			clearTimeout(_s.showWithDelayId_to);
			_s.showWithDelayId_to = setTimeout(_s.showFinal, _s.toolTipsButtonsHideDelay);
			window.addEventListener("mousemove", _s.moveHandler);
		};
		
		_s.showFinal = function(){
			_s.setVisible(true);
			_s.setAlpha(0);
			FWDAnimation.to(_s, .4, {alpha:1, onComplete:function(){_s.setVisible(true);}, ease:Quart.easeOut});
		};
		
		_s.moveHandler = function(e){
			var wc = FWDRAPUtils.getViewportMouseCoordinates(e);
			_s.tt ++;
			if(_s.tt < 4) return;
	
			if(!FWDRAPUtils.hitTest(_s.buttonRef_do.screen, wc.screenX, wc.screenY)) _s.hide();
		};
		
		_s.hide = function(){
			if(!_s.isShowed_bl) return;
			
			_s.tt = 0;
			clearTimeout(_s.showWithDelayId_to);
			if(window.removeEventListener){
				window.removeEventListener("mousemove", _s.moveHandler);
			}else if(document.detachEvent){
				document.detachEvent("onmousemove", _s.moveHandler);
			}
			FWDAnimation.killTweensOf(_s);
			_s.setVisible(false);
			_s.isShowed_bl = false;
		};
		
	
		_s.init();
	};
	
	
	/* set prototype */
	FWDRAPToolTip.setPrototype = function(){
		FWDRAPToolTip.prototype = null;
		FWDRAPToolTip.prototype = new FWDRAPDisplayObject("div", "fixed");
	};
	
	FWDRAPToolTip.CLICK = "onClick";
	FWDRAPToolTip.MOUSE_DOWN = "onMouseDown";
	
	FWDRAPToolTip.prototype = null;
	window.FWDRAPToolTip = FWDRAPToolTip;
}(window));