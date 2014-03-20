enyo.kind({
    name:"Cirno.Com.Link",
    classes: "cirnoLink",
    handlers: { onclick: "goLink" },
    goLink: function(){
    	this.setStyle("color:red");
    	this.renderStyles();
    	
    	var self = this;
        setTimeout(function(){
        	window.location = self.url;
        },16);
    }
})