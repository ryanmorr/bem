import { addListener, dispatch } from './listener';
import { push, hasModifiers, getModifierName } from './util';

export default class BEMElement {

    constructor(elements, name) {
        push(this, elements);
        this.name = name;
    }

    each(fn) {
        for (let i = 0, len = this.length; i < len; i++) {
            const el = this[i];
            fn.call(el, el, i, this);
        }
        return this;
    }

    modify(...modifiers) {
        modifiers = modifiers.map((modifier) => getModifierName(this.name, modifier));
        return this.each((el) => {
            const elClasses = el.className.split(' ');
            const classes = modifiers.filter((modifier) => !elClasses.includes(modifier));
            if (classes.length) {
                el.classList.add(...classes);
                dispatch(el, classes);
            }
        });
    }

    unmodify(...modifiers) {
        modifiers = modifiers.map((modifier) => getModifierName(this.name, modifier));
        return this.each((el) => el.classList.remove(...modifiers));
    }

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
                dispatch(el, classes);
            }
        });
    }

    is(...modifiers) {
        return hasModifiers(this[0], this.name, ...modifiers);
    }

    on(...modifiers) {
        const callback = modifiers.pop();
        const classes = modifiers.map((modifier) => getModifierName(this.name, modifier));
        return this.each((el) => addListener(el, classes, callback));
    }
}
