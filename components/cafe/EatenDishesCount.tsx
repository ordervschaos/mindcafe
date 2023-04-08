import { CheckCircleIcon } from '@heroicons/react/20/solid'

export default function EatenDishesCount({eatenDishesCount}) {
  return (
    <div className="rounded-4xl bg-green-50 p-4 my-3 lg:mx-5">
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-800">{eatenDishesCount} dishes completed</h3>
        </div>
      </div>
    </div>
  )
}