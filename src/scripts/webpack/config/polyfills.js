'use strict';

//Babel includes a polyfill that includes a custom regenerator runtime and core-js.

// This will emulate a full ES2015+ environment and is intended to be used in an application rather than a library/tool.
// This polyfill is automatically loaded when using babel-node.

// This means you can use new built-ins like Promise or WeakMap,
// static methods like Array.from or Object.assign, instance methods like Array.prototype.includes,
// and generator functions (provided you use the regenerator plugin).
// The polyfill adds to the global scope as well as native prototypes like String in order to do this.
if (
  (typeof window !== 'undefined' && !window._babelPolyfill) ||
  (typeof global !== 'undefined' && !global._babelPolyfill)
) {
  require('@babel/polyfill');
}

// fetch() polyfill for making API calls.
require('isomorphic-fetch');

// In tests, polyfill requestAnimationFrame since jsdom doesn't provide it yet.
// We don't polyfill it in the browser--this is user's responsibility.
if (process.env.NODE_ENV === 'test') {
  require('raf').polyfill(global);
}
