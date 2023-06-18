import { FiChevronLeft } from 'react-icons/fi'
export default function showPrevMealButton({ showPrevMeal }) {
  return (
    <div className='flex'>
      <button onClick={showPrevMeal} className="flex items-center justify-center cursor-pointer rounded-full content-center	 justify-center items-center
                  bg-white  hover:bg-red-500 text-gray-400">
        <FiChevronLeft className="h-15 w-15  text-gray-400" aria-hidden="true" /> back
      </button>
    </div>

  )
}