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