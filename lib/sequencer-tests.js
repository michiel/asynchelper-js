shiv.addOnLoad(function() {
  var seq = new Sequencer([
    function(cb) {
      shiv.log("Log callback 1");
      cb && cb();
    },
    function(cb) {
      shiv.log("Log callback 2");
      cb && cb();
    },
    function(cb) {
      shiv.log("Log callback 3");
      cb && cb();
    }
  ]);

  seq.start();
});


