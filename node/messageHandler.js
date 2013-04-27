var test="javascript scope is fucked.";
//define your messages here!
this.messages = {
	test: function( str ){
		console.log("test received",str, test);;
		messageHandler.emitAll("test",str);
	}
}
