enyo.kind({
    name:"CirnoApp",
    kind: enyo.Control,
    version: "0.1",
    codeName: "baka",
    content: "The core has loaded!",
    constructor: function( module ){
        this.inherited(arguments);

        this.setProperty("module",module);//the module the server resolved.
    },
    components:[{kind:"Cirno.Core.Messaging",ischrome: true}]
});


/*
ajax example:


new enyo.Ajax({
    url:"/api/users",
    method:"GET"
}).response(this,function(sender, res){
    console.log(res);
}).error(this, function(sender, res){
    console.log(res);
}).go({
    module:'core/login'
});

*/