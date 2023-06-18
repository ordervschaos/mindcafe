import { CheckCircleIcon, PlayCircleIcon } from '@heroicons/react/20/solid'



export default function EatenDishesCount({eatenMealsCount,handleOpenModal, total}) {
  return (
    <div className="rounded-4xl bg-green-50 p-4 my-3 lg:mx-5">
      <div className="flex">
        
        <div onClick={handleOpenModal} className="cursor-pointer ">
          <PlayCircleIcon className="shadow-md hover:shadow-lg rounded-full ml-auto h-12 w-12 text-green-400"/>
        </div>
        <div>

        <div className="flex-shrink-0">
        </div>
        <div className="ml-3">
          {eatenMealsCount === total && <p className="text-sm font-medium text-green-800">Congrats! All meals completed!</p>}
          {eatenMealsCount < total && 
            <div>
              <p className="text-sm font-medium text-green-800">Keep going!</p>
              <h3 className="text-sm font-medium text-green-800">{eatenMealsCount}/{total} meals completed</h3>
            </div>
          }
        </div>
        </div>

        
          

       
        <div>

        </div>
      </div>
    </div>
  )
}