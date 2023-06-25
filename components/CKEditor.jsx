import React, { useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const App = ({ editorData, setEditorData}) => {

  const editorRef = useRef(null);
    const onReady = (editor) => {
        // You can store the "editor" and use it when needed.
        console.log('Editor is ready to use!', editor);
    };

    const onChange = (event, editor) => {
        const data = editor.getData();
        setEditorData(data)

    };

    const onBlur = (event, editor) => {
        console.log('Blur.', editor);
    };

    const onFocus = (event, editor) => {
        console.log('Focus.', editor);
    };



    return (
      <div style={{ height: '400px' }}>
      <CKEditor
                ref={editorRef}
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