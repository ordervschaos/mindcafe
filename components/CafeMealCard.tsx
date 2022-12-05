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
  LinkIcon
} from '@heroicons/react/24/outline'
import ThreeDotsMenu from "./ThreeDotsMenu";
import { useState } from "react";
import DoneButton from "./DoneButton";
import DishCard from "./DishCard";

export function formatDate(dateString) {
  return new Date(`${dateString}T00:00:00Z`).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    // year: 'numeric',
    timeZone: 'UTC',
  })
}


export default function CafeMealCard({ meal,setEatenDishesCount,eatenDishesCount }) {
  var { session } = useSession()
  const [mealVisible, setMealVisible] = useState(true)
  const [isDone, setIsDone] = useState(false);
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
        <div className='my-3 '>
          {/* <Link href={"/meal/"+meal.id  } className=" sm:flex py-8 " key={meal.id} > */}
          <div className=" bg-white-100 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">


            <div className="p-3 pl-5">
              
              <Link className="" href={"/meal/" + meal.id+"/edit"}>
                <div className="flex">
                  <h5 className="cursor-pointer mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{meal.name}</h5>
                  <div className=" mr-1 text-gray-400 ml-2 py-1 px-2 inline-block float-right border rounded ">x{meal.num_of_dishes} 
                  </div>
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
            
            <div className="">
              {meal.next_dish && 
              
                <DishCard dish={meal.next_dish} isPartOfMeal={true} />
              
              }

            </div>
            <div className="p-3 pl-5">
              <div className="flex w-full items-center space-x-1 pt-1  px-3">
              

                <div className='flex-grow'></div>
                {meal.status != 'draft' &&
                  <DoneButton meal={meal} setIsDone={setIsDone} isDone={isDone} eatenDishesCount={eatenDishesCount} setEatenDishesCount={setEatenDishesCount} />
                }
              </div>
            </div>

            </div>

          </div>


      }
    </div>
  )
}