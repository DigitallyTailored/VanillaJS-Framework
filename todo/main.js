document.addEventListener('a_init', (e) => {
    a.load('./todo/view/list.mjs')
    a.load('./todo/view/list-item.mjs')

    a.ready(() => {

        // a.render(
        //     a.v('list')
        // )
        a.target.innerHTML = ``
        a.target.insertAdjacentElement('beforeend', a.v('list'))


    })

});
