import { useSession } from "@clerk/nextjs";
import Blocks from 'editorjs-blocks-react-renderer';
import Link from 'next/link'
import {
  PencilSquareIcon,
  TrashIcon,
  LinkIcon
} from '@heroicons/react/24/outline'
import ThreeDotsMenu from "./ThreeDotsMenu";
import { useEffect, useState } from "react";

import dynamic from "next/dynamic";
const NewNoteModal = dynamic(() => import("components/NewNoteModal"), { ssr: false });

export function formatDate(dateString) {
  return new Date(`${dateString}T00:00:00Z`).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    // year: 'numeric',
    timeZone: 'UTC',
  })
}


export default function DishCard({ meal, dish,isPartOfMeal }) {
  var { session } = useSession()
  const [dishVisible, setDishVisible] = useState(true)

  useEffect(() => {
    setDishVisible(true)
  }, [dish])
  if(!dish.content)
    dish={
      content:null
    }
  // if(typeof dishToDisplay.content == "string")
  //   dish.content=dish.content?JSON.parse(dish.content):{blocks:[]}
  // convert all embed to 100% width
  // dish.content.blocks.forEach((block)=>{
  //   if(block.type=='embed')
  //     block.data.width="100%"
  // })

  {/* openModal, setOpenModal, meal, addDishToMeal, setDish, dish */}

  const [openModal, setOpenModal] = useState(false);

  const [dishToDisplay, setDishToDisplay] = useState(dish)

    const handleContentClick = (e) => {
      console.log("handleContentClick", dishToDisplay)
      setOpenModal(true)
    }

    const handleContentChange = (updatedDish) => {
      console.log("handleContentChange7777", updatedDish)
      setDishToDisplay(updatedDish)
    }

 
  return (
    <div>
      {dishVisible && dishToDisplay&&
        <div className='font-Merriweather my-3 '>
          {/* <Link href={"/dish/"+dish.id  } className=" sm:flex py-8 " key={dish.id} > */}
          <div className={isPartOfMeal?"":"rounded-lg border border-gray-200"+" bg-white dark:bg-gray-800 dark:border-gray-700"}>
            {dishToDisplay &&
             
                
              <div>
                <div className="float-right">
                  <ThreeDotsMenu  dish={dish} setDishVisible={setDishVisible} />
                
                </div>
                <NewNoteModal openModal={openModal} setOpenModal ={setOpenModal} 
                 meal ={meal} addDishToMeal ={handleContentChange} setDish={setDishToDisplay} dish={dishToDisplay} />
              </div>
                

             

            }
            <div className="p-3 pl-5">
              

{/*               
              {dishToDisplay.link &&
                <div className='mb-6  overflow-hidden	'>
                  <a href={dishToDisplay.link} target='_blank' rel='noreferrer' className='flex items-center space-x-2'>
                    <LinkIcon className='h-5 w-5 text-gray-400' />
                    <span className='text-gray-400 font-light'>{dishToDisplay.link}</span>
                  </a>
                </div>
              } */}

              <div onClick={handleContentClick}>
                <p className="cursor-pointer mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {dishToDisplay.content && 
                      <div dangerouslySetInnerHTML={{ __html: dishToDisplay.content }}></div>

                  }
                </p>
              </div>

            </div>
          </div>
          {/* </Link> */}

        </div>
      }
    </div>
  )
}