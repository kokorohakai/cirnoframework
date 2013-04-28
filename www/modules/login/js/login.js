enyo.kind({
    name: "Cirno.Login",
    kind: enyo.Control,
    layoutKind: "FittableRowsLayout",
    components: (Cirno.mobile) ? [
        {   kind: "Cirno.Com.Toolbar" },
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
                            login: function(){
                                console.log("Oh, you would like to do that, wouldn't you?");
                            }
                        }
                    ]}
                ]}
            ]}
        ]}
    ]:[ 
        {   kind: "Cirno.Com.Toolbar" },
        {   tag: "div", classes:"group", components:[
            {   tag: "table", components:[
                {   tag: "tr", components:[
                    {   tag: "td", content:"Username:", classes: ["grouping"] },
                    {   tag: "td", components:[
                        {   kind: onyx.Input, name: "username" },
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
                            login: function(){
                                cirno.$.loginManager.login(this.owner.$['username'].getValue(), this.owner.$['password'].getValue());
                            }
                        }
                    ]}
                ]}
            ]}
        ]}
    ],
    sendLogin: function(){

    }
})