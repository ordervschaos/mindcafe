import { useSession } from "@clerk/nextjs";
import { useEffect, useId, useState } from 'react';
import {supabaseClient} from '../../utils/supabaseClient'
import React, {useCallback} from 'react';
import CKEditor from 'components/CKEditor'

import { useRouter } from 'next/router'


export default function DishEditor({ dish }) {
  const { session } = useSession();
  const router = useRouter()

  var review_data=dish.content

  const handleKeyPress = (event) => {
    if (( event.metaKey || event.ctrlKey) && event.key === 'Enter') {
      event.preventDefault()
      saveReview()
      router.back()
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


  const [editorData, setEditorData] = useState(review_data)

  const saveDish = useCallback(async (editorData) => {


    if (!editorData || !dish.id) 
      return
  
    const supabase_client = await supabaseClient(session)
    var dishCreated=await supabase_client
      .from("dish")
      .update({ content: editorData, owner_id: session.user.id }).match({ id: dish.id });




  
    


  }, [session])

  const handleSaveClick = () => {
    saveDish(editorData)
    router.back()
  }

  



  

  return (
    <>
      <CKEditor id={dish.id} editorData={editorData} setEditorData={setEditorData} saveDish={saveDish}/>

      <div className="flex justify-end">

      <button onClick={handleSaveClick}
        type="button"
        className="px-6 inline-flex  text-center items-center rounded border border-transparent bg-gray-900 px-2.5 py-1.5 text-xl font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Save  <span className="ml-2  text-xs text-gray-400">
          {/* Command + enter */}
          ⌘ + ⏎
        </span>
      </button>
    </div>
    </>
  )
}
// 