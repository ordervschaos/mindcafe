import { useSession } from "@clerk/nextjs";

import { useEffect, useState } from "react";



import dynamic from "next/dynamic";
const ResponseCatcher = dynamic(() => import("components/ResponseCatcher"), { ssr: false });

const NewDishModal = dynamic(() => import("components/NewDishModal"), { ssr: false });

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

  const [openModal, setOpenModal] = useState(false);

  const [dishToDisplay, setDishToDisplay] = useState(dish)

  useEffect(() => {
    setDishToDisplay(dish)
  }, [dish,meal])

  const handleContentClick = (e) => {
    setOpenModal(true)
  }

  const handleContentChange = (updatedDish) => {
    setDishToDisplay(updatedDish)
  }

  const { session } = useSession();

  const onSave = async (dish) => {
    const supabase_client = await supabaseClient(session)
    var dishResponse = await supabase_client
      .from("response")
      .insert([
        { owner_id: session.user.id, dish_id: dish.id, content: response.content },
      ]);

    var dish = dishResponse.data[0]
    setDishToDisplay(dish)
  }


  return (
    <div>
      {dishVisible && dishToDisplay &&
        <div className='font-Merriweather my-3'>
          <div className={ " bg-white dark:bg-gray-800 dark:border-gray-700"}>
            {dishToDisplay &&
              <div>
                <NewDishModal openModal={openModal} setOpenModal={setOpenModal}
                  meal={meal} addDishToMeal={handleContentChange} setDish={setDishToDisplay} dish={dishToDisplay} />
              </div>
            }
            <div className="p-4">

              <div onClick={handleContentClick}>
                <p className="cursor-pointer mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {dishToDisplay.content &&
                    <div dangerouslySetInnerHTML={{ __html: dishToDisplay.content }}></div>
                  }
                </p>
              </div>
              <div>
                <ResponseCatcher dish={dishToDisplay} onSave={onSave}/>
              </div>
            </div>
          </div>
          {/* </Link> */}

        </div>
      }
    </div>
  )
}