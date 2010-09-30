//
// sequencer.js - sequencer implementation
//

Sequencer = function(arr, opts) {

  arr  = arr || [];
  opts = opts || {};

  //
  // TODO : Fix ugly option names
  //

  opts.useTry      = opts.useTry      || false;
  opts.useLogging  = opts.useLogging  || false;
  opts.useContinue = opts.useContinue || false;

  var running = false;
  var self    = this;

  this.isRunning = function() {
    return running;
  }

  this.start = function(cb) {
    cb && self.add(cb);
    running = true;
    this.next();
  }

  this.stop = function() {
    running = false;
  }

  this.startCallback = function(cb) {
    return function() {
      self.next();
    }
  }

  this.add = function(cb) {
    arr.push(cb);
  }

  this.next = function() {
    if (running && (arr.length != 0)) {
      var func = arr.shift();
      var cb   = function() {
        self.next();
      }
      if (opts.useTry) {

        //
        // This will *only* catch errors in func and not in the cb call
        //

        try {
          func(cb);
        } catch(e) {
          if (opts.useLogging) {
            console.log("Sequencer.next : error " + e.message);
          }
          if (opts.useContinue) {
            self.next();
          }
        }
      } else {
        func(cb);
      }
    }
  }

}


