/**
 * Common variables
 */
const elementSeparator = '__';
const modifierSeparator = '--';
const blockNameRe = /^[a-zA-Z0-9]+(?:[-_][a-zA-Z0-9]+)*$/;

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
export function push(bem, elements) {
    const len = elements.length;
    for (let i = 0; i < len; i++) {
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
export function getBlockName(el) {
    return el.className.split(' ').reduce((name, cls) => {
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
export function getElementName(block, element) {
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
export function getModifierName(element, modifier) {
    return element + modifierSeparator + modifier;
}
