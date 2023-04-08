import { useSession } from "@clerk/nextjs";
import { useEffect, useState } from 'react';
import { EDITOR_JS_TOOLS } from '../Editor/tools'
import { supabaseClient } from '../../utils/supabaseClient'
import { createReactEditorJS } from 'react-editor-js'// documentation at: https://github.com/Jungwoo-An/react-editor-js
import {useRef,useCallback} from 'react';
const ReactEditorJS = createReactEditorJS()



export default function Editor({ meal,dishesList, setDishesList }) {
  var dishesListTemp = [...dishesList]
  const { session } = useSession();
  const editorCore = useRef(null)
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

  
  const handleInitialize = useCallback((instance) => {
    editorCore.current = instance
  }, [])

  const saveReview = useCallback(async () => {
    const savedData = await editorCore.current.save();
    if (savedData.blocks.length == 0) {
      return
    } else {
      console.log(savedData)

      
      // update the data in supabase
      var newDishes = []
      var first_index=0
      var last_index=0
      var regex
      // regex = /highlight\s|\sLocation/ //kindle
      // regex = /[0-9]+\./ // 1. 2. 3.
      var includeRegexLine=false
      var isRegexLineAtStartOrEnd='start' 
      if(regex)
        savedData.blocks.forEach((block, index) => {
           
        if(isRegexLineAtStartOrEnd=="end"){
          if(block.data.text.match(regex) || index==savedData.blocks.length-1)
            {
              console.log("index",index)
              last_index=index
              if(index==savedData.blocks.length-1 || includeRegexLine)
              {
                last_index=index+1
              }
              var blocks_of_dish = savedData.blocks.slice(first_index,last_index)
              newDishes.push({
                content: JSON.stringify({
                  blocks:blocks_of_dish,
                  time: savedData.time,
                  version: savedData.version
                }), 
                owner_id: session.user.id, meal_id: meal.id
              })
              first_index=index+1
          }
        }else{
          if(block.data.text.match(regex) || index==savedData.blocks.length-1)
            {
              console.log("index",index)
              console.log("text",block.data.text)
              
              last_index=index
              if(index==savedData.blocks.length-1)
              {
                last_index=index+1
              }
              console.log("first_index",first_index)
              console.log("last_index",last_index)

              var blocks_of_dish = savedData.blocks.slice(first_index,last_index)
              console.log("blocks: ",blocks_of_dish)
              newDishes.push({
                content: JSON.stringify({
                  blocks:blocks_of_dish,
                  time: savedData.time,
                  version: savedData.version
                }), 
                owner_id: session.user.id, meal_id: meal.id
              })
              
              first_index=index
          }
        }
        })
      else
        newDishes.push({content: JSON.stringify(savedData), owner_id: session.user.id, meal_id: meal.id})
      const supabase_client = await supabaseClient(session)
      var newDish:any={content: JSON.stringify(savedData), owner_id: session.user.id, meal_id: meal.id}
      var dishResponse=await supabase_client
        .from("dish")
        .insert(newDishes);
      newDishes=dishResponse.data
       

      editorCore.current.clear()



      dishesListTemp=[...newDishes,...dishesListTemp]
      setShowSuccessMessage(true)

      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 2000);
      await setDishesList([...dishesListTemp])

    }


  }, [session, meal.id])






  return (
    <div >
      <div className="border p-2 border-round mb-3">
        <ReactEditorJS  defaultValue={{
          blocks:[]
        }} onInitialize={handleInitialize} autofocus={false} tools={EDITOR_JS_TOOLS} placeholder="Create a new dish...." />
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