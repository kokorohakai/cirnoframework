enyo.kind({
    name:"Cirno.Com.Messaging",
    kind: enyo.Component,//it doesn't need to render anything, nor should it really.
    constructor: function(){
    	this.inherited(arguments);
        var url = 'http://cirno:8080/'+Cirno.Sys.module;
        console.log(url);
		var socket = new io.connect(url, {data: "test"} );
        socket.on("connect",function(){
            socket.emit("SETPHPSESSID", Cirno.cookies['PHPSESSID'] )
        })
    	
    	this.setProperty("socket", socket);
    }
});