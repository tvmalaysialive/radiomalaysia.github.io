/**
 * Royal Audio Player
 * Passowrd window.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function (window){
	
	var FWDRAPPassword = function(_d, prt, lg){

		'use strict';
		
		var _s = this;
		var prototype = FWDRAPPassword.prototype;
	
		_s.passColoseN_img = _d.passColoseN_img;
		_s.privateVideoPassword_str = _d.privateVideoPassword_str;
		
		_s.backgrondPath_str = _d.shareBkPath_str;
		
		_s.secondaryLabelsColor_str = _d.secondaryLabelsColor_str;
		_s.inputColor_str = _d.inputColor_str;
		_s.mainLabelsColor_str = _d.mainLabelsColor_str;
		_s.passButtonNPath_str = _d.passButtonNPath_str;
		_s.passButtonSPath_str = _d.passButtonSPath_str;
		_s.inputBackgroundColor_str = _d.inputBackgroundColor_str;
		_s.borderColor_str = _d.borderColor_str;
		
		_s.maxTextWidth = 0;
		_s.totalWidth = 0;
		_s.sW = 0;
		_s.sH = 0;
		_s.buttonWidth = 28;
		_s.buttonHeight = 19;
		_s.embedWindowCloseButtonMargins = _d.playbackRateButtonsMargins;

		_s.useVectorIcons_bl = _d.useVectorIcons;
		_s.isMbl = FWDRAPUtils.isMobile;
	

		//#################################//
		/* init */
		//#################################//
		_s.init = function(){
			if(_s.mainHld) return;
			_s.setBackfaceVisibility();
			_s.mainHld = new FWDRAPDisplayObject("div");
			_s.mainHld.hasTransform3d_bl = false;
			_s.mainHld.hasTransform2d_bl = false;
			_s.mainHld.setBackfaceVisibility();
			
			_s.bk_do = new FWDRAPDisplayObject("div");
			_s.bk_do.screen.className = 'fwdrap-window-background';
			_s.bk_do.getStyle().width = "100%";
			_s.bk_do.getStyle().height = "100%";
			_s.bk_do.setAlpha(.9);
			_s.bk_do.getStyle().background = "url('" + _s.backgrondPath_str + "')";
		
			_s.passMainHolder_do =  new FWDRAPDisplayObject("div");
			
			_s.passMainHolderBk_do = new FWDRAPDisplayObject("div");
			_s.passMainHolderBk_do.screen.className = 'fwdrap-form-holder-background';
			_s.passMainHolderBk_do.getStyle().background = "url('" + _s.backgrondPath_str + "')";
			_s.passMainHolderBk_do.getStyle().borderStyle = "solid";
			_s.passMainHolderBk_do.getStyle().borderWidth = "1px";
			_s.passMainHolderBk_do.getStyle().borderColor =  _s.borderColor_str;
			
			_s.passLabel_do = new FWDRAPDisplayObject("div");
			_s.passLabel_do.screen.className = 'fwdrap-label';
			_s.passLabel_do.setBackfaceVisibility();
			_s.passLabel_do.getStyle().fontFamily = "Arial";
			_s.passLabel_do.getStyle().fontSize= "12px";
			_s.passLabel_do.getStyle().color = _s.secondaryLabelsColor_str;
			_s.passLabel_do.getStyle().whiteSpace= "nowrap";
			_s.passLabel_do.getStyle().padding = "0px";
			_s.passLabel_do.setInnerHTML("Please enter password:");
	
			if(!lg){
				_s.passInput_do = new FWDRAPDisplayObject("input");
				_s.passInput_do.setBackfaceVisibility();
				_s.passInput_do.screen.className = 'fwdrap-form-input';
				_s.passInput_do.getStyle().fontFamily = "Arial";
				_s.passInput_do.getStyle().fontSize= "12px";
				_s.passInput_do.getStyle().backgroundColor = _s.inputBackgroundColor_str;
				_s.passInput_do.getStyle().color = _s.inputColor_str;
				_s.passInput_do.getStyle().outline = 0;
				_s.passInput_do.getStyle().whiteSpace= "nowrap";
				_s.passInput_do.getStyle().padding = "4px 6px 3px";
				_s.passInput_do.screen.setAttribute("type", "password");
				_s.passInput_do.getStyle().webkitBoxShadow=  "0 0 0 1000px" + _s.inputBackgroundColor_str + " inset";
				
				FWDRAPSimpleSizeButton.setPrototype();
				_s.passBtn = new FWDRAPSimpleSizeButton(
						_s.passButtonNPath_str, 
						_s.passButtonSPath_str,
						_s.buttonWidth,
						_s.buttonHeight,
						_d.useHEX,
						_d.nBC,
						_d.sBC, 
						true);
				_s.passBtn.screen.className = 'fwdrap-pass-button';
				_s.passBtn.addListener(FWDRAPSimpleSizeButton.CLICK, _s.passClickHandler);
			
				//setup close button.
				FWDRAPSimpleButton.setPrototype();
				if(_s.useVectorIcons_bl){
					_s.clsBtn = new FWDRAPSimpleButton(
							0, 0, 0, 0, 0, 0, 0,
							"<div class='table-fwdrap-button'><span class='table-cell-fwdrap-button fwdrap-icon-close'></span></div>",
							"fwdrap-categories-next-and-prev-normal-state",
							"fwdrap-categories-next-and-prev-selected-state"
					);
				}else{
					_s.clsBtn = new FWDRAPSimpleButton(
						_s.passColoseN_img, 
						_d.embedWindowClosePathS_str, 
						undefined,
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
			
				_s.passMainHolder_do.addChild(_s.passMainHolderBk_do);
				_s.passMainHolder_do.addChild(_s.passLabel_do);
				_s.passMainHolder_do.addChild(_s.passInput_do);
				_s.passMainHolder_do.addChild(_s.passBtn);
				_s.mainHld.addChild(_s.passMainHolder_do);
				_s.mainHld.addChild(_s.clsBtn); 
			}else{
				_s.addChild(_s.mainHld);
				_s.mainHld.addChild(_s.bk_do);
				_s.mainHld.addChild(_s.passLabel_do);
				_s.passLabel_do.setInnerHTML(_d.playIfLoggedInMessage);

				var clsn = 'fwdrap-loggedin-message-white';
				if(_d.isDark){
					clsn = 'fwdrap-loggedin-message-dark';
				}
				_s.passLabel_do.screen.className = clsn;

				FWDRAPSimpleButton.setPrototype();
				if(_s.useVectorIcons_bl){
					_s.clsBtn = new FWDRAPSimpleButton(
							0, 0, 0, 0, 0, 0, 0,
							"<div class='table-fwdrap-button'><span class='table-cell-fwdrap-button fwdrap-icon-close'></span></div>",
							"fwdrap-categories-next-and-prev-normal-state",
							"fwdrap-categories-next-and-prev-selected-state"
					);
					_s.clsBtn.screen.className = 'fwdrap-close-button';
					_s.clsBtn.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.closeButtonOnMouseUpHandler);
					_s.mainHld.addChild(_s.clsBtn); 
				}else{

					var clsNImg = new Image();
					clsNImg.src = _s.passColoseN_img.src;
					clsNImg.onload = function(){

						//setup close button.
						FWDRAPSimpleButton.setPrototype();
						_s.clsBtn = new FWDRAPSimpleButton(
								clsNImg, 
								_d.embedWindowClosePathS_str, 
								undefined,
								true,
								_d.useHEX,
								_d.nBC,
								_d.sBC, 
								false, false, false, true);
						_s.clsBtn.screen.className = 'fwdrap-close-button';
						_s.clsBtn.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.closeButtonOnMouseUpHandler);
						_s.mainHld.addChild(_s.clsBtn); 
						clsNImg.onload = null;
						_s.posClsBtn();
					}
				}
			}		
		};
	
		_s.closeButtonOnMouseUpHandler = function(){
			if(!_s.isShowed_bl) return;
			_s.hide();
		};
		
		function selectText(){
			if(window.top != window && FWDRAPUtils.isIE) return;
			var range, selection;
			if (document.body.createTextRange) {
				range = document.body.createTextRange();
			    range.moveToElementText(_s);
			    range.select();
			}else if(window.getSelection && document.createRange) {
			    selection = window.getSelection();
			    range = document.createRange();
			    range.selectNodeContents(_s);
			    selection.removeAllRanges();
			    selection.addRange(range);
			}
		};
		
		_s.positionAndResize = function(){
			_s.sW = prt.sW;
			_s.sH = prt.sH;
			
			_s.maxTextWidth = Math.min(_s.sW - 150, 300);
			_s.totalWidth = _s.maxTextWidth + _s.buttonWidth;
			
			_s.positionFinal();
			_s.posClsBtn();
			
			_s.setY(0);
			_s.setWidth(_s.sW);
			_s.setHeight(_s.sH);
			_s.mainHld.setWidth(_s.sW);
			_s.mainHld.setHeight(_s.sH);
			
		};

		_s.posClsBtn = function(){
			if(_s.clsBtn){
				_s.clsBtn.setX(_s.sW - _s.clsBtn.w - _s.embedWindowCloseButtonMargins);
				_s.clsBtn.setY(_s.embedWindowCloseButtonMargins);
			}
		}
		
		_s.positionFinal = function(){
			
			var totalHeight;
			var textLableHeight = _s.passLabel_do.getHeight();
			var passMainLabelHeight;
			
			if(!lg){
				_s.passLabel_do.setX(12);
				_s.passLabel_do.setY(14);
				
				_s.passInput_do.setX(10);
				_s.passInput_do.setWidth(parseInt(_s.totalWidth - 40 - _s.buttonWidth));
				_s.passInput_do.setY(_s.passLabel_do.y + textLableHeight + 5);
				_s.passBtn.setX(10 + _s.passInput_do.w + 20);
				_s.passBtn.setY(_s.passLabel_do.y + textLableHeight + 6);
				
				_s.passMainHolderBk_do.setY(_s.passLabel_do.y - 9);
				_s.passMainHolderBk_do.setWidth(_s.totalWidth - 2);
				_s.passMainHolderBk_do.setHeight(_s.passBtn.y + _s.passBtn.h + 2);
				_s.passMainHolder_do.setWidth(_s.totalWidth);
				_s.passMainHolder_do.setHeight(_s.passBtn.y + _s.passBtn.h + 14);

				_s.passMainHolder_do.setX(Math.round((_s.sW - _s.totalWidth)/2));
				totalHeight = _s.passMainHolderBk_do.getHeight();
				_s.passMainHolder_do.setY(Math.round((_s.sH - totalHeight)/2) - 6);
			}else{
				_s.passLabel_do.setX(Math.round((_s.sW - _s.passLabel_do.getWidth())/2));
				_s.passLabel_do.setY(Math.round((_s.sH - _s.passLabel_do.getHeight())/2));
			}
			
		};
		

		//##############################################//
		/* Send email */
		//##############################################//
		_s.passClickHandler = function(){
			_s.privateVideoPassword_str = _d.privateVideoPassword_str;
			if(_d.playlist_ar[prt.id]["privateVideoPassword_str"]) _s.privateVideoPassword_str = _d.playlist_ar[prt.id]["privateVideoPassword_str"];
			
			if(_s.privateVideoPassword_str != FWDRAPUtils.MD5(_s.passInput_do.screen.value)){
				if(!FWDAnimation.isTweening(_s.passInput_do.screen)) FWDAnimation.to(_s.passMainHolderBk_do.screen, .1, {css:{borderColor:'#FF0000'}, yoyo:true, repeat:3});
				return;
			}
			_s.dispatchEvent(FWDRAPPassword.CORRECT);
		};
		

		//##########################################//
		/* Update HEX color of a canvaas */
		//##########################################//
		_s.updateHEXColors = function(normalColor_str, selectedColor_str){
			_s.passBtn.updateHEXColors(normalColor_str, selectedColor_str);
			_s.clsBtn.updateHEXColors(normalColor_str, selectedColor_str);
		}
		

		/* show hide info */
		//#########################################//
		_s.showInfo = function(text, hasError){
				
			_s.infoText_do.setInnerHTML(text);
			_s.passMainHolder_do.addChild(_s.infoText_do);
			_s.infoText_do.setWidth(_s.buttonWidth);
			_s.infoText_do.setHeight(_s.buttonHeight - 4);
			_s.infoText_do.setX(_s.passBtn.x);
			_s.infoText_do.setY(_s.passBtn.y - 23);

			_s.infoText_do.setAlpha(0);
			if(hasError){
				_s.infoText_do.getStyle().color = "#FF0000";
			}else{
				_s.infoText_do.getStyle().color = _s.mainLabelsColor_str;
			}
			FWDAnimation.killTweensOf(_s.infoText_do);
			FWDAnimation.to(_s.infoText_do, .16, {alpha:1, yoyo:true, repeat:7});
		};
		

		//###########################################//
		/* show / hide */
		//###########################################//
		_s.show = function(id){
			if(_s.isShowed_bl) return;
			_s.isShowed_bl = true;
			
			prt.main_do.addChild(_s);
			_s.init();
			_s.positionAndResize();

			if(_s.useVectorIcons_bl){
				_s.checkButtonsId_to = setInterval(function(){
					if(_s.clsBtn.w != 0){
						_s.positionAndResize();
						
						clearInterval(_s.checkButtonsId_to);
						clearTimeout(_s.hideCompleteId_to);
						clearTimeout(_s.showCompleteId_to);
						_s.mainHld.setY(- _s.sH);
						
						_s.showCompleteId_to = setTimeout(_s.showCompleteHandler, 900);
						FWDAnimation.to(_s.mainHld, .8, {y:0, delay:.1, ease:Expo.easeInOut});
					}
				
				}, 50);
			}else{
				if(!FWDRAPUtils.isMobile || (FWDRAPUtils.isMobile && FWDRAPUtils.hasPointerEvent)) prt.main_do.setSelectable(true);
				
				clearTimeout(_s.hideCompleteId_to);
				clearTimeout(_s.showCompleteId_to);
				_s.mainHld.setY(- _s.sH);
				
				_s.showCompleteId_to = setTimeout(_s.showCompleteHandler, 900);
				setTimeout(function(){
					FWDAnimation.to(_s.mainHld, .8, {y:0, delay:.1, ease:Expo.easeInOut});
				}, 100);
			}
		};
		
		_s.showCompleteHandler = function(){};
		
		_s.hide = function(){
			if(!_s.isShowed_bl) return;
			_s.isShowed_bl = false;
			
			if(prt.customContextMenu_do) prt.customContextMenu_do.enable();
			_s.positionAndResize();
			
			clearTimeout(_s.hideCompleteId_to);
			clearTimeout(_s.showCompleteId_to);
			
			if(!FWDRAPUtils.isMobile || (FWDRAPUtils.isMobile && FWDRAPUtils.hasPointerEvent)) prt.main_do.setSelectable(false);
			_s.hideCompleteId_to = setTimeout(_s.hideCompleteHandler, 800);
			FWDAnimation.killTweensOf(_s.mainHld);
			FWDAnimation.to(_s.mainHld, .8, {y:-_s.sH, ease:Expo.easeInOut});
		};
		
		_s.hideCompleteHandler = function(){
			prt.main_do.removeChild(_s);
			_s.dispatchEvent(FWDRAPPassword.HIDE_COMPLETE);
		};
	
		if(_d.useHEX){
			_s.init();
		}
	};

		
	/* set prototype */
	FWDRAPPassword.setPrototype = function(){
		FWDRAPPassword.prototype = new FWDRAPDisplayObject("div");
	};
	
	FWDRAPPassword.ERROR = "error";
	FWDRAPPassword.CORRECT = "correct";
	FWDRAPPassword.HIDE_COMPLETE = "hideComplete";
	
	FWDRAPPassword.prototype = null;
	window.FWDRAPPassword = FWDRAPPassword;
}(window));