/*! @ryanmorr/bem v0.2.0 | https://github.com/ryanmorr/bem */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.bem = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = bem;

var _block = _interopRequireDefault(require("./block"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Provide a CSS selector string, DOM
 * element, or nodelist/array and get
 * a `BEMBlock` instance to traverse and
 * manipulate the component
 *
 * @param {String|Element|ArrayLike} blocks
 * @param {...String} modifiers
 * @return {BEM}
 * @api public
 */
function bem(selector) {
  var elements = selector;

  if (typeof selector === 'string') {
    elements = document.querySelectorAll(selector);
  }

  if (selector.nodeType) {
    elements = [selector];
  }

  for (var _len = arguments.length, modifiers = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    modifiers[_key - 1] = arguments[_key];
  }

  return _construct(_block.default, [elements].concat(modifiers));
}

module.exports = exports.default;

},{"./block":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = _interopRequireDefault(require("./element"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * BEM block class
 *
 * @class BEMBlock
 * @extends BEMElement
 * @api public
 */
var BEMBlock =
/*#__PURE__*/
function (_BEMElement) {
  _inherits(BEMBlock, _BEMElement);

  /**
   * Instantiate the class with a collection
   * of block level elements and optionally
   * one or more modifiers to filter the
   * collection
   *
   * @constructor
   * @param {ArrayLike} elements
   * @param {...String} modifiers
   * @api private
   */
  function BEMBlock(elements) {
    for (var _len = arguments.length, modifiers = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      modifiers[_key - 1] = arguments[_key];
    }

    _classCallCheck(this, BEMBlock);

    var name = (0, _util.getBlockName)(elements[0]);

    if (modifiers.length) {
      elements = Array.from(elements).filter(function (el) {
        return _util.hasModifiers.apply(void 0, [el, name].concat(modifiers));
      });
    }

    return _possibleConstructorReturn(this, _getPrototypeOf(BEMBlock).call(this, elements, name));
  }
  /**
   * Find BEM block-elements that are decendants
   * of the collection of block elements
   *
   * @param {String} elementName
   * @param {...String} modifiers
   * @return {BEMElement}
   * @api public
   */


  _createClass(BEMBlock, [{
    key: "element",
    value: function element(elementName) {
      for (var _len2 = arguments.length, modifiers = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        modifiers[_key2 - 1] = arguments[_key2];
      }

      var name = (0, _util.getElementName)(this.name, elementName);
      var elements = [];
      this.each(function (el) {
        return elements.push.apply(elements, el.getElementsByClassName(name));
      });

      if (modifiers.length) {
        elements = elements.filter(function (el) {
          return _util.hasModifiers.apply(void 0, [el, name].concat(modifiers));
        });
      }

      return new _element.default(elements, name);
    }
  }]);

  return BEMBlock;
}(_element.default);

exports.default = BEMBlock;
module.exports = exports.default;

},{"./element":3,"./util":5}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _listener = require("./listener");

var _util = require("./util");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * BEM element class
 *
 * @class BEMElement
 * @api public
 */
var BEMElement =
/*#__PURE__*/
function () {
  /**
   * Instantiate the class with a collection
   * of BEM elements and the BEM class name
   *
   * @constructor
   * @param {ArrayLike} elements
   * @param {String} name
   * @api private
   */
  function BEMElement(elements, name) {
    _classCallCheck(this, BEMElement);

    (0, _util.push)(this, elements);
    this.name = name;
  }
  /**
   * Invoke the passed function for each element
   * in the collection
   *
   * @param {Function} fn
   * @return {BEMElement}
   * @api public
   */


  _createClass(BEMElement, [{
    key: "each",
    value: function each(fn) {
      for (var i = 0, len = this.length; i < len; i++) {
        var el = this[i];
        fn.call(el, el, i, this);
      }

      return this;
    }
    /**
     * Add one or more modifiers to the
     * collection of BEM elements
     *
     * @param {...String} modifiers
     * @return {BEMElement}
     * @api public
     */

  }, {
    key: "modify",
    value: function modify() {
      var _this = this;

      for (var _len = arguments.length, modifiers = new Array(_len), _key = 0; _key < _len; _key++) {
        modifiers[_key] = arguments[_key];
      }

      modifiers = modifiers.map(function (modifier) {
        return (0, _util.getModifierName)(_this.name, modifier);
      });
      return this.each(function (el) {
        var elClasses = el.className.split(' ');
        var classes = modifiers.filter(function (modifier) {
          return !elClasses.includes(modifier);
        });

        if (classes.length) {
          var _el$classList;

          (_el$classList = el.classList).add.apply(_el$classList, _toConsumableArray(classes));

          (0, _listener.dispatchListeners)(el, classes);
        }
      });
    }
    /**
     * Remove one or more modifiers from the
     * collection of BEM elements
     *
     * @param {...String} modifiers
     * @return {BEMElement}
     * @api public
     */

  }, {
    key: "unmodify",
    value: function unmodify() {
      var _this2 = this;

      for (var _len2 = arguments.length, modifiers = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        modifiers[_key2] = arguments[_key2];
      }

      modifiers = modifiers.map(function (modifier) {
        return (0, _util.getModifierName)(_this2.name, modifier);
      });
      return this.each(function (el) {
        var _el$classList2;

        return (_el$classList2 = el.classList).remove.apply(_el$classList2, _toConsumableArray(modifiers));
      });
    }
    /**
     * Toggle adding/removing one or more modifiers
     * to the collection of BEM elements
     *
     * @param {...String} modifiers
     * @return {BEMElement}
     * @api public
     */

  }, {
    key: "toggle",
    value: function toggle() {
      var _this3 = this;

      for (var _len3 = arguments.length, modifiers = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        modifiers[_key3] = arguments[_key3];
      }

      modifiers = modifiers.map(function (modifier) {
        return (0, _util.getModifierName)(_this3.name, modifier);
      });
      return this.each(function (el) {
        var classes = modifiers.reduce(function (acc, modifier) {
          if (el.classList.toggle(modifier)) {
            acc.push(modifier);
          }

          return acc;
        }, []);

        if (classes.length) {
          (0, _listener.dispatchListeners)(el, classes);
        }
      });
    }
    /**
     * Check if the first BEM element in the
     * collection has one or more modifiers
     *
     * @param {...String} modifiers
     * @return {Boolean}
     * @api public
     */

  }, {
    key: "is",
    value: function is() {
      for (var _len4 = arguments.length, modifiers = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        modifiers[_key4] = arguments[_key4];
      }

      return _util.hasModifiers.apply(void 0, [this[0], this.name].concat(modifiers));
    }
    /**
     * Add a listener to execute a callback
     * function when one or more of the
     * provided modifiers are added to an
     * element in the collection
     *
     * @param {...String} modifiers
     * @param {Function} callback
     * @return {BEMElement}
     * @api public
     */

  }, {
    key: "on",
    value: function on() {
      var _this4 = this;

      for (var _len5 = arguments.length, modifiers = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        modifiers[_key5] = arguments[_key5];
      }

      var callback = modifiers.pop();
      var classes = modifiers.map(function (modifier) {
        return (0, _util.getModifierName)(_this4.name, modifier);
      });
      return this.each(function (el) {
        return (0, _listener.addListener)(el, classes, callback);
      });
    }
  }]);

  return BEMElement;
}();

exports.default = BEMElement;
module.exports = exports.default;

},{"./listener":4,"./util":5}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addListener = addListener;
exports.dispatchListeners = dispatchListeners;

/**
 * Common variables
 */
var listenersMap = new Map();
/**
 * Add a callback function to be invoked
 * when the associated modifiers have been
 * added to an element
 *
 * @param {Element} el
 * @param {Array} modifiers
 * @param {Function} callback
 * @api private
 */

function addListener(el, modifiers, callback) {
  var listeners = listenersMap.get(el);

  if (listeners === undefined) {
    listeners = [];
    listenersMap.set(el, listeners);
  }

  listeners.push({
    modifiers: modifiers,
    callback: callback
  });
}
/**
 * Invoke the callback function if
 * the associated modifiers have just
 * been added
 *
 * @param {Element} el
 * @param {Array} newModifiers
 * @api private
 */


function dispatchListeners(el, newModifiers) {
  var listeners = listenersMap.get(el);

  if (listeners !== undefined) {
    var classes = el.className.split(' ');
    listeners.forEach(function (listener) {
      var listenerModifiers = listener.modifiers;
      var hasAll = listenerModifiers.every(function (mod) {
        return classes.includes(mod);
      });

      if (hasAll) {
        var hasAny = listenerModifiers.some(function (mod) {
          return newModifiers.includes(mod);
        });

        if (hasAny) {
          listener.callback.call(el, el);
        }
      }
    });
  }
}

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasModifiers = hasModifiers;
exports.push = push;
exports.getBlockName = getBlockName;
exports.getElementName = getElementName;
exports.getModifierName = getModifierName;

/**
 * Common variables
 */
var elementSeparator = '__';
var modifierSeparator = '--';
var blockNameRe = /^[a-zA-Z0-9]+(?:[-_][a-zA-Z0-9]+)*$/;
/**
 * Check if an element has one or
 * more modifiers
 *
 * @param {Element} el
 * @param {String} name
 * @param {...String} modifiers
 * @return {String}
 * @api private
 */

function hasModifiers(el, name) {
  for (var _len = arguments.length, modifiers = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    modifiers[_key - 2] = arguments[_key];
  }

  return modifiers.every(function (modifier) {
    return el.classList.contains(getModifierName(name, modifier));
  });
}
/**
 * Add elements to a `BEMBlock` or
 * `BEMElement` isntance as indexed
 * properties to emulate an array
 *
 * @param {BEMBlock|BEMElement} bem
 * @param {ArrayLike} elements
 * @api private
 */


function push(bem, elements) {
  var len = elements.length;

  for (var i = 0; i < len; i++) {
    bem[i] = elements[i];
  }

  bem.length = len;
}
/**
 * Get the BEM block name from an
 * element
 *
 * @param {Element} el
 * @return {String}
 * @api private
 */


function getBlockName(el) {
  return el.className.split(' ').reduce(function (name, cls) {
    if (name) {
      return name;
    }

    return blockNameRe.test(cls) ? cls : name;
  }, null);
}
/**
 * Get the BEM block-element name
 *
 * @param {String} block
 * @param {String} element
 * @return {String}
 * @api private
 */


function getElementName(block, element) {
  return block + elementSeparator + element;
}
/**
 * Get the BEM modifier name
 *
 * @param {String} element
 * @param {String} modifier
 * @return {String}
 * @api private
 */


function getModifierName(element, modifier) {
  return element + modifierSeparator + modifier;
}

},{}]},{},[1])(1)
});

