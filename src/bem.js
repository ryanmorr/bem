/**
 * Import dependencies
 */
import Block from './block';
import { isArrayLike } from './util';

/**
 * Export the `bem` function
 *
 * @param {String|Element} blocks
 * @param {Element} context (optional)
 * @return {BEM}
 * @api public
 */
export default function bem(selector, context = document) {
    if (selector.nodeType) {
        selector = [selector];
    }
    if (isArrayLike(selector)) {
        return new Block(selector);
    }
    return new Block(context.querySelectorAll(selector));
}
