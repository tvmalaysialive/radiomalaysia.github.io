/**
 * Royal Audio Player
 * Data.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function(window){
	
	var FWDRAPAudioData = function(props, playListElement, prt){

		'use strict';
		
		var _s = this;
		var prototype = FWDRAPAudioData.prototype;
	
		_s.plsCache_ar = [];
		_s.props_obj = props;
		_s.skinPaths_ar = [];
		_s.images_ar = [];
		_s.cats_ar = [];

		_s.sc_ar = props.soundCloudAPIKey || "9b7c5ab7e319a4cd630c70dd947d6bfb, 4e6c7139ca2791a89863367ba374a28e, r4wruADPCq7iqJomagvYpdehvILa2bgE, b972bf0e059078490e8579b43bf95923, 64c56d14d1844681f7cca8c61ec0082a, 86b6a66bb2d863f5d64dd8a91cd8de94, 8da368dc752f739dcf6e4abb8317548d, b4bee2a55625cf4ab8e3f7ea1d35e103, 0aff03b3b79c2ac02fd2283b300735bd";
	
		_s.sc_ar = _s.sc_ar.split(',');
		_s.sc_ar = FWDRAPUtils.randomizeArray(_s.sc_ar);
		for(var i=0; i<_s.sc_ar.length; i++){
			_s.sc_ar[i] = _s.sc_ar[i].replace(/ /g,'');
		}

		_s.hubhopperAPIKey = 'QiZ66BeNFQFluOlXvAmI34WQZWqb0ykazSWUGwe2';
		_s.ytbAPiKey = _s.props_obj.youtubeAPIKey || 'AIzaSyCGcO99gLK_2VOkm6vjvTZSIQNYVCSWQnw';
		_s.proxyCors = _s.props_obj.proxyCors;
		
		_s.prevId = -1;
		_s.totalCats = 0;
		_s.countLoadedSkinImages = 0;
		_s.volume = 1;
		_s.startSpaceBetweenButtons = 0;
		_s.spaceBetweenButtons = 0;
		_s.mainScrubberOffsetTop = 0;
		_s.spaceBetweenMainScrubberAndTime = 0;
		_s.startTimeSpace = 0;
		_s.scrubbersOffsetWidth = 0;
		_s.scrubbersOffestTotalWidth = 0;
		_s.volumeButtonAndScrubberOffsetTop = 0;
		_s.maxPlaylistItems = 0;
		_s.separatorOffsetOutSpace = 0;
		_s.separatorOffsetInSpace = 0;
		_s.lastButtonsOffsetTop = 0;
		_s.allButtonsOffsetTopAndBottom = 0;
		_s.controllerHeight = 0;
		_s.titleBarOffsetTop = 0;
		_s.scrubberOffsetBottom = 0;
		_s.equlizerOffsetLeft = 0;
		_s.nrOfVisiblePlaylistItems = 0;
		_s.trackTitleOffsetLeft = 0;
		_s.playPauseButtonOffsetLeftAndRight = 0;
		_s.durationOffsetRight = 0;
		_s.downloadButtonOffsetRight = 0;
		_s.scrollbarOffestWidth = 0;
		_s.resetLoadIndex = -1;
		_s.startAtPlaylist = 0;
		_s.startAtTrack = 0;
		_s.totalCategories = 0;
		_s.thumbnailMaxWidth = 0; 
		_s.buttonsMargins = 0;
		_s.thumbnailMaxHeight = 0;
		_s.horizontalSpaceBetweenThumbnails = 0;
		_s.verticalSpaceBetweenThumbnails = 0;
		_s.countID3 = 0;
		_s.toolTipsButtonsHideDelay = 0;
		
		_s.allowToChangeVolume_bl = true;
		_s.isMbl = FWDRAPUtils.isMobile;
		_s.hasPointerEvent_bl = FWDRAPUtils.hasPointerEvent;
		_s.head = document.getElementsByTagName("head")[0];
	

		//###################################//
		/*init*/
		//###################################//
		_s.init = function(){
			_s.parseProperties();
		};

		
		//#############################################//
		// parse properties.
		//#############################################//
		_s.parseProperties = function(){
		
			_s.useYoutube_bl = _s.props_obj.useYoutube || "no"; 
			_s.useYoutube_bl = _s.useYoutube_bl == "yes" ? true : false;
			
			_s.useVideo_bl = _s.props_obj.useVideo || "no"; 
			_s.useVideo_bl = _s.useVideo_bl == "yes" ? true : false;
			
			_s.useHEX = _s.props_obj.useHEXColorsForSkin; 
			_s.useHEX = _s.useHEX == "yes" ? true : false;
			if(location.protocol.indexOf("file:") != -1) _s.useHEX = false;

			_s.useVectorIcons = _s.props_obj.useVectorIcons;
			_s.useVectorIcons = _s.useVectorIcons == "yes" ? true : false;
			
			_s.categoriesId_str = _s.props_obj.playlistsId;
			if(!_s.categoriesId_str){
				setTimeout(function(){
					if(_s == null) return;
					errorMessage_str = "The <font color='#FF0000'>playlistsId</font> property is not defined in the constructor function!";
					_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:errorMessage_str});
				}, 50);
				return;
			}
				
			_s.mainFolderPath_str = _s.props_obj.mainFolderPath;
			if(!_s.mainFolderPath_str){
				setTimeout(function(){
					if(_s == null) return;
					errorMessage_str = "The <font color='#FF0000'>mainFolderPath</font> property is not defined in the constructor function!";
					_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:errorMessage_str});
				}, 50);
				return;
			}
			
			if((_s.mainFolderPath_str.lastIndexOf("/") + 1) != _s.mainFolderPath_str.length){
				_s.mainFolderPath_str += "/";
			}
			
			_s.skinPath_str = _s.props_obj.skinPath;
			if(!_s.skinPath_str){
				setTimeout(function(){
					if(_s == null) return;
					errorMessage_str = "The <font color='#FF0000'>skinPath</font> property is not defined in the constructor function!";
					_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:errorMessage_str});
				}, 50);
				return;
			}
			
		
			if((_s.skinPath_str.lastIndexOf("/") + 1) != _s.skinPath_str.length){
				_s.skinPath_str += "/";
			}
			
			_s.skinPath_str = _s.mainFolderPath_str + _s.skinPath_str;
			_s.flashPath_str = _s.mainFolderPath_str + "flashlsChromeless.swf";
			_s.proxyPath_str =  _s.mainFolderPath_str + "proxy.php";
			_s.proxyFolderPath_str = _s.mainFolderPath_str  + "proxyFolder.php";
			_s.mailPath_str = _s.mainFolderPath_str  + "sendMail.php";
			_s.mp3DownloaderPath_str = _s.mainFolderPath_str  + "downloader.php";
			_s.hlsPath_str = _s.mainFolderPath_str  + "java/hls.js";

			_s.isDark = true;
			if(_s.skinPath_str.indexOf('dark') == -1){
				_s.isDark = false;
			}
			
			_s.categories_el = document.getElementById(_s.categoriesId_str);
			var catsChildren_ar = FWDRAPUtils.getChildren(_s.categories_el);
			_s.totalCats = catsChildren_ar.length;	
			
			if(_s.totalCats == 0){
				setTimeout(function(){
					if(_s == null) return;
					errorMessage_str = "At least one category is required!";
					_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:errorMessage_str});
				}, 50);
				return;
			}
			
			for(var i=0; i<_s.totalCats; i++){
				var obj = {};
				var child = catsChildren_ar[i];
				
				if(!FWDRAPUtils.hasAttribute(child, "data-source")){
					setTimeout(function(){
						if(_s == null) return;
						_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Attribute <font color='#FF0000'>data-source</font> is required in the categories html element at position <font color='#FF0000'>" + (i + 1)});
					}, 50);
					return;
				}
				
				if(!FWDRAPUtils.hasAttribute(child, "data-thumbnail-path")){
					setTimeout(function(){
						if(_s == null) return;
						_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Attribute <font color='#FF0000'>data-thumbnail-path</font> is required in the categories html element at position <font color='#FF0000'>" + (i + 1)});
					}, 50);
					return;
				}
				
				obj.source = FWDRAPUtils.getAttributeValue(child, "data-source");
				obj.playlistsName = FWDRAPUtils.getAttributeValue(child, "data-playlist-name");
				obj.thumbnailPath = FWDRAPUtils.getAttributeValue(child, "data-thumbnail-path");
				obj.htmlContent = child.innerHTML;
				obj.htmlText_str = child.innerText;
				_s.cats_ar[i] = obj;
			}
			
			_s.facebookAppId_str = _s.props_obj.facebookAppId || undefined;
			_s.totalCategories = _s.cats_ar.length;
			_s.playlistIdOrPath_str = _s.props_obj.playlistIdOrPath || undefined;
			_s.timeColor_str = _s.props_obj.timeColor || "#FF0000";
			_s.trackTitleNormalColor_str = _s.props_obj.trackTitleNormalColor || "#FF0000";
			_s.trackTitleSelected_str = _s.props_obj.trackTitleSelectedColor || "#FF0000";
			_s.trackDurationColor_str = _s.props_obj.trackDurationColor || "#FF0000";
			_s.titleColor_str = _s.props_obj.titleColor || "#FF0000";
			_s.thumbnailSelectedType_str = _s.props_obj.thumbnailSelectedType || "opacity";
			if(_s.thumbnailSelectedType_str != "blackAndWhite"  
				&& _s.thumbnailSelectedType_str != "threshold" 
				&& _s.thumbnailSelectedType_str != "opacity"){
				_s.thumbnailSelectedType_str = "opacity";
			}
			if(_s.isMbl || FWDRAPUtils.isIEAndLessThen9)  _s.thumbnailSelectedType_str = "opacity";
			if(document.location.protocol == "file:") _s.thumbnailSelectedType_str = "opacity";
		
			_s.startAtPlaylist = _s.props_obj.startAtPlaylist || 0;
			if(isNaN(_s.startAtPlaylist)) _s.startAtPlaylist = 0;
			
			if(_s.startAtPlaylist < 0){
				_s.startAtPlaylist = 0;
			}else if(_s.startAtPlaylist > _s.totalCats - 1){
				_s.startAtPlaylist = _s.totalCats - 1;
			}
			
			_s.startAtRandomTrack_bl = _s.props_obj.startAtRandomTrack;
			_s.startAtRandomTrack_bl = _s.startAtRandomTrack_bl == "no" ? false : true;
			
			_s.startAtTrack = _s.props_obj.startAtTrack || 0; 
			
			_s.volume = _s.props_obj.volume;
			if(_s.volume === undefined) _s.volume = 1;
			if(isNaN(_s.volume)) volume = 1;
			if(_s.volume >= 1){
				_s.volume = 1;
			}else if(_s.volume <=0){
				_s.volume = 0;
			}
			
			_s.toolTipsFntClr = _s.props_obj.toolTipsButtonFontColor || "#FF0000";
			_s.toolTipsBkClr = _s.props_obj.toolTipsButtonsBackgroundColor || "#FFFFFF";
			_s.buttonsMargins = _s.props_obj.buttonsMargins || 0; 
			_s.thumbnailMaxWidth = _s.props_obj.thumbnailMaxWidth || 330; 
			_s.thumbnailMaxHeight = _s.props_obj.thumbnailMaxHeight || 330;
			_s.horizontalSpaceBetweenThumbnails = _s.props_obj.horizontalSpaceBetweenThumbnails;
			if(_s.horizontalSpaceBetweenThumbnails == undefined)  _s.horizontalSpaceBetweenThumbnails = 40;
			_s.verticalSpaceBetweenThumbnails = parseInt(_s.props_obj.verticalSpaceBetweenThumbnails);
			if(_s.verticalSpaceBetweenThumbnails == undefined)  _s.verticalSpaceBetweenThumbnails = 40;
			_s.toolTipsDl = _s.props_obj.toolTipsButtonsHideDelay || 1.5; 

			_s.playlistSelectorHeight = _s.props_obj.playlistSelectorHeight || 32;
			_s.playlistSelectorHeight = Math.min(100, _s.playlistSelectorHeight);
		
			_s.playIfLoggedIn = _s.props_obj.playIfLoggedIn; 
			_s.playIfLoggedIn = _s.playIfLoggedIn == "yes" ? true : false;
			_s.playIfLoggedInMessage = _s.props_obj.playIfLoggedInMessage || 'Please loggin';

			_s.inputSearchTextOffsetTop = _s.props_obj.inputSearchTextOffsetTop;
			_s.inputSearchOffsetLeft = _s.props_obj.inputSearchOffsetLeft;
			_s.startSpaceBetweenButtons = _s.props_obj.startSpaceBetweenButtons || 0;
			_s.spaceBetweenButtons = _s.props_obj.spaceBetweenButtons || 0;
			_s.mainScrubberOffsetTop = _s.props_obj.mainScrubberOffsetTop || 100;
			_s.spaceBetweenMainScrubberAndTime = _s.props_obj.spaceBetweenMainScrubberAndTime;
			_s.startTimeSpace = _s.props_obj.startTimeSpace;
			_s.scrubbersOffsetWidth  = _s.props_obj.scrubbersOffsetWidth || 0;
			_s.scrubbersOffestTotalWidth = _s.props_obj.scrubbersOffestTotalWidth || 0;
			_s.volumeButtonAndScrubberOffsetTop = _s.props_obj.volumeButtonAndScrubberOffsetTop || 0;
			_s.spaceBetweenVolumeButtonAndScrubber = _s.props_obj.spaceBetweenVolumeButtonAndScrubber || 0;
			_s.volumeScrubberOffestWidth = _s.props_obj.volumeScrubberOffestWidth || 0;
			_s.scrubberOffsetBottom = _s.props_obj.scrubberOffsetBottom || 0;
			_s.equlizerOffsetLeft = _s.props_obj.equlizerOffsetLeft || 0;
			_s.nrOfVisiblePlaylistItems = _s.props_obj.nrOfVisiblePlaylistItems || 0;
			_s.trackTitleOffsetLeft = _s.props_obj.trackTitleOffsetLeft || 0;
			_s.playPauseButtonOffsetLeftAndRight = _s.props_obj.playPauseButtonOffsetLeftAndRight || 0;
			_s.durationOffsetRight = _s.props_obj.durationOffsetRight || 0;
			_s.downloadButtonOffsetRight = _s.props_obj.downloadButtonOffsetRight || 0;
			_s.scrollbarOffestWidth = _s.props_obj.scrollbarOffestWidth || 0;
			_s.maxPlaylistItems = _s.props_obj.maxPlaylistItems || 200;
			_s.playlistItemHeight = _s.props_obj.playlistItemHeight || 23;
			_s.playlistItemHeight =  Math.min(_s.playlistItemHeight, 50);
			_s.controllerHeight = _s.props_obj.controllerHeight || 200;
			_s.titleBarOffsetTop = _s.props_obj.titleBarOffsetTop || 0;
			_s.separatorOffsetInSpace = _s.props_obj.separatorOffsetInSpace || 0;
			_s.lastButtonsOffsetTop = _s.props_obj.lastButtonsOffsetTop || 0;
			_s.allButtonsOffsetTopAndBottom = _s.props_obj.allButtonsOffsetTopAndBottom || 0;
			_s.separatorOffsetOutSpace = _s.props_obj.separatorOffsetOutSpace || 0;
			_s.searchBarHeight = _s.props_obj.searchBarHeight || 50;
			_s.inputOffestTop = _s.props_obj.inputOffestTop || 50;
			_s.playbackRateButtonsMargins = _s.props_obj.playbackRateButtonsMargins || 0;
			_s.volumeScrubberWidth = _s.props_obj.volumeScrubberWidth || 10;
			if(_s.volumeScrubberWidth > 200) _s.volumeScrubberWidth = 200;
			_s.playbackRateWindowTextColor_str = _s.props_obj.playbackRateWindowTextColor || "#FF0000";
			
			_s.addKeyboardSupport_bl = _s.props_obj.addKeyboardSupport || "no"; 
			_s.addKeyboardSupport_bl = _s.addKeyboardSupport_bl == "yes" ? true : false;
			
			_s.showPlaylistsSearchInput_bl = _s.props_obj.showPlaylistsSearchInput; 
			_s.showPlaylistsSearchInput_bl = _s.showPlaylistsSearchInput_bl == "yes" ? true : false;
			
			_s.randomizePlaylist_bl = _s.props_obj.randomizePlaylist; 
			_s.randomizePlaylist_bl = _s.randomizePlaylist_bl == "yes" ? true : false;

			_s.inversePlaylist = _s.props_obj.inversePlaylist; 
			_s.inversePlaylist = _s.inversePlaylist == "yes" ? true : false;
			
			_s.showPlaybackRateButton_bl = _s.props_obj.showPlaybackRateButton; 
			_s.showPlaybackRateButton_bl = _s.showPlaybackRateButton_bl == "yes" ? true : false;
			
			_s.playTrackAfterPlaylistLoad_bl = _s.props_obj.playTrackAfterPlaylistLoad; 
			_s.playTrackAfterPlaylistLoad_bl = _s.playTrackAfterPlaylistLoad_bl == "yes" ? true : false;
			
			_s.nBC = _s.props_obj.normalHEXButtonsColor || "#FFFFFF";
			_s.n2BC = _s.props_obj.normalHEXButtonsColor2 || "#FFFFFF";
			if(_s.skinPath_str.indexOf('dark') != -1){
				_s.sBC = '#FFFFFF';
			}else{
				_s.sBC = '#000000';
			}
		
			_s.secondaryLabelsColor_str = _s.props_obj.secondaryLabelsColor || "#FF0000"; 
			_s.mainLabelsColor_str = _s.props_obj.mainLabelsColor || "#FF0000"; 
			_s.borderColor_str = _s.props_obj.borderColor || "#FF0000";
			_s.textColor_str = _s.props_obj.textColor_str || "#FF0000";
			_s.inputBackgroundColor_str = _s.props_obj.inputBackgroundColor || "#FF0000";
			_s.inputColor_str = _s.props_obj.inputColor || "#FF0000";
			
			_s.defaultPlaybackRate = _s.props_obj.defaultPlaybackRate || 1;
			_s.defaultPlaybackRate = parseFloat(_s.defaultPlaybackRate); 
			if(isNaN(_s.defaultPlaybackRate)) _s.defaultPlaybackRate = 1;
			if(_s.defaultPlaybackRate < 0.5){
				_s.defaultPlaybackRate = 0.5;
			}else if(_s.defaultPlaybackRate > 2){
				_s.defaultPlaybackRate =2;
			}
			
			_s.rightClickContextMenu_str = _s.props_obj.rightClickContextMenu || "developer";
			var test = _s.rightClickContextMenu_str == "developer" 
				   || _s.rightClickContextMenu_str == "disabled"
				   || _s.rightClickContextMenu_str == "default";
			if(!test) _s.rightClickContextMenu_str = "developer";
			
			_s.playlistBackgroundColor_str = _s.props_obj.playlistBackgroundColor || "transparent";
			_s.searchInputColor_str = _s.props_obj.searchInputColor || "#FF0000";
			
			_s.shareWindowBackgroundColor_str = _s.props_obj.shareWindowBackgroundColor || "transparent";
			_s.shareWindowBackgroundColor_str = _s.props_obj.shareWindowBackgroundColor_str;
			
			_s.showButtonsToolTips_bl = _s.props_obj.showButtonsToolTips; 
			_s.showButtonsToolTips_bl = _s.showButtonsToolTips_bl == "no" ? false : true;
			if(_s.isMbl) _s.showButtonsToolTips_bl = false;
			
			_s.autoPlay_bl = _s.props_obj.autoPlay; 
			_s.autoPlay_bl = _s.autoPlay_bl == "yes" ? true : false;
			
			_s.useContinuousPlayback_bl = _s.props_obj.useContinuousPlayback; 
			_s.useContinuousPlayback_bl = _s.useContinuousPlayback_bl == "yes" ? true : false;
			
			_s.disableScrubber_bl = _s.props_obj.disableAudioScrubbar; 
			_s.disableScrubber_bl = _s.disableScrubber_bl == "yes" ? true : false;
			
			_s.showVideoFullScreenButton_bl = _s.props_obj.showFullScreenButton; 
			_s.showVideoFullScreenButton_bl = _s.showVideoFullScreenButton_bl == "yes" ? true : false;
			
			_s.showShareButton_bl = _s.props_obj.showShareButton; 
			_s.showShareButton_bl = _s.showShareButton_bl == "yes" ? true : false;
			
			_s.showSortButtons_bl = _s.props_obj.showSortButtons;
			_s.showSortButtons_bl = _s.showSortButtons_bl == "no" ? false : true;
		
			_s.loop_bl = _s.props_obj.loop; 
			_s.loop_bl = _s.loop_bl == "yes" ? true : false;
			
			_s.playVideoOnlyWhenLoggedIn_bl = _s.props_obj.playTrackOnlyWhenLoggedIn; 
			_s.playVideoOnlyWhenLoggedIn_bl = _s.playVideoOnlyWhenLoggedIn_bl == "yes" ? true : false;
		
			_s.playlistLoop_bl = _s.props_obj.playlistLoop; 
			_s.playlistLoop_bl = _s.playlistLoop_bl == "yes" ? true : false;
			
			_s.shuffle_bl = _s.props_obj.shuffle; 
			_s.shuffle_bl = _s.shuffle_bl == "yes" ? true : false;
			
			_s.useDeepLinking_bl = _s.props_obj.useDeepLinking; 
			_s.useDeepLinking_bl = _s.useDeepLinking_bl == "yes" ? true : false;
			
			_s.showSoundCloudUserNameInTitle_bl = _s.props_obj.showSoundCloudUserNameInTitle; 
			_s.showSoundCloudUserNameInTitle_bl = _s.showSoundCloudUserNameInTitle_bl == "yes" ? true : false;
			
			_s.showThumbnail_bl = _s.props_obj.showThumbnail; 
			_s.showThumbnail_bl = _s.showThumbnail_bl == "yes" ? true : false;

			_s.useID3ForFolderPlaylist = _s.props_obj.useID3ForFolderPlaylist; 
			_s.useID3ForFolderPlaylist = _s.useID3ForFolderPlaylist == "no" ? false : true;
			
			_s.showLoopButton_bl = _s.props_obj.showLoopButton; 
			_s.showLoopButton_bl = _s.props_obj.showLoopButton == "no" ? false : true;
			
			_s.showPlayListButtonAndPlaylist_bl = _s.props_obj.showPlayListButtonAndPlaylist; 
			_s.showPlayListButtonAndPlaylist_bl = _s.showPlayListButtonAndPlaylist_bl == "no" ? false : true;
			
			if(FWDRAPUtils.isMobile 
			   && _s.showPlayListButtonAndPlaylist_bl
			   && _s.props_obj.showPlayListOnMobile == "no"
			   ){
				_s.showPlayListButtonAndPlaylist_bl = false;
			}
			
			_s.privateVideoPassword_str = _s.props_obj.privatePassword;

			_s.useVis = _s.props_obj.useVisualizer; 
			_s.useVis = _s.useVis == "yes" ? true : false;
			_s.visPrst = _s.props_obj.visualizerPreset || 'wave1';

			_s.useDumyVisualizeOnIOS = _s.props_obj.useDumyVisualizeOnIOS; 
			_s.useDumyVisualizeOnIOS = _s.useDumyVisualizeOnIOS == "yes" ? true : false;
			

			var prst = ['wave1','wave2','bars1','bars2'];
			_s.visRand = _s.props_obj.visualizerRandomPreset;
			_s.visRand = _s.visRand == "yes" ? true : false;
			
			if(_s.visRand) _s.visPrst = prst[Math.floor(Math.random() * prst.length)];
			
			_s.visClr = _s.props_obj.visualizerColor || ["#FF22E7", "#F8EE0C", "#0FFA50", "#00FFFF", "#2730FF"];
			_s.visCapClr = _s.props_obj.visualizerCapColor || "FF0000";
			
			_s.showPlaylistsButtonAndPlaylists_bl = _s.props_obj.showPlaylistsButtonAndPlaylists;
			_s.showPlaylistsButtonAndPlaylists_bl = _s.showPlaylistsButtonAndPlaylists_bl == "no" ? false : true;
			
			_s.showPlaylistsByDefault_bl = _s.props_obj.showPlaylistsByDefault; 
			_s.showPlaylistsByDefault_bl = _s.showPlaylistsByDefault_bl == "yes" ? true : false;
		
			_s.showShuffleButton_bl = _s.props_obj.showShuffleButton; 
			_s.showShuffleButton_bl = _s.props_obj.showShuffleButton == "no" ? false : true;
			
			_s.showDownloadMp3Button_bl = _s.props_obj.showDownloadMp3Button; 
			_s.showDownloadMp3Button_bl = _s.showDownloadMp3Button_bl == "no" ? false : true;
			
			_s.showBuyButton_bl = _s.props_obj.showBuyButton; 
			_s.showBuyButton_bl = _s.showBuyButton_bl == "no" ? false : true;
			
			_s.showFacebookButton_bl = _s.props_obj.showFacebookButton; 
			_s.showFacebookButton_bl = _s.props_obj.showFacebookButton == "no" ? false : true;
			
			_s.showPopupButton_bl = _s.props_obj.showPopupButton; 
			_s.showPopupButton_bl = _s.showPopupButton_bl == "no" ? false : true;

			_s.openPopupOnPlay_bl = _s.props_obj.openPopupOnPlay; 
			_s.openPopupOnPlay_bl = _s.openPopupOnPlay_bl == "yes" ? true : false;

			_s.expandControllerBackground_bl = _s.props_obj.expandBackground; 
			_s.expandControllerBackground_bl = _s.expandControllerBackground_bl == "yes" ? true : false;

			_s.sortAscending_bl = true;
			if(_s.props_obj && _s.props_obj.playlistSort == 'descending'){
				_s.sortAscending_bl = false;
			}
			
			_s.showPlaylistItemPlayButton_bl = _s.props_obj.showPlaylistItemPlayButton; 
			_s.showPlaylistItemPlayButton_bl = _s.showPlaylistItemPlayButton_bl == "no" ? false : true;
			
			_s.showPlaylistItemDownloadButton_bl = _s.props_obj.showPlaylistItemDownloadButton; 
			_s.showPlaylistItemDownloadButton_bl = _s.showPlaylistItemDownloadButton_bl == "no" ? false : true;
			
			_s.showPlaylistItemBuyButton_bl = _s.props_obj.showPlaylistItemBuyButton; 
			_s.showPlaylistItemBuyButton_bl = _s.showPlaylistItemBuyButton_bl == "no" ? false : true;
			
			_s.forceDisableDownloadButtonForPodcast_bl = _s.props_obj.forceDisableDownloadButtonForPodcast; 
			_s.forceDisableDownloadButtonForPodcast_bl = _s.forceDisableDownloadButtonForPodcast_bl == "yes" ? true : false;
			
			_s.forceDisableDownloadButtonForOfficialFM_bl = _s.props_obj.forceDisableDownloadButtonForOfficialFM; 
			_s.forceDisableDownloadButtonForOfficialFM_bl = _s.forceDisableDownloadButtonForOfficialFM_bl == "yes" ? true : false;
			
			_s.forceDisableDownloadButtonForFolder_bl = _s.props_obj.forceDisableDownloadButtonForFolder; 
			_s.forceDisableDownloadButtonForFolder_bl = _s.forceDisableDownloadButtonForFolder_bl == "yes" ? true : false;
			
			_s.showTracksNumbers_bl = _s.props_obj.showTracksNumbers;  
			_s.showTracksNumbers_bl = _s.showTracksNumbers_bl == "yes" ? true : false;
			
			_s.disableAudioScrubbar_bl = _s.props_obj.disableAudioScrubbar; 
			_s.disableAudioScrubbar_bl = _s.disableAudioScrubbar_bl == "no" ? false : true;
			
			_s.animateOnIntro_bl = _s.props_obj.animateOnIntro; 
			_s.animateOnIntro_bl = _s.animateOnIntro_bl == "yes" ? true : false;
			
			_s.showNextAndPrevButtons_bl = _s.props_obj.showNextAndPrevButtons; 
			_s.showNextAndPrevButtons_bl = _s.showNextAndPrevButtons_bl == "yes" ? true : false;
			
			_s.showPlayListByDefault_bl = _s.props_obj.showPlayListByDefault; 
			_s.showPlayListByDefault_bl = _s.showPlayListByDefault_bl == "no" ? false : true;
			
			_s.showSoundAnimation_bl = _s.props_obj.showSoundAnimation; 
			_s.showSoundAnimation_bl = _s.showSoundAnimation_bl == "yes" ? true : false;
			
			_s.showPlaylistItemPlayButton_bl = _s.props_obj.showPlaylistItemPlayButton; 
			_s.showPlaylistItemPlayButton_bl = _s.showPlaylistItemPlayButton_bl == "no" ? false : true;
			
			_s.addScrollBarMouseWheelSupport_bl = _s.props_obj.addScrollBarMouseWheelSupport; 
			_s.addScrollBarMouseWheelSupport_bl = _s.addScrollBarMouseWheelSupport_bl == "no" ? false : true;

			_s.showMainScrubberToolTipLabel_bl = _s.props_obj.showMainScrubberAndVolumeScrubberToolTipLabel;
			_s.showMainScrubberToolTipLabel_bl = _s.showMainScrubberToolTipLabel_bl == "yes" ? true : false;
			
			_s.showSearchBar_bl = _s.props_obj.showSearchBar;
			_s.showSearchBar_bl = _s.showSearchBar_bl == "no" ? false : true;

			_s.searchBarPosition = _s.props_obj.searchBarPosition;
			if(!_s.showSearchBar_bl) _s.searchBarPosition = 'bottom';
			
			_s.usePlaylistsSelectBox_bl = _s.props_obj.usePlaylistsSelectBox;
			_s.usePlaylistsSelectBox_bl = _s.usePlaylistsSelectBox_bl == "yes" ? true : false;
			
			_s.showPlaylistsSelectBoxNumbers_bl = _s.props_obj.showPlaylistsSelectBoxNumbers;
			_s.showPlaylistsSelectBoxNumbers_bl = _s.showPlaylistsSelectBoxNumbers_bl == "yes" ? true : false;
			
			_s.mainSelectorBackgroundSelectedColor = _s.props_obj.mainSelectorBackgroundSelectedColor || "#FFFFFF";
			_s.mainSelectorTextNormalColor = _s.props_obj.mainSelectorTextNormalColor || "#FFFFFF";
			_s.mainSelectorTextSelectedColor = _s.props_obj.mainSelectorTextSelectedColor || "#000000";
			_s.mainButtonBackgroundNormalColor = _s.props_obj.mainButtonBackgroundNormalColor || "#212021";
			_s.mainButtonBackgroundSelectedColor = _s.props_obj.mainButtonBackgroundSelectedColor || "#FFFFFF"; 
			_s.mainButtonTextNormalColor = _s.props_obj.mainButtonTextNormalColor || "#FFFFFF";
			_s.mainButtonTextSelectedColor = _s.props_obj.mainButtonTextSelectedColor || "#000000";

			_s.atbTimeBackgroundColor = _s.props_obj.atbTimeBackgroundColor || "transparent";
			_s.atbTimeTextColorNormal = _s.props_obj.atbTimeTextColorNormal ||  "#888888";
			_s.atbTimeTextColorSelected = _s.props_obj.atbTimeTextColorSelected || "#FFFFFF";
			_s.atbButtonTextNormalColor = _s.props_obj.atbButtonTextNormalColor || "#888888";
			_s.atbButtonTextSelectedColor = _s.props_obj.atbButtonTextSelectedColor || "#FFFFFF";
			_s.atbButtonBackgroundNormalColor = _s.props_obj.atbButtonBackgroundNormalColor || "#FFFFFF";
			_s.atbButtonBackgroundSelectedColor = _s.props_obj.atbButtonBackgroundSelectedColor || "#000000";

			_s.scrubbersToolTipLabelBackgroundColor = _s.props_obj.scrubbersToolTipLabelBackgroundColor || "#FFFFFF";
			_s.scrubbersToolTipLabelFontColor  = _s.props_obj.scrubbersToolTipLabelFontColor || "#000000";
			
			_s.preloaderPath_str = _s.skinPath_str + "logo.png";
			_s.mainPreloader_img = new Image();
			_s.mainPreloader_img.onerror = _s.onSkinLoadErrorHandler;
			_s.mainPreloader_img.onload = _s.onPreloaderLoadHandler;
			_s.mainPreloader_img.src = _s.skinPath_str + "preloader.png";
			_s.arrowN_str = _s.skinPath_str + "combobox-arrow-normal.png"; 
			_s.arrowS_str = _s.skinPath_str + "combobox-arrow-selected.png"; 
			_s.comboboxBk1_str = _s.skinPath_str + "combobox-item-background1.png"; 
			_s.comboboxBk2_str = _s.skinPath_str + "combobox-item-background2.png"; 
			_s.shareBkPath_str = _s.skinPath_str + "categories-background.png"; 

			_s.skinPaths_ar = [];

			if(!_s.useVectorIcons){
				_s.skinPaths_ar.push(
					{img:_s.prevN_img = new Image(), src:_s.skinPath_str + "prev-button.png"},
				     {img:_s.playN_img = new Image(), src:_s.skinPath_str + "play-button.png"},
				     {img:_s.pauseN_img = new Image(), src:_s.skinPath_str + "pause-button.png"},
				     {img:_s.nextN_img = new Image(), src:_s.skinPath_str + "next-button.png"},
				     {img:_s.volumeN_img = new Image(), src:_s.skinPath_str + "volume-icon.png"},
				     {img:_s.categoriesN_img = new Image(), src:_s.skinPath_str + "categories-button.png"},
				     {img:_s.replayN_img = new Image(), src:_s.skinPath_str + "replay-button.png"},
				     {img:_s.playlistN_img = new Image(), src:_s.skinPath_str + "playlist-button.png"},
				     {img:_s.shuffleN_img = new Image(), src:_s.skinPath_str + "shuffle-button.png"},
				     {img:_s.shareN_img = new Image(), src:_s.skinPath_str + "share.png"},
				     {img:_s.popupN_img = new Image(), src:_s.skinPath_str + "popup-button.png"},
				     {img:_s.downloaderN_img = new Image(), src:_s.skinPath_str + "download-button.png"},
				     {img:_s.buyN_img = new Image(), src:_s.skinPath_str + "buy-button.png"},
				     {img:_s.passColoseN_img = new Image(), src:_s.skinPath_str + "categories-close-button.png"},
			     	 {img:_s.atbNPath_img = new Image(), src:_s.skinPath_str + "a-to-b-button.png"},
			     	 {img:_s.closeClooseN_img = new Image(), src:_s.skinPath_str + "categories-close-button.png"}
				);

				if(_s.useYoutube_bl || _s.useVideo_bl){
					_s.skinPaths_ar.push(
						{img:_s.fullScreenN_img = new Image(), src:_s.skinPath_str + "full-screen.png"},
						{img:_s.normalScreenN_img = new Image(), src:_s.skinPath_str + "normal-screen.png"},
						{img:_s.largePlayN_img = new Image(), src:_s.skinPath_str + "large-play.png"}
					);
				}
			}
			
			_s.skinPaths_ar.push(
		         {img:_s.controllerBk_img = new Image(), src:_s.skinPath_str + "controller-background.png"},
			     {img:_s.separator1_img = new Image(), src:_s.skinPath_str + "separator.png"},
			     {img:_s.separator2_img = new Image(), src:_s.skinPath_str + "separator.png"},
			     {img:_s.mainScrubberBkLeft_img = new Image(), src:_s.skinPath_str + "scrubber-left-background.png"},
			     {img:_s.mainScrubberBkRight_img = new Image(), src:_s.skinPath_str + "scrubber-right-background.png"},
			     {img:_s.mainScrubberDragLeft_img = new Image(), src:_s.skinPath_str + "scrubber-left-drag.png"},
			     {img:_s.mainScrubberLine_img = new Image(), src:_s.skinPath_str + "scrubber-line.png"},
			     {img:_s.mainScrubberLeftProgress_img = new Image(), src:_s.skinPath_str + "progress-left.png"},
			     {img:_s.volumeScrubberDragLeft_img = new Image(), src:_s.skinPath_str + "scrubber-left-drag.png"},
			     {img:_s.progressLeft_img = new Image(), src:_s.skinPath_str + "progress-left.png"},
			     {img:_s.titlebarLeftPath_img = new Image(), src:_s.skinPath_str + "titlebar-grad-left.png"},
				 {img:_s.playbackRateNormal_img = new Image(), src:_s.skinPath_str + "playback-rate-normal.png"},
			     {img:_s.titleBarLeft_img = new Image(), src:_s.skinPath_str + "titlebar-left-pattern.png"}
    		)

    		_s.titleBarRigthPath = _s.skinPath_str + "titlebar-right-pattern.png";

			
			//setup skin paths
			_s.atbSPath_str = _s.skinPath_str + "a-to-b-button-over.png";
			_s.playbackRateSelectedPath_str = _s.skinPath_str + "playback-rate-selected.png"; 
			_s.largePlayS_str = _s.skinPath_str + "large-play-over.png"; 
			_s.fullScreenS_str = _s.skinPath_str + "full-screen-over.png"; 
			_s.normalScreenS_str = _s.skinPath_str + "normal-screen-over.png"; 
			_s.prevSPath_str = _s.skinPath_str + "prev-button-over.png"; 
			_s.playSPath_str = _s.skinPath_str + "play-button-over.png";
			_s.pauseSPath_str = _s.skinPath_str + "pause-button-over.png";
			_s.nextSPath_str = _s.skinPath_str + "next-button-over.png"; 
			
			_s.controllerBkPath_str = _s.skinPath_str + "controller-background.png";
			_s.thumbnailBkPath_str = _s.skinPath_str + "thumbnail-background.png";

			_s.mainScrubberBkMiddlePath_str = _s.skinPath_str + "scrubber-middle-background.png";
			_s.mainScrubberDragMiddlePath_str = _s.skinPath_str + "scrubber-middle-drag.png";
	
			_s.volumeScrubberBkMiddlePath_str = _s.skinPath_str + "scrubber-middle-background.png";
			_s.volumeScrubberDragMiddlePath_str = _s.skinPath_str + "scrubber-middle-drag.png";	
		
			_s.volumeSPath_str = _s.skinPath_str + "volume-icon-over.png";
			_s.volumeDPath_str = _s.skinPath_str + "volume-icon-disabled.png";
			_s.progressMiddlePath_str = _s.skinPath_str + "progress-middle.png";
			
			_s.categoriesSPath_str = _s.skinPath_str + "categories-button-over.png"; 
			_s.replaySPath_str = _s.skinPath_str + "replay-button-over.png"; 
			_s.playlistSPath_str = _s.skinPath_str + "playlist-button-over.png"; 
			_s.shuffleSPath_str = _s.skinPath_str + "shuffle-button-over.png"; 
			_s.shareSPath_str = _s.skinPath_str + "share-over.png"; 
			_s.popupSPath_str = _s.skinPath_str + "popup-button-over.png"; 
			_s.downloaderSPath_str = _s.skinPath_str + "download-button-over.png"; 
			_s.buySPath_str = _s.skinPath_str + "buy-button-over.png";  
			_s.titlebarRightPath_str = _s.skinPath_str + "titlebar-grad-right.png"; 
	
			_s.titlebarBkMiddlePattern_str = _s.skinPath_str + "titlebar-middle-pattern.png"; 
			_s.passButtonNPath_str = _s.skinPath_str + "pass-button.png";
			_s.passButtonSPath_str = _s.skinPath_str + "pass-button-over.png";
			_s.playlistItemProgress1_img = _s.skinPath_str + "playlist-item-progress1.png";
			_s.playlistItemProgress2_img = _s.skinPath_str + "playlist-item-progress2.png";
			
			
			if(_s.showPlayListButtonAndPlaylist_bl){
				_s.skinPaths_ar.push(
				    {img:_s.playlistItemBk1_img = new Image(), src:_s.skinPath_str + "playlist-item-background1.png"},
				    {img:_s.playlistItemBk2_img = new Image(), src:_s.skinPath_str + "playlist-item-background2.png"},
				    {img:_s.playlistSeparator_img = new Image(), src:_s.skinPath_str + "playlist-separator.png"},
				    {img:_s.playlistScrBkTop_img = new Image(), src:_s.skinPath_str + "playlist-scrollbar-background-top.png"},
				    {img:_s.playlistScrDragTop_img = new Image(), src:_s.skinPath_str + "playlist-scrollbar-drag-bottom.png"},
				    {img:_s.playlistScrLines_img = new Image(), src:_s.skinPath_str + "playlist-scrollbar-lines.png"},
				    {img:_s.playlistPlayButtonN_img = new Image(), src:_s.skinPath_str + "playlist-play-button.png"},
				    {img:_s.playlistDownloadButtonN_img = new Image(), src:_s.skinPath_str + "playlist-download-button.png"},
				    {img:_s.playlistBuyButtonN_img = new Image(), src:_s.skinPath_str + "playlist-buy-button.png"}
			    );

			    _s.playlistItemGrad1Path = _s.skinPath_str + "playlist-item-grad1.png";
				_s.playlistItemGrad2Path = _s.skinPath_str + "playlist-item-grad2.png";
				
				_s.playlistDownloadButtonS_str = _s.skinPath_str + "playlist-download-button-over.png"; 
				_s.playlistBuyButtonS_str = _s.skinPath_str + "playlist-buy-button-over.png"; 
				_s.scrBkMiddlePath_str = _s.skinPath_str + "playlist-scrollbar-background-middle.png"; 
				_s.scrBkBottomPath_str = _s.skinPath_str + "playlist-scrollbar-background-bottom.png"; 
				_s.scrDragMiddlePath_str = _s.skinPath_str + "playlist-scrollbar-drag-middle.png"; 
				_s.scrDragBottomPath_str = _s.skinPath_str + "playlist-scrollbar-drag-top.png"; 
				_s.scrLinesSPath_str = _s.skinPath_str + "playlist-scrollbar-lines-over.png";
				
				_s.playlistPlayButtonN_str = _s.skinPath_str + "playlist-play-button.png"; 
				_s.playlistPlayButtonS_str = _s.skinPath_str + "playlist-play-button-over.png"; 
				_s.playlistPauseButtonN_str = _s.skinPath_str + "playlist-pause-button.png"; 
				_s.playlistPauseButtonS_str = _s.skinPath_str + "playlist-pause-button-over.png"; 
			}
			
			if(_s.showSearchBar_bl && !_s.useVectorIcons){
				_s.skinPaths_ar.push(
					{img:_s.sortAN_img = new Image(), src:_s.skinPath_str + "sort-alphabetical-button.png"},
					{img:_s.sortNN_img = new Image(), src:_s.skinPath_str + "sort-numerical-button.png"},
					{img:_s.ascendingN_img = new Image(), src:_s.skinPath_str + "ascending-button.png"},
					{img:_s.decendingN_img = new Image(), src:_s.skinPath_str + "descending-button.png"}
				);
			}

			_s.sortASPath_str = _s.skinPath_str + "sort-alphabetical-button-over.png"; 
			_s.sortNSPath_str = _s.skinPath_str + "sort-numerical-button-over.png"; 
			_s.ascendingSpath_str = _s.skinPath_str + "ascending-button-over.png"; 
			_s.decendingSpath_str = _s.skinPath_str + "descending-button-over.png";
			_s.inputArrowPath_str = _s.skinPath_str + "input-arrow.png";  
			
			if(_s.showPlaylistsButtonAndPlaylists_bl && !_s.useVectorIcons){
				_s.skinPaths_ar.push(
				    {img:_s.catNextN_img = new Image(), src:_s.skinPath_str + "categories-next-button.png"},
				    {img:_s.catPrevN_img = new Image(), src:_s.skinPath_str + "categories-prev-button.png"},
				    {img:_s.catCloseN_img = new Image(), src:_s.skinPath_str + "categories-close-button.png"}
				);
			}

			_s.catBkPath_str = _s.skinPath_str + "categories-background.png"; 
			_s.catThumbBkPath_str = _s.skinPath_str + "categories-thumbnail-background.png"; 
			_s.catThumbBkTextPath_str = _s.skinPath_str + "categories-thumbnail-text-backgorund.png"; 
			_s.catNextSPath_str = _s.skinPath_str + "categories-next-button-over.png"; 
			_s.catNextDPath_str = _s.skinPath_str + "categories-next-button-disabled.png";
			_s.catPrevSPath_str = _s.skinPath_str + "categories-prev-button-over.png"; 
			_s.catPrevDPath_str = _s.skinPath_str + "categories-prev-button-disabled.png"; 
			_s.catCloseSPath_str = _s.skinPath_str + "categories-close-button-over.png"; 
			
			
			if(_s.showShareButton_bl && !_s.useVectorIcons){
				
				_s.skinPaths_ar.push(
					{img:_s.shareClooseN_img = new Image(), src:_s.skinPath_str + "embed-close-button.png"},
					{img:_s.facebookN_img = new Image(), src:_s.skinPath_str + "facebook.png"},
					{img:_s.googleN_img = new Image(), src:_s.skinPath_str + "google-plus.png"},
					{img:_s.twitterN_img = new Image(), src:_s.skinPath_str + "twitter.png"},
					{img:_s.likedInkN_img = new Image(), src:_s.skinPath_str + "likedin.png"},
					{img:_s.bufferkN_img = new Image(), src:_s.skinPath_str + "buffer.png"},
					{img:_s.diggN_img = new Image(), src:_s.skinPath_str + "digg.png"},
					{img:_s.redditN_img = new Image(), src:_s.skinPath_str + "reddit.png"},
					{img:_s.thumbrlN_img = new Image(), src:_s.skinPath_str + "thumbrl.png"}
				);
				
				_s.facebookSPath_str = _s.skinPath_str + "facebook-over.png";
				_s.googleSPath_str = _s.skinPath_str + "google-plus-over.png";
				_s.twitterSPath_str = _s.skinPath_str + "twitter-over.png";
				_s.likedInSPath_str = _s.skinPath_str + "likedin-over.png";
				_s.bufferSPath_str = _s.skinPath_str + "buffer-over.png";
				_s.diggSPath_str = _s.skinPath_str + "digg-over.png";
				_s.redditSPath_str = _s.skinPath_str + "reddit-over.png";
				_s.thumbrlSPath_str = _s.skinPath_str + "thumbrl-over.png";
			}
			_s.embedWindowClosePathS_str = _s.skinPath_str + "embed-close-button-over.png";
			
			if(_s.showPlaybackRateButton_bl && !_s.useVectorIcons){
				
				_s.skinPaths_ar.push(
					{img:_s.playbackRateWindowClooseN_img = new Image(), src:_s.skinPath_str + "embed-close-button.png"}
				);
				
				_s.playbackRateClosePathS_str = _s.skinPath_str + "embed-close-button-over.png";
			}
		
			_s.totalGraphics = _s.skinPaths_ar.length;
			_s.loadSkin();
		};
		

		//####################################//
		/* Preloader load done! */
		//###################################//
		_s.onPreloaderLoadHandler = function(){
			setTimeout(function(){
				_s.dispatchEvent(FWDRAPAudioData.PRELOADER_LOAD_DONE);
			}, 50);
		};
		

		//####################################//
		/* load buttons graphics */
		//###################################//
		_s.loadSkin = function(){
			var img;
			var src;
			for(var i=0; i<_s.totalGraphics; i++){
				img = _s.skinPaths_ar[i].img;
				src = _s.skinPaths_ar[i].src;
				img.onload = _s.onSkinLoadHandler;
				img.onerror = _s.onSkinLoadErrorHandler;
				img.src = src;
			}
		};
		
		_s.onSkinLoadHandler = function(e){
			_s.countLoadedSkinImages++;
			if(_s.countLoadedSkinImages == _s.totalGraphics){
				setTimeout(function(){
					_s.dispatchEvent(FWDRAPAudioData.SKIN_LOAD_COMPLETE);
				}, 50);
			}
		};
		
		_s.onSkinLoadErrorHandler = function(e){
			if (FWDRAPUtils.isIEAndLessThen9){
				message = "Graphics image not found!";
			}else{
				message = "The skin icon with label <font color='#FF0000'>" + e.target.src + "</font> can't be loaded, check path!";
			}
			
			if(window.console) console.log(e);
			var err = {text:message};
			setTimeout(function(){
				_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, err);
			}, 50);
		};
		

		//####################################//
		/* show error if a required property is not defined */
		//####################################//
		_s.showPropertyError = function(error){
			_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"The property called <font color='#FF0000'>" + error + "</font> is not defined."});
		};
		
		_s.downloadMp3 = function(sourcePath, pName){
			
			if(document.location.protocol == "file:"){
				_s.isPlaylistDispatchingError_bl = true;
				_s.showLoadPlaylistErrorId_to = setTimeout(function(){
					_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Downloading mp3 files local is not allowed or possible!. To function properly please test online."});
					_s.isPlaylistDispatchingError_bl = false;
				}, 50);
				return;
			}
			
			var defaultSourcePath = sourcePath;
			var path1 = location.origin;
			var path2 = location.pathname;
		
			if(path2.indexOf(".") != -1){
				path2 = path2.substr(0, path2.lastIndexOf("/") + 1);
			}
			
			var hasHTTPorHTTPS_bl = sourcePath.indexOf("http:") == -1 && sourcePath.indexOf("https:") == -1;
		
			
			if(hasHTTPorHTTPS_bl){
				sourcePath = path1 + path2 + sourcePath;
			}
	
			if(!pName) return;
		
			pName = pName.replace(/[^A-Z0-9\-\_\.]+/ig, "_");
			var ext = '.mp3';
			if((/\.m4a$/i).test(sourcePath))  ext= '.m4a';
			if(!(/\.(mp3)$/i).test(pName)) pName+= ext;
			
			sourcePath = sourcePath;
		
			var url = _s.mp3DownloaderPath_str;
			if(!_s.dlIframe){
				_s.dlIframe = document.createElement("IFRAME");
				_s.dlIframe.style.display = "none";
				document.documentElement.appendChild(_s.dlIframe);
			}
			
			if(_s.isMbl && FWDRAPUtils.isIOS){
			
				var email = _s.getValidEmail();
				if(!email) return;
				
				if(_s.emailXHR != null){
					try{_s.emailXHR.abort();}catch(e){}
					_s.emailXHR.onreadystatechange = null;
					_s.emailXHR.onerror = null;
					_s.emailXHR = null;
				}
				
				_s.emailXHR = new XMLHttpRequest();
				
				_s.emailXHR.onreadystatechange = function(e){
					if(_s.emailXHR.readyState == 4){
						if(_s.emailXHR.status == 200){
							if(_s.emailXHR.responseText == "sent"){
								alert("Email sent.");
							}else{
								alert("Error sending email, _s is a server side error, the php file can't send the email!");
							}
							
						}else{
							alert("Error sending email: " + _s.emailXHR.status + ": " + _s.emailXHR.statusText);
						}
					}
				};
				
				_s.emailXHR.onerror = function(e){
					try{
						if(window.console) console.log(e);
						if(window.console) console.log(e.message);
					}catch(e){};
					alert("Error sending email: " + e.message);
				};

				_s.emailXHR.open("get", _s.mailPath_str + "?mail=" + email + "&name=" + pName + "&path=" + sourcePath, true);
				_s.emailXHR.send();
				return;
			}
		
			if(sourcePath.indexOf("soundcloud.com") != -1){
				_s.dlIframe.src = sourcePath;
			}else{
				_s.dlIframe.src = url + "?path="+ sourcePath +"&name=" + pName;
			}
		};
		
		_s.getValidEmail = function(){
			var email = prompt("Please enter your email address where the mp3 download link will be sent:");
			var emailRegExp = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		
			while(!emailRegExp.test(email) || email == ""){
				if(email === null) return;
				email = prompt("Please enter a valid email address:");
			}
			return email;
		};
		
		
		//####################################//
		/* load playlist */
		//####################################//
		_s.ID3Loaded = false;
		_s.loadPlaylist = function(id){
			if(_s.isPlaylistDispatchingError_bl) return;
			
			clearTimeout(_s.dispatchPlaylistLoadCompleteWidthDelayId_to);
			var source =  _s.cats_ar[id].source;
			_s.playlistId = id;

			if(!source){
				_s.isPlaylistDispatchingError_bl = true;
				_s.showLoadPlaylistErrorId_to = setTimeout(function(){
					_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"<font color='#FF0000'>loadPlaylist()</font> - Please specify an html elementid, podcast link, soudcloud link or xml path"});
					_s.isPlaylistDispatchingError_bl = false;
				}, 50);
				return;
			}
			
			if(!isNaN(source)){
				_s.isPlaylistDispatchingError_bl = true;
				_s.showLoadPlaylistErrorId_to = setTimeout(function(){
					_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"<font color='#FF0000'>loadPlaylist()</font> - The parameter must be of type string!"});
					_s.isPlaylistDispatchingError_bl = false;
				}, 50);
				return;
			}
			
			_s.closeData();
			_s.resetYoutubePlaylistLoader();
			_s.isYoutbe_bl = false;
			
			if(source.indexOf("soundcloud.com") != -1){
				if(_s.plsCache_ar[_s.playlistId]){
					_s.playlist_ar = _s.plsCache_ar[_s.playlistId]
					_s.loadSoundCloudComplete();
				}else{
					_s.startToLoadSoundCloudList(source);	
				}
			}else if(source.indexOf("hubhopper.") != -1){
				_s.loadHubhopperPlaylist(source);	
			}else if(source.indexOf("list=") != -1 && _s.useYoutube_bl){
				_s.isYoutbe_bl = true;
				if(_s.plsCache_ar[_s.playlistId]){
					_s.playlist_ar = _s.plsCache_ar[_s.playlistId]
					_s.youtubePlLoadComplete();
				}else{
					_s.loadYoutubePlaylist(source);
				}
			}else if(source.indexOf("folder:") != -1){
				if(!_s.ID3Loaded){
					var script = document.createElement('script');
					script.src = _s.mainFolderPath_str + 'java/FWDRAPID3.js';
					document.head.appendChild(script);
					script.onerror = function(){
						var err = 'ID3 library named <font color="#FF0000">FWDRAPID3.js</font> is not found. Please make sure that the content folder contains the java folder that contains the <font color="#FF0000">FWDRAPID3.js</font> file.';
						_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:err});
						return;
					}
					
					script.onload = function () {
						_s.ID3Loaded = true;
						_s.loadPlaylist(_s.playlistId);
					}					
				}
				_s.loadFolderPlaylist(source);
			}else if(source.indexOf(".xml") != -1
			  || source.indexOf("/rss") != -1
			  || source.indexOf("http:") != -1
			  || source.indexOf("https:") != -1
			  || source.indexOf("www.") != -1
			){
				_s.loadXMLPlaylist(source);
			}else{
				_s.parseDOMPlaylist(source);	
			}
			_s.prevId = id;
		};

		
		//##########################################//
		/* load youtube list */
		//##########################################//
		_s.loadYoutubePlaylist = function(url){
			if(_s.isPlaylistDispatchingError_bl && !_s.isYoutbe_bl) return;
			
			if(!_s.youtubeUrl_str){
				url = url.substr(url.indexOf("=") + 1);
				_s.youtubeUrl_str = url;
			}
		
			_s.loadFromFolder_bl = true;
			
			if(_s.nextPageToken_str){
				_s.sourceURL_str = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&pageToken=" + _s.nextPageToken_str + "&playlistId=" + _s.youtubeUrl_str + "&key=" + _s.ytbAPiKey + "&maxResults=50&callback=" + prt.instanceName_str + "._d.parseYoutubePlaylist";
			}else{
				_s.sourceURL_str = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=" + _s.youtubeUrl_str + "&key=" + _s.ytbAPiKey + "&maxResults=50&callback=" + prt.instanceName_str + "._d.parseYoutubePlaylist";
			}

			try{
				_s.head.removeChild(_s.scs_el);
				_s.scs_el = null;
			}catch(e){}
			
			
			try{
				_s.scs_el = document.createElement('script');
				_s.scs_el.src = _s.sourceURL_str;
				_s.scs_el.id = prt.instanceName_str + "youtube";
				_s.head.appendChild(_s.scs_el);
			}catch(e){}
			
			_s.JSONPRequestTimeoutId_to = setTimeout(_s.JSONPRequestTimeoutError, 6000);
		
		};
		
		_s.JSONPRequestTimeoutError = function(){
			_s.closeData();
			_s.isPlaylistDispatchingError_bl = true;
			_s.showLoadPlaylistErrorId_to = setTimeout(function(){
				_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Error loading youtube playlist!<font color='#ff0000'>" + _s.youtubeUrl_str + "</font>"});
				_s.isPlaylistDispatchingError_bl = false;
			}, 50);
			return;
		};
		
		_s.resetYoutubePlaylistLoader = function(){
			_s.isYoutbe_bl = false;
			_s.youtubeObject_ar = null;
			_s.nextPageToken_str = null;
			_s.youtubeUrl_str = null;
		};
		
		_s.parseYoutubePlaylist = function(object){
			
			if(_s.isPlaylistDispatchingError_bl || !_s.isYoutbe_bl) return;
			
			if(object.error){
				_s.JSONPRequestTimeoutError();
				if(console) console.dir(object);
				return;
			}
			
			_s.playlist_ar = [];
			var tt;
			var item;
			var videoSource;
			
			if(!_s.youtubeObject_ar){
				_s.youtubeObject_ar = [];
			}
			
			for(var i=0; i<object.items.length; i++){
				_s.youtubeObject_ar.push(object.items[i]);
			}
			
			tt = _s.youtubeObject_ar.length;
			
			_s.closeData();
			
			if(object.nextPageToken && tt < _s.maxPlaylistItems){
				_s.nextPageToken_str = object.nextPageToken;
				_s.loadYoutubePlaylist();
				return;
			}
			
			for(var i=0; i< tt; i++){
				if(i > _s.maxPlaylistItems - 1) break;
				
				var obj = {};
				item = _s.youtubeObject_ar[i];
				
				obj.source = item.snippet.resourceId.videoId;
				obj.buy = undefined;
				var count = "";
				if(_s.showTracksNumbers_bl){
					if(i<9) count = "0";
					count = count + (i + 1) + ". ";
					obj.title = count + "<span span class=\"fwdrap-title\">" + item.snippet.title + "</span>" ;
				}else{
					obj.title = "<span span class=\"fwdrap-title\">" + item.snippet.title + "</span>" ;
				}
				obj.titleText = item.snippet.title;
				
				obj.title = obj.title.replace(/\(Official Video\)/gi, "");
				obj.title = obj.title.replace(/\( Official Video \)/gi, "");
				obj.title = obj.title.replace(/Official Video/gi, "");
			
				obj.downloadable = false;
				try{
					obj.thumbPath = item.snippet.thumbnails["default"].url;
				}catch(e){}
				obj.posterSource =  "none";
				
				if(item.snippet.title.indexOf("eleted video") == -1 && item.snippet.title.indexOf("his video is unavailable") == -1){
					_s.playlist_ar.push(obj);
				}
			}
			_s.plsCache_ar[_s.playlistId] = _s.playlist_ar;
			_s.youtubePlLoadComplete();
		}

		if(_s.inversePlaylist){
			_s.playlist_ar.reverse();
		}

		_s.youtubePlLoadComplete = function(){
			clearTimeout(_s.dispatchPlaylistLoadCompleteWidthDelayId_to);
			_s.dispatchPlaylistLoadCompleteWidthDelayId_to = setTimeout(function(){
				_s.dispatchEvent(FWDRAPAudioData.PLAYLIST_LOAD_COMPLETE);
			}, 50);
			
			_s.isDataLoaded_bl = true;
		}


		//##########################################//
		/* load soundcloud track */
		//##########################################//
		_s.startToGetSoundcloudUrl = function(url){
			_s.scId = 0;
			_s.originalURL_str = url;
			_s.getSoundcloudUrl(url);
		}
		
		_s.getSoundcloudUrl = function(url){
			if(_s.isPlaylistDispatchingError_bl) return;
			
			try{
				_s.closeJsonPLoader();
			}catch(e){}

			var url;
			_s.scClientId = _s.sc_ar[_s.scId];
			if(_s.hasGoodKey){
				_s.scId = 0;
				_s.scClientId = _s.hasGoodKey;
			}
			
			_s.sourceURL_str = url;
			if(_s.sourceURL_str.indexOf("likes") != -1){
				_s.sourceURL_str =  _s.sourceURL_str.replace(/\/likes$/, "/favorites");
			}
			url = "https://api.soundcloud.com/resolve?format=json&url=" + _s.sourceURL_str + "&limit=100" + "&client_id=" + _s.scClientId;
			_s.isSCTrack = true;
			
			_s.loadFromFolder_bl = false;
			_s.sourceURL_str = url;
			_s.xhr = new XMLHttpRequest();
			_s.xhr.onreadystatechange = _s.ajaxOnLoadHandler;
			_s.xhr.onerror = _s.ajaxOnErrorHandler;

			try{
				_s.xhr.open("GET", _s.sourceURL_str, true);
				_s.xhr.send();
			}catch(e){
				var message = e;
				if(e){if(e.message)message = e.message;}
				_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"SoundCloud track can't be loaded! <font color='#FF0000'>" + _s.sourceURL_str + "</font>. " + message, doNotResize:false});
			}
		};

		_s.checkSoundCloudTrackError = function(fErr){
			_s.scId ++;
			
			if(_s.scId == _s.sc_ar.length || fErr){
				_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"SoundCloud track can't be loaded! <font color='#FF0000'>" + _s.originalURL_str + "</font>.", doNotResize:false});
				return;
			}
			_s.getSoundcloudUrl(_s.originalURL_str);
		}

		_s.parseSoundCloudURL = function(object){
			_s.closeJsonPLoader();
			
			var source;

			if(object["stream_url"]){
				source = object["stream_url"] + "?consumer_key=" + _s.scClientId;

				_s.xhr = new XMLHttpRequest();
				_s.xhr.onreadystatechange = function(e){
					if(_s.xhr.readyState == 4){
						if(_s.xhr.responseText.indexOf('error') != -1){
							_s.checkSoundCloudTrackError();
						}else{
							_s.hasGoodKey = _s.scClientId;
							_s.dispatchEvent(FWDRAPAudioData.SOUNDCLOUD_TRACK_READY, {source:source});
						}
					}
				}
			
				try{
					_s.xhr.open("GET", source, true);
					_s.xhr.send();
				}catch(e){}
			}else{
				_s.loadSoundcloudTrackError();
			}
		}
		
		_s.loadSoundcloudTrackError = function(){
			_s.closeJsonPLoader();
			_s.isPlaylistDispatchingError_bl = true;
			_s.showLoadPlaylistErrorId_to = setTimeout(function(){
				_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Error loading soundcloud track url!<font color='#FF0000'>" + _s.sourceURL_str + "</font>"});
				_s.isPlaylistDispatchingError_bl = false;
			}, 50);
			return;
		};
		

		//##########################################//
		/* load soundcloud list */
		//##########################################//
		_s.startToLoadSoundCloudList = function(url){
			_s.scId = 0;
			_s.originalURL_str = url;
			_s.loadSoundCloudList(url);
		}

		_s.loadSoundCloudList = function(url){
			if(_s.isPlaylistDispatchingError_bl) return;
			var url;
			_s.scClientId_str = _s.sc_ar[_s.scId];
			
			_s.closeXHR();
			_s.isSClist = true;
			
			_s.sourceURL_str = url;
			
			if(_s.sourceURL_str.indexOf("likes") != -1){
				_s.sourceURL_str =  _s.sourceURL_str.replace(/\/likes$/, "/favorites");
			}

			if(_s.sourceURL_str.indexOf("api.soundcloud.") == -1){
				url = "https://api.soundcloud.com/resolve?format=json&url=" + _s.sourceURL_str + "&limit=200" + "&client_id=" + _s.scClientId_str;
			}else{
				url = _s.sourceURL_str + "?format=json&client_id=" + _s.scClientId_str  + "&limit=200";
			}

			_s.loadFromFolder_bl = false;
			_s.sourceURL_str = url;
			_s.xhr = new XMLHttpRequest();
			_s.xhr.onreadystatechange = _s.ajaxOnLoadHandler;
		
			try{
				_s.xhr.open("GET", _s.sourceURL_str, true);
				_s.xhr.send();
			}catch(e){
				var message = e;
				if(e){if(e.message)message = e.message;}
				_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"SoundCloud playlist can't be loaded! <font color='#FF0000'>" + _s.sourceURL_str + "</font>. " + message });
			}
		};

		_s.checkSoundCloudListError = function(fErr){
			_s.scId ++;	
			if(_s.scId == _s.sc_ar.length || fErr){
				_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"SoundCloud playlist can't be loaded! <font color='#FF0000'>" + _s.originalURL_str + "</font>."});
				return;
			}
			_s.loadSoundCloudList(_s.originalURL_str);
		}
		
		_s.JSONPSoundcloudRequestTimeoutError = function(){
			_s.isPlaylistDispatchingError_bl = true;
			_s.showLoadPlaylistErrorId_to = setTimeout(function(){
				_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Error loading soundcloud url!<font color='#FF0000'>" + _s.sourceURL_str + "</font>"});
				_s.isPlaylistDispatchingError_bl = false;
			}, 50);
			return;
		};
	

		//#########################################//
		/* Icecast radio */
		//########################################//
		_s.startLoadingIcecast =  function(p){
			_s.originalSourceURL_str = p;
			_s.icecastReady = false;
			_s.useCors = 0;
			_s.closeJsonPLoader();
			_s.getIcecastRadioNameAndStream(p, false);
		}

		_s.startToUpdateIcecastName = function(){
			_s.closeJsonPLoader();
			_s.getIcecastRadioNameAndStream(_s.sourceURL_str, true);
		}
	
		_s.getIcecastRadioNameAndStream = function(url, updateTitle){
			
			if(_s.isPlaylistDispatchingError_bl) return;
			
			_s.sourceURL_str = url;
			
			if(_s.sourceURL_str.substr(_s.sourceURL_str.length - 1) == "/"){
				_s.sourceURL_str = _s.sourceURL_str.substr(0, _s.sourceURL_str.length - 1);
			}
			
			if(_s.sourceURL_str.substr(_s.sourceURL_str.length - 1) != "/"){
				_s.sourceURL_str += "/"
			}

			var proxyCors = '';
			if(_s.useCors == 1) proxyCors = _s.proxyCors;
			url = proxyCors + _s.sourceURL_str + "status-json.xsl";
			
			_s.originalSourceURL_str = _s.sourceURL_str;
			_s.icecastxmlHttp = new XMLHttpRequest();
			_s.icecastxmlHttp.onerror = _s.parseRadioErrorURL;
			_s.icecastxmlHttp.onreadystatechange = function() { 
				if (_s.icecastxmlHttp.readyState == 4 && _s.icecastxmlHttp.status == 200){
					_s.parseIcecastRadioURL(_s.icecastxmlHttp.responseText);
				}
			}
			_s.icecastxmlHttp.open("GET", url, true); // true for asynchronous 
			_s.icecastxmlHttp.send(null);
			
			if(!updateTitle){
				clearTimeout(_s.JSONPRequestTimeoutId_to);
				_s.JSONPRequestTimeoutId_to = setTimeout(_s.parseRadioErrorURL, 5000);
			}
		};
		
		_s.parseIcecastRadioURL = function(object){
			
			if(_s.sourceURL_str.substr(_s.sourceURL_str.length - 1) == "/"){
				_s.sourceURL_str = _s.sourceURL_str.substr(0, _s.sourceURL_str.length - 1);
			}
			
			object = JSON.parse(object);
			_s.closeJsonPLoader();

			var proxyCors = '';
			if(_s.useCors == 1) proxyCors = _s.proxyCors;
			
			if(object.icestats.source[0]){
				var source = proxyCors + object.icestats.source[0].listenurl;
				var songTitle = object.icestats.source[0].title;
			}else{
				var source = proxyCors + object.icestats.source.listenurl;
				var songTitle = object.icestats.source.title;
				
			}

			if(!songTitle) songTitle = "";
		
			
			if(object.icestats.source[0]){
				var infoWindowStr =  "<span class='" + _s.stationLabelClassName + "'>Station title:</span>" + "<span class='" + _s.stationClassName  + "'> " + object.icestats.source[0]['server_name'] + " </span>&nbsp;&nbsp;&nbsp;&nbsp;" + "<span class='" + _s.genreLabelClassName + "'>Genre:</span>" + "<span class='" + _s.genreClassName  + "'> " + object.icestats.source[0]['genre'] + " </span>&nbsp;&nbsp;&nbsp;&nbsp;" + "<span class='" + _s.currentListenersLabelClassName + "'>Current listeners:</span>" + "<span class='" + _s.currentListenersClassName  + "'> " + object.icestats.source[0]['listeners'] + " </span>&nbsp;&nbsp;&nbsp;&nbsp;" +  "<span class='" + _s.bitrateLabelClassName + "'>Bitrate:</span>" + "<span class='" + _s.bitrateClassName  + "'> " + object.icestats.source[0]['bitrate'] + " </span>&nbsp;&nbsp;&nbsp;&nbsp;"
			}else{
				var infoWindowStr =  "<span class='" + _s.stationLabelClassName + "'>Station title:</span>" + "<span class='" + _s.stationClassName  + "'> " + object.icestats.source['server_name'] + " </span>&nbsp;&nbsp;&nbsp;&nbsp;" + "<span class='" + _s.genreLabelClassName + "'>Genre:</span>" + "<span class='" + _s.genreClassName  + "'> " + object.icestats.source['genre'] + " </span>&nbsp;&nbsp;&nbsp;&nbsp;" + "<span class='" + _s.currentListenersLabelClassName + "'>Current listeners:</span>" + "<span class='" + _s.currentListenersClassName  + "'> " + object.icestats.source['listeners'] + " </span>&nbsp;&nbsp;&nbsp;&nbsp;" +  "<span class='" + _s.bitrateLabelClassName + "'>Bitrate:</span>" + "<span class='" + _s.bitrateClassName  + "'> " + object.icestats.source['bitrate'] + " </span>&nbsp;&nbsp;&nbsp;&nbsp;"
			}
		
			_s.dispatchEvent(FWDRAPAudioData.RADIO_TRACK_READY, {source:source, songTitle:songTitle});
			
			_s.updateRadioTitleId_to = setTimeout(function(){
				if(prt.isIcecast_bl){
					_s.startToUpdateIcecastName();
				}
			}, 5000)
			
			var df = songTitle;
			var artsist = df.substr(0, df.indexOf("-") - 1);
			var song = df.substr(df.indexOf("-") + 2);
			_s.getImage(artsist, song);
		}
		

		//#########################################//
		/* Shoutcast radio */
		//########################################//
		_s.startLoadingShoutcast =  function(p){
			_s.originalSourceURL_str = p;
			_s.shoutcastReady = false;
			_s.useCors = 0;
			_s.closeJsonPLoader();
			_s.getShoutcastRadioNameAndStream(p, false);
		}

		_s.startToUpdateShoutcast = function(){
			_s.closeJsonPLoader();
			_s.getShoutcastRadioNameAndStream(_s.sourceURL_str, true);
		}

		_s.getShoutcastRadioNameAndStream = function(url, updateTitle){
			
			if(_s.isPlaylistDispatchingError_bl) return;
			
			_s.sourceURL_str = url;

			if(_s.sourceURL_str.substr(_s.sourceURL_str.length - 1) == "/"){
				_s.sourceURL_str = _s.sourceURL_str.substr(0, _s.sourceURL_str.length - 1);
			}

			var proxyCors = '';
			if(_s.useCors == 1) proxyCors = _s.proxyCors;
			url = proxyCors + _s.sourceURL_str + "/stats?sid=1&json=1&callback=" + prt.instanceName_str + "._d.parseShoutcastRadioURL";
			
			try{
				_s.head.removeChild(_s.scs_el);
				_s.scs_el = null;
			}catch(e){}

			_s.scs_el = document.createElement('script');
			_s.scs_el.src = url;
			_s.scs_el.id = prt.instanceName_str + "_shoutcast";
			_s.scs_el.onerror = _s.parseRadioErrorURL;
			_s.head.appendChild(_s.scs_el);
			
			if(!updateTitle){
				clearTimeout(_s.JSONPRequestTimeoutId_to);
				_s.JSONPRequestTimeoutId_to = setTimeout(_s.parseRadioErrorURL, 5000);
			} 
		};

		_s.parseRadioErrorURL = function(){	
			if(!prt.isShoutcast_bl && !prt.isIcecast_bl){
				_s.closeJsonPLoader();
				 return;
			}
			
			if(_s.useCors == 0){
				_s.useCors ++;
				if(prt.isIcecast_bl){
					_s.getIcecastRadioNameAndStream(_s.sourceURL_str, false);
				}else{
					_s.getShoutcastRadioNameAndStream(_s.sourceURL_str, false);
				}
				return;
			}

			_s.closeJsonPLoader();
			
			_s.isPlaylistDispatchingError_bl = true;
			_s.showLoadPlaylistErrorId_to = setTimeout(function(){
				_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Error loading radio track <font color='#FF0000'>" + _s.sourceURL_str + "</font>"});
				_s.isPlaylistDispatchingError_bl = false;
			}, 50);
			if(prt.isShoutcast_bl) _s.startToUpdateShoutcast();
		};
		
		_s.parseShoutcastRadioURL = function(object){
			
			if(!prt.isShoutcast_bl && !prt.isIcecast_bl) return;
			_s.closeJsonPLoader();
			
			var source;
			
			if(object["streampath"]){
				_s.shoutcastReady = true;
				var proxyCors = '';
				if(_s.useCors == 1) proxyCors = _s.proxyCors;

				source = proxyCors + _s.sourceURL_str + object["streampath"];
				if(object["streampath"] == "/") source += "/";
				var songTitle = object["songtitle"];
				
				var infoWindowStr =  "<span class='" + _s.stationLabelClassName + "'>Station title:</span>" + "<span class='" + _s.stationClassName  + "'> " + object['servertitle'] + " </span>&nbsp;&nbsp;&nbsp;&nbsp;" + "<span class='" + _s.genreLabelClassName + "'>Genre:</span>" + "<span class='" + _s.genreClassName  + "'> " + object['servergenre'] + " </span>&nbsp;&nbsp;&nbsp;&nbsp;" + "<span class='" + _s.currentListenersLabelClassName + "'>Current listeners:</span>" + "<span class='" + _s.currentListenersClassName  + "'> " + object['currentlisteners'] + " </span>&nbsp;&nbsp;&nbsp;&nbsp;" +  "<span class='" + _s.bitrateLabelClassName + "'>Bitrate:</span>" + "<span class='" + _s.bitrateClassName  + "'> " + object['bitrate'] + " </span>&nbsp;&nbsp;&nbsp;&nbsp;"
				
				var artsist = songTitle.substr(0, songTitle.indexOf("-") - 1);
				var song = songTitle.substr(songTitle.indexOf("-") + 2);
				
				_s.getImage(artsist, song);
				_s.dispatchEvent(FWDRAPAudioData.RADIO_TRACK_READY, {source:source, songTitle:songTitle});
				
				_s.updateRadioTitleId_to = setTimeout(function(){
					if(prt.isShoutcast_bl){
						_s.startToUpdateShoutcast();
					}
				}, 5000)
				
			}else{
				_s.parseRadioErrorURL();
			}
		}
		
		_s.getImage =  function(artist, song){
			if(!prt.isShoutcast_bl && !prt.isIcecast_bl) return;
			artist = encodeURI(artist);
            song = encodeURI(song);	
           
            var url = "https://itunes.apple.com/search?type=jsonp&term==" + artist + "-" + song + "&media=music&limit=1&callback=" + prt.instanceName_str + "._d.parseImage";
			
			try{
				document.documentElement.removeChild(_s.scs3_el);
			}catch(e){}
			
			try{
				_s.scs3_el = document.createElement('script');
				_s.scs3_el.src = url;
				document.documentElement.appendChild(_s.scs3_el);
			}catch(e){}
		}
		
		_s.parseImage = function(object){
			if(!object["results"]) return;
			if(!object["results"][0]) return;
			_s.dispatchEvent(FWDRAPAudioData.UPDATE_IMAGE, {image:object["results"][0]["artworkUrl100"]});
		}
		
		_s.updateRadioName = function(){}
		
		_s.closeJsonPLoader = function(){
			
			_s.isSCTrack = false;
			_s.isSClist = false;
			_s.isLoadingShoutcast_bl = false;
			_s.isLoadingIcecast_bl = false;
			clearTimeout(_s.JSONPRequestTimeoutId_to);
			clearTimeout(_s.updateRadioTitleId_to);
			try{
				_s.icecastxmlHttp.abort();
			}catch(e){}
			_s.icecastxmlHttp = null;
			
			try{
				_s.shoutcastxmlHttp.abort();
			}catch(e){}
			_s.shoutcastxmlHttp = null;
			
			try{
				document.documentElement.removeChild(_s.scs_el);
			}catch(e){}
			
			try{
				document.documentElement.removeChild(_s.scs2_el);
			}catch(e){}
			
			try{
				document.documentElement.removeChild(_s.scs3_el);
			}catch(e){}
			
		};

		_s.loadHubhopperPlaylist = function(url){
			_s.closeXHR();
			var match1 = url.match(/\/(\d)+(\/)?/g)[0];
			var pId = match1.match(/\d+/)[0];
			
			_s.loadFromFolder_bl = false;
			_s.sourceURL_str = url;
			_s.xhr = new XMLHttpRequest();
			_s.xhr.onreadystatechange = _s.ajaxOnLoadHandler;
			_s.xhr.onerror = _s.ajaxOnErrorHandler2;

			_s.xhr.open("get", 'https://nwb3zg07k1.execute-api.ap-south-1.amazonaws.com/v4/podcasts/' + pId + '/episodes?pageSize=' + _s.maxPlaylistItems + "&rand=" + parseInt(Math.random() * 99999999), true);
			_s.xhr.setRequestHeader("x-api-key",  _s.hubhopperAPIKey);
			_s.xhr.send();

			_s.showLoadPlaylistErrorId_to = setTimeout(function(){
				_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Error loading : <font color='#FF0000'>" + _s.sourceURL_str + "</font>, Invalid API key."});
				_s.isPlaylistDispatchingError_bl = false;
			}, 10000);

		}
		_s.ajaxOnErrorHandler2 = function(e){
			try{
				if(window.console) console.log(e);
				if(window.console) console.log(e.message);
			}catch(e){};
			_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Error loading : <font color='#FF0000'>" + _s.sourceURL_str + "</font>"});
		};
	
		
		//#######################################//
		/* load XML playlist (warning _s will will work only online on a web server,
		 *  it is not working local!) */
		//######################################//
		_s.loadXMLPlaylist = function(url){
			if(_s.isPlaylistDispatchingError_bl) return;
			
			if(document.location.protocol == "file:" && url.indexOf("official.fm") == -1){
				_s.isPlaylistDispatchingError_bl = true;
				_s.showLoadPlaylistErrorId_to = setTimeout(function(){
					_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Loading XML files local is not allowed or possible!. To function properly please test online."});
					_s.isPlaylistDispatchingError_bl = false;
				}, 50);
				return;
			}
			
			_s.closeXHR();
			_s.loadFromFolder_bl = false;
			_s.sourceURL_str = url;
			_s.xhr = new XMLHttpRequest();
			_s.xhr.onreadystatechange = _s.ajaxOnLoadHandler;
			_s.xhr.onerror = _s.ajaxOnErrorHandler;
			
			try{
				_s.xhr.open("get", _s.proxyPath_str + "?url=" +  _s.sourceURL_str, true);
				_s.xhr.send();
			}catch(e){
				var message = e;
				if(e){if(e.message)message = e.message;}
				_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"XML file can't be loaded! <font color='#FF0000'>" + _s.sourceURL_str + "</font>. " + message });
			}
		};
		

		//#######################################//
		/* load folder1 */
		//######################################//
		_s.loadFolderPlaylist = function(url){
			if(_s.isPlaylistDispatchingError_bl) return;
			
			if(document.location.protocol == "file:" && url.indexOf("official.fm") == -1){
				_s.isPlaylistDispatchingError_bl = true;
				_s.showLoadPlaylistErrorId_to = setTimeout(function(){
					_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Creating a mp3 playlist from a folder is not allowed or possible local! To function properly please test online."});
					_s.isPlaylistDispatchingError_bl = false;
				}, 50);
				return;
			}	
			
			_s.closeXHR();
			_s.loadFromFolder_bl = true;
			_s.countID3 = 0;
			_s.sourceURL_str = url.substr(url.indexOf(":") + 1);
			_s.xhr = new XMLHttpRequest();
			_s.xhr.onreadystatechange = _s.ajaxOnLoadHandler;
			_s.xhr.onerror = _s.ajaxOnErrorHandler;
			
			try{
				_s.xhr.open("get", _s.proxyFolderPath_str + "?dir=" +  encodeURIComponent(_s.sourceURL_str) + "&rand=" + parseInt(Math.random() * 9999999), true);
				_s.xhr.send();
			}catch(e){
				var message = e;
				if(e){if(e.message)message = e.message;}
				_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Folder proxy file path is not found: <font color='#FF0000'>" + _s.proxyFolderPath_str + "</font>"});
			}
		};

		_s.ajaxOnLoadHandler = function(e){
			var response;
			var isXML = false;
		
			if(_s.xhr.readyState == 4){
				clearTimeout(_s.showLoadPlaylistErrorId_to);
				if(_s.xhr.status == 401){
					if(e.target.responseURL.indexOf('soundcloud.com/') != -1){
						if(_s.isSClist){
							_s.checkSoundCloudListError();
						}else if(_s.isSCTrack){
							_s.checkSoundCloudTrackError();
						}
					}
				}else if(_s.xhr.status == 404){
					if(_s.loadFromFolder_bl){
						_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Folder proxy file path is not found: <font color='#FF0000'>" + _s.proxyFolderPath_str + "</font>"});
					}else if(_s.isSClist){
						_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"SoundCloud playlist can't be loaded! <font color='#FF0000'>" + _s.originalURL_str + "</font>."});
					}else{
						_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Proxy file path is not found: <font color='#FF0000'>" + _s.proxyPath_str + "</font>"});
					}
				}else if(_s.xhr.status == 401){
					_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Error loading : <font color='#FF0000'>" + _s.sourceURL_str + "</font>."});
				}else if(_s.xhr.status == 408){
					_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Request load timeout!"});
				}else if(_s.xhr.status == 200){
					
					if(_s.xhr.responseText.indexOf("<b>Warning</b>:") != -1){
						_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Error loading folder: <font color='#FF0000'>" + _s.sourceURL_str + "</font>. Make sure that the folder path is correct!"});
						return;
					}

					if(window.JSON){
						response = JSON.parse(_s.xhr.responseText);
					}else{
						response = eval('('+ _s.xhr.responseText +')');
					}
					
					if(_s.xhr.responseText.indexOf('api.soundcloud.com') != -1){
						if(_s.isSCTrack){
							_s.parseSoundCloudURL(response);
						}else{
							_s.parseSoundCloud(response);
						}
						_s.isSCTrack = false;
					}else if(response.episodes){
						_s.parseHubhopper(response);
					}else if(response.channel){
						_s.parsePodcast(response);
					}else if(response.folder){
						_s.parseFolderJSON(response);
					}else if(response.li){
						_s.parseXML(response);
					}else if(response.error){//_s applies only with proxy (xml and poscast)
						_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Error loading file: <font color='#FF0000'>" + _s.sourceURL_str + "</font>. Make sure the file path (xml or podcast) is correct and well formatted!"});
					}
				}
			}
		};
		
		_s.ajaxOnErrorHandler = function(e){
			try{
				if(window.console) console.log(e);
				if(window.console) console.log(e.message);
			}catch(e){};
			if(_s.loadFromFolder_bl){
				_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Error loading file : <font color='#FF0000'>" + _s.proxyFolderPath_str + "</font>. Make sure the path is correct"});
			}else{
				_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Error loading : <font color='#FF0000'>" + _s.proxyPath_str + "</font>. Make sure the path is correct"});
			}
		};
		

		//#####################################//
		/* Parse soundcloud JSON */
		//####################################//
		_s.parseSoundCloud = function(object){
			_s.closeJsonPLoader();
			_s.playlist_ar = [];
			var obj;
			var track;
			var testUrl;
			
			if(object && object.uri){
				if(object.kind == "track"){
					_s.createSoundcloudPlaylist(object);
					return;
				}
				
				if(object.uri.indexOf("/tracks") == -1){
					testUrl = object.uri + "/tracks";
				}else{
					testUrl = object.uri + "/favorites";
				}
				
				_s.loadSoundCloudList(testUrl);
				return;
			}else if(object.length || object.kind == "track"){
				_s.createSoundcloudPlaylist(object);
			}else{
				_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Please provide a playlist or track URL : <font color='#FF0000'>" + _s.sourceURL_str + "</font>."});
			}
		};
		
		_s.createSoundcloudPlaylist = function(object){
			if(object.length){
				for(var i=0; i<object.length; i++){
					var track = object[i];
					var obj = {};
					obj.source = track["permalink_url"];
					obj.downloadPath = track["downloadable"] == true ? track["download_url"] + "?consumer_key=" + _s.scClientId_str : undefined;
					obj.downloadable = track["downloadable"];
					obj.buy = undefined;
					obj.thumbPath = track["artwork_url"];
					if(_s.showSoundCloudUserNameInTitle_bl){
						var count = "";
						if(_s.showTracksNumbers_bl){
							if(i<9) count = "0";
							count = count + (i + 1) + ". ";
							obj.title = count + "<span class=\"fwdrap-artist\">" + track["user"]["username"] + "</span>" + " - " + "<span class=\"fwdrap-title\">" + track["title"] + "</span>";
						}else{
							obj.title = "<span class=\"fwdrap-artist\">" + track["user"]["username"] + "</span>" + " - " + "<span class=\"fwdrap-title\">" + track["title"] + "</span>";
						}
						obj.titleText = track["user"]["username"] + " - " + track["title"];
					}else{
						var count = "";
						if(_s.showTracksNumbers_bl){
							if(i<9) count = "0";
							count = count + (i + 1) + ". ";
							obj.title = count + track["title"];
						}else{
							obj.title = track["title"];
						}
						obj.titleText = track["title"];
					}
					
					obj.duration = track["duration"];
					if(track["streamable"]) _s.playlist_ar.push(obj);
					if(i > _s.maxPlaylistItems - 1) break;
				}
			}else{
				track = object;
				obj = {};
				obj.source = track["stream_url"] + "?consumer_key=" + _s.scClientId_str;
				obj.downloadPath = track["downloadable"] == true ? track["download_url"] + "?consumer_key=" + _s.scClientId_str : undefined;
				obj.downloadable = track["downloadable"];
				obj.buy = undefined;
				obj.thumbPath = track["artwork_url"];
				if(_s.showSoundCloudUserNameInTitle_bl){
					obj.title = "<span style='font-weight:bold;'>" + track["user"]["username"] + "</span>" + " - " + track["title"];
					obj.titleText = track["user"]["username"] + " - " + track["title"];
				}else{
					obj.title = track["title"];
					obj.titleText = track["title"];
				}
				
				obj.duration = track["duration"];
				if(track["streamable"]) _s.playlist_ar.push(obj);
			}

			_s.plsCache_ar[_s.playlistId] = _s.playlist_ar;
			_s.loadSoundCloudComplete();
		};

		_s.loadSoundCloudComplete =  function(){
			if(_s.inversePlaylist) _s.playlist_ar.reverse();
			clearTimeout(_s.dispatchPlaylistLoadCompleteWidthDelayId_to);
			_s.dispatchPlaylistLoadCompleteWidthDelayId_to = setTimeout(function(){
				_s.dispatchEvent(FWDRAPAudioData.PLAYLIST_LOAD_COMPLETE);
			}, 50);
			
			_s.isDataLoaded_bl = true;
		}


		//####################################//
		/* parse Hubhopper JSON */
		//####################################//
		_s.parseHubhopper = function(response){
			
			_s.playlist_ar = [];
			var obj;
			var obj_ar = response.episodes;
			var thumbPath = undefined;

			for(var i=0; i<obj_ar.length; i++){
				obj = {};
				obj.source = encodeURI(obj_ar[i]["play"]["url"]);
				obj.downloadPath = obj.source;
				obj.thumbPath = obj_ar[i]["image"];
				var count = "";
				var author = '';
				if(obj_ar[i].author.length > 1) author = obj_ar[i].author + ' - ';
				if(_s.showTracksNumbers_bl){
					if(i<9) count = "0";
					count = count + (i + 1) + ". ";
					obj.title = count + author + obj_ar[i].title;
				}else{
					obj.title = author + obj_ar[i].title;
				}

				obj.titleText = obj_ar[i].title;
				obj.duration = undefined;
				_s.playlist_ar[i] = obj;
			}
			clearTimeout(_s.dispatchPlaylistLoadCompleteWidthDelayId_to);
			if(_s.inversePlaylist) _s.playlist_ar.reverse();
			_s.dispatchPlaylistLoadCompleteWidthDelayId_to = setTimeout(function(){
				_s.dispatchEvent(FWDRAPAudioData.PLAYLIST_LOAD_COMPLETE);
			}, 50);
		
			_s.isDataLoaded_bl = true;
		}

		
		//####################################//
		/* parse podcast JSON */
		//####################################//
		_s.parsePodcast = function(response){
			_s.playlist_ar = [];
			var obj = response.channel.item;
			var obj_ar;
			var thumbPath = undefined;
			try{thumbPath = response["channel"]["image"]["url"];}catch(e){}
		
			if(!obj.length){
				obj_ar = [obj];
			}else{
				obj_ar = obj;	
			}
			
			for(var i=0; i<obj_ar.length; i++){
				obj = {};
				
				if(obj_ar[i]["enclosure"]){
					obj.source = encodeURI(obj_ar[i]["enclosure"]["@attributes"]["url"]);
				}else{
					obj.source = encodeURI(obj_ar[i]["link"]);
				}
				
				obj.downloadPath = obj.source;
				obj.downloadable = _s.showDownloadMp3Button_bl;
				if(_s.forceDisableDownloadButtonForPodcast_bl) obj.downloadable = false;
				obj.thumbPath = thumbPath;
				var count = "";
				if(_s.showTracksNumbers_bl){
					if(i<9) count = "0";
					count = count + (i + 1) + ". ";
					obj.title = count + obj_ar[i].title;
				}else{
					obj.title = obj_ar[i].title;
				}
				
				obj.titleText = obj_ar[i].title;
				obj.duration = undefined;
				_s.playlist_ar[i] = obj;
				if(i > _s.maxPlaylistItems - 1) break;
			}
			
			if(_s.inversePlaylist) _s.playlist_ar.reverse();
			clearTimeout(_s.dispatchPlaylistLoadCompleteWidthDelayId_to);
			_s.dispatchPlaylistLoadCompleteWidthDelayId_to = setTimeout(function(){
				_s.dispatchEvent(FWDRAPAudioData.PLAYLIST_LOAD_COMPLETE);
			}, 50);
		
			_s.isDataLoaded_bl = true;
		};
		

		//####################################//
		/* parse xml JSON */
		//####################################//
		_s.parseXML = function(response){
			_s.playlist_ar = [];
			var obj;
			var obj_ar = response.li;
			
			if(!obj_ar.length){
				obj_ar = [obj_ar];
			}
			
			for(var i=0; i<obj_ar.length; i++){
				obj = {};
				obj.source = obj_ar[i]["@attributes"]["data-path"];
				if(obj.source.indexOf("encrypt:") != -1){
					obj.source = atob(obj.source.substr(8));
				}
				
				var firstUrlPath = encodeURI(obj.source.substr(0,obj.source.lastIndexOf("/") + 1));
				var secondUrlPath = obj.source.substr(obj.source.lastIndexOf("/") + 1);	

				if(obj.source.indexOf("youtube.") !=-1){
					var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
					var match = obj.source.match(regExp);
					obj.source =  match[2];
				}else{
					obj.source = FWDRAPUtils.getValidSource(obj.source);
				}
			
				obj.downloadPath = obj.source;
				obj.downloadable = obj_ar[i]["@attributes"]["data-downloadable"] == "yes" ? true : false;
				obj.buy = obj_ar[i]["@attributes"]["data-buy-url"];
				
				if(obj_ar[i]["@attributes"]["data-buy-url"]){
					obj.buy = obj_ar[i]["@attributes"]["data-buy-url"];
				}

				if(obj_ar[i]["@attributes"]["data-play-if-logged-in"]){
					obj.playIfLoggedIn = obj_ar[i]["@attributes"]["data-play-if-logged-in"];
					if(obj.playIfLoggedIn == 'no') obj.playIfLoggedIn = undefined;
				}
				
				obj.thumbPath = obj_ar[i]["@attributes"]["data-thumbpath"];
				var count = "";
				if(_s.showTracksNumbers_bl){
					if(i<9) count = "0";
					count = count + (i + 1) + ". ";
					obj.title = count + obj_ar[i]["@attributes"]["data-title"];
				}else{
					obj.title = obj_ar[i]["@attributes"]["data-title"];
				}
				
				obj.isPrivate = obj_ar[i]["@attributes"]["data-is-private"]; 
				if(obj.isPrivate == "yes"){
					obj.isPrivate = true;
				}else{
					obj.isPrivate = false;
				}
				
			
				obj.privateVideoPassword_str =  obj_ar[i]["@attributes"]["data-private-video-password"];
				
				obj.startAtTime = obj_ar[i]["@attributes"]["data-start-at-time"];
				if(obj.startAtTime == "00:00:00" || !FWDRAPUtils.checkTime(obj.startAtTime)) obj.startAtTime = undefined;
				
				obj.stopAtTime = obj_ar[i]["@attributes"]["data-stop-at-time"];
				if(obj.stopAtTime == "00:00:00" || !FWDRAPUtils.checkTime(obj.stopAtTime)) obj.stopAtTime = undefined;
				
				obj.titleText = obj_ar[i]["@attributes"]["data-title"];
				obj.duration = obj_ar[i]["@attributes"]["data-duration"];
				obj.atb = obj_ar[i]["@attributes"]["data-use-a-to-b"];
						
				obj.isShoutcast_bl = obj_ar[i]["@attributes"]["data-type"];
				if(obj.isShoutcast_bl){
					if(obj.isShoutcast_bl.toLowerCase().indexOf("shoutcast") != -1){
						obj.isShoutcast_bl = true;
					}else{
						obj.isShoutcast_bl = false;
					}
				}
				
				obj.isIcecast_bl = obj_ar[i]["@attributes"]["data-type"];
				if(obj.isIcecast_bl){
					if(obj.isIcecast_bl.toLowerCase().indexOf("icecast") != -1){
						obj.isIcecast_bl = true;
					}else{
						obj.isIcecast_bl = false;
					}
				}
				
				
				_s.playlist_ar[i] = obj;
				if(i > _s.maxPlaylistItems - 1) break;
			}
			
			if(_s.inversePlaylist) _s.playlist_ar.reverse();
			clearTimeout(_s.dispatchPlaylistLoadCompleteWidthDelayId_to);
			_s.dispatchPlaylistLoadCompleteWidthDelayId_to = setTimeout(function(){
				_s.dispatchEvent(FWDRAPAudioData.PLAYLIST_LOAD_COMPLETE);
			}, 50);
			
			_s.isDataLoaded_bl = true;
		};
		

		//####################################//
		/* parse folder JSON */
		//####################################//
		_s.parseFolderJSON = function(response){
			_s.playlist_ar = [];
			var obj;
			var obj_ar = response.folder;
			var counter = 0;
		
			for(var i=0; i<obj_ar.length; i++){
				obj = {};
				obj.source = obj_ar[i]["@attributes"]["data-path"];
				if(obj.source.indexOf("encrypt:") != -1){
					obj.source = atob(obj.source.substr(8));
				}
				var firstUrlPath = encodeURI(obj.source.substr(0,obj.source.lastIndexOf("/") + 1));
				var secondUrlPath = encodeURIComponent(obj.source.substr(obj.source.lastIndexOf("/") + 1));
				obj.source = firstUrlPath + secondUrlPath;
				obj.downloadPath = obj.source;
				obj.downloadable = _s.showDownloadMp3Button_bl;
				obj.buy = undefined;
				if(_s.forceDisableDownloadButtonForFolder_bl) obj.downloadable = true;
				obj.thumbPath = obj_ar[i]["@attributes"]["data-thumbpath"];
				if(_s.useID3ForFolderPlaylist){
					obj.title = obj.titleText = "...";
				}else{
					var count = "";
					if(_s.showTracksNumbers_bl){
						if(i<9) count = "0";
						count = count + (i + 1) + ". ";
						obj.title = count + "<span span class=\"fwdrap-artist\">" + obj_ar[i]["@attributes"]["data-title"] + '</span>';
					}else{
						obj.title = "<span span class=\"fwdrap-title\">" + obj_ar[i]["@attributes"]["data-title"] + '</span>'
					}

					obj.titleText = obj_ar[i]["@attributes"]["data-title"];
				}
				
				_s.playlist_ar[i] = obj;
				if(i > _s.maxPlaylistItems - 1) break;
			}
			
			if(_s.inversePlaylist) _s.playlist_ar.reverse();
			clearTimeout(_s.dispatchPlaylistLoadCompleteWidthDelayId_to);
			_s.dispatchPlaylistLoadCompleteWidthDelayId_to = setTimeout(function(){
				_s.dispatchEvent(FWDRAPAudioData.PLAYLIST_LOAD_COMPLETE);
			}, 50);
	
			_s.isDataLoaded_bl = true;
		};
		

		//##########################################//
		/* parse DOM playlist */
		//##########################################//
		_s.parseDOMPlaylist = function(idOrObject){
			if(_s.isPlaylistDispatchingError_bl) return;
			var root_el;
			
			_s.closeXHR();
			
			root_el = document.getElementById(idOrObject);
			if(!root_el){
				_s.isPlaylistDispatchingError_bl = true;
				_s.showLoadPlaylistErrorId_to = setTimeout(function(){
					_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"The playlist with id <font color='#FF0000'>" + idOrObject + "</font> is not found in the DOM."});
					_s.isPlaylistDispatchingError_bl = false;
				}, 50);
				return;
			}
			
			var children_ar = FWDRAPUtils.getChildren(root_el);
			var totalChildren = children_ar.length;
			var child;
			_s.playlist_ar = [];
			
			if(totalChildren == 0){
				_s.isPlaylistDispatchingError_bl = true;
				_s.showLoadPlaylistErrorId_to = setTimeout(function(){
					_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"The playlist whit the id  <font color='#FF0000'>" + idOrObject + "</font> must contain at least one track."});
					_s.isPlaylistDispatchingError_bl = false;
				}, 50);
				return;
			}
			
			for(var i=0; i<totalChildren; i++){
				var obj = {};
				child = children_ar[i];
				
				if(!FWDRAPUtils.hasAttribute(child, "data-path")){
					_s.isPlaylistDispatchingError_bl = true;
					_s.showLoadPlaylistErrorId_to = setTimeout(function(){
						_s.dispatchEvent(FWDRAPAudioData.LOAD_ERROR, {text:"Attribute <font color='#FF0000'>data-path</font> is required in the playlist at position <font color='#FF0000'>" + (i + 1)});
					}, 50);
					return;
				}
				
				if(i > _s.maxPlaylistItems - 1) break;
				
				obj.isShoutcast_bl = FWDRAPUtils.getAttributeValue(child, "data-type");
				if(obj.isShoutcast_bl){
					if(obj.isShoutcast_bl.toLowerCase().indexOf("shoutcast") != -1){
						obj.isShoutcast_bl = true;
					}else{
						obj.isShoutcast_bl = false;
					}
				}
				
				obj.isIcecast_bl = FWDRAPUtils.getAttributeValue(child, "data-type");
				if(obj.isIcecast_bl){
					if(obj.isIcecast_bl.toLowerCase().indexOf("icecast") != -1){
						obj.isIcecast_bl = true;
					}else{
						obj.isIcecast_bl = false;
					}
				}
			
				obj.source = FWDRAPUtils.getAttributeValue(child, "data-path");
				
				if(obj.source.indexOf("encrypt:") != -1){
					obj.source = atob(obj.source.substr(8));
				}
				
				if(obj.source.indexOf("youtube.") !=-1){
					var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
					var match = obj.source.match(regExp);
					obj.source = match[2];
				}else{
					obj.source = FWDRAPUtils.getValidSource(obj.source);
				}

				obj.downloadPath = obj.source;
				if(FWDRAPUtils.hasAttribute(child, "data-thumbpath")){
					obj.thumbPath = FWDRAPUtils.getAttributeValue(child, "data-thumbpath");
				}else{
					obj.thumbPath = undefined;
				}
				
				if(FWDRAPUtils.hasAttribute(child, "data-video-poster-path")){
					obj.videoPosterPath = FWDRAPUtils.getAttributeValue(child, "data-video-poster-path");
				}else{
					obj.videoPosterPath = undefined;
				}
				
				if(FWDRAPUtils.hasAttribute(child, "data-downloadable")){
					obj.downloadable = FWDRAPUtils.getAttributeValue(child, "data-downloadable") == "yes" ? true : false;
				}else{
					obj.downloadable = undefined;
				}
				
				if(FWDRAPUtils.hasAttribute(child, "data-buy-url")){
					obj.buy = FWDRAPUtils.getAttributeValue(child, "data-buy-url");
				}else{
					obj.buy = undefined;
				}

				if(FWDRAPUtils.hasAttribute(child, "data-play-if-logged-in")){
					obj.playIfLoggedIn = FWDRAPUtils.getAttributeValue(child, "data-play-if-logged-in");
					if(obj.playIfLoggedIn == 'no') obj.playIfLoggedIn = undefined;
				}
				
				obj.title = "not defined!";
				try{
					var count = "";
					if(_s.showTracksNumbers_bl){
						if(i<9) count = "0";
						count = count + (i + 1) + ". ";
						obj.title = count + FWDRAPUtils.getChildren(child)[0].innerHTML;
					}else{
						obj.title = FWDRAPUtils.getChildren(child)[0].innerHTML;
					}
				}catch(e){};
				
				obj.isPrivate = FWDRAPUtils.getAttributeValue(child, "data-is-private");
				
				if(obj.isPrivate == "yes"){
					obj.isPrivate = true;
				}else{
					obj.isPrivate = false;
				}
				
				obj.privateVideoPassword_str = FWDRAPUtils.getAttributeValue(child, "data-private-video-password");
				
				obj.startAtTime = FWDRAPUtils.getAttributeValue(child, "data-start-at-time");
				if(obj.startAtTime == "00:00:00" || !FWDRAPUtils.checkTime(obj.startAtTime)) obj.startAtTime = undefined;
				
				obj.stopAtTime = FWDRAPUtils.getAttributeValue(child, "data-stop-at-time");
				if(obj.stopAtTime == "00:00:00" || !FWDRAPUtils.checkTime(obj.stopAtTime)) obj.stopAtTime = undefined;
					
				
				try{obj.titleText = FWDRAPUtils.getChildren(child)[0].textContent || FWDRAPUtils.getChildren(child)[0].innerText;}catch(e){};
				
				if(FWDRAPUtils.hasAttribute(child, "data-duration")) obj.duration = FWDRAPUtils.getAttributeValue(child, "data-duration");
				if(FWDRAPUtils.hasAttribute(child, "data-use-a-to-b")) obj.atb = FWDRAPUtils.getAttributeValue(child, "data-use-a-to-b");
			
				_s.playlist_ar[i] = obj;
			}
			
			if(_s.inversePlaylist) _s.playlist_ar.reverse();
			clearTimeout(_s.dispatchPlaylistLoadCompleteWidthDelayId_to);
			_s.dispatchPlaylistLoadCompleteWidthDelayId_to = setTimeout(function(){
				_s.dispatchEvent(FWDRAPAudioData.PLAYLIST_LOAD_COMPLETE);
			}, 50);
	
			_s.isDataLoaded_bl = true;
		};
		

		//####################################//
		/* close xhr */
		//####################################//
		_s.closeXHR = function(){
			_s.closeJsonPLoader();
			try{
				_s.head.removeChild(_s.scs_el);
				_s.scs_el = null;
			}catch(e){}
			
			if(_s.xhr != null){
				try{_s.xhr.abort();}catch(e){}
				_s.xhr.onreadystatechange = null;
				_s.xhr.onerror = null;
				_s.xhr = null;
			}
			_s.countID3 = 2000;
		};
		
		_s.closeData = function(){
			_s.closeXHR();
			clearTimeout(_s.loadImageId_to);
			clearTimeout(_s.showLoadPlaylistErrorId_to);
			clearTimeout(_s.dispatchPlaylistLoadCompleteWidthDelayId_to);
			clearTimeout(_s.loadImageId_to);
			clearTimeout(_s.loadPreloaderId_to);
			if(_s.image_img){
				_s.image_img.onload = null;
				_s.image_img.onerror = null;
			}
		};
	
		_s.init();
	};
	

	/* set prototype */
	FWDRAPAudioData.setPrototype = function(){
		FWDRAPAudioData.prototype = new FWDRAPEventDispatcher();
	};
	
	FWDRAPAudioData.prototype = null;
	
	FWDRAPAudioData.UPDATE_IMAGE = "updateIamage";
	FWDRAPAudioData.RADIO_TRACK_UPDATE = "shoutcastTitleUpdate";
	FWDRAPAudioData.RADIO_TRACK_READY = "radioTrackReady";
	FWDRAPAudioData.SOUNDCLOUD_TRACK_READY = "soundcloudTrackready";
	FWDRAPAudioData.PRELOADER_LOAD_DONE = "onPreloaderLoadDone";
	FWDRAPAudioData.LOAD_DONE = "onLoadDone";
	FWDRAPAudioData.LOAD_ERROR = "onLoadError";
	FWDRAPAudioData.IMAGE_LOADED = "onImageLoaded";
	FWDRAPAudioData.SKIN_LOAD_COMPLETE = "onSkinLoadComplete";
	FWDRAPAudioData.SKIN_PROGRESS = "onSkinProgress";
	FWDRAPAudioData.IMAGES_PROGRESS = "onImagesPogress";
	FWDRAPAudioData.PLAYLIST_LOAD_COMPLETE = "onPlaylistLoadComplete";
	
	window.FWDRAPAudioData = FWDRAPAudioData;
}(window));