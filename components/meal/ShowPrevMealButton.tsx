
import { FiChevronUp } from 'react-icons/fi'



export default function showPrevMealButton({  showPrevMeal }) {
  return (
    <div>
      <button onClick={showPrevMeal} className="cursor-pointer text-gray-400 hover:shadow-lg ">
        <FiChevronUp className="h-15 w-15  text-gray-400" aria-hidden="true" />
      </button>
    </div>

  )
}