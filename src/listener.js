const listenersMap = new Map();

export function addListener(el, modifiers, callback) {
    let listeners = listenersMap.get(el);
    if (listeners === undefined) {
        listeners = [];
        listenersMap.set(el, listeners);
    }
    listeners.push({modifiers, callback});
}

export function dispatch(el, newModifiers) {
    const listeners = listenersMap.get(el);
    if (listeners !== undefined) {
        const classes = el.className.split(' ');
        listeners.forEach((listener) => {
            const listenerModifiers = listener.modifiers;
            const hasAll = listenerModifiers.every((mod) => classes.includes(mod));
            if (hasAll) {
                const hasAny = listenerModifiers.some((mod) => newModifiers.includes(mod));
                if (hasAny) {
                    listener.callback.call(el, el);
                }
            }
        });
    }
}
