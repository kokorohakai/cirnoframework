enyo.kind({
    name:"Cirno.Com.Messaging",
    kind: enyo.Component,//it doesn't need to render anything, nor should it really.
    published: { socket: null },
    constructor: function(){
    	this.inherited(arguments);
        var url = 'http://cirno:8080/'+Cirno.Sys.module;
		var socket = new io.connect(url, {data: "test"} );
        socket.on("connect",function(){
            socket.emit("SETPHPSESSID", Cirno.cookies['PHPSESSID'] )
        })
    	
    	this.setProperty("socket", socket);
    },
    sendMessage: function( msg, data){
        //designed so that if currently in a disconnected state, it will defer until ready.
        function sendMsg(){
            var subSocket = self.getProperty("socket").socket;
            if (subSocket.open && !subSocket.reconnecting && !subSocket.connecting && subSocket.connected){
                self.getProperty("socket").emit(msg, data );
            } else {
                setTimeout( function(){ sendMsg(); }, 200 );
            }
        }
        var self = this;
        sendMsg();
    },
    listenMessage: function( msg, cb, whenCreated ){
        function createListener() {
            var subSocket = self.getProperty("socket").socket;
            if (subSocket.open && !subSocket.reconnecting && !subSocket.connecting && subSocket.connected){
                self.getProperty("socket").on(msg, cb);  
                if ( typeof(whenCreated) == "function" ){
                    whenCreated();
                }
            } else {
                setTimeout( function(){ createListener(); }, 200 );
            }
        }
        var self = this;
        createListener();
    }
});