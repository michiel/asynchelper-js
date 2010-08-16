//
// asynchelper.js - asynchronous support library
//

Sequencer = function(arr) {

  arr = arr || [];

  var running = false;
  var self    = this;

  this.isRunning = function() {
    return running;
  }

  this.start = function() {
    running = true;
    this.next();
  }

  this.stop = function() {
    running = false;
  }

  this.next = function() {
    if (running && (arr.length != 0)) {
      arr.shift()(
        function() {
          self.next();
        }
      );
    }
  }

}


