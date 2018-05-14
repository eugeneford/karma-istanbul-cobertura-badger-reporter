var coverageBadger = require('istanbul-cobertura-badger');
var extend = require('xtend');
var fs = require('fs');

var baseConfig = {
  badgeFileName: 'coverage',
  destinationDir: './',
  istanbulReportFile: "./coverage/cobertura-coverage.xml",
};

var BadgerReporter = function (baseReporterDecorator, config, logger) {
  baseReporterDecorator(this);

  var log = logger.create('cobertura-badger');
  var opts = extend(baseConfig, config.istanbulCoberturaBadger);
  var exitCode = 0;

  var baseReporterOnRunComplete = this.onRunComplete;
  this.onRunComplete = function (browsers, results) {
    baseReporterOnRunComplete.apply(this, arguments);
    exitCode = results.exitCode;
  }

  var baseReporterOnExit = this.onExit;
  this.onExit = function (done) {
    if (baseReporterOnExit) baseReporterOnExit.apply(this, arguments);
    if (exitCode !== 0) return done();

    if (!fs.existsSync(opts.istanbulReportFile)) {
      log.error('"' + opts.istanbulReportFile + '" does not exists.');
      return done();
    };

    var xmlReport = fs.readFileSync(opts.istanbulReportFile, 'utf8');
    var isEmpty = /<packages>\s*<\/packages>/i.test(xmlReport);

    if (isEmpty) {
      log.info('Coverage report is empty. Skipping badge generation.');
      return done();
    }

    coverageBadger(opts, function (err, status) {
      if (err) log.error(err.message);
      log.info('Badge successfully generated at ' + status.badgeFile.filePath);
      return done();
    });
  };
};

module.exports = {
  'reporter:cobertura-badger': ['type', BadgerReporter],
};
