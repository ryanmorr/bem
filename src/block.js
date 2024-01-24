import BEMElement from './element';
import { hasModifiers, getBlockName, getElementName } from './util';

export default class BEMBlock extends BEMElement {

    constructor(elements, ...modifiers) {
        const name = getBlockName(elements[0]);
        if (modifiers.length) {
            elements = Array.from(elements).filter((el) => hasModifiers(el, name, ...modifiers));
        }
        super(elements, name);
    }

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
