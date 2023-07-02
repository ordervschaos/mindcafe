
import { useState, useEffect } from 'react'
import { useSession } from "@clerk/nextjs";

import Link from 'next/link'

import { supabaseClient } from 'utils/supabaseClient'

import { useCallback } from 'react';
import { FiMessageCircle } from 'react-icons/fi';
import CKEditor from 'components/CKEditor';

import ShowAllResponses from 'components/ShowAllResponses';

import DisplayResponse from 'components/DisplayResponse';


// 

export default function ResponseCatcher({ dish, onSave }) {
  const { session } = useSession();
  const [editorData, setEditorData] = useState(null)

  const [showEditor, setShowEditor] = useState(dish.accepts_responses)
  const [displayResponse, setDisplayResponse] = useState(false)
  const [showAllResponses, setShowAllResponses] = useState(false)

  const [response, setResponse] = useState(null)
  var editorId = 'response_of_dish_' + dish?.id
  useEffect(() => {
    editorId = 'response_of_dish_' + dish?.id
    setDisplayResponse(false)
    setShowAllResponses(false)
    setResponse(null)
    setShowEditor(dish.accepts_responses)

  }, [dish?.id])



  const handleToggleShowAllResponsesClick = () => {
    setShowAllResponses(!showAllResponses)
  }


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


      setResponse(responseCreated.data[0])
    }

    localStorage.removeItem(editorId, editorData)
    setEditorData(null)



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
              <CKEditor editorId={editorId} editorData={editorData} setEditorData={setEditorData} />
            </div>
          </div>
          <div className="meal_controls flex justify-end">
            <button onClick={handleSave}
              type="button"
              className="mt-4 px-3 inline-flex   text-center items-center rounded border border-transparent bg-paper-burnt px-2.5 py-1.5   text-dark-brown shadow-sm hover:drop-shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save response
            </button>
          </div>
        </div>
      }

      {dish && displayResponse && response &&
        <DisplayResponse response={response} onClick={handleClickOnDisplayedResponse} />
      }

      {dish && dish.accepts_responses &&
      <div>
        
        <div className="flex justify-start text-smallest text-gray-400 font-sans" >
          <div  className='cursor-pointer' onClick={handleToggleShowAllResponsesClick}> <FiMessageCircle className='inline'/>  {showAllResponses?'hide':'show all'} responses </div>
        </div>
        <div>
            {showAllResponses && 
            <ShowAllResponses dish={dish} handleClickOnDisplayedResponse={handleClickOnDisplayedResponse} />
            }
            </div>

      </div>


      }

    </div>
  )
}