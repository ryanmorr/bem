/**
 * Common variables
 */
const listenersMap = new Map();

/**
 * Add a callback function to be invoked
 * when the associated modifiers have been
 * added to an element
 *
 * @param {Element} el
 * @param {Array} modifiers
 * @param {Function} callback
 * @api private
 */
export function addListener(el, modifiers, callback) {
    let listeners = listenersMap.get(el);
    if (listeners === undefined) {
        listeners = [];
        listenersMap.set(el, listeners);
    }
    listeners.push({modifiers, callback});
}

/**
 * Invoke the callback function if
 * the associated modifiers have just
 * been added
 *
 * @param {Element} el
 * @param {Array} newModifiers
 * @api private
 */
export function dispatchListeners(el, newModifiers) {
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
