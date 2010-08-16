if (typeof(shiv) == "undefined") {
  throw(new Error("Don't load this file directly! Use shiv.load()"));
}

//
// Trivial hitch
//

shiv.hitch = function(scope, func) {
  return function() {
    func.apply(scope);
  };
}

shiv.memo = function(arr, func, mem) {
  for (var i=0; i<arr.length; i++) {
    mem = func(arr[i], mem);
  }
  return mem;
}

shiv.contains = function(arr, value) {
  var found = false;
  for (var i=0; i<arr.length; i++) {
    if (arr[i] == value) {
      found = true;
    }
  }
  return found;
}

shiv.runAll = function(arr) {
  var ret = [];
  for (var i=0; i<arr.length; i++) {
    ret.push(arr[i]());
  }
  return ret;
}

//
// Array extras, available in JS1.6+
//

shiv.indexOf = function(arr, val) {
  for (var i=0; i<arr.length; i++) {
    if (arr[i] == val) {
      return i;
    }
  }
  return null;
}

shiv.lastIndexOf = function(arr, val) {
  var ret = null;
  for (var i=0; i<arr.length; i++) {
    if (arr[i] == val) {
      ret = i;
    }
  }
  return ret;
}

shiv.every = function(arr, func) {
  var ret = true;
  for (var i=0; i<arr.length; i++) {
    if (!func(arr[i])) {
      ret = false;
    }
  }
  return ret;
}

shiv.filter = function(arr, func) {
  var ret = [];
  for (var i=0; i<arr.length; i++) {
    if (func(arr[i])) {
      ret.push(arr[i]);
    }
  }
  return ret;
}

shiv.forEach = function(arr, func) {
  for (var i=0; i<arr.length; i++) {
    func(arr[i]);
  }
}

shiv.some = function(arr, func) {
  var ret = false;
  for (var i=0; i<arr.length; i++) {
    if (func(arr[i])) {
      ret = true;
    }
  }
  return !ret;
}

shiv.map = function(arr, func) {
  var ret = [];
  for (var i=0; i<arr.length; i++) {
    ret.push(func(arr[i]));
  }
  return ret;
}


