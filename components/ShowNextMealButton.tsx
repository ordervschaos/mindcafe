import { ArrowDownIcon } from '@heroicons/react/20/solid'



export default function DoneButton({  showNextMeal }) {
  return (
    <div>
      <button onClick={showNextMeal} className="flex items-center justify-center cursor-pointer w-12 h-12 rounded-full content-center	 justify-center items-center
                  bg-white border border-gray-400 hover:bg-red-500 text-white">
          <ArrowDownIcon  className="p-2 h-15 w-15 text-gray-400" aria-hidden="true" />
      </button>
    </div>

  )
}