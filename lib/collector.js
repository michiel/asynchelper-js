//
// collector.js - collector implementation
//

Collector = function(arr, final) {

  arr  = arr || [];
  if (typeof(final) != 'function') {
    throw new Error("Collector : second argument has to be a function.");
  }

  var counter = 0;
  var self    = this;

  this.start = function(cb) {
    cb && self.add(cb);
    for (var i=0; i<arr.length; i++) {
      arr[i](function() {
          self.incoming();
        });
    }
  }

  this.incoming = function() {
    counter++;
    if (counter == arr.length) {
      final();
    }
  }

  this.startCallback = function(cb) {
    return function() {
      self.start();
    }
  }

  this.add = function(cb) {
    arr.push(cb);
  }

}



