/**
 * Common variables
 */
export const elementSeparator = '__';
export const modifierSeparator = '--';

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
