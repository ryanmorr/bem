/**
 * Import dependencies
 */
import { modifierSeparator, push, hasModifiers } from './util';

/**
 * Top-level class for maninuplating elements
 * according to the BEM (Block Element Modifier)
 * methodology
 *
 * @class Element
 * @api public
 */
export default class Element {

    /**
     * Instantiate the class with a collection
     * of elements and the BEM class name
     *
     * @constructor
     * @param {ArrayLike} elements
     * @api private
     */
    constructor(element, name) {
        push(this, element);
        this.name = name;
    }

    /**
     * Invoke the passed function for each element
     * in the collection
     *
     * @param {Function} fn
     * @return {BEM}
     * @api public
     */
    each(fn) {
        for (let i = 0, len = this.length; i < len; i++) {
            const el = this[i];
            fn.call(el, el, i, this);
        }
        return this;
    }

    /**
     * Add one or more modifiers to the
     * currently selected elements
     *
     * @param {...String} modifiers
     * @return {BEM}
     * @api public
     */
    modify(...modifiers) {
        const classes = modifiers.map((mod) => this.name + modifierSeparator + mod);
        return this.each((el) => el.classList.add(...classes));
    }

    /**
     * Remove one or more modifiers from the
     * currently selected elements
     *
     * @param {...String} modifiers
     * @return {BEM}
     * @api public
     */
    unmodify(...modifiers) {
        const classes = modifiers.map((mod) => this.name + modifierSeparator + mod);
        return this.each((el) => el.classList.remove(...classes));
    }

    /**
     * Toggle adding/removing one or more modifiers
     * to the currently selected elements
     *
     * @param {...String} modifiers
     * @return {BEM}
     * @api public
     */
    toggle(...modifiers) {
        return this.each((el) => {
            modifiers.forEach((mod) => {
                el.classList.toggle(this.name + modifierSeparator + mod);
            });
        });
    }

    /**
     * Check if the first element of the
     * currently selected elements has one or
     * more modifiers
     *
     * @param {...String} modifiers
     * @return {Boolean}
     * @api public
     */
    is(...modifiers) {
        return hasModifiers(this[0], this.name, ...modifiers);
    }
}
