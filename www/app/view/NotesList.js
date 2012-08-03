/**
 * Created by JetBrains PhpStorm.
 * User: congdang
 * Date: 7/23/12
 * Time: 9:53 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define("NotesApp.view.NotesList", { // Define the NotesList class.
    extend: "Ext.Container", // It's extended from Container class.
    requires:"Ext.dataview.List", // It's required dataview list class.
    alias: "widget.noteslistview", // the alias for class, using for xtype in app.js

    config: {
        layout: {
            type: 'fit'
        },
        items: [{
            xtype: "toolbar",
            title: "My Notes",
            docked: "top",
            items: [
                {
                    xtype: "button",
                    text: 'Home',
                    ui: "back",
                    itemId: "goHomeButton"
                },
                { xtype: 'spacer' },
                {
                    xtype: "button",
                    text: 'New',
                    ui: 'action',
                    itemId: "newButton"
                }
            ]
        }, {
            xtype: "list",
            store: "Notes",
            itemId:"notesList",
            loadingText: "Loading Notes...",
            emptyText: "<div class=\"notes-list-empty-text\">No notes found.</div>",
            onItemDisclosure: true,
            grouped: true,
            itemTpl: "<div class=\"list-item-title\">{title}</div><div class=\"list-item-narrative\">{narrative}</div>"       
        }],
        listeners: [
            {
                delegate: "#newButton",
                event: "tap",
                fn: "onNewButtonTap"
            },
            {
                delegate: "#notesList",
                event: "disclose",
                fn: "onNotesListDisclose"
            },
            {
                delegate:"#goHomeButton",
                event: "tap",
                fn: "onGoHomeButtonTap"
            }
        ]
    },    
    onNewButtonTap: function () {
        console.log("newNoteCommand");
        this.fireEvent("newNoteCommand", this);
    },
    onNotesListDisclose: function (list, record, target, index, evt, options) {
        console.log("editNoteCommand");
        this.fireEvent('editNoteCommand', this, record);
    },
    onGoHomeButtonTap: function() {
        this.fireEvent("onGoToHomeCommand", this);
    }
});