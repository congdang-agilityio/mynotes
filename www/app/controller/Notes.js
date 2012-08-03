/**
 * Created by JetBrains PhpStorm.
 * User: congdang
 * Date: 7/23/12
 * Time: 9:53 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define("NotesApp.controller.Notes", {

    extend: "Ext.app.Controller",
    config: {
        refs: {
            // We're going to lookup our views by xtype.
            homeScreenView: "homescreenview", // Auto generate the function getHomeScreenView() in this scope
            notesListView: "noteslistview",
            noteEditorView: "noteeditorview",

            notesList: "#notesList",
            galleryView: "galleryview"
        },
        //  Define the control for each views.
        control: {
            // Actions in home view
            homeScreenView: {
                onViewListCommand: "onViewListCommand",
                showGalleryCommand: "onShowGalleryCommand"
            },
            // Action in notes list view.
            notesListView: {
                // The commands fired by the notes list container.
                newNoteCommand: "onNewNoteCommand",
                editNoteCommand: "onEditNoteCommand",
                onGoToHomeCommand: "onGoToHomeCommand"

            },
            // Action in note editor view.
            noteEditorView: {
                // The commands fired by the note editor.
                saveNoteCommand: "onSaveNoteCommand",
                deleteNoteCommand: "onDeleteNoteCommand",
                backToHomeCommand: "onBackToHomeCommand"
            },
            // action in gallery view.
            galleryView: {
                backToHomeCommand: "onGoToHomeCommand",
                takePhotoButtonCommand: "onTakePhotoButtonCommand"

            }

        }
    },

    // Transitions
    // TODO: Research more type of transitions.
    slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },
    fadeTransition: { type: 'fade' },

    // Helper functions
    // Random the id of notes.
    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // activate note editor view.
    activateNoteEditor: function (record) {
        var noteEditorView = this.getNoteEditorView(); // this function had been generated when adding view to refs
        noteEditorView.setRecord(record); // load() is deprecated.
        Ext.Viewport.animateActiveItem(noteEditorView, this.slideLeftTransition);
    },

    // activate notes list view.
    activateNotesList: function () {
        Ext.Viewport.animateActiveItem(this.getNotesListView(), this.slideRightTransition);
    },

    // Commands.

    // handle go home button tap
    onGoToHomeCommand: function() {
        Ext.Viewport.animateActiveItem(this.getHomeScreenView(), this.slideLeftTransition);
    },

    // handle take a photo
    onTakePhotoButtonCommand: function() {
        var _this = this;
        navigator.camera.getPicture(onSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.FILE_URI  });

        function onSuccess(imageURI) {

            var imgs = window.localStorage.getItem("gallery_imgs") == null ? [] : JSON.parse(window.localStorage.getItem("gallery_imgs"));
            imgs.push({
                xtype: 'image',
                cls: 'my-carousel-item-img',
                src: imageURI
            });
            window.localStorage.setItem("gallery_imgs", JSON.stringify(imgs));
//            _this.getMyCarousel().doLayout();
//            Ext.Viewport.animateActiveItem(_this.getGalleryView(), _this.fadeTransition);
        }

        function onFail(message) {
            navigator.notification.alert('Failed because: ' + message);
        }
    },

    // Handle go to list notes button tap
    onViewListCommand: function() {
        Ext.Viewport.animateActiveItem(this.getNotesListView(), this.slideRightTransition);
    },

    // Handle show gallery button tap
    onShowGalleryCommand: function() {
        Ext.Viewport.animateActiveItem(this.getGalleryView(), this.fadeTransition);
    },

    // Handle New button tap.
    onNewNoteCommand: function () {
        console.log("onNewNoteCommand");

        var now = new Date();
        var noteId = (now.getTime()).toString() + (this.getRandomInt(0, 100)).toString();

        // Create a new note model
        var newNote = Ext.create("NotesApp.model.Note", {
            id: noteId,
            dateCreated: now,
            title: "",
            narrative: ""
        });

        // View the Note editor with new note.
        this.activateNoteEditor(newNote);
    },

    // Handler View detail button tap.
    // NOTE: view detail and edit here.
    onEditNoteCommand: function (list, record) {
        console.log("onEditNoteCommand");
        this.activateNoteEditor(record);
    },

    // Handel Save button tap.
    onSaveNoteCommand: function () {
        console.log("onSaveNoteCommand");

        // get Editor view
        var noteEditorView = this.getNoteEditorView();
        // get current data on view.
        var currentNote = noteEditorView.getRecord();
        // get new data, just set on view.
        var newValues = noteEditorView.getValues();

        // Update the current note's fields with form values.
        currentNote.set("title", newValues.title);
        currentNote.set("narrative", newValues.narrative);
        currentNote.set("dateCreated", newValues.dateCreated);

        // go to validate before saving.
        var errors = currentNote.validate();

        if (!errors.isValid()) {
            Ext.Msg.alert('Wait!', errors.getByField("title")[0].getMessage(), Ext.emptyFn);
            currentNote.reject();
            return;
        }

        // get data from localstorage.
        var notesStore = Ext.getStore("Notes");

        // check existed, if not --> adding new.
        if (null == notesStore.findRecord('id', currentNote.data.id)) {
            notesStore.add(currentNote);
        }

        // Sync to localstorage
        notesStore.sync();

        // sorting result.
        notesStore.sort([{ property: 'dateCreated', direction: 'DESC'}]);

        // show the list view.
        this.activateNotesList();
    },

    // Handler the Delete buton tap.
    onDeleteNoteCommand: function () {
        console.log("onDeleteNoteCommand");


        // get the editor view.
        var noteEditorView = this.getNoteEditorView();
        // get the current data on view.
        var currentNote = noteEditorView.getRecord();

        // get data from local storage.
        var notesStore = Ext.getStore("Notes");

        // remove data
        notesStore.remove(currentNote);
        // Syncing localstorage after remove data.
        notesStore.sync();

        // Show the list view.
        this.activateNotesList();
    },

    // Handle back button tap.
    onBackToHomeCommand: function () {
        console.log("onBackToHomeCommand");
        this.activateNotesList();
    },

    // Base Class functions.
    // 2 function run onload
    launch: function () {
        this.callParent(arguments);
        var notesStore = Ext.getStore("Notes");
        notesStore.load();
        var imgsStore = Ext.getStore("Imgs");
        imgsStore.load();
        console.log("launch");
    },
    init: function () {
        this.callParent(arguments);
        console.log("init");
    }
});