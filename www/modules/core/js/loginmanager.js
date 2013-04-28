enyo.kind({
    name:"Cirno.Com.LoginManager",
    kind: enyo.Component,
    login: function( username, password ){
    	var pw = CryptoJS.SHA3(password);
		new enyo.Ajax({
		    url:"/api/login",
		    method:"LOGIN"
		}).response(this,function(sender, res){
		    
		}).error(this, function(sender, res){
		    
		}).go({
		    username: username,
		    password: pw
		});
    }
})