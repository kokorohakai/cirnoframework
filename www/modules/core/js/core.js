enyo.kind({
    name:"cirno",
    kind: enyo.Control,
    content: "The core has loaded!",
    constructor: function( module ){
        this.setProperty("module",module);//the module the server resolved.
        this.inherited(arguments);
        console.log( this.module )
    }
});
