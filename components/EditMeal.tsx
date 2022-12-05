import { useSession } from "@clerk/nextjs";
import { useState } from 'react'

import { Cog6ToothIcon,ChevronUpIcon,ChevronDownIcon } from '@heroicons/react/24/outline'




//import Editor
import dynamic from "next/dynamic";
const CreateDishEditor = dynamic(() => import("./CreateDishEditor"), { ssr: false });

import FocusMenu from "./FocusMenu";
import { supabaseClient } from '../utils/supabaseClient'
import DishCard from "./DishCard";
import TimeDropDown from "./TimeDropDown";
import InputAndDropDown from "./InputAndDropDown";
import WeeklySchedulePicker from "./WeeklySchedulePicker";







export default function EditMeal({ meal, user }) {
  const { session } = useSession();
  const [mealTitle, setMealTitle] = useState(meal.name);
  const [dishesList, setDishesList] = useState(meal.dishes)

  const [isMealSettingsOpen, setIsMealSettingsOpen] = useState(false);


  const toggleMealSettingsVisibility = () => {
    setIsMealSettingsOpen(!isMealSettingsOpen);
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
                {/* schedule picker */}
                <div className="mt-3 bg-gray-100 p-3 border rounded-md">
                  <div className="text-gray-400 cursor-pointer" onClick={toggleMealSettingsVisibility}>
                    <Cog6ToothIcon className="w-5 h-5 inline-block"/> 
                    <span className="ml-2 mr-1" >Advanced Settings</span>
                    {isMealSettingsOpen&&
                    <ChevronUpIcon className="w-5 h-5 inline-block"/> 
                    }
                    {!isMealSettingsOpen&&
                      <ChevronDownIcon className="w-5 h-5 inline-block"/> 
                    }
                    
                  </div>
                  {isMealSettingsOpen&&
                    <div className="grid grid-cols-6 gap-6 mt-2">
                      <div className="col-span-6 sm:col-span-3">
                        <TimeDropDown  meal={meal}/>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <InputAndDropDown meal={meal}/>
                      </div>
                    
                      <WeeklySchedulePicker meal={meal}/>
                    </div>
                  }
                </div>
                    {/* {
                      "timing":{
                        "hour": 12,
                        "minute": 30
                      },
                      "expiration":{
                        "value": 1,
                        "unit": "day"
                      }
                    } */}


                <div className="divider"></div>
                <div className="mt-3 mb-3">
                  <CreateDishEditor meal={meal} dishesList={dishesList} setDishesList={setDishesList} />
                  {/* this will create take input and save */}
                </div>

                {/* Dishes title*/}
                <div className="mt-24">
                  <h2 className="text-2xl text-center font-bold">Dishes Queue</h2>
                </div>

                <div className="mt-6 max-w-3xl flow-root">
                  <ul role="list" className="px-5">
                    {dishesList && dishesList.map((dish) => (
                      <DishCard key={dish.id} dish={dish} isPartOfMeal={false}/>
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