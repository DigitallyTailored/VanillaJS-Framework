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
            console.log(v)
        })

    }
}