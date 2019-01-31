/**
 * Import dependencies
 */
import { addListener, dispatchListeners } from './listener';
import { push, hasModifiers, getModifierName } from './util';

/**
 * BEM element class
 *
 * @class BEMElement
 * @api public
 */
export default class BEMElement {

    /**
     * Instantiate the class with a collection
     * of BEM elements and the BEM class name
     *
     * @constructor
     * @param {ArrayLike} elements
     * @param {String} name
     * @api private
     */
    constructor(elements, name) {
        push(this, elements);
        this.name = name;
    }

    /**
     * Invoke the passed function for each element
     * in the collection
     *
     * @param {Function} fn
     * @return {BEMElement}
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
     * collection of BEM elements
     *
     * @param {...String} modifiers
     * @return {BEMElement}
     * @api public
     */
    modify(...modifiers) {
        modifiers = modifiers.map((modifier) => getModifierName(this.name, modifier));
        return this.each((el) => {
            const elClasses = el.className.split(' ');
            const classes = modifiers.filter((modifier) => !elClasses.includes(modifier));
            if (classes.length) {
                el.classList.add(...classes);
                dispatchListeners(el, classes);
            }
        });
    }

    /**
     * Remove one or more modifiers from the
     * collection of BEM elements
     *
     * @param {...String} modifiers
     * @return {BEMElement}
     * @api public
     */
    unmodify(...modifiers) {
        modifiers = modifiers.map((modifier) => getModifierName(this.name, modifier));
        return this.each((el) => el.classList.remove(...modifiers));
    }

    /**
     * Toggle adding/removing one or more modifiers
     * to the collection of BEM elements
     *
     * @param {...String} modifiers
     * @return {BEMElement}
     * @api public
     */
    toggle(...modifiers) {
        modifiers = modifiers.map((modifier) => getModifierName(this.name, modifier));
        return this.each((el) => {
            const classes = modifiers.reduce((acc, modifier) => {
                if (el.classList.toggle(modifier)) {
                    acc.push(modifier);
                }
                return acc;
            }, []);
            if (classes.length) {
                dispatchListeners(el, classes);
            }
        });
    }

    /**
     * Check if the first BEM element in the
     * collection has one or more modifiers
     *
     * @param {...String} modifiers
     * @return {Boolean}
     * @api public
     */
    is(...modifiers) {
        return hasModifiers(this[0], this.name, ...modifiers);
    }

    /**
     * Add a listener to execute a callback
     * function when one or more of the
     * provided modifiers are added to an
     * element in the collection
     *
     * @param {...String} modifiers
     * @param {Function} callback
     * @return {BEMElement}
     * @api public
     */
    on(...modifiers) {
        const callback = modifiers.pop();
        const classes = modifiers.map((modifier) => getModifierName(this.name, modifier));
        return this.each((el) => addListener(el, classes, callback));
    }
}
