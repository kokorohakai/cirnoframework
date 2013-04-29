Cirno.alertError = function(xhr,type){
    var str = xhr.xhrResponse.body;
    var obj = undefined;
    try {
        obj = JSON.parse(str);
    } catch(e){};
    if ( typeof(obj) == "object" && typeof(obj.error) == "string" ) {
        alert(obj.error);
        console.log( obj.error, type);
    } else {
        alert(str);
        console.log( str, type );
    }
}

enyo.kind({
    name:"CirnoApp",
    kind: enyo.Control,
    version: "0.1",
    codeName: "baka",
    content: "Access Denied",
    classes: [(Cirno.Sys.mobile)?"mobile":"nonmobile"],
    constructor: function( ){
        this.inherited(arguments);
        
        function createModule( data ){
            var obj = eval(module.kind)
            if (typeof(obj)!="undefined"){
                self.createComponent({ kind:module.kind, published: data });
            } else {
                //probably should note that the application is FUCKED if this happens.
                console.log("Missing kind: "+module.kind+" for module:"+module.path);
            }
            self.renderInto(document.getElementById("cirno"));
        }

        var self = this;
        var module = {};
        var temp = Cirno.Sys.module.split("/");
        for ( var i = 0, len = temp.length; i < len; i++ ){
            temp[i] = temp[i].ucfirst();
        }
        
        module.kind = "Cirno.App."+temp.join(".");
        module.path = Cirno.Sys.module;

        var ajax = new enyo.Ajax({
            url:"/api/"+Cirno.Sys.module,
            method:"GETCONFIG"
        }).response(this,function(sender, res){
            //magic time.
            createModule(res);
        }).error(function(xhr,type){
            console.log("No config defined for "+module.path);
            createModule({});
            //Cirno.alertError(xhr,type); //maybe we don't want to do that here.
        }).go();

        this.setProperty("module",module);
    },
    components:[
        {   kind: "Cirno.Com.Toolbar" },
        {   kind: "Cirno.Com.Messaging", ischrome: true},
        {   kind: "Cirno.Com.LoginManager", ischrome: true}
    ]
});
