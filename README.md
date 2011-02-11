asynchelper-js
======

The main repository has MOVED to https://github.com/michiel/sequencer-js

This repo is only here for reference purposes.

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

    var col = new Collector(
      [
        function(cb) {
          shiv.log("Callback 1");
          cb && cb();
        },
        function(cb) {
          shiv.log("Callback 2");
          cb && cb();
        }
      ],
      function(cb) {
        shiv.log("Final callback");
        cb && cb();
      }
    ]);

    col.start();

Rationale
---------

Programming in an environment that is largely asynchronous is very different from doing the same in a synchronous environment. The problem is usually categorized as being an Inversion of Control. Which sounds nice, but isn't very helpful.

Unless you really, really enjoy writing callback code inside callback code inside callback code (etc), you probably want to restore a little bit of sanity to your codebase. Enter asynchelper-js. It's a work-in-progress but the helper functions allow you to run sequences and collections in arbitrary pre-defined order and generally take the pain out of nesting callbacks in callbacks as well as allowing for easy re-ordering of the, uh, order in which they are called.

TODO
----

Loads of stuff, this is just v0. But to give you an idea,

 - Optionally make it a nodejs module
 - Add support for different loggers
 - Add test cases for the new Sequencer functionality/options
 - Increase sanity in error handling (where possible)
 - Documentation and tests

