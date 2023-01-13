import React from 'react';
import Split from 'react-split';
import {functions} from '../../functions'
import './App.css';
import Sidebar from '../sidebar/Sidebar';
import Editor from '../editor/Editor';

export default function App(){
    const [markdown, setMarkDown] = React.useState('To the farm we go');
    const [markdownPreview, setMarkdownPreview] = React.useState(markdown);  //filters the text for preview Component

    function handleChange (event){
        const contentEditableText = event.target.value;
        setMarkDown(contentEditableText);
        setMarkdownPreview(functions.filterText(contentEditableText));
    }

    const edit = {
        applyEdit(event){
            const currentMarkdown = markdown;
            const selection = window.getSelection();
            const selectedTextRaw = selection.toString();
            const selectedText = selectedTextRaw.trim();

            const decorator = event.currentTarget.name;
            console.log(decorator);
            // console.log(selection)

            let startMarker = '';
            let endMarker = '';

            switch (decorator){
                case 'bold':
                    startMarker = '**';
                    endMarker = '**';
                    break;
                case 'italic':
                    startMarker = '_';
                    endMarker = '_';
                    break;
                case 'strikethrough':
                    startMarker = '~~';
                    endMarker = '~~';
                    break;
                case 'insertImage':
                    startMarker = '![';
                    endMarker = '](https://p.kindpng.com/picc/s/270-2706266_kepala-nobita-png-nobita-3d-head-png-transparent.png)';
                    break;
                case 'link':
                    startMarker = '[';
                    endMarker = '](http://yourlink.com)';
                    break;
                default:
                    startMarker = '';
                    endMarker = '';
            }

            if(selectedText !== ""){
                const start = selection.anchorOffset;
                const end = selection.focusOffset - 1;

                const selectionStart = selectedText.substring(0, 2);
                const selectionEnd = selectedText.substring(selectedText.length - 2);

                const boldText = startMarker + selectedText + endMarker;
            
                const str = currentMarkdown;
                const str1 = str.substring(0, start);
                const str2 = str.substring(end + 1);

                const spaceBeforeSelection = selectedTextRaw[0] === ' ' ? ' ' : '';
                const spaceAfterSelection = selectedTextRaw[selectedTextRaw.length - 1] === ' '? ' ' : '';

                let newMarkdown = '';

                if ((selectionStart === startMarker || selectionStart[0] === startMarker) && 
                (selectionEnd === endMarker || selectionEnd[selectionEnd.length - 1] === endMarker)){
                    // alert(`Text is already ${operation}`);
                    console.log(selectionStart);
                    console.log(selectionEnd);

                    const unboldText = selectedText.replaceAll(startMarker, '');
                    console.log(unboldText);
                    newMarkdown = str1 + spaceBeforeSelection + unboldText.trim() + spaceAfterSelection + str2;
                }
                else{ 
                    newMarkdown = str1 + spaceBeforeSelection + boldText + spaceAfterSelection + str2;
                    console.log(newMarkdown);
                }

                setMarkDown(newMarkdown);
            }
            else{
                // alert(`Select something to make ${operation}`)
                return markdown;
            }
        },
    };

    return (
        <div className='app'>
            <Split
                sizes={[25, 75]}
                gutterSize={8}
                minSize={300}
                className='flex'>

                    <Sidebar/>
                    <Editor
                        markdown={markdown}
                        markdownPreview={markdownPreview}
                        handleChange={handleChange}
                        edit={edit}
                        />
            </Split>
        </div>
    )
}