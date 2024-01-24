import BEMBlock from './block';

export default function bem(selector, ...modifiers) {
    let elements = selector;
    if (typeof selector === 'string') {
        elements = document.querySelectorAll(selector);
    }
    if (selector.nodeType) {
        elements = [selector];
    }
    return new BEMBlock(elements, ...modifiers);
}
