/**
 * Common variables
 */
export const elementSeparator = '__';
export const modifierSeparator = '--';

/**
 * Does an object have the characteristics
 * of an array-like object
 *
 * @param {*} obj
 * @return {Boolean}
 * @api private
 */
export function isArrayLike(obj) {
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
export function hasModifiers(el, name, ...modifiers) {
    return modifiers.every((modifier) => {
        return el.classList.contains(name + modifierSeparator + modifier);
    });
}

/**
 * Add elements to a `BEM` isntance as
 * indexed properties to emulate an array
 *
 * @param {BEM} bem
 * @param {...Element} elements
 * @api private
 */
export function push(bem, elements) {
    const len = elements.length;
    for (let i = 0; i < len; i++) {
        bem[i] = elements[i];
    }
    bem.length = len;
}
