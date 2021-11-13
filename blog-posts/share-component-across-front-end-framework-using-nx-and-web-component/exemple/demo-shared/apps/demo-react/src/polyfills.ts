/**
 * Polyfill stable language features. These imports will be optimized by `@babel/preset-env`.
 *
 * See: https://github.com/zloirock/core-js#babel
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import "@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js"
import "@webcomponents/webcomponentsjs/webcomponents-loader.js"