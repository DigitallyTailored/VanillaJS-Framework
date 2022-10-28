document.addEventListener('a_init', (e) => {
    a.load('./site-1/view/button.mjs', 'button')

    a.ready(() => {
        a.render(
            a.v('button')+
            a.v('button')+
            a.v('button')
        )
    })
});
