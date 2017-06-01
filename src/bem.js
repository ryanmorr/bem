/**
 * Common variables
 */
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
 * Check is an element has one or
 * more modifiers
 *
 * @param {Element} el
 * @return {String}
 * @api private
 */
function hasModifiers(el, name, ...modifiers) {
    return modifiers.every((modifier) => {
        return el.classList.contains(name + modifierSeparator + modifier);
    });
}

/**
 * Add elements to a `BEM` isntance as
 * indexed properties to emulate an array
 *
 * @param {BEM} bem
 * @param {Element} elements
 * @api private
 */
function push(bem, elements) {
    const len = elements.length;
    for (let i = 0; i < len; i++) {
        bem[i] = elements[i];
    }
    bem.length = len;
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
     * @param {String} name (optional)
     * @api private
     */
    constructor(selector, context = document, name = null) {
        if (selector.nodeType) {
            push(this, [selector]);
        } else if (isArrayLike(selector)) {
            push(this, selector);
        } else {
            push(this, context.querySelectorAll(selector));
        }
        this.name = name || this[0].className.split(' ')[0];
    }

    /**
     * Invoke the passed function for each element
     * in the collection
     *
     * @param {Function} fn
     * @return {BEM}
     * @api public
     */
    each(fn) {
        for (let i = 0, len = this.length; i < len; i++) {
            const el = this[i];
            fn.call(el, el, i, this);
        }
        return this;
    }

    /**
     * Find BEM block-elements that are decendants
     * of the currently selected elements
     *
     * @param {String} name
     * @param {...String} modifiers
     * @return {BEM}
     * @api public
     */
    element(name, ...modifiers) {
        name = this.name + elementSeparator + name;
        let elements = [];
        this.each((el) => elements.push.apply(elements, el.getElementsByClassName(name)));
        if (modifiers.length) {
            elements = elements.filter((el) => hasModifiers(el, name, ...modifiers));
        }
        return new BEM(elements, null, name);
    }

    /**
     * Add one or more modifiers to the
     * currently selected elements
     *
     * @param {...String} modifiers
     * @return {BEM}
     * @api public
     */
    modify(...modifiers) {
        const classes = modifiers.map((mod) => this.name + modifierSeparator + mod);
        return this.each((el) => el.classList.add(...classes));
    }

    /**
     * Remove one or more modifiers from the
     * currently selected elements
     *
     * @param {...String} modifiers
     * @return {BEM}
     * @api public
     */
    unmodify(...modifiers) {
        const classes = modifiers.map((mod) => this.name + modifierSeparator + mod);
        return this.each((el) => el.classList.remove(...classes));
    }

    /**
     * Toggle adding/removing one or more modifiers
     * to the currently selected elements
     *
     * @param {...String} modifiers
     * @return {BEM}
     * @api public
     */
    toggle(...modifiers) {
        return this.each((el) => {
            modifiers.forEach((mod) => {
                el.classList.toggle(this.name + modifierSeparator + mod);
            });
        });
    }

    /**
     * Check if the first element of the
     * currently selected elements has one or
     * more modifiers
     *
     * @param {...String} modifiers
     * @return {Boolean}
     * @api public
     */
    is(...modifiers) {
        return hasModifiers(this[0], this.name, ...modifiers);
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
