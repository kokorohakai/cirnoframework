enyo.kind({
    name: "Cirno.Com.Form"
})

enyo.kind({
    name: "Cirno.Com.Form.Button",
    classes: "button",
    tag: "div",
    handlers: { onmousedown: "mousedown", onmouseup: "mouseup" },
    mousedown: function( sender, e ){
        this.addClass("mousedown");
    },
    mouseup: function( sender, e ){
        var self = this;
        setTimeout(function(){
            self.removeClass("mousedown");
        },16);
    }
});
