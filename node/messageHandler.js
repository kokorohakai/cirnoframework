//define your messages here!
var self = this;

this.messages = {
    "/home":{
    	    test: function( data, socket ){
    	        console.log("test received", data, test);
            cirno.io.sockets.emit( "test", data );
    	    }
    },
    "/login":{
        login: function( data, socket ){
            console.log("Socket is trying to log into service");
        }
    },
    "/admin":{
        test: function( data, socket ){

        }
    },
    "/browse":{
        getSongs: function( data, socket ){
            var libraryModel = cirno.db.models['karaokeLibrary'];
            libraryModel.search( function( err, dbData ){
                if (!err){
                    socket.emit("listSongs",dbData);
                }
            },{
                "song_name": "%"+data.songName+"%",
                "band_name": "%"+data.bandName+"%"
            },null, null, data.limit, data.start );
        },
        getCount: function( data, socket ){
            var libraryModel = cirno.db.models['karaokeLibrary'];
            libraryModel.search( function( err, dbData ){
                if (!err){
                    socket.emit("listCount",dbData);
                }
            },{
                "song_name": "%"+data.songName+"%",
                "band_name": "%"+data.bandName+"%"
            },null, null, null, null, true );//the last true is count.
        }
    },
    "/chat": {
        getMessages: function( data, socket ){
            var chatModel = cirno.db.models["chat"];
            chatModel.select(function(err, data){
                for ( var i = 0, len = data.length; i < len; i++ ){
                    //it's YOUR responsibility to clean what comes out of the models.
                    delete data[i].users_password;
                }
                socket.emit("messages", data);
            }, false, false, false, 100);
        },
        chat: function( data, socket ){
            if (    data && data.alias && data.message && 
                    socket && socket.session && socket.session.user && socket.session.user.user_id ) {
                //put it in the DB:
                var ts = cirno.getDBTimestamp();
                var chatModel = cirno.db.models["chat"];
                chatModel.insert(function(err, dbdata){
                    //retrieve the message as it was placed in the db.
                    chatModel.get(function(err, data){
                        //emit it to the world.
                        for ( var i = 0, len = data.length; i < len; i++ ){
                            //it's YOUR responsibility to clean what comes out of the models.
                            delete data[i].users_password;
                        }
                        self.emitToModule("chat", "chat", data);
                    },dbdata.insertId)
                },{
                    user_id: socket.session.user.user_id,
                    alias: data.alias,
                    message: data.message,
                    time:ts.time,
                    date:ts.date
                });
            }
        }
    }
}
