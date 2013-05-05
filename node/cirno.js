/***********************************************
	A little note about ports and their usage:
		80: apache
		8080: node.js
		8081: vlc 1
		8082: vlc 2
*/
require("./system.js");
var cirno = {
	io: 		require("socket.io").listen(8080,{ log: false }),
	path: 		require('path'),
	session: 	require("./session.js"),
	fs: 		require('fs'),
	db: 		require("./db.js")
}

function loadMessageHandler(){
	function configureListener( socket, module, j ){
		socket.on( j, function( data ){
			//might want to, instead, setup other listeners after the PHPSESSID has been received.
			if ( socket.allowed ) { 
				try{
					module[j]( data, this );
				} catch(e) {
					console.log(e);
				}
			}
		});
	}

	cirno.messageHandler 		 	= require("./messageHandler.js");
	cirno.messageHandler.cirno 		= cirno;
	cirno.messageHandler.sockets 	= [];
	cirno.session.cirno 			= cirno;

	//rebuild the models after updating the message handler.
	var models = require("./models.js");
	models.build( cirno );
	
	
	for (var i in cirno.messageHandler.messages){
		cirno.io.of(i).on("connection", function( socket, test ){
			console.log("A wild pokemon has appeared!");
			cirno.session.setupSocket( socket );

			var module = cirno.messageHandler.messages[this.name];
			for (var j in module){
				socket.module = i;
				configureListener( socket, module, j);
			}

			socket.on("SETPHPSESSID",function( PHPSESSID ){
				this.PHPSESSID = PHPSESSID;
				cirno.session.getSession( this );
			})

			cirno.messageHandler.sockets.push( socket );
		});
	}

	cirno.messageHandler.emitToModule = function( module, msg, data ){
	    var sockets = cirno.messageHandler.sockets;
	    for ( var i = 0, len = sockets.length; i < len; i++){
	        if (sockets[i].module == "/" + module ){
	            sockets[i].emit(msg, data);
	        }
	    }
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

cirno.getDBTimestamp = function(){
	var ret = {};
	var dt = new Date();
	ret.time = dt.getHours().toString().pad("0",2)+":"+dt.getMinutes().toString().pad("0",2)+":"+dt.getSeconds().toString().pad("0",2);
	ret.date = dt.getFullYear()+"-"+(dt.getMonth()+1).toString().pad("0",2)+"-"+dt.getDate().toString().pad("0",2);
	ret.timestamp = ret.date + " " + ret.time;
	return ret;
}