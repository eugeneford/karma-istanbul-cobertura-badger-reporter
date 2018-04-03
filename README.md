# karma-istanbul-cobertura-badger-reporter
Karma reporter for https://github.com/intuit/istanbul-cobertura-badger

## How to install
```js
npm install --save-dev karma-istanbul-cobertura-badger-reporter
```

## Get Started
``karma-istanbul-cobertura-badger-reporter`` works perfectly with ``karma-coverage-istanbul-reporter``. 

You should simply update your karma configuration a bit:

```diff
module.exports = (config) => {
  config.set({
      ...
      reporters: ['coverage-istanbul', 'cobertura-badger'],
      coverageIstanbulReporter: {
        ...
-       reports: ['lcov'],
+       reports: ['lcov', 'cobertura'],
        ...
      },
+      istanbulCoberturaBadger: {
+        badgeFileName: 'coverage', // => coverage.svg
+        destinationDir: './',
+        istanbulReportFile: "./coverage/cobertura-coverage.xml", // path to cobertura xml report 
+      }
      ...
    });
};
```

You're are also able to pass any other options from ``istanbul-cobertura-badger``. More info here: https://github.com/intuit/istanbul-cobertura-badger#examples

## Contributing
Contributions are always welcome.
Before contributing please read the [code of conduct](https://js.foundation/community/code-of-conduct) &
[search the issue tracker](https://github.com/eugeneford/karma-istanbul-cobertura-badger-reporter/issues) (your issue may have already been discussed or fixed).

To contribute, follow next steps:
* Fork ``karma-istanbul-cobertura-badger-reporter``
* Commit your changes
* Open a Pull Request.

### Feature Requests
Feature requests should be submitted in the issue tracker, with a description
of the expected behavior & use case, where they'll remain closed until sufficient interest (e.g. :+1: reactions).
Before submitting a feature request, please search for similar ones in the closed issues.

## License
Released under the [MIT License](https://github.com/eugeneford/karma-istanbul-cobertura-badger-reporter/blob/master/LICENSE)
