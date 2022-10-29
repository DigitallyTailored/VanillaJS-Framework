# Vanilla JS Web Framework

Another attempt at a tiny Vanilla JS framework which is just over 1KB in size when compressed.

As usual the aim is to facilitate reusable components whilst not drifting too far from normal JS syntax and HTML standards.

Unlike previous similar projects I've worked on, the driver of this framework is entirely JS with no additional controls available from within HTML. This is to simplify the process of using the framework, making it more consistent between implementations.  

**TODO:**

[ ] The script queue may be processed early (before the HTML is added) if using multiple asynchronous `a.render` calls. Make script queues unique to their caller 

[ ] `v.refresh` method for regenerating a view with any updated variables. This will likely not support nested views.

[ ] Make view object classes optional in case they're not needed.

[ ] Move view styles to a separate output section. They are currently attached to the HTML output of each component

**An Example of a View**

```javascript
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
```


**A Basic Stylized Button View**
```javascript
export default {
    element: v => {
        return `button`
    },
    values: v => {
        return {
            text: 'Submit',
            counter: 0
        }
    },
    style: v => {
        return `
        ${v.selector} {
            background-color: white;
            border-radius: 1em;
            padding: 0.5em;
            margin: 0.5em;
            border: 0;
            box-shadow: 5px 5px 10px lightgray, -5px -5px 10px white;
            transition: all 0.2s ease;
        }
        ${v.selector}:hover {
            box-shadow: 5px 5px 20px lightgray, -5px -5px 20px white;
        }
        ${v.selector}:active {
            scale: 0.97;
        }
        `
    },
    view: v => {
        return `${v.text} - <span></span> 😊`
    },
    script: v => {

        v.update = () => {
            v.find('span').innerText = `Clicked ${v.counter} time${v.counter!==1?'s':''}`
        }
        v.update()

        v.self.addEventListener('click',() => {
            v.counter++
            v.update()
        })

    }
}
```

Using the above view to generate a page with 10 buttons:

```javascript
    a.ready(() => {

        let output = ``
        for (let i = 0; i < 10; i++) {
            output += a.v('button', {text: 'Button ' + (i+1)})
        }

        a.render(
            output
        )
    })
```

**Default View Variables**

In addition to any variables set in the `view.values` section, each view has access to the following:

```javascript
v.self //a reference to the view HTMLElement
v.find() //a query selector which searches this view, works like v.self.querySelector
findAll() //a query selector which searches this view, works like v.self.querySelectorAll

v._uid //a unique id which each view is given e.g. `au-1`. This value is incremented as opposed to randmized for cleaner HTML output
v.selector //a css selector based on the unique id e.g. `.au-1` which could also be used in JS if need be

```