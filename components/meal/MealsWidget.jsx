import { useEffect, useState } from 'react'
import { useSession } from "@clerk/nextjs";
import { getMealsForWidget, classNames } from 'utils/utils'
export default function MealsWidget() {
  var { session } = useSession()
  var userId = session.user.id
  const [mealsList, setMealsList] = useState([])
  useEffect(() => {
    async function getMeals(userId) {
      var mealsList = await getMealsForWidget(userId)
      return mealsList
    }
    getMeals(userId).then((mealsList) => {
      setMealsList(mealsList)
    })
  }, [])

  return (
    <nav>
      {/* divider */}
      <div className='flex '>
      <div className="border-t border-gray-200"></div>
      <a  className='mt-0 text-gray-900 font-bold	px-2 py-2 mt-8'>
        Meals</a>
        {/* divider */}
        <div className="border-t border-gray-200"></div>
      </div>
      {mealsList.map((item) => (
        <a
          key={item.id}
          href={"/meals/" + item.id + "/edit"}
          className={classNames(
            item.current
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
            'group flex items-center px-2 py-2 text-base font-medium rounded-md' + item.additionalClasses
          )}>
        
          
          {/* item  name trimmed to 25 characters */}
          {item.name.length > 25 ? item.name.substring(0, 25) + "..." : item.name}
          
          
        </a>
      )
      )}
    </nav>
  )
}