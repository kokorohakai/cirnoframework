enyo.kind({
    name: "Cirno.App.Browse",
    create: function(){
        this.inherited(arguments);

    },
    
    components:[
        { tag: "table", classes:"layout", components:[
    		{ tag: "thead", classes:"toolbar", components:[
    			{ tag: "th", classes:"bandname", components:[
    				{ 	kind: onyx.Input, name:"bandName", placeholder: "Band Name / Artist", handlers: { onchange: "updateList", onkeydown: "keypress" },
    					timeout: 0,
    					keypress: function( sender, e ){
    						clearTimeout(this.timeout);
    						var self = this;
    						this.timeout = setTimeout( function(){
    							self.updateList();
    						}, 2000 );
    					},
    					updateList: function(){
    						clearTimeout(this.timeout);
    						this.owner.$.list.requestUpdate();
    					} 
    				}
    			]},
    			{tag: "th", classes: "songname", components: [
    				{ 	kind: onyx.Input, name:"songName", placeholder: "Song Name", handlers: { onchange: "updateList", onkeydown: "keypress"  },
    					timeout: 0,
    					keypress: function( sender, e ){
    						clearTimeout(this.timeout);
    						var self = this;
    						this.timeout = setTimeout( function(){
    							self.updateList();
    						}, 2000 );
    					},
    					updateList: function(){
    						clearTimeout(this.timeout);
    						this.owner.$.list.requestUpdate();
    					} 
    				}
    			]},
    			{ tag: "th", classes: "action", content: "Action" }
    		]},
     		{ kind: "Cirno.App.Browse.List" }
        ]}
    ]
});

enyo.kind({
    tag: "tr",
    start: 0,
    count: 0,
    visSize: 32,
    create: function(){
        this.inherited(arguments);
        var self = this;
        cirno.$['messaging'].listenMessage("listCount", function(data){
            self.updateListSize( data );
        },function(){
			self.requestUpdate();
        })
        cirno.$['messaging'].listenMessage("listSongs", function(data){
            self.updateListSongs( data );
        })
    },
    requestUpdate: function(){
		cirno.$['messaging'].sendMessage("getCount", {
            bandName: this.owner.$.bandName.getValue(),
            songName: this.owner.$.songName.getValue(),
            sortByBand: this.sortByBand
        });
    },
    updateListSongs: function(data){
        console.log(data);
    },
    getSongs: function(){
        var winHeight = window.innerHeight;
        var visHeight = winHeight + window.scrollY;
        var visible = parseInt(visHeight / this.visSize);
        var limit = visible - this.start;
        console.log(visHeight);
        cirno.$['messaging'].sendMessage("getSongs", {
            start: this.start,
            limit: limit,
            bandName: this.owner.$.bandName.getValue(),
            songName: this.owner.$.songName.getValue(),
            sortByBand: this.sortByBand
        });
        console.log( this.start, limit, this.count);
        this.start = limit;
    },
    windowScroll: function( e ){
        console.log(e);
        this.getSongs();
    },
    updateListSize: function( data ){
        this.start = 0;
        this.count = parseInt(data[0]['_count']);
        var size = this.count * this.visSize;
        this.$['bandnames'].setStyle("height:"+size+"px;");
        this.$['songnames'].setStyle("height:"+size+"px;");
        this.$['actions'].setStyle("height:"+size+"px;");
        this.getSongs();
        /*var comps = [];
        this.destroyComponents();
        var len = parseInt(data[0]['_count'])
        //var len = 65536;
        console.log(data, len);
        for ( var i = 0; i < len; i++ ){
            comps.push({
                kind: "Cirno.App.Browse.List.Row",
                data: data[i],
                index: i
            });
        }
        this.data = data;
        this.createComponents(comps);
        this.render();*/
    },
    name:"Cirno.App.Browse.List",
    sortByBand: true,
    data: {},
    currentSong: 0,
    count: 0,
    classes: "listsection",
    tag:"tbody",
    components:[
        {kind: "Signals",  onWindowScroll: "windowScroll"},
        {tag: "td", name: "bandnames" },
        {tag: "td", name: "songnames" },
        {tag: "td", name: "actions" }
    ]
})

enyo.kind({
    name: "Cirno.App.Browse.List.Row",
    tag: "tr",
    data: [],
    index: -1,
    components: [
        { tag: "td", classes: "bandname", components: [
            { content: "bandname", classes:"innerbody", name: "bandname", allowHtml: true }
        ]},
        { tag: "td", classes: "songname", components: [
            { content: "<b>test</b>", classes:"innerbody", name: "songname", allowHtml:true }
        ]},
        { tag: "td", classes: "action", content: "action", name: "action" },
    ],
    rendered: function(){
        this.$['songname'].setContent( (this.data.karaoke_library_song_name) ? this.data.karaoke_library_song_name : "<i>(Unknown)</i>" );
        this.$['bandname'].setContent( (this.data.karaoke_library_band_name) ? this.data.karaoke_library_band_name : "<i>(Unknown)</i>" );
    }
});