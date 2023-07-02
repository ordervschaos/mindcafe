import { useEffect, useState } from 'react'
import { useSession } from "@clerk/nextjs";
import Link from 'next/link'
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
  }, [userId])

  return (
    <nav>
      {/* divider */}
      <div className='flex '>
      <div className="border-t border-gray-200"></div>
      <div className='w-full mt-8 pl-2' style={
        {
          borderBottom: '1px solid #DDD',
        }}>
        <a className='text-gray-800 font-bold	px-2'>Meals</a>
        {/* right floated link */}
        <Link href="/meals" className='float-right text-gray-800 hover:bg-gray-50 hover:text-gray-800 px-2 text-sm font-medium rounded-md'>
          See all
        </Link>
      </div>
        {/* divider */}
        <div className="border-t border-gray-200"></div>
      </div>
      <a
          href={"/meal/create"}
          className={classNames('pl-4','text-light-brown hover:bg-gray-50 hover:text-gray-800',
            'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
          )}
          >
        
          [+] Create new meal
          
          
        </a>
      {mealsList.map((item) => (
        <a
          key={item.id}
          href={"/meal/" + item.id + "/edit"}
          className={classNames('pl-4',
            item.current
              ? 'bg-gray-100 text-gray-800'
              : 'text-gray-800 hover:bg-gray-50 hover:text-gray-800',
            'group flex items-center px-2 py-2 text-sm font-medium rounded-md' + item.additionalClasses
          )}
          >
        
          
          {/* item  name trimmed to 25 characters */}
          {item.name.length > 25 ? item.name.substring(0, 25) + "..." : item.name}
          
          
        </a>
      )
      )}
    </nav>
  )
}