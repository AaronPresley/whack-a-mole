# Whack-A-Mole

This is a simple Whack-A-Mole game using HTML, CSS, and Javascript. It was created
by [Aaron Presley](https://aaronpresley.com) in an effort to show off a little bit.

Questions? I'm on Twitter [@AaronPresley](https://twitter.com/AaronPresley),
or email me at [hello@aaronpresley.com](mailto:hello@aaronpresley.com).

## Installation

Clone the repo into your desired directory. I have included all compiled static
files within the repo, so there shouldn't be any need to run a gulp command
(unless you want to). Open up the `index.html` file to see the game.

You can also see the game on my site by going [here](http://whack-a-mole.aaronpresley.com/).

### Building

If you want to build the files yourself, run the `npm install` command within
the project's directory. You might also need to run `gulp install -g` to install
gulp globally.

After all the projects install, run `gulp build` to compile all the assets. You can
then open up `index.html` in a browser to see the game.

### Testing

In order to test, you will have to install jasmine-node globally with
`npm install jasmin-node -g`. After this you can run tests with `npm test`.


## Improvements

There are several aspects that could be improved about this game.

### Mobile Friendly

Currently this game is not mobile friendly, as my goal was to get a working
prototype up and running.

### Game Renderer

Currently the `GameRenderer` object I made is just generating dumb HTML and
spitting it out on the page. I could have used a library like React or Mustache,
but wanted to limit complexity and number of required libs.

Fortunately, no game logic relies on the `GameRenderer` object, and it could
be fully replaced with relative ease.

### Interface Testing

While all JS objects relating to the game are tested, I am not currently testing
the HTML or interactions on the testing layer.

### Browsers

This game was only tested on Chrome and Safari browsers. It likely works similarly
on other browsers, but I haven't fully tested each one.
