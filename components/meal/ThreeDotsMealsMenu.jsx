import { useState } from 'react';


import {
  EllipsisVerticalIcon
} from '@heroicons/react/24/outline'

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { supabaseClient } from '../../utils/supabaseClient';
import { useSession } from "@clerk/nextjs";
import Link from 'next/link';




export default function ThreeDotsMealsMenu({ meal, setMeal }) {
  var { session } = useSession()

  const [showThreeDotMenu, setThreeDotMenu] = useState(false)
  var toggleArchiveMeal = async (meal_id) => {
    const supabase_client= await supabaseClient(session) 
    
    var update_res=await supabase_client.from("meal").update({
      archived: !meal.archived
    }).match({ id: meal_id,owner_id: session.user.id });
    setMeal(meal=>({...meal,archived: !meal.archived}))
  }

  return (
    <Menu as="div" className="relative text-left">
      <div>
        <Menu.Button className="rounded-md p-2 hover:bg-gray-50 ">

          <EllipsisVerticalIcon onClick={showThreeDotMenu ? () => setThreeDotMenu(false) : () => setThreeDotMenu(true)} className="h-5 w-5 text-gray-400" aria-hidden="true" />

        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10  origin-top-right rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="pt-1">

            <Menu.Item>

              {/* delete meal */}
              <a
                href="#"
                className='text-gray-700 w-full block  text-sm'
              >
                <div className='inline-block m-2'>
                  
                  <button
                    onClick={() => {
                      setThreeDotMenu(false)
                      toggleArchiveMeal(meal.id)
                    }}
                    className='text-gray-700 w-full block px-4 py-2 text-sm'
                  >
                    {meal.archived && <span>Unarchive</span>}
                    {!meal.archived && <span>Archive</span>}
                  </button>
                </div>
              </a>
                
              </Menu.Item>
            <Menu.Item>

              {/* delete meal */}
              <a
                href="#"
                className='text-gray-700 w-full block  text-sm'
              >
                <Link href={"/meal/"+meal.id+"/edit"} className='inline-block m-2'>
                  <button
                   
                    className='text-gray-700 w-full block px-4 py-2 text-sm'
                  >
                    Edit
                  </button>
                </Link>
              </a>
                
              </Menu.Item>
  
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
  )
}
