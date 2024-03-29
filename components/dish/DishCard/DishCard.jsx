import { useSession } from "@clerk/nextjs";

import { useEffect, useState } from "react";
import CKPreview from "components/CKPreview";


import dynamic from "next/dynamic";
const ResponseCatcher = dynamic(() => import("components/ResponseCatcher"), { ssr: false });

const EditDishWidget = dynamic(() => import("components/EditDishWidget"), { ssr: false });

export function formatDate(dateString) {
  return new Date(`${dateString}T00:00:00Z`).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  })
}


export default function DishCard({ meal, dish }) {
  const [dishVisible, setDishVisible] = useState(true)

  useEffect(() => {
    setDishVisible(true)
  }, [dish])
  if (!dish.content)
    dish = {
      content: null
    }
  const [showDishEditor, setShowDishEditor] = useState(false)
  const [openModal, setOpenModal] = useState(false);

  const [dishToDisplay, setDishToDisplay] = useState(dish)

  useEffect(() => {
    setDishToDisplay(dish)
  }, [dish,meal])

  const handleContentClick = (e) => {
    setShowDishEditor(true)
  }

  const updateDisplayedDish = (updatedDish) => {
    setShowDishEditor(false)
    setDishToDisplay(updatedDish )
  }

  const { session } = useSession();

  const onSave = async (dish) => {
    const supabase_client = await supabaseClient(session)
    var dishResponse = await supabase_client
      .from("response")
      .insert([
        { owner_id: session.user.id, dish_id: dish.id, content: response.content },
      ]);

    var createdResponse = dishResponse.data[0]

  }


  return (
    <div>
      {dishVisible && dishToDisplay &&
        <div className='font-Merriweather py-3 text-gray-800 bg-paper dark:bg-gray-800 dark:border-gray-700'>
          <div className={ ""}>
            {dishToDisplay && 

              <div>
                {showDishEditor?(

                <EditDishWidget
                  meal={meal} updateDisplayedDish={updateDisplayedDish} setDish={setDishToDisplay} dish={dishToDisplay} />
                ):(
                  <div>

                    <div onClick={handleContentClick}>
                      <p className="p-4 cursor-pointer mb-3 font-normal text-gray-800 dark:text-light-brown">
                        {dishToDisplay.content &&
                          <CKPreview content={dishToDisplay.content} />

                        }
                      </p>
                    </div>
                    <div className="p-2">
                      <ResponseCatcher dish={dishToDisplay} onSave={onSave} />
                    </div>
                  </div>

                )}

              </div>
            }
          </div>
          {/* </Link> */}

        </div>
      }
    </div>
  )
}