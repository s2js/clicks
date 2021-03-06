/*
 * Copyright (c) 2012 VMware, Inc. All Rights Reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

(function (buster, define) {
	"use strict";

	var doc, assert, refute, supports, undef;

	assert = buster.assert;
	refute = buster.refute;

	doc = window.document;

	supports = {
		localStorage: 'localStorage' in window,
		sessionStorage: 'sessionStorage' in window,
		comparableStorage: function (type) {
			try {
				if (window[type] === window[type]) {
					// should always be true, but throws in IE 8
				}
				return true;
			}
			catch (e) {
				return false;
			}
		}
	};

	define('clicks/transforms/storage-test', function (require) {

		var storageTransform = require('clicks/transforms/storage');

		buster.testCase('clicks/transforms/storage', {
			'should detect localStorage': {
				requiresSupportFor: {
					localStorage: supports.localStorage,
					comparableStorage: supports.comparableStorage('localStorage')
				},
				'': function () {
					assert.equals('local', storageTransform(window.localStorage));
				}
			},
			'should detect sessionStorage': {
				requiresSupportFor: {
					sessionStorage: supports.sessionStorage,
					comparableStorage: supports.comparableStorage('sessionStorage')
				},
				'': function () {
					assert.equals('session', storageTransform(window.sessionStorage));
				}
			},
			'should return undefined for unknown Storage': function () {
				assert.same(undef, storageTransform({}));
				assert.same(undef, storageTransform(undef));
			}
		});

	});

}(this.buster, define));
