import React, { useEffect, useState, useRef, use } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const App = ({ editorData, setEditorData, editorId}) => {

  console.log("editorData", editorId)



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
      const savedData = localStorage.getItem(editorId);
      setEditorData(savedData||{});
    };

    useEffect(() => {
      loadEditorData()
    }, [editorId])

    useEffect(() => {
      // Editor initialization code...
    
      loadEditorData(); // Load saved data
    }, []);



    return (
      <div style={{width:'100%', padding:'4px'}}>
      <CKEditor
                ref={editorRef}
                id={editorId}
                editor={ClassicEditor}
                data={editorData}
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