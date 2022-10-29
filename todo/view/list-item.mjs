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
        ${v.selector}.done input{
            color: gray;
        }
        `
    },
    //the default HTML view to show
    view: v => {
        return `<input placeholder="${v.placeholder}" /><span>✔</span>`
    },
    //script which runs when the element is added to the page from the `a.render` method
    script: v => {

        v.find('span').addEventListener('click', () => {
            v.self.classList.toggle('done')
        })


        v.output = () => {
            return {
                text: v.find('input').value,
                done: v.self.classList.contains('done'),
            }
        }

    }
}