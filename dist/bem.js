/*! bem v0.1.0 | https://github.com/ryanmorr/bem */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.bem = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = bem;

var _block = require('./block');

var _block2 = _interopRequireDefault(_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    for (var _len = arguments.length, modifiers = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        modifiers[_key - 1] = arguments[_key];
    }

    return new (Function.prototype.bind.apply(_block2.default, [null].concat([elements], modifiers)))();
} /**
   * Import dependencies
   */
module.exports = exports['default'];

},{"./block":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _element = require('./element');

var _element2 = _interopRequireDefault(_element);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Import dependencies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * BEM block class
 *
 * @class BEMBlock
 * @extends BEMElement
 * @api public
 */
var BEMBlock = function (_BEMElement) {
    _inherits(BEMBlock, _BEMElement);

    /**
     * Instantiate the class with a collection
     * of block level elements and optionally
     * the BEM block class name
     *
     * @constructor
     * @param {ArrayLike} elements
     * @param {...String} modifiers
     * @api private
     */
    function BEMBlock(elements) {
        for (var _len = arguments.length, modifiers = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            modifiers[_key - 1] = arguments[_key];
        }

        _classCallCheck(this, BEMBlock);

        var name = (0, _util.getBlockName)(elements[0]);
        if (modifiers.length) {
            elements = (0, _util.toArray)(elements).filter(function (el) {
                return _util.hasModifiers.apply(undefined, [el, name].concat(modifiers));
            });
        }
        return _possibleConstructorReturn(this, (BEMBlock.__proto__ || Object.getPrototypeOf(BEMBlock)).call(this, elements, name));
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
        key: 'element',
        value: function element(elementName) {
            for (var _len2 = arguments.length, modifiers = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                modifiers[_key2 - 1] = arguments[_key2];
            }

            var name = (0, _util.getElementName)(this.name, elementName);
            var elements = [];
            this.each(function (el) {
                return elements.push.apply(elements, el.getElementsByClassName(name));
            });
            if (modifiers.length) {
                elements = elements.filter(function (el) {
                    return _util.hasModifiers.apply(undefined, [el, name].concat(modifiers));
                });
            }
            return new _element2.default(elements, name);
        }
    }]);

    return BEMBlock;
}(_element2.default);

exports.default = BEMBlock;
module.exports = exports['default'];

},{"./element":3,"./util":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Import dependencies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _util = require('./util');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * BEM element class
 *
 * @class BEMElement
 * @api public
 */
var BEMElement = function () {

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
        key: 'each',
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
        key: 'modify',
        value: function modify() {
            var _this = this;

            for (var _len = arguments.length, modifiers = Array(_len), _key = 0; _key < _len; _key++) {
                modifiers[_key] = arguments[_key];
            }

            var classes = modifiers.map(function (modifier) {
                return (0, _util.getModifierName)(_this.name, modifier);
            });
            return this.each(function (el) {
                var _el$classList;

                return (_el$classList = el.classList).add.apply(_el$classList, _toConsumableArray(classes));
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
        key: 'unmodify',
        value: function unmodify() {
            var _this2 = this;

            for (var _len2 = arguments.length, modifiers = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                modifiers[_key2] = arguments[_key2];
            }

            var classes = modifiers.map(function (modifier) {
                return (0, _util.getModifierName)(_this2.name, modifier);
            });
            return this.each(function (el) {
                var _el$classList2;

                return (_el$classList2 = el.classList).remove.apply(_el$classList2, _toConsumableArray(classes));
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
        key: 'toggle',
        value: function toggle() {
            var _this3 = this;

            for (var _len3 = arguments.length, modifiers = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                modifiers[_key3] = arguments[_key3];
            }

            return this.each(function (el) {
                modifiers.forEach(function (modifier) {
                    el.classList.toggle((0, _util.getModifierName)(_this3.name, modifier));
                });
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
        key: 'is',
        value: function is() {
            for (var _len4 = arguments.length, modifiers = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                modifiers[_key4] = arguments[_key4];
            }

            return _util.hasModifiers.apply(undefined, [this[0], this.name].concat(modifiers));
        }
    }]);

    return BEMElement;
}();

exports.default = BEMElement;
module.exports = exports['default'];

},{"./util":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.toArray = toArray;
exports.hasModifiers = hasModifiers;
exports.push = push;
exports.getBlockName = getBlockName;
exports.getElementName = getElementName;
exports.getModifierName = getModifierName;
/**
 * Common variables
 */
var slice = [].slice;
var elementSeparator = '__';
var modifierSeparator = '--';
var blockNameRe = /^[a-zA-Z0-9]+(?:[-_][a-zA-Z0-9]+)*$/;

/**
 * Convert an array-like object to
 * an array
 *
 * @param {ArrayLike} obj
 * @return {Array}
 * @api private
 */
function toArray(obj) {
    if (Array.from) {
        return Array.from(obj);
    }
    return slice.call(obj);
}

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
    for (var _len = arguments.length, modifiers = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
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

