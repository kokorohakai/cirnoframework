enyo.kind({
    name:"Cirno.Com.LoginManager",
    kind: enyo.Component,
    login: function( username, password ){
    	var pw = CryptoJS.SHA3(password);
		new enyo.Ajax({
		    url:"/api/home/login",
		    method:"LOGIN"
		}).response(this,function(sender, res){
		    window.location = "/home";
		}).error(this, function(sender, res){
		    //telegram, for bongo!
		}).go({
		    username: username,
		    password: pw
		});
    },
    logout: function(){
        new enyo.Ajax({
            url:"/api/home/login",
            method:"LOGOUT"
        }).response(this,function(sender, res){
            window.location = "/home";
        }).error(this, function(sender, res){
            //telegram, for bongo!
        }).go();
    }
})