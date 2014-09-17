function createRequest() {
  try {
    request = new XMLHttpRequest();
  } catch (tryMS) {
    try {
      request = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (otherMS) {
      try {
        request = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (failed) {
        request = null;
      }
    }
  } 
  return request;
}


var EventUtil={
  addHandler : function(element, type, handler){
    if(element.addEventListener){
      element.addEventListener(type, handler, false);
    } else if(element.attachEvent){
      element.attachEvent("on" + type, handler);
    } else {
      element["on" + type] = handler;
    }
  },
  removeHandler : function(element, type, handler){
    if (element.removeEventListener){
      element.removeEventListener(type, handler, false);
    } else if(element.detachEvent){
      element.detachEvent("on" + type, handler);
    } else {
      element["on" + type]=null;
    }
  },
  getEvent : function(event){
    return event ? event : window.event;
  },
  getTarget : function(event){
    return event.target || event.srcElement;
  },
  preventDefault : function(event){
    if (event.preventDefault){
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  },
  stopPropagetion : function(event){
    if (event.stopPropagetion){
      event.stopPropagetion();
    } else {
      event.cancelBubble = true;
    }
  },
  getRelatedTarget : function(event){
    if (event.relatedTarget){
      return event.relatedTarget;
    } else if (event.toElement){
      return event.toElement;
    } else if (event.fromElement){
      return event.fromElement;
    } else {
      return null;
    }
  },
  getWhellDelta : function(event){
    if (event.whellDelta){
      // Opera event later to write
    } else {
      return -event.detail*40;
    }
  },
  getCharCode : function(event){
    if (typeof event.charCode == "number"){
      return event.charCode;
    } else {
      return event.keyCode;
    }
  }
};
function disableBtn(element){
  element.disabled=true;
  element.style.background="#ccc";
}
function activeBtn(element){
  element.disabled=false;
  element.style.background="#498af2";
}
var Geometry = {};
if(window.screenLeft){ //IE and others
  Geometry.getWindowX = function(){ return window.screenLeft;};
  Geometry.getWindowY = function(){ return window.screenTop;};
}
else if(window.screenX){ //Firefox and others
  Geometry.getWindowX = function(){ return window.screenX;};
  Geometry.getWindowY = function(){ return window.screenY;};
}

if(window.innerWidth){ //All browsers but IE
  Geometry.getViewportWidth = function(){ return window.innerWidth;};
  Geometry.getViewportHeight = function(){ return window.innerHeight;};
  Geometry.getHorizontalScroll = function(){ return window.pageXOffset;};
  Geometry.getVerticalScroll = function(){ return window.pageYOffset;};
}
else if (document.documentElement && document.documentElement.clientWidth){ 
  //These functions are for IE6 when there is a DOCTYPE
  Geometry.getViewportWidth = function(){ return document.documentElement.clientWidth;};
  Geometry.getViewportHeight = function(){ return document.documentElement.clientHeight;};
  Geometry.getHorizontalScroll = function(){ return document.documentElement.scrollLeft;};
  Geometry.getVerticalScroll = function(){ return document.documentElement.scrollTop;};
}
else if (document.body.clientWidth){
  //These are for IE4,,IE5,and IE6 without a DOCTYPE
  Geometry.getViewportWidth=function(){ return document.body.clientWidth;};
  Geometry.getViewportHeight=function(){ return document.body.clientHeight;};
  Geometry.getHorizontalScroll=function(){ return document.body.scrollLeft;};
  Geometry.getVerticalScroll=function(){ return document.body.scrollTop;};
}

//There functions return the size of the document. They are not window
//related,but they are useful to have here anyway.
if(document.documentElement && document.documentElement.scrollWidth){
  Geometry.getDocumentWidth = function(){ return document.documentElement.scrollWidth;};
  Geometry.getDocumentHeight = function(){ return document.documentElement.scrollHeight;};
}
else if(document.body.scrollWidth){
  Geometry.getDocumentWidth = function(){ return document.body.scrollWidth;};
  Geometry.getDocumentHeight = function(){ return document.body.scrollHeight;};
}
header=document.getElementsByTagName('header');
EventUtil.addHandler(header[0],"click",scrollTop);
function scrollTop(){
  if(Geometry.getVerticalScroll()>0){
    window.scrollTo(0);
  }
}

// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
(function(){
  var cache = {};
 
  this.tmpl = function tmpl(str, data){
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
        tmpl(document.getElementById(str).innerHTML) :
     
      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
       
        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +
       
        // Convert the template into pure JavaScript
        str
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');");
   
    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
  };
})();