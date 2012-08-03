/**
 * Created by JetBrains PhpStorm.
 * User: congdang
 * Date: 7/21/12
 * Time: 5:40 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.application({
    name: "NotesApp", // the application name. this would be global variable (see the calling in index.html)

    models: ["Note"], // the model of application, It auto refer to model/Notes.js file.
    stores: ["Notes"], // The store of application, It auto refer to store/Notes.js file.
    controllers: ["Notes"], // the controller of application, It auto refer to controller/Notes.js file.
    views: ["Home", "NotesList", "NoteEditor", "Gallery"], // the views of application, It auto rever to /view/Home.js, ..

    /**
     * The main function, It should be ran on init.
     */
    launch: function () {
        var _this = this;
        this.launched = true;
        // load phonegap stuff
        document.addEventListener("deviceready", function () {
            _this.mainLaunch();
        } , true);

    },

    mainLaunch: function() {
        if (!device || !this.launched) {return;}
//        console.log(navigator.network.connection.type);
//
//        if (navigator.network.connection.type == "unknown") {
//            Ext.Msg.alert("No internet connection - we won't be able to show you any maps");
//            navigator.notification.beep(2);
//        }


        // Defines all of view, using sencha xtype(refer to alias in view class).
        var homeScreenView = {
            xtype: "homescreenview"
        };

        var notesListView = {
            xtype: "noteslistview"
        };

        var noteEditorView = {
            xtype: "noteeditorview"
        };

        var galleryView = {
            xtype: "galleryview"
        };

        // Added all view to Viewport,
        // NOTE: by order.
        Ext.Viewport.add([homeScreenView,notesListView,noteEditorView, galleryView]);
    }
});
