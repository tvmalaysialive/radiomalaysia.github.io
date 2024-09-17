/**
 * Royal Audio Player
 * Playlist.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function(){
	var FWDRAPPlaylist = function(
			_d,
			prt
		){

		'use strict';
		
		var _s = this;
		_s._d = _d;
		var prototype = FWDRAPPlaylist.prototype;
		
		_s.searchBarButtons_ar;
		
		_s.playlistItemBk1_img = _d.playlistItemBk1_img;
		_s.playlistItemBk2_img = _d.playlistItemBk2_img;
		_s.playlistSeparator_img = _d.playlistSeparator_img;
		_s.playlistScrBkTop_img = _d.playlistScrBkTop_img;
		_s.playlistScrBkMiddle_img = _d.playlistScrBkMiddle_img;
		_s.playlistScrBkBottom_img = _d.playlistScrBkBottom_img;
		_s.playlistScrDragTop_img = _d.playlistScrDragTop_img;
		_s.playlistScrDragMiddle_img = _d.playlistScrDragMiddle_img;
		_s.playlistScrDragBottom_img = _d.playlistScrDragBottom_img;
		_s.playlistPlayButtonN_img = _d.playlistPlayButtonN_img;
		_s.playlistScrLines_img = _d.playlistScrLines_img;
		_s.playlistScrLinesOver_img = _d.playlistScrLinesOver_img;
		_s.playlistDownloadButtonN_img = _d.playlistDownloadButtonN_img;
		_s.playlistBuyButtonN_img = _d.playlistBuyButtonN_img;
		
		_s.playlistPlayButtonN_str = _d.playlistPlayButtonN_str;
		_s.playlistPlayButtonS_str = _d.playlistPlayButtonS_str;
		_s.playlistPauseButtonN_str = _d.playlistPauseButtonN_str;
		_s.playlistPauseButtonS_str = _d.playlistPauseButtonS_str;
		_s.controllerBkPath_str = _d.controllerBkPath_str;
		_s.playlistBackgroundColor_str = _d.playlistBackgroundColor_str;
		_s.searchInputColor_str = _d.searchInputColor_str;
		_s.toolTipsFntClr = _d.toolTipsFntClr;
		_s.toolTipsBkClr = _d.toolTipsBkClr;
		
		_s.useHEX = _d.useHEX; 
		_s.nBC = _d.nBC;
		_s.n2BC = _d.n2BC;
		_s.sBC = _d.sBC;
		
		_s.inputSearchTextOffsetTop = _d.inputSearchTextOffsetTop;
		_s.inputSearchOffsetLeft = _d.inputSearchOffsetLeft;
		_s.startSpaceBetweenButtons = _d.startSpaceBetweenButtons;
		_s.spaceBetweenButtons = _d.spaceBetweenButtons;
		if(_s.spaceBetweenButtons > 15) _s.spaceBetweenButtons = 10;
		_s.countID3 = 0;
		_s.countTrack = 0;
		_s.id = 0;
		_s.sW = 0;
		_s.sH = 0;
		_s.itemsTotalHeight = 0;
		_s.scrollbarOffestWidth = _d.scrollbarOffestWidth;
		_s.scrWidth = _s.playlistScrBkTop_img.width;
		_s.trackTitleOffsetLeft = _d.trackTitleOffsetLeft;
		_s.downloadButtonOffsetRight = _d.downloadButtonOffsetRight;
		_s.itemHeight = _d.playlistItemHeight;
		_s.playPuaseIconWidth = _s.playlistPlayButtonN_img.width;
		_s.playPuaseIconHeight = _s.playlistPlayButtonN_img.height;
		_s.nrOfVisiblePlaylistItems = _d.nrOfVisiblePlaylistItems;
		_s.durationOffsetRight = _d.durationOffsetRight;
		_s.toolTipsDl = _d.toolTipsDl;
		_s.totalPlayListItems = 0;
		_s.visibleNrOfItems = 0;
		_s.yPositionOnPress = 0;
		_s.lastPresedY = 0;
		_s.lastListY = 0;
		_s.playListFinalY = 0;
		_s.scrollBarHandlerFinalY = 0;
		_s.scrollBarHandlerFinalY = 0;
		_s.vy = 0;
		_s.vy2 = 0;
		_s.friction = .9;
		_s.searchBarHeight = _d.searchBarHeight;
		_s.comboboxHeight = _d.playlistSelectorHeight;
		_s.searchBarPosition = _s._d.searchBarPosition
	
		_s.usePlaylistsSelectBox_bl = _d.usePlaylistsSelectBox_bl;
		_s.showButtonsToolTips_bl = _d.showButtonsToolTips_bl;
		_s.showSortButtons_bl =  _d.showSortButtons_bl;
		_s.isSortedNumerical_bl = true;
		_s.sortAscending_bl = _d.sortAscending_bl;
		_s.isShowNothingFound_bl = false;
		_s.expandPlaylistBackground_bl = _d.expandControllerBackground_bl;
		_s.showSearchBar_bl = _d.showSearchBar_bl;
		_s.addScrollBarMouseWheelSupport_bl = _d.addScrollBarMouseWheelSupport_bl;
		_s.showPlaylistItemDownloadButton_bl = _d.showPlaylistItemDownloadButton_bl;
		_s.showPlaylistItemBuyButton_bl = _d.showPlaylistItemBuyButton_bl;
		_s.allowToScrollAndScrollBarIsActive_bl = false;
		_s.showPlaylistItemPlayButton_bl = _d.showPlaylistItemPlayButton_bl;
		_s.isShowed_bl = _d.showPlayListByDefault_bl;
		_s.animateOnIntro_bl = _d.animateOnIntro_bl;
		_s.isMbl = FWDRAPUtils.isMobile;
		_s.hasPointerEvent_bl = FWDRAPUtils.hasPointerEvent;


		//##########################################//
		/* initialize _s */
		//##########################################//
		_s.init = function(){

			_s.mainHolder_do = new FWDRAPDisplayObject("div");
			_s.mainHolder_do.screen.className = 'fwdrap-playlist-background fwdrap-main-holder';
			_s.mainHolder_do.setBkColor(_s.playlistBackgroundColor_str);
		
			_s.itemsHolder_do = new FWDRAPDisplayObject("div");
			_s.itemsHolder_do.setOverflow("visible");
			_s.itemsHolder_do.setY(0);
			
			_s.setupSeparator();
			_s.mainHolder_do.addChild(_s.itemsHolder_do);

			if(_s.isMbl){
				_s.setupMobileScrollbar();
				if(_s.hasPointerEvent_bl) _s.setupDisable();
			}else{
				_s.setupDisable();
				_s.setupScrollbar();
				if(_s.addScrollBarMouseWheelSupport_bl) _s.addMouseWheelSupport();
			}
			
			if(_s.usePlaylistsSelectBox_bl) _s.setupcomboBox();

			if(_s.searchBarPosition == 'top'){
				_s.dumyHolder = new FWDRAPDisplayObject("div"); 
				_s.dumyHolder.setOverflow('visible');
				_s.dumyHolder.setWidth(300);
				_s.dumyHolder.setHeight(300);
				var t = _s.searchBarHeight + _s.playlistSeparator_img.height;
				if(_s.usePlaylistsSelectBox_bl) t = _s.comboBox_do.h + _s.playlistSeparator_img.height;
				_s.dumyHolder.setY(t);
				_s.addChild(_s.dumyHolder);
				_s.dumyHolder.addChild(_s.mainHolder_do);
				
			}else{
				_s.addChild(_s.mainHolder_do);
			}

			if(_s.usePlaylistsSelectBox_bl){
				_s.addChild(_s.comboBox_do);
			}
			
			if(_s.showSearchBar_bl){
				_s.searchBar_do = new FWDRAPDisplayObject("div");
				_s.searchBar_do.screen.className = 'fwdrap-playlist-bottom-bar';
				_s.searchBar_do.setOverflow("visible");
				
				if(!_s.expandPlaylistBackground_bl){
					_s.controllerBk_do =  new FWDRAPDisplayObject("div");
					_s.controllerBk_do.getStyle().background = "url('" + _s.controllerBkPath_str +  "')";
				}else{
					_s.controllerBk_do = new FWDRAPDisplayObject("img");
					var imageBk_img = new Image();
					imageBk_img.src = _s.controllerBkPath_str;
					_s.controllerBk_do.setScreen(imageBk_img);
				}
				_s.controllerBk_do.screen.className = 'fwdrap-playlist-bottom-bar-background';
				_s.controllerBk_do.getStyle().width = "100%";
				
				_s.searchSeparator_do = new FWDRAPDisplayObject("div");
				_s.searchSeparator_do.setBackfaceVisibility();
				_s.searchSeparator_do.hasTransform3d_bl = false;
				_s.searchSeparator_do.hasTransform2d_bl = false;
				_s.searchSeparator_do.screen.className = 'fwdrap-controler-separator';
				_s.searchSeparator_do.getStyle().background = "url('" + _s.playlistSeparator_img.src + "')";
				_s.searchSeparator_do.setHeight(_s.playlistSeparator_img.height);
				
				_s.searchBar_do.setHeight(_s.searchBarHeight + _s.searchSeparator_do.h);
				_s.controllerBk_do.setHeight(_s.searchBar_do.h + 1);
				
				_s.searchBar_do.addChild(_s.controllerBk_do);
				_s.searchBar_do.addChild(_s.searchSeparator_do);
				
				_s.setupInput();
				if(_s.showSortButtons_bl){
					_s.setupButtons();
					if(_s.showButtonsToolTips_bl) _s.setupToolTips();
				}
				
				if(_s.searchBarPosition == 'top'){
					_s.dumyHolder.addChild(_s.searchBar_do);
					_s.searchSeparator_do.setY(_s.controllerBk_do.h)
				}else{
					_s.mainHolder_do.addChild(_s.searchBar_do);
				}
				
			}
			_s.addChild(_s.separator_do);
		};
		
		//###############################################//
		/* Setup combo-box */
		//###############################################//
		_s.setupcomboBox = function(){
			_s.labels_ar = [];
			for (var i=0; i<_d.cats_ar.length; i++){
				_s.labels_ar[i] = _d.cats_ar[i].playlistsName;
				var count = "";
				if(_d.showPlaylistsSelectBoxNumbers_bl){
					if(i<9) count = "0";
					count = count + (i + 1) + ". ";
					_s.labels_ar[i] = count + _d.cats_ar[i].playlistsName;
				}else{
					_s.labels_ar[i] = _d.cats_ar[i].playlistsName;
				}
			}
			var settingsObj ={
				categories_ar:_s.labels_ar,
				selectorLabel:_s.labels_ar[0],
				bk1_str:_d.comboboxBk1_str,
				bk2_str:_d.comboboxBk2_str,
				selectorBackgroundNormalColor:_d.mainSelectorBackgroundSelectedColor,
				selectorTextNormalColor:_d.mainSelectorTextNormalColor,
				selectorTextSelectedColor:_d.mainSelectorTextSelectedColor,
				buttonBackgroundNormalColor:_d.mainButtonBackgroundNormalColor,
				buttonBackgroundSelectedColor:_d.mainButtonBackgroundSelectedColor,
				buttonTextNormalColor:_d.mainButtonTextNormalColor,
				buttonTextSelectedColor:_d.mainButtonTextSelectedColor,
				buttonHeight:_s.comboboxHeight,
				arrowN_str:_d.arrowN_str,
				arrowS_str:_d.arrowS_str,
				arrowW:11,
				arrowH:6
			}
			
			FWDRAPComboBox.setPrototype();
			_s.comboBox_do = new FWDRAPComboBox(_s, settingsObj);
			_s.comboBox_do.addListener(FWDRAPComboBox.BUTTON_PRESSED, _s.changePlaylistOnClick);
			_s.comboBox_do.setY(-_s.comboBox_do.h - 2);	
		}
		
		_s.changePlaylistOnClick = function(e){
			_s.dispatchEvent(FWDRAPPlaylist.CHANGE_PLAYLIST, {id:e.id});
		};
		
		
		_s.disableSearchBar = function(){
			if(_s.isSearchBarDisabled_bl) return;
			_s.isSearchBarDisabled_bl = true;
			_s.input_do.screen.value = "Loading ID3's ...";
			_s.input_do.screen.disabled = true;
				
			if(_s.sortNButton_do){
				_s.sortNButton_do.disable();
				_s.sortAButton_do.disable();
				_s.ascDscButton_do.disable();
			}
		};
		
		_s.enableSearchBar = function(){
			if(!_s.isSearchBarDisabled_bl) return;
			_s.isSearchBarDisabled_bl = false;
			_s.input_do.screen.value = "search for track";
			_s.input_do.screen.disabled = false;
			if(_s.sortNButton_do){
				_s.sortNButton_do.enable();
				_s.sortAButton_do.enable();
				_s.ascDscButton_do.enable();
			}
		};
		
	
		//###########################################//
		// Resize and position.
		//###########################################//
		_s.resizeAndPosition = function(){
			if(prt.sW == _s.sW && prt.sH == _s.sH) return;
			if(!_s.isListCreated_bl) return;
			_s.sW = prt.sW;
			
			if(_s.searchBar_do) _s.positionSearchBar();
			_s.positionList();
			if(_s.comboBox_do) _s.comboBox_do.resizeAndPosition();
			
			if(_s.scrMainHolder_do && _s.allowToScrollAndScrollBarIsActive_bl) _s.scrMainHolder_do.setX(_s.sW -  _s.scrWidth);
		};
		
		
		//##############################//
		/* position list */
		//##############################//
		_s.positionList = function(reverse){
			if(!_s.isListCreated_bl) return;
			
			var item;
			
			_s.copy_ar = [].concat(_s.items_ar);
			_s.isSearched_bl = false;
			
			if(_s.input_do){
				var inputValue = _s.input_do.screen.value;
				if(inputValue != "search for track" && !_s.isSearchBarDisabled_bl){
					inputValue = _s.input_do.screen.value.toLowerCase();
					for(var i=0; i<_s.copy_ar.length; i++){
						item = _s.copy_ar[i];
						if(item.titleText_str.toLowerCase().indexOf(inputValue.toLowerCase()) == -1){
							FWDAnimation.killTweensOf(item);
							if(item.alpha != 1) item.setAlpha(1);
							item.setX(-item.w);
							_s.copy_ar.splice(i, 1);
							i--;
						}
					}
				}
			}
			
			var count = 0;
			for(var i=0; i<_s.copy_ar.length; i++){
				item = _s.copy_ar[i];
				item.changeSource(i%2);
			}
			
			var totalItems = _s.copy_ar.length;
			_s.totalSearchedItems = totalItems;
			_s.itemsTotalHeight = (totalItems * _s.itemHeight);
		
			if(_s.visibleNrOfItems >= totalItems){
				_s.allowToScrollAndScrollBarIsActive_bl = false;
			}else{
				_s.allowToScrollAndScrollBarIsActive_bl = true;
			}
			
			for(var i=0; i<totalItems; i++){
				
				item = _s.copy_ar[i];
			
				if(_s.allowToTweenPlaylistItems_bl && item.x < 0 && !_s.isMbl){
					if(!FWDAnimation.isTweening(item)) FWDAnimation.to(item, .8, {x:0, ease:Expo.easeInOut});
				}else{
					FWDAnimation.killTweensOf(item);
					item.setX(0);	
				}
				item.setY(_s.itemHeight * i);
				
				if(_s.allowToScrollAndScrollBarIsActive_bl && _s.scrMainHolder_do){
					item.resize(_s.sW - _s.scrollbarOffestWidth, _s.itemHeight);
				}else{
					item.resize(_s.sW, _s.itemHeight);
				}
				if(item.alpha != 1) item.setAlpha(1);
			}
		
			
			if(_s.allowToScrollAndScrollBarIsActive_bl && _s.scrMainHolder_do){
				_s.itemsHolder_do.setWidth(_s.sW - _s.scrollbarOffestWidth);
			}else{
				_s.itemsHolder_do.setWidth(_s.sW);
			}
			
			if(_s.input_do){
				if(totalItems == 0){
					_s.showNothingFound();
				}else{
					_s.hideNothingFound();
				}
			}

			if(_s.scrHandler_do){
				_s.updateScrollBarSizeActiveAndDeactivate();
			} 
			_s.updateScrollBarHandlerAndContent(false, true);

			_s.separator_do.setWidth(_s.sW);
			_s.mainHolder_do.setWidth(_s.sW);
			_s.mainHolder_do.setHeight(_s.sH);
			_s.setWidth(_s.sW);
			if(_s.usePlaylistsSelectBox_bl){
				_s.setHeight(_s.sH + _s.comboboxHeight);
			}else{
				_s.setHeight(_s.sH);
			}
		};
		
		
		//################################//
		/* Update playlist */
		//###############################//
		_s.updatePlaylist = function(playlist){
			if(_s.isListCreated_bl) return;
			
			_s.playlist_ar = playlist;		
			var showDelay = _s.isShowedFirstTime_bl ? 50 : 600;
			_s.isShowedFirstTime_bl = true;
			_s.countTrack = 0;
			_s.isListCreated_bl = true;
			if(_s.input_do) _s.input_do.screen.value = "search for track";
			_s.allowToScrollAndScrollBarIsActive_bl = false;
			
			_s.visibleNrOfItems = _s.nrOfVisiblePlaylistItems;
			_s.totalPlayListItems = _s.playlist_ar.length;
			_s.totalSearchedItems = totalItems;
			if(_s.nrOfVisiblePlaylistItems > _s.totalPlayListItems){
				_s.visibleNrOfItems = _s.totalPlayListItems;
			}
			
			_s.sH = (_s.visibleNrOfItems * _s.itemHeight) + _s.separator_do.h;
			
			if(_s.searchBar_do) _s.sH += _s.separator_do.h + _s.searchBarHeight;
			
			_s.itemsTotalHeight = (_s.totalPlayListItems * _s.itemHeight);
			if(_s.searchBar_do){
				if(_s.searchBarPosition == 'top'){
					_s.mainHolder_do.setY(-_s.sH  - _s.searchBarHeight - 3);
					_s.searchBar_do.setY(-_s.searchBar_do.h * 2 - _s.searchSeparator_do.h - 3);
				}else{
					_s.mainHolder_do.setY(-_s.sH  - _s.searchBarHeight);
				}
				
			}else{
				_s.mainHolder_do.setY(-_s.sH);
			}

			_s.itemsHolder_do.setY(0);
			_s.countID3 == 2001;
			
			
			if(_s.showSearchBar_bl) _s.enableSearchBar();
			_s.createPlayList();
			if(_s.sortNButton_do){
				_s.disableSortNButton();
				_s.ascDscButton_do.setButtonState(1);
			}

			if(!_s.sortAscending_bl){
				if(_s.sortNButton_do){
					_s.disableSortNButton();
					_s.ascDscButton_do.setButtonState(0);
					_s.sortList();
				}
			}
			 _s.loadId3();
			var totalItems = _s.items_ar.length;
			clearTimeout(_s.updateMobileScrollbarOnPlaylistLoadId_to);
			_s.updateMobileScrollbarOnPlaylistLoadId_to = setTimeout(_s.updateScrollBarHandlerAndContent, 900);
			
			clearTimeout(_s.showAnimationIntroId_to);
			
			_s.showAnimationIntroId_to = setTimeout(function(){
				var item;
				for(var i=0; i<totalItems; i++){
					item = _s.items_ar[i];
					item.setTextSizes();
				};
				_s.isListCreated_bl = true;
				if(_s.visibleNrOfItems >= _s.totalPlayListItems){
					_s.allowToScrollAndScrollBarIsActive_bl = false;
				}else{
					_s.allowToScrollAndScrollBarIsActive_bl = true;
				}
				
				if(_s.scrHandler_do) _s.updateScrollBarSizeActiveAndDeactivate();
				
				_s.positionList();
				prt.resizeHandler();
				
				if(_s.animateOnIntro_bl){
					if(_s.isShowed_bl) _s.show(true, true);
				}else{
					if(_s.isShowed_bl) _s.show(false, true);
				}
				if(!_s.isShowed_bl) _s.hide(false, true);
				_s.allowToTweenPlaylistItems_bl = true;
			},showDelay);

			if(_s._d.useVectorIcons){
				setTimeout(_s.positionList, 500);
			}
		};
		

		//######################################//
		/* Destroy current playlist */
		//######################################//
		_s.destroyPlaylist = function(){
			if(!_s.isListCreated_bl) return;
		
			var item;
			var totalItems = _s.items_ar.length;
			_s.isListCreated_bl = false;
			_s.allowToTweenPlaylistItems_bl = false;
			clearTimeout(_s.showAnimationIntroId_to);
			clearTimeout(_s.resetItemsAddOrderId_to);
			for(var i=0; i<totalItems; i++){
				item = _s.items_ar[i];
				_s.itemsHolder_do.removeChild(item);
				item.destroy();
				item = null;
			};
			_s.items_ar = null;
			_s.sH = 0;

			if(_s.comboBox_do){
				FWDAnimation.killTweensOf(_s.comboBox_do);
				_s.comboBox_do.setY(-_s.comboBox_do.h);
			}

			FWDAnimation.killTweensOf(_s.mainHolder_do);
			FWDAnimation.killTweensOf(prt.main_do);
			FWDAnimation.killTweensOf(prt.stageContainer);
			_s.separator_do.setY(-_s.separator_do.h - 1);
			_s.mainHolder_do.setY(-_s.h - 1);

			if(_s.searchBar_do){
				if(_s.searchBarPosition == 'top'){
					_s.mainHolder_do.setY(-_s.sH  - _s.searchBarHeight - 3);
					_s.searchBar_do.setY(-_s.searchBar_do.h * 2 - _s.searchSeparator_do.h - 3);
				}else{
					_s.mainHolder_do.setY(-_s.sH  - _s.searchBarHeight);
				}
				
			}else{
				_s.mainHolder_do.setY(-_s.sH);
			}

			prt.main_do.setHeight(prt.controller_do.h - 1);
		
			prt.stageContainer.style.overflow = 'hidden'
			prt.stageContainer.style.height = (prt.controller_do.h - 1) + "px";
		};
		

		//#######################################//
		/* Create playlist */
		//#######################################//
		_s.createPlayList = function(){
			var item;
			var duration;
			var playlistItemProgress_img;
		
			_s.itemsHolder_do.setHeight(_s.totalPlayListItems * _s.itemHeight);
			
			_s.items_ar = [];
			
			for(var i=0; i<_s.totalPlayListItems; i++){
				duration = _s.playlist_ar[i].duration == undefined ? undefined : FWDRAPUtils.formatTotalTime(_s.playlist_ar[i].duration);
				
				var showDownloadButton_bl = _s.playlist_ar[i].downloadable;
				if(!_s.showPlaylistItemDownloadButton_bl) showDownloadButton_bl = false;
				
				var showBuyButton_bl = Boolean(_s.playlist_ar[i].buy);
				if(!_s.showPlaylistItemBuyButton_bl) showBuyButton_bl = false;
			
				FWDRAPPlaylistItem.setPrototype();
				item = new FWDRAPPlaylistItem(
					_s.playlist_ar[i].title,
					_s.playlist_ar[i].titleText,
					_s.playlistDownloadButtonN_img,
					_d.playlistDownloadButtonS_str,
					_s.playlistBuyButtonN_img,
					_d.playlistBuyButtonS_str,
					_d.playlistItemGrad1Path,
					_d.playlistItemGrad2Path,
					_d.playlistItemProgress1_img,
					_d.playlistItemProgress2_img,
					_d.playlistPlayButtonN_img,
					_d.playlistItemBk1_img.src,
					_d.playlistItemBk2_img.src,
					_s.playlistPlayButtonN_str,
					_s.playlistPlayButtonS_str,
					_s.playlistPauseButtonN_str,
					_s.playlistPauseButtonS_str,
					_d.trackTitleNormalColor_str,
					_d.trackTitleSelected_str,
					_d.trackDurationColor_str,
					i,
					_d.playPauseButtonOffsetLeftAndRight,
					_s.trackTitleOffsetLeft,
					_s.durationOffsetRight,
					_s.downloadButtonOffsetRight,
					_s.showPlaylistItemPlayButton_bl,
					showDownloadButton_bl,
					showBuyButton_bl,
					duration,
					_s.useHEX,
					_s.nBC,
					_s.n2BC,
					_s.sBC,
					_s
				);	
				
				item.addListener(FWDRAPPlaylistItem.MOUSE_UP, _s.itemOnUpHandler);
				item.addListener(FWDRAPPlaylistItem.DOWNLOAD, _s.downloadHandler);
				item.addListener(FWDRAPPlaylistItem.BUY, _s.buyHandler);
				
				_s.items_ar[i] = item;
				_s.itemsHolder_do.addChild(item);
			};
		};
		
		_s.addTrack = function(source, title, thumbPath, duration, addAtTheBegginngOfPlaylist, download, buy){
			
			_s.isSortedNumerical_bl = true;
			_s.sortAscending_bl = true;
			_s.ascDscButton_do.setButtonState(1);
			_s.disableSortNButton();
			
			_s.sortList();
			
			var title;
			var titleText;
			var count = 0;
			var id;
			var count;
			
			_s.addAtThePlaylistEnd_bl = false;
			_s.addAtThePlaylistBeggingin_bl = false;
			
			if(addAtTheBegginngOfPlaylist){
				_s.addAtThePlaylistBeggingin_bl = true;
				id = 0;
			}else{
				_s.addAtThePlaylistEnd_bl = true;
				id = _s.totalPlayListItems + 1;
			}
			
			clearTimeout(_s.resetItemsAddOrderId_to);
			_s.resetItemsAddOrderId_to = setTimeout(function(){
				_s.addAtThePlaylistEnd_bl = false;
				_s.addAtThePlaylistBeggingin_bl = false;
			}, 100);
				
			var showBuyButton_bl = Boolean(buy);
			if(!_s.showPlaylistItemBuyButton_bl) showBuyButton_bl = false;
			
			if(_d.showTracksNumbers_bl){
				if(id<9) count = "0"  + (id + 1);
				title = count + ". " + title;
			}else{
				title = title;
			}
			
			titleText = title;

			FWDRAPPlaylistItem.setPrototype();
			var item = new FWDRAPPlaylistItem(
				title,
				titleText,
				_s.playlistDownloadButtonN_img,
				_d.playlistDownloadButtonS_str,
				_s.playlistBuyButtonN_img,
				_d.playlistBuyButtonS_str,
				_d.playlistItemGrad1Path,
				_d.playlistItemGrad2Path,
				_d.playlistItemProgress1_img,
				_d.playlistItemProgress2_img,
				_d.playlistPlayButtonN_img,
				_d.playlistItemBk1_img.src,
				_d.playlistItemBk2_img.src,
				_s.playlistPlayButtonN_str,
				_s.playlistPlayButtonS_str,
				_s.playlistPauseButtonN_str,
				_s.playlistPauseButtonS_str,
				_d.trackTitleNormalColor_str,
				_d.trackTitleSelected_str,
				_d.trackDurationColor_str,
				id,
				_d.playPauseButtonOffsetLeftAndRight,
				_s.trackTitleOffsetLeft,
				_s.durationOffsetRight,
				_s.downloadButtonOffsetRight,
				_s.showPlaylistItemPlayButton_bl,
				download,
				showBuyButton_bl,
				duration,
				_s.useHEX,
				_s.nBC,
				_s.n2BC,
				_s.sBC,
				_s
			);
			
			var obj = {};
			obj.title = title;
			obj.titleText = title;
			obj.source = source;
			obj.duration = duration;
			obj.thumbPath = thumbPath;
			obj.downloadable = download;
			obj.buy = buy;
			if(showBuyButton_bl) obj.buy = buy;
			
			_s.playlist_ar.splice(id, 0, obj);
			_s.totalPlayListItems = _s.playlist_ar.length;
			_s.items_ar.splice(id, 0, item);
			_s.itemsHolder_do.addChild(item);
			prt.totalAudio = _s.totalPlayListItems;
			
			for(var i=0; i<_s.totalPlayListItems; i++){
				var changedItem = _s.items_ar[i];
				changedItem.id = changedItem.sortId = i;
				var title = _s.playlist_ar[i].title;
				title = title.substr(title.indexOf(".") + 1);
				
				if(_d.showTracksNumbers_bl){
					if(i<9){
						count = "0"  + (i + 1);
					}else{
						count = i + 1;
					}
					title = count + ". " + title;
				}else{
					title = title;
				}
				
				changedItem.title_str =  title;
				changedItem.updateTitle();
				changedItem.setTextSizes(true);
			}
			
		
			setTimeout(function(){
				if(!item) return;
				item.setTextSizes(true);
				
				if(_s.allowToScrollAndScrollBarIsActive_bl && _s.scrMainHolder_do){
					item.resize(_s.sW - _s.scrollbarOffestWidth, _s.itemHeight);
				}else{
					item.resize(_s.sW, _s.itemHeight);
				}
				FWDAnimation.to(item, .1, {alpha:1, ease:Expo.easeOut, overwrite:false});
				FWDAnimation.to(item, .1, {alpha:.5, delay:.1, ease:Expo.easeOut, overwrite:false});
				FWDAnimation.to(item, .1, {alpha:1, delay:.2, ease:Expo.easeOut, overwrite:false});
				FWDAnimation.to(item, .1, {alpha:.5, delay:.3, ease:Expo.easeOut, overwrite:false});
				FWDAnimation.to(item, .1, {alpha:1, delay:.4, ease:Expo.easeOut,overwrite:false});
			}, 50);
			
			item.addListener(FWDRAPPlaylistItem.MOUSE_UP, _s.itemOnUpHandler);
			item.addListener(FWDRAPPlaylistItem.DOWNLOAD, _s.downloadHandler);
			item.addListener(FWDRAPPlaylistItem.BUY, _s.buyHandler);
			
			_s.positionList();
			_s.updateScrollBarHandlerAndContent(true, true);
			item.setAlpha(0);
		};
		
		
		_s.itemOnUpHandler = function(e){
			_s.dispatchEvent(FWDRAPPlaylistItem.MOUSE_UP, {id:e.id});
		};
		
		_s.downloadHandler = function(e){
			_s.dispatchEvent(FWDRAPPlaylistItem.DOWNLOAD, {id:e.id});
		};
		
		_s.buyHandler = function(e){
			_s.dispatchEvent(FWDRAPPlaylistItem.BUY, {id:e.id});
		};
		

		//###############################//
		/* load id3 metadata */
		//###############################//
		_s.loadId3 = function(){
			if(!_d.useID3ForFolderPlaylist) return;
			var item;
			clearTimeout(_s.populateNextItemId_to);
			for(var i=0; i<_s.totalPlayListItems; i++){
				if(_s.playlist_ar[i].title != "..."){
					 _s.countID3 = 2001;
					return;
				}
			}
			if(_s.showSearchBar_bl) _s.disableSearchBar();
			_s.countID3 = 0;
			_s.loadID3AndPopulate();
		};
		
		_s.loadID3AndPopulate = function(){
			
			if(!_s.playlist_ar[_s.countID3]){
				if(_s.showSearchBar_bl) _s.enableSearchBar();
				return;
			}
			var count = "";
			var item = _s.items_ar[_s.countID3];
			var source = _s.playlist_ar[_s.countID3].source;
			var url = source + "?rand=" + parseInt(Math.random() * 99999999);
			var obj = _s.playlist_ar[_s.countID3];
			
			var jsmediatags = window.jsmediatags;

			// From remote host
			jsmediatags.read(url, {
			  onSuccess: function(tag) {
			  
			    if(_s.countID3 > _s.playlist_ar.length ||  _s.countID3 == 2001){
					clearTimeout(_s.populateNextItemId_to);
					return;
				}
					
				var tags = tag.tags;
				
				if(tags.artist){
					obj.titleText_str = tags.artist + " - " +  tags.title;
					obj.titleText = obj.titleText_str;
					item.titleText_str = obj.titleText;
					if(_d.showTracksNumbers_bl){
						if(_s.countTrack < 9) count = "0";
						count = count + (_s.countTrack + 1) + ". ";
						obj.title = count + obj.titleText_str;
					}else{
						obj.title = obj.titleText_str;
					}
					_s.countTrack ++;
				}else{
					obj.title = decodeURIComponent(source.substr(source.lastIndexOf("/") + 1));
				}
				
				item.title_str = '<span class="fwdrap-title">' + obj.title + "</span>";
				
				_s.playlist_ar[_s.countID3].titleText = obj.title;
			
				if(_s.countID3 == _s.id) _s.dispatchEvent(FWDRAPPlaylist.UPDATE_TRACK_TITLE_if_FOLDER, {title:item.title_str});
				
				item.updateTitle();
				setTimeout(function(){
					if(!item) return;
					item.setTextSizes(true);
					
					if(_s.allowToScrollAndScrollBarIsActive_bl && _s.scrMainHolder_do){
						item.resize(_s.sW - _s.scrollbarOffestWidth, _s.itemHeight);
					}else{
						item.resize(_s.sW, _s.itemHeight);
					}
				}, 50);
				
				
			    _s.countID3 ++;
			 
			    _s.populateNextItemId_to = setTimeout(_s.loadID3AndPopulate, 50);

			  },
			  onError: function(error) {
			    console.log(error);
			  }
			});
		};
		
		//##############################//
		/* activate items */
		//##############################//
		_s.activateItems = function(id, itemClicked){
			var item;
			_s.id = id;
			
			if(!_s.items_ar) return;

			for(var i=0; i<_s.totalPlayListItems; i++){
				item = _s.items_ar[i];
				if(item.id == _s.id){
					_s.sortId = item.sortId;
					break;
				}			
			}
		
			_s.curItem_do = _s.items_ar[_s.sortId];
			_s.id = _s.curItem_do.id;
			
			for(var i=0; i<_s.totalPlayListItems; i++){
				item = _s.items_ar[i];
				if(i == _s.sortId){
					item.setActive();
				}else{
					item.setInActive();
				}
			}
			
			_s.updateScrollBarHandlerAndContent(true)
		};

		
		//#############################//
		/* set cur item play/pause */
		//#############################//
		_s.setCurItemPlayState = function(){
			if(!_s.curItem_do) return;
			_s.curItem_do.showPlayButton();
		};
		
		_s.setCurItemPauseState = function(){
			if(!_s.curItem_do) return;
			_s.curItem_do.showPauseButton();
		};
		
		_s.updateCurItemProgress = function(percent){
			if(!_s.curItem_do) return;
			_s.curItem_do.updateProgressPercent(percent);
		};
		

		//################################################//
		/* Setup buttons */
		//################################################//
		_s.setupButtons = function(){
			_s.searchBarButtons_ar = [];
			
			var sClr = _d.nBC
			if(_s.nBC ==  _s.n2BC) sClr = _s.sBC;

			FWDRAPSimpleButton.setPrototype();
			if(_d.useVectorIcons){
				_s.sortNButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='fwdrap-icon fwdrap-icon-sort-numbers'></span>",
						"fwdrap-main-button-normal-state",
						"fwdrap-main-button-selected-state"
				);
			}else{
				_s.sortNButton_do = new FWDRAPSimpleButton(_d.sortNN_img, _d.sortNSPath_str, null, true,
						_d.useHEX,
						_d.n2BC,
						sClr);
			}
			_s.searchBarButtons_ar.push(_s.sortNButton_do);
			_s.sortNButton_do.addListener(FWDRAPSimpleButton.SHOW_TOOLTIP, _s.sortNButtonShowTooltipHandler);
			_s.sortNButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.sortNButtonOnMouseUpHandler);
			_s.searchBar_do.addChild(_s.sortNButton_do);
			_s.sortNButton_do.setX(410);
			
			FWDRAPSimpleButton.setPrototype();
			if(_d.useVectorIcons){
				_s.sortAButton_do = new FWDRAPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<span class='fwdrap-icon fwdrap-icon-sort-letters'></span>",
						"fwdrap-main-button-normal-state",
						"fwdrap-main-button-selected-state"
				);
			}else{
				_s.sortAButton_do = new FWDRAPSimpleButton(_d.sortAN_img, _d.sortASPath_str, null, true,
					_d.useHEX,
					_d.n2BC,
					sClr);
			}
			_s.searchBarButtons_ar.push(_s.sortAButton_do);
			_s.sortAButton_do.addListener(FWDRAPSimpleButton.SHOW_TOOLTIP, _s.sortAButtonShowTooltipHandler);
			_s.sortAButton_do.addListener(FWDRAPSimpleButton.MOUSE_UP, _s.sortAButtonOnMouseUpHandler);
			_s.searchBar_do.addChild(_s.sortAButton_do);
			_s.sortAButton_do.setX(450);
			
			FWDRAPComplexButton.setPrototype();
			if(_d.useVectorIcons){
				_s.ascDscButton_do = new FWDRAPComplexButton(0, 0, 0, 0, true, 0, 0, 0,
					"<span class='fwdrap-icon fwdrap-icon-scroll-down'></span>",
					"<span class='fwdrap-icon fwdrap-icon-scrool-up'></span>",
					"fwdrap-main-button-normal-state",
					"fwdrap-main-button-selected-state"
				);
			}else{
				_s.ascDscButton_do = new FWDRAPComplexButton(
					_d.ascendingN_img,
					_d.ascendingSpath_str,
					_d.decendingN_img,
					_d.decendingSpath_str,
					true,
					_d.useHEX,
					_d.n2BC,
					sClr);
			}

			_s.ascDscButton_do.setX(500);
			_s.searchBarButtons_ar.push(_s.ascDscButton_do);
			_s.ascDscButton_do.addListener(FWDRAPComplexButton.SHOW_TOOLTIP, _s.ascDscShowToolTipHandler);
			_s.ascDscButton_do.addListener(FWDRAPComplexButton.MOUSE_UP, _s.ascDscMouseUpHandler);
			_s.searchBar_do.addChild(_s.ascDscButton_do);
			
			if(_s.isSortedNumerical_bl){
				_s.disableSortNButton();
			}else{
				_s.disableSortAButton();
			}
		};
		
		_s.ascDscShowToolTipHandler = function(e){
			_s.showToolTip(_s.ascDscButton_do, _s.ascDscButtonToolTip_do, e.e);
		};
		
		_s.ascDscMouseUpHandler = function(){
			if(_s.sortAscending_bl){
				_s.ascDscButton_do.setButtonState(0);
				_s.sortAscending_bl = false;
			}else{
				_s.ascDscButton_do.setButtonState(1);
				_s.sortAscending_bl = true;
			}
			_s.sortList();
		};
		
		_s.sortAButtonShowTooltipHandler = function(e){
			_s.showToolTip( _s.sortAButton_do, _s.sortAButtonToolTip_do, e.e);
		};
		
		_s.sortAButtonOnMouseUpHandler = function(){
			_s.disableSortAButton();
			_s.sortList();
		};
		
		_s.sortNButtonShowTooltipHandler = function(e){
			_s.showToolTip(_s.sortNButton_do, _s.sortNButtonToolTip_do, e.e);
		};
		
		_s.sortNButtonOnMouseUpHandler = function(){
			_s.disableSortNButton();
			_s.sortList();
		};
		
		_s.disableSortAButton = function(){
			_s.sortAButton_do.disableForGood();
			_s.sortAButton_do.setSelectedState(true);
			
			_s.sortNButton_do.enableForGood();
			_s.sortNButton_do.setNormalState(true);
			_s.isSortedNumerical_bl =  false;
		};
		
		_s.disableSortNButton = function(){
			_s.sortNButton_do.disableForGood();
			_s.sortNButton_do.setSelectedState(true);
			
			_s.sortAButton_do.enableForGood();
			_s.sortAButton_do.setNormalState(true);
			_s.isSortedNumerical_bl =  true;
		};
		
		_s.sortList = function(){
			if(_s.isSortedNumerical_bl){
				_s.items_ar.sort(function(a,b){
				  if (a.id < b.id)  
				     return -1;
				  if (a.id > b.id)
				    return 1;
				  return 0;
				});
			}else{
				_s.items_ar.sort(function(a,b){
				  if (a.titleText_str < b.titleText_str)  
				     return -1;
				  if (a.titleText_str > b.titleText_str)
				    return 1;
				  return 0;
				});
			}
			
			if(!_s.sortAscending_bl) _s.items_ar.reverse();
			
			for(var i=0; i<_s.items_ar.length; i++){
				_s.items_ar[i].sortId = i;
			};
			
			_s.positionList();
			_s.updateScrollBarHandlerAndContent(false);
		};
		

		//################################################//
		/* setup input */
		//################################################//
		_s.setupInput = function(){
			
			_s.titlebarHeight = _d.titlebarLeftPath_img.height;
			_s.mainSearchInput_do = new FWDRAPDisplayObject("div");
			_s.mainSearchInput_do.screen.className = 'fwdrap-titlebar-background-middle';
			_s.mainSearchInput_do.getStyle().background = "url('" + _d.titlebarBkMiddlePattern_str + "')";
			_s.mainSearchInput_do.setHeight(_s.titlebarHeight);
			
			var titleBarLeft_img = new Image();
			titleBarLeft_img.src = _d.titleBarLeft_img.src;
			_s.titleBarLeft_do = new FWDRAPDisplayObject("img");
			_s.titleBarLeft_do.setScreen(titleBarLeft_img);
			_s.titleBarLeft_do.screen.className = 'fwdrap-titlebar-background-left';
			_s.titleBarLeft_do.setWidth(_d.titleBarLeft_img.width);
			_s.titleBarLeft_do.setHeight(_d.titleBarLeft_img.height);
		
			var titleBarRight_img = new Image();
			titleBarRight_img.src = _d.titleBarRigthPath;
			_s.titleBarRight_do = new FWDRAPDisplayObject("img");
			_s.titleBarRight_do.setScreen(titleBarRight_img);
			_s.titleBarRight_do.screen.className = 'fwdrap-titlebar-right-right';
			_s.titleBarRight_do.setWidth(_d.titleBarLeft_img.width);
			_s.titleBarRight_do.setHeight(_d.titleBarLeft_img.height);	

			_s.input_do = new FWDRAPDisplayObject("input");
			_s.input_do.screen.maxLength = 20;
			_s.input_do.screen.className = 'fwdrap-search-input';
			_s.input_do.getStyle().textAlign = "left";
			_s.input_do.getStyle().outline = "none";
			_s.input_do.getStyle().boxShadow  = "none";
			_s.input_do.getStyle().fontFamily = "Arial";
			_s.input_do.getStyle().fontSize= "12px";
			_s.input_do.getStyle().padding = "6px";
			_s.input_do.getStyle().paddingLeft = "7px";
			if(!FWDRAPUtils.isIEAndLessThen9) _s.input_do.getStyle().paddingRight = "-6px";
			_s.input_do.getStyle().paddingTop = "2px";
			_s.input_do.getStyle().paddingBottom = "3px";
			_s.input_do.getStyle().color = _s.searchInputColor_str;
			_s.input_do.getStyle().webkitBoxShadow=  "0 0 0 1000px transparent inset";
			_s.input_do.screen.value = "search for track";
			
			_s.noSearchFound_do = new FWDRAPDisplayObject("div");
			_s.noSearchFound_do.setX(0);
			_s.noSearchFound_do.getStyle().textAlign = "center";
			_s.noSearchFound_do.getStyle().width = "100%";
			_s.noSearchFound_do.getStyle().fontFamily = "Arial";
			_s.noSearchFound_do.getStyle().fontSize= "12px";
			_s.noSearchFound_do.getStyle().color = _s.searchInputColor_str;
			_s.noSearchFound_do.setInnerHTML("NOTHING FOUND!");
			_s.noSearchFound_do.setVisible(false);
			_s.mainHolder_do.addChild(_s.noSearchFound_do);
			
			_s.input_do.screen.addEventListener("focus", _s.inputFocusInHandler);
			_s.input_do.screen.addEventListener("blur", _s.inputFocusOutHandler);
			_s.input_do.screen.addEventListener("keyup", _s.keyUpHandler);
			
			_s.inputArrow_img = new Image();
			_s.inputArrow_img.src = _d.inputArrowPath_str;	
			
			_s.inputArrow_do = new FWDRAPDisplayObject("img"); 
			_s.inputArrow_do.setScreen(_s.inputArrow_img);
			_s.inputArrow_do.screen.className = 'fwdrap-playlist-search-icon';
			_s.inputArrow_do.setWidth(12);
			_s.inputArrow_do.setHeight(12);

			setTimeout(function(){
				var offsetY = 1;
				_s.input_do.setY(parseInt((_s.titlebarHeight - _s.input_do.getHeight())/2) + _s.inputSearchTextOffsetTop);
			}, 50);
			_s.mainSearchInput_do.addChild(_s.titleBarLeft_do);
			_s.mainSearchInput_do.addChild(_s.titleBarRight_do);
			_s.mainSearchInput_do.addChild(_s.input_do);
			_s.searchBar_do.addChild(_s.mainSearchInput_do);
			_s.searchBar_do.addChild(_s.inputArrow_do);
			
		};
		
		_s.inputFocusInHandler = function(){
			if(_s.hasInputFocus_bl) return;
			_s.hasInputFocus_bl = true;
			
			if(_s.isSearchBarDisabled_bl){
				_s.input_do.screen.value == "Loading ID3's ...";
			}else if(_s.input_do.screen.value == "search for track"){
				_s.input_do.screen.value = "";
			}
		};
		
		_s.inputFocusOutHandler = function(e){
			if(!_s.hasInputFocus_bl) return;
			var vc = FWDRAPUtils.getViewportMouseCoordinates(e);	
			if(!FWDRAPUtils.hitTest(_s.input_do.screen, vc.screenX, vc.screenY)){
				_s.hasInputFocus_bl = false;
				if(_s.input_do.screen.value == ""){
					_s.input_do.screen.value = "search for track";
				}
				return;
			}
		};
		
		_s.keyUpHandler = function(e){
			if(e.stopPropagation) e.stopPropagation();
			if(_s.prevInputValue_str != _s.input_do.screen.value){
				_s.positionList();
			}
			
			_s.prevInputValue_str = _s.input_do.screen.value;
			
			if(_s.scrHandler_do){
				_s.updateScrollBarSizeActiveAndDeactivate();
				_s.updateScrollBarHandlerAndContent(false);
			}
		};
		
		_s.showNothingFound = function(){
			if(_s.isShowNothingFound_bl) return;
			_s.isShowNothingFound_bl = true;
			
			_s.noSearchFound_do.setVisible(true);
			_s.noSearchFound_do.setY(parseInt((_s.sH - _s.noSearchFound_do.getHeight() -  _s.searchBarHeight)/2));
			_s.noSearchFound_do.setAlpha(0);
			FWDAnimation.to(_s.noSearchFound_do, .1, {alpha:1, yoyo:true, repeat:4});
		};
		
		_s.hideNothingFound = function(){
			if(!_s.isShowNothingFound_bl) return;
			_s.isShowNothingFound_bl = false;
			
			FWDAnimation.killTweensOf(_s.noSearchFound_do);
			_s.noSearchFound_do.setVisible(false);
		};

		
		//###########################################//
		/* position Search bar */
		//###########################################//
		_s.positionSearchBar = function(){
			var buttonsW = 0;
			var button;
			
			var inputWidth = _s.sW - (_s.startSpaceBetweenButtons * 2) - _s.inputArrow_do.w - 12;
			if(inputWidth > 430) inputWidth = 430;
			
			if(_s.showSortButtons_bl){
				for(var i=_s.searchBarButtons_ar.length-1; i>=0; i--){
					button = _s.searchBarButtons_ar[i];
					if(i == _s.searchBarButtons_ar.length-1){
						button.setX(_s.sW - button.w - _s.startSpaceBetweenButtons);
					}else{
						button.setX(_s.searchBarButtons_ar[i + 1].x - button.w - _s.spaceBetweenButtons);
					}
					button.setY(_s.searchSeparator_do.h + parseInt((_s.searchBar_do.h - _s.searchSeparator_do.h - button.h)/2));
					buttonsW += button.w + _s.spaceBetweenButtons;
				}
			}
			
			buttonsW += _s.startSpaceBetweenButtons;
		
			inputWidth -= buttonsW + 50;
			inputWidth = Math.max(160, inputWidth);
			
			_s.mainSearchInput_do.setWidth(inputWidth);
			_s.input_do.setWidth(inputWidth);
			
			_s.mainSearchInput_do.setX(_s.startSpaceBetweenButtons + _s.inputSearchOffsetLeft);
			_s.mainSearchInput_do.setY(parseInt(_s.searchSeparator_do.h + parseInt((_s.searchBar_do.h - _s.searchSeparator_do.h - _s.mainSearchInput_do.h)/2)));
			_s.titleBarRight_do.setX(_s.mainSearchInput_do.w - _s.titleBarRight_do.w);
			_s.inputArrow_do.setX(parseInt(_s.mainSearchInput_do.x + inputWidth) - 18);
			_s.inputArrow_do.setY(_s.searchSeparator_do.h + parseInt((_s.searchBar_do.h - _s.searchSeparator_do.h - _s.inputArrow_do.h)/2));
			_s.searchSeparator_do.setWidth(_s.sW);
			_s.searchBar_do.setWidth(_s.sW);
			
			
			if(_s.searchBarPosition != 'top'){
				_s.searchBar_do.setY(_s.sH - _s.searchSeparator_do.h - _s.searchBar_do.h);
			}
		};

		
		//################################//
		/* Setup tooltips */
		//################################//		
		_s.setupToolTips = function(){
			
			FWDRAPToolTip.setPrototype();
			_s.sortNButtonToolTip_do = new FWDRAPToolTip(_s.sortNButton_do, _d.toopTipPointerUp_str, "numeric sort", _s.toolTipsBkClr, _s.toolTipsFntClr, _s.toolTipsDl);
			document.documentElement.appendChild(_s.sortNButtonToolTip_do.screen);
			
			FWDRAPToolTip.setPrototype();
			_s.sortAButtonToolTip_do = new FWDRAPToolTip(_s.sortAButton_do, _d.toopTipPointerUp_str, "alphabetic sort", _s.toolTipsBkClr, _s.toolTipsFntClr, _s.toolTipsDl);
			document.documentElement.appendChild(_s.sortAButtonToolTip_do.screen);
			
			FWDRAPToolTip.setPrototype();
			_s.ascDscButtonToolTip_do = new FWDRAPToolTip(_s.ascDscButton_do, _d.toopTipPointerUp_str, "ascending / decending sort",_s.toolTipsBkClr, _s.toolTipsFntClr, _s.toolTipsDl);
			document.documentElement.appendChild(_s.ascDscButtonToolTip_do.screen);
		};

		
		_s.showToolTip = function(button, toolTip, e){
			if(!_s.showButtonsToolTips_bl) return;
			var ws = FWDRAPUtils.getViewportSize();
			var wc = FWDRAPUtils.getViewportMouseCoordinates(e);
			
			var localX = parseInt(button.getGlobalX() + button.w/2 - toolTip.w/2);
			var localY = parseInt(button.getGlobalY() - toolTip.h - 8);
			var offseX = 0;
		
			if(localX < 0){
				offseX = localX;
				localX = 0;
			}else if(localX + toolTip.w > ws.w){
				offseX = (ws.w - (localX + toolTip.w)) * -1;
				localX = localX + (offseX * -1);
			}
			
			if(localY < 0){
				localY += button.h + toolTip.h + 12;
				toolTip.positionPointer(offseX, true);
			}else{
				toolTip.positionPointer(offseX, false);
			}

			toolTip.setX(localX);
			toolTip.setY(localY);
			toolTip.show();
		};

		
		//###############################//
		/* setup disable */
		//##############################//
		_s.setupDisable = function(){
			_s.disable_do = new FWDRAPDisplayObject("div");
			if(FWDRAPUtils.isIE){
				_s.disable_do.setBkColor("#FFFFFF");
				_s.disable_do.setAlpha(0);
			}
			_s.addChild(_s.disable_do);
		};
		
		_s.showDisable = function(){
			if(!_s.disable_do || _s.disable_do.w != 0) return;
			if(_s.scrMainHolder_do){
				_s.disable_do.setWidth(_s.sW - _s.scrollbarOffestWidth);
				_s.disable_do.setHeight(_s.sH);
			}else{
				_s.disable_do.setWidth(_s.sW);
				_s.disable_do.setHeight(_s.sH);
			}
		};
		
		_s.hideDisable = function(){
			if(!_s.disable_do || _s.disable_do.w == 0) return;
			_s.disable_do.setWidth(0);
			_s.disable_do.setHeight(0);
		};

		
		//###############################//
		/* setup separator */
		//###############################//
		_s.setupSeparator = function(){
			_s.separator_do = new FWDRAPDisplayObject("div");
			_s.separator_do.setBackfaceVisibility();
			_s.separator_do.hasTransform3d_bl = false;
			_s.separator_do.hasTransform2d_bl = false;
			_s.separator_do.screen.className = 'fwdrap-controler-separator';
			_s.separator_do.getStyle().background = "url('" + _s.playlistSeparator_img.src + "')";
			_s.separator_do.setHeight(_s.playlistSeparator_img.height);
			_s.separator_do.setY(-_s.separator_do.h);
		};
		
		
		//#################################//
		/* setup mouse scrollbar */
		//#################################//
		_s.setupScrollbar = function(){
			_s.scrMainHolder_do = new FWDRAPDisplayObject("div");
			_s.scrMainHolder_do.setWidth(_s.scrWidth);
			
			//track
			_s.scrTrack_do = new FWDRAPDisplayObject("div");
			_s.scrTrack_do.setWidth(_s.scrWidth);

			_s.scrTrackTop_do = new FWDRAPDisplayObject("img");
			_s.scrTrackTop_do.setScreen(_s.playlistScrBkTop_img);
			_s.scrTrackTop_do.screen.className = 'fwdrap-scrollbar-top-background';

			_s.scrTrackMiddle_do = new FWDRAPDisplayObject("div");
			_s.scrTrackMiddle_do.screen.className = 'fwdrap-scrollbar-middle-background';
			_s.scrTrackMiddle_do.getStyle().background = "url('" + _d.scrBkMiddlePath_str + "')";
			_s.scrTrackMiddle_do.setWidth(_s.scrWidth);
			_s.scrTrackMiddle_do.setY(_s.scrTrackTop_do.h);
			var scrTrackBottomImage_img = new Image();
			scrTrackBottomImage_img.src = _d.scrBkBottomPath_str;

			_s.scrTrackBottom_do = new FWDRAPDisplayObject("img");
			_s.scrTrackBottom_do.setScreen(scrTrackBottomImage_img);
			_s.scrTrackBottom_do.screen.className = 'fwdrap-scrollbar-bottom-background';
			_s.scrTrackBottom_do.setWidth(_s.scrTrackTop_do.w);
			_s.scrTrackBottom_do.setHeight(_s.scrTrackTop_do.h);
			
			//handler
			_s.scrHandler_do = new FWDRAPDisplayObject("div");
			_s.scrHandler_do.setWidth(_s.scrWidth);
	
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
			_s.middleImage.src = _d.scrDragMiddlePath_str;
			if(_s.useHEX){
				_s.middleImage.onload = function(){
					_s.scrubberDragMiddle_canvas = FWDRAPUtils.getCanvasWithModifiedColor(_s.middleImage, _s.nBC, true);
					_s.scrubberDragImage_img = _s.scrubberDragMiddle_canvas.image;
					_s.scrHandlerMiddle_do.getStyle().background = "url('" + _s.scrubberDragImage_img.src + "') repeat-y";
				}
			}else{
				_s.scrHandlerMiddle_do.getStyle().background = "url('" + _d.scrDragMiddlePath_str + "')";
			}
			_s.scrHandlerMiddle_do.setWidth(_s.scrWidth);
			_s.scrHandlerMiddle_do.setY(_s.scrHandlerTop_do.h);
			
			_s.scrHandlerBottom_do = new FWDRAPDisplayObject("div");
			_s.scrHandlerBottom_img = new Image();
			_s.scrHandlerBottom_img.src = _d.scrDragBottomPath_str;
			if(_s.useHEX){
				_s.scrHandlerBottom_img.onload = function(){
					_s.scrubberDragBottom_canvas = FWDRAPUtils.getCanvasWithModifiedColor(_s.scrHandlerBottom_img, _s.nBC, true);
					_s.scrubberDragBottomImage_img = _s.scrubberDragBottom_canvas.image;
					_s.scrHandlerBottom_do.getStyle().background = "url('" + _s.scrubberDragBottomImage_img.src + "') repeat-y";
					
				}
			}else{
				_s.scrHandlerBottom_do.getStyle().background = "url('" + _d.scrDragBottomPath_str + "')";
			}
			_s.scrHandlerBottom_do.setWidth(_s.scrWidth);
		
			_s.scrHandlerBottom_do.setWidth(_s.scrHandlerTop_do.w);
			_s.scrHandlerBottom_do.setHeight(_s.scrHandlerTop_do.h);
			_s.scrHandler_do.setButtonMode(true);
			
			_s.scrHandlerLinesN_do = new FWDRAPDisplayObject("img");
			_s.scrHandlerLinesN_do.setScreen(_s.playlistScrLines_img);
			_s.scrHandlerLinesN_do.screen.className = 'fwdrap-handler-lines-1';

			_s.scrHandlerLinesS_img = new Image();
			_s.scrHandlerLinesS_img.src = _d.scrLinesSPath_str;
			
			_s.scrHandlerLinesS_do = new FWDRAPDisplayObject("img");
			_s.scrHandlerLinesS_do.setScreen(_s.scrHandlerLinesS_img);
			_s.scrHandlerLinesS_do.screen.className = 'fwdrap-handler-lines-2';
			_s.scrHandlerLinesS_do.setWidth(_s.scrHandlerLinesN_do.w);
			_s.scrHandlerLinesS_do.setHeight(_s.scrHandlerLinesN_do.h);
			
			_s.scrHandlerLinesS_do.setAlpha(0);
			
			_s.scrHandlerLines_do = new FWDRAPDisplayObject("div");
			_s.scrHandlerLines_do.hasTransform3d_bl = false;
			_s.scrHandlerLines_do.hasTransform2d_bl = false;
			_s.scrHandlerLines_do.setBackfaceVisibility();
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
			_s.mainHolder_do.addChild(_s.scrMainHolder_do);
			
			_s.scrHandler_do.screen.addEventListener("mouseover", _s.scrollBarHandlerOnMouseOver);
			_s.scrHandler_do.screen.addEventListener("mouseout", _s.scrollBarHandlerOnMouseOut);
			_s.scrHandler_do.screen.addEventListener("mousedown", _s.scrollBarHandlerOnMouseDown);
			_s.scrHandlerLines_do.screen.addEventListener("mouseover", _s.scrollBarHandlerOnMouseOver);
			_s.scrHandlerLines_do.screen.addEventListener("mouseout", _s.scrollBarHandlerOnMouseOut);
			_s.scrHandlerLines_do.screen.addEventListener("mousedown", _s.scrollBarHandlerOnMouseDown);
			
		};
		
		_s.scrollBarHandlerOnMouseOver = function(e){
			FWDAnimation.to(_s.scrHandlerLinesS_do, .8, {alpha:1, ease:Expo.easeOut});
			FWDAnimation.to(_s.scrHandlerLinesN_do, .8, {alpha:0, ease:Expo.easeOut});
		};
		
		_s.scrollBarHandlerOnMouseOut = function(e){
			if(_s.isDragging_bl) return;
			FWDAnimation.to(_s.scrHandlerLinesS_do, .8, {alpha:0, ease:Expo.easeOut});
			FWDAnimation.to(_s.scrHandlerLinesN_do, .8, {alpha:1, ease:Expo.easeOut});
		};
		
		_s.scrollBarHandlerOnMouseDown = function(e){
			if(!_s.allowToScrollAndScrollBarIsActive_bl) return;
			var viewportMouseCoordinates = FWDRAPUtils.getViewportMouseCoordinates(e);		
			_s.isDragging_bl = true;
			
			_s.yPositionOnPress = _s.scrHandler_do.y;
			_s.lastPresedY = viewportMouseCoordinates.screenY;
			FWDAnimation.killTweensOf(_s.scrHandler_do);
			_s.showDisable();
			
			if(window.addEventListener){
				window.addEventListener("mousemove", _s.scrollBarHandlerMoveHandler);
				window.addEventListener("mouseup", _s.scrollBarHandlerEndHandler);	
			}else if(document.attachEvent){
				document.attachEvent("onmousemove", _s.scrollBarHandlerMoveHandler);
				document.attachEvent("onmouseup", _s.scrollBarHandlerEndHandler);
			}
			_s.prevSortId = -1;
		};
		
		_s.scrollBarHandlerMoveHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			var viewportMouseCoordinates = FWDRAPUtils.getViewportMouseCoordinates(e);	
	
			_s.scrollBarHandlerFinalY = Math.round(_s.yPositionOnPress + viewportMouseCoordinates.screenY - _s.lastPresedY);
			if(_s.scrollBarHandlerFinalY >= _s.scrTrack_do.h - _s.scrHandler_do.h - 1){
				_s.scrollBarHandlerFinalY = _s.scrTrack_do.h -  _s.scrHandler_do.h - 1;
			}else if(_s.scrollBarHandlerFinalY <= 0){
				_s.scrollBarHandlerFinalY = 0;
			}
			
			_s.scrHandler_do.setY(_s.scrollBarHandlerFinalY);
			FWDAnimation.to(_s.scrHandlerLines_do, .8, {y:_s.scrollBarHandlerFinalY + parseInt((_s.scrHandler_do.h - _s.scrHandlerLines_do.h)/2), ease:Quart.easeOut});
			_s.updateScrollBarHandlerAndContent(true, true);
		};
		
		_s.scrollBarHandlerEndHandler = function(e){
			var viewportMouseCoordinates = FWDRAPUtils.getViewportMouseCoordinates(e);	
			_s.isDragging_bl = false;
			
			if(!FWDRAPUtils.hitTest(_s.scrHandler_do.screen, viewportMouseCoordinates.screenX, viewportMouseCoordinates.screenY)){
				FWDAnimation.to(_s.scrHandlerLinesS_do, .8, {alpha:0, ease:Expo.easeOut});
				FWDAnimation.to(_s.scrHandlerLinesN_do, .8, {alpha:1, ease:Expo.easeOut});
			}
			
			_s.scrollBarHandlerFinalY = parseInt((_s.scrTrack_do.h - _s.scrHandler_do.h) * (_s.playListFinalY/((_s.totalSearchedItems - _s.nrOfVisiblePlaylistItems) * _s.itemHeight))) * -1;
			
			if(_s.scrollBarHandlerFinalY.y < 0){
				_s.scrollBarHandlerFinalY = 0;
			}else if(_s.scrollBarHandlerFinalY > _s.scrTrack_do.h - _s.scrHandler_do.h - 1){
				_s.scrollBarHandlerFinalY = _s.scrTrack_do.h - _s.scrHandler_do.h - 1;
			}
			
			_s.hideDisable();
			FWDAnimation.killTweensOf(_s.scrHandler_do);
			FWDAnimation.to(_s.scrHandler_do, .5, {y:_s.scrollBarHandlerFinalY, ease:Quart.easeOut});
			
			if(window.removeEventListener){
				window.removeEventListener("mousemove", _s.scrollBarHandlerMoveHandler);
				window.removeEventListener("mouseup", _s.scrollBarHandlerEndHandler);	
			}else if(document.detachEvent){
				document.detachEvent("onmousemove", _s.scrollBarHandlerMoveHandler);
				document.detachEvent("onmouseup", _s.scrollBarHandlerEndHandler);
			}
		};
		
		_s.updateScrollBarSizeActiveAndDeactivate = function(){
			
			if(_s.allowToScrollAndScrollBarIsActive_bl){
				var offsetH = 0;
				_s.allowToScrollAndScrollBarIsActive_bl = true;
				
				if(_s.searchBar_do){
					offsetH = _s.searchBar_do.h;
				}
				
				_s.scrMainHolder_do.setHeight(_s.sH - _s.separator_do.h - offsetH);
				_s.scrTrack_do.setHeight(_s.sH - _s.separator_do.h - offsetH);
				_s.scrTrackMiddle_do.setHeight(_s.scrTrack_do.h - (_s.scrTrackTop_do.h * 2));
				_s.scrTrackBottom_do.setY(_s.scrTrackMiddle_do.y + _s.scrTrackMiddle_do.h);
				
				_s.scrHandler_do.setHeight(Math.min((_s.sH - _s.separator_do.h - offsetH) , Math.round(((_s.sH - _s.separator_do.h - offsetH)/_s.itemsTotalHeight) * _s.sH)));
				_s.scrHandlerMiddle_do.setHeight(_s.scrHandler_do.h - (_s.scrHandlerTop_do.h * 2));
				_s.scrHandlerTop_do.setY(_s.scrHandlerMiddle_do.y + _s.scrHandlerMiddle_do.h);
				_s.scrHandlerLines_do.setY(_s.scrollBarHandlerFinalY + parseInt((_s.scrHandler_do.h - _s.scrHandlerLines_do.h)/2));
				_s.scrMainHolder_do.setX(_s.sW -  _s.scrWidth);
				_s.updateScrollBarHandlerAndContent();
			}else{
				_s.allowToScrollAndScrollBarIsActive_bl = false;
				_s.scrMainHolder_do.setX(-500);
				_s.scrHandler_do.setY(0);
			}
		};
		
		_s.updateScrollBarHandlerAndContent = function(animate, overwrite){
			if((!_s.curItem_do || !_s.allowToScrollAndScrollBarIsActive_bl) && !overwrite) return;
			if(_s.curItem_do) _s.sortId = _s.curItem_do.sortId;	
			if(_s.prevSortId == _s.sortId && !overwrite) return;
			
			var percentScrolled = 0;
			var leftId = 0;
			
			if(_s.addAtThePlaylistEnd_bl){
				_s.sortId = _s.totalPlayListItems - 1;
			}else if(_s.addAtThePlaylistBeggingin_bl){
				_s.sortId = 0;
			}
			_s.prevSortId = _s.sortId;
			
			if(_s.isDragging_bl && !_s.isMbl){
				percentScrolled = (_s.scrHandler_do.y/(_s.scrMainHolder_do.h - _s.scrHandler_do.h));
				if(percentScrolled == "Infinity"){
					percentScrolled = 0;
				}else if(percentScrolled >= 1){
					scrollPercent = 1;
				}
				_s.playListFinalY = Math.round(percentScrolled * (_s.totalSearchedItems - _s.nrOfVisiblePlaylistItems)) * _s.itemHeight * - 1;
			}else{
				if(_s.totalSearchedItems != _s.totalPlayListItems){
					leftId = 0;
				}else{
					leftId = parseInt(_s.sortId/_s.nrOfVisiblePlaylistItems) * _s.nrOfVisiblePlaylistItems;
				}
				
				if(leftId + _s.nrOfVisiblePlaylistItems >= _s.totalPlayListItems){
					leftId = _s.totalPlayListItems - _s.nrOfVisiblePlaylistItems;
				}
				
				if(leftId < 0) leftId = 0;
				
				_s.playListFinalY = parseInt(leftId * _s.itemHeight * -1);
				if(isNaN(_s.playListFinalY)) _s.playListFinalY = 0;
				
				if(_s.scrMainHolder_do){
					_s.scrollBarHandlerFinalY = Math.round((_s.scrMainHolder_do.h - _s.scrHandler_do.h) * (_s.playListFinalY/((_s.totalSearchedItems - _s.nrOfVisiblePlaylistItems) * _s.itemHeight))) * -1;
					if(_s.scrollBarHandlerFinalY < 0){
						_s.scrollBarHandlerFinalY = 0;
					}else if(_s.scrollBarHandlerFinalY > _s.scrMainHolder_do.h - _s.scrHandler_do.h - 1){
						_s.scrollBarHandlerFinalY = _s.scrMainHolder_do.h - _s.scrHandler_do.h - 1;
					}
					
					FWDAnimation.killTweensOf(_s.scrHandler_do);
					FWDAnimation.killTweensOf(_s.scrHandlerLines_do);
					if(animate){
						FWDAnimation.to(_s.scrHandler_do, .5, {y:_s.scrollBarHandlerFinalY, ease:Quart.easeOut});
						FWDAnimation.to(_s.scrHandlerLines_do, .8, {y:_s.scrollBarHandlerFinalY + parseInt((_s.scrHandler_do.h - _s.scrHandlerLinesN_do.h)/2), ease:Quart.easeOut});
					}else{
						_s.scrHandler_do.setY(_s.scrollBarHandlerFinalY);
						_s.scrHandlerLines_do.setY(_s.scrollBarHandlerFinalY + parseInt((_s.scrHandler_do.h - _s.scrHandlerLinesN_do.h)/2));
					}
				}
			}
		
			if(_s.prevPlaylistY == _s.playListFinalY && !overwrite) return;
			_s.prevPlaylistY = _s.playListFinalY;
			
			if(isNaN(_s.playListFinalY)) return;

			if(_s.lastListY != _s.playListFinalY){
				FWDAnimation.killTweensOf(_s.itemsHolder_do);
				if(animate){
					FWDAnimation.to(_s.itemsHolder_do, .5, {y:_s.playListFinalY, ease:Quart.easeOut});
				}else{
					_s.itemsHolder_do.setY(_s.playListFinalY);
				}
			}
			_s.lastListY = _s.playListFinalY;
		};

		
		//###############################################//
		/* Add mouse wheel support */
		//##############################################//
		_s.addMouseWheelSupport = function(){
			if(window.addEventListener){
				_s.screen.addEventListener ("mousewheel", _s.mouseWheelHandler);
				_s.screen.addEventListener('DOMMouseScroll', _s.mouseWheelHandler);
			}else if(document.attachEvent){
				_s.screen.attachEvent ("onmousewheel", _s.mouseWheelHandler);
			}
		};
		
		_s.mouseWheelHandler = function(e){
			if(!_s.allowToScrollAndScrollBarIsActive_bl || _s.isDragging_bl) return;
			if(_s.comboBox_do && _s.comboBox_do.isShowed_bl) return;
			
			var dir = e.detail || e.wheelDelta;	
			if(e.wheelDelta) dir *= -1;
			if(FWDRAPUtils.isOpera) dir *= -1;
		
			if(dir > 0){
				_s.playListFinalY -= _s.itemHeight;
			}else{
				_s.playListFinalY += _s.itemHeight;
			}
			
			var leftId = parseInt(_s.playListFinalY/_s.itemHeight);
			
			if(leftId >= 0){
				leftId = 0;
			}else if(Math.abs(leftId) + _s.nrOfVisiblePlaylistItems >= _s.totalSearchedItems){
				leftId = (_s.totalSearchedItems - _s.nrOfVisiblePlaylistItems) * -1;
			}
			
			_s.prevSortId = -1;
			_s.prevPlaylistY = -100;
			
			_s.playListFinalY = leftId * _s.itemHeight;
			
			if(_s.lastListY == _s.playListFinalY) return;
			
			_s.scrollBarHandlerFinalY = Math.round((_s.scrMainHolder_do.h - _s.scrHandler_do.h) * (_s.playListFinalY/((_s.totalSearchedItems - _s.nrOfVisiblePlaylistItems) * _s.itemHeight))) * -1;
			
			if(_s.scrollBarHandlerFinalY < 0){
				_s.scrollBarHandlerFinalY = 0;
			}else if(_s.scrollBarHandlerFinalY > _s.scrMainHolder_do.h - _s.scrHandler_do.h - 1){
				_s.scrollBarHandlerFinalY = _s.scrMainHolder_do.h - _s.scrHandler_do.h - 1;
			}
			
			FWDAnimation.killTweensOf(_s.itemsHolder_do);
			FWDAnimation.to(_s.itemsHolder_do, .5, {y:_s.playListFinalY, ease:Expo.easeOut});
			
			FWDAnimation.killTweensOf(_s.scrHandler_do);
			FWDAnimation.to(_s.scrHandler_do, .5, {y:_s.scrollBarHandlerFinalY, ease:Expo.easeOut});
			FWDAnimation.to(_s.scrHandlerLines_do, .8, {y:_s.scrollBarHandlerFinalY + parseInt((_s.scrHandler_do.h - _s.scrHandlerLinesN_do.h)/2), ease:Quart.easeOut});
			_s.lastListY = _s.playListFinalY;
			
			if(e.preventDefault){
				e.preventDefault();
			}else{
				return false;
			}	
			return;
		};

		
		//##########################################//
		/* setup mobile scrollbar */
		//##########################################//
		_s.setupMobileScrollbar = function(){
			if(_s.hasPointerEvent_bl){
				_s.itemsHolder_do.screen.addEventListener("pointerdown", _s.scrollBarTouchStartHandler);
			}else{
				_s.itemsHolder_do.screen.addEventListener("touchstart", _s.scrollBarTouchStartHandler, {passive: false});
			}
			_s.updateMobileScrollBarId_int = setInterval(_s.updateMobileScrollBar, 16);
		};
		
		_s.scrollBarTouchStartHandler = function(e){
			if(_s.sH > _s.itemsTotalHeight) return;
			if(_s.comboBox_do && _s.comboBox_do.isShowed_bl) return;
			if(e.preventDefault) e.preventDefault();
			FWDAnimation.killTweensOf(_s.itemsHolder_do);
			var viewportMouseCoordinates = FWDRAPUtils.getViewportMouseCoordinates(e);		
			_s.isDragging_bl = true;
			_s.isScrollingOnMove_bl = false;
			_s.lastPresedY = viewportMouseCoordinates.screenY;
			_s.checkLastPresedY = viewportMouseCoordinates.screenY;
	
			if(_s.hasPointerEvent_bl){
				window.addEventListener("pointerup", _s.scrollBarTouchEndHandler);
				window.addEventListener("pointermove", _s.scrollBarTouchMoveHandler);
			}else{
				window.addEventListener("touchend", _s.scrollBarTouchEndHandler);
				window.addEventListener("touchmove", _s.scrollBarTouchMoveHandler, {passive: false});
			}
			clearInterval(_s.updateMoveMobileScrollbarId_int);
			_s.updateMoveMobileScrollbarId_int = setInterval(_s.updateMoveMobileScrollbar, 20);
		};
		
		_s.scrollBarTouchMoveHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			_s.showDisable();
			
			var viewportMouseCoordinates = FWDRAPUtils.getViewportMouseCoordinates(e);	
			if(viewportMouseCoordinates.screenY >= _s.checkLastPresedY + 6 || viewportMouseCoordinates.screenY <= _s.checkLastPresedY - 6) _s.isScrollingOnMove_bl = true;
			var toAdd = viewportMouseCoordinates.screenY - _s.lastPresedY;
			
			_s.playListFinalY += toAdd;
			_s.playListFinalY = Math.round(_s.playListFinalY);
			
			_s.lastPresedY = viewportMouseCoordinates.screenY;
			_s.vy = toAdd  * 2;
		};
		
		_s.scrollBarTouchEndHandler = function(e){
			_s.isDragging_bl = false;
			clearInterval(_s.updateMoveMobileScrollbarId_int);
			clearTimeout(_s.disableOnMoveId_to);
			_s.disableOnMoveId_to = setTimeout(function(){
				_s.hideDisable();
			},50);
			if(_s.hasPointerEvent_bl){
				window.removeEventListener("pointerup", _s.scrollBarTouchEndHandler);
				window.removeEventListener("pointermove", _s.scrollBarTouchMoveHandler);
			}else{
				window.removeEventListener("touchend", _s.scrollBarTouchEndHandler);
				window.removeEventListener("touchmove", _s.scrollBarTouchMoveHandler);
			}
		};
		
		_s.updateMoveMobileScrollbar = function(){
			_s.itemsHolder_do.setY(_s.playListFinalY);
		};
		
		_s.updateMobileScrollBar = function(animate){
			if(!_s.isDragging_bl && !FWDAnimation.isTweening(_s.itemsHolder_do)){
				
				_s.vy *= _s.friction;
				_s.playListFinalY += _s.vy;	
			
				if(_s.playListFinalY > 0){
					_s.vy2 = (0 - _s.playListFinalY) * .3;
					_s.vy *= _s.friction;
					_s.playListFinalY += _s.vy2;
				}else if(_s.playListFinalY < _s.sH - _s.separator_do.h - _s.itemsTotalHeight - _s.searchBar_do.h){
					_s.vy2 = (_s.sH - _s.separator_do.h - _s.itemsTotalHeight - _s.searchBar_do.h - _s.playListFinalY) * .3;
					_s.vy *= _s.friction;
					_s.playListFinalY += _s.vy2;
				}
				
				if(_s.sH > _s.itemsTotalHeight) _s.playListFinalY = 0;
				
				_s.itemsHolder_do.setY(Math.round(_s.playListFinalY));
			}
		};
	

		//##############################//
		/* hide / show */
		//##############################//
		_s.hide = function(animate, overwrite){
			if(!_s.isShowed_bl && !overwrite || prt.openInPopup_bl) return;
			_s.isShowed_bl = false;

			if(animate){
				if(_s.comboBox_do) FWDAnimation.to(_s.comboBox_do, .8, {y:- _s.comboBox_do.h - 1, ease:Expo.easeInOut});
				var t = 0;
				if(_s.searchBarPosition == 'top' && _s.showSearchBar_bl){
					t = -_s.searchBar_do.h * 2 - _s.searchSeparator_do.h - 3;
					FWDAnimation.to(_s.searchBar_do, .8, {y:t, ease:Expo.easeInOut});
				}
				FWDAnimation.to(_s.separator_do, .8, {y:-_s.separator_do.h - 1, ease:Expo.easeInOut});
				FWDAnimation.to(_s.mainHolder_do, .8, {y:-_s.h - 1 + t, ease:Expo.easeInOut});
				FWDAnimation.to(prt.main_do, .8, {height:prt.controller_do.h, ease:Expo.easeInOut});
				
				FWDAnimation.to(prt.stageContainer, .8, {css:{height:prt.controller_do.h}, ease:Expo.easeInOut});
			}else{
				if(_s.comboBox_do) FWDAnimation.killTweensOf(_s.comboBox_do);
				FWDAnimation.killTweensOf(_s.separator_do);
				FWDAnimation.killTweensOf(_s.mainHolder_do);
				FWDAnimation.killTweensOf(prt.main_do);
				FWDAnimation.killTweensOf(prt.stageContainer);
				var t = 0;
				if(_s.searchBarPosition == 'top' && _s.showSearchBar_bl){
					t = -_s.searchBar_do.h * 2 - _s.searchSeparator_do.h - 3;
					_s.searchBar_do.setY(t);
				}
				_s.comboBox_do.setY(-_s.comboBox_do.h);
				_s.separator_do.setY(-_s.separator_do.h - 1);
				_s.mainHolder_do.setY(-_s.h - 1 + t);
				prt.main_do.setHeight(prt.controller_do.h);
				
				prt.stageContainer.style.height = prt.controller_do.h + "px";
				_s.hideComplete();
				
			}
		};

		_s.hideComplete = function(){
			prt.resizeHandler();
			_s.setX(-10000);
		}
		
		_s.show = function(animate, overwrite){
			if(_s.isShowed_bl && !overwrite) return;
			_s.isShowed_bl = true;
			_s.setX(0);
			var offset = 0;
			if(_s.usePlaylistsSelectBox_bl) offset = _s.comboboxHeight;
			var mainHldY = _s.separator_do.h + offset

			_s.mainHolder_do.getStyle().display = 'block';
			prt.stageContainer.style.overflow = 'visible';
			
			if(animate){
				if(_s.comboBox_do) FWDAnimation.to(_s.comboBox_do, .8, {y:0, ease:Expo.easeInOut});
				FWDAnimation.to(_s.separator_do, .8, {y:0, ease:Expo.easeInOut});
				
				if(!prt.openInPopup_bl) FWDAnimation.to(prt.main_do, .8, {h:prt.controller_do.h + _s.sH, ease:Expo.easeInOut});
				if(_s.searchBarPosition == 'top' && _s.showSearchBar_bl){
					var t = -_s.searchBar_do.h;
					if(_s.usePlaylistsSelectBox_bl) t = -_s.separator_do.h;
					FWDAnimation.to(_s.searchBar_do, .8, {y:t, ease:Expo.easeInOut});
					mainHldY = _s.searchBar_do.h;
					if(!_s.comboBox_do) mainHldY = _s.separator_do.h;
				}
				FWDAnimation.to(_s.mainHolder_do, .8, {y:mainHldY, ease:Expo.easeInOut});
				FWDAnimation.to(prt.stageContainer, .8, {css:{height:prt.controller_do.h + _s.sH + offset}, ease:Expo.easeInOut});
			}else{
				if(_s.comboBox_do) FWDAnimation.killTweensOf(_s.comboBox_do);
				FWDAnimation.killTweensOf(_s.separator_do);
				FWDAnimation.killTweensOf(_s.mainHolder_do);
				FWDAnimation.killTweensOf(prt.main_do);
				FWDAnimation.killTweensOf(prt.stageContainer);

				if(_s.searchBarPosition == 'top' && _s.showSearchBar_bl){
					FWDAnimation.killTweensOf(prt.searchBar_do);
					var t = -_s.searchBar_do.h;
					if(_s.usePlaylistsSelectBox_bl) t = -_s.separator_do.h;
					mainHldY = _s.searchBar_do.h;
					if(!_s.comboBox_do) mainHldY = _s.separator_do.h;
					_s.searchBar_do.setY(t);
				}
				_s.comboBox_do.setY(0);
				_s.separator_do.setY(0);
				_s.mainHolder_do.setY(mainHldY);
				if(!prt.openInPopup_bl) prt.main_do.setHeight(prt.controller_do.h + _s.sH);
				prt.stageContainer.style.height = (prt.controller_do.h + _s.sH + offset) + "px";
				
			}	
		};
		

		//##########################################//
		/* Update HEX color of a canvaas */
		//##########################################//
		_s.updateHEXColors = function(normalColor_str, selectedColor_str){
			
			_s.normalColor_str = normalColor_str;
			_s.selectedColor_str = selectedColor_str;
		
			if(_s.sortNButton_do) _s.sortNButton_do.updateHEXColors(normalColor_str, selectedColor_str);
			if(_s.sortAButton_do) _s.sortAButton_do.updateHEXColors(normalColor_str, selectedColor_str);
			if(_s.ascDscButton_do) _s.ascDscButton_do.updateHEXColors(normalColor_str, selectedColor_str);
			FWDRAPUtils.changeCanvasHEXColor(_s.inputArrow_img, _s.mainScrubberDragLeft_canvas, normalColor_str);
			
			
			for(var i=0; i<_s.items_ar.length; i++){
				_s.items_ar[i].updateHEXColors(normalColor_str, selectedColor_str);
			}
		}
	
		_s.init();
	};
	

	/* set prototype */
	FWDRAPPlaylist.setPrototype = function(){
		FWDRAPPlaylist.prototype = new FWDRAPDisplayObject("div");
	};
	
	FWDRAPPlaylist.CHANGE_PLAYLIST = "changePlaylist";
	FWDRAPPlaylist.PLAY = "play";
	FWDRAPPlaylist.PAUSE = "pause";
	FWDRAPPlaylist.UPDATE_TRACK_TITLE_if_FOLDER = "pause";
	FWDRAPPlaylist.PLAY_PREV_VIDEO = "playNextVideo";
	FWDRAPPlaylist.PLAY_NEXT_VIDEO = "playPrevVideo";

	
	FWDRAPPlaylist.prototype = null;
	window.FWDRAPPlaylist = FWDRAPPlaylist;
	
}());