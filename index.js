var matches = require("matches-selector")

module.exports = Siblings

function Siblings(el, selector) {
    return getChildren(el.parentNode, selector).filter(function(sibling) {
        return sibling !== el;
    })
}

function getChildren(el, selector) {
    var selection;

    if (selector) {
        selection = Array.prototype.slice.call(el.querySelectorAll(selector), 0);
    } else {
        selection = Array.prototype.slice.call(el.children, 0);
    }
    return selection;
}

Siblings.next = traverse("next")
Siblings.prev = traverse("previous")

function traverse(dir) {
    var prop = dir + "ElementSibling"

    return function(el, selector, limit) {
        if (typeof selector === "number") {
            limit = selector
            selector = null
        }

        var siblings = []
        var sibling = el

        while (true) {
            if (!(sibling = sibling[prop]))
                break

            if (selector && !matches(sibling, selector))
                continue

            siblings.push(sibling)

            if (limit && siblings.length >= limit)
                break
        }

        return limit === 1 ? siblings.shift() : siblings
    }
}
