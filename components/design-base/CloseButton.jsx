
import React from "react";
import {
  XMarkIcon,
} from '@heroicons/react/24/outline'

export default function CloseButton({ onClick }) {
  return (
    <button
    type="button"
    className=" m-1 h-7 w-7 float-right inline-flex w-10 justify-center  bg-white  text-xs	 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none  focus:ring-blue-500 focus:ring-offset-2 "
    onClick={onClick}>
      <XMarkIcon className="h-15 w-15  text-gray-400" aria-hidden="true" /> 
  </button>
  );
}