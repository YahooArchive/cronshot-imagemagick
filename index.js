// cronshot-imagemagick
// ====================

/* Copyright  2014 Yahoo Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */

var fs = require('fs'),
    gm = require('gm'),
    imageMagick = gm.subClass({
        imageMagick: true
    });

module.exports = function saveToLocal(obj, callback) {
    obj = obj || {};
    obj.options = obj.options || {};

    var options = obj.options || {},
        content = obj.readStream,
        path = options.path,
        imageName = options.imageName,
        fullPath = path + imageName,
        info = {
            'name': 'imagemagick'
        },
        gmCommands = options.gmCommands,
        imageMagickContent = {},
        methodsThatError = [],
        writeCallback = function(err) {
            if (err) {
                callback(err, info);
            } else {
                callback(null, info);
            }
        };

    writeCallback.error = options.error;

    try {
        imageMagickContent = imageMagick(content);
        if (!gmCommands || !Array.isArray(gmCommands) || !gmCommands.length) {
            callback(new Error('You must have a gmCommands option with one or more commands'));
            return;
        }
        gmCommands.forEach(function(currentCommand) {
            currentCommand = currentCommand || {};
            var method = currentCommand.method,
                args = currentCommand.args || [],
                jsMethod = args.length > 1 ? 'apply' : 'call';

            if (method) {
                if (imageMagickContent[method]) {
                    imageMagickContent[method][jsMethod](imageMagickContent, args.join(','));
                } else {
                    methodsThatError.push(method);
                }
            } else {
                methodsThatError.push('Method not specified');
            }
        });

        if (methodsThatError.length) {
            callback(new Error('Graphics Magick does not support these methods: ' + methodsThatError.join(',')));
            return;
        } else if (!fs.existsSync(fullPath)) {
            callback(new Error('Path not found: ' + fullPath));
            return;
        }

        imageMagickContent.write(fullPath, writeCallback);
    } catch (e) {
        callback(e, info);
    }
};