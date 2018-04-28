module.exports = (function(){
'use strict';

var pfx = {
    webkit: 'webkitTransform',
    moz: 'MozTransform',
    MS: 'msTransform',
    o: 'OTransform'
};
var prefix = getPrefix();
function assert(pred,msg){
    if(!pred) {
        throw new Error(msg)
    }
}
function getPrefix() {
    var elementStyle = document.createElement('div').style;
    for (var key in pfx) {
        if (pfx.hasOwnProperty(key) && pfx[key] in elementStyle) {
            return key;
        }
    }
    return '';
}

function noop(){}
return {
    add: function(element, type, callback) {
        callback = (callback || noop);
        assert(element,'element is required')
        assert(type,'type is required')

        if (prefix) {
            element.addEventListener(prefix + type, callback, false);
        }
        element.addEventListener(type.toLowerCase(), callback, false);
    }
    ,remove: function(element,type,callback){
        callback = (callback || noop);
        assert(element,'element is required')
        assert(type,'type is required')

        if (prefix) {
            element.removeEventListener(prefix + type, callback, false);
        }
        element.removeEventListener(type.toLowerCase(), callback, false);
    }
}

})();

