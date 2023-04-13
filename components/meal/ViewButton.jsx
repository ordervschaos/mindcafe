import { FiMaximize } from "react-icons/fi";
export default function ViewButton({handleMealPreviewClick}) {
  return (
    <div onClick={handleMealPreviewClick}>
      <button className="flex items-center justify-center cursor-pointer w-12 h-12 rounded-full
                  bg-white border border-gray-400 hover:bg-red-500 text-white cursor-pointer">
          <FiMaximize  className="text-gray-400 hover:text-white" />
      </button>
    </div>

  )
}