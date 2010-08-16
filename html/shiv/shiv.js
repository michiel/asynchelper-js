var shiv = {
  version  : '0.0.1',
  prefix   : '',
  logLevel : 1,
  modules  : {}
};

shiv.isIE = /*@cc_on!@*/false;

shiv.addOnLoad = (function() {
    var onload = window.onload;
    var loadqueue = [];
    window.onload = function() {
      onload && onload();
      for (var i=0; i<loadqueue.length; i++) {
        loadqueue[i]();
      }
    }
    return function(func) {
      loadqueue.push(func);
    }
  })();

shiv.log = (function() {
    if (!shiv.isIE && (window.console != null)) {
      return function(msg) {
        if (shiv.logLevel > 0) {
          console.debug(msg);
        }
      };
    } else {
      return function() {};
    }
  })();

shiv.xhr = (function() {
    if (typeof XMLHttpRequest != "undefined") {
      return function() {
        return new XMLHttpRequest();
      };
    } else if (typeof ActiveXObject != "undefined") {
      return function() {
        return new ActiveXObject("Microsoft.XMLHTTP");
      };
    } else {
      throw new Error("XMLHttpRequest not supported");
    }
  })();

shiv._firexhr = function(xhr, opts) {
  if (opts.async) {
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        switch (xhr.status) {
        case 200: 
          opts.callback(xhr.responseText);
          break;
        default:
          shiv.log("Optimism is insufficient for this operation!");
          break;
        }
      }
    }
    xhr.send(opts.body);
  } else {
    xhr.send(opts.body);
    opts.callback(xhr.responseText);
  }
}

shiv.post = function(opts) {
  var xhr = shiv.xhr();
  opts.async = !!!(opts.sync || false);

  xhr.open( "POST", 
    opts.url      || '/' , 
    opts.async
  );

  xhr.setRequestHeader(
    "Content-type", 
    opts.contentType || "application/json"
  );

  xhr.setRequestHeader("Content-length", opts.body.length);
  xhr.setRequestHeader("Connection", "close");

  return shiv._firexhr(xhr, opts);

}

shiv.get = function(opts) {
  var xhr   = shiv.xhr();
  opts.async = !!!(opts.sync || false);

  xhr.open( "GET", 
    opts.url || '/' , 
    opts.async
  );

  return shiv._firexhr(xhr, opts);

}

shiv.load = function(res) {
  if (shiv.modules[res] != null) {
    shiv.log("shiv.load : Resource " + res + " already loaded");
  } else {
    shiv.log("shiv.load : Attempting to load resource " + res);
    shiv.get({
        url      : shiv.prefix + res + '.js',
        sync     : true,
        callback : function(data) {
          shiv.log("shiv.load.callback : loading resource " + res + " succeeded.");
          shiv.modules[res] = true;
          try {
            with (top) {
              eval(data); // Yeah, yeah, I know - eval is evil.
            }
          } catch(e) {
            shiv.log("shiv.load.callback : eval'ing resource " + res + " FAILED : " + e.toString());
          }
        }
      });
  }
}

