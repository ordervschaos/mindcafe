import { FiEye } from "react-icons/fi";
export default function ViewButton() {
  return (
    <div>
      <button className="flex items-center justify-center cursor-pointer w-12 h-12 rounded-full
                  bg-white border border-gray-400 hover:bg-red-500 text-white">
          <FiEye  className="text-gray-400 hover:text-white" />
      </button>
    </div>

  )
}