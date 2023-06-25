import { ShareIcon } from '@heroicons/react/20/solid'
import { useState } from 'react';


import {
  EllipsisVerticalIcon
} from '@heroicons/react/24/outline'

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { supabaseClient } from 'utils/supabaseClient';
import { useSession } from "@clerk/nextjs";
import Link from 'next/link';




export default function ThreeDotsMenu({ dish,handleDelete }) {
  var { session } = useSession()

  const [showThreeDotMenu, setThreeDotMenu] = useState(false)


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
        <Menu.Items className="origin-bottom-left absolute bottom-10 left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">

          <div className="pt-1">

            <Menu.Item>

              {/* delete dish */}
              <a
                href="#"
                className='text-gray-700 w-full block  text-sm'
              >
                <div className='inline-block m-2'>
                  <button
                    onClick={() => {
                      handleDelete(dish.id)
                    }}
                    className='text-gray-700 w-full block px-4 py-2 text-sm'
                  >
                    Delete
                  </button>
                </div>
              </a>
                
              </Menu.Item>
      
  
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
  )
}
