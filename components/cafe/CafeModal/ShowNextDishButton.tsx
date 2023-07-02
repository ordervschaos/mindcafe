import { FiArrowRight } from 'react-icons/fi'
// Get icon nams from: https://unpkg.com/browse/@heroicons/react@2.0.11/24/outline/
import { createClient } from "@supabase/supabase-js";
import { useSession } from "@clerk/nextjs";

import { useEffect, useState } from 'react';








export default function ShowNextDishButton({  showNextDish }) {










  return (


    <div>
      <button onClick={showNextDish} className="w-12 h-12 flex justify-center py-4 cursor-pointer text-light-brown rounded-full hover:shadow-lg">

          <FiArrowRight  className="h-15 w-15 text-light-brown" />

      </button>
    </div>

  )
}