import { CheckIcon } from '@heroicons/react/20/solid'
// Get icon nams from: https://unpkg.com/browse/@heroicons/react@2.0.11/24/outline/
import { createClient } from "@supabase/supabase-js";
import { useSession } from "@clerk/nextjs";
import {supabaseClient} from '../utils/supabaseClient'
import { useEffect, useState } from 'react';








export default function DoneButton({meal,isDone,setIsDone,eatenDishesCount,setEatenDishesCount}) {
  const { session } = useSession();
  
  
  
  async function markDone(){
    setIsDone(true)
    setEatenDishesCount(eatenDishesCount+1)
    const supabase_client= await supabaseClient(session) 


    var response=await supabase_client.from("meal").update({ next_dish_index: meal.next_dish_index+1 }).match({ id: meal.id });
    console.log("response")
    console.log(response)
  }

  
  

    

  return (

      <button
        type="button"
        className="relative inline-flex items-center rounded  bg-white  text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10"
      >
        <CheckIcon onClick={markDone} className= {`mr-2 h-5 w-5 ${isDone?"text-pink-400":"text-gray-400"}`} aria-hidden="true" />
      </button>
     

  )
}