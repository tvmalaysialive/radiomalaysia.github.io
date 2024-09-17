/**
 * Royal Audio Player
 * Scrubber tooltip.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function (window){
var FWDRAPScrubberTooltip = function(
			buttonRef_do,
			bkColor,
			fontColor_str,
			toolTipLabel_str,
			toolTipsButtonsHideDelay
		){

		'use strict';
		
		var _s = this;
		var prototype = FWDRAPScrubberTooltip.prototype;
		
		_s.buttonRef_do = buttonRef_do;
		
		_s.bkColor = bkColor;
	
		_s.fontColor_str = fontColor_str;
		_s.toolTipLabel_str = toolTipLabel_str;
		
		_s.toolTipsButtonsHideDelay = toolTipsButtonsHideDelay * 1000;
		_s.pointerWidth = 7;
		_s.pointerHeight = 4;
		
		_s.isMbl = FWDRAPUtils.isMobile;
		_s.isShowed_bl = true;
	

		//##########################################//
		/* initialize */
		//##########################################//
		_s.init = function(){
			_s.setOverflow("visible");
			_s.setupMainContainers();
			_s.setLabel(toolTipLabel_str);
			_s.hide();
			_s.setVisible(false);
			_s.getStyle().backgroundColor = _s.bkColor;
			_s.screen.className = 'fwdrap-controler-tooltip-background';
			_s.getStyle().zIndex = 9999999999999;
			_s.getStyle().pointerEvents = "none";
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
			_s.text_do.screen.className = 'fwdrap-controler-tooltip-text';
			_s.text_do.setBackfaceVisibility();
			_s.text_do.setDisplay("inline-block");
			_s.text_do.getStyle().textAlign = 'center';
			_s.text_do.getStyle().fontFamily = "Arial";
			_s.text_do.getStyle().fontSize= "12px";
			_s.text_do.getStyle().color = _s.fontColor_str;
			_s.text_do.getStyle().whiteSpace= "nowrap";
			_s.text_do.getStyle().padding = "4px 7px";
			_s.addChild(_s.text_do);
			
			_s.pointer_do = new FWDRAPDisplayObject("div");
			_s.pointer_do.screen.className = 'fwdrap-controler-tooltip-pointer';
			_s.pointer_do.setBkColor(_s.bkColor);
			_s.pointer_do.screen.style = "border: 4px solid transparent; border-top-color: " + _s.bkColor + ";";
			_s.pointerHolder_do.addChild(_s.pointer_do);
		
		}
		

		//##########################################//
		/* set label */
		//##########################################//
		_s.setLabel = function(label){
			
			if(label === undefined ) return;
			_s.text_do.setInnerHTML(label);
			setTimeout(function(){
				if(_s == null) return;
					_s.setWidth(_s.text_do.getWidth());
					_s.setHeight(_s.text_do.getHeight());
					_s.positionPointer();
				},20);
		};
		
		_s.positionPointer = function(offsetX){
			var finalX;
			var finalY;
			
			if(!offsetX) offsetX = 0;
			
			finalX = parseInt((_s.w - 8)/2) + offsetX;
			finalY = _s.h;
			_s.pointerHolder_do.setX(finalX);
			_s.pointerHolder_do.setY(finalY);
			
		};
		

		//##########################################//
		/* show / hide*/
		//##########################################//
		_s.show = function(){

			//if(_s.isShowed_bl) return;
			_s.isShowed_bl = true;
			clearTimeout(_s.hideWithDelayId_to);

			FWDAnimation.killTweensOf(_s);
			clearTimeout(_s.showWithDelayId_to);
			_s.showWithDelayId_to = setTimeout(_s.showFinal, _s.toolTipsButtonsHideDelay);
		};
		
		_s.showFinal = function(){
			_s.setVisible(true);
			FWDAnimation.to(_s, .4, {alpha:1, onComplete:function(){_s.setVisible(true);}, ease:Quart.easeOut});
		};
		
		_s.hide = function(){
			
			if(!_s.isShowed_bl) return;
			clearTimeout(_s.showWithDelayId_to);
			clearTimeout(_s.hideWithDelayId_to);

			_s.hideWithDelayId_to = setTimeout(function(){
				
				FWDAnimation.killTweensOf(_s);
				_s.setVisible(false);
				_s.isShowed_bl = false;	
				_s.setAlpha(0);
			}, 100);
			
		};
		

		_s.init();
	};

	
	/* set prototype */
	FWDRAPScrubberTooltip.setPrototype = function(){
		FWDRAPScrubberTooltip.prototype = null;
		FWDRAPScrubberTooltip.prototype = new FWDRAPDisplayObject("div");
	};
	
	FWDRAPScrubberTooltip.CLICK = "onClick";
	FWDRAPScrubberTooltip.MOUSE_DOWN = "onMouseDown";
	
	FWDRAPScrubberTooltip.prototype = null;
	window.FWDRAPScrubberTooltip = FWDRAPScrubberTooltip;
}(window));