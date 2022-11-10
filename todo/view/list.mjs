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
        ${v.view} h1, ${v.view} button {
            font-size: 2em;
            padding: 5px;
            margin: 5px;
            min-width: 50px;
            border-radius: 16px;
        }
        `
    },
    //the default HTML view to show
    view: v => {
        return `
        <button class="add">+</button>
        <button class="export">export</button>
        <ul></ul>
        `
    },
    //script which runs when the element is added to the page from the `a.render` method
    script: v => {

        v.addItem = () => {
            a.append(v.find('ul'), a.v('list-item'))
        }

        v.find('button.add').addEventListener('click', () => {
            v.addItem()
        })

        v.find('button.export').addEventListener('click', () => {
            const views = v.findAll('[data-view="list-item"]')
            let results = Object.values(views).map(item => item.this.output())
            console.log(results)
            alert(JSON.stringify(results))
        })

        v.addItem()

    }
}