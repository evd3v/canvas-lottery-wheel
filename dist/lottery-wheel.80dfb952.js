// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../src/wheel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wheel = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var _OFFSET_GAP = new WeakMap();

var _INSIDE_GAP = new WeakMap();

var _INSIDE_STROKE_WIDTH = new WeakMap();

var _CENTER_STROKE_WIDTH = new WeakMap();

var _SECTOR_BORDER_WIDTH = new WeakMap();

var _SPIN_ANGLE = new WeakMap();

var _CURRENT_ROTATION_ANGLE = new WeakMap();

var _render = new WeakSet();

var _setup = new WeakSet();

var _generateSectors = new WeakSet();

var _mapSectors = new WeakSet();

var _renderSectors = new WeakSet();

var _renderText = new WeakSet();

var Wheel = /*#__PURE__*/function () {
  function Wheel(selector, options) {
    _classCallCheck(this, Wheel);

    _renderText.add(this);

    _renderSectors.add(this);

    _mapSectors.add(this);

    _generateSectors.add(this);

    _setup.add(this);

    _render.add(this);

    _OFFSET_GAP.set(this, {
      writable: true,
      value: 10
    });

    _INSIDE_GAP.set(this, {
      writable: true,
      value: 35
    });

    _INSIDE_STROKE_WIDTH.set(this, {
      writable: true,
      value: 10
    });

    _CENTER_STROKE_WIDTH.set(this, {
      writable: true,
      value: 10
    });

    _SECTOR_BORDER_WIDTH.set(this, {
      writable: true,
      value: 3
    });

    _SPIN_ANGLE.set(this, {
      writable: true,
      value: Math.PI / 30
    });

    _CURRENT_ROTATION_ANGLE.set(this, {
      writable: true,
      value: 0
    });

    if (!options.sectors) {
      throw new Error("there are no sectors!");
    }

    this.$root = document.querySelector(selector);
    this.$canvas = document.createElement("canvas");
    this.$ctx = this.$canvas.getContext("2d");
    this.sectors = options.sectors;

    _classPrivateMethodGet(this, _setup, _setup2).call(this);
  }

  _createClass(Wheel, [{
    key: "rotate",
    value: function rotate() {
      var _this = this;

      setInterval(function () {
        _classPrivateFieldSet(_this, _CURRENT_ROTATION_ANGLE, _classPrivateFieldGet(_this, _CURRENT_ROTATION_ANGLE) + _classPrivateFieldGet(_this, _SPIN_ANGLE));

        console.log(_classPrivateFieldGet(_this, _CURRENT_ROTATION_ANGLE));

        _classPrivateMethodGet(_this, _render, _render2).call(_this);
      }, 30);
    }
  }, {
    key: "resizeHandler",
    value: function resizeHandler() {
      this.rootSize = {
        width: this.$root.clientWidth || 0,
        height: this.$root.clientHeight || 0
      };
    }
  }, {
    key: "createOuterGradient",
    value: function createOuterGradient() {
      var gradient = this.$ctx.createLinearGradient(this.center.x - this.radius, this.center.y, this.center.x + this.radius, this.center.y);
      gradient.addColorStop(0, "#990066");
      gradient.addColorStop(1, "#FF9966");
      return gradient;
    }
  }, {
    key: "drawOuterArk",
    value: function drawOuterArk() {
      this.$ctx.beginPath();
      this.$ctx.arc(this.center.x, this.center.y, this.radius, 0.05, Math.PI * 2);
      this.$ctx.fillStyle = this.createOuterGradient();
      this.$ctx.fill();
    }
  }, {
    key: "drawInnerArk",
    value: function drawInnerArk() {
      this.$ctx.beginPath();
      this.$ctx.arc(this.center.x, this.center.y, this.innerRadius, 0, Math.PI * 2);
      this.$ctx.lineWidth = _classPrivateFieldGet(this, _INSIDE_STROKE_WIDTH);
      this.$ctx.fillStyle = "#990066";
      this.$ctx.fill();
      this.$ctx.strokeStyle = "#1A173B";
      this.$ctx.stroke();
    }
  }, {
    key: "drawCenterArk",
    value: function drawCenterArk() {
      this.$ctx.beginPath();
      this.$ctx.arc(this.center.x, this.center.y, this.centerRadius, 0, Math.PI * 2);
      this.$ctx.lineWidth = _classPrivateFieldGet(this, _CENTER_STROKE_WIDTH);
      this.$ctx.strokeStyle = "#1A173B";
      this.$ctx.stroke();
    }
  }, {
    key: "drawTriangle",
    value: function drawTriangle() {
      this.$ctx.beginPath();
      var startX = this.center.x + this.innerRadius;
      var startY = this.center.y;
      this.$ctx.moveTo(startX + 20, startY - 20);
      this.$ctx.lineTo(startX + 20, startY + 20);
      this.$ctx.lineTo(startX - 20, startY);
      this.$ctx.closePath();
      this.$ctx.fillStyle = "#fff";
      this.$ctx.fill();
    }
  }, {
    key: "rotateAngle",
    get: function get() {
      return this.sectorStep + Math.PI / this.sectors.length + _classPrivateFieldGet(this, _CURRENT_ROTATION_ANGLE);
    }
  }, {
    key: "sectorStep",
    get: function get() {
      return 2 * Math.PI / this.sectors.length;
    }
  }, {
    key: "center",
    get: function get() {
      return {
        x: Math.round(this.rootSize.width / 2),
        y: Math.round(this.rootSize.height / 2)
      };
    }
  }, {
    key: "radius",
    get: function get() {
      return (this.rootSize.width > this.rootSize.height ? this.center.y : this.center.x) - _classPrivateFieldGet(this, _OFFSET_GAP);
    }
  }, {
    key: "innerRadius",
    get: function get() {
      return this.radius - _classPrivateFieldGet(this, _INSIDE_GAP);
    }
  }, {
    key: "centerRadius",
    get: function get() {
      return this.radius * 0.35;
    }
  }, {
    key: "rootSize",
    get: function get() {
      return {
        width: this.$root.clientWidth || 0,
        height: this.$root.clientHeight || 0
      };
    },
    set: function set(size) {
      this.$canvas.height = size.height;
      this.$canvas.width = size.width;

      _classPrivateMethodGet(this, _render, _render2).call(this);

      this.rotate();
    }
  }]);

  return Wheel;
}();

exports.Wheel = Wheel;

var _render2 = function _render2() {
  this.drawOuterArk();
  this.drawInnerArk();
  this.drawCenterArk();

  _classPrivateMethodGet(this, _generateSectors, _generateSectors2).call(this);

  this.drawTriangle();
};

var _setup2 = function _setup2() {
  this.$root.appendChild(this.$canvas);
  this.resizeHandler = this.resizeHandler.bind(this);
  window.addEventListener("resize", this.resizeHandler);
  this.resizeHandler();
};

var _generateSectors2 = function _generateSectors2() {
  _classPrivateMethodGet(this, _mapSectors, _mapSectors2).call(this);

  _classPrivateMethodGet(this, _renderSectors, _renderSectors2).call(this);

  _classPrivateMethodGet(this, _renderText, _renderText2).call(this);
};

var _mapSectors2 = function _mapSectors2() {
  var _this2 = this;

  this.sectors = this.sectors.map(function (item, index) {
    var offsetAngle = (_this2.sectorStep * (index + 1) - _this2.sectorStep * index) / 2 + _this2.sectorStep * index;
    return {
      id: index,
      offsetAngle: offsetAngle,
      text: item.text || item,
      startAngle: _this2.sectorStep * index,
      endAngle: _this2.sectorStep * (index + 1),
      x1: _this2.centerRadius * Math.cos(offsetAngle) + _this2.center.x,
      y1: _this2.centerRadius * Math.sin(offsetAngle) + _this2.center.y,
      x2: _this2.innerRadius * Math.cos(offsetAngle) + _this2.center.x,
      y2: _this2.innerRadius * Math.sin(offsetAngle) + _this2.center.y
    };
  });
};

var _renderSectors2 = function _renderSectors2() {
  var _this3 = this;

  this.$ctx.lineWidth = _classPrivateFieldGet(this, _SECTOR_BORDER_WIDTH);
  this.sectors.forEach(function (item) {
    _this3.$ctx.beginPath();

    _this3.$ctx.fillStyle = item.id % 2 === 0 ? "#990066" : "#6633CC";

    _this3.$ctx.arc(_this3.center.x, _this3.center.y, _this3.innerRadius, item.startAngle + _this3.rotateAngle + 2 * _classPrivateFieldGet(_this3, _SECTOR_BORDER_WIDTH) / (Math.PI * _this3.innerRadius), item.endAngle + _this3.rotateAngle, false);

    _this3.$ctx.arc(_this3.center.x, _this3.center.y, _this3.centerRadius, item.endAngle + _this3.rotateAngle, item.startAngle + 2 * _classPrivateFieldGet(_this3, _SECTOR_BORDER_WIDTH) / (Math.PI * _this3.centerRadius) + _this3.rotateAngle, true);

    _this3.$ctx.stroke();

    _this3.$ctx.fill();

    _this3.$ctx.save();
  });
};

var _renderText2 = function _renderText2() {
  var _this4 = this;

  this.sectors.forEach(function (item) {
    var textRotateAngle = 0.03; // based on text height

    var halfSectorAngle = (item.endAngle - item.startAngle) / 2 - textRotateAngle;
    var offsetRadius = (_this4.centerRadius - _this4.innerRadius) / 2 + _this4.innerRadius;

    _this4.$ctx.save();

    _this4.$ctx.font = "24px serif";
    _this4.$ctx.fillStyle = "#fff";

    _this4.$ctx.translate(_this4.center.x + offsetRadius * Math.cos(item.offsetAngle - halfSectorAngle + _classPrivateFieldGet(_this4, _CURRENT_ROTATION_ANGLE)), _this4.center.y + offsetRadius * Math.sin(item.offsetAngle - halfSectorAngle + _classPrivateFieldGet(_this4, _CURRENT_ROTATION_ANGLE)));

    _this4.$ctx.textAlign = "center";

    _this4.$ctx.rotate(item.offsetAngle - halfSectorAngle + _classPrivateFieldGet(_this4, _CURRENT_ROTATION_ANGLE));

    _this4.$ctx.fillText(item.text, 0, 0);

    _this4.$ctx.restore();
  });
};
},{}],"../../../../../usr/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../../../usr/lib/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../../../../usr/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"../src/styles.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../../../../usr/lib/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../index.js":[function(require,module,exports) {
"use strict";

var _wheel = require("./src/wheel");

require("./src/styles.scss");

var wheel = new _wheel.Wheel("#canvas-container", {
  sectors: ["one", "two", "three", "four", "five", "one", "two", "three", "four", "five", "one", "two", "three", "four", "five", "one", "two", "three", "four", "five", "one", "two", "three", "four", "five", "one", "two", "three", "four", "five", "one", "two", "three", "four", "five", "one", "two", "three", "four", "five", "one", "two", "three", "four", "five", "one", "two", "three", "four", "five"]
});
window.s = wheel;
},{"./src/wheel":"../src/wheel.js","./src/styles.scss":"../src/styles.scss"}],"../../../../../usr/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "37803" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../usr/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../index.js"], null)
//# sourceMappingURL=/lottery-wheel.80dfb952.js.map