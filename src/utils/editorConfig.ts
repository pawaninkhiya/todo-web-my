export const editorConfig = {
    readonly: false,
    placeholder: "Enter your KPA description here...",
    height: 400,
    minHeight: 200,
    maxHeight: 500,
    toolbarSticky: true,
    toolbarAdaptive: false,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    buttons: [
        'source', '|',
        'bold', 'italic', 'underline', 'strikethrough', '|',
        'ul', 'ol', '|',
        'outdent', 'indent', '|',
        'font', 'fontsize', 'brush', 'paragraph', '|',
        'align', '|',
        'undo', 'redo', '|',
        'link', 'image', 'table', '|',
        'hr', 'eraser', 'copyformat', 'fullsize'
    ],
    buttonsMD: [
        'bold', 'italic', 'underline', '|',
        'ul', 'ol', '|',
        'align', '|',
        'undo', 'redo', '|',
        'link', 'image'
    ],
    buttonsXS: [
        'bold', 'italic', '|',
        'ul', '|',
        'undo', 'redo'
    ],
    style: {
        fontFamily: 'inherit',
        fontSize: '14px',
        color: '#333'
    },
    colors: {
        greyscale: ['#000000', '#434343', '#666666', '#999999', '#B7B7B7', '#CCCCCC', '#D9D9D9', '#EFEFEF', '#F3F3F3', '#FFFFFF'],
        palette: [
            '#980000', '#FF0000', '#FF9900', '#FFFF00', '#00FF00', '#00FFFF', '#4A86E8', '#0000FF', '#9900FF', '#FF00FF',
            '#E6B8AF', '#F4CCCC', '#FCE5CD', '#FFF2CC', '#D9EAD3', '#D0E0E3', '#C9DAF8', '#CFE2F3', '#D9D2E9', '#EAD1DC'
        ]
    },
    uploader: {
        insertImageAsBase64URI: true
    },
    spellcheck: true,
    language: 'en',
    iframe: true,
    iframeStyle: 'html{margin:0;padding:0;min-height: 100%;}body{box-sizing:border-box;font-family:roboto;font-size:16px;line-height:1.6;padding:10px;margin:0;background:transparent;color:#333;}',
    textIcons: false,
    disablePlugins: ['paste', 'stat'],
    events: {
        afterInit: () => {
            console.log('Editor initialized');
        }
    }
};