/**
 * Common variables
 */
const slice = [].slice;
const elementSeparator = '__';
const modifierSeparator = '--';

/**
 * Does an object have the characteristics
 * of an array-like object
 *
 * @param {*} obj
 * @return {Boolean}
 * @api private
 */
function isArrayLike(obj) {
    return obj
        && typeof obj === 'object'
        && typeof obj.length === 'number'
        && obj.length >= 0
        && obj.length % 1 === 0;
}

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
 * Get BEM class name from element
 *
 * @param {Element} el
 * @return {String}
 * @api private
 */
function getBEMName(el) {
    return el.className.split(' ')[0];
}

/**
 * Helper class for maninuplating elements
 * according to the BEM (Block Element Modifier)
 * methodology
 *
 * @class BEM
 * @api public
 */
class BEM {

    /**
     * Instantiate the class providing either a
     * selector string, DOM element, or array-like
     *
     * @constructor
     * @param {String|Element|ArrayLike} selector
     * @param {Element} context (optional)
     * @api private
     */
    constructor(selector, context = document) {
        if (selector.nodeType) {
            this.elements = [selector];
        } else if (isArrayLike(selector)) {
            this.elements = toArray(selector);
        } else {
            this.elements = toArray(context.querySelectorAll(selector));
        }
        this.name = getBEMName(this.elements[0]);
    }

    /**
     * Find BEM blocks that are decendants
     * of the currently selected elements
     *
     * @param {String} name
     * @return {BEM}
     * @api public
     */
    block(name) {
        return bem(this.elements.reduce((els, el) => {
            const selector = '.' + this.name + ' .' + name;
            return els.concat(toArray(el.querySelectorAll(selector)));
        }, []));
    }

    /**
     * Find BEM block-elements that are decendants
     * of the currently selected elements
     *
     * @param {String} name
     * @return {BEM}
     * @api public
     */
    element(name) {
        return bem(this.elements.reduce((els, el) => {
            const selector = '.' + this.name + elementSeparator + name;
            return els.concat(toArray(el.querySelectorAll(selector)));
        }, []));
    }

    /**
     * Add one or more modifiers to the
     * currently selected elements
     *
     * @param {...String} modifier
     * @return {BEM}
     * @api public
     */
    modify(...modifiers) {
        const classes = modifiers.map((mod) => this.name + modifierSeparator + mod);
        this.elements.forEach((el) => el.classList.add(...classes));
        return this;
    }

    /**
     * Remove one or more modifiers from the
     * currently selected elements
     *
     * @param {...String} modifier
     * @return {BEM}
     * @api public
     */
    unmodify(...modifiers) {
        const classes = modifiers.map((mod) => this.name + modifierSeparator + mod);
        this.elements.forEach((el) => el.classList.remove(...classes));
        return this;
    }

    /**
     * Toggle adding/removing one or more modifiers
     * to the currently selected elements
     *
     * @param {...String} modifier
     * @return {BEM}
     * @api public
     */
    toggle(...modifiers) {
        this.elements.forEach((el) => {
            modifiers.forEach((mod) => {
                el.classList.toggle(this.name + modifierSeparator + mod);
            });
        });
        return this;
    }

    /**
     * Check if the first element of the
     * currently selected elements has one or
     * more modifiers
     *
     * @param {...String} modifier
     * @return {Boolean}
     * @api public
     */
    is(...modifiers) {
        const el = this.elements[0];
        return modifiers.reduce((is, modifier) => {
            if (!is) {
                return is;
            }
            return el.classList.contains(this.name + modifierSeparator + modifier);
        }, true);
    }
}

/**
 * Export the `bem` function
 *
 * @param {String|Element|ArrayLike} selector
 * @param {Element} context (optional)
 * @return {BEM}
 * @api public
 */
export default function bem(selector, context) {
    return new BEM(selector, context);
}
