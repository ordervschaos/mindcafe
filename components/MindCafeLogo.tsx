import Link from "next/link"



export default  function MindCafeLogo() {
  return (
    <div className="flex flex-shrink-0 items-center px-4">
      <div className=" cursor-pointer text-lg font-bold rounded-lg tracking-widest focus:outline-none focus:shadow-outline">
      <Link href='/cafe'>
        <h1 className="text-4xl Avenir tracking-tighter text-gray-800 md:text-4x1 lg:text-3xl">
          MindCafe
        </h1>
      </Link>
      </div>
     
    </div>
  )
}