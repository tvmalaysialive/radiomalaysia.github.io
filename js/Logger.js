/**
 * Royal Audio Player
 * Custom console for mobile, just for testing!
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function (window){
	
	var FWDConsole = function(){

		'use strict';
		
		var _s  = this;
		var prototype = FWDConsole.prototype;
		
		_s.main_do = null;
	
		_s.init = function(){
			_s.setupScreen();
			window.onerror = _s.showError;
			_s.screen.style.zIndex = 99999999999;
			setTimeout(_s.addConsoleToDom, 100);
			setInterval(_s.position, 100);
		};
		
		_s.position = function(){
			var scrollOffsets = FWDRAPUtils.getScrollOffsets();
			_s.setX(scrollOffsets.x + 150);
			_s.setY(scrollOffsets.y);
		};
		
		_s.addConsoleToDom  = function(){
			if(navigator.userAgent.toLowerCase().indexOf("msie 7") != -1){
				document.getElementsByTagName("body")[0].appendChild(_s.screen);
			}else{
				document.documentElement.appendChild(_s.screen);
			}
		};
		
		/* setup screens */
		_s.setupScreen = function(){
			_s.main_do = new FWDRAPDisplayObject("div", "absolute");
			_s.main_do.setOverflow("auto");
			_s.main_do.setWidth(200);
			_s.main_do.setHeight(300);
			_s.setWidth(200);
			_s.setHeight(300);
			_s.main_do.setBkColor("#FFFFFF");
			_s.addChild(_s.main_do);
		};
		
		_s.showError = function(message, url, linenumber) {
			var currentInnerHTML = _s.main_do.getInnerHTML() + "<br>" + "JavaScript error: " + message + " on line " + linenumber + " for " + url;
			_s.main_do.setInnerHTML(currentInnerHTML);
			_s.main_do.screen.scrollTop = _s.main_do.screen.scrollHeight;
		};
		
		_s.log = function(message){
			var currentInnerHTML = _s.main_do.getInnerHTML() + "<br>" + message;
			_s.main_do.setInnerHTML(currentInnerHTML);  
			_s.main_do.getScreen().scrollTop = 10000;
		};
		
		_s.init();
	};
	
	/* set prototype */
    FWDConsole.setPrototype = function(){
    	FWDConsole.prototype = new FWDRAPDisplayObject("div", "absolute");
    };
    
    FWDConsole.prototype = null;
	window.FWDConsole = FWDConsole;
}(window));