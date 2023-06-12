import { Fragment, useEffect, useRef, useState } from 'react'
import { useSession } from "@clerk/nextjs";
import { Dialog, Transition } from '@headlessui/react'
import { printCurrentDishIndex, getNextDishIndex, getPrevDishIndex } from 'utils/dish_utils'
import { getNextMealIndex, getPrevMealIndex } from 'utils/meal_utils'
import MealCompletionStatusSteps from './MealCompletionStatusSteps'
import ThreeDotsMealsMenu from './ThreeDotsMealsMenu'
import Link from 'next/link'
import {
  Square2StackIcon,
  LinkIcon
} from '@heroicons/react/24/outline'
import DishCard from '../../dish/DishCard/DishCard'
import DoneButton from "../../meal/DoneButton";
import ShowNextDishButton from "./ShowNextDishButton";
import ShowPrevDishButton from "./ShowPrevDishButton";
import ShowNextMealButton from "../../meal/ShowNextMealButton";
import ShowPrevMealButton from "../../meal/ShowPrevMealButton";

import { supabaseClient } from 'utils/supabaseClient'

export default function CafeModal({ openModal, setOpenModal, mealsList, mealIndex, setMealIndex, eatenMealsCount, setEatenMealsCount }) {
  var { session } = useSession()
  var cafe = {
    meals: mealsList,
    current_meal_index: mealIndex
  }
  useEffect(() => {
    setMeal(mealsList[mealIndex])
    setDishDisplayed(mealsList[mealIndex].next_dish)
  }, [mealsList, mealIndex])
  const default_meal = mealsList[mealIndex]
  const [meal, setMeal] = useState(default_meal)

  const [dishDisplayed, setDishDisplayed] = useState(default_meal.next_dish)
  const [isDone, setIsDone] = useState(false);

  const cancelButtonRef = useRef(null)
  async function markDone() {
    setIsDone(true)
    setEatenMealsCount(eatenMealsCount + 1)
    const supabase_client = await supabaseClient(session)
    showNextMeal()

    
    var eaten_meal={
      eater_id:session.user.id,
      meal_id:meal.id,
      dish_id:meal.next_dish.id,
      
    }
    await supabase_client.from("meal").update({ next_dish_index: meal.next_dish_index + 1 }).match({ id: meal.id });
    var eaten_meal_res = await supabase_client.from("eaten_meal").insert([eaten_meal])
    

  }
  async function showNextDish() {
    const supabase_client = await supabaseClient(session)
    meal.next_dish_index = getNextDishIndex(meal)
    setDishDisplayed(meal.dish[meal.next_dish_index])
    supabase_client.from("meal").update({ next_dish_index: meal.next_dish_index }).match({ id: meal.id });
  }
  async function showPrevDish() {
    const supabase_client = await supabaseClient(session)

    meal.next_dish_index = getPrevDishIndex(meal)
    
    setDishDisplayed(meal.dish[meal.next_dish_index])
    supabase_client.from("meal").update({ next_dish_index: meal.next_dish_index }).match({ id: meal.id });


  }

  function showNextMeal() {
    var next_meal_index = getNextMealIndex(cafe)
    var next_meal = mealsList[next_meal_index]
    setMealIndex(next_meal_index)
    setMeal(next_meal)
    setDishDisplayed(next_meal.next_dish)
  }
  function showPrevMeal() {
    var prev_meal_index = getPrevMealIndex(cafe)
    
    setMealIndex(prev_meal_index)
    var prev_meal = mealsList[prev_meal_index]
    setMeal(prev_meal)
    setDishDisplayed(prev_meal.next_dish)
  }
  useEffect(() => {
    // scroll cafe_modal_meal_title to top
    var cafe_modal_meal_title = document.getElementById("cafe_modal_meal_title")
    if (cafe_modal_meal_title) {
      cafe_modal_meal_title.scrollIntoView({ behavior: 'smooth' })
    }
  }, [showPrevMeal, showNextMeal, showPrevDish, showNextDish, markDone])
  return (
    <div>
      {meal && meal.dish && meal.dish.length > 0 &&
        <Transition.Root show={openModal} as={Fragment}>
          <Dialog as="div" className="fixed z-10" initialFocus={cancelButtonRef} onClose={setOpenModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-x-clip">
              <div className="flex h-full items-start justify-center  text-center sm:items-center p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="h-full relative transform   bg-white text-left shadow-xl transition-all w-full">
                    <div className='flex h-full flex-col'>
                      <div className="flow-root">

                        <button
                          type="button"
                          className="m-1 p-1 h-7 w-7 float-right inline-flex w-10 justify-center  rounded-4xl border border-gray-300 bg-white  text-xs	 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none  focus:ring-blue-500 focus:ring-offset-2 "
                          onClick={() => setOpenModal(false)}
                          ref={cancelButtonRef}>
                          x
                        </button>
                      </div>
                      <div className=" pb-20 flex-grow overflow-y-scroll bg-white px-4 pt-5  sm:p-6 sm:pb-4">
                        <div className=" bg-white-100 ">


                          <div className="p-3 pl-5">

                            <div className="float-right">
                              <ThreeDotsMealsMenu setMeal={setMeal} meal={meal} />
                            </div>
                            <div className="">
                              {/* tag when meal is archived */}
                              {meal.archived &&
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                  Archived
                                </span>
                              }
                            

                              <span className="float-right inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                <Square2StackIcon className='h-5 w-5 text-gray-400' />{printCurrentDishIndex(meal)}/{meal.num_of_dishes}
                              </span>
                            
                              <Link href={`/meal/${meal.id}/edit`} id="cafe_modal_meal_title">
                                <h5 className="font-Merriweather h-10  cursor-pointer mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{meal.name}</h5>
                              </Link>
                            </div>

                            {meal.link &&
                              <div className='mb-6  overflow-hidden	'>
                                <a href={meal.link} target='_blank' rel='noreferrer' className='flex items-center space-x-2'>
                                  <LinkIcon className='h-5 w-5 text-gray-400' />
                                  <span className='text-gray-400 font-light'>{meal.link}</span>
                                </a>
                              </div>
                            }
                          </div>

                          <div className="mb-auto ">
                            {dishDisplayed &&
                              <DishCard dish={dishDisplayed} isPartOfMeal={true} />
                            }
                            
                          </div>


                        </div>
                      </div>

                        
                      <div className="bottom_controls justify-self-end w-full bottom-0">
                        
                        <div className="meal_controls flex w-full items-center space-x-1 pt-1  px-3 pb-2">
                          <ShowPrevDishButton showPrevDish={showPrevDish} />
                          <div className='flex-grow'></div>
                          <ShowNextDishButton showNextDish={showNextDish} />
                        </div>
                        <div className="meal_controls flex w-full items-center space-x-1 p-3   px-3 bg-gray-100">

                          <ShowPrevMealButton showPrevMeal={showPrevMeal} />
                          <div className='flex-grow'></div>
                          <DoneButton meal={meal} markDone={markDone} setIsDone={setIsDone} isDone={isDone} eatenMealsCount={eatenMealsCount} setEatenMealsCount={setEatenMealsCount} />                          
                          <div className='flex-grow'></div>


                          {/* <ShowNextMealButton showNextMeal={showNextMeal} /> */}
                          {/* <AddNewDishB  utton meal={meal} /> */}

                        </div>
                        <div className='flex w-full items-center space-x-1 p-3   px-3 bg-gray-100'>
                          <MealCompletionStatusSteps completed={eatenMealsCount} total={mealsList.length}/>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      }
    </div>
  )
}