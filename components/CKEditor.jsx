import React, { useEffect, useState, useRef, use } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const App = ({ editorData, setEditorData, editorId}) => {

  const savedData = localStorage.getItem(editorId)
  const initData = savedData ? savedData : editorData



  const editorRef = useRef(null);
    const onReady = (editor) => {
        // You can store the "editor" and use it when needed.
        console.log('Editor is ready to use!', editor);
    };

    const onChange = (event, editor) => {
        const data = editor.getData();
        setEditorData(data)
        localStorage.setItem(editorId, data);
    };

    const onBlur = (event, editor) => {
        console.log('Blur.', editor);
    };

    const onFocus = (event, editor) => {
        console.log('Focus.', editor);
    };

    const loadEditorData = () => {
        setEditorData(initData);
    };

    useEffect(() => {
      loadEditorData()
    }, [editorId])

    useEffect(() => {
      // Editor initialization code...    
      loadEditorData(); // Load saved data
    }, []);







    return (
      <div style={{width:'100%', padding:'4px'}} className='drop-shadow'>
      <CKEditor
                ref={editorRef}
                id={editorId}
                editor={ClassicEditor}
                data={initData}
                onReady={onReady}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                config={{
                  height: '100%',
                }}
            />
        </div>
    );
};

export default App;