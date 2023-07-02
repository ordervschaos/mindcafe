
import { FiChevronUp } from 'react-icons/fi'



export default function showPrevMealButton({  showPrevMeal }) {
  return (
    <div>
      <button onClick={showPrevMeal} className="flex items-center drop-shadow-sm justify-center cursor-pointer w-12 h-12 rounded-full content-center	 justify-center items-center
                  bg-white  hover:bg-red-500 text-white">
        <FiChevronUp className="h-15 w-15  text-gray-400" aria-hidden="true" />
      </button>
    </div>

  )
}