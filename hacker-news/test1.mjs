
//todo, moved await into method but doesn't work so make it work to keep it simple

a.load('./hacker-news/views/hacker.mjs', 'hacker')
a.load('./hacker-news/views/feed.mjs', 'feed')
a.load('./hacker-news/views/post.mjs', 'post')


/*
CORE VALUES
    simplicity
    performance
    overhead
 */

//add a method to the ready array, called when all views have loaded
a.ready(() => {

    a.target = a.find('#output')

    a.render(a.v('hacker'))

    /*
        //generate target output with templates
        let output = ``
        for (let i = 0; i < 5; i++) {
            output += `
            <p>Paragraph: ${a.v('test')}</p>
            <p>Paragraph: ${a.v('test', {text: 'blah blah blah', color: 'green'})}</p>
            <p>Paragraph: ${a.v('test', {text: a.v('test', {color: 'blue'}), color: 'orange'})}</p>
            `
        }

        a.render(output) //renders to target by default

        //output template to specific element
        a.render(a.find('#inside-example'), a.v('test', {text: 'ya we did it!'}))

        */
})


