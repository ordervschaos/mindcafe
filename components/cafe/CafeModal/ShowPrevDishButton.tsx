import { FiArrowLeft } from 'react-icons/fi'
// Get icon nams from: https://unpkg.com/browse/@heroicons/react@2.0.11/24/outline/

export default function ShowPrevDishButton({  showPrevDish }) {
  return (
    <div>
      <button  onClick={showPrevDish} className="w-12 h-12 py-4  flex justify-center cursor-pointer text-light-brown rounded-full hover:shadow-lg">
          <FiArrowLeft  className="h-15 w-15  text-light-brown" aria-hidden="true" />
      </button>
    </div>
  )
}