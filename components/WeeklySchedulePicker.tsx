import { useState } from "react";
import { useSession } from "@clerk/nextjs";
import { supabaseClient } from "../utils/supabaseClient";

const weeksDays=[
  {label:"Sun",value:"0"},
  {label:"Mon",value:"1"},
  {label:"Tue",value:"2"},
  {label:"Wed",value:"3"},
  {label:"Thu",value:"4"},
  {label:"Fri",value:"5"},
  {label:"Sat",value:"6"},
]
 
/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function WeeklySchedulePicker({ meal }) {
  const { session } = useSession();
  const [weeklySchedule, setWeeklySchedule] = useState(meal.weeklySchedule||[])
  
  var updateWeeklySchedule=async(updatedList)=>{
    const supabase = await supabaseClient(session);
    var updateResponse=await supabase.from("meal")
      .update({ weeklySchedule: updatedList }).match({ id: meal.id, owner_id: session.user.id });

  }
  const handleCheck = (event) => {
    var updatedList = [...weeklySchedule];
    if (event.target.checked) {
      updatedList = [...weeklySchedule, event.target.value];
    } else {
      updatedList.splice(weeklySchedule.indexOf(event.target.value), 1);
    }
    setWeeklySchedule(updatedList);
    updateWeeklySchedule(updatedList)
  };

  return (

    <fieldset className="space-y-5">
      <legend className="sr-only">Notifications</legend>
      <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">

      {weeksDays.map((day, index) => {
        return (
          <li key={day.value} className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center p-3">
            <div className="flex h-5 items-center">
              <input
              checked={weeklySchedule.includes(day.value)?true:false}
                id={day.value}
                aria-describedby="comments-description"
                name={day.value}
                type="checkbox"
                onChange={handleCheck}
                value={day.value}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor={day.label} className="font-medium text-gray-700">
                {day.label}
              </label>
            </div>
          </div>
        </li>
        )
      })}
      </ul>
      
    </fieldset>

  )
}
