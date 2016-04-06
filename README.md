# Whack-A-Mole

This is a simple Whack-A-Mole game using HTML, CSS, and Javascript. It was created
by [Aaron Presley](https://aaronpresley.com) in an effort to show off a little bit.

Questions? I'm on Twitter [@AaronPresley](https://twitter.com/AaronPresley),
or email me at [hello@aaronpresley.com](mailto:hello@aaronpresley.com).

## Demo

You can see the game on my site by going [here](http://whack-a-mole.aaronpresley.com/).

## Installation

Clone the repo into your desired directory. I have included all compiled static
files within the repo, so there shouldn't be any need to run a gulp command
(unless you want to). Open up the `index.html` file to see the game.


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

There are a few aspects that I'd like to improve upon given some more time:

### Mobile Friendly

Currently this game is not mobile friendly, as my goal was to get a working
prototype up and running.

### Game Renderer

Currently the `GameRenderer` object is just generating dumb HTML and
spitting it out on the page. I could have used a library like React or Mustache,
but wanted to limit complexity and number of required libs.

Fortunately, no game logic relies on the `GameRenderer` object, and it could
be fully replaced with relative ease.

### Interface Testing

While all JS objects relating to the game are tested, I am not currently testing
the HTML or interactions on the presentation layer.

### Browsers

This game was only tested on Chrome and Safari browsers. It likely works similarly
on other browsers, but I haven't fully tested each one.

### Raw Javascript

I'm using jQuery, but its use is so minimal I probably could easily switch to
only using raw JS. I decided to opt for jQuery since it'd be a bit faster for
me.


## Misc Notes

- Each time the user scores, the moles move faster by .3 seconds.
- When a user hits a mole, the game pauses for about a second. This was mostly
because I wanted to make sure the user sees the cute mole-hit image.
- I created the hole image, as well as both mole states, in Adobe Illustrator. The
original file is located at `static/img/cell-art.ai`.
- Currently jQuery is the only library being used (except for node compilation, which
is using `gulp` and `browserify`).
- All game objects are completely separate from the presentation layer, making
it easy to implement React or a similar library with relative ease.
- I didn't come across a huge need for using closures, except in the `Game.start()`
method, which handles the game's speed given the current user score.
- I'm leaving all of the assets un-compressed to make it easier to poke through
the JS and CSS.
