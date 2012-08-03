Ext.define("NotesApp.view.Home", {
    extend: "Ext.Container",
    alias: "widget.homescreenview",

    config: {

        layout: {
            type: 'fit'
        },

        items: [

            {
                xtype: "tabpanel",

                tabBarPosition: 'bottom',
                items: [
                    {
                        title: 'Home',
                        iconCls: 'home',
                        scrollable: 'vertical',
                        cls: 'home',
                        html: [
                            '<div style="text-align: center; font-size: 13px;">',
                            '<img id="logo" src="res/imgs/notes.png" />',
                            '<h1>Welcome to Personal Note Application</h1>',
                            "<p>Using Sencha Touch 2 framework</p>",
                            '<h3>Create by congdang</h3>',
                            '</div>'
                        ].join(""),
                        items: [
                            {
                                xtype: "toolbar",
                                docked: "top",
                                title: "Control Time",
                                items: [
                                    {
                                        xtype: "button",
                                        text: 'Gallery',
                                        ui: 'action',
                                        itemId: "galleryButton"
                                    },

                                    { xtype: "spacer" },
                                    {
                                        xtype: "button",
                                        ui: "forward",
                                        text: "Notes",
                                        itemId: "viewListButton"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        title: 'Contact',
                        scrollable: 'vertical',
                        iconCls: 'user',
                        itemId: "user",
                        html: ['<div style="text-align: center; font-size: 13px;">',
                                    '<img id="logo" src="res/imgs/notes.png" />',
                                    '<h1>Feel free to contact me</h1>',
                                    "<p>Yahoo: congdang_it</p>",
                                    "<p>Skype: congdang.asnet</p>",
                                    "<p>Email: <a href='mailto:congdang@asnet.com.vn'>congdang@asnet.com.vn</a></p>",
                                    '</div>'
                               ].join("")
                    }
                ]

            }
        ],
        listeners: [
            {
                delegate: "#viewListButton",
                event: "tap",
                fn: "onViewListButtonTap"
            },
            {
                delegate:"#galleryButton",
                event: "tap",
                fn: "onGalleryButtonTap"
            }
        ]
    },
    onViewListButtonTap: function() {
        console.log("onViewListCommand");
        this.fireEvent("onViewListCommand", this);
    },
    onGalleryButtonTap: function() {
        this.fireEvent("showGalleryCommand", this);
    }
});