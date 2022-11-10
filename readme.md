# Act - A Vanilla JaveScript Web Framework

No transpiler. Works anywhere. Tiny.

The aim is to facilitate reusable components whilst not drifting too far from normal JS syntax and HTML standards. While there is no `reactive` element planned, the idea is that components (views as we call them) can be accessed and updated from within with direct references, much simpler and quicker than potentially expensive DOM diffing. Additionally, unique view data is directly attached to each HTML Element for easy access even outside of the framework.

Unlike previous similar projects I've worked on, the driver of this framework is entirely JS with no additional controls available from within HTML beyond the initial view HTML. This is to simplify the process of using the framework, making it more consistent between implementations.  

Another very large consideration was reducing the amount of HTML required for output and providing an easy way to avoid div soup form the start by (optionally) setting an element type from within the view and keeping any ids and hashes simple from the get go.

The below is the HTML output for a `div` view containing two nested `li` views along with unique hashed styles and multiple events for each view:

![image](https://user-images.githubusercontent.com/13086157/200991498-74a87b76-a25e-42dd-a3d7-e9b85a229b01.png)

Simple!

**Default App Variables and Methods**

```javascript
a.load(view_location, optional_view_name) // load a view to be used. View name, used to call a view, is optional and will default to the filename minus the extension if not provided
a.v(view_name, optional_view_data) // returns the HTML element for a view, handling any styling and scripts, ready to be placed with a.out/append or v.out/append
a.view(view_name, optional_view_data) //same as above

a.out(optional_target, output) // outputs an element, or array of elements to the target as HTML. An element can also be dynamically created by providing an html string. If only output is provided then the output will be renedered to to the app target (defaulting to document.body)  
a.append(optional_target, output) // same as above but appends to target end without clearing

a.find(css_style_query) //a query selector which searches the app target (by defaul the `document`), works like document.querySelector
a.findAll(css_style_query) //a query selector which searches the app target (by defaul the `document`), works like document.querySelectorAll
```

**Default View Variables and Methods**

In addition to any variables set in the `view.values` section, each view has access to the following:

```javascript
v.self //a reference to the view HTMLElement
v.find(css_style_query) //a query selector which searches this view, works like v.self.querySelector
v.findAll(css_style_query) //a query selector which searches this view, works like v.self.querySelectorAll

v._uid //a unique id which each view is given e.g. `au-1`. This value is incremented as opposed to randmized for cleaner HTML output
v.view  //a css selector based on the view name, allowing you to style all instances of a view from one place
v.selector //an alternative css selector based on the unique id e.g. `.au-1`

v.output() //does not exist by default but is the recommended way to provide output from a view
```


**An Example of a View**

```javascript
export default {
    // sets the element type - handy to avoid div soup!
    element: v => {
        return `div`
    },
    // set additional default values for this view
    values: v => {
        return {
        }
    },
    // enter any css here. ${v.selector} is a class selector that is unique to this element
    // ${v.view} can instead be used to provide a style for all elements created with this view. With this there will be no duplicate entries either
    style: v => {
        return `
        ${v.selector} {
            
        }
        `
    },
    // the default HTML view to show
    view: v => {
        return ``
    },
    // script which runs when the element is added to the page from the `a.render` method
    script: v => {

    }
}
```


**A Basic Stylized Button View With an Inbuilt Click Counter**
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
        ${v.view} {
            background-color: white;
            border-radius: 1em;
            padding: 0.5em;
            margin: 0.5em;
            border: 0;
            box-shadow: 5px 5px 10px lightgray, -5px -5px 10px white;
            transition: all 0.2s ease;
        }
        ${v.view}:hover {
            box-shadow: 5px 5px 20px lightgray, -5px -5px 20px white;
        }
        ${v.view}:active {
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

**Retrieving Child View Data**

When a view is added and before it's script is ran, the actual HTML Element output by that view will hold a handy `this` variable that holds the view values. This can be used to easily export held or generated data from a child view:

Output method added inside of view script:
```javascript
v.output = () => {
    return {
        text: v.find('input').value,
        done: v.self.classList.contains('done'),
    }
}
```

Running the output method and returning it's data for a single view from a parent component:
```javascript
let result = v.find('li').this.output()
```

Running the output method and returning it's data for multiple views from a parent component:
```javascript
let results = Object.values(v.findAll('li')).map(item => item.this.output())
```


This is used in the todo list example:

![image](https://user-images.githubusercontent.com/13086157/198842914-86c7b14e-492c-4954-8d59-5449de130ff6.png)




**TODO:**

All done!
