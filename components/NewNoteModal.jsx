import { Fragment, useEffect, useState } from 'react'
import { useSession } from "@clerk/nextjs";
import { Dialog, Transition } from '@headlessui/react'

import CloseButton from 'components/design-base/CloseButton'
import Link from 'next/link'


import { EDITOR_JS_TOOLS } from './editor/tools'
import { supabaseClient } from 'utils/supabaseClient'
import { createReactEditorJS } from 'react-editor-js'// documentation at: https://github.com/Jungwoo-An/react-editor-js
import { useRef, useCallback } from 'react';
const ReactEditorJS = createReactEditorJS()



// 

export default function NewNoteModal({ openModal, setOpenModal, meal }) {
  const { session } = useSession();
  const editorCore = useRef(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const [dishId, setDishId] = useState(null)

  const handleKeyPress = (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
      event.preventDefault()
      saveDish()
    }
  };

  const handleInitialize = useCallback((instance) => {
    editorCore.current = instance
  }, [])
  useEffect(() => {
    // attach the event listener
    document.addEventListener('keydown', handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);



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
    if(!editorCore?.current)
      return
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
  }, [session, dishId])


  

// save dish every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      saveDish()
    }, 5000);
    return () => clearInterval(interval);
  }, [saveDish]);


 

  function handleClose() {
    saveDish()
    setOpenModal(false)
  }

  return (
    <div>
      {meal && 
        <Transition.Root show={openModal} as={Fragment}>
          <Dialog as="div" className="fixed z-10" onClose={setOpenModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-x-clip">
              <div className="flex h-full items-start justify-center  text-center sm:items-center p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="h-full relative transform   bg-white text-left shadow-xl transition-all w-full">
                    <div className='flex h-full flex-col'>
                      <div className="flex w-full justify-end p-2">
                        <CloseButton onClick={handleClose} />
                      </div>
                      <div className=" pb-20 flex-grow overflow-y-scroll bg-white px-4 pt-5  sm:p-6 sm:pb-4">
                        <div className=" bg-white-100 ">


                          <div className="p-3 pl-5">
                            <div className="">
                            
                              <Link href={`/meal/${meal.id}/edit`} id="cafe_modal_meal_title">
                                <h5 className="font-Merriweather h-10  cursor-pointer mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{meal.name}</h5>
                              </Link>
                            </div>

                    
                          </div>

                          <div className="mb-auto ">
                            <div className='CreateDishEsitor'>
                              <div className="border p-2 border-round mb-3">
                                <ReactEditorJS defaultValue={{
                                  blocks: []
                                }} onInitialize={handleInitialize} autofocus={false} tools={EDITOR_JS_TOOLS} placeholder="Create a new dish...." />
                              </div>

                              <div className="flex justify-end">

                                
                              </div>
                              

                            </div>
                            
                          </div>


                        </div>
                      </div>

                        
                      <div className="bottom_controls justify-self-end w-full bottom-0">
                        <div className="meal_controls flex w-full items-center space-x-1 p-3   px-3 bg-gray-100">
                          <div className='flex-grow'></div>
                          <button onClick={saveDish}
                                  type="button"
                                  className="px-6 inline-flex  text-center items-center rounded border border-transparent bg-gray-900 px-2.5 py-1.5 text-xl font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                  Save & Close <span className="ml-2  text-xs text-gray-400">
                                    {/* Command + enter */}
                                    ⌘ + ⏎
                                  </span>
                                </button>

                        </div>
                       
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      }
    </div>
  )
}