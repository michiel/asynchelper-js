if (!shiv) {
  throw(new Error("Don't load this file directly! Use shiv.load()"));
}

shiv.log = (function() {

    var ul = document.getElementById("logger")
    if (!ul) {
      ul = document.createElement("ul");
      document.body.appendChild(ul);
    }
  
    return function(msg) {
      if (shiv.logLevel > 0) {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(msg));
        ul.appendChild(li);
      }
    }

  })();

shiv.log("Set up DOM logger");

