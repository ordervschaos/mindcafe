import React from "react";
import Link from "next/link";
import MindCafeLogo from "components/MindCafeLogo";

export default function Header() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <div className="fixed top-0 w-full z-30 clearNav md:bg-opacity-90 transition duration-300 ease-in-out">
      <div className="flex bg-white  max-w-6xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
        <div className="items-center justify-between p-4">
          <MindCafeLogo />
          {/* <button
            className="text-white cursor-pointer leading-none px-3 py-1 md:hidden outline-none focus:outline-none "
            type="button"
            aria-label="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#191919"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-menu"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button> */}
        </div>
        
        <div className="flex flex-grow">
        </div>
        <Link

          href="/cafe"
        ><div className="cursor-pointer max-h-10 mt-4 inline-flex items-center px-4 py-2 mt-2 font-medium text-white transition duration-500 ease-in-out transform bg-transparent rounded-lg text-md  bg-gray-800">
            <span className="justify-center">Dashboard</span>
          </div>
        </Link>
      </div>
    </div>
  );
}