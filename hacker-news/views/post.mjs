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
        return `post ${v.post.title}`
    },
    script: v => {
        //you can also update the view when the script runs, even if it is nested like this
        //a.render(v.self, `SCRIPT post ${v.post.title} :D `)
    }
}