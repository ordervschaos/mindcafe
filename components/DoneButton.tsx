// import { CheckIcon } from '@heroicons/react/20/solid'
// Get icon nams from: https://unpkg.com/browse/@heroicons/react@2.0.11/24/outline/
import { createClient } from "@supabase/supabase-js";
import { useSession } from "@clerk/nextjs";

import { useEffect, useState } from 'react';

import { HiCheck }from "react-icons/hi";






export default function DoneButton({ meal, isDone, setIsDone, eatenDishesCount, setEatenDishesCount,markDone }) {
  const { session } = useSession();









  return (


    <div>
      <button onClick={markDone} className="flex items-center justify-center cursor-pointer w-12 h-12 rounded-full
                  bg-white border border-gray-400 hover:bg-red-500 text-white">

          <HiCheck  className={`p-2 h-15 w-15  ${isDone ? "text-pink-400" : "text-gray-400 hover:text-white"}`} aria-hidden="true" />

      </button>
    </div>

  )
}