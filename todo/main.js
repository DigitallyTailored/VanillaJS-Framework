document.addEventListener('a_init', (e) => {
    a.load('./todo/view/list.mjs')
    a.load('./todo/view/list-item.mjs')

    a.ready(() => {

        a.render(
            a.v('list')
        )

    })

});
