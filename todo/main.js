document.addEventListener('a_init', (e) => {
    a.load('./todo/view/list.mjs')
    a.load('./todo/view/list-item.mjs')

    a.ready(() => {

        const target = document.body
        a.out(target, [
            `<h1>List: </h1>`,
            a.v('list')
        ])

    })

});
