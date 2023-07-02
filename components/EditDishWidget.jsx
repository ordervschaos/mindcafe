//takes a dish, edits and saves it
  import React from "react";
  import { supabaseClient } from 'utils/supabaseClient'
  import { useSession } from "@clerk/nextjs";
  import { useState } from 'react'
  import CKEditor from 'components/CKEditor';
  import ThreeDotsMenu from "components/dish/DishCard/ThreeDotsMenu";

  export default function EditDishWidget({ dish, updateDisplayedDish }) {
    const { session } = useSession();
    const [editorData, setEditorData] = useState(null)
    const editorId='dish_'+dish.id
    const [isAcceptResponseChecked, setIsAcceptResponseChecked] = useState(dish.accepts_responses);
    const onSaveClick = async () => {

      const supabase_client = await supabaseClient(session)
      var dishUpdated = await supabase_client
        .from("dish")
        .update({ content: editorData, accepts_responses:isAcceptResponseChecked}).match({ id: dish.id });

        updateDisplayedDish(dishUpdated.data[0])
    }
    const deleteDish = async (dishId) => {
      console.log("deleting dish", dishId)
      const supabase_client = await supabaseClient(session)
      //archive dish
      var archived_dish=await supabase_client.from('dish').update({ archived: true }).match({ id: dishId })
      console.log("archived_dish",archived_dish)
    }
    const handleDelete = async () => {
      deleteDish(dish.id)
    }
    

    const handleCheckboxChange = async () => {
      setIsAcceptResponseChecked(!isAcceptResponseChecked);
  
    };


    return (
      <div className="flex flex-col">
     
        <div className="flex flex-row">
          <CKEditor
            editorId={editorId}
            editorData={dish.content}
            setEditorData={setEditorData}
          />
        </div>

        <div className="bottom_controls justify-self-end w-full bottom-0">
                        <div className="meal_controls flex w-full items-center space-x-1 p-3   px-3 ">
                         <div className="float-right">
                            
                            < ThreeDotsMenu dish={dish} handleDelete={handleDelete} />
                            
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
                          <button onClick={onSaveClick}
                            type="button"
                            className="px-2.5 inline-flex  text-center items-center rounded border border-transparent bg-gray-900   text-s font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Save <span className="ml-2  text-xs text-light-brown">
                              {/* Command + enter */}
                              ⌘ + ⏎
                            </span>
                          </button>

                        </div>

                      </div>
      </div>
    )
  }



    