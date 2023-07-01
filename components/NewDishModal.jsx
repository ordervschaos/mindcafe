import { Fragment, useEffect, useState } from 'react'
import { useSession } from "@clerk/nextjs";
import { Dialog, Transition } from '@headlessui/react'
import ThreeDotsMenu from "components/dish/DishCard/ThreeDotsMenu";
import CloseButton from 'components/design-base/CloseButton'
import Link from 'next/link'

import  DishCard from 'components/dish/DishCard/DishCard'

import { supabaseClient } from 'utils/supabaseClient'


import CKEditor from 'components/CKEditor';




// 

export default function NewDishModal({ openModal, setOpenModal, meal, addDishToMeal }) {
  const { session } = useSession();
  const [editorData, setEditorData] = useState()
  const [draftDish, setDraftDish] = useState({})

  const editorId='new_dish_of_meal_'+meal?.id


  useEffect(() => {
    if (meal) {
      setDraftDish({ owner_id: session.user.id, meal_id: meal.id, content: null, accepts_responses: false })
    }
    setShowEditor(true)
    setShowCreatedDish(false)


  }, [meal])

  const handleDelete = async () => {
    deleteDish(createdDish.id)
    clearEditor()
    setOpenModal(false)
  }
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


  const [showEditor, setShowEditor] = useState(true)
  const [createdDish, setCreatedDish] = useState(null)
  const [showCreatedDish, setShowCreatedDish] = useState(false)

  const hideEditor = () => {
    setShowEditor(false)
  }

  const displayCreatedDish = () => {
    setShowCreatedDish(true)
  }



  const saveDish = async (editorData) => {


    if (!editorData)
      return

    draftDish.content=editorData
    setDraftDish({...draftDish, content:editorData})

    const supabase_client = await supabaseClient(session)
    var dishCreated = await supabase_client
      .from("dish")
      .insert([draftDish])
    addDishToMeal(dishCreated.data[0])
    setCreatedDish(dishCreated.data[0])
    console.log("dishCreated", dishCreated)

    clearEditor()
    displayCreatedDish()

    return dishCreated.data[0]

  }




 

  const [isAcceptResponseChecked, setIsAcceptResponseChecked] = useState(false);

  const handleCheckboxChange = async () => {
    setIsAcceptResponseChecked(!isAcceptResponseChecked);
    setDraftDish({ ...draftDish, accepts_responses: !isAcceptResponseChecked })

  };

  const clearEditor = () => {
    localStorage.removeItem(editorId)
    setEditorData({})
    setDraftDish({})
    setIsAcceptResponseChecked(false)
  }
  async function handleClose() {
    // clearEditor()
    setShowEditor(true)
    setShowCreatedDish(false)
    setCreatedDish(null)
    setOpenModal(false)
  }

  async function handleSave() {
    await saveDish(editorData)
    hideEditor()
    displayCreatedDish()
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
                            {showEditor &&
                              <div className=''>

                                <CKEditor editorId={editorId} editorData={editorData} setEditorData={setEditorData} saveDish={saveDish} />

                                <div className="flex justify-end">


                                </div>


                              </div>
                            }

                            {showCreatedDish && createdDish &&
                              <div className=''>
                                <DishCard dish={createdDish} />
                                </div>
                            }

                          </div>


                        </div>
                      </div>


                      <div className="bottom_controls justify-self-end w-full bottom-0">
                        <div className="meal_controls flex w-full items-center space-x-1 p-3   px-3 bg-gray-100">
                         <div className="float-right">
                            {createdDish && showCreatedDish &&
                            < ThreeDotsMenu dish={createdDish} handleDelete={handleDelete} />
                            }
                          </div>
                          <div className='flex-grow'></div>
                          <div className='pr-3'> 
                          <input
                            type="checkbox"
                            checked={isAcceptResponseChecked}
                            onChange={handleCheckboxChange}
                            className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                          /> This dish accepts responses
                          </div>
                          <button onClick={handleSave}
                            type="button"
                            className="px-2.5 inline-flex  text-center items-center rounded border border-transparent bg-gray-900   text-s font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Save <span className="ml-2  text-xs text-gray-400">
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