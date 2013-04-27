/***********************************************
	A little note about ports and their usage:
		80: apache
		8080: node.js
		8081: vlc 1
		8082: vlc 2
*/
var io 				= require("socket.io").listen(8080),
	path 			= require('path');

function loadMessageHandler(){
	messageHandler 	= require("./messageHandler.js");
	messageHandler.sockets = [];

	//iterate and assign messages from above to socket(s);
	messageHandler.on = function( socket ){
		messageHandler.sockets.push( socket )
		for (i in messageHandler.messages){
			socket.on(i, function(data){
				try{
					messageHandler.messages[i](data)
				}catch(e){console.log(e);}
			});
		}
	}

	messageHandler.off = function( ){
		for ( var i = 0, len = messageHandler.sockets.length; i < len; i++ ){
			messageHandler.sockets[i].disconnect();
		}
		delete messageHandler.sockets;
	}

	messageHandler.emitAll = function( msg, str ){
		if ( typeof(msg) == "string" && typeof(str) != "undefined"){
			for ( var i = 0, len = messageHandler.sockets.length; i < len; i++ ){
				messageHandler.sockets[i].emit( msg, str );
			}
		}
	}
}

loadMessageHandler();
//var server = http.createServer
io.sockets.on("connection", function(socket){
	messageHandler.on(socket);
});

process.on("SIGHUP", function(){
	messageHandler.off();
	var filename = path.resolve("./messageHandler.js");
	delete require.cache[ filename ];
	delete messageHandler;
	loadMessageHandler();
})