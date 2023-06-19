import { useSession } from "@clerk/nextjs";
import { useEffect, useState } from 'react';
import { EDITOR_JS_TOOLS } from './editor/tools'
import { supabaseClient } from 'utils/supabaseClient'
import { createReactEditorJS } from 'react-editor-js'// documentation at: https://github.com/Jungwoo-An/react-editor-js
import { useRef, useCallback } from 'react';
const ReactEditorJS = createReactEditorJS()



export default function CreateDishEditor({ meal, dish_id }) {
  const { session } = useSession();
  const editorCore = useRef(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const [dishId, setDishId] = useState(dish_id)

  const handleKeyPress = (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
      event.preventDefault()
      saveDish()
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

  const populateEditor = async () => {
    const supabase_client = await supabaseClient(session)
    var dishResponse = await supabase_client
      .from("dish")
      .select("*")
      .eq("id", dish_id)
      .single();
    var dish = dishResponse.data
    if (dish) {
      var dish_content = JSON.parse(dish.content)
      editorCore.current.render(dish_content)
    }
  }


  const createNewDish = async () => {
    const supabase_client = await supabaseClient(session)
    var dishResponse = await supabase_client
      .from("dish")
      .insert([
        { owner_id: session.user.id, meal_id: meal.id },
      ]);
    var dish = dishResponse.data[0]
    setDishId(dish.id)


  }

  const saveDish = useCallback(async () => {
    const savedData = await editorCore.current.save();
    if (savedData.blocks.length == 0) {
      return
    } else {
      const supabase_client = await supabaseClient(session)
      await supabase_client
        .from("dish")
        .update({ content: JSON.stringify(savedData), owner_id: session.user.id }).match({ id: dishId });
      setShowSuccessMessage(true)

      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 2000);
    }


  }, [session, meal.id])

  useEffect(() => {
    // populate the editor with the dish content
    if (!dishId)
      createNewDish()
    populateEditor()
  }, [session, dishId])


  const handleInitialize = useCallback((instance) => {
    editorCore.current = instance
  }, [])








  return (
    <div >
      <div className="border p-2 border-round mb-3">
        <ReactEditorJS defaultValue={{
          blocks: []
        }} onInitialize={handleInitialize} autofocus={false} tools={EDITOR_JS_TOOLS} placeholder="Create a new dish...." />
      </div>

      <div className="flex justify-end">

        <button onClick={saveDish}
          type="button"
          className="px-6 inline-flex  text-center items-center rounded border border-transparent bg-gray-900 px-2.5 py-1.5 text-xl font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Save Dish <span className="ml-2  text-xs text-gray-400">
            {/* Command + enter */}
            ⌘ + ⏎
          </span>
        </button>
      </div>
      {showSuccessMessage &&
        <div className="flex justify-end">
          <div className="text-green-500 mt-2 transition-delay: 500ms">
            <p>Dish saved</p>
          </div>
        </div>
      }

    </div>
  )
}
// 