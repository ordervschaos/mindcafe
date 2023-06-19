import { useSession } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useId, useState } from 'react';
import { EDITOR_JS_TOOLS } from '.components/editor/tools'
import {supabaseClient} from '../../utils/supabaseClient'
import { createReactEditorJS } from 'react-editor-js'// documentation at: https://github.com/Jungwoo-An/react-editor-js
import React from 'react';
const ReactEditorJS = createReactEditorJS()

import { useRouter } from 'next/router'


export default function DishEditor({ dish }) {
  const { session } = useSession();
  const editorCore = React.useRef(null)
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

  const handleInitialize = React.useCallback((instance) => {
    editorCore.current = instance
  }, [])

  const saveReview = React.useCallback(async () => {
    const savedData = await editorCore.current.save();
    if(savedData.blocks.length==0){
      return
    }else{
      //update the data in supabase
      const supabase_client= await supabaseClient(session) 

      await supabase_client
        .from("dish")
        .update({ content: JSON.stringify(savedData), owner_id: session.user.id }).match({ id: dish.id });
    }


  }, [session,dish.id])
  



  

  return (
    <>
      <ReactEditorJS defaultValue={JSON.parse(review_data)} onInitialize={handleInitialize} autofocus={false} onChange={saveReview} tools={EDITOR_JS_TOOLS} placeholder="Tell us the awesome things about the awesome thing" />
      <div className="flex justify-end">

      <button onClick={()=>{router.back()}}
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