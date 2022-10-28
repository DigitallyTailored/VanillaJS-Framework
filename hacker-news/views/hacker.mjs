export default {
    element: v => {
        return `div`
    },
    values: v => {
        return {
            page: 0,
        }
    },
    style: v => {
        return `
        ${v.selector} {
            
        }
        `
    },
    view: v => {
        return `Loading...`
    },
    script: v => {

        fetch(`https://node-hnapi.herokuapp.com/news?page=${v.page}`)
            .then(r => r.json())
            .then(data => {
                //console.log(data)
                let output = a.v('feed',{data:data})
                a.render(v.self, output) //render all queued views to this view's output
            });

    }
}