import { FiArrowDown } from 'react-icons/fi'



export default function ShowNextMealButton({  showNextMeal }) {
  return (
    <div>
      <button onClick={showNextMeal} className="cursor-pointer text-gray-400 ">
          Skip for now
      </button>
    </div>

  )
}