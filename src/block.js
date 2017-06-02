/**
 * Import dependencies
 */
import Element from './element';
import { elementSeparator, hasModifiers } from './util';

/**
 * BEM block class
 *
 * @class Block
 * @extends Element
 * @api public
 */
export default class Block extends Element {

    /**
     * Instantiate the class with a collection
     * of block level elements
     *
     * @constructor
     * @param {ArrayLike} elements
     * @api private
     */
    constructor(elements) {
        super(elements, elements[0].className.split(' ')[0]);
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
        return new Element(elements, name);
    }
}
