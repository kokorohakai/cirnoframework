enyo.kind({
    name:"Cirno.Core.Messaging",
    constructor: function(){
    	this.inherited(arguments);

		var socket = new io.connect('http://localhost:8080');
    	
    	this.setProperty("socket", socket);
    }
});