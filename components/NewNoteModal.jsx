import { Fragment, useEffect, useState } from 'react'
import { useSession } from "@clerk/nextjs";
import { Dialog, Transition } from '@headlessui/react'

import CloseButton from 'components/design-base/CloseButton'
import Link from 'next/link'



import { supabaseClient } from 'utils/supabaseClient'

import { useRef, useCallback } from 'react';

import  CKEditor  from 'components/CKEditor';




// 

export default function NewNoteModal({ openModal, setOpenModal, meal, addDishToMeal, setDish, dish }) {
  const { session } = useSession();
  const [editorData, setEditorData] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  var dishId = dish ? dish.id : null
  

  

  const handleKeyPress = (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
      event.preventDefault()
      saveDish(editorData)
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




  const saveDish = useCallback(async (editorData) => {


    if (!editorData || !dishId) 
      return
    const supabase_client = await supabaseClient(session)
    var dishCreated=await supabase_client
      .from("dish")
      .update({ content: editorData, owner_id: session.user.id }).match({ id: dishId });
    setShowSuccessMessage(true)
    addDishToMeal(dishCreated.data[0])

    setTimeout(() => {
      setShowSuccessMessage(false)
    }, 2000);
    


  }, [session, meal.id])

  


  

// save dish every 5 seconds
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     saveDish(editorData)
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, [saveDish]);


  const deleteDish = async (dishId) => {
    const supabase_client = await supabaseClient(session)
    await supabase_client
      .from("dish")
      .delete().match({ id: dishId });
  }

  const clearEditor = () => {
    setDish(null)
  }
  async function handleClose() {
    // if(!editorData)
    //   deleteDish()
    // else
    saveDish(editorData)
    clearEditor()
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
                            <div className=''>
                              <CKEditor id={dish.id} editorData={editorData} setEditorData={setEditorData} saveDish={saveDish}/>

                              <div className="flex justify-end">

                                
                              </div>
                              

                            </div>
                            
                          </div>


                        </div>
                      </div>

                        
                      <div className="bottom_controls justify-self-end w-full bottom-0">
                        <div className="meal_controls flex w-full items-center space-x-1 p-3   px-3 bg-gray-100">
                          <div className='flex-grow'></div>
                          <button onClick={handleClose}
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