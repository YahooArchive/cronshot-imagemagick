/*jslint indent: 4, nomen:true, white:true */
/*global require, describe:true,it:true,before:true,after:true */

var expect = require('chai').expect,
    mockery = require('mockery'),
    imagemagickMock = require('../mocks/imagemagick');

describe('cronshot-imagemagick middleware', function() {
    var cronshot_imagemagick;

    before(function() {
        mockery.enable({
            useCleanCache: true,
            warnOnUnregistered: false
        });

        mockery.registerMock('gm', imagemagickMock);

        cronshot_imagemagick = require('../../index');
    });

    after(function() {
        mockery.disable();
        mockery.deregisterAll();
    });

    it("should error if null is passed as the first argument", function() {
        cronshot_imagemagick(null, function(err) {
            expect(err).not.to.equal(null);
        });
    });

    it("should error if options are not passed", function() {
        cronshot_imagemagick({}, function(err) {
            expect(err).not.to.equal(null);
        });
    });

    it("should error if the path option is not passed", function() {
        cronshot_imagemagick({
            options: {}
        }, function(err) {
            expect(err).not.to.equal(null);
        });
    });

    it("should error if the imageName option is not passed", function() {
        cronshot_imagemagick({
            options: {
                path: __dirname
            }
        }, function(err) {
            expect(err).not.to.equal(null);
        });
    });

    it("should error if the gmCommands option is not passed", function() {
        cronshot_imagemagick({
            options: {
                path: __dirname,
                imageName: '/../images/cats.gif',
            }
        }, function(err) {
            expect(err).not.to.equal(null);
        });
    });

    it("should error if the gmCommands option is not an array", function() {
        cronshot_imagemagick({
            options: {
                path: __dirname,
                imageName: '/../images/cats.gif',
                gmCommands: ''
            }
        }, function(err) {
            expect(err).not.to.equal(null);
        });
    });

    it("should error if a readStream property is not passed", function() {
        cronshot_imagemagick({
            options: {
                path: __dirname,
                imageName: '/../images/cats.gif',
                gmCommands: []
            }
        }, function(err) {
            expect(err).not.to.equal(null);
        });
    });

    it("should error if no ImageMagick methods are provided", function() {
        cronshot_imagemagick({
            options: {
                path: __dirname,
                imageName: '/../images/cats.gif',
                gmCommands: []
            },
            readStream: true
        }, function(err) {
            expect(err).not.to.equal(null);
        });
    });

    it("should error if graphicks magick does not support a particular ImageMagick method", function() {
        cronshot_imagemagick({
            options: {
                path: __dirname,
                imageName: '/../images/cats.gif',
                gmCommands: [{
                    'method': 'blah',
                    'args': []
                }]
            },
            readStream: true
        }, function(err) {
            expect(err).not.to.equal(null);
        });
    });

    it("should error even if graphicks magick does not support one particular ImageMagick method", function() {
        cronshot_imagemagick({
            options: {
                path: __dirname,
                imageName: '/../images/cats.gif',
                gmCommands: [{
                    'method': 'trim',
                    'args': []
                }, {
                    'method': 'blah',
                    'args': []
                }]
            },
            readStream: true
        }, function(err) {
            expect(err).not.to.equal(null);
        });
    });

    it("should error if a method property is not provided", function() {
        cronshot_imagemagick({
            options: {
                path: __dirname,
                imageName: '/../images/cats.gif',
                gmCommands: [{
                    'args': []
                }],
                readStream: true
            }
        }, function(err) {
            expect(err).not.to.equal(null);
        });
    });

    it("should error if a gmCommand object is not set", function() {
        cronshot_imagemagick({
            options: {
                path: __dirname,
                imageName: '/../images/cats.gif',
                gmCommands: [{
                    'method': 'trim',
                    'args': []
                }, {

                }],
                readStream: true
            }
        }, function(err) {
            expect(err).not.to.equal(null);
        });
    });

    it("should error if one or more ImageMagick methods are not supported", function() {
        cronshot_imagemagick({
            options: {
                path: __dirname,
                imageName: '/../images/cats.gif',
                gmCommands: [{
                    'method': 'trim',
                    'args': []
                }, {
                    'method': 'hmm',
                    'args': ['#FFFFFF']
                }, {
                    'method': 'test',
                    'args': []
                }]
            },
            readStream: true
        }, function(err) {
            expect(err).not.to.equal(null);
        });
    });

    it("should error even if a file cannot be written", function() {
        cronshot_imagemagick({
            options: {
                path: __dirname,
                imageName: '/../images/cats.gif',
                gmCommands: [{
                    'method': 'trim',
                    'args': []
                }, {
                    'method': 'blah',
                    'args': []
                }],
                error: true
            },
            readStream: true
        }, function(err) {
            expect(err).not.to.equal(null);
        });
    });

    it("should error even if the path and imageName do not point to an existing local file", function() {
        cronshot_imagemagick({
            options: {
                path: __dirname,
                imageName: '/../images/notFound.gif',
                gmCommands: [{
                    'method': 'trim',
                    'args': []
                }, {
                    'method': 'blah',
                    'args': []
                }]
            },
            readStream: true
        }, function(err) {
            expect(err).not.to.equal(null);
        });
    });

    it("should succeed if a supported ImageMagick method is passed", function() {
        cronshot_imagemagick({
            options: {
                path: __dirname,
                imageName: '/../images/cats.gif',
                gmCommands: [{
                    'method': 'trim',
                    'args': []
                }]
            },
            readStream: true
        }, function(err, data) {
            expect(err).to.equal(null);
            expect(data).not.to.equal(null);
            expect(data.name).to.equal('imagemagick');
        });
    });

    it("should succeed if one or more supported ImageMagick methods are passed", function() {
        cronshot_imagemagick({
            options: {
                path: __dirname,
                imageName: '/../images/cats.gif',
                gmCommands: [{
                    'method': 'trim',
                    'args': []
                }, {
                    'method': 'transparent',
                    'args': ['#FFFFFF']
                }, {
                    'method': 'write',
                    'args': []
                }]
            },
            readStream: true
        }, function(err, data) {
            expect(err).to.equal(null);
            expect(data).not.to.equal(null);
            expect(data.name).to.equal('imagemagick');
        });
    });
});