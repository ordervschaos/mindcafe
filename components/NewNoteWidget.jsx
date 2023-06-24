import React, {useEffect, useState} from "react";
import NewNoteButton from 'components/design-base/NewNoteButton'
import { supabaseClient } from 'utils/supabaseClient'
import { useSession } from "@clerk/nextjs";


import dynamic from "next/dynamic";
const NewNoteModal = dynamic(() => import("components/NewNoteModal"), { ssr: false });

export default function NewNoteWidget({ meal, addDishToMeal }) {
  const { session } = useSession();

  const createNewDish = async () => {
    const supabase_client = await supabaseClient(session)
    var dishResponse = await supabase_client
      .from("dish")
      .insert([
        { owner_id: session.user.id, meal_id: meal.id },
      ]);
    var newDish = dishResponse.data[0]
    console.log("new dish", newDish)
    setDish(newDish)
  }

  const [dish, setDish] = useState(null);

  useEffect(() => {
    createNewDish()
  }, [])

  useEffect(() => {
    if (!dish)
      createNewDish()
  }, [dish])

  const [openModal, setOpenModal] = useState(false);
  const openNewNoteModal = () => {
    setOpenModal(true);
  };
  return (
    <div>
      
        <div className="text-gray-400 cursor-pointer p-2">
          <NewNoteButton onClick={openNewNoteModal} />
        </div>
      {dish && 
        <NewNoteModal dish={dish} setDish={setDish} openModal={openModal} setOpenModal={setOpenModal} meal={meal} addDishToMeal={addDishToMeal}/>
      }
    </div>
  );
}
