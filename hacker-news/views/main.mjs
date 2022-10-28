export default{
    values : v => {
        return {
            counter: 0,
            ...v
        }
    },
    style : v => {
        return `
        selector {
            background-color: green;
        }
        `
    },
    view : v => {
        return `
        I am main
        ${a.b('button', {counter: -1})}
        
        ${a.b('tooltip')}
        
        huh
        `
    },
    script : v => {

    }
}