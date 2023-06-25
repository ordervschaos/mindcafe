
import { useState } from 'react'
import { useSession } from "@clerk/nextjs";



import { supabaseClient } from 'utils/supabaseClient'

import { useCallback } from 'react';

import CKEditor from 'components/CKEditor';




// 

export default function ResponseCatcher({ dish, onSave }) {
  const { session } = useSession();
  const [editorData, setEditorData] = useState(null)

  const [showEditor, setShowEditor] = useState(dish.accepts_responses)
  const [displayResponse, setDisplayResponse] = useState(false)

  const [response, setResponse] = useState(null)


  const saveResponse = useCallback(async (editorData) => {
    if (!editorData)
      return
    const supabase_client = await supabaseClient(session)

    if (response) {
      var responseUpdated = await supabase_client
        .from("response")
        .update({ content: editorData }).match({ id: response.id });

      setResponse(responseUpdated.data[0])
    } else {

      var responseCreated = await supabase_client
        .from("response")
        .insert([
          { owner_id: session.user.id, dish_id: dish.id, content: editorData },
        ]);

      console.log("responseCreated", responseCreated)

      setResponse(responseCreated.data[0])
    }




  }, [session, dish.id])




  const handleClickOnDisplayedResponse = () => {
    setEditorData(response.content)
    setShowEditor(true)
    setDisplayResponse(false)
  }



  async function handleSave() {
    saveResponse(editorData)
    setShowEditor(false)
    setDisplayResponse(true)

  }

  return (
    <div>

      {dish && showEditor &&
        <div className='flex flex-col'>
          <div className="">
            <div className=''>
              <CKEditor id={dish.id} editorData={editorData} setEditorData={setEditorData} />
            </div>
          </div>
          <div className="meal_controls flex justify-end">
            <button onClick={handleSave}
              type="button"
              className="px-3 inline-flex   text-center items-center rounded border border-transparent bg-gray-300 px-2.5 py-1.5   text-gray-700 shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save response
            </button>
          </div>
        </div>
      }

      {dish && displayResponse && response &&
        <div className='flex flex-col bg-gray-100 mr-2 rounded cursor-pointer' onClick={handleClickOnDisplayedResponse}>
          <div className="p-4 2">
            <div>
              <div dangerouslySetInnerHTML={{ __html: response.content }}></div>

            </div>
          </div>
        </div>
      }

    </div>
  )
}