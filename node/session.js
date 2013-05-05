var self = this;
this.setupSocket = function( socket ){
	  socket.allowed = false;
}

this.getSession = function( socket ){
	var fileName = "/var/php_session/sess_"+socket.PHPSESSID+"_js";
    self.cirno.fs.readFile(fileName,'utf8',function(err, data){
        var session = {};
        
        try{
            session = JSON.parse(data);
        } catch(e){}
      
        socket.session = session;

        if (session && session.user && session.user.loggedIn ){
            var userPerms = session.user.permissions;
            var modulePerms = session.module.permissions;
            userPerms = (userPerms instanceof Array) ? userPerms : [];
            modulePerms = (modulePerms instanceof Array) ? modulePerms : [];

            var allowed = false;

            //var modulePerms = session.module.
            for (var i = 0, ilen = userPerms.length; i < ilen; i++ ){
                for ( var j = 0, jlen = modulePerms.length; j < jlen; j++ ) {
                    if ( userPerms[i] == modulePerms[j] ){
                        allowed = true;
                    }
                }
            }

            if ( modulePerms.length == 0 ) allowed = true;
            
            socket.allowed = allowed;
        }
    });
}
