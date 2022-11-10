//Act - Vanilla JavaScript Framework
window.a = {
    target: document.body,
    _views: {},
    _view_queue: [],
    _load_count: 0,
    _ready_methods: [],
    ready: (method = null) => {
        if (method) {
            a._ready_methods.push(method)
        }
        if (a._load_count === 0) {
            while (a._ready_methods.length > 0) {
                a._ready_methods[0]()
                a._ready_methods.shift()
            }
        }
    },
    load: (module, name = null) => {
        name = name ?? module.split("/").pop().split(".")[0];
        a._load_count++
        import(`${module}`).then(
            imported => {
                a._load_count--
                a._views[name] = imported.default
                a.ready()
            })
    },
    uid_val: 0,
    uid: () => {
        a.uid_val++
        return 'au-' + a.uid_val
    },
    v: (name, values = {}) => {
        return a.view(name, values)
    },
    view: (name, values = {}) => {
        values = {...a._views[name].values(values), ...values}
        values._uid = a.uid()
        values.selector = '.' + values._uid
        values.view = `[data-view="${name}"]`
        const element = document.createElement(a._views[name].element(values) ?? 'div')
        element.classList.add(values._uid)
        element.dataset.view = name
        values.self = element
        values.self.this = values
        values.find = (query) => {
            return a.find(query, element)
        }
        values.findAll = (query) => {
            return a.findAll(query, element)
        }
        return element
    },
    append(target, elements) {
        a.out(target, elements, false)
    },
    out(target, elements, clear = true) {
        if (clear) {
            while (target.firstChild) {
                target.removeChild(target.firstChild);
            }
        }
        if (!Array.isArray(elements)) {
            elements = [elements];
        }
        //todo default target check
        //add all elements to target
        elements.forEach((element => {
            if (typeof element === 'string') {
                target.insertAdjacentHTML('beforeend', element)
            } else {
                target.insertAdjacentElement('beforeend', element)
            }
            if (element?.dataset?.view) {
                element.this.parentView = target.closest('[data-view]')?.this
                element.this.parent = target
                element.this.selector = (element.this.parentView?.selector ? element.this.parentView.selector + ' ' : '') + element.this.selector
                element.innerHTML = a._views[element.dataset.view].view(element.this)
                const hash = a.hash(a._views[element.dataset.view].style(element.this))
                const styleElement = document.createElement('style')
                styleElement.dataset.hash = hash
                styleElement.innerHTML = a._views[element.dataset.view].style(element.this)
                if(!element.this.parent.querySelector(`:scope > style[data-hash="${hash}"]`)){
                    target.insertAdjacentElement('afterbegin', styleElement)
                }
                target.insertAdjacentElement('beforeend', element)
                a._views[element.dataset.view].script(element.this)
            }
        }))
    },
    find: (query, parent) => (parent ?? document).querySelector(query),
    findAll: (query, parent) => (parent ?? document).querySelectorAll(query),
    hash: (str) => {
        return str.split('').reduce((prevHash, currVal) => (((prevHash << 5) - prevHash) + currVal.charCodeAt(0)) | 0, 0)
    }
}

const event = new Event('aInit');
document.dispatchEvent(event);
