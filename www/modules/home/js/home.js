enyo.kind({
    name: "Cirno.Home",
    components: (Cirno.mobile) ? [
        {   kind: "Cirno.Com.Toolbar" }
    ]:[
        {   kind: "Cirno.Com.Toolbar" }
    ]
})