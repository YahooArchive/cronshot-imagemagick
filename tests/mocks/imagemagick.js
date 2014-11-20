/*jslint indent: 4, nomen:true, white:true */
module.exports = {
    subClass: function(config) {
        return function() {
            return {
                write: function(fullPath, callback) {
                    callback = callback || function() {};

                    if (callback.error) {
                        callback(true, {
                            name: 'imagemagick'
                        });
                    } else {
                        callback(null, {
                            name: 'imagemagick'
                        });
                    }
                },
                trim: function() {},
                transparent: function() {}
            };
        };
    }
};