import { CheckIcon } from '@heroicons/react/20/solid'
// Get icon nams from: https://unpkg.com/browse/@heroicons/react@2.0.11/24/outline/
import { createClient } from "@supabase/supabase-js";
import { useSession } from "@clerk/nextjs";

import { useEffect, useState } from 'react';








export default function DoneButton({ meal, isDone, setIsDone, eatenDishesCount, setEatenDishesCount,markDone }) {
  const { session } = useSession();









  return (


    <div>
      <button className="cursor-pointer w-12 h-12 rounded-full content-center	justify-center items-center
                  bg-white border border-gray-400 hover:bg-red-500 text-white">
        <span>
          <CheckIcon onClick={markDone} className={`p-2 ${isDone ? "text-pink-400" : "text-gray-400 hover:text-white"}`} aria-hidden="true" />
        </span>
      </button>
    </div>

  )
}