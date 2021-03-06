// we run mocha manually otherwise istanbul coverage won't work
// run `npm test --coverage` to generate coverage report

var Mocha = require('mocha');

// to set these options run the test script like:
//  > BAIL=true GREP=array_expression REPORTER=dot npm test
var opts = {
  ui: 'bdd',
  bail: !!process.env.BAIL,
  reporter: process.env.REPORTER || 'spec',
  grep: process.env.GREP,
  colors: true,
};

// we use the dot reporter on travis since it works better
if (process.env.TRAVIS) {
  opts.reporter = 'dot';
}

var m = new Mocha(opts);

if (process.env.INVERT) {
  m.invert();
}

var expand = require('glob-expand');
expand('test/specs/**/*.js').forEach(function (file) {
  m.addFile(file);
});

m.run(function (err) {
  var exitCode = err ? 1 : 0;
  if (err) {
    console.log('failed tests: ' + err);
  }

  process.exit( exitCode ); // eslint-disable-line
});
