export default {
    element: v => {
        return `div`
    },
    values: v => {
        return {
        }
    },
    style: v => {
        return `
        ${v.selector} {
            
        }
        `
    },
    view: v => {
        return ``
    },
    script: v => {
        //a.render(v.self, `Hello!`)
    }
}