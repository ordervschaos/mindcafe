import React from 'react';
import { Cog6ToothIcon,ExclamationTriangleIcon,ChevronUpIcon,ChevronDownIcon } from '@heroicons/react/24/outline'
import TimeDropDown from "./TimeDropDown";
import InputAndDropDown from "./InputAndDropDown";
import WeeklySchedulePicker from "./WeeklySchedulePicker";


export default function AdvancedSettingsWidget({meal,isMealSettingsOpen,isDangerousSettingsOpen,toggleMealSettingsVisibility,toggleDangerousSettingsVisibility,deleteAllDishes}) {
  return (
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
    {isMealSettingsOpen&&
                    <div className="grid grid-cols-6 gap-6 mt-2">
                      <div className="row col-span-6">

                        <div className="col-span-6 sm:col-span-3">
                          <TimeDropDown  meal={meal}/>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <InputAndDropDown meal={meal}/>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <WeeklySchedulePicker meal={meal}/>
                        </div>
                      </div>
                      <div className="row col-span-4"></div>
                      <div className="row col-span-2">

                        <div className="text-gray-400 cursor-pointer" onClick={toggleDangerousSettingsVisibility}>
                          <ExclamationTriangleIcon className="w-5 h-5 inline-block"/> 
                          <span className="ml-2 mr-1" >Dangerous Settings</span>
                          {isDangerousSettingsOpen&&
                          <ChevronUpIcon className="w-5 h-5 inline-block"/> 
                          }
                          {!isDangerousSettingsOpen&&
                            <ChevronDownIcon className="w-5 h-5 inline-block"/> 
                          }
                          
                        </div>
                      </div>
                      {isDangerousSettingsOpen&&

                      <div className="col-span-6 sm:col-span-3">
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => {
                            deleteAllDishes(meal.id)
                          }}

                        >
                          Delete all dishes
                        </button>
                      </div>
                      }
                    </div>
                  }
                </div>
  </div>
  )
}