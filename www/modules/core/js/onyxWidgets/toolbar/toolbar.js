Cirno.MenuItems = [
    { kind:"Cirno.Com.Link", url:"/home",   content: "Home" },
    { kind:"Cirno.Com.Link", url:"/browse", content: "Browse Songs" },
    { kind:"Cirno.Com.Link", url:"/sing",   content: "Sing" },
    { kind:"Cirno.Com.Link", url:"/chat",   content: "Chat" },
    { kind:"Cirno.Com.Link", url:"/dj",     content: "DJ Player" },
    { kind:"Cirno.Com.Link", url:"/admin",  content: "Admin Panel" },
    { kind:"Cirno.Com.Link", url:"/login",  content: "Login" }
]

enyo.kind({
    name: "Cirno.Com.Toolbar",
    classes: "cirnoToolbar",
    components: [
        {   kind: onyx.Toolbar, components: [
            {   content: "Cirno Karaoke Machine" },
            (Cirno.mobile) ? {   
                tag:"img", 
                src:"/modules/core/img/menu.png", 
                handlers: { ontap: "toggleDrawer" },
                style:"float:right",
                toggleDrawer: function(){
                    if (this.owner.$.cirnoDrawer.open){
                        this.owner.$.cirnoDrawer.setOpen(false);
                    } else {
                        this.owner.$.cirnoDrawer.setOpen(true);
                    }
                }
            } : {
                style:"float:right",
                components: Cirno.MenuItems
            }
        ]},
        {   name:"cirnoDrawer", 
            classes: "cirnoDrawer",
            kind: onyx.Drawer, 
            animated: true, 
            open: false,
            components: Cirno.MenuItems
        }
    ]
})