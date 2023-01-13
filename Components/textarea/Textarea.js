import React from 'react';
import './Textarea.css';
import ContentEditable from 'react-contenteditable';

export default function Textarea (props){
    const inputRef = React.useRef('');

    React.useEffect(() => {
        console.log(inputRef.current)
    })

    return(
        <div className='Textarea'>
           
            <ContentEditable
                autoFocus
                ref={inputRef}
                tagName='div'
                html={props.markdown}
                onChange={props.handleChange}
                onInput={()=>{inputRef.current.focus()}}
                className='text-area'
            />
        </div>
    )
}