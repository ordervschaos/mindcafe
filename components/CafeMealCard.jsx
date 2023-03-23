// import Swipeable from "react-swipy"

import { useSession } from "@clerk/nextjs";
import Blocks from 'editorjs-blocks-react-renderer';
import Link from 'next/link'
import Image from 'next/image'
import { Card } from './Card'

import ViewButton from 'components/meal/ViewButton'
import {
  LinkIcon
} from '@heroicons/react/24/outline'

import { useState } from "react";
import DoneButton from "./DoneButton";
import DishCard from "./DishCard";
import { supabaseClient } from '../utils/supabaseClient'


export function formatDate(dateString) {
  return new Date(`${dateString}T00:00:00Z`).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  })
}


export default function CafeMealCard({ meal, setEatenDishesCount, eatenDishesCount,handleMealClick }) {
  var { session } = useSession()
  const [mealVisible, setMealVisible] = useState(true)
  const [isDone, setIsDone] = useState(false);




  async function markDone() {
    setIsDone(true)
    setEatenDishesCount(eatenDishesCount + 1)
    const supabase_client = await supabaseClient(session)

    var eaten_meal={
      eater_id:session.user.id,
      meal_id:meal.id,
      dish_id:meal.next_dish.id,

    }
    await supabase_client.from("meal").update({ next_dish_index: meal.next_dish_index + 1 }).match({ id: meal.id });
    var response=await supabase_client.from("eaten_meal").insert([eaten_meal])
    // console.log("response---",response)
    
  }
  
  async function showNextDish() {
    setEatenDishesCount(eatenDishesCount + 1)
    const supabase_client = await supabaseClient(session)

    meal.next_dish_index+=1
    console.log("meal.next_dish_index",meal.next_dish_index)
    var next_dish_index=meal.next_dish_index%meal.dish.length

    console.log("meal.dish[next_dish_index ]",meal.dish[next_dish_index ])
    setDishDisplayed(meal.dish[next_dish_index ])
    supabase_client.from("meal").update({ next_dish_index: meal.next_dish_index }).match({ id: meal.id });


  }
  async function showPrevDish() {
    setEatenDishesCount(eatenDishesCount + 1)
    const supabase_client = await supabaseClient(session)

    meal.next_dish_index-=1
    console.log("meal.next_dish_index",meal.next_dish_index)
    var next_dish_index=meal.next_dish_index%meal.dish.length

    console.log("meal.dish[next_dish_index ]",meal.dish[next_dish_index ])
    setDishDisplayed(meal.dish[next_dish_index ])
    supabase_client.from("meal").update({ next_dish_index: meal.next_dish_index }).match({ id: meal.id });


  }
  try {
    var content = JSON.parse(meal.content)
    content.blocks = content.blocks.filter((block) => block.type == 'paragraph')
    meal.content = JSON.stringify(content)

  } catch {
    meal.content = JSON.stringify({
      version: "2.11.10",
      blocks: [
        {
          type: "paragraph",
          data: {
            text: meal.content
          }
        }
      ],
    })
  }

  const [dishDisplayed,setDishDisplayed]=useState(meal.next_dish)

  return (
    <div className="overflow-x-clip	">
      {mealVisible && !isDone &&


          <div className='my-3 ' >
            {/* <Link href={"/meal/"+meal.id  } className=" sm:flex py-8 " key={meal.id} > */}
            <div className=" bg-white-100 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">


              <div className="p-3 pl-5">


                  <div className="">
                    <h5 className="cursor-pointer mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{meal.name}</h5>
                  </div>


                {meal.link &&
                  <div className='mb-6  overflow-hidden	'>
                    <a href={meal.link} target='_blank' rel='noreferrer' className='flex items-center space-x-2'>
                      <LinkIcon className='h-5 w-5 text-gray-400' />
                      <span className='text-gray-400 font-light'>{meal.link}</span>
                    </a>
                  </div>

                }
              </div>

              <div className="">
                {dishDisplayed &&

                  <DishCard dish={dishDisplayed} isPartOfMeal={true} />

                }

              </div>
              <div className="p-3 pl-5">
                <div className="flex w-full items-center space-x-1 pt-1  px-3">

                  <div>
                  {meal&&
                  <div className="text-gray-300">  {meal.timing?'🕛'+' '+meal.timing:''}</div>
                  }
                  </div>
                  <div className='flex-grow'></div>
                  {meal.dish.length>1 &&
                    <div className="flex  items-center space-x-1 pt-1  ">
                      <div onClick={()=>handleMealClick(meal.id)} className="cursor-pointer">
                        <ViewButton />
                      </div>
                    </div>
                  }
                  <div className='flex-grow'></div>
                  {meal.status != 'draft' &&
                    <DoneButton meal={meal} markDone={markDone} setIsDone={setIsDone} isDone={isDone} eatenDishesCount={eatenDishesCount} setEatenDishesCount={setEatenDishesCount} />
                  }
                  
                </div>
              </div>

            </div>

          </div>

      }
    </div>
  )
}