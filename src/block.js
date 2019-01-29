/**
 * Import dependencies
 */
import BEMElement from './element';
import { toArray, hasModifiers, getBlockName, getElementName } from './util';

/**
 * BEM block class
 *
 * @class BEMBlock
 * @extends BEMElement
 * @api public
 */
export default class BEMBlock extends BEMElement {

    /**
     * Instantiate the class with a collection
     * of block level elements and optionally
     * one or more modifiers to filter the
     * collection
     *
     * @constructor
     * @param {ArrayLike} elements
     * @param {...String} modifiers
     * @api private
     */
    constructor(elements, ...modifiers) {
        const name = getBlockName(elements[0]);
        if (modifiers.length) {
            elements = toArray(elements).filter((el) => hasModifiers(el, name, ...modifiers));
        }
        super(elements, name);
    }

    /**
     * Find BEM block-elements that are decendants
     * of the collection of block elements
     *
     * @param {String} elementName
     * @param {...String} modifiers
     * @return {BEMElement}
     * @api public
     */
    element(elementName, ...modifiers) {
        const name = getElementName(this.name, elementName);
        let elements = [];
        this.each((el) => elements.push.apply(elements, el.getElementsByClassName(name)));
        if (modifiers.length) {
            elements = elements.filter((el) => hasModifiers(el, name, ...modifiers));
        }
        return new BEMElement(elements, name);
    }
}
