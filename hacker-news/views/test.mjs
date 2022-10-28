export default {
    element: v => {
        return `span`
    },
    values: v => {
        return {
            counter: 0,
            color: 'red',
            text: 'Hello, world!'
        }
    },
    style: v => {
        return `
        ${v.selector} {
            color: ${v.color};
            border: 1px solid ${v.color};
            margin: 3px;
            display: inline-block;
            padding: 5px;
            border-radius: 5px;
            cursor: pointer;
            user-select: none;
            transition: all 100ms;
            font-size: 12px;
        }
        ${v.selector}:hover {
            box-shadow: 0 0 5px;
        }
        `
    },
    view: v => {
        return `${v.text} - <span class="${v._uid}-counter">${v.counter}</span>`
    },
    script: v => {
        const counterElement = v.self.querySelector(`${v.selector}-counter`)
        v.self.addEventListener('click', (event) => {
            if (event.target === v.self || event.target === counterElement) { //this prevents us from using clicks from nested buttons
                v.counter++
                counterElement.innerText = v.counter
                v.self.style.fontSize = 12+v.counter+"px"
            }
        })
    }
}