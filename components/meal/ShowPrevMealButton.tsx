
import { FiChevronUp } from 'react-icons/fi'



export default function showPrevMealButton({  showPrevMeal }) {
  return (
    <div>
      <button onClick={showPrevMeal} className="flex items-center drop-shadow-sm justify-center cursor-pointer w-9 h-9 rounded-full content-center	 justify-center items-center
                  bg-white  hover:bg-red-500 text-white">
        <FiChevronUp className="h-15 w-15  text-light-brown" aria-hidden="true" />
      </button>
    </div>

  )
}