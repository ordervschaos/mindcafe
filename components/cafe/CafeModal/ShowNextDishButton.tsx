import { FiArrowRight } from 'react-icons/fi'
// Get icon nams from: https://unpkg.com/browse/@heroicons/react@2.0.11/24/outline/
import { createClient } from "@supabase/supabase-js";
import { useSession } from "@clerk/nextjs";

import { useEffect, useState } from 'react';








export default function ShowNextDishButton({  showNextDish }) {










  return (


    <div>
      <button onClick={showNextDish} className="flex items-center justify-center cursor-pointer w-12 h-12 rounded-full content-center	 justify-center items-center
                  bg-white  hover:bg-red-500 text-white">

          <FiArrowRight  className="h-15 w-15 text-gray-400" />

      </button>
    </div>

  )
}