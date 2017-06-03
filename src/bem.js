/**
 * Import dependencies
 */
import BEMBlock from './block';

/**
 * Provide a CSS selector string, DOM
 * element, or nodelist/array and get
 * a `BEMBlock` instance to traverse and
 * manipulate the component
 *
 * @param {String|Element|ArrayLike} blocks
 * @param {Element} context (optional)
 * @return {BEM}
 * @api public
 */
export default function bem(selector, context = document) {
    let elements = selector;
    if (typeof selector === 'string') {
        if (typeof context === 'string') {
            context = document.querySelector(context);
        }
        elements = context.querySelectorAll(selector);
    }
    if (selector.nodeType) {
        elements = [selector];
    }
    return new BEMBlock(elements);
}
