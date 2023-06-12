import { FiArrowLeft } from 'react-icons/fi'
// Get icon nams from: https://unpkg.com/browse/@heroicons/react@2.0.11/24/outline/

export default function ShowPrevDishButton({  showPrevDish }) {
  return (
    <div>
      <button  onClick={showPrevDish} className="flex items-center justify-center cursor-pointer w-12 h-12 rounded-full content-center	 justify-center items-center
                  bg-white  hover:bg-red-500 text-white">
          <FiArrowLeft  className="h-15 w-15  text-gray-400" aria-hidden="true" />
      </button>
    </div>
  )
}