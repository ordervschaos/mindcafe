import Swipeable from "react-swipy"

import { useSession } from "@clerk/nextjs";
import Blocks from 'editorjs-blocks-react-renderer';
import Link from 'next/link'
import Image from 'next/image'
import { Card } from './Card'

import AuNorButton from './AuhtorButton'
import LikeButton from './DoneButton';
import ShareButton from './ShareButton';
import {
  PencilSquareIcon,
  DocumentIcon,
  Square2StackIcon,
  LinkIcon
} from '@heroicons/react/24/outline'
import ThreeDotsMenu from "./ThreeDotsMenu";
import { useState } from "react";
import DoneButton from "./DoneButton";
import DishCard from "./DishCard";
import { supabaseClient } from '../utils/supabaseClient'
import ShowNextDishButton from "./ShowNextDishButton";

export function formatDate(dateString) {
  return new Date(`${dateString}T00:00:00Z`).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    // year: 'numeric',
    timeZone: 'UTC',
  })
}


export default function CafeMealCard({ meal, setEatenDishesCount, eatenDishesCount }) {
  var { session } = useSession()
  const [mealVisible, setMealVisible] = useState(true)
  const [isDone, setIsDone] = useState(false);

  const [dishDisplayed, setDishDisplayed] = useState(meal.next_dish)

  async function markDone() {
    setIsDone(true)
    setEatenDishesCount(eatenDishesCount + 1)
    const supabase_client = await supabaseClient(session)


    var response = await supabase_client.from("meal").update({ next_dish_index: meal.next_dish_index + 1 }).match({ id: meal.id });
    console.log("response")
    console.log(response)
  }
  async function showNextDish() {
    setEatenDishesCount(eatenDishesCount + 1)
    const supabase_client = await supabaseClient(session)

    meal.next_dish_index += 1

    var next_dish_index = meal.next_dish_index % meal.dish.length

    setDishDisplayed(meal.dish[next_dish_index])
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
  return (
    <div>
      {mealVisible && !isDone &&

        <div>
          <div className='flex flex-col h-screen -mt-60 pt-60'>
            {/* <Link href={"/meal/"+meal.id  } className=" sm:flex py-8 " key={meal.id} > */}

            <div className=" bg-white-100 rounded-lg">


              <div className="p-3 pl-5">

                <Link className="" href={"/meal/" + meal.id + "/edit"}>
                  <div className="">
                    {meal.num_of_dishes > 1 &&

                      <span className="float-right inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                        <Square2StackIcon className='h-5 w-5 text-gray-400' />{meal.num_of_dishes}
                      </span>
                    }
                    <h5 className="h-10  cursor-pointer mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{meal.name}</h5>
                  </div>

                </Link>
                {meal.link &&
                  <div className='mb-6  overflow-hidden	'>
                    <a href={meal.link} target='_blank' rel='noreferrer' className='flex items-center space-x-2'>
                      <LinkIcon className='h-5 w-5 text-gray-400' />
                      <span className='text-gray-400 font-light'>{meal.link}</span>
                    </a>
                  </div>

                }
              </div>

              <div className="mb-auto h-10">
                {dishDisplayed &&

                  <DishCard dish={dishDisplayed} isPartOfMeal={true} />

                }

              </div>


            </div>

          </div>
          <div className="p-3 h-10  pl-5">
            <div className="flex w-full items-center space-x-1 pt-1  px-3">


              <div className='flex-grow'></div>
              {meal.status != 'draft' &&
                <DoneButton meal={meal} markDone={markDone} setIsDone={setIsDone} isDone={isDone} eatenDishesCount={eatenDishesCount} setEatenDishesCount={setEatenDishesCount} />
              }
              {meal.status != 'draft' &&
                <ShowNextDishButton showNextDish={showNextDish} />
              }
            </div>
          </div>
        </div>

      }
    </div>
  )
}