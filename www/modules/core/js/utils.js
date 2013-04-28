Object.defineProperty( String.prototype, "ucfirst", {
    enumerable: false,
    writable: true,
    configurable: false,
    value: function( ){
        var str = this[0].toUpperCase() + this.substr(1);
        return str;
    }
});