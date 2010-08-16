asynchelper-js
======

Simple Function to assist in running asynchronous calls.

Example
-------

    var seq = new Sequencer([
      function(cb) {
        shiv.log("Callback 1");
        cb && cb();
      },
      function(cb) {
        shiv.log("Callback 2");
        cb && cb();
      },
      function(cb) {
        shiv.log("Callback 3");
        cb && cb();
      }
    ]);

    seq.start();

TODO
----

Loads of stuff, this is just v0.

