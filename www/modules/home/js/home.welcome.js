enyo.kind({
    name: "Cirno.App.Home.Welcome",
    handlers: { onkeydown: "sendLogin" },
    components: [(Cirno.Sys.mobile) ? { kind: "Cirno.App.Home.Welcome.Mobile" } : { kind: "Cirno.App.Home.Welcome.Normal" }]
});

enyo.kind({
    name: "Cirno.App.Home.Welcome.Normal",
    components: [
        {   tag: "iframe", src: "/dj/welcome_message.html", classes: "welcome_message" }
    ]
})

enyo.kind({
    name: "Cirno.App.Home.Welcome.Mobile",
    components: [
        {   tag: "iframe", src: "/dj/welcome_message_mobile.html", classes: "welcome_message" }
    ]
})

