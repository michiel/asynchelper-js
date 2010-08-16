if (!shiv) {
  throw(new Error("Don't load this file directly! Use shiv.load()"));
}

shiv.test = function(name, testfunc, resfunc) {
  var res  = testfunc();
  var pass = resfunc(res);

  if (!pass) {
    shiv.log("Test " + name + " : FAILED");
    shiv.log("Test " + name + " : Expected " + res + ", got " + pass);
  } else {
    shiv.log("Test " + name + " : PASSED");
  }
}

