export default {
    //sets the element type - handy to avoid div soup!
    element: v => {
        return `div`
    },
    //set additional default values for this view
    values: v => {
        return {
        }
    },
    //enter any css here. ${v.selector} is a class selector that is unique to this element
    style: v => {
        return `
        ${v.selector} {
            
        }
        `
    },
    //the default HTML view to show
    view: v => {
        return ``
    },
    //script which runs when the element is added to the page from the `a.render` method
    script: v => {

    }
}