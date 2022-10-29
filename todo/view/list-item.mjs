export default {
    //sets the element type - handy to avoid div soup!
    element: v => {
        return `li`
    },
    //set additional default values for this view
    values: v => {
        return {
            placeholder: '...',
        }
    },
    //enter any css here. ${v.selector} is a class selector that is unique to this element
    style: v => {
        return `
        ${v.selector} span:after{
            padding: 0 1em;
            cursor: pointer;
            color: green;
            content: "✔"
        }
        ${v.selector}.done span:after{
            color: red;
            content: "❌"
        }
        
        `
    },
    //the default HTML view to show
    view: v => {
        return `<button>-</button><input placeholder="${v.placeholder}" /><span></span>`
    },
    //script which runs when the element is added to the page from the `a.render` method
    script: v => {

        v.find('span').addEventListener('click', () => {
            v.self.classList.toggle('done')
            v.find('input').disabled = v.self.classList.contains('done')
        })
        v.find('button').addEventListener('click', () => {
            v.self.parentNode.removeChild(v.self);
        })


        v.output = () => {
            return {
                text: v.find('input').value,
                done: v.self.classList.contains('done'),
            }
        }

    }
}