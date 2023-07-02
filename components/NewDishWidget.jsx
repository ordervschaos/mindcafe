import React, { useEffect, useState } from "react";
import NewNoteButton from 'components/design-base/NewNoteButton'
import { supabaseClient } from 'utils/supabaseClient'
import { useSession } from "@clerk/nextjs";


import dynamic from "next/dynamic";
const NewDishModal = dynamic(() => import("components/NewDishModal"), { ssr: false });

export default function NewDishWidget({ meal, addDishToMeal }) {

  const [openModal, setOpenModal] = useState(false);
  const openNewDishModal = () => {
    setOpenModal(true);
  };
  return (
    <div>
      <div className="text-light-brown cursor-pointer p-2">
        <NewNoteButton onClick={openNewDishModal} />
      </div>
 
        <NewDishModal 
          openModal={openModal}
          setOpenModal={setOpenModal}
          meal={meal}
          addDishToMeal={addDishToMeal} 
        />
    </div>
  );
}
