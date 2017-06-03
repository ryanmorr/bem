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
 * @param {Stirng} name (optional)
 * @return {BEM}
 * @api public
 */
export default function bem(selector, name = null) {
    let elements = selector;
    if (typeof selector === 'string') {
        elements = document.querySelectorAll(selector);
    }
    if (selector.nodeType) {
        elements = [selector];
    }
    return new BEMBlock(elements, name);
}
