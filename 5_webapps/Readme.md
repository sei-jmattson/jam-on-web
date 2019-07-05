# Web applications

So, a web application is just a program that builds web pages.
For small hobby, toy, or demo sites, you could manually build the pages
like in the previous examples.

For more sophisticated sites, that could get quite tedious.

So, many *frameworks* have been developed to have a program assemble an html
page and then return it to the browser.

A browser sends an http request to a web server, which assembles a response
with the html, css, and js needed for that "page", and returns it to the browser.
Then the browser renders the response, and in doing so fetches any other resources
(like css, js, images, etc) that is described in the html.

Most frameworks include some sort of *templates*.  This is like have a bunch of
html *snippets* that you can insert into other html snippets. (So when you want
to change something you can do it one place, rather than everywhere you've
used the same html elements.)

Most have some way of bundling up javascript.

Most have some way of getting data.  This is a big discussion, since most *dynamic*
websites will want to storing or fetching some kind of data. `TODO.`

Most have a package manager,  or a way to pull in code other people have written. `TODO.`

Again you can't just open these files in a browser like you can with *static* pages.
You need to run a program that *serves* the pages.
