Cirno.MenuItems = [
    { kind:"Cirno.Com.Link", url:"/home",   content: (Cirno.Sys.user.isLoggedIn()) ? "Home" : "Home / Login" },
    (Cirno.Sys.mobile) ? { kind:"Cirno.Com.Link", url:"/home/instructions",   content: "Instructions" } : {},
    { kind:"Cirno.Com.Link", url:"/browse", content: "Browse Songs" },
    (Cirno.Sys.user.hasPermission("user")) ? { kind:"Cirno.Com.Link", url:"/sing",   content: "Sing" } : {},
    (Cirno.Sys.user.hasPermission("user")) ? { kind:"Cirno.Com.Link", url:"/chat",   content: "Chat" } : {},
    (Cirno.Sys.user.hasPermission("dj")) ? { kind:"Cirno.Com.Link", url:"/dj",     content: "DJ Player" } : {},
    (Cirno.Sys.user.hasPermission("admin")) ? { kind:"Cirno.Com.Link", url:"/admin",  content: "Admin Panel" } : {},
    (Cirno.Sys.user.isLoggedIn()) ? { tag:"div", classes: "cirnoLink", content: "Logout", tap: function(sender, e){ 
            cirno.$.loginManager.logout();
        } 
    } : {}
]

enyo.kind({
    name: "Cirno.Com.Toolbar",
    classes: "cirnoToolbar",
    components: [
        {   kind: onyx.Toolbar, components: [
            {   content: "Cirno Karaoke Machine" },
            (Cirno.Sys.mobile) ? {   
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
