/**
 * Royal Audio Player
 * Timeout hider.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function (window){
	
    var FWDRAPHider = function(screenToTest, screenToTest2, hideDelay){

    	'use strict';
    	
    	var _s = this;
    	var prototype = FWDRAPHider.prototype;
   
    	_s.screenToTest = screenToTest;
    	_s.screenToTest2 = screenToTest2;
    	_s.hideDelay = hideDelay;
    	_s.globalX = 0;
    	_s.globalY = 0;
    	_s.dispatchOnceShow_bl = true;
    	_s.isStopped_bl = true;
    	_s.isMbl = FWDRAPUtils.isMobile;
    	_s.hasPointerEvent_bl = FWDRAPUtils.hasPointerEvent;
    	
		_s.init = function(){};
	
		_s.start = function(){
			_s.currentTime = new Date().getTime();
			clearInterval(_s.checkIntervalId_int);
			_s.checkIntervalId_int = setInterval(_s.update, 100);
			_s.addMouseOrTouchCheck();
			_s.isStopped_bl = false;
		};
		
		_s.stop = function(){
			clearInterval(_s.checkIntervalId_int);
			_s.isStopped_bl = true;
			_s.removeMouseOrTouchCheck();
			_s.removeMouseOrTouchCheck2();
		};
		
		_s.addMouseOrTouchCheck = function(){	
			if(_s.hasInitialTestEvents_bl) return;
			_s.hasInitialTestEvents_bl = true;
			if(_s.isMbl){
				if(_s.hasPointerEvent_bl){
					_s.screenToTest.screen.addEventListener("pointerdown", _s.onMouseOrTouchUpdate);
					_s.screenToTest.screen.addEventListener("MSPointerMove", _s.onMouseOrTouchUpdate);
				}else{
					_s.screenToTest.screen.addEventListener("touchstart", _s.onMouseOrTouchUpdate);
				}
			}else if(window.addEventListener){
				window.addEventListener("mousemove", _s.onMouseOrTouchUpdate);
			}else if(document.attachEvent){
				document.attachEvent("onmousemove", _s.onMouseOrTouchUpdate);
			}
		};
		
		_s.removeMouseOrTouchCheck = function(){	
			if(!_s.hasInitialTestEvents_bl) return;
			_s.hasInitialTestEvents_bl = false;
			if(_s.isMbl){
				if(_s.hasPointerEvent_bl){
					_s.screenToTest.screen.removeEventListener("pointerdown", _s.onMouseOrTouchUpdate);
					_s.screenToTest.screen.removeEventListener("MSPointerMove", _s.onMouseOrTouchUpdate);
				}else{
					_s.screenToTest.screen.removeEventListener("touchstart", _s.onMouseOrTouchUpdate);
				}
			}else if(window.removeEventListener){
				window.removeEventListener("mousemove", _s.onMouseOrTouchUpdate);
			}else if(document.detachEvent){
				document.detachEvent("onmousemove", _s.onMouseOrTouchUpdate);
			}
		};
		
		_s.addMouseOrTouchCheck2 = function(){	
			if(_s.addSecondTestEvents_bl) return;
			_s.addSecondTestEvents_bl = true;
			if(_s.screenToTest.screen.addEventListener){
				_s.screenToTest.screen.addEventListener("mousemove", _s.secondTestMoveDummy);
			}else if(_s.screenToTest.screen.attachEvent){
				_s.screenToTest.screen.attachEvent("onmousemove", _s.secondTestMoveDummy);
			}
		};
		
		_s.removeMouseOrTouchCheck2 = function(){	
			if(!_s.addSecondTestEvents_bl) return;
			_s.addSecondTestEvents_bl = false;
			if(_s.screenToTest.screen.removeEventListener){
				_s.screenToTest.screen.removeEventListener("mousemove", _s.secondTestMoveDummy);
			}else if(_s.screenToTest.screen.detachEvent){
				_s.screenToTest.screen.detachEvent("onmousemove", _s.secondTestMoveDummy);
			}
		};
		
		_s.secondTestMoveDummy = function(){
			_s.removeMouseOrTouchCheck2();
			_s.addMouseOrTouchCheck();
		};
		
		_s.onMouseOrTouchUpdate = function(e){
			var viewportMouseCoordinates = FWDRAPUtils.getViewportMouseCoordinates(e);	
			
			if(_s.globalX != viewportMouseCoordinates.screenX
			   && _s.globalY != viewportMouseCoordinates.screenY){
				_s.currentTime = new Date().getTime();
			}
			
			_s.globalX = viewportMouseCoordinates.screenX;
			_s.globalY = viewportMouseCoordinates.screenY;
			
			if(!_s.isMbl){
				if(!FWDRAPUtils.hitTest(_s.screenToTest.screen, _s.globalX, _s.globalY)){
					_s.removeMouseOrTouchCheck();
					_s.addMouseOrTouchCheck2();
				}
			}
		};
	
		_s.update = function(e){
			if(new Date().getTime() > _s.currentTime + _s.hideDelay){
				if(_s.dispatchOnceShow_bl){	
					_s.dispatchOnceHide_bl = true;
					_s.dispatchOnceShow_bl = false;	
					_s.dispatchEvent(FWDRAPHider.HIDE);
					clearTimeout(_s.hideCompleteId_to);
					_s.hideCompleteId_to = setTimeout(function(){
						_s.dispatchEvent(FWDRAPHider.HIDE_COMPLETE);
					}, 1000);
				}
			}else{
				if(_s.dispatchOnceHide_bl){
					clearTimeout(_s.hideCompleteId_to);
					_s.dispatchOnceHide_bl = false;
					_s.dispatchOnceShow_bl = true;
					_s.dispatchEvent(FWDRAPHider.SHOW);
				}
			}
		};

		_s.reset = function(){
			clearTimeout(_s.hideCompleteId_to);
			_s.currentTime = new Date().getTime();
			_s.dispatchEvent(FWDRAPHider.SHOW);
		};
		
		_s.init();
     };
     
	 FWDRAPHider.HIDE = "hide";
	 FWDRAPHider.SHOW = "show";
	 FWDRAPHider.HIDE_COMPLETE = "hideComplete";
	 
	 FWDRAPHider.setPrototype = function(){
		 FWDRAPHider.prototype = new FWDRAPEventDispatcher();
	 };
	 

	 window.FWDRAPHider = FWDRAPHider;
}(window));