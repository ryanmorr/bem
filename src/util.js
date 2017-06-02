/**
 * Define the separators used in BEM syntax
 */
export const elementSeparator = '__';
export const modifierSeparator = '--';

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
export function hasModifiers(el, name, ...modifiers) {
    return modifiers.every((modifier) => {
        return el.classList.contains(name + modifierSeparator + modifier);
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
export function push(bem, elements) {
    const len = elements.length;
    for (let i = 0; i < len; i++) {
        bem[i] = elements[i];
    }
    bem.length = len;
}
