import Link from 'next/link'

export default function MealCard({ meal }) {
  try {
    var content = JSON.parse(meal.content)
    content.blocks = content.blocks.filter((block) => block.type == 'paragraph')
    meal.content = JSON.stringify(content)

  } catch {
    meal.content = JSON.stringify({
      version: "2.11.10",
      blocks: [
        {
          type: "paragraph",
          data: {
            text: meal.content
          }
        }
      ],
    })
  }
  return (
    <div>
      <div className='my-3 '>
        <div className=" bg-white-100 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div className="p-3 pl-5">
            <Link className="" href={"/meal/" + meal.id + "/edit"}>
              <div className="flex">
                <h5 className="cursor-pointer mb-2 text-2xl font-bold tracking-tight text-dark-brown dark:text-white">{meal.name}</h5>
                <div className=" mr-1 text-light-brown ml-2 py-1 px-2 inline-block float-right border rounded ">x{meal.num_of_dishes}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}