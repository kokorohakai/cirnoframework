Cirno = {};
Cirno.Com = {};

Cirno.App = {};
Cirno.Sys = {};
Cirno.Sys.mobile = (function(a){return Boolean(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))})(navigator.userAgent||navigator.vendor||window.opera);

function User(params){
    if (this == window){
        return new User(params);
    } else {
        for (i in params){
            this[i] = params[i];
        }
    }
};

Object.defineProperty( User.prototype, "hasPermission",{
    enumerable: false,
    writable: false,
    configurable: false,
    value: function( perm ){
        var retval = false;
        if (this.permissions && this.permissions instanceof Array ){
            for (var i = 0, len = this.permissions.length; i < len; i++ ){
                if ( this.permissions[i] == perm ) retval = true;
            }
        }
        return retval;
    }
});

Object.defineProperty( User.prototype, "isLoggedIn",{
    enumerable: false,
    writable: false,
    configurable: false,
    value: function(){
        var type = typeof(this.loggedIn);
        var retval = false;
        switch(type){
            case "string":
                var val = this.loggedIn.toLowerCase();
                if (isNaN(parseInt(val))){
                    if (val === "true" || val === "t") retval = true;
                } else {
                    retval = Boolean(parseInt(val))
                }
            break;
            case "number":
                retval = Boolean(this.loggedIn);
            break;
            case "boolean":
                retval = this.loggedIn;
            break;
        }
        return retval;
    }
});

Object.defineProperty( String.prototype, "ucfirst", {
    enumerable: false,
    writable: true,
    configurable: false,
    value: function( ){
        var str = this[0].toUpperCase() + this.substr(1);
        return str;
    }
});

Cirno.cookies = (function(){
    var output = {};
    var cookies = document.cookie.split(/,;/);
    for ( var i = 0, len = cookies.length; i < len; i++){
        var cookie = cookies[i].split("=");
        if (cookie.length==2) {
            output[cookie[0]] = cookie[1];
        }
    }
    return output;
})();

Object.defineProperty( String.prototype, "replaceAll", {
    enumberable: false,
    writable: false,
    configurable: false,
    value: function( search, replace ){
        var output = this;
        if ( typeof(search) == "string" && typeof(replace) == "string" ) {
            output = this.split(search).join(replace);
        }
        return output;
    }
})

Object.defineProperty( String.prototype, "pad", {
    enumberable: false,
    writable: false,
    configurable: false,
    value: function( character, length, rightSide ){
        var output = this;
        var pad = "";
        var len = this.length;
        if ( len < length ){
            for ( var i = 0; i < length-len; i++){
                pad+=character;
            }
        }
        if ( rightSide ){
            output = this+pad;
        } else {
            output = pad+this;
        }
        return output;
    }
})

Object.defineProperty( Object.prototype, "extend", {
    enumerable: false,
    writable: true,
    configurable: false,
    value: function( obj ){
        if (typeof(obj) == "object"){
            for ( i in obj){
                this[i] = obj[i];
            }
        } else {
            console.log("Object.extend :: Invalid object supplied");
        }
        return this;
    }
});

if ( window.console && navigator.userAgent.lastIndexOf("Android") > -1){
    document.write('<div id="CIRNO_SYSTEM_DEBUG_WINDOW" class="hidden"></div>');
    window.console.log = function(){
        var output = "";
        var date = new Date();
        for( var i = 0, len = arguments.length; i < len; i++ ){
            if ( typeof(arguments[i]) == "undefined" ){
                output += " <s>undefined</s>";
            } else if ( typeof( arguments[i] ) == "object" && arguments[i] instanceof Object ){
                var str = "";
                try {
                    str = JSON.stringify( arguments[i] );
                } catch( e ) {
                    str = "[Object object]";
                }
                output+= " " + str;
            } else if ( typeof( arguments[i] ) == "object" && arguments[i] instanceof Array ){
                var str = "";
                try {
                    str = JSON.stringify( arguments[i] );
                } catch( e ) {
                    str = "[Array object]";
                }
                output += " " + str;
            } else {
                output += " " + arguments[i].toString();
            }
        }

        var debug = document.getElementById("CIRNO_SYSTEM_DEBUG_WINDOW");
        var html = debug.innerHTML;
        html += "<i>" + date.toString() + "</i>: " + output + "<br>";
        debug.innerHTML = html;
        debug.className="";
    }
    window.onerror = function( e ){
        console.log(e);
    } 
}