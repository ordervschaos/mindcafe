import { useSession } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import { useCallback, useEffect, useId, useState } from 'react';
import { EDITOR_JS_TOOLS } from './Editor/tools'
import { supabaseClient } from '../utils/supabaseClient'
import { createReactEditorJS } from 'react-editor-js'// documentation at: https://github.com/Jungwoo-An/react-editor-js
import React from 'react';
const ReactEditorJS = createReactEditorJS()



export default function Editor({ meal,dishesList, setDishesList }) {
  var dishesListTemp = [...dishesList]
  const { session } = useSession();
  const editorCore = React.useRef(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
 
  const handleKeyPress = (event) => {
    if (( event.metaKey || event.ctrlKey) && event.key === 'Enter') {
      event.preventDefault()
      saveReview()
    }

  };

  useEffect(() => {
    // attach the event listener
    document.addEventListener('keydown', handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  
  const handleInitialize = React.useCallback((instance) => {
    editorCore.current = instance
  }, [])

  const saveReview = React.useCallback(async () => {
    const savedData = await editorCore.current.save();
    if (savedData.blocks.length == 0) {
      return
    } else {
      //update the data in supabase
      const supabase_client = await supabaseClient(session)
      var newDish:any={content: JSON.stringify(savedData), owner_id: session.user.id, meal_id: meal.id}
      var dishResponse=await supabase_client
        .from("dish")
        .insert([newDish]);
        newDish=dishResponse.data[0]
      

      editorCore.current.clear()


      dishesListTemp.push(newDish)
      setShowSuccessMessage(true)

      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 2000);
      await setDishesList([...dishesListTemp])
      //todo: show a success message

    }


  }, [session, meal.id])






  return (
    <div >
      <div className="border p-2 border-round mb-3">
        <ReactEditorJS defaultValue={{}} onInitialize={handleInitialize} autofocus={false} tools={EDITOR_JS_TOOLS} placeholder="Create a new dish...." />
      </div>

      <div className="flex justify-end">

        <button onClick={saveReview}
          type="button"
          className="px-6 inline-flex  text-center items-center rounded border border-transparent bg-gray-900 px-2.5 py-1.5 text-xl font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Dish <span className="ml-2  text-xs text-gray-400">
            {/* Command + enter */}
            ⌘ + ⏎
          </span>
        </button>
      </div>
      {showSuccessMessage && 
      <div className="flex justify-end">
        <div className="text-green-500 mt-2 transition-delay: 500ms">
          <p>Added dish to the end of the list.</p>
        </div>
      </div>
      } 

    </div>
  )
}
// 