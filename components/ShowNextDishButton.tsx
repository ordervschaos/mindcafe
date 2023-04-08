import { FiArrowRight } from "react-icons/fi";







export default function showNextDishButton({  showNextDish }) {










  return (


    <div>
      <button onClick={showNextDish} className="flex items-center justify-center cursor-pointer w-12 h-12 rounded-full content-center	 justify-center items-center
                  bg-white border border-gray-400 hover:bg-red-500 text-white">

          <FiArrowRight  className="h-15 w-15 text-gray-400" aria-hidden="true" />

      </button>
    </div>

  )
}