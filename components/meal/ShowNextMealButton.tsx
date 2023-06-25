import { FiChevronDown } from 'react-icons/fi'



export default function ShowNextMealButton({  showNextMeal }) {
  return (
    <div>
      <button onClick={showNextMeal} className="cursor-pointer text-gray-400 hover:shadow-lg ">
        <FiChevronDown className="h-15 w-15  text-gray-400" aria-hidden="true" />
      </button>
    </div>

  )
}