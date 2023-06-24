import React, { useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const App = ({saveDish}) => {
  const editorRef = useRef(null);
    const onReady = (editor) => {
        // You can store the "editor" and use it when needed.
        console.log('Editor is ready to use!', editor);
    };

    const onChange = (event, editor) => {
        // const data = editor.getData();
        // localStorage.setItem('editorContent', data);

        // console.log({ event, editor, data });
    };

    const onBlur = (event, editor) => {
        console.log('Blur.', editor);
    };

    const onFocus = (event, editor) => {
        console.log('Focus.', editor);
    };

   
    useEffect(() => {
      const interval = setInterval(() => {
        
        saveDish(editorRef.current.editor.getData())
      }, 5000);
      return () => clearInterval(interval);
    }, [saveDish]);

    return (
        <div className="App">
            <CKEditor
                ref={editorRef}
                editor={ClassicEditor}
                data="<p>Hello from CKEditor 5!</p>"
                onReady={onReady}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
            />
        </div>
    );
};

export default App;