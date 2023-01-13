export const functions = { 

    getSelectedText(){
        const selection = window.getSelection().toString();
        console.log(selection);
        return selection;
    },
    
    filterText(text){
        const htmlTags = /<\/?[a-z][^>]*>/ig; //regExp for finding html tags
        const content = text.replaceAll('&nbsp;', ' ');
        const htmlTagIndex = content.indexOf('<');

        const textBeforeTags = content.substring(0, htmlTagIndex); //text before first html tag
        const textWithTags = content.substring(htmlTagIndex); //text from first html tag
        const textWithoutTags = textWithTags.replace(htmlTags, '\n\n');

        // console.log(textBeforeTags);
        // console.log(textWithTags);
        // console.log(textWithoutTags);

        const previewText = textBeforeTags + '\n\n' + textWithoutTags;

        return previewText;
    }
};
