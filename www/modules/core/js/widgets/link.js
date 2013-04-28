enyo.kind({
    name:"Cirno.Com.Link",
    classes: "toolbarLink",
    handlers: { onclick: "goLink" },
    goLink: function(){
        window.location = this.url;
    }
})