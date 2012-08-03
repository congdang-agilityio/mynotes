/**
 * Created by JetBrains PhpStorm.
 * User: congdang
 * Date: 7/23/12
 * Time: 9:53 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define("NotesApp.view.NoteEditor", {
    extend: "Ext.form.Panel",
    requires: "Ext.form.FieldSet",
    alias: "widget.noteeditorview",
    config: {
        scrollable: 'vertical',
        items: [
            {
                xtype: "toolbar",
                docked: "top",
                title: "Edit Note",
                items: [
                    {
                        xtype: "button",
                        ui: "back",
                        text: "List",
                        itemId: "backButton"
                    },
                    { xtype: "spacer" },
                    {
                        xtype: "button",
                        ui: "action",
                        text: "Save",
                        itemId: "saveButton"
                    }
                ]
            },
            {
                xtype: "toolbar",
                docked: "bottom",
                items: [
                    {
                        xtype: "button",
                        iconCls: "trash",
                        iconMask: true,
                        itemId: "deleteButton"
                    }
                ]
            },
            { xtype: "fieldset",
                items: [
                    {
                        xtype: 'textfield',
                        name: 'title',
                        label: 'Title',
                        required: true
                    },
                    {
                        xtype: 'textareafield',
                        name: 'narrative',
                        label: 'Narrative'
                    },
                    {
                        xtype: 'datepickerfield',
                        name: 'dateCreated',
                        label: 'Start Date',
                        value: new Date()
                    }
                ]
            }

        ],
        listeners: [
            {
                delegate: "#backButton",
                event: "tap",
                fn: "onBackButtonTap"
            },
            {
                delegate: "#saveButton",
                event: "tap",
                fn: "onSaveButtonTap"
            },
            {
                delegate: "#deleteButton",
                event: "tap",
                fn: "onDeleteButtonTap"
            }
        ]
    },
    onSaveButtonTap: function () {
        console.log("saveNoteCommand");
        this.fireEvent("saveNoteCommand", this);
    },
    onDeleteButtonTap: function () {
        var _this = this;
        console.log("deleteNoteCommand");
        Ext.Msg.confirm("Confirmation", "Are you sure you want to delete note?", function() {
            _this.fireEvent("deleteNoteCommand", _this);
        });

    },
    onBackButtonTap: function () {
        console.log("backToHomeCommand");
        this.fireEvent("backToHomeCommand", this);
    }

});

