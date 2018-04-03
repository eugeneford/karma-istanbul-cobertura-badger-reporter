var coverageBadger = require('istanbul-cobertura-badger');
var extend = require('xtend');

var baseConfig = {
  badgeFileName: 'coverage',
  destinationDir: './',
  istanbulReportFile: "./coverage/cobertura-coverage.xml",
};

var BadgerReporter = function (baseReporterDecorator, config, logger) {
  baseReporterDecorator(this);

  var log = logger.create('cobertura-badger');
  var opts = extend(baseConfig, config.istanbulCoberturaBadger);

  const baseReporterOnExit = this.onExit;
  this.onExit = function (done) {
    if (baseReporterOnExit) baseReporterOnExit.apply(this, arguments);

    coverageBadger(opts, function (err, status) {
      if (err) log.error(err.message);
      log.info('Badge successfully generated at ' + status.badgeFile.filePath);
      done();
    });
  };
};

module.exports = {
  'reporter:cobertura-badger': ['type', BadgerReporter],
};
