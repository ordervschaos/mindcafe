import { Fragment, useEffect, useRef, useState } from 'react'
import { Link } from 'next/link'
import { Dialog, Transition } from '@headlessui/react'
import {
  PencilSquareIcon,
  DocumentIcon,
  Square2StackIcon,
  LinkIcon
} from '@heroicons/react/24/outline'
import DishCard from './DishCard'
import DoneButton from "./modal/DoneButton";
import ShowNextDishButton from "./modal/ShowNextDishButton";
import ShowPrevDishButton from "./modal/ShowPrevDishButton";
import ShowNextMealButton from "./ShowNextMealButton";
import ShowPrevMealButton from "./ShowPrevMealButton";

import { supabaseClient } from '../utils/supabaseClient'

export default function CafeModal({ openModal, setOpenModal, mealsList, mealIndex, setMealIndex, session, eatenDishesCount, setEatenDishesCount }) {

  useEffect(() => {
    setMeal(mealsList[mealIndex])
  }, [mealsList, mealIndex])

  const default_meal = mealsList[mealIndex]
  const [meal, setMeal] = useState(default_meal)

  const [dishDisplayed, setDishDisplayed] = useState(default_meal.next_dish)
  const [isDone, setIsDone] = useState(false);

  const cancelButtonRef = useRef(null)
  async function markDone() {
    setIsDone(true)
    setEatenDishesCount(eatenDishesCount + 1)
    const supabase_client = await supabaseClient(session)
    showNextMeal()

    var response = await supabase_client.from("meal").update({ next_dish_index: meal.next_dish_index + 1 }).match({ id: meal.id });

  }
  async function showNextDish() {
    setEatenDishesCount(eatenDishesCount + 1)
    const supabase_client = await supabaseClient(session)
    meal.next_dish_index += 1
    var next_dish_index = meal.next_dish_index % meal.dish.length
    setDishDisplayed(meal.dish[next_dish_index])
    supabase_client.from("meal").update({ next_dish_index: meal.next_dish_index }).match({ id: meal.id });
  }
  async function showPrevDish() {
    setEatenDishesCount(eatenDishesCount + 1)
    const supabase_client = await supabaseClient(session)

    meal.next_dish_index -= 1
    console.log("meal.next_dish_index", meal.next_dish_index)
    var next_dish_index = meal.next_dish_index % meal.dish.length

    console.log("meal.dish[next_dish_index ]", meal.dish[next_dish_index])
    setDishDisplayed(meal.dish[next_dish_index])
    supabase_client.from("meal").update({ next_dish_index: meal.next_dish_index }).match({ id: meal.id });


  }

  function showNextMeal() {
    console.log("indsx", mealIndex)
    console.log("list", mealsList)
    console.log("showNextMeal", mealsList[(mealIndex + 1) % mealsList.length])
    setMealIndex(mealIndex + 1)

    var next_meal = mealsList[(mealsList.length + mealIndex + 1) % mealsList.length]
    setMeal(next_meal)
    setDishDisplayed(next_meal.next_dish)
  }
  function showPrevMeal() {
    console.log("list", mealsList)
    setMealIndex(mealIndex - 1)
    console.log("showPrevtMeal", mealsList[(mealIndex - 1) % mealsList.length])
    var prev_meal = mealsList[(mealsList.length + mealIndex - 1) % mealsList.length]
    setMeal(prev_meal)
    setDishDisplayed(prev_meal.next_dish)
  }
  return (
    <div>
      {meal && meal.dish && meal.dish.length > 0 &&
        <Transition.Root show={openModal} as={Fragment}>
          <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpenModal}>
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

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex items-end justify-center  text-center sm:items-center p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="flex  flex-col h-screen relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full">
                    <div className="flow-root">

                      <button
                        type="button"
                        className="m-1 p-1 h-7 w-7 float-right inline-flex w-10 justify-center  rounded-4xl border border-gray-300 bg-white  text-xs	 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none  focus:ring-blue-500 focus:ring-offset-2 "
                        onClick={() => setOpenModal(false)}
                        ref={cancelButtonRef}>
                        x
                      </button>
                    </div>
                    <div className="h-10 mb-auto bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className=" bg-white-100 rounded-lg">


                        <div className="p-3 pl-5">


                          <div className="">
                            {meal.num_of_dishes > 1 &&

                              <span className="float-right inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                <Square2StackIcon className='h-5 w-5 text-gray-400' />{meal.num_of_dishes}
                              </span>
                            }
                            <h5 className="h-10  cursor-pointer mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{meal.name}</h5>
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

                        <div className="mb-auto h-10">
                          {dishDisplayed &&

                            <DishCard dish={dishDisplayed} isPartOfMeal={true} />

                          }

                        </div>


                      </div>
                    </div>


                    <div className="bottom_controls  h-30  ">
                      <div className="meal_controls flex w-full items-center space-x-1 pt-1  px-3 pb-2">
                        <ShowPrevDishButton showPrevDish={showPrevDish} />
                        <div className='flex-grow'></div>
                        <ShowNextDishButton showNextDish={showNextDish} />
                      </div>
                      <div className="meal_controls flex w-full items-center space-x-1 p-3   px-3 bg-gray-100">

                        <ShowPrevMealButton showPrevMeal={showPrevMeal} />
                        <div className='flex-grow'></div>
                        <DoneButton meal={meal} markDone={markDone} setIsDone={setIsDone} isDone={isDone} eatenDishesCount={eatenDishesCount} setEatenDishesCount={setEatenDishesCount} />
                        <div className='flex-grow'></div>


                        <ShowNextMealButton showNextMeal={showNextMeal} />

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