/**
 * Royal Audio Player
 * Utils.
 *
 * @author Tibi - FWDesign [https://webdesign-flash.ro/]
 * Copyright © 2006 All Rights Reserved.
 */
(function (window){
	
	var FWDRAPUtils = function(){
		'use strict';
	};
	
	FWDRAPUtils.dumy = document.createElement("div");
	

	//###################################//
	/* String */
	//###################################//
	FWDRAPUtils.trim = function(str){
		return str.replace(/\s/gi, "");
	};
	
	FWDRAPUtils.splitAndTrim = function(str, trim_bl){
		var array = str.split(",");
		var length = array.length;
		for(var i=0; i<length; i++){
			if(trim_bl) array[i] = FWDRAPUtils.trim(array[i]);
		};
		return array;
	};
	
	FWDRAPUtils.checkTime = function(time){
		var timeRegExp = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/;
		if(!timeRegExp.test(time)) return false;
		return true;
	};
	

	FWDRAPUtils.formatTime = function(secs, pushHours){
		secs = Math.round(secs);
		var hours = Math.floor(secs / (60 * 60));
		
		var divisor_for_minutes = secs % (60 * 60);
		var minutes = Math.floor(divisor_for_minutes / 60);

		var divisor_for_seconds = divisor_for_minutes % 60;
		var seconds = Math.ceil(divisor_for_seconds);
		
		minutes = (minutes >= 10) ? minutes : "0" + minutes;
		seconds = (seconds >= 10) ? seconds : "0" + seconds;
		
		if(isNaN(seconds)) return "00:00";
		if(hours || pushHours){
			 return "0" + hours + ":" + minutes + ":" + seconds;
		}else{
			 return minutes + ":" + seconds;
		}
	};

	FWDRAPUtils.formatTotalTime = function(secs){
		
		if(typeof secs == "string" && secs.indexOf(":") != -1){
			return secs;
		} 
		
		secs = secs/1000;
		
		return FWDRAPUtils.formatTime(secs);
	};

	
	FWDRAPUtils.MD5 = function (string) {

		function RotateLeft(lValue, iShiftBits) {
			return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
		}

		function AddUnsigned(lX,lY) {
			var lX4,lY4,lX8,lY8,lResult;
			lX8 = (lX & 0x80000000);
			lY8 = (lY & 0x80000000);
			lX4 = (lX & 0x40000000);
			lY4 = (lY & 0x40000000);
			lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
			if (lX4 & lY4) {
				return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
			}
			if (lX4 | lY4) {
				if (lResult & 0x40000000) {
					return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
				} else {
					return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
				}
			} else {
				return (lResult ^ lX8 ^ lY8);
			}
		}

		function F(x,y,z) { return (x & y) | ((~x) & z); }
		function G(x,y,z) { return (x & z) | (y & (~z)); }
		function H(x,y,z) { return (x ^ y ^ z); }
		function I(x,y,z) { return (y ^ (x | (~z))); }

		function FF(a,b,c,d,x,s,ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
		};

		function GG(a,b,c,d,x,s,ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
		};

		function HH(a,b,c,d,x,s,ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
		};

		function II(a,b,c,d,x,s,ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
		};

		function ConvertToWordArray(string) {
			var lWordCount;
			var lMessageLength = string.length;
			var lNumberOfWords_temp1=lMessageLength + 8;
			var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
			var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
			var lWordArray=Array(lNumberOfWords-1);
			var lBytePosition = 0;
			var lByteCount = 0;
			while ( lByteCount < lMessageLength ) {
				lWordCount = (lByteCount-(lByteCount % 4))/4;
				lBytePosition = (lByteCount % 4)*8;
				lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
				lByteCount++;
			}
			lWordCount = (lByteCount-(lByteCount % 4))/4;
			lBytePosition = (lByteCount % 4)*8;
			lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
			lWordArray[lNumberOfWords-2] = lMessageLength<<3;
			lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
			return lWordArray;
		};

		function WordToHex(lValue) {
			var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
			for (lCount = 0;lCount<=3;lCount++) {
				lByte = (lValue>>>(lCount*8)) & 255;
				WordToHexValue_temp = "0" + lByte.toString(16);
				WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
			}
			return WordToHexValue;
		};

		function Utf8Encode(string) {
			string = string.replace(/\r\n/g,"\n");
			var utftext = "";

			for (var n = 0; n < string.length; n++) {

				var c = string.charCodeAt(n);

				if (c < 128) {
					utftext += String.fromCharCode(c);
				}
				else if((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				}
				else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}

			}

			return utftext;
		};

		var x=Array();
		var k,AA,BB,CC,DD,a,b,c,d;
		var S11=7, S12=12, S13=17, S14=22;
		var S21=5, S22=9 , S23=14, S24=20;
		var S31=4, S32=11, S33=16, S34=23;
		var S41=6, S42=10, S43=15, S44=21;

		string = Utf8Encode(string);

		x = ConvertToWordArray(string);

		a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

		for (k=0;k<x.length;k+=16) {
			AA=a; BB=b; CC=c; DD=d;
			a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
			d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
			c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
			b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
			a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
			d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
			c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
			b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
			a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
			d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
			c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
			b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
			a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
			d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
			c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
			b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
			a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
			d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
			c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
			b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
			a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
			d=GG(d,a,b,c,x[k+10],S22,0x2441453);
			c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
			b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
			a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
			d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
			c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
			b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
			a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
			d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
			c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
			b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
			a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
			d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
			c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
			b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
			a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
			d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
			c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
			b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
			a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
			d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
			c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
			b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
			a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
			d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
			c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
			b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
			a=II(a,b,c,d,x[k+0], S41,0xF4292244);
			d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
			c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
			b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
			a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
			d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
			c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
			b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
			a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
			d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
			c=II(c,d,a,b,x[k+6], S43,0xA3014314);
			b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
			a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
			d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
			c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
			b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
			a=AddUnsigned(a,AA);
			b=AddUnsigned(b,BB);
			c=AddUnsigned(c,CC);
			d=AddUnsigned(d,DD);
		}

		var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);

		return temp.toLowerCase();
	}
	

	//#############################################//
	//Array //
	//#############################################//
	FWDRAPUtils.indexOfArray = function(array, prop){
		var length = array.length;
		for(var i=0; i<length; i++){
			if(array[i] === prop) return i;
		};
		return -1;
	};

	
	FWDRAPUtils.randomizeArray = function(aArray) {
		var randomizedArray = [];
		var copyArray = aArray.concat();
			
		var length = copyArray.length;
		for(var i=0; i< length; i++) {
				var index = Math.floor(Math.random() * copyArray.length);
				randomizedArray.push(copyArray[index]);
				copyArray.splice(index,1);
			}
		return randomizedArray;
	};
	
	FWDRAPUtils.getCookie = function(name){
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}
	
	FWDRAPUtils.getCanvasWithModifiedColor = function(img, hexColor, returnImage){
		if(!img) return;
		var newImage;
		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext("2d");
		var originalPixels = null;
		var currentPixels = null;
		var long = parseInt(hexColor.replace(/^#/, ""), 16);
		var hexColorRGB = {
			R: (long >>> 16) & 0xff,
			G: (long >>> 8) & 0xff,
			B: long & 0xff
		};
		
		canvas.style.position = "absolute";
		canvas.style.left = "0px";
		canvas.style.top = "0px";
		canvas.style.margin = "0px";
		canvas.style.padding = "0px";
		canvas.style.maxWidth = "none";
		canvas.style.maxHeight = "none";
		canvas.style.border = "none";
		canvas.style.lineHeight = "1";
		canvas.style.backgroundColor = "transparent";
		canvas.style.backfaceVisibility = "hidden";
		canvas.style.webkitBackfaceVisibility = "hidden";
		canvas.style.MozBackfaceVisibility = "hidden";	
		canvas.style.MozImageRendering = "optimizeSpeed";	
		canvas.style.WebkitImageRendering = "optimizeSpeed";
		canvas.width = img.width;
		canvas.height = img.height;
		
		ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, img.width, img.height);
		originalPixels = ctx.getImageData(0, 0, img.width, img.height);
		currentPixels = ctx.getImageData(0, 0, img.width, img.height);

        for(var I = 0, L = originalPixels.data.length; I < L; I += 4){
            if(currentPixels.data[I + 3] > 0) // If it's not a transparent pixel
            {
                currentPixels.data[I] = originalPixels.data[I] / 255 * hexColorRGB.R;
                currentPixels.data[I + 1] = originalPixels.data[I + 1] / 255 * hexColorRGB.G;
                currentPixels.data[I + 2] = originalPixels.data[I + 2] / 255 * hexColorRGB.B;
            }
        }
		
		ctx.globalAlpha = .5;
        ctx.putImageData(currentPixels, 0, 0);
		ctx.drawImage(canvas, 0, 0);
        
		if(returnImage){
			newImage = new Image();
			newImage.src = canvas.toDataURL();
		}
		return {canvas:canvas, image:newImage};
	};
	
	FWDRAPUtils.changeCanvasHEXColor = function(img, canvas, hexColor, returnNewImage){
		if(!img) return;
		var canvas = canvas;
		var ctx = canvas.getContext("2d");
		var originalPixels = null;
		var currentPixels = null;
		var long = parseInt(hexColor.replace(/^#/, ""), 16);
		var hexColorRGB = {
			R: (long >>> 16) & 0xff,
			G: (long >>> 8) & 0xff,
			B: long & 0xff
		};
		
		canvas.width = img.width;
		canvas.height = img.height;
		ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, img.width, img.height);
		originalPixels = ctx.getImageData(0, 0, img.width, img.height);
		currentPixels = ctx.getImageData(0, 0, img.width, img.height);

        for(var I = 0, L = originalPixels.data.length; I < L; I += 4){
            if(currentPixels.data[I + 3] > 0) // If it's not a transparent pixel
            {
                currentPixels.data[I] = originalPixels.data[I] / 255 * hexColorRGB.R;
                currentPixels.data[I + 1] = originalPixels.data[I + 1] / 255 * hexColorRGB.G;
                currentPixels.data[I + 2] = originalPixels.data[I + 2] / 255 * hexColorRGB.B;
            }
        }
		
		ctx.globalAlpha = .5;
        ctx.putImageData(currentPixels, 0, 0);
		ctx.drawImage(canvas, 0, 0);
		
		if(returnNewImage){
			var newImage = new Image();
			newImage.src = canvas.toDataURL();
			return newImage;
		}
    }

	FWDRAPUtils.getSecondsFromString = function(str){
		var hours = 0;
		var minutes = 0;
		var seconds = 0;
		var duration = 0;
		
		if(!str) return undefined;
		
		str = str.split(":");
		
		hours = str[0];
		if(hours[0] == "0" && hours[1] != "0"){
			hours = parseInt(hours[1]);
		}
		if(hours == "00") hours = 0;
		
		minutes = str[1];
		if(minutes[0] == "0" && minutes[1] != "0"){
			minutes = parseInt(minutes[1]);
		}
		if(minutes == "00") minutes = 0;
		
		secs = parseInt(str[2].replace(/,.*/ig, ""));
		if(secs[0] == "0" && secs[1] != "0"){
			secs = parseInt(secs[1]);
		}
		if(secs == 60) secs = 59;
		if(secs == "00") secs = 0;
		
		if(hours != 0){
			duration += (hours * 60 * 60)
		}
		
		if(minutes != 0){
			duration += (minutes * 60)
		}
		
		duration += secs;
		
		return duration;
	 };

	FWDRAPUtils.isURLEncoded = function(url){
		try{
			var decodedURL = decodeURIComponent(url);
			if(decodedURL != url && url.indexOf('%') != -1) return true;
		}catch(e){}
		return false;
	}

	FWDRAPUtils.getValidSource =  function(source){
		if(!source) return;
		
		var path1 = (location.origin == 'null') ? '' : location.origin;
		var path2 = location.pathname;
		
		if(path2.indexOf(".") != -1){
			path2 = path2.substr(0, path2.lastIndexOf("/") + 1);
		}

		var hasHTTPorHTTPS_bl = !(source.indexOf("http:") == -1 && source.indexOf("https:") == -1 && !FWDRAPUtils.isLocal);
		
		if(!hasHTTPorHTTPS_bl){
			source = path1 + path2 + source;
		}
		

		var firstUrlPath = encodeURI(source.substr(0,source.lastIndexOf("/") + 1));
		var secondUrlPath = source.substr(source.lastIndexOf("/") + 1);
		
		if(source.match(/\.mp3|\.mp4|\.m3u8|\.txt|\.srt|\.vtt|\.jpg|\.jpeg|\.png/ig)
			&& !source.match(/\.s3|\drive.|dropbox|\?/ig)){
			if(FWDRAPUtils.isURLEncoded(secondUrlPath)){
				secondUrlPath = source.substr(source.lastIndexOf("/") + 1);
			}else{
				secondUrlPath = encodeURI(source.substr(source.lastIndexOf("/") + 1));
			}
		}else{
			secondUrlPath = source.substr(source.lastIndexOf("/") + 1);
		}
	
		source = firstUrlPath + secondUrlPath;	
		return source;
	}

	FWDRAPUtils.isLocal = (function(){
		if(document.location.protocol == "file:"){
			return true;
		}else{
			return false;
		}
	}());

	//#############################################//
	/*DOM manipulation */
	//#############################################//
	FWDRAPUtils.prt = function (e, n){
		if(n === undefined) n = 1;
		while(n-- && e) e = e.parentNode;
		if(!e || e.nodeType !== 1) return null;
		return e;
	};
	
	FWDRAPUtils.sibling = function(e, n){
		while (e && n !== 0){
			if(n > 0){
				if(e.nextElementSibling){
					 e = e.nextElementSibling;	 
				}else{
					for(var e = e.nextSibling; e && e.nodeType !== 1; e = e.nextSibling);
				}
				n--;
			}else{
				if(e.previousElementSibling){
					 e = e.previousElementSibling;	 
				}else{
					for(var e = e.previousSibling; e && e.nodeType !== 1; e = e.previousSibling);
				}
				n++;
			}
		}
		return e;
	};
	
	FWDRAPUtils.getChildAt = function (e, n){
		var kids = FWDRAPUtils.getChildren(e);
		if(n < 0) n += kids.length;
		if(n < 0) return null;
		return kids[n];
	};
	
	FWDRAPUtils.getChildById = function(id){
		return document.getElementById(id) || undefined;
	};
	
	FWDRAPUtils.getChildren = function(e, allNodesTypes){
		var kids = [];
		for(var c = e.firstChild; c != null; c = c.nextSibling){
			if(allNodesTypes){
				kids.push(c);
			}else if(c.nodeType === 1){
				kids.push(c);
			}
		}
		return kids;
	};
	
	FWDRAPUtils.getChildrenFromAttribute = function(e, attr, allNodesTypes){
		var kids = [];
		for(var c = e.firstChild; c != null; c = c.nextSibling){
			if(allNodesTypes && FWDRAPUtils.hasAttribute(c, attr)){
				kids.push(c);
			}else if(c.nodeType === 1 && FWDRAPUtils.hasAttribute(c, attr)){
				kids.push(c);
			}
		}
		return kids.length == 0 ? undefined : kids;
	};
	
	FWDRAPUtils.getChildFromNodeListFromAttribute = function(e, attr, allNodesTypes){
		for(var c = e.firstChild; c != null; c = c.nextSibling){
			if(allNodesTypes && FWDRAPUtils.hasAttribute(c, attr)){
				return c;
			}else if(c.nodeType === 1 && FWDRAPUtils.hasAttribute(c, attr)){
				return c;
			}
		}
		return undefined;
	};
	
	FWDRAPUtils.getAttributeValue = function(e, attr){
		if(!FWDRAPUtils.hasAttribute(e, attr)) return undefined;
		return e.getAttribute(attr);	
	};
	
	FWDRAPUtils.hasAttribute = function(e, attr){
		if(e.hasAttribute){
			return e.hasAttribute(attr); 
		}else {
			var test = e.getAttribute(attr);
			return  test ? true : false;
		}
	};
	
	FWDRAPUtils.insertNodeAt = function(prt, child, n){
		var children = FWDRAPUtils.children(prt);
		if(n < 0 || n > children.length){
			throw new Error("invalid index!");
		}else {
			prt.insertBefore(child, children[n]);
		};
	};
	
	FWDRAPUtils.hasCanvas = function(){
		return Boolean(document.createElement("canvas"));
	};
	

	//###################################//
	/* DOM geometry */
	//##################################//
	FWDRAPUtils.hitTest = function(target, x, y){
		var hit = false;
		if(!target) throw Error("Hit test target is null!");
		var rect = target.getBoundingClientRect();
		
		if(x >= rect.left && x <= rect.left +(rect.right - rect.left) && y >= rect.top && y <= rect.top + (rect.bottom - rect.top)) return true;
		return false;
	};
	
	FWDRAPUtils.getScrollOffsets = function(){
		//all browsers
		if(window.pageXOffset != null) return{x:window.pageXOffset, y:window.pageYOffset};
		
		//ie7/ie8
		if(document.compatMode == "CSS1Compat"){
			return({x:document.documentElement.scrollLeft, y:document.documentElement.scrollTop});
		}
	};
	
	FWDRAPUtils.getViewportSize = function(){
		if(FWDRAPUtils.hasPointerEvent && navigator.msMaxTouchPoints > 1){
			return {w:document.documentElement.clientWidth || window.innerWidth, h:document.documentElement.clientHeight || window.innerHeight};
		}
		
		if(FWDRAPUtils.isMobile) return {w:window.innerWidth, h:window.innerHeight};
		return {w:document.documentElement.clientWidth || window.innerWidth, h:document.documentElement.clientHeight || window.innerHeight};
	};
	
	FWDRAPUtils.getViewportMouseCoordinates = function(e){
		var offsets = FWDRAPUtils.getScrollOffsets();
		
		if(e.touches){
			return{
				screenX:e.touches[0] == undefined ? e.touches.pageX - offsets.x :e.touches[0].pageX - offsets.x,
				screenY:e.touches[0] == undefined ? e.touches.pageY - offsets.y :e.touches[0].pageY - offsets.y
			};
		}
		
		return{
			screenX: e.clientX == undefined ? e.pageX - offsets.x : e.clientX,
			screenY: e.clientY == undefined ? e.pageY - offsets.y : e.clientY
		};
	};
	
	
	//###################################//
	/* Browsers test */
	//##################################//
	FWDRAPUtils.hasPointerEvent = (function(){
		return Boolean(window.navigator.msPointerEnabled) || Boolean(window.navigator.pointerEnabled);
	}());
	
	FWDRAPUtils.isMobile = (function (){
		if((FWDRAPUtils.hasPointerEvent && navigator.msMaxTouchPoints > 1) || (FWDRAPUtils.hasPointerEvent && navigator.maxTouchPoints > 1)) return true;
		var agents = ['android', 'webos', 'iphone', 'ipad', 'blackberry', 'kfsowi'];
	    for(i in agents) {
	    	 if(navigator.userAgent.toLowerCase().indexOf(agents[i].toLowerCase()) != -1) {
	            return true;
	        }
	    }
	    if(navigator.platform.toLowerCase() === 'macintel' && navigator.maxTouchPoints > 1 && !window.MSStream) return true;
	    return false;
	}());

	FWDRAPUtils.isLocal = (function(){
		if(document.location.protocol == "file:"){
			return true;
		}else{
			return false;
		}
	}());

	FWDRAPUtils.isIOS = (function(){
		if(navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) return true;
		return Boolean(navigator.userAgent.match(/(iPad|iPhone|iPod)/ig));
	}());
	
	FWDRAPUtils.isAndroid = (function(){
		 return (navigator.userAgent.toLowerCase().indexOf("android".toLowerCase()) != -1);
	}());
	
	FWDRAPUtils.isChrome = (function(){
		return navigator.userAgent.toLowerCase().indexOf('chrome') != -1;
	}());
	
	FWDRAPUtils.isSafari = (function(){
		return navigator.userAgent.toLowerCase().indexOf('safari') != -1 && navigator.userAgent.toLowerCase().indexOf('chrome') == -1;
	}());
	
	FWDRAPUtils.isOpera = (function(){
		return navigator.userAgent.toLowerCase().indexOf('opera') != -1 && navigator.userAgent.toLowerCase().indexOf('chrome') == -1;
	}());
	
	FWDRAPUtils.isFirefox = (function(){
		return navigator.userAgent.toLowerCase().indexOf('firefox') != -1;
	}());
	
	FWDRAPUtils.isIE = (function(){
		var isIE = Boolean(navigator.userAgent.toLowerCase().indexOf('msie') != -1) || Boolean(navigator.userAgent.toLowerCase().indexOf('edge') != -1);
		return isIE || Boolean(!FWDRAPUtils.isIE && document.documentElement.msRequestFullscreen);
	}());
	
	FWDRAPUtils.isIE11 = (function(){
		return Boolean(!FWDRAPUtils.isIE && document.documentElement.msRequestFullscreen);
	}());
	
	FWDRAPUtils.isIEAndLessThen9 = (function(){
		return navigator.userAgent.toLowerCase().indexOf("msie 7") != -1 || navigator.userAgent.toLowerCase().indexOf("msie 8") != -1;
	}());
	
	FWDRAPUtils.isIEAndLessThen10 = (function(){
		return navigator.userAgent.toLowerCase().indexOf("msie 7") != -1 
		|| navigator.userAgent.toLowerCase().indexOf("msie 8") != -1
		|| navigator.userAgent.toLowerCase().indexOf("msie 9") != -1;
	}());
	
	FWDRAPUtils.isIE7 = (function(){
		return navigator.userAgent.toLowerCase().indexOf("msie 7") != -1;
	}());
	
	FWDRAPUtils.isApple = (function(){
		return navigator.appVersion.toLowerCase().indexOf('mac') != -1;
	}());
	
	FWDRAPUtils.hasFullScreen = (function(){
		return FWDRAPUtils.dumy.requestFullScreen || FWDRAPUtils.dumy.mozRequestFullScreen || FWDRAPUtils.dumy.webkitRequestFullScreen || FWDRAPUtils.dumy.msieRequestFullScreen;
	}());
	
	function get3d(){
	    var properties = ['transform', 'msTransform', 'WebkitTransform', 'MozTransform', 'OTransform', 'KhtmlTransform'];
	    var p;
	    var position;
	    while (p = properties.shift()) {
	       if (typeof FWDRAPUtils.dumy.style[p] !== 'undefined') {
	    	   FWDRAPUtils.dumy.style.position = "absolute";
	    	   position = FWDRAPUtils.dumy.getBoundingClientRect().left;
	    	   FWDRAPUtils.dumy.style[p] = 'translate3d(500px, 0px, 0px)';
	    	   position = Math.abs(FWDRAPUtils.dumy.getBoundingClientRect().left - position);
	    	   
	           if(position > 100 && position < 900){
	        	   try{document.documentElement.removeChild(FWDRAPUtils.dumy);}catch(e){}
	        	   return true;
	           }
	       }
	    }
	    try{document.documentElement.removeChild(FWDRAPUtils.dumy);}catch(e){}
	    return false;
	};
	
	function get2d(){
	    var properties = ['transform', 'msTransform', 'WebkitTransform', 'MozTransform', 'OTransform', 'KhtmlTransform'];
	    var p;
	    while (p = properties.shift()) {
	       if (typeof FWDRAPUtils.dumy.style[p] !== 'undefined') {
	    	   return true;
	       }
	    }
	    try{document.documentElement.removeChild(FWDRAPUtils.dumy);}catch(e){}
	    return false;
	};	

	
	//###############################################//
	/* various utils */
	//###############################################//
	FWDRAPUtils.onReady =  function(callbalk){
		if (document.addEventListener) {
			document.addEventListener( "DOMContentLoaded", function(){
				FWDRAPUtils.checkIfHasTransofrms();
				callbalk();
			});
		}else{
			document.onreadystatechange = function () {
				FWDRAPUtils.checkIfHasTransofrms();
				if (document.readyState == "complete") callbalk();
			};
		 }
	};
	
	FWDRAPUtils.checkIfHasTransofrms = function(){
		document.documentElement.appendChild(FWDRAPUtils.dumy);
		FWDRAPUtils.hasTransform3d = get3d();
		FWDRAPUtils.hasTransform2d = get2d();
		FWDRAPUtils.isReadyMethodCalled_bl = true;
	};
	
	FWDRAPUtils.disableElementSelection = function(e){
		try{e.style.userSelect = "none";}catch(e){};
		try{e.style.MozUserSelect = "none";}catch(e){};
		try{e.style.webkitUserSelect = "none";}catch(e){};
		try{e.style.khtmlUserSelect = "none";}catch(e){};
		try{e.style.oUserSelect = "none";}catch(e){};
		try{e.style.msUserSelect = "none";}catch(e){};
		try{e.msUserSelect = "none";}catch(e){};
		e.onselectstart = function(){return false;};
	};
	
	FWDRAPUtils.getUrlArgs = function urlArgs(string){
		var args = {};
		var query = string.substr(string.indexOf("?") + 1) || location.search.substring(1);
		var pairs = query.split("&");
		for(var i=0; i< pairs.length; i++){
			var pos = pairs[i].indexOf("=");
			var name = pairs[i].substring(0,pos);
			var value = pairs[i].substring(pos + 1);
			value = decodeURIComponent(value);
			args[name] = value;
		}
		return args;
	};
	
	
	FWDRAPUtils.isReadyMethodCalled_bl = false;
	
	window.FWDRAPUtils = FWDRAPUtils;
}(window));


/*
 * Version: 1.0
 * Date: 04.05.2020
 * Audio Visualizer.
 * Nothing to modify or see here!
 **/
(function (window){
	
	var FWDRAPVisualizer = function(props_obj){

        'use strict';

		var _s = this;

		_s.preset = props_obj.visPrst;
		_s.themeClr = props_obj.visClr.reverse();
		_s.useDumyVisualizeOnIOS = props_obj.useDumyVisualizeOnIOS;
		_s.data_d_ar = [];
	
		// Bars spectrum settings.
		_s.capYPos_ar = [];
		_s.capClr = props_obj.visCapClr;
		_s.gap = 1;
		_s.capHeight = 2;
		_s.meterW = 10;

		// Init.
		_s.init = function(){
			_s.createCanvas();
           
            for(var i=0; i<511; i++){
                _s.data_d_ar.push(0);
            } 
	   }


		// Create canvas.
		_s.createCanvas = function(){
			_s.setOverflow('hidden');
			_s.cnv = new FWDRAPDisplayObject('canvas');
			_s.ctx = _s.cnv.screen.getContext("2d");
            _s.ctx.globalCompositeOperation = 'multiply';
			_s.addChild(_s.cnv)
		}


		// Resize canvas.
		_s.resize = function(x, y, sW, sH){
		
			x = x | 0;
			y = y | 0;

			_s.sW = sW;
			_s.sH = sH;
			
			_s.cnv.setWidth(sW);
			_s.cnv.setHeight(sH);
			
			_s.setX(x);
			_s.setY(y);
			_s.setWidth(sW);
			_s.setHeight(sH);
		}


		// Interaction (start, stop, pause, play).
        _s.start = function(el, analyser){
        	_s.allowOnIOS = true;
        	
        	if(_s.useDumyVisualizeOnIOS === undefined) return;

        	if(_s.useDumyVisualizeOnIOS && FWDRAPUtils.isIOS){
        		_s.allowOnIOS = false;
        	}


            if(el && !_s.analyserCtx && window['AudioContext'] && !analyser && _s.allowOnIOS){
                _s.analyserCtx = new AudioContext();
                _s.analyser = _s.analyserCtx.createAnalyser();
                _s.analyserSrc = _s.analyserCtx.createMediaElementSource(el);
                _s.analyserSrc.connect(_s.analyser);
                _s.analyser.connect(_s.analyserCtx.destination);
            }else if(analyser && _s.allowOnIOS){ 
                _s.analyser = analyser;
            }
            cancelAnimationFrame(_s.raf);
            _s.draw();
            _s.play();
        }

		_s.stop = function(){
			cancelAnimationFrame(_s.raf);
			if(_s.analyserCtx){
				_s.analyserCtx.close();
				_s.analyserCtx = null;
			}
			_s.pause();
			_s.capYPos_ar = [];
		}

		_s.play = function(){
			_s.isPlaying = true;
		}

		_s.pause =  function(){
			_s.isPlaying = false;
		}

        _s.updateColor = function(ar){
            _s.themeClr = ar;
        }


		// Draw visualizer.
		_s.draw = function(){
		       
            _s.raf = window.requestAnimationFrame(_s.draw);

            try{
                _s.data_ar = new Uint8Array(_s.analyser.frequencyBinCount); 
                _s.analyser.getByteFrequencyData(_s.data_ar);
            }catch(ac){
                _s.data_ar = [];
                for (var i = 0; i < 511; i++){
                    _s.isPlaying ? _s.data_ar.push(Math.floor(254 / (i / 100 + 1) * Math.random() + 1)) : _s.data_ar.push(0);
                    _s.data_d_ar[i] += (_s.data_ar[i] - _s.data_d_ar[i]) / 9;
                } 
                _s.data_ar = _s.data_d_ar;
            }

            if(!_s.allowOnIOS){
            	_s.data_ar = [];
                for (var i = 0; i < 511; i++){
                    _s.isPlaying ? _s.data_ar.push(Math.floor(254 / (i / 100 + 1) * Math.random() + 1)) : _s.data_ar.push(0);
                    _s.data_d_ar[i] += (_s.data_ar[i] - _s.data_d_ar[i]) / 9;
                } 
                _s.data_ar = _s.data_d_ar;
            }

            if(_s.preset == "wave1" || _s.preset == 'wave2'){
                _s.data_ar[0] = 0;
            }
           	
            switch(_s.preset) {
                 case "wave1":
                    _s.ctx.clearRect(0, 0, _s.sW, _s.sH);
                    _s.ctx.lineCap = "round";
                    _s.ctx.lineWidth = 0;
                    _s.drawWave(1, 0, true, "#FFFFFF");
                    _s.drawWave(3, .5, true, _s.themeClr[0]);
                    _s.drawWave(4, .55, true, _s.themeClr[1]);
                    _s.drawWave(5, .6, true, _s.themeClr[2]);
                    _s.drawWave(6, .65, true, _s.themeClr[3]);
                    _s.drawWave(7, .8, true, _s.themeClr[4]);
                    break;
                 case "wave2":
                    _s.ctx.clearRect(0, 0, _s.sW, _s.sH);
                    _s.ctx.lineWidth = 2;
                    _s.ctx.lineCap = "round";
                    _s.drawWave(1, 0, false, "#FFFFFF");
                    _s.drawWave(3, .5, false, _s.themeClr[0]);
                    _s.drawWave(4, .55, false, _s.themeClr[1]);
                    _s.drawWave(5, .6, false, _s.themeClr[2]);
                    _s.drawWave(6, .65, false, _s.themeClr[3]);
                    _s.drawWave(7, .8, false, _s.themeClr[4]);
                    break;
                case "wave3":
                   _s.drawWave2();
                    break;
                case "bars1":
                    _s.ctx.clearRect(0, 0, _s.sW, _s.sH);
                    _s.gap = 1;
                    _s.capHeight = 1;
                    _s.meterW = 2;
                    _s.ctx.lineCap = 'butt';
                    _s.drawBars();
                    break;
                 case "bars2":
                    _s.ctx.clearRect(0, 0, _s.sW, _s.sH);       
                    _s.ctx.lineWidth = 2;
                     _s.ctx.lineCap = 'butt';
                    _s.drawBars2();
                    break;
                default:
                    _s.defaultSpectrum()
            }
        }


        // Default spectrum.
        _s.defaultSpectrum =  function(d){
	    	var fr = 6;
        	if(_s.sW > 1000){
        		fr = 2.5;
        	}else if(_s.sW < 200){
        		fr = 14;
        	}else if(_s.sW < 400){
        		fr = 10;
        	}

	        _s.ctx.clearRect(0, 0, _s.sW, _s.sH);
	        _s.ctx.lineWidth = 2;
	        _s.ctx.miterLimit = 2;

	        _s.ctx.beginPath();
            _s.ctx.moveTo(-1, _s.sH);
            for(var i = 0; i<_s.data_ar.length/2; i++){
            	_s.ctx.lineTo(i * _s.sW/_s.data_ar.length * fr, _s.sH - _s.data_ar[i] * _s.sH/300 + 1);
            } 
	      
	        _s.ctx.strokeStyle = "rgba(" + _s.getHexClr(_s.themeClr).r + ", " + _s.getHexClr(_s.themeClr).g + ", " + _s.getHexClr(_s.themeClr).b + ", 1.0)";
	        _s.ctx.stroke();
	        _s.ctx.closePath();
	    }


	    // Draw bars.
	    _s.drawBars = function(){
    		var step = Math.round(_s.data_ar.length/_s.meterNum);
         	_s.meterNum = Math.floor(Math.min(511,((_s.sW)/(_s.meterW))));  
            _s.meterNum *= .6;
        
            var grd = _s.ctx.createLinearGradient(0, _s.sH, 0, 0);
            grd.addColorStop(0, _s.themeClr[4]);
            grd.addColorStop("0.25", _s.themeClr[3]);
            grd.addColorStop("0.5", _s.themeClr[2]);
            grd.addColorStop("0.75", _s.themeClr[1]);
            grd.addColorStop("1", _s.themeClr[0]);

	        for (var i = 0; i < _s.meterNum; i++) {
	            var value = _s.data_ar[i * step] * _s.sH / 300;

	            if(_s.capYPos_ar.length < Math.round(_s.meterNum)){
	                _s.capYPos_ar.push(value);
	            }

	            _s.ctx.fillStyle = _s.capClr;
	            if(value < _s.capYPos_ar[i]) {
	                _s.ctx.fillRect(i * (_s.meterW + _s.gap), _s.sH - (--_s.capYPos_ar[i]), _s.meterW, _s.capHeight);
	            }else {
	                _s.ctx.fillRect(i *  (_s.meterW + _s.gap), _s.sH - value, _s.meterW, _s.capHeight);
	                _s.capYPos_ar[i] = value;
	            };

	            _s.ctx.fillStyle = grd; 
	            _s.ctx.fillRect(i * (_s.meterW + _s.gap), _s.sH - value + _s.capHeight, _s.meterW, _s.sH);
             };
	    }


	    _s.drawBars2 = function(s){
	    	
	    	var fr = 2;
	    	if(_s.preset == 'bars4'){
            	if(_s.sW > 1000){
            		fr = 6;
            	}else if(_s.sW < 200){
            		fr = 32;
            	}else if(_s.sW < 400){
            		fr = 16;
            	}
        	}

            for (var i=0; i<_s.sW; i+=2){
                var g = Math.round(_s.data_ar.length/fr * i/_s.sW * 2);
                _s.ctx.beginPath();
                _s.ctx.moveTo(i, _s.sH);
                _s.ctx.lineTo(i, _s.sH - _s.data_ar[g] * _s.sH/255 + 8);
                
                var grd = _s.ctx.createLinearGradient(0, _s.sH, 0, 0);
                grd.addColorStop(0, _s.themeClr[4]);
                grd.addColorStop("0.25", _s.themeClr[3]);
                grd.addColorStop("0.5", _s.themeClr[2]);
                grd.addColorStop("0.75", _s.themeClr[1]);
                grd.addColorStop("1", _s.themeClr[0]);

                _s.ctx.strokeStyle = grd;
                _s.ctx.stroke();
                _s.ctx.closePath();
            }
	    }


        // Draw waves.
       _s.drawWave = function(incr,  opacity, fill, clr){
	    	var fr = 300;
	     	var u = [];
            for (var i=0; i<_s.sW + 20; i+=20) {
                var e = Math.round(_s.data_ar.length/3 * i/_s.sW * 1);
                u.push(i);
                u.push(_s.sH - _s.data_ar[e * incr] * _s.sH/fr + 1);
            }

            var c = .5;
            var d = 16;
            var h = true;
            var data_final_ar = [];
            var data_calc_ar = u.slice();
            data_calc_ar.unshift(u[1]);
            data_calc_ar.unshift(u[0]);
            data_calc_ar.push(u[u.length - 2]);
            data_calc_ar.push(u[u.length - 1]);

            for (var i = 2; i < data_calc_ar.length - 2; i += 2){
                for (var j = 0; j <= d; j++) {
                    var a = (data_calc_ar[i + 2] - data_calc_ar[i - 2]) * c;
                    var z = (data_calc_ar[i + 4] - data_calc_ar[i]) * c;
                    var n = (data_calc_ar[i + 3] - data_calc_ar[i - 1]) * c;
                    var k = (data_calc_ar[i + 5] - data_calc_ar[i + 1]) * c;

                    var m = j / d;
                    var p = 2 * (m * m * m) - 3 * (m * m) + 1;
                    var q = -(2 * (m * m * m)) + 3 * (m * m);
                    var r = (m * m * m) - 2 * (m * m) + m;
                    m = (m * m * m) - (m * m);

                    var startP = p * data_calc_ar[i] + q * data_calc_ar[i + 2] + r * a + m * z;
                    var endP = p * data_calc_ar[i + 1] + q * data_calc_ar[i + 3] + r * n + m * k;

                    data_final_ar.push(startP);
                    data_final_ar.push(endP)
                }
            }
           
            _s.ctx.beginPath();
            _s.ctx.moveTo(data_final_ar[0], data_final_ar[1]);
            for (i=2; i<data_final_ar.length - 1; i += 2){
            	_s.ctx.lineTo(data_final_ar[i], data_final_ar[i + 1]);
            }

            if(fill){
	            _s.ctx.lineTo(_s.sW, _s.sH);
                _s.ctx.lineTo(0, _s.sH)
                _s.ctx.fillStyle = "rgba(" + _s.getHexClr(clr).r + ", " + _s.getHexClr(clr).g + ", " + _s.getHexClr(clr).b + ", " + opacity + ")";
                _s.ctx.fill();
                _s.ctx.closePath();
            }else{
            	_s.ctx.strokeStyle = "rgba(" + _s.getHexClr(clr).r + ", " + _s.getHexClr(clr).g + ", " + _s.getHexClr(clr).b + ", " + opacity + ")";
                _s.ctx.stroke();
                _s.ctx.closePath();
            }
        }

        _s.drawWave2 = function(){
        	var fr = 4;
        	if(_s.sW > 1000){
        		fr = 4;
        	}else if(_s.sW < 200){
        		fr = 15;
        	}else if(_s.sW < 400){
        		fr = 8;
        	}
            _s.ctx.clearRect(0, 0, _s.sW, _s.sH);
            _s.ctx.lineWidth = 1;
            _s.ctx.miterLimit = 1;
            _s.ctx.beginPath();
           
            _s.ctx.moveTo(0, _s.sH);
            for (var i=0; i<_s.data_ar.length; i++){
            	_s.ctx.lineTo(i * _s.sW/_s.data_ar.length * fr, _s.sH - _s.data_ar[i] * _s.sH/255 + 1);
            } 
            _s.ctx.lineTo(_s.sW, _s.sH);
            _s.ctx.lineTo(0, _s.sH) 
            _s.ctx.fillStyle = "rgba(" + _s.getHexClr(_s.themeClr).r + ", " + _s.getHexClr(_s.themeClr).g + ", " + _s.getHexClr(_s.themeClr).b + ", 1.0)";
            _s.ctx.fill();
            _s.ctx.closePath();
        }


        // Get integers colors from hex.
        _s.getHexClr = function(a){
            return (a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a)) ? {
                r: parseInt(a[1], 16),
                g: parseInt(a[2], 16),
                b: parseInt(a[3], 16)
            } : null
        }

		_s.init();
	}


	/* set prototype */
	FWDRAPVisualizer.setPrototype = function(){
		FWDRAPVisualizer.prototype = new FWDRAPDisplayObject("div");
	};

	window.FWDRAPVisualizer = FWDRAPVisualizer;
}(window));