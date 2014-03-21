//define your messages here!
var self = this;

this.messages = {
    "/home":{
    	    test: function( data, socket ){
    	        //console.log("test received", data, test);
                cirno.io.sockets.emit( "test", data );
    	    }
    },
    "/login":{
        login: function( data, socket ){
            //console.log("Socket is trying to log into service");
        }
    }
}
