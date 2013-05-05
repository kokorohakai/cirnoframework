enyo.kind({
    name: "Cirno.App.Chat",
	kind: enyo.Control,
    tag: "div",
    handlers: { onkeydown: "keyEvent" },
    waiting: false,
    create: function(){
        this.inherited(arguments);

        var self = this;
        cirno.$['messaging'].listenMessage("chat",function(data){
            //console.log("got a message:", data);
            //a fail safe in case the initial retrieval didn't happen.
            if (self.$['chatList'].components.length == 0){
                cirno.$['messaging'].sendMessage("getMessages");
            } else {
                self.addMessage(data);
            }
            self.waiting = false;
            self.$['send'].removeClass("active");
        })
        cirno.$['messaging'].listenMessage("messages",function(data){
            //console.log("Got messages:", data.length);
            self.addMessages(data);
        }, function(){
            cirno.$['messaging'].sendMessage("getMessages");
        });
    },
    keyEvent: function( sender, e ){
        if ( e.keyCode == 13 && !e.shiftKey ) {
            e.preventDefault();
            this.sendMessage();
            return false;
        }
    },
    sendMessage: function(){
        var message = this.$['message'].getValue();
        var alias   = this.$['alias'].getValue();
        if (!this.waiting && message.length > 0 ){
            this.waiting = true;
            if (alias.length < 3 ) {
                alias = Cirno.Sys.user.username;
                this.$['alias'].setValue("");
            }
            
            this.$['send'].addClass("active");
            this.$['message'].setValue('');

            cirno.$['messaging'].sendMessage("chat",{
                alias:alias,
                message:message
            });
        }
    },
	components:[
        { tag: "table", classes: "layoutTable", components: [
            { tag: "tr", components: [
                { tag: "td", classes: "layout1"}, (!Cirno.Sys.mobile) ? { tag: "td", classes: "layout2", name: "layout2" } : {}
            ]},
            { tag: "tr", components: [ 
                { tag: "td", attributes: (!Cirno.Sys.mobile) ? { colspan: "2" } : {}, classes:"chatToolbarContainer", components:[ 
            		{ tag: "div", classes:"chatToolbar", name: "chatToolbar", components:[
            			{ tag: 'table', style: "padding: 5px;",components: 
                            //desktop/tablet layout
                            (!Cirno.Sys.mobile) ? [
            				{ tag: 'tr', components: [
            					{ tag: 'td', content: "Alias:", classes: "grouping alias"},
            					{ tag: 'td', classes: "aliasinput", attributes: { colspan: "2" }, components: [
            						{ kind: 'onyx.Input', placeholder: Cirno.Sys.user.username, name: "alias" },
            					]},
            					{ tag: 'td', classes: "messageinput", attributes: { rowspan: '2'}, components: [
            						{ kind: 'onyx.TextArea', classes: "message", name: "message" }
            					]},
            					{ tag: 'td', classes: "caption", attributes: { rowspan: '2'}, content: "Welcome to the Chat system, "+Cirno.Sys.user.username, style: "text-align: center;" },
            					{ tag: 'td', attributes: { rowspan: '2'}, classes: "queuebutton", components:[
            						{	kind: 'Cirno.Com.Form.Button', 
            							content: "Song Queue", 
            							name: "queueButton", 
            							handlers: { ontap: "toggleQueue" },
            							toggleQueue: function(){
            								this.owner.$['queue'].toggleQueue();
            							}
            						}
            					]}
            				]},
            				{ tag: "tr", components:[
            					{ tag:'td' },
            					{ tag: 'td', classes: "send", components: [
            						{   kind: 'Cirno.Com.Form.Button', content: "Send Message", name: "send",
                                        handlers: { ontap: "sendMessage" },
                                        sendMessage: function(){
                                            this.owner.sendMessage();
                                        }
                                    }
								]},
								{ tag: 'td', content: 'Message:', classes: "grouping message" }
            				]}
            			]
                        //phone layout
                        : [
                            { tag: "tr", components: [
                                { tag: "td", classes: "welcome", content: "Welcome to the chat system"}
                            ]},
                            { tag: "tr", components: [
                                { tag: "td", content: "Alias:", classes: "grouping alias" }
                            ]},
                            { tag: "tr", components: [
                                { tag: "td", classes: "aliasinput", components: [
                                    { kind: 'onyx.Input', placeholder: Cirno.Sys.user.username, name: "alias" }
                                ]}
                            ]},
                            { tag: "tr", components: [
                                { tag: 'td', content: 'Message:', classes: "grouping message" }
                            ]},
                            { tag: "tr", components: [
                                { tag: 'td', classes: "messageinput", components: [
                                    { kind: 'onyx.TextArea', classes: "message", name: "message" }
                                ]},
                            ]},
                            { tag: "tr", components: [
                                { tag: 'td', classes: "sendbutton", components: [
                                    {   kind: 'Cirno.Com.Form.Button', content: "Send Message", name: "send", style:"width:70%", handlers: { ontap: "sendMessage" },
                                        sendMessage: function(){
                                            this.owner.sendMessage();
                                        }
                                    }
                                ]}
                            ]}
                        ]}
            		]},
                ]}
            ]},
            { tag: "tr", components: [
                { tag: "td", classes: "chatWindow", components: [
                    {   tag: "div",   classes: "chatWindowInner", 
                        handlers: { onresize: "resizeEvent" },
                        style: "height:"+(parseInt(window.innerHeight)-100)+"px",
                        resizeEvent: function(){
                            this.setStyle("height:"+(parseInt(window.innerHeight)-100)+"px");
                        },
                        components: [
                            { tag: "img", src:"/modules/chat/img/mascot.png", classes:"mascot" },
                    		{ tag: "table", classes:"chatList", name: "chatList", components: []}
                        ]
                    }
                ]},
                (!Cirno.Sys.mobile) ? { tag: "td", classes: "queueWindow", name:"queueTD", components: [
            		{   
            			name:"queue", 
                        classes: "queue",
                 
                        kind: onyx.Drawer, 
                        animated: false, 
                        orient: 'h',
                        open: false,
                        style: "width:0px",
                        handlers: { onresize: "resizeEvent" },
                        style: "height:"+(parseInt(window.innerHeight)-100)+"px",
                        resizeEvent: function(){
                            this.setStyle("height:"+(parseInt(window.innerHeight)-100)+"px");
                        },
                        components: [
                        	{ content: "Current Song Queue:", style:"font-weight:bold;padding-left:5px"},
                            { tag: "table", classes: "songQueueTable" }
                        ],
                        toggleQueue: function(){
                            if (this.open){
                                this.owner.$['layout2'].setStyle("width:0px");
                                this.owner.$['queueTD'].setStyle("width:0px");
                                this.setOpen(false);
                            } else {
                                this.setOpen(true);
                                this.owner.$['layout2'].setStyle("width:300px");
                                this.owner.$['queueTD'].setStyle("width:300px");
                            }
                        }
                    }
                ]} : {}
            ]}
        ]}
	],
    addMessages: function( data ){
        var currentComponents = this.$['chatList'].components;
        var newComponents = Array();
        this.$['chatList'].destroyComponents();
        for (var i = 0, len = data.length; i < len; i ++ ){
            newComponents[i] = {
                kind:"Cirno.App.Chat.Bubble",
                data: data[i]
            }
        }
        for ( var i = 0, len = currentComponents.length; i < len; i++ ){
            newComponents.push( currentComponents[i] );
        }
        this.$['chatList'].components = newComponents;
        this.$['chatList'].createComponents(newComponents);
        this.$['chatList'].render();
    },
    addMessage: function( data ){
        var currentComponents = this.$['chatList'].components;
        var newComponents = Array({
            kind:"Cirno.App.Chat.Bubble",
            data: data[0]
        });
        this.$['chatList'].destroyComponents();
        for ( var i = 0, len = currentComponents.length; i < len; i++ ){
            newComponents[i+1] = currentComponents[i];
        }
        this.$['chatList'].components = newComponents;
        this.$['chatList'].createComponents(newComponents);
        this.$['chatList'].render();
    }
})

enyo.kind({
    name: "Cirno.App.Chat.Bubble",
    tag: "tr",
    classes: "chatRow",
    now: new Date(),
    components: [
        { tag: "td", classes:"info", components:[
            {   tag: "div", classes:"user", content:"",
                rendered: function(){
                    this.setContent( (!Cirno.Sys.mobile) ? this.owner.data.chat_alias+" " : this.owner.data.chat_alias );
                }
            },
            {   tag: "div", classes:"time",
                rendered: function(){
                    var timestamp = "";
                    var date = new Date(this.owner.data.chat_date.split("T")[0].replaceAll("-","/") + " " + this.owner.data.chat_time);
                    if (    date.getDate() != this.owner.now.getDate() ||
                            date.getMonth() != this.owner.now.getMonth() ||
                            date.getFullYear() != this.owner.now.getFullYear() 
                        ){
                        timestamp += ( date.getMonth()+1 ) + "/" + date.getDate() + "/" + date.getFullYear()+" ";
                    }
                    var hours = date.getHours();
                    var minutes = date.getMinutes().toString().pad("0",2);
                    var postFix = "AM";
                    if ( hours > 11 ){
                        hours-=12;
                        postFix = "PM";
                    } 
                    if ( hours == 0 ) hours = 12;
                    timestamp += hours + ":" + minutes + " " + postFix;
                    this.setContent(timestamp);
                }
            }
        ]},
        {   tag: "td", classes: "bubbleMessage",
            components: [
            {   tag: "div", classes: "message",
                rendered: function(){
                    this.setContent(this.owner.data.chat_message);
                }
            }
        ]}
    ]
})
