/**
 * Created by JetBrains PhpStorm.
 * User: congdang
 * Date: 7/23/12
 * Time: 9:53 AM
 * To change this template use File | Settings | File Templates.
 */
function getItems() {
    var items = [];
//    console.log(window.localStorage.getItem("gallery_imgs"));
//    if (window.localStorage.getItem("gallery_imgs") != null) {
//        return JSON.parse(window.localStorage.getItem("gallery_imgs"));
//    }
    for (var j = 1; j <= 10; j++) {
        items.push({
            xtype: 'image',
            cls: 'my-carousel-item-img',
            src: 'res/photos/Food/'  + j + '.jpg'
        });
    }
    return items;
}

Ext.define("NotesApp.view.Gallery", {
    extend: "Ext.Container",
    alias: "widget.galleryview",

    config:{
        fullscreen: true,
        layout:'vbox',
        items: [
            {
                xtype: "toolbar",
                docked: "top",
                title: "Gallery",
                items: [
                    {
                        xtype: "button",
                        ui: "back",
                        text: "Home",
                        itemId: "backButton"
                    },
                    { xtype: "spacer" },
                    {
                        xtype: "button",
//                        ui: "forward",
                        text: "Take Photo",
                        itemId: "takePhotoButton"
                    }

                ]
            },
            {
                xtype: 'carousel',
                indicator: false, // hide indicator.
                flex:1,
                items: getItems()
            }
        ],
        listeners: [
            {
                delegate: "#backButton",
                event: "tap",
                fn: "onBackButtonTap"
            },
            {
                delegate: "#takePhotoButton",
                event: "tap",
                fn: "onTakePhotoButtonTap"
            }
        ]

    },

    onBackButtonTap: function () {
        console.log("backToHomeCommand");
        this.fireEvent("backToHomeCommand", this);
    },

    onTakePhotoButtonTap: function () {
        console.log("takePhotoButtonCommand");
        this.fireEvent("takePhotoButtonCommand", this);
    }

});

