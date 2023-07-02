// import Swipeable from "react-swipy"

import { useSession } from "@clerk/nextjs";
import Link from 'next/link'
import ViewButton from 'components/meal/ViewButton'
import {
  LinkIcon
} from '@heroicons/react/24/outline'

import { useState } from "react";
import DoneButton from "components/meal/DoneButton";
import DishCard from "../dish/DishCard/DishCard";
import { supabaseClient } from '../../utils/supabaseClient'


export default function CafeMealCard({ meal, setEatenMealsCount, eatenMealsCount,showMealPreview,scrollNextDishToTop }) {
  var { session } = useSession()
  const [isDone, setIsDone] = useState(meal.done);

  const [dishDisplayed,setDishDisplayed]=useState(meal.next_dish)

  const handleMealPreviewClick = async () => {
    await showMealPreview(meal.id)
    setDishDisplayed(meal.next_dish)
  }

  async function markDone() {
    setIsDone(true)
    setEatenMealsCount(eatenMealsCount + 1)
    const supabase_client = await supabaseClient(session)

    var eaten_meal={
      eater_id:session.user.id,
      meal_id:meal.id,
      dish_id:meal.next_dish.id,

    }
    await supabase_client.from("meal").update({ next_dish_index: meal.next_dish_index + 1 }).match({ id: meal.id });
    var response=await supabase_client.from("eaten_meal").insert([eaten_meal])

    scrollNextDishToTop(meal.id)
    
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

  

  return (
    <div className="overflow-x-clip	font-Merriweather meal_card" id={meal.id}>
        <div className='my-3 ' >
          
          <div className= {`${isDone?'bg-paper-burnt text-light-brown':'bg-paper'} rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700`} >


            <div className="p-3 pl-5">

              <div className="flex justify-between items-center">
                <div className="">
                  <Link href={"/meal/"+meal.id + "/edit"  } className=" sm:flex py-8 " key={meal.id} >
                    <h5 className="cursor-pointer mb-2 text-2xl font-bold tracking-tight">{meal.name}</h5>
                  </Link>
                </div>
                  {isDone &&
                    <ViewButton  handleMealPreviewClick={handleMealPreviewClick} />
                  }
              </div>


              {meal.link &&
                <div className='mb-6  overflow-hidden	'>
                  <a href={meal.link} target='_blank' rel='noreferrer' className='flex items-center space-x-2'>
                    <LinkIcon className='h-5 w-5 text-light-brown' />
                    <span className='text-light-brown font-light'>{meal.link}</span>
                  </a>
                </div>

              }
            </div>

            {dishDisplayed && !isDone &&
              <div className="">
                <div>
                  <DishCard meal ={meal} dish={dishDisplayed} isPartOfMeal={true} />
                </div>
                <div className="p-3 pl-5">
                  <div className="flex w-full items-center space-x-1 pt-1  px-3">
                    <div>
                      {meal&&
                        <div className="text-gray-300">  {meal.timing?'🕛'+' '+meal.timing:''}</div>
                      }
                    </div>
                    <div className='flex-grow'></div>
                    <DoneButton meal={meal} markDone={markDone} setIsDone={setIsDone} isDone={isDone} eatenMealsCount={eatenMealsCount} setEatenMealsCount={setEatenMealsCount} />
                    <div className='flex-grow'></div>
                    <ViewButton  handleMealPreviewClick={handleMealPreviewClick} />
                  </div>
                </div>
              </div>
            }

          </div>

        </div>
    </div>
  )
}