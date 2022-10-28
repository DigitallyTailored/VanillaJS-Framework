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
        return `feed...`
    },
    script: v => {
        let output = ``
        //console.log(v.data)
        v.data.forEach(post => {
                output += a.v("post", {post: post})
            })
        a.render(v.self, output) //render all queued views to this view's output
    }
}