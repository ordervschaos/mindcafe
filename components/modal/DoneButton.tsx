// import { CheckIcon } from '@heroicons/react/20/solid'
// Get icon nams from: https://unpkg.com/browse/@heroicons/react@2.0.11/24/outline/
import { createClient } from "@supabase/supabase-js";
import { useSession } from "@clerk/nextjs";

import { useEffect, useState } from 'react';





import { FiCheck } from "react-icons/fi";



export default function DoneButton({ meal, isDone, setIsDone, eatenDishesCount, setEatenDishesCount,markDone }) {
  const { session } = useSession();









  return (


    <div>
      <button onClick={markDone} className="flex items-center justify-center cursor-pointer w-14 h-14 rounded-full
                  bg-white border border-gray-400 hover:bg-red-500 text-white">


          <FiCheck  className={` h-15 w-15  text-red-600 hover:text-white`} />


      </button>
    </div>

  )
}