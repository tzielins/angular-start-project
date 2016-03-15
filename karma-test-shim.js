// Turn on full stack traces in errors to help debugging
Error.stackTraceLimit=Infinity;


jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

// // Cancel Karma's synchronous start,
// // we will call `__karma__.start()` later, once all the specs are loaded.
__karma__.loaded = function() {};





System.config({
	packages: {
		'base/app': {
			defaultExtension: false,
			format: 'register',
			map: Object.keys(window.__karma__.files).
			filter(onlyAppFiles).
			filter(noForms).
			reduce(function createPathRecords(pathsMapping, appPath) {

				// creates local module name mapping to global path with karma's fingerprint in path, e.g.:
				// './hero.service': '/base/src/app/hero.service.js?f4523daf879cfb7310ef6242682ccf10b2041b3e'
				var moduleName = appPath.replace(/^\/base\/app\//, './').replace(/\.js$/, '');
				pathsMapping[moduleName] = appPath + '?' + window.__karma__.files[appPath]
				return pathsMapping;
			}, {})

		}
	},
	map: {
		'moment': 'node_modules/moment/moment.js'
	}
});


/*
 Need those to run angular injection dependent test, Tried to add it using system.import chanin below
 https://github.com/angular/angular/commit/b0cebdb

 import {setBaseTestProviders} from 'angular2/testing';
 import {
 TEST_BROWSER_PLATFORM_PROVIDERS,
 TEST_BROWSER_APPLICATION_PROVIDERS
 } from 'angular2/platform/testing/browser';

 setBaseTestProviders(TEST_BROWSER_PLATFORM_PROVIDERS,
 TEST_BROWSER_APPLICATION_PROVIDERS);
 */

System.import('angular2/src/platform/browser/browser_adapter')
	.then(function(browser_adapter) {
		browser_adapter.BrowserDomAdapter.makeCurrent();
	})
	.then(function(v) {
		var testing_browser;

		return System.import('angular2/platform/testing/browser').then(
			function (t_browser) {
				testing_browser = t_browser;
				return t_browser;
			})
			.then(function () {
				return System.import('angular2/testing');
			}).then(function (testing) {
				return testing.setBaseTestProviders(testing_browser.TEST_BROWSER_PLATFORM_PROVIDERS, testing_browser.TEST_BROWSER_APPLICATION_PROVIDERS);
			}).then(function () {
				return v;
			});
	})
	.then(function() {
		return Promise.all(
			Object.keys(window.__karma__.files) // All files served by Karma.
				.filter(onlySpecFiles)
				.filter(noForms)
				.map(function(moduleName) {
					// loads all spec files via their global module names (e.g. 'base/src/app/hero.service.spec')
					return System.import(moduleName);
				})
		);
	})
	.then(function() {
			__karma__.start();
		},
		function(error) {
			__karma__.error(error.stack || error);
		});


function noForms(filePath) {
	if (filePath.indexOf('contribution-desc-form.component') > 0) return false;
	if (filePath.indexOf('experiment-assay-form.component') > 0) return false;
	return true;
	//return /\/base\/app\/(?!.*\.form\.component\.js$).*\.js$/.test(filePath);
}

function onlyAppFiles(filePath) {
	return /\/base\/app\/(?!.*\.spec\.js$).*\.js$/.test(filePath);
}


function onlySpecFiles(path) {
	return /spec\.js$/.test(path);
}

