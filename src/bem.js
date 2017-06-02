/**
 * Import dependencies
 */
import Block from './block';

/**
 * Export the `bem` function
 *
 * @param {String|Element} blocks
 * @param {Element} context (optional)
 * @return {BEM}
 * @api public
 */
export default function bem(selector, context = document) {
    let elements = selector;
    if (typeof selector === 'string') {
        elements = context.querySelectorAll(selector);
    }
    if (selector.nodeType) {
        elements = [selector];
    }
    return new Block(elements);
}
