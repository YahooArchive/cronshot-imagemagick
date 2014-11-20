cronshot-imagemagick
====================

[CronShot](https://github.com/yahoo/cronshot) middleware to manipulate and save images with ImageMagick via [gm](https://github.com/aheckmann/gm)

`npm install cronshot-imagemagick`

## How

CronShot uses:

- [gm](https://github.com/aheckmann/gm)


## Setup

Install `CronShot`

`npm install cronshot`


Install `ImageMagick`

`brew update && brew install imagemagick`


## Example

```javascript
var cronshot = require('cronshot'),
  middleware = {
    imagemagick: require('cronshot-imagemagick')
  };

// Image Magick Example
// --------------------

// Takes a screenshot of sports.yahoo.com,
// and converts the screenshot to be a transparent image using Image Magick

// Image Magick example
cronshot.startCapturing({
  // The webpage URL that you would like to take a screenshot of
  'url': 'http://sports.yahoo.com',
  // The local path where you would like to save the image
  'path': __dirname,
  // Our middleware modules
  'saveMiddleware': {
    'screenshots': [{
      // Function that does all the Image Magick stuff
      'middleware': [middleware.imagemagick],
      'options': {
        // The Image Magick commands that you would like to run
        'gmCommands': [{
          'method': 'trim',
          'args': []
        }, {
          'method': 'transparent',
          'args': ['#FFFFFF']
        }]
      }
    }]
  }
}, function(err) {
  // optional callback function once all screenshots have been taken
  if (err) {
      console.error(err);
  }
});
```


## Options

**Note:** All methods supported by [gm](http://aheckmann.github.io/gm/docs.html) can be used

```javascript
{
  // The ImageMagick methods that you would like to be used via the gm node module
  'gmCommands': []
}
```

## Contributing

Please send all PR's to the `dev` branch.

If your PR is a code change:

1.  Install all node.js dev dependencies: `npm install`
2.  Update the appropriate module inside of the `src/modules` directory.
3.  Add a unit test inside of `tests/unit/cronshot-imagemagick.js`.
4.  Verify that all tests are passing by running `npm test`.
5.  Send the PR!


## Credits

CronShot-ImageMagick would not have been possible without the help/inspiration of the following libraries/awesome people:

 - [Aaron Heckmann](https://github.com/aheckmann)'s [gm](https://github.com/aheckmann/gm)
  * GraphicsMagick for node
  * Copyright (c) Aaron Heckmann, 2010 -  [MIT License](https://github.com/aheckmann/gm#license)


## Contributors

- [Greg Franko](https://github.com/gfranko)
- [Chase West](https://github.com/ChaseWest)