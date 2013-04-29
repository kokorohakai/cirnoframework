enyo.kind({
    name: "Cirno.App.Home",
    kind: enyo.Control,
    layoutKind: "FittableRowsLayout",
    components: [
        (Cirno.Sys.user.isLoggedIn()) ? {kind: "Cirno.App.Home.Welcome"} : {kind:"Cirno.App.Home.Login"}
    ]
})