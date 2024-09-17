/**
 * Royal Audio Player
 * Visualizer preloader.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function (window){
	
	var FWDRAPPreloader = function(_d, sW, sH){

		'use strict';
		
		var _s  = this;
		var prototype = FWDRAPPreloader.prototype;
	
		_s.sW = sW;
		_s.sH = sH;
		_s.isShowed_bl = false;
	
		
		//###################################//
		/* init */
		//###################################//
		_s.init = function(){
			_s.getStyle().zIndex = 1;
			_s.setWidth(_s.sW);
			_s.setHeight(_s.sH);
			_s.getStyle().pointerEvents = 'none';
			
			FWDRAPVisualizer.setPrototype();
			_s.vis = new FWDRAPVisualizer(
				{'visPrst':'bars1',
				 'visClr':_d.visClr,
				 'visCapClr':_d.visCapClr,
				 'useDumyVisualizeOnIOS':false});
			_s.vis.resize(0, 0, _s.sW, _s.sH)
			_s.addChild(_s.vis);
			
			_s.hide(false);
		};
		

		//###################################//
		/* start / stop preloader animation */
		//###################################//
		_s.start = function(){
			if(_s == null) return;
			_s.vis.start();
		};
		
		_s.stop = function(){
			_s.vis.stop();
		};
		
		
		//###################################//
		/* show / hide preloader animation */
		//###################################//
		_s.show = function(){
			_s.setVisible(true);
			_s.start();
			FWDAnimation.killTweensOf(_s);
			FWDAnimation.to(_s, 1, {alpha:1});
			_s.isShowed_bl = true;
		};
		
		_s.hide = function(animate){
			if(!_s.isShowed_bl) return;
			FWDAnimation.killTweensOf(_s);
			if(animate){
				FWDAnimation.to(_s, 1, {alpha:0, onComplete:_s.onHideComplete});
			}else{
				_s.setVisible(false);
				_s.setAlpha(0);
			}
			_s.isShowed_bl = false;
		};
		
		_s.onHideComplete = function(){
			_s.stop();
			_s.setVisible(false);
			_s.dispatchEvent(FWDRAPPreloader.HIDE_COMPLETE);
		};

		_s.init();
	};
	
	
	/* set prototype */
    FWDRAPPreloader.setPrototype = function(){
    	FWDRAPPreloader.prototype = new FWDRAPDisplayObject("div");
    };
    
    FWDRAPPreloader.HIDE_COMPLETE = "hideComplete";
    
    FWDRAPPreloader.prototype = null;
	window.FWDRAPPreloader = FWDRAPPreloader;
}(window));