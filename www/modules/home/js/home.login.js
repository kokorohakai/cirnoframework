enyo.kind({
    name: "Cirno.App.Home.Login",
    handlers: { onkeydown: "sendLogin" },
    components: (Cirno.Sys.mobile) ? [
        {   tag: "div", classes: "group", components: [
            {   tag: "table", components:[
                {   tag: "tr", components:[
                    {   tag: "td", content:"Username:", classes: ["topGrouping"] }
                ]},
                {   tag:"tr", components:[
                    {   tag: "td", components:[
                        {   kind: onyx.Input, name: "username" },
                    ]}
                ]},
                {   tag: "tr", components:[
                    {   tag: "td", content:"password:", classes: ["topGrouping"] }
                ]},
                {   tag: "tr", components:[
                    {   tag: "td", components:[
                        {   kind: onyx.Input, name: "password", type: "password" }
                    ]}
                ]},
                {   tag: "tr", components:[
                    {   tag: "td", components:[
                        {   kind: "Cirno.Com.Form.Button", name: "login", content: "Login / Register", handlers: { ontap: "login"},
                            login: function( sender, event ){
                                cirno.$.loginManager.login(this.owner.$['username'].getValue(), this.owner.$['password'].getValue());
                            }
                        }
                    ]}
                ]}
            ]}
        ]},
        {   tag: "br" },
        {   tag: "br" },
        {   content: "For Help: Use the 'Triple-dash Menu Button' and navigate to 'Instructions'." }
    ]:[ 
        {   tag: "table", components:[
            {   tag: "tr", components:[
                {   tag: "td", components: [
                    {   tag: "div", classes:"group", components:[
                        {   tag: "table", components:[
                            {   tag: "tr", components:[
                                {   tag: "td", content:"Username:", classes: ["grouping"] },
                                {   tag: "td", components:[
                                    {   kind: onyx.Input, name: "username" }
                                ]}
                            ]},
                            {   tag: "tr", components:[
                                {   tag: "td", content:"password:", classes: ["grouping"] },
                                {   tag: "td", components:[
                                    {   kind: onyx.Input, name: "password", type:'password' }
                                ]}
                            ]},
                            {   tag: "tr", components:[
                                {   tag: "td" },
                                {   tag: "td", components:[
                                    {   kind: "Cirno.Com.Form.Button", name: "login", content: "Login / Register", handlers: { ontap: "login"},
                                        login: function( sender, event ){
                                            cirno.$.loginManager.login(this.owner.$['username'].getValue(), this.owner.$['password'].getValue());
                                        }
                                    }
                                ]}
                            ]}
                        ]}
                    ]}
                ]},
                {   tag: "td", components: [
                    {   tag: "div", classes:"group", components:[
                        {   tag: "iframe", src:"/dj/login_message.html", classes:"login_message" }
                    ]}
                ]}
            ]}
        ]}
    ],
    sendLogin: function( sender, e ){
        if ( e.keyCode == 13 ) {
            cirno.$.loginManager.login(this.$['username'].getValue(), this.$['password'].getValue());
        }
    }
})