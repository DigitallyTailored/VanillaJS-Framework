document.addEventListener('a_init', (e) => {
    a.load('./site-1/view/button.mjs', 'button')

    a.ready(() => {

        let output = ``
        for (let i = 0; i < 10; i++) {
            output += a.v('button', {text: 'Button ' + (i+1)})
        }

        a.render(
            output
        )
    })

});
