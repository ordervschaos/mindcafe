import { FiChevronLeft } from 'react-icons/fi'
export default function BackButton({ onClick }) {
  return (
    <div className='flex'>
      <button onClick={onClick} className="flex items-center justify-center cursor-pointer rounded-full content-center	 justify-center items-center
                  bg-white  hover:text-dark-brown text-light-brown">
        <FiChevronLeft className="h-15 w-15  text-light-brown" aria-hidden="true" /> back
      </button>
    </div>

  )
}