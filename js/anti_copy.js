!function(){"use strict";function e(){return{name:"anticopy",version:"1.0.0"}}function t(e){return e}document.addEventListener("contextmenu",function(e){e.preventDefault()}),document.addEventListener("selectstart",function(e){e.preventDefault()}),document.addEventListener("copy",function(e){e.preventDefault()}),document.addEventListener("cut",function(e){e.preventDefault()}),document.addEventListener("paste",function(e){e.preventDefault()}),window.addEventListener("keydown",function(e){(e.ctrlKey||e.metaKey)&&83===e.keyCode&&e.preventDefault()}),window.addEventListener("keydown",function(e){(e.ctrlKey||e.metaKey)&&85===e.keyCode&&e.preventDefault()}),window.addEventListener("keydown",function(e){(e.ctrlKey||e.metaKey)&&80===e.keyCode&&e.preventDefault()}),window.addEventListener("keydown",function(e){(e.ctrlKey||e.metaKey)&&e.shiftKey&&73===e.keyCode&&e.preventDefault()}),window.addEventListener("keydown",function(e){(e.metaKey&&e.shiftKey&&82===e.keyCode||e.ctrlKey&&e.shiftKey&&82===e.keyCode)&&e.preventDefault()}),window.addEventListener("keydown",function(e){(e.ctrlKey||e.metaKey)&&65===e.keyCode&&e.preventDefault()}),window.addEventListener("keydown",function(e){(e.ctrlKey||e.metaKey)&&67===e.keyCode&&e.preventDefault()}),window.addEventListener("keydown",function(e){(e.ctrlKey||e.metaKey)&&88===e.keyCode&&e.preventDefault()}),window.addEventListener("keydown",function(e){(e.ctrlKey||e.metaKey)&&86===e.keyCode&&e.preventDefault()}),document.addEventListener("dragstart",function(e){e.preventDefault()}),document.addEventListener("mousedown",function(e){"IMG"===e.target.tagName&&e.preventDefault()}),document.addEventListener("keydown",function(e){e.ctrlKey&&e.shiftKey&&"J"===e.key&&(e.preventDefault(),e.stopPropagation())})}();