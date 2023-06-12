import { useSession } from "@clerk/nextjs";
import { useState } from 'react'





//import Editor
import dynamic from "next/dynamic";
const CreateDish = dynamic(() => import("./CreateDish"), { ssr: false });

import FocusMenu from "../../layouts/menus/FocusMenu";
import { supabaseClient } from 'utils/supabaseClient'
import DishCard from "../../dish/DishCard/DishCard";
import AdvancedSettingsWidget from "./AdvancedSettingsWidget/AdvancedSettingsWidget";

import ThreeDotsMealsMenu from "./ThreeDotsMealsMenu";





export default function EditMeal({ meal, user }) {
  const { session } = useSession();
  const [edited_meal, setMeal] = useState(meal)
  const [mealTitle, setMealTitle] = useState(meal.name);
  const [dishesList, setDishesList] = useState(meal.dishes)

  const [isMealSettingsOpen, setIsMealSettingsOpen] = useState(false);
  const [isDangerousSettingsOpen, setIsDangerousSettingsOpen] = useState(false);

  const toggleMealSettingsVisibility = () => {
    setIsMealSettingsOpen(!isMealSettingsOpen);
  };
  const toggleDangerousSettingsVisibility = () => {
    setIsDangerousSettingsOpen(!isDangerousSettingsOpen);
  };

  //function to save title
  const saveTitle = async (meal, e) => {
    //update title in supabase  
    setMealTitle(e.target.value)

    const supabase = await supabaseClient(session);

    await supabase
      .from("meal")
      .update({ name: e.target.value }).match({ id: meal.id, owner_id: session.user.id });

  }

  var deleteAllDishes = async (meal_id) => {
    const supabase_client = await supabaseClient(session)

    var delete_res = await supabase_client.from("dish").delete().match({ meal_id: meal_id, owner_id: session.user.id });

    setDishesList([])
  }






  return (
    <div>

      <FocusMenu user={user} />
      <div className="content-center	">

        <div className="md:grid md:grid-cols-1 md:gap-6 mx-auto	lg:w-[52rem]">
          <div className="pl-2">

            <div className="">
              <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                <div className="mt-3">
                  <input
                    type="text"
                    key="mealTitle1"
                    name="mealTitle1"
                    className="text-3xl lg:text-5xl md:text-3xl block w-full flex-1 border-none focus:border-transparent focus:ring-0 font-serif	  placeholder-gray-300  "
                    placeholder="The title of your meal"
                    onChange={(e) => saveTitle(meal, e)}
                    value={mealTitle}
                  />
                </div>
                {edited_meal.archived &&
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Archived
                  </span>
                }
                <AdvancedSettingsWidget meal={meal} toggleMealSettingsVisibility={toggleMealSettingsVisibility} isMealSettingsOpen={isMealSettingsOpen} toggleDangerousSettingsVisibility={toggleDangerousSettingsVisibility} isDangerousSettingsOpen={isDangerousSettingsOpen}
                  deleteAllDishes={deleteAllDishes}
                />
                <div className="float-right">
                  <ThreeDotsMealsMenu setMeal={setMeal} meal={edited_meal} />
                </div>



                <div className="divider"></div>
                <div className="mt-3 mb-3">
                  <CreateDish meal={meal} dishesList={dishesList} setDishesList={setDishesList} />
                  {/* this will create take input and save */}
                </div>

                {/* Dishes title*/}
                <div className="mt-24">
                  <h2 className="text-2xl text-center font-bold">Rotating Dishes Queue</h2>
                </div>

                <div className="mt-6 max-w-3xl flow-root">
                  <ul role="list" className="px-5">
                    {dishesList && dishesList.map((dish) => (
                      <DishCard key={dish.id} dish={dish} isPartOfMeal={false} />
                    ))}
                  </ul>
                </div>



              </div>



            </div>
          </div>
        </div>
      </div>
    </div>
  );
}