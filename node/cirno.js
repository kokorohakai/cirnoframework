/***********************************************
	A little note about ports and their usage:
		80: apache
		8080: node.js
		8081: vlc 1
		8082: vlc 2
*/
var cirno = {
	io: require("socket.io").listen(8080),
	path: require('path'),
	modules: require("./modules.js"),
	session: require("./session.js")
}

function loadMessageHandler(){
	cirno.messageHandler 		 	= require("./messageHandler.js");
	cirno.messageHandler.cirno 		= cirno;
	cirno.messageHandler.sockets 	= [];
	
	for (var i in cirno.messageHandler.messages){
		cirno.io.of(i).on("connection", function( socket ){
			var module = cirno.messageHandler.messages[this.name];
			cirno.messageHandler.sockets.push( socket );
			for (var j in module){
				socket.module = i;
				socket.on( j, function( data ){
					if ( cirno.modules.hasPermission( cirno.session.getUser( socket ) ) ){
						try{
							module[j]( data, socket );
						} catch(e) {
							console.log(e);
						}
					}
				});
			}
		});
	}

	cirno.messageHandler.emitModule = function( module, msg, str ){
		//this is where I will need to iterate through the sockets for 
		//which belong to this module, then emit on those sockets.
	}
}

function stopMessageHandler(){
	for ( var i = 0, len = cirno.messageHandler.sockets.length; i < len; i++ ){
		cirno.messageHandler.sockets[i].disconnect();
	}
	cirno.io.sockets.removeAllListeners();
	var filename = cirno.path.resolve("./messageHandler.js");
	delete require.cache[ filename ];
	delete cirno.messageHandler;
}

loadMessageHandler();

process.on("SIGHUP", function(){
	nukeMessageHandler();
	loadMessageHandler();
})