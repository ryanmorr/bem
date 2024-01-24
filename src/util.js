const elementSeparator = '__';
const modifierSeparator = '--';
const blockNameRe = /^[a-zA-Z0-9]+(?:[-_][a-zA-Z0-9]+)*$/;

export function hasModifiers(el, name, ...modifiers) {
    return modifiers.every((modifier) => {
        return el.classList.contains(getModifierName(name, modifier));
    });
}

export function push(bem, elements) {
    const len = elements.length;
    for (let i = 0; i < len; i++) {
        bem[i] = elements[i];
    }
    bem.length = len;
}

export function getBlockName(el) {
    return el.className.split(' ').reduce((name, cls) => {
        if (name) {
            return name;
        }
        return blockNameRe.test(cls) ? cls : name;
    }, null);
}

export function getElementName(block, element) {
    return block + elementSeparator + element;
}

export function getModifierName(element, modifier) {
    return element + modifierSeparator + modifier;
}
