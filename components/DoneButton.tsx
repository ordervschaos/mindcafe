import { CheckIcon } from '@heroicons/react/20/solid'
// Get icon nams from: https://unpkg.com/browse/@heroicons/react@2.0.11/24/outline/
import { createClient } from "@supabase/supabase-js";
import { useSession } from "@clerk/nextjs";
import { supabaseClient } from '../utils/supabaseClient'
import { useEffect, useState } from 'react';








export default function DoneButton({ meal, isDone, setIsDone, eatenDishesCount, setEatenDishesCount }) {
  const { session } = useSession();



  async function markDone() {
    setIsDone(true)
    setEatenDishesCount(eatenDishesCount + 1)
    const supabase_client = await supabaseClient(session)


    var response = await supabase_client.from("meal").update({ next_dish_index: meal.next_dish_index + 1 }).match({ id: meal.id });
    console.log("response")
    console.log(response)
  }






  return (


    <div>
      <button className="cursor-pointer w-12 h-12 rounded-full 
                  bg-white border border-gray-400 hover:bg-red-500 text-white">
        <span>
          <CheckIcon onClick={markDone} className={`p-2 ${isDone ? "text-pink-400" : "text-gray-400 hover:text-white"}`} aria-hidden="true" />
        </span>
      </button>
    </div>

  )
}