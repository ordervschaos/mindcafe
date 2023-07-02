import { FiChevronDown } from 'react-icons/fi'



export default function ShowNextMealButton({  showNextMeal }) {
  return (
    <div>
      <button onClick={showNextMeal} className="flex items-center drop-shadow-sm justify-center cursor-pointer w-9 h-9 rounded-full content-center	 justify-center items-center
                  bg-white  hover:bg-red-500 text-white">
        <FiChevronDown className="h-15 w-15  text-gray-400" aria-hidden="true" />
      </button>
    </div>

  )
}