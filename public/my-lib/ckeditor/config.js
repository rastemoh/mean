/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	config.language = 'en';
	// config.uiColor = '#AADC6E';
    config.toolbar_Default = [
        { name: 'styles', items: [ 'Styles', 'Format', 'FontSize', 'Font'] },
        { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote'
            , '-', 'JustifyRight', 'JustifyCenter', 'JustifyLeft', 'JustifyBlock', 'BidiRtl', 'BidiLtr' ] },
        '/',
        { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Strike', '-', 'RemoveFormat' ] },
        { name: 'color', items: [ 'TextColor', 'BGColor' ]},
        { name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
        { name: 'insert', items: [ 'Image', 'Table', 'HorizontalRule'] },
        { name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
        { name: 'tools', items: [ 'Maximize' ] },
        { name: 'document', items: [ 'Source' ] }
    ];

    config.toolbar = 'Default';

    config.font_names = 'Arial/Arial, Helvetica, sans-serif;' +
        'Comic Sans MS/Comic Sans MS, cursive;' +
        'Courier New/Courier New, Courier, monospace;' +
        'Georgia/Georgia, serif;' +
        'Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;' +
        'Tahoma/Tahoma, Geneva, sans-serif;' +
        'Times New Roman/Times New Roman, Times, serif;' +
        'Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;' +
        'Verdana/Verdana, Geneva, sans-serif;' +
        'Iran Sans/IRANSans';
};
